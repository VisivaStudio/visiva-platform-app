/* ==========================================================================
   VISIVA® — APP CORE
   Global interactions and auth integration
   ========================================================================== */

(function initApp() {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.visiva-header');
    if (header) {
      const setHeaderState = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
      };
      setHeaderState();
      window.addEventListener('scroll', setHeaderState, { passive: true });
    }

    enforceProtectedRoutes();
    wireSmoothAnchors();
    wireButtonGlow();
    wireLoginForm();
  });
})();


function enforceProtectedRoutes() {
  const path = window.location.pathname;
  const isProtected = path.includes('/platform/') && !path.endsWith('/platform/overview.html') ? true : path.includes('/platform/');
  if (!isProtected) return;

  const token = localStorage.getItem('visiva_auth_token');
  if (!token) {
    window.location.href = path.startsWith('/visiva-platform/') ? '../portal/login.html' : '/portal/login.html';
  }
}

function wireSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerOffset = document.querySelector('.visiva-header')?.offsetHeight || 80;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });
}

function wireButtonGlow() {
  document.querySelectorAll('.btn-gold, .btn-gold-large').forEach((button) => {
    button.addEventListener('mouseenter', () => button.classList.add('btn-glow'));
    button.addEventListener('mouseleave', () => button.classList.remove('btn-glow'));
  });
}

function wireLoginForm() {
  const form = document.querySelector('.login-form');
  if (!form) return;

  const identifierInput = document.getElementById('identityToken');
  const passwordInput = document.getElementById('credentialKey');
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = document.getElementById('authMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const identifier = identifierInput?.value?.trim() || '';
    const password = passwordInput?.value || '';

    if (!identifier || !password) {
      setStatus(statusEl, 'Please enter your email/username and password.', true);
      return;
    }

    submitBtn.disabled = true;
    setStatus(statusEl, 'Authenticating...', false);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus(statusEl, data.message || 'Sign-in failed.', true);
        submitBtn.disabled = false;
        return;
      }

      localStorage.setItem('visiva_auth_token', data.token);
      localStorage.setItem('visiva_auth_user', JSON.stringify(data.user));

      setStatus(statusEl, `Signed in as ${data.user.username}. Redirecting...`, false);
      window.setTimeout(() => {
        window.location.href = '../platform/overview.html';
      }, 600);
    } catch (_error) {
      setStatus(statusEl, 'Network error. Please try again.', true);
      submitBtn.disabled = false;
    }
  });
}

function setStatus(node, message, isError) {
  if (!node) return;
  node.textContent = message;
  node.style.color = isError ? '#ff7a7a' : '#7fccff';
}
