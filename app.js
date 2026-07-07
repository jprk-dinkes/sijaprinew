// ============================================
// SIJAPRI – JavaScript App
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
      backToTop?.classList.add('visible');
    } else {
      navbar?.classList.remove('scrolled');
      backToTop?.classList.remove('visible');
    }
  });

  // ── Back to top
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });
  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu?.classList.remove('open'));
  });

  // ── Active nav link based on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` ||
          link.getAttribute('href') === `${current}.html`) {
        link.classList.add('active');
      }
    });
  });

  // ── Intersection Observer for fade-in
  const fadeEls = document.querySelectorAll(
    '.service-card, .stat-card, .info-card, .announcement-card, .flow-step, .contact-item'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));

  // ── Counter animation for stats
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target || 0);
    const decimals = parseInt(el.dataset.decimals || 0);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 2000;
    const start    = performance.now();

    function format(val) {
      if (target >= 1_000_000) return (val / 1_000_000).toFixed(2) + ' Jt';
      if (target >= 1_000)     return Math.round(val).toLocaleString('id-ID');
      return val.toFixed(decimals);
    }

    function step(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * target;
      el.textContent = prefix + format(value) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const valueEl = entry.target.querySelector('.stat-value[data-target]');
        if (valueEl) animateCounter(valueEl);
        // Animate bar
        const bar = entry.target.querySelector('.stat-bar-fill');
        if (bar) {
          setTimeout(() => { bar.style.width = bar.style.width; }, 200);
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

  // ── Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
