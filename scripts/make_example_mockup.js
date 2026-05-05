const sharp = require('./node_modules/sharp');
const path = require('path');

const POSTER = path.join(__dirname, '..', 'keerthicollections', 'car-posters', '2811__Porsche 911 Turbo Marlboro Edition Poster.webp');
const OUTPUT = path.join(__dirname, '..', 'assets', 'example_mockup.jpg');

// Room dimensions
const W = 900;
const H = 1200;

// Frame position (matching the Scandinavian room template ratios)
const FRAME_X = 290;
const FRAME_Y = 195;
const FRAME_W = 320;
const FRAME_H = 430;
const BORDER = 10; // black frame thickness

// Inner poster area
const INNER_X = FRAME_X + BORDER;
const INNER_Y = FRAME_Y + BORDER;
const INNER_W = FRAME_W - BORDER * 2;
const INNER_H = FRAME_H - BORDER * 2;

async function main() {
  // 1. Resize poster to fit inner frame
  const posterBuf = await sharp(POSTER)
    .resize(INNER_W, INNER_H, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Create warm beige background (like the Scandinavian room)
  const bg = {
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 242, g: 238, b: 230 }
    }
  };

  // 3. Black frame SVG
  const frameSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <!-- Wall shadow gradient (window light from left) -->
      <defs>
        <linearGradient id="light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="white" stop-opacity="0.18"/>
          <stop offset="40%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c8a87a" stop-opacity="1"/>
          <stop offset="100%" stop-color="#b8955a" stop-opacity="1"/>
        </linearGradient>
      </defs>

      <!-- Floor -->
      <rect x="0" y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="url(#floorGrad)"/>

      <!-- Wall light from window -->
      <rect x="0" y="0" width="${W}" height="${H * 0.72}" fill="url(#light)"/>

      <!-- Desk -->
      <rect x="${W * 0.22}" y="${H * 0.68}" width="${W * 0.56}" height="${H * 0.042}" rx="4" fill="#c8975a"/>
      <rect x="${W * 0.22}" y="${H * 0.72}" width="${W * 0.015}" height="${H * 0.13}" rx="3" fill="#b8855a"/>
      <rect x="${W * 0.765}" y="${H * 0.72}" width="${W * 0.015}" height="${H * 0.13}" rx="3" fill="#b8855a"/>

      <!-- Frame shadow -->
      <rect x="${FRAME_X + 6}" y="${FRAME_Y + 8}" width="${FRAME_W}" height="${FRAME_H}" rx="2" fill="rgba(0,0,0,0.18)"/>

      <!-- Black frame border -->
      <rect x="${FRAME_X}" y="${FRAME_Y}" width="${FRAME_W}" height="${FRAME_H}" rx="2" fill="#111111"/>
    </svg>
  `);

  // 4. Compose everything
  await sharp(bg)
    .composite([
      { input: frameSvg, blend: 'over' },
      { input: posterBuf, left: INNER_X, top: INNER_Y, blend: 'over' },
    ])
    .jpeg({ quality: 92 })
    .toFile(OUTPUT);

  console.log('Example mockup saved to assets/example_mockup.jpg');
}

main().catch(console.error);
