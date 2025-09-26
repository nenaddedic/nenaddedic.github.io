import { SceneColor } from "./scene/sceneObject";

export class Pixel {
  r: number;
  g: number;
  b: number;
  a?: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromSceneColor(color: SceneColor) {
    return new Pixel(
      Math.floor(color.r * 255),
      Math.floor(color.g * 255),
      Math.floor(color.b * 255)
    );
  }
}

export function generateBmp(data: Array<Array<Pixel>>): Uint8ClampedArray {
  const height = data.length;
  const width = data[0].length;
  const bitsPerPixel = 24;
  // Each row must be a multiple of 4 bytes.
  const rowSize = Math.floor((bitsPerPixel * width + 31) / 32) * 4;
  const pixelDataSize = rowSize * height;

  const fileHeaderSize = 14;
  const dibHeaderSize = 40;
  const fileOffset = fileHeaderSize + dibHeaderSize;
  const fileSize = fileOffset + pixelDataSize;

  // Create a buffer for the entire file
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BMP File Header
  // 'BM'
  view.setUint16(0, 0x424d, false);
  // File size
  view.setUint32(2, fileSize, true);
  // Reserved
  view.setUint32(6, 0, true);
  // Pixel data offset
  view.setUint32(10, fileOffset, true);

  // DIB Header (BITMAPINFOHEADER)
  // Header size
  view.setUint32(14, dibHeaderSize, true);
  // Image width
  view.setInt32(18, width, true);
  // Image height
  view.setInt32(22, height, true);
  // Color planes (must be 1)
  view.setUint16(26, 1, true);
  // Bits per pixel
  view.setUint16(28, bitsPerPixel, true);
  // Compression method (0=BI_RGB)
  view.setUint32(30, 0, true);
  // Image size (can be 0 for BI_RGB)
  view.setUint32(34, pixelDataSize, true);
  // Horizontal resolution (pixels per meter, can be 0)
  view.setInt32(38, 0, true);
  // Vertical resolution (pixels per meter, can be 0)
  view.setInt32(42, 0, true);
  // Number of colors in palette (0 for 24-bit)
  view.setUint32(46, 0, true);
  // Number of important colors (0 means all are important)
  view.setUint32(50, 0, true);

  let i = fileOffset;
  for (let y = height-1; y >= 0; y--) {
    let rowBytesWritten = 0;
    for (let x = 0; x < width; x++) {
      let pixel = new Pixel(0,0,0);
      if (x < data[height - 1 - y].length) {
        pixel = data[height - 1 - y][x]; // BMP stores pixels bottom-to-top
      }
      view.setUint8(i++, pixel.b);
      view.setUint8(i++, pixel.g);
      view.setUint8(i++, pixel.r);
      rowBytesWritten += 3;
    }
    // Padding
    for (let p = 0; p < rowSize - rowBytesWritten; p++) {
      view.setUint8(i++, 0);
    }
  }

  return new Uint8ClampedArray(buffer);
}