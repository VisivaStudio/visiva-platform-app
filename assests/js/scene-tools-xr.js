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

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
  const { clientWidth, clientHeight } = canvas;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
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

async function checkXR() {
  if (!navigator.xr) {
    support.textContent = 'WebXR not supported';
    return;
  }

  const supported = await navigator.xr.isSessionSupported('immersive-vr');
  if (supported) {
    support.textContent = 'VR supported — connect a headset';
    btnEnter.disabled = false;
  } else {
    support.textContent = 'VR not supported on this device';
  }
}

async function enterXR() {
  try {
    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: ['local-floor']
    });

    renderer.xr.setSession(xrSession);
    badge.textContent = 'Immersive VR';
    btnEnter.disabled = true;
    btnExit.disabled = false;

    xrSession.addEventListener('end', () => {
      badge.textContent = 'Inline Preview';
      btnEnter.disabled = false;
      btnExit.disabled = true;
      xrSession = null;
    });

  } catch (e) {
    console.error('[XR] Failed to enter XR', e);
    support.textContent = 'Failed to start VR session';
  }
}

btnEnter?.addEventListener('click', enterXR);
btnExit?.addEventListener('click', () => xrSession && xrSession.end());

checkXR();
