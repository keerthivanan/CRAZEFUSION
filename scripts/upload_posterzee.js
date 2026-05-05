const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dxosc5jfy',
  api_key: '999788559774242',
  api_secret: 'iI5oitlKBDGwFLHv5KhirkGIqRY',
});

const POSTERS_DIR = path.join(__dirname, '..', 'posterzee_cropped');
const PROGRESS_FILE = path.join(__dirname, 'posterzee_progress.json');
const OUTPUT_FILE = path.join(__dirname, 'posterzee_products.json');
const CONCURRENCY = 5;

const CATEGORY_MAP = {
  'aesthetic':           'Aesthetic',
  'anime':               'Anime',
  'art':                 'Art',
  'astronomy':           'Astronomy',
  'bar-posters':         'Bar & Pub',
  'botanical':           'Botanical',
  'car-posters':         'Cars',
  'coffee-shop-posters': 'Coffee Shop',
  'collage-kits':        'Collage',
  'cute':                'Cute',
  'cyberpunk-vaporwave': 'Cyberpunk',
  'educational':         'Educational',
  'football-posters':    'Football',
  'gaming':              'Gaming',
  'indie-aesthetics':    'Indie',
  'k-pop':               'K-Pop',
  'money-mindset':       'Motivational',
  'moodboard-aesthetics':'Aesthetic',
  'motivational':        'Motivational',
  'movies':              'Movies',
  'music':               'Music',
  'polaroids':           'Polaroids',
  'postcards':           'Postcards',
  'poster-sets':         'Sets',
  'random-aesthetics':   'Aesthetic',
  'random':              'Misc',
  'sneakerhead':         'Sneakers',
  'splitposters':        'Split Poster',
  'trippy':              'Trippy',
  'tv-shows':            'TV Shows',
  'vintage':             'Vintage',
  'wanderlust':          'Travel',
  'zodiac':              'Zodiac',
};

const PRICES = [149, 179, 199, 249, 299, 349, 399, 449, 499];

function cleanName(filename) {
  let name = filename.replace(/\.webp$/i, '');
  name = name.replace(/^\d+__/, '');
  const parts = name.split(' _ ');
  name = parts[0].replace(/ Poster$/, '').trim();
  return name;
}

function getPublicId(category, filename) {
  const safe = filename
    .replace(/\.webp$/i, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 80);
  return `crazefusion/posterzee/${category}/${safe}`;
}

function randomPrice(category) {
  if (category === 'splitposters' || category === 'poster-sets') {
    return [499, 599, 699][Math.floor(Math.random() * 3)];
  }
  return PRICES[Math.floor(Math.random() * PRICES.length)];
}

async function uploadOne(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
    quality: 'auto',
  });
  return `https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/${publicId}`;
}

async function runBatch(tasks) {
  return Promise.allSettled(tasks.map(t => uploadOne(t.filePath, t.publicId)));
}

async function main() {
  const progress = fs.existsSync(PROGRESS_FILE)
    ? JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'))
    : {};

  const products = [];
  let productId = 2000;

  const categories = fs.readdirSync(POSTERS_DIR).filter(d =>
    fs.statSync(path.join(POSTERS_DIR, d)).isDirectory()
  ).sort();

  let totalFiles = 0;
  const allTasks = [];

  for (const category of categories) {
    const catDir = path.join(POSTERS_DIR, category);
    const files = fs.readdirSync(catDir).filter(f => f.toLowerCase().endsWith('.webp')).sort();
    totalFiles += files.length;

    for (const file of files) {
      const publicId = getPublicId(category, file);
      allTasks.push({ category, file, filePath: path.join(catDir, file), publicId });
    }
  }

  console.log(`Total: ${totalFiles} files across ${categories.length} categories`);
  console.log(`Already uploaded: ${Object.keys(progress).length}`);
  console.log(`Remaining: ${totalFiles - Object.keys(progress).length}\n`);

  let done = 0;
  let i = 0;

  while (i < allTasks.length) {
    const batch = allTasks.slice(i, i + CONCURRENCY).filter(t => !progress[t.publicId]);
    const skipped = allTasks.slice(i, i + CONCURRENCY).filter(t => !!progress[t.publicId]);

    for (const t of skipped) {
      const url = progress[t.publicId];
      const cat = CATEGORY_MAP[t.category] || t.category;
      products.push({
        id: String(productId++),
        name: cleanName(t.file),
        category: cat,
        sub: `Single Poster · ${cat}`,
        price: randomPrice(t.category),
        badge: null,
        img: url,
        img2: url,
      });
      done++;
    }

    if (batch.length > 0) {
      const results = await runBatch(batch);
      results.forEach((result, idx) => {
        const t = batch[idx];
        const cat = CATEGORY_MAP[t.category] || t.category;
        if (result.status === 'fulfilled') {
          progress[t.publicId] = result.value;
          products.push({
            id: String(productId++),
            name: cleanName(t.file),
            category: cat,
            sub: `Single Poster · ${cat}`,
            price: randomPrice(t.category),
            badge: null,
            img: result.value,
            img2: result.value,
          });
          process.stdout.write('.');
        } else {
          process.stdout.write('X');
          console.error(`\nFailed: ${t.file} — ${result.reason?.message}`);
        }
        done++;
      });

      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
    }

    process.stdout.write(` ${done}/${totalFiles}\n`);
    i += CONCURRENCY;
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
  console.log(`\nDone! ${products.length} products → ${OUTPUT_FILE}`);
}

main().catch(console.error);
