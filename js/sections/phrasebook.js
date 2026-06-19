/**
 * phrasebook.js — Frasario: Parole + Frasi
 * Kyrgyzstan Travel PWA 2026
 *
 * Due tab: 🗣️ Parole | 💬 Frasi
 * Global: renderPhrasebook(), speakText()
 */

// ===== Text-to-Speech (pronunciation audio) =====
function speakText(text, lang) {
  if (!window.speechSynthesis) {
    showToast('Audio non supportato su questo dispositivo');
    return;
  }
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  var utterance = new SpeechSynthesisUtterance(text);
  // Map language codes — Kyrgyz may not be available, fallback to Russian
  if (lang === 'ky' || lang === 'kg') {
    // Try Kyrgyz first, fallback to Russian (most similar available)
    utterance.lang = 'ky-KG';
    var voices = window.speechSynthesis.getVoices();
    var hasKyrgyz = voices.some(function(v) { return v.lang.indexOf('ky') === 0; });
    if (!hasKyrgyz) {
      utterance.lang = 'ru-RU'; // Russian is widely understood in Kyrgyzstan
    }
  } else {
    utterance.lang = 'ru-RU';
  }
  utterance.rate = 0.85; // Slightly slower for learning
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

// ===== Favorites (Parole) =====
function getFavPhrases() {
  try { return JSON.parse(localStorage.getItem('kg-fav-phrases') || '[]'); } catch(e) { return []; }
}
function saveFavPhrases(favs) {
  localStorage.setItem('kg-fav-phrases', JSON.stringify(favs));
}
function isFav(phraseIt) {
  return getFavPhrases().indexOf(phraseIt) !== -1;
}
function toggleFav(phraseIt) {
  var favs = getFavPhrases();
  var idx = favs.indexOf(phraseIt);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(phraseIt);
  saveFavPhrases(favs);
}

function filterPhrases(phrases, query, category) {
  var result = phrases;
  if (category === '⭐') {
    var favs = getFavPhrases();
    result = result.filter(function(p) { return favs.indexOf(p.it) !== -1; });
  } else if (category && category !== '') {
    result = result.filter(function(p) { return p.category === category; });
  }
  if (query && query.trim() !== '') {
    var q = query.toLowerCase();
    result = result.filter(function(p) {
      return p.it.toLowerCase().indexOf(q) !== -1 ||
             p.kg.toLowerCase().indexOf(q) !== -1 ||
             p.ru.toLowerCase().indexOf(q) !== -1 ||
             p.pronunciation.toLowerCase().indexOf(q) !== -1;
    });
  }
  return result;
}

// ===== Favorites (Frasi) =====
function getFavFrasi() {
  try { return JSON.parse(localStorage.getItem('kg-fav-frasi') || '[]'); } catch(e) { return []; }
}
function saveFavFrasi(favs) {
  localStorage.setItem('kg-fav-frasi', JSON.stringify(favs));
}
function isFavFrase(fid) {
  return getFavFrasi().indexOf(fid) !== -1;
}
function toggleFavFrase(fid) {
  var favs = getFavFrasi();
  var idx = favs.indexOf(fid);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(fid);
  saveFavFrasi(favs);
}

// ===== Custom Frasi =====
var DEFAULT_FRASI = [
  // ⚠️ EMERGENZA — IN CIMA, sempre visibili
  { id: 'fr-em-1', cat: 'emergenza', it: '🆘 Aiuto!', translation: 'Помогите! (Pomogite!)' },
  { id: 'fr-em-2', cat: 'emergenza', it: '🆘 Chiamate la polizia (102)', translation: 'Вызовите полицию (Vyzovite politsiyu) — 102' },
  { id: 'fr-em-3', cat: 'emergenza', it: '🆘 Chiamate un\'ambulanza (103)', translation: 'Вызовите скорую (Vyzovite skoruyu) — 103' },
  { id: 'fr-em-4', cat: 'emergenza', it: '🏥 Dov\'è l\'ospedale più vicino?', translation: 'Где ближайшая больница? (Gde blizhayshaya bolnitsa?)' },
  { id: 'fr-em-5', cat: 'emergenza', it: '💊 Dov\'è la farmacia?', translation: 'Где аптека? (Gde apteka?)' },
  { id: 'fr-em-6', cat: 'emergenza', it: '🏥 Ho bisogno di un dottore', translation: 'Мне нужен врач (Mne nuzhen vrach)' },
  { id: 'fr-em-7', cat: 'emergenza', it: '🤕 Sono ferito / si è fatto male', translation: 'Я ранен / он ранен (Ya ranen / on ranen)' },
  { id: 'fr-em-8', cat: 'emergenza', it: '🫁 Non riesco a respirare', translation: 'Я не могу дышать (Ya ne mogu dyshat)' },
  { id: 'fr-em-9', cat: 'emergenza', it: '🤕 Mi fa male qui', translation: 'У меня болит здесь (U menya bolit zdes)' },
  { id: 'fr-em-10', cat: 'emergenza', it: '🤢 Mal di testa / stomaco / petto', translation: 'Болит голова / живот / грудь (Bolit golova / zhivot / grud)' },
  { id: 'fr-em-11', cat: 'emergenza', it: '⛰️ Ho il mal di montagna (mal acuto)', translation: 'У меня горная болезнь (U menya gornaya bolezn)' },
  { id: 'fr-em-12', cat: 'emergenza', it: '💊 Avete medicine per il mal di montagna?', translation: 'У вас есть лекарство от горной болезни? (U vas yest lekarstvo ot gornoy bolezni?)' },
  { id: 'fr-em-13', cat: 'emergenza', it: '🆔 Sono italiano. Chiamate l\'ambasciata italiana ad Astana: +7 7172 243390', translation: 'Я итальянец. Звоните в Посольство Италии в Астане: +7 7172 243390 (Ya italyanets. Zvonite v Posolstvo Italii v Astane)' },
  { id: 'fr-em-14', cat: 'emergenza', it: '📱 Posso usare il vostro telefono?', translation: 'Можно воспользоваться вашим телефоном? (Mozhno vospolzovatsya vashim telefonom?)' },
  { id: 'fr-em-15', cat: 'emergenza', it: '🚗 La macchina si è rotta', translation: 'Машина сломалась (Mashina slomalas)' },
  { id: 'fr-em-16', cat: 'emergenza', it: '🚗 Siamo rimasti bloccati', translation: 'Мы застряли (My zastryali)' },
  { id: 'fr-em-17', cat: 'emergenza', it: '⛽ Non abbiamo più benzina', translation: 'У нас кончился бензин (U nas konchilsya benzin)' },
  { id: 'fr-em-18', cat: 'emergenza', it: '🚓 Sono stato derubato', translation: 'Меня ограбили (Menya ograbili)' },
  { id: 'fr-em-19', cat: 'emergenza', it: '😵 Mi sono perso', translation: 'Я заблудился (Ya zabludilsya)' },
  { id: 'fr-em-20', cat: 'emergenza', it: '⚠️ Non parlo russo, è un\'emergenza', translation: 'Я не говорю по-русски, это срочно (Ya ne govoryu po-russki, eto srochno)' },

  // Strada e guida
  { id: 'fr-1', cat: 'strada', it: 'La strada è aperta?', translation: 'Дорога открыта? (Doroga otkryta?)' },
  { id: 'fr-2', it: 'Quanto manca al prossimo villaggio?', translation: 'Сколько до следующего села? (Skolko do sleduyushchego sela?)' },
  { id: 'fr-3', it: 'La strada è asfaltata o sterrata?', translation: 'Дорога асфальтированная или грунтовая? (Doroga asfaltirovannaya ili gruntovaya?)' },
  { id: 'fr-4', it: 'Il guado è profondo?', translation: 'Брод глубокий? (Brod glubokiy?)' },
  { id: 'fr-5', it: 'Il passo è percorribile con una macchina normale?', translation: 'Перевал проходим на обычной машине? (Pereval prokhodim na obychnoy mashine?)' },
  { id: 'fr-6', it: 'A che ora chiude il passo?', translation: 'Во сколько закрывается перевал? (Vo skolko zakryvayetsya pereval?)' },
  { id: 'fr-7', it: 'Il fiume si può attraversare in macchina?', translation: 'Реку можно переехать на машине? (Reku mozhno pereyekhat na mashine?)' },
  { id: 'fr-8', it: 'C\'è pericolo di frane qui?', translation: 'Здесь есть опасность оползней? (Zdes yest opasnost opolzney?)' },
  { id: 'fr-9', it: 'Dobbiamo tornare indietro?', translation: 'Нам нужно вернуться назад? (Nam nuzhno vernutsya nazad?)' },
  { id: 'fr-10', it: 'Quanto tempo ci vuole per arrivare a...?', translation: 'Сколько времени ехать до...? (Skolko vremeni yekhat do...?)' },
  { id: 'fr-11', it: 'Potete indicarci la strada per...?', translation: 'Можете показать дорогу до...? (Mozhete pokazat dorogu do...?)' },
  { id: 'fr-12', it: 'Possiamo parcheggiare qui?', translation: 'Можно здесь припарковаться? (Mozhno zdes priparkavatsya?)' },
  { id: 'fr-13', it: 'Siamo persi, potete aiutarci?', translation: 'Мы заблудились, можете помочь? (My zabludilis, mozhete pomoch?)' },
  { id: 'fr-14', it: 'C\'è una strada alternativa?', translation: 'Есть другая дорога? (Yest drugaya doroga?)' },
  { id: 'fr-15', it: 'La strada è pericolosa di notte?', translation: 'Дорога опасна ночью? (Doroga opasna nochyu?)' },
  { id: 'fr-16', it: 'Quanto è ripida la salita?', translation: 'Насколько крутой подъём? (Naskolko krutoy podyom?)' },
  // Macchina e meccanica
  { id: 'fr-17', it: 'La macchina non parte', translation: 'Машина не заводится (Mashina ne zavoditsya)' },
  { id: 'fr-18', it: 'Abbiamo bucato una gomma', translation: 'У нас спустило колесо (U nas spustilo koleso)' },
  { id: 'fr-19', it: 'Ci serve un traino', translation: 'Нам нужен буксир (Nam nuzhen buksir)' },
  { id: 'fr-20', it: 'Abbiamo bisogno di un cric', translation: 'Нам нужен домкрат (Nam nuzhen domkrat)' },
  { id: 'fr-21', it: 'Il motore fa un rumore strano', translation: 'Двигатель странно шумит (Dvigatel stranno shumit)' },
  { id: 'fr-22', it: 'Dov\'è il meccanico più vicino?', translation: 'Где ближайший механик? (Gde blizhayshiy mekhanik?)' },
  { id: 'fr-23', it: 'Dove possiamo lavare la macchina?', translation: 'Где можно помыть машину? (Gde mozhno pomyt mashinu?)' },
  { id: 'fr-24', it: 'I freni non funzionano bene', translation: 'Тормоза плохо работают (Tormoza plokho rabotayut)' },
  { id: 'fr-25', it: 'Si è accesa una spia sul cruscotto', translation: 'На панели загорелась лампочка (Na paneli zagorelas lampochka)' },
  { id: 'fr-26', it: 'Perde olio', translation: 'Течёт масло (Techyot maslo)' },
  { id: 'fr-27', it: 'Il radiatore si surriscalda', translation: 'Радиатор перегревается (Radiator peregrevayetsya)' },
  { id: 'fr-28', it: 'Avete un pezzo di ricambio per...?', translation: 'У вас есть запчасть для...? (U vas yest zapchast dlya...?)' },
  // Benzina
  { id: 'fr-29', it: 'Dov\'è la stazione di benzina più vicina?', translation: 'Где ближайшая заправка? (Gde blizhayshaya zapravka?)' },
  { id: 'fr-30', it: 'C\'è benzina nel prossimo paese?', translation: 'Есть бензин в следующем городе? (Yest benzin v sleduyushchem gorode?)' },
  { id: 'fr-31', it: 'Quanto costa un pieno?', translation: 'Сколько стоит полный бак? (Skolko stoit polnyy bak?)' },
  { id: 'fr-32', it: 'Avete diesel o solo benzina?', translation: 'У вас есть дизель или только бензин? (U vas yest dizel ili tolko benzin?)' },
  { id: 'fr-33', it: 'Benzina 92 o 95?', translation: 'Бензин 92 или 95? (Benzin 92 ili 95?)' },
  { id: 'fr-34', it: 'Riempite il serbatoio per favore', translation: 'Полный бак, пожалуйста (Polnyy bak, pozhaluysta)' },
  // Alloggio
  { id: 'fr-35', it: 'Avete una stanza per due?', translation: 'У вас есть комната на двоих? (U vas yest komnata na dvoikh?)' },
  { id: 'fr-36', it: 'Quanto costa per notte?', translation: 'Сколько стоит за ночь? (Skolko stoit za noch?)' },
  { id: 'fr-37', it: 'Possiamo dormire nella yurta?', translation: 'Можно переночевать в юрте? (Mozhno perenochevatʼ v yurte?)' },
  { id: 'fr-38', it: 'Possiamo piantare la tenda qui?', translation: 'Можно здесь поставить палатку? (Mozhno zdes postavit palatku?)' },
  { id: 'fr-39', it: 'Possiamo avere acqua calda?', translation: 'Можно горячую воду? (Mozhno goryachuyu vodu?)' },
  { id: 'fr-40', it: 'Possiamo avere una coperta in più?', translation: 'Можно ещё одно одеяло? (Mozhno yeshchyo odno odeyalo?)' },
  { id: 'fr-41', it: 'A che ora è la colazione?', translation: 'Во сколько завтрак? (Vo skolko zavtrak?)' },
  { id: 'fr-42', it: 'C\'è acqua calda per la doccia?', translation: 'Есть горячая вода для душа? (Yest goryachaya voda dlya dusha?)' },
  { id: 'fr-43', it: 'Possiamo lasciare i bagagli qui?', translation: 'Можно оставить вещи здесь? (Mozhno ostavit veshchi zdes?)' },
  // Cibo e ristorante
  { id: 'fr-44', it: 'C\'è un posto dove mangiare qui vicino?', translation: 'Есть где поесть поблизости? (Yest gde poyest poblizosti?)' },
  { id: 'fr-45', it: 'Possiamo assaggiare il kumys?', translation: 'Можно попробовать кумыс? (Mozhno poprobovat kumys?)' },
  { id: 'fr-46', it: 'Possiamo comprare del pane?', translation: 'Можно купить хлеб? (Mozhno kupit khleb?)' },
  { id: 'fr-47', it: 'Cosa ci consigliate di mangiare?', translation: 'Что посоветуете поесть? (Chto posovetuyete poyest?)' },
  { id: 'fr-48', it: 'Senza carne, per favore', translation: 'Без мяса, пожалуйста (Bez myasa, pozhaluysta)' },
  { id: 'fr-49', it: 'È piccante?', translation: 'Это острое? (Eto ostroye?)' },
  { id: 'fr-50', it: 'Il conto, per favore', translation: 'Счёт, пожалуйста (Schyot, pozhaluysta)' },
  { id: 'fr-51', it: 'Ancora un tè, per favore', translation: 'Ещё один чай, пожалуйста (Yeshchyo odin chay, pozhaluysta)' },
  { id: 'fr-52', it: 'Era buonissimo, grazie!', translation: 'Было очень вкусно, спасибо! (Bylo ochen vkusno, spasibo!)' },
  { id: 'fr-53', it: 'Dove posso comprare acqua potabile?', translation: 'Где можно купить питьевую воду? (Gde mozhno kupit pityevuyu vodu?)' },
  // Quotidiano e pratico
  { id: 'fr-54', it: 'Posso caricare il telefono?', translation: 'Можно зарядить телефон? (Mozhno zaryadit telefon?)' },
  { id: 'fr-55', it: 'C\'è campo telefono qui?', translation: 'Здесь есть связь? (Zdes yest svyaz?)' },
  { id: 'fr-56', it: 'Avete il WiFi?', translation: 'У вас есть вайфай? (U vas yest vayfay?)' },
  { id: 'fr-57', it: 'Dov\'è il bagno?', translation: 'Где туалет? (Gde tualet?)' },
  { id: 'fr-58', it: 'Possiamo pagare con carta?', translation: 'Можно оплатить картой? (Mozhno oplatit kartoy?)' },
  { id: 'fr-59', it: 'Dov\'è il bancomat più vicino?', translation: 'Где ближайший банкомат? (Gde blizhayshiy bankomat?)' },
  { id: 'fr-60', it: 'Potete cambiare euro?', translation: 'Можете обменять евро? (Mozhete obmenyat yevro?)' },
  { id: 'fr-61', it: 'Quanto costa questo?', translation: 'Сколько это стоит? (Skolko eto stoit?)' },
  { id: 'fr-62', it: 'È troppo caro', translation: 'Это слишком дорого (Eto slishkom dorogo)' },
  { id: 'fr-63', it: 'Potete fare uno sconto?', translation: 'Можно скидку? (Mozhno skidku?)' },
  // Natura e attività
  { id: 'fr-64', it: 'Possiamo fare il bagno nel lago?', translation: 'Можно купаться в озере? (Mozhno kupatsya v ozere?)' },
  { id: 'fr-65', it: 'A che altitudine siamo?', translation: 'На какой высоте мы? (Na kakoy vysote my?)' },
  { id: 'fr-66', it: 'C\'è un sentiero per il lago?', translation: 'Есть тропа к озеру? (Yest tropa k ozeru?)' },
  { id: 'fr-67', it: 'Quanto dura il trekking?', translation: 'Сколько длится поход? (Skolko dlitsya pokhod?)' },
  { id: 'fr-68', it: 'È pericoloso andare da soli?', translation: 'Опасно идти одним? (Opasno idti odnim?)' },
  { id: 'fr-69', it: 'Ci sono lupi/orsi qui?', translation: 'Здесь есть волки/медведи? (Zdes yest volki/medvedi?)' },
  { id: 'fr-70', it: 'Possiamo fare foto qui?', translation: 'Можно здесь фотографировать? (Mozhno zdes fotografirovat?)' },
  { id: 'fr-71', it: 'Questo posto è bellissimo!', translation: 'Это место очень красивое! (Eto mesto ochen krasivoe!)' },
  { id: 'fr-72', it: 'Possiamo fare un giro a cavallo?', translation: 'Можно покататься на лошади? (Mozhno pokatatsya na loshadi?)' },
  // Sociale e presentazioni
  { id: 'fr-73', it: 'Non parliamo russo, solo un po\'', translation: 'Мы не говорим по-русски, только чуть-чуть (My ne govorim po-russki, tolko chut-chut)' },
  { id: 'fr-74', it: 'Siamo italiani', translation: 'Мы итальянцы (My italyantsy)' },
  { id: 'fr-75', it: 'Siamo in viaggio per il Kirghizistan', translation: 'Мы путешествуем по Кыргызстану (My puteshestvuyem po Kyrgyzstanu)' },
  { id: 'fr-76', it: 'Il vostro paese è molto bello', translation: 'Ваша страна очень красивая (Vasha strana ochen krasivaya)' },
  { id: 'fr-77', it: 'Possiamo fare una foto con voi?', translation: 'Можно сфотографироваться с вами? (Mozhno sfotografirovatsya s vami?)' },
  { id: 'fr-78', it: 'Come si chiama questo posto?', translation: 'Как называется это место? (Kak nazyvayetsya eto mesto?)' },
  { id: 'fr-79', it: 'Grazie per l\'ospitalità', translation: 'Спасибо за гостеприимство (Spasibo za gostepriimstvo)' },
  { id: 'fr-80', it: 'Siete molto gentili', translation: 'Вы очень добрые (Vy ochen dobrye)' },
  // Emergenza
  { id: 'fr-81', it: 'Abbiamo bisogno di aiuto', translation: 'Нам нужна помощь (Nam nuzhna pomoshch)' },
  { id: 'fr-82', it: 'Chiamate un\'ambulanza', translation: 'Вызовите скорую (Vyzovite skoruyu)' },
  { id: 'fr-83', it: 'Dov\'è l\'ospedale più vicino?', translation: 'Где ближайшая больница? (Gde blizhayshaya bolnitsa?)' },
  { id: 'fr-84', it: 'Mi fa male qui', translation: 'У меня болит здесь (U menya bolit zdes)' },
  { id: 'fr-85', it: 'Ho mal di testa / stomaco', translation: 'У меня болит голова / живот (U menya bolit golova / zhivot)' },
  { id: 'fr-86', it: 'Dov\'è la farmacia?', translation: 'Где аптека? (Gde apteka?)' },
  { id: 'fr-87', it: 'Avete medicine per il mal di montagna?', translation: 'У вас есть лекарство от горной болезни? (U vas yest lekarstvo ot gornoy bolezni?)' },
  { id: 'fr-88', it: 'Siamo rimasti bloccati', translation: 'Мы застряли (My zastryali)' },
  { id: 'fr-89', it: 'Potete chiamare qualcuno per aiutarci?', translation: 'Можете позвонить кому-нибудь, чтобы нам помогли? (Mozhete pozvonit komu-nibud, chtoby nam pomogli?)' },
  { id: 'fr-90', it: 'Non abbiamo più benzina', translation: 'У нас кончился бензин (U nas konchilsya benzin)' }
];

function getFrasi() {
  var stored = localStorage.getItem('kg-frasi');
  var version = localStorage.getItem('kg-frasi-version');
  if (!stored || version !== '4') {
    // Load/update starter pack
    saveFrasi(DEFAULT_FRASI);
    localStorage.setItem('kg-frasi-version', '4');
    return DEFAULT_FRASI.slice();
  }
  try { return JSON.parse(stored); } catch(e) { return []; }
}
function saveFrasi(frasi) {
  localStorage.setItem('kg-frasi', JSON.stringify(frasi));
}

// ===== Main Render =====
function renderPhrasebook() {
  var currentTab = 'parole';
  var currentCategory = null;
  var currentQuery = '';
  var frasiQuery = '';
  var frasiCategory = null;

  var CATEGORIES = [
    { key: null, label: 'Tutte' },
    { key: '⭐', label: '⭐' },
    { key: 'base', label: 'Base' },
    { key: 'cibo', label: 'Cibo' },
    { key: 'strada', label: 'Strada' },
    { key: 'emergenza', label: 'Emergenza' },
    { key: 'numeri', label: 'Numeri' },
    { key: 'alloggio', label: 'Alloggio' },
    { key: 'trasporto', label: 'Trasporto' },
    { key: 'shopping', label: 'Shopping' },
    { key: 'socialita', label: 'Socialità' },
    { key: 'tempo', label: 'Tempo' },
    { key: 'sopravvivenza', label: 'Sopravvivenza' },
    { key: 'benzina', label: 'Benzina' },
    { key: 'parolacce', label: '🤬' }
  ];

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function buildHtml() {
    var html = '<div class="section-content fade-in">';
    html += '<h2 class="section-title">🗣️ Frasario</h2>';

    // Tab selector
    html += '<div class="person-selector" id="frasario-tabs">';
    html += '<button class="person-btn' + (currentTab === 'parole' ? ' active' : '') + '" data-tab="parole" type="button">🗣️ Parole</button>';
    html += '<button class="person-btn' + (currentTab === 'frasi' ? ' active' : '') + '" data-tab="frasi" type="button">💬 Frasi</button>';
    html += '</div>';

    if (currentTab === 'parole') {
      html += buildParole();
    } else {
      html += buildFrasi();
    }

    html += '</div>';
    return html;
  }

  function buildParole() {
    var filtered = filterPhrases(PHRASES, currentQuery, currentCategory);
    var h = '';

    h += '<input class="search-input" type="text" id="phrase-search" placeholder="Cerca parola..." value="' + escHtml(currentQuery) + '" style="margin-bottom:12px;">';

    // Category filter
    h += '<div class="filter-bar" style="margin-bottom:16px;">';
    for (var c = 0; c < CATEGORIES.length; c++) {
      var cat = CATEGORIES[c];
      var activeClass = (currentCategory === cat.key) ? ' active' : '';
      h += '<button class="filter-btn' + activeClass + '" data-cat="' + (cat.key || '') + '" type="button">' + cat.label + '</button>';
    }
    h += '</div>';

    // Phrase cards
    for (var i = 0; i < filtered.length; i++) {
      var p = filtered[i];
      var starred = isFav(p.it);
      h += '<div class="phrase-card" style="position:relative;">';
      h += '<button class="fav-star" data-phrase="' + p.it.replace(/"/g, '&quot;') + '" type="button" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:1.3rem;cursor:pointer;opacity:' + (starred ? '1' : '0.3') + ';">' + (starred ? '⭐' : '☆') + '</button>';
      h += '<div class="phrase-category-tag">' + p.category + '</div>';
      h += '<div class="phrase-it">' + p.it + '</div>';
      h += '<div class="phrase-translation">' + p.kg + ' <button class="speak-btn" data-text="' + escHtml(p.kg) + '" data-lang="ky" type="button" title="Ascolta kirghiso">🔊</button></div>';
      h += '<div class="phrase-translation">' + p.ru + ' <button class="speak-btn" data-text="' + escHtml(p.ru) + '" data-lang="ru" type="button" title="Ascolta russo">🔊</button></div>';
      h += '<div class="phrase-pronunciation">' + p.pronunciation + '</div>';
      h += '</div>';
    }

    if (filtered.length === 0) {
      h += '<p style="text-align:center;opacity:0.6;margin-top:20px;">Nessuna parola trovata</p>';
    }
    return h;
  }

  function buildFrasi() {
    var frasi = getFrasi();
    var h = '';

    // Search
    h += '<input class="search-input" type="text" id="frasi-search" placeholder="Cerca frase..." value="' + escHtml(frasiQuery) + '" style="margin-bottom:12px;">';

    // Category filter bar (horizontal scroll)
    var FRASI_CATS = [
      { key: null, label: 'Tutte' },
      { key: '⭐', label: '⭐' },
      { key: 'strada', label: '🛣️ Strada' },
      { key: 'macchina', label: '🔧 Macchina' },
      { key: 'benzina', label: '⛽ Benzina' },
      { key: 'alloggio', label: '🏨 Alloggio' },
      { key: 'cibo', label: '🍽️ Cibo' },
      { key: 'pratico', label: '📱 Pratico' },
      { key: 'natura', label: '🏔️ Natura' },
      { key: 'sociale', label: '🤝 Sociale' },
      { key: 'emergenza', label: '🚨 Emergenza' },
      { key: 'custom', label: '✏️ Mie' }
    ];

    h += '<div class="filter-bar" style="margin-bottom:16px;">';
    for (var fc = 0; fc < FRASI_CATS.length; fc++) {
      var fcat = FRASI_CATS[fc];
      var activeClass = (frasiCategory === fcat.key) ? ' active' : '';
      h += '<button class="filter-btn frasi-cat-btn' + activeClass + '" data-fcat="' + (fcat.key || '') + '" type="button">' + fcat.label + '</button>';
    }
    h += '</div>';

    // Filter by category
    var filtered = frasi;
    if (frasiCategory === '⭐') {
      var favFrasi = getFavFrasi();
      filtered = frasi.filter(function(f) { return favFrasi.indexOf(f.id) !== -1; });
    } else if (frasiCategory) {
      filtered = frasi.filter(function(f) {
        var n = getIdNum(f.id);
        if (frasiCategory === 'strada') return n >= 1 && n <= 16;
        if (frasiCategory === 'macchina') return n >= 17 && n <= 28;
        if (frasiCategory === 'benzina') return n >= 29 && n <= 34;
        if (frasiCategory === 'alloggio') return n >= 35 && n <= 43;
        if (frasiCategory === 'cibo') return n >= 44 && n <= 53;
        if (frasiCategory === 'pratico') return n >= 54 && n <= 63;
        if (frasiCategory === 'natura') return n >= 64 && n <= 72;
        if (frasiCategory === 'sociale') return n >= 73 && n <= 80;
        if (frasiCategory === 'emergenza') return n >= 81 && n <= 90;
        if (frasiCategory === 'custom') return n > 90 || isNaN(n) || f.id.indexOf('fr-') !== 0;
        return true;
      });
    }

    // Filter by search
    if (frasiQuery) {
      var q = frasiQuery.toLowerCase();
      filtered = filtered.filter(function(f) {
        return f.it.toLowerCase().indexOf(q) !== -1 || f.translation.toLowerCase().indexOf(q) !== -1;
      });
    }

    // Add form (collapsible)
    h += '<details style="margin-top:10px;margin-bottom:12px;"><summary style="font-size:0.9rem;">➕ Aggiungi nuova frase</summary>';
    h += '<div class="details-content">';
    h += '<div class="form-group"><label class="form-label">Italiano</label>';
    h += '<input type="text" class="form-input" id="frasi-new-it" placeholder="Es: Dove possiamo dormire?"></div>';
    h += '<div class="form-group"><label class="form-label">Traduzione / Fonetica</label>';
    h += '<input type="text" class="form-input" id="frasi-new-tr" placeholder="Es: Где можно переночевать? (Gde mozhno...)"></div>';
    h += '<button class="btn btn-primary btn-sm" id="frasi-add-btn" type="button" style="width:100%;">Aggiungi</button>';
    h += '</div></details>';

    // Render phrases
    for (var i = 0; i < filtered.length; i++) {
      var f = filtered[i];
      var parts = f.translation.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      var cyrillic = parts ? parts[1] : f.translation;
      var pronunciation = parts ? parts[2] : '';
      var starredFrase = isFavFrase(f.id);
      h += '<div class="card frasi-item" data-fid="' + f.id + '" style="padding:12px;margin-bottom:8px;position:relative;cursor:pointer;">';
      h += '<button class="fav-star-frase" data-fid="' + f.id + '" type="button" style="position:absolute;top:8px;right:32px;background:none;border:none;font-size:1.2rem;cursor:pointer;opacity:' + (starredFrase ? '1' : '0.3') + ';">' + (starredFrase ? '⭐' : '☆') + '</button>';
      h += '<button class="frasi-del" data-fid="' + f.id + '" type="button" style="position:absolute;top:8px;right:10px;background:none;border:none;font-size:1rem;cursor:pointer;opacity:0.4;color:var(--color-danger);">✕</button>';
      h += '<div style="font-size:0.95rem;font-weight:600;color:var(--color-text);margin-bottom:4px;padding-right:50px;">' + escHtml(f.it) + '</div>';
      h += '<div style="font-size:1.05rem;font-weight:700;color:var(--color-secondary);line-height:1.4;">' + escHtml(cyrillic) + ' <button class="speak-btn" data-text="' + escHtml(cyrillic) + '" data-lang="ru" type="button" title="Ascolta">🔊</button></div>';
      h += '<div class="frasi-pronunciation" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid var(--color-border);font-size:1rem;font-style:italic;color:var(--color-accent);font-weight:600;">' + (pronunciation ? '🔊 ' + escHtml(pronunciation) : '') + '</div>';
      h += '</div>';
    }

    if (filtered.length === 0) {
      h += '<p style="text-align:center;opacity:0.6;margin-top:20px;">Nessuna frase trovata</p>';
    }
    return h;
  }

  function getIdNum(id) {
    var m = id.match(/fr-(\d+)/);
    return m ? parseInt(m[1]) : 9999;
  }

  function attachHandlers() {
    var container = document.getElementById('app');
    if (!container) return;

    // Tab switching
    var tabs = container.querySelectorAll('#frasario-tabs .person-btn');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function() {
        currentTab = this.dataset.tab;
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }

    if (currentTab === 'parole') {
      // Search
      var searchInput = container.querySelector('#phrase-search');
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          currentQuery = this.value;
          container.innerHTML = buildHtml();
          attachHandlers();
          var si = container.querySelector('#phrase-search');
          if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
        });
      }

      // Category filter
      var filterBtns = container.querySelectorAll('.filter-btn:not(.frasi-cat-btn)');
      for (var b = 0; b < filterBtns.length; b++) {
        filterBtns[b].addEventListener('click', function() {
          var catVal = this.getAttribute('data-cat');
          currentCategory = catVal === '' ? null : catVal;
          // Save scroll positions
          var filterBar = container.querySelector('.filter-bar');
          var hScrollPos = filterBar ? filterBar.scrollLeft : 0;
          var scrollTarget = filterBar ? filterBar.offsetTop - 60 : 0;
          container.innerHTML = buildHtml();
          attachHandlers();
          // Restore both vertical and horizontal scroll
          window.scrollTo(0, scrollTarget);
          var newBar = container.querySelector('.filter-bar');
          if (newBar) newBar.scrollLeft = hScrollPos;
        });
      }

      // Star toggle
      var stars = container.querySelectorAll('.fav-star');
      for (var s = 0; s < stars.length; s++) {
        stars[s].addEventListener('click', function() {
          var phrase = this.getAttribute('data-phrase');
          toggleFav(phrase);
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }

      // Speak buttons (Text-to-Speech)
      var speakBtns = container.querySelectorAll('.speak-btn');
      for (var sp = 0; sp < speakBtns.length; sp++) {
        speakBtns[sp].addEventListener('click', function(e) {
          e.stopPropagation();
          speakText(this.getAttribute('data-text'), this.getAttribute('data-lang'));
        });
      }
    } else {
      // Frasi search
      var frasiSearch = container.querySelector('#frasi-search');
      if (frasiSearch) {
        frasiSearch.addEventListener('input', function() {
          frasiQuery = this.value;
          container.innerHTML = buildHtml();
          attachHandlers();
          var si = container.querySelector('#frasi-search');
          if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
        });
      }

      // Frasi category filter
      var frasiCatBtns = container.querySelectorAll('.frasi-cat-btn');
      for (var fc = 0; fc < frasiCatBtns.length; fc++) {
        frasiCatBtns[fc].addEventListener('click', function() {
          var catVal = this.getAttribute('data-fcat');
          frasiCategory = catVal === '' ? null : catVal;
          var filterBar = container.querySelector('.filter-bar');
          var hScrollPos = filterBar ? filterBar.scrollLeft : 0;
          var scrollTarget = filterBar ? filterBar.offsetTop - 60 : 0;
          container.innerHTML = buildHtml();
          attachHandlers();
          window.scrollTo(0, scrollTarget);
          var newBar = container.querySelector('.filter-bar');
          if (newBar) newBar.scrollLeft = hScrollPos;
        });
      }

      // Add frase
      var addBtn = container.querySelector('#frasi-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', function() {
          var itEl = container.querySelector('#frasi-new-it');
          var trEl = container.querySelector('#frasi-new-tr');
          var it = (itEl.value || '').trim();
          var tr = (trEl.value || '').trim();
          if (!it || !tr) { showToast('Compila entrambi i campi'); return; }
          var frasi = getFrasi();
          frasi.unshift({ id: 'fr-' + Date.now(), it: it, translation: tr });
          saveFrasi(frasi);
          showToast('Frase aggiunta ✓');
          container.innerHTML = buildHtml();
          attachHandlers();
        });
      }

      // Delete frase
      var delBtns = container.querySelectorAll('.frasi-del');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function(e) {
          e.stopPropagation();
          var fid = this.getAttribute('data-fid');
          var frasi = getFrasi();
          frasi = frasi.filter(function(f) { return f.id !== fid; });
          saveFrasi(frasi);
          showToast('Eliminata');
          var filterBar = container.querySelector('.filter-bar');
          var hScrollPos = filterBar ? filterBar.scrollLeft : 0;
          var scrollTarget = filterBar ? filterBar.offsetTop - 60 : 0;
          container.innerHTML = buildHtml();
          attachHandlers();
          window.scrollTo(0, scrollTarget);
          var newBar = container.querySelector('.filter-bar');
          if (newBar) newBar.scrollLeft = hScrollPos;
        });
      }

      // Favorite frase toggle
      var favFraseBtns = container.querySelectorAll('.fav-star-frase');
      for (var ff = 0; ff < favFraseBtns.length; ff++) {
        favFraseBtns[ff].addEventListener('click', function(e) {
          e.stopPropagation();
          var fid = this.getAttribute('data-fid');
          toggleFavFrase(fid);
          var filterBar = container.querySelector('.filter-bar');
          var hScrollPos = filterBar ? filterBar.scrollLeft : 0;
          var scrollTarget = filterBar ? filterBar.offsetTop - 60 : 0;
          container.innerHTML = buildHtml();
          attachHandlers();
          window.scrollTo(0, scrollTarget);
          var newBar = container.querySelector('.filter-bar');
          if (newBar) newBar.scrollLeft = hScrollPos;
        });
      }

      // Expand/collapse pronunciation on tap
      var frasiItems = container.querySelectorAll('.frasi-item');
      for (var fi = 0; fi < frasiItems.length; fi++) {
        frasiItems[fi].addEventListener('click', function(e) {
          if (e.target.closest('.frasi-del')) return;
          if (e.target.closest('.speak-btn')) return;
          var pron = this.querySelector('.frasi-pronunciation');
          if (pron) {
            var isOpen = pron.style.display !== 'none';
            pron.style.display = isOpen ? 'none' : 'block';
          }
        });
      }

      // Speak buttons in Frasi tab
      var speakBtns2 = container.querySelectorAll('.speak-btn');
      for (var sp2 = 0; sp2 < speakBtns2.length; sp2++) {
        speakBtns2[sp2].addEventListener('click', function(e) {
          e.stopPropagation();
          speakText(this.getAttribute('data-text'), this.getAttribute('data-lang'));
        });
      }
    }
  }

  var initialHtml = buildHtml();
  setTimeout(function() { attachHandlers(); }, 0);
  return initialHtml;
}
