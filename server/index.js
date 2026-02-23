require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { initDb } = require('./db');
const { router: authRouter, verifyJwt } = require('./auth');
const { getConfig } = require('./config');

const app = express();
const rootDir = path.join(__dirname, '..');
const config = getConfig();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use((req, _res, next) => {
  req.requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'visiva-auth', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);

app.use('/platform', (req, res, next) => {
  const token = req.cookies?.[config.authCookieName];
  if (!token) {
    return res.redirect('/portal/login.html');
  }

  try {
    verifyJwt(token);
    return next();
  } catch {
    res.clearCookie(config.authCookieName, { path: '/' });
    return res.redirect('/portal/login.html');
  }
});

app.use(express.static(rootDir, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.use((err, req, res, _next) => {
  console.error(`[server] ${req.requestId} unhandled error:`, err.message);
  res.status(500).json({ ok: false, message: 'Unexpected server error.', requestId: req.requestId });
});

async function start() {
  await initDb();
  app.listen(config.port, () => {
    console.log(`[server] VISIVA platform running on http://localhost:${config.port}`);
  });
}

start().catch((err) => {
  console.error('[server] Startup failed:', err.message);
  process.exit(1);
});
