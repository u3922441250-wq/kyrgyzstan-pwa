/**
 * home.js — Home Screen
 * Kyrgyzstan Travel PWA 2025
 * Long-press (3s) su un blocco per riordinare la griglia
 */

var TRIP_START = new Date(2026, 4, 29);
var TRIP_END = new Date(2026, 5, 14);

var DEFAULT_NAV_ITEMS = [
  { emoji: '📅', label: 'Itinerario', href: '#/itinerario' },
  { emoji: '🗺️', label: 'Mappe', href: '#/mappe' },
  { emoji: '💰', label: 'Budget', href: '#/budget' },
  { emoji: '🗣️', label: 'Frasario', href: '#/frasario' },
  { emoji: '✅', label: 'Checklist', href: '#/checklist' },
  { emoji: '📍', label: 'Saved Places', href: '#/gps' },
  { emoji: '📋', label: 'Info', href: '#/info' },
  { emoji: '📄', label: 'Documenti', href: '#/documenti' },
  { emoji: '🚗', label: 'Veicolo', href: '#/veicolo', icon: 'icons/subaru.png' },
  { emoji: '🧭', label: 'Navigazione', href: '#/navigazione' },
  { emoji: '⛰️', label: 'Montagne', href: '#/altitudine' },
  { emoji: '🍽️', label: 'Piatti Tipici', href: '#/piatti' },
  { emoji: '🧳', label: 'Before Leaving', href: '#/before-leaving' },
  { emoji: '🕹️', label: 'Extras', href: '#/extras' }
];

function getNavOrder() {
  try {
    var saved = localStorage.getItem('kg-nav-order');
    if (saved) {
      var order = JSON.parse(saved);
      var result = [];
      var byHref = {};
      for (var j = 0; j < DEFAULT_NAV_ITEMS.length; j++) {
        byHref[DEFAULT_NAV_ITEMS[j].href] = DEFAULT_NAV_ITEMS[j];
      }
      for (var i = 0; i < order.length; i++) {
        if (byHref[order[i]]) result.push(byHref[order[i]]);
      }
      for (var k = 0; k < DEFAULT_NAV_ITEMS.length; k++) {
        var found = false;
        for (var m = 0; m < result.length; m++) {
          if (result[m].href === DEFAULT_NAV_ITEMS[k].href) { found = true; break; }
        }
        if (!found) result.push(DEFAULT_NAV_ITEMS[k]);
      }
      return result;
    }
  } catch (e) {}
  return DEFAULT_NAV_ITEMS.slice();
}

function getTripStatus(now) {
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var start = new Date(TRIP_START.getFullYear(), TRIP_START.getMonth(), TRIP_START.getDate());
  var end = new Date(TRIP_END.getFullYear(), TRIP_END.getMonth(), TRIP_END.getDate());
  if (today < start) return { status: 'before', daysUntil: Math.ceil((start - today) / 86400000) };
  if (today > end) return { status: 'after' };
  return { status: 'during', day: Math.floor((today - start) / 86400000) + 1 };
}

function getDayInsights(dayNum) {
  if (!dayNum || dayNum < 1 || dayNum > ITINERARY.length) return '';
  var d = ITINERARY[dayNum - 1];
  var html = '';
  // Route
  if (d.route) {
    html += '<div style="font-size:0.85rem;margin-bottom:4px;">🛣️ ' + d.route + '</div>';
  }
  if (d.km > 0) {
    html += '<div style="font-size:0.85rem;margin-bottom:4px;">📏 ' + d.km + ' km';
    if (d.driveTime) html += ' · ⏱️ ' + d.driveTime;
    html += '</div>';
  }
  // Warnings
  if (d.warnings && d.warnings.length > 0) {
    for (var w = 0; w < Math.min(d.warnings.length, 3); w++) {
      html += '<div style="font-size:0.82rem;padding:3px 0;color:var(--color-accent);">' + d.warnings[w] + '</div>';
    }
  }
  // Accommodation
  if (d.accommodation) {
    html += '<div style="font-size:0.82rem;margin-top:2px;">🏨 ' + d.accommodation + '</div>';
  }
  // Budget
  if (d.budget) {
    html += '<div style="font-size:0.82rem;">💰 Budget stimato: €' + d.budget + '/pp</div>';
  }
  return html;
}

function renderHome() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  // Countdown — disappears May 29 at 18:00
  var countdownEnd = new Date(2026, 4, 29, 18, 0, 0); // May 29, 18:00
  var now = new Date();
  var countdownHtml = '';
  if (now < countdownEnd) {
    var diff = countdownEnd - now;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);

    // Motivational message based on days left
    var countdownMsg = '';
    if (days > 30) countdownMsg = 'Il Kirghizistan vi aspetta 🏔️';
    else if (days > 14) countdownMsg = 'Tempo di preparare gli zaini 🎒';
    else if (days > 7) countdownMsg = 'Quasi ora di partire... 🛫';
    else if (days > 3) countdownMsg = 'Ultimi preparativi! ⚡';
    else if (days > 1) countdownMsg = 'Ci siamo quasi... 🐴';
    else if (days === 1) countdownMsg = 'DOMANI SI PARTE! 🔥';
    else countdownMsg = 'Oggi si vola! ✈️';

    countdownHtml = '<div class="countdown-box">';
    countdownHtml += '<div class="countdown-numbers">';
    countdownHtml += '<div class="countdown-unit"><span class="countdown-value">' + days + '</span><span class="countdown-label">giorni</span></div>';
    countdownHtml += '<div class="countdown-sep">:</div>';
    countdownHtml += '<div class="countdown-unit"><span class="countdown-value">' + hours + '</span><span class="countdown-label">ore</span></div>';
    countdownHtml += '<div class="countdown-sep">:</div>';
    countdownHtml += '<div class="countdown-unit"><span class="countdown-value">' + mins + '</span><span class="countdown-label">min</span></div>';
    countdownHtml += '</div>';
    countdownHtml += '<div class="countdown-msg">' + countdownMsg + '</div>';
    countdownHtml += '</div>';
  }

  // Post-trip: show end-of-trip image after June 14
  var tripEnd = new Date(2026, 5, 14, 23, 59);
  if (now > tripEnd) {
    countdownHtml = '<div style="text-align:center;margin-bottom:14px;">';
    countdownHtml += '<img src="icons/end-trip.jpeg" style="width:100%;border-radius:var(--radius);box-shadow:var(--shadow);" alt="Fine viaggio">';
    countdownHtml += '<div style="font-size:0.85rem;font-weight:600;opacity:0.6;margin-top:8px;">Ce l\'abbiamo fatta. 🏔️</div>';
    countdownHtml += '</div>';
  }

  // Nav grid — directly, no status cards
  var navItems = getNavOrder();
  var gh = '<div class="nav-grid" id="home-nav-grid">';
  for (var j = 0; j < navItems.length; j++) {
    var it = navItems[j];
    var iconHtml = '';
    if (it.icon) {
      iconHtml = '<img src="' + it.icon + '" alt="' + it.label + '" class="nav-grid-img">';
    } else {
      iconHtml = '<span class="nav-grid-icon">' + it.emoji + '</span>';
    }
    gh += '<a class="nav-grid-item" href="' + it.href + '" data-href="' + it.href + '" draggable="false">' +
      iconHtml +
      '<span class="nav-grid-label">' + it.label + '</span></a>';
  }
  gh += '</div>';
  gh += '<div style="text-align:center;margin-top:20px;padding-bottom:12px;display:flex;justify-content:center;gap:16px;">';
  var dmIcon = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  gh += '<button onclick="toggleDarkMode()" type="button" id="dark-toggle" style="background:none;border:none;font-size:1.4rem;cursor:pointer;opacity:0.5;padding:8px;" aria-label="Dark Mode">' + dmIcon + '</button>';
  if (!window.IS_DEMO_MODE) {
    gh += '<button onclick="fullSync()" type="button" style="background:none;border:none;font-size:1.4rem;cursor:pointer;opacity:0.5;padding:8px;" aria-label="Sincronizza">🔄</button>';
  }
  gh += '<button onclick="startReorder()" type="button" id="reorder-btn" style="background:none;border:none;font-size:1.4rem;cursor:pointer;opacity:0.5;padding:8px;" aria-label="Riordina">✏️</button>';
  gh += '<button onclick="if(window.showAchievements)showAchievements()" type="button" style="background:none;border:none;font-size:1.4rem;cursor:pointer;opacity:0.5;padding:8px;" aria-label="Achievements">🏆</button>';
  gh += '</div>';

  wrapper.innerHTML = countdownHtml + gh;

  setTimeout(function () { initGridReorder(); }, 50);

  return wrapper;
}

window.startReorder = function() {
  var grid = document.getElementById('home-nav-grid');
  if (!grid) return;
  if (grid.classList.contains('reorder-mode')) return;
  grid.dispatchEvent(new CustomEvent('enter-reorder'));
};

function initGridReorder() {
  var grid = document.getElementById('home-nav-grid');
  if (!grid) return;

  var isReorderMode = false;

  function enterReorderMode() {
    isReorderMode = true;
    grid.classList.add('reorder-mode');
    // Hide the reorder button
    var btn = document.getElementById('reorder-btn');
    if (btn) btn.style.display = 'none';
    // Add hint
    var hint = document.createElement('div');
    hint.id = 'reorder-hint';
    hint.className = 'reorder-hint';
    hint.innerHTML = 'Tocca le frecce per spostare · <button id="reorder-done" class="btn btn-sm btn-primary" type="button">✓ Fatto</button>';
    grid.parentElement.insertBefore(hint, grid);
    document.getElementById('reorder-done').addEventListener('click', exitReorderMode);
    if (navigator.vibrate) navigator.vibrate(50);
    // Add move buttons to each item
    addMoveButtons();
  }

  function exitReorderMode() {
    isReorderMode = false;
    grid.classList.remove('reorder-mode');
    var hint = document.getElementById('reorder-hint');
    if (hint) hint.remove();
    // Show the reorder button again
    var btn = document.getElementById('reorder-btn');
    if (btn) btn.style.display = '';
    // Remove move buttons
    var moveBtns = grid.querySelectorAll('.reorder-arrows');
    for (var i = 0; i < moveBtns.length; i++) moveBtns[i].remove();
    // Save order
    var items = grid.querySelectorAll('.nav-grid-item');
    var order = [];
    for (var i = 0; i < items.length; i++) {
      var href = items[i].getAttribute('data-href');
      if (href) order.push(href);
    }
    localStorage.setItem('kg-nav-order', JSON.stringify(order));
    showToast('Ordine salvato ✓');
  }

  function addMoveButtons() {
    var items = grid.querySelectorAll('.nav-grid-item');
    for (var i = 0; i < items.length; i++) {
      var arrows = document.createElement('div');
      arrows.className = 'reorder-arrows';
      arrows.innerHTML = '<button class="reorder-up" type="button">▲</button><button class="reorder-down" type="button">▼</button>';
      items[i].appendChild(arrows);
    }
    // Bind arrow events
    grid.addEventListener('click', handleArrowClick, true);
  }

  function handleArrowClick(e) {
    if (!isReorderMode) return;
    var upBtn = e.target.closest('.reorder-up');
    var downBtn = e.target.closest('.reorder-down');
    if (!upBtn && !downBtn) {
      // Block navigation in reorder mode
      if (e.target.closest('.nav-grid-item')) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    var item = (upBtn || downBtn).closest('.nav-grid-item');
    if (!item) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll('.nav-grid-item'));
    var idx = items.indexOf(item);

    if (upBtn && idx > 0) {
      grid.insertBefore(item, items[idx - 1]);
      if (navigator.vibrate) navigator.vibrate(20);
    } else if (downBtn && idx < items.length - 1) {
      grid.insertBefore(items[idx + 1], item);
      if (navigator.vibrate) navigator.vibrate(20);
    }
  }

  // Listen for the custom event from the button
  grid.addEventListener('enter-reorder', function() {
    if (!isReorderMode) enterReorderMode();
  });
}
