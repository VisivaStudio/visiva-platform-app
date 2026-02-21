const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { findUserByIdentifier } = require('./db');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many login attempts. Try again in 15 minutes.' }
});

function getJwtSecret() {
  return process.env.JWT_SECRET || 'visiva-dev-secret-change-me';
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    getJwtSecret(),
    { expiresIn: '12h' }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ ok: false, message: 'Missing token.' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token.' });
  }
}

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const identifier = (req.body.identifier || '').trim();
    const password = req.body.password || '';

    if (!identifier || !password) {
      return res.status(400).json({ ok: false, message: 'Identifier and password are required.' });
    }

    const user = await findUserByIdentifier(identifier);
    if (!user || !user.active) {
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

    const token = signToken(user);
    return res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Login failed.', error: error.message });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ ok: true, user: req.user });
});

module.exports = { router, authMiddleware };
