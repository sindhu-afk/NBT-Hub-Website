const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.slice(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

const inputPath = path.join(__dirname, '..', 'assets', 'logo.png');
const outputPath = path.join(__dirname, '..', 'assets', 'logo-transparent.png');

const buf = fs.readFileSync(inputPath);
let pos = 8;
const idatChunks = [];
let width = 0, height = 0;

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const rawCompressed = Buffer.concat(idatChunks);
const uncompressed = zlib.inflateSync(rawCompressed);

// Decode PNG scanlines (RGBA, 4 bytes per pixel + 1 filter byte per row)
const stride = 1 + width * 4;
const rawPixels = Buffer.alloc(width * height * 4);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let prevRow = Buffer.alloc(width * 4);
for (let y = 0; y < height; y++) {
  const rowStart = y * stride;
  const filter = uncompressed[rowStart];
  const currentRow = Buffer.alloc(width * 4);

  for (let x = 0; x < width * 4; x++) {
    const rawVal = uncompressed[rowStart + 1 + x];
    const a = x >= 4 ? currentRow[x - 4] : 0;
    const b = prevRow[x];
    const c = x >= 4 ? prevRow[x - 4] : 0;

    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) val = (rawVal + paeth(a, b, c)) & 0xff;
    currentRow[x] = val;
  }

  currentRow.copy(rawPixels, y * width * 4);
  prevRow = currentRow;
}

// Convert near-white background pixels to transparent with feathering
for (let i = 0; i < rawPixels.length; i += 4) {
  const r = rawPixels[i];
  const g = rawPixels[i + 1];
  const b = rawPixels[i + 2];
  
  // Background is pure white / near white
  const minVal = Math.min(r, g, b);
  if (minVal > 248) {
    rawPixels[i + 3] = 0;
  } else if (minVal > 225) {
    const factor = (248 - minVal) / (248 - 225);
    rawPixels[i + 3] = Math.round(rawPixels[i + 3] * factor);
  }
}

// Re-encode scanlines with filter 0 (none)
const filteredData = Buffer.alloc(height * stride);
for (let y = 0; y < height; y++) {
  filteredData[y * stride] = 0; // Filter 0
  rawPixels.copy(filteredData, y * stride + 1, y * width * 4, (y + 1) * width * 4);
}

const newCompressed = zlib.deflateSync(filteredData);

// Build new PNG
const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 6; // color type: RGBA
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace

const outChunks = [
  pngHeader,
  makeChunk('IHDR', ihdrData),
  makeChunk('IDAT', newCompressed),
  makeChunk('IEND', Buffer.alloc(0))
];

fs.writeFileSync(outputPath, Buffer.concat(outChunks));
console.log('Successfully created assets/logo-transparent.png!');
