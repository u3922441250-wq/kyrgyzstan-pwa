/**
 * checklist.js — Checklist Equipaggiamento
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderChecklist(), filterItems(), categoryProgress()
 */

/**
 * Filter checklist items by search query (case-insensitive).
 * @param {Array<{name: string}>} items
 * @param {string} query
 * @returns {Array}
 */
function filterItems(items, query) {
  if (!query || query.trim() === '') return items;
  var q = query.toLowerCase();
  return items.filter(function (item) {
    return item.name.toLowerCase().indexOf(q) !== -1;
  });
}

/**
 * Calculate progress percentage for a list of items.
 * @param {Array<{checked: boolean}>} items
 * @returns {number} 0-100
 */
function categoryProgress(items) {
  if (!items || items.length === 0) return 0;
  var checked = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].checked) checked++;
  }
  return (checked / items.length) * 100;
}

function renderChecklist() {
  return new Promise(function (resolve) {
    // Build flat item list with category and index
    var categories = Object.keys(CHECKLIST);
    var allItems = [];
    for (var c = 0; c < categories.length; c++) {
      var cat = categories[c];
      var items = CHECKLIST[cat];
      for (var i = 0; i < items.length; i++) {
        allItems.push({
          name: items[i],
          category: cat,
          index: i,
          id: cat + '-' + i,
          checked: false
        });
      }
    }

    // Load all checkbox states from DB
    DB.getAll('checklist').then(function (saved) {
      var stateMap = {};
      for (var s = 0; s < saved.length; s++) {
        stateMap[saved[s].id] = saved[s].checked;
      }
      // Apply saved states
      for (var j = 0; j < allItems.length; j++) {
        if (stateMap[allItems[j].id] === true) {
          allItems[j].checked = true;
        }
      }

      var wrapper = document.createElement('div');
      wrapper.className = 'section-content fade-in';

      function renderContent(query) {
        var filtered = filterItems(allItems, query);

        // Overall progress
        var totalChecked = 0;
        for (var t = 0; t < allItems.length; t++) {
          if (allItems[t].checked) totalChecked++;
        }
        var overallPct = allItems.length > 0 ? Math.round((totalChecked / allItems.length) * 100) : 0;

        var html = '<h2 class="section-title">✅ Checklist Equipaggiamento</h2>';
        html += '<input class="search-input" type="text" id="checklist-search" placeholder="Cerca item..." value="' + (query || '') + '">';
        html += '<div style="margin:10px 0;">';
        html += '<div class="progress-bar"><div class="progress-fill" style="width:' + overallPct + '%"></div></div>';
        html += '<div class="progress-text">' + totalChecked + ' / ' + allItems.length + ' (' + overallPct + '%)</div>';
        html += '</div>';

        // Group filtered items by category
        var catGroups = {};
        for (var f = 0; f < filtered.length; f++) {
          var item = filtered[f];
          if (!catGroups[item.category]) catGroups[item.category] = [];
          catGroups[item.category].push(item);
        }

        var catNames = {
          auto: '🚗 Auto', dormire: '🛏️ Dormire', cucina: '🍳 Cucina',
          vestiti: '👕 Vestiti', salute: '💊 Salute', tech: '📱 Tech',
          foto: '📷 Foto/Drone', varie: '🎒 Varie', regali: '🎁 Regali'
        };

        for (var ci = 0; ci < categories.length; ci++) {
          var catKey = categories[ci];
          var group = catGroups[catKey];
          if (!group || group.length === 0) continue;

          var catPct = Math.round(categoryProgress(group));
          var catLabel = catNames[catKey] || catKey;

          html += '<details class="details">';
          html += '<summary>' + catLabel + ' <span class="badge badge-info" style="margin-left:auto;">' + catPct + '%</span></summary>';
          html += '<div class="details-content">';
          html += '<div class="progress-bar" style="margin-bottom:8px;"><div class="progress-fill" style="width:' + catPct + '%"></div></div>';

          for (var gi = 0; gi < group.length; gi++) {
            var it = group[gi];
            var checkedAttr = it.checked ? ' checked' : '';
            var checkedClass = it.checked ? ' checked' : '';
            html += '<label class="checklist-item' + checkedClass + '">';
            html += '<input type="checkbox" data-id="' + it.id + '"' + checkedAttr + '>';
            html += '<span>' + it.name + '</span></label>';
          }

          html += '</div></details>';
        }

        wrapper.innerHTML = html;

        // Attach search handler
        var searchInput = wrapper.querySelector('#checklist-search');
        if (searchInput) {
          searchInput.addEventListener('input', function () {
            renderContent(this.value);
            // Re-focus and restore cursor
            var si = wrapper.querySelector('#checklist-search');
            if (si) si.focus();
          });
        }

        // Attach checkbox handlers
        var checkboxes = wrapper.querySelectorAll('input[type="checkbox"][data-id]');
        for (var cb = 0; cb < checkboxes.length; cb++) {
          checkboxes[cb].addEventListener('change', function () {
            var itemId = this.getAttribute('data-id');
            var isChecked = this.checked;
            // Update local state
            for (var u = 0; u < allItems.length; u++) {
              if (allItems[u].id === itemId) {
                allItems[u].checked = isChecked;
                break;
              }
            }
            // Save to DB
            DB.put('checklist', { id: itemId, checked: isChecked, updatedAt: Date.now() });
            // Re-render to update progress
            var currentQuery = wrapper.querySelector('#checklist-search');
            renderContent(currentQuery ? currentQuery.value : '');
          });
        }
      }

      renderContent('');
      resolve(wrapper);
    });
  });
}
