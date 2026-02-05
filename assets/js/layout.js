(async function () {
  const root = '/visiva-v2';

  async function inject(selector, url) {
    const container = document.querySelector(selector);
    if (!container) return;
    const res = await fetch(url);
    container.innerHTML = await res.text();
  }

  await inject('[data-header]', `${root}/partials/header.html`);
  await inject('[data-footer]', `${root}/partials/footer.html`);
})();
``
