/**
 * checklist.js — Checklist Equipaggiamento
 * Kyrgyzstan Travel PWA 2026
 *
 * CRUD: aggiungere, eliminare, rinominare items
 * Sync via IndexedDB (offline-first)
 * Global: renderChecklist(), filterItems(), categoryProgress()
 */

function filterItems(items, query) {
  if (!query || query.trim() === '') return items;
  var q = query.toLowerCase();
  return items.filter(function (item) {
    return item.name.toLowerCase().indexOf(q) !== -1;
  });
}

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
    var categories = Object.keys(CHECKLIST);
    var catNames = {
      auto: '🚗 Auto', dormire: '🛏️ Dormire', cucina: '🍳 Cucina',
      vestiti: '👕 Vestiti', salute: '💊 Salute', tech: '📱 Tech',
      foto: '📷 Foto/Drone', varie: '🎒 Varie', regali: '🎁 Regali'
    };

    // Load custom items (added by user) and deleted items from DB
    Promise.all([
      DB.get('checklist', '__custom_items__'),
      DB.get('checklist', '__deleted_items__'),
      DB.get('checklist', '__renamed_items__'),
      DB.getAll('checklist')
    ]).then(function (results) {
      var customRec = results[0];
      var deletedRec = results[1];
      var renamedRec = results[2];
      var savedStates = results[3];

      // Custom items per category: { catKey: [{name, id}] }
      var customItems = (customRec && customRec.value) ? customRec.value : {};
      // Deleted item IDs: ['auto-3', 'custom-vestiti-0', ...]
      var deletedIds = (deletedRec && deletedRec.value) ? deletedRec.value : [];
      // Renamed items: { 'auto-3': 'New name', ... }
      var renamedItems = (renamedRec && renamedRec.value) ? renamedRec.value : {};

      // Build state map for checkboxes
      var stateMap = {};
      for (var s = 0; s < savedStates.length; s++) {
        if (savedStates[s].id && savedStates[s].id.indexOf('__') !== 0) {
          stateMap[savedStates[s].id] = savedStates[s].checked;
        }
      }

      // Build full item list (default + custom, minus deleted)
      function buildAllItems() {
        var allItems = [];
        for (var c = 0; c < categories.length; c++) {
          var cat = categories[c];
          var items = CHECKLIST[cat];
          for (var i = 0; i < items.length; i++) {
            var id = cat + '-' + i;
            if (deletedIds.indexOf(id) !== -1) continue;
            var name = renamedItems[id] || items[i];
            allItems.push({ name: name, category: cat, id: id, checked: !!stateMap[id], isCustom: false });
          }
          // Add custom items for this category
          var customs = customItems[cat] || [];
          for (var ci = 0; ci < customs.length; ci++) {
            var cid = 'custom-' + cat + '-' + ci;
            if (deletedIds.indexOf(cid) !== -1) continue;
            var cname = renamedItems[cid] || customs[ci];
            allItems.push({ name: cname, category: cat, id: cid, checked: !!stateMap[cid], isCustom: true });
          }
        }
        return allItems;
      }

      var allItems = buildAllItems();
      var wrapper = document.createElement('div');
      wrapper.className = 'section-content fade-in';

      function saveCustomItems() {
        DB.put('checklist', { id: '__custom_items__', value: customItems });
      }
      function saveDeletedIds() {
        DB.put('checklist', { id: '__deleted_items__', value: deletedIds });
      }
      function saveRenamedItems() {
        DB.put('checklist', { id: '__renamed_items__', value: renamedItems });
      }

      function renderContent(query) {
        allItems = buildAllItems();
        var filtered = filterItems(allItems, query);

        var totalChecked = 0;
        for (var t = 0; t < allItems.length; t++) {
          if (allItems[t].checked) totalChecked++;
        }
        var overallPct = allItems.length > 0 ? Math.round((totalChecked / allItems.length) * 100) : 0;

        var html = '<h2 class="section-title">✅ Checklist Equipaggiamento</h2>';
        html += '<input class="search-input" type="text" id="checklist-search" placeholder="🔍 Cerca item..." value="' + (query || '') + '">';
        html += '<div style="margin:10px 0;">';
        html += '<div class="progress-bar"><div class="progress-fill" style="width:' + overallPct + '%"></div></div>';
        html += '<div class="progress-text">' + totalChecked + ' / ' + allItems.length + ' (' + overallPct + '%)</div>';
        html += '</div>';

        // Add new item UI
        html += '<div class="card" style="margin-bottom:12px;padding:10px;">';
        html += '<div style="display:flex;gap:6px;align-items:center;">';
        html += '<input type="text" class="form-select" id="cl-new-item" placeholder="Nuovo item..." style="flex:1;min-height:36px;">';
        html += '<select class="form-select" id="cl-new-cat" style="width:auto;min-height:36px;font-size:0.8rem;">';
        for (var ci2 = 0; ci2 < categories.length; ci2++) {
          html += '<option value="' + categories[ci2] + '">' + (catNames[categories[ci2]] || categories[ci2]) + '</option>';
        }
        html += '</select>';
        html += '<button class="btn btn-sm btn-primary" id="cl-add-btn" type="button" style="min-height:36px;padding:0 12px;">+</button>';
        html += '</div></div>';

        // Group filtered items by category
        var catGroups = {};
        for (var f = 0; f < filtered.length; f++) {
          var item = filtered[f];
          if (!catGroups[item.category]) catGroups[item.category] = [];
          catGroups[item.category].push(item);
        }

        for (var cIdx = 0; cIdx < categories.length; cIdx++) {
          var catKey = categories[cIdx];
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
            html += '<div class="checklist-item' + checkedClass + '" style="display:flex;align-items:center;gap:6px;padding:6px 4px;border-bottom:1px solid var(--color-border);">';
            html += '<input type="checkbox" data-id="' + it.id + '"' + checkedAttr + ' style="width:18px;height:18px;flex-shrink:0;">';
            html += '<span class="cl-item-name" data-id="' + it.id + '" style="flex:1;font-size:0.88rem;' + (it.checked ? 'text-decoration:line-through;opacity:0.5;' : '') + '">' + it.name + '</span>';
            html += '<button class="cl-rename-btn" data-id="' + it.id + '" type="button" style="border:none;background:none;font-size:0.8rem;padding:2px 4px;opacity:0.4;cursor:pointer;" title="Rinomina">✏️</button>';
            html += '<button class="cl-delete-btn" data-id="' + it.id + '" type="button" style="border:none;background:none;font-size:0.8rem;padding:2px 4px;opacity:0.4;cursor:pointer;color:#e74c3c;" title="Elimina">✕</button>';
            html += '</div>';
          }

          html += '</div></details>';
        }

        wrapper.innerHTML = html;
        attachHandlers(query);
      }

      function attachHandlers(query) {
        // Search
        var searchInput = wrapper.querySelector('#checklist-search');
        if (searchInput) {
          searchInput.addEventListener('input', function () {
            renderContent(this.value);
            var si = wrapper.querySelector('#checklist-search');
            if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
          });
        }

        // Add new item
        var addBtn = wrapper.querySelector('#cl-add-btn');
        var addInput = wrapper.querySelector('#cl-new-item');
        var addCat = wrapper.querySelector('#cl-new-cat');
        if (addBtn && addInput && addCat) {
          function doAdd() {
            var text = addInput.value.trim();
            if (!text) return;
            var cat = addCat.value;
            if (!customItems[cat]) customItems[cat] = [];
            customItems[cat].push(text);
            saveCustomItems();
            addInput.value = '';
            renderContent(query || '');
            showToast('Aggiunto: ' + text + ' ✓');
          }
          addBtn.addEventListener('click', doAdd);
          addInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') doAdd(); });
        }

        // Checkboxes
        var checkboxes = wrapper.querySelectorAll('input[type="checkbox"][data-id]');
        for (var cb = 0; cb < checkboxes.length; cb++) {
          checkboxes[cb].addEventListener('change', function () {
            var itemId = this.getAttribute('data-id');
            var isChecked = this.checked;
            stateMap[itemId] = isChecked;
            DB.put('checklist', { id: itemId, checked: isChecked, updatedAt: Date.now() });
            var currentQuery = wrapper.querySelector('#checklist-search');
            renderContent(currentQuery ? currentQuery.value : '');
          });
        }

        // Rename buttons
        var renameBtns = wrapper.querySelectorAll('.cl-rename-btn');
        for (var ri = 0; ri < renameBtns.length; ri++) {
          renameBtns[ri].addEventListener('click', function () {
            var itemId = this.getAttribute('data-id');
            var nameEl = wrapper.querySelector('.cl-item-name[data-id="' + itemId + '"]');
            if (!nameEl) return;
            var currentName = nameEl.textContent;
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.className = 'form-select';
            input.style.cssText = 'padding:4px 8px;min-height:30px;font-size:0.85rem;flex:1;';
            nameEl.style.display = 'none';
            nameEl.parentElement.insertBefore(input, nameEl.nextSibling);
            input.focus();
            input.select();
            function saveRename() {
              var val = input.value.trim();
              if (val && val !== currentName) {
                renamedItems[itemId] = val;
                saveRenamedItems();
                showToast('Rinominato ✓');
              }
              input.remove();
              nameEl.style.display = '';
              if (val) nameEl.textContent = val;
            }
            input.addEventListener('blur', saveRename);
            input.addEventListener('keydown', function (e) {
              if (e.key === 'Enter') { e.preventDefault(); saveRename(); }
              if (e.key === 'Escape') { input.remove(); nameEl.style.display = ''; }
            });
          });
        }

        // Delete buttons
        var deleteBtns = wrapper.querySelectorAll('.cl-delete-btn');
        for (var di = 0; di < deleteBtns.length; di++) {
          deleteBtns[di].addEventListener('click', function () {
            var itemId = this.getAttribute('data-id');
            var nameEl = wrapper.querySelector('.cl-item-name[data-id="' + itemId + '"]');
            var itemName = nameEl ? nameEl.textContent : '';
            if (!confirm('Eliminare "' + itemName + '"?')) return;
            deletedIds.push(itemId);
            saveDeletedIds();
            // Also remove from stateMap
            delete stateMap[itemId];
            DB.delete('checklist', itemId);
            var currentQuery = wrapper.querySelector('#checklist-search');
            renderContent(currentQuery ? currentQuery.value : '');
            showToast('Eliminato ✓');
          });
        }
      }

      renderContent('');
      resolve(wrapper);
    });
  });
}
