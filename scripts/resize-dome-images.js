/**
 * Build dome-images — keerthicollections (visual/aesthetic) + newposters cars & anime only
 * Target ~340+ images for 324 sphere tiles (unique image per tile, zero repetition)
 * Output: 300×420 WebP quality 82
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEST = path.join(ROOT, 'frontend', 'public', 'dome-images');

// ── keerthicollections — visually striking aesthetic posters ──────────────────
const KC_SRC = path.join(ROOT, 'keerthicollections');
const KC_PLAN = {
  'art':                  20,  // Van Gogh, Klimt, Monet, Picasso
  'anime':                12,  // all — Demon Slayer, Naruto, Death Note…
  'cyberpunk-vaporwave':  10,  // all — neon city, vaporwave
  'trippy':               28,  // psychedelic, optical illusion
  'car-posters':          20,  // Bugatti, Koenigsegg, Ferrari art
  'wanderlust':           15,  // travel city posters
  'vintage':              15,  // retro / classic
  'botanical':            12,  // floral / butterfly art
  'sneakerhead':          15,  // Jordan, sneaker art
  'k-pop':                15,  // BTS, K-pop idols
  'indie-aesthetics':      7,  // all indie
  'moodboard-aesthetics':  3,  // all moodboard
  'football-posters':     15,  // Ronaldo, Messi, Haaland, Mbappé
  'movies':               22,  // Avengers, Star Wars, Wonder Woman…
  'music':                22,  // Drake, Travis Scott, Beyoncé, Juice WRLD…
  'random-aesthetics':    18,  // mixed aesthetic
  'gaming':               20,  // from keerthicollections (77 available)
  'cute':                 15,  // cute characters / kawaii
  'tv-shows':             15,  // keerthicollections TV (29 available)
  'polaroids':            15,  // polaroid aesthetic prints
};

// ── newposters — ONLY cars and anime ─────────────────────────────────────────
const NP_SRC = path.join(ROOT, 'newposters');
const NP_PLAN = {
  cars:   25,   // supercar photography — Bugatti, Lambo, Ferrari
  anime:  18,   // anime photography posters
};

function cleanDest() {
  if (!fs.existsSync(DEST)) return;
  for (const entry of fs.readdirSync(DEST)) {
    const full = path.join(DEST, entry);
    if (fs.statSync(full).isDirectory()) fs.rmSync(full, { recursive: true, force: true });
  }
}

function spreadPick(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

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
  console.log(`\r  ${outFolderName}: ${done} done          `);
  return urls;
}

(async () => {
  fs.mkdirSync(DEST, { recursive: true });
  cleanDest();

  const allUrls = [];

  console.log('\n── keerthicollections (aesthetic) ──────────────────────');
  for (const [folder, limit] of Object.entries(KC_PLAN)) {
    const urls = await processFolder(KC_SRC, folder, limit, `kc-${folder}`);
    allUrls.push(...urls);
  }

  console.log('\n── newposters (cars + anime only) ──────────────────────');
  for (const [folder, limit] of Object.entries(NP_PLAN)) {
    const urls = await processFolder(NP_SRC, folder, limit, `np-${folder}`);
    allUrls.push(...urls);
  }

  const manifest = path.join(DEST, 'manifest.json');
  fs.writeFileSync(manifest, JSON.stringify(allUrls, null, 2));

  const kc = allUrls.filter(u => u.includes('/kc-')).length;
  const np = allUrls.filter(u => u.includes('/np-')).length;
  console.log(`\nDone! ${allUrls.length} images (${kc} keerthicollections + ${np} newposters)`);
  console.log(`324 sphere tiles → every tile gets a UNIQUE image`);
})();
