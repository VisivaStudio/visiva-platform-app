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

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
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

  await run(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifier TEXT NOT NULL,
      ip TEXT NOT NULL,
      success INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS audit_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      event_type TEXT NOT NULL,
      event_data TEXT,
      ip TEXT,
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

async function insertLoginAttempt({ identifier, ip, success }) {
  return run(
    'INSERT INTO login_attempts (identifier, ip, success) VALUES (?, ?, ?)',
    [identifier, ip, success ? 1 : 0]
  );
}

async function countRecentFailedAttempts({ identifier, ip, windowMinutes }) {
  const row = await get(
    `SELECT COUNT(*) as total
     FROM login_attempts
     WHERE success = 0
       AND (identifier = ? OR ip = ?)
       AND datetime(created_at) >= datetime('now', ?)` ,
    [identifier, ip, `-${windowMinutes} minutes`]
  );
  return row?.total || 0;
}

async function insertAuditEvent({ userId = null, eventType, eventData = null, ip = null }) {
  return run(
    'INSERT INTO audit_events (user_id, event_type, event_data, ip) VALUES (?, ?, ?, ?)',
    [userId, eventType, eventData ? JSON.stringify(eventData) : null, ip]
  );
}

async function getRecentAuditEvents(limit = 20) {
  return all(
    'SELECT id, user_id, event_type, event_data, ip, created_at FROM audit_events ORDER BY id DESC LIMIT ?',
    [limit]
  );
}

module.exports = {
  db,
  initDb,
  findUserByIdentifier,
  createAdminUser,
  insertLoginAttempt,
  countRecentFailedAttempts,
  insertAuditEvent,
  getRecentAuditEvents,
  get,
  run,
  all
};
