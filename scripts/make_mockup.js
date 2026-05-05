const sharp = require('./node_modules/sharp');
const path = require('path');

const TEMPLATE = path.join(__dirname, '..', 'Luminous Scandinavian-Inspired Study Nook.png');

// Inner frame area (where poster goes) — measured from the 1587x2245 template
// Outer frame coords — poster fills entire frame including black border
const FRAME = { left: 570, top: 432, width: 436, height: 620 };

async function makeMockup(posterPath, outputPath) {
  const poster = await sharp(posterPath)
    .resize(FRAME.width, FRAME.height, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  await sharp(TEMPLATE)
    .composite([{ input: poster, left: FRAME.left, top: FRAME.top }])
    .jpeg({ quality: 93 })
    .toFile(outputPath);
}

// Single example
const poster = path.join(__dirname, '..', 'keerthicollections', 'aesthetic', '102__Radiate Love_ Positvity Poster _ Aesthetic Poster.webp');
const output = path.join(__dirname, '..', 'assets', 'example_mockup.jpg');

makeMockup(poster, output)
  .then(() => console.log('Saved → assets/example_mockup.jpg'))
  .catch(console.error);
