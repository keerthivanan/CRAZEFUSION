const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { parse } = require('csv-parse/sync');

const CSV_PATH = path.join(__dirname, 'crazefusion_posters.csv');
const OUTPUT_DIR = path.join(__dirname, 'frontend', 'public', 'posters');

async function downloadImage(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    maxRedirects: 10,
    timeout: 30000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  return Buffer.from(response.data);
}

function safeName(name) {
  return name.replace(/\.(jpg|jpeg|png)$/i, '').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  const seen = new Set();
  let ok = 0, fail = 0;

  console.log(`Downloading ${records.length} posters at FULL original quality...\n`);

  for (let i = 0; i < records.length; i++) {
    const name = records[i]['Name'];
    const url = records[i]['Image URL'];
    const safe = safeName(name);

    if (seen.has(safe)) continue;
    seen.add(safe);

    const outputPath = path.join(OUTPUT_DIR, `poster_${safe}.jpg`);
    if (fs.existsSync(outputPath)) { ok++; continue; }

    process.stdout.write(`[${i+1}/${records.length}] ${name} ... `);
    try {
      const buf = await downloadImage(url);
      const meta = await sharp(buf).metadata();

      // Auto-fix EXIF rotation only — NO resize, NO quality reduction
      let img = sharp(buf).rotate();
      if (meta.width > meta.height) img = img.rotate(90);

      await img.jpeg({ quality: 100 }).toFile(outputPath);
      console.log('done');
      ok++;
    } catch (err) {
      // Fallback for very large images — still no resize, just write raw
      try {
        const buf = await downloadImage(url);
        await sharp(buf).rotate().jpeg({ quality: 95 }).toFile(outputPath);
        console.log('done (fallback)');
        ok++;
      } catch(e2) {
        console.log(`FAILED: ${err.message}`);
        fail++;
      }
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main().catch(console.error);
