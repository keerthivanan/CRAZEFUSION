const sharp = require('./node_modules/sharp');
const path = require('path');

const TEMPLATE = path.join(__dirname, '..', 'assets', 'template_without_frame.png');

// Poster placement on the wall (same center position as framed version)
const POS = { left: 568, top: 428, width: 440, height: 626 };

async function makeMockup(posterPath, outputPath) {
  // Resize poster to wall size
  const posterBuf = await sharp(posterPath)
    .resize(POS.width, POS.height, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  // Drop shadow SVG (soft dark rectangle slightly behind/below poster)
  const shadowSvg = Buffer.from(`
    <svg width="1587" height="2245" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="12"/>
        </filter>
      </defs>
      <rect
        x="${POS.left + 8}" y="${POS.top + 14}"
        width="${POS.width}" height="${POS.height}"
        fill="rgba(0,0,0,0.28)"
        filter="url(#blur)"
        rx="2"
      />
    </svg>
  `);

  await sharp(TEMPLATE)
    .composite([
      { input: shadowSvg, blend: 'over' },
      { input: posterBuf, left: POS.left, top: POS.top, blend: 'over' },
    ])
    .jpeg({ quality: 93 })
    .toFile(outputPath);
}

const poster = path.join(__dirname, '..', 'keerthicollections', 'car-posters', '2811__Porsche 911 Turbo Marlboro Edition Poster.webp');
const output = path.join(__dirname, '..', 'assets', 'example_mockup_wall.jpg');

makeMockup(poster, output)
  .then(() => console.log('Saved → assets/example_mockup_wall.jpg'))
  .catch(console.error);
