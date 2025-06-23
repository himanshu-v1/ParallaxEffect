// Return next element if it is not a parallax element to apply background color
function isNextNonParallax(el) {
  const rawComponents = document.querySelectorAll('[data-component]');    // identifier for each component, getting all components on page
  const components = Array.from(rawComponents).filter((i) => {
    if (i.dataset.component !== 'parallax' && i.closest('.parallax')) return false;    // eliminate nested components
    else return true;
  });
  const curEl = el;
  const curElIndex = Array.from(components).indexOf(curEl);
  const nextEl = components[curElIndex + 1];
  let isNextParallax = '';

  if (nextEl && nextEl.classList.contains('parallax')) {
    isNextParallax = '';
  } else {
    isNextParallax = nextEl;
  }

  return isNextParallax;
};

function findAncestor(el, sel1, sel2) {
  if (el.classList.contains(sel1) || el.classList.contains(sel2)) {
      return el;
  }
  while ((el = el.parentElement) && (!el.matches(`[class*="${sel1}"]`) || !el.matches(`[class*="${sel2}"]`)));
  return el;
};

// Find background color for next component
function findBGColor(el) {
  if (getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)') {
    return getComputedStyle(el).backgroundColor;
  } else {
    // theme class
    const legacyThemeEl = findAncestor(el, 'theme__', 'custom-theme');
    if (legacyThemeEl) {
      return getComputedStyle(legacyThemeEl).backgroundColor;
    }
  }

  return 'white'; // Fallback color
};

function parallax() {
    const el = document.querySelectorAll('.parallax');

    // handling to compensate for no default background color for components and uneven z-index
    el.forEach((item) => {
        const nextEl = isNextNonParallax(item);
        if (nextEl) {
            const bgColor = findBGColor(nextEl);
            const colorBg = document.createElement('div');
            colorBg.classList.add('parallax-overlay');
            colorBg.style.backgroundColor = bgColor;
            if (!item.querySelector('.parallax-overlay')) {
                item.querySelector('.cmp-container-image').appendChild(colorBg);
            }
        }
    });

    // handling scroll below (fliexibility limitations when using IntersectionObserver)
    window.addEventListener('scroll', () => {
        el.forEach((e) => {
            const rect = e.getBoundingClientRect();
            const image = e.querySelector('.parallax-image');
            const colorBg = item.querySelector('.parallax-overlay');

            if(rect.top <= 0) {
                const contentDivBottom = e.querySelector('.parallax-content').getBoundingClientRect().bottom;
                $('.parallax .fixed').removeClass('fixed');

                const isAtPosition = contentDiv > parseInt(-(window.innerHeight / 3.6));
                image.classList.toggle('fixed', isAtPosition);

                if (colorBg) {
                    if(rect.bottom <= window.innerHeight) {
                        const h = window.innerHeight - rect.bottom;
                        colorBg.style.height = `${h}px`;
                    } else {
                        colorBg.style.height = '0px';
                    }
                }
            } else {
                image.classList.remove('fixed');
            }
        });
    });

}
