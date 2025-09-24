import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello from React!</h1>
      <p>This component is rendered using Vite.</p>
      <Bmap />
    </div>
  );
}

const Bmap: React.FC = () => {
  return (
    <div>
      <h2>This is a custom bmap component</h2>
      <p>It can be used to display maps or other related content.</p>
      <img src={"data:image/bmp;base64," + btoa(String.fromCharCode(...generateBlackBitmap(50, 5)))} alt="5x5 black bitmap" />
    </div>
  );
}

function generateBlackBitmap(width: number, height: number): Uint8Array {
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

  // Pixel Data (all black)
  // The pixel data is already 0 (black) because ArrayBuffer is initialized with zeros.
  // We just need to return the byte array.
  return new Uint8Array(buffer);
}

export default App;