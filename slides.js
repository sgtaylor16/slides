// Build 2D deck structure: each main slide tracks its optional subslides.
const deck = Array.from(document.querySelectorAll('.slide')).map((el) => ({
  el,
  subs: Array.from(el.querySelectorAll(':scope > .subslide')),
}));

if (deck.length > 0) {
  const clamp = (val, lo, hi) => Math.max(lo, Math.min(val, hi));

  const parseHash = () => {
    const parts = window.location.hash.slice(1).split('/');
    const main = Number.parseInt(parts[0], 10);
    const sub  = Number.parseInt(parts[1] ?? '0', 10);
    return {
      main: Number.isFinite(main) ? main : 0,
      sub:  Number.isFinite(sub)  ? sub  : 0,
    };
  };

  let { main: mainIdx, sub: subIdx } = parseHash();
  mainIdx = clamp(mainIdx, 0, deck.length - 1);
  subIdx  = clamp(subIdx, 0, Math.max(0, deck[mainIdx].subs.length - 1));

  const currentSubs = () => deck[mainIdx].subs;

  const updateHash = () => {
    const nextHash = subIdx > 0 ? `#${mainIdx}/${subIdx}` : `#${mainIdx}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash);
    }
  };

  const render = (scrollToTop = true) => {
    deck.forEach(({ el, subs }, mi) => {
      const isMain = mi === mainIdx;
      el.classList.toggle('is-active', isMain);
      el.hidden = !isMain;
      el.toggleAttribute('inert', !isMain);
      el.setAttribute('aria-hidden', String(!isMain));

      subs.forEach((sub, si) => {
        const isSub = isMain && si === subIdx;
        sub.classList.toggle('is-active', isSub);
        sub.hidden = !isSub;
        sub.toggleAttribute('inert', !isSub);
        sub.setAttribute('aria-hidden', String(!isSub));
      });
    });
    updateHash();
    if (scrollToTop) window.scrollTo({ top: 0 });
  };

  // Smart advance: step sub-slides first, then advance main slide.
  const smartAdvance = () => {
    const subs = currentSubs();
    if (subs.length > 0 && subIdx < subs.length - 1) {
      subIdx++;
    } else if (mainIdx < deck.length - 1) {
      mainIdx++;
      subIdx = 0;
    }
    render();
  };

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (mainIdx < deck.length - 1) { mainIdx++; subIdx = 0; render(); }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (mainIdx > 0) { mainIdx--; subIdx = 0; render(); }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentSubs().length > 0 && subIdx < currentSubs().length - 1) {
          subIdx++; render();
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentSubs().length > 0 && subIdx > 0) {
          subIdx--; render();
        }
        break;
      case ' ':
        event.preventDefault();
        smartAdvance();
        break;
    }
  });

  window.addEventListener('click', smartAdvance, { passive: true });

  window.addEventListener('hashchange', () => {
    const parsed = parseHash();
    mainIdx = clamp(parsed.main, 0, deck.length - 1);
    subIdx  = clamp(parsed.sub, 0, Math.max(0, deck[mainIdx].subs.length - 1));
    render(false);
  });

  render(false);
}