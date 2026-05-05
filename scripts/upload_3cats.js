const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dxosc5jfy',
  api_key: '999788559774242',
  api_secret: 'iI5oitlKBDGwFLHv5KhirkGIqRY',
});

const ROOT = path.join(__dirname, '..');
const PROGRESS_FILE = path.join(__dirname, 'upload_3cats_progress.json');
const OUTPUT_FILE   = path.join(__dirname, 'products_3cats.json');
const CONCURRENCY   = 4;

const CATEGORIES = [
  { folder: 'car-posters',         label: 'Cars',        price: 11.99, originalPrice: 17.99 },
  { folder: 'movies',              label: 'Movies',      price: 9.99,  originalPrice: 14.99 },
  { folder: 'coffee-shop-posters', label: 'Coffee Shop', price: 9.99,  originalPrice: 13.99 },
];

function cleanName(filename) {
  return filename
    .replace(/^\d+__/, '')
    .replace(/\.(webp|jpg|jpeg|png)$/i, '')
    .replace(/ Poster$/i, '')
    .replace(/ _ [^_]+$/, '')
    .trim();
}

function safePublicId(str) {
  return str.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/__+/g, '_');
}

async function uploadFile(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
  });
  return result.secure_url;
}

async function runBatch(tasks) {
  return Promise.allSettled(tasks.map(t => uploadFile(t.filePath, t.publicId)));
}

async function main() {
  const progress = fs.existsSync(PROGRESS_FILE) ? JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')) : {};
  const products = [];

  // Build all tasks (only products where BOTH mockup + original exist)
  const allTasks = [];
  for (const cat of CATEGORIES) {
    const mockupDir   = path.join(ROOT, 'mockups', cat.folder);
    const originalDir = path.join(ROOT, 'keerthicollections', cat.folder);

    const mockupFiles = fs.readdirSync(mockupDir).filter(f => f.toLowerCase().endsWith('.jpg')).sort();

    for (const mockupFile of mockupFiles) {
      const baseName    = mockupFile.replace(/\.jpg$/i, '');
      const originalFile = baseName + '.webp';
      const originalPath = path.join(originalDir, originalFile);
      if (!fs.existsSync(originalPath)) continue;

      const safeName      = safePublicId(baseName);
      const mockupPublicId   = `crazefusion/mockups/${cat.folder}/${safeName}`;
      const originalPublicId = `crazefusion/originals/${cat.folder}/${safeName}`;

      allTasks.push({
        name: cleanName(baseName),
        category: cat.label,
        price: cat.price,
        originalPrice: cat.originalPrice,
        mockupPath:    path.join(mockupDir, mockupFile),
        originalPath,
        mockupPublicId,
        originalPublicId,
        key: `${cat.folder}/${safeName}`,
      });
    }
  }

  console.log(`Total products: ${allTasks.length}`);
  console.log(`Already done:   ${Object.keys(progress).length}`);
  console.log(`Remaining:      ${allTasks.filter(t => !progress[t.key]).length}\n`);

  let done = 0;
  let failed = 0;

  // Build products list from already-done progress
  for (const t of allTasks) {
    if (progress[t.key]) {
      products.push({
        name: t.name,
        category: t.category,
        sub: `Wall Poster · A4`,
        price: t.price,
        original_price: t.originalPrice,
        badge: null,
        img:  progress[t.key].mockup,
        img2: progress[t.key].original,
      });
      done++;
    }
  }

  // Upload remaining in batches of CONCURRENCY products (2 uploads each)
  const remaining = allTasks.filter(t => !progress[t.key]);

  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);

    const uploadJobs = batch.flatMap(t => [
      { filePath: t.mockupPath,   publicId: t.mockupPublicId,   taskKey: t.key, type: 'mockup' },
      { filePath: t.originalPath, publicId: t.originalPublicId, taskKey: t.key, type: 'original' },
    ]);

    const results = await Promise.allSettled(uploadJobs.map(j => uploadFile(j.filePath, j.publicId)));

    // Group results by product
    for (let j = 0; j < batch.length; j++) {
      const t        = batch[j];
      const mockupR  = results[j * 2];
      const origR    = results[j * 2 + 1];

      if (mockupR.status === 'fulfilled' && origR.status === 'fulfilled') {
        progress[t.key] = { mockup: mockupR.value, original: origR.value };
        products.push({
          name: t.name,
          category: t.category,
          sub: `Wall Poster · A4`,
          price: t.price,
          original_price: t.originalPrice,
          badge: null,
          img:  mockupR.value,
          img2: origR.value,
        });
        process.stdout.write('.');
        done++;
      } else {
        const err = (mockupR.status === 'rejected' ? mockupR.reason : origR.reason)?.message;
        process.stdout.write('X');
        console.error(`\nFailed: ${t.key} — ${err}`);
        failed++;
        done++;
      }
    }

    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
    process.stdout.write(` ${done}/${allTasks.length}\n`);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
  console.log(`\nDone! ${done - failed} products → ${OUTPUT_FILE}`);
}

main().catch(console.error);
