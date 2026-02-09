# VISIVA® Platform (v2)

Cinematic brand platform with stabilized HTML/CSS, accessible navigation, and a clean WebXR preview powered by Three.js.  
This repo includes: Core pages, modules, tools, platform docs, CSS architecture, JS modules, and asset directories.

---

## Folder Structure

/assets
/css/             style.css, components.css, platform.css
/images/          site imagery and tool thumbnails
/js/              app.js, ui.js, cinematic.js, scene-tools-xr.js
/models/          (optional) 3D models for XR
/textures/        (optional) environment maps, materials
/vendor
three.module.js   (Three.js r160 vendor build)
/platform           Overview, Philosophy, Process, BIE, DNA, Guardian AI, AR/VR, Universe, Health, Licensing, Sustainability, Vault, Timeline
/tools              Tools index + individual tools (logo-optimiser, colour-generator, etc.)
/brand-kits         Productized brand kits
/academy
/marketplace
/portal

---

> **Note:** Use **relative paths** exactly as the fixed pages do (e.g., `../assets/js/ui.js`). This prevents broken links across nested folders.

---

## Getting Started

### 1) Requirements
- Any static server (for local dev):  
  - Node: `npx serve` or `npm i -g http-server`  
  - Python: `python3 -m http.server 8080`  
- **HTTPS** is required for WebXR in production (localhost is OK for dev)

### 2) Local Development
```bash
# from repo root
npx serve . -l 5173
# open http://localhost:5173

Files You Must Have

/vendor/three.module.js — your uploaded vendor build (r160)
/assets/js/scene-tools-xr.js — the XR scene module (see below)

---

## Key Pages (stabilized)

/platform/*.html — all modules (Overview, DNA, BIE, Guardian AI, AR/VR, Universe, Health, Licensing, Sustainability, Vault, Timeline)
/tools/index.html — Tools page + XR preview (Three.js XR enabled via scene-tools-xr.js)
Shared header/footer patterns with mobile menu, accessible platform dropdowns, and consistent nav links.

---

## WebXR Preview (Tools page)

Uses Three.js XR with a single animation loop
Starts VR when Enter VR is pressed (if device & browser support)
Clean fallback when unsupported (status text in-page)

---

## Files involved:

/tools/index.html (imports the module below)
/assets/js/scene-tools-xr.js
/vendor/three.module.js

---

## Conventions

Accessibility: dropdown toggles are <button>s; aria-expanded state is managed in ui.js.
Idempotent JS: event bindings use guards to avoid double listeners across pages.
CSS tokens: rely on --gold-*, --radius-*, --space-*, etc., for consistent cinematic theming.

---

## Deployment

Serve over HTTPS (required for WebXR).
Verify all relative links in nested folders (use the fixed header/footer).
Cache policy suggestions:

HTML: Cache-Control: no-store
CSS/JS: Cache-Control: public, max-age=31536000, immutable (use file fingerprinting if adding a build step)


Test WebXR on a supported headset/browser combination.

---

# Credits

VISIVA® — Brand Design Platform (v2)
Cinematic architecture, stabilized markup, and XR preview setup.

---

## 2) 🎯 `scene-tools-xr.js` — paste into `/assets/js/scene-tools-xr.js`

> This is the same file I described earlier, provided here so you can drop it in directly.

```javascript
import * as THREE from '../../vendor/three.module.js';

/* ======================================================
   CANVAS + BASIC SETUP
====================================================== */
const canvas = document.getElementById('xr-canvas');
if (!canvas) {
  console.warn('[XR] Canvas not found');
  throw new Error('XR canvas missing');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight,
  0.01,
  50
);
camera.position.set(0, 1.6, 2);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.xr.enabled = true;

/* ======================================================
   LIGHTING (CINEMATIC DEFAULT)
====================================================== */
scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 1.2));

const keyLight = new THREE.DirectionalLight(0xd4af37, 1);
keyLight.position.set(2, 4, 2);
scene.add(keyLight);

/* ======================================================
   HERO OBJECT (PLACEHOLDER)
====================================================== */
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(0.35, 0.08, 32, 100),
  new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.8,
    roughness: 0.2
  })
);

ring.position.set(0, 1.5, -1.5);
scene.add(ring);

/* ======================================================
   RENDER LOOP (SINGLE SOURCE OF TRUTH)
====================================================== */
renderer.setAnimationLoop(() => {
  ring.rotation.x += 0.004;
  ring.rotation.y += 0.006;
  renderer.render(scene, camera);
});

/* ======================================================
   RESIZE HANDLING
====================================================== */
function resize() {
  const w = canvas.clientWidth || 1;
  const h = canvas.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);

/* ======================================================
   XR CONTROLS (SAFE + EXPLICIT)
====================================================== */
const btnEnter = document.getElementById('xr-enter');
const btnExit  = document.getElementById('xr-exit');
const badge    = document.getElementById('xr-badge');
const support  = document.getElementById('xr-support');

let xrSession = null;

// Guard for secure context (HTTPS or localhost)
const isSecure = (location.protocol === 'https:') ||
                 (location.hostname === 'localhost' || location.hostname === '127.0.0.1');

async function checkXR() {
  if (!isSecure) {
    support.textContent = 'WebXR requires HTTPS (or localhost).';
    return;
  }
  if (!navigator.xr) {
    support.textContent = 'WebXR not supported';
    return;
  }
  try {
    const supported = await navigator.xr.isSessionSupported('immersive-vr');
    if (supported) {
      support.textContent = 'VR supported — connect a headset';
      if (btnEnter) btnEnter.disabled = false;
    } else {
      support.textContent = 'VR not supported on this device';
    }
  } catch {
    support.textContent = 'Unable to check WebXR support.';
  }
}

async function enterXR() {
  try {
    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: ['local-floor']
    });

    renderer.xr.setSession(xrSession);
    if (badge) badge.textContent = 'Immersive VR';
    if (btnEnter) btnEnter.disabled = true;
    if (btnExit) btnExit.disabled = false;

    xrSession.addEventListener('end', () => {
      if (badge) badge.textContent = 'Inline Preview';
      if (btnEnter) btnEnter.disabled = false;
      if (btnExit) btnExit.disabled = true;
      xrSession = null;
    });

  } catch (e) {
    console.error('[XR] Failed to enter XR', e);
    support.textContent = 'Failed to start VR session';
    if (btnEnter) btnEnter.disabled = false;
  }
}

btnEnter?.addEventListener('click', enterXR);
btnExit?.addEventListener('click', () => xrSession && xrSession.end());

checkXR();


## 🚀 Deploy checklist (quick)

HTTPS enabled (WebXR requirement).
Verify the following paths resolve in the browser:

/vendor/three.module.js
/assets/js/scene-tools-xr.js
/assets/js/ui.js and /assets/js/app.js
Images under /assets/images/tools/*


Open /tools/index.html:

On desktop/mobile without headset:

“Enter VR” remains disabled, and status text explains why.


On a VR‑capable browser/headset over HTTPS:

“Enter VR” enables; pressing it starts the session.
Badge switches to “Immersive VR”; Exit VR becomes active.
