/**
 * app.js — Entry point, hash router, Service Worker initialization
 * Kyrgyzstan Travel PWA 2025
 *
 * Loaded AFTER db.js, data.js, editable.js, and all section scripts.
 * All render functions (renderHome, renderItinerary, etc.) are globals.
 */

/* ---- One-shot Diario restore (v1) ----
 * Recovers the user's hand-written Diario entries that were lost during a
 * cache/data clear. Runs once per device (guard flag in localStorage),
 * merges by text so existing entries are preserved bit-for-bit, never
 * overwrites anything already present, never runs in demo mode.
 */
(function () {
  try {
    if (typeof window === 'undefined') return;
    if (window.IS_DEMO_MODE) return;
    var FLAG = 'kg-diario-restored-v1';
    if (localStorage.getItem(FLAG)) return;

    var existing;
    try { existing = JSON.parse(localStorage.getItem('kg-diario') || '[]'); }
    catch (e) { existing = []; }
    if (!Array.isArray(existing)) existing = [];

    var existingTexts = {};
    for (var ei = 0; ei < existing.length; ei++) {
      if (existing[ei] && typeof existing[ei].text === 'string') {
        existingTexts[existing[ei].text.trim()] = true;
      }
    }

    var entries = [
      { d: '2026-06-07', t: 'Carina quella con il nasone' },
      { d: '2026-06-07', t: 'Video con il teschio' },
      { d: '2026-06-07', t: 'Attraversato un ponte crollato e tornati indietro' },
      { d: '2026-06-06', t: 'Ospitalit\u00e0 di Begimay, la quarantenne 24enne' },
      { d: '2026-06-06', t: 'Sapone che sa di tabacco' },
      { d: '2026-06-02', t: 'Guado del Fiume su un tronco bagnato' },
      { d: '2026-06-01', t: 'Mega Ippodromo lungo lago' },
      { d: '2026-06-01', t: 'La carne della brace lungo il fiume vs er pollo duro della signora' },
      { d: '2026-06-01', t: 'Corsetta mattutina lungo il Lago Issyk Kul' },
      { d: '2026-05-31', t: 'Il gene K nelle donne kirghise' },
      { d: '2026-05-31', t: 'Ruota panoramica sorretta dagli pneumatici' },
      { d: '2026-05-30', t: 'Maksym is a beloved, highly nutritious traditional Kyrgyz beverage made from roasted grains (such as barley, wheat, and corn), water, and a natural fermentation starter. Revered as a staple of nomadic culture, you can easily grab it on tap from street kiosks across Bishkek or learn more about its cultural significance via UNESCO Intangible Cultural Heritage.' },
      { d: '2026-05-30', t: 'Bozo is a traditional, centuries-old fermented grain beverage widely referred to as "Kyrgyz beer". It is a thick, lightly alcoholic porridge (typically 4\u20136% ABV) with a distinctively sweet, tangy, and sour flavor profile' },
      { d: '2026-05-30', t: 'Siamo entrati nella macchina di uno a caso, mentre il nostro taxi per il centro citt\u00e0 era poco pi\u00f9 avanti' },
      { d: '2026-05-30', t: 'Conosciuto Jasmine e Anna all\u2019aeroporto' }
    ];

    var added = 0;
    var slotOffset = 0;
    for (var i = 0; i < entries.length; i++) {
      var rec = entries[i];
      if (existingTexts[rec.t.trim()]) continue;
      // Anchor each entry at 12:00 local time of its date plus a per-entry
      // minute offset so the ts (and the 'di-...' id) is unique and stable.
      var dt = new Date(rec.d + 'T12:00:00');
      dt.setMinutes(dt.getMinutes() + slotOffset++);
      existing.push({ id: 'di-restore-' + dt.getTime(), text: rec.t, ts: dt.getTime() });
      added++;
    }

    if (added > 0) {
      localStorage.setItem('kg-diario', JSON.stringify(existing));
    }
    localStorage.setItem(FLAG, '1');
  } catch (err) {
    // Never let the restore break app boot.
    try { console.warn('Diario restore skipped:', err); } catch (_) {}
  }
})();

(function () {
  'use strict';

  /* ---- Route map ---- */
  var ROUTES = {
    '#/':            renderHome,
    '#/itinerario':  renderItinerary,
    '#/checklist':   renderChecklist,
    '#/budget':      renderBudget,
    '#/frasario':    renderPhrasebook,
    '#/sos':         renderSos,
    '#/droni':       renderDrone,
    '#/altitudine':  renderAltitude,
    '#/gps':         renderGps,
    '#/info':        renderInfo,
    '#/strade':      renderRoads,
    '#/veicolo':     renderVehicle,
    '#/navigazione': renderNavigation,
    '#/documenti':   renderDocuments,
    '#/before-leaving': renderBeforeLeaving,
    '#/mappe':       renderMaps,
    '#/piatti':      renderPiatti,
    '#/extras':      renderExtras
  };

  /* ---- Section Navigation ---- */
  var SECTION_ORDER = [
    '#/itinerario', '#/mappe', '#/budget', '#/frasario', '#/checklist',
    '#/gps', '#/info', '#/documenti', '#/veicolo', '#/navigazione',
    '#/altitudine', '#/piatti', '#/before-leaving'
  ];

  window.navigateSection = function (dir) {
    var current = window.location.hash || '#/';
    var idx = SECTION_ORDER.indexOf(current);
    if (idx === -1) idx = 0;
    var next = idx + dir;
    if (next < 0) next = SECTION_ORDER.length - 1;
    if (next >= SECTION_ORDER.length) next = 0;
    window.location.hash = SECTION_ORDER[next];
  };

  /* ---- Helpers ---- */

  function currentHash() {
    return window.location.hash || '#/';
  }

  function isHome(hash) {
    return hash === '#/' || hash === '' || hash === '#';
  }

  /* ---- Navigation ---- */

  function navigate() {
    var hash = currentHash();
    var container = document.getElementById('app');
    var nav = document.getElementById('bottom-nav');

    // Show / hide bottom nav (hidden on home)
    if (isHome(hash)) {
      nav.hidden = true;
    } else {
      nav.hidden = false;
    }

    // Resolve render function
    var renderFn = ROUTES[hash];
    if (!renderFn) {
      // Fallback: try without trailing slash or default to home
      renderFn = ROUTES['#/'];
      window.location.hash = '#/';
      return;
    }

    // Clear and render
    container.innerHTML = '';
    try {
      var result = renderFn();
      // Support both string and HTMLElement returns, and Promises
      if (result && typeof result.then === 'function') {
        result.then(function (content) {
          applyContent(container, content);
        });
      } else {
        applyContent(container, result);
      }
    } catch (err) {
      console.error('Errore rendering sezione:', err);
      container.innerHTML =
        '<div class="section-content"><h2>Errore</h2>' +
        '<p>Impossibile caricare la sezione.</p>' +
        '<p><a href="#/">Torna alla Home</a></p></div>';
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function applyContent(container, content) {
    if (typeof content === 'string') {
      container.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      container.appendChild(content);
    }
  }

  /* ---- Service Worker ---- */

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        console.log('SW registrato:', reg.scope);
      }).catch(function (err) {
        console.warn('SW non registrato:', err);
      });
    }
  }

  /* ---- Dark Mode ---- */

  function initDarkMode() {
    // Dark mode is now DEFAULT. Only add light-mode if user explicitly chose it.
    var saved = localStorage.getItem('kg-light-mode');
    if (saved === 'true') {
      document.body.classList.add('light-mode');
    }
    // Remove old dark-mode class if present (backwards compat)
    document.body.classList.remove('dark-mode');
  }

  /** Document viewer overlay (PDF/images) — works inside PWA, offline-safe, with pinch zoom */
  window.openDocViewer = function (src, type, title) {
    var ov = document.createElement('div');
    ov.id = 'doc-viewer-overlay';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:700;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;animation:fadeIn 0.2s;';
    var bodyHtml = '';
    if (type === 'pdf') {
      // <object> with fallback: works better in PWA standalone than <embed>
      bodyHtml =
        '<object data="' + src + '" type="application/pdf" style="flex:1;width:100%;height:100%;border:none;background:#fff;">' +
          '<div style="padding:24px;color:#fff;text-align:center;">' +
            '<p>Il browser non riesce a mostrare il PDF inline.</p>' +
            '<a href="' + src + '" download style="display:inline-block;padding:10px 20px;background:#ff8c42;color:#fff;text-decoration:none;border-radius:8px;margin-top:8px;">⬇️ Scarica PDF</a>' +
            '<a href="' + src + '" target="_blank" rel="noopener" style="display:inline-block;padding:10px 20px;background:rgba(255,255,255,0.2);color:#fff;text-decoration:none;border-radius:8px;margin-top:8px;margin-left:8px;">🔗 Apri in nuovo tab</a>' +
          '</div>' +
        '</object>';
    } else {
      // Image with native pinch zoom (touch-action manipulation)
      bodyHtml = '<div style="flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:0;background:#000;-webkit-overflow-scrolling:touch;">' +
        '<img src="' + src + '" alt="' + title + '" style="max-width:none;max-height:none;width:auto;height:auto;display:block;touch-action:pinch-zoom;" id="doc-viewer-img"/>' +
        '</div>';
    }
    ov.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(0,0,0,0.85);color:#fff;flex-shrink:0;">' +
        '<span style="font-weight:700;font-size:0.95rem;">' + title + '</span>' +
        '<button id="doc-viewer-close" type="button" style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.08);color:#fff;font-size:1.2rem;border-radius:50%;cursor:pointer;flex-shrink:0;">✕</button>' +
      '</div>' +
      bodyHtml;
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';

    // For images: fit to width on load (so pinch zoom is intuitive)
    if (type !== 'pdf') {
      var img = ov.querySelector('#doc-viewer-img');
      if (img) {
        img.addEventListener('load', function () {
          // Default: fit to viewport width
          var maxW = window.innerWidth;
          if (img.naturalWidth > maxW) {
            img.style.width = maxW + 'px';
          }
        });
      }
    }

    var close = function () {
      ov.remove();
      document.body.style.overflow = '';
    };
    ov.querySelector('#doc-viewer-close').addEventListener('click', close);

    // Hardware back button / browser back closes the viewer (no app exit)
    history.pushState({ docViewer: true }, '');
    var onPop = function () { close(); window.removeEventListener('popstate', onPop); };
    window.addEventListener('popstate', onPop);
  };

  /** Toggle light/dark mode — can be called from any section */
  window.toggleDarkMode = function () {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('kg-light-mode', String(isLight));
    var btn = document.getElementById('dark-toggle');
    if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  };

  /** Refresh app — clear SW cache and reload.
   *  On Android (Chrome and Capacitor WebView) `reload(true)` is deprecated
   *  and ignored, so we add a cache-busting query string to force a fresh
   *  fetch from network/SW even when the WebView's HTTP cache is sticky.
   */
  window.refreshApp = function () {
    showToast('Aggiornamento...');
    function hardReload() {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('_kgrefresh', String(Date.now()));
        window.location.replace(url.toString());
      } catch (_) {
        // Older WebViews may not support URL — fall back to reload.
        window.location.reload();
      }
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        var unregP = reg ? reg.unregister().catch(function () {}) : Promise.resolve();
        unregP.then(function () {
          if (typeof caches !== 'undefined' && caches.keys) {
            caches.keys().then(function (names) {
              return Promise.all(names.map(function (n) { return caches.delete(n); }));
            }).then(hardReload, hardReload);
          } else {
            hardReload();
          }
        });
      }).catch(hardReload);
    } else {
      hardReload();
    }
  };

  /** Easter Eggs */

  // 5 swipe left = +1 bestemmia
  (function() {
    var swipeLefts = [];
    var swipeStartX = 0;
    document.addEventListener('touchstart', function(e) {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });
    document.addEventListener('touchend', function(e) {
      var dx = swipeStartX - e.changedTouches[0].clientX;
      if (dx > 60) { // swipe left detected
        var now = Date.now();
        swipeLefts.push(now);
        swipeLefts = swipeLefts.filter(function(t) { return now - t < 4000; });
        if (swipeLefts.length >= 5) {
          swipeLefts = [];
          // Add bestemmia
          var count = parseInt(localStorage.getItem('kg-bestemmie') || '0') + 1;
          var tripStart = new Date(2026, 4, 30);
          if (new Date() >= tripStart) {
            localStorage.setItem('kg-bestemmie', String(count));
          }
          // Track daily
          var today = new Date().toDateString();
          var dailyKey = 'kg-bestemmie-' + today;
          var daily = parseInt(localStorage.getItem(dailyKey) || '0') + 1;
          localStorage.setItem(dailyKey, String(daily));
          var record = parseInt(localStorage.getItem('kg-bestemmie-record') || '0');
          if (daily > record) localStorage.setItem('kg-bestemmie-record', String(daily));
          // Achievement
          if (count >= 10 && window.unlockAchievement) window.unlockAchievement('bestemmie-10');
          if (count >= 50 && window.unlockAchievement) window.unlockAchievement('bestemmie-50');
          // Feedback
          if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
          var reactions = [
            '🤬 +1 — Dio ti sente.',
            '🤬 La Subaru approva.',
            '🤬 Il passo ha sentito.',
            '🤬 ' + count + ' totali. Record in vista!',
            '🤬 I kirghizi sono scioccati.',
            '🤬 La yurta trema.',
            '🤬 Il kumys si è inacidito.',
            '🤬 GPS: ricalcolo morale.',
            '🤬 Un angelo ha perso le ali.',
            '🤬 La pecora sulla strada si è offesa.',
            '🤬 Anche lo yak si è girato.',
            '🤬 Il meccanico di Kazarman piange.',
            '🤬 Naryn-Kazarman: 1, Dignità: 0.',
            '🤬 Il tuo karma è in rosso.',
            '🤬 Nuova buca sbloccata.',
            '🤬 La montagna ti giudica.',
            '🤬 Il nomade nella yurta ha sentito.',
            '🤬 Complimenti, hai svegliato l\'aquila.',
            '🤬 Il confine cinese si è chiuso da solo.',
            '🤬 Anche il WiFi è scappato.',
            '🤬 La tenda si è smontata per protesta.',
            '🤬 Il kumys è diventato vodka.',
            '🤬 Son-Kul si è ghiacciato per lo shock.',
            '🤬 Un pastore ti ha tolto il saluto.',
            '🤬 La Subaru ha perso un pezzo per solidarietà.',
            '🤬 Kel-Suu si è prosciugato.',
            '🤬 Il tuo compagno di viaggio finge di non conoscerti.',
            '🤬 Hai sbloccato il livello "camionista kirghizo".',
            '🤬 La strada sterrata ride di te.',
            '🤬 Tash Rabat si è chiuso per ferie.'
          ];
          showToast(reactions[Math.floor(Math.random() * reactions.length)]);
        }
      }
    }, { passive: true });
  })();

  // Long press on SOS button (4s) = Easter Egg menu, tap = SOS section
  (function() {
    var sosLongPress = null;
    var sosTriggered = false;
    document.addEventListener('touchstart', function(e) {
      var sos = e.target.closest('.sos-btn');
      if (sos) {
        sosTriggered = false;
        sosLongPress = setTimeout(function() {
          sosLongPress = null;
          sosTriggered = true;
          document.dispatchEvent(new Event('show-ee-menu'));
          if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        }, 4000);
      }
    }, { passive: true });
    document.addEventListener('touchend', function(e) {
      if (sosLongPress) {
        clearTimeout(sosLongPress);
        sosLongPress = null;
      }
      // Short tap — let the onclick handle it (already in HTML)
    }, { passive: true });
    document.addEventListener('touchmove', function() {
      if (sosLongPress) { clearTimeout(sosLongPress); sosLongPress = null; }
    }, { passive: true });
    // Block context menu on SOS to prevent text selection on long press
    document.addEventListener('contextmenu', function(e) {
      if (e.target.closest('.sos-btn')) e.preventDefault();
    });
  })();

  // Secret message — tap header logo 3 times
  var logoTaps = 0;
  document.addEventListener('click', function(e) {
    var logo = e.target.closest('.app-title');
    var logoImg = e.target.closest('img[alt="Kyrgy"]');
    if (logo || logoImg) {
      logoTaps++;
      clearTimeout(window._logoTimer);
      window._logoTimer = setTimeout(function() { logoTaps = 0; }, 3000);
      if (logoTaps >= 3) {
        logoTaps = 0;
        var savedMsg = localStorage.getItem('kg-secret-msg') || 'Edu, se stai leggendo questo...\n\nPreparati a guidare sulla Naryn-Kazarman road. Se sopravviviamo, ci beviamo un kumys. 🐴\n\n— Leo';
        var editTaps = 0;
        var msg = document.createElement('div');
        msg.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:20px;';

        function showReadMode() {
          msg.innerHTML = '<div style="max-width:340px;width:100%;text-align:center;color:#fff;">' +
            '<div id="secret-flag" style="font-size:2rem;margin-bottom:12px;cursor:pointer;"><img src="icons/flag-original.svg" style="width:60px;height:36px;"></div>' +
            '<div id="secret-title" style="font-size:1.2rem;font-weight:700;color:var(--color-secondary);margin-bottom:14px;cursor:pointer;">Messaggio Segreto</div>' +
            '<div style="font-size:1rem;line-height:1.6;margin-bottom:20px;white-space:pre-wrap;">' + savedMsg.replace(/</g,'&lt;').replace(/\n/g,'<br>') + '</div>' +
            '<button id="secret-close" style="padding:8px 20px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;">Chiudi</button></div>';
          msg.querySelector('#secret-close').addEventListener('click', function() { msg.remove(); });
          // 3 taps on flag or title to enable edit
          var editTarget = function() {
            editTaps++;
            clearTimeout(window._editTimer);
            window._editTimer = setTimeout(function() { editTaps = 0; }, 2000);
            if (editTaps >= 3) { editTaps = 0; showEditMode(); }
          };
          msg.querySelector('#secret-flag').addEventListener('click', editTarget);
          msg.querySelector('#secret-title').addEventListener('click', editTarget);
        }

        function showEditMode() {
          msg.innerHTML = '<div style="max-width:340px;width:100%;text-align:center;color:#fff;">' +
            '<div style="font-size:1.2rem;font-weight:700;color:var(--color-secondary);margin-bottom:10px;">✏️ Modifica Messaggio</div>' +
            '<textarea id="secret-msg-input" style="width:100%;min-height:140px;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:0.95rem;font-family:inherit;resize:vertical;line-height:1.5;">' + savedMsg.replace(/</g,'&lt;') + '</textarea>' +
            '<div style="display:flex;gap:8px;margin-top:12px;justify-content:center;">' +
            '<button id="secret-save" style="padding:8px 20px;border:none;border-radius:8px;background:var(--color-secondary);color:#fff;font-weight:700;cursor:pointer;">💾 Salva</button>' +
            '<button id="secret-cancel" style="padding:8px 20px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;">Annulla</button></div></div>';
          msg.querySelector('#secret-cancel').addEventListener('click', function() { showReadMode(); });
          msg.querySelector('#secret-save').addEventListener('click', function() {
            var newMsg = document.getElementById('secret-msg-input').value;

            savedMsg = newMsg;
            localStorage.setItem('kg-secret-msg', savedMsg);
            localStorage.setItem('kg-secret-msg-time', String(Date.now()));
            showToast('Messaggio salvato ✓');
            // Auto-sync to cloud if online
            if (window.syncSecretMessage) { window.syncSecretMessage(); }
            showReadMode();
          });
        }

        document.body.appendChild(msg);
        showReadMode();
      }
    }
  });

  // Eagle easter egg: 3 swipe-ups in 2 seconds
  var swipeUps = [];
  var swipeStartY = 0;
  document.addEventListener('touchstart', function(e) {
    swipeStartY = e.touches[0].clientY;
  });
  document.addEventListener('touchend', function(e) {
    var dy = swipeStartY - e.changedTouches[0].clientY;
    if (dy < -60) { // swipe DOWN detected
      var now = Date.now();
      swipeUps.push(now);
      // Keep only swipes in last 2 seconds
      swipeUps = swipeUps.filter(function(t) { return now - t < 2000; });
      if (swipeUps.length >= 3) {
        swipeUps = [];
        flyEagle();
      }
    }
  });

  function flyEagle() {
    var eagle = document.createElement('div');
    eagle.innerHTML = '<img src="icons/aquila.png" style="width:150px;height:auto;">';
    eagle.style.cssText = 'position:fixed;top:30%;z-index:500;pointer-events:none;transition:none;';
    eagle.style.right = '-150px';
    document.body.appendChild(eagle);
    showToast('🦅 L\'aquila del Kyrgyzstan!');
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
    // Fly from right to left (faster)
    var pos = -150;
    var upDown = 0;
    function animate() {
      pos += 8;
      upDown = Math.sin(pos / 30) * 15;
      eagle.style.right = pos + 'px';
      eagle.style.top = (30 + upDown / window.innerHeight * 100) + '%';
      if (pos < window.innerWidth + 200) {
        requestAnimationFrame(animate);
      } else {
        eagle.remove();
      }
    }
    animate();
  }

  // Subaru shake/game
  var subaruTaps = 0;
  window.shakeSubaru = function () {
    subaruTaps++;
    if (subaruTaps >= 5) {
      subaruTaps = 0;
      if (typeof startGame === 'function') startGame();
    } else if (subaruTaps >= 2 && subaruTaps < 5) {
      var img = document.getElementById('subaru-img');
      if (img && subaruTaps === 2) {
        img.classList.add('subaru-shaking');
        showToast('🚗💨 Continua...');
        if (navigator.vibrate) navigator.vibrate([100,50,100]);
        setTimeout(function () { img.classList.remove('subaru-shaking'); }, 2000);
      } else {
        showToast('🎮 ' + (5 - subaruTaps) + '...');
      }
    }
    // Reset counter after 3 seconds of no taps
    clearTimeout(window._subaruTimer);
    window._subaruTimer = setTimeout(function () { subaruTaps = 0; }, 3000);
  };

  // Altitude sickness - tap on rows above 3500m
  window.altitudeSick = function () {
    var app = document.getElementById('app');
    if (app) {
      app.classList.add('altitude-sick');
      showToast('🏔️ Mal di montagna! Occhio all\'altitudine! 💧');
      if (navigator.vibrate) navigator.vibrate(100);
      setTimeout(function () { app.classList.remove('altitude-sick'); }, 2000);
    }
  };

  /** Animate header car */
  var carAnimating = false;
  window.animateCar = function () {
    if (carAnimating) return;
    var car = document.getElementById('header-car');
    if (!car) return;
    carAnimating = true;
    car.classList.add('car-animating');
    setTimeout(function () {
      car.classList.remove('car-animating');
      car.style.transform = 'scaleX(1)';
      carAnimating = false;
    }, 4100);
  };

  /* ---- Toast utility ---- */

  window.showToast = function (message, duration) {
    duration = duration || 2000;
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger show
    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, duration);
  };

  function hideSplash() {
    var splash = document.getElementById('splash-screen');
    if (splash) {
      // Minimum 1 second display on Android app
      var minTime = 2000;
      setTimeout(function () {
        splash.style.opacity = '0';
        setTimeout(function () { splash.remove(); }, 500);
      }, minTime);
    }
  }

  /* ---- Easter Egg: Conta Bestemmie ---- */
  window.showBestemmiometer = function() {
    var count = parseInt(localStorage.getItem('kg-bestemmie') || '0');
    var record = parseInt(localStorage.getItem('kg-bestemmie-record') || '0');
    var startDate = localStorage.getItem('kg-bestemmie-start') || String(Date.now());
    if (!localStorage.getItem('kg-bestemmie-start')) localStorage.setItem('kg-bestemmie-start', startDate);
    var daysElapsed = Math.max(1, Math.ceil((Date.now() - parseInt(startDate)) / 86400000));
    var avg = (count / daysElapsed).toFixed(1);

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:20px;';
    overlay.innerHTML = '<div style="max-width:320px;width:100%;text-align:center;color:#fff;">' +
      '<div style="font-size:2.5rem;margin-bottom:8px;">🤬</div>' +
      '<div style="font-size:1.3rem;font-weight:800;color:var(--color-accent);margin-bottom:16px;">Bestemmiometro</div>' +
      '<div style="font-size:4rem;font-weight:900;color:#fff;margin-bottom:4px;" id="bestemmie-count">' + count + '</div>' +
      '<div style="font-size:0.8rem;opacity:0.5;margin-bottom:20px;">bestemmie totali</div>' +
      '<div style="display:flex;justify-content:space-around;margin-bottom:20px;">' +
      '<div><div style="font-size:1.4rem;font-weight:700;">' + avg + '</div><div style="font-size:0.7rem;opacity:0.5;">media/giorno</div></div>' +
      '<div><div style="font-size:1.4rem;font-weight:700;">' + record + '</div><div style="font-size:0.7rem;opacity:0.5;">record giornaliero</div></div>' +
      '<div><div style="font-size:1.4rem;font-weight:700;">' + daysElapsed + '</div><div style="font-size:0.7rem;opacity:0.5;">giorni</div></div>' +
      '</div>' +
      '<button id="bestemmia-btn" type="button" style="width:100%;padding:16px;border:none;border-radius:12px;background:var(--color-danger);color:#fff;font-size:1.2rem;font-weight:800;cursor:pointer;margin-bottom:10px;">+1 BESTEMMIA 🔥</button>' +
      '<button id="bestemmia-close" type="button" style="padding:8px 20px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;">Chiudi</button>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector('#bestemmia-close').addEventListener('click', function() { overlay.remove(); });
    overlay.querySelector('#bestemmia-btn').addEventListener('click', function() {
      count++;
      // Only count for real from May 30, 2026
      var tripStart = new Date(2026, 4, 30);
      var isTrip = new Date() >= tripStart;
      if (isTrip) {
        localStorage.setItem('kg-bestemmie', String(count));
      }
      // Track daily for record
      var today = new Date().toDateString();
      var dailyKey = 'kg-bestemmie-' + today;
      var daily = parseInt(localStorage.getItem(dailyKey) || '0') + 1;
      localStorage.setItem(dailyKey, String(daily));
      if (daily > record) {
        record = daily;
        localStorage.setItem('kg-bestemmie-record', String(record));
      }
      overlay.querySelector('#bestemmie-count').textContent = count;
      if (navigator.vibrate) navigator.vibrate(50);
      // Achievement triggers
      if (count >= 10 && window.unlockAchievement) window.unlockAchievement('bestemmie-10');
      if (count >= 50 && window.unlockAchievement) window.unlockAchievement('bestemmie-50');
      // Random reaction
      var reactions = ['Dio ti sente.', 'La Subaru approva.', 'Il passo ha sentito.', 'Record in vista!', 'Kirghizi scioccati.', 'La yurta trema.', 'Il kumys si è inacidito.', 'GPS: ricalcolo morale.'];
      showToast('🤬 ' + reactions[Math.floor(Math.random() * reactions.length)]);
    });
  };

  /* ---- Easter Egg: Probabilità di Sopravvivenza ---- */
  window.showSurvivalRate = function(roadName) {
    var rates = {
      'Naryn-Kazarman': { base: 68, subtitle: 'La strada che Dio ha dimenticato' },
      'Torugart Pass': { base: 74, subtitle: 'Dove l\'ossigeno è opzionale' },
      'Bishkek-Osh': { base: 82, subtitle: 'Solo 600km di preghiere' },
      'Song-Kul': { base: 71, subtitle: 'Fango, yak, e speranza' },
      'Inylchek': { base: 55, subtitle: 'Nemmeno Google ci va' },
      'default': { base: 75, subtitle: 'Probabilmente sopravvivrete' }
    };
    var road = rates[roadName] || rates['default'];
    var survival = road.base + Math.floor(Math.random() * 15) - 7; // ±7 random
    survival = Math.max(42, Math.min(95, survival));

    var color = survival > 80 ? '#27ae60' : survival > 65 ? '#f39c12' : '#c0392b';

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:20px;';
    overlay.innerHTML = '<div style="max-width:320px;width:100%;text-align:center;color:#fff;">' +
      '<div style="font-size:1rem;font-weight:700;opacity:0.6;margin-bottom:6px;">' + (roadName || 'Questa strada') + '</div>' +
      '<div style="font-size:0.85rem;opacity:0.4;margin-bottom:20px;font-style:italic;">' + road.subtitle + '</div>' +
      '<div style="position:relative;width:180px;height:180px;margin:0 auto 20px;">' +
      '<svg viewBox="0 0 36 36" style="width:180px;height:180px;transform:rotate(-90deg);">' +
      '<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3"/>' +
      '<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="' + color + '" stroke-width="3" stroke-dasharray="' + survival + ', 100" stroke-linecap="round"/>' +
      '</svg>' +
      '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2.8rem;font-weight:900;">' + survival + '%</div>' +
      '</div>' +
      '<div style="font-size:1.1rem;font-weight:700;margin-bottom:6px;">Probabilità di Sopravvivenza</div>' +
      '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:20px;">(basato su dati completamente inventati)</div>' +
      '<button id="survival-close" type="button" style="padding:8px 20px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;">Ho capito, andiamo comunque</button>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#survival-close').addEventListener('click', function() { overlay.remove(); });
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  /* ---- Easter Egg: Achievements ---- */
  var ACHIEVEMENTS = [
    { id: 'first-kumys', icon: '🥛', title: 'Primo Kumys', desc: 'Hai bevuto latte di cavalla fermentato. Sei ufficialmente kirghizo.' },
    { id: 'no-asphalt', icon: '🛣️', title: '2 Ore Senza Asfalto', desc: 'La strada è un concetto, non una realtà.' },
    { id: 'subaru-alive', icon: '🚗', title: 'La Subaru Vive', desc: 'Ancora. Per ora.' },
    { id: 'altitude-4000', icon: '🏔️', title: 'Club 4000m', desc: 'L\'aria è sottile. Le tue decisioni anche.' },
    { id: 'lost-gps', icon: '📡', title: 'GPS Arreso', desc: 'Google Maps ha detto "arrangiati".' },
    { id: 'yurt-sleep', icon: '🏕️', title: 'Notte in Yurta', desc: 'Dormito con 3 strati e ancora freddo.' },
    { id: 'river-cross', icon: '🌊', title: 'Guado Superato', desc: 'La macchina non è un sottomarino. Forse.' },
    { id: 'bestemmie-10', icon: '🤬', title: '10 Bestemmie', desc: 'La Naryn-Kazarman ti ha cambiato.' },
    { id: 'bestemmie-50', icon: '😈', title: '50 Bestemmie', desc: 'Il papa ti ha scomunicato via satellite.' },
    { id: 'full-tank', icon: '⛽', title: 'Serbatoio Pieno', desc: 'Prossima benzina: 300km. Buona fortuna.' },
    { id: 'horse-ride', icon: '🐴', title: 'Cavaliere Kirghizo', desc: 'Sei salito su un cavallo. Sei sceso intero.' },
    { id: 'survived', icon: '🏆', title: 'Sopravvissuto', desc: 'Sei tornato. La Subaru... meno.' },
    { id: 'night-drive', icon: '🌙', title: 'Guida Notturna', desc: 'Nessuna luce. Nessun guard-rail. Nessun rimpianto.' },
    { id: 'sheep-jam', icon: '🐑', title: 'Traffico Kirghizo', desc: '200 pecore sulla strada. ETA: sconosciuto.' },
    { id: 'photo-1000', icon: '📸', title: '1000 Foto', desc: 'Il telefono piange. La memoria pure.' }
  ];

  window.unlockAchievement = function(achievementId) {
    var unlocked = JSON.parse(localStorage.getItem('kg-achievements') || '[]');
    if (unlocked.indexOf(achievementId) !== -1) return; // Already unlocked
    unlocked.push(achievementId);
    localStorage.setItem('kg-achievements', JSON.stringify(unlocked));

    var ach = null;
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
      if (ACHIEVEMENTS[i].id === achievementId) { ach = ACHIEVEMENTS[i]; break; }
    }
    if (!ach) return;

    // Show Xbox-style notification
    var notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:-80px;left:50%;transform:translateX(-50%);z-index:600;background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:12px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.5);transition:top 0.5s cubic-bezier(0.34,1.56,0.64,1);max-width:340px;width:90%;';
    notif.innerHTML = '<div style="font-size:2rem;">' + ach.icon + '</div>' +
      '<div><div style="font-size:0.65rem;font-weight:700;letter-spacing:2px;color:#ffd700;text-transform:uppercase;">🏆 Achievement Unlocked</div>' +
      '<div style="font-size:0.95rem;font-weight:700;color:#fff;margin-top:2px;">' + ach.title + '</div>' +
      '<div style="font-size:0.75rem;color:rgba(255,255,255,0.6);margin-top:1px;">' + ach.desc + '</div></div>';
    document.body.appendChild(notif);

    setTimeout(function() { notif.style.top = '20px'; }, 50);
    setTimeout(function() { notif.style.top = '-80px'; }, 4000);
    setTimeout(function() { notif.remove(); }, 4500);
    if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
  };

  window.showAchievements = function() {
    var unlocked = JSON.parse(localStorage.getItem('kg-achievements') || '[]');
    var unlockMode = false;
    var trophyTaps = 0;

    function renderAch() {
      var overlay = document.getElementById('ach-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ach-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,0.92);display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;';
        document.body.appendChild(overlay);
      }
      unlocked = JSON.parse(localStorage.getItem('kg-achievements') || '[]');

      var h = '<div style="max-width:360px;width:100%;padding-bottom:40px;">';
      h += '<div style="text-align:center;margin-bottom:20px;">';
      h += '<div id="ach-trophy" style="font-size:2rem;cursor:pointer;user-select:none;-webkit-user-select:none;">🏆</div>';
      h += '<div style="font-size:1.2rem;font-weight:800;color:#ffd700;">Achievements</div>';
      h += '<div style="font-size:0.8rem;opacity:0.5;color:#fff;">' + unlocked.length + ' / ' + ACHIEVEMENTS.length + ' sbloccati</div>';
      if (unlockMode) h += '<div style="font-size:0.75rem;color:var(--color-accent);margin-top:4px;">🔓 Modalità sblocco — tap per sbloccare</div>';
      h += '</div>';

      for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var a = ACHIEVEMENTS[i];
        var isUnlocked = unlocked.indexOf(a.id) !== -1;
        h += '<div class="ach-row" data-achid="' + a.id + '" style="display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:8px;border-radius:10px;background:' + (isUnlocked ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)') + ';border:1px solid ' + (isUnlocked ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.1)') + ';' + (unlockMode && !isUnlocked ? 'cursor:pointer;' : '') + '">';
        h += '<div style="font-size:1.8rem;opacity:' + (isUnlocked ? '1' : '0.3') + ';">' + (isUnlocked ? a.icon : '🔒') + '</div>';
        h += '<div style="flex:1;"><div style="font-size:0.9rem;font-weight:700;color:' + (isUnlocked ? '#fff' : 'rgba(255,255,255,0.4)') + ';">' + a.title + '</div>';
        h += '<div style="font-size:0.75rem;color:' + (isUnlocked ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)') + ';">' + (isUnlocked ? a.desc : (unlockMode ? 'tap per sbloccare' : '???')) + '</div></div>';
        if (unlockMode && !isUnlocked) h += '<div style="font-size:0.8rem;color:var(--color-accent);">🔓</div>';
        if (isUnlocked) h += '<div style="font-size:0.8rem;color:#27ae60;">✅</div>';
        h += '</div>';
      }

      h += '<button id="ach-close" type="button" style="display:block;margin:20px auto 0;padding:10px 24px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;font-size:0.9rem;">Chiudi</button>';
      h += '</div>';
      overlay.innerHTML = h;

      // Close
      overlay.querySelector('#ach-close').addEventListener('click', function() { overlay.remove(); });

      // 3 taps on trophy = unlock mode
      overlay.querySelector('#ach-trophy').addEventListener('click', function() {
        trophyTaps++;
        clearTimeout(window._trophyTimer);
        window._trophyTimer = setTimeout(function() { trophyTaps = 0; }, 2000);
        if (trophyTaps >= 3) {
          trophyTaps = 0;
          unlockMode = !unlockMode;
          if (unlockMode) showToast('🔓 Modalità sblocco attivata');
          else showToast('🔒 Modalità sblocco disattivata');
          renderAch();
        }
      });

      // Unlock on tap (only in unlock mode)
      if (unlockMode) {
        var rows = overlay.querySelectorAll('.ach-row');
        for (var r = 0; r < rows.length; r++) {
          rows[r].addEventListener('click', function() {
            var achId = this.getAttribute('data-achid');
            var current = JSON.parse(localStorage.getItem('kg-achievements') || '[]');
            if (current.indexOf(achId) !== -1) return;
            if (window.unlockAchievement) window.unlockAchievement(achId);
            setTimeout(function() { renderAch(); }, 500);
          });
        }
      }
    }

    renderAch();
  };

  /* ---- Easter Egg: 3-Finger Shake → Easter Egg Menu ---- */
  (function() {
    var touchingFingers = 0;
    var shakeCount = 0;
    var lastShake = 0;
    var lastX = null, lastY = null, lastZ = null;

    // Track 3 fingers on screen
    document.addEventListener('touchstart', function(e) {
      touchingFingers = e.touches.length;
    }, { passive: true });
    document.addEventListener('touchend', function() {
      touchingFingers = 0;
    }, { passive: true });

    // Detect shake while 3 fingers are down
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(e) {
        if (touchingFingers < 3) { shakeCount = 0; return; }
        var acc = e.accelerationIncludingGravity;
        if (!acc) return;
        if (lastX !== null) {
          var dx = Math.abs(acc.x - lastX);
          var dy = Math.abs(acc.y - lastY);
          var dz = Math.abs(acc.z - lastZ);
          if (dx + dy + dz > 30) {
            var now = Date.now();
            if (now - lastShake > 300) {
              shakeCount++;
              lastShake = now;
              if (shakeCount >= 2) {
                shakeCount = 0;
                showEasterEggMenu();
              }
            }
          }
        }
        lastX = acc.x; lastY = acc.y; lastZ = acc.z;
      });
    }

    // Fallback for desktop: Ctrl+Shift+E
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        showEasterEggMenu();
      }
    });

    // Fallback: 7 taps on logo
    document.addEventListener('show-ee-menu', function() {
      showEasterEggMenu();
    });

    function showEasterEggMenu() {
      // Don't open if already open
      if (document.getElementById('ee-menu-overlay')) return;

      var eggs = [
        { icon: '💌', name: 'Messaggio Segreto', desc: 'Tap 3x sul logo "Kyrgy"', action: 'logo' },
        { icon: '🥚', name: 'Questo Menu', desc: 'Long press 2s sul bottone SOS', action: 'none' },
        { icon: '🦅', name: 'Aquila Volante', desc: 'Swipe giù 3x veloce', action: 'eagle' },
        { icon: '🎮', name: 'Subaru Game', desc: 'Tap 5x sulla Subaru (Veicolo)', action: 'game' },
        { icon: '🤬', name: 'Bestemmiometro', desc: '5 swipe a sinistra veloci, o da questo menu', action: 'bestemmie' },
        { icon: '☠️', name: 'Probabilità Sopravvivenza', desc: 'Strade → tap su strada proibita', action: 'survival' },
        { icon: '🏆', name: 'Achievements', desc: 'Home → bottone 🏆', action: 'achievements' },
        { icon: '🏔️', name: 'Mal di Montagna', desc: 'Altitudine → tap su riga >3500m', action: 'altitude' },
        { icon: '🚗', name: 'Subaru Animata', desc: 'Tap sulla macchina nell\'header', action: 'car' },
        { icon: '⌨️', name: 'Shortcut Desktop', desc: 'Ctrl+Shift+E', action: 'none' }
      ];

      var overlay = document.createElement('div');
      overlay.id = 'ee-menu-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,0.92);display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;';
      var h = '<div style="max-width:360px;width:100%;padding-bottom:40px;">';
      h += '<div style="text-align:center;margin-bottom:20px;">';
      h += '<div style="font-size:2rem;">🥚</div>';
      h += '<div style="font-size:1.2rem;font-weight:800;color:var(--color-accent);">Easter Eggs</div>';
      h += '<div style="font-size:0.75rem;opacity:0.4;color:#fff;margin-top:4px;">Segreti nascosti nell\'app</div>';
      h += '</div>';

      for (var i = 0; i < eggs.length; i++) {
        var egg = eggs[i];
        h += '<div class="ee-item" data-action="' + egg.action + '" style="display:flex;align-items:center;gap:12px;padding:14px;margin-bottom:8px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);cursor:pointer;">';
        h += '<div style="font-size:1.8rem;flex-shrink:0;">' + egg.icon + '</div>';
        h += '<div><div style="font-size:0.95rem;font-weight:700;color:#fff;">' + egg.name + '</div>';
        h += '<div style="font-size:0.75rem;color:rgba(255,255,255,0.5);">' + egg.desc + '</div></div>';
        h += '</div>';
      }

      h += '<button id="ee-close" type="button" style="display:block;margin:20px auto 0;padding:10px 24px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;cursor:pointer;font-size:0.9rem;">Chiudi</button>';
      h += '</div>';
      overlay.innerHTML = h;
      document.body.appendChild(overlay);

      overlay.querySelector('#ee-close').addEventListener('click', function() { overlay.remove(); });

      // Quick-launch easter eggs from the menu
      var items = overlay.querySelectorAll('.ee-item');
      for (var j = 0; j < items.length; j++) {
        items[j].addEventListener('click', function() {
          var action = this.getAttribute('data-action');
          overlay.remove();
          if (action === 'bestemmie' && window.showBestemmiometer) window.showBestemmiometer();
          else if (action === 'achievements' && window.showAchievements) window.showAchievements();
          else if (action === 'survival' && window.showSurvivalRate) window.showSurvivalRate('Naryn-Kazarman');
          else if (action === 'eagle') flyEagle();
          else if (action === 'altitude' && window.altitudeSick) window.altitudeSick();
          else if (action === 'car' && window.animateCar) window.animateCar();
          else showToast('Vai alla sezione per attivarlo!');
        });
      }

      if (navigator.vibrate) navigator.vibrate([30, 20, 30, 20, 50]);
    }
  })();

  /* ---- Init ---- */

  function initApp() {
    registerSW();
    initDarkMode();
    initRandomQuestions();

    window.addEventListener('hashchange', navigate);

    // Init DB then navigate, then hide splash
    if (typeof DB !== 'undefined' && DB.init) {
      DB.init().then(function () {
        navigate();
        hideSplash();
      }).catch(function () {
        console.warn('IndexedDB init fallita, continuo senza persistenza');
        navigate();
        hideSplash();
      });
    } else {
      navigate();
      hideSplash();
    }
  }

  // Random questions timer — triggers between 9am-6pm during the trip (May 29 - Jun 14, 2026)
  function initRandomQuestions() {
    function checkAndTrigger() {
      var now = new Date();
      var tripStart = new Date(2026, 4, 29); // May 29
      var tripEnd = new Date(2026, 5, 14, 23, 59); // Jun 14
      if (now < tripStart || now > tripEnd) return;
      var hour = now.getHours();
      if (hour < 9 || hour >= 18) return;

      // Check if we already triggered today
      var today = now.toDateString();
      var lastTrigger = localStorage.getItem('kg-domanda-last-date');
      if (lastTrigger === today) return;

      // Random chance (trigger ~once per session between 9-18)
      if (Math.random() < 0.3) {
        localStorage.setItem('kg-domanda-last-date', today);
        if (window.triggerRandomQuestion) window.triggerRandomQuestion();
      }
    }

    // Check on load and every 30 minutes
    setTimeout(checkAndTrigger, 5000);
    setInterval(checkAndTrigger, 30 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
