/**
 * giochi.js — Giochi da Viaggio: Domande + Non Ho Mai
 * Kyrgyzstan Travel PWA 2026
 *
 * Global: renderGiochi()
 */

var DOMANDE_VIAGGIO = [
  // Personali profonde
  "Qual è il tuo trauma più grande da bambino con i tuoi?",
  "Qual è la cosa che non hai mai detto a nessuno?",
  "Di cosa ti vergogni di più nella tua vita?",
  "Qual è il momento in cui ti sei sentito più solo?",
  "Cosa cambieresti del tuo passato se potessi?",
  "Qual è la bugia più grande che hai detto a qualcuno che ami?",
  "Hai mai tradito? Racconta.",
  "Qual è la cosa più cattiva che hai fatto a qualcuno?",
  "Di cosa hai più paura nella vita?",
  "Qual è il tuo più grande rimpianto?",
  "Cosa pensi che la gente dica di te quando non ci sei?",
  "Qual è l'insicurezza che nascondi meglio?",
  "Hai mai pensato di mollare tutto e sparire?",
  "Qual è stata la delusione più grande della tua vita?",
  "C'è qualcosa che non perdonerai mai a qualcuno?",
  // Relazioni e ex
  "Fammi la lista delle tue ex. Chi ti stava più simpatica e più antipatica? Perché?",
  "Qual è la cosa peggiore che un'ex ti ha fatto?",
  "Qual è la cosa peggiore che hai fatto a un'ex?",
  "Con quale ex torneresti insieme se potessi?",
  "Qual è stata la tua relazione più tossica?",
  "Hai mai amato qualcuno che non ti amava?",
  "Qual è il red flag più grande che hai ignorato?",
  "Cosa ti ha insegnato la tua peggior rottura?",
  "Hai mai stalkerato un'ex sui social? Quanto?",
  "Qual è la cosa più patetica che hai fatto per amore?",
  "Hai mai avuto sentimenti per l'ex di un amico?",
  "Qual è il tuo tipo ideale? Sii onesto.",
  "Cosa non sopporti in una relazione?",
  "Hai mai mandato un messaggio da ubriaco a un'ex? Cosa diceva?",
  "Qual è la cosa più romantica che hai fatto? E la più cringe?",
  // Preferiresti
  "Preferiresti non fare mai più sesso o non mangiare mai più il tuo cibo preferito?",
  "Preferiresti sapere come muori o quando muori?",
  "Preferiresti rivivere lo stesso giorno per sempre o invecchiare 10 anni di colpo?",
  "Preferiresti poter leggere la mente o essere invisibile?",
  "Preferiresti perdere tutti i ricordi o non poterne creare di nuovi?",
  "Preferiresti essere ricchissimo ma solo, o povero con la persona che ami?",
  "Preferiresti tradire senza che nessuno lo sappia mai, o essere tradito senza saperlo?",
  "Preferiresti vivere 200 anni in solitudine o 40 anni con la vita perfetta?",
  "Preferiresti non poter mai più mentire o non poter mai più dire la verità?",
  "Preferiresti dimenticare chi sei o che tutti si dimentichino di te?",
  "Preferiresti avere un figlio con la persona sbagliata o non averne mai?",
  "Preferiresti sapere cosa pensano tutti di te o non saperlo mai?",
  "Preferiresti morire tra 5 anni sapendolo o vivere senza sapere quando?",
  "Preferiresti essere il più intelligente in una stanza di idioti o il più stupido tra geni?",
  "Preferiresti rivivere i tuoi 18 anni sapendo quello che sai o andare avanti?",
  // Amicizia e sociale
  "Qual è la cosa che non mi hai mai detto ma avresti voluto?",
  "Cosa pensi davvero di me? Sii brutale.",
  "C'è qualcosa che faccio che ti dà fastidio?",
  "Qual è il momento in cui ti ho deluso di più?",
  "Se dovessi descrivermi in 3 parole a uno sconosciuto, quali sarebbero?",
  "Qual è il mio difetto peggiore secondo te?",
  "C'è qualcosa che invidi di me?",
  "Qual è il ricordo più bello che hai con me?",
  "Se potessi cambiare una cosa di me, cosa sarebbe?",
  "Ti fidi di me al 100%? Se no, perché?",
  "Qual è la cosa più stupida che abbiamo fatto insieme?",
  "Se dovessi scegliere tra me e [altro amico], chi sceglieresti? Perché?",
  "C'è un segreto che tieni da me?",
  "Qual è stata la volta in cui ti ho fatto più ridere?",
  "Se morissi domani, cosa diresti al mio funerale?",
  // Famiglia
  "Qual è la cosa che non perdoni ai tuoi genitori?",
  "Come descriveresti il rapporto con tuo padre in una frase?",
  "Qual è il segreto di famiglia che hai scoperto da grande?",
  "Cosa vorresti dire a tuo padre/madre che non hai mai detto?",
  "Ti senti più simile a tua madre o tuo padre? Ti piace?",
  "Qual è la cosa più ingiusta che i tuoi ti hanno fatto?",
  "Se potessi crescere in un'altra famiglia, lo faresti?",
  "Qual è il ricordo più bello della tua infanzia?",
  "E il peggiore?",
  "Hai mai desiderato essere figlio unico / avere fratelli?",
  // Sesso e intimità
  "Qual è la tua fantasia più strana?",
  "Qual è l'esperienza sessuale più imbarazzante?",
  "Hai mai fatto qualcosa sessualmente di cui ti vergogni?",
  "Qual è la cosa più strana che ti eccita?",
  "Hai mai avuto un'esperienza con qualcuno dello stesso sesso?",
  "Qual è il posto più strano dove l'hai fatto?",
  "Quante persone hai... davvero? Numero reale.",
  "Hai mai pagato per sesso o ci hai pensato?",
  "Qual è la cosa che non faresti mai a letto?",
  "Hai mai finto? Quando e perché?",
  // Morale e etica
  "Ruberesti per salvare qualcuno che ami?",
  "Hai mai fatto qualcosa di illegale? Cosa?",
  "Se potessi uccidere qualcuno senza conseguenze, lo faresti?",
  "Qual è la cosa più immorale che hai fatto consapevolmente?",
  "Credi in Dio? Perché sì o perché no?",
  "Se scoprissi che un amico è un criminale, lo denunceresti?",
  "Hai mai discriminato qualcuno? Sii onesto.",
  "Qual è il tuo pregiudizio più grande?",
  "Cosa pensi della pena di morte?",
  "Faresti qualcosa di terribile per un miliardo di euro? Cosa?",
  // Vita e morte
  "Hai paura di morire?",
  "Come vorresti morire?",
  "Cosa vorresti che scrivessero sulla tua tomba?",
  "Se ti restasse un anno di vita, cosa faresti?",
  "Hai mai pensato al suicidio?",
  "Qual è il senso della tua vita adesso?",
  "Cosa vuoi che la gente ricordi di te?",
  "Se potessi parlare con una persona morta, chi sceglieresti?",
  "Credi nell'aldilà?",
  "Qual è la cosa che ti tiene sveglio la notte?",
  // Random deep
  "Qual è la versione di te che mostri al mondo vs quella reale?",
  "Quando è stata l'ultima volta che hai pianto? Perché?",
  "Qual è la decisione più difficile che hai preso?",
  "Cosa sacrificheresti per il successo?",
  "Ti piaci come persona?",
  "Qual è il complimento che ti ha fatto più piacere in vita tua?",
  "E l'insulto che ti ha fatto più male?",
  "Qual è la cosa che fai solo quando sei completamente solo?",
  "Hai mai avuto un periodo in cui non ti piaceva vivere?",
  "Cosa ti rende davvero felice? Non la risposta da Instagram, quella vera.",
  // Situazionali viaggio
  "Se la macchina si rompesse ora e dovessimo vivere qui, cosa faresti?",
  "Se potessi teletrasportarti a casa adesso, lo faresti?",
  "Qual è il momento di questo viaggio in cui hai avuto più paura?",
  "Se dovessimo restare in Kirghizistan per sempre, cosa faresti?",
  "Qual è la cosa più bella che hai visto finora in questo viaggio?",
  "Ti penti di essere venuto? Sii onesto.",
  "Cosa racconterai di questo viaggio tra 10 anni?",
  "Se potessi portare una terza persona in questo viaggio, chi?",
  "Qual è il momento in cui hai pensato 'ma chi me l'ha fatto fare'?",
  "Cosa hai imparato su di te in questo viaggio?",
  // Futuro
  "Dove ti vedi tra 10 anni? Sii realistico.",
  "Vuoi figli? Quanti? Come li chiameresti?",
  "Qual è il tuo sogno che non hai mai detto a nessuno?",
  "Cosa faresti se avessi soldi infiniti?",
  "Qual è la cosa che vuoi fare prima di morire?",
  "Ti sposerai? Con che tipo di persona?",
  "Dove vorresti vivere se potessi scegliere qualsiasi posto?",
  "Qual è la carriera che avresti voluto fare ma non hai avuto il coraggio?",
  "Come immagini la tua vita a 60 anni?",
  "Qual è la cosa che rimandi sempre ma sai che dovresti fare?",
  // Controversiali
  "Qual è la tua opinione più impopolare?",
  "C'è un gruppo di persone che giudichi anche se sai che non dovresti?",
  "Qual è la cosa politicamente scorretta che pensi ma non dici mai?",
  "Hai mai riso di qualcosa di cui non dovresti ridere?",
  "Qual è il tuo guilty pleasure più vergognoso?",
  "Hai mai fatto ghosting? Ti senti in colpa?",
  "Qual è la cosa più ipocrita che fai regolarmente?",
  "Se potessi eliminare una categoria di persone dal mondo, quale?",
  "Qual è la cosa più egoista che hai fatto?",
  "Hai mai tradito la fiducia di qualcuno che si fidava ciecamente di te?",
  // Assurde e divertenti
  "Se dovessi mangiare una sola cosa per il resto della vita?",
  "Qual è la cazzata più grande che hai detto a qualcuno credendoci?",
  "Se fossi un animale, quale saresti e perché?",
  "Qual è il sogno più strano che hai fatto?",
  "Se potessi avere un superpotere ma tutti lo saprebbero, quale?",
  "Qual è la cosa più stupida per cui hai speso soldi?",
  "Se dovessi tatuarti una frase sulla fronte, quale?",
  "Qual è la bugia più assurda che ti hanno creduto?",
  "Se potessi cancellare un ricordo, quale?",
  "Qual è la cosa più illegale che faresti per 100.000€?",
  // Confessioni
  "Qual è la cosa che hai rubato e non hai mai confessato?",
  "Hai mai mentito in un colloquio di lavoro? Cosa?",
  "Qual è la promessa più grande che hai rotto?",
  "Hai mai letto i messaggi di qualcuno di nascosto?",
  "Qual è il segreto più grande che custodisci per qualcun altro?",
  "Hai mai fatto finta di essere malato per non fare qualcosa?",
  "Qual è la scusa più elaborata che hai inventato?",
  "Hai mai preso credito per qualcosa che non hai fatto?",
  "Qual è la cosa più codarda che hai fatto?",
  "C'è qualcuno a cui devi delle scuse ma non gliele hai mai fatte?",
  // Ipotesi estreme
  "Se potessi tornare indietro e non nascere, lo faresti?",
  "Se potessi sapere esattamente cosa pensa una persona di te, chi sceglieresti?",
  "Se dovessi sacrificare un amico per salvarne 5, lo faresti?",
  "Se scoprissi che la tua vita è una simulazione, cambierebbe qualcosa?",
  "Se potessi vivere in un'epoca diversa, quale e perché?",
  "Se dovessi scegliere tra salvare tua madre o il tuo migliore amico?",
  "Se potessi rivivere un solo giorno della tua vita, quale?",
  "Se domani finisse il mondo, come passeresti le ultime 24 ore?",
  "Se potessi scambiare vita con qualcuno per un mese, chi?",
  "Se dovessi rinunciare a un senso, quale?",
  // Giudizi e opinioni
  "Qual è la persona più tossica che hai frequentato?",
  "Chi è la persona più falsa che conosci?",
  "Qual è l'amicizia che mantieni solo per convenienza?",
  "Chi è la persona che rispetti di più e perché?",
  "Qual è la cosa più stupida in cui la gente crede?",
  "Qual è il consiglio peggiore che hai mai ricevuto?",
  "Chi è la persona che ti ha influenzato di più nella vita?",
  "Qual è la cosa che la società ti ha insegnato che pensi sia sbagliata?",
  "Qual è il tipo di persona che non sopporti?",
  "Se potessi dare un consiglio al te stesso di 10 anni fa?",
  // Liceo e compagni di banco
  "Qual è il ricordo più bello dei 5 anni di liceo insieme?",
  "Qual è la cazzata più grande che abbiamo fatto in classe?",
  "Chi era il prof che odiavi di più e perché?",
  "Qual è la volta che abbiamo rischiato di più di essere beccati?",
  "C'è qualcosa che facevi al liceo di cui ti vergogni adesso?",
  "Qual era la tua crush segreta al liceo che non mi hai mai detto?",
  "Qual è il momento in cui mi hai odiato di più al liceo?",
  "Cosa pensavi di me il primo giorno che ci siamo seduti vicini?",
  "Qual è la cosa più stronza che mi hai fatto al liceo?",
  "C'è qualcosa che copiavi da me e non me l'hai mai detto?",
  "Qual è il segreto del liceo che non hai mai raccontato a nessuno?",
  "Chi era la persona più falsa della nostra classe?",
  "Qual è la lezione che hai marinato di cui ti penti?",
  "Se potessi rivivere un giorno del liceo, quale?",
  "Qual era il tuo momento preferito della giornata scolastica?",
  "C'è qualcuno del liceo con cui vorresti riallacciare i rapporti?",
  "Qual è la cosa più imbarazzante che ti è successa davanti alla classe?",
  "Hai mai avuto sentimenti per qualcuno della nostra classe? Chi?",
  "Qual è la nota/punizione più ingiusta che hai preso?",
  "Cosa facevamo durante le ore di [materia noiosa] che nessuno sa?",
  "Qual è il soprannome peggiore che davamo a qualcuno?",
  "Hai mai tradito durante un compito in classe? Come?",
  "Qual è la cosa che il liceo ti ha insegnato che la scuola non voleva insegnarti?",
  "Se tornassi al liceo sapendo quello che sai ora, cosa faresti diversamente?",
  // Extra personali
  "Qual è la cosa più coraggiosa che hai fatto nella vita?",
  "Hai mai avuto un attacco di panico? Racconta.",
  "Qual è la dipendenza (anche piccola) che nascondi?",
  "Cosa ti fa piangere che non ammetteresti mai?",
  "Qual è il periodo più buio della tua vita?",
  "Hai mai perso completamente il controllo? Cosa è successo?",
  "Qual è la cosa che fai per sembrare più sicuro di te di quanto sei?",
  "C'è qualcosa nella tua vita che sembra perfetta ma non lo è?",
  "Qual è la maschera che indossi più spesso?",
  "Se potessi ricominciare da zero in un altro paese, lo faresti?",
  // Extra relazioni
  "Qual è la cosa più tossica che hai fatto in una relazione?",
  "Hai mai amato due persone contemporaneamente?",
  "Qual è la cosa che cerchi in una persona che non trovi mai?",
  "Hai mai lasciato qualcuno per un motivo che non hai detto?",
  "Qual è la cosa più bella che qualcuno ti ha detto?",
  "Hai mai avuto paura di restare solo per sempre?",
  "Qual è il pattern che ripeti in ogni relazione?",
  "Cosa ti ha rovinato l'ultima relazione?",
  "Hai mai pensato di tornare con un'ex sapendo che era sbagliato?",
  "Qual è la lezione d'amore più dolorosa che hai imparato?",
  // Extra preferiresti
  "Preferiresti sapere quando muore chi ami o non saperlo?",
  "Preferiresti non provare mai più dolore o non provare mai più gioia?",
  "Preferiresti essere famoso e odiato o sconosciuto e amato?",
  "Preferiresti rivivere il tuo peggior ricordo ogni notte o non sognare mai più?",
  "Preferiresti perdere tutti gli amici o perdere tutti i soldi?",
  "Preferiresti che tutti possano leggere i tuoi pensieri o che tu non possa mai più mentire?",
  "Preferiresti vivere 10 anni in più da solo o morire domani circondato da chi ami?",
  "Preferiresti non poter mai più viaggiare o non poter mai più tornare a casa?",
  "Preferiresti dimenticare tutte le cose belle o ricordare tutte le cose brutte in dettaglio?",
  "Preferiresti avere sempre ragione ma nessuno ti crede, o avere sempre torto ma tutti ti credono?",
  // Extra situazionali
  "Qual è la cosa che non sopporti di come guido?",
  "Se dovessi descrivere questo viaggio in una parola finora?",
  "Qual è il momento di oggi che ricorderai tra 10 anni?",
  "C'è qualcosa che volevi dire oggi ma non hai detto?",
  "Se potessi aggiungere una persona a questo viaggio, chi?",
  "Qual è la cosa che ti manca di più di casa adesso?",
  "Cosa pensi che i kirghizi pensino di noi?",
  "Qual è la cosa più assurda che abbiamo visto oggi?",
  "Se dovessimo vivere qui un anno, cosa faresti per lavoro?",
  "Qual è il suono di questo viaggio?"
];

var NON_HO_MAI = [
  // Classici spinti
  "Non ho mai fatto sesso in un posto pubblico",
  "Non ho mai mandato una foto di nudo",
  "Non ho mai baciato qualcuno dello stesso sesso",
  "Non ho mai fatto sesso al primo appuntamento",
  "Non ho mai avuto una storia di una notte con uno sconosciuto",
  "Non ho mai fatto sesso in macchina",
  "Non ho mai guardato porno con qualcun altro nella stanza",
  "Non ho mai fatto sexting con qualcuno che non dovevo",
  "Non ho mai avuto fantasie su un amico/a del mio amico",
  "Non ho mai fatto sesso da ubriaco e non ricordato niente",
  "Non ho mai simulato un orgasmo",
  "Non ho mai avuto un threesome o pensato seriamente di farlo",
  "Non ho mai tradito",
  "Non ho mai fatto sesso in un bagno pubblico",
  "Non ho mai avuto una crush per un professore/capo",
  // Imbarazzanti
  "Non ho mai pisciato in piscina da adulto",
  "Non ho mai scoreggiato e dato la colpa a qualcun altro",
  "Non ho mai pianto guardando un film per bambini",
  "Non ho mai stalkerato l'ex della mia ex",
  "Non ho mai finto di non vedere qualcuno per strada",
  "Non ho mai letto il diario/messaggi di qualcuno di nascosto",
  "Non ho mai fatto finta di sapere qualcosa di cui non sapevo niente",
  "Non ho mai riso a un funerale",
  "Non ho mai mandato un messaggio alla persona sbagliata",
  "Non ho mai finto di essere al telefono per evitare qualcuno",
  "Non ho mai pianto per un motivo stupidissimo",
  "Non ho mai cercato il mio nome su Google",
  "Non ho mai cancellato messaggi prima che qualcuno li vedesse",
  "Non ho mai fatto screenshot di una conversazione per mostrarla ad altri",
  "Non ho mai mentito sul mio numero di partner sessuali",
  // Illegali/borderline
  "Non ho mai guidato ubriaco",
  "Non ho mai rubato qualcosa da un negozio",
  "Non ho mai usato documenti falsi",
  "Non ho mai comprato/venduto qualcosa di illegale",
  "Non ho mai corrotto qualcuno",
  "Non ho mai scavalcato per entrare da qualche parte",
  "Non ho mai fatto a botte",
  "Non ho mai vandalizzato qualcosa",
  "Non ho mai mentito alla polizia",
  "Non ho mai guidato senza patente/assicurazione",
  // Sociali
  "Non ho mai parlato male di un amico presente alle sue spalle",
  "Non ho mai tradito la fiducia di qualcuno che si fidava di me",
  "Non ho mai ghostato qualcuno",
  "Non ho mai inventato una scusa per non uscire con qualcuno",
  "Non ho mai finto di essere felice per qualcuno quando ero invidioso",
  "Non ho mai rubato il ragazzo/a a qualcuno",
  "Non ho mai litigato con un amico e non avergli più parlato",
  "Non ho mai detto 'ti amo' senza pensarlo",
  "Non ho mai usato qualcuno per un favore e poi sparito",
  "Non ho mai riso delle disgrazie di qualcuno che non mi stava simpatico",
  // Estremi
  "Non ho mai pensato seriamente di sparire e ricominciare da zero",
  "Non ho mai avuto pensieri molto dark sulla vita",
  "Non ho mai odiato qualcuno al punto di augurargli il male",
  "Non ho mai fatto qualcosa solo per vendetta",
  "Non ho mai manipolato qualcuno consapevolmente",
  "Non ho mai mentito su qualcosa di grave per proteggermi",
  "Non ho mai desiderato la morte di qualcuno",
  "Non ho mai fatto qualcosa di cui mi vergogno così tanto da non poterlo dire",
  "Non ho mai avuto un segreto che porterò nella tomba",
  "Non ho mai fatto del male a qualcuno e non essermi mai scusato",
  // Viaggio/avventura
  "Non ho mai vomitato su un mezzo di trasporto",
  "Non ho mai dormito per strada",
  "Non ho mai mangiato qualcosa senza sapere cosa fosse",
  "Non ho mai avuto paura di morire davvero",
  "Non ho mai pianto di paura",
  "Non ho mai pregato pur non essendo credente",
  "Non ho mai fatto autostop",
  "Non ho mai perso il passaporto/documenti all'estero",
  "Non ho mai litigato con un compagno di viaggio",
  "Non ho mai pensato 'non torno vivo da qui'",
  // Religione e tabù
  "Non ho mai bestemmiato in chiesa",
  "Non ho mai finto di essere religioso per convenienza",
  "Non ho mai giudicato qualcuno per la sua religione",
  "Non ho mai avuto pensieri blasfemi durante una cerimonia",
  "Non ho mai messo in dubbio tutto ciò in cui credevo",
  // Lavoro e soldi
  "Non ho mai rubato dal lavoro",
  "Non ho mai mentito sul curriculum",
  "Non ho mai chiamato malato per non andare a lavorare",
  "Non ho mai speso soldi che non avevo",
  "Non ho mai prestato soldi sapendo che non li avrei rivisti",
  // Random
  "Non ho mai mangiato qualcosa caduto per terra",
  "Non ho mai finto un accento straniero per divertimento",
  "Non ho mai cantato da solo in macchina a squarciagola",
  "Non ho mai parlato da solo ad alta voce",
  "Non ho mai avuto un amico immaginario",
  "Non ho mai sognato qualcuno e poi guardarlo diversamente",
  "Non ho mai pianto per la fine di una serie TV",
  "Non ho mai avuto paura del buio da adulto",
  "Non ho mai creduto a una teoria del complotto",
  "Non ho mai fatto qualcosa solo perché tutti lo facevano",
  // Sessuali extra
  "Non ho mai fatto sesso con qualcuno di cui non sapevo il nome",
  "Non ho mai avuto un rapporto con qualcuno molto più grande di me",
  "Non ho mai fatto sesso mentre qualcuno dormiva nella stessa stanza",
  "Non ho mai mandato un video intimo",
  "Non ho mai fatto sesso per noia",
  "Non ho mai avuto un rapporto con qualcuno impegnato",
  "Non ho mai fatto sesso e pensato a qualcun altro",
  "Non ho mai usato un'app di incontri solo per sesso",
  "Non ho mai fatto qualcosa a letto solo per compiacere l'altro",
  "Non ho mai avuto un rapporto con qualcuno che non mi attraeva fisicamente",
  "Non ho mai fatto sesso in casa di qualcun altro senza che lo sapesse",
  "Non ho mai avuto un rapporto con un'amica/o",
  "Non ho mai fatto sexting durante una lezione/riunione",
  "Non ho mai guardato porno al lavoro/scuola",
  "Non ho mai avuto fantasie su qualcuno presente in questa macchina",
  "Non ho mai fatto sesso all'aperto",
  "Non ho mai fatto sesso da sobrio con qualcuno con cui l'avrei fatto solo da ubriaco",
  "Non ho mai avuto un rapporto di cui mi sono pentito il giorno dopo",
  "Non ho mai fatto sesso per dimenticare qualcun altro",
  "Non ho mai avuto un periodo di astinenza più lungo di 6 mesi",
  // Liceo
  "Non ho mai copiato durante un compito in classe",
  "Non ho mai avuto una crush per un prof",
  "Non ho mai marinato scuola senza che i miei lo sapessero",
  "Non ho mai fatto qualcosa di illegale dentro la scuola",
  "Non ho mai scritto su un banco",
  "Non ho mai fatto piangere un compagno di classe",
  "Non ho mai mentito a un prof guardandolo negli occhi",
  "Non ho mai rubato qualcosa a scuola",
  "Non ho mai fatto bullismo (anche leggero) a qualcuno",
  "Non ho mai avuto un rapporto con qualcuno della nostra classe",
  "Non ho mai mandato messaggi durante un'interrogazione per aiutare qualcuno",
  "Non ho mai finto di stare male per saltare un compito",
  // Extra estremi
  "Non ho mai pensato di scappare durante un appuntamento",
  "Non ho mai finto un orgasmo per finirla prima",
  "Non ho mai avuto rapporti con due persone diverse nello stesso giorno",
  "Non ho mai fatto qualcosa sessualmente solo per poterlo raccontare",
  "Non ho mai avuto un rapporto in un posto dove potevano beccarci",
  "Non ho mai ricevuto o mandato nudes a qualcuno che non dovevo",
  "Non ho mai avuto un sogno erotico su un amico/a e poi guardarlo diversamente",
  "Non ho mai cercato un ex su un sito porno",
  "Non ho mai fatto sesso per soldi o regali (anche indirettamente)",
  "Non ho mai avuto un rapporto con qualcuno solo per vendetta"
];

function renderGiochi() {
  var currentTab = 'domande';

  function buildHtml() {
    var html = '<div class="section-content fade-in">';
    html += '<h2 class="section-title">🎮 Giochi da Viaggio</h2>';

    html += '<div class="person-selector" id="giochi-tabs">';
    html += '<button class="person-btn' + (currentTab === 'domande' ? ' active' : '') + '" data-tab="domande" type="button">❓ Domande</button>';
    html += '<button class="person-btn' + (currentTab === 'nonhomai' ? ' active' : '') + '" data-tab="nonhomai" type="button">🍺 Non Ho Mai</button>';
    html += '</div>';

    if (currentTab === 'domande') {
      html += buildDomande();
    } else {
      html += buildNonHoMai();
    }

    html += '</div>';
    return html;
  }

  function buildDomande() {
    var h = '';
    h += '<div style="text-align:center;padding:20px 10px;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:20px;">Premi il bottone. Entrambi rispondete. Niente bugie.</div>';
    h += '<div id="domanda-card" style="min-height:160px;display:flex;align-items:center;justify-content:center;padding:24px;margin-bottom:20px;background:var(--color-card);border-radius:16px;border:2px solid var(--color-border);box-shadow:var(--shadow);">';
    h += '<div id="domanda-text" style="font-size:1.15rem;font-weight:700;line-height:1.5;color:var(--color-text);">Premi il bottone per iniziare</div>';
    h += '</div>';
    h += '<button id="domanda-next" type="button" class="btn btn-primary" style="font-size:1.1rem;padding:14px 40px;">🎲 Prossima domanda</button>';
    h += '<div style="margin-top:12px;font-size:0.75rem;opacity:0.3;" id="domanda-counter"></div>';
    h += '</div>';
    return h;
  }

  function buildNonHoMai() {
    var h = '';
    h += '<div style="text-align:center;padding:20px 10px;">';
    h += '<div style="font-size:0.8rem;opacity:0.4;margin-bottom:6px;">Chi l\'ha fatto beve. Kumys o peggio.</div>';
    h += '<div style="font-size:0.7rem;opacity:0.3;margin-bottom:20px;">🍺 = un sorso · 🍺🍺 = due sorsi se è grave</div>';
    h += '<div id="nhm-card" style="min-height:160px;display:flex;align-items:center;justify-content:center;padding:24px;margin-bottom:20px;background:linear-gradient(135deg,rgba(232,115,42,0.08),rgba(255,140,66,0.04));border-radius:16px;border:2px solid var(--color-accent);box-shadow:var(--shadow);">';
    h += '<div id="nhm-text" style="font-size:1.15rem;font-weight:700;line-height:1.5;color:var(--color-text);">Premi per iniziare</div>';
    h += '</div>';
    h += '<button id="nhm-next" type="button" class="btn btn-accent" style="font-size:1.1rem;padding:14px 40px;background:var(--color-accent);color:#fff;">🍺 Prossima!</button>';
    h += '<div style="margin-top:12px;font-size:0.75rem;opacity:0.3;" id="nhm-counter"></div>';
    h += '</div>';
    return h;
  }

  function attachHandlers() {
    var container = document.getElementById('app');
    if (!container) return;

    // Tabs
    var tabs = container.querySelectorAll('#giochi-tabs .person-btn');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function() {
        currentTab = this.dataset.tab;
        container.innerHTML = buildHtml();
        attachHandlers();
      });
    }

    if (currentTab === 'domande') {
      var usedDomande = JSON.parse(sessionStorage.getItem('kg-domande-used') || '[]');
      var nextBtn = container.querySelector('#domanda-next');
      var textEl = container.querySelector('#domanda-text');
      var counterEl = container.querySelector('#domanda-counter');

      if (nextBtn) nextBtn.addEventListener('click', function() {
        // Get unused questions
        var available = [];
        for (var i = 0; i < DOMANDE_VIAGGIO.length; i++) {
          if (usedDomande.indexOf(i) === -1) available.push(i);
        }
        if (available.length === 0) {
          usedDomande = [];
          for (var j = 0; j < DOMANDE_VIAGGIO.length; j++) available.push(j);
        }
        var pick = available[Math.floor(Math.random() * available.length)];
        usedDomande.push(pick);
        sessionStorage.setItem('kg-domande-used', JSON.stringify(usedDomande));
        textEl.textContent = DOMANDE_VIAGGIO[pick];
        counterEl.textContent = usedDomande.length + '/' + DOMANDE_VIAGGIO.length;
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }

    if (currentTab === 'nonhomai') {
      var usedNhm = JSON.parse(sessionStorage.getItem('kg-nhm-used') || '[]');
      var nhmBtn = container.querySelector('#nhm-next');
      var nhmText = container.querySelector('#nhm-text');
      var nhmCounter = container.querySelector('#nhm-counter');

      if (nhmBtn) nhmBtn.addEventListener('click', function() {
        var available = [];
        for (var i = 0; i < NON_HO_MAI.length; i++) {
          if (usedNhm.indexOf(i) === -1) available.push(i);
        }
        if (available.length === 0) {
          usedNhm = [];
          for (var j = 0; j < NON_HO_MAI.length; j++) available.push(j);
        }
        var pick = available[Math.floor(Math.random() * available.length)];
        usedNhm.push(pick);
        sessionStorage.setItem('kg-nhm-used', JSON.stringify(usedNhm));
        nhmText.textContent = NON_HO_MAI[pick];
        nhmCounter.textContent = usedNhm.length + '/' + NON_HO_MAI.length;
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }
  }

  var initialHtml = buildHtml();
  setTimeout(function() { attachHandlers(); }, 0);
  return initialHtml;
}
