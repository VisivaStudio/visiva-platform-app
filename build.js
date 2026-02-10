import { promises as fs } from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "visiva-platform");

const files = {
  "index.html": "<!-- index placeholder -->",
  "academy/index.html": "<!-- academy placeholder -->",
  "marketplace/index.html": "<!-- marketplace placeholder -->",
  "portal/login.html": "<!-- portal placeholder -->",

  "assets/js/app.js": "console.log('VISIVA® Platform Ready');",
  "assets/js/ui.js": "export const initUI = () => {};",
  "assets/js/guardian.js": "console.log('VISIVA® Governance Active');",
  "assets/js/cinematic.js": "console.log('VISIVA® XR Placeholder');",

  "assets/css/platform.css": "/* VISIVA® Stylesheet */"
};

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error("Directory creation failed:", dirPath, err);
    throw err;
  }
}

async function writeFile(filePath, content) {
  try {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, "utf8");
  } catch (err) {
    console.error("File write failed:", filePath, err);
    throw err;
  }
}

async function generateFiles() {
  for (const relativePath of Object.keys(files)) {
    const absolutePath = path.join(baseDir, relativePath);
    await writeFile(absolutePath, files[relativePath]);
  }
}

async function createZip() {
  const zipPath = path.join(__dirname, "visiva-platform.zip");
  const output = await fs.open(zipPath, "w");

  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = output.createWriteStream();

    stream.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(stream);
    archive.directory(baseDir, false);
    archive.finalize();
  });
}

async function build() {
  console.log("VISIVA® Build System: Initializing…");
  await ensureDir(baseDir);

  console.log("VISIVA® Build System: Generating files…");
  await generateFiles();

  console.log("VISIVA® Build System: Packaging ZIP…");
  await createZip();

  console.log("VISIVA® Build Complete.");
}

build().catch((err) => {
  console.error("VISIVA® Build Error:", err);
});