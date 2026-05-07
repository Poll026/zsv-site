/* ══════════════════════════════════
   Main — Nav, Burger, Observers, Form
══════════════════════════════════ */

(function () {

  // ─── Burger menu ──────────────────────────────────────────

  var burger    = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ─── Smooth scroll for anchors ────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = document.getElementById('header') ? 72 : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─── Header scroll class (fallback if GSAP not loaded) ────

  var header = document.getElementById('header');
  if (header && typeof gsap === 'undefined') {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // ─── Intersection Observer for .reveal / .reveal-line ─────
  // Fallback when GSAP is unavailable; also handles initial state
  // when GSAP IS loaded (GSAP overrides opacity/transform anyway).

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-line').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ─── Active nav link on scroll ────────────────────────────

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  // ─── Contact form ─────────────────────────────────────────

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      var orig = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  // ─── Stat counters fallback (no GSAP) ────────────────────

  if (typeof gsap === 'undefined') {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        var start    = 0;
        var duration = 2000;
        var startTime = null;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num').forEach(function (el) {
      countObserver.observe(el);
    });
  }

})();
