/* ══════════════════════════════════
   GSAP ScrollTrigger Animations
══════════════════════════════════ */

(function () {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ─── Reveal elements ──────────────────────────────────────

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        delay: (i % 4) * 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 87%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ─── Reveal lines (hero & wwd titles) ─────────────────────

  document.querySelectorAll('.reveal-line').forEach(function (el, i) {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.13,
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ─── Stat counters ────────────────────────────────────────

  document.querySelectorAll('.stat-num').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(obj.val);
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── Header frosted glass on scroll ──────────────────────

  var header = document.getElementById('header');
  if (header && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      start: 80,
      onEnter:     function () { header.classList.add('scrolled'); },
      onLeaveBack: function () { header.classList.remove('scrolled'); }
    });
  }

})();
