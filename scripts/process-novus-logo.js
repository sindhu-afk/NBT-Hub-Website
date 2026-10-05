const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processNovusLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791005543222.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'novus-labs-logo-raw.png'));

  // Content bounding box in 150x150 source:
  // minX: 21, maxX: 130 (width: 110)
  // minY: 31, maxY: 93 (height: 63)
  const minX = 21;
  const maxX = 130;
  const minY = 31;
  const maxY = 93;
  const contentW = maxX - minX + 1; // 110
  const contentH = maxY - minY + 1; // 63

  // Crop to exact content
  const cropped = rawImg.clone().crop({ x: minX, y: minY, w: contentW, h: contentH });

  // Generate a high-resolution 300x300 centered badge with clean white padding
  const canvasSize = 300;
  const paddingX = 22; // 256px wide target
  const targetW = canvasSize - (paddingX * 2);
  const targetH = Math.round(targetW * (contentH / contentW));

  cropped.resize({ w: targetW, h: targetH });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offsetX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offsetY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offsetX, offsetY);

  const outputPath = path.join('assets', 'novus-labs-logo.png');
  await canvas.write(outputPath);
  console.log('Saved assets/novus-labs-logo.png (300x300, perfectly centered)');

  // Also update assets/novus-labs-avatar.svg and assets/novus-labs-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'novus-labs-avatar.svg'), svgContent);
  fs.writeFileSync(path.join('assets', 'novus-labs-logo.svg'), svgContent);
  console.log('Updated fallback SVGs');
}

processNovusLogo().catch(console.error);
