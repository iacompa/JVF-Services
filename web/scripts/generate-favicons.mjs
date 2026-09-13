import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourcePath = path.join(
  projectRoot,
  "public/assets/jvf/jvf-services-logo.png",
);
const appDirectory = path.join(projectRoot, "src/app");
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

async function transparentSquare(size, paddingRatio = 0.045) {
  const padding = Math.max(1, Math.round(size * paddingRatio));
  const contentSize = size - padding * 2;
  const trimmedSource = await sharp(sourcePath)
    .trim({ background: transparent })
    .toBuffer();
  const resized = await sharp(trimmedSource)
    .resize(contentSize, contentSize, {
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer({ resolveWithObject: true });

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: transparent,
    },
  })
    .composite([
      {
        input: resized.data,
        left: Math.floor((size - resized.info.width) / 2),
        top: Math.floor((size - resized.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
}

function createIco(images) {
  const directorySize = 6 + images.length * 16;
  const header = Buffer.alloc(directorySize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = directorySize;
  images.forEach(({ size, data }, index) => {
    const entryOffset = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entryOffset);
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(data.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += data.length;
  });

  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

await mkdir(appDirectory, { recursive: true });

const [icon, appleIcon, ...icoPngs] = await Promise.all([
  transparentSquare(512),
  transparentSquare(180),
  ...[16, 32, 48, 64, 128, 256].map((size) => transparentSquare(size)),
]);

await Promise.all([
  writeFile(path.join(appDirectory, "icon.png"), icon),
  writeFile(path.join(appDirectory, "apple-icon.png"), appleIcon),
  writeFile(
    path.join(appDirectory, "favicon.ico"),
    createIco(
      [16, 32, 48, 64, 128, 256].map((size, index) => ({
        size,
        data: icoPngs[index],
      })),
    ),
  ),
]);

console.log("Generated transparent JVF Services favicon assets.");
