/* index.js */

// NAVIGATION BAR HIDE SCROLL
let lastScrollY = window.scrollY;
const navbar = document.getElementById('nav-bar-main');

window.addEventListener('scroll', () => {
  if (window.scrollY > 550 && window.scrollY > lastScrollY) {
    // scrolling down
    navbar.classList.add('hide');
  } else {
    // scrolling up
    navbar.classList.remove('hide');
  }
  lastScrollY = window.scrollY;
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


// -----------

// SCROLL UP ID
const scrollBtn = document.getElementById('scroll-up-icon');
const hero = document.getElementById('main-body');

window.addEventListener('scroll', () => {
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  if (window.scrollY > heroBottom - 100) { // adjust -100 for sensitivity
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// // BACKGROUND AUDIO
// const audio = new Audio ('sounds/background_sound.mp3');
// audio.loop = true;
// audio.play();

// SCROLL
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