/* ── Theme Toggle ── */
(function () {
  const STORAGE_KEY = 'mk-theme';
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = '<span class="icon">☀️</span><span>Light</span>';
    } else {
      btn.innerHTML = '<span class="icon">🌙</span><span>Dark</span>';
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);

    // Hamburger menu
    const ham = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (ham && navLinks) {
      ham.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks) navLinks.classList.remove('open');
      });
    });

    // Mark active nav link
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
})();

/* ── Publications Filter ── */
function initPubFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pub-card');
  const groups = document.querySelectorAll('.pub-year-group');

  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
          if (tags.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });

      // Hide empty year groups
      groups.forEach(function (group) {
        const visible = group.querySelectorAll('.pub-card:not(.hidden)').length;
        group.style.display = visible ? '' : 'none';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initPubFilter);
