/**
 * data.js — Tutti i dati statici per Kyrgyzstan Travel PWA 2026
 * 14 giorni: 30 maggio – 12 giugno 2026
 *
 * Variabili globali (vanilla JS, NO ES modules):
 *   ITINERARY, PHRASES, CHECKLIST, WAYPOINTS,
 *   EMERGENCY_CONTACTS, DRONE_INFO, ALTITUDE_DATA,
 *   GENERAL_INFO, EXCHANGE_RATES
 */

/* ============================================================
   TASK 3.1 — ITINERARY (14 giorni)
   ============================================================ */

var ITINERARY = [
  // ── Giorno 1 ─────────────────────────────────────────────
  {
    day: 1,
    date: "2026-05-30",
    title: "Bishkek",
    route: null,
    km: 0,
    driveTime: null,
    budget: 30,
    activities: [
      {
        time: null,
        description: "Arrivo aeroporto Manas (BSZ), SIM card O!, cambiare soldi",
        details: {
          why: "Manas (BSZ — ex FRU, codice cambiato il 9/5/2025) è 23 km a nord di Bishkek. È l'unico aeroporto internazionale del paese, niente altri scali a Bishkek città. SIM card O! o MegaCom in arrivo (~200 KGS, valida 30 giorni). Cambia il minimo qui (50 EUR), tassi peggiori che in centro.",
          duration: "30-45 min in aeroporto, 30-40 min taxi al centro",
          cost: "Taxi al centro 600-800 KGS (~6-8 EUR). SIM ~200 KGS. ATM Bakai/Optima all'arrivo.",
          tip: "Non cambiare TUTTI i soldi qui — i cambiavalute in centro Bishkek (Tsum, viale Kievskaya) hanno tassi molto migliori."
        }
      },
      {
        time: null,
        description: "Osh Bazaar: equipaggiamento auto (tanica, compressore, corda traino)",
        details: {
          why: "Il bazaar più grande di Bishkek. Qui compri tutto l'equipaggiamento auto a prezzi 1/3 rispetto Europa. Settore auto: lato sud-ovest del bazaar.",
          duration: "1.5-2h",
          cost: "Tanica 10L ~500 KGS, compressore 12V ~1500 KGS, corda traino 5T ~500 KGS, manometro ~200 KGS. Totale ~3000 KGS (~30 EUR).",
          tip: "Apertura 7:00-19:00, chiuso lunedì. Borseggiatori: zaino davanti, contanti in tasca chiusa. Marshrutka 113/124/135 dal centro (10 KGS)."
        }
      },
      {
        time: null,
        description: "Piazza Ala-Too, esplorare centro Bishkek",
        details: {
          why: "Cuore di Bishkek. Statua Manas, parlamento, museo storico, tutto in 200m. Cambio della guardia ogni ora.",
          duration: "1-2h walk + soste",
          tip: "Cambio guardia ogni ora 09:00-18:00. Bandiera issata 07:00, ammainata 18:00. Sera: fontane illuminate, gelato dai chioschi, gente locale."
        }
      },
      {
        time: null,
        description: "Cena: Navat o Faiza",
        details: {
          why: "Navat = catena tradizionale kirghiza, atmosfera yurta moderna. Faiza = ristorante uiguro famoso per laghman tirato a mano.",
          cost: "350-700 KGS a piatto",
          tip: "Navat ha 4 sedi a Bishkek, la più centrale è in viale Chuy. Faiza è in Pravda 156 — prenota se sabato sera."
        }
      }
    ],
    gps: [
      { name: "Aeroporto Manas (BSZ)", lat: 43.0553, lng: 74.4776 },
      { name: "Osh Bazaar Bishkek", lat: 42.8700, lng: 74.5900 },
      { name: "Piazza Ala-Too", lat: 42.8746, lng: 74.5698 }
    ],
    warnings: [],
    accommodation: "Tunduk Hostel Bishkek"
  },

  // ── Giorno 2 ─────────────────────────────────────────────
  {
    day: 2,
    date: "2026-05-31",
    title: "Bishkek → Konorchek → Karakol",
    route: "Bishkek → Ala-Archa → Konorchek → Burana → Issyk-Kul nord → Karakol",
    km: 450,
    driveTime: "8-9h con soste",
    budget: 35,
    activities: [
      {
        time: null,
        description: "Mattina: Ala-Archa National Park, hike Ak-Sai Waterfall (cascata in Ala-Archa)",
        details: {
          why: "Parco alpino a 30 km da Bishkek (1500-4895m). Lo conoscono tutti i bishkekesi del weekend. La cascata Ak-Sai è in fondo a una valle laterale.",
          duration: "Hike Ak-Sai: 3-5h andata e ritorno (~12 km, +700m)",
          cost: "Entrata parco: ~80 KGS auto + 50 KGS persona",
          tip: "Trail ripido nell'ultima ora. Acqua ai ruscelli OK con filtro. In alternativa al waterfall: Adygene Glacier o solo passeggiata in fondovalle (1h)."
        }
      },
      { time: null, description: "Ritiro auto da Russian Troika" },
      {
        time: null,
        description: "Konorchek Canyon (red canyon, hike 1-2h)",
        details: {
          why: "Canyon rosso di arenaria simile al Bryce americano. Trailhead segnalato sulla A365 al km della stazione di Kok-Moinok. A pochi km c'è Mars Canyon (paesaggio marziano, formazioni più piatte).",
          duration: "Loop base: 1.5-2h. Versione lunga 4h.",
          cost: "Gratis",
          tip: "Niente ombra, parti presto o nel tardo pomeriggio. Sulla strada per Karakol vale la pena fermarsi a Cholpon-Ata Petroglyph Stone Field (petroglifi Età del Bronzo, 30 min sosta) e a Chong-Kemin National Park (parco naturale per trekking)."
        }
      },
      {
        time: null,
        description: "Burana Tower (XI sec, vista Tien Shan)",
        details: {
          why: "Minareto del XI secolo, ultimo pezzo di Balasagun, capitale dell'impero Karakhanide. Si sale dentro fino in cima per la vista a 360°.",
          duration: "30-45 minuti totali",
          cost: "Entrata ~60 KGS",
          tip: "Sul terreno ci sono i balbal (statue di pietra di guerrieri turchi). Piccolo museo archeologico incluso. Domenica c'è gente."
        }
      },
      {
        time: null,
        description: "Animal Market di Karakol — SOLO domenica mattina presto (5:30-9:00). Se passi di domenica, alzati all'alba",
        details: {
          why: "Il mercato del bestiame più autentico del Kirghizistan. Pastori arrivano da giorni per vendere pecore, capre, mucche, cavalli. Chiude alle 10.",
          duration: "1h è più che sufficiente",
          cost: "Gratis",
          tip: "Solo domenica, e SOLO se ti svegli prima delle 7. Niente foto invasive — chiedi prima. Si mangia samsa fresca dai venditori."
        }
      },
      { time: null, description: "Guida sponda nord Issyk-Kul fino a Karakol" }
    ],
    gps: [
      { name: "Ala-Archa NP", lat: 42.6464, lng: 74.4847 },
      { name: "Ak-Sai Waterfall (Ala-Archa)", lat: 42.5511, lng: 74.4978 },
      { name: "Konorchek Canyon", lat: 42.6833, lng: 75.8500 },
      { name: "Mars Canyon", lat: 42.6700, lng: 75.8200 },
      { name: "Burana Tower", lat: 42.7472, lng: 75.2503 },
      { name: "Animal Market Karakol", lat: 42.4736, lng: 78.3625 },
      { name: "Karakol centro", lat: 42.4907, lng: 78.3936 }
    ],
    warnings: ["⛽ Fare benzina a Bishkek prima di partire", "🐎 Animal Market: SOLO domenica mattina (5:30-9:00)"],
    accommodation: "Duet Hostel Karakol"
  },

  // ── Giorno 3 ─────────────────────────────────────────────
  {
    day: 3,
    date: "2026-06-01",
    title: "Karakol: Jyrgalan Valley",
    route: "Karakol → Jyrgalan → Karakol",
    km: 70,
    driveTime: "1h A/R",
    budget: 30,
    activities: [
      {
        time: null,
        description: "Guida verso Jyrgalan (35km)",
        details: {
          why: "Jyrgalan = villaggio minerario abbandonato trasformato in hub di trekking. Strada asfaltata fino al villaggio, poi sterrato.",
          duration: "1h da Karakol",
          tip: "Da Karakol prendi la strada per Tup, poi svolta a destra. Marshrutka ~80 KGS se vuoi lasciare la macchina."
        }
      },
      {
        time: null,
        description: "Waterfall Trail o Kok-Bel Pass hike",
        details: {
          why: "Eki Chat Waterfall = trail breve (3h round trip, facile). Kok-Bel Pass = trail più impegnativo (5h round trip, +600m) con panorama su Jyrgalan e Issyk-Kul lontano.",
          duration: "3-5h a seconda del trail",
          tip: "Best time: giugno-settembre. Trail ben segnati. Pernottamento in yurta camp ~800 KGS persona se vuoi prolungare."
        }
      },
      { time: null, description: "Spot drone" },
      {
        time: null,
        description: "Children's Day — festeggiamenti locali",
        details: {
          why: "Il 1° giugno = Festa internazionale del Bambino, festeggiata in tutta l'ex-URSS. Bambini in costume, parchi pieni, gelati ovunque, bandierine. Atmosfera bellissima nei piccoli villaggi.",
          tip: "Se sei a Jyrgalan o Karakol l'1 giugno, vai in piazza centrale alle 10:00. Foto magnifiche dei bambini. Porta caramelle se vuoi farti subito amici."
        }
      }
    ],
    gps: [
      { name: "Villaggio Jyrgalan", lat: 42.8186, lng: 79.2094 }
    ],
    warnings: ["🎉 1 giugno = Children's Day in Kirghizistan"],
    accommodation: "Duet Hostel Karakol"
  },

  // ── Giorno 4 ─────────────────────────────────────────────
  {
    day: 4,
    date: "2026-06-02",
    title: "Karakol: Altyn-Arashan Hot Springs",
    route: "Karakol → Altyn-Arashan → Karakol",
    km: 0,
    driveTime: "Hike 3-4h one way",
    budget: 30,
    activities: [
      {
        time: null,
        description: "Mattina Karakol: Dungan Mosque (legno, no chiodi, 1907) + Orthodox Holy Trinity Church",
        details: {
          why: "Dungan Mosque: costruita nel 1907 dai Dungan (musulmani cinesi), tutta in legno, NESSUN chiodo, dipinta in stile pagoda buddista cinese. Sopravvissuta al terremoto del 1911 e all'epoca sovietica. Holy Trinity: chiesa russa-ortodossa anch'essa in legno, ricostruita 1895 dopo il terremoto.",
          duration: "30 min ciascuna, sono vicine",
          cost: "Entrata libera, donazione benvenuta",
          tip: "Donne: foulard sulla testa nella moschea (te lo prestano gratis all'entrata). Non-musulmani: meglio guardare dall'esterno. Niente foto durante la preghiera."
        }
      },
      {
        time: null,
        description: "Trasferimento al trailhead — opzione UAZ vintage sovietico (più rapido, 1h vs 4h a piedi)",
        details: {
          why: "L'UAZ-452 è il furgone militare sovietico anni '60. Il trasferimento da Karakol fino al village di Altyn-Arashan dura 1h, su strada così sconnessa che la Subaru non passa.",
          cost: "30-40 USD a/r, condivisibile fino a 6 persone",
          tip: "Si organizzano da Duet Hostel o CBT Karakol. Esperienza in sé memorabile: ti scuote come un cocktail."
        }
      },
      {
        time: null,
        description: "Hike verso Altyn-Arashan (3-4h, +800m) — panorama infinito sulla valle",
        details: {
          why: "Valle alpina dietro Karakol, considerata una delle più belle del paese. Trailhead a Ak-Suu (Teploklyuchenka), 12 km da Karakol. Hike alternativi nella zona: Red Hills (colline rosse 'islandesi') e Kol-Ukok (lago alpino con horse riding spot).",
          duration: "Hike 3-4h andata, +800m dislivello, 14 km a/r",
          tip: "Dalla cima della valle vedi il Palatka Peak (4260m). Acqua nei ruscelli OK con filtro. Trail segnato a punti rossi."
        }
      },
      {
        time: null,
        description: "Sorgenti termali naturali (≈45°C) a 2600m — Altyn-Arashan = 'sorgenti d'oro'",
        details: {
          why: "5 vasche con acqua termale fortemente sulfurea. Quella più nota è all'interno della guesthouse Arashan ('White House'), 100 KGS.",
          duration: "Quanto vuoi. Max 20-30 min in vasca per non disidratarti.",
          cost: "100 KGS per le vasche dentro le guesthouse",
          tip: "Costume + ciabatte. Prima di entrare, doccia. L'acqua puzza di zolfo: i vestiti puzzano per giorni."
        }
      },
      {
        time: null,
        description: "WILD HOT SPRINGS poco oltre il villaggio: pozze libere lungo il fiume, gratis",
        details: {
          why: "200m a monte del villaggio, sul lato del fiume, ci sono pozze naturali calde formate dall'acqua termale che esce dalla roccia. Gratis, sempre aperte, viste sul Palatka Peak.",
          duration: "Quanto vuoi",
          cost: "Gratis",
          tip: "Fai mattina presto o tardo pomeriggio per evitare la folla del weekend. Non lasciare zaini incustoditi."
        }
      },
      {
        time: null,
        description: "Cena al Dastorkon Restaurant (Karakol) — uno dei migliori ristoranti tradizionali della città",
        details: {
          why: "Cucina kirghisa autentica in un setting yurta-style. Specialità: beshbarmak, lagman fatto a mano, plov.",
          cost: "Pasto completo: 800-1500 KGS a persona",
          tip: "Provare il kumys (latte di cavalla fermentato) come digestivo se sei coraggioso. Prenotare di sabato."
        }
      },
      { time: null, description: "Opzionale: proseguire verso Ala-Kul Lake (richiede 2 giorni)" }
    ],
    gps: [
      { name: "Dungan Mosque", lat: 42.4915, lng: 78.3833 },
      { name: "Holy Trinity Church", lat: 42.4919, lng: 78.3922 },
      { name: "Trailhead Altyn-Arashan", lat: 42.6592, lng: 78.5261 },
      { name: "Hot Springs Altyn-Arashan", lat: 42.7500, lng: 78.5700 },
      { name: "Wild Hot Springs (oltre villaggio)", lat: 42.7600, lng: 78.5750 },
      { name: "Ala-Kul Lake (opzionale)", lat: 42.4983, lng: 78.5333 },
      { name: "Dastorkon Restaurant", lat: 42.4889, lng: 78.3953 }
    ],
    warnings: [
      "🥾 Sentiero ripido, portare acqua",
      "♨️ Hot springs: portare costume e ciabatte",
      "🚗 UAZ tour: organizzabile da Karakol (~30 USD a/r)"
    ],
    accommodation: "Duet Hostel Karakol"
  },

  // ── Giorno 5 ─────────────────────────────────────────────
  {
    day: 5,
    date: "2026-06-03",
    title: "Karakol → Sary-Jaz Valley",
    route: "Karakol → Sary-Jaz Valley (zona remota)",
    km: 150,
    driveTime: "4-5h",
    budget: 25,
    activities: [
      {
        time: null,
        description: "Guida est verso Sary-Jaz Valley (remota, spettacolare)",
        details: {
          why: "Una delle valli più remote del Kirghizistan, vicino ai confini Cina e Kazakistan. Ghiacciai Inylchek (i più lunghi dell'Asia centrale, 60km), vista verso il picco Khan Tengri (7,010m). Pochi turisti, paesaggi alieni.",
          duration: "4-5h guida + esplorazione",
          tip: "Strada solo per 4x4 vero, alcuni guadi. Subaru può con cautela. Niente segnale, niente benzina, niente abitazioni per 100km — autonomia totale necessaria. Inylchek base camp è il punto più estremo accessibile."
        }
      },
      {
        time: null,
        description: "PERMESSO ZONA DI CONFINE OBBLIGATORIO (zona militare)",
        details: {
          why: "Tutta la valle Sary-Jaz è zona militare di confine. Senza permesso ti rimandano indietro al checkpoint.",
          cost: "20-30 USD persona via CBT Karakol o agenzie tour",
          tip: "Organizza 7+ giorni prima. Serve scansione passaporto. CBT Karakol +996 39 22 50000."
        }
      },
      {
        time: null,
        description: "Campeggio sotto le stelle",
        details: {
          why: "Zero inquinamento luminoso, altitudine 2,500-3,000m, atmosfera secca = stelle pazzesche. Possibile vedere la Via Lattea, ISS, satelliti.",
          tip: "Venti glaciali fortissimi di notte. Tenda con paletti rinforzati, sacco a pelo -10°C. Acqua dai torrenti glaciali (filtra o tratta)."
        }
      }
    ],
    gps: [
      { name: "Sary-Jaz Valley", lat: 42.5000, lng: 79.5000 },
      { name: "Inylchek area", lat: 42.2500, lng: 79.8000 },
      { name: "Kara-Tash", lat: 42.1500, lng: 78.8000 }
    ],
    warnings: [
      "📋 PERMESSO ZONA DI CONFINE OBBLIGATORIO",
      "⛽ Nessun carburante disponibile",
      "📵 Nessun segnale telefonico",
      "🚗 4x4 essenziale"
    ],
    accommodation: "Wild camping"
  },

  // ── Giorno 6 ─────────────────────────────────────────────
  {
    day: 6,
    date: "2026-06-04",
    title: "Sary-Jaz → Sponda Sud Issyk-Kul",
    route: "Sary-Jaz → sponda sud Issyk-Kul",
    km: 300,
    driveTime: "6-7h",
    budget: 30,
    activities: [
      {
        time: null,
        description: "Rientro da Sary-Jaz",
        details: {
          why: "5-6h di guida nel ritorno. Stessa strada dell'andata, niente segnale fino a Karakol.",
          tip: "Parti presto, prima del vento del pomeriggio. Pieno carburante a Karakol prima di scendere a sud."
        }
      },
      {
        time: null,
        description: "Guida sponda sud Issyk-Kul",
        details: {
          why: "La sponda sud è meno turistica della nord, più selvaggia. Strada A363 generalmente buona, attraversa villaggi rurali.",
          tip: "Fare benzina a Karakol o Bokonbayevo. Tra l'una e l'altra ci sono 200km senza distributori affidabili."
        }
      },
      {
        time: null,
        description: "Ak-Say Canyon al golden hour (sul lago!)",
        details: {
          why: "Canyon rosso che si affaccia direttamente sul lago Issyk-Kul. Hike breve (10-15 min) per arrivare al punto panoramico.",
          duration: "1-2h sul posto",
          tip: "Best time: golden hour (1h prima del tramonto). Niente ombra, porta cappello. Drone consentito."
        }
      },
      {
        time: null,
        description: "Seven Bulls Rock",
        details: {
          why: "Aka Jety Oguz: 7 formazioni di arenaria rossa che ricordano una mandria di tori. Vicino alla città di Jeti-Oguz, 28km da Karakol.",
          cost: "Ingresso: 50 KGS",
          tip: "Combina con la 'Roccia del Cuore Spezzato' a 1km. Best time tramonto (rocce diventano arancio fluo)."
        }
      }
    ],
    gps: [
      { name: "Ak-Say Canyon", lat: 42.3500, lng: 76.8000 },
      { name: "Seven Bulls Rock", lat: 42.2800, lng: 77.5500 }
    ],
    warnings: [],
    accommodation: "Wild camp sulla riva di Issyk-Kul"
  },

  // ── Giorno 7 ─────────────────────────────────────────────
  {
    day: 7,
    date: "2026-06-05",
    title: "Sponda Sud Issyk-Kul: Jety Oguz, Barskoon, Skazka",
    route: "Jety Oguz → Barskoon → Arabel Plateau → Skazka",
    km: 180,
    driveTime: "4-5h",
    budget: 35,
    activities: [
      {
        time: null,
        description: "Jety Oguz Rocks (Sette Tori) — formazioni rosse iconiche + Cuore Spezzato",
        details: {
          why: "7 formazioni di arenaria rossa che ricordano una mandria di tori (jety oguz = 7 tori). Accanto la roccia 'Broken Heart' con leggenda: due fratelli che amano la stessa donna la uccisero, e il loro sangue diede il colore rosso alle rocce.",
          duration: "1-2 ore (foto + breve passeggiata)",
          cost: "Gratis",
          tip: "Migliore luce: tardo pomeriggio (rocce più rosse). Drone consentito. Bagno pubblico a pagamento all'ingresso."
        }
      },
      {
        time: null,
        description: "Barskoon Gorge: cascate Barskoon (la più alta è Manjyly-Ata ≈ 30m), monumento Gagarin",
        details: {
          why: "Catena di cascate dentro la valle Barskoon. La principale è 'Manjyly-Ata' (~30m). C'è un busto di Gagarin sulla strada principale: qui veniva in vacanza.",
          duration: "Hike 2-3h totale fino alla cascata principale",
          cost: "Gratis",
          tip: "Trailhead di fianco al busto di Gagarin (non puoi sbagliare). Pendenza dolce, foresta. In estate l'acqua è abbondante."
        }
      },
      {
        time: null,
        description: "Barskoon Pass → Arabel Plateau (camping spot, 3,800m)",
        details: {
          why: "Salita tornanti del Barskoon Pass (3,800m) fino al Plateau Arabel: vasta zona alpina con laghi e cavalli liberi. Una delle viste più ampie di tutto il Kirghizistan.",
          tip: "Strada sterrata oltre il pass — Subaru OK ma piano. Notte freddissima sotto zero anche a giugno. Acqua: prendi prima."
        }
      },
      {
        time: null,
        description: "Fairy Tale Canyon / Skazka — formazioni colorate, tramonto magico",
        details: {
          why: "'Skazka' = fiaba in russo. Canyon di arenaria rossa, gialla, viola, eroso da vento e pioggia in formazioni che sembrano draghi, castelli, muraglia. Sul lago Issyk-Kul, lato sud.",
          duration: "1-2 ore",
          cost: "Entrata: 50 KGS",
          tip: "ANDARE AL TRAMONTO — la luce trasforma il canyon. La 'Great Wall' è la formazione più alta. Niente acqua sul posto, porta scorta."
        }
      }
    ],
    gps: [
      { name: "Jety Oguz Rocks", lat: 42.3478, lng: 78.2333 },
      { name: "Barskoon Waterfall", lat: 42.1500, lng: 77.6000 },
      { name: "Monumento Gagarin", lat: 42.1633, lng: 77.6128 },
      { name: "Arabel Plateau", lat: 41.9500, lng: 77.5000 },
      { name: "Fairy Tale Canyon (Skazka)", lat: 42.3847, lng: 77.2575 },
      { name: "Kol-Tor Lake", lat: 42.6000, lng: 74.8000 }
    ],
    warnings: ["🏔️ Arabel Plateau a 3,800m — freddo notte"],
    accommodation: "Camp Arabel Plateau o guesthouse Bokonbayevo"
  },

  // ── Giorno 8 ─────────────────────────────────────────────
  {
    day: 8,
    date: "2026-06-06",
    title: "Bokonbayevo: Eagle Hunting + Felt + Folklore",
    route: null,
    km: 50,
    driveTime: null,
    budget: 50,
    activities: [
      {
        time: null,
        description: "Mattina: Eagle Hunting demo (CBT Bokonbayevo, prenotare in anticipo)",
        details: {
          why: "Tradizione millenaria di caccia con aquila reale (berkutchi). Bokonbayevo è il centro nazionale di questa pratica. Vedi l'aquila lanciata, vola, torna sul guanto, eventualmente caccia simulata.",
          duration: "1-2h dimostrazione + spiegazione",
          cost: "1500-2500 KGS persona (gruppo) — 5000+ KGS privato",
          tip: "Stagione caccia vera: ottobre-marzo. Maggio-settembre = solo dimostrazioni, ma comunque vere. Prenota: CBT Bokonbayevo +996 779 988 678 o Salbuurun Federation. Le aquile vengono rilasciate dopo 10-15 anni."
        }
      },
      {
        time: null,
        description: "Pomeriggio: Felt Making master class (lavorazione shyrdak tradizionale, 2h)",
        details: {
          why: "Lo shyrdak è il tappeto in feltro tradizionale kirghiso, patrimonio UNESCO Intangible Cultural Heritage dal 2012. Workshop pratico: bagnare lana, arrotolare, calpestare, asciugare. Risultato: piccolo pezzo 15x15cm da portare a casa.",
          duration: "2-3h",
          cost: "1000-1500 KGS persona",
          tip: "Cooperative femminili: Aigine o Aigul Trade. Spesso include tè + lepyoshka (pane locale). Combina con Eagle Hunting nello stesso giorno."
        }
      },
      {
        time: null,
        description: "Sera: Folklore Show (musica, danze, komuz) — organizzato da CBT",
        details: {
          why: "Spettacolo serale con strumenti tradizionali: komuz (3 corde), kyl-kyak (violino verticale), temir komuz (scacciapensieri). Spesso include recitazione dell'epica di Manas.",
          duration: "60-90 min",
          cost: "800-1200 KGS persona",
          tip: "Solitamente 19:30-20:30. Cena spesso inclusa: beshbarmak o plov. Prenota CBT Bokonbayevo qualche giorno prima."
        }
      },
      { time: null, description: "Cena yurta locale" }
    ],
    gps: [
      { name: "CBT Bokonbayevo", lat: 42.1208, lng: 76.9900 },
      { name: "Felt Workshop Bokonbayevo", lat: 42.1280, lng: 76.9870 }
    ],
    warnings: ["📞 Eagle Hunting + Felt + Folklore: prenotare giorni prima via CBT"],
    accommodation: "Guesthouse Bokonbayevo"
  },

  // ── Giorno 9 ─────────────────────────────────────────────
  {
    day: 9,
    date: "2026-06-07",
    title: "Bokonbayevo → Song-Kul",
    route: "Bokonbayevo → Kochkor → Song-Kul Pass → Song-Kul",
    km: 200,
    driveTime: "5-6h",
    budget: 40,
    activities: [
      {
        time: null,
        description: "Guida via Kochkor (ULTIMO CARBURANTE prima di Song-Kul!)",
        details: {
          why: "Kochkor è lo snodo tra Bishkek, Karakol e Naryn. Stazione Gazprom all'ingresso. Da qui parte la salita verso Song-Kul, 3h di sterrato senza distributori.",
          tip: "Pieno + tanica 10L per sicurezza. ATM in centro: Bai-Tushum, Optima. Fai contanti per yurta camp (no carte sopra)."
        }
      },
      {
        time: null,
        description: "Kochkor: laboratorio feltro artigianale (shyrdak)",
        details: {
          why: "Cooperative storiche del feltro: Altyn Kol e Wenan, due delle migliori del paese. Possono mostrarti il processo o vendere shyrdak originali (1500-15000 KGS a seconda della dimensione).",
          duration: "30-60 min",
          tip: "Se hai già fatto Felt Master Class a Bokonbayevo (Day 8), salta. Altrimenti vale la pena."
        }
      },
      {
        time: null,
        description: "Song-Kul Pass (3,500m)",
        details: {
          why: "Salita tornanti del passo Song-Kul, ultimo prima di scendere al lago. Vista panoramica sul lago a 3,016m.",
          tip: "Se hai mal di montagna, sintomi possono iniziare qui. Bere molta acqua, niente alcol, riposare appena arrivi al campo."
        }
      },
      {
        time: null,
        description: "Arrivo Song-Kul Lake (3,016m)",
        details: {
          why: "Lago alpino circondato da pascoli (jailoo). Cuore della cultura nomade kirghiza. D'estate i pastori salgono qui con le mandrie e vivono in yurte.",
          duration: "2 giorni minimo",
          tip: "Acqua del lago: 4-8°C anche d'estate, NON ti tuffi. Niente segnale, niente elettricità (pannelli solari deboli), niente bagni veri."
        }
      },
      {
        time: null,
        description: "Yurta camp, cena tradizionale",
        details: {
          why: "Cena solitamente: zuppa shorpo, beshbarmak (pasta + agnello bollito), kymyz (latte di cavalla fermentato — provalo, è acido), tè con marmellata.",
          cost: "Yurta camp: 700-1500 KGS persona con cena+colazione",
          tip: "Notte freddissima anche in giugno (-5°C). Sacco a pelo + maglione. Stelle: Via Lattea visibile a occhio nudo. Tripode se hai macchina fotografica."
        }
      }
    ],
    gps: [
      { name: "CBT Kochkor", lat: 42.0133, lng: 75.7592 },
      { name: "Song-Kul", lat: 41.8333, lng: 75.1500 }
    ],
    warnings: [
      "⛽ ULTIMO RIFORNIMENTO A KOCHKOR!",
      "🏔️ Prima notte sopra 3,000m — attenzione mal di montagna",
      "🌡️ Temperature notturne sotto 0°C"
    ],
    accommodation: "Yurta camp Song-Kul"
  },

  // ── Giorno 10 ────────────────────────────────────────────
  {
    day: 10,
    date: "2026-06-08",
    title: "Song-Kul — Giornata Completa",
    route: null,
    km: 0,
    driveTime: null,
    budget: 35,
    activities: [
      {
        time: null,
        description: "Passeggiata a cavallo con nomadi",
        details: {
          why: "Esperienza più autentica di Song-Kul: i pastori ti portano in giro per il jailoo (pascolo alpino) tra cavalli liberi e mandrie. Si organizza direttamente al campo.",
          duration: "1-3h",
          cost: "300-500 KGS per ora",
          tip: "Se non hai mai cavalcato, dillo subito. Cavalli kirghizi sono piccoli ma resistenti, abituati al freddo. Casco non incluso, vai piano."
        }
      },
      {
        time: null,
        description: "Osservare preparazione kumys",
        details: {
          why: "Kumys = latte di cavalla fermentato, bevanda nazionale. Si prepara in un sacchetto di pelle (chykcha) appeso che viene scosso più volte al giorno per giorni. Ha una leggera componente alcolica naturale (~2%).",
          tip: "Provalo. Sapore: acido, frizzante, salato. Strano la prima volta, addictivo dopo. Effetto lassativo se non sei abituato — non esagerare."
        }
      },
      {
        time: null,
        description: "Drone: yurte, mandrie, lago",
        details: {
          why: "Una delle località più drone-friendly del Kirghizistan: lago turchese, yurte bianche, mandrie di cavalli, montagne sullo sfondo. Niente regolamenti specifici.",
          tip: "Vento si alza dopo le 11:00. Vola al mattino o al tramonto. Batterie dura meno a 3,000m e -5°C — porta extra e tienile dentro la giacca."
        }
      },
      {
        time: null,
        description: "Tramonto, stargazing (zero inquinamento luminoso)",
        details: {
          why: "Song-Kul ha uno dei cieli più scuri dell'Asia centrale. Inquinamento luminoso zero, altitudine 3,000m, atmosfera secca. Via Lattea, ISS, satelliti, stelle cadenti.",
          tip: "Aspetta che sia BUIO completo (~22:30 a giugno). Lampada frontale con luce rossa per non rovinare adattamento occhi. Macchina fotografica: ISO 3200, 20s exposure, f/2.8."
        }
      }
    ],
    gps: [
      { name: "Song-Kul Lake", lat: 41.8333, lng: 75.1500 }
    ],
    warnings: [
      "🏔️ Mal di montagna — monitorare sintomi",
      "☀️ UV forte ad alta quota"
    ],
    accommodation: "Yurta camp Song-Kul"
  },

  // ── Giorno 11 ────────────────────────────────────────────
  {
    day: 11,
    date: "2026-06-09",
    title: "Song-Kul → Naryn → Tash Rabat",
    route: "Song-Kul → Naryn → Tash Rabat",
    km: 250,
    driveTime: "5-6h",
    budget: 35,
    activities: [
      {
        time: null,
        description: "Guida verso Naryn (ULTIMO ATM!)",
        details: {
          why: "Naryn è il capoluogo della provincia, ultima 'città' prima del nulla. Da qui non c'è più ATM funzionante per 4+ giorni (Tash Rabat, Kel-Suu, Kazarman = solo contanti).",
          tip: "ATM: Optima, KICB, Bai-Tushum (centro). Limite 20,000 KGS per prelievo, fai 2-3 prelievi per avere abbastanza. Cambia anche EUR/USD se ne hai."
        }
      },
      {
        time: null,
        description: "Fare benzina a Naryn",
        details: {
          why: "Tre stazioni in centro, AI-92 e AI-95 disponibili. Da qui benzina solo a Kazarman (300+ km).",
          tip: "Pieno + tanica 10L. Se vai a Kel-Suu, considera tanica 20L."
        }
      },
      {
        time: null,
        description: "Tash Rabat: caravanserraglio XV secolo, Via della Seta, 3,200m",
        details: {
          why: "Caravanserraglio in pietra del XV secolo, lungo la Via della Seta a 3,200m. Forse era un monastero cristiano-nestoriano o buddista prima. Ti puoi entrare dentro: 31 stanze, cupola centrale, tutto in pietra grezza.",
          duration: "1-2h sul posto. Hike opzionale 4-5h fino al passo Tash Rabat (3,968m) per vista sulla Cina.",
          cost: "Ingresso 100 KGS. Yurta camp ~800-1200 KGS persona con cena (l'unico alloggio).",
          tip: "Custode raramente presente — è all'aperto, sempre accessibile. Best time tramonto (luce dorata sulla pietra). Per Kel-Suu serve permesso militare e UAZ separato."
        }
      }
    ],
    gps: [
      { name: "Naryn centro", lat: 41.4287, lng: 76.0014 },
      { name: "Tash Rabat", lat: 40.8453, lng: 75.2847 },
      { name: "Kok-Kiya Canyon", lat: 41.0000, lng: 75.5000 }
    ],
    warnings: [
      "🏧 ULTIMO ATM A NARYN! Prelevare abbastanza contanti per 4+ giorni",
      "⛽ Fare benzina a Naryn"
    ],
    accommodation: "Yurta camp Tash Rabat"
  },

  // ── Giorno 12 ────────────────────────────────────────────
  {
    day: 12,
    date: "2026-06-10",
    title: "Spedizione Kel-Suu",
    route: "Tash Rabat → At-Bashy → Kel-Suu → At-Bashy",
    km: 160,
    driveTime: "4-5h A/R (UAZ)",
    budget: 45,
    activities: [
      {
        time: null,
        description: "Noleggio UAZ ad At-Bashy (Subaru NON può andare — guadi profondi)",
        details: {
          why: "Per arrivare a Kel-Suu serve attraversare guadi profondi 80cm — la Subaru affonderebbe. UAZ russa è l'unica opzione, lascia la macchina ad At-Bashy.",
          duration: "4-5h andata, 4-5h ritorno",
          cost: "10000-15000 KGS per gruppo (4-6 persone)",
          tip: "Organizza il giorno prima via CBT At-Bashy o guesthouse. Parti all'alba per avere tempo al lago. Porta tutto: niente shop, niente cibo, niente WC sulla strada."
        }
      },
      {
        time: null,
        description: "PERMESSO ZONA DI CONFINE OBBLIGATORIO",
        details: {
          why: "Kel-Suu è in zona militare vicino al confine cinese. Senza permesso ti rimandano indietro al checkpoint.",
          tip: "Organizza 7+ giorni prima via CBT Naryn (+996 35 22 26076). Costo ~20-30 USD persona. Serve scansione passaporto."
        }
      },
      {
        time: null,
        description: "Kel-Suu Lake: lago turchese in canyon gigante, 3,500m",
        details: {
          why: "Lago alpino lungo 6km incassato in un canyon di 200m. Acqua turchese irreale per il fango glaciale in sospensione. Una delle località più remote e meno fotografate del Kirghizistan.",
          duration: "2-3h sul posto",
          tip: "Best time: metà luglio-fine agosto. Prima è ghiacciato. Foto: meglio mattina presto (vento si alza alle 11:00 e increspa l'acqua). Hike intorno al lago: 2-3h."
        }
      },
      {
        time: null,
        description: "Spot drone",
        details: {
          why: "Canyon perfetto per il drone: pareti verticali, lago turchese, niente vento al mattino. Niente altri turisti = niente disturbo.",
          tip: "Niente regolamenti specifici a Kel-Suu, ma sei in zona militare — mantieni distanza dal confine cinese (sud del lago). Vola basso al mattino, alto al pomeriggio."
        }
      }
    ],
    gps: [
      { name: "At-Bashy", lat: 41.1714, lng: 75.7986 },
      { name: "Kel-Suu", lat: 40.5811, lng: 75.0742 }
    ],
    warnings: [
      "📋 PERMESSO ZONA DI CONFINE OBBLIGATORIO — organizzare in anticipo",
      "🚗 Subaru NON può raggiungere Kel-Suu — serve UAZ"
    ],
    accommodation: "Guesthouse At-Bashy"
  },

  // ── Giorno 13 ────────────────────────────────────────────
  {
    day: 13,
    date: "2026-06-11",
    title: "At-Bashy → Kazarman → Arslanbob",
    route: "At-Bashy → Kazarman → Arslanbob (STRADA PIÙ SELVAGGIA DEL KIRGHIZISTAN)",
    km: 500,
    driveTime: "10-12h GIORNATA INTERA",
    budget: 30,
    activities: [
      {
        time: null,
        description: "STRADA PIÙ SELVAGGIA DEL KIRGHIZISTAN",
        details: {
          why: "La strada da At-Bashy a Kazarman attraverso i passi sopra 3,300m è considerata una delle più impegnative del paese. Zero infrastruttura, fango, sassi, neve fino a metà giugno.",
          duration: "10-12h NON-STOP",
          tip: "Partire all'alba (06:00). Se piove, valutare di rimandare. Carburante minimo 500 km autonomia (pieno + tanica 20L)."
        }
      },
      {
        time: null,
        description: "Nessuna stazione di servizio, nessun segnale telefonico",
        details: {
          why: "Da At-Bashy a Kazarman: 250 km di sterrato senza distributori, niente abitazioni, niente segnale. È la sezione più isolata dell'itinerario.",
          tip: "Tanica 20L obbligatoria. Notifica qualcuno della partenza. Telefono satellitare (se hai) — altrimenti spera che la macchina regga."
        }
      },
      { time: null, description: "Passi sopra 3,300m" },
      {
        time: null,
        description: "Proseguire fino ad Arslanbob (foresta di noci)",
        details: {
          why: "Tappa intermedia: Kazarman è un piccolo villaggio sterrato a metà strada da At-Bashy ad Arslanbob, ultima possibilità di rifornimento (benzinaio piccolo) prima della scesa a sud. Arslanbob è la foresta di noci selvatiche più grande del mondo (60,000 ettari).",
          duration: "Kazarman → Arslanbob: 3-4h",
          cost: "Homestay CBT Arslanbob: 800-1200 KGS persona con cena",
          tip: "Kazarman ha solo guesthouse base se sei troppo stanco per continuare. Stagione noci settembre-ottobre. Cultura: villaggio musulmano uzbeko, vesti modesti, niente alcol pubblicamente."
        }
      }
    ],
    gps: [
      { name: "At-Bashy", lat: 41.1714, lng: 75.7986 },
      { name: "Kazarman", lat: 41.4000, lng: 74.0333 },
      { name: "CBT Arslanbob", lat: 41.3311, lng: 72.9389 }
    ],
    warnings: [
      "⛽ SERBATOIO PIENO + TANICA! Nessuna stazione di servizio",
      "📵 Nessun segnale telefonico",
      "🕐 Partire all'alba"
    ],
    accommodation: "Homestay Arslanbob"
  },

  // ── Giorno 14 ────────────────────────────────────────────
  {
    day: 14,
    date: "2026-06-12",
    title: "Arslanbob → Osh → Bishkek",
    route: "Arslanbob → Osh → Bishkek (o volo Osh → Bishkek)",
    km: 600,
    driveTime: "10h+ (o 1h volo)",
    budget: 40,
    activities: [
      {
        time: null,
        description: "Mattina: Big Waterfall hike (80m, 1-2h)",
        details: {
          why: "Cascata principale di Arslanbob, 80m di salto in foresta di noci selvatiche. Trail facile, ben segnato.",
          duration: "1.5-2h andata e ritorno",
          cost: "Ingresso parco ~80 KGS",
          tip: "Best time: mattina presto (luce + freschezza). C'è anche Small Waterfall (35m, 30 min hike) e Holy Lake (3h hike, sacro per gli uzbeki di Arslanbob)."
        }
      },
      {
        time: null,
        description: "Guida verso Osh: Sulaiman-Too (UNESCO), Osh Bazaar",
        details: {
          why: "Sulaiman-Too: montagna sacra al centro di Osh, patrimonio UNESCO dal 2009, luogo di pellegrinaggio da 3000 anni. Osh Bazaar: il più antico dell'Asia Centrale, 2000 anni di storia. NON confondere con Osh Bazaar di Bishkek.",
          duration: "Sulaiman-Too 1-2h, Bazaar 1-2h",
          cost: "Sulaiman 50 KGS + 30 KGS museo (in grotta)",
          tip: "Sulaiman: salita 30 min su scalini, vista 360° su Osh. Atmosfera spirituale al venerdì. Bazaar: contrattazione obbligatoria (parti dal 50%), prova samsa appena fuori dal tandoor (leggendaria)."
        }
      },
      {
        time: null,
        description: "Sera: guida o volo Osh → Bishkek (o restare a Osh, volo giorno dopo)",
        details: {
          why: "Volo Osh-Bishkek: 1h, ~2500-4000 KGS con Avia Traffic o Tez Jet. Guida: 600 km, 10-12h, strada di montagna (Too-Ashuu Pass 3,150m). Restituzione macchina solo a Bishkek.",
          tip: "Se hai macchina noleggio Russian Troika devi guidare comunque. Considera notte a Toktogul a metà strada. Evita di guidare di notte sul Too-Ashuu — animali, nebbia, ghiaccio."
        }
      }
    ],
    gps: [
      { name: "CBT Arslanbob", lat: 41.3311, lng: 72.9389 },
      { name: "Sulaiman-Too Osh", lat: 40.5278, lng: 72.7964 },
      { name: "Osh Bazaar", lat: 40.5333, lng: 72.8000 }
    ],
    warnings: [],
    accommodation: "Bishkek o Osh"
  }
];

/* ============================================================
   TASK 3.2 — PHRASES (Frasario)
/* ============================================================
   TASK 3.2 — PHRASES (Frasario)
   ============================================================ */

var PHRASES = [
  // ── Base ──
  { category: "base", it: "Ciao", kg: "Салам", ru: "Здравствуйте", pronunciation: "Salam / Zdra-stvuy-tye" },
  { category: "base", it: "Ciao (informale)", kg: "Салам", ru: "Привет", pronunciation: "Salam / Privyet" },
  { category: "base", it: "Buongiorno", kg: "Кутмандуу күн", ru: "Доброе утро", pronunciation: "Kut-man-duu kun / Do-bro-ye u-tro" },
  { category: "base", it: "Buonasera", kg: "Кутмандуу кеч", ru: "Добрый вечер", pronunciation: "Kut-man-duu kech / Do-bryy ve-cher" },
  { category: "base", it: "Arrivederci", kg: "Жакшы калыңыз", ru: "До свидания", pronunciation: "Jak-shy ka-ly-nyz / Da svi-da-ni-ya" },
  { category: "base", it: "Grazie", kg: "Рахмат", ru: "Спасибо", pronunciation: "Rakh-mat / Spa-si-ba" },
  { category: "base", it: "Grazie mille", kg: "Чоң рахмат", ru: "Большое спасибо", pronunciation: "Chon rakh-mat / Bol-sho-ye spa-si-ba" },
  { category: "base", it: "Prego", kg: "Эч нерсе эмес", ru: "Пожалуйста", pronunciation: "Ech ner-se e-mes / Pa-zhal-sta" },
  { category: "base", it: "Sì", kg: "Ооба", ru: "Да", pronunciation: "Oo-ba / Da" },
  { category: "base", it: "No", kg: "Жок", ru: "Нет", pronunciation: "Jok / Nyet" },
  { category: "base", it: "Per favore", kg: "Сураныч", ru: "Пожалуйста", pronunciation: "Su-ra-nych / Pa-zhal-sta" },
  { category: "base", it: "Scusa / Mi scusi", kg: "Кечиресиз", ru: "Извините", pronunciation: "Ke-chi-re-siz / Iz-vi-ni-tye" },
  { category: "base", it: "Non capisco", kg: "Түшүнбөдүм", ru: "Не понимаю", pronunciation: "Tu-shun-bo-dum / Nye pa-ni-ma-yu" },
  { category: "base", it: "Parli inglese?", kg: "Англисче сүйлөйсүзбү?", ru: "Вы говорите по-английски?", pronunciation: "An-glis-che suy-loy-suz-bu? / Vy ga-va-ri-tye pa an-gliy-ski?" },
  { category: "base", it: "Mi chiamo...", kg: "Менин атым...", ru: "Меня зовут...", pronunciation: "Me-nin a-tym... / Me-nya za-vut..." },
  { category: "base", it: "Sono italiano/a", kg: "Мен италиялыкмын", ru: "Я итальянец/итальянка", pronunciation: "Men i-ta-li-ya-lyk-myn / Ya i-tal-ya-nets" },
  { category: "base", it: "Bello", kg: "Сулуу", ru: "Красиво", pronunciation: "Su-luu / Kra-si-va" },
  { category: "base", it: "Buono", kg: "Жакшы", ru: "Хорошо", pronunciation: "Jak-shy / Kha-ra-sho" },
  { category: "base", it: "Cattivo", kg: "Жаман", ru: "Плохо", pronunciation: "Ja-man / Plo-kha" },
  { category: "base", it: "Delizioso!", kg: "Даамдуу!", ru: "Вкусно!", pronunciation: "Daam-duu! / Vkus-na!" },
  { category: "base", it: "Come stai?", kg: "Кандайсыз?", ru: "Как дела?", pronunciation: "Kan-day-syz? / Kak dye-la?" },
  { category: "base", it: "Sto bene", kg: "Жакшымын", ru: "Хорошо", pronunciation: "Jak-shy-myn / Kha-ra-sho" },

  // ── Cibo ──
  { category: "cibo", it: "Acqua", kg: "Суу", ru: "Вода", pronunciation: "Suu / Va-da" },
  { category: "cibo", it: "Cibo", kg: "Тамак", ru: "Еда", pronunciation: "Ta-mak / Ye-da" },
  { category: "cibo", it: "Pane", kg: "Нан", ru: "Хлеб", pronunciation: "Nan / Khleb" },
  { category: "cibo", it: "Tè", kg: "Чай", ru: "Чай", pronunciation: "Chay" },
  { category: "cibo", it: "Latte", kg: "Сүт", ru: "Молоко", pronunciation: "Sut / Ma-la-ko" },
  { category: "cibo", it: "Carne", kg: "Эт", ru: "Мясо", pronunciation: "Et / Mya-sa" },
  { category: "cibo", it: "Riso", kg: "Күрүч", ru: "Рис", pronunciation: "Ku-ruch / Ris" },
  { category: "cibo", it: "Verdura", kg: "Жашылча", ru: "Овощи", pronunciation: "Ja-shyl-cha / O-va-shchi" },
  { category: "cibo", it: "Frutta", kg: "Жемиш", ru: "Фрукты", pronunciation: "Je-mish / Fruk-ty" },
  { category: "cibo", it: "Il conto, per favore", kg: "Эсепти берсеңизчи", ru: "Счёт, пожалуйста", pronunciation: "E-sep-ti ber-se-niz-chi / Shchyot pa-zhal-sta" },
  { category: "cibo", it: "Senza carne", kg: "Этсиз", ru: "Без мяса", pronunciation: "Et-siz / Byez mya-sa" },
  { category: "cibo", it: "Piccante", kg: "Ачуу", ru: "Острый", pronunciation: "A-chuu / O-stryy" },
  { category: "cibo", it: "Birra", kg: "Пиво", ru: "Пиво", pronunciation: "Pi-vo" },
  { category: "cibo", it: "Kumys (latte di cavalla)", kg: "Кымыз", ru: "Кумыс", pronunciation: "Ky-myz / Ku-mys" },

  // ── Strada ──
  { category: "strada", it: "Benzina", kg: "Бензин", ru: "Бензин", pronunciation: "Ben-zin" },
  { category: "strada", it: "Strada", kg: "Жол", ru: "Дорога", pronunciation: "Jol / Da-ro-ga" },
  { category: "strada", it: "Quanto costa?", kg: "Канча?", ru: "Сколько?", pronunciation: "Kan-cha? / Skol-ka?" },
  { category: "strada", it: "Dove è...?", kg: "...кайда?", ru: "Где...?", pronunciation: "...kai-da? / Gdye?" },
  { category: "strada", it: "Quanto è lontano?", kg: "Канча алыс?", ru: "Как далеко?", pronunciation: "Kan-cha a-lys? / Kak da-lye-ko?" },
  { category: "strada", it: "La strada è aperta?", kg: "Жол ачыкпы?", ru: "Дорога открыта?", pronunciation: "Jol a-chyk-py? / Da-ro-ga at-kry-ta?" },
  { category: "strada", it: "Posso campeggiare qui?", kg: "Бул жерде тура алабызбы?", ru: "Можно здесь ночевать?", pronunciation: "Mozh-na zdyes na-che-vat?" },
  { category: "strada", it: "Destra", kg: "Оңго", ru: "Направо", pronunciation: "On-go / Na-pra-va" },
  { category: "strada", it: "Sinistra", kg: "Солго", ru: "Налево", pronunciation: "Sol-go / Na-lye-va" },
  { category: "strada", it: "Dritto", kg: "Түз", ru: "Прямо", pronunciation: "Tuz / Prya-ma" },
  { category: "strada", it: "Stop / Fermati", kg: "Токто", ru: "Стоп / Остановитесь", pronunciation: "Tok-to / Stop" },
  { category: "strada", it: "Piano / Lentamente", kg: "Жай", ru: "Медленно", pronunciation: "Jay / Myed-len-na" },
  { category: "strada", it: "Veloce", kg: "Тез", ru: "Быстро", pronunciation: "Tez / By-stra" },
  { category: "strada", it: "Stazione di servizio", kg: "Бензин куюучу жай", ru: "Заправка", pronunciation: "Ben-zin ku-yuu-chu jay / Za-prav-ka" },
  { category: "strada", it: "Gomma bucata", kg: "Дөңгөлөк жарылды", ru: "Колесо спустило", pronunciation: "Don-go-lok ja-ryl-dy / Ka-lye-so spus-ti-la" },
  { category: "strada", it: "La macchina è rotta", kg: "Машина бузулду", ru: "Машина сломалась", pronunciation: "Ma-shi-na bu-zul-du / Ma-shi-na sla-ma-las" },
  { category: "strada", it: "Passo di montagna", kg: "Ашуу", ru: "Перевал", pronunciation: "A-shuu / Pye-re-val" },
  { category: "strada", it: "Fiume", kg: "Дарыя", ru: "Река", pronunciation: "Da-ry-ya / Rye-ka" },
  { category: "strada", it: "Lago", kg: "Көл", ru: "Озеро", pronunciation: "Kol / O-zye-ra" },
  { category: "strada", it: "Montagna", kg: "Тоо", ru: "Гора", pronunciation: "Too / Ga-ra" },

  // ── Emergenza ──
  { category: "emergenza", it: "Aiuto!", kg: "Жардам!", ru: "Помогите!", pronunciation: "Jar-dam! / Pa-ma-gi-tye!" },
  { category: "emergenza", it: "Ospedale", kg: "Оорукана", ru: "Больница", pronunciation: "Oo-ru-ka-na / Bol-ni-tsa" },
  { category: "emergenza", it: "Dottore", kg: "Доктур", ru: "Врач", pronunciation: "Dok-tur / Vrach" },
  { category: "emergenza", it: "Farmacia", kg: "Дарыкана", ru: "Аптека", pronunciation: "Da-ry-ka-na / Ap-tye-ka" },
  { category: "emergenza", it: "Polizia", kg: "Милиция", ru: "Полиция", pronunciation: "Mi-li-tsi-ya / Pa-li-tsi-ya" },
  { category: "emergenza", it: "Sto male", kg: "Мен ооруп жатам", ru: "Мне плохо", pronunciation: "Men oo-rup ja-tam / Mnye plo-kha" },
  { category: "emergenza", it: "Ho mal di testa", kg: "Башым ооруйт", ru: "У меня болит голова", pronunciation: "Ba-shym oo-ruyt / U me-nya ba-lit ga-la-va" },
  { category: "emergenza", it: "Ho mal di stomaco", kg: "Ичим ооруйт", ru: "У меня болит живот", pronunciation: "I-chim oo-ruyt / U me-nya ba-lit zhi-vot" },
  { category: "emergenza", it: "Sono allergico/a a...", kg: "Менде ... аллергия бар", ru: "У меня аллергия на...", pronunciation: "Men-de ... al-ler-gi-ya bar / U me-nya al-ler-gi-ya na..." },
  { category: "emergenza", it: "Chiamate un'ambulanza!", kg: "Тез жардам чакыргыла!", ru: "Вызовите скорую!", pronunciation: "Tez jar-dam cha-kyr-gy-la! / Vy-za-vi-tye sko-ru-yu!" },
  { category: "emergenza", it: "Incidente stradale", kg: "Жол кырсыгы", ru: "ДТП / Авария", pronunciation: "Jol kyr-sy-gy / DTP / A-va-ri-ya" },
  { category: "emergenza", it: "Fuoco!", kg: "Өрт!", ru: "Пожар!", pronunciation: "Ort! / Pa-zhar!" },

  // ── Numeri ──
  { category: "numeri", it: "1", kg: "Бир", ru: "Один", pronunciation: "Bir / A-din" },
  { category: "numeri", it: "2", kg: "Эки", ru: "Два", pronunciation: "E-ki / Dva" },
  { category: "numeri", it: "3", kg: "Үч", ru: "Три", pronunciation: "Uch / Tri" },
  { category: "numeri", it: "4", kg: "Төрт", ru: "Четыре", pronunciation: "Tort / Che-ty-rye" },
  { category: "numeri", it: "5", kg: "Беш", ru: "Пять", pronunciation: "Besh / Pyat" },
  { category: "numeri", it: "6", kg: "Алты", ru: "Шесть", pronunciation: "Al-ty / Shest" },
  { category: "numeri", it: "7", kg: "Жети", ru: "Семь", pronunciation: "Je-ti / Syem" },
  { category: "numeri", it: "8", kg: "Сегиз", ru: "Восемь", pronunciation: "Se-giz / Vo-syem" },
  { category: "numeri", it: "9", kg: "Тогуз", ru: "Девять", pronunciation: "To-guz / Dye-vyat" },
  { category: "numeri", it: "10", kg: "Он", ru: "Десять", pronunciation: "On / Dye-syat" },
  { category: "numeri", it: "20", kg: "Жыйырма", ru: "Двадцать", pronunciation: "Jy-yyr-ma / Dva-tsat" },
  { category: "numeri", it: "50", kg: "Элүү", ru: "Пятьдесят", pronunciation: "E-luu / Pyat-dye-syat" },
  { category: "numeri", it: "100", kg: "Жүз", ru: "Сто", pronunciation: "Juz / Sto" },
  { category: "numeri", it: "1000", kg: "Миң", ru: "Тысяча", pronunciation: "Min / Ty-sya-cha" },

  // ── Alloggio ──
  { category: "alloggio", it: "Avete una stanza?", kg: "Бөлмөңүз барбы?", ru: "У вас есть комната?", pronunciation: "Bol-mo-nuz bar-by? / U vas yest kom-na-ta?" },
  { category: "alloggio", it: "Quanto costa per notte?", kg: "Бир түнгө канча?", ru: "Сколько за ночь?", pronunciation: "Bir tun-go kan-cha? / Skol-ka za noch?" },
  { category: "alloggio", it: "Possiamo dormire qui?", kg: "Бул жерде уктай алабызбы?", ru: "Можно здесь переночевать?", pronunciation: "Bul jer-de uk-tai a-la-byz-by? / Mozh-na zdyes pe-re-no-che-vat?" },
  { category: "alloggio", it: "Yurta", kg: "Боз үй", ru: "Юрта", pronunciation: "Boz uy / Yur-ta" },
  { category: "alloggio", it: "Doccia", kg: "Душ", ru: "Душ", pronunciation: "Dush / Dush" },
  { category: "alloggio", it: "Bagno / Toilette", kg: "Даараткана", ru: "Туалет", pronunciation: "Daa-rat-ka-na / Tu-a-lyet" },
  { category: "alloggio", it: "Coperta", kg: "Жууркан", ru: "Одеяло", pronunciation: "Juur-kan / A-dye-ya-la" },
  { category: "alloggio", it: "Acqua calda", kg: "Ысык суу", ru: "Горячая вода", pronunciation: "Y-syk suu / Ga-rya-cha-ya va-da" },

  // ── Trasporto ──
  { category: "trasporto", it: "Dov'è la stazione di servizio?", kg: "Бензин куюучу жер кайда?", ru: "Где заправка?", pronunciation: "Ben-zin ku-yuu-chu jer kai-da? / Gdye za-prav-ka?" },
  { category: "trasporto", it: "Il pieno, per favore", kg: "Толтуруңуз", ru: "Полный бак, пожалуйста", pronunciation: "Tol-tu-ru-nuz / Pol-ny bak pa-zhal-sta" },
  { category: "trasporto", it: "La macchina è rotta", kg: "Машина бузулду", ru: "Машина сломалась", pronunciation: "Ma-shi-na bu-zul-du / Ma-shi-na sla-ma-las" },
  { category: "trasporto", it: "Gomma a terra", kg: "Дөңгөлөк жарылды", ru: "Колесо спустило", pronunciation: "Don-go-lok ja-ryl-dy / Ka-lye-so spus-ti-la" },
  { category: "trasporto", it: "Meccanico", kg: "Механик", ru: "Механик", pronunciation: "Me-kha-nik" },
  { category: "trasporto", it: "Parcheggio", kg: "Токтоочу жай", ru: "Парковка", pronunciation: "Tok-too-chu jai / Par-kov-ka" },
  { category: "trasporto", it: "Taxi", kg: "Такси", ru: "Такси", pronunciation: "Tak-si" },
  { category: "trasporto", it: "Autobus", kg: "Автобус", ru: "Автобус", pronunciation: "Av-to-bus" },

  // ── Shopping ──
  { category: "shopping", it: "Troppo caro", kg: "Өтө кымбат", ru: "Слишком дорого", pronunciation: "O-to kym-bat / Slish-kam do-ra-ga" },
  { category: "shopping", it: "Sconto?", kg: "Арзандатасызбы?", ru: "Скидка?", pronunciation: "Ar-zan-da-ta-syz-by? / Skid-ka?" },
  { category: "shopping", it: "Voglio comprare...", kg: "Мен ... сатып алгым келет", ru: "Я хочу купить...", pronunciation: "Men ... sa-typ al-gym ke-let / Ya kha-chu ku-pit..." },
  { category: "shopping", it: "Mercato / Bazar", kg: "Базар", ru: "Базар / Рынок", pronunciation: "Ba-zar / Ry-nok" },
  { category: "shopping", it: "Negozio", kg: "Дүкөн", ru: "Магазин", pronunciation: "Du-kon / Ma-ga-zin" },

  // ── Socialità ──
  { category: "socialita", it: "Come ti chiami?", kg: "Атыңыз ким?", ru: "Как вас зовут?", pronunciation: "A-ty-nyz kim? / Kak vas za-vut?" },
  { category: "socialita", it: "Mi chiamo...", kg: "Менин атым...", ru: "Меня зовут...", pronunciation: "Me-nin a-tym... / Me-nya za-vut..." },
  { category: "socialita", it: "Siamo italiani", kg: "Биз италиялыкпыз", ru: "Мы итальянцы", pronunciation: "Biz i-ta-li-ya-lyk-pyz / My i-tal-yan-tsy" },
  { category: "socialita", it: "Siamo turisti", kg: "Биз туристпиз", ru: "Мы туристы", pronunciation: "Biz tu-rist-piz / My tu-ris-ty" },
  { category: "socialita", it: "Piacere!", kg: "Тааныш болгонума кубанычтамын!", ru: "Приятно познакомиться!", pronunciation: "Taa-nysh bol-go-nu-ma ku-ba-nych-ta-myn / Pri-yat-na pa-zna-ko-mit-sya" },
  { category: "socialita", it: "Posso fare una foto?", kg: "Сүрөт тартсам болобу?", ru: "Можно сфотографировать?", pronunciation: "Su-rot tart-sam bo-lo-bu? / Mozh-na sfo-to-gra-fi-ra-vat?" },
  { category: "socialita", it: "Sei molto gentile", kg: "Сиз абдан жакшы адамсыз", ru: "Вы очень добрый", pronunciation: "Siz ab-dan jak-shy a-dam-syz / Vy o-chen dob-ry" },
  { category: "socialita", it: "Arrivederci", kg: "Кош болуңуз", ru: "До свидания", pronunciation: "Kosh bo-lu-nuz / Da svi-da-ni-ya" },

  // ── Tempo ──
  { category: "tempo", it: "Oggi", kg: "Бүгүн", ru: "Сегодня", pronunciation: "Bu-gun / Se-god-nya" },
  { category: "tempo", it: "Domani", kg: "Эртең", ru: "Завтра", pronunciation: "Er-ten / Zav-tra" },
  { category: "tempo", it: "Ieri", kg: "Кечээ", ru: "Вчера", pronunciation: "Ke-chee / Vche-ra" },
  { category: "tempo", it: "Mattina", kg: "Эртең менен", ru: "Утро", pronunciation: "Er-ten me-nen / Ut-ra" },
  { category: "tempo", it: "Sera", kg: "Кечинде", ru: "Вечер", pronunciation: "Ke-chin-de / Vye-cher" },
  { category: "tempo", it: "Che ore sono?", kg: "Саат канча?", ru: "Который час?", pronunciation: "Saat kan-cha? / Ka-to-ry chas?" },

  // ── Cibo extra ──
  { category: "cibo", it: "Tè", kg: "Чай", ru: "Чай", pronunciation: "Chai" },
  { category: "cibo", it: "Pane", kg: "Нан", ru: "Хлеб", pronunciation: "Nan / Khleb" },
  { category: "cibo", it: "Carne", kg: "Эт", ru: "Мясо", pronunciation: "Et / Mya-sa" },
  { category: "cibo", it: "Latte", kg: "Сүт", ru: "Молоко", pronunciation: "Sut / Ma-la-ko" },
  { category: "cibo", it: "Frutta", kg: "Жемиш", ru: "Фрукты", pronunciation: "Je-mish / Fruk-ty" },
  { category: "cibo", it: "Verdura", kg: "Жашылча", ru: "Овощи", pronunciation: "Ja-shyl-cha / O-va-shchi" },
  { category: "cibo", it: "Il conto, per favore", kg: "Эсеп, сураныч", ru: "Счёт, пожалуйста", pronunciation: "E-sep su-ra-nych / Shchot pa-zhal-sta" },
  { category: "cibo", it: "Senza carne", kg: "Этсиз", ru: "Без мяса", pronunciation: "Et-siz / Byez mya-sa" },
  { category: "cibo", it: "Molto buono!", kg: "Абдан даамдуу!", ru: "Очень вкусно!", pronunciation: "Ab-dan daam-duu! / O-chen vkus-na!" },
  { category: "cibo", it: "Ancora uno, per favore", kg: "Дагы бирди берсеңизчи", ru: "Ещё одну, пожалуйста", pronunciation: "Da-gy bir-di ber-se-niz-chi / Ye-shcho od-nu pa-zhal-sta" },
  { category: "cibo", it: "Basta, grazie", kg: "Жетиштүү, рахмат", ru: "Достаточно, спасибо", pronunciation: "Je-tish-tuu rakh-mat / Da-sta-tach-na spa-si-ba" },
  { category: "cibo", it: "Posso assaggiare?", kg: "Татып көрсөм болобу?", ru: "Можно попробовать?", pronunciation: "Ta-typ kor-som bo-lo-bu? / Mozh-na pa-pro-ba-vat?" },
  { category: "cibo", it: "Cos'è questo piatto?", kg: "Бул эмне тамак?", ru: "Что это за блюдо?", pronunciation: "Bul em-ne ta-mak? / Shto e-ta za blyu-da?" },

  // ── Richieste di aiuto / cortesia ──
  { category: "base", it: "Potete aiutarci?", kg: "Бизге жардам бере аласызбы?", ru: "Вы можете нам помочь?", pronunciation: "Biz-ge jar-dam be-re a-la-syz-by? / Vy mo-zhe-tye nam pa-moch?" },
  { category: "base", it: "Ci potete dare una mano?", kg: "Колуңузду берсеңизчи?", ru: "Не могли бы вы помочь?", pronunciation: "Ko-lu-nuz-du ber-se-niz-chi? / Nye mag-li by vy pa-moch?" },
  { category: "base", it: "Scusate / Mi scusi", kg: "Кечиресиз", ru: "Извините", pronunciation: "Ke-chi-re-siz / Iz-vi-ni-tye" },
  { category: "base", it: "Nessun problema", kg: "Эч нерсе эмес", ru: "Ничего страшного", pronunciation: "Ech ner-se e-mes / Ni-che-vo strash-na-va" },
  { category: "base", it: "Va bene / OK", kg: "Жакшы / Макул", ru: "Хорошо / Ладно", pronunciation: "Jak-shy / Ma-kul / Kha-ra-sho / Lad-na" },
  { category: "base", it: "Aspetta un momento", kg: "Бир аз күтүңүз", ru: "Подождите минутку", pronunciation: "Bir az ku-tu-nuz / Pa-da-zhdi-tye mi-nut-ku" },
  { category: "base", it: "Parlo solo inglese", kg: "Мен англисче гана сүйлөйм", ru: "Я говорю только по-английски", pronunciation: "Men an-glis-che ga-na suy-loym / Ya ga-va-ryu tol-ka pa-an-gliy-ski" },
  { category: "base", it: "Puoi parlare più lentamente?", kg: "Жайыраак сүйлөсөңүз болобу?", ru: "Можете говорить медленнее?", pronunciation: "Jai-y-raak suy-lo-so-nuz bo-lo-bu? / Mo-zhe-tye ga-va-rit myed-lyen-nye-ye?" },
  { category: "base", it: "Puoi scriverlo?", kg: "Жазып берсеңизчи?", ru: "Можете написать?", pronunciation: "Ja-zyp ber-se-niz-chi? / Mo-zhe-tye na-pi-sat?" },
  { category: "base", it: "Molto gentile, grazie!", kg: "Абдан жакшы, рахмат!", ru: "Очень любезно, спасибо!", pronunciation: "Ab-dan jak-shy rakh-mat! / O-chen lyu-byez-na spa-si-ba!" },
  { category: "base", it: "Fantastico!", kg: "Мыкты!", ru: "Отлично!", pronunciation: "Myk-ty! / At-lich-na!" },
  { category: "base", it: "Incredibile!", kg: "Укмуш!", ru: "Невероятно!", pronunciation: "Uk-mush! / Nye-ve-ra-yat-na!" },

  // ── Direzioni ──
  { category: "strada", it: "A destra", kg: "Оңго", ru: "Направо", pronunciation: "On-go / Na-pra-va" },
  { category: "strada", it: "A sinistra", kg: "Солго", ru: "Налево", pronunciation: "Sol-go / Na-lye-va" },
  { category: "strada", it: "Dritto", kg: "Түз", ru: "Прямо", pronunciation: "Tuz / Prya-ma" },
  { category: "strada", it: "Torna indietro", kg: "Артка кайт", ru: "Назад", pronunciation: "Art-ka kait / Na-zad" },
  { category: "strada", it: "Vicino", kg: "Жакын", ru: "Близко", pronunciation: "Ja-kyn / Bliz-ka" },
  { category: "strada", it: "Lontano", kg: "Алыс", ru: "Далеко", pronunciation: "A-lys / Da-lye-ko" },

  // ── Sopravvivenza ──
  { category: "sopravvivenza", it: "Asciutto", kg: "Кургак", ru: "Сухой", pronunciation: "Kur-gak / Su-khoy" },
  { category: "sopravvivenza", it: "Bagnato", kg: "Нымдуу", ru: "Мокрый", pronunciation: "Nym-duu / Mo-kry" },
  { category: "sopravvivenza", it: "Fuoco", kg: "От", ru: "Огонь", pronunciation: "Ot / A-gon" },
  { category: "sopravvivenza", it: "Legna", kg: "Отун", ru: "Дрова", pronunciation: "O-tun / Dra-va" },
  { category: "sopravvivenza", it: "Freddo", kg: "Суук", ru: "Холодно", pronunciation: "Suu-k / Kho-lod-na" },
  { category: "sopravvivenza", it: "Caldo", kg: "Ысык", ru: "Жарко", pronunciation: "Y-syk / Zhar-ka" },
  { category: "sopravvivenza", it: "Passaggio (autostop)", kg: "Мени алып кетиңизчи", ru: "Подвезите, пожалуйста", pronunciation: "Me-ni a-lyp ke-ti-niz-chi / Pod-ve-zi-tye pa-zhal-sta" },
  { category: "sopravvivenza", it: "Dove vai?", kg: "Кайда барасыз?", ru: "Куда едете?", pronunciation: "Kai-da ba-ra-syz? / Ku-da ye-dye-tye?" },
  { category: "sopravvivenza", it: "Posso venire con voi?", kg: "Силер менен бара алабызбы?", ru: "Можно с вами?", pronunciation: "Si-ler me-nen ba-ra a-la-byz-by? / Mozh-na s va-mi?" },
  { category: "sopravvivenza", it: "Quanto vuoi?", kg: "Канча сурайсыз?", ru: "Сколько хотите?", pronunciation: "Kan-cha su-ray-syz? / Skol-ka kha-ti-tye?" },

  // ── Benzina ──
  { category: "benzina", it: "Dov'è il benzinaio più vicino?", kg: "Жакынкы бензин куюучу жер кайда?", ru: "Где ближайшая заправка?", pronunciation: "Ja-kyn-ky ben-zin ku-yuu-chu jer kai-da? / Gdye bli-zhay-sha-ya za-prav-ka?" },
  { category: "benzina", it: "Dove posso fare benzina?", kg: "Кайда бензин куям?", ru: "Где можно заправиться?", pronunciation: "Kai-da ben-zin ku-yam? / Gdye mozh-na za-pra-vit-sya?" },
  { category: "benzina", it: "Il pieno, per favore", kg: "Толтуруңуз", ru: "Полный бак, пожалуйста", pronunciation: "Tol-tu-ru-nuz / Pol-ny bak pa-zhal-sta" },
  { category: "benzina", it: "Quanto manca alla prossima benzina?", kg: "Кийинки бензин куюучу жерге канча калды?", ru: "Сколько до следующей заправки?", pronunciation: "Ki-yin-ki ben-zin jer-ge kan-cha kal-dy? / Skol-ka da slye-du-yu-shchey za-prav-ki?" },
  { category: "benzina", it: "AI-95 per favore", kg: "АИ-95, сураныч", ru: "АИ-95, пожалуйста", pronunciation: "A-I dye-vya-no-sta pyat, su-ra-nych / pa-zhal-sta" },
  { category: "benzina", it: "Quanti litri?", kg: "Канча литр?", ru: "Сколько литров?", pronunciation: "Kan-cha litr? / Skol-ka lit-rov?" },
  { category: "benzina", it: "La benzina è finita", kg: "Бензин бүттү", ru: "Бензин закончился", pronunciation: "Ben-zin but-tu / Ben-zin za-kon-chil-sya" },

  // ── Parolacce 🤬 ──
  { category: "parolacce", it: "Cazzo!", kg: "Тиги!", ru: "Блядь!", pronunciation: "Ti-gi! / Blyad!" },
  { category: "parolacce", it: "Merda!", kg: "Бок!", ru: "Дерьмо!", pronunciation: "Bok! / Dyer-mo!" },
  { category: "parolacce", it: "Vaffanculo!", kg: "Башыңа тий!", ru: "Пошёл нахуй!", pronunciation: "Ba-shy-na tiy! / Pa-shol na-khuy!" },
  { category: "parolacce", it: "Figlio di puttana", kg: "Канжалак", ru: "Сукин сын", pronunciation: "Kan-zha-lak / Su-kin syn" },
  { category: "parolacce", it: "Stronzo", kg: "Бокмурун", ru: "Мудак", pronunciation: "Bok-mu-run / Mu-dak" },
  { category: "parolacce", it: "Idiota", kg: "Акмак", ru: "Дурак / Идиот", pronunciation: "Ak-mak / Du-rak" },
  { category: "parolacce", it: "Sei ubriaco?", kg: "Мас болдуңбу?", ru: "Ты пьяный?", pronunciation: "Mas bol-dun-bu? / Ty pya-ny?" },
  { category: "parolacce", it: "Non rompere le palle", kg: "Тынч кой!", ru: "Не доставай!", pronunciation: "Tynch koy! / Nye da-sta-vay!" },
  { category: "parolacce", it: "Che cazzo fai?", kg: "Эмне кылып жатасың?!", ru: "Какого хрена?!", pronunciation: "Em-ne ky-lyp zha-ta-syn?! / Ka-ko-va khre-na?!" },
  { category: "parolacce", it: "Fottiti", kg: "Өлүп кет!", ru: "Иди нахуй!", pronunciation: "O-lup ket! / I-di na-khuy!" },
  { category: "parolacce", it: "Bastardo", kg: "Харамзаада", ru: "Ублюдок", pronunciation: "Kha-ram-zaa-da / Ub-lyu-dok" },
  { category: "parolacce", it: "Coglione", kg: "Жинди", ru: "Долбоёб", pronunciation: "Zhin-di / Dol-bo-yob" }
];


/* ============================================================
   TASK 3.3 — CHECKLIST (Equipaggiamento per categoria)
   ============================================================ */

var CHECKLIST = {
  auto: [
    "Gomma di scorta full-size (controllare pressione)",
    "Cric + chiave a croce (TESTARE)",
    "Kit attrezzi base",
    "Corda traino (min 5 tonnellate) ~500 KGS",
    "Tanica 10L benzina ~500 KGS",
    "Compressore 12V gomme ~1,500 KGS",
    "Manometro pressione gomme ~200 KGS",
    "Kit riparazione gomme (plug) ~300 KGS",
    "Jump starter o cavi batteria ~2,000 KGS",
    "Fascette assortite ~100 KGS",
    "Nastro adesivo americano ~200 KGS",
    "WD-40 ~300 KGS",
    "Olio motore extra 1L ~500 KGS",
    "Fusibili assortiti Subaru ~200 KGS",
    "Pala pieghevole militare ~800 KGS",
    "2x contenitori acqua 5L ~300 KGS",
    "Parasole parabrezza ~300 KGS",
    "Supporto telefono auto ~500 KGS"
  ],
  dormire: [
    "2x sacchi a pelo (comfort -5°C MINIMO)",
    "2x materassini / materassi gonfiabili",
    "2x cuscini da viaggio compatti",
    "2x bivvy bag emergenza (riflettenti)",
    "2x liner sacco a pelo (seta/cotone)",
    "Telo 3x3m",
    "Paracord 10m"
  ],
  cucina: [
    "Fornello a gas compatto (MSR PocketRocket o simile)",
    "Cartucce gas x3-4 (comprare SOLO a Bishkek)",
    "Set pentola + padella piccoli",
    "2x ciotole, spork, tazze",
    "Coltello affilato",
    "Accendino + fiammiferi impermeabili",
    "Purificazione acqua (filtro Sawyer o pastiglie)",
    "Thermos 1L",
    "Borsa termica morbida",
    "Sacchetti ziplock (varie misure)",
    "Sacchetti spazzatura (LEAVE NO TRACE)"
  ],
  vestiti: [
    "Base layer top x2 (lana merino o sintetico)",
    "Base layer bottoms x1",
    "Fleece midlayer x1",
    "Piumino/giacca sintetica x1",
    "Giacca impermeabile shell (Gore-Tex o simile)",
    "Pantaloni impermeabili leggeri",
    "Pantaloni trekking x2 (zip-off consigliati)",
    "Pantaloncini x1",
    "T-shirt x3-4",
    "Intimo x5-6 (lana merino)",
    "Calze trekking x4 (misto lana)",
    "Camicia maniche lunghe leggera",
    "Costume da bagno",
    "Berretto caldo / beanie",
    "Cappello da sole",
    "Buff / scaldacollo",
    "Guanti leggeri caldi",
    "Occhiali da sole UV400 polarizzati",
    "Scarponi trekking (rodati, impermeabili)",
    "Sandali / infradito"
  ],
  salute: [
    "Bende, garza, cerotto medico",
    "Salviette/spray antisettiche",
    "Cerotti vesciche (Compeed)",
    "Ibuprofene + Paracetamolo",
    "Antidiarroico (Imodium)",
    "Sali reidratazione orale",
    "Antistaminici",
    "Pinzette (rimozione zecche)",
    "Forbici",
    "Spille da balia",
    "Fascia elastica (distorsioni)",
    "Diamox (Acetazolamide)",
    "Antibiotico ad ampio spettro",
    "Medicinali personali (scorta extra)",
    "Crema solare SPF 50+",
    "Balsamo labbra con SPF",
    "Repellente insetti (DEET)",
    "Gel igienizzante mani",
    "Carta igienica",
    "Salviette umidificate"
  ],
  tech: [
    "Smartphone x2",
    "SIM O! (Nur Telecom)",
    "SIM Beeline (backup)",
    "Power bank x2 (20,000 mAh)",
    "Caricatore auto 12V dual-USB",
    "Cavo USB multi-uscita",
    "Telefono Nokia emergenza (~1,000-2,000 KGS)",
    "Supporto telefono auto"
  ],
  foto: [
    "Fotocamera + obiettivi",
    "DJI Mini 2",
    "Batterie drone x3 minimo",
    "Filtri ND drone (ND16, ND32)",
    "Treppiede da viaggio compatto",
    "Kit pulizia obiettivi",
    "Dry bags / sacchetti ziplock",
    "Schede memoria x3-4",
    "Hard drive o laptop per backup"
  ],
  varie: [
    "Lampada frontale x2 (+ batterie extra)",
    "Multi-tool / coltellino svizzero",
    "Filo stendipanni + mollette",
    "Asciugamano microfibra x2",
    "Tappi orecchie + mascherina dormire",
    "Taccuino + penna",
    "Zaino pieghevole 20-25L",
    "Bastoncini trekking",
    "Binocolo compatto",
    "Carte da gioco / giochi viaggio",
    "Lucchetto piccolo",
    "Rete anti-zanzare per la testa"
  ],
  regali: [
    "Cioccolato italiano (Baci, Ferrero)",
    "Cartoline della propria città",
    "Piccoli souvenir italiani",
    "Foto famiglia/città da mostrare",
    "Penne/quaderni per bambini"
  ]
};


/* ============================================================
   TASK 3.4 — WAYPOINTS (GPS + Drone spots)
   ============================================================ */

var WAYPOINTS = [
  // ── POI / Trailhead waypoints ─────────────────────────────
  { day: 1,  type: "poi",       name: "Aeroporto Manas (BSZ)",       lat: 43.0553, lng: 74.4776 },
  { day: 1,  type: "poi",       name: "Osh Bazaar Bishkek",         lat: 42.8700, lng: 74.5900 },
  { day: 1,  type: "poi",       name: "Piazza Ala-Too",             lat: 42.8746, lng: 74.5698 },
  { day: 2,  type: "trailhead", name: "Ala-Archa NP",               lat: 42.6464, lng: 74.4847 },
  { day: 2,  type: "poi",       name: "Burana Tower",               lat: 42.7472, lng: 75.2503 },
  { day: 3,  type: "trailhead", name: "Villaggio Jyrgalan",         lat: 42.8186, lng: 79.2094 },
  { day: 4,  type: "trailhead", name: "Trailhead Altyn-Arashan",    lat: 42.6592, lng: 78.5261 },
  { day: 5,  type: "poi",       name: "Fairy Tale Canyon (Skazka)", lat: 42.3847, lng: 77.2575 },
  { day: 5,  type: "poi",       name: "CBT Bokonbayevo",            lat: 42.1208, lng: 76.9900 },
  { day: 6,  type: "poi",       name: "CBT Kochkor",                lat: 42.0133, lng: 75.7592 },
  { day: 6,  type: "poi",       name: "Son-Kul (accesso nord)",     lat: 41.8333, lng: 75.1500 },
  { day: 8,  type: "poi",       name: "Tash Rabat",                 lat: 40.8453, lng: 75.2847 },
  { day: 9,  type: "poi",       name: "Kel-Suu",                    lat: 40.5811, lng: 75.0742 },
  { day: 11, type: "poi",       name: "CBT Arslanbob",              lat: 41.3311, lng: 72.9389 },
  { day: 13, type: "poi",       name: "Sulaiman-Too Osh",           lat: 40.5278, lng: 72.7964 },
  { day: 14, type: "poi",       name: "Confine Dostuk",             lat: 40.5167, lng: 72.6333 },

  // ── Drone spots ───────────────────────────────────────────
  { day: 9,  type: "drone", name: "🥇 Kel-Suu (canyon + turchese)",    lat: 40.5811, lng: 75.0742 },
  { day: 7,  type: "drone", name: "🥇 Son-Kul (yurte, mandrie, lago)", lat: 41.8333, lng: 75.1500 },
  { day: 5,  type: "drone", name: "🥈 Fairy Tale Canyon",              lat: 42.3847, lng: 77.2575 },
  { day: 3,  type: "drone", name: "🥈 Jyrgalan Valley",                lat: 42.8186, lng: 79.2094 },
  { day: 5,  type: "drone", name: "🥉 Barskoon Valley",                lat: 42.1500, lng: 77.6000 },
  { day: 8,  type: "drone", name: "🥉 Tash Rabat",                     lat: 40.8453, lng: 75.2847 },
  { day: 15, type: "drone", name: "🥉 Toktogul Reservoir",             lat: 41.7500, lng: 72.9500 }
];


/* ============================================================
   TASK 3.5 — Costanti aggiuntive
   ============================================================ */

/* ---- Contatti di emergenza ---- */

var EMERGENCY_CONTACTS = [
  { name: "Emergenza Kirghizistan", number: "112" },
  { name: "Polizia Kirghizistan", number: "102" },
  { name: "Ambulanza Kirghizistan", number: "103" },
  { name: "Vigili del Fuoco Kirghizistan", number: "101" },
  { name: "Russian Troika (eng/рус)", number: "+996558388321" },
  { name: "Russian Troika (WhatsApp eng/kyrg)", number: "+996550634422" },
  { name: "Russian Troika (3)", number: "+996550108739" },
  { name: "Russian Troika Email", number: "sergeykg@gmail.com" },
  { name: "Ambasciata Italiana (Nur-Sultan, copre KG)", number: "+77172910107" },
  { name: "Farnesina Unità di Crisi", number: "+390636225" },
  { name: "Emergenza Uzbekistan", number: "101" }
];

var EMERGENCY_CONTACTS = [
  { name: "Emergenza Kirghizistan", number: "112" },
  { name: "Polizia Kirghizistan", number: "102" },
  { name: "Ambulanza Kirghizistan", number: "103" },
  { name: "Vigili del Fuoco Kirghizistan", number: "101" },
  { name: "Russian Troika (noleggio auto)", number: "Da ottenere" },
  { name: "Ambasciata Italiana (Nur-Sultan, copre KG)", number: "+77172910107" },
  { name: "Farnesina Unità di Crisi", number: "+390636225" },
  { name: "Emergenza Uzbekistan", number: "101" }
];

/* ---- Informazioni Drone ---- */

var DRONE_INFO = {
  regolamenti: [
    "⚠️ NUOVA LEGGE 2026: dal 1° gennaio 2026 il Kirghizistan ha introdotto regolamentazione obbligatoria per UAV — non è più \"non regolamentato\".",
    "📋 La nuova legge richiede registrazione del drone presso la State Civil Aviation Agency (SCAA) e autorizzazione (one-time o annuale).",
    "❓ Per turisti stranieri con drone <250g (DJI Mini 2): la procedura per visitatori NON è ancora chiara. Contatta la SCAA prima del viaggio per chiedere conferma.",
    "📧 Contatto SCAA — UAV Sector: iskenderumetbaev@gmail.com — Tel: +996 (312) 25 17 51",
    "📄 Sito ufficiale + PDF regolamento: caa.kg/en/activity/general-aviation-and-uas-sector-uav",
    "🟡 Importazione: dichiarare il drone in dogana all'arrivo (modulo doganale obbligatorio per oggetti di valore). Conservare la dichiarazione fino all'uscita.",
    "🔴 Vietato volo: città, edifici governativi, basi militari, aeroporti (5 km), zone confine (Cina, Tagikistan, Uzbekistan)",
    "🔴 Kel-Suu, Sary-Jaz, Inylchek: zona confine cinese — chiedere prima alla guida, anche con autorizzazione",
    "Altitudine massima consigliata: 120m AGL",
    "Non volare sopra persone, yurte o villaggi senza permesso",
    "Portare batterie di scorta (il freddo riduce l'autonomia fino al 30%)",
    "🟢 Fonte primaria: Times of Central Asia (17/02/2026) e SCAA. ⚠️ La scheda Farnesina (20/03/2026) e drone-laws.com NON sono aggiornati."
  ],
  noFlyZones: [
    "Aeroporto Manas BSZ (Bishkek) — raggio 5km",
    "Aeroporto Osh — raggio 5km",
    "Centri città (Bishkek, Karakol, Naryn, Osh) — divieto generale",
    "Edifici governativi e basi militari (non sempre segnalate)",
    "Zone di confine — Cina (Kel-Suu, Sary-Jaz, Inylchek), Uzbekistan, Tagikistan",
    "Kel-Suu: zona di confine cinese — necessita autorizzazione + chiedere alla guida"
  ],
  bestSpots: [
    { rank: "🥇", name: "Son-Kul Lake",         day: 7,  description: "Yurte, mandrie, lago a 3.000m — luce alba/tramonto. Spot più iconico per drone in KG." },
    { rank: "🥇", name: "Kel-Suu Lake",         day: 9,  description: "Canyon + lago turchese, paesaggio alpino unico. ⚠️ Zona confine — distanza dal sud." },
    { rank: "🥈", name: "Karakol Gorge",        day: 3,  description: "Gola spettacolare vicino Karakol. Pareti verticali, fiume tra le montagne." },
    { rank: "🥈", name: "Barskoon Waterfall",   day: 5,  description: "Cascata + gola, accesso libero. Volo basso tra le pareti." },
    { rank: "🥈", name: "Ak-Say Canyon",        day: 5,  description: "Canyon direttamente sul lago Issyk-Kul. Spettacolare al golden hour." },
    { rank: "🥈", name: "Fairy Tale Canyon",    day: 5,  description: "Formazioni rocciose rosse, contrasto con lago Issyk-Kul. Tramonto top." },
    { rank: "🥈", name: "Eshenkul Lake",        day: 7,  description: "Lago alpino off-the-beaten-path zona Naryn. Pochissimi turisti." },
    { rank: "🥈", name: "Arstanbap (Arslanbob)",day: 14, description: "Foresta di noci più grande al mondo + cascate. Hike + drone foliage." },
    { rank: "🥈", name: "Tulpar Kol",           day: 10, description: "Lago alpino zona Pamir-Alay (sud), accampamento alpinisti, vista su Pik Lenin." },
    { rank: "🥉", name: "Jyrgalan Valley",      day: 3,  description: "Valle verde con montagne innevate. Trail multipli." },
    { rank: "🥉", name: "Tash Rabat",           day: 8,  description: "Caravanserraglio isolato in valle verde. Atmosfera Via della Seta." },
    { rank: "🥉", name: "Toktogul Reservoir",   day: 15, description: "Lago artificiale tra montagne." }
  ],
  altitudeTips: [
    "Sopra 3.000m le batterie si scaricano più velocemente (fino al 30% in meno)",
    "Il freddo riduce ulteriormente l'autonomia — tenere le batterie al caldo nel giubbotto",
    "L'aria rarefatta riduce la portanza — il drone consuma più energia per hovering",
    "Usare filtri ND (ND16/ND32) per la luce intensa ad alta quota",
    "Attenzione ai venti improvvisi in quota — controllare prima di decollare",
    "A Son-Kul e Kel-Suu (3.000-3.500m) prevedere voli più brevi"
  ],
  topPlaces: [
    { rank: 1, name: "Song-Kul Lake",   desc: "Dormire in yurta, cavalcare nei pascoli infiniti, vita nomade autentica." },
    { rank: 2, name: "Kel-Suu Lake",    desc: "Lago alpino nascosto tra scogliere drammatiche. Tra i posti più mozzafiato dell'Asia Centrale." },
    { rank: 3, name: "Altyn Arashan",   desc: "Sorgenti termali, viste sul Tian Shan, trekking spettacolari." },
    { rank: 4, name: "Jeti-Oguz",       desc: "Formazioni rocciose rosse, valli verdi, cascate. Perfetto per fotografia." },
    { rank: 5, name: "Issyk-Kul Lake",  desc: "Secondo lago alpino più grande al mondo. Spiagge, canyon, cacciatori d'aquile, tramonti." }
  ],
  stargazingSpots: [
    { name: "Kel-Suu Lake",     region: "Naryn",     note: "Zero inquinamento luminoso, 3.500m. Top assoluto." },
    { name: "Tash-Rabat",       region: "Naryn",     note: "Caravanserraglio in valle remota, cielo stellato leggendario." },
    { name: "Altyn-Arashan",    region: "Issyk-Kul", note: "Hot springs di notte sotto le stelle." },
    { name: "Ala-Kul Lake",     region: "Issyk-Kul", note: "3.900m, dopo trek di 2-3 giorni. Stelle epiche." },
    { name: "Song-Kul Lake",    region: "Naryn",     note: "Dalle yurte, cielo aperto a 360°. Notti fredde." },
    { name: "Kok-Kiya Valley",  region: "Naryn",     note: "Off-the-beaten-track, valle isolata zona Naryn." }
  ],
  topYurtStays: [
    { rank: 1, name: "Kok-Kiya Valley", note: "Off-the-beaten-track. Valle isolata, esperienza autentica." },
    { rank: 2, name: "Kol-Ukok Lake",   note: "Lago alpino, raggiungibile a cavallo da Kochkor." },
    { rank: 3, name: "Song-Kul Lake",   note: "Il classico. Yurta camp diversi tra cui scegliere (Jyrgal, Nomads Dream)." },
    { rank: 4, name: "Kilemche Valley", note: "Valle remota tra Kochkor e Song-Kul." },
    { rank: 5, name: "Kel-Suu Lake",    note: "Yurta camp prima del lago. ⚠️ Permesso confine obbligatorio." }
  ]
};

/* ---- Dati Altitudine ---- */

var ALTITUDE_DATA = [
  { day: 1,  location: "Bishkek",                    altitude: 800,   risk: "nessuno" },
  { day: 2,  location: "Ala-Archa (hike)",            altitude: 2300,  risk: "basso" },
  { day: 2,  location: "Karakol",                     altitude: 1770,  risk: "nessuno" },
  { day: 3,  location: "Jyrgalan Valley",             altitude: 2200,  risk: "basso" },
  { day: 4,  location: "Altyn-Arashan",               altitude: 2600,  risk: "basso" },
  { day: 5,  location: "Sponda sud Issyk-Kul",        altitude: 1600,  risk: "nessuno" },
  { day: 6,  location: "Son-Kul Pass",                altitude: 3500,  risk: "moderato" },
  { day: 6,  location: "Son-Kul Lake",                altitude: 3016,  risk: "moderato" },
  { day: 7,  location: "Son-Kul Lake",                altitude: 3016,  risk: "moderato" },
  { day: 8,  location: "Tash Rabat",                  altitude: 3200,  risk: "moderato" },
  { day: 9,  location: "Kel-Suu",                     altitude: 3500,  risk: "alto" },
  { day: 10, location: "Passi At-Bashy → Kazarman",   altitude: 3300,  risk: "moderato" },
  { day: 10, location: "Kazarman",                    altitude: 1230,  risk: "nessuno" },
  { day: 11, location: "Arslanbob",                   altitude: 1500,  risk: "nessuno" },
  { day: 12, location: "Arslanbob",                   altitude: 1500,  risk: "nessuno" },
  { day: 13, location: "Osh",                         altitude: 1000,  risk: "nessuno" },
  { day: 14, location: "Fergana Valley (Uzbekistan)",  altitude: 500,   risk: "nessuno" },
  { day: 15, location: "Too-Ashuu Pass",              altitude: 3150,  risk: "moderato" },
  { day: 15, location: "Bishkek",                     altitude: 800,   risk: "nessuno" }
];


/* ---- Informazioni Generali ---- */

var GENERAL_INFO = {
  documenti: [
    "Passaporto (validità minimo 6 mesi dalla data di ingresso)",
    "Kirghizistan: NO visto per cittadini italiani (fino a 60 giorni)",
    "Uzbekistan: NO visto per cittadini italiani (fino a 30 giorni) — verificare aggiornamenti",
    "Patente internazionale (Convenzione di Vienna 1968)",
    "Assicurazione viaggio con copertura medica e evacuazione",
    "Copie digitali di tutti i documenti (email + cloud)",
    "Fototessere extra (per permessi zona di confine)",
    "Permesso zona di confine per Kel-Suu (organizzare tramite CBT o agenzia)"
  ],
  veicolo: {
    modello: "Subaru Outback 2018",
    noleggio: "Russian Troika (Bishkek)",
    ritiro: "Giorno 2 (31 maggio) — pomeriggio",
    restituzione: "Giorno 15 (13 giugno)",
    carburante: "Benzina (AI-92 o AI-95)",
    note: [
      "AWD (trazione integrale) — adatto a strade sterrate",
      "Altezza da terra sufficiente per la maggior parte delle strade",
      "NON adatto per Kel-Suu (guadi profondi) — noleggiare UAZ",
      "Controllare: gomme, olio, liquido raffreddamento, freni prima di partire",
      "Pressione gomme: ridurre leggermente su sterrato (2.0-2.2 bar)",
      "Tenere sempre almeno mezzo serbatoio"
    ]
  },
  soldi: [
    "Valuta: Som kirghizo (KGS). 1 EUR ≈ 97 KGS",
    "ATM disponibili: Bishkek, Karakol, Kochkor, Naryn, Osh",
    "ULTIMO ATM prima di Osh: Naryn (Giorno 8)",
    "Contanti necessari: prelevare abbastanza a Naryn per 5+ giorni",
    "Carte accettate solo in città grandi e hotel",
    "Cambiare EUR/USD in KGS a Bishkek (tassi migliori)",
    "Per Uzbekistan: cambiare al confine o a Margilan (1 EUR ≈ 13,500 UZS)",
    "Budget stimato: €1,200 totali per 2 persone / 15 giorni (~€40/giorno/persona)"
  ],
  appConsigliate: [
    { nome: "Maps.me", descrizione: "Mappe offline ESSENZIALE — scaricare mappa Kirghizistan + Uzbekistan" },
    { nome: "Organic Maps", descrizione: "Alternativa open-source a Maps.me" },
    { nome: "2GIS", descrizione: "Mappe dettagliate città kirghize (Bishkek, Osh, Karakol)" },
    { nome: "Google Translate", descrizione: "Scaricare pacchetto offline russo + kirghizo" },
    { nome: "Windy", descrizione: "Meteo e vento per pianificare voli drone" },
    { nome: "Strava / AllTrails", descrizione: "Tracce hiking offline" },
    { nome: "iOverlander", descrizione: "Punti campeggio, benzina, acqua (community)" },
    { nome: "Caravanistan", descrizione: "Info aggiornate su confini e permessi Asia Centrale" }
  ],
  shoppingBishkek: [
    "SIM card O! (Nur Telecom) — aeroporto o centro (~500 KGS per 10GB)",
    "SIM card Beeline (backup) — centro Bishkek",
    "Cartucce gas per fornello (SOLO a Bishkek — non disponibili altrove)",
    "Tanica benzina 10L — Osh Bazaar (~500 KGS)",
    "Compressore 12V — Osh Bazaar (~1,500 KGS)",
    "Corda traino — Osh Bazaar (~500 KGS)",
    "Scorte cibo: frutta secca, noci, cioccolato, biscotti, noodles istantanei",
    "Acqua: 2x bottiglie 5L",
    "Telefono Nokia emergenza — Osh Bazaar (~1,000-2,000 KGS)"
  ]
};

/* ---- Tassi di Cambio ---- */

var EXCHANGE_RATES = {
  KGS_PER_EUR: 97,
  UZS_PER_EUR: 13500,
  KGS_PER_USD: 89
};

/* ---- Dati Noleggio Russian Troika (dal contratto) ---- */

var RENTAL_INFO = {
  ordine: "N 50023209",
  auto: "Subaru Outback 2018 (Gray 957)",
  noleggio: "Russian Troika — LLC Yaros Group",
  indirizzo: "Kyrgyzstan, district of GES2, Chernyshevskiy st. 65",
  telefoni: [
    { label: "Tel1 (eng/рус)", number: "+996558388321" },
    { label: "Tel2 (WhatsApp eng/kyrg)", number: "+996550634422" },
    { label: "Tel3", number: "+996550108739" }
  ],
  email: "sergeykg@gmail.com",
  sito: "www.avtoprokat.kg",
  periodo: { inizio: "31.05.2026 ore 9:00", fine: "13.06.2026 ore 9:00", giorni: 13 },
  costo: { perGiorno: 5900, totaleNoleggio: 76700, valuta: "KGS", totaleConServizi: 77800 },
  deposito: { importo: 500, valuta: "USD", nota: "Rimborsato alla restituzione del veicolo" },
  limiteKm: { limite: 3900, costoExtra: 20, unitaExtra: "KGS/km" },
  carburante: "Benzina 92/95 SOLO",
  restituzione: "Pulita + serbatoio pieno (altrimenti: lavaggio 300 KGS, serbatoio vuoto 4000 KGS, lavaggio a secco 2500 KGS)",
  etaGuida: "23-65 anni, esperienza guida > 1.5 anni",
  soloKirghizistan: true,
  noSubaffitto: true,
  serviziInclusi: [
    { nome: "Ritiro in ufficio", prezzo: "Gratis" },
    { nome: "Riconsegna in ufficio", prezzo: "Gratis" },
    { nome: "2x SIM card internet 4 settimane", prezzo: "1,100 KGS (550 x2)" },
    { nome: "Mappa stradale Kirghizistan/Bishkek", prezzo: "Gratis" },
    { nome: "Mappa stradale Kirghizistan/Issyk-Kul", prezzo: "Gratis" },
    { nome: "Guida Kirghizistan", prezzo: "Gratis" }
  ],
  serviziDisponibili: [
    { nome: "Corda traino 3m", prezzo: "100 KGS" },
    { nome: "Cavi batteria", prezzo: "100 KGS" },
    { nome: "Catene da neve (2 gomme)", prezzo: "100 KGS" },
    { nome: "Tanica benzina 20L", prezzo: "300 KGS" },
    { nome: "Fornello a gas Kovea", prezzo: "200 KGS" },
    { nome: "Sedia pieghevole", prezzo: "500 KGS" },
    { nome: "Bombola gas Kovea 230gr", prezzo: "700 KGS" },
    { nome: "Tavolo pieghevole", prezzo: "1,000 KGS" },
    { nome: "Compressore + batteria extra", prezzo: "2,000 KGS" },
    { nome: "Set cucina turista 12 pezzi", prezzo: "2,000 KGS" },
    { nome: "Tenda da tetto per 2", prezzo: "26,000 KGS" },
    { nome: "Wi-Fi in auto (4G illimitato)", prezzo: "1,650 KGS" },
    { nome: "Modem Starlink", prezzo: "32,500 KGS" },
    { nome: "Assicurazione extra (21-75 anni)", prezzo: "4,000 KGS" },
    { nome: "Bici elettrica pieghevole", prezzo: "6,500 KGS" },
    { nome: "2 bici + portabici", prezzo: "10,400 KGS" }
  ],
  serviziDisponibili: {
    firstHelp: [
      { nome: "Corda traino 3m", prezzo: "100 KGS ($1.1)", perPeriodo: true },
      { nome: "Cavi batteria (avviamento)", prezzo: "100 KGS ($1.1)", perPeriodo: true },
      { nome: "Catene da neve (2 gomme)", prezzo: "100 KGS ($1.1)", perPeriodo: true },
      { nome: "Tanica benzina 20L", prezzo: "300 KGS ($3.4)", perPeriodo: false },
      { nome: "Seggiolino bambini 1-3 anni", prezzo: "500 KGS ($5.7)", perPeriodo: false },
      { nome: "Rialzo bambini 4-6 anni", prezzo: "500 KGS ($5.7)", perPeriodo: false }
    ],
    pathfinder: [
      { nome: "Mappa stradale Kirghizistan/Bishkek", prezzo: "Gratis", perPeriodo: true },
      { nome: "Mappa stradale Kirghizistan/Issyk-Kul", prezzo: "Gratis", perPeriodo: true },
      { nome: "Guida Kirghizistan", prezzo: "Gratis", perPeriodo: true },
      { nome: "SIM card internet 4 settimane (illimitato)", prezzo: "550 KGS ($6.3)", perPeriodo: false },
      { nome: "Modem Starlink (internet ovunque)", prezzo: "32,500 KGS ($371.6)", perPeriodo: true },
      { nome: "Assicurazione extra (21-75 anni, 30gg, 1 persona)", prezzo: "4,000 KGS ($45.7)", perPeriodo: false }
    ],
    turisti: [
      { nome: "Fornello a gas Kovea", prezzo: "200 KGS ($2.3)", perPeriodo: false },
      { nome: "Sedia pieghevole", prezzo: "500 KGS ($5.7)", perPeriodo: false },
      { nome: "Bombola gas Kovea 230gr (propano/butano)", prezzo: "700 KGS ($8)", perPeriodo: false },
      { nome: "Tavolo pieghevole", prezzo: "1,000 KGS ($11.4)", perPeriodo: true },
      { nome: "Compressore + batteria extra", prezzo: "1,000 KGS ($11.4)", perPeriodo: true },
      { nome: "Set cucina turista 12 pezzi", prezzo: "2,000 KGS ($22.9)", perPeriodo: true },
      { nome: "Tenda da tetto per 2 (con sacchi a pelo e materassini)", prezzo: "26,000 KGS ($297.3)", perPeriodo: true }
    ],
    extra: [
      { nome: "Wi-Fi in auto (4G illimitato USB)", prezzo: "1,650 KGS ($18.9)", perPeriodo: true },
      { nome: "Portapacchi box (400-500L)", prezzo: "4,600 KGS ($52.6)", perPeriodo: true },
      { nome: "Portapacchi cestello metallico", prezzo: "4,600 KGS ($52.6)", perPeriodo: true },
      { nome: "Bici elettrica pieghevole (100x80x40cm)", prezzo: "6,500 KGS ($74.3)", perPeriodo: false },
      { nome: "2 bici + portabici gancio traino", prezzo: "10,400 KGS ($118.9)", perPeriodo: true },
      { nome: "Portasci/snowboard da tetto", prezzo: "1,000 KGS ($11.4)", perPeriodo: true }
    ],
    pickup: [
      { nome: "Ritiro in ufficio (GES2, Chernyshevskogo 65)", prezzo: "Gratis" },
      { nome: "Ritiro a Bishkek (hotel/hostel)", prezzo: "800 KGS ($9.1)" },
      { nome: "Ritiro alla stazione bus", prezzo: "1,000 KGS ($11.4)" },
      { nome: "Ritiro a Korday (confine Kazakhstan)", prezzo: "1,500 KGS ($17.2)" },
      { nome: "Ritiro aeroporto Manas (Bishkek)", prezzo: "2,500 KGS ($28.6)" },
      { nome: "Ritiro a Issyk-Kul (Cholpon-Ata, Balykchy, Bokonbaevo)", prezzo: "8,000 KGS ($91.5)" },
      { nome: "Ritiro a Karakol", prezzo: "10,000 KGS ($114.4)" },
      { nome: "Ritiro a Osh (aeroporto/hotel)", prezzo: "25,000 KGS ($285.9)" }
    ],
    dropoff: [
      { nome: "Riconsegna in ufficio (GES2, Chernyshevskogo 65)", prezzo: "Gratis" },
      { nome: "Riconsegna a Bishkek (hotel)", prezzo: "800 KGS ($9.1)" },
      { nome: "Riconsegna alla stazione bus", prezzo: "1,000 KGS ($11.4)" },
      { nome: "Riconsegna a Korday (confine Kazakhstan)", prezzo: "2,000 KGS ($22.9)" },
      { nome: "Riconsegna aeroporto Manas (Bishkek)", prezzo: "2,500 KGS ($28.6)" },
      { nome: "Riconsegna aeroporto Tamchy Issyk-Kul", prezzo: "5,000 KGS ($57.2)" },
      { nome: "Riconsegna a Issyk-Kul", prezzo: "10,000 KGS ($114.4)" },
      { nome: "Riconsegna a Karakol", prezzo: "10,000 KGS ($114.4)" },
      { nome: "Riconsegna a Osh (aeroporto/hotel)", prezzo: "25,000 KGS ($285.9)" }
    ]
  },
  assicurazione: {
    tipo: "OSAGO — assicurata al valore di mercato",
    franchigia: "$500",
    regole: [
      "Se danno > deposito → assicurazione copre solo il deposito",
      "Se danno < deposito → paghi dal tuo deposito",
      "Assicurazione valida SOLO in Kirghizistan"
    ],
    nonCopre: [
      "Pneumatici (qualità strade variabile)",
      "Surriscaldamento motore (fermarsi e aspettare raffreddamento completo)",
      "Violazioni gravi del codice (velocità > 100 km/h)",
      "Guida sotto effetto di alcol o droghe",
      "Fuga dalla polizia o atti illegali",
      "Uso su strade di montagna proibite (deposito confiscato)"
    ]
  }
};

/* ---- Strade Proibite (dal contratto Russian Troika) ---- */

var PROHIBITED_ROADS = {
  avviso: "⚠️ ATTENZIONE: L'assicurazione NON copre danni su queste strade. Il deposito ($500) viene confiscato se si violano queste regole.",
  crossoverVietate: {
    titolo: "🚗 Strade VIETATE per Crossover (Subaru Outback)",
    strade: [
      "Altyn-Arashan",
      "Kel-Suu",
      "Enilchek",
      "Tutte le strade tranne la federale (Tosor Pass) da Naryn a Issyk-Kul",
      "Attraversamento fiumi, specchi d'acqua e zone paludose",
      "Strada da Talas a Ala-Buka",
      "Panorama a Balykchy"
    ]
  },
  sedanMinivanVietate: {
    titolo: "🚫 Strade VIETATE per berline/minivan (NON ci riguarda, ma per info)",
    strade: [
      "Son-Kul",
      "Altyn-Arashan",
      "Kel-Suu",
      "Jety-Oguz yurt camp",
      "Barskoon — strada per Kumtor",
      "Sarychelek",
      "Enilchek",
      "Panorama a Balykchy"
    ]
  },
  implicazioniViaggio: [
    "⚠️ Altyn-Arashan (Giorno 4): NON andare in auto. Fare hike o prendere UAZ locale",
    "⚠️ Kel-Suu (Giorno 9): GIÀ PREVISTO noleggio UAZ ad At-Bashy — OK",
    "⚠️ Son-Kul (Giorni 6-7): Crossover CONSENTITO su Son-Kul (vietato solo per berline)",
    "⚠️ Strada Naryn → Issyk-Kul via Tosor Pass: SOLO strada federale consentita",
    "✅ Strada At-Bashy → Kazarman: NON nella lista proibite — ma verificare condizioni",
    "✅ Arslanbob: NON nella lista proibite — OK"
  ]
};