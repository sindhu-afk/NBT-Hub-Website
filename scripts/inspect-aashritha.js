const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function inspectAashrithaLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791019559298.png';
  const rawImg = await Jimp.read(src);

  console.log(`Original dimensions: ${rawImg.bitmap.width}x${rawImg.bitmap.height}`);

  let minX = rawImg.bitmap.width;
  let maxX = 0;
  let minY = rawImg.bitmap.height;
  let maxY = 0;

  for (let y = 0; y < rawImg.bitmap.height; y++) {
    for (let x = 0; x < rawImg.bitmap.width; x++) {
      const idx = (y * rawImg.bitmap.width + x) * 4;
      const r = rawImg.bitmap.data[idx];
      const g = rawImg.bitmap.data[idx + 1];
      const b = rawImg.bitmap.data[idx + 2];
      const a = rawImg.bitmap.data[idx + 3];

      // Non-white pixel check
      if (a > 20 && (r < 240 || g < 240 || b < 240)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounding box: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
  console.log(`Content width: ${maxX - minX + 1}, height: ${maxY - minY + 1}`);
}

inspectAashrithaLogo().catch(console.error);
