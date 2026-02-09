# VISIVA® Brand Design Platform

A cinematic operating system for brand intelligence, strategy, and design—built by VISIVA® Brand Design Studio.

---

## ✨ Overview

VISIVA® Brand Design Platform delivers a **cinematic front‑end experience** with:
- **Cinematic UI**: gold hover glow, on‑scroll reveals, sticky header states
- **Accessible Navigation**: dropdowns with click/keyboard/outside‑click + ESC support
- **Smooth Scrolling**: respects `prefers-reduced-motion`
- **Clean Architecture**: clear CSS layers and modular JavaScript
- **Zero‑build Stack**: deploy anywhere—no bundlers required

---

## 🗂️ Project Structure

/
├─ index.html
├─ assets/
│  ├─ css/
│  │  ├─ style.css        # Base brand tokens: type, color, spacing, buttons
│  │  └─ platform.css     # Layout, sections, header/nav, cinematic patterns
│  ├─ js/
│  │  └─ app.js           # Core interactions: dropdowns, scroll, effects
│  └─ images/             # Brand imagery, logos, backgrounds
├─ partials/               # (Optional) HTML includes/partials for future split
├─ tools/                  # (Optional) helper scripts, docs, checklists
└─ README.md

---

## Important rules:

CSS files contain only CSS.
JavaScript lives only in assets/js/*.js.
Avoid pasting HTML‑escaped code (e.g., &gt;) into .js files—use raw characters (>).


---


## 🔧 Getting Started

---
## Option A — Quick Preview (no install)

Clone or download the repo.
Open index.html in a local server (e.g., VS Code Live Server extension).
You’re ready to review the platform.

---
## Option B — Replit (already set up)

Open the live URL or import the repo to Replit, then run the project.
Update assets in assets/css/ and assets/js/, and hard refresh:

Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R

---
## Option C — GitHub Pages (optional)

In the repo, go to Settings → Pages.
Source: Deploy from a branch → main → root (/).
Save. Use the published URL for a public demo.

---

---

## 🧩 Features
Navigation

Dropdown menus with:

Click/tap to open
Keyboard support (Enter/Space)
ESC to close
Click‑outside to close


Works with common patterns:

.nav-item.has-dropdown + .dropdown-menu
.menu-item-has-children + .sub-menu



Motion & Interaction

Fade‑up reveal using IntersectionObserver
Smooth scroll honoring prefers-reduced-motion
Page transition hint on full navigations (excluded for in‑page anchors & dropdown toggles)
Gold button glow on hover (cinematic brand detail)

Accessibility

ARIA attributes for expanded/hidden states
Motion‑safe defaults
Keyboard navigability in menus

---

## 🧠 Implementation Notes
1) Include CSS & JS (order matters)
In index.html, ensure links and scripts are loaded in this order:

assets/css/style.css
<link rel="stylesheet" hrefets/js/app.js</script>

2) Dropdown HTML (sample)

<nav class="visiva-nav">
  <ul class="nav">
    <li class="nav-item has-dropdown">
      #Platform</a>
      <ul class="dropdown-menu">
        <li><a href="#eatures</a></li>
        <li>#componentsComponents</a></li>
        <li><a href="#docs/li>
      </ul>
    </li>
    <li class="nav-item"><a href="#/a></li>
    <li class="nav-item">#contactContact</a></li>
  </ul>
</nav>

3) JavaScript (already in assets/js/app.js)

Dropdown initializer (universal selectors)
Smooth scroll (ignores dropdown toggles & opt‑outs)
Page transition hint (only for real navigations)
Reveal on scroll
Sticky header shadow


If you add a new dropdown pattern, adapt selectors in the dropdown initializer to match your HTML.

---

## 🎨 CSS Guidelines
style.css (base & brand system)

Typography scale, line‑height, font stacks
Brand colors and CSS custom properties (--color-gold, --color-ink, etc.)
Buttons & links (default, hover, active, focus)
Utility classes (spacing, layout primitives)

platform.css (layouts & cinematic behavior)

Header, nav, hero sections, grids
States: .scrolled, .open, .active, .is-open
Reveal animations and transitions
Responsive breakpoints / media queries


Tip: Keep animation durations subtle (200–400ms) and test with reduced motion.

---

## ♿ Accessibility Checklist

 Keyboard can open/close dropdowns (Enter/Space/ESC)
 aria-expanded on toggles switches true/false
 aria-hidden set on menus when closed
 Visible focus states on interactive elements
 Motion respects prefers-reduced-motion
 Sufficient color contrast for text & UI

---

## 🚀 Performance Considerations

IntersectionObserver is efficient for reveals
Avoid unnecessary large images; use modern formats where possible
Defer JavaScript (defer attribute) to prevent render‑blocking
Limit heavy shadows/filters that cause paint thrashing
Prefer CSS transitions over JS animations where possible

---

## 🗺️ Roadmap

 Component docs (cards, modals, grids, forms)
 Dark mode tokens
 Keyboard focus trap for nested menus (optional)
 Improved reduced‑motion choreography set
 Extract brand tokens to :root for easy theming
 Add social preview image for the repo

---

## 🤝 Contributing (Internal)

This repository currently tracks internal platform work.
If you collaborate with partners:

Branch: feature/<short-name>
Commit messages: feat: …, fix: …, docs: …, refactor: …
Open a Pull Request with a concise walkthrough and screenshots/GIFs

---

## 📸 Screenshots (Add later)

Hero & Header — cinematic layout with sticky header state
Dropdown Navigation — open state on desktop + mobile
Scroll Reveal — fade‑up components in sections

(Place images in assets/images/ and reference here.)

---

## 📦 Tech Stack

HTML/CSS/JavaScript (no framework required)
IntersectionObserver for reveal effects
ARIA & A11y best practices for menus
Replit / GitHub Pages deploy friendly

---

## 🛡️ License

© 2026 VISIVA®. All Rights Reserved.
This repository is proprietary and not open‑source.

---

## 📬 Contact

VISIVA® Brand Design Studio — Centurion, Gauteng

Instagram • Facebook • Website

For platform work or collaboration inquiries: 
* info@visiva.co.za 
* +27 66 220 8586 | +27 73 292 2349
* https://visiva.co.za/app

---
# Made with ❤️ by VISIVA®
---
