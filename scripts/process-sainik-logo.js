const { Jimp } = require('jimp');
const path = require('path');

async function processSainikLogo() {
  const inputPath = path.join(__dirname, '..', 'assets', 'sainik-hospital-logo.jpg');
  const outputPath = path.join(__dirname, '..', 'assets', 'sainik-hospital-logo.png');

  console.log('Reading:', inputPath);
  const img = await Jimp.read(inputPath);

  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const cx = 511.0;
  const cy = 511.5;
  const r = 498.5; // slight inward trim to cleanly eliminate any JPEG compression edge halo

  const data = img.bitmap.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > r + 1.0) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
      } else if (dist >= r - 1.0) {
        const factor = (r + 1.0 - dist) / 2.0;
        const alpha = Math.round(Math.min(255, Math.max(0, factor * 255)));
        data[idx + 3] = alpha;
      }
    }
  }

  await img.write(outputPath);
  console.log('Wrote transparent logo to:', outputPath);
}

processSainikLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
