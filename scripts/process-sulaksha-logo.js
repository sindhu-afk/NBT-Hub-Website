const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processSulakshaLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791018585489.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'sulaksha-hospital-logo-raw.png'));

  // Content bounding box:
  // minX: 173, maxX: 737 (width: 565)
  // minY: 211, maxY: 689 (height: 479)
  const minX = 173;
  const maxX = 737;
  const minY = 211;
  const maxY = 689;
  const contentW = maxX - minX + 1; // 565
  const contentH = maxY - minY + 1; // 479

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
  const paddingX = 28;
  const targetW = canvasSize - (paddingX * 2); // 456
  const targetH = Math.round(targetW * (contentH / contentW)); // ~386

  cropped.resize({ w: targetW, h: targetH });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offX, offY);

  const outputPath = path.join('assets', 'sulaksha-hospital-logo.png');
  await canvas.write(outputPath);
  console.log(`Saved ${outputPath} (${canvasSize}x${canvasSize})`);

  // Synchronize assets/sulaksha-hospital-avatar.svg and assets/sulaksha-hospital-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="100%" height="100%">
  <rect width="${canvasSize}" height="${canvasSize}" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="${canvasSize}" height="${canvasSize}" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'sulaksha-hospital-avatar.svg'), svgContent);
  fs.writeFileSync(path.join('assets', 'sulaksha-hospital-logo.svg'), svgContent);
  console.log('Updated fallback SVGs');
}

processSulakshaLogo().catch(console.error);
