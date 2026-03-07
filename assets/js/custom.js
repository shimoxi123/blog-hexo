(() => {
  const ACTIVE_CLASS = 'active';
  const HAS_ACTIVE_CLASS = 'has-active';

  const getHeaderOffset = () => {
    let offset = 20;
    const body = document.body;
    const desktopHeader = document.getElementById('header-desktop');
    const breadcrumb = document.querySelector('.breadcrumb-container.sticky');

    if (desktopHeader && body?.dataset?.headerDesktop !== 'normal') {
      offset += desktopHeader.offsetHeight;
    }
    if (breadcrumb) {
      offset += breadcrumb.clientHeight;
    }
    return offset;
  };

  const getHeadingByHash = (hash) => {
    if (!hash || hash.length < 2) return null;
    let decoded = hash.slice(1);
    try {
      decoded = decodeURIComponent(decoded);
    } catch (_) {
      // Keep original hash fragment if decoding fails.
    }
    return document.getElementById(decoded);
  };

  const collectTocItems = () => {
    const toc = document.getElementById('TableOfContents');
    if (!toc) return null;

    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const pairs = links
      .map((link) => ({ link, heading: getHeadingByHash(link.getAttribute('href') || '') }))
      .filter((item) => item.heading instanceof HTMLElement);

    if (!pairs.length) return null;
    return { toc, pairs };
  };

  const clearTocState = (toc) => {
    toc.querySelectorAll(`.${ACTIVE_CLASS}`).forEach((el) => el.classList.remove(ACTIVE_CLASS));
    toc.querySelectorAll(`.${HAS_ACTIVE_CLASS}`).forEach((el) => el.classList.remove(HAS_ACTIVE_CLASS));
  };

  const markActive = (toc, link) => {
    link.classList.add(ACTIVE_CLASS);
    let node = link.parentElement;
    while (node && node !== toc) {
      if (node.tagName === 'LI') {
        node.classList.add(HAS_ACTIVE_CLASS);
      }
      node = node.parentElement;
    }
  };

  const updateTocActive = () => {
    const data = collectTocItems();
    if (!data) return;

    const { toc, pairs } = data;
    const offset = getHeaderOffset();

    let activeIndex = 0;
    for (let i = pairs.length - 1; i >= 0; i--) {
      if (pairs[i].heading.getBoundingClientRect().top <= offset) {
        activeIndex = i;
        break;
      }
    }

    clearTocState(toc);
    markActive(toc, pairs[activeIndex].link);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateTocActive();
      ticking = false;
    });
  };

  const init = () => {
    updateTocActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTocActive);
    window.addEventListener('hashchange', () => setTimeout(updateTocActive, 0));
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('#TableOfContents a[href^="#"]') : null;
      if (target) setTimeout(updateTocActive, 0);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
