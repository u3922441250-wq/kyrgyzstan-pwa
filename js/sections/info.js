/**
 * info.js — Info Generali
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderInfo()
 * Enhanced: editable content blocks with reset support
 */

function renderInfo() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">ℹ️ Info Generali</h2>';

  // Documents
  html += '<details open><summary>📄 Documenti</summary><div class="details-content">';
  html += '<div id="info-documenti">';
  html += '<ul style="padding-left:18px;">';
  for (var d = 0; d < GENERAL_INFO.documenti.length; d++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.documenti[d] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-documenti" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Vehicle info
  var v = GENERAL_INFO.veicolo;
  html += '<details><summary>🚗 Veicolo</summary><div class="details-content">';
  html += '<div id="info-veicolo">';
  html += '<p><strong>Modello:</strong> ' + v.modello + '</p>';
  html += '<p><strong>Noleggio:</strong> ' + v.noleggio + '</p>';
  html += '<p><strong>Ritiro:</strong> ' + v.ritiro + '</p>';
  html += '<p><strong>Restituzione:</strong> ' + v.restituzione + '</p>';
  html += '<p><strong>Carburante:</strong> ' + v.carburante + '</p>';
  html += '<h4 style="margin:10px 0 6px;">Note:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var n = 0; n < v.note.length; n++) {
    html += '<li style="margin-bottom:4px;">' + v.note[n] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-veicolo" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Money tips
  html += '<details><summary>💰 Soldi e ATM</summary><div class="details-content">';
  html += '<div id="info-soldi">';
  html += '<ul style="padding-left:18px;">';
  for (var m = 0; m < GENERAL_INFO.soldi.length; m++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.soldi[m] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-soldi" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Recommended apps
  html += '<details><summary>📱 App Consigliate</summary><div class="details-content">';
  html += '<div id="info-app">';
  for (var a = 0; a < GENERAL_INFO.appConsigliate.length; a++) {
    var app = GENERAL_INFO.appConsigliate[a];
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);">';
    html += '<strong>' + app.nome + '</strong>';
    html += '<p style="font-size:0.9rem;margin:2px 0 0;">' + app.descrizione + '</p>';
    html += '</div>';
  }
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-app" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Bishkek shopping list
  html += '<details><summary>🛒 Shopping Bishkek</summary><div class="details-content">';
  html += '<div id="info-shopping">';
  html += '<ul style="padding-left:18px;">';
  for (var s = 0; s < GENERAL_INFO.shoppingBishkek.length; s++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.shoppingBishkek[s] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-shopping" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  wrapper.innerHTML = html;

  // Make each content block editable after DOM is ready
  setTimeout(function () {
    var sections = ['info-documenti', 'info-veicolo', 'info-soldi', 'info-app', 'info-shopping'];
    for (var i = 0; i < sections.length; i++) {
      (function (sectionId) {
        var el = document.getElementById(sectionId);
        if (!el) return;
        var originalHtml = el.innerHTML;

        // Load saved edit
        DB.get('edits', sectionId).then(function (record) {
          if (record && record.value) {
            el.innerHTML = record.value;
          }
          Editable.make(el, sectionId, originalHtml);

          // Show reset button when modified
          var resetBtn = el.parentElement.querySelector('.info-reset-btn[data-section="' + sectionId + '"]');
          if (resetBtn) {
            function checkModified() {
              if (el.innerHTML.trim() !== originalHtml.trim()) {
                resetBtn.style.display = '';
              } else {
                resetBtn.style.display = 'none';
              }
            }
            el.addEventListener('input', checkModified);
            checkModified();

            resetBtn.addEventListener('click', function () {
              Editable.reset(sectionId).then(function () {
                el.innerHTML = originalHtml;
                el.classList.remove('modified');
                resetBtn.style.display = 'none';
                showToast('Ripristinato ✓');
              });
            });
          }
        });
      })(sections[i]);
    }
  }, 0);

  return wrapper;
}
