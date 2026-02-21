require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { initDb } = require('./db');
const { router: authRouter } = require('./auth');

const app = express();
const rootDir = path.join(__dirname, '..');
const port = Number(process.env.PORT || 4173);

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'visiva-auth', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use(express.static(rootDir, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

async function start() {
  await initDb();
  app.listen(port, () => {
    console.log(`[server] VISIVA platform running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('[server] Startup failed:', err.message);
  process.exit(1);
});
