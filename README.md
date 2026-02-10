# VISIVA® Platform  
Modernized 2026 Architecture — HTML, ES6+, WebXR, Node Build System

The VISIVA® Platform is a modular web environment designed to distribute 
knowledge, assets, and authenticated operations through a unified brand‑governed interface.

This environment includes:
- VISIVA® Platform Home
- VISIVA® Academy
- VISIVA® Marketplace
- VISIVA® Portal (Authentication)
- Modular JS architecture (ES6+)
- Modern WebXR support (cinematic.js)
- Automated Node.js build + ZIP packaging

---

## 📁 Project Structure

visiva-platform/
│ index.html  
│ academy/index.html  
│ marketplace/index.html  
│ portal/login.html  
│  
└─ assets/  
   ├── css/platform.css  
   ├── js/app.js  
   ├── js/ui.js  
   ├── js/guardian.js  
   └── js/cinematic.js  

build-visiva.js (Node bundler)

---

## 🚀 Quick Start

1. Install dependencies:


npm install archiver

2. Run the build script:


node build-visiva.js

This generates the full folder structure and a ZIP archive for distribution.

---

## 🧩 Core Technologies

- **HTML5** (modern layout, semantic structure)
- **CSS3** (responsive grid system, brand palette)
- **JavaScript ES6+** (modules, async/await)
- **WebXR** (immersive session support)
- **Node.js** (file generation + ZIP bundling)

---

## 🧠 VISIVA® Philosophy

Every module reinforces:
- System clarity  
- Brand consistency  
- Governance standards  
- Modern interface patterns  
- Immersive capability (XR)

---

## 🔐 Portal Access

The Portal login page includes:
- Clean authentication layout  
- Form validation hooks  
- Secure JS entry point  
- Gateway into controlled VISIVA® subsystems  

Real authentication should be integrated server‑side.

---

## 🕶 WebXR Integration

`cinematic.js` provides:
- async session setup  
- secure‑context validation  
- animation loop  
- session lifecycle events  

Extend this file to render 3D content.

---

## 🛠 UI Behavior (ui.js)

This module handles:
- Menu toggles  
- Navigation utilities  
- Low‑level UI interactions  

Import additional helpers as needed.

---

## 🛡 Governance Rules (guardian.js)

The Governance Layer logs warnings when restricted wording appears.  
Extend this to enforce approved VISIVA® terminology.

---

## 📦 Build System

`build-visiva.js` automatically:
- Generates directories  
- Writes all core files  
- Produces `visiva-platform.zip`

Update the `files{}` object to include new components.

---

## 🙌 Contributing

All additions must preserve:
- VISIVA® brand integrity  
- Modular patterns  
- Clear copy and UX structure  
- Accessibility and performance standards  

---

# © VISIVA® — Platform Architecture

---

Practical, professional guidance for teams maintaining or extending the platform.
# VISIVA® Developer Guidelines

This document outlines standards for extending the VISIVA® Platform across 
UI, logic, governance, and immersive technologies.

---

## 1. Branding Consistency

All additions must use:
- VISIVA® tone and terminology
- approved brand palette
- consistent header/footer structure
- accessible typography and spacing

Do not introduce new metaphors, naming conventions, or narrative language 
without approval.

---

## 2. HTML Standards

- Use semantic tags (<main>, <section>, <article>).
- Maintain mobile-first layouts.
- Avoid inline styles.
- Apply `platform.css` variables.
- Use H1 only once per page.

---

## 3. CSS Guidelines

- Use CSS variables from :root.
- Keep components modular using BEM-like patterns if needed.
- Minimize overrides; extend using utility classes.
- Ensure hover/active states meet accessibility contrast standards.

---

## 4. JavaScript Standards (ES6+)

- Always use const/let.
- Prefer arrow functions.
- Avoid global variables—use modules.
- Use async/await for asynchronous flows.
- Keep functions pure where possible.

---

## 5. WebXR (cinematic.js)

When extending XR:
- Only run XR in secure contexts (HTTPS).
- Gracefully degrade when unsupported.
- Keep animation loops lean.
- Use reference spaces appropriate to content ("local-floor" recommended).
- Encapsulate XR scenes within reusable classes.

---

## 6. Governance (guardian.js)

VISIVA® requires strict language governance.

Guidelines:
- Validate copy before publishing.
- Use the governance module to flag disallowed terms.
- Extend rule sets via JSON for clarity.
- Route violations into a central console or reporting system.

---

## 7. Portal Integration

Authentication requirements:
- Implement server-side credential validation.
- Sanitize all inputs before processing.
- Add lockout / rate limiting once backend is connected.
- Keep user feedback minimal but clear (“invalid credentials”).

---

## 8. Build System (Node.js)

- All generation scripts must use async/await.
- Use fs/promises for IO.
- Add new components by updating the `files{}` object.
- Do not hardcode paths; always use `path.join`.

---

## 9. File Naming & Organization

- Keep lowercase-dashed filenames (e.g., `brand-guidelines.html`).
- Group related files into feature directories.
- Avoid long nested structures where unnecessary.

---

## 10. Deployment Standards

- Serve through HTTPS only.
- Use lightweight servers or CDNs for static files.
- Version all changes via Git commits with descriptive messages.
- Maintain a staging environment for Academy and Marketplace content.

---

These guidelines ensure all VISIVA® modules remain aligned, scalable, consistent, 
and true to the platform’s architectural intent.

© VISIVA® — Platform Architecture