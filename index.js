/* index.js — mobile toggle, nav show/hide on scroll, arrow visibility, close menu on link click */
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('nav-bar-main');
  const toggleBtn = document.querySelector('.navbar-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = navLinks.querySelectorAll('a');
  const arrowMain = document.querySelector('.arrow-scroll');      // arrow in hero pointing down
  const arrowMainWrap = document.querySelector('.arrow-scroll-main');
  const scrollUpIcon = document.getElementById('scroll-up-icon');
  const scrollUpWrap = document.querySelector('.up-back');

  // -------- Mobile menu toggle
  function toggleNav() {
    const opened = nav.classList.toggle('nav-open'); // add/remove nav-open
    toggleBtn.classList.toggle('open', opened);
    // set aria attributes for accessibility
    toggleBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });
  }

  // Close menu when a nav link is clicked (useful on mobile)
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu if user taps outside on mobile
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ------- Show / hide navbar on scroll (shows when scrolling up)
  let lastScroll = window.scrollY || 0;
  let ticking = false;
  const delta = 8; // threshold
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const current = window.scrollY || 0;
        // show/hide header
        if (Math.abs(current - lastScroll) > delta) {
          if (current > lastScroll && current > 80) {
            // scrolling down
            nav.classList.add('hide');
          } else {
            // scrolling up
            nav.classList.remove('hide');
          }
          lastScroll = current;
        }

        // Show arrow in hero only when user has scrolled away from hero
        try {
          const hero = document.querySelector('.heading-container');
          const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
          // show arrow when we've scrolled past half the hero height
          if (window.scrollY > (heroBottom * 0.25)) {
            arrowMain && arrowMain.classList.remove('hidden');
          } else {
            arrowMain && arrowMain.classList.add('hidden');
          }
        } catch (err) {
          // fail safe
        }

        // show/hide back-to-top button
        if (window.scrollY > 600) {
          scrollUpIcon && scrollUpIcon.classList.add('show');
        } else {
          scrollUpIcon && scrollUpIcon.classList.remove('show');
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // ------- Smooth scroll for the up-back link (back to top)
  if (scrollUpWrap) {
    scrollUpWrap.addEventListener('click', function (e) {
      // default anchor may jump, use smooth scroll
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------- Accessibility: allow Esc to close mobile nav
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ------- Improve focus handling: trap tab when mobile nav open (simple)
  document.addEventListener('focusin', function (e) {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
      // move focus to first nav link
      navLinks.querySelector('a') && navLinks.querySelector('a').focus();
    }
  });

  // initial state: hide arrow if at top
  if (window.scrollY <= 100) {
    arrowMain && arrowMain.classList.add('hidden');
    scrollUpIcon && scrollUpIcon.classList.remove('show');
  } else {
    arrowMain && arrowMain.classList.remove('hidden');
  }
});
