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

© VISIVA® — Platform Architecture