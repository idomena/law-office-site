/* ── Mena & Co. — Premium Animations ── */

/* ── Page Loader ── */
(function () {
  var loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('loaded');
      setTimeout(function () { loader.style.display = 'none'; }, 700);
    }, 600);
  });
})();

/* ── Scroll Progress Bar ── */
(function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
})();

/* ── Header: solid on scroll ── */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ── Custom Cursor ── */
(function () {
  var dot   = document.getElementById('cursor-dot');
  var ring  = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
  });

  (function animateRing() {
    rx += (mx - rx - 20) * 0.12;
    ry += (my - ry - 20) * 0.12;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .svc-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
  });
})();

/* ── Scroll Reveal ── */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });
})();

/* ── Stagger children ── */
(function () {
  document.querySelectorAll('.stagger').forEach(function (parent) {
    Array.from(parent.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.1) + 's';
      child.classList.add('reveal');
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.stagger .reveal').forEach(function (el) { io.observe(el); });
})();

/* ── Counter Animation ── */
(function () {
  var counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  function animateCount(el) {
    var target = el.getAttribute('data-target');
    var suffix = el.getAttribute('data-suffix') || '';
    var num    = parseFloat(target);
    var start  = 0;
    var duration = 1800;
    var step   = 16;
    var steps  = duration / step;
    var increment = num / steps;
    var current = 0;
    var timer = setInterval(function () {
      current += increment;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(num) ? Math.round(current) : current.toFixed(0)) + suffix;
    }, step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { io.observe(el); });
})();

/* ── Parallax Hero ── */
(function () {
  var glow = document.querySelector('.hero-bg-glow');
  if (!glow) return;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    glow.style.transform = 'translateY(' + (y * 0.3) + 'px)';
  }, { passive: true });
})();

/* ── Magnetic Buttons ── */
(function () {
  document.querySelectorAll('.btn-gold').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.18) + 'px,' + (y * 0.18) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });
})();

/* ── Service Card 3D Tilt ── */
(function () {
  document.querySelectorAll('.svc-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = 'perspective(600px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

/* ── Gold Particle Burst on CTA hover ── */
(function () {
  var cta = document.querySelector('.hero-actions .btn-gold');
  if (!cta) return;

  cta.addEventListener('mouseenter', function () {
    for (var i = 0; i < 8; i++) {
      var p = document.createElement('span');
      p.className = 'gold-particle';
      var angle = (i / 8) * 360;
      var dist  = 32 + Math.random() * 24;
      p.style.cssText = '--angle:' + angle + 'deg; --dist:' + dist + 'px;';
      cta.appendChild(p);
      setTimeout(function (el) { el.remove(); }, 700, p);
    }
  });
})();

/* ── Smooth active nav highlight ── */
(function () {
  var sections = document.querySelectorAll('section[id], div[id]');
  var links    = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !links.length) return;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
        links.forEach(function (a) { a.classList.remove('active'); });
        var active = document.querySelector('nav a[href="#' + sec.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });
})();
