<<<<<<< HEAD

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
>>>>>>>
# VISIVA® Platform

<<<<<<< HEAD
Modernized 2026 Architecture — HTML, ES6+, WebXR, Node Build System
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b

The VISIVA® Platform is a modular web environment designed to distribute
knowledge, assets, and authenticated operations through a unified brand‑governed interface

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
Unified VISIVA® web platform with:

- Public content pages (Home, Academy, Marketplace, Platform)
- Real authentication backend (Node/Express + SQLite + JWT)
- Build packaging to `visiva-platform/` and `visiva-platform.zip`

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
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
>>>>>>>
## Live Structure

<<<<<<< HEAD
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b
=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

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
├── docs/
├── data/                 # runtime DB files (ignored)
├── build.js
└── README.md
```

## Platform Standards Applied

<<<<<<< HEAD

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

- Dark theme enforced platform-wide
- Header/navigation present across all HTML pages
- Footer/contact block present across all HTML pages
- Correct VISIVA® Experience App URL: `https://visiva.co.za/app`
- Official VISIVA® contact details used platform-wide

<<<<<<< HEAD

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
>>>>>>>
## Authentication Backend (Custom Node/Express + DB)

Implemented in `server/`:

- `server/index.js` — app bootstrap + static hosting + API mounting
- `server/auth.js` — login, logout, token auth, lockout logic, audit access
- `server/db.js` — SQLite schema, login attempt tracking, audit events
- `server/config.js` — runtime config + production env checks
- `server/seed-admin.js` — seed admin account from `.env`

### Auth Stack

<<<<<<< HEAD
Install dependencies

npm install archiver

=======

- Express 4
- SQLite3
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- express-rate-limit (login protection)
- helmet + cors + cookie-parser
- dotenv

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
>>>>>>>
### API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me` (Bearer token or auth cookie)
- `GET /api/auth/audit/recent` (admin only)

<<<<<<< HEAD

Run the build script
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b
=======

## Portal Login Wiring
>>>>>>>
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

<<<<<<< HEAD
node build-visiva.js
>>>>>>> 1459b9e13c68841411d8a293b94645a17fbcb51b
=======
`portal/login.html` + `assets/js/app.js` now support real auth:

- Accepts **Email or Username** + **Password**
- Calls `POST /api/auth/login`
- Persists token locally and receives HttpOnly auth cookie
- Redirects to `platform/overview.html` on success
- Shows inline auth status/error messages

## Advanced Features Added

- Server-side protection for `/platform/*` using signed JWT cookie
- Login lockout controls using configurable thresholds
- Audit event trail and recent audit API for admin users
- New security content page: `platform/security.html`
- Upgrade report: `docs/UPGRADE_REPORT.md`

## Environment Setup
>>>>>>>
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

1. Copy env template:

```bash
cp .env.example .env
```

1. Set values in `.env`:

```env
PORT=4173
JWT_SECRET=replace-with-a-long-random-secret
AUTH_COOKIE_NAME=visiva_auth
LOCK_WINDOW_MINUTES=15
LOCK_MAX_ATTEMPTS=5
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@visiva.co.za
ADMIN_PASSWORD=change-me-now
```

## Local Run

> This repo uses Yarn 4 via Corepack.

<<<<<<< HEAD
Every module reinforces
=======

1. Enable Corepack:

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

<<<<<<< HEAD

- System clarity  
- Brand consistency  
- Governance standards  
- Modern interface patterns  
- Immersive capability (XR)

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

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

1. Seed initial admin:

=======

```bash
corepack yarn install
```

1. Seed initial admin:

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

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

1. Open:

=======

```bash
yarn serve
```

1. Open:

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

- `http://localhost:4173`
- `http://localhost:4173/portal/login.html`

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

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
Outputs:

- `visiva-platform/`
- `visiva-platform.zip`

## Scripts

- `yarn serve` — run Express + static platform
- `yarn seed:admin` — seed admin user
- `yarn build` — run `build.js`
- `yarn dev:web` / `yarn build:web` — Next.js scripts (if used)

## Troubleshooting

### Port already in use (`EADDRINUSE: 4173`)

<<<<<<< HEAD
Find and stop process:

`build-visiva.js` automatically:

- Generates directories  
- Writes all core files  
- Produces `visiva-platform.zip`

=======

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
kill <PID>
```

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
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
- Keep DB files ignored (`data/*.db`, `data/*.sqlite`)
- Use HTTPS + reverse proxy for production

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e

<<<<<<< HEAD

## Deployment Notes

© VISIVA® — Platform Architecture

=======
>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
---

<<<<<<< HEAD
Practical, professional guidance for teams maintaining or extending the platform

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
© 2026 VISIVA® Brand Design Studio

>>>>>>> caa0a343677ecc371e4cd3a7f5d8d09df431dd1e
