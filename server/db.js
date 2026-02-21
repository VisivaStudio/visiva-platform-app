const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'visiva.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

async function initDb() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'contributor',
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const hasUsers = await get('SELECT id FROM users LIMIT 1');
  if (!hasUsers) {
    const username = process.env.ADMIN_USERNAME || '';
    const email = process.env.ADMIN_EMAIL || '';
    const password = process.env.ADMIN_PASSWORD || '';

    if (username && email && password) {
      const hash = await bcrypt.hash(password, 12);
      await run(
        'INSERT INTO users (username, email, password_hash, role, active) VALUES (?, ?, ?, ?, ?)',
        [username, email, hash, 'admin', 1]
      );
      console.log('[auth] Seeded initial admin user from environment variables.');
    } else {
      console.log('[auth] No users found. Set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD, then run `yarn seed:admin`.');
    }
  }
}

async function findUserByIdentifier(identifier) {
  return get(
    'SELECT id, username, email, password_hash, role, active FROM users WHERE username = ? OR email = ? LIMIT 1',
    [identifier, identifier]
  );
}

async function createAdminUser({ username, email, password }) {
  const hash = await bcrypt.hash(password, 12);
  return run(
    'INSERT INTO users (username, email, password_hash, role, active) VALUES (?, ?, ?, ?, ?)',
    [username, email, hash, 'admin', 1]
  );
}

module.exports = {
  db,
  initDb,
  findUserByIdentifier,
  createAdminUser,
  get,
  run
};
