/* ==========================================================================
   NBT HUB - MAIN APPLICATION ORCHESTRATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navbar Scroll Effect & Mobile Drawer Toggle
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }
  });

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function () {
      mobileNavToggle.classList.toggle('active');
      navLinks.classList.toggle('mobile-active');
      if (navbar) navbar.classList.toggle('nav-open');
    });

    // Close mobile drawer when clicking nav links
    const linkItems = navLinks.querySelectorAll('.nav-link, .mobile-nav-cta a');
    linkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
        if (navbar) navbar.classList.remove('nav-open');
      });
    });

    // Close when clicking outside navbar
    document.addEventListener('click', function (event) {
      if (navbar && !navbar.contains(event.target) && navLinks.classList.contains('mobile-active')) {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
        navbar.classList.remove('nav-open');
      }
    });
  }

  // 3. Reveal on Scroll Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // 4. Animated Counters for Stats Section
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  function runCounters() {
    if (animated) return;
    animated = true;
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const timer = setInterval(function () {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = count;
        }
      }, 35);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0] && entries[0].isIntersecting) {
        runCounters();
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
  } else {
    runCounters();
  }

  // 5. Service Trigger & "KNOW MORE" Actions
  const serviceTriggers = document.querySelectorAll('[data-service-trigger]');
  const contactServiceSelect = document.getElementById('contact-service-select');
  const contactSection = document.getElementById('contact');
  const contactDetailsInput = document.querySelector('.contact-textarea');

  serviceTriggers.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const serviceName = this.getAttribute('data-service-trigger');
      
      if (contactServiceSelect && serviceName) {
        contactServiceSelect.value = serviceName;
      }

      if (contactDetailsInput && serviceName) {
        contactDetailsInput.placeholder = `Tell us about your ${serviceName} project goals, timeline, and requirements...`;
        contactDetailsInput.focus();
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const formPanel = document.querySelector('.contact-glass-card');
        if (formPanel) {
          formPanel.style.transition = 'all 0.5s ease';
          formPanel.style.borderColor = 'var(--cyber-blue)';
          formPanel.style.boxShadow = '0 0 40px rgba(0, 198, 255, 0.35)';
          setTimeout(function () {
            formPanel.style.borderColor = '';
            formPanel.style.boxShadow = '';
          }, 2200);
        }
      }
    });
  });

  // 6. Contact Form Handler (Connected to Microsoft SQL Server)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = btn ? btn.innerHTML : 'Send Message <i data-lucide="send" style="width:18px;height:18px;"></i>';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Submitting to database...';
      }

      if (formStatus) formStatus.innerHTML = '';

      const formData = {
        fullName: document.getElementById('contact-name')?.value || '',
        email: document.getElementById('contact-email')?.value || '',
        phone: document.getElementById('contact-phone')?.value || '',
        interestedService: document.getElementById('contact-service-select')?.value || '',
        projectDetails: document.getElementById('contact-details')?.value || ''
      };

      try {
        let data = null;
        const candidateEndpoints = [
          '/api/contact',
          'http://localhost:3001/api/contact',
          'http://localhost:3000/api/contact',
          'http://localhost:5000/api/contact'
        ];

        for (const endpoint of candidateEndpoints) {
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
            if (response.ok) {
              const parsed = await response.json();
              if (parsed && parsed.success) {
                data = parsed;
                break;
              }
            }
          } catch (e) {
            // try next candidate
          }
        }

        if (data && data.success) {
          if (formStatus) {
            formStatus.innerHTML = `
              <div style="padding:16px 20px; border-radius:14px; background:rgba(34,197,94,0.12); border:1px solid #22c55e; color:#4ade80; text-align:center; font-weight:600; line-height:1.5;">
                ✨ ${data.message || 'Thank you! Your request has been received. Our team will contact you within 2 hours.'}
              </div>`;
          }
          contactForm.reset();
        } else {
          throw new Error('Database server is not reachable. Please ensure the backend is running.');
        }
      } catch (err) {
        console.error('Contact Form Submission Error:', err);
        if (formStatus) {
          formStatus.innerHTML = `
            <div style="padding:16px 20px; border-radius:14px; background:rgba(239,68,68,0.15); border:1px solid #ef4444; color:#f87171; text-align:center; font-weight:500; line-height:1.5;">
              ⚠️ ${err.message || 'Error connecting to database server. Please ensure the backend server is running.'}
            </div>`;
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalBtnHtml;
          if (window.lucide) window.lucide.createIcons();
        }
      }
    });
  }

  // 6. Social Media Secondary Drawer Toggle
  const socialToggleBtn = document.getElementById('social-toggle-btn');
  const socialDrawer = document.getElementById('social-secondary-drawer');
  if (socialToggleBtn && socialDrawer) {
    socialToggleBtn.addEventListener('click', function () {
      const isOpen = socialDrawer.classList.toggle('is-open');
      const label = socialToggleBtn.querySelector('span');
      if (label) {
        label.textContent = isOpen ? 'Show Fewer Campaigns' : 'View All Partner Campaigns';
      }
      if (window.lucide) window.lucide.createIcons();
      // Trigger scroll recalculation
      window.dispatchEvent(new Event('scroll'));
    });
  }
});

