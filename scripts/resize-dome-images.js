/**
 * Build dome-images from BOTH keerthicollections AND newposters — 50/50 split
 * ~165 from each source = ~330 total for 324 sphere tiles
 * Output: 300×420 WebP at quality 82
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEST = path.join(ROOT, 'frontend', 'public', 'dome-images');

// ── keerthicollections: visually striking aesthetic posters ──────────────────
const KC_SRC = path.join(ROOT, 'keerthicollections');
const KC_PLAN = {
  'art':                  15,  // actual art prints
  'anime':                12,  // all anime
  'cyberpunk-vaporwave':  10,  // all neon/cyber
  'trippy':               15,  // psychedelic
  'astronomy':            10,  // space
  'car-posters':          12,  // car art
  'wanderlust':           10,  // travel
  'vintage':              10,  // retro
  'botanical':            10,  // botanical art
  'sneakerhead':          10,  // streetwear
  'zodiac':               12,  // all zodiac
  'k-pop':                10,  // k-pop
  'indie-aesthetics':      7,  // all indie
  'moodboard-aesthetics':  3,  // all moodboard
  'football-posters':     10,  // football art
  'movies':               10,  // movie art
  'music':                10,  // album/music art
  'random-aesthetics':     8,  // random aesthetic
};

// ── newposters: the poster photography — most visual categories only ─────────
const NP_SRC = path.join(ROOT, 'newposters');
const NP_PLAN = {
  cars:          25,  // supercar photography
  anime:         18,  // anime posters
  movies:        18,  // movie posters
  music:         15,  // music posters
  astronomy:     15,  // space photography
  nature:        15,  // nature photography
  'real-artists': 14, // Billie Eilish / Taylor Swift
  gaming:        10,  // gaming art
  wanderlust:    10,  // travel photography
  f1:             8,  // F1 racing
};

// Clean out old dome-images subfolders
function cleanDest() {
  if (!fs.existsSync(DEST)) return;
  for (const entry of fs.readdirSync(DEST)) {
    const full = path.join(DEST, entry);
    if (fs.statSync(full).isDirectory()) fs.rmSync(full, { recursive: true, force: true });
  }
}

// Spread picks evenly across the folder so we don't just grab the first N
function spreadPick(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

// Safe filename: lowercase, underscores, max 60 chars
function safeName(file) {
  return path.parse(file).name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) + '.webp';
}

async function processFolder(srcBase, folder, limit, outFolderName) {
  const srcDir = path.join(srcBase, folder);
  if (!fs.existsSync(srcDir)) { console.log(`  skip ${folder} (not found)`); return []; }

  const all = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
  const files = spreadPick(all, limit);

  const outDir = path.join(DEST, outFolderName);
  fs.mkdirSync(outDir, { recursive: true });

  const urls = [];
  let done = 0;
  for (const file of files) {
    const name = safeName(file);
    const outPath = path.join(outDir, name);
    try {
      await sharp(path.join(srcDir, file))
        .resize(300, 420, { fit: 'cover', position: 'center' })
        .webp({ quality: 82 })
        .toFile(outPath);
      urls.push(`/dome-images/${outFolderName}/${name}`);
      done++;
      process.stdout.write(`\r  ${outFolderName}: ${done}/${files.length}`);
    } catch(e) {
      console.warn(`\n  warn: skip ${file} — ${e.message}`);
    }
  }
  console.log(`\r  ${outFolderName}: ${done} images done          `);
  return urls;
}

(async () => {
  fs.mkdirSync(DEST, { recursive: true });
  cleanDest();

  const allUrls = [];

  console.log('\n── keerthicollections ─────────────────────────────────');
  for (const [folder, limit] of Object.entries(KC_PLAN)) {
    const outName = `kc-${folder}`;
    const urls = await processFolder(KC_SRC, folder, limit, outName);
    allUrls.push(...urls);
  }

  console.log('\n── newposters ──────────────────────────────────────────');
  for (const [folder, limit] of Object.entries(NP_PLAN)) {
    const outName = `np-${folder}`;
    const urls = await processFolder(NP_SRC, folder, limit, outName);
    allUrls.push(...urls);
  }

  const manifest = path.join(DEST, 'manifest.json');
  fs.writeFileSync(manifest, JSON.stringify(allUrls, null, 2));

  const kc = allUrls.filter(u => u.includes('/kc-')).length;
  const np = allUrls.filter(u => u.includes('/np-')).length;
  console.log(`\nDone! ${allUrls.length} total images (${kc} keerthicollections + ${np} newposters)`);
})();
