import { createWriteStream } from "fs";
import { promises as fs } from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "visiva-platform");
const zipPath = path.join(__dirname, "visiva-platform.zip");

const requiredFiles = [
  "index.html",
  "academy/index.html",
  "marketplace/index.html",
  "portal/login.html",
  "assets/css/platform.css",
  "assets/js/app.js",
  "assets/js/ui.js",
  "assets/js/cinematic.js",
  "assets/js/guardian.js"
];

const copyEntries = [
  "index.html",
  "academy",
  "marketplace",
  "portal",
  "platform",
  "partials",
  "assets",
  "LICENSE",
  "README.md",
  "QA_CHECKLIST.md"
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureCanonicalGuardianFile() {
  const canonical = path.join(__dirname, "assets/js/guardian.js");
  const typoFile = path.join(__dirname, "assets/js/gaurdian.js");

  if (await exists(canonical)) {
    return;
  }

  if (await exists(typoFile)) {
    await fs.copyFile(typoFile, canonical);
    console.log("[build] Created assets/js/guardian.js from assets/js/gaurdian.js.");
  }
}

async function validateRequiredFiles() {
  const missing = [];

  for (const relativePath of requiredFiles) {
    const absolutePath = path.join(__dirname, relativePath);
    if (!(await exists(absolutePath))) {
      missing.push(relativePath);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      "Required source files are missing:\n" + missing.map((item) => ` - ${item}`).join("\n")
    );
  }
}

async function cleanOutputs() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.rm(zipPath, { force: true });
}

async function copyEntry(relativePath) {
  const sourcePath = path.join(__dirname, relativePath);
  const outputPath = path.join(outputDir, relativePath);
  const stat = await fs.stat(sourcePath);

  if (stat.isDirectory()) {
    await fs.cp(sourcePath, outputPath, { recursive: true, force: true });
    return;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.copyFile(sourcePath, outputPath);
}

async function createZip() {
  await new Promise((resolve, reject) => {
    const stream = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    stream.on("close", resolve);
    stream.on("error", reject);
    archive.on("error", reject);

    archive.pipe(stream);
    archive.directory(outputDir, false);
    archive.finalize();
  });
}

async function build() {
  console.log("[build] Starting VISIVA distribution build...");

  await ensureCanonicalGuardianFile();
  await validateRequiredFiles();

  console.log("[build] Cleaning previous artifacts...");
  await cleanOutputs();
  await fs.mkdir(outputDir, { recursive: true });

  console.log("[build] Copying source files...");
  for (const entry of copyEntries) {
    await copyEntry(entry);
  }

  console.log("[build] Packaging zip artifact...");
  await createZip();

  console.log("[build] Done: visiva-platform/ and visiva-platform.zip generated.");
}

build().catch((err) => {
  console.error("[build] Build failed:", err.message);
  process.exitCode = 1;
});
