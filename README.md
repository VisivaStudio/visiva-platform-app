<<<<<<< HEAD

# VISIVA® Platform

Modernized 2026 Architecture — HTML, ES6+, WebXR, Node Build System
=======

# VISIVA® Platform
>>>>>>>
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
The VISIVA® Platform is a modular web environment designed to distribute
knowledge, assets, and authenticated operations through a unified brand‑governed interface
=======

Unified VISIVA® web platform with:

- Public content pages (Home, Academy, Marketplace, Platform)
- Real authentication backend (Node/Express + SQLite + JWT)
- Build packaging to `visiva-platform/` and `visiva-platform.zip`

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
This environment includes:

- VISIVA® Platform Home
- VISIVA® Academy
- VISIVA® Marketplace
- VISIVA® Portal (Authentication)
- Modular JS architecture (ES6+)
- Modern WebXR support (cinematic.js)
- Automated Node.js build + ZIP packaging
=======

## Live Structure
>>>>>>>
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

```text
.
├── index.html
├── academy/
├── marketplace/
├── portal/
├── platform/
├── partials/
├── assets/
├── server/
├── data/                 # runtime DB files (ignored)
├── build.js
└── README.md
```

## Platform Standards Applied

<<<<<<< HEAD
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
=======

- Dark theme enforced platform-wide
- Header/navigation present across all HTML pages
- Footer/contact block present across all HTML pages
- Correct VISIVA® Experience App URL:
  - `https://visiva.co.za/app`
- Correct official VISIVA® contact info:
  - Address: Centurion, The Reeds, South Africa
  - Website: `https://visiva.co.za`
  - Email: `info@visiva.co.za`
  - Phone: `+27 66 220 8586`
  - WhatsApp: `+27 73 292 2349`
  - Instagram: `https://instagram.com/visivabranddesignstudio`

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

## Authentication Backend (Custom Node/Express + DB)

Implemented in `server/`:

- `server/index.js` — app bootstrap + static hosting + API mounting
- `server/auth.js` — login, token auth, rate limiting
- `server/db.js` — SQLite setup, user lookup, admin creation
- `server/seed-admin.js` — seed admin account from `.env`

### Auth Stack

<<<<<<< HEAD
Install dependencies
=======

- Express 4
- SQLite3
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- express-rate-limit (login protection)
- helmet + cors
- dotenv

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
npm install archiver
=======

### API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
Run the build script
=======

## Portal Login Wiring
>>>>>>>
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
node build-visiva.js
=======

`portal/login.html` + `assets/js/app.js` now support real auth:

- Accepts **Email or Username** + **Password**
- Calls `POST /api/auth/login`
- Stores token/user in `localStorage`
- Redirects to `platform/overview.html` on success
- Shows inline auth status/error messages

## Environment Setup
>>>>>>>
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

1. Copy env template:

```bash
cp .env.example .env
```

1. Set values in `.env`:

```env
PORT=4173
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@visiva.co.za
ADMIN_PASSWORD=change-me-now
```

## Local Run

> This repo uses Yarn 4 via Corepack.

<<<<<<< HEAD
Every module reinforces:

- System clarity  
- Brand consistency  
- Governance standards  
- Modern interface patterns  
- Immersive capability (XR)
=======

1. Enable Corepack (one-time):

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

```bash
corepack enable
```

1. Install dependencies:

<<<<<<< HEAD
The Portal login page includes:

- Clean authentication layout  
- Form validation hooks  
- Secure JS entry point  
- Gateway into controlled VISIVA® subsystems  
=======

```bash
corepack yarn install
```

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

1. Seed initial admin:

```bash
yarn seed:admin
```

1. Start server:

<<<<<<< HEAD
`cinematic.js` provides:

- async session setup  
- secure‑context validation  
- animation loop  
- session lifecycle events  
=======

```bash
yarn serve
```

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

1. Open:

- `http://localhost:4173`
- Login page: `http://localhost:4173/portal/login.html`

## Build Distribution

<<<<<<< HEAD
This module handles:

- Menu toggles  
- Navigation utilities  
- Low‑level UI interactions  
=======

```bash
node build.js
```

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

Outputs:

- `visiva-platform/`
- `visiva-platform.zip`

## Scripts

From `package.json`:

- `yarn serve` — run Express + static platform
- `yarn seed:admin` — seed admin user
- `yarn build` — run `build.js`
- `yarn dev:web` / `yarn build:web` — Next.js scripts (if used)

## Troubleshooting

### Port already in use (`EADDRINUSE: 4173`)

Find and stop process:

<<<<<<< HEAD
`build-visiva.js` automatically:

- Generates directories  
- Writes all core files  
- Produces `visiva-platform.zip`
=======

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
kill <PID>
```

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

Or run on a different port:

```bash
PORT=4174 yarn serve
```

## Security Notes

<<<<<<< HEAD
All additions must preserve:

- VISIVA® brand integrity  
- Modular patterns  
- Clear copy and UX structure  
- Accessibility and performance standards  
=======
- Change `JWT_SECRET` before production
- Do not commit `.env`
- DB files are ignored via `.gitignore`
- Add HTTPS + reverse proxy + secure cookie strategy for production deployment

>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

## Deployment Notes

<<<<<<< HEAD
© VISIVA® — Platform Architecture
=======

A Vercel `DEPLOYMENT_NOT_FOUND` usually means no current deployment alias/URL. Re-deploy and confirm routes include static pages and API handling strategy (or deploy backend separately).
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

---

<<<<<<< HEAD
Practical, professional guidance for teams maintaining or extending the platform
=======

© 2026 VISIVA® Brand Design Studio
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

<<<<<<< HEAD
VISIVA® Developer Guidelines

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

- Use semantic tags (main, section, article).
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

=======
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b
