const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processCarMartLogo() {
  const src = 'C:/Users/NBT/.gemini/antigravity-ide/brain/4aff26cd-638b-4ece-b32b-e7f84ef64282/.user_uploaded/media_1791009805912.png';
  const rawImg = await Jimp.read(src);

  // Save raw copy
  await rawImg.write(path.join('assets', 'carmart-logo-raw.png'));

  // Content bounding box:
  // Alpha starts at x: 62, ends at x: 434 (width 373)
  // Alpha starts at y: 134, ends at y: 206 (height 73)
  // Let's add 6px padding for soft headlight and reflection glow
  const minX = Math.max(0, 62 - 6);
  const maxX = Math.min(rawImg.bitmap.width - 1, 434 + 6);
  const minY = Math.max(0, 134 - 6);
  const maxY = Math.min(rawImg.bitmap.height - 1, 206 + 8);
  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;

  const cropped = rawImg.clone().crop({ x: minX, y: minY, w: contentW, h: contentH });

  // 1. Transparent PNG version (for portfolio grid tile, case study modal, and dark backgrounds)
  const outputPath = path.join('assets', 'carmart-logo.png');
  await cropped.write(outputPath);
  console.log(`Saved transparent ${outputPath} (${contentW}x${contentH})`);

  // 2. High-res badge version with dark luxury pill (for marquee where light background would wash out silver "CAR")
  // Let's also create carmart-badge.png
  const badgeW = 400;
  const badgeH = 120;
  const badge = new Jimp({ width: badgeW, height: badgeH, color: 0x0f2420ff }); // Matching luxury deep pine/emerald #0f2420
  const scale = Math.min((badgeW - 40) / contentW, (badgeH - 24) / contentH);
  const scaledLogo = cropped.clone().resize({ w: Math.round(contentW * scale), h: Math.round(contentH * scale) });
  const offX = Math.round((badgeW - scaledLogo.bitmap.width) / 2);
  const offY = Math.round((badgeH - scaledLogo.bitmap.height) / 2);
  badge.composite(scaledLogo, offX, offY);
  await badge.write(path.join('assets', 'carmart-badge.png'));
  console.log('Saved assets/carmart-badge.png');

  // 3. Update assets/carmart-logo.svg
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${contentW} ${contentH}" width="100%" height="100%">
  <image href="data:image/png;base64,${b64}" width="${contentW}" height="${contentH}" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

  fs.writeFileSync(path.join('assets', 'carmart-logo.svg'), svgContent);
  console.log('Updated assets/carmart-logo.svg');
}

processCarMartLogo().catch(console.error);
