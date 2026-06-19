/**
 * info.js — Info Generali
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderInfo()
 * Enhanced: editable content blocks with reset support
 */

function renderInfo() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var html = '<h2 class="section-title">ℹ️ Info Generali</h2>';

  // Documents (original)
  html += '<details><summary>📄 Documenti (Checklist)</summary><div class="details-content">';
  html += '<div id="info-documenti">';
  html += '<ul style="padding-left:18px;">';
  for (var d = 0; d < GENERAL_INFO.documenti.length; d++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.documenti[d] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-documenti" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Vehicle info
  var v = GENERAL_INFO.veicolo;
  html += '<details><summary>🚗 Veicolo</summary><div class="details-content">';
  html += '<div id="info-veicolo">';
  html += '<p><strong>Modello:</strong> ' + v.modello + '</p>';
  html += '<p><strong>Noleggio:</strong> ' + v.noleggio + '</p>';
  html += '<p><strong>Ritiro:</strong> ' + v.ritiro + '</p>';
  html += '<p><strong>Restituzione:</strong> ' + v.restituzione + '</p>';
  html += '<p><strong>Carburante:</strong> ' + v.carburante + '</p>';
  html += '<h4 style="margin:10px 0 6px;">Note:</h4>';
  html += '<ul style="padding-left:18px;">';
  for (var n = 0; n < v.note.length; n++) {
    html += '<li style="margin-bottom:4px;">' + v.note[n] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-veicolo" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Money tips
  html += '<details><summary>💰 Soldi e ATM</summary><div class="details-content">';
  html += '<div id="info-soldi">';
  html += '<ul style="padding-left:18px;">';
  for (var m = 0; m < GENERAL_INFO.soldi.length; m++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.soldi[m] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-soldi" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Recommended apps
  html += '<details><summary>📱 App Consigliate</summary><div class="details-content">';
  html += '<div id="info-app">';
  for (var a = 0; a < GENERAL_INFO.appConsigliate.length; a++) {
    var app = GENERAL_INFO.appConsigliate[a];
    html += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);">';
    html += '<strong>' + app.nome + '</strong>';
    html += '<p style="font-size:0.9rem;margin:2px 0 0;">' + app.descrizione + '</p>';
    html += '</div>';
  }
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-app" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // Bishkek shopping list
  html += '<details><summary>🛒 Shopping Bishkek</summary><div class="details-content">';
  html += '<div id="info-shopping">';
  html += '<ul style="padding-left:18px;">';
  for (var s = 0; s < GENERAL_INFO.shoppingBishkek.length; s++) {
    html += '<li style="margin-bottom:6px;">' + GENERAL_INFO.shoppingBishkek[s] + '</li>';
  }
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-sm btn-secondary info-reset-btn" data-section="info-shopping" style="margin-top:6px;display:none;" type="button">↩️ Reset</button>';
  html += '</div></details>';

  // === CAVALLI ===
  html += '<details><summary>🐴 Cavalli</summary><div class="details-content">';
  html += '<div class="card-title">Guida Pratica</div>';
  html += '<ul style="padding-left:18px;font-size:0.9rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Prezzo:</strong> 1000-1500 KGS/ora (~€10-15). Mezza giornata 2000-3000 KGS. Giornata intera 3000-5000 KGS. Trattare sempre.</li>';
  html += '<li style="margin-bottom:6px;"><strong>Come prenotare:</strong> Tramite CBT (Community Based Tourism) nei villaggi, o direttamente ai nomadi nelle yurte. Non serve prenotare in anticipo tranne per trek multi-giorno.</li>';
  html += '<li style="margin-bottom:6px;"><strong>Guida obbligatoria?</strong> Per principianti sì. I cavalli kirghizi sono docili ma conoscono solo comandi in kirghizo/russo: "Chu!" (vai), "Trrr" (stop).</li>';
  html += '<li style="margin-bottom:6px;"><strong>Cosa portare:</strong> Pantaloni lunghi (no jeans stretti), scarpe chiuse, crema solare, acqua, snack. Niente zaino pesante sulla schiena.</li>';
  html += '<li style="margin-bottom:6px;"><strong>Sella:</strong> Sella tradizionale kirghiza — sorprendentemente comoda. Staffe corte, posizione eretta.</li>';
  html += '<li style="margin-bottom:6px;"><strong>Altitudine:</strong> I cavalli vanno piano in salita. Non forzarli. Sopra 3500m anche loro faticano.</li>';
  html += '</ul>';

  html += '<div class="card-title" style="margin-top:12px;">📍 Dove Andare a Cavallo</div>';

  var horseSpots = [
    { name:'Son-Kul (da Kyzart)', desc:'Il classico. 1-2 giorni a cavallo dal villaggio di Kyzart fino al lago. Paesaggi epici, yurte dei nomadi. Contatto: CBT Kochkor o Horse Travel Company Kyzart.', rating:'⭐⭐⭐⭐⭐' },
    { name:'Tash Rabat → Chatyr-Kul', desc:'Per cavalieri con esperienza. 2-3 giorni attraverso passi a 3800m. Paesaggi lunari. Contatto: guide locali ad At-Bashy.', rating:'⭐⭐⭐⭐⭐' },
    { name:'Jyrgalan Valley', desc:'Facile, 2-4 ore. Valle verde con montagne. Perfetto per principianti. Contatto: Jyrgalan Community Tourism.', rating:'⭐⭐⭐⭐' },
    { name:'Son-Kul (dalle yurte)', desc:'Passeggiata 1-2 ore direttamente dai camp. Chiedere ai nomadi. Il più economico (~1000 KGS/ora).', rating:'⭐⭐⭐⭐' },
    { name:'Arslanbob', desc:'Cavalcata nella foresta di noci. 3-5 ore. Contatto: CBT Arslanbob.', rating:'⭐⭐⭐' },
    { name:'Altyn-Arashan', desc:'Alternativa al trekking. Cavallo fino alle sorgenti termali. Chiedere a Karakol.', rating:'⭐⭐⭐' }
  ];
  for (var h = 0; h < horseSpots.length; h++) {
    var hs = horseSpots[h];
    html += '<div style="padding:8px 0;border-bottom:1px solid var(--color-border);">';
    html += '<div style="font-weight:700;">' + hs.name + ' ' + hs.rating + '</div>';
    html += '<div style="font-size:0.85rem;">' + hs.desc + '</div>';
    html += '</div>';
  }

  html += '<div style="margin-top:10px;font-size:0.85rem;">';
  html += '<strong>Contatti utili:</strong><br>';
  html += '• <strong>Tatosh</strong> — guide per principianti, trek Son-Kul (<a href="https://gtla.net/en/rando-cheval-song-kul/" target="_blank">gtla.net</a>)<br>';
  html += '• <strong>Azamat</strong> — esperto off-the-beaten-track, cavalieri esperti<br>';
  html += '• <strong>Horse Travel Company Kyzart</strong> — trek Son-Kul da Kyzart (<a href="http://www.horse-travel.com/" target="_blank">horse-travel.com</a>)<br>';
  html += '• <strong>CBT</strong> — uffici in ogni villaggio turistico (Kochkor, Karakol, Arslanbob)';
  html += '</div>';
  html += '</div></details>';

  // === VOLI ===
  html += '<details><summary>✈️ Voli</summary><div class="details-content">';
  html += '<div id="flights-section">';
  html += '<div class="person-selector" id="flight-person-selector" style="margin-bottom:12px;">';
  html += '<button class="person-btn active" data-fperson="leo" type="button">✈️ Leo</button>';
  html += '<button class="person-btn" data-fperson="edu" type="button">✈️ Edu</button>';
  html += '</div>';
  html += '<div id="flights-container"></div>';
  html += '<button class="btn btn-sm btn-primary" id="add-flight-btn" type="button" style="width:100%;margin-top:10px;">+ Aggiungi Volo</button>';
  if (!window.IS_DEMO_MODE) {
    html += '<button class="btn btn-sm btn-secondary" id="sync-flights-btn" type="button" style="width:100%;margin-top:6px;">🔄 Sincronizza</button>';
  }
  html += '</div>';
  html += '</div></details>';

  // === DRONI ===
  html += '<details><summary>🚁 Droni</summary><div class="details-content">';
  html += renderDroneContent();
  html += '</div></details>';

  // ============================================================
  // === 🇮🇹 FARNESINA / VIAGGIARESICURI (sempre per ultima) ===
  // ============================================================
  html += '<details><summary>🇮🇹 Farnesina &amp; ViaggiareSicuri</summary><div class="details-content">';
  html += '<div style="font-size:0.75rem;opacity:0.6;margin-bottom:10px;">Fonte: viaggiaresicuri.it — Scheda paese aggiornata al 20/03/2026</div>';

  // ---- Link essenziali ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">🔗 Link Essenziali</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:8px;"><a href="https://www.dovesiamonelmondo.it" target="_blank"><strong>dovesiamonelmondo.it</strong></a> — Registra il viaggio (passo principale)</li>';
  html += '<li style="margin-bottom:8px;"><a href="https://www.viaggiaresicuri.it/find-country/country/KGZ" target="_blank"><strong>Scheda paese KGZ</strong></a> — Sicurezza, sanità, ingresso</li>';
  html += '<li style="margin-bottom:8px;"><a href="https://www.viaggiaresicuri.it/schede_paese/pdf/KGZ.pdf" target="_blank"><strong>PDF stampabile</strong></a> — Scheda offline</li>';
  html += '<li style="margin-bottom:8px;"><a href="https://www.esteri.it/it/servizi-consolari-e-visti/Italiani-all-estero/cosafareincaso/" target="_blank"><strong>Cosa fare in caso di emergenza</strong></a></li>';
  html += '<li style="margin-bottom:8px;"><a href="https://evisa.e-gov.kg/" target="_blank"><strong>evisa.e-gov.kg</strong></a> — eVisa Kyrgyzstan (per soggiorni &gt;30 gg)</li>';
  html += '</ul></div>';

  // ---- Procedura DSNM ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">📝 Registrazione "Dove Siamo Nel Mondo" — 5 minuti</div>';
  html += '<ol style="padding-left:18px;font-size:0.9rem;">';
  html += '<li style="margin-bottom:6px;">Vai su <a href="https://www.dovesiamonelmondo.it" target="_blank">dovesiamonelmondo.it</a> &rarr; "Registra un nuovo viaggio"</li>';
  html += '<li style="margin-bottom:6px;">Login con SPID/CIE oppure registrazione email</li>';
  html += '<li style="margin-bottom:6px;">Compila per <strong>ogni viaggiatore</strong> (Leo + Edu, separatamente): dati anagrafici, passaporto, contatto in Italia</li>';
  html += '<li style="margin-bottom:6px;">Dettagli viaggio:<br>';
  html += '&nbsp;&nbsp;• Paese: <strong>Kirghizistan</strong> (nota Kel-Suu/Sary-Jaz = zona di confine cinese)<br>';
  html += '&nbsp;&nbsp;• Date: <strong>29/05/2026 → 14/06/2026</strong><br>';
  html += '&nbsp;&nbsp;• Itinerario: Bishkek → Issyk-Kul → Karakol → Kel-Suu → Naryn → Song-Kul → Bishkek<br>';
  html += '&nbsp;&nbsp;• Recapiti in loco: SIM kirghiza (O!/Beeline/MegaCom) + email<br>';
  html += '&nbsp;&nbsp;• Mezzi: auto a noleggio (Subaru Outback — Russian Troika)<br>';
  html += '&nbsp;&nbsp;• Alloggi: Tunduk Hostel Bishkek, Duet Hostel Karakol, Yurt Camp Jyrgal Song-Kul</li>';
  html += '<li style="margin-bottom:6px;">Persone da contattare in Italia (familiari) — minimo 1 contatto per ciascuno</li>';
  html += '<li style="margin-bottom:6px;">Conferma &rarr; ricevi email + numeri Unità di Crisi</li>';
  html += '</ol>';
  html += '<p style="font-size:0.85rem;background:var(--color-bg-soft);padding:8px;border-radius:4px;margin-top:8px;"><strong>⏰ Tempistica:</strong> registrare almeno 1 settimana prima della partenza &rarr; <strong>entro il 22/05/2026</strong>.</p>';
  html += '</div>';

  // ---- Numeri di emergenza ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">🆘 Numeri Emergenza (salvali in rubrica)</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Unità di Crisi Farnesina (24h):</strong> <a href="tel:+390636225">+39 06 36225</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Ambasciata d\'Italia ad Astana</strong> (competente per KG): <a href="tel:+77172243390">+7 7172 243390</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Cellulare emergenza ambasciata 24h:</strong> <a href="tel:+77773107061">+7 777 310 7061</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Email ambasciata:</strong> <a href="mailto:astana.ambasciata@esteri.it">astana.ambasciata@esteri.it</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Consolato Onorario Bishkek</strong> (Dr.ssa Maria Bespalova, via Abdrakhmanova 175): <a href="tel:+996772317929">+996 772 317929</a> — <a href="mailto:maria.bespalova@italpromo.org">maria.bespalova@italpromo.org</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Console Onorario Emergenze:</strong> <a href="tel:+996312665493">+996 312 665493</a> / <a href="tel:+996312666463">+996 312 666463</a></li>';
  html += '<li style="margin-bottom:6px;">Polizia: <strong>102</strong> — Vigili del Fuoco: <strong>101</strong> — Ambulanza: <strong>103</strong> — Salvataggio: <strong>161</strong></li>';
  html += '</ul></div>';

  // ---- Documenti e visti ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">📄 Documenti e Visti</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Passaporto:</strong> validità residua minima <strong>6 mesi</strong> dalla data d\'ingresso + <strong>1 pagina bianca</strong> per i timbri</li>';
  html += '<li style="margin-bottom:6px;"><strong>Senza visto:</strong> dal 31/12/2025, fino a <strong>30 giorni</strong> per turismo/affari, nell\'arco di 60 gg dalla data d\'ingresso</li>';
  html += '<li style="margin-bottom:6px;"><strong>Soggiorni &gt;30 gg:</strong> visto da <a href="https://evisa.e-gov.kg/" target="_blank">evisa.e-gov.kg</a> oppure Ambasciata KG a Roma</li>';
  html += '<li style="margin-bottom:6px;"><strong>Ambasciata KG a Roma:</strong> Via Clitunno 2, 00198 Roma — <a href="tel:+390633974666">+39 06 3397 4666</a> — <a href="mailto:kgembassy.it@mfa.gov.kg">kgembassy.it@mfa.gov.kg</a></li>';
  html += '<li style="margin-bottom:6px;"><strong>Patente internazionale</strong> obbligatoria + assicurazione auto Ingosstrakh (frontiera, breve termine)</li>';
  html += '<li style="margin-bottom:6px;">Conserva copia documenti separata dagli originali. Le forze dell\'ordine possono chiederli in qualsiasi momento</li>';
  html += '</ul></div>';

  // ---- Sicurezza ----
  html += '<div class="warning-box" style="flex-direction:column;gap:6px;margin-bottom:10px;">';
  html += '<div style="display:flex;align-items:center;gap:8px;"><span class="warning-icon">⚠️</span><strong>Aree e Rischi (Sicurezza)</strong></div>';
  html += '<ul style="padding-left:18px;margin:0;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Zone confine Tagikistan/Uzbekistan</strong> (regioni Osh, Jalal-Abad, Batken): tensioni etniche e dispute idriche; UXO/ordigni inesplosi residui — usare solo varchi ufficiali</li>';
  html += '<li style="margin-bottom:6px;"><strong>Regione di Batken</strong>: traffici illeciti, scontri armati. Valichi possono chiudere senza preavviso</li>';
  html += '<li style="margin-bottom:6px;"><strong>Microcriminalità a Bishkek:</strong> scippi, furti, borseggi — Osh Bazaar, mercati, internet café, mezzi pubblici, zone poco illuminate notturne</li>';
  html += '<li style="margin-bottom:6px;"><strong>Sismicità alta</strong> (collisione placche euroasiatica/indiana) — frane, valanghe, smottamenti, GLOF (Glacial Lake Outburst Floods) durante il disgelo (apr-mag)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Trekking/alpinismo (mag-ago):</strong> rischio valanghe e frane da scioglimento ghiacciai</li>';
  html += '<li style="margin-bottom:6px;"><strong>Estremismo violento:</strong> rischio non azzerato (instabilità regionale, vicinanza Afghanistan) — prudenza in luoghi affollati</li>';
  html += '<li style="margin-bottom:6px;"><strong>Manifestazioni:</strong> evitarle (possono degenerare). Disordini politico-economici occasionali</li>';
  html += '<li style="margin-bottom:6px;"><strong>Soccorso in alta montagna:</strong> ❌ NESSUNA struttura pubblica in grado di intervenire oltre i <strong>4000m</strong></li>';
  html += '</ul></div>';

  // ---- Sanità ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">🏥 Situazione Sanitaria</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Strutture pubbliche</strong>: standard non soddisfacente. Cliniche private OK a Bishkek e Osh</li>';
  html += '<li style="margin-bottom:6px;"><strong>Reperibilità farmaci comuni:</strong> spesso problematica — porta scorte da casa</li>';
  html += '<li style="margin-bottom:6px;"><strong>Vaccino Febbre Gialla:</strong> obbligatorio solo se provieni da/transiti &gt;12h in Paese a rischio (per chi parte dall\'Italia: <strong>NO</strong>)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Vaccini consigliati:</strong> Epatite A/B, Tifo, Tetano, Difterite. Per zone rurali: antirabbica. Per turismo verde/montagna: encefalite da zecche (richiede mesi in Italia)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Malattie endemiche:</strong> tubercolosi (carceri/ambienti a rischio), brucellosi (latticini non pastorizzati), epatite A/B, meningite batterica (rurale), rabbia (zone montane), HIV/AIDS (gruppi a rischio)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Cibo/acqua:</strong> evita cibi crudi (eccetto frutta sbucciata da te), latte non pastorizzato, gelati. Solo acqua imbottigliata (anche per igiene orale). No venditori ambulanti</li>';
  html += '<li style="margin-bottom:6px;"><strong>Assicurazione viaggio</strong> con <strong>rimpatrio sanitario aereo</strong> ed <strong>eli-soccorso</strong> (per alpinismo) — la Farnesina non copre nulla</li>';
  html += '<li style="margin-bottom:6px;">Info malattie consigliate: <a href="https://wwwnc.cdc.gov/travel" target="_blank">CDC Travel Health</a></li>';
  html += '</ul></div>';

  // ---- Mobilità ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">🚗 Mobilità e Trasporti</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Aeroporto principale:</strong> Manas International (BSZ — ex FRU dal 9/5/2025), 23km a nord di Bishkek. Hub di scalo: Istanbul (Turkish Airlines), Mosca (Aeroflot), Sharjah (Air Arabia), Tashkent (Uzbekistan Airways)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Vettori KG:</strong> ❌ <strong>vietati nello spazio aereo UE</strong> (non rispettano standard EASA). Volare solo con compagnie certificate UE</li>';
  html += '<li style="margin-bottom:6px;"><strong>Patente:</strong> internazionale obbligatoria</li>';
  html += '<li style="margin-bottom:6px;"><strong>Strade:</strong> manutenzione carente in zone rurali, segnaletica scarsa, possibili blocchi per valanghe/frane. Stazioni di servizio rare fuori dalle città</li>';
  html += '<li style="margin-bottom:6px;"><strong>Guida notturna sconsigliata</strong> (animali, persone improvvisi). D\'inverno: ghiaccio e nebbia</li>';
  html += '<li style="margin-bottom:6px;"><strong>Disgelo (apr-mag):</strong> alcuni valichi di confine possono essere chiusi anche per stranieri — verificare prima</li>';
  html += '</ul></div>';

  // ---- Dogana / Valuta ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">💱 Dogana, Moneta &amp; Valuta</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Dichiarazione doganale all\'arrivo</strong> obbligatoria (oggetti di valore, armi). <strong>Conservala</strong> fino alla partenza</li>';
  html += '<li style="margin-bottom:6px;"><strong>Valuta estera:</strong> import/export libero, ma <strong>dichiarare importi elevati</strong> per evitare problemi all\'uscita</li>';
  html += '<li style="margin-bottom:6px;"><strong>Som (KGS):</strong> ATM diffusi in città, sportelli di cambio ovunque. Carte VISA/MC accettate in città/hotel/ristoranti, contanti in zone rurali</li>';
  html += '<li style="margin-bottom:6px;"><strong>Vietato:</strong> importazione droghe (pene detentive lunghe e severe)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Restrizione export:</strong> antiquariato &gt;50 anni, quadri/beni artistici (serve permesso Ministero Cultura)</li>';
  html += '<li style="margin-bottom:6px;"><strong>Animali:</strong> certificati sanitari + possibile quarantena</li>';
  html += '</ul></div>';

  // ---- Tip pratici ----
  html += '<div class="card" style="margin-bottom:10px;">';
  html += '<div class="card-title">💡 Tip Pratici</div>';
  html += '<ul style="padding-left:18px;font-size:0.85rem;">';
  html += '<li style="margin-bottom:6px;"><strong>Permesso confine Kel-Suu/Sary-Jaz:</strong> NON gestito dalla Farnesina — richiedi via Russian Troika o CBT At-Bashy</li>';
  html += '<li style="margin-bottom:6px;"><strong>Itinerario modificabile in viaggio:</strong> aggiorna DSNM da mobile se cambi piano</li>';
  html += '<li style="margin-bottom:6px;">Lascia un numero a cui essere rintracciato in Italia + porta i numeri consolari sempre con te</li>';
  html += '<li style="margin-bottom:6px;">Evita gioielli/orologi vistosi; comportamento sobrio nel sud (regioni più conservatrici)</li>';
  html += '<li style="margin-bottom:6px;">In caso di fermo/arresto: chiedi <strong>subito</strong> di contattare l\'Ambasciata d\'Italia ad Astana</li>';
  html += '<li style="margin-bottom:6px;">Vaccino encefalite da zecche: pianifica mesi prima (difficile da reperire in Italia all\'ultimo)</li>';
  html += '</ul></div>';

  // ---- Dati Paese ----
  html += '<details style="margin-top:10px;"><summary>📊 Dati Paese (Kirghizistan)</summary><div class="details-content" style="font-size:0.85rem;">';
  html += '<ul style="padding-left:18px;">';
  html += '<li><strong>Capitale:</strong> Bishkek</li>';
  html += '<li><strong>Popolazione:</strong> ~7.186.000 (stima 2024)</li>';
  html += '<li><strong>Superficie:</strong> 199.900 km²</li>';
  html += '<li><strong>Confini:</strong> Kazakhstan (N), Uzbekistan (O), Tagikistan (O/SO), Cina (S/E)</li>';
  html += '<li><strong>Fuso orario:</strong> +4h vs Italia (+5h con ora solare)</li>';
  html += '<li><strong>Lingue:</strong> Kirghiso (stato) + Russo (ufficiale)</li>';
  html += '<li><strong>Religione:</strong> 80-90% musulmana sunnita, resto ortodossa russa. Bishkek/nord laici, sud più tradizionale</li>';
  html += '<li><strong>Moneta:</strong> Som (KGS) — ~1€ = 95-100 KGS</li>';
  html += '<li><strong>Prefisso:</strong> +996 (KG), 312 (Bishkek)</li>';
  html += '<li><strong>Telefonia:</strong> O!, Beeline, MegaCom — SIM prepagate facilmente. Roaming italiano funziona</li>';
  html += '<li><strong>Clima:</strong> continentale (inverni freddi, estati calde)</li>';
  html += '</ul></div></details>';

  // ---- CTA finali ----
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">';
  html += '<a class="btn btn-sm btn-primary" href="https://www.dovesiamonelmondo.it" target="_blank">📍 Registra Viaggio (DSNM)</a>';
  html += '<a class="btn btn-sm btn-secondary" href="https://www.viaggiaresicuri.it/find-country/country/KGZ" target="_blank">🌐 Scheda KGZ</a>';
  html += '<a class="btn btn-sm btn-secondary" href="https://www.viaggiaresicuri.it/schede_paese/pdf/KGZ.pdf" target="_blank">📄 PDF Scheda</a>';
  html += '</div>';
  html += '</div></details>';

  wrapper.innerHTML = html;

  // Make each content block editable after DOM is ready
  setTimeout(function () {
    // === FLIGHTS LOGIC ===
    var currentFlightPerson = 'leo';

    function loadFlights() {
      DB.get('flights', 'flights-' + currentFlightPerson).then(function(rec) {
        var flights = (rec && rec.value) ? rec.value : [];
        renderFlightsList(flights);
      });
    }

    function renderFlightsList(flights) {
      var container = document.getElementById('flights-container');
      if (!container) return;
      if (flights.length === 0) {
        container.innerHTML = '<p style="text-align:center;opacity:0.5;font-size:0.9rem;">Nessun volo aggiunto</p>';
        return;
      }
      var h = '';
      for (var i = 0; i < flights.length; i++) {
        var f = flights[i];
        h += '<div class="card" style="padding:10px;margin-bottom:8px;position:relative;">';
        h += '<button class="flight-del" data-idx="' + i + '" type="button" style="position:absolute;top:6px;right:8px;background:none;border:none;color:var(--color-danger);font-size:1rem;cursor:pointer;">✕</button>';
        h += '<div style="font-weight:700;font-size:0.95rem;">' + (f.direction === 'andata' ? '🛫' : '🛬') + ' ' + (f.from || '?') + ' → ' + (f.to || '?') + '</div>';
        h += '<div style="font-size:0.85rem;margin-top:4px;">';
        if (f.date) h += '📅 ' + f.date + ' ';
        if (f.time) h += '🕐 ' + f.time + ' ';
        h += '</div>';
        if (f.airline || f.flightNum) {
          h += '<div style="font-size:0.85rem;opacity:0.7;">';
          if (f.airline) h += '✈️ ' + f.airline + ' ';
          if (f.flightNum) h += f.flightNum;
          h += '</div>';
        }
        if (f.booking) h += '<div style="font-size:0.8rem;opacity:0.6;">Prenotazione: ' + f.booking + '</div>';
        if (f.notes) h += '<div style="font-size:0.8rem;opacity:0.6;margin-top:2px;">' + f.notes + '</div>';
        h += '</div>';
      }
      container.innerHTML = h;

      // Delete handlers
      var delBtns = container.querySelectorAll('.flight-del');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function() {
          var idx = parseInt(this.getAttribute('data-idx'));
          DB.get('flights', 'flights-' + currentFlightPerson).then(function(rec) {
            var fl = (rec && rec.value) ? rec.value : [];
            fl.splice(idx, 1);
            DB.put('flights', { id: 'flights-' + currentFlightPerson, value: fl }).then(function() {
              loadFlights();
              showToast('Volo rimosso ✓');
            });
          });
        });
      }
    }

    // Flight person selector
    var fpBtns = wrapper.querySelectorAll('#flight-person-selector .person-btn');
    for (var fpb = 0; fpb < fpBtns.length; fpb++) {
      fpBtns[fpb].addEventListener('click', function() {
        for (var x = 0; x < fpBtns.length; x++) fpBtns[x].classList.remove('active');
        this.classList.add('active');
        currentFlightPerson = this.getAttribute('data-fperson');
        loadFlights();
      });
    }

    // Add flight button
    var addFlightBtn = document.getElementById('add-flight-btn');
    if (addFlightBtn) {
      addFlightBtn.addEventListener('click', function() {
        var form = document.createElement('div');
        form.className = 'card';
        form.style.cssText = 'padding:12px;margin-top:8px;';
        form.innerHTML =
          '<div class="card-title">Nuovo Volo — ' + currentFlightPerson.charAt(0).toUpperCase() + currentFlightPerson.slice(1) + '</div>' +
          '<div class="form-group"><label class="form-label">Tipo</label><select class="form-select" id="nf-dir"><option value="andata">🛫 Andata</option><option value="ritorno">🛬 Ritorno</option></select></div>' +
          '<div class="form-group"><label class="form-label">Da</label><input type="text" class="form-select" id="nf-from" placeholder="Es: Bologna BLQ"></div>' +
          '<div class="form-group"><label class="form-label">A</label><input type="text" class="form-select" id="nf-to" placeholder="Es: Bishkek BSZ"></div>' +
          '<div class="form-group"><label class="form-label">Data</label><input type="date" class="form-select" id="nf-date"></div>' +
          '<div class="form-group"><label class="form-label">Ora</label><input type="time" class="form-select" id="nf-time"></div>' +
          '<div class="form-group"><label class="form-label">Compagnia</label><input type="text" class="form-select" id="nf-airline" placeholder="Es: Turkish Airlines"></div>' +
          '<div class="form-group"><label class="form-label">N° Volo</label><input type="text" class="form-select" id="nf-num" placeholder="Es: TK374"></div>' +
          '<div class="form-group"><label class="form-label">Codice Prenotazione</label><input type="text" class="form-select" id="nf-booking" placeholder="Es: ABC123"></div>' +
          '<div class="form-group"><label class="form-label">Note</label><input type="text" class="form-select" id="nf-notes" placeholder="Scalo, terminal, etc."></div>' +
          '<div style="display:flex;gap:8px;margin-top:8px;">' +
            '<button class="btn btn-sm btn-primary" id="nf-save" type="button" style="flex:1;">💾 Salva</button>' +
            '<button class="btn btn-sm btn-secondary" id="nf-cancel" type="button">Annulla</button>' +
          '</div>';

        var container = document.getElementById('flights-container');
        container.parentElement.insertBefore(form, addFlightBtn);

        form.querySelector('#nf-cancel').addEventListener('click', function() { form.remove(); });
        form.querySelector('#nf-save').addEventListener('click', function() {
          var flight = {
            direction: form.querySelector('#nf-dir').value,
            from: form.querySelector('#nf-from').value.trim(),
            to: form.querySelector('#nf-to').value.trim(),
            date: form.querySelector('#nf-date').value,
            time: form.querySelector('#nf-time').value,
            airline: form.querySelector('#nf-airline').value.trim(),
            flightNum: form.querySelector('#nf-num').value.trim(),
            booking: form.querySelector('#nf-booking').value.trim(),
            notes: form.querySelector('#nf-notes').value.trim()
          };
          if (!flight.from || !flight.to) { showToast('Inserisci partenza e arrivo'); return; }
          DB.get('flights', 'flights-' + currentFlightPerson).then(function(rec) {
            var fl = (rec && rec.value) ? rec.value : [];
            fl.push(flight);
            DB.put('flights', { id: 'flights-' + currentFlightPerson, value: fl }).then(function() {
              form.remove();
              loadFlights();
              showToast('Volo aggiunto ✓');
            });
          });
        });
      });
    }

    // Sync flights button
    var syncBtn = document.getElementById('sync-flights-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', function() {
        if (typeof FirebaseSync !== 'undefined' && FirebaseSync.syncNow) {
          FirebaseSync.syncNow();
          showToast('Sincronizzazione avviata...');
        } else {
          showToast('Firebase non configurato');
        }
      });
    }

    loadFlights();

    // === EDITABLE SECTIONS ===
    var sections = ['info-documenti', 'info-veicolo', 'info-soldi', 'info-app', 'info-shopping'];
    for (var i = 0; i < sections.length; i++) {
      (function (sectionId) {
        var el = document.getElementById(sectionId);
        if (!el) return;
        var originalHtml = el.innerHTML;

        // Load saved edit
        DB.get('edits', sectionId).then(function (record) {
          if (record && record.value) {
            el.innerHTML = record.value;
          }
          Editable.make(el, sectionId, originalHtml);

          // Show reset button when modified
          var resetBtn = el.parentElement.querySelector('.info-reset-btn[data-section="' + sectionId + '"]');
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
