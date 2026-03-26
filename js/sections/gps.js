/**
 * gps.js — GPS Waypoints + KML Generation
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderGps(), generateKML(), downloadKML()
 * Depends on: WAYPOINTS (data.js), makeGpsLink() (itinerary.js)
 */

/**
 * Generate valid KML XML string from waypoints.
 * @param {Array} waypoints
 * @returns {string} KML XML string
 */
function generateKML(waypoints) {
  var kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
  kml += '<Document>\n';
  kml += '<name>Kyrgyzstan 2025</name>\n';

  // Style definitions for each type
  var styles = {
    poi:        { color: 'ff0078ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png' },
    trailhead:  { color: 'ff00aa00', icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png' },
    drone:      { color: 'ff00d4ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png' },
    carburante: { color: 'ff0000ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/red-blank.png' },
    emergenza:  { color: 'ff0000cc', icon: 'http://maps.google.com/mapfiles/kml/paddle/red-stars.png' }
  };

  var types = ['poi', 'trailhead', 'drone', 'carburante', 'emergenza'];
  for (var t = 0; t < types.length; t++) {
    var type = types[t];
    var s = styles[type];
    kml += '<Style id="style-' + type + '">\n';
    kml += '  <IconStyle>\n';
    kml += '    <color>' + s.color + '</color>\n';
    kml += '    <Icon><href>' + s.icon + '</href></Icon>\n';
    kml += '  </IconStyle>\n';
    kml += '</Style>\n';
  }

  // Placemarks
  for (var i = 0; i < waypoints.length; i++) {
    var wp = waypoints[i];
    var styleType = styles[wp.type] ? wp.type : 'poi';
    kml += '<Placemark>\n';
    kml += '  <name>' + wp.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</name>\n';
    kml += '  <styleUrl>#style-' + styleType + '</styleUrl>\n';
    kml += '  <Point>\n';
    kml += '    <coordinates>' + wp.lng + ',' + wp.lat + ',0</coordinates>\n';
    kml += '  </Point>\n';
    kml += '</Placemark>\n';
  }

  kml += '</Document>\n';
  kml += '</kml>';
  return kml;
}

function downloadKML() {
  var kml = generateKML(WAYPOINTS);
  var blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'kyrgyzstan-2025.kml';
  a.click();
  URL.revokeObjectURL(url);
}

function renderGps() {
  var activeFilter = 'tutti';

  function buildList(filter) {
    var html = '';
    // Group waypoints by day
    var days = {};
    for (var i = 0; i < WAYPOINTS.length; i++) {
      var wp = WAYPOINTS[i];
      if (filter !== 'tutti' && wp.type !== filter) continue;
      if (!days[wp.day]) days[wp.day] = [];
      days[wp.day].push(wp);
    }

    var dayKeys = Object.keys(days).sort(function(a, b) { return Number(a) - Number(b); });
    for (var d = 0; d < dayKeys.length; d++) {
      var dayNum = dayKeys[d];
      var wps = days[dayNum];
      html += '<div class="card">';
      html += '<div class="card-title">Giorno ' + dayNum + '</div>';
      for (var w = 0; w < wps.length; w++) {
        var pt = wps[w];
        var badgeClass = 'badge-info';
        if (pt.type === 'trailhead') badgeClass = 'badge-success';
        else if (pt.type === 'drone') badgeClass = 'badge-warning';
        else if (pt.type === 'carburante' || pt.type === 'emergenza') badgeClass = 'badge-danger';

        html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);">';
        html += '<span class="badge ' + badgeClass + '">' + pt.type + '</span> ';
        html += makeGpsLink(pt.name, pt.lat, pt.lng);
        html += '</div>';
      }
      html += '</div>';
    }

    if (dayKeys.length === 0) {
      html += '<p style="text-align:center;opacity:0.6;">Nessun waypoint per questo filtro.</p>';
    }
    return html;
  }

  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">📍 GPS Waypoints</h2>';

  // KML download button
  html += '<button class="btn btn-primary" onclick="downloadKML()" style="margin-bottom:12px;width:100%;">⬇️ Scarica KML</button>';

  // Prohibited roads map
  html += '<details style="margin-bottom:12px;"><summary>🚫 Mappa Strade Proibite (Russian Troika)</summary><div class="details-content">';
  html += '<p style="margin-bottom:6px;"><strong>Linee nere</strong> = proibite per TUTTI<br><strong style="color:var(--color-danger);">Linee rosse</strong> = solo crossover (noi)</p>';
  html += '<img src="icons/roadmap.png" alt="Mappa strade proibite" style="width:100%;border-radius:var(--radius-sm);">';
  html += '</div></details>';

  // Filter buttons
  html += '<div class="filter-bar" id="gps-filter-bar">';
  var filters = [
    { key: 'tutti', label: 'Tutti' },
    { key: 'poi', label: 'POI' },
    { key: 'trailhead', label: 'Trailhead' },
    { key: 'drone', label: 'Drone' }
  ];
  for (var f = 0; f < filters.length; f++) {
    var cls = filters[f].key === 'tutti' ? 'filter-btn active' : 'filter-btn';
    html += '<button class="' + cls + '" data-filter="' + filters[f].key + '">' + filters[f].label + '</button>';
  }
  html += '</div>';

  // Waypoint list container
  html += '<div id="gps-list">' + buildList('tutti') + '</div>';
  html += '</div>';

  // Attach filter handlers after DOM render
  setTimeout(function() {
    var bar = document.getElementById('gps-filter-bar');
    if (!bar) return;
    var buttons = bar.querySelectorAll('.filter-btn');
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener('click', function() {
        // Update active state
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove('active');
        }
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');
        var list = document.getElementById('gps-list');
        if (list) list.innerHTML = buildList(filter);
      });
    }
  }, 0);

  return html;
}
