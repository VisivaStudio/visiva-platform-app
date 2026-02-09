import fs from 'fs';
import crypto from 'crypto';

function hash(content) {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

const files = [
  '/assets/js/app.js',
  '/assets/js/ui.js',
  '/assets/js/scene-tools-xr.js',
  '/assets/css/style.css',
  '/assets/css/components.css',
  '/assets/css/platform.css'
];

files.forEach(path => {
  const full = `.${path}`;
  if (!fs.existsSync(full)) return;

  const content = fs.readFileSync(full, 'utf8');
  const h = hash(content);
  const out = full.replace(/(\.\w+)$/, `.${h}$1`);

  fs.writeFileSync(out, content);
  console.log(`✔ ${path} → ${out}`);
});
