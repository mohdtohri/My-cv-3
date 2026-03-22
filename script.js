/* ==============================================
   script.js – Professional CV Interactions
   ============================================== */

// ── Particles ─────────────────────────────────
(function () {
  var cont = document.getElementById('particles');
  if (!cont) return;

  var colors = ['#818cf8', '#a78bfa', '#22d3ee', '#2dd4bf', '#fb7185', '#fbbf24'];
  var count  = window.innerWidth < 600 ? 20 : 40;

  for (var i = 0; i < count; i++) {
    var el    = document.createElement('span');
    var size  = (Math.random() * 10 + 3).toFixed(1);
    var color = colors[Math.floor(Math.random() * colors.length)];
    var left  = (Math.random() * 100).toFixed(2);
    var dur   = (Math.random() * 22 + 18).toFixed(1);
    var del   = (Math.random() * 20).toFixed(1);
    var opa   = (Math.random() * 0.12 + 0.05).toFixed(2);

    el.className = 'p';
    el.style.cssText =
      'width:' + size + 'px;height:' + size + 'px;' +
      'background:' + color + ';' +
      'left:' + left + '%;' +
      'opacity:' + opa + ';' +
      'animation-duration:' + dur + 's;' +
      'animation-delay:-' + del + 's;';
    cont.appendChild(el);
  }
})();

// ── Navbar scroll effect ───────────────────────
(function () {
  var nav = document.getElementById('navbar');
  if (!nav) return;

  function tick() {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

// ── Mobile nav toggle ──────────────────────────
(function () {
  var btn   = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    var sp   = btn.querySelectorAll('span');
    sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)'  : '';
    sp[1].style.opacity   = open ? '0' : '1';
    sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(function (s) {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
})();

// ── Scroll-spy active nav link ─────────────────
(function () {
  var sections = document.querySelectorAll('section[id]');
  var anchors  = document.querySelectorAll('.nav-links a');
  if (!sections.length || !anchors.length) return;

  function spy() {
    var y = window.scrollY + 90;
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        anchors.forEach(function (a) { a.classList.remove('active'); });
        var hit = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
        if (hit) hit.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
})();

// ── Scroll-reveal (data-sr) ────────────────────
(function () {
  var els = document.querySelectorAll('[data-sr]');
  if (!els.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var delay = parseInt(e.target.getAttribute('data-sr-delay') || '0', 10);
        setTimeout(function () { e.target.classList.add('vis'); }, delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();

// ── Skill bars ─────────────────────────────────
(function () {
  var bars = document.querySelectorAll('.sk-bar');
  if (!bars.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var bar = e.target;
        setTimeout(function () {
          bar.style.width = bar.getAttribute('data-w') + '%';
        }, 200);
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(function (b) { io.observe(b); });
})();

// ── Counter animation ──────────────────────────
(function () {
  var nums = document.querySelectorAll('[data-target]');
  if (!nums.length) return;

  function run(el, target, dec) {
    var start = 0;
    var steps = 60;
    var inc   = target / steps;
    var step  = 0;
    var t = setInterval(function () {
      step++;
      var val = step < steps ? inc * step : target;
      el.textContent = dec ? val.toFixed(2) : Math.round(val);
      if (step >= steps) clearInterval(t);
    }, 1800 / steps);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el  = e.target;
        var raw = parseFloat(el.getAttribute('data-target'));
        run(el, raw, !Number.isInteger(raw));
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(function (el) { io.observe(el); });
})();

// ── Typing effect for hero role ────────────────
(function () {
  var el = document.getElementById('heroRole');
  if (!el) return;

  var text  = el.getAttribute('data-typing') || '';
  var i     = 0;
  var speed = 55;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 1000);
})();

// ── Smooth scroll for anchor links ────────────
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var tgt = document.querySelector(a.getAttribute('href'));
    if (tgt) {
      e.preventDefault();
      window.scrollTo({ top: tgt.offsetTop - 68, behavior: 'smooth' });
    }
  });
});

