const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const {
  findUserByIdentifier,
  insertLoginAttempt,
  countRecentFailedAttempts,
  insertAuditEvent,
  getRecentAuditEvents
} = require('./db');
const { getConfig } = require('./config');

const router = express.Router();
const config = getConfig();

const loginLimiter = rateLimit({
  windowMs: config.lockWindowMinutes * 60 * 1000,
  max: config.lockMaxAttempts,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: `Too many login attempts. Try again in ${config.lockWindowMinutes} minutes.`
  }
});

function getClientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.ip || 'unknown';
}

function sanitizeIdentifier(raw) {
  return String(raw || '').trim().slice(0, 160);
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    config.jwtSecret,
    { expiresIn: '12h' }
  );
}

function parseBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

function verifyJwt(token) {
  return jwt.verify(token, config.jwtSecret);
}

function authMiddleware(req, res, next) {
  const cookieToken = req.cookies?.[config.authCookieName] || null;
  const bearerToken = parseBearerToken(req);
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Missing token.' });
  }

  try {
    req.user = verifyJwt(token);
    return next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token.' });
  }
}

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const ip = getClientIp(req);
    const identifier = sanitizeIdentifier(req.body.identifier);
    const password = String(req.body.password || '').slice(0, 512);

    if (!identifier || !password) {
      return res.status(400).json({ ok: false, message: 'Identifier and password are required.' });
    }

    const failedAttempts = await countRecentFailedAttempts({
      identifier,
      ip,
      windowMinutes: config.lockWindowMinutes
    });

    if (failedAttempts >= config.lockMaxAttempts) {
      await insertAuditEvent({
        eventType: 'login.locked',
        eventData: { identifier, failedAttempts },
        ip
      });
      return res.status(429).json({
        ok: false,
        message: `Account temporarily locked. Try again in ${config.lockWindowMinutes} minutes.`
      });
    }

    const user = await findUserByIdentifier(identifier);
    if (!user || !user.active) {
      await insertLoginAttempt({ identifier, ip, success: false });
      await insertAuditEvent({ eventType: 'login.failed', eventData: { identifier }, ip });
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      await insertLoginAttempt({ identifier, ip, success: false });
      await insertAuditEvent({ userId: user.id, eventType: 'login.failed', eventData: { identifier }, ip });
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

    await insertLoginAttempt({ identifier, ip, success: true });
    await insertAuditEvent({ userId: user.id, eventType: 'login.success', eventData: { identifier }, ip });

    const token = signToken(user);

    res.cookie(config.authCookieName, token, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000,
      path: '/'
    });

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
  } catch (_error) {
    return res.status(500).json({ ok: false, message: 'Login failed.' });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  await insertAuditEvent({ userId: req.user.sub, eventType: 'logout', ip: getClientIp(req) });
  res.clearCookie(config.authCookieName, { path: '/' });
  return res.json({ ok: true });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ ok: true, user: req.user });
});

router.get('/audit/recent', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ ok: false, message: 'Forbidden.' });
  }
  const events = await getRecentAuditEvents(50);
  res.json({ ok: true, events });
});

module.exports = { router, authMiddleware, verifyJwt };
