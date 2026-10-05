const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const inputPath = 'C:\\Users\\NBT\\.gemini\\antigravity-ide\\brain\\6fc34cef-43be-4732-bf85-e5a6a1e69153\\.user_uploaded\\media_1790746263053.jpg';
  const outDir = path.join(__dirname, '..', 'assets');
  
  console.log('Reading image from:', inputPath);
  const image = await Jimp.read(inputPath);
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Original Dimensions: ${width}x${height}`);

  // 1. Detect border boundaries
  let left = 0;
  for (let x = 0; x < width; x++) {
    let nonWhiteCount = 0;
    for (let y = 100; y < height - 100; y += 10) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      if (r < 245 || g < 245 || b < 245) {
        nonWhiteCount++;
      }
    }
    if (nonWhiteCount > 10) {
      left = x;
      break;
    }
  }

  let right = width - 1;
  for (let x = width - 1; x >= 0; x--) {
    let nonWhiteCount = 0;
    for (let y = 100; y < height - 100; y += 10) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      if (r < 245 || g < 245 || b < 245) {
        nonWhiteCount++;
      }
    }
    if (nonWhiteCount > 10) {
      right = x;
      break;
    }
  }

  console.log(`Detected content horizontal span: [${left}, ${right}]`);
  
  // Crop off the white side letterbox bars
  const cropX = left + 2; // slight inset to avoid any border line
  const cropW = (right - left) - 3;
  const cropY = 0;
  const cropH = height;
  
  image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  console.log(`Cropped to: ${image.bitmap.width}x${image.bitmap.height}`);

  // Save the cropped base
  const croppedClone = image.clone();

  // Create Enhanced Version
  // 1. Gentle contrast increase (+12%)
  // 2. Gentle brightness boost (+4%)
  // 3. Unsharp mask / edge enhancement for crystal clarity
  
  // Let's create an enhanced copy
  const enhanced = image.clone();
  
  // Contrast adjustment
  enhanced.contrast(0.14);
  enhanced.brightness(0.03);

  // Custom high-fidelity clarity filter (Unsharp Mask Convolution)
  // [ -0.15, -0.3, -0.15 ]
  // [ -0.3,   2.8, -0.3  ]
  // [ -0.15, -0.3, -0.15 ]
  const clarityKernel = [
    [-0.1, -0.2, -0.1],
    [-0.2,  2.2, -0.2],
    [-0.1, -0.2, -0.1]
  ];
  enhanced.convolution(clarityKernel);

  // Slight color vibrance / saturation (+8%)
  const w = enhanced.bitmap.width;
  const h = enhanced.bitmap.height;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      let r = enhanced.bitmap.data[idx];
      let g = enhanced.bitmap.data[idx + 1];
      let b = enhanced.bitmap.data[idx + 2];

      // Vibrance calculation: boost less saturated colors slightly
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      
      // Slight warm balance adjustment to offset greenish fluorescent cast
      // r slight boost (+2%), b slight tint balance
      const rBoost = 1.025;
      const gBalance = 0.99;
      const bBoost = 1.01;

      r = Math.min(255, Math.max(0, Math.round(r * rBoost)));
      g = Math.min(255, Math.max(0, Math.round(g * gBalance)));
      b = Math.min(255, Math.max(0, Math.round(b * bBoost)));

      enhanced.bitmap.data[idx] = r;
      enhanced.bitmap.data[idx + 1] = g;
      enhanced.bitmap.data[idx + 2] = b;
    }
  }

  // Save enhanced team image into assets
  const targetJpg = path.join(outDir, 'nbt-team.jpg');
  const targetPng = path.join(outDir, 'nbt-team.png');
  
  await enhanced.write(targetJpg);
  await enhanced.write(targetPng);
  console.log('Saved enhanced team photo to:', targetJpg, 'and', targetPng);
}

processImage().catch(console.error);
