/**
 * db.js — IndexedDB Manager
 * Kyrgyzstan Travel PWA 2025
 *
 * Global DB object with Promise-based CRUD for 4 object stores:
 *   notes, checklist, expenses, edits
 */

var DB = (function () {
  'use strict';

  var DB_NAME = 'kyrgyzstan-travel';
  var DB_VERSION = 1;
  var db = null;

  var STORES = {
    notes:     { keyPath: 'id' },
    checklist: { keyPath: 'id' },
    expenses:  { keyPath: 'id' },
    edits:     { keyPath: 'id' }
  };

  /**
   * Initialise (or open) the database.
   * Creates all object stores on first run (onupgradeneeded).
   * Resolves even when IndexedDB is unavailable so the app still works.
   * @returns {Promise<void>}
   */
  function init() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        console.warn('IndexedDB non disponibile — modalità read-only');
        resolve();
        return;
      }

      var request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (e) {
        var database = e.target.result;
        var storeNames = Object.keys(STORES);
        for (var i = 0; i < storeNames.length; i++) {
          var name = storeNames[i];
          if (!database.objectStoreNames.contains(name)) {
            database.createObjectStore(name, STORES[name]);
          }
        }
      };

      request.onsuccess = function (e) {
        db = e.target.result;
        resolve();
      };

      request.onerror = function (e) {
        console.error('Errore apertura IndexedDB:', e.target.error);
        resolve(); // resolve anyway so the app keeps working
      };
    });
  }

  /**
   * Save (insert or update) an object in a store.
   * @param {string} storeName
   * @param {object} data — must contain the keyPath field (id)
   * @returns {Promise<void>}
   */
  function put(storeName, data) {
    return new Promise(function (resolve, reject) {
      if (!db) {
        console.warn('DB non inizializzato — put ignorato');
        resolve();
        return;
      }
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

  /**
   * Retrieve a single object by id.
   * @param {string} storeName
   * @param {string|number} id
   * @returns {Promise<object|undefined>}
   */
  function get(storeName, id) {
    return new Promise(function (resolve, reject) {
      if (!db) {
        resolve(undefined);
        return;
      }
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

  /**
   * Retrieve all objects from a store.
   * @param {string} storeName
   * @returns {Promise<object[]>}
   */
  function getAll(storeName) {
    return new Promise(function (resolve, reject) {
      if (!db) {
        resolve([]);
        return;
      }
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
   * Delete an object by id.
   * @param {string} storeName
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  function deleteFn(storeName, id) {
    return new Promise(function (resolve, reject) {
      if (!db) {
        resolve();
        return;
      }
      try {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        var request = store.delete(id);

        request.onsuccess = function () { resolve(); };
        request.onerror = function (e) {
          console.error('Errore delete ' + storeName + ':', e.target.error);
          resolve();
        };
      } catch (err) {
        console.error('Errore delete ' + storeName + ':', err);
        resolve();
      }
    });
  }

  /**
   * Serialize an object to a JSON string.
   * @param {object} data
   * @returns {string}
   */
  function serialize(data) {
    return JSON.stringify(data);
  }

  /**
   * Deserialize a JSON string to an object.
   * Returns null on invalid JSON (logs warning, does not crash).
   * @param {string} json
   * @returns {object|null}
   */
  function deserialize(json) {
    try {
      return JSON.parse(json);
    } catch (err) {
      console.warn('Errore deserializzazione JSON:', err);
      return null;
    }
  }

  /* ---- Public API ---- */
  return {
    init:        init,
    put:         put,
    get:         get,
    getAll:      getAll,
    delete:      deleteFn,
    serialize:   serialize,
    deserialize: deserialize
  };
})();
