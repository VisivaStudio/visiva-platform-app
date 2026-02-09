# ✅ STEP C — QA CHECKLIST
## VISIVA® Platform v2 — Cinematic Brand OS

Pre‑release validation checklist for UI, motion, navigation, and XR (VR/AR).

---

## 1) GLOBAL NAVIGATION & LAYOUT

### ✅ Desktop (≥1024px)
- [ ] Header visible on load with **no layout shift**
- [ ] Mega‑menu opens on hover / click (as designed)
- [ ] Dropdowns:
  - [ ] Close on outside click
  - [ ] Do not stack or duplicate on re‑open
- [ ] Active page state is correct
- [ ] Header shadow appears only after scroll threshold
- [ ] Footer links resolve correctly across all sections

### ✅ Mobile (≤768px)
- [ ] Hamburger opens mobile drawer
- [ ] Body scroll locks when drawer is open
- [ ] Nested nav expands / collapses correctly
- [ ] Drawer closes on:
  - [ ] Link click
  - [ ] Outside tap
- [ ] No double‑tap or ghost click issues

**Pass condition:** No duplicate bindings, no scroll bleed, no stuck open states.

---

## 2) SMOOTH SCROLL & ANCHORS

### ✅ Internal Anchors
- [ ] Smooth scroll works across:
  - Platform pages
  - Tools index sections
- [ ] Scroll offset accounts for fixed header height
- [ ] Target sections are not hidden under header
- [ ] No jump before smooth animation starts

### ✅ Edge Cases
- [ ] Anchors work after page reload
- [ ] Anchors work when navigated from another page
- [ ] No malformed `#` or empty anchors

**Pass condition:** Scroll feels intentional, cinematic, and precise.

---

## 3) REVEAL / CINEMATIC ANIMATIONS

### ✅ Scroll Reveals
- [ ] Reveal triggers only once per element
- [ ] No flicker on fast scroll
- [ ] Animations stagger correctly
- [ ] Animations do not re‑fire on resize

### ✅ Performance
- [ ] No jank on mid‑range hardware
- [ ] No layout thrashing
- [ ] Reduced‑motion preference respected (if implemented)

**Pass condition:** Motion enhances hierarchy, never distracts.

---

## 4) MODALS, TABS & ACCORDIONS

### ✅ Modals (Timeline, etc.)
- [ ] Open with correct content
- [ ] Close via:
  - [ ] Close button
  - [ ] ESC key
  - [ ] Outside click
- [ ] Body scroll locked while open
- [ ] Focus returns to trigger element on close

### ✅ Tabs / Accordions
- [ ] One active state at a time
- [ ] No content duplication on re‑click
- [ ] State persists visually during scroll
- [ ] Keyboard navigation works (if applicable)

**Pass condition:** No “zombie” UI states after repeated interaction.

---

## 5) XR — GENERAL GATING & MESSAGING

### ✅ Environment Checks
- [ ] Site served over **HTTPS** (or localhost)
- [ ] If not secure:
  - XR buttons disabled
  - Clear message shown (“XR requires HTTPS”)

### ✅ Capability Detection
- [ ] Browser without WebXR:
  - Buttons disabled
  - Clear fallback message
- [ ] VR‑only device:
  - VR enabled
  - AR disabled with explanation
- [ ] AR‑capable mobile:
  - Both buttons enabled

**Pass condition:** User always understands why a feature is unavailable.

---

## 6) VR MODE (immersive‑vr)

### ✅ Session Start
- [ ] Clicking **Enter VR** requests session successfully
- [ ] Enters headset view
- [ ] Renderer switches to XR without errors
- [ ] Single render loop remains active

### ✅ In‑Session
- [ ] Scene visible and centered
- [ ] Lighting behaves correctly
- [ ] Ring animates subtly
- [ ] No console errors during session

### ✅ Session End
- [ ] Session ends cleanly
- [ ] Returns to flat view
- [ ] No frozen canvas
- [ ] No duplicate sessions on re‑enter

**Pass condition:** VR feels stable and intentional.

---

## 7) AR MODE (immersive‑ar)

### ✅ Session Start
- [ ] Clicking **Enter AR** requests camera permission
- [ ] Enters AR view successfully
- [ ] Page background becomes transparent
- [ ] No VR ground plane visible

### ✅ Hit‑Test / Reticle
- [ ] Reticle appears only when surface detected
- [ ] Reticle aligns flat to detected plane
- [ ] Reticle hides when no surface found

### ✅ Placement
- [ ] Tap / select places ring at reticle position
- [ ] Ring orientation is correct (flat on surface)
- [ ] Ring remains stable after placement

### ✅ Fallbacks
- [ ] If hit‑test unsupported:
  - AR session fails gracefully
  - Clear message shown

**Pass condition:** AR placement feels intuitive and magical.

---

## 8) PERFORMANCE & CLEANUP

### ✅ Memory / State
- [ ] No multiple `requestAnimationFrame` loops
- [ ] No accumulating event listeners
- [ ] XR hit‑test source cleaned on session end
- [ ] Renderer reused across modes

### ✅ Console
- [ ] No uncaught errors
- [ ] No repeated warnings on resize or session toggles

**Pass condition:** Page survives repeated VR/AR enter/exit cycles.

---

## 9) CROSS‑PAGE CONSISTENCY

- [ ] Header/footer identical across:
  - Platform pages
  - Tools pages
- [ ] CSS loads only once per page
- [ ] No broken images or missing assets
- [ ] All links root‑relative and resolvable

**Pass condition:** Platform feels like one cohesive system.

---

## ✅ FINAL SIGN‑OFF

Ready to ship when:
- XR modes fail gracefully where unsupported
- No duplicate UI bindings
- No console errors
- Motion, UI, and XR feel *designed*, not experimental
