/* =========================
   Dropdown Navigation — Robust binding
   Supports common WordPress/custom patterns:
   - Item: .nav-item.has-dropdown OR .menu-item-has-children
   - Toggle: .dropdown-toggle OR direct <a> inside the item
   - Menu: .dropdown-menu OR .sub-menu / .submenu
========================= */
(function initDropdownsUniversal() {
  const items = document.querySelectorAll(
    ".nav-item.has-dropdown, .menu-item-has-children"
  );
  if (!items.length) return;

  const getToggle = (item) =>
    item.querySelector(".dropdown-toggle") ||
    item.querySelector(":scope > a, :scope > button");

  const getMenu = (item) =>
    item.querySelector(".dropdown-menu, .sub-menu, .submenu");

  const closeAll = (except = null) => {
    items.forEach((it) => {
      if (it !== except) {
        it.classList.remove("open", "active", "is-open");
        const t = getToggle(it);
        const m = getMenu(it);
        if (t) t.setAttribute("aria-expanded", "false");
        if (m) m.setAttribute("aria-hidden", "true");
      }
    });
  };

  items.forEach((item) => {
    const toggle = getToggle(item);
    const menu = getMenu(item);
    if (!toggle || !menu) return;

    // Mark so global handlers ignore this click
    toggle.setAttribute("data-dropdown-toggle", "true");
    if (!menu.style.zIndex) menu.style.zIndex = "1000"; // safety

    toggle.addEventListener("click", (e) => {
      const href = toggle.getAttribute("href");
      if (href && href.trim() === "#") e.preventDefault(); // prevent jump
      e.stopPropagation();

      const isOpen =
        item.classList.contains("open") ||
        item.classList.contains("active") ||
        item.classList.contains("is-open");

      closeAll(isOpen ? null : item);

      // Apply all common open classes for compatibility
      item.classList.toggle("open", !isOpen);
      item.classList.toggle("active", !isOpen);
      item.classList.toggle("is-open", !isOpen);

      toggle.setAttribute("aria-expanded", String(!isOpen));
      menu.setAttribute("aria-hidden", String(isOpen));
    });

    // Keyboard access
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    const nav =
      document.querySelector(".visiva-nav, .site-header, nav, .main-nav") || null;
    if (nav ? !nav.contains(e.target) : true) closeAll();
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();
``
