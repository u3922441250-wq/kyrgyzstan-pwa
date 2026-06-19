/**
 * vehicle.js — Sezione Veicolo
 * Kyrgyzstan Travel PWA 2026
 *
 * Macro-aree collapsible:
 *  📋 Prenotazione
 *  📜 Termini & Condizioni
 *  📄 Documenti Auto (sempre visibili)
 *  🛒 Shop & Accessori
 *  🚫 Strade Proibite
 *  🚗 Guida Subaru Outback 2018
 *  🎈 Pressione Gomme
 *  🚨 Obbligatori in Auto
 *  🔧 Wiki Riparazioni
 *
 * Global: renderVehicle()
 * Depends on: RENTAL_INFO, PROHIBITED_ROADS (data.js)
 */

function renderVehicle() {
  var html = '<div class="section-content fade-in">';
  html += '<h2 class="section-title">🚗 Veicolo</h2>';
  html += '<div style="text-align:center;margin-bottom:14px;"><img src="icons/subaru.png" alt="Subaru" id="subaru-img" style="max-width:100%;border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;" onclick="shakeSubaru()"></div>';

  // === 📄 DOCUMENTI AUTO (sempre visibili — accesso rapido) ===
  html += '<div class="card" style="border:2px solid var(--color-accent);">';
  html += '<div class="card-title">📄 Documenti Auto</div>';
  html += '<div style="display:flex;flex-direction:column;gap:8px;">';
  html += '<a class="btn btn-primary" href="https://avtoprokat.kg/start/index.php/en/avtopark?mode=show_order&act=view&password=260321183229&order=50023209&act=view&first=1" target="_blank" rel="noopener" style="text-align:center;">📋 Visualizza Ordine Online</a>';
  html += '<button type="button" class="btn btn-accent" onclick="openDocViewer(\'icons/contract_en.pdf\',\'pdf\',\'Contratto Noleggio\')" style="text-align:center;">📜 Contratto Noleggio (PDF)</button>';
  html += '<button type="button" class="btn btn-secondary" onclick="openDocViewer(\'icons/insurance_OSOGO.jpg\',\'image\',\'Assicurazione OSAGO\')" style="text-align:center;">🛡️ Assicurazione OSAGO</button>';
  html += '</div></div>';

  // === 📋 PRENOTAZIONE ===
  html += '<details open><summary>📋 Prenotazione & Costi</summary><div class="details-content">';
  html += '<p><strong>Ordine N:</strong> ' + RENTAL_INFO.ordine + '</p>';
  html += '<p><strong>Auto:</strong> ' + RENTAL_INFO.auto + '</p>';
  html += '<p><strong>Periodo:</strong> ' + RENTAL_INFO.periodo.inizio + ' → ' + RENTAL_INFO.periodo.fine + '</p>';
  html += '<p><strong>Durata:</strong> ' + RENTAL_INFO.periodo.giorni + ' giorni</p>';
  html += '<p><strong>Costo noleggio:</strong> ' + RENTAL_INFO.costo.perGiorno + ' KGS/giorno × ' + RENTAL_INFO.periodo.giorni + ' = ' + RENTAL_INFO.costo.totaleNoleggio + ' KGS</p>';
  html += '<p><strong>Servizi aggiuntivi:</strong> 1,100 KGS (2x SIM card)</p>';
  html += '<p><strong>Totale:</strong> ' + RENTAL_INFO.costo.totaleConServizi + ' KGS (~€' + Math.round(RENTAL_INFO.costo.totaleConServizi / 97) + ' / ~$' + Math.round(RENTAL_INFO.costo.totaleConServizi / 87) + ')</p>';
  html += '<p><strong>Stato:</strong> <span class="badge badge-success">Confermata</span></p>';
  html += '<hr style="margin:12px 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>Deposito:</strong> $' + RENTAL_INFO.deposito.importo + ' (' + RENTAL_INFO.deposito.nota + ')</p>';
  html += '<p><strong>Limite km:</strong> ' + RENTAL_INFO.limiteKm.limite + ' km totali</p>';
  html += '<p><strong>Extra km:</strong> ' + RENTAL_INFO.limiteKm.costoExtra + ' KGS per ogni km oltre il limite</p>';
  html += '<p><strong>Carburante:</strong> ' + RENTAL_INFO.carburante + '</p>';
  html += '<p><strong>Restituzione:</strong> ' + RENTAL_INFO.restituzione + '</p>';
  html += '<p><strong>Età guidatore:</strong> ' + RENTAL_INFO.etaGuida + '</p>';
  html += '</div></details>';

  // === 📞 CONTATTI ===
  html += '<details><summary>📞 Contatti Russian Troika</summary><div class="details-content">';
  for (var c = 0; c < RENTAL_INFO.telefoni.length; c++) {
    var tel = RENTAL_INFO.telefoni[c];
    html += '<div class="sos-number"><span>' + tel.label + ':</span> <a href="tel:' + tel.number + '">' + tel.number + '</a></div>';
  }
  html += '<p style="margin-top:8px;"><strong>Email:</strong> <a href="mailto:' + RENTAL_INFO.email + '">' + RENTAL_INFO.email + '</a></p>';
  html += '<p><strong>Sito:</strong> <a href="https://' + RENTAL_INFO.sito + '" target="_blank">' + RENTAL_INFO.sito + '</a></p>';
  html += '<p><strong>Indirizzo:</strong> ' + RENTAL_INFO.indirizzo + '</p>';
  html += '</div></details>';

  // === 📜 TERMINI & CONDIZIONI ===
  html += '<details><summary>📜 Termini & Condizioni</summary><div class="details-content">';
  var ins = RENTAL_INFO.assicurazione;
  html += '<h4 style="margin:0 0 6px;">🛡️ Assicurazione</h4>';
  html += '<p><strong>Tipo:</strong> ' + ins.tipo + '</p>';
  html += '<p><strong>Franchigia:</strong> ' + ins.franchigia + '</p>';
  html += '<h4 style="margin:10px 0 4px;">Regole:</h4><ul style="padding-left:18px;">';
  for (var r = 0; r < ins.regole.length; r++) {
    html += '<li style="margin-bottom:4px;">' + ins.regole[r] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:10px 0 4px;color:var(--color-danger);">L\'assicurazione NON copre:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var n = 0; n < ins.nonCopre.length; n++) {
    html += '<li style="margin-bottom:4px;color:var(--color-danger);">❌ ' + ins.nonCopre[n] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:14px 0 6px;">📜 Termini Noleggio</h4>';
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
  html += '</ul></div></details>';

  // === 🔧 SPECIFICHE VEICOLO ===
  html += '<details><summary>🔧 Specifiche Subaru Outback</summary><div class="details-content">';
  html += '<table class="data-table">';
  html += '<tr><td><strong>Modello</strong></td><td>Subaru Outback 2018</td></tr>';
  html += '<tr><td><strong>Colore</strong></td><td>Grigio (957)</td></tr>';
  html += '<tr><td><strong>Trazione</strong></td><td>AWD (integrale permanente)</td></tr>';
  html += '<tr><td><strong>Cambio</strong></td><td>Manuale (verificare al ritiro!)</td></tr>';
  html += '<tr><td><strong>Carburante</strong></td><td>Benzina 92/95 RON</td></tr>';
  html += '<tr><td><strong>Serbatoio</strong></td><td>~60L</td></tr>';
  html += '<tr><td><strong>Autonomia asfalto</strong></td><td>~500-600 km</td></tr>';
  html += '<tr><td><strong>Autonomia sterrato</strong></td><td>~350-400 km</td></tr>';
  html += '<tr><td><strong>Altezza da terra</strong></td><td>220mm</td></tr>';
  html += '<tr><td><strong>Tipo</strong></td><td>AWD (NON 4x4 vero, no low-range)</td></tr>';
  html += '</table></div></details>';

  // === 🛒 SHOP & ACCESSORI ===
  html += '<details><summary>🛒 Shop & Accessori (Russian Troika)</summary><div class="details-content">';
  html += '<p style="font-size:0.8rem;opacity:0.7;margin-bottom:10px;">Servizi e accessori opzionali da aggiungere al noleggio. <a href="https://avtoprokat.kg/start/index.php/en/avtopark?mode=show_order&act=services&password=260321183229&order=50023209" target="_blank">Vedi lista completa →</a></p>';

  // Servizi inclusi
  html += '<details><summary>✅ Inclusi nel noleggio</summary><div class="details-content">';
  for (var s = 0; s < RENTAL_INFO.serviziInclusi.length; s++) {
    var srv = RENTAL_INFO.serviziInclusi[s];
    html += '<div style="padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid var(--color-border);">';
    html += '<span>' + srv.nome + '</span><span style="font-weight:600;">' + srv.prezzo + '</span></div>';
  }
  html += '</div></details>';

  // Servizi disponibili per categoria
  var svcCats = [
    { key: 'firstHelp', label: '🆘 Primo Soccorso' },
    { key: 'pathfinder', label: '🗺️ Navigazione' },
    { key: 'turisti', label: '🏕️ Per Turisti (camping, etc.)' },
    { key: 'extra', label: '🔧 Extra (compressore, tanica, etc.)' },
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
  html += '</div></details>';

  // === 🚫 STRADE PROIBITE ===
  html += '<details><summary>🚫 Strade Proibite & Mappa</summary><div class="details-content">';
  html += '<div class="warning-box"><span class="warning-icon">⚠️</span><span>' + PROHIBITED_ROADS.avviso + '</span></div>';
  var cr = PROHIBITED_ROADS.crossoverVietate;
  html += '<h4 style="margin:10px 0 6px;">Strade vietate per crossover:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var i = 0; i < cr.strade.length; i++) {
    html += '<li style="margin-bottom:4px;color:var(--color-danger);font-weight:600;">❌ ' + cr.strade[i] + '</li>';
  }
  html += '</ul>';
  html += '<h4 style="margin:10px 0 6px;">Cosa significa per noi:</h4>';
  for (var j = 0; j < PROHIBITED_ROADS.implicazioniViaggio.length; j++) {
    html += '<div style="padding:4px 0;border-bottom:1px solid var(--color-border);font-size:0.88rem;">' + PROHIBITED_ROADS.implicazioniViaggio[j] + '</div>';
  }
  html += '<h4 style="margin:14px 0 6px;">🗺️ Mappa</h4>';
  html += '<p style="margin-bottom:8px;font-size:0.85rem;"><strong>Linee nere</strong> = vietate per TUTTI<br><strong style="color:var(--color-danger);">Linee rosse</strong> = solo per crossover (noi!)</p>';
  html += '<img src="icons/roadmap-sm.jpg" alt="Mappa strade proibite" style="width:100%;border-radius:var(--radius-sm);border:1px solid var(--color-border);">';
  html += '</div></details>';

  // === 🚗 GUIDA SUBARU OUTBACK 2018 ===
  html += '<details><summary>🚗 Guida Subaru Outback 2018</summary><div class="details-content">';
  html += '<p style="font-size:0.78rem;opacity:0.6;margin-bottom:10px;"><em>Fonte: manuale ufficiale Subaru, KBB, forum Subaru Outback Owners</em></p>';

  html += '<details><summary><strong>⛽ Carburante: quale e quanto</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += '<strong>Carburante consigliato:</strong> 92 RON (АИ-92) OK ovunque, 95 RON (АИ-95) ancora meglio.<br>';
  html += '<strong>NON usare</strong> 80 (АИ-80) o diesel.<br><br>';
  html += '<strong>Consumi reali (2.5L AWD):</strong><br>';
  html += '• Asfalto: 8-9 L/100km<br>';
  html += '• Sterrato + montagna: 10-12 L/100km<br>';
  html += '• Serbatoio 60L → 500-600 km asfalto, 350-450 km montagna<br><br>';
  html += '<strong>Strategia:</strong> sempre sopra mezzo serbatoio, fai pieno ovunque trovi una stazione fuori città';
  html += '</div></details>';

  html += '<details><summary><strong>🟡 Consumo eccessivo olio (FB25)</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'Il motore FB25 consuma olio (1L ogni 1500-3000 km).<br><br>';
  html += '• Controllare olio OGNI mattina (asta a motore freddo)<br>';
  html += '• Portare 1-2L 0W-20 sintetico (o 5W-30 in emergenza)<br>';
  html += '• Se sotto MIN: aggiungere fino a metà tra MIN e MAX<br>';
  html += '• Per il viaggio (3900km) potrebbe servire 1L extra';
  html += '</div></details>';

  html += '<details><summary><strong>🟢 X-Mode — quando attivarlo</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'Pulsante "X-Mode" sulla console centrale.<br><br>';
  html += '<strong>ATTIVALO in:</strong><br>';
  html += '• Salite ripide su sterrato/fango<br>';
  html += '• Discese ripide (Hill Descent automatico)<br>';
  html += '• Fango profondo, sabbia, neve<br>';
  html += '• Strade scivolose<br><br>';
  html += '<strong>Cosa fa:</strong> riduce sensibilità acceleratore, AWD 50/50, antislittamento, mantiene 5-20 km/h in discesa.<br>';
  html += '<strong>Si disattiva sopra 40 km/h.</strong>';
  html += '</div></details>';

  html += '<details><summary><strong>🟡 CVT — gestione cambio</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += '<strong>SALITE LUNGHE:</strong><br>';
  html += '• Modalità Manuale (paddle/leva +/-)<br>';
  html += '• Rapporti bassi a 2500-4000 RPM<br>';
  html += '• Spegni AC<br>';
  html += '• Se odore strano: STOP 15-20 min<br><br>';
  html += '<strong>DISCESE LUNGHE:</strong><br>';
  html += '• Modalità Manuale + rapporto basso = freno motore<br>';
  html += '• In D normale il CVT non frena abbastanza';
  html += '</div></details>';

  html += '<details><summary><strong>🟡 Batteria che si scarica</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'Problema noto sul 2018: batteria si scarica dopo 3-5 giorni fermo.<br><br>';
  html += '• Spegni TUTTO scendendo (luci, AC, USB)<br>';
  html += '• Ferma 2+ giorni: scollega negativo (chiave 10mm)<br>';
  html += '• Avere jump starter sempre in macchina<br>';
  html += '• Al freddo: chiave in "ON" 1 min prima di girare';
  html += '</div></details>';

  html += '<details><summary><strong>🟢 AWD Symmetrical</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'Trazione integrale permanente. Per funzionare bene:<br>';
  html += '• 4 gomme stessa pressione e usura<br>';
  html += '• MAI mischiare gomme nuove e vecchie<br>';
  html += '• Cambia gomme a coppie (stesso asse)<br><br>';
  html += '<strong>Limiti:</strong> NON 4x4 vero, no low range, articolazione limitata';
  html += '</div></details>';

  html += '<details><summary><strong>🟢 EyeSight (camera assistenza)</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += '2 telecamere stereo sotto parabrezza. Si disattiva su strade polverose/sporche.<br><br>';
  html += '• Pulisci parabrezza dentro/fuori vicino specchietto<br>';
  html += '• Si riattiva da solo<br>';
  html += '• Si può guidare normalmente senza assistenze<br>';
  html += '<strong>NON usare cruise adattivo</strong> su strade dissestate';
  html += '</div></details>';

  html += '<details><summary><strong>🟢 Altezza da terra (220mm)</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += '<strong>Punti deboli (non far toccare):</strong><br>';
  html += '• Coppa olio (sotto motore)<br>';
  html += '• Carter cambio<br>';
  html += '• Marmitta (lato passeggero)<br>';
  html += '• Spoiler anteriore<br><br>';
  html += '<strong>Regole:</strong><br>';
  html += '• Sasso > 18cm: aggira<br>';
  html += '• Buca > 25cm: rallenta al passo<br>';
  html += '• Approach 18.6° / Departure 22.5°<br>';
  html += '• Tecnica scalini: angolo 45°, una ruota alla volta';
  html += '</div></details>';

  html += '<details><summary><strong>🟡 Tappo benzina = causa #1 spia motore</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'Sistema EVAP molto sensibile. Codice errore P0457.<br><br>';
  html += '• Apri/chiudi finché non senti 3 click<br>';
  html += '• Spia si spegne dopo 2-3 cicli accensione<br>';
  html += '• Chiudi sempre tu, non lasciare al benzinaio';
  html += '</div></details>';

  html += '<details><summary><strong>🟡 Catalizzatore (CAT) fragile</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += 'I CAT Subaru si rompono se: benzina pessima, motore brucia olio, urti sotto.<br><br>';
  html += '<strong>Sintomi:</strong> spia motore + odore uovo marcio + perdita potenza<br>';
  html += '<strong>Fai:</strong> guida piano fino a meccanico, non sforzare.<br>';
  html += '<strong>Riparazione:</strong> $1000-2000 (peggior posto: zone remote)';
  html += '</div></details>';

  html += '<details><summary><strong>🚨 Checklist RITIRO auto</strong></summary>';
  html += '<div class="details-content" style="font-size:0.85rem;">';
  html += '<strong>Prima di firmare:</strong><br>';
  html += '✅ Foto a 360° (per il rientro)<br>';
  html += '✅ Foto interno e tappetini<br>';
  html += '✅ Foto cerchi/gomme (battistrada min 4mm)<br>';
  html += '✅ Tipo cambio (CVT o manuale)<br>';
  html += '✅ Foto livello carburante e km<br>';
  html += '✅ Cric, chiave, scorta, triangolo, giubbotto, kit primo soccorso<br>';
  html += '✅ Test 10 min: AC, fari, frecce, tergi, freni, sterzo, vibrazioni<br>';
  html += '✅ Estintore (obbligatorio in KG)<br>';
  html += '✅ Numero noleggiatore in telefono';
  html += '</div></details>';

  html += '</div></details>';

  // === 🎈 PRESSIONE GOMME ===
  html += '<details><summary>🎈 Pressione Gomme</summary><div class="details-content">';
  html += '<table class="data-table">';
  html += '<tr style="background:var(--color-accent);color:#fff;"><th>Condizione</th><th>Pressione</th><th>Note</th></tr>';
  html += '<tr><td><strong>🛣️ Asfalto</strong></td><td style="font-size:1.1rem;font-weight:800;">2.0-2.2 ATM</td><td>Standard</td></tr>';
  html += '<tr><td><strong>🪨 Sterrato</strong></td><td style="font-size:1.1rem;font-weight:800;">1.5-1.8 ATM</td><td>Ghiaia</td></tr>';
  html += '<tr><td><strong>🏔️ Fuoristrada</strong></td><td style="font-size:1.1rem;font-weight:800;">1.1-1.4 ATM</td><td>Accidentato</td></tr>';
  html += '<tr><td><strong>🏜️ Sabbia/Fango</strong></td><td style="font-size:1.1rem;font-weight:800;">0.8-1.0 ATM</td><td>⚠️ Max 30km/h</td></tr>';
  html += '</table>';
  html += '<div class="warning-box" style="margin-top:10px;"><span class="warning-icon">⚠️</span><span><strong>DOPO fuoristrada SEMPRE rigonfiare a 2.0 ATM!</strong> Sgonfi su asfalto = surriscaldamento = scoppio.</span></div>';
  html += '<div style="margin-top:6px;font-size:0.78rem;opacity:0.6;">Compressore 12V obbligatorio. Controllare a gomme fredde ogni mattina.</div>';
  html += '</div></details>';

  // === 🚨 OBBLIGATORI IN AUTO ===
  html += '<details><summary>🚨 OBBLIGATORI in Auto</summary><div class="details-content">';
  html += '<div class="warning-box"><span class="warning-icon">‼️</span><span>Senza questi NON partire. Rischi blocco senza aiuto per ore.</span></div>';
  var mandatory = [
    {i:'Compressore 12V portatile', w:'Sgonfiare/rigonfiare. VITALE.'},
    {i:'Manometro pressione', w:'Il compressore spesso non è preciso'},
    {i:'Kit plug riparazione gomme', w:'Foratura = fix in 5 min'},
    {i:'Gomma scorta FULL SIZE', w:'Controllare pressione PRIMA!'},
    {i:'Cric + chiave a croce', w:'TESTARE che funzionino'},
    {i:'Corda traino 5+ tonnellate', w:'Se impantanati'},
    {i:'Tanica benzina 10-20L', w:'200+ km senza stazioni'},
    {i:'Jump starter / cavi batteria', w:'Freddo = batteria morta'},
    {i:'2x acqua 5L', w:'Bere + radiatore'},
    {i:'Pala pieghevole', w:'Fango, neve, sabbia'},
    {i:'Torcia frontale + batterie', w:'Riparazioni notturne'},
    {i:'Fascette + nastro americano', w:'Fix temporaneo universale'},
    {i:'Olio motore 1L extra', w:'Consumo extra in montagna'},
    {i:'Antigelo / acqua radiatore', w:'Surriscaldamento su passi'}
  ];
  for (var mi = 0; mi < mandatory.length; mi++) {
    var m = mandatory[mi];
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);display:flex;gap:8px;align-items:flex-start;">';
    html += '<span>✅</span><div><strong>' + m.i + '</strong><br><span style="font-size:0.75rem;opacity:0.6;">' + m.w + '</span></div></div>';
  }
  html += '</div></details>';

  // === 🔧 WIKI RIPARAZIONI ===
  html += '<details><summary>🔧 Wiki Riparazioni & Survival</summary><div class="details-content">';
  html += '<div style="font-size:0.78rem;opacity:0.7;margin-bottom:10px;">🟢 facile · 🟡 attento · 🔴 critico · ⚫ chiamare aiuto</div>';

  // Sub-gruppi
  var repairGroups = [
    {
      title: '🛞 Gomme',
      items: [
        {p:'Foratura semplice (chiodo/vite)', s:'1. Fermarsi su terreno piano e duro\n2. Cric sotto al telaio (punto rinforzato vicino alla ruota)\n3. PLUG KIT:\n   - Estrarre il chiodo con la pinza\n   - Allargare il foro con il rasper\n   - Inserire stringa nel manico, infilare nel foro\n   - Tirare via lasciando 1cm fuori\n   - Tagliare a filo gomma\n   - Rigonfiare a 2.0 ATM\n4. ALTERNATIVA: scorta\n5. Foro sul FIANCO: scorta obbligatoria', c:'🟢'},
        {p:'Squarcio grosso sul battistrada', s:'1. Plug kit non basta — usare 2-3 stringhe insieme\n2. Se non tiene: scorta + gommista\n3. NON guidare veloce con riparazione di emergenza\n4. Velocità max 60 km/h con plug', c:'🟡'},
        {p:'Cerchio piegato dopo buca', s:'1. Se la gomma tiene aria: continua piano (max 60 km/h)\n2. Se perde aria: scorta\n3. Cerchio piegato → gommista\n4. Non guidare se vibra molto sopra 50 km/h', c:'🟡'},
        {p:'Bullone bloccato', s:'1. WD-40, aspettare 5 min\n2. Prolunga sulla chiave (tubo) per più leva\n3. Battere la chiave con un sasso\n4. Se gira ma non esce: bullone sgonfio\n5. Ultima risorsa: chiedere aiuto', c:'🟡'},
        {p:'Niente cric o cric rotto', s:'1. Trovare un dosso/sasso grande\n2. Posizionare la ruota da cambiare sopra\n3. Le altre 3 ruote a terra ma sollevate\n4. Sostituire con scorta\n5. ALTERNATIVA: chiedere a un camion vicino', c:'🟡'}
      ]
    },
    {
      title: '⚙️ Motore',
      items: [
        {p:'Surriscaldamento (spia rossa)', s:'1. FERMARSI SUBITO, spegnere AC\n2. Accendere riscaldamento al max (aiuta a dissipare)\n3. NON aprire tappo radiatore — vapore bollente!\n4. Aspettare 30 min minimo\n5. Controllare livello refrigerante\n6. Aggiungere acqua o antigelo\n7. Cercare perdite visibili\n8. Se persiste: rimorchio', c:'🔴'},
        {p:'Radiatore bucato (in mezzo al nulla)', s:'TRICK DI EMERGENZA — solo per micro-perdite, fix temporaneo max 50-100km\n\n1. FERMARSI subito, motore al minimo\n2. Aspettare 30 min — NON aprire il tappo a caldo (vapore bollente)\n3. Quando freddo, scegli un trick:\n   • 1 cucchiaio di pepe nero macinato → addensa, sigilla micro-fori\n   • 1 uovo crudo intero → cuoce dentro e tappa il foro\n   • Sapone barretta grattugiato (1-2 cucchiai)\n4. Versare nel radiatore, aggiungere acqua fino a 1cm sotto il bordo\n5. Riavviare, lasciare a regime 5 min\n6. Procedere a 40-60 km/h, controllare temperatura ogni 10 min\n7. Se la temperatura risale → fermarsi, ripetere o rimorchio\n8. Appena possibile: officina vera. Questo è SOLO emergenza.\n\nNB: per fori grossi non funziona. Lì serve nastro americano + colla epossidica termoresistente o rimorchio.', c:'🟡'},
        {p:'Auto perde potenza in salita', s:'1. Normale sopra 2500m: -3% potenza ogni 300m\n2. Scalare marcia, giri alti (3000-4000)\n3. Spegnere AC\n4. Non sforzare in 5a/6a\n5. Se gira male: filtro aria sporco\n6. Carburante 95+ ottani aiuta', c:'🟢'},
        {p:'Spia motore (check engine)', s:'1. LAMPEGGIA = STOP! Danno grave\n2. FISSA = problema minore, piano\n3. Cause comuni:\n   - Tappo benzina mal chiuso\n   - Sensore O2 sporco\n   - Catalizzatore intasato\n4. Foto del codice errore se possibile', c:'🟡'},
        {p:'Motore non parte', s:'CASO 1: Niente click → batteria/morsetti\nCASO 2: Click ma non parte → motorino avviamento\nCASO 3: Gira ma non accende → carburante/pompa\nCASO 4: Parte e si spegne → carburante sporco\n\nFreddo estremo: chiave in "ON" 30s prima di girare', c:'🔴'},
        {p:'Vapor lock (alta quota + caldo)', s:'1. Sintomi: parte, si spegne, non riparte se caldo\n2. Causa: benzina evapora prima del motore\n3. SOLUZIONE: spegnere, aspettare 15-30 min\n4. Bagnare con acqua i tubi del carburante\n5. PREVENZIONE: non spegnere in alta quota se devi ripartire subito', c:'🟡'},
        {p:'Acqua nel motore (dopo guado)', s:'1. SE FERMO IN ACQUA: NON riavviare!\n2. Sintomi: marmitta gocciola, motore strappa\n3. Aspettare scarico totale\n4. Olio bianco/cioccolato = acqua dentro = cambio olio urgente\n5. Filtro aria bagnato: rimuovere e asciugare\n6. Possibile: rimorchio fino a meccanico', c:'🔴'}
      ]
    },
    {
      title: '⚡ Elettrico',
      items: [
        {p:'Batteria scarica (jump start)', s:'ORDINE CAVI:\n1. ROSSO su + batteria MORTA\n2. ROSSO su + batteria VIVA\n3. NERO su - batteria VIVA\n4. NERO su PARTE METALLICA del motore della MORTA\n\nAvviare auto VIVA, 2-3 min\nAvviare auto MORTA\nSCOLLEGARE in ordine inverso\nGuidare 30+ min per ricaricare', c:'🟡'},
        {p:'Fusibile bruciato', s:'1. Scatola fusibili: sotto cruscotto + vano motore\n2. Mappa fusibili dentro il coperchio\n3. Bruciato = filo metallico spezzato\n4. Sostituire con UGUALE amperaggio\n5. NON usare amperaggio più alto = rischio incendio\n6. Si rib brucia subito → corto circuito', c:'🟢'},
        {p:'Faro bruciato di notte', s:'1. EMERGENZA: luci posizione + frecce, max 50 km/h\n2. Sostituire lampadina H7/H4\n3. Aprire cofano, trovare portalampada\n4. NON toccare lampadina con dita nude (grasso = bruciatura)\n5. Senza ricambio: torcia frontale del passeggero', c:'🟡'},
        {p:'Tergicristalli rotti', s:'1. Aprire finestrini per visibilità laterale\n2. Spruzzare detergente come lubrificante\n3. Fermarsi se pioggia troppo forte\n4. Cambiare spazzola in città', c:'🟢'}
      ]
    },
    {
      title: '🚜 Self-Recovery',
      items: [
        {p:'Impantanati nel fango', s:'1. NON ACCELERARE\n2. Sgonfiare a 0.8-1.0 ATM\n3. Spalare fango DAVANTI alle ruote motrici\n4. Sotto le ruote: rami, pietre piatte, tappetini\n5. Frizione DOLCE\n6. Avanti-indietro ritmico\n7. Corda traino + altro veicolo', c:'🟡'},
        {p:'Insabbiati', s:'1. Sgonfiare 0.6-0.8 ATM\n2. Rimuovere TUTTA la sabbia da sotto\n3. Macchina deve appoggiare sulle ruote, NON sul telaio\n4. Tappetini, pala, rami sotto le ruote\n5. Tutti scendono per alleggerire\n6. Marcia bassa, retromarcia preferibile\n7. RIGONFIARE subito dopo', c:'🟡'},
        {p:'Bloccati nella neve', s:'1. Spalare neve davanti alle ruote\n2. Sabbia, ghiaia, sale sotto le ruote\n3. Catene o calze da neve aiutano\n4. Marcia più alta del normale (2a invece di 1a)\n5. Avanti-indietro lentamente', c:'🟡'},
        {p:'Pancia su rocce/dosso', s:'1. NON forzare avanti, peggiora\n2. Identificare cosa tocca (differenziale, scarico)\n3. RETROMARCIA dolce, sterzando per "uscire"\n4. Se incastrati: cric e pietre sotto le ruote\n5. Costruire rampa con pietre piatte', c:'🟡'},
        {p:'Macchina ribaltata', s:'1. NON USCIRE dall\'alto\n2. Spegnere il motore\n3. Slacciare cinture con cura\n4. Uscire dal portellone se possibile\n5. Chiamare aiuto, serve gru o team', c:'⚫'}
      ]
    },
    {
      title: '🌊 Guadi & Acqua',
      items: [
        {p:'Come attraversare un guado', s:'1. Attraversare A PIEDI per testare\n2. PROFONDITÀ MAX: sotto le portiere (~50cm)\n3. CORRENTE FORTE: NON attraversare\n4. FONDO MOLLE: rischio impantanarsi\n5. Sacchetti plastica sull\'aspirazione aria\n6. Marcia BASSA (1a o 2a)\n7. Velocità COSTANTE (10-15 km/h)\n8. Crea onda davanti che spinge l\'acqua\n9. NON fermarsi mai nel mezzo', c:'🔴'},
        {p:'Acqua entra nell\'abitacolo', s:'1. RETROMARCIA immediata\n2. Aprire tutte le portiere\n3. Asciugare con stracci\n4. Tappetini al sole\n5. Se molto: rischio elettronica → controllare', c:'🔴'},
        {p:'Filtro aria bagnato', s:'1. Aprire scatola filtro aria\n2. Estrarre il filtro\n3. Scuoterlo\n4. NON lavare con acqua\n5. Asciugare al sole 30+ min\n6. Troppo bagnato: guidare senza filtro fino a meccanico (NO zone polverose)', c:'🟡'}
      ]
    },
    {
      title: '🛠️ Altri scenari',
      items: [
        {p:'Freni deboli/spugnosi', s:'1. Pompare il pedale più volte\n2. Controllare livello liquido freni\n3. SCALARE marcia (freno motore)\n4. Discesa: SEMPRE marcia bassa\n5. Se spariscono:\n   - Freno a mano DOLCE\n   - Marcia più bassa\n   - Salita dolce per fermarsi', c:'🔴'},
        {p:'Sterzo duro improvviso', s:'1. Possibile servosterzo rotto (cinghia o liquido)\n2. Sterzare richiede più forza\n3. Velocità bassa (sotto 50)\n4. Controllare livello liquido servosterzo\n5. Se cinghia rotta: visibile dal cofano\n6. Meccanico ASAP', c:'🔴'},
        {p:'Perdita olio (sotto auto)', s:'COLORI:\n• MARRONE/NERO = motore\n• ROSSO = cambio/servosterzo\n• VERDE/ROSA = antigelo\n• TRASPARENTE = condensa AC (normale)\n\n1. Controllare livello con asta\n2. Se sotto MIN: aggiungere\n3. Olio: 5W-30 sintetico\n4. Monitorare ogni 100km', c:'🟡'},
        {p:'Marmitta caduta/penzoloni', s:'1. Fermarsi in sicurezza\n2. Legarla con fascette o filo al telaio\n3. Tenerla SOLLEVATA dal suolo\n4. Rumore aumenta ma OK guidare piano\n5. NON guidare con finestrini chiusi se rotta vicino abitacolo (CO2)\n6. Riparazione vera dal meccanico', c:'🟡'},
        {p:'Vetro rotto (sasso)', s:'1. Solo crepa: nastro adesivo trasparente sopra\n2. Sigillante per vetri (kit gommista)\n3. Vetro saltato:\n   - Rimuovere pezzi\n   - Plastica + nastro\n   - Bordo con nastro telato\n4. No autostrada\n5. Vetraio in città', c:'🟡'},
        {p:'Animale investito', s:'1. FERMARSI sempre (legge)\n2. Frecce di emergenza\n3. Animale grande: aspettare proprietario o polizia\n4. Foto per assicurazione\n5. In KG il bestiame è di qualcuno → possibile risarcimento', c:'🟡'},
        {p:'Incidente con altro veicolo', s:'1. NESSUNO FERITO:\n   - NON spostare auto\n   - Foto scena, danni, targhe\n   - Scambiare info\n   - Polizia: 102\n2. FERITI: 103 (ambulanza), 112\n3. Avvisare Russian Troika SUBITO\n4. Compilare CAI', c:'⚫'},
        {p:'Niente segnale telefono', s:'1. Salire in alto (passi, colline)\n2. SMS spesso passano dove voce non passa\n3. Spegnere/riaccendere telefono\n4. PREVENZIONE: 2 SIM (O! e Beeline)\n5. App GPS offline (Maps.me, Organic)', c:'🟡'},
        {p:'Mucche/cavalli sulla strada', s:'1. NON suonare il clacson\n2. Procedere a passo d\'uomo\n3. Aspettare con pazienza\n4. Aprire finestrino: "kosh kosh" (kirghizo "via via")\n5. Mai sterzare bruscamente', c:'🟢'}
      ]
    }
  ];

  for (var rg = 0; rg < repairGroups.length; rg++) {
    var grp = repairGroups[rg];
    html += '<details><summary><strong>' + grp.title + '</strong></summary><div class="details-content">';
    for (var ri = 0; ri < grp.items.length; ri++) {
      var rep = grp.items[ri];
      html += '<details style="margin-bottom:4px;"><summary>' + rep.c + ' ' + rep.p + '</summary>';
      html += '<div class="details-content" style="white-space:pre-line;font-size:0.83rem;line-height:1.6;padding:8px;">' + rep.s + '</div></details>';
    }
    html += '</div></details>';
  }

  // Consigli pratici
  html += '<details><summary><strong>🎒 Consigli pratici</strong></summary><div class="details-content" style="font-size:0.85rem;line-height:1.7;">';
  html += '<strong>🩹 Nastro americano:</strong> tappa tubi, fissa paraurti, ferma vetri<br><br>';
  html += '<strong>🔗 Fascette resistenti:</strong> tubi, marmitta, paraurti. 2 confezioni!<br><br>';
  html += '<strong>🛢️ WD-40:</strong> sblocca bulloni, scaccia umidità, lubrifica<br><br>';
  html += '<strong>🥤 Lattina vuota:</strong> tagliata = imbuto<br><br>';
  html += '<strong>🧦 Maglietta vecchia:</strong> filtro per benzina sospetta<br><br>';
  html += '<strong>🪨 Sasso piatto/cuneo:</strong> blocca ruote in pendenza<br><br>';
  html += '<strong>📞 Numero meccanici:</strong> chiedi alla guesthouse';
  html += '</div></details>';

  // Daily check
  html += '<details><summary><strong>☀️ Check Mattutino (5 min)</strong></summary><div class="details-content" style="font-size:0.85rem;line-height:1.7;">';
  html += '<strong>Ogni mattina prima di partire:</strong><br>';
  html += '✅ Pressione 4 gomme (fredde!)<br>';
  html += '✅ Livello olio motore (asta)<br>';
  html += '✅ Livello refrigerante<br>';
  html += '✅ Liquido freni e lavavetri<br>';
  html += '✅ Cinghie integre (no crepe)<br>';
  html += '✅ Fari, frecce, stop (gira intorno)<br>';
  html += '✅ Sotto la macchina (perdite)<br>';
  html += '✅ Battistrada (oggetti incastrati)<br>';
  html += '✅ Carico ben fissato<br>';
  html += '✅ Benzina + tanica piena se in zona remota';
  html += '</div></details>';

  html += '</div></details>';

  html += '</div>';
  return html;
}
