/**
 * sos.js — SOS / Emergenza Panel
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderSos(), makeTelLink()
 */

/**
 * Generate a clickable tel: link.
 * @param {string} name
 * @param {string} number
 * @returns {string} HTML string
 */
function makeTelLink(name, number) {
  return '<a href="tel:' + number + '">' + number + '</a>';
}

function renderSos() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">🏥 SOS Emergenza</h2>';

  // Emergency numbers
  html += '<div class="card"><div class="card-title">📞 Numeri di Emergenza</div>';
  for (var i = 0; i < EMERGENCY_CONTACTS.length; i++) {
    var contact = EMERGENCY_CONTACTS[i];
    html += '<div class="sos-number"><span>' + contact.name + ':</span> ' + makeTelLink(contact.name, contact.number) + '</div>';
  }
  html += '</div>';

  // Altitude sickness guide
  html += '<div class="card"><div class="card-title">🏔️ Mal di Montagna — Guida Rapida</div>';

  html += '<div style="margin-bottom:10px;">';
  html += '<h4 style="margin-bottom:4px;"><span class="badge badge-warning">Lieve</span></h4>';
  html += '<p><strong>Sintomi:</strong> mal di testa, stanchezza, nausea</p>';
  html += '<p><strong>Azione:</strong> bere acqua, riposare, non salire ulteriormente</p>';
  html += '</div>';

  html += '<div style="margin-bottom:10px;">';
  html += '<h4 style="margin-bottom:4px;"><span class="badge badge-danger">Moderato</span></h4>';
  html += '<p><strong>Sintomi:</strong> mal di testa forte, vomito</p>';
  html += '<p><strong>Azione:</strong> prendere sul serio, considerare la discesa</p>';
  html += '</div>';

  html += '<div style="margin-bottom:10px;">';
  html += '<h4 style="margin-bottom:4px;"><span class="badge badge-danger" style="background:#8b0000;">Grave</span></h4>';
  html += '<p><strong>Sintomi:</strong> confusione, difficoltà a camminare dritto</p>';
  html += '<p><strong>Azione:</strong> <strong>SCENDERE IMMEDIATAMENTE</strong></p>';
  html += '</div>';
  html += '</div>';

  // Altitude table
  html += '<div class="card"><div class="card-title">📊 Altitudini per Tappa</div>';
  html += '<table class="data-table"><thead><tr><th>Giorno</th><th>Luogo</th><th>Quota</th><th>Rischio</th></tr></thead><tbody>';
  for (var a = 0; a < ALTITUDE_DATA.length; a++) {
    var alt = ALTITUDE_DATA[a];
    var riskBadge = '';
    if (alt.risk === 'alto') {
      riskBadge = '<span class="badge badge-danger">' + alt.risk + '</span>';
    } else if (alt.risk === 'moderato') {
      riskBadge = '<span class="badge badge-warning">' + alt.risk + '</span>';
    } else if (alt.risk === 'basso') {
      riskBadge = '<span class="badge badge-info">' + alt.risk + '</span>';
    } else {
      riskBadge = '<span class="badge badge-success">' + alt.risk + '</span>';
    }
    html += '<tr><td>' + alt.day + '</td><td>' + alt.location + '</td><td class="number">' + alt.altitude + 'm</td><td>' + riskBadge + '</td></tr>';
  }
  html += '</tbody></table></div>';

  // Nearest hospital by zone
  html += '<div class="card"><div class="card-title">🏥 Ospedali per Zona</div>';

  var hospitals = [
    { zone: 'Bishkek', info: 'City Hospital — multiple opzioni, strutture migliori del paese' },
    { zone: 'Karakol', info: 'Regional Hospital — ospedale regionale' },
    { zone: 'Naryn', info: 'Regional Hospital — ospedale regionale' },
    { zone: 'Osh', info: 'City Hospital — ospedale cittadino' },
    { zone: 'Zone remote', info: '⚠️ Evacuare verso la città più vicina — nessuna struttura medica' }
  ];

  for (var h = 0; h < hospitals.length; h++) {
    var hosp = hospitals[h];
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);">';
    html += '<strong>' + hosp.zone + ':</strong> ' + hosp.info;
    html += '</div>';
  }
  html += '</div>';

  html += '</div>';
  return html;
}
