# Bugfix Requirements Document

## Introduction

Quando l'utente elimina una spesa nella sezione Budget e poi sincronizza (manualmente con il bottone 🔄, automaticamente all'apertura dell'app, o al reload di pagina che `fullSync()` triggera), la spesa eliminata ricompare e rimane in IndexedDB. La cancellazione locale è corretta, ma `syncToCloud()` è puramente additivo (`batch.set(..., { merge: true })`) e non rimuove mai documenti remoti, mentre `syncFromCloud()` ripesca ogni documento Firestore e lo riscrive localmente con `DB.put()`. La firma esplicita del problema è nel commento del file `js/firebase-sync.js`: «Push all local data to Firestore (additive, never deletes remote)».

L'impatto è funzionale (l'utente non riesce a cancellare spese in modo permanente) e di fiducia (la UI mostra la spesa eliminata, poi al refresh la spesa torna senza spiegazione). Lo stesso difetto sistemico riguarda tutti gli store in `SYNC_STORES` (`expenses`, `places`, `checklist`, `documents`, `notes`, `edits`, `activityState`): qualunque cancellazione locale viene "resuscitata" alla prossima pull.

**Scope**: Questa spec copre solo il problema di propagazione delle cancellazioni. Il sintomo separato "l'app Android non si scarica e rimane bloccata" sarà trattato in una spec dedicata.

Constraint from user: la fix non deve in alcun caso cancellare contenuti locali esistenti che l'utente non ha esplicitamente eliminato. In particolare la sezione Diario (oggi in localStorage, non ancora sincronizzata) e tutti i record degli store già sincronizzati devono essere preservati bit-per-bit dopo il deploy della fix.

## Bug Analysis

### Current Behavior (Defect)

Comportamento attualmente osservato sul codice non corretto.

1.1 WHEN the user deletes an expense in the Budget section AND `fullSync()` is then invoked (manual 🔄 button) THEN the system re-creates the deleted expense in IndexedDB from the remote Firestore `expenses` collection during `syncFromCloud()`
1.2 WHEN the user deletes an expense AND the page reloads (including the automatic `window.location.reload()` triggered 1 second after `fullSync()` succeeds) AND the one-shot bootstrap sync runs on app open THEN the deleted expense reappears in the Budget UI
1.3 WHEN the user deletes any item from any store listed in `SYNC_STORES` (`expenses`, `places`, `checklist`, `documents`, `notes`, `edits`, `activityState`) AND a sync round-trip occurs THEN the deleted item is resurrected because `syncToCloud()` only emits `batch.set(..., { merge: true })` calls and never `batch.delete(...)`
1.4 WHEN the user deletes an expense while offline AND later goes online AND a sync runs THEN the deletion is silently lost: it was never recorded as an intent to delete, and the next pull re-adds the remote copy

### Expected Behavior (Correct)

Comportamento corretto richiesto sul codice corretto.

2.1 WHEN the user deletes an expense AND any subsequent sync runs (manual fullSync, bootstrap on app open, or post-reload pull) THEN the system SHALL keep the deleted expense out of IndexedDB and SHALL NOT re-add it from the remote
2.2 WHEN the user deletes an expense AND the device is online during the next sync THEN the system SHALL propagate the deletion to the remote Firestore `expenses` collection so that other devices stop receiving the resurrected record
2.3 WHEN the user deletes an expense while offline AND later goes online AND a sync runs THEN the system SHALL eventually propagate the deletion to Firestore (the deletion intent SHALL survive across reloads and app restarts until acknowledged by the remote)
2.4 WHEN the user deletes any item from any store in `SYNC_STORES` THEN the system SHALL apply the same deletion-propagation guarantee (the fix is store-generic, not expense-specific)
2.5 WHEN a deletion has been successfully propagated and acknowledged by Firestore THEN the system SHALL clean up any local deletion intent so that store size does not grow unbounded

### Unchanged Behavior (Regression Prevention)

Comportamento esistente che NON deve cambiare.

3.1 WHEN the user adds a new expense THEN the system SHALL CONTINUE TO insert it into IndexedDB and push it to Firestore on the next sync exactly as today
3.2 WHEN the user edits an existing expense (or any other record in a `SYNC_STORES` store) THEN the system SHALL CONTINUE TO write the updated version to IndexedDB and push it to Firestore on the next sync
3.3 WHEN the remote Firestore collection contains items that the user has never deleted locally AND a sync runs THEN the system SHALL CONTINUE TO merge those items into IndexedDB (additive merge for non-deleted records is preserved)
3.4 WHEN `IS_DEMO_MODE` is true (Netlify or non-whitelisted hostname) THEN the system SHALL CONTINUE TO skip every sync operation, including any new deletion-propagation logic
3.5 WHEN the device is offline and a sync is requested THEN the system SHALL CONTINUE TO surface the "📵 Offline" toast and SHALL NOT throw or corrupt local data
3.6 WHEN two records exist locally and remotely with differing `updatedAt` timestamps AND neither has been deleted THEN the system SHALL CONTINUE TO use the existing newer-wins reconciliation in `syncFromCloud()`
3.7 WHEN the deletion-propagation fix is deployed for the first time AND any sync runs THEN the system SHALL NOT delete, modify, or otherwise lose any local record that the user has not explicitly deleted, regardless of whether the remote contains the record or not
3.8 WHEN a user-created record exists locally but does NOT exist remotely (e.g., the user added it offline, or on a device that has not yet synced) AND the deletion-propagation fix runs THEN the system SHALL treat the local record as authoritative and SHALL NOT interpret the missing remote copy as a deletion intent (local-only records must never be misclassified as deleted)
3.9 WHEN the user has accumulated content in any store in `SYNC_STORES` (`expenses`, `places`, `checklist`, `documents`, `notes`, `edits`, `activityState`) AND the deletion-propagation fix is deployed THEN the system SHALL preserve every existing local record bit-for-bit unless the user explicitly deletes that specific record after the fix is deployed

## Bug Condition Derivation

The bug condition and properties below are presented in pseudocode for the design phase to formalize.

**Bug Condition Function** — identifies inputs that trigger the bug:

```pascal
FUNCTION isBugCondition(scenario)
  INPUT: scenario of type SyncScenario
    // scenario contains:
    //   - storeName : one of SYNC_STORES
    //   - record    : a record with an `id` field
    //   - history   : sequence of operations on `record` (insert, edit, delete)
    //   - syncRun   : whether a syncToCloud + syncFromCloud round-trip occurs
    //                 after the last local operation
  OUTPUT: boolean

  RETURN scenario.storeName IN SYNC_STORES
         AND scenario.history ENDS WITH a local delete of scenario.record
         AND scenario.syncRun = true
         AND remoteFirestore[scenario.storeName] STILL CONTAINS scenario.record.id
            // because syncToCloud is additive-only
END FUNCTION
```

**Property — Fix Checking** (defines correct behavior for buggy inputs):

```pascal
// For every scenario that triggers the bug, after the round-trip the
// record must NOT be present locally AND must be removed remotely.
FOR ALL scenario WHERE isBugCondition(scenario) DO
  performHistory(scenario.history)
  fullSync'()  // F' = fixed sync
  ASSERT NOT localDB.has(scenario.storeName, scenario.record.id)
  ASSERT NOT remoteFirestore.has(scenario.storeName, scenario.record.id)
END FOR
```

**Property — Preservation Checking** (defines unchanged behavior for non-buggy inputs):

```pascal
// For every scenario where the user did NOT delete the record (insert
// only, insert+edit, or no local op), the fixed sync must produce the
// same observable IndexedDB state as the current sync.
FOR ALL scenario WHERE NOT isBugCondition(scenario) DO
  ASSERT fullSync(scenario)  = fullSync'(scenario)
END FOR
```

**Property — Local Data Survival Across the Fix Deployment**:

```pascal
// For every local record that the user has NOT deleted, the fixed sync
// must preserve that record on disk after any sync round-trip, even
// when the remote does not contain the record.
FOR ALL recordR IN localDB(scenario.storeName) WHERE
     scenario.history DOES NOT include a delete of recordR DO
  fullSync'()
  ASSERT localDB.has(scenario.storeName, recordR.id)
  ASSERT localDB.get(scenario.storeName, recordR.id) = recordR
  // The record must remain present and unchanged regardless of whether
  // remoteFirestore[scenario.storeName].has(recordR.id).
END FOR
```

Where:
- **F** = current `fullSync` / `syncToCloud` / `syncFromCloud` (additive only)
- **F'** = fixed sync that propagates deletions
