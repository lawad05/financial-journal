/* =============================================
   THE UNIVERSITY OF CHICAGO FINANCIAL JOURNAL
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navigation Scroll Behaviour ─────────── */
  const nav = document.getElementById('nav');

  if (nav) {
    const isHeroPage = nav.classList.contains('nav-hero');

    const updateNav = () => {
      if (isHeroPage) {
        if (window.scrollY > 60) {
          nav.classList.remove('transparent');
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
          nav.classList.add('transparent');
        }
      }
    };

    if (isHeroPage) {
      nav.classList.add('transparent');
      window.addEventListener('scroll', updateNav, { passive: true });
      updateNav();
    } else {
      nav.classList.add('solid');
    }
  }

  /* ── Mobile Menu Toggle ───────────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ── Scroll Fade-Up Animations ────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── Article Filter (articles.html) ──────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length && articleItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter articles
        articleItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Newsletter Form ──────────────────────── */
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#2D6B4A';
        btn.style.color = 'white';
        input.value = '';
        input.disabled = true;
        btn.disabled = true;
      }
    });
  });

  /* ── Highlight Active Nav Link ────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
