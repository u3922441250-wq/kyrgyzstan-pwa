/**
 * piatti.js — Piatti Tipici Kirghizi
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderPiatti()
 */

var PIATTI = [
  {
    nome: 'Beshbarmak',
    emoji: '🥩',
    tipo: 'Piatto nazionale',
    desc: 'Il piatto nazionale kirghizo. Letteralmente "cinque dita" perché si mangia con le mani.',
    ingredienti: 'Carne di cavallo o montone bollita, pasta fatta in casa (larghe sfoglie), cipolla, brodo.',
    ricetta: 'La carne viene bollita a lungo nel brodo. La pasta viene stesa e tagliata in grandi quadrati, cotta nel brodo. Servita con la carne sopra la pasta, cipolla cruda e brodo a parte.',
    dove: 'Ovunque, specialmente nelle yurte e nelle case dei nomadi. Piatto delle occasioni speciali.',
    prezzo: '200-400 KGS'
  },
  {
    nome: 'Plov (Paloo)',
    emoji: '🍚',
    tipo: 'Riso',
    desc: 'Riso pilaf dell\'Asia Centrale. Ogni paese ha la sua versione, quella kirghiza è più semplice.',
    ingredienti: 'Riso, carote, cipolla, montone o manzo, aglio intero, cumino, olio vegetale.',
    ricetta: 'Soffriggere cipolla e carne, aggiungere carote a julienne, poi riso e acqua. Cuocere a fuoco lento con aglio intero al centro. Non mescolare mai dopo aver aggiunto il riso.',
    dove: 'Osh Bazaar (Bishkek), Osh city, qualsiasi chaikhana.',
    prezzo: '150-300 KGS'
  },
  {
    nome: 'Lagman',
    emoji: '🍜',
    tipo: 'Noodles',
    desc: 'Noodles tirati a mano in brodo di verdure e carne. Influenza cinese/uigura.',
    ingredienti: 'Noodles fatti a mano, manzo o montone, pomodori, peperoni, cipolla, aglio, spezie.',
    ricetta: 'I noodles vengono tirati a mano (tecnica spettacolare da vedere). Il sugo è un ragù di carne con verdure. Esiste anche la versione "asciutta" (senza brodo).',
    dove: 'Ristoranti dungani a Karakol sono i migliori. Anche a Bishkek ovunque.',
    prezzo: '150-250 KGS'
  },
  {
    nome: 'Manti',
    emoji: '🥟',
    tipo: 'Ravioli',
    desc: 'Grandi ravioli al vapore ripieni di carne e cipolla. Simili ai dim sum cinesi ma più grandi.',
    ingredienti: 'Pasta di farina, carne di montone o manzo tritata, cipolla, cumino, pepe nero.',
    ricetta: 'Impasto steso sottile, ripieno di carne e cipolla speziata, chiusi a forma di sacchetto. Cotti al vapore per 40-45 minuti. Serviti con panna acida o salsa di pomodoro.',
    dove: 'Ovunque. Particolarmente buoni nei mercati e nelle chaikhana.',
    prezzo: '100-200 KGS'
  },
  {
    nome: 'Samsa',
    emoji: '🥧',
    tipo: 'Street food',
    desc: 'Fagottini di pasta sfoglia ripieni, cotti nel tandoor (forno di argilla). Lo snack perfetto per la strada.',
    ingredienti: 'Pasta sfoglia, carne di montone, cipolla, cumino, sesamo.',
    ricetta: 'Pasta sfoglia ripiena di carne e cipolla, chiusa a triangolo o cerchio. Cotta nel tandoor attaccata alle pareti del forno. Croccante fuori, succosa dentro.',
    dove: 'Ogni bazaar, panetteria, chiosco stradale. Osh Bazaar a Bishkek.',
    prezzo: '30-80 KGS'
  },
  {
    nome: 'Ashlyam-Fu',
    emoji: '🥣',
    tipo: 'Piatto freddo',
    desc: 'Piatto freddo unico di Karakol. Noodles freddi con gelatina di amido in brodo acido piccante.',
    ingredienti: 'Noodles freddi, gelatina di amido, aceto, peperoncino, verdure, brodo freddo.',
    ricetta: 'Noodles e gelatina di amido serviti in brodo freddo acido e piccante. Piatto estivo rinfrescante. Esiste solo a Karakol e dintorni.',
    dove: 'SOLO a Karakol — ristoranti dungani nel centro. Da non perdere!',
    prezzo: '100-150 KGS'
  },
  {
    nome: 'Kumys',
    emoji: '🥛',
    tipo: 'Bevanda',
    desc: 'Latte di cavalla fermentato. La bevanda nazionale. Leggermente alcolica e acida.',
    ingredienti: 'Latte di cavalla fresco, fermentato naturalmente.',
    ricetta: 'Il latte viene messo in un contenitore di pelle e agitato regolarmente per giorni. La fermentazione produce un sapore acido e leggermente frizzante. ~2% alcol.',
    dove: 'Yurte dei nomadi, mercati, lungo la strada. Son-Kul è il posto migliore.',
    prezzo: '50-100 KGS al bicchiere'
  },
  {
    nome: 'Shashlik',
    emoji: '🍢',
    tipo: 'Grigliata',
    desc: 'Spiedini di carne alla griglia. Montone, manzo o pollo marinati e grigliati su carbone.',
    ingredienti: 'Carne a cubetti, cipolla, aceto, sale, pepe, cumino. Servito con cipolla cruda e pane.',
    ricetta: 'Carne marinata in cipolla e aceto per ore, infilzata su spiedini metallici, grigliata su carbone vivo. Servita con cipolla cruda, aceto e pane tandoor.',
    dove: 'Ogni ristorante, chaikhana, e lungo le strade principali.',
    prezzo: '100-200 KGS per spiedino'
  },
  {
    nome: 'Kymyz Shorpo',
    emoji: '🍲',
    tipo: 'Zuppa',
    desc: 'Zuppa di montone ricca e sostanziosa. Il comfort food kirghizo per eccellenza.',
    ingredienti: 'Montone con osso, patate, carote, cipolla, pepe nero, aneto.',
    ricetta: 'Montone bollito a lungo con verdure. Brodo ricco e grasso. Servito con pane e cipolla. Perfetto dopo una giornata fredda in montagna.',
    dove: 'Chaikhana ovunque, specialmente in montagna.',
    prezzo: '150-250 KGS'
  },
  {
    nome: 'Boorsok',
    emoji: '🍩',
    tipo: 'Pane fritto',
    desc: 'Pezzetti di pasta fritta. Accompagnano ogni pasto, specialmente nelle yurte.',
    ingredienti: 'Farina, latte, burro, lievito, zucchero, sale, olio per friggere.',
    ricetta: 'Impasto lievitato tagliato a pezzetti e fritto in olio abbondante. Serviti caldi con marmellata, miele, o panna acida (kaymak).',
    dove: 'In ogni yurta, guesthouse, e colazione tradizionale.',
    prezzo: 'Inclusi nella colazione'
  },
  {
    nome: 'Kurut',
    emoji: '🧀',
    tipo: 'Snack',
    desc: 'Palline di yogurt essiccato e salato. Snack dei nomadi, dura mesi senza frigo.',
    ingredienti: 'Yogurt di pecora o mucca, sale.',
    ricetta: 'Yogurt filtrato, salato e formato in palline. Essiccato al sole per giorni. Durissimo, si scioglie in bocca lentamente. Sapore forte e salato.',
    dove: 'Mercati, lungo la strada, nelle yurte. Perfetto snack da viaggio.',
    prezzo: '50-100 KGS al sacchetto'
  }
];

function renderPiatti() {
  var html = '<h2 class="section-title">🍽️ Piatti Tipici</h2>';

  for (var i = 0; i < PIATTI.length; i++) {
    var p = PIATTI[i];
    var isFirst = i < 2;
    html += '<details' + (isFirst ? ' open' : '') + '>';
    html += '<summary>' + p.emoji + ' ' + p.nome + ' <span style="font-size:0.75rem;opacity:0.6;font-weight:400;">— ' + p.tipo + '</span></summary>';
    html += '<div class="details-content">';
    html += '<p style="margin-bottom:8px;">' + p.desc + '</p>';
    html += '<div style="margin-bottom:6px;"><strong>🧾 Ingredienti:</strong> ' + p.ingredienti + '</div>';
    html += '<div style="margin-bottom:6px;"><strong>👨‍🍳 Preparazione:</strong> ' + p.ricetta + '</div>';
    html += '<div style="margin-bottom:6px;"><strong>📍 Dove:</strong> ' + p.dove + '</div>';
    html += '<div><strong>💰 Prezzo:</strong> ' + p.prezzo + '</div>';
    html += '</div></details>';
  }

  // Image
  html += '<img src="icons/kumys-nomads.jpeg" style="width:100%;border-radius:var(--radius);margin-top:16px;box-shadow:var(--shadow);" alt="Kumys con i nomadi">';

  // Roulette della Cena
  html += '<div class="card" style="margin-top:20px;text-align:center;padding:20px;">';
  html += '<div style="font-size:1.1rem;font-weight:800;margin-bottom:4px;">🎰 Roulette della Cena</div>';
  html += '<div style="font-size:0.8rem;opacity:0.5;margin-bottom:16px;">Non sai cosa mangiare? Lascia decidere al destino.</div>';
  html += '<div id="roulette-display" style="position:relative;height:80px;overflow:hidden;border-radius:12px;border:2px solid var(--color-secondary);margin-bottom:16px;background:var(--color-bg);">';
  html += '<div id="roulette-strip" style="transition:transform 3s cubic-bezier(0.17,0.67,0.12,0.99);"></div>';
  html += '<div style="position:absolute;top:0;left:0;right:0;height:25px;background:linear-gradient(to bottom,var(--color-card),transparent);pointer-events:none;"></div>';
  html += '<div style="position:absolute;bottom:0;left:0;right:0;height:25px;background:linear-gradient(to top,var(--color-card),transparent);pointer-events:none;"></div>';
  html += '<div style="position:absolute;top:50%;left:0;right:0;transform:translateY(-50%);height:40px;border-top:2px solid var(--color-accent);border-bottom:2px solid var(--color-accent);pointer-events:none;"></div>';
  html += '</div>';
  html += '<button id="roulette-spin" type="button" class="btn btn-primary" style="font-size:1rem;padding:12px 32px;">🎲 GIRA!</button>';
  html += '<div id="roulette-result" style="margin-top:14px;font-size:1.1rem;font-weight:700;min-height:28px;"></div>';
  html += '</div>';

  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';
  wrapper.innerHTML = html;

  // Bind roulette
  setTimeout(function() {
    var spinBtn = document.getElementById('roulette-spin');
    var strip = document.getElementById('roulette-strip');
    var resultEl = document.getElementById('roulette-result');
    if (!spinBtn || !strip) return;

    var rouletteItems = [
      { emoji: '🥩', name: 'Beshbarmak', desc: 'Cinque dita. Non chiedere di chi.' },
      { emoji: '🍚', name: 'Plov', desc: 'Riso unto. Il colesterolo ringrazia.' },
      { emoji: '🍜', name: 'Lagman', desc: 'Noodles tirati a mano. Come le tue speranze.' },
      { emoji: '🥟', name: 'Manti', desc: 'Ravioli al vapore. L\'unica cosa calda stasera.' },
      { emoji: '🍢', name: 'Shashlik', desc: 'Carne su un bastone. Primitivo ma efficace.' },
      { emoji: '🥣', name: 'Ashlyam-Fu', desc: 'Gelatina fredda in brodo acido. Fidati.' },
      { emoji: '🐴', name: 'Testa di cavallo', desc: 'Sì, letteralmente. Con gli occhi che ti guardano.' },
      { emoji: '🫁', name: 'Polmone ripieno', desc: 'Ripieno di... non vuoi saperlo.' },
      { emoji: '❓', name: 'Cosa misteriosa dal bazar', desc: 'Nemmeno il venditore sa cos\'è. Coraggio.' },
      { emoji: '🧀', name: 'Kurut', desc: 'Sassi di yogurt. I tuoi denti piangono.' },
      { emoji: '🥛', name: 'Solo kumys', desc: 'Cena liquida. Latte di cavalla fermentato. Cin cin.' },
      { emoji: '🍩', name: 'Boorsok e basta', desc: 'Pane fritto. La cena dei campioni pigri.' }
    ];

    // Build strip (repeat items many times for scrolling effect)
    var itemHeight = 80;
    var repeats = 8;
    var stripHtml = '';
    for (var r = 0; r < repeats; r++) {
      for (var i = 0; i < rouletteItems.length; i++) {
        var item = rouletteItems[i];
        stripHtml += '<div style="height:' + itemHeight + 'px;display:flex;align-items:center;justify-content:center;gap:10px;">';
        stripHtml += '<span style="font-size:2rem;">' + item.emoji + '</span>';
        stripHtml += '<span style="font-size:1rem;font-weight:700;">' + item.name + '</span>';
        stripHtml += '</div>';
      }
    }
    strip.innerHTML = stripHtml;

    var spinning = false;
    spinBtn.addEventListener('click', function() {
      if (spinning) return;
      spinning = true;
      spinBtn.disabled = true;
      resultEl.innerHTML = '';

      // Pick random result
      var chosenIdx = Math.floor(Math.random() * rouletteItems.length);
      // Scroll to: several full cycles + chosen position
      var totalItems = rouletteItems.length * repeats;
      var targetItem = (rouletteItems.length * (repeats - 2)) + chosenIdx;
      var offset = -(targetItem * itemHeight) + (itemHeight * 0.5) - 40;
      strip.style.transition = 'none';
      strip.style.transform = 'translateY(0)';
      // Force reflow
      strip.offsetHeight;
      strip.style.transition = 'transform 3s cubic-bezier(0.17,0.67,0.12,0.99)';
      strip.style.transform = 'translateY(' + offset + 'px)';

      setTimeout(function() {
        spinning = false;
        spinBtn.disabled = false;
        var chosen = rouletteItems[chosenIdx];
        resultEl.innerHTML = '<div style="font-size:1.3rem;">' + chosen.emoji + ' <strong>' + chosen.name + '</strong></div>' +
          '<div style="font-size:0.85rem;opacity:0.7;margin-top:4px;font-style:italic;">' + chosen.desc + '</div>';
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
      }, 3200);
    });
  }, 50);

  return wrapper;
}
