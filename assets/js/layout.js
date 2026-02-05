<script>
/**
 * VISIVA v2 — layout.js (enhanced)
 * 1) Injects header/footer partials
 * 2) Highlights active nav item + mobile bottom bar
 * 3) Optional dev cache-busting for partials (disable on production)
 */

(function () {
  const DEV_CACHE_BUST = false; // set true during dev if partials don’t refresh

  function getRoot() {
    const parts = location.pathname.split('/');
    const idx = parts.indexOf('visiva-v2');
    if (idx !== -1) return '/' + parts.slice(1, idx + 1).join('/');
    return '';
  }

  function withBust(url) {
    if (!DEV_CACHE_BUST) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}_=${Date.now()}`;
  }

  async function fetchPartial(url) {
    const res = await fetch(withBust(url), { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  }

  async function inject(selector, html) {
    const host = document.querySelector(selector);
    if (!host) return;
    host.outerHTML = html;
  }

  function pathIsActive(href, current) {
    // Normalize both
    try {
      const a = new URL(href, location.origin);
      const b = new URL(current, location.origin);
      // Active if exact match or current path starts within the href (for section roots)
      return b.pathname === a.pathname || b.pathname.startsWith(a.pathname);
    } catch {
      return false;
    }
  }

  function highlightActive(root) {
    const current = location.pathname;

    // Top nav
    document.querySelectorAll('.visiva-header .nav-links a').forEach(a => {
      if (pathIsActive(a.getAttribute('href'), current)) {
        a.classList.add('active');
      }
    });

    // Mobile bottom bar
    document.querySelectorAll('.mobile-bottom-bar a').forEach(a => {
      a.classList.toggle('active', pathIsActive(a.getAttribute('href'), current));
    });
  }

  async function main() {
    const root = getRoot();
    // Load partials in parallel
    const [headerHTML, footerHTML] = await Promise.all([
      fetchPartial(`${root}/partials/header.html`).catch(err => {
        console.warn('[layout] header failed:', err); return '<!-- header failed -->';
      }),
      fetchPartial(`${root}/partials/footer.html`).catch(err => {
        console.warn('[layout] footer failed:', err); return '<!-- footer failed -->';
      }),
    ]);

    // Inject
    await Promise.all([
      inject('[data-header]', headerHTML),
      inject('[data-footer]', footerHTML),
    ]);

    // After injection, we can now compute active states
    highlightActive(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main, { once: true });
  } else {
    main();
  }
})();
</script>
``
