const heicConvert = require("heic-convert");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "webp");

async function convertHeicToWebp() {
  const files = fs.readdirSync(dir).filter((f) => f.match(/\.heic$/i));
  console.log(`Found ${files.length} HEIC files to convert...`);

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.heic$/i, ".webp"));

    if (fs.existsSync(output)) {
      console.log(`Skipping ${file} (WebP already exists)`);
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(input);
      const pngBuffer = await heicConvert({ buffer: inputBuffer, format: "PNG" });
      await sharp(Buffer.from(pngBuffer)).webp({ quality: 85 }).toFile(output);
      console.log(`Converted: ${file} -> ${path.basename(output)}`);
    } catch (err) {
      console.error(`Failed: ${file} - ${err.message}`);
    }
  }

  console.log("Done.");
}

convertHeicToWebp();
