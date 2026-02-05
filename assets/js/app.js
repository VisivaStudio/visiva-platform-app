/* ==========================================================================
   VISIVA® — APP CORE
   Global scripts, animations, reveal effects, header behavior
   ========================================================================== */

/* Smooth Fade Reveal on Scroll
   Uses IntersectionObserver for performance */
const revealElements = document.querySelectorAll(".fade-up");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));


/* Sticky Header Shadow on Scroll */
const header = document.querySelector(".visiva-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});


/* Gold Hover Glow for Cinematic Buttons */
document.querySelectorAll(".btn-gold, .btn-gold-large").forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.classList.add("btn-glow"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("btn-glow"));
});
