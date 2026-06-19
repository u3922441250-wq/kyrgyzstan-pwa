/**
 * itinerary.js — Itinerario 15 giorni
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderItinerary(), makeGpsLink()
 * Enhanced: editable activities, add/delete custom activities, auto-save to IndexedDB
 */

function makeGpsLink(name, lat, lng) {
  // Use Google Maps search with place name + coordinates for better results
  var encodedName = encodeURIComponent(name);
  var url = 'https://www.google.com/maps/search/' + encodedName + '/@' + lat + ',' + lng + ',14z';
  return '<a class="gps-link" href="' + url + '" target="_blank" rel="noopener">' + name + '</a>';
}

function renderItinerary() {
  var status = getTripStatus(new Date());
  var currentDay = (status.status === 'during') ? status.day : 1;
  var noteTimers = {};
  var editTimers = {};

  function renderDay(dayNum) {
    var day = null;
    for (var i = 0; i < ITINERARY.length; i++) {
      if (ITINERARY[i].day === dayNum) { day = ITINERARY[i]; break; }
    }
    if (!day) return;

    var container = document.getElementById('itinerary-container');
    if (!container) return;

    // Load custom activities from DB then render
    var editId = 'itinerary-day-' + dayNum + '-activities';
    DB.get('edits', editId).then(function (record) {
      var customActivities = (record && record.value) ? record.value : [];

      // Build day content
      var html = '<div class="card">';
      html += '<div class="card-title">' + day.date + ' — ' + day.title + '</div>';

      if (day.route) {
        html += '<p><strong>Percorso:</strong> ' + day.route + '</p>';
      }
      if (day.km > 0) {
        html += '<p><strong>Distanza:</strong> ' + day.km + ' km</p>';
      }
      if (day.driveTime) {
        html += '<p><strong>Tempo guida:</strong> ' + day.driveTime + '</p>';
      }
      if (day.budget) {
        html += '<p><strong>Budget stimato:</strong> €' + day.budget + '/persona</p>';
      }
      if (day.accommodation) {
        html += '<p><strong>Alloggio:</strong> ' + day.accommodation + '</p>';
      }
      html += '</div>';

      // Warnings
      if (day.warnings && day.warnings.length > 0) {
        for (var w = 0; w < day.warnings.length; w++) {
          html += '<div class="warning-box"><span class="warning-icon">⚠️</span><span>' + day.warnings[w] + '</span></div>';
        }
      }

      // Activities timeline (editable)
      if (day.activities && day.activities.length > 0) {
        html += '<h3 style="margin:12px 0 8px;font-size:1rem;">Attività</h3>';
        html += '<div class="timeline" id="activities-list-' + dayNum + '">';
        for (var a = 0; a < day.activities.length; a++) {
          var act = day.activities[a];
          html += '<div class="timeline-item">';
          if (act.time) {
            html += '<div class="timeline-time">' + act.time + '</div>';
          }
          html += '<div style="display:flex;align-items:flex-start;gap:6px;flex:1;">';
          html += '<div class="timeline-desc editable" contenteditable="true" data-default-idx="' + a + '" data-day="' + dayNum + '" style="flex:1;">' + act.description + '</div>';
          if (act.details) {
            html += '<button type="button" class="act-details-btn" data-day="' + dayNum + '" data-act-idx="' + a + '" style="background:none;border:1px solid var(--color-border);border-radius:50%;width:28px;height:28px;flex-shrink:0;cursor:pointer;font-size:0.85rem;line-height:1;padding:0;" title="Dettagli">ℹ️</button>';
          }
          html += '</div>';

          // Hidden details panel — appears under the activity when toggled
          if (act.details) {
            html += '<div class="act-details-panel" id="act-details-' + dayNum + '-' + a + '" style="display:none;margin:6px 0 8px 0;padding:10px 12px;background:rgba(0,0,0,0.04);border-left:3px solid var(--color-accent);border-radius:6px;font-size:0.85rem;line-height:1.5;">';
            if (act.details.why)      html += '<div style="margin-bottom:6px;"><strong>Cos\'è:</strong> ' + act.details.why + '</div>';
            if (act.details.duration) html += '<div style="margin-bottom:6px;"><strong>⏱️ Durata:</strong> ' + act.details.duration + '</div>';
            if (act.details.cost)     html += '<div style="margin-bottom:6px;"><strong>💸 Costo:</strong> ' + act.details.cost + '</div>';
            if (act.details.tip)      html += '<div><strong>💡 Tip:</strong> ' + act.details.tip + '</div>';
            html += '</div>';
          }

          html += '</div>';
        }

        // Custom activities
        for (var ca = 0; ca < customActivities.length; ca++) {
          html += '<div class="timeline-item custom-activity" data-custom-idx="' + ca + '">';
          html += '<div class="timeline-desc editable" contenteditable="true" data-custom-idx="' + ca + '" data-day="' + dayNum + '">' + customActivities[ca] + '</div>';
          html += '<button class="btn btn-sm btn-danger delete-activity-btn" data-custom-idx="' + ca + '" style="margin-left:8px;min-height:28px;min-width:28px;padding:2px 8px;font-size:0.8rem;" type="button">✕</button>';
          html += '</div>';
        }

        html += '</div>';
        html += '<button class="btn btn-sm btn-primary" id="add-activity-btn-' + dayNum + '" style="margin-top:8px;" type="button">+ Aggiungi attività</button>';
      }

      // GPS coordinates — with embedded Leaflet mini-map
      if (day.gps && day.gps.length > 0) {
        html += '<h3 style="margin:12px 0 8px;font-size:1rem;">📍 Punti del Giorno</h3>';

        // Mini Leaflet map for this day's points
        var dayMapId = 'day-mini-map-' + dayNum;
        html += '<div id="' + dayMapId + '" data-day="' + dayNum + '" style="width:100%;height:200px;border-radius:8px;overflow:hidden;border:1px solid var(--color-border);background:#1a2332;margin-bottom:8px;"></div>';

        // Links to Google Maps
        html += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
        for (var g = 0; g < day.gps.length; g++) {
          var pt = day.gps[g];
          html += makeGpsLink(pt.name, pt.lat, pt.lng);
        }
        html += '</div>';

        // Open all in Google Maps button
        if (day.gps.length > 1) {
          var gmapsDir = 'https://www.google.com/maps/dir/';
          for (var gd = 0; gd < day.gps.length; gd++) {
            gmapsDir += day.gps[gd].lat + ',' + day.gps[gd].lng + '/';
          }
          html += '<a class="btn btn-sm btn-accent" href="' + gmapsDir + '" target="_blank" style="margin-top:8px;width:100%;text-align:center;">🗺️ Apri percorso su Google Maps</a>';
        }
      }

      // Notes textarea
      html += '<h3 style="margin:12px 0 8px;font-size:1rem;">Note personali</h3>';
      html += '<textarea class="form-textarea" id="day-note-' + dayNum + '" placeholder="Scrivi le tue note per questo giorno..." rows="3"></textarea>';

      container.innerHTML = html;

      // Update nav
      var titleEl = document.getElementById('day-nav-title');
      if (titleEl) titleEl.textContent = 'Giorno ' + dayNum + ' / 15';
      var prevBtn = document.getElementById('day-prev');
      var nextBtn = document.getElementById('day-next');
      if (prevBtn) prevBtn.disabled = (dayNum <= 1);
      if (nextBtn) nextBtn.disabled = (dayNum >= 15);

      // Load saved edits for default activities
      Editable.loadEdits('itinerary-day-' + dayNum + '-act').then(function (editsMap) {
        var editables = container.querySelectorAll('.timeline-desc[data-default-idx]');
        for (var e = 0; e < editables.length; e++) {
          var el = editables[e];
          var idx = el.getAttribute('data-default-idx');
          var editKey = 'itinerary-day-' + dayNum + '-act-' + idx;
          if (editsMap[editKey]) {
            el.innerText = editsMap[editKey];
          }
        }
      });

      // Attach editable handlers for default activities
      var defaultEditables = container.querySelectorAll('.timeline-desc[data-default-idx]');
      for (var de = 0; de < defaultEditables.length; de++) {
        (function (el) {
          var idx = el.getAttribute('data-default-idx');
          var dn = el.getAttribute('data-day');
          el.addEventListener('input', function () {
            var editKey = 'itinerary-day-' + dn + '-act-' + idx;
            if (editTimers[editKey]) clearTimeout(editTimers[editKey]);
            editTimers[editKey] = setTimeout(function () {
              DB.put('edits', {
                id: editKey,
                value: el.innerText,
                originalValue: day.activities[parseInt(idx)].description,
                updatedAt: Date.now()
              }).then(function () { showToast('Salvato ✓'); });
            }, 500);
          });
        })(defaultEditables[de]);
      }

      // Attach editable handlers for custom activities
      var customEditables = container.querySelectorAll('.timeline-desc[data-custom-idx]');
      for (var ce = 0; ce < customEditables.length; ce++) {
        (function (el) {
          el.addEventListener('input', function () {
            var cIdx = parseInt(el.getAttribute('data-custom-idx'));
            var timerKey = 'custom-' + dayNum + '-' + cIdx;
            if (editTimers[timerKey]) clearTimeout(editTimers[timerKey]);
            editTimers[timerKey] = setTimeout(function () {
              customActivities[cIdx] = el.innerText;
              saveCustomActivities(dayNum, customActivities);
            }, 500);
          });
        })(customEditables[ce]);
      }

      // Activity details toggle (ℹ️ buttons)
      var detailsBtns = container.querySelectorAll('.act-details-btn');
      for (var dbI = 0; dbI < detailsBtns.length; dbI++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            var dn = btn.getAttribute('data-day');
            var idx = btn.getAttribute('data-act-idx');
            var panel = document.getElementById('act-details-' + dn + '-' + idx);
            if (!panel) return;
            panel.style.display = (panel.style.display === 'none' || !panel.style.display) ? 'block' : 'none';
          });
        })(detailsBtns[dbI]);
      }

      // Delete custom activity buttons
      var deleteBtns = container.querySelectorAll('.delete-activity-btn');
      for (var db2 = 0; db2 < deleteBtns.length; db2++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            var cIdx = parseInt(btn.getAttribute('data-custom-idx'));
            customActivities.splice(cIdx, 1);
            saveCustomActivities(dayNum, customActivities).then(function () {
              renderDay(dayNum);
              showToast('Attività eliminata');
            });
          });
        })(deleteBtns[db2]);
      }

      // Add activity button
      var addBtn = document.getElementById('add-activity-btn-' + dayNum);
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          customActivities.push('Nuova attività...');
          saveCustomActivities(dayNum, customActivities).then(function () {
            renderDay(dayNum);
            showToast('Attività aggiunta');
          });
        });
      }

      // Load note from DB
      DB.get('notes', 'day-' + dayNum).then(function (noteRecord) {
        var textarea = document.getElementById('day-note-' + dayNum);
        if (textarea && noteRecord && noteRecord.text) {
          textarea.value = noteRecord.text;
        }
      });

      // Save note on input with debounce
      var textarea = document.getElementById('day-note-' + dayNum);
      if (textarea) {
        textarea.addEventListener('input', function () {
          var dn = dayNum;
          var ta = this;
          if (noteTimers[dn]) clearTimeout(noteTimers[dn]);
          noteTimers[dn] = setTimeout(function () {
            DB.put('notes', {
              id: 'day-' + dn,
              text: ta.value,
              updatedAt: Date.now()
            }).then(function () {
              showToast('Nota salvata ✓');
            });
          }, 500);
        });
      }

      // Init Leaflet mini-map for this day
      initDayMiniMap(dayNum, day);
    });
  }

  /**
   * Init Leaflet mini-map for a specific day's GPS points.
   * Tiles are cached by Service Worker after first online load.
   */
  function initDayMiniMap(dayNum, day) {
    if (!day.gps || day.gps.length === 0) return;
    var mapEl = document.getElementById('day-mini-map-' + dayNum);
    if (!mapEl) return;

    function build() {
      mapEl.innerHTML = '';
      var dayMap = L.map(mapEl, { zoomControl: true, attributionControl: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution: '© OSM'
      }).addTo(dayMap);

      // Route line
      if (day.gps.length > 1) {
        var routeCoords = [];
        for (var rc = 0; rc < day.gps.length; rc++) {
          routeCoords.push([day.gps[rc].lat, day.gps[rc].lng]);
        }
        L.polyline(routeCoords, { color: '#e8732a', weight: 3, opacity: 0.85, dashArray: '6,6' }).addTo(dayMap);
      }

      // Markers
      for (var pi = 0; pi < day.gps.length; pi++) {
        var pt = day.gps[pi];
        var icon = L.divIcon({
          className: 'custom-pin',
          html: '<div style="width:14px;height:14px;background:#e74c3c;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.6);"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        var marker = L.marker([pt.lat, pt.lng], { icon: icon }).addTo(dayMap);
        var gmaps = 'https://www.google.com/maps/search/?api=1&query=' + pt.lat + ',' + pt.lng;
        marker.bindPopup('<div style="font-weight:700;">' + pt.name + '</div><a href="' + gmaps + '" target="_blank" style="color:#e8732a;">📍 Google Maps</a>');
      }

      // Fit bounds
      if (day.gps.length === 1) {
        dayMap.setView([day.gps[0].lat, day.gps[0].lng], 11);
      } else {
        var bnds = [];
        for (var bi = 0; bi < day.gps.length; bi++) bnds.push([day.gps[bi].lat, day.gps[bi].lng]);
        dayMap.fitBounds(bnds, { padding: [20, 20] });
      }
    }

    if (typeof L === 'undefined') {
      // Lazy-load Leaflet (shared with maps.js)
      if (!document.getElementById('leaflet-css')) {
        var css = document.createElement('link');
        css.id = 'leaflet-css';
        css.rel = 'stylesheet';
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(css);
      }
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = build;
      script.onerror = function() {
        mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:10px;font-size:0.8rem;opacity:0.7;">⚠️ Mappa non disponibile offline al primo avvio.</div>';
      };
      document.head.appendChild(script);
    } else {
      build();
    }
  }

  function saveCustomActivities(dayNum, activities) {
    return DB.put('edits', {
      id: 'itinerary-day-' + dayNum + '-activities',
      value: activities,
      updatedAt: Date.now()
    });
  }

  return new Promise(function (resolve) {
    var wrapper = '<div class="section-content fade-in">' +
      '<h2 class="section-title">📅 Itinerario</h2>' +
      '<div class="day-nav">' +
        '<button class="day-nav-btn" id="day-prev" type="button">◀</button>' +
        '<span class="day-nav-title" id="day-nav-title">Giorno ' + currentDay + ' / 15</span>' +
        '<button class="day-nav-btn" id="day-next" type="button">▶</button>' +
      '</div>' +
      '<div id="itinerary-container"></div>' +
    '</div>';

    resolve(wrapper);

    setTimeout(function () {
      renderDay(currentDay);

      var prevBtn = document.getElementById('day-prev');
      var nextBtn = document.getElementById('day-next');

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          if (currentDay > 1) {
            currentDay--;
            renderDay(currentDay);
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          if (currentDay < 15) {
            currentDay++;
            renderDay(currentDay);
          }
        });
      }
    }, 0);
  });
}
