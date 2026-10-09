/**
 * ==========================================================================
 * Navabharath Technologies - Homepage Showcase Video Controller
 * Inspired by Fractalink (https://www.fractalink.com/)
 * ==========================================================================
 */

(function () {
  'use strict';

  function initHeroVideo() {
    const video = document.getElementById('hero-video-element');
    const wrapper = document.getElementById('hero-video-wrapper');
    const toggleBtn = document.getElementById('hero-video-pill-btn');
    const pillText = document.getElementById('pill-text');
    const pillPlay = document.getElementById('pill-play');
    const pillPause = document.getElementById('pill-pause');
    const heroSection = document.getElementById('hero');

    if (!video) return;

    let userPaused = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Configure muted autoplay attributes for all browsers
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    function updateState(isPlaying) {
      if (pillText) pillText.textContent = isPlaying ? 'LIVE AMBIENT' : 'PAUSED';
      if (pillPlay && pillPause) {
        pillPlay.style.display = isPlaying ? 'none' : 'inline-flex';
        pillPause.style.display = isPlaying ? 'inline-flex' : 'none';
      }
      if (wrapper) {
        if (isPlaying) wrapper.classList.remove('is-paused');
        else wrapper.classList.add('is-paused');
      }
    }

    // Autoplay attempt
    if (!reducedMotion) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => updateState(true))
          .catch((err) => {
            console.info('[HeroVideo] Autoplay waiting for user interaction:', err.message);
            updateState(false);
          });
      }
    } else {
      video.pause();
      updateState(false);
    }

    video.addEventListener('playing', () => updateState(true));
    video.addEventListener('pause', () => updateState(false));

    // Toggle button handler
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          userPaused = false;
          video.play().then(() => updateState(true)).catch(() => {});
        } else {
          userPaused = true;
          video.pause();
          updateState(false);
        }
      });
    }

    // IntersectionObserver to pause when scrolled out of view
    if ('IntersectionObserver' in window && heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (!video.paused) video.pause();
          } else {
            if (!userPaused && !reducedMotion && video.paused) {
              video.play().catch(() => {});
            }
          }
        });
      }, { threshold: 0.15 });

      observer.observe(heroSection);
    }

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        if (!userPaused && !reducedMotion && video.paused) {
          video.play().catch(() => {});
        }
      }
    });

    // Listen for splash dismissal
    window.addEventListener('intro-finished', () => {
      if (!userPaused && !reducedMotion && video.paused) {
        video.play().catch(() => {});
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideo);
  } else {
    initHeroVideo();
  }
})();
