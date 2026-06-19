/**
 * sync-deletion.test.js — fast-check property tests for the
 * tombstone-aware sync logic in js/sync-core.js.
 *
 * Three properties are exercised, mirroring the spec at
 * .kiro/specs/expense-deletion-not-persisting/bugfix.md:
 *
 *   Property 1 — Fix Checking
 *     For every scenario where the user inserts and then deletes a record
 *     in a SYNC_STORE, after a full sync round-trip:
 *       a) the record is NOT present in IndexedDB
 *       b) the record is NOT present in Firestore
 *
 *   Property 2 — Preservation Checking
 *     For every scenario where the user does NOT delete a record (insert
 *     only / insert + edit / no op), the post-sync state contains exactly
 *     the inserted/edited records, both locally and remotely. Non-deletion
 *     histories must therefore preserve all data.
 *
 *   Property 3 — Local Data Survival
 *     For every local record the user has not explicitly deleted, the
 *     fixed sync round-trip preserves that record on disk regardless of
 *     whether the remote contains the record. Local-only records are NEVER
 *     misclassified as deletions.
 */

import { describe, it, beforeEach, expect } from 'vitest';
import fc from 'fast-check';
import 'fake-indexeddb/auto';

// Force a fresh module load so the IndexedDB inside db.js binds to the
// fake-indexeddb instance set up by the auto setup file.
const DB = (await import('../js/db.js')).default;
const SyncCore = (await import('../js/sync-core.js')).default;

// =====================================================================
// In-memory Firestore mock
// =====================================================================
function createFakeFirestore() {
  const collections = {}; // collectionName -> { docId -> data }

  function ensureCollection(name) {
    if (!collections[name]) collections[name] = {};
    return collections[name];
  }

  function docRef(collName, docId) {
    return {
      _coll: collName,
      _id: String(docId),
      set(data, opts) {
        const coll = ensureCollection(collName);
        const id = String(docId);
        if (opts && opts.merge && coll[id]) {
          coll[id] = Object.assign({}, coll[id], data);
        } else {
          coll[id] = JSON.parse(JSON.stringify(data));
        }
        return Promise.resolve();
      },
      delete() {
        const coll = ensureCollection(collName);
        delete coll[String(docId)];
        return Promise.resolve();
      },
      get() {
        const coll = ensureCollection(collName);
        const id = String(docId);
        const data = coll[id];
        return Promise.resolve({
          exists: data !== undefined,
          data: () => data
        });
      }
    };
  }

  function collectionRef(name) {
    return {
      doc(id) { return docRef(name, id); },
      get() {
        const coll = ensureCollection(name);
        const docs = Object.keys(coll).map((id) => ({
          id,
          data: () => coll[id]
        }));
        return Promise.resolve({
          forEach(cb) { docs.forEach(cb); },
          docs
        });
      }
    };
  }

  function batch() {
    const ops = [];
    return {
      set(ref, data, opts) { ops.push(['set', ref, JSON.parse(JSON.stringify(data)), opts]); },
      delete(ref) { ops.push(['delete', ref]); },
      commit() {
        const promises = ops.map(([kind, ref, data, opts]) => {
          if (kind === 'set') return ref.set(data, opts);
          if (kind === 'delete') return ref.delete();
          return Promise.resolve();
        });
        return Promise.all(promises);
      }
    };
  }

  return {
    collection: collectionRef,
    batch,
    _collections: collections,
    _dump() {
      const out = {};
      Object.keys(collections).forEach((c) => {
        out[c] = Object.assign({}, collections[c]);
      });
      return out;
    }
  };
}

// =====================================================================
// Helpers to wipe and re-init the local IndexedDB between scenarios
// =====================================================================
// Clearing the existing stores is dramatically faster than deleting and
// reopening the DB between fast-check iterations, and avoids the IDB
// `onblocked` deadlock that arises when the previous DB connection is
// still open (which it is, since db.js holds a closure-scoped reference).
async function freshLocalDb() {
  await DB.init();
  // Wipe every store the test cares about, plus the tombstones store.
  const allStores = DB.SYNC_STORES.concat(['tombstones', 'flights', 'rates']);
  for (const s of allStores) {
    const items = await DB.getAll(s);
    for (const it of items) {
      if (it && it.id !== undefined && it.id !== null) {
        await DB.deleteRaw(s, it.id);
      }
    }
  }
}

// Apply a sequence of operations against the local DB to produce a
// well-defined starting state.
async function applyHistory(history) {
  for (const op of history) {
    if (op.kind === 'put') {
      await DB.put(op.store, op.record);
    } else if (op.kind === 'delete') {
      await DB.delete(op.store, op.id);
    }
  }
}

async function dumpLocal(stores) {
  const out = {};
  for (const s of stores) {
    out[s] = await DB.getAll(s);
  }
  out.tombstones = await DB.getAllTombstones();
  return out;
}

// =====================================================================
// Arbitraries
// =====================================================================
const SYNC_STORES = DB.SYNC_STORES;

const recordIdArb = fc.integer({ min: 1, max: 200 }).map((n) => 'rec-' + n);
const storeArb = fc.constantFrom(...SYNC_STORES);
const recordArb = fc.record({
  id: recordIdArb,
  name: fc.string({ minLength: 0, maxLength: 16 }),
  updatedAt: fc.integer({ min: 1, max: 1_000_000 })
});

// History op arbitraries
const putOpArb = fc.tuple(storeArb, recordArb).map(([store, record]) => ({ kind: 'put', store, record }));
const deleteOpArb = fc.tuple(storeArb, recordIdArb).map(([store, id]) => ({ kind: 'delete', store, id }));

// =====================================================================
// Property 1 — Fix Checking
// =====================================================================
describe('Property 1 — Fix Checking (deleted records do not resurrect)', () => {
  it('after [insert; delete; full round-trip] the record is gone locally AND remotely', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordArb,
        async (store, record) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // 1. Insert
          await DB.put(store, record);
          // 2. Delete
          await DB.delete(store, record.id);
          // 3. Full sync round-trip
          await SyncCore.fullRoundTrip(firestore, DB);

          const localItem  = await DB.get(store, record.id);
          const remoteItem = firestore._collections[store] && firestore._collections[store][record.id];

          expect(localItem).toBeUndefined();
          expect(remoteItem).toBeUndefined();
        }
      ),
      { numRuns: 15 }
    );
  });

  it('after [insert; sync; delete; sync] the record is gone locally AND remotely', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordArb,
        async (store, record) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          await DB.put(store, record);
          await SyncCore.fullRoundTrip(firestore, DB);
          // Confirm record is in Firestore after first sync
          expect(firestore._collections[store][record.id]).toBeDefined();

          await DB.delete(store, record.id);
          await SyncCore.fullRoundTrip(firestore, DB);

          const localItem  = await DB.get(store, record.id);
          const remoteItem = firestore._collections[store] && firestore._collections[store][record.id];

          expect(localItem).toBeUndefined();
          expect(remoteItem).toBeUndefined();
        }
      ),
      { numRuns: 15 }
    );
  });

  it('a remote tombstone deletes the local copy on the next pull (cross-device)', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordArb,
        async (store, record) => {
          // Device A simulated: directly seed Firestore with a tombstone.
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // Local device has the record (received from a prior sync).
          await DB.put(store, record);
          // Remote tombstone exists (Device A deleted it elsewhere).
          await firestore.collection('tombstones').doc(store + ':' + record.id).set({
            id: store + ':' + record.id,
            store,
            recordId: String(record.id),
            deletedAt: Date.now()
          });

          await SyncCore.fullRoundTrip(firestore, DB);

          const localItem = await DB.get(store, record.id);
          const localTomb = await DB.getTombstone(store, record.id);

          expect(localItem).toBeUndefined();
          expect(localTomb).toBeDefined();
        }
      ),
      { numRuns: 15 }
    );
  });
});

// =====================================================================
// Property 2 — Preservation Checking
// =====================================================================
describe('Property 2 — Preservation Checking (no spurious data loss)', () => {
  it('a put-only history results in every record being present locally and remotely after sync', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(putOpArb, { minLength: 0, maxLength: 12 }),
        async (puts) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // Newest write wins per (store,id), like real usage.
          const expected = {}; // 'store:id' -> record
          for (const op of puts) {
            await DB.put(op.store, op.record);
            expected[op.store + ':' + op.record.id] = op.record;
          }

          await SyncCore.fullRoundTrip(firestore, DB);

          for (const key of Object.keys(expected)) {
            const [store, id] = key.split(':', 2);
            const local = await DB.get(store, id);
            expect(local).toBeDefined();
            expect(local.id).toBe(id);
            const remote = firestore._collections[store] && firestore._collections[store][id];
            expect(remote).toBeDefined();
          }
        }
      ),
      { numRuns: 12 }
    );
  });

  it('an edit (put with same id) overwrites the previous record without spawning a tombstone', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordIdArb,
        fc.string({ minLength: 1, maxLength: 8 }),
        fc.string({ minLength: 1, maxLength: 8 }),
        async (store, id, name1, name2) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          await DB.put(store, { id, name: name1, updatedAt: 100 });
          await DB.put(store, { id, name: name2, updatedAt: 200 });
          await SyncCore.fullRoundTrip(firestore, DB);

          const local = await DB.get(store, id);
          expect(local).toBeDefined();
          expect(local.name).toBe(name2);

          const tomb = await DB.getTombstone(store, id);
          expect(tomb).toBeUndefined();
        }
      ),
      { numRuns: 12 }
    );
  });
});

// =====================================================================
// Property 3 — Local Data Survival
// =====================================================================
describe('Property 3 — Local Data Survival across the fix', () => {
  it('local-only records that the user never deleted survive the round-trip even when remote is empty', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(putOpArb, { minLength: 0, maxLength: 10 }),
        async (puts) => {
          await freshLocalDb();
          const firestore = createFakeFirestore(); // Remote starts empty.

          const inserted = {}; // last write per (store,id)
          for (const op of puts) {
            await DB.put(op.store, op.record);
            inserted[op.store + ':' + op.record.id] = op.record;
          }

          await SyncCore.fullRoundTrip(firestore, DB);

          for (const key of Object.keys(inserted)) {
            const [store, id] = key.split(':', 2);
            const local = await DB.get(store, id);
            expect(local).toBeDefined(); // Local-only record survived.
          }
        }
      ),
      { numRuns: 12 }
    );
  });

  it('local-only records survive a round-trip even when other records are deleted in the same scenario', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(putOpArb, { minLength: 1, maxLength: 8 }),
        fc.array(putOpArb, { minLength: 1, maxLength: 4 }),
        async (toKeep, toDelete) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // Insert keepers
          const keepers = {};
          for (const op of toKeep) {
            await DB.put(op.store, op.record);
            keepers[op.store + ':' + op.record.id] = op.record;
          }
          // Insert + delete losers
          for (const op of toDelete) {
            // avoid stomping a keeper id
            if (keepers[op.store + ':' + op.record.id]) continue;
            await DB.put(op.store, op.record);
            await DB.delete(op.store, op.record.id);
          }

          await SyncCore.fullRoundTrip(firestore, DB);

          for (const key of Object.keys(keepers)) {
            const [store, id] = key.split(':', 2);
            const local = await DB.get(store, id);
            expect(local).toBeDefined();
          }
        }
      ),
      { numRuns: 12 }
    );
  });

  it('a record present locally but missing remotely is never deleted by the pull phase', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordArb,
        async (store, record) => {
          await freshLocalDb();
          const firestore = createFakeFirestore(); // empty remote, no tombstones

          await DB.put(store, record);
          await SyncCore.applyRemoteDeletes(firestore, DB);
          await SyncCore.pullAdditive(firestore, DB);

          const local = await DB.get(store, record.id);
          expect(local).toBeDefined();
          expect(local.id).toBe(record.id);
        }
      ),
      { numRuns: 15 }
    );
  });
});


// =====================================================================
// Edge-case property tests added during the auto-critical audit pass.
// =====================================================================
describe('Audit — round-trip idempotence and mutation safety', () => {
  it('running fullRoundTrip twice in a row produces the same observable state as once', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(putOpArb,    { minLength: 0, maxLength: 6 }),
        fc.array(deleteOpArb, { minLength: 0, maxLength: 4 }),
        async (puts, deletes) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          for (const p of puts)    await DB.put(p.store, p.record);
          for (const d of deletes) await DB.delete(d.store, d.id);

          await SyncCore.fullRoundTrip(firestore, DB);
          const localAfter1  = await dumpLocal(SYNC_STORES);
          const remoteAfter1 = JSON.parse(JSON.stringify(firestore._collections));

          await SyncCore.fullRoundTrip(firestore, DB);
          const localAfter2  = await dumpLocal(SYNC_STORES);
          const remoteAfter2 = JSON.parse(JSON.stringify(firestore._collections));

          // Local store membership (by id) must be stable across the second sync.
          for (const s of SYNC_STORES) {
            const ids1 = (localAfter1[s]  || []).map(r => r.id).sort();
            const ids2 = (localAfter2[s]  || []).map(r => r.id).sort();
            expect(ids2).toEqual(ids1);
          }
          // Remote collection ids must be stable too.
          for (const c of Object.keys(remoteAfter1)) {
            expect(Object.keys(remoteAfter2[c] || {}).sort())
              .toEqual(Object.keys(remoteAfter1[c] || {}).sort());
          }
        }
      ),
      { numRuns: 12 }
    );
  });

  it('pushAdditive does NOT mutate the caller-visible record updatedAt when already set', async () => {
    await freshLocalDb();
    const firestore = createFakeFirestore();
    const original = { id: 'no-mut-1', name: 'fixed', updatedAt: 12345 };
    await DB.put('expenses', original);
    await SyncCore.pushAdditive(firestore, DB);
    const local = await DB.get('expenses', 'no-mut-1');
    expect(local.updatedAt).toBe(12345); // not re-stamped
  });

  it('pushAdditive stamps updatedAt when missing and respects updatedAt: 0 (epoch)', async () => {
    await freshLocalDb();
    const firestore = createFakeFirestore();
    await DB.put('expenses', { id: 'epoch-1', name: 'e0', updatedAt: 0 });
    await DB.put('expenses', { id: 'no-time', name: 'n0' /* no updatedAt */ });
    await SyncCore.pushAdditive(firestore, DB);

    // updatedAt: 0 must be respected (NOT clobbered to Date.now())
    expect(firestore._collections.expenses['epoch-1'].updatedAt).toBe(0);
    // missing updatedAt must be stamped to a real number
    expect(typeof firestore._collections.expenses['no-time'].updatedAt).toBe('number');
    expect(firestore._collections.expenses['no-time'].updatedAt).toBeGreaterThan(0);
  });
});

describe('Audit — re-creation after deletion (tombstone wins)', () => {
  it('a record re-created with the same id after delete+sync stays deleted on next sync', async () => {
    await fc.assert(
      fc.asyncProperty(
        storeArb,
        recordArb,
        async (store, record) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // 1. Insert + sync — record is everywhere
          await DB.put(store, record);
          await SyncCore.fullRoundTrip(firestore, DB);
          // 2. Delete + sync — record is gone everywhere
          await DB.delete(store, record.id);
          await SyncCore.fullRoundTrip(firestore, DB);

          // 3. The user "accidentally" re-puts the same id (legacy code path
          //    that doesn't honor the tombstone). Sync should NOT push it.
          await DB.put(store, Object.assign({}, record, { updatedAt: 999999 }));
          await SyncCore.fullRoundTrip(firestore, DB);

          const remote = firestore._collections[store] && firestore._collections[store][record.id];
          expect(remote).toBeUndefined();
        }
      ),
      { numRuns: 10 }
    );
  });
});

describe('Audit — mixed put/delete histories converge', () => {
  it('arbitrary put/delete sequences produce a consistent post-sync state', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.oneof(putOpArb, deleteOpArb), { minLength: 0, maxLength: 12 }),
        async (history) => {
          await freshLocalDb();
          const firestore = createFakeFirestore();

          // Build expected state by simulating ops in order.
          const expected = {}; // 'store:id' -> { kind: 'kept'|'deleted' }
          for (const op of history) {
            if (op.kind === 'put') {
              const k = op.store + ':' + op.record.id;
              expected[k] = { kind: 'kept', store: op.store, id: op.record.id };
              await DB.put(op.store, op.record);
            } else {
              const k = op.store + ':' + op.id;
              if (expected[k]) expected[k].kind = 'deleted';
              else             expected[k] = { kind: 'deleted', store: op.store, id: op.id };
              await DB.delete(op.store, op.id);
            }
          }

          await SyncCore.fullRoundTrip(firestore, DB);

          for (const k of Object.keys(expected)) {
            const e = expected[k];
            const local  = await DB.get(e.store, e.id);
            const remote = firestore._collections[e.store] && firestore._collections[e.store][e.id];
            if (e.kind === 'deleted') {
              expect(local).toBeUndefined();
              expect(remote).toBeUndefined();
            } else {
              expect(local).toBeDefined();
              expect(remote).toBeDefined();
            }
          }
        }
      ),
      { numRuns: 12 }
    );
  });
});

describe('Audit — DB.delete writes the tombstone for SYNC stores only', () => {
  it('non-synced stores (flights) delete without writing a tombstone', async () => {
    await freshLocalDb();
    await DB.put('flights', { id: 'fl-1', from: 'BGY', to: 'FRU' });
    await DB.delete('flights', 'fl-1');
    const tomb = await DB.getTombstone('flights', 'fl-1');
    expect(tomb).toBeUndefined();
    const local = await DB.get('flights', 'fl-1');
    expect(local).toBeUndefined();
  });

  it('synced stores write a tombstone in the same transaction as the delete', async () => {
    await freshLocalDb();
    await DB.put('expenses', { id: 'tx-1', amount: 5 });
    await DB.delete('expenses', 'tx-1');
    const tomb = await DB.getTombstone('expenses', 'tx-1');
    expect(tomb).toBeDefined();
    expect(tomb.store).toBe('expenses');
    expect(tomb.recordId).toBe('tx-1');
    expect(typeof tomb.deletedAt).toBe('number');
  });
});
