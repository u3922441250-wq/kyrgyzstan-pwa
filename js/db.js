/**
 * db.js — IndexedDB Manager
 * Kyrgyzstan Travel PWA 2025
 *
 * Global DB object with Promise-based CRUD for the project's object stores.
 *
 * v7 — adds the `tombstones` store used by sync-core.js to track local
 * deletions so they propagate across devices via Firestore. The delete()
 * method is sync-aware: when called on a store listed in SYNC_STORES it
 * writes a tombstone in the same readwrite transaction, then deletes the
 * record. For non-synced stores (flights, rates) it behaves as a plain
 * delete with no tombstone overhead.
 */

var DB = (function () {
  'use strict';

  var DB_NAME = 'kyrgyzstan-travel';
  // v7 — adds the `tombstones` store. Migration is additive only: existing
  // stores and records are never touched.
  var DB_VERSION = 7;
  var db = null;

  // Stores that participate in cross-device sync (Firestore mirror). Single
  // source of truth used by both this module's delete() and sync-core.js.
  // KEEP IN SYNC with the Firestore collection names.
  var SYNC_STORES = ['expenses', 'places', 'checklist', 'documents', 'notes', 'edits', 'activityState'];
  var SYNC_STORES_SET = {};
  for (var ssi = 0; ssi < SYNC_STORES.length; ssi++) SYNC_STORES_SET[SYNC_STORES[ssi]] = true;

  // Each store entry has { keyPath } and an optional `indexes` array of
  // { name, keyPath, options } descriptors. Indexes are created additively in
  // `onupgradeneeded` and skipped if already present, keeping the migration
  // idempotent across reopens.
  var STORES = {
    notes:         { keyPath: 'id' },
    checklist:     { keyPath: 'id' },
    expenses:      { keyPath: 'id' },
    edits:         { keyPath: 'id' },
    documents:     { keyPath: 'id' },
    places:        { keyPath: 'id' },
    flights:       { keyPath: 'id' },
    activityState: {
      keyPath: 'id',
      indexes: [
        { name: 'byTripDay', keyPath: 'tripDay', options: { unique: false } }
      ]
    },
    rates:         { keyPath: 'id' },
    // v7: durable record of local deletions. Each entry has the shape
    //   { id: 'store:recordId', store, recordId, deletedAt }
    // The composite `id` makes lookups O(1). The store and deletedAt indexes
    // let sync-core.js range-query efficiently.
    tombstones:    {
      keyPath: 'id',
      indexes: [
        { name: 'byStore',     keyPath: 'store',     options: { unique: false } },
        { name: 'byDeletedAt', keyPath: 'deletedAt', options: { unique: false } }
      ]
    }
  };

  function init() {
    return new Promise(function (resolve) {
      if (typeof indexedDB === 'undefined' || !indexedDB) {
        console.warn('IndexedDB non disponibile — modalità read-only');
        resolve();
        return;
      }

      var request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (e) {
        var database = e.target.result;
        var upgradeTx = e.target.transaction;
        var storeNames = Object.keys(STORES);
        for (var i = 0; i < storeNames.length; i++) {
          var name = storeNames[i];
          var spec = STORES[name];
          var store;
          if (!database.objectStoreNames.contains(name)) {
            store = database.createObjectStore(name, { keyPath: spec.keyPath });
          } else if (upgradeTx) {
            store = upgradeTx.objectStore(name);
          } else {
            store = null;
          }
          if (store && spec.indexes && spec.indexes.length) {
            for (var j = 0; j < spec.indexes.length; j++) {
              var idx = spec.indexes[j];
              if (!store.indexNames.contains(idx.name)) {
                store.createIndex(idx.name, idx.keyPath, idx.options || {});
              }
            }
          }
        }
      };

      request.onsuccess = function (e) {
        db = e.target.result;
        resolve();
      };

      request.onerror = function (e) {
        console.error('Errore apertura IndexedDB:', e.target.error);
        resolve();
      };
    });
  }

  function put(storeName, data) {
    return new Promise(function (resolve, reject) {
      if (!db) { resolve(); return; }
      try {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        var request = store.put(data);
        request.onsuccess = function () { resolve(); };
        request.onerror = function (e) {
          console.error('Errore put ' + storeName + ':', e.target.error);
          reject(e.target.error);
        };
      } catch (err) {
        console.error('Errore put ' + storeName + ':', err);
        resolve();
      }
    });
  }

  function get(storeName, id) {
    return new Promise(function (resolve) {
      if (!db) { resolve(undefined); return; }
      try {
        var tx = db.transaction(storeName, 'readonly');
        var store = tx.objectStore(storeName);
        var request = store.get(id);
        request.onsuccess = function () { resolve(request.result); };
        request.onerror = function (e) {
          console.error('Errore get ' + storeName + ':', e.target.error);
          resolve(undefined);
        };
      } catch (err) {
        console.error('Errore get ' + storeName + ':', err);
        resolve(undefined);
      }
    });
  }

  function getAll(storeName) {
    return new Promise(function (resolve) {
      if (!db) { resolve([]); return; }
      try {
        var tx = db.transaction(storeName, 'readonly');
        var store = tx.objectStore(storeName);
        var request = store.getAll();
        request.onsuccess = function () { resolve(request.result || []); };
        request.onerror = function (e) {
          console.error('Errore getAll ' + storeName + ':', e.target.error);
          resolve([]);
        };
      } catch (err) {
        console.error('Errore getAll ' + storeName + ':', err);
        resolve([]);
      }
    });
  }

  /**
   * Delete a record. For stores listed in SYNC_STORES this also writes a
   * tombstone in the same readwrite transaction, so the deletion intent
   * survives reloads, restarts, and offline periods until the next sync
   * push to Firestore (Requirement 2.3, 2.4).
   *
   * For non-synced stores (flights, rates, tombstones itself) this performs
   * a plain delete with no tombstone — keeping store size flat (Requirement 2.5).
   */
  function deleteFn(storeName, id) {
    return new Promise(function (resolve) {
      if (!db) { resolve(); return; }
      try {
        var isSynced = !!SYNC_STORES_SET[storeName];
        var stores = isSynced ? [storeName, 'tombstones'] : [storeName];
        var tx = db.transaction(stores, 'readwrite');
        var dataStore = tx.objectStore(storeName);
        var delReq = dataStore.delete(id);
        if (isSynced) {
          var tStore = tx.objectStore('tombstones');
          tStore.put({
            id: storeName + ':' + String(id),
            store: storeName,
            recordId: String(id),
            deletedAt: Date.now()
          });
        }
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function (e) {
          console.error('Errore delete ' + storeName + ':', e.target.error);
          resolve();
        };
        // Surface the per-request error too, but tx.oncomplete is the
        // authoritative resolution.
        delReq.onerror = function (e) {
          console.error('Errore delete record ' + storeName + ':', e.target.error);
        };
      } catch (err) {
        console.error('Errore delete ' + storeName + ':', err);
        resolve();
      }
    });
  }

  /**
   * Raw delete — bypasses tombstone tracking. Used internally by sync-core
   * when applying a REMOTE deletion: the remote tombstone already encodes
   * the intent, so writing another local tombstone is wasted work AND would
   * trigger a redundant push back to Firestore.
   */
  function deleteRaw(storeName, id) {
    return new Promise(function (resolve) {
      if (!db) { resolve(); return; }
      try {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        var request = store.delete(id);
        request.onsuccess = function () { resolve(); };
        request.onerror = function (e) {
          console.error('Errore deleteRaw ' + storeName + ':', e.target.error);
          resolve();
        };
      } catch (err) {
        console.error('Errore deleteRaw ' + storeName + ':', err);
        resolve();
      }
    });
  }

  /**
   * Upsert a tombstone record. Idempotent: pushing the same tombstone twice
   * leaves the local store unchanged.
   */
  function putTombstone(t) {
    if (!t || !t.store || t.recordId === undefined || t.recordId === null) {
      return Promise.resolve();
    }
    var record = {
      id: t.id || (t.store + ':' + String(t.recordId)),
      store: t.store,
      recordId: String(t.recordId),
      deletedAt: typeof t.deletedAt === 'number' ? t.deletedAt : Date.now()
    };
    return put('tombstones', record);
  }

  /**
   * Look up a tombstone for a specific (store, recordId) pair. Returns the
   * tombstone object, or undefined if the record is not (yet) tombstoned.
   */
  function getTombstone(storeName, recordId) {
    return get('tombstones', storeName + ':' + String(recordId));
  }

  /**
   * Get every tombstone in the local store. Used by the sync push phase to
   * propagate deletions to Firestore.
   */
  function getAllTombstones() {
    return getAll('tombstones');
  }

  /* ---- Public API ---- */
  var api = {
    init:               init,
    put:                put,
    get:                get,
    getAll:             getAll,
    delete:             deleteFn,
    deleteRaw:          deleteRaw,
    putTombstone:       putTombstone,
    getTombstone:       getTombstone,
    getAllTombstones:   getAllTombstones,
    SYNC_STORES:        SYNC_STORES,
    serialize:          function (data) { return JSON.stringify(data); },
    deserialize:        function (json) {
      try { return JSON.parse(json); }
      catch (err) { console.warn('Errore deserializzazione JSON:', err); return null; }
    }
  };

  return api;
})();

// UMD-style export so vitest can require/import this file directly while the
// browser still gets the global `DB`.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DB;
}
