const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const BG_PATH = path.join(__dirname, 'Moody Poster Mockup with Dark Background (1).png');
const CSV_PATH = path.join(__dirname, 'crazefusion_posters.csv');
const OUTPUT_DIR = path.join(__dirname, 'frontend', 'public', 'mockups');

// Full 1587x2245 — poster area same as original perfect size
const POSTER_W = 748;
const POSTER_H = 1060;
const POSTER_X = 420;
const POSTER_Y = 60;

async function downloadImage(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    maxRedirects: 10,
    timeout: 30000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  return Buffer.from(response.data);
}

async function createMockup(posterBuffer, outputPath) {
  const meta = await sharp(posterBuffer).metadata();
  let img = sharp(posterBuffer).rotate();
  if (meta.width > meta.height) img = img.rotate(90);

  const resized = await img
    .resize(POSTER_W, POSTER_H, { fit: 'cover', position: 'centre' })
    .toBuffer();

  // Full resolution output — NO resize of final image
  await sharp(BG_PATH)
    .composite([{ input: resized, left: POSTER_X, top: POSTER_Y }])
    .jpeg({ quality: 95 })
    .toFile(outputPath);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  console.log(`Generating ${records.length} full-res mockups...\n`);
  let ok = 0, fail = 0;

  for (let i = 0; i < records.length; i++) {
    const name = records[i]['Name'];
    const url = records[i]['Image URL'];
    const safe = name.replace(/\.(jpg|jpeg|png)$/i, '').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    const outputPath = path.join(OUTPUT_DIR, `mockup_${safe}.jpg`);

    if (fs.existsSync(outputPath)) {
      console.log(`[${i+1}/${records.length}] skip: ${name}`);
      ok++; continue;
    }

    process.stdout.write(`[${i+1}/${records.length}] ${name} ... `);
    try {
      const buf = await downloadImage(url);
      await createMockup(buf, outputPath);
      console.log('done');
      ok++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main().catch(console.error);
