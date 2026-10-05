/* ==========================================================================
   NBT HUB - INTERACTIVE PROJECT ESTIMATOR & QUOTE WIZARD
   ========================================================================== */

(function () {
  function calculateEstimate() {
    let basePrice = 25000; // Base starter website/service INR
    let timelineWeeks = 2;

    // Selected Services
    const selectedServices = document.querySelectorAll('.estimator-checkbox:checked');
    selectedServices.forEach(cb => {
      basePrice += parseInt(cb.getAttribute('data-price') || 0);
      timelineWeeks += parseInt(cb.getAttribute('data-weeks') || 1);
    });

    // Scale / Tier multiplier
    const tierSelect = document.getElementById('project-tier-select');
    if (tierSelect) {
      const tierVal = parseFloat(tierSelect.value || 1);
      basePrice = Math.round(basePrice * tierVal);
      if (tierVal > 1.5) timelineWeeks += 3;
    }

    // Display formatted price & timeline
    const priceDisplay = document.getElementById('estimator-price-display');
    const timeDisplay = document.getElementById('estimator-time-display');

    if (priceDisplay) {
      priceDisplay.innerHTML = `₹${basePrice.toLocaleString('en-IN')}<span style="font-size:1rem; color:var(--silver-steel); font-weight:400;">* est.</span>`;
    }

    if (timeDisplay) {
      timeDisplay.textContent = `${timelineWeeks} - ${timelineWeeks + 2} Weeks`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.estimator-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', calculateEstimate);
    });

    const tierSelect = document.getElementById('project-tier-select');
    if (tierSelect) {
      tierSelect.addEventListener('change', calculateEstimate);
    }

    calculateEstimate();
  });
})();
