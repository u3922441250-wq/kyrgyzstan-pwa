/**
 * altitude.js — Guida Altitudine
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderAltitude()
 */

function renderAltitude() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">⛰️ Guida Altitudine</h2>';

  // Altitude table
  html += '<div class="card"><div class="card-title">📊 Altitudini per Tappa</div>';
  html += '<table class="data-table"><thead><tr><th>G.</th><th>Luogo</th><th>Quota</th><th>Rischio</th></tr></thead><tbody>';
  for (var i = 0; i < ALTITUDE_DATA.length; i++) {
    var alt = ALTITUDE_DATA[i];
    var bc = 'badge-success';
    if (alt.risk === 'alto') bc = 'badge-danger';
    else if (alt.risk === 'moderato') bc = 'badge-warning';
    else if (alt.risk === 'basso') bc = 'badge-info';
    html += '<tr><td>' + alt.day + '</td><td>' + alt.location + '</td>';
    html += '<td class="number">' + alt.altitude + 'm</td>';
    html += '<td><span class="badge ' + bc + '">' + alt.risk + '</span></td></tr>';
  }
  html += '</tbody></table></div>';

  // Symptoms
  html += '<div class="card"><div class="card-title">🏔️ Sintomi Mal di Montagna</div>';
  html += '<div style="margin-bottom:12px;">';
  html += '<h4><span class="badge badge-warning">Lieve</span></h4>';
  html += '<p><b>Sintomi:</b> mal di testa, stanchezza, nausea, sonno scarso</p>';
  html += '<p><b>Azione:</b> bere acqua, riposare, ibuprofene</p></div>';
  html += '<div style="margin-bottom:12px;">';
  html += '<h4><span class="badge badge-danger">Moderato</span></h4>';
  html += '<p><b>Sintomi:</b> mal di testa forte, vomito, fiato corto a riposo</p>';
  html += '<p><b>Azione:</b> considerare discesa 500-1000m, Diamox</p></div>';
  html += '<div style="margin-bottom:12px;">';
  html += '<h4><span class="badge badge-danger" style="background:#8b0000;">Grave (HACE/HAPE)</span></h4>';
  html += '<p><b>HACE:</b> confusione, atassia, allucinazioni</p>';
  html += '<p><b>HAPE:</b> tosse, fiato corto estremo, labbra bluastre</p>';
  html += '<p><b>Azione:</b> <b>SCENDERE IMMEDIATAMENTE</b></p></div></div>';

  // Prevention
  html += '<div class="card"><div class="card-title">🛡️ Prevenzione</div><ul style="padding-left:18px;">';
  var prev = [
    "Salire gradualmente: max 500m/giorno sopra 3,000m",
    "Idratarsi: 3-4L acqua al giorno in quota",
    "No alcol la prima notte sopra 3,000m",
    "Mangiare leggero ma regolarmente",
    "Se i sintomi peggiorano → SCENDERE",
    "Regola: sali in alto, dormi in basso",
    "2 notti a Son-Kul (3,016m) prima di Kel-Suu (3,500m)"
  ];
  for (var p = 0; p < prev.length; p++) {
    html += '<li style="margin-bottom:6px;">' + prev[p] + '</li>';
  }
  html += '</ul></div>';

  // Diamox
  html += '<div class="card"><div class="card-title">💊 Diamox</div>';
  html += '<p><b>Dosaggio:</b> 125mg x2/giorno (mattina e sera)</p>';
  html += '<p><b>Quando:</b> iniziare 1 giorno prima di salire sopra 3,000m</p>';
  html += '<p><b>Durata:</b> 2-3 giorni dopo quota massima</p>';
  html += '<p><b>Effetti:</b> formicolio mani/piedi, diuresi, sapore metallico</p>';
  html += '<div class="warning-box"><span class="warning-icon">⚠️</span>';
  html += '<span><b>Controindicazione:</b> allergia ai sulfonamidi. Consultare medico.</span></div>';
  html += '</div>';

  html += '</div>';
  return html;
}
