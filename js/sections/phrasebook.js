/**
 * phrasebook.js — Frasario
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderPhrasebook(), filterPhrases()
 */

/**
 * Filter phrases by search text AND category simultaneously.
 * @param {Array<{it: string, kg: string, ru: string, pronunciation: string, category: string}>} phrases
 * @param {string} query - search text (case-insensitive)
 * @param {string|null} category - category filter (null or '' = all)
 * @returns {Array}
 */
function filterPhrases(phrases, query, category) {
  var result = phrases;

  if (category && category !== '') {
    result = result.filter(function (p) {
      return p.category === category;
    });
  }

  if (query && query.trim() !== '') {
    var q = query.toLowerCase();
    result = result.filter(function (p) {
      return p.it.toLowerCase().indexOf(q) !== -1 ||
             p.kg.toLowerCase().indexOf(q) !== -1 ||
             p.ru.toLowerCase().indexOf(q) !== -1 ||
             p.pronunciation.toLowerCase().indexOf(q) !== -1;
    });
  }

  return result;
}

function renderPhrasebook() {
  var currentCategory = null;
  var currentQuery = '';
  var CATEGORIES = [
    { key: null, label: 'Tutte' },
    { key: 'base', label: 'Base' },
    { key: 'cibo', label: 'Cibo' },
    { key: 'strada', label: 'Strada' },
    { key: 'emergenza', label: 'Emergenza' },
    { key: 'numeri', label: 'Numeri' },
    { key: 'alloggio', label: 'Alloggio' },
    { key: 'trasporto', label: 'Trasporto' },
    { key: 'shopping', label: 'Shopping' },
    { key: 'socialita', label: 'Socialità' },
    { key: 'tempo', label: 'Tempo' }
  ];

  function buildHtml() {
    var filtered = filterPhrases(PHRASES, currentQuery, currentCategory);

    var html = '<div class="section-content fade-in">';
    html += '<h2 class="section-title">🗣️ Frasario</h2>';

    // Search input
    html += '<input class="search-input" type="text" id="phrase-search" placeholder="Cerca frase..." value="' + (currentQuery || '') + '">';

    // Category filter buttons
    html += '<div class="filter-bar">';
    for (var c = 0; c < CATEGORIES.length; c++) {
      var cat = CATEGORIES[c];
      var activeClass = (currentCategory === cat.key) ? ' active' : '';
      html += '<button class="filter-btn' + activeClass + '" data-cat="' + (cat.key || '') + '" type="button">' + cat.label + '</button>';
    }
    html += '</div>';

    // Phrase cards
    for (var i = 0; i < filtered.length; i++) {
      var p = filtered[i];
      html += '<div class="phrase-card">';
      html += '<div class="phrase-category-tag">' + p.category + '</div>';
      html += '<div class="phrase-it">' + p.it + '</div>';
      html += '<div class="phrase-translation">' + p.kg + '</div>';
      html += '<div class="phrase-translation">' + p.ru + '</div>';
      html += '<div class="phrase-pronunciation">' + p.pronunciation + '</div>';
      html += '</div>';
    }

    if (filtered.length === 0) {
      html += '<p style="text-align:center;opacity:0.6;margin-top:20px;">Nessuna frase trovata</p>';
    }

    html += '</div>';
    return html;
  }

  function attachHandlers() {
    var container = document.getElementById('app');
    if (!container) return;

    var searchInput = container.querySelector('#phrase-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentQuery = this.value;
        container.innerHTML = buildHtml();
        attachHandlers();
        var si = container.querySelector('#phrase-search');
        if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
      });
    }

    var filterBtns = container.querySelectorAll('.filter-btn');
    for (var b = 0; b < filterBtns.length; b++) {
      filterBtns[b].addEventListener('click', function () {
        var catVal = this.getAttribute('data-cat');
        currentCategory = catVal === '' ? null : catVal;
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }
  }

  // Initial render — return HTML string, then attach handlers after DOM update
  var initialHtml = buildHtml();
  setTimeout(function () { attachHandlers(); }, 0);
  return initialHtml;
}
