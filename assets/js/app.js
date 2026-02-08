/* ==========================================================================
   VISIVA® — APP CORE
   Global scripts, animations, reveal effects, header behavior
   ========================================================================== */

/* Smooth Fade Reveal on Scroll */
const revealElements = document.querySelectorAll(".fade-up");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* Sticky Header Shadow on Scroll */
const header = document.querySelector(".visiva-header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  });
});

/* Mobile Page Transition Hint */
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.add("page-transition");
  });
});

/* Gold Hover Glow for Cinematic Buttons */
document.querySelectorAll(".btn-gold, .btn-gold-large").forEach(btn => {
  btn.addEventListener("mouseenter", () => btn.classList.add("btn-glow"));
  btn.addEventListener("mouseleave", () => btn.classList.remove("btn-glow"));
});
