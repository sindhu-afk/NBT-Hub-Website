const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(chunk.slice(4, 8 + len)), 8 + len);
  return chunk;
}

function savePng(outPath, pixels, w, h) {
  const rowStride = 1 + w * 4;
  const filtered = Buffer.alloc(h * rowStride);
  for (let y = 0; y < h; y++) {
    filtered[y * rowStride] = 0;
    pixels.copy(filtered, y * rowStride + 1, y * w * 4, (y + 1) * w * 4);
  }
  const compressed = zlib.deflateSync(filtered);
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8; ihdrData[9] = 6; ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0;
  const out = Buffer.concat([
    pngHeader,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(outPath, out);
}

const inputPath = 'C:/Users/NBT/.gemini/antigravity-ide/brain/361445c9-104e-4227-831d-53e0371ee9b7/.user_uploaded/media_1791351534713.png';
const buf = fs.readFileSync(inputPath);
let pos = 8, idatChunks = [], width = 0, height = 0;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos); const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  if (type === 'IHDR') { width = buf.readUInt32BE(pos + 8); height = buf.readUInt32BE(pos + 12); }
  else if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const uncompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const stride = 1 + width * 4;
const decoded = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) {
  const filter = uncompressed[y * stride];
  for (let x = 0; x < width * 4; x++) {
    const raw = uncompressed[y * stride + 1 + x];
    const a = (x >= 4) ? decoded[y * width * 4 + x - 4] : 0;
    const b = (y > 0) ? decoded[(y - 1) * width * 4 + x] : 0;
    const c = (y > 0 && x >= 4) ? decoded[(y - 1) * width * 4 + x - 4] : 0;
    let val = 0;
    if (filter === 0) val = raw;
    else if (filter === 1) val = (raw + a) & 0xff;
    else if (filter === 2) val = (raw + b) & 0xff;
    else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c; const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pr = (pa <= pb && pa <= pc) ? a : ((pb <= pc) ? b : c);
      val = (raw + pr) & 0xff;
    }
    decoded[y * width * 4 + x] = val;
  }
}

const colXs = [57, 364, 671];
const rowYs = [68, 280];
const cardW = 292;
const cardH = 197;

const cards = [
  { name: 'social-card-art-foodbox.png', col: 0, row: 0, relX: 165 },
  { name: 'social-card-art-novus.png', col: 1, row: 0, relX: 160 },
  { name: 'social-card-art-sainik.png', col: 2, row: 0, relX: 162 },
  { name: 'social-card-art-sulaksha.png', col: 0, row: 1, relX: 160 },
  { name: 'social-card-art-nethra.png', col: 1, row: 1, relX: 162 },
  { name: 'social-card-art-burgerhub.png', col: 2, row: 1, relX: 165 }
];

for (const card of cards) {
  const startX = colXs[card.col] + card.relX;
  const startY = rowYs[card.row];
  const w = cardW - card.relX;
  const h = cardH;
  const croppedPixels = Buffer.alloc(w * h * 4);

  for (let y = 0; y < h; y++) {
    const srcY = startY + y;
    const srcOffset = (srcY * width + startX) * 4;
    const dstOffset = y * w * 4;
    decoded.copy(croppedPixels, dstOffset, srcOffset, srcOffset + w * 4);
  }

  // Feather left 35px so any stray edge blends into dark background
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (x < 15) {
        croppedPixels[idx + 3] = 0;
      } else if (x < 45) {
        croppedPixels[idx + 3] = Math.round(croppedPixels[idx + 3] * ((x - 15) / 30));
      }
    }
  }

  const outPath = path.join(__dirname, '..', 'assets', card.name);
  savePng(outPath, croppedPixels, w, h);
  console.log(`Saved assets/${card.name} (${w}x${h})`);
}
