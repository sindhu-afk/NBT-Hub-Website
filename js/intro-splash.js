/* ==========================================================================
   NBT HUB - INTRO SPLASH SCREEN ORCHESTRATOR
   Inspired by The Brand Authority (https://www.thebrandauthority.in/)
   ========================================================================== */

(function () {
  'use strict';

  // Ensure scroll is locked immediately on script execution
  document.documentElement.classList.add('intro-locked');
  document.body.classList.add('intro-locked');

  function initIntroSplash() {
    const splash = document.getElementById('intro-splash');
    if (!splash) {
      document.documentElement.classList.remove('intro-locked');
      document.body.classList.remove('intro-locked');
      return;
    }

    const fillBar = document.getElementById('intro-status-fill');
    const counter = document.getElementById('intro-status-counter');
    const skipBtn = document.getElementById('intro-skip-btn');

    let isDismissed = false;
    let progress = 0;
    const durationMs = 2100; // 2.1s optimal cinematic duration
    const startTime = performance.now();

    function updateProgress(now) {
      if (isDismissed) return;

      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - rawProgress, 2.5);
      progress = Math.round(eased * 100);

      if (fillBar) fillBar.style.width = progress + '%';
      if (counter) counter.textContent = progress + '%';

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete! Hold briefly for 150ms then gracefully reveal site
        setTimeout(() => {
          dismissSplash();
        }, 180);
      }
    }

    requestAnimationFrame(updateProgress);

    function dismissSplash() {
      if (isDismissed) return;
      isDismissed = true;

      // Unlock page scroll
      document.documentElement.classList.remove('intro-locked');
      document.body.classList.remove('intro-locked');

      // Trigger exit transition
      splash.classList.add('is-exiting');

      // Accessibility
      splash.setAttribute('aria-hidden', 'true');

      // After transition completes (850ms), hide completely
      setTimeout(() => {
        splash.classList.add('is-hidden');
        splash.style.display = 'none';

        // Trigger hero canvas resize/refresh if canvas is active
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new CustomEvent('intro-finished'));
      }, 850);
    }

    // Skip on button click
    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dismissSplash();
      });
    }

    // Click anywhere on splash to dismiss / enter immediately
    splash.addEventListener('click', function () {
      dismissSplash();
    });

    // Keyboard shortcuts (Escape, Space, Enter)
    window.addEventListener('keydown', function (e) {
      if (!isDismissed && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        dismissSplash();
      }
    });

    // Mousewheel or swipe down on mobile allows intuitive entry
    splash.addEventListener('wheel', function () {
      dismissSplash();
    }, { passive: true });

    let touchStartY = 0;
    splash.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    splash.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        const delta = Math.abs(e.changedTouches[0].clientY - touchStartY);
        if (delta > 30) {
          dismissSplash();
        }
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntroSplash);
  } else {
    initIntroSplash();
  }
})();
