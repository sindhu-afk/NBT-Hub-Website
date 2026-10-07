/* ==========================================================================
   NBT HUB - PORTFOLIO HUB & MODAL CASE STUDY ENGINE
   Real Client Projects, Web Platforms & Digital Products
   ========================================================================== */

const PORTFOLIO_DATA = [
  // 1. Dr. Madhuram Chowdry
  {
    id: 'dr-madhuram',
    title: 'Dr. Madhuram Chowdry',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    tagline: 'ORTHOPEDIC CARE',
    watermarkImg: 'assets/portfolio-wm-waves.svg',
    coverImg: 'assets/dr-madhuram-logo.png',
    logoImg: 'assets/dr-madhuram-logo.png',
    isLogo: true,
    tags: ['Orthopedic Specialist', 'Website Maintenance', 'Patient Booking'],
    shortDesc: 'Comprehensive digital footprint, high-speed website maintenance, and patient consultation booking for premier orthopedic surgeon.',
    fullDesc: 'Navabharath Technologies manages the complete digital presence for Dr. Madhuram Chowdry, including high-speed website maintenance, patient inquiry and consultation booking forms, emergency contact routing, and comprehensive search optimization.',
    results: [
      '250% Increase in online patient consultation requests',
      '99.98% Website availability with sub-second page loads',
      'Top 3 Google Search ranking for Orthopedic Specialist Mysore'
    ],
    techStack: ['WordPress', 'SEO Suite', 'Cloudflare CDN', 'Web Security'],
    liveLink: 'https://drmadhuramchowdryortho.com/'
  },

  // 2. Navabharath Technologies
  {
    id: 'navabharath-tech',
    title: 'Navabharath Technologies',
    category: 'corporate',
    categoryLabel: 'Corporate Hub',
    tagline: 'TECH & IT SOLUTIONS',
    watermarkImg: 'assets/portfolio-wm-circuit.svg',
    coverImg: 'assets/logo.png',
    logoImg: 'assets/logo.png',
    isLogo: true,
    tags: ['Corporate Hub', 'IT Services', 'Digital Solutions'],
    shortDesc: 'The flagship digital hub and enterprise agency portal powering next-generation IT and software solutions.',
    fullDesc: 'The official digital enterprise portal of Navabharath Technologies (NBT HUB), architected with custom modern components, real-time interactive project estimators, and dynamic portfolio showcases.',
    results: [
      '50+ Active digital clients and successful deployments',
      'Full-stack in-house software, web & mobile app engineering',
      'Established digital brand authority across Mysore & Karnataka'
    ],
    techStack: ['Modern Web Architecture', 'Lucide Icons', 'Canvas Engine', 'Node.js'],
    liveLink: 'https://www.navabharathtechnologies.com/'
  },

  // 3. TokensBoy
  {
    id: 'tokensboy',
    title: 'TokensBoy',
    category: 'saas',
    categoryLabel: 'SaaS & Apps',
    tagline: 'SAAS & APPS',
    watermarkImg: 'assets/portfolio-wm-leaves.svg',
    coverImg: 'assets/tokensboy-logo.png',
    logoImg: 'assets/tokensboy-logo.png',
    isLogo: true,
    withPlate: true,
    tags: ['SaaS Platform', 'Clinic Tokens', 'Queue Management'],
    shortDesc: 'Easy tokens for Indian clinics. Streamlined queue management and digital appointment reservations.',
    fullDesc: 'Designed and deployed Tokens Boy, an innovative SaaS platform enabling Indian clinics and outpatient departments to streamline token generation, patient queues, and real-time waiting list tracking.',
    results: [
      'Reduced clinic waiting room congestion by 50%',
      '50,000+ Digital patient tokens generated',
      'Instant QR-code & SMS queue alerts for waiting patients',
      'Scalable cloud architecture with 99.99% uptime'
    ],
    techStack: ['React', 'Node.js', 'Google Cloud Platform', 'MongoDB'],
    liveLink: 'https://tokensboy.com/'
  },

  // 4. Nidhi Fresh Basket
  {
    id: 'nidhi-fresh',
    title: 'Nidhi Fresh Basket',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    tagline: 'FARM PRODUCE GROCERY',
    watermarkImg: 'assets/portfolio-wm-botanical.svg',
    coverImg: 'assets/nidhifresh-logo.png',
    logoImg: 'assets/nidhifresh-logo.png',
    isLogo: true,
    withPlate: true,
    tags: ['Farm Fresh Produce', 'E-Commerce', 'Order Automation'],
    shortDesc: 'Digital support, online ordering, and e-commerce maintenance for a farm-fresh produce grocery brand.',
    fullDesc: 'Provides continuous digital marketing, mobile-first web maintenance, and inventory sync for Nidhi Fresh Basket, helping them deliver farm-fresh vegetables and fruits straight to consumer doorsteps across the city.',
    results: [
      '300% Growth in repeat daily grocery orders',
      'Optimized mobile checkout under 3 seconds',
      'Automated WhatsApp inventory stock and order alerts'
    ],
    techStack: ['WooCommerce', 'Flutter App', 'WhatsApp Business API', 'Fastly'],
    liveLink: 'https://nidhifreshbasket.com/'
  },

  // 5. Traditional Crafts
  {
    id: 'mysore-handicrafts',
    title: 'Traditional Crafts',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    tagline: 'CULTURE & HERITAGE',
    watermarkImg: 'assets/portfolio-wm-mandala.svg',
    coverImg: 'assets/mysore-handicrafts-logo.png',
    logoImg: 'assets/mysore-handicrafts-logo.png',
    isLogo: true,
    withPlate: true,
    tags: ['Artisan Crafts', 'Heritage Products', 'Global E-Commerce'],
    shortDesc: 'Global e-commerce portal showcasing authentic Mysore handcrafted rosewood, sandalwood, and silk heritage artifacts to international markets.',
    fullDesc: 'Architected an elegant, heritage-inspired global e-commerce storefront for Traditional Crafts / Mysore Handicrafts, connecting local artisans directly with international buyers with multi-currency payment checkout and worldwide shipping calculation.',
    results: [
      'Expanded artisan sales reach to 18+ international countries',
      'High-res artisan zoom gallery & authenticity verification',
      '99.9% Checkout completion rate with Razorpay & Stripe'
    ],
    techStack: ['Shopify Custom', 'Liquid Engine', 'Stripe Gateway', 'Cloudflare CDN'],
    liveLink: 'https://mysorehandicrafts.com/'
  },

  // 6. Sainik Multispeciality
  {
    id: 'sainik-hospital',
    title: 'Sainik Multispeciality',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    tagline: 'HOSPITAL & EMERGENCY',
    watermarkImg: 'assets/portfolio-wm-hospital.svg',
    coverImg: 'assets/sainik-hospital-logo.png',
    logoImg: 'assets/sainik-hospital-logo.png',
    isLogo: true,
    tags: ['Hospital Portal', '24/7 Emergency', 'OPD Booking'],
    shortDesc: 'Advanced clinical hospital portal featuring doctor profiles, department directories, 24/7 emergency dispatch, and OPD consultation bookings.',
    fullDesc: 'Engineered a modern, patient-first web portal for Sainik Multispeciality Hospital Mysuru. Includes instant emergency ambulance hotline routing, doctor specialty filters, patient admission guidelines, and responsive appointment request forms.',
    results: [
      'Sub-second load times for critical medical and emergency pages',
      'Automated OPD consultation appointment scheduling',
      '300% Boost in local emergency hotline calls'
    ],
    techStack: ['React', 'Express.js', 'PostgreSQL', 'AWS Cloud'],
    liveLink: 'https://sainikmultispecialityhospitalmysuru.com/'
  },

  // 7. JKD Mart
  {
    id: 'jkdmart',
    title: 'JKD Mart',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    tagline: 'RETAIL & CONVENIENCE',
    watermarkImg: 'assets/portfolio-wm-cart.svg',
    coverImg: 'assets/jkdmart-logo.png',
    logoImg: 'assets/jkdmart-logo.png',
    isLogo: true,
    withPlate: true,
    tags: ['B2B E-Commerce', 'Trade Portal', 'Wholesale'],
    shortDesc: 'Trade Better, Scale Faster. High-speed multi-category e-commerce web platform for regional wholesale and retail.',
    fullDesc: 'Created a high-throughput B2B/B2C e-commerce platform for JKD MART under the slogan "Trade Better, Scale Faster", featuring multi-vendor catalog management, fast cart checkout, and automated trade invoicing.',
    results: [
      'Processed ₹1M+ monthly GMV',
      'Sub-second product catalog search index',
      'Seamless payment gateway & bulk ordering workflow'
    ],
    techStack: ['Next.js', 'TailwindCSS', 'Redis Cache', 'Razorpay'],
    liveLink: 'https://jkdmart.com/'
  },

  // 8. Vyapar One
  {
    id: 'vyaparone',
    title: 'Vyapar One',
    category: 'saas',
    categoryLabel: 'SaaS & Apps',
    tagline: 'BUSINESS SOLUTIONS',
    watermarkImg: 'assets/portfolio-wm-chart.svg',
    coverImg: 'assets/vyaparone-logo.png',
    logoImg: 'assets/vyaparone-logo.png',
    isLogo: true,
    withPlate: true,
    tags: ['B2B Billing', 'GST Accounting', 'Inventory Cloud'],
    shortDesc: 'All-in-one GST invoicing, inventory tracking, and regional distributor trade management platform.',
    fullDesc: 'Developed VYAPAROne, an enterprise-grade cloud accounting and GST invoicing engine built specifically for Indian traders, regional distributors, and wholesale merchants.',
    results: [
      '₹50M+ Quarterly invoice billing processed',
      'Automated GST filing & GSTR-1 reconciliation',
      'Sub-second real-time barcode inventory sync'
    ],
    techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    liveLink: 'https://vyaparone.com/'
  }
];

// Render Portfolio Function in Luxury Matrix Grid
function renderPortfolioGrid(filter = 'all', searchQuery = '') {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  const filtered = PORTFOLIO_DATA.filter(item => {
    let matchesFilter = false;
    if (filter === 'all') {
      matchesFilter = true;
    } else if (filter === 'healthcare') {
      matchesFilter = item.category === 'healthcare' || item.categoryLabel === 'Healthcare';
    } else if (filter === 'ecommerce') {
      matchesFilter = item.category === 'ecommerce';
    } else if (filter === 'saas') {
      matchesFilter = item.category === 'saas' || item.category === 'corporate';
    } else {
      matchesFilter = item.category === filter;
    }

    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tagline && item.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 70px 20px; background: rgba(10, 39, 36, 0.6); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); color: var(--silver-steel);">
        <p style="font-size: 1.2rem; font-family: var(--font-heading); color: #FFFFFF;">No projects found matching your query.</p>
        <p style="font-size: 0.9rem; margin-top: 8px;">Try clearing your search or selecting another category.</p>
      </div>
    `;
    return;
  }

  if (window.innerWidth > 768) {
    if (filtered.length === 8 || filtered.length === 4) {
      container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    } else if (filtered.length === 6 || filtered.length === 3) {
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (filtered.length <= 2) {
      container.style.gridTemplateColumns = `repeat(${filtered.length}, 1fr)`;
    } else {
      container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
  } else {
    container.style.gridTemplateColumns = '';
  }

  container.innerHTML = filtered.map(item => `
    <div class="portfolio-tile" onclick="openCaseStudyModal('${item.id}')" title="Click to view ${item.title} Case Study">
      <!-- Subtle Thematic Background Watermark Artwork -->
      <div class="portfolio-tile-watermark">
        <img src="${item.watermarkImg}" alt="" aria-hidden="true" loading="lazy" />
      </div>

      <!-- Top: Centered Brand Logo -->
      <div class="portfolio-tile-top">
        <div class="portfolio-tile-brand ${item.withPlate ? 'with-plate' : ''}">
          <img src="${item.logoImg || item.coverImg}" alt="${item.title} Logo" loading="lazy" />
        </div>
      </div>

      <!-- Bottom: Typography and Interactive Action Button Row -->
      <div class="portfolio-tile-bottom">
        <h4 class="portfolio-tile-title">${item.title}</h4>
        <span class="portfolio-tile-tagline">${item.tagline || item.categoryLabel}</span>

        <div class="portfolio-tile-action-wrap">
          <!-- Default State: Golden Circle Arrow Button -->
          <button class="portfolio-tile-circle-btn" aria-label="View Project" onclick="openCaseStudyModal('${item.id}'); event.stopPropagation();">
            <i data-lucide="arrow-right"></i>
          </button>

          <!-- Hover / Active State: Dual Pill Buttons (TokensBoy state in mockup) -->
          <div class="portfolio-tile-hover-pills">
            <button class="portfolio-pill-btn pill-study" onclick="openCaseStudyModal('${item.id}'); event.stopPropagation();">
              <span>Case Study</span>
              <i data-lucide="eye"></i>
            </button>
            ${item.liveLink && item.liveLink !== '#' ? `
            <a href="${item.liveLink}" target="_blank" rel="noopener noreferrer" class="portfolio-pill-btn pill-live" onclick="event.stopPropagation();">
              <span>Live Site</span>
              <i data-lucide="arrow-up-right"></i>
            </a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Case Study Modal Engine
function openCaseStudyModal(projectId) {
  const project = PORTFOLIO_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
      ${project.isLogo ? `<img src="${project.logoImg}" alt="${project.title} Logo" style="height:52px; width:auto; max-width:85px; border-radius:12px; object-fit:contain; background:#182e2b; padding:8px; border:1px solid rgba(255,255,255,0.12);" />` : ''}
      <div>
        <h2 class="text-silver modal-title-text" style="margin-bottom:4px;">${project.title}</h2>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <span class="badge-gold">${project.categoryLabel}</span>
          <span class="badge-silver font-mono">${project.techStack[0]}</span>
        </div>
      </div>
    </div>
    
    <div class="project-thumb-wrapper ${project.isLogo ? 'has-logo' : ''}" style="margin-bottom:24px; border-radius:16px; background: #0a2724; border: 1px solid rgba(255,255,255,0.08);">
      <img src="${project.coverImg}" alt="${project.title}" class="modal-project-img" style="margin-bottom:0; max-height:170px; object-fit:contain;" />
    </div>

    <p style="font-size: 1.05rem; line-height: 1.7; color: var(--silver-steel); margin-bottom: 24px;">
      ${project.fullDesc}
    </p>

    <h3 style="font-size: 1.2rem; margin-bottom: 14px;" class="text-gold">Key Highlights & Results</h3>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px;">
      ${project.results.map(r => `
        <li style="display:flex; align-items:center; gap:10px; color: var(--silver-light); font-size: 0.95rem;">
          <i data-lucide="check-circle-2" style="color:var(--gold-primary); width:20px; height:20px;"></i>
          ${r}
        </li>
      `).join('')}
    </ul>

    <h3 style="font-size: 1.2rem; margin-bottom: 14px;" class="text-gold">Technology & Strategy Stack</h3>
    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom: 32px;">
      ${project.techStack.map(t => `<span class="badge-silver">${t}</span>`).join('')}
    </div>

    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      ${project.liveLink && project.liveLink !== '#' ? `
        <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-gold" style="text-decoration:none;">
          Launch Live Website <i data-lucide="external-link" style="width:18px;height:18px;"></i>
        </a>
      ` : ''}
      <button class="btn btn-outline-silver" onclick="closeCaseStudyModal()">
        Close Case Study
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Init Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioGrid('all', '');

  // Filter Pills
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      const searchVal = document.getElementById('portfolio-search')?.value || '';
      renderPortfolioGrid(cat, searchVal);
    });
  });

  // Search Input
  const searchInput = document.getElementById('portfolio-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
      renderPortfolioGrid(activeFilter, e.target.value);
    });
  }

  // Responsive Resize Re-render
  window.addEventListener('resize', () => {
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchVal = document.getElementById('portfolio-search')?.value || '';
    renderPortfolioGrid(activeFilter, searchVal);
  });

  // Modal Backdrop Click
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCaseStudyModal();
    });
  }
});
