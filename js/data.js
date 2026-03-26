/**
 * data.js — Tutti i dati statici per Kyrgyzstan Travel PWA 2025
 * 15 giorni: 30 maggio – 13 giugno 2025
 *
 * Variabili globali (vanilla JS, NO ES modules):
 *   ITINERARY, PHRASES, CHECKLIST, WAYPOINTS,
 *   EMERGENCY_CONTACTS, DRONE_INFO, ALTITUDE_DATA,
 *   GENERAL_INFO, EXCHANGE_RATES
 */

/* ============================================================
   TASK 3.1 — ITINERARY (15 giorni)
   ============================================================ */

var ITINERARY = [
  // ── Giorno 1 ─────────────────────────────────────────────
  {
    day: 1,
    date: "2025-05-30",
    title: "Arrivo a Bishkek",
    route: null,
    km: 0,
    driveTime: null,
    budget: 30,
    activities: [
      { time: null, description: "Arrivo aeroporto Manas" },
      { time: null, description: "Comprare SIM card O! all'aeroporto (~500 KGS per 10GB)" },
      { time: null, description: "Cambiare soldi / ATM (~30,000-50,000 KGS)" },
      { time: null, description: "Osh Bazaar: comprare equipaggiamento auto (tanica, compressore, corda traino)" },
      { time: null, description: "Supermercato Frunze o Globus: scorte per la strada" },
      { time: null, description: "Piazza Ala-Too, esplorare centro Bishkek" },
      { time: null, description: "Cena: Navat o Faiza (plov, lagman, manti)" }
    ],
    gps: [
      { name: "Aeroporto Manas", lat: 43.0553, lng: 74.4776 },
      { name: "Osh Bazaar Bishkek", lat: 42.8700, lng: 74.5900 },
      { name: "Piazza Ala-Too", lat: 42.8746, lng: 74.5698 }
    ],
    warnings: [],
    accommodation: "Guesthouse Bishkek (€10-15pp)"
  },

  // ── Giorno 2 ─────────────────────────────────────────────
  {
    day: 2,
    date: "2025-05-31",
    title: "Bishkek → Ala-Archa → Karakol",
    route: "Bishkek → Ala-Archa → Burana → Issyk-Kul nord → Karakol",
    km: 420,
    driveTime: "7-8h con soste",
    budget: 35,
    activities: [
      { time: null, description: "Mattina: Ala-Archa National Park, hike Ak-Sai Waterfall (3-4h A/R, 2,300m)" },
      { time: null, description: "Ritiro auto da Russian Troika nel pomeriggio, ispezione completa" },
      { time: null, description: "Burana Tower (minareto XI secolo, Via della Seta, ~200 KGS)" },
      { time: null, description: "Opzionale: Cholpon-Ata petroglifi (Età del Bronzo)" },
      { time: null, description: "Guida lungo sponda nord Issyk-Kul" },
      { time: null, description: "Arrivo Karakol sera" },
      { time: null, description: "Cena: Ashlyam-Fu (piatto freddo noodle unico di Karakol), ristoranti Dungani" }
    ],
    gps: [
      { name: "Ala-Archa NP", lat: 42.6464, lng: 74.4847 },
      { name: "Burana Tower", lat: 42.7472, lng: 75.2503 },
      { name: "Karakol centro", lat: 42.4907, lng: 78.3936 }
    ],
    warnings: ["⛽ Fare benzina prima di partire da Bishkek"],
    accommodation: "Duet Hostel o Jamilya B&B (€8-12pp)"
  },

  // ── Giorno 3 ─────────────────────────────────────────────
  {
    day: 3,
    date: "2025-06-01",
    title: "Jyrgalan Valley",
    route: "Karakol → Jyrgalan → Karakol",
    km: 70,
    driveTime: "1h A/R",
    budget: 30,
    activities: [
      { time: null, description: "Guida verso Jyrgalan Valley (35km da Karakol)" },
      { time: null, description: "Opzione A: Waterfall Trail (5-6h, moderato)" },
      { time: null, description: "Opzione B: Kok-Bel Pass (4-5h, panoramico)" },
      { time: null, description: "Pranzo al sacco / chaikhana locale" },
      { time: null, description: "Children's Day (1 giugno) — festeggiamenti locali" },
      { time: null, description: "Spot drone: valle e montagne 🥈" },
      { time: null, description: "Rientro a Karakol, cena" }
    ],
    gps: [
      { name: "Villaggio Jyrgalan", lat: 42.8186, lng: 79.2094 },
      { name: "Karakol centro", lat: 42.4907, lng: 78.3936 }
    ],
    warnings: ["🎉 1 giugno = Children's Day in Kirghizistan"],
    accommodation: "Duet Hostel o Jamilya B&B Karakol (€8-12pp)"
  },

  // ── Giorno 4 ─────────────────────────────────────────────
  {
    day: 4,
    date: "2025-06-02",
    title: "Altyn-Arashan Hot Springs",
    route: "Karakol → Altyn-Arashan → Karakol",
    km: 30,
    driveTime: "Hike 3-4h one way",
    budget: 30,
    activities: [
      { time: null, description: "Hike verso Altyn-Arashan (3-4h, +800m dislivello)" },
      { time: null, description: "Sorgenti termali naturali (~200 KGS ingresso)" },
      { time: null, description: "Opzionale: proseguire verso Ala-Kul Lake (giornata intera, impegnativo)" },
      { time: null, description: "Pranzo al sacco" },
      { time: null, description: "Rientro a Karakol" },
      { time: null, description: "Cena a Karakol" }
    ],
    gps: [
      { name: "Trailhead Altyn-Arashan", lat: 42.6592, lng: 78.5261 },
      { name: "Karakol centro", lat: 42.4907, lng: 78.3936 }
    ],
    warnings: ["🥾 Sentiero ripido, +800m dislivello", "💧 Portare acqua sufficiente"],
    accommodation: "Duet Hostel o Jamilya B&B Karakol (€8-12pp)"
  },

  // ── Giorno 5 ─────────────────────────────────────────────
  {
    day: 5,
    date: "2025-06-03",
    title: "Sponda Sud Issyk-Kul",
    route: "Karakol → Barskoon → Fairy Tale Canyon → Bokonbayevo",
    km: 250,
    driveTime: "4-5h con soste",
    budget: 40,
    activities: [
      { time: null, description: "Partenza da Karakol, sponda sud Issyk-Kul" },
      { time: null, description: "Barskoon Waterfall (cascata + valle, spot drone 🥉)" },
      { time: null, description: "Fairy Tale Canyon / Skazka (formazioni rocciose rosse, spot drone 🥈)" },
      { time: null, description: "Bokonbayevo: dimostrazione Eagle Hunter (caccia con aquile)" },
      { time: null, description: "Cena locale" }
    ],
    gps: [
      { name: "Barskoon Waterfall", lat: 42.1500, lng: 77.6000 },
      { name: "Fairy Tale Canyon (Skazka)", lat: 42.3847, lng: 77.2575 },
      { name: "CBT Bokonbayevo", lat: 42.1208, lng: 76.9900 }
    ],
    warnings: ["⛽ Fare benzina a Karakol prima di partire"],
    accommodation: "Guesthouse Bokonbayevo (€10-15pp)"
  },

  // ── Giorno 6 ─────────────────────────────────────────────
  {
    day: 6,
    date: "2025-06-04",
    title: "Son-Kul Lake",
    route: "Bokonbayevo → Kochkor → Son-Kul Pass → Son-Kul",
    km: 200,
    driveTime: "5-6h",
    budget: 40,
    activities: [
      { time: null, description: "Guida verso Kochkor" },
      { time: null, description: "Kochkor: laboratorio feltro artigianale (shyrdak)" },
      { time: null, description: "⛽ FARE BENZINA A KOCHKOR (ultima stazione prima di Son-Kul)" },
      { time: null, description: "Son-Kul Pass (3,500m) — prima volta sopra 3,000m" },
      { time: null, description: "Arrivo Son-Kul Lake (3,016m)" },
      { time: null, description: "Sistemazione in yurta camp" },
      { time: null, description: "Cena tradizionale in yurta" }
    ],
    gps: [
      { name: "CBT Kochkor", lat: 42.0133, lng: 75.7592 },
      { name: "Son-Kul (accesso nord)", lat: 41.8333, lng: 75.1500 }
    ],
    warnings: [
      "⛽ ULTIMO RIFORNIMENTO A KOCHKOR!",
      "🏔️ Prima notte sopra 3,000m — attenzione mal di montagna",
      "🌡️ Temperature notturne possono scendere sotto 0°C"
    ],
    accommodation: "Yurta camp Son-Kul (€15-20pp con cena e colazione)"
  },

  // ── Giorno 7 ─────────────────────────────────────────────
  {
    day: 7,
    date: "2025-06-05",
    title: "Son-Kul — Giornata Completa",
    route: null,
    km: 0,
    driveTime: null,
    budget: 35,
    activities: [
      { time: null, description: "Colazione in yurta" },
      { time: null, description: "Passeggiata a cavallo con nomadi (~1,000-1,500 KGS/h)" },
      { time: null, description: "Vita nomade: osservare mungitura, preparazione kumys" },
      { time: null, description: "Spot drone: yurte, mandrie, lago 🥇" },
      { time: null, description: "Pranzo in yurta" },
      { time: null, description: "Esplorazione rive del lago" },
      { time: null, description: "Tramonto sul lago" },
      { time: null, description: "Stargazing (zero inquinamento luminoso)" }
    ],
    gps: [
      { name: "Son-Kul Lake", lat: 41.8333, lng: 75.1500 }
    ],
    warnings: [
      "🏔️ Seconda notte a 3,000m — monitorare sintomi",
      "☀️ Protezione solare forte (alta quota = UV intensi)"
    ],
    accommodation: "Yurta camp Son-Kul (€15-20pp con cena e colazione)"
  },

  // ── Giorno 8 ─────────────────────────────────────────────
  {
    day: 8,
    date: "2025-06-06",
    title: "Son-Kul → Naryn → Tash Rabat",
    route: "Son-Kul → Naryn → At-Bashy → Tash Rabat",
    km: 250,
    driveTime: "5-6h",
    budget: 35,
    activities: [
      { time: null, description: "Colazione e partenza da Son-Kul" },
      { time: null, description: "Discesa verso Naryn" },
      { time: null, description: "Naryn: ATM (ULTIMO ATM fino a Osh!) + rifornimento benzina" },
      { time: null, description: "Pranzo a Naryn" },
      { time: null, description: "Guida verso At-Bashy e Tash Rabat" },
      { time: null, description: "Tash Rabat: caravanserraglio XV secolo (Via della Seta, 3,200m)" },
      { time: null, description: "Spot drone: Tash Rabat 🥉" },
      { time: null, description: "Notte in yurta vicino Tash Rabat" }
    ],
    gps: [
      { name: "Naryn centro", lat: 41.4287, lng: 76.0014 },
      { name: "Tash Rabat", lat: 40.8453, lng: 75.2847 }
    ],
    warnings: [
      "🏧 ULTIMO ATM A NARYN! Prelevare abbastanza contanti per 5+ giorni",
      "⛽ Fare benzina a Naryn"
    ],
    accommodation: "Yurta camp Tash Rabat (€10-15pp)"
  },

  // ── Giorno 9 ─────────────────────────────────────────────
  {
    day: 9,
    date: "2025-06-07",
    title: "Spedizione Kel-Suu",
    route: "Tash Rabat → At-Bashy → Kel-Suu → At-Bashy",
    km: 160,
    driveTime: "4-5h A/R (UAZ)",
    budget: 45,
    activities: [
      { time: null, description: "Noleggio UAZ ad At-Bashy (€60-80, Subaru NON può andare — guadi profondi)" },
      { time: null, description: "Guida verso Kel-Suu con autista locale" },
      { time: null, description: "Kel-Suu Lake: lago turchese in canyon spettacolare (3,500m)" },
      { time: null, description: "Spot drone: Kel-Suu 🥇 (canyon + turchese)" },
      { time: null, description: "Pranzo al sacco" },
      { time: null, description: "Rientro ad At-Bashy" },
      { time: null, description: "Cena ad At-Bashy" }
    ],
    gps: [
      { name: "At-Bashy", lat: 41.1714, lng: 75.7986 },
      { name: "Kel-Suu", lat: 40.5811, lng: 75.0742 }
    ],
    warnings: [
      "📋 PERMESSO ZONA DI CONFINE OBBLIGATORIO (organizzare in anticipo)",
      "🚗 Subaru NON può raggiungere Kel-Suu — guadi profondi, serve UAZ",
      "🏔️ Altitudine 3,500m — attenzione mal di montagna"
    ],
    accommodation: "Guesthouse At-Bashy (€8-10pp)"
  },

  // ── Giorno 10 ────────────────────────────────────────────
  {
    day: 10,
    date: "2025-06-08",
    title: "At-Bashy → Kazarman",
    route: "At-Bashy → Kazarman (strada più selvaggia del Kirghizistan)",
    km: 310,
    driveTime: "8-10h GUIDA INTERA GIORNATA",
    budget: 30,
    activities: [
      { time: null, description: "Partenza presto — giornata di guida INTERA" },
      { time: null, description: "Strada più selvaggia del Kirghizistan" },
      { time: null, description: "Passi sopra 3,300m" },
      { time: null, description: "NESSUNA stazione di servizio sul percorso" },
      { time: null, description: "NESSUN segnale telefonico per gran parte del tragitto" },
      { time: null, description: "Paesaggi lunari e valli remote" },
      { time: null, description: "Arrivo Kazarman sera" }
    ],
    gps: [
      { name: "At-Bashy", lat: 41.1714, lng: 75.7986 },
      { name: "Kazarman", lat: 41.4000, lng: 74.0333 }
    ],
    warnings: [
      "⛽ NESSUNA STAZIONE DI SERVIZIO! Partire con serbatoio pieno + tanica",
      "📵 NESSUN SEGNALE TELEFONICO per gran parte del percorso",
      "🏔️ Passi sopra 3,300m",
      "⚠️ Strada sterrata, condizioni variabili — guidare con cautela",
      "🕐 Partire all'alba, prevedere 8-10 ore"
    ],
    accommodation: "Guesthouse Kazarman (€8-10pp)"
  },

  // ── Giorno 11 ────────────────────────────────────────────
  {
    day: 11,
    date: "2025-06-09",
    title: "Kazarman → Arslanbob",
    route: "Kazarman → Jalal-Abad → Arslanbob",
    km: 200,
    driveTime: "4-5h",
    budget: 25,
    activities: [
      { time: null, description: "Partenza da Kazarman" },
      { time: null, description: "Guida verso sud attraverso valli" },
      { time: null, description: "Arrivo Arslanbob — villaggio uzbeko nella più grande foresta di noci del mondo" },
      { time: null, description: "Sistemazione in homestay" },
      { time: null, description: "Passeggiata nel villaggio" },
      { time: null, description: "Cena uzbeka tradizionale" }
    ],
    gps: [
      { name: "Kazarman", lat: 41.4000, lng: 74.0333 },
      { name: "CBT Arslanbob", lat: 41.3311, lng: 72.9389 }
    ],
    warnings: ["⛽ Fare benzina appena possibile dopo Kazarman"],
    accommodation: "Homestay Arslanbob (€8-12pp)"
  },

  // ── Giorno 12 ────────────────────────────────────────────
  {
    day: 12,
    date: "2025-06-10",
    title: "Arslanbob — Esplorazione",
    route: null,
    km: 0,
    driveTime: null,
    budget: 30,
    activities: [
      { time: null, description: "Big Waterfall (cascata 80m, hike 1-2h)" },
      { time: null, description: "Small Waterfall (più accessibile)" },
      { time: null, description: "Opzionale: passeggiata a cavallo nella foresta di noci" },
      { time: null, description: "Opzionale: Holy Lake (lago sacro, hike più lungo)" },
      { time: null, description: "Pranzo in villaggio" },
      { time: null, description: "Esplorazione foresta di noci (la più grande al mondo)" },
      { time: null, description: "Cena uzbeka" }
    ],
    gps: [
      { name: "CBT Arslanbob", lat: 41.3311, lng: 72.9389 }
    ],
    warnings: [],
    accommodation: "Homestay Arslanbob (€8-12pp)"
  },

  // ── Giorno 13 ────────────────────────────────────────────
  {
    day: 13,
    date: "2025-06-11",
    title: "Arslanbob → Osh",
    route: "Arslanbob → Jalal-Abad → Osh",
    km: 180,
    driveTime: "3-4h",
    budget: 30,
    activities: [
      { time: null, description: "Partenza da Arslanbob" },
      { time: null, description: "Guida verso Osh via Jalal-Abad" },
      { time: null, description: "Sulaiman-Too: montagna sacra UNESCO nel centro di Osh" },
      { time: null, description: "Osh Bazaar (uno dei più grandi dell'Asia Centrale)" },
      { time: null, description: "Preparazione per day trip in Uzbekistan (controllare documenti)" },
      { time: null, description: "Cena a Osh" }
    ],
    gps: [
      { name: "CBT Arslanbob", lat: 41.3311, lng: 72.9389 },
      { name: "Sulaiman-Too Osh", lat: 40.5278, lng: 72.7964 },
      { name: "Osh Bazaar", lat: 40.5333, lng: 72.8000 }
    ],
    warnings: ["📋 Verificare documenti per Uzbekistan (passaporto, eventuale visto)"],
    accommodation: "Hotel/Guesthouse Osh (€10-15pp)"
  },

  // ── Giorno 14 ────────────────────────────────────────────
  {
    day: 14,
    date: "2025-06-12",
    title: "Uzbekistan Day Trip + Drive Nord",
    route: "Osh → Dostuk Border → Margilan → Osh → Toktogul",
    km: 350,
    driveTime: "6-7h totali",
    budget: 45,
    activities: [
      { time: null, description: "Mattina presto: confine Dostuk (Osh → Uzbekistan)" },
      { time: null, description: "Margilan: fabbrica seta Yodgorlik (artigianato tradizionale)" },
      { time: null, description: "Kumtepa Bazaar (giovedì! — mercato settimanale autentico)" },
      { time: null, description: "Rientro a Osh entro le 15:00" },
      { time: null, description: "Guida verso nord: Osh → Toktogul" },
      { time: null, description: "Arrivo Toktogul sera" }
    ],
    gps: [
      { name: "Confine Dostuk", lat: 40.5167, lng: 72.6333 },
      { name: "Margilan", lat: 40.4700, lng: 71.7200 },
      { name: "Toktogul", lat: 41.8747, lng: 72.9422 }
    ],
    warnings: [
      "📋 Portare passaporto! Attraversamento confine internazionale",
      "💱 Cambiare UZS al confine o a Margilan (1 EUR ≈ 13,500 UZS)",
      "🕐 Rientrare a Osh entro le 15:00 per avere tempo di guidare verso Toktogul",
      "📅 Giovedì = giorno del Kumtepa Bazaar a Margilan!"
    ],
    accommodation: "Guesthouse Toktogul (€8-10pp)"
  },

  // ── Giorno 15 ────────────────────────────────────────────
  {
    day: 15,
    date: "2025-06-13",
    title: "Toktogul → Bishkek",
    route: "Toktogul → Suusamyr Valley → Too-Ashuu Pass → Bishkek",
    km: 350,
    driveTime: "6-7h",
    budget: 35,
    activities: [
      { time: null, description: "Partenza da Toktogul" },
      { time: null, description: "Toktogul Reservoir: spot drone 🥉 (lago artificiale spettacolare)" },
      { time: null, description: "Suusamyr Valley (valle verde, pascoli)" },
      { time: null, description: "Too-Ashuu Pass (3,150m — tunnel e tornanti)" },
      { time: null, description: "Discesa verso Bishkek" },
      { time: null, description: "Restituzione auto a Russian Troika" },
      { time: null, description: "Cena di addio: Supara Ethno Complex (cucina kirghiza tradizionale)" }
    ],
    gps: [
      { name: "Toktogul Reservoir", lat: 41.7500, lng: 72.9500 },
      { name: "Too-Ashuu Pass", lat: 42.3833, lng: 73.8167 },
      { name: "Bishkek centro", lat: 42.8746, lng: 74.5698 }
    ],
    warnings: [
      "⛽ Fare benzina a Toktogul",
      "🏔️ Too-Ashuu Pass 3,150m — possibile neve/ghiaccio",
      "🚗 Controllare orario restituzione auto"
    ],
    accommodation: "Guesthouse Bishkek o aeroporto (€10-15pp)"
  }
];


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
  { category: "strada", it: "Lontano", kg: "Алыс", ru: "Далеко", pronunciation: "A-lys / Da-lye-ko" }
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
  { day: 1,  type: "poi",       name: "Aeroporto Manas",            lat: 43.0553, lng: 74.4776 },
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
    "DJI Mini 2 (<250g) — nessuna registrazione richiesta in Kirghizistan",
    "Altitudine massima consigliata: 120m AGL (above ground level)",
    "Non volare sopra persone o assembramenti",
    "Non volare vicino ad aeroporti (raggio 5km)",
    "Non volare sopra installazioni militari o governative",
    "Rispettare la privacy delle persone",
    "Chiedere sempre permesso prima di volare vicino a yurte o villaggi",
    "Portare sempre batterie di scorta (il freddo riduce l'autonomia)"
  ],
  noFlyZones: [
    "Aeroporto Manas (Bishkek) — raggio 5km",
    "Aeroporto Osh — raggio 5km",
    "Basi militari (non sempre segnalate)",
    "Zone di confine (specialmente vicino a Cina e Uzbekistan)",
    "Kel-Suu: zona di confine — chiedere alla guida prima di volare"
  ],
  bestSpots: [
    { rank: "🥇", name: "Kel-Suu", day: 9, description: "Canyon + lago turchese, paesaggio unico" },
    { rank: "🥇", name: "Son-Kul", day: 7, description: "Yurte, mandrie, lago a 3,000m — luce alba/tramonto" },
    { rank: "🥈", name: "Fairy Tale Canyon", day: 5, description: "Formazioni rocciose rosse, contrasto con lago" },
    { rank: "🥈", name: "Jyrgalan Valley", day: 3, description: "Valle verde con montagne innevate" },
    { rank: "🥉", name: "Barskoon Valley", day: 5, description: "Cascata e valle profonda" },
    { rank: "🥉", name: "Tash Rabat", day: 8, description: "Caravanserraglio isolato in valle verde" },
    { rank: "🥉", name: "Toktogul Reservoir", day: 15, description: "Lago artificiale tra montagne" }
  ],
  altitudeTips: [
    "Sopra 3,000m le batterie si scaricano più velocemente (fino al 30% in meno)",
    "Il freddo riduce ulteriormente l'autonomia — tenere le batterie al caldo nel giubbotto",
    "L'aria rarefatta riduce la portanza — il drone consuma più energia per hovering",
    "Usare filtri ND (ND16/ND32) per la luce intensa ad alta quota",
    "Attenzione ai venti improvvisi in quota — controllare prima di decollare",
    "A Son-Kul e Kel-Suu (3,000-3,500m) prevedere voli più brevi"
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
