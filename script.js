/* ============================================
   script.js - Animations & Interactions
   ============================================ */

// ─── Particles Background ───────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#6C63FF', '#a855f7', '#FF6584', '#43E97B', '#38f9d7'];
  const count = window.innerWidth < 600 ? 18 : 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');

    const size = Math.random() * 12 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 20 + 15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;
    container.appendChild(p);
  }
})();

// ─── Navbar Scroll Effect ────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Mobile Nav Toggle ───────────────────────
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = links.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close nav on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
})();

// ─── Scroll Spy (active nav link) ───────────
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(a => {
          a.style.color = '';
          a.style.background = '';
        });
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) {
          active.style.color = '#fff';
          active.style.background = 'rgba(108, 99, 255, 0.2)';
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ─── AOS-like Scroll Reveal ──────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// ─── Animated Skill Bars ─────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
          bar.classList.add('animated');
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ─── Animated Counters ───────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function animateCounter(el, target, isDecimal) {
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = step < steps ? increment * step : target;

      if (isDecimal) {
        el.textContent = current.toFixed(2);
      } else {
        el.textContent = Math.round(current);
      }

      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = parseFloat(el.getAttribute('data-target'));
        const isDecimal = !Number.isInteger(raw);
        animateCounter(el, raw, isDecimal);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ─── Smooth scroll for anchor links ─────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Course cards stagger animation ──────────
(function initCourseStagger() {
  const cards = document.querySelectorAll('.course-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, delay);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
})();

// ─── Typing effect for hero title ────────────
(function initTypingEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const originalText = titleEl.textContent.trim();
  titleEl.textContent = '';
  titleEl.style.borderRight = '2px solid rgba(108,99,255,0.7)';
  titleEl.style.paddingLeft = '2px';

  let i = 0;
  const speed = 60;

  function type() {
    if (i < originalText.length) {
      titleEl.textContent += originalText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Blink cursor then remove
      setTimeout(() => {
        titleEl.style.borderRight = 'none';
      }, 1500);
    }
  }

  // Start after hero pop-in
  setTimeout(type, 900);
})();
