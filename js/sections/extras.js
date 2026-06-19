/**
 * extras.js — Extras: Bingo + Diario + Citazioni + Scommesse + Domande Random
 * Kyrgyzstan Travel PWA 2026
 *
 * Global: renderExtras(), triggerRandomQuestion()
 */

// ===== BINGO =====
var BINGO_ITEMS = [
  'Yak sulla strada',
  'GPS impazzito',
  'Bestemmia in 3 lingue',
  'Foto identica alla precedente',
  'Kumys offerto da sconosciuto',
  'Buca che inghiotte la ruota',
  'Nessun segnale per 2+ ore',
  'Dormito in macchina',
  'Bambino che saluta dalla yurta',
  'Sorpasso da camion suicida',
  'Guado improvvisato',
  'Pecora che blocca la strada',
  'Mal di montagna',
  'Cibo non identificato mangiato',
  'Persi senza mappa',
  'Doccia fredda involontaria'
];

function getBingoState() {
  try { return JSON.parse(localStorage.getItem('kg-bingo') || '[]'); } catch(e) { return []; }
}
function saveBingoState(state) {
  localStorage.setItem('kg-bingo', JSON.stringify(state));
}

// ===== DIARIO =====
function getDiario() {
  try { return JSON.parse(localStorage.getItem('kg-diario') || '[]'); } catch(e) { return []; }
}
function saveDiario(entries) {
  localStorage.setItem('kg-diario', JSON.stringify(entries));
}

// ===== CITAZIONI =====
function getCitazioni() {
  try { return JSON.parse(localStorage.getItem('kg-citazioni') || '[]'); } catch(e) { return []; }
}
function saveCitazioni(list) {
  localStorage.setItem('kg-citazioni', JSON.stringify(list));
}

// ===== SCOMMESSE =====
function getScommesse() {
  try { return JSON.parse(localStorage.getItem('kg-scommesse') || '[]'); } catch(e) { return []; }
}
function saveScommesse(list) {
  localStorage.setItem('kg-scommesse', JSON.stringify(list));
}

// ===== DOMANDE RANDOM =====
var DOMANDE_RANDOM = [
  "L'animaccia di ...",
  "Chi è Ppa?",
  "Nome Mortacci sua di quarta e quella di terza",
  "Cose rubate al Dulca, inizia tu",
  "Cosa c'era alla fine del primo Bar Show? Fai la classifica dei tuoi preferiti"
];

function getDomandeAnswered() {
  try { return JSON.parse(localStorage.getItem('kg-domande-done') || '[]'); } catch(e) { return []; }
}
function saveDomandeAnswered(list) {
  localStorage.setItem('kg-domande-done', JSON.stringify(list));
}

// Pop-up domanda random — called from app.js timer
window.triggerRandomQuestion = function() {
  var answered = getDomandeAnswered();
  // Find unanswered questions
  var available = [];
  for (var i = 0; i < DOMANDE_RANDOM.length; i++) {
    if (answered.indexOf(i) === -1) available.push(i);
  }
  if (available.length === 0) return; // All done

  // Pick random
  var idx = available[Math.floor(Math.random() * available.length)];
  var question = DOMANDE_RANDOM[idx];

  // Show bubble popup
  var bubble = document.createElement('div');
  bubble.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%) scale(0);z-index:500;max-width:320px;width:90%;background:var(--color-card);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.3);padding:20px;border:2px solid var(--color-accent);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);';
  bubble.innerHTML = '<button id="domanda-close" type="button" style="position:absolute;top:8px;right:12px;background:none;border:none;font-size:1.2rem;cursor:pointer;opacity:0.5;">✕</button>' +
    '<div style="text-align:center;">' +
    '<div style="font-size:2rem;margin-bottom:8px;">💬</div>' +
    '<div style="font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.5;margin-bottom:8px;">Domanda del Viaggio</div>' +
    '<div style="font-size:1.1rem;font-weight:700;line-height:1.4;color:var(--color-text);">' + question + '</div>' +
    '</div>';
  document.body.appendChild(bubble);

  // Animate in
  setTimeout(function() { bubble.style.transform = 'translateX(-50%) scale(1)'; }, 50);

  // Close handler — marks as answered
  bubble.querySelector('#domanda-close').addEventListener('click', function() {
    answered.push(idx);
    saveDomandeAnswered(answered);
    bubble.style.transform = 'translateX(-50%) scale(0)';
    setTimeout(function() { bubble.remove(); }, 400);
  });

  if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
};

// ===== MAIN RENDER =====
function renderExtras() {
  var currentTab = 'diario';

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function buildHtml() {
    var html = '<div class="section-content fade-in">';
    html += '<h2 class="section-title">🎪 Extras</h2>';

    // Tab selector
    // HIDDEN: Album Foto AI (temporaneamente nascosto)
    // html += '<a href="#/album" style="display:block;text-decoration:none;margin-bottom:12px;">';
    // html += '<div class="card" style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--color-accent);">';
    // html += '<span style="font-size:1.8rem;">📖</span>';
    // html += '<div><div style="font-weight:700;">Album Foto AI</div><div style="font-size:0.75rem;opacity:0.5;">Sfoglia le foto</div></div>';
    // html += '<span style="margin-left:auto;opacity:0.3;">→</span></div></a>';
    html += '<div class="filter-bar" id="extras-tabs">';
    html += '<button class="filter-btn' + (currentTab === 'diario' ? ' active' : '') + '" data-tab="diario" type="button">📖 Diario</button>';
    html += '<button class="filter-btn' + (currentTab === 'citazioni' ? ' active' : '') + '" data-tab="citazioni" type="button">💬 Citazioni</button>';
    html += '<button class="filter-btn' + (currentTab === 'scommesse' ? ' active' : '') + '" data-tab="scommesse" type="button">🎲 Scommesse</button>';
    html += '<button class="filter-btn' + (currentTab === 'bingo' ? ' active' : '') + '" data-tab="bingo" type="button">🎯 Bingo</button>';
    // HIDDEN: AI Photos tab (temporaneamente nascosto)
    // html += '<button class="filter-btn' + (currentTab === 'aiphotos' ? ' active' : '') + '" data-tab="aiphotos" type="button">🎨 AI Photos</button>';
    html += '<button class="filter-btn' + (currentTab === 'domande' ? ' active' : '') + '" data-tab="domande" type="button">❓ Domande</button>';
    html += '<button class="filter-btn' + (currentTab === 'nonhomai' ? ' active' : '') + '" data-tab="nonhomai" type="button">🍺 Non Ho Mai</button>';
    html += '<button class="filter-btn' + (currentTab === 'tictactoe' ? ' active' : '') + '" data-tab="tictactoe" type="button">❌⭕ Tris</button>';
    html += '</div>';

    if (currentTab === 'diario') html += buildDiario();
    else if (currentTab === 'citazioni') html += buildCitazioni();
    else if (currentTab === 'scommesse') html += buildScommesse();
    else if (currentTab === 'bingo') html += buildBingo();
    else if (currentTab === 'domande') html += buildDomande();
    else if (currentTab === 'nonhomai') html += buildNonHoMai();
    else if (currentTab === 'tictactoe') html += buildTicTacToe();

    html += '</div>';
    return html;
  }

  // ===== DIARIO TAB =====
  function buildDiario() {
    var entries = getDiario();
    var h = '';
    h += '<div style="font-size:0.8rem;opacity:0.5;text-align:center;margin-bottom:12px;">Un pensiero al giorno. 15 giorni, 15 ricordi.</div>';

    // Add entry form
    h += '<div class="card" style="margin-bottom:14px;">';
    h += '<div class="form-group"><label class="form-label">📅 Oggi</label>';
    h += '<textarea class="form-textarea" id="diario-text" placeholder="Cosa è successo oggi? Anche solo 2 righe..." rows="3"></textarea></div>';
    h += '<button class="btn btn-primary btn-sm" id="diario-add" type="button" style="width:100%;">Salva nel diario</button>';
    h += '</div>';

    // Entries list (newest first)
    if (entries.length > 0) {
      var sorted = entries.slice().sort(function(a, b) { return b.ts - a.ts; });
      for (var i = 0; i < sorted.length; i++) {
        var e = sorted[i];
        var date = new Date(e.ts);
        var dateStr = date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });
        h += '<div class="card" style="padding:12px;margin-bottom:8px;position:relative;">';
        h += '<button class="diario-del" data-did="' + e.id + '" type="button" style="position:absolute;top:8px;right:10px;background:none;border:none;font-size:0.9rem;cursor:pointer;opacity:0.3;color:var(--color-danger);">✕</button>';
        h += '<div style="font-size:0.75rem;font-weight:700;color:var(--color-secondary);margin-bottom:4px;">' + dateStr + '</div>';
        h += '<div style="font-size:0.9rem;line-height:1.5;white-space:pre-wrap;">' + escHtml(e.text) + '</div>';
        h += '</div>';
      }
    } else {
      h += '<p style="text-align:center;opacity:0.5;margin-top:20px;">Nessuna entry ancora. Il viaggio inizia il 29 maggio!</p>';
    }
    return h;
  }

  // ===== CITAZIONI TAB =====
  function buildCitazioni() {
    var list = getCitazioni();
    var h = '';
    h += '<div style="font-size:0.8rem;opacity:0.5;text-align:center;margin-bottom:12px;">Le cazzate dette durante il viaggio. Per non dimenticare.</div>';

    // Add form
    h += '<div class="card" style="margin-bottom:14px;">';
    h += '<div class="form-group"><label class="form-label">💬 Nuova citazione</label>';
    h += '<input type="text" class="form-input" id="cit-text" placeholder="&quot;Non è una strada, è un suggerimento&quot;"></div>';
    h += '<div class="form-group"><label class="form-label">Chi l\'ha detta?</label>';
    h += '<div class="person-selector" id="cit-who">';
    h += '<button class="person-btn active" data-person="Leo" type="button">Leo</button>';
    h += '<button class="person-btn" data-person="Edu" type="button">Edu</button>';
    h += '</div></div>';
    h += '<button class="btn btn-primary btn-sm" id="cit-add" type="button" style="width:100%;">Aggiungi</button>';
    h += '</div>';

    // List
    if (list.length > 0) {
      var sorted = list.slice().sort(function(a, b) { return b.ts - a.ts; });
      for (var i = 0; i < sorted.length; i++) {
        var c = sorted[i];
        h += '<div class="card" style="padding:12px;margin-bottom:8px;position:relative;">';
        h += '<button class="cit-del" data-cid="' + c.id + '" type="button" style="position:absolute;top:8px;right:10px;background:none;border:none;font-size:0.9rem;cursor:pointer;opacity:0.3;color:var(--color-danger);">✕</button>';
        h += '<div style="font-size:1rem;font-style:italic;line-height:1.4;">"' + escHtml(c.text) + '"</div>';
        h += '<div style="font-size:0.8rem;opacity:0.6;margin-top:4px;">— ' + c.who + '</div>';
        h += '</div>';
      }
    } else {
      h += '<p style="text-align:center;opacity:0.5;margin-top:20px;">Nessuna citazione ancora. Aspetta il primo guado.</p>';
    }
    return h;
  }

  // ===== SCOMMESSE TAB =====
  function buildScommesse() {
    var list = getScommesse();
    var h = '';
    h += '<div style="font-size:0.8rem;opacity:0.5;text-align:center;margin-bottom:12px;">Scommesse tra gentiluomini. Chi perde paga.</div>';

    // Add form
    h += '<details style="margin-bottom:14px;"><summary style="font-size:0.9rem;">➕ Nuova scommessa</summary>';
    h += '<div class="details-content">';
    h += '<div class="form-group"><label class="form-label">Scommessa</label>';
    h += '<input type="text" class="form-input" id="bet-text" placeholder="La Subaru arriva a Son-Kul senza problemi"></div>';
    h += '<div class="form-group"><label class="form-label">Posta in gioco</label>';
    h += '<input type="text" class="form-input" id="bet-stake" placeholder="Una birra, 10€, un kumys..."></div>';
    h += '<div style="display:flex;gap:8px;margin-bottom:10px;">';
    h += '<div class="form-group" style="flex:1;"><label class="form-label">Leo dice</label>';
    h += '<select class="form-select" id="bet-leo"><option value="sì">Sì</option><option value="no">No</option></select></div>';
    h += '<div class="form-group" style="flex:1;"><label class="form-label">Edu dice</label>';
    h += '<select class="form-select" id="bet-edu"><option value="sì">Sì</option><option value="no" selected>No</option></select></div>';
    h += '</div>';
    h += '<button class="btn btn-primary btn-sm" id="bet-add" type="button" style="width:100%;">Crea scommessa</button>';
    h += '</div></details>';

    // Stats
    var leoWins = 0, eduWins = 0;
    for (var s = 0; s < list.length; s++) {
      if (list[s].winner === 'Leo') leoWins++;
      if (list[s].winner === 'Edu') eduWins++;
    }
    if (leoWins + eduWins > 0) {
      h += '<div style="display:flex;justify-content:center;gap:20px;margin-bottom:14px;padding:10px;background:var(--color-card);border-radius:var(--radius);border:1px solid var(--color-border);">';
      h += '<div style="text-align:center;"><div style="font-size:1.4rem;font-weight:900;">' + leoWins + '</div><div style="font-size:0.7rem;opacity:0.5;">Leo</div></div>';
      h += '<div style="text-align:center;font-size:1.2rem;opacity:0.3;padding-top:6px;">vs</div>';
      h += '<div style="text-align:center;"><div style="font-size:1.4rem;font-weight:900;">' + eduWins + '</div><div style="font-size:0.7rem;opacity:0.5;">Edu</div></div>';
      h += '</div>';
    }

    // Open bets
    var open = list.filter(function(b) { return !b.winner; });
    var closed = list.filter(function(b) { return b.winner; });

    if (open.length > 0) {
      h += '<div style="font-size:0.85rem;font-weight:700;margin-bottom:8px;color:var(--color-secondary);">🔓 Aperte</div>';
      for (var o = 0; o < open.length; o++) {
        var b = open[o];
        h += '<div class="card" style="padding:12px;margin-bottom:8px;">';
        h += '<div style="font-size:0.95rem;font-weight:700;margin-bottom:4px;">' + escHtml(b.text) + '</div>';
        h += '<div style="font-size:0.8rem;opacity:0.6;margin-bottom:6px;">🎯 Posta: ' + escHtml(b.stake) + '</div>';
        h += '<div style="font-size:0.8rem;margin-bottom:8px;">Leo: <strong>' + b.leo + '</strong> · Edu: <strong>' + b.edu + '</strong></div>';
        h += '<div style="display:flex;gap:6px;">';
        h += '<button class="btn btn-sm bet-win" data-bid="' + b.id + '" data-winner="Leo" type="button" style="flex:1;background:rgba(45,155,138,0.15);color:var(--color-secondary);border:1px solid var(--color-secondary);">🏆 Leo vince</button>';
        h += '<button class="btn btn-sm bet-win" data-bid="' + b.id + '" data-winner="Edu" type="button" style="flex:1;background:rgba(232,115,42,0.15);color:var(--color-accent);border:1px solid var(--color-accent);">🏆 Edu vince</button>';
        h += '</div></div>';
      }
    }

    if (closed.length > 0) {
      h += '<div style="font-size:0.85rem;font-weight:700;margin-top:14px;margin-bottom:8px;opacity:0.6;">🔒 Chiuse</div>';
      for (var cl = 0; cl < closed.length; cl++) {
        var bc = closed[cl];
        h += '<div class="card" style="padding:12px;margin-bottom:8px;opacity:0.7;">';
        h += '<div style="font-size:0.9rem;font-weight:600;text-decoration:line-through;margin-bottom:2px;">' + escHtml(bc.text) + '</div>';
        h += '<div style="font-size:0.8rem;">🏆 <strong>' + bc.winner + '</strong> ha vinto · Posta: ' + escHtml(bc.stake) + '</div>';
        h += '</div>';
      }
    }

    if (list.length === 0) {
      h += '<p style="text-align:center;opacity:0.5;margin-top:20px;">Nessuna scommessa ancora. La prima buca vi ispirerà.</p>';
    }
    return h;
  }

  // ===== BINGO TAB =====
  function buildBingo() {
    var state = getBingoState();
    var checked = state.length;
    var total = BINGO_ITEMS.length;
    var h = '';

    h += '<div style="text-align:center;margin-bottom:12px;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;">Spunta quando succede. Se fai BINGO... sei sopravvissuto.</div>';
    h += '</div>';

    h += '<div class="progress-bar" style="margin-bottom:14px;"><div class="progress-fill" style="width:' + Math.round(checked/total*100) + '%;"></div></div>';
    h += '<div style="text-align:center;font-size:0.8rem;opacity:0.5;margin-bottom:14px;">' + checked + '/' + total + '</div>';

    h += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">';
    for (var i = 0; i < BINGO_ITEMS.length; i++) {
      var isChecked = state.indexOf(i) !== -1;
      h += '<div class="bingo-cell" data-idx="' + i + '" style="';
      h += 'aspect-ratio:1;display:flex;align-items:center;justify-content:center;text-align:center;';
      h += 'padding:6px;border-radius:8px;font-size:0.65rem;font-weight:600;line-height:1.2;cursor:pointer;';
      h += 'border:2px solid ' + (isChecked ? 'var(--color-secondary)' : 'var(--color-border)') + ';';
      h += 'background:' + (isChecked ? 'rgba(232,115,42,0.15)' : 'var(--color-card)') + ';';
      h += 'color:' + (isChecked ? 'var(--color-secondary)' : 'var(--color-text)') + ';';
      h += 'text-decoration:' + (isChecked ? 'line-through' : 'none') + ';';
      h += '">' + (isChecked ? '✅ ' : '') + BINGO_ITEMS[i] + '</div>';
    }
    h += '</div>';

    if (checked === total) {
      h += '<div style="text-align:center;margin-top:16px;padding:14px;background:linear-gradient(135deg,rgba(255,215,0,0.2),rgba(232,115,42,0.1));border-radius:12px;border:2px solid #ffd700;">';
      h += '<div style="font-size:2rem;">🏆🎉</div>';
      h += '<div style="font-size:1.1rem;font-weight:800;color:#ffd700;">BINGO COMPLETO!</div>';
      h += '<div style="font-size:0.8rem;opacity:0.6;margin-top:4px;">Sei ufficialmente sopravvissuto al Kirghizistan.</div></div>';
    }

    h += '<div style="text-align:center;margin-top:14px;">';
    h += '<button id="bingo-reset" type="button" style="background:none;border:none;font-size:0.8rem;opacity:0.4;cursor:pointer;text-decoration:underline;color:var(--color-text);">Reset</button></div>';
    return h;
  }

  // ===== AI PHOTOS TAB =====
  function buildAiPhotos() {
    var AI_PHOTOS = [
      { src: 'AI%20images/ChatGPT%20Image%2015%20apr%202026%2C%2016_21_37.png', caption: 'Avventura in Kirghizistan' },
      { src: 'AI%20images/Fine%20viaggio.jpeg', caption: 'Fine viaggio' },
      { src: 'AI%20images/milk.jpeg', caption: 'Kumys - latte di cavalla' },
      { src: 'AI%20images/milk%202.jpeg', caption: 'Tradizione nomade' },
      { src: 'AI%20images/passo%20di%20motagna.png', caption: 'Passo di montagna' },
      { src: 'AI%20images/yurta.png', caption: 'Yurta' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.43.jpeg', caption: 'Leo e Edu #1' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.43%20(1).jpeg', caption: 'Leo e Edu #2' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.44.jpeg', caption: 'Leo e Edu #3' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.44%20(1).jpeg', caption: 'Leo e Edu #4' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.44%20(2).jpeg', caption: 'Leo e Edu #5' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-10%20at%2012.59.44%20(3).jpeg', caption: 'Leo e Edu #6' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2010.33.15.jpeg', caption: 'Leo e Edu #7' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2010.33.15%20(1).jpeg', caption: 'Leo e Edu #8' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2010.33.15%20(2).jpeg', caption: 'Leo e Edu #9' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2011.06.39.jpeg', caption: 'Leo e Edu #10' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2011.06.59.jpeg', caption: 'Leo e Edu #11' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2011.07.00.jpeg', caption: 'Leo e Edu #12' },
      { src: 'AI%20images/Leo%26EDU/WhatsApp%20Image%202026-04-22%20at%2011.07.00%20(1).jpeg', caption: 'Leo e Edu #13' }
    ];

    var h = '';
    h += '<div style="text-align:center;margin-bottom:16px;">';
    h += '<div style="font-size:0.85rem;opacity:0.6;">Foto generate con AI per il viaggio 🎨</div>';
    h += '</div>';

    // Photo grid
    h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">';
    for (var i = 0; i < AI_PHOTOS.length; i++) {
      var photo = AI_PHOTOS[i];
      h += '<div class="ai-photo-item" data-idx="' + i + '" style="cursor:pointer;border-radius:12px;overflow:hidden;aspect-ratio:1;position:relative;background:var(--color-card);box-shadow:var(--shadow);">';
      h += '<img src="' + photo.src + '" alt="' + photo.caption + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy">';
      h += '<div style="position:absolute;bottom:0;left:0;right:0;padding:6px 8px;background:linear-gradient(transparent,rgba(0,0,0,0.7));color:#fff;font-size:0.7rem;">' + photo.caption + '</div>';
      h += '</div>';
    }
    h += '</div>';

    return h;
  }

  // ===== DOMANDE TAB =====
  function buildDomande() {
    var h = '';
    h += '<div style="text-align:center;padding:20px 10px;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:20px;">Premi il bottone. Entrambi rispondete. Niente bugie.</div>';
    h += '<div id="domanda-card" style="min-height:160px;display:flex;align-items:center;justify-content:center;padding:24px;margin-bottom:20px;background:var(--color-card);border-radius:16px;border:2px solid var(--color-border);box-shadow:var(--shadow);">';
    h += '<div id="domanda-text" style="font-size:1.15rem;font-weight:700;line-height:1.5;color:var(--color-text);">Premi il bottone per iniziare</div>';
    h += '</div>';
    h += '<button id="domanda-next" type="button" class="btn btn-primary" style="font-size:1.1rem;padding:14px 40px;">🎲 Prossima domanda</button>';
    h += '<div style="margin-top:12px;font-size:0.75rem;opacity:0.3;" id="domanda-counter"></div>';
    h += '</div>';
    return h;
  }

  // ===== NON HO MAI TAB =====
  function buildNonHoMai() {
    var h = '';
    h += '<div style="text-align:center;padding:20px 10px;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:6px;">Chi l\'ha fatto beve. Kumys o peggio.</div>';
    h += '<div style="font-size:0.7rem;opacity:0.3;margin-bottom:20px;">🍺 = un sorso · 🍺🍺 = due sorsi se è grave</div>';
    h += '<div id="nhm-card" style="min-height:160px;display:flex;align-items:center;justify-content:center;padding:24px;margin-bottom:20px;background:linear-gradient(135deg,rgba(232,115,42,0.08),rgba(255,140,66,0.04));border-radius:16px;border:2px solid var(--color-accent);box-shadow:var(--shadow);">';
    h += '<div id="nhm-text" style="font-size:1.15rem;font-weight:700;line-height:1.5;color:var(--color-text);">Premi per iniziare</div>';
    h += '</div>';
    h += '<button id="nhm-next" type="button" class="btn btn-accent" style="font-size:1.1rem;padding:14px 40px;background:var(--color-accent);color:#fff;">🍺 Prossima!</button>';
    h += '<div style="margin-top:12px;font-size:0.75rem;opacity:0.3;" id="nhm-counter"></div>';
    h += '</div>';
    return h;
  }

  // ===== TIC TAC TOE TAB =====
  var TTT_OBBLIGHI = [
    "Bevi un sorso di kumys senza fare smorfie",
    "Fai 10 flessioni adesso",
    "Manda un vocale a tua madre dicendo 'ti voglio bene'",
    "Parla con accento kirghizo per i prossimi 5 minuti",
    "Racconta la tua storia più imbarazzante",
    "Fai un selfie bruttissimo e mettilo come foto profilo per 1 ora",
    "Canta una canzone a squarciagola adesso",
    "Chiama l'ultimo contatto nella tua rubrica e digli qualcosa di carino",
    "Mangia qualcosa di strano alla prossima fermata",
    "Non puoi usare il telefono per 30 minuti",
    "Devi guidare il prossimo tratto (anche se non è il tuo turno)",
    "Fai un complimento sincero all'altro",
    "Racconta il tuo sogno erotico più strano",
    "Imita un animale per 30 secondi",
    "Confessa qualcosa che non hai mai detto",
    // Bere
    "Bevi 3 sorsi di fila senza respirare",
    "Bevi con la mano sinistra per i prossimi 30 minuti, ogni errore = un altro sorso",
    "Bevi ogni volta che dici 'cazzo' nei prossimi 10 minuti",
    "Finisci quello che hai in mano adesso",
    "Bevi un sorso per ogni ex che hai avuto",
    "Bevi un sorso per ogni anno di liceo insieme (5 sorsi)",
    "Bevi mentre l'altro ti racconta la cosa più imbarazzante che sa di te",
    "Bevi a occhi chiusi — l'altro sceglie cosa",
    "Bevi un sorso per ogni bestemmia che hai detto oggi",
    "Waterfall: bevi finché l'altro non dice stop",
    "Bevi e poi dì qualcosa di carino. Se non ci riesci, bevi ancora.",
    "Bevi un sorso per ogni persona con cui sei stato/a quest'anno",
    "Bevi e confessa l'ultima bugia che hai detto",
    "Bevi due sorsi e manda un messaggio random all'ultimo match su Tinder/Hinge",
    "Bevi e chiama qualcuno — devi restare in linea almeno 30 secondi",
    // Fisici/stupidi
    "Fai 20 squat adesso",
    "Stai in equilibrio su una gamba per 30 secondi, se cadi bevi",
    "Fai il verso di uno yak per 10 secondi",
    "Balla per 30 secondi senza musica",
    "Fai finta di essere un venditore e prova a vendere qualcosa all'altro",
    "Parla solo in terza persona per i prossimi 5 minuti",
    "Non puoi dire 'no' per i prossimi 10 minuti",
    "Lascia che l'altro scelga la musica per la prossima ora",
    "Fai un video di 10 secondi dove fai qualcosa di imbarazzante e mandalo a qualcuno",
    "Scrivi un messaggio d'amore a un numero random della rubrica"
  ];
  var TTT_VERITA = [
    "Qual è la cosa più imbarazzante che hai nel telefono adesso?",
    "Chi è l'ultima persona a cui hai mentito e perché?",
    "Qual è la cosa che pensi di me ma non dici?",
    "Qual è il tuo segreto più stupido?",
    "Con chi hai parlato male di me?",
    "Qual è la cosa più patetica che hai fatto questa settimana?",
    "Mostra l'ultimo messaggio che hai mandato",
    "Qual è la persona che odi di più e perché?",
    "Qual è la cosa più illegale che hai fatto?",
    "Racconta l'ultima volta che hai pianto",
    "Qual è la bugia che dici più spesso?",
    "Mostra la tua galleria foto — l'altro sceglie una foto e devi spiegare il contesto",
    "Qual è la cosa più cattiva che hai pensato oggi?",
    "Chi è la persona con cui ti vergogneresti se si sapesse che ci sei stato?",
    "Qual è la cosa che fai di nascosto che nessuno sa?",
    // Extra
    "Qual è la volta che hai bevuto di più in vita tua? Racconta tutto.",
    "Qual è la cosa peggiore che hai fatto da ubriaco?",
    "Hai mai vomitato addosso a qualcuno? Racconta.",
    "Qual è il messaggio più imbarazzante che hai mandato da ubriaco?",
    "Con chi non avresti mai dovuto bere? Perché?",
    "Qual è la decisione peggiore che hai preso da ubriaco?",
    "Hai mai perso qualcosa di importante perché eri ubriaco?",
    "Qual è la persona più improbabile con cui hai bevuto?",
    "Racconta la tua peggior sbronza del liceo",
    "Hai mai bevuto da solo? Quando e perché?",
    "Qual è la cosa che hai confessato da ubriaco e poi te ne sei pentito?",
    "Qual è il drink che non puoi più bere perché ti ricorda qualcosa di brutto?",
    "Hai mai fatto qualcosa di sessuale solo perché eri ubriaco?",
    "Qual è la scusa più assurda che hai dato per giustificare una sbronza?",
    "Racconta la volta che hai bevuto e hai fatto qualcosa di cui ti vergogni ancora",
    // Personali
    "Mostra le ultime 3 ricerche su Google",
    "Leggi ad alta voce l'ultimo messaggio vocale che hai ricevuto",
    "Qual è la persona nella tua rubrica che non senti da più tempo? Perché?",
    "Apri Instagram e mostra l'ultima persona che hai stalkerato",
    "Qual è la cosa più costosa che hai rotto e non hai mai confessato?",
    "Racconta la tua peggior figura di merda in pubblico",
    "Qual è la promessa che hai fatto e non hai mantenuto?",
    "Qual è la cosa più strana nella tua cronologia YouTube?",
    "Hai mai pianto per una canzone? Quale?",
    "Qual è il messaggio che hai scritto, cancellato e mai mandato?"
  ];

  function buildTicTacToe() {
    var h = '';
    h += '<div style="text-align:center;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:4px;">Leo = ❌ · Edu = ⭕</div>';
    h += '<div style="font-size:0.75rem;opacity:0.3;margin-bottom:16px;">Chi perde sceglie: Obbligo o Verità</div>';

    // Score
    var tttScore = JSON.parse(localStorage.getItem('kg-ttt-score') || '{"leo":0,"edu":0}');
    h += '<div style="display:flex;justify-content:center;gap:20px;margin-bottom:14px;">';
    h += '<div style="text-align:center;"><div style="font-size:1.2rem;font-weight:900;">' + tttScore.leo + '</div><div style="font-size:0.7rem;opacity:0.5;">Leo ❌</div></div>';
    h += '<div style="text-align:center;font-size:1rem;opacity:0.3;padding-top:4px;">vs</div>';
    h += '<div style="text-align:center;"><div style="font-size:1.2rem;font-weight:900;">' + tttScore.edu + '</div><div style="font-size:0.7rem;opacity:0.5;">Edu ⭕</div></div>';
    h += '</div>';

    // Board
    h += '<div id="ttt-board" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-width:240px;margin:0 auto;">';
    for (var i = 0; i < 9; i++) {
      h += '<div class="ttt-cell" data-pos="' + i + '" style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:900;background:var(--color-card);border:2px solid var(--color-border);border-radius:8px;cursor:pointer;user-select:none;"></div>';
    }
    h += '</div>';

    // Status
    h += '<div id="ttt-status" style="margin-top:14px;font-size:1rem;font-weight:700;min-height:30px;"></div>';

    // Obbligo/Verità result area
    h += '<div id="ttt-punishment" style="margin-top:12px;min-height:60px;"></div>';

    // Reset
    h += '<button id="ttt-reset" type="button" style="margin-top:10px;background:none;border:none;font-size:0.8rem;opacity:0.4;cursor:pointer;text-decoration:underline;color:var(--color-text);">Nuova partita</button>';
    h += '</div>';
    return h;
  }

  // ===== EVENT HANDLERS =====
  function attachHandlers() {
    var container = document.getElementById('app');
    if (!container) return;

    // Tab switching — scoped to the tabs container only (avoid conflicts with internal filter-btn elements)
    var tabsContainer = container.querySelector('#extras-tabs');
    if (tabsContainer) {
      var tabs = tabsContainer.querySelectorAll('.filter-btn');
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var newTab = this.dataset.tab;
          if (!newTab || newTab === currentTab) return;
          currentTab = newTab;
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }
    }

    if (currentTab === 'diario') {
      var addBtn = container.querySelector('#diario-add');
      if (addBtn) addBtn.addEventListener('click', function() {
        var text = container.querySelector('#diario-text').value.trim();
        if (!text) { showToast('Scrivi qualcosa!'); return; }
        var entries = getDiario();
        entries.push({ id: 'di-' + Date.now(), text: text, ts: Date.now() });
        saveDiario(entries);
        showToast('Salvato nel diario ✓');
        container.innerHTML = buildHtml();
        attachHandlers();
      });
      var delBtns = container.querySelectorAll('.diario-del');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function() {
          var entries = getDiario().filter(function(e) { return e.id !== this.getAttribute('data-did'); }.bind(this));
          saveDiario(entries);
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }
    }

    if (currentTab === 'citazioni') {
      var whoBtns = container.querySelectorAll('#cit-who .person-btn');
      for (var w = 0; w < whoBtns.length; w++) {
        whoBtns[w].addEventListener('click', function() {
          for (var x = 0; x < whoBtns.length; x++) whoBtns[x].classList.remove('active');
          this.classList.add('active');
        });
      }
      var citAdd = container.querySelector('#cit-add');
      if (citAdd) citAdd.addEventListener('click', function() {
        var text = container.querySelector('#cit-text').value.trim();
        if (!text) { showToast('Scrivi la citazione!'); return; }
        var who = 'Leo';
        var activeBtn = container.querySelector('#cit-who .person-btn.active');
        if (activeBtn) who = activeBtn.dataset.person;
        var list = getCitazioni();
        list.push({ id: 'cit-' + Date.now(), text: text, who: who, ts: Date.now() });
        saveCitazioni(list);
        showToast('Citazione salvata ✓');
        container.innerHTML = buildHtml();
        attachHandlers();
      });
      var citDels = container.querySelectorAll('.cit-del');
      for (var cd = 0; cd < citDels.length; cd++) {
        citDels[cd].addEventListener('click', function() {
          var list = getCitazioni().filter(function(c) { return c.id !== this.getAttribute('data-cid'); }.bind(this));
          saveCitazioni(list);
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }
    }

    if (currentTab === 'scommesse') {
      var betAdd = container.querySelector('#bet-add');
      if (betAdd) betAdd.addEventListener('click', function() {
        var text = container.querySelector('#bet-text').value.trim();
        var stake = container.querySelector('#bet-stake').value.trim();
        if (!text || !stake) { showToast('Compila scommessa e posta!'); return; }
        var leo = container.querySelector('#bet-leo').value;
        var edu = container.querySelector('#bet-edu').value;
        var list = getScommesse();
        list.push({ id: 'bet-' + Date.now(), text: text, stake: stake, leo: leo, edu: edu, winner: null, ts: Date.now() });
        saveScommesse(list);
        showToast('Scommessa creata ✓');
        container.innerHTML = buildHtml();
        attachHandlers();
      });
      var winBtns = container.querySelectorAll('.bet-win');
      for (var bw = 0; bw < winBtns.length; bw++) {
        winBtns[bw].addEventListener('click', function() {
          var bid = this.getAttribute('data-bid');
          var winner = this.getAttribute('data-winner');
          var list = getScommesse();
          for (var i = 0; i < list.length; i++) {
            if (list[i].id === bid) { list[i].winner = winner; break; }
          }
          saveScommesse(list);
          showToast('🏆 ' + winner + ' vince!');
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }
    }

    if (currentTab === 'bingo') {
      var cells = container.querySelectorAll('.bingo-cell');
      for (var c = 0; c < cells.length; c++) {
        cells[c].addEventListener('click', function() {
          var idx = parseInt(this.getAttribute('data-idx'));
          var state = getBingoState();
          var pos = state.indexOf(idx);
          if (pos !== -1) state.splice(pos, 1);
          else { state.push(idx); if (navigator.vibrate) navigator.vibrate(30); }
          saveBingoState(state);
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }
      var resetBtn = container.querySelector('#bingo-reset');
      if (resetBtn) resetBtn.addEventListener('click', function() {
        if (confirm('Reset bingo?')) {
          saveBingoState([]);
          container.innerHTML = buildHtml();
          attachHandlers();
        }
      });
    }

    if (currentTab === 'domande') {
      var usedDomande = JSON.parse(sessionStorage.getItem('kg-domande-used') || '[]');
      var nextBtn = container.querySelector('#domanda-next');
      var textEl = container.querySelector('#domanda-text');
      var counterEl = container.querySelector('#domanda-counter');
      if (nextBtn) nextBtn.addEventListener('click', function() {
        var available = [];
        for (var i = 0; i < DOMANDE_VIAGGIO.length; i++) {
          if (usedDomande.indexOf(i) === -1) available.push(i);
        }
        if (available.length === 0) {
          usedDomande = [];
          for (var j = 0; j < DOMANDE_VIAGGIO.length; j++) available.push(j);
        }
        var pick = available[Math.floor(Math.random() * available.length)];
        usedDomande.push(pick);
        sessionStorage.setItem('kg-domande-used', JSON.stringify(usedDomande));
        textEl.textContent = DOMANDE_VIAGGIO[pick];
        counterEl.textContent = usedDomande.length + '/' + DOMANDE_VIAGGIO.length;
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }

    if (currentTab === 'nonhomai') {
      var usedNhm = JSON.parse(sessionStorage.getItem('kg-nhm-used') || '[]');
      var nhmBtn = container.querySelector('#nhm-next');
      var nhmText = container.querySelector('#nhm-text');
      var nhmCounter = container.querySelector('#nhm-counter');
      if (nhmBtn) nhmBtn.addEventListener('click', function() {
        var available = [];
        for (var i = 0; i < NON_HO_MAI.length; i++) {
          if (usedNhm.indexOf(i) === -1) available.push(i);
        }
        if (available.length === 0) {
          usedNhm = [];
          for (var j = 0; j < NON_HO_MAI.length; j++) available.push(j);
        }
        var pick = available[Math.floor(Math.random() * available.length)];
        usedNhm.push(pick);
        sessionStorage.setItem('kg-nhm-used', JSON.stringify(usedNhm));
        nhmText.textContent = NON_HO_MAI[pick];
        nhmCounter.textContent = usedNhm.length + '/' + NON_HO_MAI.length;
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }

    if (currentTab === 'tictactoe') {
      var board = [null,null,null,null,null,null,null,null,null];
      var currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Random start
      var gameOver = false;
      var cells = container.querySelectorAll('.ttt-cell');
      var statusEl = container.querySelector('#ttt-status');
      var punishEl = container.querySelector('#ttt-punishment');
      if (statusEl) statusEl.textContent = 'Turno: ' + (currentPlayer === 'X' ? '✕ Leo' : '◯ Edu') + ' (inizia)';

      function checkWin() {
        var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (var l = 0; l < lines.length; l++) {
          var a = lines[l][0], b = lines[l][1], c = lines[l][2];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
        }
        if (board.indexOf(null) === -1) return 'draw';
        return null;
      }

      function showPunishment(loser) {
        var loserName = loser === 'X' ? 'Leo' : 'Edu';
        var ph = '<div style="padding:12px;background:rgba(192,57,43,0.1);border:1px solid var(--color-danger);border-radius:10px;">';
        ph += '<div style="font-size:0.9rem;font-weight:700;margin-bottom:8px;">' + loserName + ' ha perso! Scegli:</div>';
        ph += '<div style="display:flex;gap:8px;">';
        ph += '<button class="btn btn-sm ttt-obbligo" type="button" style="flex:1;background:var(--color-danger);color:#fff;">🔥 Obbligo</button>';
        ph += '<button class="btn btn-sm ttt-verita" type="button" style="flex:1;background:var(--color-secondary);color:#fff;">👁️ Verità</button>';
        ph += '</div><div id="ttt-ov-result" style="margin-top:10px;font-size:0.95rem;font-weight:600;min-height:24px;"></div></div>';
        punishEl.innerHTML = ph;

        container.querySelector('.ttt-obbligo').addEventListener('click', function() {
          var pick = TTT_OBBLIGHI[Math.floor(Math.random() * TTT_OBBLIGHI.length)];
          container.querySelector('#ttt-ov-result').innerHTML = '<strong>Obbligo:</strong> ' + pick;
          if (navigator.vibrate) navigator.vibrate([50,30,50]);
        });
        container.querySelector('.ttt-verita').addEventListener('click', function() {
          var pick = TTT_VERITA[Math.floor(Math.random() * TTT_VERITA.length)];
          container.querySelector('#ttt-ov-result').innerHTML = '<strong>Verità:</strong> ' + pick;
          if (navigator.vibrate) navigator.vibrate([50,30,50]);
        });
      }

      for (var ci = 0; ci < cells.length; ci++) {
        cells[ci].addEventListener('click', function() {
          if (gameOver) return;
          var pos = parseInt(this.getAttribute('data-pos'));
          if (board[pos]) return;

          board[pos] = currentPlayer;
          this.innerHTML = currentPlayer === 'X' ? '<span style="color:#e8732a;font-size:2.2rem;">✕</span>' : '<span style="color:#c0392b;font-size:2.2rem;">◯</span>';
          this.style.cursor = 'default';

          var result = checkWin();
          if (result) {
            gameOver = true;
            if (result === 'draw') {
              statusEl.textContent = '🤝 Pareggio! Nessuna punizione.';
            } else {
              var winnerName = result === 'X' ? 'Leo' : 'Edu';
              statusEl.textContent = '🏆 ' + winnerName + ' vince!';
              // Update score
              var tttScore = JSON.parse(localStorage.getItem('kg-ttt-score') || '{"leo":0,"edu":0}');
              if (result === 'X') tttScore.leo++; else tttScore.edu++;
              localStorage.setItem('kg-ttt-score', JSON.stringify(tttScore));
              // Show punishment for loser
              showPunishment(result === 'X' ? 'O' : 'X');
            }
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusEl.textContent = 'Turno: ' + (currentPlayer === 'X' ? '✕ Leo' : '◯ Edu');
          }
          if (navigator.vibrate) navigator.vibrate(15);
        });
      }

      var resetBtn = container.querySelector('#ttt-reset');
      if (resetBtn) resetBtn.addEventListener('click', function() {
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }
  }

  var initialHtml = buildHtml();
  setTimeout(function() { attachHandlers(); }, 0);
  return initialHtml;
}
