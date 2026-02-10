/* ==========================================================================
   VISIVA® CINEMATIC EFFECTS
   Parallax, reveal animations, scroll effects
   ========================================================================== */

let xrSession = null;
let xrRefSpace = null;
let gl = null;

const getSecureContext = () =>
  location.protocol === "https:" ||
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1";

const setupXR = async () => {
  const elSupport = document.getElementById("xr-support");
  const btnEnter = document.getElementById("xr-enter");
  const btnExit = document.getElementById("xr-exit");
  const badge = document.getElementById("xr-badge");
  const canvas = document.getElementById("xr-canvas");
  const overlay = document.getElementById("xr-overlay");

  if (!getSecureContext()) {
    if (elSupport) elSupport.textContent = "XR requires a secure context (HTTPS).";
    return;
  }

  if (!navigator.xr) {
    if (elSupport) elSupport.textContent = "XR is not available on this device.";
    return;
  }

  const supported = await navigator.xr.isSessionSupported("immersive-vr");

  if (!supported) {
    if (elSupport) elSupport.textContent = "VR not supported.";
    return;
  }

  btnEnter.removeAttribute("disabled");
  elSupport.textContent = "VR supported. Connect a headset to enter.";

  btnEnter.addEventListener("click", () => beginSession(canvas, badge, overlay, btnEnter, btnExit));
  btnExit.addEventListener("click", endSession);
};

const beginSession = async (canvas, badge, overlay, btnEnter, btnExit) => {
  try {
    btnEnter.disabled = true;

    xrSession = await navigator.xr.requestSession("immersive-vr", {
      requiredFeatures: ["local-floor"]
    });

    gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    await gl.makeXRCompatible();

    xrSession.updateRenderState({
      baseLayer: new XRWebGLLayer(xrSession, gl)
    });

    xrRefSpace = await xrSession.requestReferenceSpace("local-floor");

    xrSession.addEventListener("end", onSessionEnded);

    badge.textContent = "XR Active";
    overlay.style.display = "none";
    btnExit.disabled = false;

    xrSession.requestAnimationFrame(onXRFrame);
  } catch (err) {
    console.warn("XR session failed.", err);
    btnEnter.disabled = false;
  }
};

const onXRFrame = (time, frame) => {
  const session = frame.session;
  const glLayer = session.renderState.baseLayer;

  gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

  const t = (time % 2000) / 2000;
  const r = 0.12 + 0.3 * Math.sin(t * Math.PI * 2);
  const g = 0.12 + 0.3 * Math.cos(t * Math.PI * 2);
  const b = 0.15;

  gl.clearColor(r, g, b, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  session.requestAnimationFrame(onXRFrame);
};

const endSession = async () => {
  if (xrSession) await xrSession.end();
};

const onSessionEnded = () => {
  xrSession = null;
  const btnEnter = document.getElementById("xr-enter");
  const btnExit = document.getElementById("xr-exit");
  const badge = document.getElementById("xr-badge");
  const overlay = document.getElementById("xr-overlay");

  btnEnter.disabled = false;
  btnExit.disabled = true;
  badge.textContent = "Idle";
  overlay.style.display = "";
};

document.addEventListener("DOMContentLoaded", setupXR);

