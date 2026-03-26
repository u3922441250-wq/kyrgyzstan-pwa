/**
 * navigation.js — Navigazione Off-Road
 * Kyrgyzstan Travel PWA 2025
 */
function renderNavigation() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">🧭 Navigazione Off-Road</h2>';

  // Decision matrix
  html += '<div class="card"><div class="card-title">🎯 Quale App Usare</div>';
  html += '<table class="data-table"><thead><tr><th>Scenario</th><th>App</th></tr></thead><tbody>';
  html += '<tr><td>Navigazione 4x4 seria</td><td><strong>OsmAnd</strong></td></tr>';
  html += '<tr><td>Uso veloce / backup</td><td><strong>Organic Maps</strong></td></tr>';
  html += '<tr><td>Extra sicurezza</td><td>Maps.me</td></tr>';
  html += '<tr><td>Città (Bishkek, Osh)</td><td>Google Maps / 2GIS</td></tr>';
  html += '</tbody></table>';
  html += '<div class="warning-box"><span class="warning-icon">⚠️</span><span>Google Maps è <strong>inutile</strong> off-road in Kirghizistan. Molte piste NON sono "strade" e cambiano ogni stagione.</span></div>';
  html += '</div>';

  // OsmAnd
  html += '<div class="card"><div class="card-title">🥇 OsmAnd — CORE OFF-ROAD</div>';
  html += '<p style="margin-bottom:8px;">Il tuo tool principale per navigazione 4x4.</p>';
  html += '<ul style="padding-left:18px;margin-bottom:8px;">';
  var osmFeatures = [
    "Offline completo (mappe + routing)",
    "Profili 4x4 + off-road dedicati",
    "Import GPX (tracce da altri viaggiatori)",
    "Curve di livello + altitudine",
    "OpenStreetMap → include piste, track, strade non ufficiali",
    "Puoi seguire tracce reali nel nulla"
  ];
  for (var i = 0; i < osmFeatures.length; i++) {
    html += '<li style="margin-bottom:4px;">✅ ' + osmFeatures[i] + '</li>';
  }
  html += '</ul>';
  html += '<div class="warning-box"><span class="warning-icon">💡</span><span>Complesso (non plug&play). Versione free ha limiti download (gestibili).</span></div>';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
  html += '<a class="btn btn-primary" href="https://play.google.com/store/apps/details?id=net.osmand" target="_blank">Android</a>';
  html += '<a class="btn btn-secondary" href="https://apps.apple.com/app/osmand-maps-travel-navigate/id934850257" target="_blank">iOS</a>';
  html += '</div></div>';

  // Organic Maps
  html += '<div class="card"><div class="card-title">🥈 Organic Maps — BACKUP VELOCE</div>';
  html += '<ul style="padding-left:18px;margin-bottom:8px;">';
  var orgFeatures = [
    "100% offline (anche ricerca)",
    "Completamente gratuito, no ads",
    "Molto veloce e semplice",
    "Buono per vedere rapidamente mappe e piste"
  ];
  for (var o = 0; o < orgFeatures.length; o++) {
    html += '<li style="margin-bottom:4px;">✅ ' + orgFeatures[o] + '</li>';
  }
  html += '</ul>';
  html += '<p style="font-size:0.9rem;opacity:0.7;">Limite: meno potente per off-road tecnico</p>';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">';
  html += '<a class="btn btn-primary" href="https://play.google.com/store/apps/details?id=app.organicmaps" target="_blank">Android</a>';
  html += '<a class="btn btn-secondary" href="https://apps.apple.com/app/organic-maps-offline-hike-bike/id1567437057" target="_blank">iOS</a>';
  html += '</div></div>';

  // Maps.me
  html += '<details><summary>Maps.me (opzionale, terza ridondanza)</summary><div class="details-content">';
  html += '<p>Offline, semplice, ma meno preciso off-road e meno aggiornato.</p>';
  html += '<div style="display:flex;gap:8px;margin-top:8px;">';
  html += '<a class="btn btn-sm btn-secondary" href="https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro" target="_blank">Android</a>';
  html += '<a class="btn btn-sm btn-secondary" href="https://apps.apple.com/app/maps-me-offline-map-nav/id510623322" target="_blank">iOS</a>';
  html += '</div></div></details>';

  // Setup checklist
  html += '<div class="card"><div class="card-title">🔥 Setup Prima di Partire</div>';
  html += '<ul style="padding-left:18px;">';
  var setup = [
    "📥 Scarica INTERO Kirghizistan su OsmAnd + Organic Maps",
    "📥 Scarica anche Uzbekistan (per day trip Fergana)",
    "📍 Importa tracce GPX (Song-Kul, Kel-Suu, Naryn-Kazarman)",
    "⛰️ Attiva contour lines su OsmAnd (curve di livello)",
    "🔍 Attiva offline search su entrambe",
    "🔋 Testa tutto PRIMA di partire (in modalità aereo)",
    "💾 Backup tracce GPX su entrambi i telefoni"
  ];
  for (var s = 0; s < setup.length; s++) {
    html += '<li style="margin-bottom:6px;">' + setup[s] + '</li>';
  }
  html += '</ul></div>';

  // GPX sources
  html += '<div class="card"><div class="card-title">📍 Dove Trovare Tracce GPX</div>';
  html += '<ul style="padding-left:18px;">';
  var gpxSources = [
    { name: "Wikiloc — tracce Kyrgyzstan", url: "https://www.wikiloc.com/trails/kyrgyzstan" },
    { name: "iOverlander — benzina, campeggi, acqua", url: "https://www.ioverlander.com" },
    { name: "Caravanistan — route Asia Centrale", url: "https://caravanistan.com/kyrgyzstan/" },
    { name: "OpenStreetMap — dati base", url: "https://www.openstreetmap.org" }
  ];
  for (var g = 0; g < gpxSources.length; g++) {
    var src = gpxSources[g];
    html += '<li style="margin-bottom:6px;"><a href="' + src.url + '" target="_blank">' + src.name + '</a></li>';
  }
  html += '</ul></div>';

  // Reality check
  html += '<div class="card"><div class="card-title">⚠️ Realtà Kyrgyzstan</div>';
  html += '<ul style="padding-left:18px;">';
  var reality = [
    "Molte piste NON sono strade — sono tracce nel terreno",
    "Alcune cambiano ogni stagione (neve, frane, fiumi)",
    "Google Maps = inutile fuori dalle città",
    "Segnale telefonico assente per lunghi tratti (Naryn→Kazarman)",
    "Sempre avere 2 app con mappe offline + GPX importati",
    "Chiedere SEMPRE ai locali le condizioni stradali attuali"
  ];
  for (var r = 0; r < reality.length; r++) {
    html += '<li style="margin-bottom:6px;">' + reality[r] + '</li>';
  }
  html += '</ul></div>';

  // KML download from our app
  html += '<div class="card"><div class="card-title">⬇️ I Nostri Waypoint</div>';
  html += '<p style="margin-bottom:8px;">Scarica il file KML con tutti i waypoint del viaggio per importarlo in OsmAnd o Organic Maps.</p>';
  html += '<button class="btn btn-accent" onclick="downloadKML()" style="width:100%;">⬇️ Scarica KML Kyrgyzstan 2025</button>';
  html += '</div>';

  html += '</div>';
  return html;
}
