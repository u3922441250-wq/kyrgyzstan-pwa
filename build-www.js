/**
 * build-www.js — Copy web assets to www/ for Capacitor
 * Copies index.html, css/, js/, icons/, manifest.json
 */
const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const DEST = path.join(__dirname, 'www');

// Files and folders to copy
const ITEMS = [
  'index.html',
  'manifest.json',
  'sw.js',
  'css',
  'js',
  'icons'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}mos

// Clean www/
if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true, force: true });
}
fs.mkdirSync(DEST, { recursive: true });

for (const item of ITEMS) {
  const src = path.join(SRC, item);
  const dest = path.join(DEST, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
    console.log(`  ✓ ${item}`);
  } else {
    console.warn(`  ⚠ ${item} not found, skipping`);
  }
}

console.log('\n✅ www/ ready for Capacitor');
firebase login
