const fs = require('fs');
const zlib = require('zlib');

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

const inputPath = 'C:/Users/NBT/.gemini/antigravity-ide/brain/361445c9-104e-4227-831d-53e0371ee9b7/.user_uploaded/media_1791355113936.png';
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

console.log('Decoded image size:', width, 'x', height);

// Let's find card borders along y=100 and x=150
let xs = [];
for (let x = 0; x < width; x++) {
  const idx = (100 * width + x) * 4;
  const r = decoded[idx], g = decoded[idx+1], b = decoded[idx+2];
  // background between cards is darker than card interior
  xs.push({ x, r, g, b });
}
// Find gaps
let darkRuns = [];
let inDark = false, startDark = 0;
for (let x = 0; x < width; x++) {
  const idx = (100 * width + x) * 4;
  const g = decoded[idx+1];
  const isDark = g < 20; // outside card
  if (isDark && !inDark) { inDark = true; startDark = x; }
  else if (!isDark && inDark) { inDark = false; darkRuns.push({ start: startDark, end: x - 1, len: x - startDark }); }
}
console.log('Gaps along y=100:', darkRuns);

// Card column boundaries
// 4 cards across width 1024
