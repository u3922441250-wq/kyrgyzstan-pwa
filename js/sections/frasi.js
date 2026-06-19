/**
 * frasi.js — Frasi Personalizzate (sezione separata dal Frasario)
 * Kyrgyzstan Travel PWA 2026
 *
 * Frasi utili italiano → russo/kirghizo con fonetica.
 * Salvate in localStorage, offline, nessun sync.
 * Global: renderFrasi()
 */

var DEFAULT_FRASI = [
  { id: 'fr-1', it: 'La strada è aperta?', translation: 'Дорога открыта? (Doroga otkryta?)' },
  { id: 'fr-2', it: 'Quanto manca al prossimo villaggio?', translation: 'Сколько до следующего села? (Skolko do sleduyushchego sela?)' },
  { id: 'fr-3', it: 'Possiamo piantare la tenda qui?', translation: 'Можно здесь поставить палатку? (Mozhno zdes postavit palatku?)' },
  { id: 'fr-4', it: 'Il guado è profondo?', translation: 'Брод глубокий? (Brod glubokiy?)' },
  { id: 'fr-5', it: 'Avete una stanza per due?', translation: 'У вас есть комната на двоих? (U vas yest komnata na dvoikh?)' },
  { id: 'fr-6', it: 'Posso caricare il telefono?', translation: 'Можно зарядить телефон? (Mozhno zaryadit telefon?)' },
  { id: 'fr-7', it: 'Dov\'è il meccanico più vicino?', translation: 'Где ближайший механик? (Gde blizhayshiy mekhanik?)' },
  { id: 'fr-8', it: 'La macchina non parte', translation: 'Машина не заводится (Mashina ne zavoditsya)' },
  { id: 'fr-9', it: 'Abbiamo bucato una gomma', translation: 'У нас спустило колесо (U nas spustilo koleso)' },
  { id: 'fr-10', it: 'Possiamo dormire nella yurta?', translation: 'Можно переночевать в юрте? (Mozhno perenochevatʼ v yurte?)' },
  { id: 'fr-11', it: 'A che ora chiude il passo?', translation: 'Во сколько закрывается перевал? (Vo skolko zakryvayetsya pereval?)' },
  { id: 'fr-12', it: 'C\'è benzina nel prossimo paese?', translation: 'Есть бензин в следующем городе? (Yest benzin v sleduyushchem gorode?)' },
  { id: 'fr-13', it: 'Quanto costa per notte?', translation: 'Сколько стоит за ночь? (Skolko stoit za noch?)' },
  { id: 'fr-14', it: 'Possiamo avere acqua calda?', translation: 'Можно горячую воду? (Mozhno goryachuyu vodu?)' },
  { id: 'fr-15', it: 'Il passo è percorribile con una macchina normale?', translation: 'Перевал проходим на обычной машине? (Pereval prokhodim na obychnoy mashine?)' },
  { id: 'fr-16', it: 'Dove posso comprare acqua potabile?', translation: 'Где можно купить питьевую воду? (Gde mozhno kupit pityevuyu vodu?)' },
  { id: 'fr-17', it: 'C\'è campo telefono qui?', translation: 'Здесь есть связь? (Zdes yest svyaz?)' },
  { id: 'fr-18', it: 'Possiamo fare il bagno nel lago?', translation: 'Можно купаться в озере? (Mozhno kupatsya v ozere?)' },
  { id: 'fr-19', it: 'A che altitudine siamo?', translation: 'На какой высоте мы? (Na kakoy vysote my?)' },
  { id: 'fr-20', it: 'Ci serve un traino', translation: 'Нам нужен буксир (Nam nuzhen buksir)' }
];

function getFrasi() {
  var stored = localStorage.getItem('kg-frasi');
  if (!stored) {
    saveFrasi(DEFAULT_FRASI);
    return DEFAULT_FRASI.slice();
  }
  try { return JSON.parse(stored); } catch(e) { return []; }
}

function saveFrasi(frasi) {
  localStorage.setItem('kg-frasi', JSON.stringify(frasi));
}

function renderFrasi() {
  var frasi = getFrasi();
  var searchQuery = '';

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function buildHtml() {
    var filtered = frasi;
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      filtered = frasi.filter(function(f) {
        return f.it.toLowerCase().indexOf(q) !== -1 || f.translation.toLowerCase().indexOf(q) !== -1;
      });
    }

    var html = '<div class="section-content fade-in">';
    html += '<h2 class="section-title">💬 Frasi Utili</h2>';
    html += '<p style="font-size:0.85rem;opacity:0.6;margin-bottom:12px;">Frasi pronte per il viaggio — italiano → russo con fonetica</p>';

    // Search
    html += '<input class="search-input" type="text" id="frasi-search" placeholder="Cerca frase..." value="' + escHtml(searchQuery) + '">';

    // Add form
    html += '<details style="margin-top:12px;"><summary style="font-size:0.9rem;">➕ Aggiungi nuova frase</summary>';
    html += '<div class="details-content">';
    html += '<div class="form-group"><label class="form-label">Italiano</label>';
    html += '<input type="text" class="form-input" id="frasi-new-it" placeholder="Es: Dove possiamo dormire?"></div>';
    html += '<div class="form-group"><label class="form-label">Traduzione / Fonetica</label>';
    html += '<input type="text" class="form-input" id="frasi-new-tr" placeholder="Es: Где можно переночевать? (Gde mozhno...)"></div>';
    html += '<button class="btn btn-primary btn-sm" id="frasi-add-btn" type="button" style="width:100%;">Aggiungi</button>';
    html += '</div></details>';

    // Phrase list
    html += '<div style="margin-top:14px;">';
    for (var i = 0; i < filtered.length; i++) {
      var f = filtered[i];
      html += '<div class="card" style="padding:12px;margin-bottom:10px;position:relative;">';
      html += '<button class="frasi-del" data-fid="' + f.id + '" type="button" style="position:absolute;top:8px;right:10px;background:none;border:none;font-size:1rem;cursor:pointer;opacity:0.4;color:var(--color-danger);">✕</button>';
      html += '<div style="font-size:0.95rem;font-weight:600;color:var(--color-text);margin-bottom:4px;padding-right:24px;">' + escHtml(f.it) + '</div>';
      html += '<div style="font-size:1.05rem;font-weight:700;color:var(--color-secondary);line-height:1.4;">' + escHtml(f.translation) + '</div>';
      html += '</div>';
    }
    if (filtered.length === 0) {
      html += '<p style="text-align:center;opacity:0.6;margin-top:20px;">Nessuna frase trovata</p>';
    }
    html += '</div></div>';
    return html;
  }

  function attachHandlers() {
    var container = document.getElementById('app');
    if (!container) return;

    // Search
    var searchEl = container.querySelector('#frasi-search');
    if (searchEl) {
      searchEl.addEventListener('input', function() {
        searchQuery = this.value;
        container.innerHTML = buildHtml();
        attachHandlers();
        var si = container.querySelector('#frasi-search');
        if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
      });
    }

    // Add
    var addBtn = container.querySelector('#frasi-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        var itEl = container.querySelector('#frasi-new-it');
        var trEl = container.querySelector('#frasi-new-tr');
        var it = (itEl.value || '').trim();
        var tr = (trEl.value || '').trim();
        if (!it || !tr) { showToast('Compila entrambi i campi'); return; }
        frasi.unshift({ id: 'fr-' + Date.now(), it: it, translation: tr });
        saveFrasi(frasi);
        showToast('Frase aggiunta ✓');
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }

    // Delete
    var delBtns = container.querySelectorAll('.frasi-del');
    for (var d = 0; d < delBtns.length; d++) {
      delBtns[d].addEventListener('click', function() {
        var fid = this.getAttribute('data-fid');
        frasi = frasi.filter(function(f) { return f.id !== fid; });
        saveFrasi(frasi);
        showToast('Eliminata');
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }
  }

  var initialHtml = buildHtml();
  setTimeout(function() { attachHandlers(); }, 0);
  return initialHtml;
}
