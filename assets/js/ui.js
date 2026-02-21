/* ==========================================================================
   VISIVA® UI INTERACTIONS
   Dropdowns + mobile navigation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("primary-nav");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      mobileBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const dropdownToggles = document.querySelectorAll(".nav-item.has-dropdown > .dropdown-toggle");
  dropdownToggles.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const parent = btn.closest(".nav-item.has-dropdown");
      const expanded = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".nav-item.has-dropdown.open").forEach((item) => {
        if (item !== parent) {
          item.classList.remove("open");
          item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
        }
      });

      if (parent) {
        parent.classList.toggle("open", !expanded);
      }
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (!target.closest(".visiva-header")) {
      document.querySelectorAll(".nav-item.has-dropdown.open").forEach((item) => {
        item.classList.remove("open");
        item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
      });
      if (nav) nav.classList.remove("open");
      if (mobileBtn) mobileBtn.setAttribute("aria-expanded", "false");
    }
  });
});
