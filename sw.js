/**
 * sw.js — Service Worker
 * Kyrgyzstan Travel PWA 2026
 *
 * FULL offline support: precache all JS, CSS, icons
 * Strategy: cache-first for all assets, network-first for navigation
 */

var CACHE_NAME = 'kg-travel-v8.4';

// Pre-cache EVERYTHING needed for offline
var PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  // CSS
  './css/app.css',
  // JS core
  './js/db.js',
  './js/data.js',
  './js/editable.js',
  './js/app.js',
  './js/firebase-sync.js',
  './js/sync-core.js',
  './js/game2.js',
  // JS sections
  './js/sections/home.js',
  './js/sections/itinerary.js',
  './js/sections/checklist.js',
  './js/sections/budget.js',
  './js/sections/phrasebook.js',
  './js/sections/frasi.js',
  './js/sections/piatti.js',
  './js/sections/sos.js',
  './js/sections/drone.js',
  './js/sections/altitude.js',
  './js/sections/gps.js',
  './js/sections/info.js',
  './js/sections/roads.js',
  './js/sections/vehicle.js',
  './js/sections/navigation.js',
  './js/sections/documents.js',
  './js/sections/before-leaving.js',
  './js/sections/maps.js',
  './js/sections/extras.js',
  './js/sections/giochi.js',
  // Icons & images (all needed offline)
  './icons/icon-192.svg',
  './icons/icon-192.png',
  './icons/icon-512.svg',
  './icons/icon-512.png',
  './icons/favicon.png',
  './icons/apple-touch-icon.png',
  './icons/flag-dark.svg',
  './icons/flag-light.svg',
  './icons/flag-bg.svg',
  './icons/logo-header.png',
  './icons/logo-square.png',
  './icons/header-right.png',
  './icons/header-right-trimmed.png',
  './icons/header-right-trimmed.jpeg',
  './icons/subaru.png',
  './icons/eagle.svg',
  './icons/aquila.png',
  './icons/mountain-pass.png',
  './icons/yurta-night.png',
  './icons/kumys-nomads.jpeg',
  './icons/splash-logo.jpeg',
  './icons/end-trip.jpeg',
  './icons/roadmap-sm.jpg',
  './icons/logo-sm.jpg',
  './icons/kyrgyzstan_political_map.gif',
  './icons/kyrgyzstan_road_map.gif',
  './icons/Kyrgyzstan-Physical-Map.jpg',
  './icons/insurance_OSOGO.jpg',
  './icons/contract_en.pdf'
  // Game char sprites loaded on demand by game2.js, not precached
];

// Install: pre-cache everything
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Add files one by one so a single failure doesn't break everything
      return Promise.all(
        PRECACHE.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn('SW: failed to cache', url, err);
          });
        })
      );
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first for assets, network-first for navigation
self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  // Skip non-GET requests and Firebase/external API calls
  if (e.request.method !== 'GET') return;
  if (url.indexOf('firebaseio.com') !== -1) return;
  if (url.indexOf('googleapis.com') !== -1) return;
  if (url.indexOf('gstatic.com') !== -1) return;

  // Navigation requests: CACHE-FIRST (no network unless not cached)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(function(cached) {
        return cached || fetch(e.request);
      })
    );
    return;
  }

  // All other requests: cache-first, then network (and cache the result)
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(response) {
        // Cache same-origin basic responses AND third-party (cors/opaque) for OSM/Leaflet
        var isOsm = url.indexOf('tile.openstreetmap.org') !== -1;
        var isLeaflet = url.indexOf('unpkg.com/leaflet') !== -1;
        if (response.ok && (response.type === 'basic' || isOsm || isLeaflet)) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
        }
        return response;
      });
    }).catch(function() {
      // Final fallback for navigation
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
