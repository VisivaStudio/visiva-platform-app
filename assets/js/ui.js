/* ==========================================================================
   VISIVA® UI INTERACTIONS
   Mega menu, mobile nav, toggles, dropdowns, UI components
   ========================================================================== */


/* ===============================
   MOBILE MENU SYSTEM
=============================== */
const mobileMenuButton = document.createElement("button");
mobileMenuButton.classList.add("mobile-menu-btn");
mobileMenuButton.innerHTML = "☰";

const header = document.querySelector(".visiva-header");
header.appendChild(mobileMenuButton);

const navLinks = document.querySelector(".nav-links");

mobileMenuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    mobileMenuButton.classList.toggle("active");
});


/* Close menu when clicking a link (mobile) */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            mobileMenuButton.classList.remove("active");
        }
    });
});


/* ===============================
   MEGA MENU FADE-IN ON HOVER
=============================== */
document.querySelectorAll(".nav-item").forEach(item => {
    const menu = item.querySelector(".mega-menu");
    if (menu) {
        item.addEventListener("mouseenter", () => {
            menu.style.opacity = "1";
            menu.style.pointerEvents = "auto";
        });

        item.addEventListener("mouseleave", () => {
            menu.style.opacity = "0";
            menu.style.pointerEvents = "none";
        });
    }
});


/* ===============================
   TABS (Reusable Component)
=============================== */
document.querySelectorAll("[data-tabs]").forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll("[data-tab]");
    const contents = tabContainer.querySelectorAll("[data-content]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(c => {
                if (c.dataset.content === target) {
                    c.classList.add("active");
                } else {
                    c.classList.remove("active");
                }
            });
        });
    });
});


/* ===============================
   ACCORDION COMPONENT
=============================== */
document.querySelectorAll(".accordion").forEach(acc => {
    acc.addEventListener("click", () => {
        acc.classList.toggle("open");
        const panel = acc.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});
