const slides = Array.from(document.querySelectorAll('.slide'));

if (slides.length > 0) {
  const indexFromHash = () => {
    const parsed = Number.parseInt(window.location.hash.slice(1), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const clampIndex = (index) => Math.max(0, Math.min(index, slides.length - 1));

  let activeIndex = clampIndex(indexFromHash());

  const updateHash = () => {
    const nextHash = `#${activeIndex}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash);
    }
  };

  const render = (scrollToTop = true) => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.hidden = !isActive;
      slide.toggleAttribute('inert', !isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    updateHash();
    if (scrollToTop) window.scrollTo({ top: 0 });
  };

  const move = (delta) => {
    activeIndex = clampIndex(activeIndex + delta);
    render();
  };

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
      event.preventDefault();
      move(1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    }
  });

  window.addEventListener('click', () => move(1), { passive: true });
  window.addEventListener('hashchange', () => {
    activeIndex = clampIndex(indexFromHash());
    render(false);
  });

  render(false);
}