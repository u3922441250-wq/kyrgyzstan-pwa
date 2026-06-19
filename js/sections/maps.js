/**
 * maps.js — Mappe Kyrgyzstan
 * Kyrgyzstan Travel PWA 2026
 *
 * Global: renderMaps(), openMapFullscreen()
 * FIXED: zoom now stays steady (no auto-zoom-out), added atlas map
 */

var MAP_FILES = [
  { id:'atlas', title:'🗺️ Atlante Kyrgyzstan (Dettagliato)', file:'icons/Kyrgyzstan-Physical-Map.jpg', desc:'Mappa fisica dettagliata con montagne, fiumi, laghi e città' },
  { id:'road', title:'🛣️ Mappa Stradale', file:'icons/roadmap-sm.jpg', desc:'Rete stradale principale' },
  { id:'road-detail', title:'🗺️ Road Map (dettagliata)', file:'icons/kyrgyzstan_road_map.gif', desc:'Mappa stradale con città e percorsi' },
  { id:'political', title:'🏛️ Mappa Politica', file:'icons/kyrgyzstan_political_map.gif', desc:'Regioni e confini' }
];

var FUEL_STATIONS = [
  { name:'Gazprom Bishkek (Manas Ave)', lat:42.8747, lng:74.5698, day:'1-2', route:'Bishkek', note:'Stazione grande, AI-92/95. Aperta 24h.' },
  { name:'Red Petroleum Bishkek Sud', lat:42.8400, lng:74.5900, day:'2', route:'Uscita Bishkek → Issyk-Kul', note:'Ultima grande stazione prima della montagna.' },
  { name:'Benzina Balykchy', lat:42.4600, lng:76.1900, day:'2', route:'Bishkek → Karakol', note:'Prima stazione dopo il passo. Fare il pieno qui.' },
  { name:'Benzina Cholpon-Ata', lat:42.6500, lng:77.0800, day:'2', route:'Sponda nord Issyk-Kul', note:'Stazione affidabile sulla strada principale.' },
  { name:'Gazprom Karakol', lat:42.4900, lng:78.3900, day:'2-5', route:'Karakol', note:'Stazione principale. AI-95 disponibile. Fare pieno prima di Son-Kul!' },
  { name:'Benzina Kochkor', lat:42.0100, lng:75.7600, day:'6', route:'Kochkor → Son-Kul', note:'⚠️ ULTIMA STAZIONE PRIMA DI SON-KUL! Pieno + tanica.' },
  { name:'Benzina Naryn centro', lat:41.4300, lng:76.0000, day:'8', route:'Naryn', note:'⚠️ ULTIMA STAZIONE PRIMA DI KAZARMAN! Pieno + tanica obbligatoria.' },
  { name:'Benzina At-Bashy', lat:41.1700, lng:75.8000, day:'9-10', route:'At-Bashy', note:'Piccola stazione. Verificare disponibilità AI-95.' },
  { name:'Benzina Kazarman', lat:41.4000, lng:74.0300, day:'10-11', route:'Kazarman', note:'Prima stazione dopo 310km senza benzina! Fare pieno.' },
  { name:'Benzina Jalal-Abad', lat:40.9300, lng:73.0000, day:'11', route:'Kazarman → Arslanbob', note:'Stazione grande sulla strada principale.' },
  { name:'Red Petroleum Osh', lat:40.5300, lng:72.8000, day:'13-14', route:'Osh', note:'Stazione grande. AI-92/95. Fare pieno prima di risalire a nord.' },
  { name:'Benzina Toktogul', lat:41.8700, lng:72.9400, day:'14-15', route:'Toktogul', note:'Fare pieno prima di Too-Ashuu Pass.' },
  { name:'Benzina Suusamyr', lat:42.0100, lng:73.3000, day:'15', route:'Suusamyr Valley', note:'Piccola stazione nella valle. Non sempre affidabile.' }
];

// All itinerary waypoints for the interactive map
var ALL_WAYPOINTS = [
  { name:'Bishkek', lat:42.8746, lng:74.5698, cat:'city' },
  { name:'Ala-Archa NP', lat:42.6464, lng:74.4847, cat:'nature' },
  { name:'Burana Tower', lat:42.7472, lng:75.2503, cat:'culture' },
  { name:'Konorchek Canyon', lat:42.6833, lng:75.8500, cat:'nature' },
  { name:'Karakol', lat:42.4907, lng:78.3936, cat:'city' },
  { name:'Jyrgalan Valley', lat:42.8186, lng:79.2094, cat:'nature' },
  { name:'Altyn-Arashan', lat:42.7500, lng:78.5700, cat:'nature' },
  { name:'Sary-Jaz Valley', lat:42.5000, lng:79.5000, cat:'nature' },
  { name:'Ak-Say Canyon', lat:42.3500, lng:76.8000, cat:'nature' },
  { name:'Seven Bulls Rock', lat:42.2800, lng:77.5500, cat:'nature' },
  { name:'Barskoon Waterfall', lat:42.1500, lng:77.6000, cat:'nature' },
  { name:'Fairy Tale Canyon', lat:42.3847, lng:77.2575, cat:'nature' },
  { name:'Bokonbayevo', lat:42.1208, lng:76.9900, cat:'city' },
  { name:'Kochkor', lat:42.0133, lng:75.7592, cat:'city' },
  { name:'Song-Kul Lake', lat:41.8333, lng:75.1500, cat:'nature' },
  { name:'Naryn', lat:41.4287, lng:76.0014, cat:'city' },
  { name:'Tash Rabat', lat:40.8453, lng:75.2847, cat:'culture' },
  { name:'At-Bashy', lat:41.1714, lng:75.7986, cat:'city' },
  { name:'Kel-Suu Lake', lat:40.5811, lng:75.0742, cat:'nature' },
  { name:'Kazarman', lat:41.4000, lng:74.0333, cat:'city' },
  { name:'Arslanbob', lat:41.3311, lng:72.9389, cat:'nature' },
  { name:'Osh', lat:40.5278, lng:72.7964, cat:'city' }
];

function renderMaps() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">🗺️ Mappe</h2>';

  // === INTERACTIVE MAP WITH ALL WAYPOINTS ===
  html += '<details open><summary>📍 Mappa Interattiva — Tutti i Punti</summary><div class="details-content">';
  html += '<p style="font-size:0.85rem;margin-bottom:8px;opacity:0.7;">Tutti i waypoint del viaggio. Tap su un punto per aprire Google Maps.</p>';
  html += '<div id="interactive-map-container" style="width:100%;height:420px;border-radius:8px;overflow:hidden;border:2px solid var(--color-border);position:relative;background:#1a2332;">';
  html += '<div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.5;">Caricamento mappa...</div>';
  html += '</div>';
  html += '<div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">';
  html += '<span style="font-size:0.8rem;display:flex;align-items:center;gap:3px;"><span style="width:10px;height:10px;background:#e74c3c;border-radius:50%;display:inline-block;border:1.5px solid #fff;"></span> Città</span>';
  html += '<span style="font-size:0.8rem;display:flex;align-items:center;gap:3px;"><span style="width:10px;height:10px;background:#27ae60;border-radius:50%;display:inline-block;border:1.5px solid #fff;"></span> Natura</span>';
  html += '<span style="font-size:0.8rem;display:flex;align-items:center;gap:3px;"><span style="width:10px;height:10px;background:#f1c40f;border-radius:50%;display:inline-block;border:1.5px solid #fff;"></span> Cultura</span>';
  html += '<span style="font-size:0.8rem;display:flex;align-items:center;gap:3px;"><span style="width:6px;height:6px;background:#f39c12;border-radius:50%;display:inline-block;border:1px solid #fff;"></span> Benzina</span>';
  html += '</div>';
  html += '</div></details>';

  // Static Maps
  for (var i = 0; i < MAP_FILES.length; i++) {
    var m = MAP_FILES[i];
    html += '<details' + (i === 0 ? ' open' : '') + '><summary>' + m.title + '</summary><div class="details-content">';
    html += '<p style="font-size:0.85rem;margin-bottom:8px;opacity:0.7;">' + m.desc + '</p>';
    html += '<div class="map-container"><img src="' + m.file + '" alt="' + m.title + '" class="map-img" onclick="openMapFullscreen(\'' + m.id + '\')" loading="lazy"></div>';
    html += '<button class="btn btn-sm btn-secondary" style="margin-top:8px;" type="button" onclick="openMapFullscreen(\'' + m.id + '\')">🔍 Schermo intero</button>';
    html += '</div></details>';
  }

  // === BENZINAI ===
  html += '<details><summary>⛽ Benzinai sul Percorso</summary><div class="details-content">';
  html += '<a class="btn btn-primary btn-sm" href="https://www.google.com/maps/search/gas+station+kyrgyzstan/@41.5,74.5,7z" target="_blank" style="width:100%;text-align:center;margin-bottom:10px;">📍 Cerca benzinai su Google Maps</a>';

  // Fuel phrases
  html += '<details><summary>🗣️ Frasi Utili Benzina</summary><div class="details-content">';
  var fuelPhrases = [
    {it:'Dov\u0027è il benzinaio più vicino?', ru:'Где ближайшая заправка?', pron:'Gdye bli-zhay-sha-ya za-prav-ka?'},
    {it:'Dove posso fare benzina?', ru:'Где можно заправиться?', pron:'Gdye mozh-na za-pra-vit-sya?'},
    {it:'Il pieno, per favore', ru:'Полный бак, пожалуйста', pron:'Pol-ny bak pa-zhal-sta'},
    {it:'Quanto manca alla prossima benzina?', ru:'Сколько до следующей заправки?', pron:'Skol-ka da slye-du-yu-shchey za-prav-ki?'},
    {it:'AI-95 per favore', ru:'АИ-95, пожалуйста', pron:'A-I 95 pa-zhal-sta'},
    {it:'La benzina è finita', ru:'Бензин закончился', pron:'Ben-zin za-kon-chil-sya'}
  ];
  for (var fp = 0; fp < fuelPhrases.length; fp++) {
    var ph = fuelPhrases[fp];
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);font-size:0.85rem;">';
    html += '<div style="font-weight:600;">' + ph.it + '</div>';
    html += '<div style="color:var(--color-secondary);">' + ph.ru + '</div>';
    html += '<div style="font-style:italic;opacity:0.7;">' + ph.pron + '</div>';
    html += '</div>';
  }
  html += '</div></details>';

  // Station list
  var lastRoute = '';
  for (var f = 0; f < FUEL_STATIONS.length; f++) {
    var fs = FUEL_STATIONS[f];
    if (fs.route !== lastRoute) {
      if (lastRoute !== '') html += '</div>';
      html += '<div style="margin-top:8px;"><div style="font-weight:700;font-size:0.9rem;color:var(--color-secondary);margin-bottom:4px;">📍 ' + fs.route + '</div>';
      lastRoute = fs.route;
    }
    var gmaps = 'https://www.google.com/maps/search/?api=1&query=' + fs.lat + ',' + fs.lng;
    var isWarning = fs.note.indexOf('⚠️') >= 0;
    html += '<div style="padding:8px;margin-bottom:6px;border-radius:var(--radius-sm);border:1px solid ' + (isWarning ? 'var(--color-accent)' : 'var(--color-border)') + ';background:' + (isWarning ? 'rgba(232,115,42,0.08)' : 'var(--color-card)') + ';">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div style="font-weight:600;font-size:0.9rem;">' + fs.name + '</div>';
    html += '<span style="font-size:0.75rem;opacity:0.6;">G' + fs.day + '</span>';
    html += '</div>';
    html += '<div style="font-size:0.82rem;margin-top:2px;">' + fs.note + '</div>';
    html += '<a class="btn btn-sm btn-primary" href="' + gmaps + '" target="_blank" style="margin-top:4px;">📍 Maps</a>';
    html += '</div>';
  }
  html += '</div>';
  html += '</div></details>';

  // === APP ===
  html += '<details><summary>📱 App Mappe Offline</summary><div class="details-content">';
  html += '<ul style="padding-left:18px;font-size:0.9rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Organic Maps</strong> — gratuita, sentieri hiking, offline</li>';
  html += '<li style="margin-bottom:6px;"><strong>OsmAnd</strong> — topografica con curve di livello</li>';
  html += '<li style="margin-bottom:6px;"><strong>PeakVisor</strong> — mappe 3D montagne</li>';
  html += '<li style="margin-bottom:6px;"><strong>Maps.me</strong> — navigazione offline</li>';
  html += '<li style="margin-bottom:6px;"><strong>iOverlander</strong> — benzina, campeggi, acqua</li>';
  html += '</ul></div></details>';

  wrapper.innerHTML = html;

  // Initialize interactive map after DOM is ready
  setTimeout(function() { initInteractiveMap(); }, 100);

  return wrapper;
}

/**
 * Interactive map with REAL geo projection — uses Leaflet (CDN, ~40KB)
 * Tiles cached by Service Worker after first online use → works offline after first load
 * Tutti i waypoint posizionati con coordinate reali, no calibrazione manuale.
 */
function initInteractiveMap() {
  var container = document.getElementById('interactive-map-container');
  if (!container) return;

  // Lazy-load Leaflet only when this section is shown
  if (typeof L === 'undefined') {
    if (!document.getElementById('leaflet-css')) {
      var css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = function() { buildLeafletMap(container); };
    script.onerror = function() {
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:20px;font-size:0.85rem;opacity:0.7;">⚠️ Mappa interattiva non disponibile offline al primo avvio.<br>Apri l\'app una volta online per cachare la mappa.</div>';
    };
    document.head.appendChild(script);
  } else {
    buildLeafletMap(container);
  }
}

function buildLeafletMap(container) {
  // Reset container
  container.innerHTML = '';
  container.style.position = 'relative';

  // Center on Kyrgyzstan, zoom to fit country
  var map = L.map(container, {
    center: [41.5, 75.0],
    zoom: 6,
    minZoom: 5,
    maxZoom: 14,
    zoomControl: true,
    attributionControl: false
  });

  // OSM tiles — cached by Service Worker after first online load
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Draw route line connecting waypoints in itinerary order
  var routeCoords = [];
  for (var r = 0; r < ALL_WAYPOINTS.length; r++) {
    routeCoords.push([ALL_WAYPOINTS[r].lat, ALL_WAYPOINTS[r].lng]);
  }
  L.polyline(routeCoords, {
    color: '#e8732a',
    weight: 3,
    opacity: 0.8,
    dashArray: '6,6'
  }).addTo(map);

  // Add waypoints with category-colored markers
  function makeIcon(color, size) {
    return L.divIcon({
      className: 'custom-pin',
      html: '<div style="width:' + size + 'px;height:' + size + 'px;background:' + color + ';border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.6);"></div>',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  }

  // Waypoints
  for (var w = 0; w < ALL_WAYPOINTS.length; w++) {
    var wp = ALL_WAYPOINTS[w];
    var color = wp.cat === 'city' ? '#e74c3c' : wp.cat === 'nature' ? '#27ae60' : '#f1c40f';
    var size = wp.cat === 'city' ? 16 : 12;
    var marker = L.marker([wp.lat, wp.lng], { icon: makeIcon(color, size) }).addTo(map);

    // Popup with link to Google Maps
    var gmaps = 'https://www.google.com/maps/search/?api=1&query=' + wp.lat + ',' + wp.lng;
    marker.bindPopup(
      '<div style="font-weight:700;margin-bottom:4px;">' + wp.name + '</div>' +
      '<a href="' + gmaps + '" target="_blank" style="color:#e8732a;text-decoration:none;">📍 Apri in Google Maps</a>'
    );
  }

  // Fuel stations (smaller orange dots)
  for (var fi = 0; fi < FUEL_STATIONS.length; fi++) {
    var fs = FUEL_STATIONS[fi];
    var fmarker = L.marker([fs.lat, fs.lng], { icon: makeIcon('#f39c12', 8) }).addTo(map);
    fmarker.bindPopup(
      '<div style="font-weight:700;">⛽ ' + fs.name + '</div>' +
      '<div style="font-size:0.85rem;margin-top:4px;">' + fs.note + '</div>'
    );
  }

  // Fit bounds to all waypoints
  var allBounds = L.latLngBounds(routeCoords);
  for (var fb = 0; fb < FUEL_STATIONS.length; fb++) {
    allBounds.extend([FUEL_STATIONS[fb].lat, FUEL_STATIONS[fb].lng]);
  }
  map.fitBounds(allBounds, { padding: [20, 20] });
}

/**
 * FIXED fullscreen map viewer
 * - Pinch-to-zoom stays steady (no auto-zoom-out)
 * - Double-tap resets zoom
 * - Proper touch handling prevents conflicts
 */
function openMapFullscreen(mapId) {
  var mapData = null;
  for (var i = 0; i < MAP_FILES.length; i++) {
    if (MAP_FILES[i].id === mapId) { mapData = MAP_FILES[i]; break; }
  }
  if (!mapData) return;

  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:300;background:#000;';
  overlay.innerHTML =
    '<div style="position:fixed;top:12px;left:12px;right:12px;z-index:301;display:flex;justify-content:space-between;align-items:center;">' +
      '<span style="color:#fff;font-size:0.85rem;font-weight:600;">' + mapData.title + '</span>' +
    '</div>' +
    '<button id="fs-close" type="button" style="position:fixed;bottom:30px;right:20px;z-index:301;width:56px;height:56px;border:2px solid rgba(255,255,255,0.6);background:rgba(0,0,0,0.8);color:#fff;font-size:1.5rem;border-radius:50%;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.5);">✕</button>' +
    '<div id="fs-body" style="width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none;">' +
      '<img src="' + mapData.file + '" alt="' + mapData.title + '" id="fs-map-img" style="max-width:100%;max-height:100%;transform-origin:center center;will-change:transform;user-select:none;-webkit-user-select:none;pointer-events:none;">' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Try landscape lock
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(function(){});
  }

  // Close button
  overlay.querySelector('#fs-close').addEventListener('click', function () {
    overlay.remove();
    document.body.style.overflow = '';
    if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
  });

  // === FIXED ZOOM LOGIC ===
  var img = overlay.querySelector('#fs-map-img');
  var body = overlay.querySelector('#fs-body');
  var scale = 1;
  var translateX = 0;
  var translateY = 0;
  var lastDist = 0;
  var lastCenter = null;
  var isPinching = false;

  function updateTransform() {
    img.style.transform = 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + scale + ')';
  }

  // Pinch to zoom — FIXED: no auto-zoom-out
  body.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      isPinching = true;
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDist = Math.sqrt(dx * dx + dy * dy);
      lastCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
      e.preventDefault();
    }
  }, { passive: false });

  body.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2 && isPinching) {
      e.preventDefault();
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (lastDist > 0) {
        var newScale = scale * (dist / lastDist);
        newScale = Math.max(0.5, Math.min(newScale, 8));
        scale = newScale;
        updateTransform();
      }
      lastDist = dist;
    } else if (e.touches.length === 1 && !isPinching && scale > 1) {
      // Pan when zoomed in
      e.preventDefault();
      if (lastCenter) {
        translateX += e.touches[0].clientX - lastCenter.x;
        translateY += e.touches[0].clientY - lastCenter.y;
        updateTransform();
      }
      lastCenter = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: false });

  body.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
      isPinching = false;
      lastDist = 0;
    }
    if (e.touches.length === 0) {
      lastCenter = null;
    }
    if (e.touches.length === 1) {
      lastCenter = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  // Double-tap to reset zoom
  var lastTap = 0;
  body.addEventListener('touchend', function(e) {
    if (e.touches.length === 0 && !isPinching) {
      var now = Date.now();
      if (now - lastTap < 300) {
        // Double tap: toggle between 1x and 2.5x
        if (scale > 1.2) {
          scale = 1;
          translateX = 0;
          translateY = 0;
        } else {
          scale = 2.5;
        }
        updateTransform();
      }
      lastTap = now;
    }
  });

  // Mouse wheel zoom for desktop
  body.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.5, Math.min(scale * delta, 8));
    updateTransform();
  }, { passive: false });
}
