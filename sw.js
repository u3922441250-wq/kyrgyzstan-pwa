/**
 * sw.js — Service Worker
 * Kyrgyzstan Travel PWA 2025
 *
 * Cache-first strategy with offline fallback
 */

var CACHE_NAME = 'kg-travel-v4';
var ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/db.js',
  './js/data.js',
  './js/editable.js',
  './js/sections/home.js',
  './js/sections/itinerary.js',
  './js/sections/checklist.js',
  './js/sections/budget.js',
  './js/sections/phrasebook.js',
  './js/sections/sos.js',
  './js/sections/drone.js',
  './js/sections/altitude.js',
  './js/sections/gps.js',
  './js/sections/info.js',
  './js/sections/roads.js',
  './js/sections/vehicle.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/roadmap.png'
];

// Install: pre-cache all assets
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
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

// Fetch: cache-first, fallback to network
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    }).catch(function() {
      // Offline fallback for navigation requests
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
