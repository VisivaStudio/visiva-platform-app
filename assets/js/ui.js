/* ==========================================================================
   VISIVA® UI INTERACTIONS
   Mega menu, mobile nav, tabs, timeline modal, accordion
   ========================================================================== */

export const toggleMenu = (button, menu) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("visible");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach((btn) => {
    const menu = btn.nextElementSibling;
    if (menu) toggleMenu(btn, menu);
  });
});
  });
})();