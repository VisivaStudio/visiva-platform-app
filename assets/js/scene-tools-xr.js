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

// /assets/js/scene-tools-xr.js
// ESM: keep vendor read-only and import as a root-relative path.
import * as THREE from '/vendor/three.module.js';

/**
 * VISIVA® Tools XR Controller
 * - Single render loop for both flat, VR, and AR.
 * - Adds immersive-ar with plane hit-test placement for a "ring".
 * - Graceful fallbacks + HTTPS checks + idempotent bindings.
 */

// ---------- DOM HOOKS ----------
const btnVR = document.getElementById('btn-enter-vr');
const btnAR = document.getElementById('btn-enter-ar');
const supportMsg = document.getElementById('xr-support-msg');

// ---------- RENDERER / SCENE / CAMERA ----------
const canvasContainer = document.querySelector('[data-xr-canvas]') || document.body;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.xr.enabled = true;                         // One renderer for VR and AR
renderer.xr.setReferenceSpaceType('local');        // Works for VR+AR
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null; // AR needs alpha (camera passthrough), VR can ignore

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
scene.add(camera);

// ---------- LIGHTING ----------
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
hemi.position.set(0, 1, 0);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 0.6);
dir.position.set(1, 2, 1);
dir.castShadow = false;
scene.add(dir);

// ---------- CONTENT: base floor (VR only) & ring ----------
const groupWorld = new THREE.Group();
scene.add(groupWorld);

// Optional ground for non-AR contexts (don’t show in AR)
const vrGround = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 })
);
vrGround.visible = false;
groupWorld.add(vrGround);

// The "ring" you want to place via AR hit-test
const ringAnchor = new THREE.Group();
ringAnchor.name = 'xrRingAnchor';
ringAnchor.visible = false;

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(0.12, 0.015, 24, 48),
  new THREE.MeshStandardMaterial({
    color: 0x00ffaa,
    emissive: 0x003322,
    metalness: 0.2,
    roughness: 0.35
  })
);
ring.rotation.x = Math.PI / 2; // lay flat by default
ringAnchor.add(ring);
scene.add(ringAnchor);

// Subtle ambient anim (works in flat/VR/AR)
let tClock = new THREE.Clock();

// ---------- AR: Reticle for hit-testing ----------
const reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 0x00ffaa, opacity: 0.85, transparent: true })
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
scene.add(reticle);

// ---------- STATE ----------
let currentSession = null;
let currentSessionMode = null; // 'immersive-vr' | 'immersive-ar' | null

// AR hit-test state
let xrViewerSpace = null;
let xrLocalSpace = null;
let xrHitTestSource = null;

// Controller for AR "select" (tap) and VR "select"
const controller = renderer.xr.getController(0);
scene.add(controller);

// Avoid double-binding
let controllerBound = false;

function bindControllerEvents() {
  if (controllerBound) return;
  controller.addEventListener('select', onXRSelect);
  controllerBound = true;
}

function onXRSelect() {
  if (currentSessionMode === 'immersive-ar' && reticle.visible) {
    // Place the ringAnchor at the reticle pose
    ringAnchor.visible = true;
    ringAnchor.position.setFromMatrixPosition(reticle.matrix);
    // Orient upright (use reticle orientation flat-on-plane)
    const q = new THREE.Quaternion().setFromRotationMatrix(reticle.matrix);
    ringAnchor.quaternion.copy(q);
  }
  // In VR you may implement additional interactions here if needed.
}

// ---------- XR SUPPORT / ENABLEMENT ----------
async function detectXRSupport() {
  const secure = isSecureContext || location.hostname === 'localhost';
  if (!secure) {
    setSupportMessage('XR requires HTTPS or localhost.');
    disable(btnVR);
    disable(btnAR);
    return;
  }

  const xr = navigator.xr;
  if (!xr) {
    setSupportMessage('WebXR not available in this browser.');
    disable(btnVR);
    disable(btnAR);
    return;
  }

  try {
    const [vrOK, arOK] = await Promise.allSettled([
      xr.isSessionSupported('immersive-vr'),
      xr.isSessionSupported('immersive-ar')
    ]);

    if (vrOK.status === 'fulfilled' && vrOK.value) {
      enable(btnVR);
    } else {
      disable(btnVR);
    }

    if (arOK.status === 'fulfilled' && arOK.value) {
      enable(btnAR);
      setSupportMessage('XR supported. Use Enter VR with a headset or Enter AR on compatible mobile.');
    } else {
      disable(btnAR);
      if (vrOK.status === 'fulfilled' && vrOK.value) {
        setSupportMessage('VR supported. AR not supported on this device.');
      } else {
        setSupportMessage('XR not supported on this device/browser.');
      }
    }
  } catch (e) {
    console.warn('[XR] support detection error:', e);
    setSupportMessage('Unable to detect XR capabilities.');
    disable(btnVR);
    disable(btnAR);
  }
}

function setSupportMessage(msg) {
  if (supportMsg) supportMsg.textContent = msg || '';
}
function enable(el) { if (el) { el.disabled = false; el.classList.remove('is-disabled'); } }
function disable(el) { if (el) { el.disabled = true; el.classList.add('is-disabled'); } }

// ---------- SESSION LIFECYCLE ----------
async function startVR() {
  const xr = navigator.xr;
  if (!xr) return;

  try {
    const session = await xr.requestSession('immersive-vr', {
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
    });
    await onSessionStart(session, 'immersive-vr');
  } catch (e) {
    console.warn('[XR] VR requestSession failed:', e);
    setSupportMessage('Unable to start VR session.');
  }
}

async function startAR() {
  const xr = navigator.xr;
  if (!xr) return;

  try {
    const session = await xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'hand-tracking', 'anchors', 'depth-sensing', 'light-estimation'],
      // domOverlay is optional; if present, allow overlay on the page body.
      domOverlay: { root: document.body }
    });
    await onSessionStart(session, 'immersive-ar');
  } catch (e) {
    console.warn('[XR] AR requestSession failed:', e);
    setSupportMessage('Unable to start AR session (permissions/device/browser).');
  }
}

async function onSessionStart(session, mode) {
  currentSession = session;
  currentSessionMode = mode;

  // Scene toggles per mode
  const isAR = mode === 'immersive-ar';
  vrGround.visible = !isAR;     // hide ground in AR
  reticle.visible = false;      // reticle only shown when we have valid hit result
  ringAnchor.visible = !isAR;   // in AR it appears after placement

  bindControllerEvents();

  // Set session to renderer
  await renderer.xr.setSession(session);

  // Prepare reference spaces
  try {
    xrLocalSpace = await session.requestReferenceSpace('local');
    xrViewerSpace = await session.requestReferenceSpace('viewer');
  } catch (e) {
    console.warn('[XR] reference space error:', e);
  }

  // AR-only: create a persistent hit test source
  if (isAR && xrViewerSpace) {
    try {
      xrHitTestSource = await session.requestHitTestSource({ space: xrViewerSpace });
    } catch (e) {
      console.warn('[XR] hit test source error:', e);
      xrHitTestSource = null;
    }
  }

  // Cleanup on end
  session.addEventListener('end', onSessionEnd);

  // UI message
  setSupportMessage(isAR ? 'AR session started. Move device to find a surface, tap to place the ring.'
                         : 'VR session started. Press your headset menu to exit.');
}

function onSessionEnd() {
  const wasAR = currentSessionMode === 'immersive-ar';

  if (xrHitTestSource) {
    try { xrHitTestSource.cancel && xrHitTestSource.cancel(); } catch {}
    xrHitTestSource = null;
  }
  xrViewerSpace = null;
  xrLocalSpace = null;

  currentSession = null;
  currentSessionMode = null;

  // Reset visuals
  reticle.visible = false;
  if (wasAR) {
    // Keep ring in scene after AR end? Choose your UX. We’ll keep it.
    ringAnchor.visible = true;
  }

  setSupportMessage('XR session ended.');
}

// ---------- RENDER LOOP (single loop for flat/VR/AR) ----------
renderer.setAnimationLoop((time, frame) => {
  // Subtle animation independent of XR mode
  const t = tClock.getElapsedTime();
  ring.rotation.z = t * 0.35;

  // AR hit-test update (only when in AR and we have a frame & source)
  if (currentSessionMode === 'immersive-ar' && frame && xrHitTestSource && xrLocalSpace) {
    const results = frame.getHitTestResults(xrHitTestSource);
    if (results && results.length > 0) {
      const pose = results[0].getPose(xrLocalSpace);
      if (pose) {
        reticle.visible = true;
        reticle.matrix.fromArray(pose.transform.matrix);
      } else {
        reticle.visible = false;
      }
    } else {
      reticle.visible = false;
    }
  }

  renderer.render(scene, camera);
});

// ---------- EVENTS ----------
window.addEventListener('resize', onResize, { passive: true });
function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
}

// Button bindings (idempotent guards in case of re-execution)
if (btnVR && !btnVR.dataset.bound) {
  btnVR.addEventListener('click', startVR);
  btnVR.dataset.bound = '1';
}
if (btnAR && !btnAR.dataset.bound) {
  btnAR.addEventListener('click', startAR);
  btnAR.dataset.bound = '1';
}

// Kickoff
detectXRSupport();

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
import * as THREE from '/vendor/three.module.js';
