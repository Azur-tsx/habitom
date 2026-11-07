const navToggles = document.querySelectorAll('.nav-toggle');
const mobileNavigation = window.matchMedia('(max-width: 740px)');
const projectCarousel = document.querySelector('.project-carousel');

function syncNavigation() {
  navToggles.forEach((toggle) => {
    if (mobileNavigation.matches) {
      toggle.removeAttribute('open');
    } else {
      toggle.setAttribute('open', '');
    }
  });
}

syncNavigation();
mobileNavigation.addEventListener('change', syncNavigation);

if (projectCarousel) {
  const slides = [...projectCarousel.querySelectorAll('.project-slide')];
  const dots = [...projectCarousel.querySelectorAll('.carousel-dots button')];
  const status = projectCarousel.querySelector('.carousel-status');
  let activeSlide = 0;
  let touchStartX;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeSlide;
    });

    dots.forEach((dot, dotIndex) => {
      if (dotIndex === activeSlide) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    status.textContent = `${activeSlide + 1} / ${slides.length}`;
  }

  projectCarousel.querySelector('[data-carousel-previous]').addEventListener('click', () => {
    showSlide(activeSlide - 1);
  });

  projectCarousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
    showSlide(activeSlide + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  projectCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeSlide - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeSlide + 1);
    }
  });

  projectCarousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      touchStartX = event.clientX;
    }
  });

  projectCarousel.addEventListener('pointerup', (event) => {
    if (touchStartX === undefined) {
      return;
    }

    const swipeDistance = event.clientX - touchStartX;
    touchStartX = undefined;

    if (Math.abs(swipeDistance) > 50) {
      showSlide(activeSlide + (swipeDistance < 0 ? 1 : -1));
    }
  });

  projectCarousel.addEventListener('pointercancel', () => {
    touchStartX = undefined;
  });
}
