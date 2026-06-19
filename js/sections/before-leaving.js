/**
 * before-leaving.js — Before Leaving Checklist
 * Kyrgyzstan Travel PWA 2025
 *
 * Checklist per due persone (Leo & Edu) con toggle persona
 * Global: renderBeforeLeaving()
 */

var TRAVELERS = ['Leo', 'Edu'];

var BEFORE_LEAVING_ITEMS = [
  // Documenti
  { cat: '📄 Documenti', items: [
    'Passaporto (valido 6+ mesi)',
    'Carta d\'identità',
    'Patente di guida',
    'Patente internazionale',
    'Permesso zona di confine (Kel-Suu)',
    'Fotocopie documenti (separate dagli originali)',
    'Foto tessera extra (x2)',
    'Assicurazione sanitaria viaggio',
    'Assicurazione viaggio (annullamento/bagaglio)',
    'Prenotazione voli (stampa)',
    'Conferma noleggio auto',
    'Voucher alloggi (se prenotati)'
  ]},
  // Soldi
  { cat: '💰 Soldi', items: [
    'Carta di credito/debito principale',
    'Carta di backup (altra banca)',
    'Contanti EUR (€200-300 emergenza)',
    'Contanti USD ($100 emergenza)',
    'Avvisare banca del viaggio',
    'PIN carte memorizzato'
  ]},
  // Salute
  { cat: '🏥 Salute', items: [
    'Tessera sanitaria europea (TEAM)',
    'Farmaci personali (scorta extra)',
    'Kit primo soccorso',
    'Diamox (mal di montagna)',
    'Ibuprofene / Paracetamolo',
    'Antidiarroici (Imodium)',
    'Elettroliti / sali reidratanti',
    'Crema solare SPF50+',
    'Balsamo labbra SPF',
    'Repellente insetti',
    'Cerotti / bende',
    'Disinfettante mani'
  ]},
  // Tecnologia
  { cat: '📱 Tecnologia', items: [
    'Telefono + caricatore',
    'Power bank (20000+ mAh)',
    'Adattatore presa (tipo C/F)',
    'Cavo USB extra',
    'Drone + batterie + caricatore',
    'Action cam / fotocamera',
    'Schede SD extra',
    'Mappe offline scaricate (Organic Maps)',
    'PeakVisor mappe 3D scaricate',
    'App traduttore offline (Google Translate)',
    'Torcia frontale + batterie'
  ]},
  // Abbigliamento
  { cat: '👕 Abbigliamento', items: [
    'Giacca impermeabile / guscio',
    'Pile / fleece caldo',
    'Piumino leggero',
    'Pantaloni trekking (x2)',
    'Magliette tecniche (x4)',
    'Intimo termico',
    'Calzini trekking (x4)',
    'Scarponi trekking (rodati!)',
    'Sandali / ciabatte',
    'Cappello sole',
    'Berretto caldo',
    'Guanti leggeri',
    'Occhiali da sole (UV400)',
    'Buff / scaldacollo'
  ]},
  // Equipaggiamento
  { cat: '🎒 Equipaggiamento', items: [
    'Zaino da giorno (20-30L)',
    'Borraccia / thermos',
    'Sacco a pelo (comfort 0°C)',
    'Materassino (se camping)',
    'Bastoncini trekking',
    'Coltellino multiuso',
    'Sacchetti impermeabili (dry bag)',
    'Lucchetto bagaglio',
    'Tappi orecchie + mascherina sonno'
  ]},
  // Auto
  { cat: '🚗 Auto (da comprare a Bishkek)', items: [
    'Tanica benzina (10-20L)',
    'Compressore portatile',
    'Corda traino',
    'Cavi batteria',
    'Kit riparazione gomme',
    'Olio motore extra',
    'Antigelo',
    'Acqua per radiatore',
    'Pala pieghevole'
  ]},
  // Cibo
  { cat: '🍫 Scorte Cibo', items: [
    'Barrette energetiche',
    'Frutta secca / noci',
    'Cioccolato',
    'Bustine tè / caffè',
    'Pastiglie purificazione acqua',
    'Snack salati'
  ]},
  // Varie
  { cat: '📋 Varie', items: [
    'Assicurazione auto verificata',
    'Numeri emergenza salvati',
    'Contatti ambasciata italiana',
    'Avvisato famiglia dell\'itinerario',
    'Backup foto documenti su cloud',
    'Registrazione su Viaggiare Sicuri (Farnesina)'
  ]}
];

var DEADLINE_TABLE = [
  { item: 'Permesso zona di confine (Kel-Suu / Sary-Jaz)', deadline: '2026-05-09', leadDays: 21, note: 'Richiedere almeno 3 settimane prima' },
  { item: 'Assicurazione viaggio', deadline: '2026-05-16', leadDays: 14, note: 'Attivare 2 settimane prima' },
  { item: 'Patente internazionale', deadline: '2026-05-09', leadDays: 21, note: 'Richiedere in motorizzazione (3 sett.)' },
  { item: 'Prenotazione voli', deadline: '2026-04-30', leadDays: 30, note: 'Confermare e stampare' },
  { item: 'Avvisare banca del viaggio', deadline: '2026-05-23', leadDays: 7, note: '1 settimana prima' },
  { item: 'Scaricare mappe offline', deadline: '2026-05-28', leadDays: 2, note: 'Organic Maps + PeakVisor' },
  { item: 'Registrazione Viaggiare Sicuri', deadline: '2026-05-23', leadDays: 7, note: 'Farnesina' },
  { item: 'Vaccini / profilassi', deadline: '2026-05-02', leadDays: 28, note: 'Consultare medico 4 sett. prima' },
  { item: 'Noleggio auto confermato', deadline: '2026-05-16', leadDays: 14, note: 'Russian Troika Bishkek' },
  { item: 'Diamox (mal di montagna)', deadline: '2026-05-16', leadDays: 14, note: 'Ricetta medica necessaria' },
  { item: 'Cambio spazzolino', deadline: '2026-05-29', leadDays: 1, note: 'Giorno prima' },
  { item: 'Caricare power bank', deadline: '2026-05-29', leadDays: 1, note: 'Giorno prima' },
  { item: 'Backup documenti su cloud', deadline: '2026-05-29', leadDays: 1, note: 'Giorno prima' },
  { item: 'Controllare validità passaporto (6+ mesi)', deadline: '2026-05-09', leadDays: 21, note: 'Deve scadere dopo dic 2026' },
  { item: 'Fotocopie documenti', deadline: '2026-05-28', leadDays: 2, note: 'Separate dagli originali' },
  { item: 'Contanti EUR + USD', deadline: '2026-05-28', leadDays: 2, note: '€200-300 + $100' }
];

function renderBeforeLeaving() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">🧳 Before Leaving</h2>';

  // === DEADLINE TABLE ===
  html += '<details open><summary>📅 Scadenze & Preparativi</summary>';
  html += '<div class="details-content">';
  html += '<div style="overflow-x:auto;">';
  html += '<table style="width:100%;border-collapse:collapse;font-size:0.82rem;">';
  html += '<thead><tr style="background:var(--color-accent);color:#fff;">';
  html += '<th style="padding:8px 6px;text-align:left;border-radius:8px 0 0 0;">Cosa</th>';
  html += '<th style="padding:8px 6px;text-align:center;">Entro il</th>';
  html += '<th style="padding:8px 6px;text-align:center;">Anticipo</th>';
  html += '<th style="padding:8px 6px;text-align:left;border-radius:0 8px 0 0;">Note</th>';
  html += '</tr></thead><tbody>';

  var today = new Date();
  today.setHours(0,0,0,0);
  // Sort by deadline
  var sorted = DEADLINE_TABLE.slice().sort(function(a,b){ return a.deadline < b.deadline ? -1 : 1; });
  for (var di = 0; di < sorted.length; di++) {
    var d = sorted[di];
    var deadlineDate = new Date(d.deadline + 'T00:00:00');
    var daysLeft = Math.ceil((deadlineDate - today) / (1000*60*60*24));
    var rowColor = '';
    var statusIcon = '';
    if (daysLeft < 0) { rowColor = 'background:rgba(231,76,60,0.1);'; statusIcon = '❌'; }
    else if (daysLeft <= 3) { rowColor = 'background:rgba(231,76,60,0.08);'; statusIcon = '🔴'; }
    else if (daysLeft <= 7) { rowColor = 'background:rgba(243,156,18,0.08);'; statusIcon = '🟡'; }
    else { statusIcon = '🟢'; }
    html += '<tr style="border-bottom:1px solid var(--color-border);' + rowColor + '">';
    html += '<td style="padding:7px 6px;">' + statusIcon + ' ' + d.item + '</td>';
    html += '<td style="padding:7px 6px;text-align:center;white-space:nowrap;">' + d.deadline.slice(5) + '</td>';
    html += '<td style="padding:7px 6px;text-align:center;">' + d.leadDays + 'gg</td>';
    html += '<td style="padding:7px 6px;font-size:0.75rem;opacity:0.7;">' + d.note + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  html += '<div style="margin-top:8px;font-size:0.7rem;opacity:0.5;">🟢 OK · 🟡 &lt;7gg · 🔴 &lt;3gg · ❌ Scaduto</div>';
  html += '</div></details>';

  // Person selector — rounded rectangle split in half
  html += '<div class="person-selector" id="person-selector">';
  html += '<button class="person-btn active" data-person="0" type="button">Leo</button>';
  html += '<button class="person-btn" data-person="1" type="button">Edu</button>';
  html += '</div>';

  // Progress
  html += '<div style="margin:12px 0;">';
  html += '<div class="progress-bar"><div class="progress-fill" id="bl-progress" style="width:0%"></div></div>';
  html += '<div class="progress-text" id="bl-progress-text">0 / 0</div>';
  html += '</div>';

  // Checklist per categoria
  var itemIdx = 0;
  for (var c = 0; c < BEFORE_LEAVING_ITEMS.length; c++) {
    var cat = BEFORE_LEAVING_ITEMS[c];
    var isFirst = c < 2;
    html += '<details' + (isFirst ? ' open' : '') + '><summary>' + cat.cat + '</summary>';
    html += '<div class="details-content">';
    for (var i = 0; i < cat.items.length; i++) {
      html += '<div class="checklist-item">';
      html += '<input type="checkbox" class="bl-check" data-idx="' + itemIdx + '" id="bl-' + itemIdx + '">';
      html += '<label for="bl-' + itemIdx + '" class="bl-label" data-idx="' + itemIdx + '">' + cat.items[i] + '</label>';
      html += '</div>';
      itemIdx++;
    }
    html += '</div></details>';
  }

  // Add custom item
  html += '<div class="card" style="margin-top:12px;">';
  html += '<div class="card-title">➕ Aggiungi elemento</div>';
  html += '<div style="display:flex;gap:8px;">';
  html += '<input type="text" class="form-select" id="bl-custom-input" placeholder="Nuovo elemento..." style="flex:1;">';
  html += '<button class="btn btn-sm btn-primary" id="bl-add-btn" type="button">+</button>';
  html += '</div>';
  html += '<div id="bl-custom-list" style="margin-top:8px;"></div>';
  html += '</div>';

  wrapper.innerHTML = html;

  // Init logic
  setTimeout(function () {
    var currentPerson = 0;
    var totalItems = itemIdx;

    function storageKey(person, idx) {
      return 'bl-' + TRAVELERS[person] + '-' + idx;
    }

    function loadChecks() {
      var checked = 0;
      var checks = wrapper.querySelectorAll('.bl-check');
      for (var i = 0; i < checks.length; i++) {
        (function(cb) {
          var idx = cb.dataset.idx;
          DB.get('checklist', storageKey(currentPerson, idx)).then(function (rec) {
            cb.checked = !!(rec && rec.value);
            var label = cb.parentElement.querySelector('label');
            if (cb.checked) {
              cb.parentElement.classList.add('checked');
            } else {
              cb.parentElement.classList.remove('checked');
            }
            updateProgress();
          });
        })(checks[i]);
      }
      // Load custom items
      loadCustomItems();
    }

    function updateProgress() {
      var checks = wrapper.querySelectorAll('.bl-check');
      var done = 0;
      for (var i = 0; i < checks.length; i++) {
        if (checks[i].checked) done++;
      }
      var total = checks.length;
      var pct = total > 0 ? Math.round((done / total) * 100) : 0;
      var bar = document.getElementById('bl-progress');
      var txt = document.getElementById('bl-progress-text');
      if (bar) bar.style.width = pct + '%';
      if (txt) txt.textContent = done + ' / ' + total + ' (' + pct + '%)';
    }

    // Person selector
    var btns = wrapper.querySelectorAll('.person-btn');
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener('click', function () {
        for (var x = 0; x < btns.length; x++) btns[x].classList.remove('active');
        this.classList.add('active');
        currentPerson = parseInt(this.dataset.person);
        loadChecks();
      });
    }

    // Checkbox change
    var blChecks = wrapper.querySelectorAll('.bl-check');
    for (var bci = 0; bci < blChecks.length; bci++) {
      (function(cb) {
        cb.addEventListener('change', function () {
          var idx = this.dataset.idx;
          DB.put('checklist', { id: storageKey(currentPerson, idx), value: this.checked });
          if (this.checked) {
            this.parentElement.classList.add('checked');
          } else {
            this.parentElement.classList.remove('checked');
          }
          updateProgress();
        });
      })(blChecks[bci]);
    }

    // Editable labels
    var blLabels = wrapper.querySelectorAll('.bl-label');
    for (var bli = 0; bli < blLabels.length; bli++) {
      (function(label) {
        label.addEventListener('dblclick', function () {
          var idx = this.dataset.idx;
          var current = this.textContent;
          var input = document.createElement('input');
          input.type = 'text';
          input.value = current;
          input.className = 'form-select';
          input.style.cssText = 'padding:4px 8px;min-height:32px;font-size:0.9rem;';
          var self = this;
          self.style.display = 'none';
          self.parentElement.insertBefore(input, self.nextSibling);
          input.focus();
          function save() {
            var val = input.value.trim();
            if (val) {
              self.textContent = val;
              DB.put('edits', { id: 'bl-label-' + idx, value: val });
            }
            self.style.display = '';
            input.remove();
          }
          input.addEventListener('blur', save);
          input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') save();
          });
        });
      })(blLabels[bli]);
    }

    // Load saved label edits
    var blLabels2 = wrapper.querySelectorAll('.bl-label');
    for (var bl2 = 0; bl2 < blLabels2.length; bl2++) {
      (function(label) {
        var idx = label.dataset.idx;
        DB.get('edits', 'bl-label-' + idx).then(function (rec) {
          if (rec && rec.value) label.textContent = rec.value;
        });
      })(blLabels2[bl2]);
    }

    // Custom items
    function loadCustomItems() {
      DB.get('checklist', 'bl-custom-' + currentPerson).then(function (rec) {
        var list = document.getElementById('bl-custom-list');
        if (!list) return;
        list.innerHTML = '';
        var items = (rec && rec.value) ? rec.value : [];
        for (var i = 0; i < items.length; i++) {
          addCustomItemDOM(list, items, i);
        }
      });
    }

    function addCustomItemDOM(list, items, i) {
      var div = document.createElement('div');
      div.className = 'checklist-item';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!items[i].done;
      cb.addEventListener('change', function () {
        items[i].done = this.checked;
        DB.put('checklist', { id: 'bl-custom-' + currentPerson, value: items });
        if (this.checked) div.classList.add('checked');
        else div.classList.remove('checked');
        updateProgress();
      });
      var lbl = document.createElement('label');
      lbl.textContent = items[i].text;
      lbl.style.flex = '1';
      var del = document.createElement('button');
      del.textContent = '✕';
      del.className = 'expense-delete';
      del.addEventListener('click', function () {
        items.splice(i, 1);
        DB.put('checklist', { id: 'bl-custom-' + currentPerson, value: items });
        loadCustomItems();
        updateProgress();
      });
      if (items[i].done) div.classList.add('checked');
      div.appendChild(cb);
      div.appendChild(lbl);
      div.appendChild(del);
      list.appendChild(div);
    }

    var addBtn = document.getElementById('bl-add-btn');
    var addInput = document.getElementById('bl-custom-input');
    if (addBtn && addInput) {
      function addCustom() {
        var text = addInput.value.trim();
        if (!text) return;
        DB.get('checklist', 'bl-custom-' + currentPerson).then(function (rec) {
          var items = (rec && rec.value) ? rec.value : [];
          items.push({ text: text, done: false });
          DB.put('checklist', { id: 'bl-custom-' + currentPerson, value: items });
          addInput.value = '';
          loadCustomItems();
          showToast('Aggiunto ✓');
        });
      }
      addBtn.addEventListener('click', addCustom);
      addInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addCustom();
      });
    }

    loadChecks();
  }, 0);

  return wrapper;
}
