/**
 * home.js — Home Screen
 * Kyrgyzstan Travel PWA 2025
 */
var TRIP_START = new Date(2025, 4, 30);
var TRIP_END = new Date(2025, 5, 13);
function getTripStatus(now) {
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var start = new Date(TRIP_START.getFullYear(), TRIP_START.getMonth(), TRIP_START.getDate());
  var end = new Date(TRIP_END.getFullYear(), TRIP_END.getMonth(), TRIP_END.getDate());
  if (today < start) { return { status: 'before', daysUntil: Math.ceil((start - today) / 86400000) }; }
  if (today > end) { return { status: 'after' }; }
  return { status: 'during', day: Math.floor((today - start) / 86400000) + 1 };
}
function renderHome() {
  var status = getTripStatus(new Date());
  var sh = '';
  if (status.status === 'before') {
    sh = '<div class="card"><div class="card-title">⏳ Partenza tra ' + status.daysUntil + ' giorni</div><p>30 maggio – 13 giugno 2025</p></div>';
  } else if (status.status === 'during') {
    var dd = ITINERARY[status.day - 1];
    sh = '<div class="card"><div class="card-title">📍 Giorno ' + status.day + ' / 15</div><p>' + (dd ? dd.title : '') + '</p></div>';
  } else {
    sh = '<div class="card"><div class="card-title">✈️ Viaggio completato!</div><p>30 maggio – 13 giugno 2025</p></div>';
  }
  var lo = '';
  for (var i = 0; i < ITINERARY.length; i++) {
    var d = ITINERARY[i]; var sel = '';
    var sv = localStorage.getItem('kg-current-location');
    if (sv && sv === String(d.day)) { sel = ' selected'; }
    else if (!sv && status.status === 'during' && status.day === d.day) { sel = ' selected'; }
    lo += '<option value="' + d.day + '"' + sel + '>G' + d.day + ' — ' + d.title + '</option>';
  }
  var lh = '<div class="form-group"><label class="form-label">📍 Posizione attuale</label><select class="form-select" id="location-select" onchange="localStorage.setItem(\'kg-current-location\', this.value)">' + lo + '</select></div>';
  var ni = [
    { emoji: '📅', label: 'Itinerario', href: '#/itinerario' },
    { emoji: '✅', label: 'Checklist', href: '#/checklist' },
    { emoji: '💰', label: 'Budget', href: '#/budget' },
    { emoji: '🗣️', label: 'Frasario', href: '#/frasario' },
    { emoji: '🏥', label: 'SOS', href: '#/sos' },
    { emoji: '🚗', label: 'Veicolo', href: '#/veicolo' },
    { emoji: '🏔️', label: 'Altitudine', href: '#/altitudine' },
    { emoji: '🗺️', label: 'GPS', href: '#/gps' },
    { emoji: '📋', label: 'Info', href: '#/info' },
    { emoji: '🚁', label: 'Droni', href: '#/droni' },
    { emoji: '🌙', label: 'Dark Mode', href: null }
  ];
  var gh = '<div class="nav-grid">';
  for (var j = 0; j < ni.length; j++) {
    var it = ni[j];
    if (it.href) { gh += '<a class="nav-grid-item" href="' + it.href + '"><span class="nav-grid-icon">' + it.emoji + '</span><span class="nav-grid-label">' + it.label + '</span></a>'; }
    else { gh += '<button class="nav-grid-item" onclick="toggleDarkMode()" type="button"><span class="nav-grid-icon">' + it.emoji + '</span><span class="nav-grid-label">' + it.label + '</span></button>'; }
  }
  gh += '</div>';
  return '<div class="section-content fade-in"><h2 class="section-title">🏔️ KYRGYZSTAN 2025</h2>' + sh + lh + gh + '</div>';
}
