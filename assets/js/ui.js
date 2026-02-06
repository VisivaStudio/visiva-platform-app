/* ==========================================================================
   VISIVA® UI INTERACTIONS
   Mega menu, mobile nav, toggles, dropdowns, UI components
   ========================================================================== */

/* Safely execute a function only if all required elements exist */
function safe(elements, callback) {
    if (elements.every(el => el !== null)) {
        callback(...elements);
    }
}

/* ===============================
   MOBILE MENU SYSTEM
=============================== */
const header = document.querySelector(".visiva-header");
const navLinks = document.querySelector(".nav-links");

if (header && navLinks) {
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("mobile-menu-btn");
    mobileMenuButton.innerHTML = "☰";
    header.appendChild(mobileMenuButton);

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
}

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

/* ===========================
   TIMELINE MODAL LOGIC
   =========================== */
const modal = document.getElementById('timelineModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalBody = document.getElementById('modalBody');
const modalType = document.getElementById('modalType');
const modalLinks = document.getElementById('modalLinks');
const closeBtn = document.querySelector('.timeline-modal-close');
const backdrop = document.querySelector('.timeline-modal-backdrop');

if (modal && closeBtn && backdrop) {
    /* Open modal from any timeline card */
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('click', () => {
            if (modalTitle) modalTitle.textContent = card.dataset.title || '';
            if (modalDate) modalDate.textContent = card.dataset.date || '';
            if (modalType) modalType.textContent = card.dataset.type || '';
            if (modalBody) modalBody.innerHTML = `<p>${card.dataset.description || ''}</p>`;

            if (modalLinks) {
                modalLinks.innerHTML = '';
                if (card.dataset.links) {
                    try {
                        JSON.parse(card.dataset.links).forEach(link => {
                            const a = document.createElement('a');
                            a.href = link.url;
                            a.textContent = link.label;
                            modalLinks.appendChild(a);
                        });
                    } catch (e) { console.error("Error parsing timeline links", e); }
                }
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    /* Close handlers */
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
}

/* ===============================
   ACCORDION COMPONENT
=============================== */
document.querySelectorAll(".accordion").forEach(acc => {
    acc.addEventListener("click", () => {
        acc.classList.toggle("open");
        const panel = acc.nextElementSibling;
        if (panel) {
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    });
});
