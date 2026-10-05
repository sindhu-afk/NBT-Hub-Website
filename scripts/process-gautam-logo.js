const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processGautamLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791022050083.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'dr-gautam-cougati-logo-raw.png'));

  // Bounding box: minX: 26, maxX: 478, minY: 145, maxY: 362, w: 453, h: 218
  const minX = Math.max(0, 26 - 4);
  const maxX = Math.min(rawImg.bitmap.width - 1, 478 + 4);
  const minY = Math.max(0, 145 - 4);
  const maxY = Math.min(rawImg.bitmap.height - 1, 362 + 4);
  const contentW = maxX - minX + 1; // ~461
  const contentH = maxY - minY + 1; // ~226

  const cropped = rawImg.clone().crop({ x: minX, y: minY, w: contentW, h: contentH });

  // Clean background to pure white
  for (let i = 0; i < cropped.bitmap.data.length; i += 4) {
    const r = cropped.bitmap.data[i];
    const g = cropped.bitmap.data[i + 1];
    const b = cropped.bitmap.data[i + 2];
    if (r >= 238 && g >= 238 && b >= 238) {
      cropped.bitmap.data[i] = 255;
      cropped.bitmap.data[i + 1] = 255;
      cropped.bitmap.data[i + 2] = 255;
    }
  }

  // Generate 512x512 centered square badge
  const canvasSize = 512;
  const paddingX = 32;
  const targetW = canvasSize - (paddingX * 2); // 448
  const targetH = Math.round(targetW * (contentH / contentW)); // ~220

  cropped.resize({ w: targetW, h: targetH });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offX, offY);

  const outputPath = path.join('assets', 'dr-gautam-cougati-logo.png');
  await canvas.write(outputPath);
  console.log(`Saved ${outputPath} (${canvasSize}x${canvasSize})`);

  // Synchronize assets/dr-gautam-cougati-avatar.svg and assets/dr-gautam-cougati-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="100%" height="100%">
  <rect width="${canvasSize}" height="${canvasSize}" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="${canvasSize}" height="${canvasSize}" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'dr-gautam-cougati-avatar.svg'), svgContent);
  fs.writeFileSync(path.join('assets', 'dr-gautam-cougati-logo.svg'), svgContent);
  console.log('Updated fallback SVGs');
}

processGautamLogo().catch(console.error);
