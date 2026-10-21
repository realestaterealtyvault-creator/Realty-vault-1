/**
 * Realty Vault - 3D Interactive Liquid Substance Cursor & Spatial Parallax
 * Creates an ultra-premium fluid trailing dot substance with 3D momentum,
 * magnetic hover reactivity, and 3D card tilt effects.
 */
(function () {
  'use strict';

  // Only run on non-touch devices with a fine pointer (mouse/trackpad)
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // Inject cursor elements
  const dot = document.createElement('div');
  dot.id = 'cursor-dot';

  const substance = document.createElement('div');
  substance.id = 'cursor-substance';

  const ripple = document.createElement('div');
  ripple.id = 'cursor-ripple';

  document.body.appendChild(dot);
  document.body.appendChild(substance);
  document.body.appendChild(ripple);

  // Cursor coordinates & physics
  let mouseX = -100;
  let mouseY = -100;
  let dotX = -100;
  let dotY = -100;
  let substanceX = -100;
  let substanceY = -100;
  let prevSubstanceX = -100;
  let prevSubstanceY = -100;
  let isHovered = false;
  let isClicking = false;
  let isVisible = false;

  // Track mouse movement
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      substance.style.opacity = '1';
      dotX = mouseX;
      dotY = mouseY;
      substanceX = mouseX;
      substanceY = mouseY;
      prevSubstanceX = mouseX;
      prevSubstanceY = mouseY;
    }
  });

  window.addEventListener('mouseleave', function () {
    isVisible = false;
    dot.style.opacity = '0';
    substance.style.opacity = '0';
  });

  window.addEventListener('mouseenter', function () {
    isVisible = true;
    dot.style.opacity = '1';
    substance.style.opacity = '1';
  });

  // Click physics
  window.addEventListener('mousedown', function (e) {
    isClicking = true;
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.classList.remove('active');
    void ripple.offsetWidth; // trigger reflow
    ripple.classList.add('active');
  });

  window.addEventListener('mouseup', function () {
    isClicking = false;
  });

  // Hover detection on interactive elements
  const interactiveSelectors = 'a, button, input, select, textarea, .hero-submit-btn, .hero-input-wrapper, .hero-badge-floating, .hotline-icon-box, .property-card, .btn, [role="button"]';

  function attachHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelectors);
    targets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        isHovered = true;
        substance.classList.add('hovered');
        dot.classList.add('hovered');
      });
      el.addEventListener('mouseleave', function () {
        isHovered = false;
        substance.classList.remove('hovered');
        dot.classList.remove('hovered');
      });
    });
  }

  attachHoverListeners();

  // Re-attach listeners when DOM updates
  const observer = new MutationObserver(attachHoverListeners);
  observer.observe(document.body, { childList: true, subtree: true });

  // Main 60-120fps Animation Loop with Fluid Elastic Physics
  function render() {
    if (isVisible) {
      // 1. Fast response for primary precision dot (sharp tracking)
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.75 : isHovered ? 1.2 : 1})`;

      // 2. Fluid substance trailing physics (smooth lerp damping)
      const ease = isHovered ? 0.22 : 0.15;
      substanceX += (mouseX - substanceX) * ease;
      substanceY += (mouseY - substanceY) * ease;

      // 3. Fluid momentum & elongation in direction of travel
      const vx = substanceX - prevSubstanceX;
      const vy = substanceY - prevSubstanceY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Liquid stretch factor based on movement speed
      const stretch = Math.min(speed * 0.015, 0.25);
      const scaleX = 1 + stretch;
      const scaleY = Math.max(1 - stretch * 0.7, 0.75);

      const baseScale = isClicking ? 0.75 : isHovered ? 1.35 : 1;

      substance.style.transform = `translate3d(${substanceX}px, ${substanceY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX * baseScale}, ${scaleY * baseScale})`;

      prevSubstanceX = substanceX;
      prevSubstanceY = substanceY;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // 4. 3D Spatial Parallax & Tilt Effect for Hero Section
  const heroSection = document.querySelector('.hero-section, .hero-area, .home1-banner');
  const heroFrame = document.querySelector('.hero-image-frame');
  const heroBadges = document.querySelectorAll('.hero-badge-floating');
  const heroContactBox = document.querySelector('.hero-contact-box');

  if (heroSection && heroFrame) {
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Max tilt angles in degrees
      targetTiltY = normX * 8; // rotateY
      targetTiltX = -normY * 8; // rotateX
    });

    heroSection.addEventListener('mouseleave', function () {
      targetTiltX = 0;
      targetTiltY = 0;
    });

    function tiltLoop() {
      // Smooth interpolation for 3D tilt
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      if (heroFrame) {
        heroFrame.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      }

      // Multi-plane depth for floating badges
      if (heroBadges.length > 0) {
        heroBadges.forEach(function (badge, idx) {
          const depthMultiplier = idx === 0 ? 1.4 : -1.2;
          const shiftX = (currentTiltY * depthMultiplier).toFixed(2);
          const shiftY = (-currentTiltX * depthMultiplier).toFixed(2);
          badge.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 25px)`;
        });
      }

      // Subtle 3D lift for hero contact box
      if (heroContactBox) {
        const boxTiltX = (currentTiltX * 0.35).toFixed(2);
        const boxTiltY = (currentTiltY * 0.35).toFixed(2);
        heroContactBox.style.transform = `perspective(1200px) rotateX(${boxTiltX}deg) rotateY(${boxTiltY}deg)`;
      }

      requestAnimationFrame(tiltLoop);
    }

    requestAnimationFrame(tiltLoop);
  }
})();
