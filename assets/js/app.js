/* ==========================================================================
   VISIVA® — APP CORE
   Global scripts, animations, reveal effects, header behavior
   ========================================================================== */

/* =========================
   Dropdown Navigation
   =========================
   Assumptions (adjust selectors to match your HTML):
   - Each dropdown item has:    .nav-item.has-dropdown
   - The clickable toggle has:  .dropdown-toggle  (often an <a> or <button>)
   - The dropdown panel has:    .dropdown-menu
   - The main nav wrapper:      .visiva-nav  (for click-outside close)
*/
(function initDropdowns() {
  const nav = document.querySelector(".visiva-nav");
  const items = document.querySelectorAll(".nav-item.has-dropdown");

  if (!items.length) return;

  // Close all helper
  const closeAll = (except = null) => {
    items.forEach(item => {
      if (item !== except) {
        item.classList.remove("open");
        const toggle = item.querySelector(".dropdown-toggle");
        const menu = item.querySelector(".dropdown-menu");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        if (menu) menu.setAttribute("aria-hidden", "true");
      }
    });
  };

  // Click to toggle (mobile + keyboard support)
  items.forEach(item => {
    const toggle = item.querySelector(".dropdown-toggle");
    const menu = item.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    // Identify this element so other handlers can ignore it
    toggle.setAttribute("data-dropdown-toggle", "true");

    // Prevent default for common '#' toggles
    toggle.addEventListener("click", (e) => {
      // If toggle is an <a> with href="#", prevent scroll-to-top
      const href = toggle.getAttribute("href");
      if (href && href.trim() === "#") {
        e.preventDefault();
      }
      e.stopPropagation();

      const isOpen = item.classList.contains("open");
      closeAll(isOpen ? null : item);
      item.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      menu.setAttribute("aria-hidden", String(isOpen));
    });

    // Keyboard access: open on Enter/Space
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    // If click is outside the nav, close all
    if (!nav || !nav.contains(e.target)) {
      closeAll();
    }
  });

  // ESC to close any open dropdowns
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();
``
