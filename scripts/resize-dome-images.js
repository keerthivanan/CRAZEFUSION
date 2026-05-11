/**
 * Resize 150 newposters images → frontend/public/dome-images/
 * Output: 300×420 WebP at quality 80 (~30KB each)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC  = path.join(__dirname, '..', 'newposters');
const DEST = path.join(__dirname, '..', 'frontend', 'public', 'dome-images');

// How many to pick from each folder
const PLAN = {
  cars:         25,
  anime:        21,
  movies:       20,
  music:        18,
  astronomy:    15,
  nature:       15,
  'real-artists': 14,
  gaming:       10,
  wanderlust:   10,
  f1:            8,
  aesthetic:    21,
  football:     23,
  tvshows:      20,
  kpop:          8,
  motivation:    8,
};

fs.mkdirSync(DEST, { recursive: true });

async function processFolder(folder, limit) {
  const srcDir = path.join(SRC, folder);
  if (!fs.existsSync(srcDir)) { console.log(`  skip ${folder} (not found)`); return []; }

  const files = fs.readdirSync(srcDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .slice(0, limit);

  const outDir = path.join(DEST, folder);
  fs.mkdirSync(outDir, { recursive: true });

  const urls = [];
  let done = 0;
  for (const file of files) {
    const outName = path.parse(file).name + '.webp';
    const outPath = path.join(outDir, outName);
    try {
      await sharp(path.join(srcDir, file))
        .resize(300, 420, { fit: 'cover', position: 'center' })
        .webp({ quality: 82 })
        .toFile(outPath);
      urls.push(`/dome-images/${folder}/${outName}`);
      done++;
      process.stdout.write(`\r  ${folder}: ${done}/${files.length}`);
    } catch(e) {
      console.warn(`\n  warn: skip ${file} — ${e.message}`);
    }
  }
  console.log(`\r  ${folder}: ${done} images done          `);
  return urls;
}

(async () => {
  console.log('Resizing newposters → public/dome-images ...\n');
  const allUrls = [];
  for (const [folder, limit] of Object.entries(PLAN)) {
    const urls = await processFolder(folder, limit);
    allUrls.push(...urls);
  }

  // Write manifest
  const manifest = path.join(DEST, 'manifest.json');
  fs.writeFileSync(manifest, JSON.stringify(allUrls, null, 2));
  console.log(`\nDone! ${allUrls.length} images saved to public/dome-images/`);
  console.log(`Manifest: ${manifest}`);
})();
