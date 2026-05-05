const sharp = require('./node_modules/sharp');
const fs = require('fs');
const path = require('path');

const TEMPLATE = path.join(__dirname, '..', 'assets', 'template_without_frame.png');
const INPUT_DIR = path.join(__dirname, '..', 'keerthicollections', 'car-posters');
const OUTPUT_DIR = path.join(__dirname, '..', 'mockups', 'car-posters');
const CONCURRENCY = 6;
const POS = { left: 568, top: 428, width: 440, height: 626 };

const SHADOW = Buffer.from(`<svg width="1587" height="2245" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="b"><feGaussianBlur stdDeviation="12"/></filter></defs>
  <rect x="${POS.left+8}" y="${POS.top+14}" width="${POS.width}" height="${POS.height}"
    fill="rgba(0,0,0,0.28)" filter="url(#b)" rx="2"/>
</svg>`);

async function make(input, output) {
  const poster = await sharp(input)
    .resize(POS.width, POS.height, { fit: 'cover', position: 'center' })
    .png().toBuffer();

  await sharp(TEMPLATE)
    .composite([
      { input: SHADOW, blend: 'over' },
      { input: poster, left: POS.left, top: POS.top, blend: 'over' },
    ])
    .jpeg({ quality: 90 })
    .toFile(output);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(INPUT_DIR).filter(f => f.toLowerCase().endsWith('.webp')).sort();
  const total = files.length;
  console.log(`Generating ${total} car poster mockups...\n`);

  let done = 0, failed = 0;

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(batch.map(f => {
      const out = path.join(OUTPUT_DIR, f.replace(/\.webp$/i, '.jpg'));
      if (fs.existsSync(out)) return Promise.resolve('skip');
      return make(path.join(INPUT_DIR, f), out);
    }));

    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') { process.stdout.write('.'); done++; }
      else { process.stdout.write('X'); console.error(`\nFailed: ${batch[idx]} — ${r.reason?.message}`); failed++; done++; }
    });

    process.stdout.write(` ${done}/${total}\n`);
  }

  console.log(`\nDone! ${done - failed} mockups → mockups/car-posters/`);
}

main().catch(console.error);
