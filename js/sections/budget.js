/**
 * budget.js — Budget Tracker
 * Kyrgyzstan Travel PWA 2025
 *
 * Global: renderBudget(), toEUR(), formatEUR()
 */

var BUDGET_TOTAL = 1200;
var BUDGET_CATEGORIES = ['cibo', 'alloggio', 'trasporto', 'attività', 'shopping', 'altro'];
var CATEGORY_COLORS = {
  cibo: '#e8732a',
  alloggio: '#2d9b8a',
  trasporto: '#1a5c38',
  'attività': '#d4a017',
  shopping: '#c0392b',
  altro: '#7f8c8d'
};

/**
 * Convert amount to EUR using fixed rates.
 * 1 EUR = 97 KGS, 1 EUR = 13500 UZS, 1 USD = 89 KGS → 1 USD = 89/97 EUR
 * @param {number} amount
 * @param {string} currency
 * @returns {number}
 */
function toEUR(amount, currency) {
  switch (currency) {
    case 'EUR': return amount;
    case 'KGS': return amount / 97;
    case 'UZS': return amount / 13500;
    case 'USD': return amount * (89 / 97);
    default: return 0;
  }
}

/**
 * Format a number as EUR string with 2 decimal places.
 * @param {number} amount
 * @returns {string}
 */
function formatEUR(amount) {
  return amount.toFixed(2);
}

function renderBudget() {
  return new Promise(function (resolve) {
    DB.getAll('expenses').then(function (expenses) {
      var wrapper = document.createElement('div');
      wrapper.className = 'section-content fade-in';

      function render() {
        // Calculate totals
        var totalEUR = 0;
        var catTotals = {};
        var dayGroups = {};
        for (var i = 0; i < BUDGET_CATEGORIES.length; i++) {
          catTotals[BUDGET_CATEGORIES[i]] = 0;
        }

        for (var e = 0; e < expenses.length; e++) {
          var exp = expenses[e];
          totalEUR += exp.amountEUR;
          if (catTotals[exp.category] !== undefined) {
            catTotals[exp.category] += exp.amountEUR;
          }
          if (!dayGroups[exp.day]) dayGroups[exp.day] = [];
          dayGroups[exp.day].push(exp);
        }

        // Days with expenses for daily average
        var daysWithExpenses = Object.keys(dayGroups).length;
        var dailyAvg = daysWithExpenses > 0 ? totalEUR / daysWithExpenses : 0;
        var pct = Math.min(Math.round((totalEUR / BUDGET_TOTAL) * 100), 100);

        var html = '<h2 class="section-title">💰 Budget Tracker</h2>';

        // Summary card
        html += '<div class="card">';
        html += '<div class="card-title">Riepilogo</div>';
        html += '<p><strong>Speso:</strong> €' + formatEUR(totalEUR) + ' / €' + BUDGET_TOTAL + '</p>';
        html += '<p><strong>Media giornaliera:</strong> €' + formatEUR(dailyAvg) + '</p>';
        html += '<div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:' + pct + '%;background-color:' + (pct > 90 ? 'var(--color-danger)' : 'var(--color-secondary)') + '"></div></div>';
        html += '<div class="progress-text">' + pct + '%</div>';
        html += '</div>';

        // Add expense form
        html += '<div class="card">';
        html += '<div class="card-title">Aggiungi Spesa</div>';
        html += '<div class="form-group"><label class="form-label">Importo</label>';
        html += '<input class="form-input" type="number" id="exp-amount" placeholder="0" min="0" step="0.01"></div>';
        html += '<div class="form-group"><label class="form-label">Valuta</label>';
        html += '<select class="form-select" id="exp-currency">';
        html += '<option value="KGS">KGS (Som)</option><option value="EUR">EUR</option><option value="USD">USD</option><option value="UZS">UZS</option>';
        html += '</select></div>';
        html += '<div class="form-group"><label class="form-label">Categoria</label>';
        html += '<select class="form-select" id="exp-category">';
        for (var ci = 0; ci < BUDGET_CATEGORIES.length; ci++) {
          html += '<option value="' + BUDGET_CATEGORIES[ci] + '">' + BUDGET_CATEGORIES[ci] + '</option>';
        }
        html += '</select></div>';
        html += '<div class="form-group"><label class="form-label">Nota</label>';
        html += '<input class="form-input" type="text" id="exp-note" placeholder="Descrizione..."></div>';
        html += '<div class="form-group"><label class="form-label">Giorno</label>';
        html += '<select class="form-select" id="exp-day">';
        for (var d = 1; d <= 15; d++) {
          var dayData = ITINERARY[d - 1];
          var label = 'G' + d + (dayData ? ' — ' + dayData.title : '');
          html += '<option value="' + d + '">' + label + '</option>';
        }
        html += '</select></div>';
        html += '<button class="btn btn-primary" id="exp-add" type="button" style="width:100%;">Aggiungi</button>';
        html += '</div>';

        // Category breakdown
        if (totalEUR > 0) {
          html += '<div class="card"><div class="card-title">Per Categoria</div>';
          for (var bc = 0; bc < BUDGET_CATEGORIES.length; bc++) {
            var cat = BUDGET_CATEGORIES[bc];
            var catAmt = catTotals[cat];
            if (catAmt <= 0) continue;
            var catPct = Math.round((catAmt / totalEUR) * 100);
            html += '<div class="budget-bar">';
            html += '<div class="budget-bar-label"><span>' + cat + '</span><span>€' + formatEUR(catAmt) + '</span></div>';
            html += '<div class="budget-bar-track"><div class="budget-bar-fill" style="width:' + catPct + '%;background-color:' + (CATEGORY_COLORS[cat] || '#999') + '"></div></div>';
            html += '</div>';
          }
          html += '</div>';
        }

        // Expense list grouped by day
        var sortedDays = Object.keys(dayGroups).map(Number).sort(function (a, b) { return a - b; });
        if (sortedDays.length > 0) {
          html += '<div class="card"><div class="card-title">Spese per Giorno</div>';
          for (var di = 0; di < sortedDays.length; di++) {
            var dayNum = sortedDays[di];
            var dayExps = dayGroups[dayNum];
            html += '<h4 style="margin:10px 0 4px;font-size:0.9rem;">Giorno ' + dayNum + '</h4>';
            for (var ei = 0; ei < dayExps.length; ei++) {
              var ex = dayExps[ei];
              html += '<div class="expense-item">';
              html += '<div><span>' + (ex.note || ex.category) + '</span>';
              html += ' <span style="opacity:0.6;font-size:0.8rem;">' + ex.amount + ' ' + ex.currency + '</span></div>';
              html += '<div style="display:flex;align-items:center;gap:6px;">';
              html += '<span class="expense-amount">€' + formatEUR(ex.amountEUR) + '</span>';
              html += '<button class="expense-delete" data-expid="' + ex.id + '" type="button" title="Elimina">✕</button>';
              html += '</div></div>';
            }
          }
          html += '</div>';
        }

        wrapper.innerHTML = html;

        // Attach add handler
        var addBtn = wrapper.querySelector('#exp-add');
        if (addBtn) {
          addBtn.addEventListener('click', function () {
            var amountEl = wrapper.querySelector('#exp-amount');
            var currencyEl = wrapper.querySelector('#exp-currency');
            var categoryEl = wrapper.querySelector('#exp-category');
            var noteEl = wrapper.querySelector('#exp-note');
            var dayEl = wrapper.querySelector('#exp-day');

            var amount = parseFloat(amountEl.value);
            if (!amount || amount <= 0) {
              showToast('Inserisci un importo valido');
              return;
            }

            var currency = currencyEl.value;
            var amountEUR = toEUR(amount, currency);
            var newExp = {
              id: 'exp-' + Date.now(),
              amount: amount,
              currency: currency,
              amountEUR: amountEUR,
              category: categoryEl.value,
              note: noteEl.value,
              day: parseInt(dayEl.value, 10),
              createdAt: Date.now()
            };

            expenses.push(newExp);
            DB.put('expenses', newExp).then(function () {
              showToast('Spesa aggiunta ✓');
              render();
            });
          });
        }

        // Attach delete handlers
        var delBtns = wrapper.querySelectorAll('.expense-delete');
        for (var db2 = 0; db2 < delBtns.length; db2++) {
          delBtns[db2].addEventListener('click', function () {
            var expId = this.getAttribute('data-expid');
            // Remove from local array
            for (var r = expenses.length - 1; r >= 0; r--) {
              if (expenses[r].id === expId) {
                expenses.splice(r, 1);
                break;
              }
            }
            DB.delete('expenses', expId).then(function () {
              showToast('Spesa eliminata');
              render();
            });
          });
        }
      }

      render();
      resolve(wrapper);
    });
  });
}
