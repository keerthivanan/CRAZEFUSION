const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const URLS = JSON.parse(fs.readFileSync(path.join(__dirname, 'cloudinary_urls.json'), 'utf8'));
const CSV_PATH = path.join(__dirname, 'crazefusion_posters.csv');
const csv = fs.readFileSync(CSV_PATH, 'utf8');
const records = parse(csv, { columns: true, skip_empty_lines: true });

// q_auto,f_auto only — full size, auto WebP/AVIF, no width reduction
function optimizeUrl(url) {
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
}

const categoryMap = {
  'Cricket - CSK': { cat: 'Cricket', team: 'CSK' },
  'Cricket - RCB': { cat: 'Cricket', team: 'RCB' },
  'Cricket - India': { cat: 'Cricket', team: 'India' },
  'Cricket - Other IPL': { cat: 'Cricket', team: 'IPL' },
  'Football': { cat: 'Football', team: null },
  'Anime - Naruto': { cat: 'Anime', team: 'Naruto' },
  'Anime - Solo Leveling': { cat: 'Anime', team: 'Solo Leveling' },
  'Anime - One Piece': { cat: 'Anime', team: 'One Piece' },
  'Anime - JJK': { cat: 'Anime', team: 'JJK' },
  'Anime - Movies': { cat: 'Anime', team: 'Anime Movies' },
  'Movies - English': { cat: 'Movies', team: 'English' },
  'Movies - Tamil': { cat: 'Movies', team: 'Tamil' },
  'Marvel': { cat: 'Marvel', team: null },
  'Motivation': { cat: 'Motivation', team: null },
  'Van Gogh': { cat: 'Art', team: 'Van Gogh' },
  'Music Artist - Tamil': { cat: 'Music', team: 'Tamil' },
  'Music Artist - English': { cat: 'Music', team: 'English' },
  'Series': { cat: 'Series', team: null },
};

function toTitle(filename) {
  return filename
    .replace(/\.(jpg|jpeg|png)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function safeName(name) {
  return name
    .replace(/\.(jpg|jpeg|png)$/i, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '');
}

const seen = new Set();
const products = [];
let id = 1;

for (const row of records) {
  const name = row['Name'];
  const cat = row['Category'];
  const safe = safeName(name);
  const mockupKey = `mockup_${safe}.jpg`;
  const posterKey = `poster_${safe}.jpg`;

  if (!URLS.mockups[mockupKey]) continue;
  if (seen.has(safe)) continue;
  seen.add(safe);

  const { cat: category, team } = categoryMap[cat] || { cat: cat, team: null };

  const mockupUrl = optimizeUrl(URLS.mockups[mockupKey]);
  const posterUrl = URLS.posters[posterKey]
    ? optimizeUrl(URLS.posters[posterKey])
    : mockupUrl;

  products.push({
    id: id++,
    title: toTitle(name),
    sub: `Single Poster · ${cat}`,
    price: 149,
    original: 299,
    badge: id <= 10 ? 'New' : null,
    cat: category,
    team: team,
    img: mockupUrl,
    img2: posterUrl,
    sizes: ['A4', 'A3', 'A2'],
    finishes: ['Matte', 'Glossy', 'Framed'],
    description: `${toTitle(name)} — premium quality print on 200GSM art paper.`,
  });
}

const allCats = ['All', ...new Set(products.map(p => p.cat))];

const output = `export const categories = ${JSON.stringify(allCats, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};

export const reviews = [
  { name: "Arjun K.", city: "Mumbai", text: "Absolutely stunning quality! My room looks like a magazine shoot. The panels align perfectly and the print quality is unreal.", stars: 5, product: "CSK Wall Set", date: "Mar 2025" },
  { name: "Priya S.", city: "Delhi", text: "The 8-panel split poster is incredible. Everyone who visits asks about it. I've recommended CrazeFusion to all my friends!", stars: 5, product: "RCB Collection", date: "Feb 2025" },
  { name: "Rahul M.", city: "Bangalore", text: "Got the Lakers wall set. Best purchase of my life honestly. Packaging was perfect, no damage whatsoever.", stars: 5, product: "Lakers Wall Set", date: "Jan 2025" },
  { name: "Sneha R.", city: "Chennai", text: "Real Madrid set came out perfectly. The colors are so vibrant. Will definitely order again!", stars: 5, product: "Real Madrid Set", date: "Mar 2025" },
  { name: "Vikram T.", city: "Hyderabad", text: "Delivery super fast, packaging excellent. 10/10 recommend. The colors are so vibrant and true to what I saw online.", stars: 5, product: "Warriors Set", date: "Apr 2025" },
  { name: "Ananya P.", city: "Pune", text: "Print quality is insane for this price. Way better than expected. I was skeptical but now I'm a permanent customer!", stars: 5, product: "Barcelona Set", date: "Feb 2025" },
  { name: "Karthik V.", city: "Kolkata", text: "My living room looks legendary now. Worth every rupee! The split poster is absolutely fire.", stars: 5, product: "GTR Poster", date: "Jan 2025" },
  { name: "Divya N.", city: "Ahmedabad", text: "Bought as a gift. My boyfriend cried happy tears. The quality, the packaging, everything was premium. Thank you!", stars: 5, product: "MI Fan Set", date: "Mar 2025" },
];
`;

fs.writeFileSync(path.join(__dirname, 'frontend', 'src', 'data.ts'), output);
console.log(`Done! ${products.length} products updated with Cloudinary URLs`);
