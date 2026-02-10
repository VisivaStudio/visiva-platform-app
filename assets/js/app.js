/* ==========================================================================
   VISIVA® — APP CORE
   Animations, navigation, UX polish
   ========================================================================== */

/* ------------------------------------------
   Fade-up reveal on scroll (safe)
------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("VISIVA® Portal: authentication attempt registered.");
    });
  }

  console.log("VISIVA® Platform initialized.");
});
/* ------------------------------------------
   Sticky header shadow
------------------------------------------ */
const header = document.querySelector(".visiva-header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ------------------------------------------
   Smooth anchor scroll (dynamic header height)
------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const headerOffset =
      document.querySelector(".visiva-header")?.offsetHeight || 80;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: target.offsetTop - headerOffset,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
});

/* ------------------------------------------
   Mobile menu toggle
------------------------------------------ */
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

/* ------------------------------------------
   Dropdown toggles (mobile-friendly)
------------------------------------------ */
document.querySelectorAll(".nav-item.has-dropdown > .dropdown-toggle")
  .forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      btn.closest(".nav-item")?.classList.toggle("open");
    });
  });

/* ------------------------------------------
   Button gold glow
------------------------------------------ */
document
  .querySelectorAll(".btn-gold, .btn-gold-large")
  .forEach(btn => {
    btn.addEventListener("mouseenter", () =>
      btn.classList.add("btn-glow")
    );
    btn.addEventListener("mouseleave", () =>
      btn.classList.remove("btn-glow")
    );
  });
  
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("VISIVA® Portal: authentication attempt registered.");
    });
  }

  console.log("VISIVA® Platform initialized.");