const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processMysoreHandicraftsLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791017603457.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'mysore-handicrafts-logo-raw.png'));

  // Content bounding box:
  // minX: 57, maxX: 477 (width 421)
  // minY: 126, maxY: 543 (height 418)
  const minX = 57;
  const maxX = 477;
  const minY = 126;
  const maxY = 543;
  const contentW = maxX - minX + 1; // 421
  const contentH = maxY - minY + 1; // 418

  const cropped = rawImg.clone().crop({ x: minX, y: minY, w: contentW, h: contentH });

  // Clean levels: pure white background and rich crisp black linework
  for (let i = 0; i < cropped.bitmap.data.length; i += 4) {
    const r = cropped.bitmap.data[i];
    const g = cropped.bitmap.data[i + 1];
    const b = cropped.bitmap.data[i + 2];
    const avg = (r + g + b) / 3;
    if (avg >= 235) {
      cropped.bitmap.data[i] = 255;
      cropped.bitmap.data[i + 1] = 255;
      cropped.bitmap.data[i + 2] = 255;
    } else if (avg <= 40) {
      cropped.bitmap.data[i] = 10;
      cropped.bitmap.data[i + 1] = 10;
      cropped.bitmap.data[i + 2] = 10;
    }
  }

  // Generate 512x512 centered square badge
  const canvasSize = 512;
  const padding = 28;
  const targetSize = canvasSize - (padding * 2); // 456
  cropped.resize({ w: targetSize, h: Math.round(targetSize * (contentH / contentW)) });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offX, offY);

  const outputPath = path.join('assets', 'mysore-handicrafts-logo.png');
  await canvas.write(outputPath);
  console.log(`Saved ${outputPath} (${canvasSize}x${canvasSize})`);

  // Update assets/mysore-handicrafts-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="100%" height="100%">
  <rect width="${canvasSize}" height="${canvasSize}" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="${canvasSize}" height="${canvasSize}" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'mysore-handicrafts-logo.svg'), svgContent);
  console.log('Updated assets/mysore-handicrafts-logo.svg');
}

processMysoreHandicraftsLogo().catch(console.error);
