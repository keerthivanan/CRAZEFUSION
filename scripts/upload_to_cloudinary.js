const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dxosc5jfy',
  api_key: '999788559774242',
  api_secret: 'iI5oitlKBDGwFLHv5KhirkGIqRY',
});

const MOCKUPS_DIR = path.join(__dirname, 'frontend/public/mockups');
const POSTERS_DIR = path.join(__dirname, 'frontend/public/posters');
const RESULTS_FILE = path.join(__dirname, 'cloudinary_urls.json');

async function uploadFile(filePath, folder, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
  });
  return result.secure_url;
}

async function main() {
  const results = fs.existsSync(RESULTS_FILE)
    ? JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'))
    : { mockups: {}, posters: {} };

  const mockupFiles = fs.readdirSync(MOCKUPS_DIR).filter(f => f.endsWith('.jpg'));
  const posterFiles = fs.readdirSync(POSTERS_DIR).filter(f => f.endsWith('.jpg'));

  console.log(`Uploading ${mockupFiles.length} mockups + ${posterFiles.length} posters...\n`);

  // Upload mockups
  for (let i = 0; i < mockupFiles.length; i++) {
    const f = mockupFiles[i];
    const publicId = f.replace('.jpg', '');
    if (results.mockups[f]) {
      console.log(`[mockup ${i+1}/${mockupFiles.length}] skip: ${f}`);
      continue;
    }
    process.stdout.write(`[mockup ${i+1}/${mockupFiles.length}] ${f} ... `);
    try {
      const url = await uploadFile(path.join(MOCKUPS_DIR, f), 'crazefusion/mockups', publicId);
      results.mockups[f] = url;
      fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
      console.log('done');
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }

  // Upload posters
  for (let i = 0; i < posterFiles.length; i++) {
    const f = posterFiles[i];
    const publicId = f.replace('.jpg', '');
    if (results.posters[f]) {
      console.log(`[poster ${i+1}/${posterFiles.length}] skip: ${f}`);
      continue;
    }
    process.stdout.write(`[poster ${i+1}/${posterFiles.length}] ${f} ... `);
    try {
      const url = await uploadFile(path.join(POSTERS_DIR, f), 'crazefusion/posters', publicId);
      results.posters[f] = url;
      fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
      console.log('done');
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }

  console.log(`\nAll done! ${Object.keys(results.mockups).length} mockups, ${Object.keys(results.posters).length} posters uploaded.`);
  console.log('URLs saved to cloudinary_urls.json');
}

main().catch(console.error);
