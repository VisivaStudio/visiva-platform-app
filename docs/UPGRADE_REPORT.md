# VISIVA® Advanced Upgrade Report

## Scope Completed

This upgrade pass reviewed and advanced the repository in four areas:

1. Authentication hardening
2. Backend operational controls
3. Platform information architecture
4. Documentation and runbook updates

## Backend Upgrades

- Added centralized config validation in `server/config.js`
- Added secure auth cookie support (HttpOnly, SameSite, expiry)
- Added platform route gate in `server/index.js` (`/platform/*` requires valid auth cookie)
- Added login lockout logic (window + attempt threshold)
- Added audit event logging and login attempt ledger in DB
- Added protected admin endpoint for recent audit events:
  - `GET /api/auth/audit/recent`

## Database Upgrades

Enhanced schema in `server/db.js`:

- `users`
- `login_attempts`
- `audit_events`

New DB methods:

- `insertLoginAttempt`
- `countRecentFailedAttempts`
- `insertAuditEvent`
- `getRecentAuditEvents`

## Frontend Auth Upgrades

- Login request now sends credentials with cookie-aware flow
- Protected page redirect logic retained for UX fallback
- Portal messaging remains clear for auth success/failure states

## Content + Platform Structure Upgrades

- Added new page: `platform/security.html`
- Added menu entry: **Security & Access** across platform mega-menu
- Added Security module card on `platform/overview.html`

## Configurable Security Controls

Environment variables now include:

- `LOCK_WINDOW_MINUTES`
- `LOCK_MAX_ATTEMPTS`
- `AUTH_COOKIE_NAME`

## Recommended Next Upgrades

1. Add role-based route gating beyond admin audit endpoint
2. Add password reset and account recovery workflows
3. Add user management UI for admin operations
4. Add API request logging pipeline (JSON logs + retention)
5. Add e2e auth tests for lockout and cookie route gating
