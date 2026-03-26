/**
 * editable.js — Editable Content Manager
 * Kyrgyzstan Travel PWA 2025
 *
 * Global Editable object that makes HTML elements contentEditable
 * with debounced auto-save to IndexedDB and reset support.
 */

var Editable = (function () {
  'use strict';

  var debounceTimers = {};

  /**
   * Make an element contentEditable with auto-save.
   *
   * @param {HTMLElement} el          — DOM element to make editable
   * @param {string}      contentId   — unique id for this piece of content
   * @param {string}      originalValue — original (default) value for reset
   */
  function make(el, contentId, originalValue) {
    el.contentEditable = 'true';
    el.classList.add('editable');

    // Mark modified if current content differs from original
    function updateModifiedClass() {
      var current = el.innerText.trim();
      if (current !== originalValue.trim()) {
        el.classList.add('modified');
      } else {
        el.classList.remove('modified');
      }
    }

    updateModifiedClass();

    el.addEventListener('input', function () {
      updateModifiedClass();

      // Debounce save at 500ms
      if (debounceTimers[contentId]) {
        clearTimeout(debounceTimers[contentId]);
      }

      debounceTimers[contentId] = setTimeout(function () {
        var value = el.innerText;
        DB.put('edits', {
          id: contentId,
          value: value,
          originalValue: originalValue,
          updatedAt: Date.now()
        }).then(function () {
          if (typeof showToast === 'function') {
            showToast('Salvato ✓');
          }
        }).catch(function (err) {
          console.error('Errore salvataggio edit:', err);
        });
      }, 500);
    });
  }

  /**
   * Load all edits for a given section from IndexedDB.
   *
   * @param {string} sectionId — section prefix (e.g. "drone", "itinerary")
   * @returns {Promise<Object>} — map of contentId → value
   */
  function loadEdits(sectionId) {
    return DB.getAll('edits').then(function (allEdits) {
      var map = {};
      for (var i = 0; i < allEdits.length; i++) {
        var edit = allEdits[i];
        // Match edits whose id starts with the sectionId prefix
        if (edit.id && edit.id.indexOf(sectionId + '-') === 0) {
          map[edit.id] = edit.value;
        }
      }
      return map;
    });
  }

  /**
   * Reset a piece of content to its original value.
   * Deletes the edit from IndexedDB and returns the original value
   * so the caller can update the DOM.
   *
   * @param {string} contentId
   * @returns {Promise<string|undefined>} — the original value, or undefined
   */
  function reset(contentId) {
    return DB.get('edits', contentId).then(function (edit) {
      var originalValue = edit ? edit.originalValue : undefined;
      return DB.delete('edits', contentId).then(function () {
        return originalValue;
      });
    });
  }

  /* ---- Public API ---- */
  return {
    make:      make,
    loadEdits: loadEdits,
    reset:     reset
  };
})();
