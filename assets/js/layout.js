/* ==========================================================================
   VISIVA® — LAYOUT CONTROLLER
   Handles DOM readiness, layout hooks, and resize orchestration
   ========================================================================== */

export function onDOMReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

export function onResize(callback) {
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1
      });
    }, 150);
  });
}

export function lockScroll() {
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  document.body.style.overflow = "";
}
``