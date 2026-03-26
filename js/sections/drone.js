/**
 * drone.js — Drone Info
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderDrone()
 * Enhanced: editable content blocks with reset support
 */

function renderDrone() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">🚁 Info Droni</h2>';

  // Regulations
  html += '<div class="card"><div class="card-title">📋 Regolamenti</div>';
  html += '<div id="drone-regolamenti">';
  html += '<ul style="padding-left:18px;">';
  for (var i = 0; i < DRONE_INFO.regolamenti.length; i++) {
    html += '<li style="margin-bottom:6px;">' + DRONE_INFO.regolamenti[i] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary drone-reset-btn" data-section="drone-regolamenti" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div>';

  // No-fly zones
  html += '<div class="warning-box" style="flex-direction:column;gap:6px;">';
  html += '<div style="display:flex;align-items:center;gap:8px;"><span class="warning-icon">🚫</span><strong>Zone No-Fly</strong></div>';
  html += '<div id="drone-nofly">';
  html += '<ul style="padding-left:18px;margin:0;">';
  for (var n = 0; n < DRONE_INFO.noFlyZones.length; n++) {
    html += '<li style="margin-bottom:4px;">' + DRONE_INFO.noFlyZones[n] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary drone-reset-btn" data-section="drone-nofly" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div>';

  // Best spots ranked with GPS
  html += '<div class="card"><div class="card-title">🏆 Migliori Spot Drone</div>';
  for (var s = 0; s < DRONE_INFO.bestSpots.length; s++) {
    var spot = DRONE_INFO.bestSpots[s];
    var lat = null;
    var lng = null;
    for (var w = 0; w < WAYPOINTS.length; w++) {
      if (WAYPOINTS[w].name.indexOf(spot.name) !== -1 || spot.name.indexOf(WAYPOINTS[w].name) !== -1) {
        lat = WAYPOINTS[w].lat;
        lng = WAYPOINTS[w].lng;
        break;
      }
    }
    html += '<div style="padding:8px 0;border-bottom:1px solid var(--color-border);">';
    html += '<div style="font-weight:700;">' + spot.rank + ' ' + spot.name + ' <span class="badge badge-info">Giorno ' + spot.day + '</span></div>';
    html += '<p style="font-size:0.9rem;margin:4px 0;">' + spot.description + '</p>';
    if (lat !== null && lng !== null) {
      html += makeGpsLink(spot.name, lat, lng);
    }
    html += '</div>';
  }
  html += '</div>';

  // Altitude tips
  html += '<div class="card"><div class="card-title">🏔️ Consigli per Volo in Quota</div>';
  html += '<div id="drone-tips">';
  html += '<ul style="padding-left:18px;">';
  for (var t = 0; t < DRONE_INFO.altitudeTips.length; t++) {
    html += '<li style="margin-bottom:6px;">' + DRONE_INFO.altitudeTips[t] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary drone-reset-btn" data-section="drone-tips" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div>';

  wrapper.innerHTML = html;

  // Make editable after DOM ready
  setTimeout(function () {
    var sections = ['drone-regolamenti', 'drone-nofly', 'drone-tips'];
    for (var i = 0; i < sections.length; i++) {
      (function (sectionId) {
        var el = document.getElementById(sectionId);
        if (!el) return;
        var originalHtml = el.innerHTML;

        DB.get('edits', sectionId).then(function (record) {
          if (record && record.value) {
            el.innerHTML = record.value;
          }
          Editable.make(el, sectionId, originalHtml);

          var resetBtn = el.parentElement.querySelector('.drone-reset-btn[data-section="' + sectionId + '"]');
          if (resetBtn) {
            function checkModified() {
              if (el.innerHTML.trim() !== originalHtml.trim()) {
                resetBtn.style.display = '';
              } else {
                resetBtn.style.display = 'none';
              }
            }
            el.addEventListener('input', checkModified);
            checkModified();

            resetBtn.addEventListener('click', function () {
              Editable.reset(sectionId).then(function () {
                el.innerHTML = originalHtml;
                el.classList.remove('modified');
                resetBtn.style.display = 'none';
                showToast('Ripristinato ✓');
              });
            });
          }
        });
      })(sections[i]);
    }
  }, 0);

  return wrapper;
}
