/**
 * rate-config.js — Rate Fetcher configuration and response validator
 * Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - DEFAULT_RATE_CONFIG: API endpoint, timeout, supported currencies, fallback rates.
 *   - validateApiResponse(json): pure validator for the open.er-api.com response shape.
 *
 * No I/O. No side effects. Safe to import from any module.
 *
 * Requirements: 8.1, 8.5, 9.2, 9.3
 */

/**
 * @typedef {'EUR'|'USD'|'KGS'|'UZS'} SupportedCurrency
 */

/**
 * Default configuration for the Rate_Fetcher.
 *
 * Provider: https://open.er-api.com/v6/latest/EUR
 *   - Free, no API key, CORS-enabled.
 *   - Returns rates for EUR, USD, KGS, UZS in a single response.
 *   - Stable JSON shape: { result, base_code, rates, time_last_update_unix }.
 *
 * fallbackRates is the hard-coded set used on first launch with no cache and
 * no network (Requirement 9.2). EUR is always 1 by definition.
 *
 * @type {Readonly<{
 *   url: string,
 *   timeoutMs: number,
 *   supportedCurrencies: ReadonlyArray<SupportedCurrency>,
 *   fallbackRates: Readonly<Record<SupportedCurrency, number>>
 * }>}
 */
export const DEFAULT_RATE_CONFIG = Object.freeze({
  url: 'https://open.er-api.com/v6/latest/EUR',
  timeoutMs: 10_000,
  supportedCurrencies: Object.freeze(['EUR', 'USD', 'KGS', 'UZS']),
  fallbackRates: Object.freeze({
    EUR: 1,
    KGS: 97,
    USD: 1.08,
    UZS: 13500,
  }),
});

/**
 * Validate a parsed JSON payload from the exchange-rate API.
 *
 * Accepts iff:
 *   - json is a non-null object,
 *   - json.result === 'success',
 *   - json.rates is a non-null object,
 *   - for every currency in DEFAULT_RATE_CONFIG.supportedCurrencies,
 *     json.rates[currency] is a finite number > 0.
 *
 * Pure: no I/O, no exceptions thrown on invalid input — returns false instead.
 *
 * @param {unknown} json - Parsed JSON value to validate.
 * @returns {boolean} true iff the payload is a valid success response.
 */
export function validateApiResponse(json) {
  if (json === null || typeof json !== 'object') {
    return false;
  }

  const payload = /** @type {Record<string, unknown>} */ (json);

  if (payload.result !== 'success') {
    return false;
  }

  const rates = payload.rates;
  if (rates === null || typeof rates !== 'object') {
    return false;
  }

  const ratesObj = /** @type {Record<string, unknown>} */ (rates);

  for (const currency of DEFAULT_RATE_CONFIG.supportedCurrencies) {
    const value = ratesObj[currency];
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      return false;
    }
  }

  return true;
}
