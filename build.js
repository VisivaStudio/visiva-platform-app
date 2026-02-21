#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = __dirname;
const outputDir = path.join(rootDir, 'visiva-platform');
const zipPath = path.join(rootDir, 'visiva-platform.zip');

const requiredFiles = [
  'index.html',
  'academy/index.html',
  'marketplace/index.html',
  'portal/login.html',
  'assets/css/platform.css',
  'assets/js/app.js',
  'assets/js/ui.js',
  'assets/js/cinematic.js',
  'assets/js/guardian.js'
];

const copyEntries = [
  'index.html',
  'academy',
  'marketplace',
  'portal',
  'platform',
  'partials',
  'assets',
  'server',
  '.env.example',
  'LICENSE',
  'README.md',
  'QA_CHECKLIST.md'
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
  const canonical = path.join(rootDir, 'assets/js/guardian.js');
  const typoFile = path.join(rootDir, 'assets/js/gaurdian.js');

  if (await exists(canonical)) {
    return;
  }

  if (await exists(typoFile)) {
    await fs.copyFile(typoFile, canonical);
    console.log('[build] Created assets/js/guardian.js from assets/js/gaurdian.js.');
  }
}

async function validateRequiredFiles() {
  const missing = [];

  for (const relativePath of requiredFiles) {
    const absolutePath = path.join(rootDir, relativePath);
    if (!(await exists(absolutePath))) {
      missing.push(relativePath);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      'Required source files are missing:\n' + missing.map((item) => ` - ${item}`).join('\n')
    );
  }
}

async function cleanOutputs() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.rm(zipPath, { force: true });
}

async function copyEntry(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const targetPath = path.join(outputDir, relativePath);
  const stat = await fs.stat(sourcePath);

  if (stat.isDirectory()) {
    await fs.cp(sourcePath, targetPath, { recursive: true, force: true });
    return;
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
}

function commandExists(command) {
  return new Promise((resolve) => {
    const check = spawn('sh', ['-lc', `command -v ${command}`], { stdio: 'ignore' });
    check.on('close', (code) => resolve(code === 0));
    check.on('error', () => resolve(false));
  });
}

async function createZip() {
  if (!(await commandExists('zip'))) {
    throw new Error('zip CLI is required but was not found in PATH.');
  }

  await new Promise((resolve, reject) => {
    const zip = spawn('zip', ['-r', '-q', zipPath, '.'], {
      cwd: outputDir,
      stdio: 'inherit'
    });

    zip.on('error', reject);
    zip.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`zip exited with code ${code}`));
      }
    });
  });
}

async function build() {
  console.log('[build] Starting VISIVA distribution build...');

  await ensureCanonicalGuardianFile();
  await validateRequiredFiles();

  console.log('[build] Cleaning previous artifacts...');
  await cleanOutputs();
  await fs.mkdir(outputDir, { recursive: true });

  console.log('[build] Copying source files...');
  for (const entry of copyEntries) {
    await copyEntry(entry);
  }

  console.log('[build] Packaging zip artifact...');
  await createZip();

  console.log('[build] Done: visiva-platform/ and visiva-platform.zip generated.');
}

build().catch((err) => {
  console.error('[build] Build failed:', err.message);
  process.exitCode = 1;
});
