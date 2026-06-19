/**
 * budget.js — Budget: Convertitore + Splitwise
 * Kyrgyzstan Travel PWA 2025
 *
 * Due tab: 💱 Convertitore | 💸 Spese condivise (Splitwise-style)
 * Global: renderBudget(), toEUR(), formatEUR()
 */

var RATES = {
  EUR: 1,
  KGS: 102,
  USD: 1.16,
  UZS: 14400
};

var TRAVELERS_BUDGET = ['Leo', 'Edu'];

function toEUR(amount, currency) {
  if (currency === 'EUR') return amount;
  return amount / RATES[currency];
}

function fromEUR(amountEUR, currency) {
  if (currency === 'EUR') return amountEUR;
  return amountEUR * RATES[currency];
}

function formatEUR(n) { return n.toFixed(2); }
function formatAmount(n) { return n < 100 ? n.toFixed(2) : Math.round(n).toString(); }

function renderBudget() {
  return new Promise(function (resolve) {
    DB.getAll('expenses').then(function (expenses) {
      DB.getAll('activityState').then(function (activityStates) {
        var wrapper = document.createElement('div');
        wrapper.className = 'section-content fade-in';
        var currentTab = 'converter';

        // Trip-day state — clamp to today (or last past day if today is in the future)
        var TRIP_DAYS = (typeof ITINERARY !== 'undefined' && ITINERARY) ? ITINERARY : [];
        var todayIso = new Date().toISOString().slice(0, 10);
        function pickInitialDay() {
          if (!TRIP_DAYS.length) return 1;
          // Find today's day in itinerary
          for (var d = 0; d < TRIP_DAYS.length; d++) {
            if (TRIP_DAYS[d].date === todayIso) return TRIP_DAYS[d].day;
          }
          // Otherwise: pick the latest past day, or day 1 if all future
          var lastPast = null;
          for (var d2 = 0; d2 < TRIP_DAYS.length; d2++) {
            if (TRIP_DAYS[d2].date <= todayIso) lastPast = TRIP_DAYS[d2].day;
          }
          return lastPast || 1;
        }
        var displayedDay = pickInitialDay();

        // Build a map of activity states by composite key
        var actStateMap = {};
        for (var asI = 0; asI < activityStates.length; asI++) {
          actStateMap[activityStates[asI].id] = activityStates[asI];
        }

        function dayByNumber(n) {
          for (var k = 0; k < TRIP_DAYS.length; k++) if (TRIP_DAYS[k].day === n) return TRIP_DAYS[k];
          return null;
        }
        function isDayInPastOrToday(dayObj) {
          return dayObj && dayObj.date && dayObj.date <= todayIso;
        }
        function formatItDate(iso) {
          if (!iso) return '';
          var parts = iso.split('-');
          return parts[2] + '/' + parts[1] + '/' + parts[0];
        }
        function activityKey(dayN, idx) {
          return 'act-day' + dayN + '-' + idx;
        }

      function render() {
        var html = '<h2 class="section-title">💰 Budget</h2>';

        // Itinerary panel (only for past or today's days)
        html += renderItineraryPanel();

        // Tab selector (same style as Leo/Edu)
        html += '<div class="person-selector" id="budget-tabs">';
        html += '<button class="person-btn' + (currentTab === 'converter' ? ' active' : '') + '" data-tab="converter" type="button">💱 Convertitore</button>';
        html += '<button class="person-btn' + (currentTab === 'split' ? ' active' : '') + '" data-tab="split" type="button">💸 Spese</button>';
        html += '</div>';

        if (currentTab === 'converter') {
          html += renderConverter();
        } else {
          html += renderSplit(expenses);
        }

        wrapper.innerHTML = html;
        bindEvents();
      }

      function renderItineraryPanel() {
        if (!TRIP_DAYS.length) return '';
        var dayObj = dayByNumber(displayedDay);
        if (!dayObj) return '';

        // Determine prev/next bounds: only past-or-today days
        var visibleDays = [];
        for (var vd = 0; vd < TRIP_DAYS.length; vd++) {
          if (isDayInPastOrToday(TRIP_DAYS[vd])) visibleDays.push(TRIP_DAYS[vd].day);
        }
        if (!visibleDays.length) {
          // Trip not started yet
          return '<div class="card"><div class="card-title">📅 Itinerario</div>' +
                 '<p style="font-size:0.85rem;opacity:0.7;">Il viaggio inizia il ' +
                 formatItDate(TRIP_DAYS[0].date) + '. Il diario di giornata sarà disponibile quando si parte.</p>' +
                 '</div>';
        }
        var idxInVisible = visibleDays.indexOf(displayedDay);
        if (idxInVisible === -1) {
          // Current displayedDay is in the future — clamp back
          displayedDay = visibleDays[visibleDays.length - 1];
          dayObj = dayByNumber(displayedDay);
          idxInVisible = visibleDays.length - 1;
        }
        var hasPrev = idxInVisible > 0;
        var hasNext = idxInVisible < visibleDays.length - 1;

        var h = '<div class="card" style="border:2px solid var(--color-secondary);">';

        // Header with nav
        h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">';
        h += '<button class="btn btn-sm btn-secondary" id="itin-prev" type="button"' + (hasPrev ? '' : ' disabled') + '>◀</button>';
        h += '<div style="text-align:center;flex:1;">';
        h += '<div style="font-weight:700;font-size:1rem;">📅 Giorno ' + dayObj.day + ' — ' + formatItDate(dayObj.date) + '</div>';
        h += '<div style="font-size:0.85rem;opacity:0.85;">' + (dayObj.title || '') + '</div>';
        h += '</div>';
        h += '<button class="btn btn-sm btn-secondary" id="itin-next" type="button"' + (hasNext ? '' : ' disabled') + '>▶</button>';
        h += '</div>';

        if (dayObj.route) {
          h += '<div style="font-size:0.8rem;opacity:0.75;margin-bottom:6px;">🛣️ ' + dayObj.route + '</div>';
        }
        if (dayObj.warnings && dayObj.warnings.length) {
          for (var w = 0; w < dayObj.warnings.length; w++) {
            h += '<div style="font-size:0.78rem;color:var(--color-danger);margin-bottom:4px;">⚠️ ' + dayObj.warnings[w] + '</div>';
          }
        }

        // Activities with checkboxes
        var acts = dayObj.activities || [];
        if (acts.length) {
          var doneCount = 0;
          h += '<div style="margin:10px 0 8px;font-weight:600;font-size:0.88rem;">📋 Attività</div>';
          for (var ai = 0; ai < acts.length; ai++) {
            var key = activityKey(dayObj.day, ai);
            var st = actStateMap[key];
            var checked = !!(st && st.done);
            if (checked) doneCount++;
            var actText = (acts[ai].time ? '<strong>' + acts[ai].time + '</strong> · ' : '') + acts[ai].description;
            h += '<label class="itin-act-row" data-actkey="' + key + '" style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;cursor:pointer;">';
            h += '<input type="checkbox" class="itin-act-check" data-actkey="' + key + '" data-day="' + dayObj.day + '" data-idx="' + ai + '"' + (checked ? ' checked' : '') + ' style="width:20px;height:20px;flex-shrink:0;margin-top:2px;">';
            h += '<span style="font-size:0.88rem;' + (checked ? 'opacity:0.55;text-decoration:line-through;' : '') + '">' + actText + '</span>';
            h += '</label>';
          }
          // Progress bar
          var pct = Math.round((doneCount / acts.length) * 100);
          var barColor = (doneCount === acts.length && acts.length > 0) ? 'var(--color-secondary)' : 'var(--color-accent)';
          h += '<div style="margin-top:8px;">';
          h += '<div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:3px;">';
          h += '<span>' + doneCount + '/' + acts.length + (doneCount === acts.length ? ' ✅ Giornata completata' : '') + '</span>';
          h += '<span>' + pct + '%</span>';
          h += '</div>';
          h += '<div style="height:6px;background:rgba(0,0,0,0.1);border-radius:3px;overflow:hidden;">';
          h += '<div style="width:' + pct + '%;height:100%;background:' + barColor + ';transition:width 0.3s;"></div>';
          h += '</div></div>';
        } else {
          h += '<div style="font-size:0.85rem;opacity:0.7;margin:8px 0;">Nessuna attività pianificata</div>';
        }

        // Day expenses roll-up
        var dayExps = [];
        for (var ex = 0; ex < expenses.length; ex++) {
          var eDate = expenses[ex].date;
          if (!eDate && expenses[ex].createdAt) {
            // Back-fill from createdAt for legacy records
            eDate = new Date(expenses[ex].createdAt).toISOString().slice(0, 10);
          }
          if (eDate === dayObj.date) dayExps.push(expenses[ex]);
        }
        h += '<hr style="margin:12px 0;border:none;border-top:1px solid var(--color-border);">';
        h += '<div style="font-weight:600;font-size:0.88rem;margin-bottom:6px;">💸 Spese del giorno</div>';
        if (!dayExps.length) {
          h += '<div style="font-size:0.85rem;opacity:0.7;">Nessuna spesa registrata per questo giorno</div>';
        } else {
          var dayTotalEur = 0;
          var dayByCcy = {};
          for (var de = 0; de < dayExps.length; de++) {
            var dExp = dayExps[de];
            dayTotalEur += (dExp.amountEUR || 0);
            if (dExp.currency && dExp.amount) {
              dayByCcy[dExp.currency] = (dayByCcy[dExp.currency] || 0) + dExp.amount;
            }
            h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;font-size:0.83rem;">';
            h += '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;">' + (dExp.note || dExp.category || 'Spesa') + ' · ' + (dExp.paidBy || '?') + '</span>';
            h += '<span style="text-align:right;">';
            if (dExp.currency !== 'EUR') {
              h += '<span style="opacity:0.6;font-size:0.75rem;">' + formatAmount(dExp.amount) + ' ' + dExp.currency + '</span> ';
            }
            h += '<strong>€' + formatEUR(dExp.amountEUR || 0) + '</strong>';
            h += '</span></div>';
          }
          // Subtotals per currency
          var ccyKeys = Object.keys(dayByCcy);
          if (ccyKeys.length > 0) {
            h += '<div style="font-size:0.78rem;opacity:0.7;margin-top:4px;border-top:1px dashed var(--color-border);padding-top:4px;">';
            for (var sk = 0; sk < ccyKeys.length; sk++) {
              if (sk > 0) h += ' · ';
              h += formatAmount(dayByCcy[ccyKeys[sk]]) + ' ' + ccyKeys[sk];
            }
            h += '</div>';
          }
          h += '<div style="font-size:0.92rem;font-weight:700;margin-top:6px;text-align:right;">Totale giorno: € ' + formatEUR(dayTotalEur) + '</div>';
        }

        h += '</div>';
        return h;
      }

      function renderConverter() {
        var h = '<div class="card">';
        h += '<div class="card-title">Convertitore Valuta</div>';
        h += '<div class="form-group"><label class="form-label">Importo</label>';
        h += '<input type="number" class="form-input" id="conv-amount" placeholder="100" value="100" min="0" step="0.01"></div>';
        h += '<div class="form-group"><label class="form-label">Da</label>';
        h += '<select class="form-select" id="conv-from">';
        h += '<option value="EUR">🇪🇺 EUR (Euro)</option>';
        h += '<option value="KGS">🇰🇬 KGS (Som)</option>';
        h += '<option value="USD">🇺🇸 USD (Dollaro)</option>';
        h += '<option value="UZS">🇺🇿 UZS (Sum)</option>';
        h += '</select></div>';
        h += '<div id="conv-results"></div>';
        h += '</div>';

        // Quick reference
        h += '<div class="card">';
        h += '<div class="card-title">📊 Tassi di Cambio</div>';
        h += '<table class="data-table"><thead><tr><th></th><th>EUR</th><th>KGS</th><th>USD</th><th>UZS</th></tr></thead><tbody>';
        h += '<tr><td>1 EUR</td><td>1</td><td>' + RATES.KGS + '</td><td>' + formatAmount(RATES.USD) + '</td><td>' + RATES.UZS + '</td></tr>';
        h += '<tr><td>1 KGS</td><td>' + (1/RATES.KGS).toFixed(4) + '</td><td>1</td><td>' + formatAmount(RATES.USD/RATES.KGS) + '</td><td>' + Math.round(RATES.UZS/RATES.KGS) + '</td></tr>';
        h += '</tbody></table>';
        h += '<p style="font-size:0.75rem;opacity:0.6;margin-top:6px;">Tassi indicativi, aggiornare prima della partenza</p>';
        h += '</div>';
        return h;
      }

      function renderSplit(exps) {
        // Calculate balances
        var balances = {};
        for (var t = 0; t < TRAVELERS_BUDGET.length; t++) balances[TRAVELERS_BUDGET[t]] = 0;

        var totalSpent = 0;
        for (var i = 0; i < exps.length; i++) {
          var e = exps[i];
          if (!e.paidBy || !e.splitWith) continue;
          var eurAmt = e.amountEUR || 0;
          totalSpent += eurAmt;
          // Person who paid gets credit
          var splitCount = e.splitWith.length;
          if (splitCount === 0) continue;
          var perPerson = eurAmt / splitCount;
          // Each person in splitWith owes perPerson
          for (var s = 0; s < e.splitWith.length; s++) {
            var person = e.splitWith[s];
            if (person !== e.paidBy) {
              balances[person] = (balances[person] || 0) - perPerson;
              balances[e.paidBy] = (balances[e.paidBy] || 0) + perPerson;
            }
          }
        }

        var h = '';

        // Balance summary
        h += '<div class="card">';
        h += '<div class="card-title">📊 Bilancio</div>';
        h += '<p style="font-size:0.9rem;margin-bottom:8px;">Totale spese: <strong>€' + formatEUR(totalSpent) + '</strong></p>';

        // Who owes whom
        var leoBalance = balances['Leo'] || 0;
        if (Math.abs(leoBalance) > 0.01) {
          if (leoBalance > 0) {
            h += '<div class="warning-box" style="border-left-color:var(--color-secondary);background:rgba(45,155,138,0.1);">';
            h += '<span>Edu deve a Leo: <strong>€' + formatEUR(leoBalance) + '</strong></span></div>';
          } else {
            h += '<div class="warning-box" style="border-left-color:var(--color-accent);background:rgba(232,115,42,0.1);">';
            h += '<span>Leo deve a Edu: <strong>€' + formatEUR(Math.abs(leoBalance)) + '</strong></span></div>';
          }
        } else {
          h += '<div class="warning-box" style="border-left-color:var(--color-secondary);background:rgba(45,155,138,0.1);">';
          h += '<span>✅ Siete pari!</span></div>';
        }

        // Per-person totals (con dettaglio valute originali)
        var paidByPerson = {};
        var paidByPersonByCurrency = {}; // { Leo: { EUR: 5, KGS: 2000 }, ... }
        for (var p = 0; p < TRAVELERS_BUDGET.length; p++) {
          paidByPerson[TRAVELERS_BUDGET[p]] = 0;
          paidByPersonByCurrency[TRAVELERS_BUDGET[p]] = {};
        }
        for (var j = 0; j < exps.length; j++) {
          var ej = exps[j];
          if (!ej.paidBy) continue;
          if (ej.amountEUR) {
            paidByPerson[ej.paidBy] = (paidByPerson[ej.paidBy] || 0) + ej.amountEUR;
          }
          if (ej.amount && ej.currency) {
            var byCcy = paidByPersonByCurrency[ej.paidBy] || (paidByPersonByCurrency[ej.paidBy] = {});
            byCcy[ej.currency] = (byCcy[ej.currency] || 0) + ej.amount;
          }
        }
        for (var pp = 0; pp < TRAVELERS_BUDGET.length; pp++) {
          var name = TRAVELERS_BUDGET[pp];
          var byCcyName = paidByPersonByCurrency[name] || {};
          var ccyKeys = Object.keys(byCcyName);
          h += '<div style="margin-top:8px;padding:8px 10px;background:rgba(0,0,0,0.04);border-radius:8px;">';
          h += '<div style="font-weight:600;font-size:0.9rem;margin-bottom:4px;">' + name + '</div>';
          if (ccyKeys.length === 0) {
            h += '<div style="font-size:0.8rem;opacity:0.6;">Nessuna spesa</div>';
          } else {
            h += '<ul style="margin:0;padding-left:18px;font-size:0.82rem;">';
            for (var ck = 0; ck < ccyKeys.length; ck++) {
              var ccy = ccyKeys[ck];
              h += '<li>' + formatAmount(byCcyName[ccy]) + ' ' + ccy + '</li>';
            }
            h += '</ul>';
          }
          h += '<div style="font-size:0.85rem;margin-top:4px;">Totale: <strong>€' + formatEUR(paidByPerson[name]) + '</strong></div>';
          h += '</div>';
        }
        h += '</div>';

        // Add expense form
        h += '<div class="card">';
        h += '<div class="card-title">➕ Aggiungi Spesa</div>';
        h += '<div class="form-group"><label class="form-label">Descrizione</label>';
        h += '<input type="text" class="form-input" id="split-desc" placeholder="Cena, benzina, hotel..."></div>';
        h += '<div style="display:flex;gap:8px;">';
        h += '<div class="form-group" style="flex:1;"><label class="form-label">Importo</label>';
        h += '<input type="number" class="form-input" id="split-amount" placeholder="0" min="0" step="0.01"></div>';
        h += '<div class="form-group" style="flex:0 0 100px;"><label class="form-label">Valuta</label>';
        h += '<select class="form-select" id="split-currency">';
        h += '<option value="EUR">EUR</option><option value="KGS">KGS</option><option value="USD">USD</option><option value="UZS">UZS</option>';
        h += '</select></div></div>';
        h += '<div class="form-group"><label class="form-label">Pagato da</label>';
        h += '<div class="person-selector" id="paid-by-selector">';
        h += '<button class="person-btn active" data-person="Leo" type="button">Leo</button>';
        h += '<button class="person-btn" data-person="Edu" type="button">Edu</button>';
        h += '</div></div>';
        h += '<div class="form-group"><label class="form-label">Diviso tra</label>';
        h += '<div style="display:flex;gap:8px;">';
        for (var st = 0; st < TRAVELERS_BUDGET.length; st++) {
          h += '<label style="display:flex;align-items:center;gap:6px;flex:1;padding:8px;border:1px solid var(--color-border);border-radius:var(--radius-sm);cursor:pointer;">';
          h += '<input type="checkbox" class="split-person" value="' + TRAVELERS_BUDGET[st] + '" checked style="width:20px;height:20px;">';
          h += '<span>' + TRAVELERS_BUDGET[st] + '</span></label>';
        }
        h += '</div></div>';
        h += '<div class="form-group"><label class="form-label">Categoria</label>';
        h += '<select class="form-select" id="split-category">';
        var cats = ['🍽️ Cibo', '🏨 Alloggio', '⛽ Trasporto', '🎯 Attività', '🛒 Shopping', '📦 Altro'];
        for (var ci = 0; ci < cats.length; ci++) {
          h += '<option value="' + cats[ci] + '">' + cats[ci] + '</option>';
        }
        h += '</select></div>';
        h += '<button class="btn btn-primary" id="split-add" type="button" style="width:100%;">Aggiungi</button>';
        h += '</div>';

        // Expense list
        if (exps.length > 0) {
          h += '<div class="card"><div class="card-title">📝 Storico Spese</div>';
          // Sort by date desc
          var sorted = exps.slice().sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
          for (var ei = 0; ei < sorted.length; ei++) {
            var ex = sorted[ei];
            h += '<div class="expense-item" style="flex-wrap:wrap;">';
            h += '<div style="flex:1;min-width:0;">';
            h += '<div style="font-weight:600;font-size:0.9rem;">' + (ex.note || ex.category || 'Spesa') + '</div>';
            h += '<div style="font-size:0.78rem;opacity:0.6;">' + (ex.paidBy || '?') + ' ha pagato · diviso: ' + (ex.splitWith ? ex.splitWith.join(', ') : '?') + '</div>';
            h += '</div>';
            h += '<div style="display:flex;align-items:center;gap:4px;">';
            h += '<div style="text-align:right;">';
            h += '<div class="expense-amount">€' + formatEUR(ex.amountEUR || 0) + '</div>';
            if (ex.currency !== 'EUR') {
              h += '<div style="font-size:0.75rem;opacity:0.5;">' + formatAmount(ex.amount) + ' ' + ex.currency + '</div>';
            }
            h += '</div>';
            h += '<button class="expense-delete" data-expid="' + ex.id + '" type="button">✕</button>';
            h += '</div></div>';
          }
          h += '</div>';
        }

        return h;
      }

      function updateConverterResults() {
        var amountEl = wrapper.querySelector('#conv-amount');
        var fromEl = wrapper.querySelector('#conv-from');
        var resultsEl = wrapper.querySelector('#conv-results');
        if (!amountEl || !fromEl || !resultsEl) return;

        var amount = parseFloat(amountEl.value) || 0;
        var from = fromEl.value;
        var eurAmount = toEUR(amount, from);

        var rh = '<div style="margin-top:12px;">';
        var currencies = ['EUR', 'KGS', 'USD', 'UZS'];
        var flags = { EUR: '🇪🇺', KGS: '🇰🇬', USD: '🇺🇸', UZS: '🇺🇿' };
        var names = { EUR: 'Euro', KGS: 'Som kirghizo', USD: 'Dollaro USA', UZS: 'Sum uzbeko' };
        for (var c = 0; c < currencies.length; c++) {
          var cur = currencies[c];
          if (cur === from) continue;
          var converted = fromEUR(eurAmount, cur);
          rh += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;margin-bottom:6px;background:var(--color-bg);border-radius:var(--radius-sm);">';
          rh += '<span style="font-size:0.9rem;">' + flags[cur] + ' ' + names[cur] + '</span>';
          rh += '<span style="font-size:1.1rem;font-weight:700;">' + formatAmount(converted) + ' ' + cur + '</span>';
          rh += '</div>';
        }
        rh += '</div>';
        resultsEl.innerHTML = rh;
      }

      function bindEvents() {
        // Itinerary nav
        var prev = wrapper.querySelector('#itin-prev');
        var next = wrapper.querySelector('#itin-next');
        if (prev) prev.addEventListener('click', function () {
          var visible = [];
          for (var v = 0; v < TRIP_DAYS.length; v++) if (isDayInPastOrToday(TRIP_DAYS[v])) visible.push(TRIP_DAYS[v].day);
          var idx = visible.indexOf(displayedDay);
          if (idx > 0) { displayedDay = visible[idx - 1]; render(); }
        });
        if (next) next.addEventListener('click', function () {
          var visible = [];
          for (var v = 0; v < TRIP_DAYS.length; v++) if (isDayInPastOrToday(TRIP_DAYS[v])) visible.push(TRIP_DAYS[v].day);
          var idx = visible.indexOf(displayedDay);
          if (idx < visible.length - 1) { displayedDay = visible[idx + 1]; render(); }
        });

        // Activity checkboxes
        var actChecks = wrapper.querySelectorAll('.itin-act-check');
        for (var ac = 0; ac < actChecks.length; ac++) {
          actChecks[ac].addEventListener('change', function () {
            var key = this.getAttribute('data-actkey');
            var dayN = parseInt(this.getAttribute('data-day'), 10);
            var idx = parseInt(this.getAttribute('data-idx'), 10);
            var record = {
              id: key,
              tripDay: dayN,
              activityIdx: idx,
              done: this.checked,
              updatedAt: Date.now()
            };
            actStateMap[key] = record;
            DB.put('activityState', record);
            render();
          });
        }

        // Tab switching
        var tabs = wrapper.querySelectorAll('#budget-tabs .person-btn');
        for (var t = 0; t < tabs.length; t++) {
          tabs[t].addEventListener('click', function () {
            currentTab = this.dataset.tab;
            render();
          });
        }

        if (currentTab === 'converter') {
          var convAmt = wrapper.querySelector('#conv-amount');
          var convFrom = wrapper.querySelector('#conv-from');
          if (convAmt) {
            convAmt.addEventListener('input', updateConverterResults);
            convFrom.addEventListener('change', updateConverterResults);
            updateConverterResults();
          }
        } else {
          // Paid by selector
          var paidBtns = wrapper.querySelectorAll('#paid-by-selector .person-btn');
          for (var pb = 0; pb < paidBtns.length; pb++) {
            paidBtns[pb].addEventListener('click', function () {
              for (var x = 0; x < paidBtns.length; x++) paidBtns[x].classList.remove('active');
              this.classList.add('active');
            });
          }

          // Add expense
          var addBtn = document.getElementById('split-add');
          if (addBtn) {
            addBtn.addEventListener('click', function () {
              var desc = wrapper.querySelector('#split-desc');
              var amtEl = wrapper.querySelector('#split-amount');
              var curEl = wrapper.querySelector('#split-currency');
              var catEl = wrapper.querySelector('#split-category');

              var amount = parseFloat(amtEl.value);
              if (!amount || amount <= 0) { showToast('Inserisci un importo'); return; }

              var paidBy = 'Leo';
              var activeBtn = wrapper.querySelector('#paid-by-selector .person-btn.active');
              if (activeBtn) paidBy = activeBtn.dataset.person;

              var splitWith = [];
              var checks = wrapper.querySelectorAll('.split-person:checked');
              for (var sc = 0; sc < checks.length; sc++) splitWith.push(checks[sc].value);
              if (splitWith.length === 0) { showToast('Seleziona almeno una persona'); return; }

              var currency = curEl.value;
              // Pre-fill date from displayed itinerary day if available, else today
              var spendDate = todayIso;
              var dayObjForDate = dayByNumber(displayedDay);
              if (dayObjForDate && dayObjForDate.date) spendDate = dayObjForDate.date;

              var newExp = {
                id: 'exp-' + Date.now(),
                amount: amount,
                currency: currency,
                amountEUR: toEUR(amount, currency),
                paidBy: paidBy,
                splitWith: splitWith,
                category: catEl.value,
                note: desc.value || catEl.value,
                date: spendDate,
                createdAt: Date.now()
              };

              expenses.push(newExp);
              DB.put('expenses', newExp).then(function () {
                showToast('Spesa aggiunta ✓');
                render();
              });
            });
          }

          // Delete expense
          var delBtns = wrapper.querySelectorAll('.expense-delete');
          for (var db2 = 0; db2 < delBtns.length; db2++) {
            delBtns[db2].addEventListener('click', function () {
              var expId = this.getAttribute('data-expid');
              for (var r = expenses.length - 1; r >= 0; r--) {
                if (expenses[r].id === expId) { expenses.splice(r, 1); break; }
              }
              DB.delete('expenses', expId).then(function () {
                showToast('Eliminata');
                render();
              });
            });
          }
        }
      }

      render();
      resolve(wrapper);
      });
    });
  });
}
