const { Jimp } = require('jimp');
const path = require('path');

async function processCeoImage() {
  const inputPath = 'C:\\Users\\NBT\\.gemini\\antigravity-ide\\brain\\6fc34cef-43be-4732-bf85-e5a6a1e69153\\.user_uploaded\\media_1790752279168.jpg';
  const outDir = path.join(__dirname, '..', 'assets');

  console.log('Loading CEO image from:', inputPath);
  const img = await Jimp.read(inputPath);
  console.log(`Original size: ${img.bitmap.width}x${img.bitmap.height}`);

  // Subtle contrast & brightness enhancement for maximum executive crispness
  img.contrast(0.06);
  img.brightness(0.01);

  // High-pass micro-clarity filter
  const blurred = img.clone();
  blurred.blur(1);

  const cw = img.bitmap.width;
  const ch = img.bitmap.height;
  const data = img.bitmap.data;
  const bData = blurred.bitmap.data;
  const clarityAmount = 0.35; // clean edge enhancement without artifacts

  for (let i = 0; i < cw * ch; i++) {
    const idx = i * 4;
    for (let c = 0; c < 3; c++) {
      const orig = data[idx + c];
      const blurVal = bData[idx + c];
      const highPass = orig - blurVal;
      const sharpened = orig + highPass * clarityAmount;
      data[idx + c] = Math.min(255, Math.max(0, Math.round(sharpened)));
    }
  }

  const baseOut = path.join(outDir, 'dinesh-jk-ceo-base.png');
  await img.write(baseOut);
  console.log('Saved enhanced base to:', baseOut);
}

processCeoImage().catch(console.error);
