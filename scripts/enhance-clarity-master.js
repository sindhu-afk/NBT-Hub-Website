const { Jimp } = require('jimp');
const path = require('path');

async function enhanceTeamPhoto() {
  const inputPath = 'C:\\Users\\NBT\\.gemini\\antigravity-ide\\brain\\6fc34cef-43be-4732-bf85-e5a6a1e69153\\.user_uploaded\\media_1790746263053.jpg';
  const outDir = path.join(__dirname, '..', 'assets');

  console.log('Loading image...');
  const img = await Jimp.read(inputPath);

  const w = img.bitmap.width;
  const h = img.bitmap.height;

  // 1. Precise crop of white borders
  let left = 58;
  let right = 974;
  const cropW = right - left + 1;
  const cropH = h;
  img.crop({ x: left, y: 0, w: cropW, h: cropH });
  console.log(`Cropped image size: ${img.bitmap.width}x${img.bitmap.height}`);

  const cw = img.bitmap.width;
  const ch = img.bitmap.height;
  const data = img.bitmap.data;

  // 2. Compute histogram and percentiles for dynamic range expansion
  // We want to slightly lift deep shadows and protect highlights
  const lum = new Float32Array(cw * ch);
  for (let i = 0; i < cw * ch; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    lum[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Shadow fill & highlight compression (Tone Curve)
  // Gamma 0.95 lifts midtones slightly, making faces clearer
  for (let i = 0; i < cw * ch; i++) {
    const idx = i * 4;
    let r = data[idx] / 255;
    let g = data[idx + 1] / 255;
    let b = data[idx + 2] / 255;

    // Subtle S-curve for punchy professional contrast:
    // f(x) = x < 0.5 ? 2*x^1.15 / 2 : 1 - (1-x)^1.15 / ...
    // Or standard smooth power curve:
    // Shadow lift for dark clothing / under-desk:
    r = Math.pow(r, 0.94);
    g = Math.pow(g, 0.94);
    b = Math.pow(b, 0.94);

    // Dynamic contrast boost
    r = (r - 0.5) * 1.12 + 0.5;
    g = (g - 0.5) * 1.12 + 0.5;
    b = (b - 0.5) * 1.12 + 0.5;

    // Color temperature / tint correction (slight fluorescent green neutralization)
    r = r * 1.03;   // warm up slightly
    g = g * 0.985;  // reduce green cast
    b = b * 1.015;  // crisp clean whites

    data[idx] = Math.min(255, Math.max(0, Math.round(r * 255)));
    data[idx + 1] = Math.min(255, Math.max(0, Math.round(g * 255)));
    data[idx + 2] = Math.min(255, Math.max(0, Math.round(b * 255)));
  }

  // 3. High-Pass / Unsharp Clarity Filter
  // Create a blurred copy to derive high-pass frequency details
  const blurred = img.clone();
  blurred.blur(1); // 1px gaussian-like radius

  const bData = blurred.bitmap.data;
  const clarityAmount = 0.55; // 55% high-frequency detail boost for crystal clarity

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

  // Save the master refined version
  const masterJpg = path.join(outDir, 'nbt-team.jpg');
  const masterPng = path.join(outDir, 'nbt-team.png');
  
  await img.write(masterPng);
  await img.write(masterJpg);
  console.log('Saved enhanced team photo to assets/nbt-team.jpg and nbt-team.png');
}

enhanceTeamPhoto().catch(console.error);
