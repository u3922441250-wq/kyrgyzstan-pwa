/**
 * settle-up-calculator.js — Pure settle-up calculator
 * Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - settleUp(records): computes who owes whom how much in EUR.
 *
 * Pure function. No I/O, no DOM, no global state.
 *
 * The two travelers are fixed by design (Leo and Edu). Only records with a
 * non-empty `splitWith` array participate in the calculation. For each such
 * record the payer is credited with the full `amountEUR` and every person in
 * `splitWith` (including the payer if present) is debited the equal share
 * `amountEUR / splitWith.length`. The net balance for Leo is
 *   credit_Leo - debit_Leo
 * which by construction is the negative of the net balance for Edu.
 *
 * Output branches:
 *   - { kind: 'no-shared' }                                  — no shared expenses
 *   - { kind: 'even' }                                       — |net_Leo| < 0.01
 *   - { kind: 'paired', debtor, creditor, amountEUR }        — otherwise
 *
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
 */

const TRAVELERS = Object.freeze(['Leo', 'Edu']);

/**
 * @typedef {'Leo'|'Edu'} Person
 *
 * @typedef {Object} ExpenseRecord
 * @property {number} [amountEUR]                 EUR amount of the expense.
 * @property {Person} [paidBy]                    Who paid for it.
 * @property {ReadonlyArray<Person>} [splitWith]  Persons among whom it is split.
 *
 * @typedef {{ kind: 'no-shared' }} SettleNoShared
 * @typedef {{ kind: 'even' }} SettleEven
 * @typedef {{ kind: 'paired', debtor: Person, creditor: Person, amountEUR: number }} SettlePaired
 *
 * @typedef {SettleNoShared | SettleEven | SettlePaired} SettleResult
 */

/**
 * Round a number to two decimal places.
 * Uses the `(Math.round(x * 100) / 100)` idiom which matches the user-facing
 * `€ XX.XX` rendering and the 0.01 even-balance threshold.
 *
 * @param {number} n
 * @returns {number}
 */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Compute the settle-up result for a list of expense records.
 *
 * Pure: returns a plain object. Does not mutate `records`.
 *
 * Filtering: a record is included iff `splitWith` is a non-empty array.
 * Records lacking `paidBy` or `amountEUR` are tolerated defensively
 * (treated as `paidBy = undefined` → no credit; `amountEUR = 0` → no debit).
 *
 * @param {ReadonlyArray<ExpenseRecord>} records
 * @returns {SettleResult}
 */
export function settleUp(records) {
  const list = Array.isArray(records) ? records : [];

  // Step 1 — keep only records actually shared between people.
  const shared = list.filter(
    (r) => r && Array.isArray(r.splitWith) && r.splitWith.length > 0,
  );

  // Step 2 — no shared expenses at all.
  if (shared.length === 0) {
    return { kind: 'no-shared' };
  }

  // Step 3 — accumulate per-person net balance.
  // Net_P = credit_P - debit_P, where credit happens to paidBy and debit
  // happens to every person in splitWith (including paidBy when listed).
  /** @type {Record<Person, number>} */
  const net = { Leo: 0, Edu: 0 };

  for (const r of shared) {
    const amount = typeof r.amountEUR === 'number' && Number.isFinite(r.amountEUR)
      ? r.amountEUR
      : 0;
    const splitWith = r.splitWith;
    const share = amount / splitWith.length;

    if (r.paidBy === 'Leo' || r.paidBy === 'Edu') {
      net[r.paidBy] += amount;
    }

    for (const person of splitWith) {
      if (person === 'Leo' || person === 'Edu') {
        net[person] -= share;
      }
    }
  }

  // Step 4 — decide between even and paired.
  // By construction net.Leo + net.Edu === 0 modulo float noise.
  const netLeo = net.Leo;

  if (Math.abs(netLeo) < 0.01) {
    return { kind: 'even' };
  }

  // Step 5 — pair the debtor with the creditor.
  // Person with positive net is the creditor (paid more than their share);
  // person with negative net is the debtor (owes the difference).
  const creditor = netLeo > 0 ? 'Leo' : 'Edu';
  const debtor = creditor === 'Leo' ? 'Edu' : 'Leo';

  return {
    kind: 'paired',
    debtor,
    creditor,
    amountEUR: round2(Math.abs(netLeo)),
  };
}

// Expose the fixed travelers list for callers that want it.
export { TRAVELERS };
