/**
 * altitude.js — Montagne: Altitudine + Passi
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderAltitude()
 */

var MOUNTAIN_PASSES = [
  { name: 'Too-Ashuu Pass', alt: 3150, day: '2 / 15', route: 'Bishkek ↔ Suusamyr Valley', status: '✅ Aperto', notes: 'Tunnel + tornanti. Possibile neve residua a fine maggio. Strada asfaltata ma stretta. Nebbia frequente.' },
  { name: 'Kalmak-Ashuu Pass', alt: 3446, day: '2', route: 'Bishkek → Issyk-Kul (via nord)', status: '✅ Aperto', notes: 'Alternativa a Too-Ashuu. Strada buona, meno trafficata.' },
  { name: 'Son-Kul Pass (nord)', alt: 3500, day: '6', route: 'Kochkor → Son-Kul', status: '⚠️ Verificare', notes: 'Può essere chiuso fino a metà giugno per neve. Sterrato. Chiedere a Kochkor prima di partire.' },
  { name: 'Son-Kul Pass (sud/Moldo-Ashuu)', alt: 3720, day: '8', route: 'Son-Kul → Naryn', status: '⚠️ Verificare', notes: 'Più alto e più rischioso del passo nord. Neve possibile. Sterrato impegnativo.' },
  { name: 'Dolon Pass', alt: 3030, day: '8', route: 'Son-Kul → Naryn (alternativa)', status: '✅ Aperto', notes: 'Alternativa più bassa e sicura. Strada migliore.' },
  { name: 'Kyzyl-Bel Pass', alt: 2485, day: '10', route: 'At-Bashy → Kazarman', status: '✅ Aperto', notes: 'Parte della strada più selvaggia. Sterrato, nessun servizio.' },
  { name: 'Kazarman Passes (multipli)', alt: 3300, day: '10', route: 'At-Bashy → Kazarman', status: '⚠️ Verificare', notes: 'Diversi passi sopra 3000m. Strada sterrata, condizioni variabili. NESSUNA benzina. Partire con serbatoio pieno + tanica.' },
  { name: 'Ala-Bel Pass', alt: 3184, day: '14-15', route: 'Osh → Bishkek (M39)', status: '✅ Aperto', notes: 'Strada principale M39, asfaltata. Traffico pesante (camion).' },
  { name: 'Otmok Pass', alt: 3332, day: '14-15', route: 'Osh → Bishkek (M39)', status: '✅ Aperto', notes: 'Secondo passo sulla M39. Asfaltato ma tornanti stretti.' }
];

function renderAltitude() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">⛰️ Montagne</h2>';

  // === PASSI DI MONTAGNA ===
  html += '<details open><summary>🏔️ Passi di Montagna</summary><div class="details-content">';
  html += '<p style="font-size:0.85rem;margin-bottom:10px;opacity:0.7;">Stato tipico fine maggio / inizio giugno. Verificare sempre localmente prima di partire.</p>';
  for (var p = 0; p < MOUNTAIN_PASSES.length; p++) {
    var pass = MOUNTAIN_PASSES[p];
    var statusColor = pass.status.indexOf('✅') >= 0 ? 'var(--color-secondary)' : 'var(--color-accent)';
    html += '<div class="card" style="margin-bottom:8px;' + (pass.alt >= 3000 ? 'cursor:pointer;' : '') + '"' + (pass.alt >= 3000 ? ' onclick="altitudeSick()"' : '') + '>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div style="font-weight:700;">' + pass.name + '</div>';
    html += '<div style="font-weight:700;color:' + statusColor + ';">' + pass.alt + 'm</div>';
    html += '</div>';
    html += '<div style="font-size:0.82rem;opacity:0.7;">Giorno ' + pass.day + ' · ' + pass.route + '</div>';
    html += '<div style="font-size:0.85rem;margin-top:4px;">' + pass.status + '</div>';
    html += '<div style="font-size:0.82rem;margin-top:2px;opacity:0.8;">' + pass.notes + '</div>';
    html += '</div>';
  }
  html += '</div></details>';

  // === ALTITUDINI PER TAPPA ===
  html += '<details><summary>📊 Altitudini per Tappa</summary><div class="details-content">';
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
  html += '</tbody></table>';
  html += '</div></details>';

  // === MAL DI MONTAGNA ===
  html += '<details><summary>🤒 Mal di Montagna</summary><div class="details-content">';
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
  html += '<p><b>Azione:</b> <b>SCENDERE IMMEDIATAMENTE</b></p></div>';
  html += '</div></details>';

  // === PREVENZIONE ===
  html += '<details><summary>🛡️ Prevenzione</summary><div class="details-content">';
  html += '<ul style="padding-left:18px;">';
  var prev = [
    "Salire gradualmente: max 500m/giorno sopra 3,000m",
    "Idratarsi: 3-4L acqua al giorno in quota",
    "No alcol la prima notte sopra 3,000m",
    "Mangiare leggero ma regolarmente",
    "Se i sintomi peggiorano → SCENDERE",
    "Regola: sali in alto, dormi in basso",
    "2 notti a Son-Kul (3,016m) prima di Kel-Suu (3,500m)"
  ];
  for (var pr = 0; pr < prev.length; pr++) {
    html += '<li style="margin-bottom:6px;">' + prev[pr] + '</li>';
  }
  html += '</ul></div></details>';

  // === DIAMOX ===
  html += '<details><summary>💊 Diamox</summary><div class="details-content">';
  html += '<p><b>Dosaggio:</b> 125mg x2/giorno (mattina e sera)</p>';
  html += '<p><b>Quando:</b> iniziare 1 giorno prima di salire sopra 3,000m</p>';
  html += '<p><b>Durata:</b> 2-3 giorni dopo quota massima</p>';
  html += '<p><b>Effetti:</b> formicolio mani/piedi, diuresi, sapore metallico</p>';
  html += '<div class="warning-box"><span class="warning-icon">⚠️</span>';
  html += '<span><b>Controindicazione:</b> allergia ai sulfonamidi. Consultare medico.</span></div>';
  html += '</div></details>';

  html += '<img src="icons/mountain-pass.png" style="width:100%;border-radius:var(--radius);margin-top:16px;box-shadow:var(--shadow);" alt="Passo di montagna">';
  html += '</div>';
  return html;
}
