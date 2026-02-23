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
├── docs/
├── data/                 # runtime DB files (ignored)
├── build.js
└── README.md
```

## Platform Standards Applied

- Dark theme enforced platform-wide
- Header/navigation present across all HTML pages
- Footer/contact block present across all HTML pages
- Correct VISIVA® Experience App URL: `https://visiva.co.za/app`
- Official VISIVA® contact details used platform-wide

## Authentication Backend (Custom Node/Express + DB)

Implemented in `server/`:
- `server/index.js` — app bootstrap + static hosting + API mounting
- `server/auth.js` — login, logout, token auth, lockout logic, audit access
- `server/db.js` — SQLite schema, login attempt tracking, audit events
- `server/config.js` — runtime config + production env checks
- `server/seed-admin.js` — seed admin account from `.env`

### Auth Stack

- Express 4
- SQLite3
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- express-rate-limit (login protection)
- helmet + cors + cookie-parser
- dotenv

### API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me` (Bearer token or auth cookie)
- `GET /api/auth/audit/recent` (admin only)

## Portal Login Wiring

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

1. Copy env template:

```bash
cp .env.example .env
```

2. Set values in `.env`:

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

1. Enable Corepack:

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
- `http://localhost:4173/portal/login.html`

## Build Distribution

```bash
node build.js
```

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
- Keep DB files ignored (`data/*.db`, `data/*.sqlite`)
- Use HTTPS + reverse proxy for production

---

© 2026 VISIVA® Brand Design Studio
