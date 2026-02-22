# VISIVA® Platform

Unified VISIVA® web platform with:
- Public content pages (Home, Academy, Marketplace, Platform)
- Real authentication backend (Node/Express + SQLite + JWT)
- Build packaging to `visiva-platform/` and `visiva-platform.zip`

## Live Structure

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

## Authentication Backend (Custom Node/Express + DB)

Implemented in `server/`:
- `server/index.js` — app bootstrap + static hosting + API mounting
- `server/auth.js` — login, token auth, rate limiting
- `server/db.js` — SQLite setup, user lookup, admin creation
- `server/seed-admin.js` — seed admin account from `.env`

### Auth Stack

- Express 4
- SQLite3
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- express-rate-limit (login protection)
- helmet + cors
- dotenv

### API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)

## Portal Login Wiring

`portal/login.html` + `assets/js/app.js` now support real auth:
- Accepts **Email or Username** + **Password**
- Calls `POST /api/auth/login`
- Stores token/user in `localStorage`
- Redirects to `platform/overview.html` on success
- Shows inline auth status/error messages

## Environment Setup

1. Copy env template:

```bash
cp .env.example .env
```

2. Set values in `.env`:

```env
PORT=4173
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@visiva.co.za
ADMIN_PASSWORD=change-me-now
```

## Local Run

> This repo uses Yarn 4 via Corepack.

1. Enable Corepack (one-time):

```bash
corepack enable
```

2. Install dependencies:

```bash
corepack yarn install
```

3. Seed initial admin:

```bash
yarn seed:admin
```

4. Start server:

```bash
yarn serve
```

5. Open:

- `http://localhost:4173`
- Login page: `http://localhost:4173/portal/login.html`

## Build Distribution

```bash
node build.js
```

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

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
kill <PID>
```

Or run on a different port:

```bash
PORT=4174 yarn serve
```

## Security Notes

- Change `JWT_SECRET` before production
- Do not commit `.env`
- DB files are ignored via `.gitignore`
- Add HTTPS + reverse proxy + secure cookie strategy for production deployment

## Deployment Notes

A Vercel `DEPLOYMENT_NOT_FOUND` usually means no current deployment alias/URL. Re-deploy and confirm routes include static pages and API handling strategy (or deploy backend separately).

---

© 2026 VISIVA® Brand Design Studio
