const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processNethraLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791004332978.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'nethra-dharini-logo-raw.png'));

  // Generate crisp 300x300 square version
  const canvasSize = 300;
  const scaled = rawImg.clone().resize({ w: canvasSize, h: canvasSize });
  await scaled.write(path.join('assets', 'nethra-dharini-logo.png'));
  console.log('Saved assets/nethra-dharini-logo.png (300x300)');

  // Also update assets/nethra-dharini-avatar.svg and assets/nethra-dharini-logo.svg
  const pngBuf = fs.readFileSync(path.join('assets', 'nethra-dharini-logo.png'));
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <image href="data:image/png;base64,${b64}" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'nethra-dharini-avatar.svg'), svgContent);
  fs.writeFileSync(path.join('assets', 'nethra-dharini-logo.svg'), svgContent);
  console.log('Updated fallback SVGs');
}

processNethraLogo().catch(console.error);
