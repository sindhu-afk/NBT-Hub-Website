const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processAashrithaLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791019559298.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'aashritha-hospital-logo-raw.png'));

  // Content bounding box: minX=19, maxX=888, minY=57, maxY=888
  // With 4px padding buffer:
  const minX = Math.max(0, 19 - 4);
  const maxX = Math.min(rawImg.bitmap.width - 1, 888 + 4);
  const minY = Math.max(0, 57 - 4);
  const maxY = Math.min(rawImg.bitmap.height - 1, 888 + 4);
  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;

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
  const padding = 24;
  const maxDim = canvasSize - (padding * 2); // 464

  let targetW, targetH;
  if (contentW >= contentH) {
    targetW = maxDim;
    targetH = Math.round(targetW * (contentH / contentW));
  } else {
    targetH = maxDim;
    targetW = Math.round(targetH * (contentW / contentH));
  }

  cropped.resize({ w: targetW, h: targetH });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offX, offY);

  const outputPath = path.join('assets', 'aashritha-hospital-logo.png');
  await canvas.write(outputPath);
  console.log(`Saved ${outputPath} (${canvasSize}x${canvasSize})`);

  // Synchronize assets/aashritha-hospital-avatar.svg and assets/aashritha-hospital-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="100%" height="100%">
  <rect width="${canvasSize}" height="${canvasSize}" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="${canvasSize}" height="${canvasSize}" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'aashritha-hospital-avatar.svg'), svgContent);
  fs.writeFileSync(path.join('assets', 'aashritha-hospital-logo.svg'), svgContent);
  console.log('Updated fallback SVGs');
}

processAashrithaLogo().catch(console.error);
