/**
 * formatters.js — Italian date/time formatters
 * Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - formatDate(t):        ms-epoch -> 'DD/MM/YYYY'   (local timezone)
 *   - formatTime(t):        ms-epoch -> 'HH:mm'        (local timezone, 24-hour)
 *   - formatFetchedAt(t):   ms-epoch -> 'Aggiornato il DD/MM/YYYY HH:mm'
 *
 * All formatters operate on ms-since-epoch input and render in the local
 * timezone. Manual zero-padding is used (rather than toLocaleString) to
 * guarantee a deterministic 'DD/MM/YYYY HH:mm' shape across runtimes and
 * locales — required by the Italian-localization contract.
 *
 * No I/O. No side effects. Safe to import from any module.
 *
 * Requirements: 8.4, 14.5
 */

/**
 * Pad a non-negative integer to a fixed number of digits with leading zeros.
 * @param {number} n - Non-negative integer.
 * @param {number} width - Target string width.
 * @returns {string}
 */
function pad(n, width) {
  const s = String(n);
  return s.length >= width ? s : '0'.repeat(width - s.length) + s;
}

/**
 * Coerce input to a `Date` in the local timezone.
 *
 * Throws if the input is not a finite number, since formatters MUST NOT emit
 * sentinel strings like 'Invalid Date'. Callers are expected to guard against
 * missing timestamps before calling.
 *
 * @param {number} t - Milliseconds since the Unix epoch.
 * @returns {Date}
 */
function asLocalDate(t) {
  if (typeof t !== 'number' || !Number.isFinite(t)) {
    throw new TypeError('formatters: timestamp must be a finite number (ms-epoch)');
  }
  return new Date(t);
}

/**
 * Format a ms-epoch timestamp as 'DD/MM/YYYY' in the local timezone.
 *
 * @param {number} t - Milliseconds since the Unix epoch.
 * @returns {string} e.g. '29/05/2026'
 */
export function formatDate(t) {
  const d = asLocalDate(t);
  const dd = pad(d.getDate(), 2);
  const mm = pad(d.getMonth() + 1, 2);
  const yyyy = pad(d.getFullYear(), 4);
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Format a ms-epoch timestamp as 'HH:mm' (24-hour) in the local timezone.
 *
 * @param {number} t - Milliseconds since the Unix epoch.
 * @returns {string} e.g. '09:05'
 */
export function formatTime(t) {
  const d = asLocalDate(t);
  const hh = pad(d.getHours(), 2);
  const mm = pad(d.getMinutes(), 2);
  return `${hh}:${mm}`;
}

/**
 * Format a ms-epoch timestamp as the Italian "fetched-at" label.
 *
 * Used next to the `🔄 Aggiorna tassi` button to display when the active
 * Rate_Cache_Record was last refreshed (Requirement 8.4).
 *
 * @param {number} t - Milliseconds since the Unix epoch.
 * @returns {string} e.g. 'Aggiornato il 29/05/2026 09:05'
 */
export function formatFetchedAt(t) {
  return `Aggiornato il ${formatDate(t)} ${formatTime(t)}`;
}
