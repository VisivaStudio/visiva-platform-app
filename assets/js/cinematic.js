/* ==========================================================================
   VISIVA® CINEMATIC EFFECTS
   Parallax, reveal animations, scroll effects
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* Intersection Observer for reveal animations */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-up, .fade-in, .scale-up").forEach(el => {
        revealObserver.observe(el);
    });

    /* Simple Parallax for hero */
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector(".hero-bg");
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});
