const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processARHospitalLogo() {
  const inputPath = path.join(__dirname, '..', 'assets', 'ar-hospital-logo-raw.png');
  const outputPath = path.join(__dirname, '..', 'assets', 'ar-hospital-logo.png');
  const svgOutputPath = path.join(__dirname, '..', 'assets', 'ar-hospital-avatar.svg');

  if (!fs.existsSync(inputPath)) {
    console.error('Source file not found:', inputPath);
    return;
  }

  console.log('Reading source logo:', inputPath);
  const img = await Jimp.read(inputPath);

  // Content bounding box in 150x150 source:
  // minX: 17, maxX: 134 (width: 118)
  // minY: 7, maxY: 122 (height: 116)
  const minX = 17;
  const maxX = 134;
  const minY = 7;
  const maxY = 122;
  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;

  // Crop to exact content
  const cropped = img.clone().crop({ x: minX, y: minY, w: contentW, h: contentH });

  // Generate a high-resolution 300x300 centered badge with clean white padding
  const canvasSize = 300;
  const padding = 20;
  const targetSize = canvasSize - (padding * 2); // 260px

  cropped.resize({ w: targetSize, h: targetSize });

  const canvas = new Jimp({ width: canvasSize, height: canvasSize, color: 0xffffffff });
  const offsetX = Math.round((canvasSize - cropped.bitmap.width) / 2);
  const offsetY = Math.round((canvasSize - cropped.bitmap.height) / 2);
  canvas.composite(cropped, offsetX, offsetY);

  await canvas.write(outputPath);
  console.log('Successfully generated centered logo badge at:', outputPath);

  // Also update SVG fallback
  const pngBuf = fs.readFileSync(outputPath);
  const b64 = pngBuf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" rx="24" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;
  fs.writeFileSync(svgOutputPath, svgContent);
  console.log('Successfully updated fallback SVG at:', svgOutputPath);
}

processARHospitalLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
