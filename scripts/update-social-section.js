const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const newSection = `    <!-- SOCIAL MEDIA WORK SECTION (Matching Reference Mockup) -->
    <section class="social-media-section" id="social-media">
      <div class="container">
        
        <!-- Split Section Header exactly as shown in reference image -->
        <div class="social-header-split reveal-on-scroll">
          <div class="social-header-left">
            <div class="social-eyebrow">
              <span class="eyebrow-dash"></span>
              <span class="eyebrow-text">OUR FEATURED PROJECTS</span>
            </div>
            <h2 class="social-main-title">
              Instagram Profiles <span class="text-gradient-gold">We Manage</span>
            </h2>
          </div>
          <div class="social-header-right">
            <p class="social-header-subtitle">
              A glimpse of the brands we work with — creating meaningful content, engagement and growth.
            </p>
          </div>
        </div>

        <!-- 6 Featured Primary Showcase Grid (Pixel-perfect to user mockup) -->
        <div class="social-grid-featured">
          
          <!-- 1. Madhuram Chowdry -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-madhuram.jpg" alt="Orthopedic Care" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/dr-madhuram-logo.png" alt="Madhuram Chowdry Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Madhuram Chowdry</h3>
                  <span class="social-card-category">ORTHOPEDIC CARE</span>
                </div>
              </div>
              <a href="https://www.instagram.com/madhuramchowdry14/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@madhuramchowdry14</span>
              </a>
              <p class="social-card-desc">
                Medical health awareness, orthopedic treatments, patient education, and consultation campaigns.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/madhuramchowdry14/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/madhuramchowdry14/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Madhuram Chowdry Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 2. AR Hospital Mysuru -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-arhospital.jpg" alt="AR Hospital Mysuru building" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/ar-hospital-logo.png" alt="AR Hospital Mysuru Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">AR Hospital Mysuru</h3>
                  <span class="social-card-category">MULTISPECIALITY HOSPITAL</span>
                </div>
              </div>
              <a href="https://www.instagram.com/ar_hospital_mysuru/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@ar_hospital_mysuru</span>
              </a>
              <p class="social-card-desc">
                Clinical infrastructure, community medical drives, health updates, and emergency hospital care campaigns.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/ar_hospital_mysuru/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/ar_hospital_mysuru/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open AR Hospital Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 3. Dr. Gautam Cougati -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-cougati.jpg" alt="Neurosurgery Brain Hologram" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/dr-gautam-cougati-logo.png" alt="Dr. Gautam Cougati Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Dr. Gautam Cougati</h3>
                  <span class="social-card-category">NEUROSURGEON</span>
                </div>
              </div>
              <a href="https://www.instagram.com/neurosurgeon_goutham_cugati/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@neurosurgeon_goutham_cugati</span>
              </a>
              <p class="social-card-desc">
                Neurosurgery awareness, spine and brain surgical education, clinical expertise, and health reels.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/neurosurgeon_goutham_cugati/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/neurosurgeon_goutham_cugati/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Dr. Gautam Cougati Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 4. Navabharath Technologies -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-navabharath.png" alt="Navabharath Technologies tech desk" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/nbt-shield-clean.png" alt="Navabharath Technologies Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Navabharath Technologies</h3>
                  <span class="social-card-category">TECH &amp; IT SOLUTIONS</span>
                </div>
              </div>
              <a href="https://www.instagram.com/navabharathtechnologies/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@navabharathtechnologies</span>
              </a>
              <p class="social-card-desc">
                Agency milestones, tech innovation updates, client launches, and digital transformation tips.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/navabharathtechnologies/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/navabharathtechnologies/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Navabharath Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 5. Nidhi Fresh Basket -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-nidhifresh.png" alt="Fresh organic vegetables basket" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/nidhifresh-logo.png" alt="Nidhi Fresh Basket Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Nidhi Fresh Basket</h3>
                  <span class="social-card-category">FARM PRODUCE GROCERY</span>
                </div>
              </div>
              <a href="https://www.instagram.com/nidhifreshbasket/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@nidhifreshbasket</span>
              </a>
              <p class="social-card-desc">
                Daily farm-fresh harvests, seasonal organic baskets, promotional deals, and home delivery announcements.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/nidhifreshbasket/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/nidhifreshbasket/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Nidhi Fresh Basket Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 6. TokensBoy -->
          <div class="social-card reveal-on-scroll">
            <div class="social-card-art">
              <img src="assets/social-card-art-tokensboy.png" alt="Digital queue mobile application" loading="lazy" />
            </div>
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/tokensboy-logo.png" alt="TokensBoy Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">TokensBoy</h3>
                  <span class="social-card-category">HEALTHCARE SAAS</span>
                </div>
              </div>
              <a href="https://www.instagram.com/tokensboy/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@tokensboy</span>
              </a>
              <p class="social-card-desc">
                Clinic queue management solutions, digital token advantages, doctor testimonials, and app walkthroughs.
              </p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/tokensboy/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/tokensboy/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open TokensBoy Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Toggle Button for More Client Campaigns -->
        <div class="social-more-toggle-wrap">
          <button type="button" class="social-toggle-btn" id="social-toggle-btn">
            <span>View All Partner Campaigns</span>
            <i data-lucide="chevron-down" id="social-toggle-icon"></i>
          </button>
        </div>

        <!-- Secondary Drawer for Remaining Client Accounts -->
        <div class="social-secondary-drawer" id="social-secondary-drawer">

          <!-- 7. FoodBox Mysuru -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/foodbox-logo.png" alt="FoodBox Mysuru Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">FoodBox Mysuru</h3>
                  <span class="social-card-category">GOURMET DINING</span>
                </div>
              </div>
              <a href="https://www.instagram.com/foodboxmysuru/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@foodboxmysuru</span>
              </a>
              <p class="social-card-desc">Delicious food visual showcases, weekend culinary specials, menu releases, and viral foodie reels.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/foodboxmysuru/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/foodboxmysuru/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open FoodBox Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 8. Novus Health Labs -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/novus-labs-logo.png" alt="Novus Health Labs Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Novus Health Labs</h3>
                  <span class="social-card-category">DIAGNOSTICS &amp; PATHOLOGY</span>
                </div>
              </div>
              <a href="https://www.instagram.com/novushealthlabs/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@novushealthlabs</span>
              </a>
              <p class="social-card-desc">Preventive health test packages, home sample collection drives, pathology insights, and wellness tips.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/novushealthlabs/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/novushealthlabs/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Novus Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 9. Sainik Hospital -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/sainik-hospital-logo.png" alt="Sainik Hospital Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Sainik Multispeciality</h3>
                  <span class="social-card-category">HOSPITAL &amp; EMERGENCY</span>
                </div>
              </div>
              <a href="https://www.instagram.com/sainik_hospital/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@sainik_hospital</span>
              </a>
              <p class="social-card-desc">Advanced emergency medical services, surgical camp announcements, doctor introductions, and OPD schedules.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/sainik_hospital/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/sainik_hospital/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Sainik Hospital Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 10. Sulaksha Hospital -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/sulaksha-hospital-logo.png" alt="Sulaksha Hospital Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Sulaksha Hospital</h3>
                  <span class="social-card-category">HEALTHCARE &amp; MATERNITY</span>
                </div>
              </div>
              <a href="https://www.instagram.com/sulakshaahospital/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@sulakshaahospital</span>
              </a>
              <p class="social-card-desc">Mother and child care guidance, laparoscopic surgeries, health awareness posts, and patient testimonials.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/sulakshaahospital/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/sulakshaahospital/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Sulaksha Hospital Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 11. Nethra Dharini -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/nethra-dharini-logo.png" alt="Nethra Dharini Eye Care Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">Nethra Dharini</h3>
                  <span class="social-card-category">SUPER SPECIALITY EYE CARE</span>
                </div>
              </div>
              <a href="https://www.instagram.com/nethra_dharini/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@nethra_dharini</span>
              </a>
              <p class="social-card-desc">Cataract surgery clarity, retina care education, optical eyewear showcases, and vision care advice.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/nethra_dharini/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/nethra_dharini/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Nethra Dharini Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- 12. The Burger Hub -->
          <div class="social-card">
            <div class="social-card-content">
              <div class="social-card-top">
                <div class="social-avatar-box">
                  <img src="assets/the-burger-hub-logo.png" alt="The Burger Hub Logo" class="social-avatar-img" />
                </div>
                <div class="social-identity">
                  <h3 class="social-card-title">The Burger Hub Mysuru</h3>
                  <span class="social-card-category">FAST CASUAL DINING</span>
                </div>
              </div>
              <a href="https://www.instagram.com/theburgerhubmysuru/" target="_blank" rel="noopener noreferrer" class="social-handle-pill">
                <i data-lucide="instagram" class="insta-glyph"></i>
                <span>@theburgerhubmysuru</span>
              </a>
              <p class="social-card-desc">Mouth-watering burger creations, combo launch reels, student discounts, and buzzing community dining vibes.</p>
              <div class="social-btn-group">
                <a href="https://www.instagram.com/theburgerhubmysuru/" target="_blank" rel="noopener noreferrer" class="social-action-pill">
                  <span>View on Instagram</span>
                  <i data-lucide="arrow-up-right"></i>
                </a>
                <a href="https://www.instagram.com/theburgerhubmysuru/" target="_blank" rel="noopener noreferrer" class="social-action-circle" aria-label="Open Burger Hub Instagram">
                  <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>`;

// Replace from <!-- SOCIAL MEDIA WORK SECTION --> up to </section> before <!-- OUR TEAM SECTION -->
const startMarker = '<!-- SOCIAL MEDIA WORK SECTION -->';
const endMarker = '<!-- OUR TEAM SECTION -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const updated = content.slice(0, startIndex) + newSection + '\n\n    ' + content.slice(endIndex);
fs.writeFileSync(indexPath, updated, 'utf8');
console.log('Successfully updated social-media section in index.html!');
