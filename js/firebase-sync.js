/**
 * firebase-sync.js — Firebase Firestore Sync (tombstone-aware)
 * Kyrgy App v1.1
 *
 * Offline-first: dati sempre in IndexedDB locale.
 * Bottone 🔄 esegue il round-trip completo:
 *   1) push tombstone locali a Firestore + delete dei doc originali
 *   2) push additivo dei record locali (merge:true)
 *   3) pull tombstone da Firestore + delete locale dei record cancellati altrove
 *   4) pull dei record da Firestore con merge newer-wins (skip dei tombstoned)
 *
 * Le cancellazioni locali sopravvivono a reload, restart e periodi offline
 * grazie allo store `tombstones` in IndexedDB (vedi db.js v7).
 *
 * Global: syncToCloud(), syncFromCloud(), fullSync()
 *
 * DEMO MODE: se hostname include 'netlify' (showcase pubblico) o non è in
 * whitelist, tutto il sync è disabilitato. I tombstone vengono comunque
 * scritti localmente — innocui, e forward-compatible se il sync si attiva.
 */

// ===== DEMO MODE DETECTION =====
var IS_DEMO_MODE = (function () {
  if (typeof window === 'undefined') return false;
  var host = (window.location.hostname || '').toLowerCase();
  var SYNC_HOSTS = [
    'kyrgyzstan-2026.web.app',
    'kyrgyzstan-2026.firebaseapp.com',
    'localhost',
    '127.0.0.1'
  ];
  for (var i = 0; i < SYNC_HOSTS.length; i++) {
    if (host === SYNC_HOSTS[i]) return false;
  }
  return true;
})();
window.IS_DEMO_MODE = IS_DEMO_MODE;

var FIREBASE_CONFIG = {
  apiKey: "AIzaSyBoB_trR4p1CjmzcVDaD-Tb-jam0XymTnk",
  authDomain: "kyrgyzstan-2026.firebaseapp.com",
  projectId: "kyrgyzstan-2026",
  storageBucket: "kyrgyzstan-2026.firebasestorage.app",
  messagingSenderId: "962361958556",
  appId: "1:962361958556:web:75a1163bd54a27fc868d59"
};

// SYNC_STORES is owned by db.js (DB.SYNC_STORES) — single source of truth.

var firebaseApp = null;
var firestoreDb = null;
var firebaseReady = false;

/**
 * Lazy-load Firebase SDK from CDN (only when sync is requested).
 */
function initFirebase() {
  return new Promise(function (resolve, reject) {
    if (firebaseReady) { resolve(); return; }
    if (!navigator.onLine) { reject(new Error('Offline')); return; }

    var script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
    script1.onload = function () {
      var script2 = document.createElement('script');
      script2.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js';
      script2.onload = function () {
        try {
          firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
          firestoreDb = firebase.firestore();
          firebaseReady = true;
          console.log('Firebase inizializzato');
          resolve();
        } catch (e) { reject(e); }
      };
      script2.onerror = function () { reject(new Error('Firestore SDK load failed')); };
      document.head.appendChild(script2);
    };
    script1.onerror = function () { reject(new Error('Firebase SDK load failed')); };
    document.head.appendChild(script1);
  });
}

/**
 * Push: phase A1 (deletes) + phase A2 (additive set).
 */
function syncToCloud() {
  return window.SyncCore.pushDeletes(firestoreDb, DB)
    .then(function () { return window.SyncCore.pushAdditive(firestoreDb, DB); });
}

/**
 * Pull: phase B1 (apply remote deletes) + phase B2 (additive merge).
 */
function syncFromCloud() {
  return window.SyncCore.applyRemoteDeletes(firestoreDb, DB)
    .then(function () { return window.SyncCore.pullAdditive(firestoreDb, DB); });
}

/**
 * Sync secret message to cloud immediately (called on save).
 * Non-blocking: if offline or Firebase not ready, silently skips.
 */
window.syncSecretMessage = function () {
  if (IS_DEMO_MODE) return;
  var secretMsg = localStorage.getItem('kg-secret-msg');
  if (!secretMsg) return;
  initFirebase().then(function () {
    return firestoreDb.collection('settings').doc('secret-msg').set({
      value: secretMsg,
      updatedAt: parseInt(localStorage.getItem('kg-secret-msg-time') || String(Date.now()))
    }, { merge: true });
  }).then(function () {
    console.log('Secret message synced to cloud');
  }).catch(function (err) {
    console.log('Secret message sync skipped:', err.message);
  });
};

/**
 * Full sync: push (deletes + additive) → pull (deletes + additive).
 * Called by the 🔄 button.
 */
window.fullSync = function () {
  if (IS_DEMO_MODE) {
    showToast('🔒 Modalità demo — sync disattivato');
    return;
  }
  showToast('Sincronizzazione...');

  initFirebase().then(function () {
    var secretMsg = localStorage.getItem('kg-secret-msg');
    if (secretMsg) {
      firestoreDb.collection('settings').doc('secret-msg').set({
        value: secretMsg, updatedAt: Date.now()
      }, { merge: true });
    }
    return syncToCloud();
  }).then(function () {
    console.log('Push completato (incluso tombstones)');
    return syncFromCloud();
  }).then(function () {
    return firestoreDb.collection('settings').doc('secret-msg').get();
  }).then(function (doc) {
    if (doc.exists) {
      var remote = doc.data();
      var localTime = parseInt(localStorage.getItem('kg-secret-msg-time') || '0');
      if (remote.updatedAt > localTime) {
        localStorage.setItem('kg-secret-msg', remote.value);
        localStorage.setItem('kg-secret-msg-time', String(remote.updatedAt));
      }
    }
    console.log('Pull completato (incluso tombstones)');
    showToast('✅ Sincronizzato!');
    setTimeout(function () { window.location.reload(); }, 1000);
  }).catch(function (err) {
    console.error('Sync error:', err);
    if (err.message === 'Offline') {
      showToast('📵 Offline — dati salvati localmente');
    } else {
      showToast('❌ Errore sync: ' + err.message);
    }
  });
};

/**
 * One-time bootstrap sync on app open.
 */
(function () {
  if (IS_DEMO_MODE) return;
  if (!navigator.onLine) return;
  if (sessionStorage.getItem('kg-synced')) return;
  sessionStorage.setItem('kg-synced', '1');

  setTimeout(function () {
    initFirebase().then(function () {
      return syncFromCloud();
    }).then(function () {
      return firestoreDb.collection('settings').doc('secret-msg').get();
    }).then(function (doc) {
      if (doc.exists) {
        var remote = doc.data();
        var localTime = parseInt(localStorage.getItem('kg-secret-msg-time') || '0');
        if (remote.updatedAt > localTime) {
          localStorage.setItem('kg-secret-msg', remote.value);
          localStorage.setItem('kg-secret-msg-time', String(remote.updatedAt));
        }
      }
      console.log('Sync iniziale completata (con apply tombstones)');
    }).catch(function () {
      // Silent fail
    });
  }, 3000);
})();
