/* ==========================================================================
   NBT HUB - CUSTOM LUXURY INVERTED CURSOR CONTROLLER
   Smooth physics tracking with difference blend expansion on interactive targets
   ========================================================================== */

(function () {
  'use strict';

  // Do not run on touch-only devices
  if (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  function initCursor() {
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'custom-cursor';
      cursor.className = 'custom-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
    }

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let currentScale = 1;
    let isHovered = false;
    let isMouseDown = false;
    let hasMoved = false;

    // Interactive selector for elements that trigger the expanded cursor state
    const interactiveSelector = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'label',
      'summary',
      '[role="button"]',
      '.btn',
      '.nav-link',
      '.nav-brand',
      '.service-card',
      '.portfolio-card',
      '.portfolio-tile',
      '.social-card',
      '.social-action-btn',
      '.faq-header',
      '.faq-question',
      '.filter-chip',
      '.portfolio-filter-btn',
      '.portfolio-action-btn',
      '.estimator-card',
      '.addon-item',
      '.option-card',
      '.pricing-toggle-btn',
      '.marquee-item',
      '.clickable',
      '[data-cursor-hover]',
      '.page-rule-mark'
    ].join(', ');

    function updateHover(target) {
      if (!target) {
        isHovered = false;
        cursor.classList.remove('is-hovered');
        return;
      }
      const match = target.closest(interactiveSelector);
      isHovered = Boolean(match);
      if (isHovered) {
        cursor.classList.add('is-hovered');
      } else {
        cursor.classList.remove('is-hovered');
      }
    }

    // Pointer move tracking
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        cursorX = mouseX;
        cursorY = mouseY;
        hasMoved = true;
        cursor.classList.add('is-visible');
      }

      cursor.classList.add('is-visible');
      updateHover(e.target);
    }, { passive: true });

    // Click / Mouse down & up
    window.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        isMouseDown = true;
      }
    });

    window.addEventListener('mouseup', function () {
      isMouseDown = false;
    });

    // Window leave & enter
    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('is-visible');
      cursor.classList.remove('is-hovered');
      isHovered = false;
    });

    document.addEventListener('mouseenter', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('is-visible');
      updateHover(e.target);
    });

    // Recheck hover when scrolling (if interactive element slides under mouse)
    window.addEventListener('scroll', function () {
      if (hasMoved && mouseX >= 0 && mouseY >= 0) {
        const el = document.elementFromPoint(mouseX, mouseY);
        if (el) updateHover(el);
      }
    }, { passive: true });

    // Focus & blur on inputs for optimal typing UX
    document.addEventListener('focusin', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        cursor.classList.add('is-typing');
      }
    });

    document.addEventListener('focusout', function () {
      cursor.classList.remove('is-typing');
    });

    // Physics Animation Loop
    const posEase = 0.22;   // Buttery fluid follow without noticeable lag
    const scaleEase = 0.18; // Smooth expansion & snap-back

    function animate() {
      if (hasMoved) {
        // Fluid interpolation
        cursorX += (mouseX - cursorX) * posEase;
        cursorY += (mouseY - cursorY) * posEase;

        // Target scale logic
        let targetScale = 1;
        if (isMouseDown) {
          targetScale = isHovered ? 1.4 : 0.65;
        } else if (isHovered) {
          targetScale = 2.2; // 8px * 2.2 ≈ 17.6px (sleek, compact indicator ring)
        } else {
          targetScale = 1;
        }

        currentScale += (targetScale - currentScale) * scaleEase;

        // Subpixel 3D GPU-accelerated transform
        cursor.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(3)})`;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }
})();
