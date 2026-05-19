const fs = require('fs')
const path = require('path')

const iconDir = path.join(__dirname, '../src/static/tab')

if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true })
}

const createSimplePNG = (width, height, r, g, b, a = 255) => {
  const png = []
  
  png.push(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A)
  
  const ihdr = [
    (width >> 24) & 0xFF, (width >> 16) & 0xFF, (width >> 8) & 0xFF, width & 0xFF,
    (height >> 24) & 0xFF, (height >> 16) & 0xFF, (height >> 8) & 0xFF, height & 0xFF,
    8, 6, 0, 0, 0
  ]
  const ihdrData = Buffer.from(ihdr)
  const ihdrCrc = crc32([0x49, 0x48, 0x44, 0x52, ...ihdr])
  png.push(0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52, ...ihdr, ...intToBytes(ihdrCrc))
  
  const rawData = []
  for (let y = 0; y < height; y++) {
    rawData.push(0)
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b, a)
    }
  }
  
  const compressed = deflate(Buffer.from(rawData))
  const idatCrc = crc32([0x49, 0x44, 0x41, 0x54, ...compressed])
  const len = compressed.length
  png.push((len >> 24) & 0xFF, (len >> 16) & 0xFF, (len >> 8) & 0xFF, len & 0xFF)
  png.push(0x49, 0x44, 0x41, 0x54, ...compressed, ...intToBytes(idatCrc))
  
  const iendCrc = crc32([0x49, 0x45, 0x4E, 0x44])
  png.push(0, 0, 0, 0, 0x49, 0x45, 0x4E, 0x44, ...intToBytes(iendCrc))
  
  return Buffer.from(png)
}

const intToBytes = (val) => [
  (val >> 24) & 0xFF, (val >> 16) & 0xFF, (val >> 8) & 0xFF, val & 0xFF
]

const crc32Table = []
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  crc32Table[n] = c
}

const crc32 = (data) => {
  let crc = 0xffffffff
  for (const byte of data) {
    crc = crc32Table[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

const deflate = (data) => {
  const result = [0x78, 0x01]
  const blockSize = 65535
  
  for (let i = 0; i < data.length; i += blockSize) {
    const block = data.slice(i, Math.min(i + blockSize, data.length))
    const isLast = i + blockSize >= data.length
    result.push(isLast ? 1 : 0)
    const len = block.length
    result.push(len & 0xFF, (len >> 8) & 0xFF)
    result.push((~len) & 0xFF, ((~len) >> 8) & 0xFF)
    result.push(...block)
  }
  
  let adler = 1
  let s1 = 1, s2 = 0
  for (const byte of data) {
    s1 = (s1 + byte) % 65521
    s2 = (s2 + s1) % 65521
  }
  adler = (s2 << 16) | s1
  result.push((adler >> 24) & 0xFF, (adler >> 16) & 0xFF, (adler >> 8) & 0xFF, adler & 0xFF)
  
  return result
}

const icons = [
  { name: 'home.png', color: [153, 153, 153] },
  { name: 'home-active.png', color: [64, 128, 255] },
  { name: 'category.png', color: [153, 153, 153] },
  { name: 'category-active.png', color: [64, 128, 255] },
  { name: 'cart.png', color: [153, 153, 153] },
  { name: 'cart-active.png', color: [64, 128, 255] },
  { name: 'mine.png', color: [153, 153, 153] },
  { name: 'mine-active.png', color: [64, 128, 255] }
]

icons.forEach(({ name, color }) => {
  const png = createSimplePNG(48, 48, color[0], color[1], color[2])
  fs.writeFileSync(path.join(iconDir, name), png)
  console.log(`Created: ${name}`)
})

console.log('All icons generated successfully!')
