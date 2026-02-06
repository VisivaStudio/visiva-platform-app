# VISIVA® Brand Design Platform

## Overview

VISIVA® is a static marketing website for a cinematic brand design platform. It's a multi-page HTML/CSS/JS site with no backend, no build tools, and no framework — just vanilla web technologies. The site showcases various brand platform modules (Intelligence Engine, Brand DNA, Guardian AI, AR/VR, etc.) and tools. Most platform subpages are placeholder/scaffold pages with content marked as "being restored."

The visual identity follows a "Cinematic Noir + Hybrid Gold" design system with dark backgrounds, gold accents, parallax effects, and scroll-triggered animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure static site**: No frameworks, no bundlers, no build step. All pages are standalone `.html` files with relative links to shared CSS and JS assets.
- **CSS Design System**: Custom properties (CSS variables) defined in `assets/css/style.css` provide a full design token system covering colors (noir palette, gold accents), spacing, typography scale, border radii, and shadow/glow effects.
- **CSS is split into three files**:
  - `style.css` — Global variables, base typography, layout primitives
  - `components.css` — Reusable UI components (buttons, cards)
  - `platform.css` — Page-specific hero sections and layouts
- **JavaScript modules** (no bundler):
  - `app.js` — IntersectionObserver scroll reveals, sticky header behavior, smooth scrolling
  - `ui.js` — Mobile hamburger menu creation, mega menu hover interactions
  - `cinematic.js` — Parallax scrolling effects, additional reveal animations
  - `layout.js` — Attempted partial injection system for header/footer (incomplete/broken)
- **Three.js** is used on the tools page (`tools/index.html`) via CDN ES module import for a WebXR/3D canvas experience.

### Page Structure
- **`index.html`** — Homepage with hero section, links to Platform and Tools
- **`platform/`** — 12 subpages (overview, philosophy, process, bie, dna, guardian-ai, ar-vr, universe, health-check, licensing, vault, timeline). All follow an identical template structure with a hero section and placeholder content.
- **`tools/index.html`** — Tools page with embedded Three.js WebXR canvas
- **`partials/`** — Header and footer HTML fragments intended for injection via `layout.js`, but the partials contain broken/malformed HTML

### Navigation
- Top navigation bar with a mega-menu dropdown for Platform subpages
- Mobile hamburger menu dynamically created via JavaScript
- Navigation is duplicated across every HTML file (no template engine)

### Key Issues to Be Aware Of
- The `partials/header.html` and `partials/footer.html` files contain severely malformed HTML (missing tags, broken href attributes). They are not currently functional.
- Many platform subpages have incomplete HTML (missing closing `</footer>`, `</body>`, `</html>` tags).
- The `layout.js` file mixes JavaScript and CSS in the same file and has an incomplete function.
- There is no build system, package manager, or server-side logic — this is meant to be served as static files.

### Directory Structure
```
/
├── index.html                  # Homepage
├── platform/                   # Platform module pages (12 pages)
│   ├── overview.html
│   ├── philosophy.html
│   ├── process.html
│   ├── bie.html
│   ├── dna.html
│   ├── guardian-ai.html
│   ├── ar-vr.html
│   ├── universe.html
│   ├── health-check.html
│   ├── licensing.html
│   ├── vault.html
│   └── timeline.html
├── tools/
│   └── index.html              # Tools page with Three.js
├── partials/                   # HTML fragments (broken)
│   ├── header.html
│   └── footer.html
└── assets/
    ├── css/
    │   ├── style.css           # Design tokens & global styles
    │   ├── components.css      # UI component styles
    │   └── platform.css        # Platform page layouts
    ├── js/
    │   ├── app.js              # Core scroll/reveal logic
    │   ├── ui.js               # Mobile menu & mega menu
    │   ├── cinematic.js        # Parallax & effects
    │   └── layout.js           # Partial injection (incomplete)
    └── images/                 # Image assets (logo, hero backgrounds)
```

## External Dependencies

- **Three.js v0.160.0** — Loaded via CDN (`unpkg.com`) as an ES module on the tools page for 3D/WebXR rendering. No other external libraries or dependencies are used.
- **No package manager** — No `package.json`, no npm/yarn. Everything is vanilla or CDN-loaded.
- **No database** — Entirely static content.
- **No backend/API** — No server-side processing.
- **External links reference**:
  - `visiva.co.za/experience-app` — External experience app
  - Instagram and LinkedIn social profiles