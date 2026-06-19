/**
 * gps.js — GPS Waypoints + Where to Go
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderGps(), generateKML(), downloadKML()
 */

var DEFAULT_PLACES = [
  // ===== ZONA BISHKEK =====
  { id:'p-1', name:'Ala-Archa National Park', lat:42.6452, lng:74.4836, category:'🏔️ Trekking', notes:'⭐ Top pick. 40km da Bishkek (~1h). Hike Ak-Sai Waterfall (3-4h A/R, 2300m). Picco a 4895m. Ingresso ~200 KGS. Giorno 1 o 15.', source:'lonelyplanet.com' },
  { id:'p-2', name:'Kol-Tor Lake', lat:42.6000, lng:74.8000, category:'🏔️ Trekking', notes:'Lago alpino vicino Bishkek. Hike di giornata.', source:'' },
  { id:'p-3', name:'Osh Bazaar Bishkek', lat:42.8700, lng:74.5900, category:'🎯 Altro', notes:'Equipaggiamento, cibo, vestiti. Tutto a poco.', source:'' },
  { id:'p-4', name:'Supara Ethno Complex', lat:42.7800, lng:74.5200, category:'🍽️ Ristorante', notes:'Cucina kirghiza tradizionale. Cena di addio.', source:'' },
  // ===== ZONA ISSYK-KUL NORD =====
  { id:'p-5', name:'Konorchek Canyon', lat:42.6810, lng:75.8541, category:'📸 Panorama', notes:'⭐ Red canyons spettacolari. Hike 1-2h dalla strada Bishkek-Issyk-Kul. Best time: golden hour. Giorno 2.', source:'lonelyplanet.com' },
  { id:'p-6', name:'Mars Canyon', lat:42.6700, lng:75.8200, category:'📸 Panorama', notes:'Paesaggio marziano. Vicino a Konorchek.', source:'' },
  { id:'p-7', name:'Burana Tower', lat:42.7468, lng:75.2502, category:'🏛️ Storico', notes:'⭐ Top pick. Minareto XI sec, Via della Seta. Day-trip da Bishkek (75km, ~1h30). Salita interna ripida ma vista 360°. ~200 KGS. Giorno 1 o 15.', source:'lonelyplanet.com' },
  { id:'p-8', name:'Chong-Kemin NP', lat:42.8000, lng:75.5000, category:'🏔️ Trekking', notes:'Parco nazionale, trekking e natura.', source:'' },
  // ===== ZONA KARAKOL =====
  { id:'p-9', name:'Altyn-Arashan Hot Springs', lat:42.7500, lng:78.5700, category:'🏔️ Trekking', notes:'Sorgenti termali segrete a 2600m. Hike 3-4h o jeep 4x4. Acqua calda tutto l\'anno, ricca di minerali.', source:'' },
  { id:'p-10', name:'Ala-Kul Lake', lat:42.5200, lng:78.4500, category:'🏔️ Trekking', notes:'Lago turchese a 3900m. Trek 2-3 giorni. Tip: partire dal second bridge per evitare salita ripida.', source:'' },
  { id:'p-11', name:'Jyrgalan Valley', lat:42.8186, lng:79.2094, category:'🏔️ Trekking', notes:'Waterfall Trail (5-6h) o Kok-Bel Pass. Valle verde.', source:'' },
  { id:'p-12', name:'Karakol Valley', lat:42.5500, lng:78.4000, category:'📸 Panorama', notes:'Valle panoramica vicino Karakol. Gun range e hot springs.', source:'' },
  { id:'p-13', name:'Red Hills', lat:42.0000, lng:78.5000, category:'📸 Panorama', notes:'Colline rosse, paesaggio unico.', source:'' },
  { id:'p-14', name:'Kol-Ukok', lat:42.0500, lng:78.3000, category:'🏔️ Trekking', notes:'Lago alpino. Horse riding spot.', source:'' },
  { id:'p-15', name:'Kara-Tash', lat:42.1500, lng:78.8000, category:'📸 Panorama', notes:'"Islanda del Kirghizistan". Paesaggio vulcanico.', source:'' },
  // ===== ZONA SARY-JAZ (PERMESSO!) =====
  { id:'p-16', name:'Sary-Jaz Valley', lat:42.5000, lng:79.5000, category:'📸 Panorama', notes:'⚠️ PERMESSO CONFINE OBBLIGATORIO. Zona remota, campeggio stelle. 4x4 essenziale.', source:'' },
  { id:'p-17', name:'Inylchek', lat:42.2500, lng:79.8000, category:'🏔️ Trekking', notes:'⚠️ PERMESSO CONFINE. Zona ghiacciai, remota.', source:'' },
  // ===== ZONA ISSYK-KUL SUD =====
  { id:'p-18', name:'Ak-Say Canyon', lat:42.3500, lng:76.8000, category:'📸 Panorama', notes:'Canyon direttamente sul lago Issyk-Kul. Spettacolare al golden hour. Hike 10-15min al viewpoint.', source:'' },
  { id:'p-19', name:'Seven Bulls Rock', lat:42.2800, lng:77.5500, category:'📸 Panorama', notes:'Formazioni rocciose sulla sponda sud.', source:'' },
  { id:'p-20', name:'Barskoon Waterfall', lat:42.1500, lng:77.6000, category:'📸 Panorama', notes:'Cascata + gorge. Spot drone.', source:'' },
  { id:'p-21', name:'Arabel Plateau', lat:41.9500, lng:77.5000, category:'⛺ Yurta Camp', notes:'Altopiano per campeggio. Via Barskoon Pass.', source:'' },
  { id:'p-22', name:'Fairy Tale Canyon (Skazka)', lat:42.3847, lng:77.2575, category:'📸 Panorama', notes:'Formazioni rocciose rosse. Spot drone. Meglio al tramonto.', source:'' },
  { id:'p-23', name:'CBT Bokonbayevo', lat:42.1208, lng:76.9900, category:'🎯 Altro', notes:'Eagle hunting demo. Prenotare qui. Traduttore inglese disponibile.', source:'' },
  // ===== ZONA SONG-KUL =====
  { id:'p-24', name:'CBT Kochkor', lat:42.0133, lng:75.7592, category:'⛽ Servizi', notes:'⛽ ULTIMO CARBURANTE prima Song-Kul! Laboratorio feltro shyrdak.', source:'' },
  { id:'p-25', name:'Son-Kul Lake', lat:41.8333, lng:75.1500, category:'⛺ Yurta Camp', notes:'Lago a 3016m. Yurte nomadi. Horse riding, kumys, stargazing. Spot drone top.', source:'' },
  { id:'p-26', name:'Ak-Say Valley (Song-Kul)', lat:41.9000, lng:75.3000, category:'🏔️ Trekking', notes:'Valle panoramica. Hike 10-15min al viewpoint. Mattina presto o tardo pomeriggio per luce migliore.', source:'' },
  // ===== ZONA NARYN / TASH RABAT =====
  { id:'p-27', name:'Naryn', lat:41.4287, lng:76.0014, category:'⛽ Servizi', notes:'🏧 ULTIMO ATM! ⛽ Benzina. Ultimo centro abitato grande.', source:'' },
  { id:'p-28', name:'Tash Rabat', lat:40.8453, lng:75.2847, category:'🏛️ Storico', notes:'Caravanserraglio XV secolo, Via della Seta. 3200m. Yurta camp.', source:'' },
  { id:'p-29', name:'Kok-Kiya Canyon', lat:41.0000, lng:75.5000, category:'📸 Panorama', notes:'Canyon off the beaten track. Zona Naryn.', source:'' },
  // ===== ZONA KEL-SUU (PERMESSO!) =====
  { id:'p-30', name:'At-Bashy', lat:41.1714, lng:75.7986, category:'⛽ Servizi', notes:'Noleggio UAZ per Kel-Suu. Ultimo punto servizi.', source:'' },
  { id:'p-31', name:'Kel-Suu Lake', lat:40.5811, lng:75.0742, category:'🏔️ Trekking', notes:'⚠️ PERMESSO CONFINE OBBLIGATORIO. Lago turchese in canyon gigante, 3500m. Livello acqua varia con stagione. Serve UAZ.', source:'' },
  // ===== ZONA SUD (KAZARMAN / ARSLANBOB / OSH) =====
  { id:'p-32', name:'Kazarman', lat:41.4000, lng:74.0333, category:'⛽ Servizi', notes:'Tappa sulla strada più selvaggia. Guesthouse basica.', source:'' },
  { id:'p-33', name:'Arslanbob', lat:41.3311, lng:72.9389, category:'🏔️ Trekking', notes:'Villaggio uzbeko. Foresta di noci più grande al mondo. Big Waterfall 80m. CBT.', source:'' },
  { id:'p-34', name:'Sulaiman-Too Osh', lat:40.5278, lng:72.7964, category:'🏛️ Storico', notes:'Montagna sacra UNESCO nel centro di Osh.', source:'' },
  { id:'p-35', name:'Osh Bazaar', lat:40.5333, lng:72.8000, category:'🎯 Altro', notes:'Uno dei più grandi mercati dell\'Asia Centrale.', source:'' },
  // ===== ALLOGGI CONSIGLIATI =====
  { id:'p-36', name:'Tunduk Hostel Bishkek', lat:42.8730, lng:74.5890, category:'🏨 Alloggio', notes:'Hostel consigliato a Bishkek. Organizzano trek.', source:'' },
  { id:'p-37', name:'Duet Hostel Karakol', lat:42.4900, lng:78.3900, category:'🏨 Alloggio', notes:'Base per esplorare zona Karakol.', source:'' },
  { id:'p-38', name:'Sky Glamping', lat:42.5000, lng:76.5000, category:'🏨 Alloggio', notes:'Glamping con vista. @sky_glamping_', source:'' },
  { id:'p-39', name:'Yurt Camp Jyrgal', lat:41.8500, lng:75.2000, category:'🏨 Alloggio', notes:'Yurta camp Song-Kul. @yurtcamp_jyrgal', source:'' },
  { id:'p-40', name:'Nomads Dream Yurt Camp', lat:41.8200, lng:75.1800, category:'🏨 Alloggio', notes:'Yurta camp Song-Kul. @nomads_dream.kg', source:'' },
  // ===== AGGIUNTE 2026: Top spot drone & yurt camp =====
  { id:'p-41', name:'Karakol Gorge', lat:42.4500, lng:78.4500, category:'📸 Panorama', notes:'Gola spettacolare a sud di Karakol. Spot drone top: pareti verticali, fiume.', source:'' },
  { id:'p-42', name:'Eshenkul Lake', lat:41.5000, lng:76.7000, category:'🏔️ Trekking', notes:'Lago alpino off-the-beaten-path zona Naryn. Pochi turisti, spot drone.', source:'' },
  { id:'p-43', name:'Tulpar Kol', lat:39.5167, lng:72.9333, category:'🏔️ Trekking', notes:'Lago a 3500m base camp Pik Lenin (Pamir-Alay sud). Yurta camp alpinisti.', source:'' },
  { id:'p-44', name:'Kok-Kiya Valley', lat:41.0500, lng:75.4500, category:'⛺ Yurta Camp', notes:'Off-the-beaten-track. Yurta stay autentica + stargazing top zona Naryn. Giorno 8.', source:'' },
  { id:'p-45', name:'Kilemche Valley', lat:41.7500, lng:75.4500, category:'⛺ Yurta Camp', notes:'Valle remota tra Kochkor e Song-Kul. Yurta stay tradizionale. Giorno 6-7.', source:'' },
  // ===== AGGIUNTE 2026: Stargazing dedicato (categoria nuova) =====
  { id:'p-46', name:'Tash Rabat (stargazing)', lat:40.8453, lng:75.2847, category:'🌌 Stargazing', notes:'Cielo stellato leggendario in valle remota. 3200m, zero inquinamento luminoso. Giorno 9. Già caravanserraglio storico (vedi anche 🏛️).', source:'wildtrips.net' },
  { id:'p-47', name:'Ala-Kul Lake (stargazing)', lat:42.5200, lng:78.4500, category:'🌌 Stargazing', notes:'3900m dopo trek 2-3 giorni. Stelle epiche. Giorno 4-5. (Vedi anche 🏔️ Trekking).', source:'' },
  { id:'p-48', name:'Kel-Suu (stargazing)', lat:40.5811, lng:75.0742, category:'🌌 Stargazing', notes:'3500m, cielo nero assoluto. Giorno 9-10. ⚠️ Permesso confine.', source:'' },
  { id:'p-49', name:'Song-Kul (stargazing)', lat:41.8333, lng:75.1500, category:'🌌 Stargazing', notes:'Dalle yurte, cielo aperto a 360°. Notti fredde anche giugno. Giorno 7.', source:'' },
  // ===== TOP PICK / Must-see secondo travel guides =====
  { id:'p-50', name:'Holy Trinity Cathedral Karakol', lat:42.4901, lng:78.3934, category:'⭐ Top Pick', notes:'⛪ Cattedrale ortodossa russa in legno (1895), costruita senza chiodi. Giorno 3. Servizi domenica.', source:'destinationkarakol.com' },
  { id:'p-51', name:'Dungan Mosque Karakol', lat:42.4920, lng:78.3884, category:'⭐ Top Pick', notes:'🕌 Moschea cinese in legno, costruita 1907 senza chiodi da artigiani Dungan. Giorno 3.', source:'destinationkarakol.com' },
  { id:'p-52', name:'Karakol Animal Market', lat:42.5128, lng:78.4150, category:'⭐ Top Pick', notes:'🐎 SOLO domenica mattina 5:30-9:00! Cavalli, mucche, pecore. Esperienza autentica. Giorno 3 (se domenica).', source:'destinationkarakol.com' },
  { id:'p-53', name:'Przhevalsky Museum', lat:42.5100, lng:78.4200, category:'⭐ Top Pick', notes:'📖 Museo dell\'esploratore russo Przhevalsky. ~150 KGS. Giorno 3.', source:'wildtrips.net' },
  { id:'p-54', name:'Manas Statue (Bishkek)', lat:42.8765, lng:74.6037, category:'⭐ Top Pick', notes:'🗿 Statua eroe nazionale Manas in Piazza Ala-Too. Cambio della guardia ogni ora. Giorno 1 o 15.', source:'discoverkyrgyzstan.org' },
  { id:'p-55', name:'Panfilov Park', lat:42.8772, lng:74.6047, category:'⭐ Top Pick', notes:'🌳 Parco centrale Bishkek. Luna park sovietico, vita locale. Giorno 1 o 15.', source:'adventurebackpack.com' },
  { id:'p-56', name:'Bishkek State Historical Museum', lat:42.8762, lng:74.6051, category:'⭐ Top Pick', notes:'🏛️ Museo nazionale, Piazza Ala-Too. ~250 KGS. Giorno 1 o 15.', source:'adventurebackpack.com' },
  { id:'p-57', name:'Cholpon-Ata Petroglyphs', lat:42.6604, lng:77.0853, category:'⭐ Top Pick', notes:'🗿 Petroglifi a cielo aperto, II millennio AC. Sul lago Issyk-Kul nord. Giorno 2-3. ~200 KGS.', source:'thebrokebackpacker.com' },
  { id:'p-58', name:'Eagle Hunting Demo Bokonbayevo', lat:42.1208, lng:76.9900, category:'⭐ Top Pick', notes:'🦅 Demo caccia con aquila reale tradizionale kirghiza. Prenotare via CBT (3000 KGS). Giorno 5-6.', source:'thebrokebackpacker.com' },
  { id:'p-59', name:'Salkyn-Tor National Park (Naryn)', lat:41.4670, lng:76.0830, category:'🏔️ Trekking', notes:'Parco vicino a Naryn. Trekking facili, foreste, cervi. Giorno 8-9.', source:'lonelyplanet.com' },
  { id:'p-60', name:'Shyrdak Workshop Kochkor', lat:42.0145, lng:75.7588, category:'⭐ Top Pick', notes:'🧶 Laboratorio feltro (shyrdak), tappeti tradizionali. Demo + acquisto. Via CBT Kochkor. Giorno 6.', source:'localadventurer.com' },
  { id:'p-61', name:'Manjyly-Ata Sacred Site', lat:42.1100, lng:77.0800, category:'⭐ Top Pick', notes:'⛰️ Sito sacro sull\'Issyk-Kul sud. Sorgenti minerali, formazioni rocciose. Giorno 5-6.', source:'thebrokebackpacker.com' },
  { id:'p-62', name:'Kyzart Pass', lat:42.0500, lng:75.0700, category:'📸 Panorama', notes:'Pass 2664m verso Song-Kul (lato nord). Vista panoramica. Yurte lungo strada.', source:'' },
  { id:'p-63', name:'Boom Gorge', lat:42.6500, lng:75.7500, category:'📸 Panorama', notes:'Gola sul fiume Chu, strada Bishkek-Issyk-Kul. Stretta e drammatica. Giorno 2.', source:'lonelyplanet.com' },
  { id:'p-64', name:'Suusamyr Valley', lat:42.1600, lng:73.7300, category:'📸 Panorama', notes:'Valle alpina spettacolare, yurte lungo strada estate. Giorno 14-15. Pass Too-Ashuu 3150m.', source:'lonelyplanet.com' },
  { id:'p-65', name:'Toktogul Reservoir', lat:41.7900, lng:72.7400, category:'📸 Panorama', notes:'Lago artificiale tra montagne, strada Bishkek-Osh. Giorno 14-15. Spot drone.', source:'' },
  { id:'p-66', name:'Sary-Chelek Lake', lat:41.8500, lng:71.9700, category:'🏔️ Trekking', notes:'Lago UNESCO Biosphere Reserve. Foresta + lago. Detour 1 giorno da Arslanbob.', source:'nomadasaurus.com' },
  { id:'p-67', name:'Chong-Tash (Ata-Beyit Memorial)', lat:42.6800, lng:74.7800, category:'🏛️ Storico', notes:'Memoriale vittime repressione sovietica 1938. 30km da Bishkek. Storia tragica del KG.', source:'discoverkyrgyzstan.org' },
  { id:'p-68', name:'Issyk-Ata Hot Springs', lat:42.7300, lng:75.5200, category:'🏔️ Trekking', notes:'♨️ Sorgenti termali sanatorio sovietico. 80km da Bishkek. Day-trip alternativo.', source:'lonelyplanet.com' },
  { id:'p-69', name:'Frunze Statue Bishkek', lat:42.8580, lng:74.5950, category:'🏛️ Storico', notes:'Statua del generale sovietico, davanti museo ferroviario. Foto sovietica iconica.', source:'' },
  { id:'p-70', name:'Toguz-Bulak Eco Camp', lat:41.9000, lng:75.2500, category:'🏨 Alloggio', notes:'Eco camp zona Song-Kul, alternativa alle yurte. @toguzbulak', source:'' },
  { id:'p-71', name:'Oimo Lake (Karakol)', lat:42.5400, lng:78.6100, category:'🏔️ Trekking', notes:'Lago alpino vicino Karakol, alternativa meno battuta a Ala-Kul. Trek 1-2 giorni.', source:'destinationkarakol.com' }
];

var PLACE_CATEGORIES = ['⭐ Top Pick','🏔️ Trekking','📸 Panorama','🌌 Stargazing','⛺ Yurta Camp','🏛️ Storico','🍽️ Ristorante','⛽ Servizi','🏨 Alloggio','🎯 Altro'];

// All recommended places organized by zone
var RECOMMENDED_PLACES = [
  // ===== 🏙️ BISHKEK =====
  { name:'Aeroporto Manas (BSZ)', lat:43.0553, lng:74.4776, zone:'bishkek', cat:'⛽', notes:'Codice IATA: BSZ (ex FRU dal 9/5/2025). 23km a nord di Bishkek. SIM card O!, cambio soldi, ATM. Taxi 600-800 KGS al centro.' },
  { name:'Osh Bazaar Bishkek', lat:42.8700, lng:74.5900, zone:'bishkek', cat:'🛒', notes:'Equipaggiamento, cibo, vestiti. Tutto a poco.' },
  { name:'Piazza Ala-Too', lat:42.8746, lng:74.5698, zone:'bishkek', cat:'📸', notes:'Centro Bishkek, piazza principale' },
  { name:'Supara Ethno Complex', lat:42.7800, lng:74.5200, zone:'bishkek', cat:'🍽️', notes:'Cucina kirghiza tradizionale. Cena di addio.' },
  { name:'Navat Restaurant', lat:42.8740, lng:74.5880, zone:'bishkek', cat:'🍽️', notes:'Plov, lagman, manti. Consigliato.' },
  { name:'Faiza Restaurant', lat:42.8750, lng:74.5850, zone:'bishkek', cat:'🍽️', notes:'Cucina kirghiza, buon rapporto qualità/prezzo' },
  { name:'Tunduk Hostel', lat:42.8730, lng:74.5890, zone:'bishkek', cat:'🏨', notes:'Hostel consigliato. Organizzano trek.' },
  { name:'Russian Troika Car Rental', lat:42.8760, lng:74.5920, zone:'bishkek', cat:'🚗', notes:'Noleggio auto. Ritiro/restituzione.' },
  { name:'Supermercato Frunze', lat:42.8710, lng:74.5870, zone:'bishkek', cat:'🛒', notes:'Scorte per la strada' },
  { name:'Supara Chunkurchak Resort', lat:42.7200, lng:74.4500, zone:'bishkek', cat:'🏨', notes:'Resort montagna vicino Bishkek' },
  // ===== 🏔️ ISSYK-KUL NORD =====
  { name:'Ala-Archa National Park', lat:42.6464, lng:74.4847, zone:'issyknord', cat:'🏔️', notes:'Hike Ak-Sai Waterfall (3-4h). Ingresso ~200 KGS.' },
  { name:'Kol-Tor Lake', lat:42.6000, lng:74.8000, zone:'issyknord', cat:'🏔️', notes:'Lago alpino vicino Bishkek. Hike giornata.' },
  { name:'Konorchek Canyon', lat:42.6833, lng:75.8500, zone:'issyknord', cat:'📸', notes:'Red canyon spettacolare. Hike 1-2h.' },
  { name:'Mars Canyon', lat:42.6700, lng:75.8200, zone:'issyknord', cat:'📸', notes:'Paesaggio marziano. Vicino a Konorchek.' },
  { name:'Burana Tower', lat:42.7472, lng:75.2503, zone:'issyknord', cat:'🏛️', notes:'Minareto XI secolo, Via della Seta. ~200 KGS.' },
  { name:'Chong-Kemin NP', lat:42.8000, lng:75.5000, zone:'issyknord', cat:'🏔️', notes:'Parco nazionale, trekking e natura.' },
  { name:'Cholpon-Ata Petroglifi', lat:42.6500, lng:77.0800, zone:'issyknord', cat:'🏛️', notes:'Petroglifi Età del Bronzo' },
  // ===== 🏔️ KARAKOL =====
  { name:'Karakol centro', lat:42.4907, lng:78.3936, zone:'karakol', cat:'📍', notes:'Base per esplorare la zona est' },
  { name:'Duet Hostel', lat:42.4900, lng:78.3900, zone:'karakol', cat:'🏨', notes:'Hostel base Karakol' },
  { name:'Jamilya B&B', lat:42.4910, lng:78.3950, zone:'karakol', cat:'🏨', notes:'Guesthouse Karakol' },
  { name:'Altyn-Arashan Hot Springs', lat:42.7500, lng:78.5700, zone:'karakol', cat:'♨️', notes:'Sorgenti termali segrete 2600m. Acqua calda tutto l\'anno.' },
  { name:'Ala-Kul Lake', lat:42.5200, lng:78.4500, zone:'karakol', cat:'🏔️', notes:'Lago turchese 3900m. Trek 2-3 giorni. Tip: partire dal second bridge.' },
  { name:'Jyrgalan Valley', lat:42.8186, lng:79.2094, zone:'karakol', cat:'🏔️', notes:'Waterfall Trail (5-6h) o Kok-Bel Pass.' },
  { name:'Karakol Valley', lat:42.5500, lng:78.4000, zone:'karakol', cat:'📸', notes:'Valle panoramica. Gun range e hot springs.' },
  { name:'Holy Trinity Cathedral', lat:42.4880, lng:78.3920, zone:'karakol', cat:'🏛️', notes:'Chiesa ortodossa in legno' },
  { name:'Dungan Mosque', lat:42.4870, lng:78.3960, zone:'karakol', cat:'🏛️', notes:'Moschea cinese in legno, senza chiodi' },
  { name:'Red Hills', lat:42.0000, lng:78.5000, zone:'karakol', cat:'📸', notes:'Colline rosse, paesaggio unico' },
  { name:'Kol-Ukok', lat:42.0500, lng:78.3000, zone:'karakol', cat:'🏔️', notes:'Lago alpino. Horse riding spot.' },
  { name:'Kara-Tash', lat:42.1500, lng:78.8000, zone:'karakol', cat:'📸', notes:'"Islanda del Kirghizistan". Paesaggio vulcanico.' },
  // ===== ⚠️ SARY-JAZ =====
  { name:'Sary-Jaz Valley', lat:42.5000, lng:79.5000, zone:'saryjaz', cat:'⚠️', notes:'PERMESSO CONFINE! Zona remota, 4x4 essenziale.' },
  { name:'Inylchek', lat:42.2500, lng:79.8000, zone:'saryjaz', cat:'⚠️', notes:'PERMESSO CONFINE. Zona ghiacciai.' },
  // ===== 🏖️ ISSYK-KUL SUD =====
  { name:'Ak-Say Canyon', lat:42.3500, lng:76.8000, zone:'issyksud', cat:'📸', notes:'Canyon sul lago. Spettacolare al golden hour. Hike 10-15min.' },
  { name:'Seven Bulls Rock (Jeti-Oguz)', lat:42.2800, lng:77.5500, zone:'issyksud', cat:'📸', notes:'Formazioni rocciose rosse sulla sponda sud.' },
  { name:'Barskoon Waterfall', lat:42.1500, lng:77.6000, zone:'issyksud', cat:'📸', notes:'Cascata + gorge. Spot drone.' },
  { name:'Barskoon Gorge', lat:42.1300, lng:77.5800, zone:'issyksud', cat:'📸', notes:'Gola spettacolare, strada verso Arabel.' },
  { name:'Arabel Plateau', lat:41.9500, lng:77.5000, zone:'issyksud', cat:'⛺', notes:'Altopiano per campeggio. Via Barskoon Pass.' },
  { name:'Fairy Tale Canyon (Skazka)', lat:42.3847, lng:77.2575, zone:'issyksud', cat:'📸', notes:'Formazioni rocciose rosse. Meglio al tramonto.' },
  { name:'Bokonbayevo', lat:42.1208, lng:76.9900, zone:'issyksud', cat:'📍', notes:'Eagle hunting demo via CBT. Traduttore inglese.' },
  // ===== ⛺ SONG-KUL =====
  { name:'Kochkor', lat:42.0133, lng:75.7592, zone:'songkul', cat:'⛽', notes:'⛽ ULTIMO CARBURANTE prima Song-Kul! Feltro shyrdak.' },
  { name:'Song-Kul Lake', lat:41.8333, lng:75.1500, zone:'songkul', cat:'⛺', notes:'Lago 3016m. Horse riding, kumys, stargazing.' },
  { name:'Ak-Say Valley viewpoint', lat:41.9000, lng:75.3000, zone:'songkul', cat:'📸', notes:'Hike 10-15min. Mattina o tardo pomeriggio.' },
  { name:'Yurt Camp Jyrgal', lat:41.8500, lng:75.2000, zone:'songkul', cat:'🏨', notes:'@yurtcamp_jyrgal' },
  { name:'Nomads Dream Camp', lat:41.8200, lng:75.1800, zone:'songkul', cat:'🏨', notes:'@nomads_dream.kg' },
  // ===== 🏛️ NARYN / TASH RABAT =====
  { name:'Naryn', lat:41.4287, lng:76.0014, zone:'naryn', cat:'⛽', notes:'🏧 ULTIMO ATM! ⛽ Benzina.' },
  { name:'Tash Rabat', lat:40.8453, lng:75.2847, zone:'naryn', cat:'🏛️', notes:'Caravanserraglio XV sec, Via della Seta. 3200m.' },
  { name:'Kok-Kiya Canyon', lat:41.0000, lng:75.5000, zone:'naryn', cat:'📸', notes:'Canyon off the beaten track.' },
  // ===== ⚠️ KEL-SUU =====
  { name:'At-Bashy', lat:41.1714, lng:75.7986, zone:'kelsuu', cat:'⛽', notes:'Noleggio UAZ per Kel-Suu.' },
  { name:'Kel-Suu Lake', lat:40.5811, lng:75.0742, zone:'kelsuu', cat:'⚠️', notes:'PERMESSO CONFINE! Lago turchese 3500m. Serve UAZ.' },
  // ===== 🌿 SUD =====
  { name:'Kazarman', lat:41.4000, lng:74.0333, zone:'sud', cat:'📍', notes:'Tappa sulla strada più selvaggia.' },
  { name:'Arslanbob', lat:41.3311, lng:72.9389, zone:'sud', cat:'🏔️', notes:'Foresta di noci più grande al mondo. Big Waterfall 80m.' },
  { name:'Sulaiman-Too (UNESCO)', lat:40.5278, lng:72.7964, zone:'sud', cat:'🏛️', notes:'Montagna sacra UNESCO, Osh.' },
  { name:'Osh Bazaar', lat:40.5333, lng:72.8000, zone:'sud', cat:'🛒', notes:'Uno dei più grandi mercati dell\'Asia Centrale.' },
  // ===== 💧 CASCATE =====
  { name:'Barskoon Waterfalls', lat:42.1500, lng:77.6000, zone:'cascate', cat:'💧', notes:'3 cascate in serie. La più famosa del Kirghizistan. Facile accesso alla prima, hike per le superiori.' },
  { name:'Arslanbob Big Waterfall', lat:41.3400, lng:72.9500, zone:'cascate', cat:'💧', notes:'Cascata 80m nella foresta di noci. Hike 1-2h.' },
  { name:'Arslanbob Small Waterfall', lat:41.3350, lng:72.9450, zone:'cascate', cat:'💧', notes:'Più accessibile della Big. Bella passeggiata.' },
  { name:'Ak-Sai Waterfall (Ala-Archa)', lat:42.6300, lng:74.4900, zone:'cascate', cat:'💧', notes:'Hike 3-4h A/R da Ala-Archa NP. 2300m. Facile/moderato.' },
  { name:'Jyrgalan Waterfall', lat:42.8300, lng:79.2200, zone:'cascate', cat:'💧', notes:'Waterfall Trail 5-6h. Valle verde.' },
  { name:'Shaar Waterfall (Ala-Archa)', lat:42.6200, lng:74.5000, zone:'cascate', cat:'💧', notes:'Cascata nel parco Ala-Archa. Meno visitata di Ak-Sai.' },
  { name:'Abshir-Ata Waterfall', lat:41.2000, lng:72.7500, zone:'cascate', cat:'💧', notes:'Cascata sacra vicino Osh. Esce direttamente dalla roccia. Luogo di pellegrinaggio.' },
  { name:'Chon-Kyzyl-Suu Waterfall', lat:42.2500, lng:78.0000, zone:'cascate', cat:'💧', notes:'Cascata nella valle Chon-Kyzyl-Suu, sponda sud Issyk-Kul.' },
  { name:'Sary-Chelek Waterfall', lat:41.8700, lng:71.9700, zone:'cascate', cat:'💧', notes:'Cascata nel parco Sary-Chelek. Zona remota ma spettacolare.' },
  { name:'Kegety Waterfall', lat:42.7500, lng:74.9500, zone:'cascate', cat:'💧', notes:'Cascata 30m nella gola di Kegety. 1.5h da Bishkek. Facile accesso.' },
  // ===== 🏨 ALLOGGI EXTRA =====
  { name:'Sky Glamping', lat:42.5000, lng:76.5000, zone:'alloggi', cat:'🏨', notes:'Glamping con vista. @sky_glamping_' },
  { name:'A-Frame Village', lat:42.4000, lng:76.0000, zone:'alloggi', cat:'🏨', notes:'@aframevillage' },
  { name:'Alto Cabins', lat:42.3500, lng:76.2000, zone:'alloggi', cat:'🏨', notes:'@alto.cabins' },
  { name:'Arashan Hotel', lat:42.4800, lng:78.3800, zone:'alloggi', cat:'🏨', notes:'@arashan.hotel' }
];

var REC_ZONES = [
  { key: null, label: 'Tutti' },
  { key: 'bishkek', label: '🏙️ Bishkek' },
  { key: 'issyknord', label: '🏔️ Issyk N' },
  { key: 'karakol', label: '🏔️ Karakol' },
  { key: 'saryjaz', label: '⚠️ Sary-Jaz' },
  { key: 'issyksud', label: '🏖️ Issyk S' },
  { key: 'songkul', label: '⛺ Song-Kul' },
  { key: 'naryn', label: '🏛️ Naryn' },
  { key: 'kelsuu', label: '⚠️ Kel-Suu' },
  { key: 'sud', label: '🌿 Sud' },
  { key: 'cascate', label: '💧 Cascate' },
  { key: 'alloggi', label: '🏨 Alloggi' }
];

/**
 * Cerca i details di un'activity in ITINERARY che matchi parzialmente il nome del posto.
 * Ritorna l'oggetto details ({why, duration, cost, tip}) se trovato, null altrimenti.
 * Cerca sia nella description che nei campi details.why/tip.
 */
function getDetailsForPlace(placeName) {
  if (typeof ITINERARY === 'undefined' || !placeName) return null;
  var lower = placeName.toLowerCase();
  // Tokens significativi del nome del posto (ignora parole brevi)
  var tokens = lower.split(/[\s\-,()]+/).filter(function(t) { return t.length >= 4; });
  if (tokens.length === 0) tokens = [lower];
  for (var d = 0; d < ITINERARY.length; d++) {
    var acts = ITINERARY[d].activities || [];
    for (var a = 0; a < acts.length; a++) {
      if (!acts[a].details) continue;
      // Cerca i token sia nella description che nei campi why/tip dei details
      var haystack = (acts[a].description || '').toLowerCase();
      var det = acts[a].details;
      if (det.why)  haystack += ' ' + det.why.toLowerCase();
      if (det.tip)  haystack += ' ' + det.tip.toLowerCase();
      for (var t = 0; t < tokens.length; t++) {
        if (haystack.indexOf(tokens[t]) !== -1) return acts[a].details;
      }
    }
  }
  return null;
}

/**
 * Generate valid KML XML string from waypoints.
 * @param {Array} waypoints
 * @returns {string} KML XML string
 */
function generateKML(waypoints) {
  var kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
  kml += '<Document>\n';
  kml += '<name>Kyrgyzstan 2025</name>\n';

  // Style definitions for each type
  var styles = {
    poi:        { color: 'ff0078ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png' },
    trailhead:  { color: 'ff00aa00', icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png' },
    drone:      { color: 'ff00d4ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png' },
    carburante: { color: 'ff0000ff', icon: 'http://maps.google.com/mapfiles/kml/paddle/red-blank.png' },
    emergenza:  { color: 'ff0000cc', icon: 'http://maps.google.com/mapfiles/kml/paddle/red-stars.png' }
  };

  var types = ['poi', 'trailhead', 'drone', 'carburante', 'emergenza'];
  for (var t = 0; t < types.length; t++) {
    var type = types[t];
    var s = styles[type];
    kml += '<Style id="style-' + type + '">\n';
    kml += '  <IconStyle>\n';
    kml += '    <color>' + s.color + '</color>\n';
    kml += '    <Icon><href>' + s.icon + '</href></Icon>\n';
    kml += '  </IconStyle>\n';
    kml += '</Style>\n';
  }

  // Placemarks
  for (var i = 0; i < waypoints.length; i++) {
    var wp = waypoints[i];
    var styleType = styles[wp.type] ? wp.type : 'poi';
    kml += '<Placemark>\n';
    kml += '  <name>' + wp.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</name>\n';
    kml += '  <styleUrl>#style-' + styleType + '</styleUrl>\n';
    kml += '  <Point>\n';
    kml += '    <coordinates>' + wp.lng + ',' + wp.lat + ',0</coordinates>\n';
    kml += '  </Point>\n';
    kml += '</Placemark>\n';
  }

  kml += '</Document>\n';
  kml += '</kml>';
  return kml;
}

function downloadKML() {
  var kml = generateKML(WAYPOINTS);
  var blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'kyrgyzstan-2025.kml';
  a.click();
  URL.revokeObjectURL(url);
}

function renderGps() {
  return new Promise(function (resolve) {
    DB.getAll('places').then(function (savedPlaces) {
      var places = savedPlaces.length > 0 ? savedPlaces : DEFAULT_PLACES.slice();
      if (savedPlaces.length === 0) {
        for (var dp = 0; dp < DEFAULT_PLACES.length; dp++) DB.put('places', DEFAULT_PLACES[dp]);
      }

      var wrapper = document.createElement('div');
      wrapper.className = 'section-content fade-in';
      var currentTab = 'consigli';
      var activeZone = null;
      var activeFilter = 'tutti';
      var searchQuery = '';

      function render() {
        var html = '<h2 class="section-title">📍 Saved Places</h2>';

        // Tab selector (like Parole/Frasi)
        html += '<div class="person-selector" id="gps-tabs">';
        html += '<button class="person-btn' + (currentTab === 'consigli' ? ' active' : '') + '" data-tab="consigli" type="button">🗺️ Consigli</button>';
        html += '<button class="person-btn' + (currentTab === 'miei' ? ' active' : '') + '" data-tab="miei" type="button">📌 I Miei</button>';
        html += '<button class="person-btn' + (currentTab === 'waypoints' ? ' active' : '') + '" data-tab="waypoints" type="button">📍 Waypoints</button>';
        html += '</div>';

        if (currentTab === 'consigli') html += buildConsigli();
        else if (currentTab === 'miei') html += buildMiei(places);
        else html += buildWaypoints();

        wrapper.innerHTML = html;
        bindEvents(places);
      }

      function buildConsigli() {
        var h = '';
        // Zone filter bar
        h += '<div class="filter-bar" id="zone-filter">';
        for (var z = 0; z < REC_ZONES.length; z++) {
          var zone = REC_ZONES[z];
          h += '<button class="filter-btn zone-btn' + (activeZone === zone.key ? ' active' : '') + '" data-zone="' + (zone.key || '') + '" type="button">' + zone.label + '</button>';
        }
        h += '</div>';

        // Search
        h += '<input class="search-input" type="text" id="rec-search" placeholder="Cerca posto..." value="' + (searchQuery || '') + '">';

        // Add form (collapsible)
        h += '<details style="margin-bottom:12px;"><summary style="font-size:0.9rem;">➕ Aggiungi posto</summary>';
        h += '<div class="details-content">';
        h += '<div class="form-group"><label class="form-label">Nome</label>';
        h += '<input type="text" class="form-input" id="rec-add-name" placeholder="Nome del posto"></div>';
        h += '<div style="display:flex;gap:8px;">';
        h += '<div class="form-group" style="flex:1;"><label class="form-label">Lat</label>';
        h += '<input type="number" class="form-input" id="rec-add-lat" placeholder="42.0" step="0.0001"></div>';
        h += '<div class="form-group" style="flex:1;"><label class="form-label">Lng</label>';
        h += '<input type="number" class="form-input" id="rec-add-lng" placeholder="75.0" step="0.0001"></div></div>';
        h += '<div class="form-group"><label class="form-label">Zona</label><select class="form-select" id="rec-add-zone">';
        for (var rz = 0; rz < REC_ZONES.length; rz++) {
          if (REC_ZONES[rz].key) h += '<option value="' + REC_ZONES[rz].key + '">' + REC_ZONES[rz].label + '</option>';
        }
        h += '</select></div>';
        h += '<div class="form-group"><label class="form-label">Note</label>';
        h += '<input type="text" class="form-input" id="rec-add-notes" placeholder="Info, orari, costi..."></div>';
        h += '<button class="btn btn-primary btn-sm" id="rec-add-btn" type="button" style="width:100%;">Aggiungi</button>';
        h += '</div></details>';

        // Merge recommended + custom places from DB
        var customPlaces = places.filter(function(p) { return p.id && p.id.indexOf('rec-') === 0; });
        var allPlaces = RECOMMENDED_PLACES.slice();
        for (var cp = 0; cp < customPlaces.length; cp++) {
          allPlaces.push({ name: customPlaces[cp].name, lat: customPlaces[cp].lat, lng: customPlaces[cp].lng, zone: customPlaces[cp].zone || 'custom', cat: customPlaces[cp].category || '📌', notes: customPlaces[cp].notes || '', customId: customPlaces[cp].id });
        }

        // Filter
        var filtered = allPlaces;
        if (activeZone) {
          filtered = filtered.filter(function(p) { return p.zone === activeZone; });
        }
        if (searchQuery) {
          var q = searchQuery.toLowerCase();
          filtered = filtered.filter(function(p) {
            return p.name.toLowerCase().indexOf(q) !== -1 || p.notes.toLowerCase().indexOf(q) !== -1;
          });
        }

        // Render cards
        for (var i = 0; i < filtered.length; i++) {
          var p = filtered[i];
          var gmaps = 'https://www.google.com/maps/search/' + encodeURIComponent(p.name + ' Kyrgyzstan');
          var isWarning = p.notes.indexOf('PERMESSO') !== -1;
          var isCustom = !!p.customId;
          var placeDetails = getDetailsForPlace(p.name);
          var detailsId = 'rec-details-' + i;
          h += '<div style="padding:12px;margin-bottom:8px;background:var(--color-card);border-radius:var(--radius-sm);border:1px solid ' + (isWarning ? 'var(--color-danger)' : isCustom ? 'var(--color-secondary)' : 'var(--color-border)') + ';box-shadow:var(--shadow);">';
          h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;">';
          h += '<div style="flex:1;"><div style="font-weight:700;font-size:0.95rem;">' + p.cat + ' ' + p.name + (isCustom ? ' <span style="font-size:0.7rem;opacity:0.5;">(custom)</span>' : '') + '</div>';
          h += '<div style="font-size:0.82rem;opacity:0.7;margin-top:2px;">' + p.notes + '</div></div>';
          h += '<div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">';
          if (placeDetails) {
            h += '<button type="button" class="rec-details-btn" data-target="' + detailsId + '" style="background:none;border:1px solid var(--color-border);border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:0.85rem;line-height:1;padding:0;" title="Dettagli">ℹ️</button>';
          }
          if (isCustom) {
            h += '<button class="rec-del" data-rid="' + p.customId + '" type="button" style="background:none;border:none;font-size:1rem;cursor:pointer;opacity:0.4;color:var(--color-danger);">✕</button>';
          }
          h += '</div>';
          h += '</div>';
          // Pannello dettagli
          if (placeDetails) {
            h += '<div id="' + detailsId + '" class="rec-details-panel" style="display:none;margin-top:8px;padding:10px 12px;background:rgba(0,0,0,0.04);border-left:3px solid var(--color-accent);border-radius:6px;font-size:0.85rem;line-height:1.5;">';
            if (placeDetails.why)      h += '<div style="margin-bottom:6px;"><strong>Cos\'è:</strong> ' + placeDetails.why + '</div>';
            if (placeDetails.duration) h += '<div style="margin-bottom:6px;"><strong>⏱️ Durata:</strong> ' + placeDetails.duration + '</div>';
            if (placeDetails.cost)     h += '<div style="margin-bottom:6px;"><strong>💸 Costo:</strong> ' + placeDetails.cost + '</div>';
            if (placeDetails.tip)      h += '<div><strong>💡 Tip:</strong> ' + placeDetails.tip + '</div>';
            h += '</div>';
          }
          h += '<div style="display:flex;gap:6px;margin-top:8px;">';
          h += '<a href="' + gmaps + '" target="_blank" style="padding:6px 12px;background:var(--color-secondary);color:#fff;border-radius:6px;font-size:0.8rem;font-weight:600;text-decoration:none;">📍 Maps</a>';
          h += '<a href="https://www.google.com/maps?q=' + p.lat + ',' + p.lng + '" target="_blank" style="padding:6px 12px;background:rgba(255,255,255,0.1);color:var(--color-text);border-radius:6px;font-size:0.75rem;text-decoration:none;border:1px solid var(--color-border);">' + p.lat.toFixed(4) + ', ' + p.lng.toFixed(4) + '</a>';
          h += '</div></div>';
        }

        if (filtered.length === 0) {
          h += '<p style="text-align:center;opacity:0.5;margin-top:20px;">Nessun posto trovato</p>';
        }

        h += '<div style="text-align:center;margin-top:12px;font-size:0.75rem;opacity:0.3;">' + filtered.length + ' posti</div>';
        return h;
      }

      function buildMiei(places) {
        var h = '';
        h += '<input type="text" class="search-input" id="place-search" placeholder="Cerca nei tuoi posti...">';

        // Place list
        h += '<div id="place-list" style="margin-top:10px;">';
        for (var i = 0; i < places.length; i++) h += renderPlaceCard(places[i]);
        h += '</div>';

        // Add form
        h += '<details style="margin-top:12px;"><summary style="font-size:0.9rem;">➕ Aggiungi Posto</summary>';
        h += '<div class="details-content">';
        h += '<div class="form-group"><label class="form-label">Nome</label>';
        h += '<input type="text" class="form-input" id="place-name" placeholder="Nome del posto"></div>';
        h += '<div style="display:flex;gap:8px;">';
        h += '<div class="form-group" style="flex:1;"><label class="form-label">Lat</label>';
        h += '<input type="number" class="form-input" id="place-lat" placeholder="42.0" step="0.0001"></div>';
        h += '<div class="form-group" style="flex:1;"><label class="form-label">Lng</label>';
        h += '<input type="number" class="form-input" id="place-lng" placeholder="75.0" step="0.0001"></div></div>';
        h += '<div class="form-group"><label class="form-label">Categoria</label><select class="form-select" id="place-cat">';
        for (var c = 0; c < PLACE_CATEGORIES.length; c++) h += '<option value="' + PLACE_CATEGORIES[c] + '">' + PLACE_CATEGORIES[c] + '</option>';
        h += '</select></div>';
        h += '<div class="form-group"><label class="form-label">Note</label>';
        h += '<textarea class="form-textarea" id="place-notes" rows="2" placeholder="Info, orari, costi..."></textarea></div>';
        h += '<button class="btn btn-primary" id="place-add" type="button" style="width:100%;">Aggiungi</button>';
        h += '</div></details>';
        return h;
      }

      function buildWaypoints() {
        var h = '';
        h += '<button class="btn btn-primary btn-sm" onclick="downloadKML()" style="width:100%;margin-bottom:10px;">⬇️ Scarica KML</button>';
        h += '<div class="filter-bar" id="gps-filter-bar">';
        var filters = [{key:'tutti',label:'Tutti'},{key:'poi',label:'POI'},{key:'trailhead',label:'Trailhead'},{key:'drone',label:'Drone'}];
        for (var f = 0; f < filters.length; f++) {
          h += '<button class="filter-btn' + (filters[f].key === activeFilter ? ' active' : '') + '" data-filter="' + filters[f].key + '">' + filters[f].label + '</button>';
        }
        h += '</div>';
        h += '<div id="gps-list">' + buildWaypointList(activeFilter) + '</div>';
        return h;
      }

      function buildWaypointList(filter) {
        var h = '';
        var days = {};
        for (var i = 0; i < WAYPOINTS.length; i++) {
          var wp = WAYPOINTS[i];
          if (filter !== 'tutti' && wp.type !== filter) continue;
          if (!days[wp.day]) days[wp.day] = [];
          days[wp.day].push(wp);
        }
        var dayKeys = Object.keys(days).sort(function(a,b){return Number(a)-Number(b);});
        for (var d = 0; d < dayKeys.length; d++) {
          var wps = days[dayKeys[d]];
          h += '<div class="card"><div class="card-title">Giorno ' + dayKeys[d] + '</div>';
          for (var w = 0; w < wps.length; w++) {
            var pt = wps[w];
            var bc = pt.type === 'trailhead' ? 'badge-success' : pt.type === 'drone' ? 'badge-warning' : pt.type === 'carburante' || pt.type === 'emergenza' ? 'badge-danger' : 'badge-info';
            h += '<div style="padding:6px 0;border-bottom:1px solid var(--color-border);"><span class="badge ' + bc + '">' + pt.type + '</span> ';
            h += makeGpsLink(pt.name, pt.lat, pt.lng) + '</div>';
          }
          h += '</div>';
        }
        return h;
      }

      function renderPlaceCard(p) {
        var gmaps = 'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng;
        var h = '<div class="card place-card" data-id="' + p.id + '" style="margin-bottom:8px;">';
        h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;">';
        h += '<div style="flex:1;"><div style="font-weight:700;font-size:0.95rem;">' + p.name + '</div>';
        h += '<div style="font-size:0.78rem;opacity:0.6;">' + (p.category || '') + '</div></div>';
        h += '<button class="expense-delete place-delete" data-id="' + p.id + '" type="button">✕</button></div>';
        if (p.notes) h += '<div style="font-size:0.85rem;margin-top:4px;">' + p.notes + '</div>';
        h += '<div style="display:flex;gap:6px;margin-top:6px;">';
        h += '<a class="btn btn-sm btn-primary" href="' + gmaps + '" target="_blank">📍 Maps</a>';
        h += '<span class="gps-link" style="font-size:0.75rem;">' + p.lat.toFixed(4) + ', ' + p.lng.toFixed(4) + '</span>';
        h += '</div></div>';
        return h;
      }

      function bindEvents(places) {
        // Tab switching
        var tabs = wrapper.querySelectorAll('#gps-tabs .person-btn');
        for (var t = 0; t < tabs.length; t++) {
          tabs[t].addEventListener('click', function() {
            currentTab = this.dataset.tab;
            render();
          });
        }

        if (currentTab === 'consigli') {
          // Zone filter
          var zoneBtns = wrapper.querySelectorAll('.zone-btn');
          for (var z = 0; z < zoneBtns.length; z++) {
            zoneBtns[z].addEventListener('click', function() {
              var val = this.getAttribute('data-zone');
              activeZone = val === '' ? null : val;
              render();
            });
          }
          // Search
          var recSearch = wrapper.querySelector('#rec-search');
          if (recSearch) recSearch.addEventListener('input', function() {
            searchQuery = this.value;
            render();
            var si = wrapper.querySelector('#rec-search');
            if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
          });
          // Add custom place
          var recAddBtn = wrapper.querySelector('#rec-add-btn');
          if (recAddBtn) recAddBtn.addEventListener('click', function() {
            var name = wrapper.querySelector('#rec-add-name').value.trim();
            var lat = parseFloat(wrapper.querySelector('#rec-add-lat').value);
            var lng = parseFloat(wrapper.querySelector('#rec-add-lng').value);
            var zone = wrapper.querySelector('#rec-add-zone').value;
            var notes = wrapper.querySelector('#rec-add-notes').value.trim();
            if (!name) { showToast('Inserisci un nome'); return; }
            if (isNaN(lat) || isNaN(lng)) { showToast('Coordinate non valide'); return; }
            var np = { id: 'rec-' + Date.now(), name: name, lat: lat, lng: lng, zone: zone, category: '📌', notes: notes, updatedAt: Date.now() };
            places.push(np);
            DB.put('places', np).then(function() { showToast('Aggiunto ✓'); render(); });
          });
          // Delete custom place
          var recDels = wrapper.querySelectorAll('.rec-del');
          for (var rd = 0; rd < recDels.length; rd++) {
            (function(btn) { btn.addEventListener('click', function() {
              var rid = this.getAttribute('data-rid');
              for (var r = places.length - 1; r >= 0; r--) { if (places[r].id === rid) { places.splice(r, 1); break; } }
              DB.delete('places', rid).then(function() { showToast('Rimosso'); render(); });
            }); })(recDels[rd]);
          }
          // Details toggle
          var recDetails = wrapper.querySelectorAll('.rec-details-btn');
          for (var rd2 = 0; rd2 < recDetails.length; rd2++) {
            (function(btn) { btn.addEventListener('click', function() {
              var targetId = this.getAttribute('data-target');
              var panel = document.getElementById(targetId);
              if (!panel) return;
              panel.style.display = (panel.style.display === 'none' || !panel.style.display) ? 'block' : 'none';
            }); })(recDetails[rd2]);
          }
        }

        if (currentTab === 'miei') {
          // Search
          var se = wrapper.querySelector('#place-search');
          if (se) se.addEventListener('input', function() {
            var q = this.value.toLowerCase();
            var cards = wrapper.querySelectorAll('.place-card');
            for (var i = 0; i < cards.length; i++) cards[i].style.display = cards[i].textContent.toLowerCase().indexOf(q) >= 0 ? '' : 'none';
          });
          // Add
          var ab = wrapper.querySelector('#place-add');
          if (ab) ab.addEventListener('click', function() {
            var name = wrapper.querySelector('#place-name').value.trim();
            var lat = parseFloat(wrapper.querySelector('#place-lat').value);
            var lng = parseFloat(wrapper.querySelector('#place-lng').value);
            if (!name) { showToast('Inserisci un nome'); return; }
            if (isNaN(lat) || isNaN(lng)) { showToast('Coordinate non valide'); return; }
            var np = { id:'p-'+Date.now(), name:name, lat:lat, lng:lng, category:wrapper.querySelector('#place-cat').value, notes:wrapper.querySelector('#place-notes').value };
            places.push(np);
            DB.put('places', np).then(function() { showToast('Aggiunto ✓'); render(); });
          });
          // Delete
          var dbs = wrapper.querySelectorAll('.place-delete');
          for (var d = 0; d < dbs.length; d++) {
            (function(btn){ btn.addEventListener('click', function() {
              var id = this.dataset.id;
              for (var r = places.length-1; r >= 0; r--) { if (places[r].id === id) { places.splice(r,1); break; } }
              DB.delete('places', id).then(function() { showToast('Rimosso'); render(); });
            }); })(dbs[d]);
          }
        }

        if (currentTab === 'waypoints') {
          var bar = wrapper.querySelector('#gps-filter-bar');
          if (bar) {
            var btns = bar.querySelectorAll('.filter-btn');
            for (var b = 0; b < btns.length; b++) {
              btns[b].addEventListener('click', function() {
                for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
                this.classList.add('active');
                activeFilter = this.getAttribute('data-filter');
                var list = wrapper.querySelector('#gps-list');
                if (list) list.innerHTML = buildWaypointList(activeFilter);
              });
            }
          }
        }
      }

      render();
      resolve(wrapper);
    });
  });
}
