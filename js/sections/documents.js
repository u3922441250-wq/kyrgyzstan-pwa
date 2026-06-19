/**
 * documents.js — Documenti di Viaggio
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderDocuments()
 * Sezione per gestire copie digitali dei documenti personali
 */

var TRAVEL_DOCUMENTS = [
  {
    id: 'passport',
    icon: '🛂',
    label: 'Passaporto',
    fields: [
      { key: 'numero', label: 'Numero' },
      { key: 'scadenza', label: 'Scadenza', type: 'date' },
      { key: 'rilascio', label: 'Data rilascio', type: 'date' },
      { key: 'autorita', label: 'Autorità rilascio' }
    ]
  },
  {
    id: 'id_card',
    icon: '🪪',
    label: 'Carta d\'Identità',
    fields: [
      { key: 'numero', label: 'Numero' },
      { key: 'scadenza', label: 'Scadenza', type: 'date' },
      { key: 'comune', label: 'Comune rilascio' }
    ]
  },
  {
    id: 'driving_license',
    icon: '🚗',
    label: 'Patente di Guida',
    fields: [
      { key: 'numero', label: 'Numero' },
      { key: 'scadenza', label: 'Scadenza', type: 'date' },
      { key: 'categorie', label: 'Categorie' },
      { key: 'internazionale', label: 'Patente internazionale', type: 'boolean' }
    ]
  },
  {
    id: 'health_insurance',
    icon: '🏥',
    label: 'Assicurazione Sanitaria',
    fields: [
      { key: 'compagnia', label: 'Compagnia' },
      { key: 'polizza', label: 'N° Polizza' },
      { key: 'scadenza', label: 'Scadenza', type: 'date' },
      { key: 'telefono', label: 'Tel. emergenza' },
      { key: 'copertura', label: 'Copertura' }
    ]
  },
  {
    id: 'car_rental',
    icon: '📋',
    label: 'Noleggio Auto',
    fields: [
      { key: 'agenzia', label: 'Agenzia' },
      { key: 'contratto', label: 'N° Contratto' },
      { key: 'targa', label: 'Targa veicolo' },
      { key: 'ritiro', label: 'Data ritiro', type: 'date' },
      { key: 'restituzione', label: 'Data restituzione', type: 'date' },
      { key: 'telefono', label: 'Tel. agenzia' }
    ]
  },
  {
    id: 'travel_insurance',
    icon: '✈️',
    label: 'Assicurazione Viaggio',
    fields: [
      { key: 'compagnia', label: 'Compagnia' },
      { key: 'polizza', label: 'N° Polizza' },
      { key: 'scadenza', label: 'Scadenza', type: 'date' },
      { key: 'telefono', label: 'Tel. emergenza' },
      { key: 'note', label: 'Note' }
    ]
  },
  {
    id: 'border_permit',
    icon: '🏔️',
    label: 'Permesso Zona di Confine',
    fields: [
      { key: 'numero', label: 'Numero permesso' },
      { key: 'validita', label: 'Validità', type: 'date' },
      { key: 'zone', label: 'Zone autorizzate' },
      { key: 'note', label: 'Note' }
    ]
  }
];

function renderDocuments() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">📄 Documenti di Viaggio</h2>';

  // Checklist rapida
  html += '<div class="card" style="margin-bottom:16px;">';
  html += '<div class="card-title">✅ Checklist Documenti</div>';
  html += '<div id="doc-checklist">';
  for (var c = 0; c < TRAVEL_DOCUMENTS.length; c++) {
    var doc = TRAVEL_DOCUMENTS[c];
    html += '<label style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--color-border);cursor:pointer;">';
    html += '<input type="checkbox" class="doc-check" data-doc="' + doc.id + '" style="width:18px;height:18px;">';
    html += '<span>' + doc.icon + ' ' + doc.label + '</span>';
    html += '</label>';
  }
  html += '</div></div>';

  // Dettagli per ogni documento
  for (var i = 0; i < TRAVEL_DOCUMENTS.length; i++) {
    var d = TRAVEL_DOCUMENTS[i];
    var isFirst = i === 0;
    html += '<details' + (isFirst ? ' open' : '') + '><summary>' + d.icon + ' ' + d.label + '</summary>';
    html += '<div class="details-content">';

    for (var f = 0; f < d.fields.length; f++) {
      var field = d.fields[f];
      var inputId = 'doc-' + d.id + '-' + field.key;

      html += '<div class="form-group" style="margin-bottom:10px;">';
      html += '<label class="form-label" for="' + inputId + '">' + field.label + '</label>';

      if (field.type === 'boolean') {
        html += '<select class="form-select doc-field" id="' + inputId + '" data-doc="' + d.id + '" data-field="' + field.key + '">';
        html += '<option value="">— Seleziona —</option>';
        html += '<option value="si">Sì</option>';
        html += '<option value="no">No</option>';
        html += '</select>';
      } else if (field.type === 'date') {
        html += '<input type="date" class="form-select doc-field" id="' + inputId + '" data-doc="' + d.id + '" data-field="' + field.key + '">';
      } else {
        html += '<input type="text" class="form-select doc-field" id="' + inputId + '" data-doc="' + d.id + '" data-field="' + field.key + '" placeholder="Inserisci ' + field.label.toLowerCase() + '">';
      }
      html += '</div>';
    }

    // Foto documento
    html += '<div class="form-group" style="margin-bottom:10px;">';
    html += '<label class="form-label">' + '📷 Foto documento' + '</label>';
    html += '<input type="file" accept="image/*" class="doc-photo-input" data-doc="' + d.id + '" style="display:none;" id="photo-input-' + d.id + '">';
    html += '<button class="btn btn-sm btn-secondary" type="button" onclick="document.getElementById(\'photo-input-' + d.id + '\').click()">📷 Scatta / Carica foto</button>';
    html += '<div id="photo-preview-' + d.id + '" style="margin-top:8px;"></div>';
    html += '</div>';

    // PDF documento (offline)
    html += '<div class="form-group" style="margin-bottom:10px;">';
    html += '<label class="form-label">📄 PDF documento (salvato offline)</label>';
    html += '<input type="file" accept="application/pdf" class="doc-pdf-input" data-doc="' + d.id + '" style="display:none;" id="pdf-input-' + d.id + '">';
    html += '<button class="btn btn-sm btn-secondary" type="button" onclick="document.getElementById(\'pdf-input-' + d.id + '\').click()">📄 Carica PDF</button>';
    html += '<div id="pdf-preview-' + d.id + '" style="margin-top:8px;"></div>';
    html += '</div>';

    html += '</div></details>';
  }

  // Note generali
  html += '<details><summary>📝 Note</summary>';
  html += '<div class="details-content">';
  html += '<textarea id="doc-notes" class="form-select" rows="4" placeholder="Note aggiuntive sui documenti..." style="resize:vertical;font-family:inherit;"></textarea>';
  html += '</div></details>';

  wrapper.innerHTML = html;

  // Init: carica dati salvati e bind eventi
  setTimeout(function () {
    // Carica checklist
    for (var dc = 0; dc < TRAVEL_DOCUMENTS.length; dc++) {
      (function(doc) {
        DB.get('documents', 'check-' + doc.id).then(function (rec) {
          var cb = wrapper.querySelector('.doc-check[data-doc="' + doc.id + '"]');
          if (cb && rec && rec.value) cb.checked = true;
        });
      })(TRAVEL_DOCUMENTS[dc]);
    }

    // Salva checklist on change
    var docChecks = wrapper.querySelectorAll('.doc-check');
    for (var dci = 0; dci < docChecks.length; dci++) {
      docChecks[dci].addEventListener('change', function () {
        DB.put('documents', { id: 'check-' + this.dataset.doc, value: this.checked });
      });
    }

    // Carica campi salvati
    var docFields = wrapper.querySelectorAll('.doc-field');
    for (var dfi = 0; dfi < docFields.length; dfi++) {
      (function(input) {
        var key = 'field-' + input.dataset.doc + '-' + input.dataset.field;
        DB.get('documents', key).then(function (rec) {
          if (rec && rec.value) input.value = rec.value;
        });
        input.addEventListener('change', function () {
          DB.put('documents', { id: 'field-' + this.dataset.doc + '-' + this.dataset.field, value: this.value });
          showToast('Salvato ✓');
        });
      })(docFields[dfi]);
    }

    // Carica note
    DB.get('documents', 'notes').then(function (rec) {
      var ta = document.getElementById('doc-notes');
      if (ta && rec && rec.value) ta.value = rec.value;
    });
    var notesEl = document.getElementById('doc-notes');
    if (notesEl) {
      notesEl.addEventListener('change', function () {
        DB.put('documents', { id: 'notes', value: this.value });
        showToast('Note salvate ✓');
      });
    }

    // Foto documenti
    var photoInputs = wrapper.querySelectorAll('.doc-photo-input');
    for (var pi = 0; pi < photoInputs.length; pi++) {
      (function(input) {
        var docId = input.dataset.doc;
        DB.get('documents', 'photo-' + docId).then(function (rec) {
          if (rec && rec.value) {
            showPhotoPreview(docId, rec.value);
          }
        });
        input.addEventListener('change', function () {
          var file = this.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function (e) {
            var dataUrl = e.target.result;
            DB.put('documents', { id: 'photo-' + docId, value: dataUrl });
            showPhotoPreview(docId, dataUrl);
            showToast('Foto salvata ✓');
          };
          reader.readAsDataURL(file);
        });
      })(photoInputs[pi]);
    }

    // PDF documenti (salvati offline in IndexedDB)
    var pdfInputs = wrapper.querySelectorAll('.doc-pdf-input');
    for (var pdi = 0; pdi < pdfInputs.length; pdi++) {
      (function(input) {
        var docId = input.dataset.doc;
        DB.get('documents', 'pdf-' + docId).then(function (rec) {
          if (rec && rec.value) {
            showPdfPreview(docId, rec.value.name, rec.value.size);
          }
        });
        input.addEventListener('change', function () {
          var file = this.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function (e) {
            var dataUrl = e.target.result;
            DB.put('documents', { id: 'pdf-' + docId, value: { data: dataUrl, name: file.name, size: file.size } });
            showPdfPreview(docId, file.name, file.size);
            showToast('PDF salvato offline ✓');
          };
          reader.readAsDataURL(file);
        });
      })(pdfInputs[pdi]);
    }
  }, 0);

  return wrapper;
}

function showPhotoPreview(docId, dataUrl) {
  var preview = document.getElementById('photo-preview-' + docId);
  if (!preview) return;
  preview.innerHTML = '<img src="' + dataUrl + '" style="max-width:100%;border-radius:8px;margin-top:4px;" alt="Foto documento">' +
    '<br><button class="btn btn-sm btn-secondary" type="button" style="margin-top:6px;" onclick="deleteDocPhoto(\'' + docId + '\')">🗑️ Rimuovi foto</button>';
}

function deleteDocPhoto(docId) {
  DB.put('documents', { id: 'photo-' + docId, value: null }).then(function () {
    var preview = document.getElementById('photo-preview-' + docId);
    if (preview) preview.innerHTML = '';
    showToast('Foto rimossa ✓');
  });
}

function showPdfPreview(docId, fileName, fileSize) {
  var preview = document.getElementById('pdf-preview-' + docId);
  if (!preview) return;
  var sizeStr = fileSize > 1024 * 1024 ? (fileSize / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(fileSize / 1024) + ' KB';
  preview.innerHTML = '<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--color-card);border:1px solid var(--color-border);border-radius:8px;">' +
    '<span style="font-size:1.5rem;">📄</span>' +
    '<div style="flex:1;"><div style="font-size:0.85rem;font-weight:600;">' + fileName + '</div>' +
    '<div style="font-size:0.7rem;opacity:0.6;">' + sizeStr + ' • Salvato offline ✅</div></div>' +
    '<button class="btn btn-sm btn-primary" type="button" onclick="viewPdfOffline(\'' + docId + '\')" style="font-size:0.75rem;">👁️ Apri</button>' +
    '<button class="btn btn-sm btn-secondary" type="button" onclick="deleteDocPdf(\'' + docId + '\')" style="font-size:0.75rem;">🗑️</button>' +
    '</div>';
}

function viewPdfOffline(docId) {
  DB.get('documents', 'pdf-' + docId).then(function (rec) {
    if (!rec || !rec.value || !rec.value.data) {
      showToast('PDF non trovato');
      return;
    }
    // In-app PDF viewer — works offline, no window.open crash on mobile PWAs
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:400;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;';
    overlay.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;flex-shrink:0;">' +
        '<span style="color:#fff;font-size:0.9rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">' + rec.value.name + '</span>' +
        '<div style="display:flex;gap:8px;">' +
          '<button id="pdf-download-btn" type="button" style="width:40px;height:40px;border:none;background:rgba(255,255,255,0.15);color:#fff;font-size:1rem;border-radius:50%;cursor:pointer;">⬇️</button>' +
          '<button id="pdf-close-btn" type="button" style="width:40px;height:40px;border:none;background:rgba(255,255,255,0.15);color:#fff;font-size:1.2rem;border-radius:50%;cursor:pointer;">✕</button>' +
        '</div>' +
      '</div>' +
      '<div style="flex:1;overflow:auto;-webkit-overflow-scrolling:touch;">' +
        '<iframe id="pdf-iframe" style="width:100%;height:100%;border:none;" sandbox="allow-same-origin"></iframe>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Set iframe src to the data URL
    var iframe = overlay.querySelector('#pdf-iframe');
    try {
      iframe.src = rec.value.data;
    } catch(e) {
      // If iframe fails (some mobile browsers), show download option
      iframe.parentElement.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;padding:20px;text-align:center;">' +
          '<p style="font-size:1.2rem;margin-bottom:12px;">📄 ' + rec.value.name + '</p>' +
          '<p style="opacity:0.7;margin-bottom:16px;">Il browser non supporta la visualizzazione PDF inline. Scarica il file per visualizzarlo.</p>' +
          '<button id="pdf-fallback-dl" type="button" style="padding:12px 24px;background:#e8732a;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;">⬇️ Scarica PDF</button>' +
        '</div>';
      overlay.querySelector('#pdf-fallback-dl').addEventListener('click', function() {
        downloadPdfData(rec.value.data, rec.value.name);
      });
    }

    // Close
    overlay.querySelector('#pdf-close-btn').addEventListener('click', function() {
      overlay.remove();
      document.body.style.overflow = '';
    });

    // Download
    var dlBtn = overlay.querySelector('#pdf-download-btn');
    if (dlBtn) {
      dlBtn.addEventListener('click', function() {
        downloadPdfData(rec.value.data, rec.value.name);
      });
    }
  });
}

function downloadPdfData(dataUrl, fileName) {
  var a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName || 'document.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Download avviato ✓');
}

function deleteDocPdf(docId) {
  DB.put('documents', { id: 'pdf-' + docId, value: null }).then(function () {
    var preview = document.getElementById('pdf-preview-' + docId);
    if (preview) preview.innerHTML = '';
    showToast('PDF rimosso ✓');
  });
}
