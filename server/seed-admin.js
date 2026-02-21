require('dotenv').config();
const { initDb, get, createAdminUser } = require('./db');

async function main() {
  await initDb();

  const username = process.env.ADMIN_USERNAME || '';
  const email = process.env.ADMIN_EMAIL || '';
  const password = process.env.ADMIN_PASSWORD || '';

  if (!username || !email || !password) {
    throw new Error('Set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env before running seed.');
  }

  const existing = await get('SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1', [username, email]);
  if (existing) {
    console.log('[seed] Admin user already exists for this username/email.');
    return;
  }

  await createAdminUser({ username, email, password });
  console.log('[seed] Admin user created.');
}

main().catch((err) => {
  console.error('[seed] Failed:', err.message);
  process.exit(1);
});
