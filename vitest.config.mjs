import { defineConfig } from 'vitest/config';

// Vitest configuration for the Kyrgyzstan Travel PWA test suite.
//
// - environment: 'jsdom' so DOM- and IndexedDB-touching modules can run under Node.
// - setupFiles: 'fake-indexeddb/auto' installs an in-memory IndexedDB shim
//     into the jsdom global before any test runs.
// - The .mjs extension is used so the config is ESM-loaded regardless of the
//     project's CommonJS-by-default package.json (build-www.js is CJS).
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['fake-indexeddb/auto'],
    include: ['tests/**/*.test.js', 'js/**/*.test.js'],
    globals: false,
    testTimeout: 60000,
    hookTimeout: 60000,
    // Allow `npm test` to exit cleanly while the suite is being bootstrapped
    // (tasks 1.1 sets up infra; tests are added incrementally from task 1.2 onward).
    passWithNoTests: true,
  },
});
