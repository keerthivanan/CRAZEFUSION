const cloudinary = require('./node_modules/cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxosc5jfy',
  api_key: '999788559774242',
  api_secret: 'iI5oitlKBDGwFLHv5KhirkGIqRY',
});

async function deleteByPrefix(prefix) {
  let deleted = 0;
  let nextCursor = null;

  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
    });

    const publicIds = res.resources.map(r => r.public_id);
    // Cloudinary max 100 per request
    for (let i = 0; i < publicIds.length; i += 100) {
      const batch = publicIds.slice(i, i + 100);
      await cloudinary.api.delete_resources(batch);
      deleted += batch.length;
      process.stdout.write(`Deleted ${deleted} from ${prefix}\n`);
    }

    nextCursor = res.next_cursor;
  } while (nextCursor);

  // delete the empty folder
  try { await cloudinary.api.delete_folder(prefix); } catch (_) {}
  return deleted;
}

async function main() {
  console.log('Deleting old products from Cloudinary...\n');
  const m = await deleteByPrefix('crazefusion/mockups');
  const p = await deleteByPrefix('crazefusion/posters');
  console.log(`\nDone! Removed ${m} mockups + ${p} posters from Cloudinary.`);
}

main().catch(console.error);
