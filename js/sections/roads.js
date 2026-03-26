/**
 * roads.js — Strade Proibite e Info Noleggio
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderRoads()
 * Depends on: PROHIBITED_ROADS, RENTAL_INFO (data.js)
 */

function renderRoads() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">🛣️ Strade e Noleggio</h2>';

  // Warning banner
  html += '<div class="warning-box" style="flex-direction:column;gap:6px;">';
  html += '<div style="display:flex;align-items:center;gap:8px;">';
  html += '<span class="warning-icon">⚠️</span>';
  html += '<strong>REGOLE ASSICURAZIONE</strong></div>';
  html += '<p>' + PROHIBITED_ROADS.avviso + '</p>';
  html += '</div>';

  // Crossover prohibited roads
  var cr = PROHIBITED_ROADS.crossoverVietate;
  html += '<div class="card">';
  html += '<div class="card-title">' + cr.titolo + '</div>';
  html += '<ul style="padding-left:18px;">';
  for (var i = 0; i < cr.strade.length; i++) {
    html += '<li style="margin-bottom:6px;color:var(--color-danger);font-weight:600;">';
    html += '❌ ' + cr.strade[i] + '</li>';
  }
  html += '</ul></div>';

  // Implications for our trip
  html += '<div class="card"><div class="card-title">📋 Cosa significa per il nostro viaggio</div>';
  for (var j = 0; j < PROHIBITED_ROADS.implicazioniViaggio.length; j++) {
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);">';
    html += PROHIBITED_ROADS.implicazioniViaggio[j];
    html += '</div>';
  }
  html += '</div>';

  // Rental contract summary
  html += '<div class="card"><div class="card-title">📄 Contratto Noleggio</div>';
  html += '<p><strong>Ordine:</strong> ' + RENTAL_INFO.ordine + '</p>';
  html += '<p><strong>Auto:</strong> ' + RENTAL_INFO.auto + '</p>';
  html += '<p><strong>Periodo:</strong> ' + RENTAL_INFO.periodo.inizio + ' → ' + RENTAL_INFO.periodo.fine + ' (' + RENTAL_INFO.periodo.giorni + ' giorni)</p>';
  html += '<p><strong>Costo:</strong> ' + RENTAL_INFO.costo.perGiorno + ' KGS/giorno = ' + RENTAL_INFO.costo.totaleNoleggio + ' KGS totale</p>';
  html += '<p><strong>Con servizi:</strong> ' + RENTAL_INFO.costo.totaleConServizi + ' KGS (~€' + Math.round(RENTAL_INFO.costo.totaleConServizi / 97) + ')</p>';
  html += '<p><strong>Deposito:</strong> $' + RENTAL_INFO.deposito.importo + ' (' + RENTAL_INFO.deposito.nota + ')</p>';
  html += '<p><strong>Limite km:</strong> ' + RENTAL_INFO.limiteKm.limite + ' km (extra: ' + RENTAL_INFO.limiteKm.costoExtra + ' KGS/km)</p>';
  html += '<p><strong>Carburante:</strong> ' + RENTAL_INFO.carburante + '</p>';
  html += '<p><strong>Restituzione:</strong> ' + RENTAL_INFO.restituzione + '</p>';
  html += '</div>';

  // Insurance details
  var ins = RENTAL_INFO.assicurazione;
  html += '<div class="card"><div class="card-title">🛡️ Assicurazione</div>';
  html += '<p><strong>Tipo:</strong> ' + ins.tipo + '</p>';
  html += '<p><strong>Franchigia:</strong> ' + ins.franchigia + '</p>';
  html += '<h4 style="margin:8px 0 4px;">Regole:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var r = 0; r < ins.regole.length; r++) {
    html += '<li style="margin-bottom:4px;">' + ins.regole[r] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:8px 0 4px;color:var(--color-danger);">NON copre:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var n = 0; n < ins.nonCopre.length; n++) {
    html += '<li style="margin-bottom:4px;color:var(--color-danger);">' + ins.nonCopre[n] + '</li>';
  }
  html += '</ul></div>';

  // Services included
  html += '<details><summary>✅ Servizi Inclusi</summary><div class="details-content">';
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

  // Contact
  html += '<div class="card"><div class="card-title">📞 Contatti Russian Troika</div>';
  for (var t = 0; t < RENTAL_INFO.telefoni.length; t++) {
    var tel = RENTAL_INFO.telefoni[t];
    html += '<div class="sos-number"><span>' + tel.label + ':</span> <a href="tel:' + tel.number + '">' + tel.number + '</a></div>';
  }
  html += '<p><strong>Email:</strong> <a href="mailto:' + RENTAL_INFO.email + '">' + RENTAL_INFO.email + '</a></p>';
  html += '<p><strong>Sito:</strong> <a href="https://' + RENTAL_INFO.sito + '" target="_blank">' + RENTAL_INFO.sito + '</a></p>';
  html += '<p><strong>Indirizzo:</strong> ' + RENTAL_INFO.indirizzo + '</p>';
  html += '</div>';

  html += '</div>';
  return html;
}
