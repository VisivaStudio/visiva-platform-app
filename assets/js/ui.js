/* ==========================================================================
   VISIVA® UI INTERACTIONS
   Mega menu, mobile nav, tabs, timeline modal, accordion
   ========================================================================== */

/* ===============================
   MOBILE MENU SYSTEM
=============================== */
(function initMobileMenu() {
  const header = document.querySelector(".visiva-header");
  const navLinks = document.querySelector(".nav-links");
  if (!header || !navLinks) return;

  // If a mobile button is not present in HTML, create one
  let mobileMenuButton = header.querySelector(".mobile-menu-btn");
  if (!mobileMenuButton) {
    mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("mobile-menu-btn");
    mobileMenuButton.setAttribute("aria-label", "Open menu");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-controls", "primary-nav");
    mobileMenuButton.textContent = "☰";
    header.appendChild(mobileMenuButton);
  }

  if (!mobileMenuButton.dataset.bound) {
    mobileMenuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileMenuButton.classList.toggle("active", isOpen);
      mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    });
    mobileMenuButton.dataset.bound = "1";
  }

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    if (!link.dataset.bound) {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          mobileMenuButton.classList.remove("active");
          mobileMenuButton.setAttribute("aria-expanded", "false");
        }
      });
      link.dataset.bound = "1";
    }
  });
})();

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

/* ===============================
   MEGA MENU FADE-IN ON HOVER (desktop)
=============================== */
(function initMegaMenuHover() {
  document.querySelectorAll(".nav-item").forEach(item => {
    const menu = item.querySelector(".mega-menu");
    if (!menu) return;
    item.addEventListener("mouseenter", () => {
      menu.style.opacity = "1";
      menu.style.pointerEvents = "auto";
    });
    item.addEventListener("mouseleave", () => {
      menu.style.opacity = "0";
      menu.style.pointerEvents = "none";
    });
  });
})();

/* ===============================
   TABS (Reusable Component)
=============================== */
(function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll("[data-tab]");
    const contents = tabContainer.querySelectorAll("[data-content]");

    tabs.forEach(tab => {
      if (tab.dataset.bound) return;
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        contents.forEach(c => {
          c.classList.toggle("active", c.dataset.content === target);
        });
      });
      tab.dataset.bound = "1";
    });
  });
})();

/* ===========================
   TIMELINE MODAL LOGIC
=========================== */
(function initTimelineModal() {
  const modal      = document.getElementById('timelineModal');
  if (!modal) return; // Not on every page

  const modalTitle = document.getElementById('modalTitle');
  const modalDate  = document.getElementById('modalDate');
  const modalBody  = document.getElementById('modalBody');
  const modalType  = document.getElementById('modalType');
  const modalLinks = document.getElementById('modalLinks');
  const closeBtn   = document.querySelector('.timeline-modal-close');
  const backdrop   = document.querySelector('.timeline-modal-backdrop');

  function openModalFromCard(card) {
    modalTitle.textContent = card.dataset.title || '';
    modalDate.textContent  = card.dataset.date || '';
    modalType.textContent  = card.dataset.type || '';
    modalBody.innerHTML    = `<p>${card.dataset.description || ''}</p>`;

    modalLinks.innerHTML = '';
    if (card.dataset.links) {
      try {
        JSON.parse(card.dataset.links).forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.label;
          a.target = "_blank";
          a.rel = "noopener";
          modalLinks.appendChild(a);
        });
      } catch (e) {
        console.warn('Invalid timeline links JSON', e);
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Open modal from any timeline card
  document.querySelectorAll('.timeline-card').forEach(card => {
    if (card.dataset.bound) return;
    card.addEventListener('click', () => openModalFromCard(card));
    card.dataset.bound = "1";
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ===============================
   ACCORDION COMPONENT
=============================== */
(function initAccordion() {
  document.querySelectorAll(".accordion").forEach(acc => {
    if (acc.dataset.bound) return;
    acc.addEventListener("click", () => {
      acc.classList.toggle("open");
      const panel = acc.nextElementSibling;
      if (!panel) return;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
    acc.dataset.bound = "1";
  });
})();