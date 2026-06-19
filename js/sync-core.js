/**
 * sync-core.js — Tombstone-aware sync logic
 * Kyrgyzstan Travel PWA 2026
 *
 * Pure functions that take a `firestoreDb` (Firestore web SDK v9 compat) and
 * a `dbApi` (the global DB object from db.js, or any compatible mock) and
 * implement the four phases of a deletion-aware sync round-trip:
 *
 *   pushDeletes(firestoreDb, dbApi)         — phase A1: propagate local tombstones
 *   pushAdditive(firestoreDb, dbApi)        — phase A2: existing additive set
 *   applyRemoteDeletes(firestoreDb, dbApi)  — phase B1: apply remote tombstones
 *   pullAdditive(firestoreDb, dbApi)        — phase B2: existing newer-wins merge
 *   fullRoundTrip(firestoreDb, dbApi)       — convenience wrapper
 *
 * Tombstones win over records of the same id. Re-creation with the same id
 * is therefore not supported — fresh records must use fresh ids. (See the
 * spec design notes for rationale.)
 *
 * The module is browser-compatible (attaches to window.SyncCore) AND
 * CommonJS-compatible (exports via module.exports), so the same source file
 * is consumed by index.html and by vitest.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.SyncCore = api;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null), function () {
  'use strict';

  var TOMBSTONES_COLLECTION = 'tombstones';
  var FIRESTORE_BATCH_LIMIT = 450; // Firestore batches max 500 ops; leave a margin.

  /**
   * Default list of synced stores. The dbApi is expected to expose its own
   * `SYNC_STORES` array (single source of truth in db.js); this constant is
   * only used as a fallback for tests that pass a minimal dbApi.
   */
  var DEFAULT_SYNC_STORES = ['expenses', 'places', 'checklist', 'documents', 'notes', 'edits', 'activityState'];

  function getSyncStores(dbApi) {
    if (dbApi && Array.isArray(dbApi.SYNC_STORES) && dbApi.SYNC_STORES.length) {
      return dbApi.SYNC_STORES.slice();
    }
    return DEFAULT_SYNC_STORES.slice();
  }

  /**
   * Push every local tombstone to Firestore. For each tombstone we
   *   1) write the tombstone document to firestore.collection('tombstones')
   *   2) delete the corresponding original record from firestore.collection(t.store)
   *
   * Both are part of the same Firestore batch so they commit atomically per
   * batch chunk. Tombstones are NOT removed from the local store after push;
   * they remain as the durable "this device knows X is deleted" record so
   * subsequent pulls don't resurrect X via pullAdditive (Requirement 2.1).
   * They are also idempotent under re-push (Requirement 2.5).
   */
  function pushDeletes(firestoreDb, dbApi) {
    return Promise.resolve(dbApi.getAllTombstones()).then(function (tombstones) {
      if (!tombstones || !tombstones.length) return;
      var batch = firestoreDb.batch();
      var ops = 0;
      var commits = [];
      for (var i = 0; i < tombstones.length; i++) {
        var t = tombstones[i];
        if (!t || !t.store || t.recordId === undefined || t.recordId === null) continue;
        var tDocRef = firestoreDb.collection(TOMBSTONES_COLLECTION).doc(t.id);
        batch.set(tDocRef, {
          id:        t.id,
          store:     t.store,
          recordId:  String(t.recordId),
          deletedAt: t.deletedAt || Date.now()
        });
        ops++;
        var origDocRef = firestoreDb.collection(t.store).doc(String(t.recordId));
        batch.delete(origDocRef);
        ops++;
        if (ops >= FIRESTORE_BATCH_LIMIT) {
          commits.push(batch.commit());
          batch = firestoreDb.batch();
          ops = 0;
        }
      }
      if (ops > 0) commits.push(batch.commit());
      return Promise.all(commits);
    });
  }

  /**
   * Push every local non-tombstoned record to Firestore via additive set
   * with merge:true. Records whose (store, id) has a local tombstone are
   * skipped — defensive guard against the case where some legacy code path
   * leaves a stale record after the user deleted it.
   */
  function pushAdditive(firestoreDb, dbApi) {
    var stores = getSyncStores(dbApi);
    return Promise.resolve(dbApi.getAllTombstones()).then(function (tombstones) {
      var tombSet = {};
      if (tombstones) {
        for (var ti = 0; ti < tombstones.length; ti++) {
          var t = tombstones[ti];
          if (t && t.store && t.recordId !== undefined && t.recordId !== null) {
            tombSet[t.store + ':' + String(t.recordId)] = true;
          }
        }
      }
      var perStore = stores.map(function (storeName) {
        return Promise.resolve(dbApi.getAll(storeName)).then(function (items) {
          if (!items || !items.length) return;
          var batch = firestoreDb.batch();
          var ops = 0;
          var commits = [];
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!item || item.id === undefined || item.id === null) continue;
            if (tombSet[storeName + ':' + String(item.id)]) continue; // tombstoned, skip
            // Clone before stamping updatedAt so we never mutate the caller's
            // copy. Use typeof check so a legitimate `updatedAt: 0` is kept.
            var toPush = (typeof item.updatedAt === 'number')
              ? item
              : Object.assign({}, item, { updatedAt: Date.now() });
            var docRef = firestoreDb.collection(storeName).doc(String(item.id));
            batch.set(docRef, toPush, { merge: true });
            ops++;
            if (ops >= FIRESTORE_BATCH_LIMIT) {
              commits.push(batch.commit());
              batch = firestoreDb.batch();
              ops = 0;
            }
          }
          if (ops > 0) commits.push(batch.commit());
          return Promise.all(commits);
        });
      });
      return Promise.all(perStore);
    });
  }

  /**
   * Pull all Firestore tombstones and apply them locally. For each remote
   * tombstone we write a local mirror (idempotent) AND delete the local
   * record from the named data store via dbApi.deleteRaw — bypassing the
   * sync-aware delete() so we don't write another tombstone (the remote one
   * already encodes the intent).
   */
  function applyRemoteDeletes(firestoreDb, dbApi) {
    return firestoreDb.collection(TOMBSTONES_COLLECTION).get().then(function (snapshot) {
      var remoteTombstones = [];
      if (snapshot && typeof snapshot.forEach === 'function') {
        snapshot.forEach(function (doc) { remoteTombstones.push(doc.data()); });
      }
      var perTombstone = remoteTombstones.map(function (t) {
        if (!t || !t.store || t.recordId === undefined || t.recordId === null) return Promise.resolve();
        var normalized = {
          id:        t.id || (t.store + ':' + String(t.recordId)),
          store:     t.store,
          recordId:  String(t.recordId),
          deletedAt: typeof t.deletedAt === 'number' ? t.deletedAt : Date.now()
        };
        return Promise.resolve(dbApi.putTombstone(normalized)).then(function () {
          return dbApi.deleteRaw(t.store, String(t.recordId));
        });
      });
      return Promise.all(perTombstone);
    });
  }

  /**
   * Pull all remote records and merge them locally. Existing newer-wins
   * reconciliation is preserved (Requirement 3.6). Two new safeguards:
   *   - If a local tombstone exists for (store, remoteItem.id), the remote
   *     record is skipped (Requirement 2.1: deleted records do not resurrect).
   *   - Local-only records (present locally, missing remotely) are NEVER
   *     deleted by this function (Requirement 3.8).
   */
  function pullAdditive(firestoreDb, dbApi) {
    var stores = getSyncStores(dbApi);
    var perStore = stores.map(function (storeName) {
      return firestoreDb.collection(storeName).get().then(function (snapshot) {
        var remoteItems = [];
        if (snapshot && typeof snapshot.forEach === 'function') {
          snapshot.forEach(function (doc) { remoteItems.push(doc.data()); });
        }
        var merges = remoteItems.map(function (remoteItem) {
          if (!remoteItem || remoteItem.id === undefined || remoteItem.id === null) return Promise.resolve();
          return Promise.resolve(dbApi.getTombstone(storeName, remoteItem.id)).then(function (tomb) {
            if (tomb) return; // tombstoned: do NOT re-add
            return Promise.resolve(dbApi.get(storeName, remoteItem.id)).then(function (localItem) {
              if (!localItem) {
                return dbApi.put(storeName, remoteItem);
              }
              var localTime  = localItem.updatedAt  || localItem.createdAt  || 0;
              var remoteTime = remoteItem.updatedAt || remoteItem.createdAt || 0;
              if (remoteTime > localTime) {
                return dbApi.put(storeName, remoteItem);
              }
              return Promise.resolve();
            });
          });
        });
        return Promise.all(merges);
      });
    });
    return Promise.all(perStore);
  }

  /**
   * Convenience wrapper. Order:
   *   1) pushDeletes        — get our local deletions out before our remote pulls.
   *   2) pushAdditive       — push live records.
   *   3) applyRemoteDeletes — apply other devices' deletions to our local data.
   *   4) pullAdditive       — merge other devices' records (skipping tombstoned ids).
   *
   * Phases 1 and 2 run on the SAME source state, so a record we push in 2
   * could not have been deleted in 1 unless the user did both within the
   * same sync window — in that case the tombstone wins (set in 1, delete
   * in 1 also removed the record so phase 2 can't see it).
   */
  function fullRoundTrip(firestoreDb, dbApi) {
    return pushDeletes(firestoreDb, dbApi)
      .then(function () { return pushAdditive(firestoreDb, dbApi); })
      .then(function () { return applyRemoteDeletes(firestoreDb, dbApi); })
      .then(function () { return pullAdditive(firestoreDb, dbApi); });
  }

  return {
    pushDeletes:         pushDeletes,
    pushAdditive:        pushAdditive,
    applyRemoteDeletes:  applyRemoteDeletes,
    pullAdditive:        pullAdditive,
    fullRoundTrip:       fullRoundTrip,
    TOMBSTONES_COLLECTION: TOMBSTONES_COLLECTION
  };
});
