/**
 * currency-converter.js — Pure currency conversion and amount formatting
 * Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - toEUR(amount, currency, rates): convert any supported currency to EUR.
 *   - fromEUR(amountEUR, currency, rates): convert EUR to any supported currency.
 *   - formatAmount(amount, currency): format a numeric amount for display
 *       following the existing project convention (two decimals below 100,
 *       integer at or above 100).
 *
 * No I/O. No side effects. No global state. Safe to import from any module
 * and to property-test in isolation.
 *
 * Rate convention: every value in `rates` is "units of CCY per 1 EUR".
 *   Example: { EUR: 1, USD: 1.08, KGS: 97, UZS: 13500 } means
 *     1 EUR = 1.08 USD = 97 KGS = 13500 UZS.
 *   So toEUR(amount, ccy, rates) = amount / rates[ccy], and
 *      fromEUR(amountEUR, ccy, rates) = amountEUR * rates[ccy].
 *
 * Requirements: 6.4, 7.1, 7.2
 */

/**
 * @typedef {'EUR'|'USD'|'KGS'|'UZS'} SupportedCurrency
 * @typedef {Record<string, number>} RatesMap
 */

/**
 * Validate that a rate value is usable for conversion.
 * Throws a typed Error on any non-finite, zero, or negative value.
 *
 * @param {string} currency - The currency code being looked up.
 * @param {unknown} rate - The candidate rate value.
 * @returns {number} The validated rate (always > 0 and finite).
 * @throws {Error} When the rate is missing, non-numeric, non-finite, or <= 0.
 */
function assertValidRate(currency, rate) {
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
    const err = new Error(
      `Invalid rate for currency "${currency}": expected a finite number > 0, got ${String(rate)}.`
    );
    err.code = 'INVALID_RATE';
    err.currency = currency;
    throw err;
  }
  return rate;
}

/**
 * Validate that an amount is a finite number. Both positive and negative
 * (and zero) finite values are accepted — the converter does not impose
 * a sign or bound on the amount itself; that is the caller's responsibility
 * (e.g. Expense_Tracker validation).
 *
 * @param {unknown} amount
 * @returns {number}
 * @throws {Error} When the amount is not a finite number.
 */
function assertFiniteAmount(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    const err = new Error(
      `Invalid amount: expected a finite number, got ${String(amount)}.`
    );
    err.code = 'INVALID_AMOUNT';
    throw err;
  }
  return amount;
}

/**
 * Convert an amount in `currency` to EUR using the supplied rates map.
 *
 * Semantics:
 *   - rates[currency] is "units of CCY per 1 EUR", so dividing converts
 *     a CCY amount back to EUR.
 *   - EUR maps identically (rates.EUR === 1 by convention).
 *   - Throws on missing / zero / negative / non-finite rates[currency].
 *
 * @param {number} amount - Amount expressed in `currency`.
 * @param {string} currency - Source currency code.
 * @param {RatesMap} rates - Active rates map.
 * @returns {number} The amount converted to EUR.
 * @throws {Error} INVALID_AMOUNT or INVALID_RATE on bad inputs.
 */
export function toEUR(amount, currency, rates) {
  assertFiniteAmount(amount);
  if (rates === null || typeof rates !== 'object') {
    const err = new Error('Invalid rates map: expected a non-null object.');
    err.code = 'INVALID_RATES';
    throw err;
  }
  const rate = assertValidRate(currency, rates[currency]);
  return amount / rate;
}

/**
 * Convert an amount in EUR to `currency` using the supplied rates map.
 *
 * Inverse of {@link toEUR}: amountEUR * rates[currency].
 * EUR maps identically. Throws on bad rate.
 *
 * @param {number} amountEUR - Amount expressed in EUR.
 * @param {string} currency - Target currency code.
 * @param {RatesMap} rates - Active rates map.
 * @returns {number} The amount converted to `currency`.
 * @throws {Error} INVALID_AMOUNT or INVALID_RATE on bad inputs.
 */
export function fromEUR(amountEUR, currency, rates) {
  assertFiniteAmount(amountEUR);
  if (rates === null || typeof rates !== 'object') {
    const err = new Error('Invalid rates map: expected a non-null object.');
    err.code = 'INVALID_RATES';
    throw err;
  }
  const rate = assertValidRate(currency, rates[currency]);
  return amountEUR * rate;
}

/**
 * Format an amount for display, matching the existing project convention
 * defined in `js/sections/budget.js`:
 *
 *   amount < 100  -> two decimal places (e.g. "12.34", "0.00", "99.99")
 *   amount >= 100 -> rounded to nearest integer, no decimals (e.g. "100", "13500")
 *
 * The `currency` parameter is accepted to keep the public API uniform with
 * the design's typed signature, but the existing convention is currency-
 * agnostic and `currency` is not used by the formatter today. Negative
 * amounts are formatted using the absolute value's bucket; the sign is
 * preserved.
 *
 * @param {number} amount - The numeric amount to format.
 * @param {string} [currency] - Optional currency code (currently unused).
 * @returns {string} The formatted amount string.
 */
export function formatAmount(amount, currency) {
  // Defensive: non-finite inputs format to '0.00' rather than 'NaN' to keep
  // the UI free of unexpected text. Callers that care about validity should
  // validate before reaching the formatter.
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return '0.00';
  }
  // Use absolute value for the < 100 / >= 100 bucket decision, then re-apply
  // the sign. This preserves the original convention for non-negative inputs
  // (the only inputs the existing call sites produce) while behaving sensibly
  // on negatives.
  const abs = Math.abs(amount);
  return abs < 100 ? amount.toFixed(2) : Math.round(amount).toString();
}
