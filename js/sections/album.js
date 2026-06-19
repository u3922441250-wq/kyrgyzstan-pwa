/**
 * album.js — Album Foto AI (Polaroid style)
 * 
 * MODIFICA QUI LE FOTO E LE DESCRIZIONI:
 * Aggiungi/rimuovi oggetti dall'array ALBUM_PHOTOS.
 * Formato: { src: 'percorso/foto.jpg', desc: 'Descrizione' }
 */

var ALBUM_PHOTOS = [
  { src: 'AI%20images/ChatGPT%20Image%2015%20apr%202026%2C%2016_21_37.png', desc: 'Il viaggio inizia qui. Due amici e un sogno.' },
  { src: 'AI%20images/passo%20di%20motagna.png', desc: 'Il passo di montagna. 3500m. Silenzio e vento.' },
  { src: 'AI%20images/yurta.png', desc: 'La yurta. Casa nomade da mille anni.' },
  { src: 'AI%20images/milk.jpeg', desc: 'Kumys. Latte di cavalla fermentato.' },
  { src: 'AI%20images/milk%202.jpeg', desc: 'La tradizione del kumys, passata di mano in mano.' },
  { src: 'AI%20images/Fine%20viaggio.jpeg', desc: 'Fine del viaggio. Inizio di qualcos altro.' }
];

// ============================================================
// NON TOCCARE SOTTO — logica di rendering
// ============================================================

function renderAlbum() {
  var wrapper = document.createElement('div');
  wrapper.className = 'section-content fade-in';

  var currentPage = 0;
  var total = ALBUM_PHOTOS.length;

  function renderPage() {
    var photo = ALBUM_PHOTOS[currentPage];
    var rotation = ((currentPage * 7) % 5) - 2; // -2 to +2 degrees
    var html = '';

    html += '<div style="text-align:center;padding:20px 12px;min-height:70vh;">';
    html += '<h2 class="section-title" style="font-family:Georgia,serif;font-style:italic;margin-bottom:4px;">📖 Album AI</h2>';
    html += '<div style="font-size:0.75rem;opacity:0.4;margin-bottom:20px;">' + (currentPage + 1) + ' / ' + total + '</div>';

    // Polaroid frame
    html += '<div id="album-frame" style="display:inline-block;max-width:300px;background:#fff;padding:10px 10px 45px 10px;border-radius:2px;box-shadow:0 6px 25px rgba(0,0,0,0.3),0 2px 6px rgba(0,0,0,0.15);transform:rotate(' + rotation + 'deg);transition:transform 0.3s;">';
    html += '<img src="' + photo.src + '" style="width:100%;display:block;" alt="">';
    html += '<div style="margin-top:10px;font-family:Georgia,serif;font-style:italic;font-size:0.95rem;color:#333;line-height:1.5;text-align:center;">' + (photo.desc || '') + '</div>';
    html += '</div>';

    // Navigation
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;max-width:300px;margin-left:auto;margin-right:auto;">';
    html += '<button id="album-prev" type="button" style="width:48px;height:48px;border-radius:50%;border:2px solid var(--color-border);background:var(--color-card);font-size:1.2rem;cursor:pointer;opacity:' + (currentPage > 0 ? '1' : '0.2') + ';">◀</button>';
    html += '<div style="font-family:Georgia,serif;font-size:0.75rem;opacity:0.3;">swipe o frecce</div>';
    html += '<button id="album-next" type="button" style="width:48px;height:48px;border-radius:50%;border:2px solid var(--color-border);background:var(--color-card);font-size:1.2rem;cursor:pointer;opacity:' + (currentPage < total - 1 ? '1' : '0.2') + ';">▶</button>';
    html += '</div>';

    html += '</div>';
    wrapper.innerHTML = html;

    // Handlers
    var prevBtn = wrapper.querySelector('#album-prev');
    var nextBtn = wrapper.querySelector('#album-next');
    if (prevBtn) prevBtn.addEventListener('click', function() { if (currentPage > 0) { currentPage--; renderPage(); } });
    if (nextBtn) nextBtn.addEventListener('click', function() { if (currentPage < total - 1) { currentPage++; renderPage(); } });

    // Swipe
    var frame = wrapper.querySelector('#album-frame');
    if (frame) {
      var startX = 0;
      frame.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, {passive: true});
      frame.addEventListener('touchend', function(e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentPage < total - 1) { currentPage++; renderPage(); }
          else if (diff < 0 && currentPage > 0) { currentPage--; renderPage(); }
        }
      }, {passive: true});
    }
  }

  renderPage();
  return wrapper;
}
