/**
 * app.js — Entry point, hash router, Service Worker initialization
 * Kyrgyzstan Travel PWA 2025
 *
 * Loaded AFTER db.js, data.js, editable.js, and all section scripts.
 * All render functions (renderHome, renderItinerary, etc.) are globals.
 */

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
    '#/navigazione': renderNavigation
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
    var saved = localStorage.getItem('kg-dark-mode');
    if (saved === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  /** Toggle dark mode — can be called from any section */
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('kg-dark-mode', String(isDark));
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

  /* ---- Init ---- */

  function initApp() {
    registerSW();
    initDarkMode();

    window.addEventListener('hashchange', navigate);

    // Init DB then navigate
    if (typeof DB !== 'undefined' && DB.init) {
      DB.init().then(function () {
        navigate();
      }).catch(function () {
        console.warn('IndexedDB init fallita, continuo senza persistenza');
        navigate();
      });
    } else {
      navigate();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
