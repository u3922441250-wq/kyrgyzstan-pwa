/**
 * rate-fetcher.js — Rate Fetcher with cache I/O, refresh, manual override,
 * and staleness detection
 * Kyrgyzstan Travel PWA
 *
 * Exports:
 *   - createRateFetcher(db, config = DEFAULT_RATE_CONFIG): factory returning
 *     the stateful Rate_Fetcher API consumed by Expense_Tracker and the Spese
 *     section UI.
 *
 * Responsibilities (Requirements 8.1–8.4, 9.1–9.4, 10.1–10.4, 13.4):
 *   - Resolve the currently active rates honouring per-currency manual
 *     overrides, the cached fetched rates, and a hard-coded fallback set.
 *   - Issue at most one HTTPS request when the user presses 🔄 Aggiorna tassi
 *     (or once at app bootstrap, gated by One_Time_Sync — wired in task 12.1).
 *   - Persist a Rate_Cache_Record on success; leave the cache untouched on any
 *     failure mode and surface an Italian toast.
 *   - Manage per-currency manual overrides with a positive-value validator and
 *     idempotent clears.
 *   - Compute staleness against a 7-day threshold.
 *   - Notify subscribers on every state change so Expense_Tracker can recompute.
 *
 * Network discipline:
 *   - When navigator.onLine === false, refresh() is a no-op except for the
 *     `Offline` toast — zero HTTP requests are issued.
 *   - getActiveRates(), getCacheRecord(), setManualOverride(),
 *     clearManualOverride(), and isStale() never touch the network.
 *
 * Toast surface:
 *   - Calls window.showToast(message) when available (installed by app.js).
 *     Tests can stub it; Node-only environments without a window simply skip.
 *
 * No global state. The factory creates a fresh instance per call so tests can
 * isolate behaviour.
 */

import { DEFAULT_RATE_CONFIG, validateApiResponse } from './rate-config.js';

/** Object-store name in IndexedDB. */
const RATES_STORE = 'rates';

/** Single keyPath value used for the cache record. */
const RATES_KEY = 'rates';

/** Seven-day staleness threshold in milliseconds (Requirement 9.4). */
const SEVEN_DAYS_MS = 7 * 24 * 3600 * 1000;

