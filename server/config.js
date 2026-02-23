const requiredInProd = ['JWT_SECRET'];

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function getConfig() {
  const port = Number(process.env.PORT || 4173);
  const jwtSecret = process.env.JWT_SECRET || 'visiva-dev-secret-change-me';
  const authCookieName = process.env.AUTH_COOKIE_NAME || 'visiva_auth';
  const cookieSecure = isProduction();
  const lockWindowMinutes = Number(process.env.LOCK_WINDOW_MINUTES || 15);
  const lockMaxAttempts = Number(process.env.LOCK_MAX_ATTEMPTS || 5);

  if (isProduction()) {
    const missing = requiredInProd.filter((k) => !process.env[k]);
    if (missing.length) {
      throw new Error(`Missing required production env vars: ${missing.join(', ')}`);
    }
  }

  return {
    port,
    jwtSecret,
    authCookieName,
    cookieSecure,
    lockWindowMinutes,
    lockMaxAttempts
  };
}

module.exports = { getConfig, isProduction };
