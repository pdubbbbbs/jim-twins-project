/* ============================================
   The Consciousness Project — Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Mouse-follow ambient glow
  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth * 100).toFixed(1);
        const y = (e.clientY / window.innerHeight * 100).toFixed(1);
        document.body.style.setProperty('--mouse-x', x + '%');
        document.body.style.setProperty('--mouse-y', y + '%');
        ticking = false;
      });
      ticking = true;
    }
  });

  // Hamburger menu toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navInner = document.querySelector('nav .nav-inner');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navInner.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('nav a:not(.nav-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navInner.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        navToggle.classList.remove('active');
        navInner.classList.remove('active');
      }
    });
  }

  // Smooth reveal for nav active state
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (link.classList.contains('active') && href !== currentPage) {
      link.classList.remove('active');
    }
  });
});
