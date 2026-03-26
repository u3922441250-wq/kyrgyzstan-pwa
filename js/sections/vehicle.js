/**
 * vehicle.js — Sezione Veicolo
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderVehicle()
 * Depends on: RENTAL_INFO, PROHIBITED_ROADS (data.js)
 */

function renderVehicle() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">🚗 Veicolo</h2>';

  // Order summary card
  html += '<div class="card">';
  html += '<div class="card-title">📋 Ordine N ' + RENTAL_INFO.ordine + '</div>';
  html += '<p><strong>Auto:</strong> ' + RENTAL_INFO.auto + '</p>';
  html += '<p><strong>Periodo:</strong> ' + RENTAL_INFO.periodo.inizio + ' → ' + RENTAL_INFO.periodo.fine + '</p>';
  html += '<p><strong>Durata:</strong> ' + RENTAL_INFO.periodo.giorni + ' giorni</p>';
  html += '<p><strong>Costo noleggio:</strong> ' + RENTAL_INFO.costo.perGiorno + ' KGS/giorno × ' + RENTAL_INFO.periodo.giorni + ' = ' + RENTAL_INFO.costo.totaleNoleggio + ' KGS</p>';
  html += '<p><strong>Servizi aggiuntivi:</strong> 1,100 KGS (2x SIM card)</p>';
  html += '<p><strong>Totale:</strong> ' + RENTAL_INFO.costo.totaleConServizi + ' KGS (~€' + Math.round(RENTAL_INFO.costo.totaleConServizi / 97) + ' / ~$' + Math.round(RENTAL_INFO.costo.totaleConServizi / 87) + ')</p>';
  html += '<p><strong>Stato:</strong> <span class="badge badge-success">Prenotazione confermata</span></p>';
  html += '</div>';

  // Deposit & km limit
  html += '<div class="card">';
  html += '<div class="card-title">💰 Deposito e Limiti</div>';
  html += '<p><strong>Deposito:</strong> $' + RENTAL_INFO.deposito.importo + ' (' + RENTAL_INFO.deposito.nota + ')</p>';
  html += '<p><strong>Limite km:</strong> ' + RENTAL_INFO.limiteKm.limite + ' km totali</p>';
  html += '<p><strong>Extra km:</strong> ' + RENTAL_INFO.limiteKm.costoExtra + ' KGS per ogni km oltre il limite</p>';
  html += '<p><strong>Carburante:</strong> ' + RENTAL_INFO.carburante + '</p>';
  html += '<p><strong>Restituzione:</strong> ' + RENTAL_INFO.restituzione + '</p>';
  html += '<p><strong>Età guidatore:</strong> ' + RENTAL_INFO.etaGuida + '</p>';
  html += '</div>';

  // Vehicle specs
  html += '<div class="card">';
  html += '<div class="card-title">🔧 Specifiche Veicolo</div>';
  html += '<table class="data-table">';
  html += '<tr><td><strong>Modello</strong></td><td>Subaru Outback 2018</td></tr>';
  html += '<tr><td><strong>Colore</strong></td><td>Grigio (957)</td></tr>';
  html += '<tr><td><strong>Trazione</strong></td><td>AWD (integrale permanente)</td></tr>';
  html += '<tr><td><strong>Cambio</strong></td><td>Manuale</td></tr>';
  html += '<tr><td><strong>Carburante</strong></td><td>Benzina 92/95 SOLO</td></tr>';
  html += '<tr><td><strong>Serbatoio</strong></td><td>~60L</td></tr>';
  html += '<tr><td><strong>Autonomia asfalto</strong></td><td>~500-600 km</td></tr>';
  html += '<tr><td><strong>Autonomia sterrato</strong></td><td>~350-400 km</td></tr>';
  html += '<tr><td><strong>Altezza da terra</strong></td><td>~220mm</td></tr>';
  html += '<tr><td><strong>Tipo</strong></td><td>AWD (NON 4x4 vero, no low-range)</td></tr>';
  html += '</table></div>';

  // Insurance
  var ins = RENTAL_INFO.assicurazione;
  html += '<div class="card">';
  html += '<div class="card-title">🛡️ Assicurazione</div>';
  html += '<p><strong>Tipo:</strong> ' + ins.tipo + '</p>';
  html += '<p><strong>Franchigia:</strong> ' + ins.franchigia + '</p>';
  html += '<h4 style="margin:8px 0 4px;">Regole:</h4><ul style="padding-left:18px;">';
  for (var r = 0; r < ins.regole.length; r++) {
    html += '<li style="margin-bottom:4px;">' + ins.regole[r] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:8px 0 4px;color:var(--color-danger);">L\'assicurazione NON copre:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var n = 0; n < ins.nonCopre.length; n++) {
    html += '<li style="margin-bottom:4px;color:var(--color-danger);">❌ ' + ins.nonCopre[n] + '</li>';
  }
  html += '</ul></div>';

  // Prohibited roads
  html += '<div class="card">';
  html += '<div class="card-title">🚫 Strade Proibite per Crossover</div>';
  html += '<div class="warning-box"><span class="warning-icon">⚠️</span><span>' + PROHIBITED_ROADS.avviso + '</span></div>';
  var cr = PROHIBITED_ROADS.crossoverVietate;
  html += '<ul style="padding-left:18px;">';
  for (var i = 0; i < cr.strade.length; i++) {
    html += '<li style="margin-bottom:4px;color:var(--color-danger);font-weight:600;">❌ ' + cr.strade[i] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:10px 0 6px;">Cosa significa per noi:</h4>';
  for (var j = 0; j < PROHIBITED_ROADS.implicazioniViaggio.length; j++) {
    html += '<div style="padding:4px 0;border-bottom:1px solid var(--color-border);">' + PROHIBITED_ROADS.implicazioniViaggio[j] + '</div>';
  }
  html += '</div>';

  // Terms of rent
  html += '<div class="card">';
  html += '<div class="card-title">📜 Termini di Noleggio</div>';
  html += '<ul style="padding-left:18px;">';
  var terms = [
    "Deposito $500 — rimborsato alla restituzione",
    "Limite viaggio: 3,900 km. Extra: 20 KGS/km",
    "Auto restituita pulita + serbatoio pieno",
    "Lavaggio se sporca: 300 KGS",
    "Serbatoio vuoto: 4,000 KGS",
    "Lavaggio a secco interni: 2,500 KGS",
    "Noleggio SOLO in Kirghizistan",
    "Non cedere l'auto ad altre persone",
    "Solo guidatori 23-65 anni con 1.5+ anni esperienza",
    "Velocità max 100 km/h (altrimenti assicurazione non valida)",
    "No alcol o droghe alla guida",
    "In caso di incidente: NON spostare l'auto (assicurazione non paga)",
    "In caso di guasto: rimorchio obbligatorio (non guidare)"
  ];
  for (var t = 0; t < terms.length; t++) {
    html += '<li style="margin-bottom:6px;">' + terms[t] + '</li>';
  }
  html += '</ul></div>';

  // Services included
  html += '<details><summary>✅ Servizi Inclusi nel Noleggio</summary><div class="details-content">';
  for (var s = 0; s < RENTAL_INFO.serviziInclusi.length; s++) {
    var srv = RENTAL_INFO.serviziInclusi[s];
    html += '<div style="padding:4px 0;display:flex;justify-content:space-between;">';
    html += '<span>' + srv.nome + '</span><span style="font-weight:600;">' + srv.prezzo + '</span></div>';
  }
  html += '</div></details>';

  // Available services by category
  var svcCats = [
    { key: 'firstHelp', label: '🆘 Primo Soccorso' },
    { key: 'pathfinder', label: '🗺️ Navigazione' },
    { key: 'turisti', label: '🏕️ Per Turisti' },
    { key: 'extra', label: '🔧 Extra' },
    { key: 'pickup', label: '🚗 Ritiro Auto' },
    { key: 'dropoff', label: '📍 Riconsegna Auto' }
  ];
  var svcs = RENTAL_INFO.serviziDisponibili;
  for (var sc = 0; sc < svcCats.length; sc++) {
    var cat = svcCats[sc];
    var items = svcs[cat.key];
    if (!items || items.length === 0) continue;
    html += '<details><summary>' + cat.label + '</summary><div class="details-content">';
    for (var si = 0; si < items.length; si++) {
      var itm = items[si];
      html += '<div style="padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid var(--color-border);">';
      html += '<span>' + itm.nome + '</span><span style="font-weight:600;white-space:nowrap;margin-left:8px;">' + itm.prezzo + '</span></div>';
    }
    html += '</div></details>';
  }

  // Contacts
  html += '<div class="card">';
  html += '<div class="card-title">📞 Contatti Russian Troika</div>';
  for (var c = 0; c < RENTAL_INFO.telefoni.length; c++) {
    var tel = RENTAL_INFO.telefoni[c];
    html += '<div class="sos-number"><span>' + tel.label + ':</span> <a href="tel:' + tel.number + '">' + tel.number + '</a></div>';
  }
  html += '<p style="margin-top:8px;"><strong>Email:</strong> <a href="mailto:' + RENTAL_INFO.email + '">' + RENTAL_INFO.email + '</a></p>';
  html += '<p><strong>Sito:</strong> <a href="https://' + RENTAL_INFO.sito + '" target="_blank">' + RENTAL_INFO.sito + '</a></p>';
  html += '<p><strong>Indirizzo:</strong> ' + RENTAL_INFO.indirizzo + '</p>';
  html += '</div>';

  // Documents & links
  html += '<div class="card">';
  html += '<div class="card-title">📄 Documenti e Link</div>';
  html += '<div style="display:flex;flex-direction:column;gap:8px;">';
  html += '<a class="btn btn-primary" href="https://avtoprokat.kg/start/index.php/en/avtopark?mode=show_order&act=view&password=260321183229&order=50023209&act=view&first=1" target="_blank" style="text-align:center;">📋 Visualizza Ordine Online</a>';
  html += '<a class="btn btn-accent" href="icons/contract_en.pdf" target="_blank" style="text-align:center;">📜 Contratto Noleggio (PDF locale)</a>';
  html += '<a class="btn btn-secondary" href="icons/insurance_OSOGO.jpg" target="_blank" style="text-align:center;">🛡️ Assicurazione OSAGO (locale)</a>';
  html += '<a class="btn btn-secondary" href="https://avtoprokat.kg/start/index.php/en/avtopark?mode=show_order&act=services&password=260321183229&order=50023209" target="_blank" style="text-align:center;">🛒 Lista Servizi Opzionali</a>';
  html += '<a class="btn btn-secondary" href="https://avtoprokat.kg/start/index.php/en/avtopark?mode=show_order&act=photos&password=260321183229&order=50023209" target="_blank" style="text-align:center;">📸 Foto Auto</a>';
  html += '<a class="btn btn-secondary" href="https://avtoprokat.kg" target="_blank" style="text-align:center;">🌐 Sito Russian Troika</a>';
  html += '</div>';
  html += '</div>';

  // Prohibited roads map
  html += '<div class="card">';
  html += '<div class="card-title">🗺️ Mappa Strade Proibite</div>';
  html += '<p style="margin-bottom:8px;"><strong>Linee nere</strong> = strade proibite per TUTTI<br><strong style="color:var(--color-danger);">Linee rosse</strong> = solo per crossover (noi!)</p>';
  html += '<img src="icons/roadmap.png" alt="Mappa strade proibite Russian Troika" style="width:100%;border-radius:var(--radius-sm);border:1px solid var(--color-border);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">';
  html += '<a class="btn btn-danger" href="https://avtoprokat.kg/start/images/roadmap.png" target="_blank" style="text-align:center;width:100%;display:none;">🗺️ Vedi Mappa Online (immagine locale non trovata)</a>';
  html += '</div>';

  html += '</div>';
  return html;
}
