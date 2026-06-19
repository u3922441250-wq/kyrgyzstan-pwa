/**
 * trip-day-mapper.js — Pure date <-> trip-day mapping for Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - TRIP_START, TRIP_END        — ISO 'YYYY-MM-DD' strings, local time
 *   - TRIP_LENGTH_DAYS            — Total inclusive trip length, computed from constants
 *   - calendarDateForTripDay(n)   — 1..TRIP_LENGTH_DAYS -> 'YYYY-MM-DD'
 *   - tripDayForCalendarDate(iso) — 'YYYY-MM-DD' -> 1..TRIP_LENGTH_DAYS | null
 *   - defaultDisplayedTripDay(now)— Date -> 1..TRIP_LENGTH_DAYS, clamped to 1 outside range
 *   - clampTripDay(n)             — any -> 1..TRIP_LENGTH_DAYS
 *   - toLocalISODate(t)           — Date|number -> 'YYYY-MM-DD' (local) | null
 *
 * Pure: no I/O, no side effects, no DOM, no IndexedDB. Safe to import anywhere
 * and prime target for property-based testing.
 *
 * Design note:
 *   The trip-bound constants here are sourced from the existing
 *   `js/sections/home.js` values (TRIP_START = 2026-05-29, TRIP_END = 2026-06-14),
 *   which are also the values used throughout requirements.md. The `ITINERARY`
 *   array in `data.js` has 14 entries (May 30 – June 12) and is consumed by other
 *   modules for per-day content; this module only handles the calendar-axis
 *   mapping and bounds for navigation (Requirements 1.2, 1.3, 1.4).
 *
 * Requirements: 1.2, 1.3, 1.4, 5.4, 5.6
 */

/**
 * Inclusive trip start date, ISO 'YYYY-MM-DD' in local time.
 * @type {string}
 */
export const TRIP_START = '2026-05-29';

/**
 * Inclusive trip end date, ISO 'YYYY-MM-DD' in local time.
 * @type {string}
 */
export const TRIP_END = '2026-06-14';

/**
 * Strict ISO 'YYYY-MM-DD' regex used by every input validator below.
 * Matches the shape only — calendar validity is checked separately by
 * round-tripping through `Date`.
 *
 * Declared before `TRIP_LENGTH_DAYS` because the latter calls
 * `computeTripLengthDays` -> `parseLocalISODate` at module load, and
 * `const` declarations are in the temporal dead zone until their line
 * executes.
 */
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const MS_PER_DAY = 86_400_000;

/**
 * Parse an ISO 'YYYY-MM-DD' string into a local-midnight `Date`.
 *
 * Important: `new Date('YYYY-MM-DD')` parses as **UTC** midnight in modern
 * engines, which can shift the local calendar date by one in negative-UTC
 * timezones. We therefore parse the components manually and construct a
 * local-time `Date` so all arithmetic in this module stays calendar-correct
 * regardless of the host timezone.
 *
 * Returns an Invalid Date when the input does not match the ISO shape OR
 * does not round-trip (e.g. '2026-02-30' which JS would silently rebase
 * to 2026-03-02).
 *
 * @param {string} iso
 * @returns {Date} local-midnight Date, or Invalid Date on bad input
 */
function parseLocalISODate(iso) {
  if (typeof iso !== 'string') {
    return new Date(NaN);
  }
  const match = ISO_DATE_RE.exec(iso);
  if (!match) {
    return new Date(NaN);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const d = new Date(year, month - 1, day);
  // Reject silent rebases like Feb 30 -> Mar 2.
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    return new Date(NaN);
  }
  return d;
}

/**
 * Inclusive day count between two ISO dates in calendar terms (no DST drift).
 *
 * Internally compares UTC-midnight epochs of the local Y/M/D triples, which
 * is immune to daylight-saving transitions because both endpoints use the
 * same offset (UTC) for the difference calculation while the calendar
 * components themselves come from local time.
 *
 * @param {string} startIso
 * @param {string} endIso
 * @returns {number} Inclusive number of days from startIso to endIso, or
 *                   `1` as a defensive fallback when either input is invalid.
 */
function computeTripLengthDays(startIso, endIso) {
  const start = parseLocalISODate(startIso);
  const end = parseLocalISODate(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 1;
  }
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  const diff = Math.round((endUtc - startUtc) / MS_PER_DAY);
  return diff < 0 ? 1 : diff + 1;
}

/**
 * Total inclusive trip length, computed from TRIP_START and TRIP_END
 * so the constant cannot drift from the bounds. With the current values
 * this resolves to 17 (29 May .. 14 Jun inclusive).
 * @type {number}
 */
export const TRIP_LENGTH_DAYS = computeTripLengthDays(TRIP_START, TRIP_END);

/**
 * Convert a `Date` (or a ms-epoch number) to its local 'YYYY-MM-DD' form.
 *
 * Returns `null` for non-finite inputs and Invalid Dates so callers can
 * distinguish "no date" from a real value without try/catch.
 *
 * Used here for `defaultDisplayedTripDay` and re-exported because every
 * other new module in this feature needs the same local-date projection
 * (Expense_Tracker date pre-fill, Rate_Fetcher 'fetchedAt' formatting,
 * effective-date back-fill on legacy records, etc.).
 *
 * @param {Date|number} t
 * @returns {string|null} 'YYYY-MM-DD' in local time, or null on bad input
 */
export function toLocalISODate(t) {
  /** @type {Date} */
  let d;
  if (t instanceof Date) {
    d = t;
  } else if (typeof t === 'number' && Number.isFinite(t)) {
    d = new Date(t);
  } else {
    return null;
  }
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Clamp any input to a valid trip-day integer in [1, TRIP_LENGTH_DAYS].
 *
 * Non-finite, non-numeric, and NaN inputs all collapse to `1` rather than
 * throwing — this keeps the navigation UI defensive against bad query
 * parameters or stale state without spreading try/catch through callers.
 *
 * @param {unknown} n
 * @returns {number} integer in [1, TRIP_LENGTH_DAYS]
 */
export function clampTripDay(n) {
  if (typeof n !== 'number' || !Number.isFinite(n)) {
    return 1;
  }
  const i = Math.trunc(n);
  if (i < 1) return 1;
  if (i > TRIP_LENGTH_DAYS) return TRIP_LENGTH_DAYS;
  return i;
}

/**
 * Map a trip-day index (1..TRIP_LENGTH_DAYS) to its calendar date.
 *
 * Out-of-range or non-numeric inputs are clamped via `clampTripDay` so the
 * function is total: every input produces a valid 'YYYY-MM-DD' string.
 *
 * @param {number} tripDay 1-based trip-day index
 * @returns {string} ISO 'YYYY-MM-DD' in local time
 */
export function calendarDateForTripDay(tripDay) {
  const day = clampTripDay(tripDay);
  const start = parseLocalISODate(TRIP_START);
  // Construct a fresh local Date by adding (day-1) calendar days to TRIP_START.
  // Using the Date constructor with day-of-month arithmetic correctly handles
  // month rollover (e.g. May 31 + 1 day -> Jun 1).
  const result = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + (day - 1)
  );
  // Guaranteed valid because TRIP_START is validated at module load.
  return /** @type {string} */ (toLocalISODate(result));
}

/**
 * Map a calendar date to its trip-day index, or `null` if outside the trip.
 *
 * Strict input validation:
 *   - Non-strings, mis-shaped strings, and structurally invalid dates
 *     (e.g. '2026-02-30') all return `null` rather than throwing.
 *   - Dates before TRIP_START or after TRIP_END return `null`.
 *
 * @param {string} isoDate 'YYYY-MM-DD' in local time
 * @returns {number|null} 1..TRIP_LENGTH_DAYS, or null when out of range
 */
export function tripDayForCalendarDate(isoDate) {
  const d = parseLocalISODate(isoDate);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  const start = parseLocalISODate(TRIP_START);
  const end = parseLocalISODate(TRIP_END);
  if (d < start || d > end) {
    return null;
  }
  // Use UTC-midnight epochs to avoid DST drift in the day-count.
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const dUtc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((dUtc - startUtc) / MS_PER_DAY);
  return diff + 1;
}

/**
 * Return the trip day to display by default for a given "now":
 *   - Inside the trip range  -> the matching trip day (Requirement 1.2).
 *   - Before TRIP_START or after TRIP_END -> 1 (Requirement 1.3).
 *
 * `now` defaults to the current time. Non-Date / non-finite inputs collapse
 * to `1` so callers (e.g. Itinerary_Panel mount) never need to guard.
 *
 * @param {Date|number} [now=new Date()]
 * @returns {number} integer in [1, TRIP_LENGTH_DAYS]
 */
export function defaultDisplayedTripDay(now = new Date()) {
  const iso = toLocalISODate(now);
  if (iso === null) {
    return 1;
  }
  const tripDay = tripDayForCalendarDate(iso);
  return tripDay === null ? 1 : tripDay;
}
