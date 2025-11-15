window.addEventListener('load', function() {
    // 1. Get the preloader and main content elements
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-body');
    
    // 2. Add a CSS class to start the fade-out animation
    preloader.style.opacity = 0; // The CSS transition handles the smooth fade
    
    // 3. Set a timeout to remove the preloader completely after the animation finishes
    setTimeout(function() {
        preloader.style.display = 'none';
        mainContent.style.display = 'block'; // Show the main content
    }, 1000); // Wait 1000ms (1 second) to match a typical fade transition
});


// --- PARTICLES CODE
particlesJS("particles-js", {
  particles: {
    number: {
      value: 600, // amount of dots
      density: { enable: true, value_area: 400 }
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.2, // subtle opacity
      random: false,
      anim: { enable: false }
    },
    size: {
      value: 1.3, // smaller dots
      random: true,
      anim: { enable: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 0.5, // smooth slow motion
      direction: "top", // only upward
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 500,
        size: 1.06,
        duration: 1,
        opacity: 0.5,
        speed: 3
      }
    }
  },
  retina_detect: true
});

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

// SMOOTH SCROLLING
document.addEventListener('DOMContentLoaded', () =>{
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e){
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
container.addEventListener('scroll', () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;

    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[closestIndex]) dots[closestIndex].classList.add('active');
});


// DOT UNDERNEAT FEATURE-CTA-CARD
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('experienceScroll'); // the scrollable cards
  const cards = container.querySelectorAll('.cta-card');
  const pagination = document.getElementById('pagination');


  // Put this at the bottom of your body or in your JS bundle
(function () {
  const targets = document.querySelectorAll('.cta-card');

  if (!('IntersectionObserver' in window)) {
    // fallback: simply add hovered on load for older browsers
    targets.forEach(t => t.classList.add('hovered'));
    return;
  }

  // parameters: trigger when ~50% of the element is visible
  const observerOptions = {
    root: null,
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  };

  // tiny debounce to avoid flicker when scrolling fast
  let scheduled = null;
  function schedule(fn) {
    if (scheduled) cancelAnimationFrame(scheduled);
    scheduled = requestAnimationFrame(() => { scheduled = null; fn(); });
  }

  const observer = new IntersectionObserver((entries) => {
    schedule(() => {
      entries.forEach(entry => {
        const el = entry.target;
        // choose a sensible policy: consider element hovered when at least 45% visible
        const isVisibleEnough = entry.intersectionRatio >= 0.45;

        if (isVisibleEnough) {
          // add the class that mirrors your hover styles
          el.classList.add('hovered');
        } else {
          // remove when it's no longer sufficiently in view
          el.classList.remove('hovered');
        }
      });
    });
  }, observerOptions);

  targets.forEach(t => observer.observe(t));

  // BONUS: if you also want a small tap-to-toggle behavior:
  // (uncomment the next block if you want tap to toggle manually)
  /*
  targets.forEach(t => {
    t.addEventListener('click', (e) => {
      // prevent default link behavior: if you want clicks to still navigate, remove this line
      e.preventDefault();
      t.classList.toggle('hovered');
    });
  });
  */
})();

  
  // Clear previous dots (just in case)
  pagination.innerHTML = '';
  // Create pagination dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('pagination-dot');
    if (index === 0) dot.classList.add('active');
    pagination.appendChild(dot);
  });

  const dots = pagination.querySelectorAll('.pagination-dot');
  // Function to update active dot on scroll
  const updateActiveDot = () => {
    const scrollLeft = container.scrollLeft;
    const cardWidth = cards[0].offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };
  // Listen for scroll
  container.addEventListener('scroll', updateActiveDot);
  // Optional: clicking a dot scrolls to that card
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      container.scrollTo({
        left: cards[i].offsetLeft,
        behavior: 'smooth'
      });
    });
  });
});