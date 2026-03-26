/**
 * itinerary.js — Itinerario 15 giorni
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderItinerary(), makeGpsLink()
 * Enhanced: editable activities, add/delete custom activities, auto-save to IndexedDB
 */

function makeGpsLink(name, lat, lng) {
  return '<a class="gps-link" href="https://www.google.com/maps?q=' + lat + ',' + lng + '" target="_blank" rel="noopener">' + name + ' (' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ')</a>';
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
          html += '<div class="timeline-desc editable" contenteditable="true" data-default-idx="' + a + '" data-day="' + dayNum + '">' + act.description + '</div>';
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

      // GPS coordinates
      if (day.gps && day.gps.length > 0) {
        html += '<h3 style="margin:12px 0 8px;font-size:1rem;">Coordinate GPS</h3>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
        for (var g = 0; g < day.gps.length; g++) {
          var pt = day.gps[g];
          html += makeGpsLink(pt.name, pt.lat, pt.lng);
        }
        html += '</div>';
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
    });
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
