/* ==========================================================================
   NBT HUB - BRAND AUTHORITY INSPIRED SCROLL INDICATOR
   ========================================================================== */

(function () {
  const pageRule = document.getElementById('page-rule');
  const readout = document.getElementById('page-rule-readout');
  if (!pageRule || !readout) return;

  let isScrollingTimeout = null;

  const sections = [
    { id: 'hero', label: '01 // INTRO' },
    { id: 'stats', label: '02 // IMPACT' },
    { id: 'services', label: '03 // SERVICES' },
    { id: 'portfolio', label: '04 // PORTFOLIO' },
    { id: 'social-media', label: '05 // SOCIAL MEDIA' },
    { id: 'team', label: '06 // LEADERSHIP & TEAM' },
    { id: 'estimator', label: '07 // ESTIMATOR' },
    { id: 'contact', label: '08 // CONTACT' }
  ];

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

    document.documentElement.style.setProperty('--scroll-progress', progress);

    // Find current active section
    let currentSection = sections[0].label;
    const scrollPos = window.scrollY + window.innerHeight * 0.4;

    for (let i = sections.length - 1; i >= 0; i--) {
      const secElem = document.getElementById(sections[i].id);
      if (secElem && secElem.offsetTop <= scrollPos) {
        currentSection = sections[i].label;
        break;
      }
    }

    const percentage = Math.round(progress * 100);
    readout.textContent = `${currentSection} — ${percentage}%`;

    // Toggle active scrolling visual state
    pageRule.classList.add('is-scrolling');
    clearTimeout(isScrollingTimeout);
    isScrollingTimeout = setTimeout(() => {
      pageRule.classList.remove('is-scrolling');
    }, 1200);
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
})();
