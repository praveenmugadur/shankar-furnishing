/* ============================================
   SHANKAR FURNISHING v2.0 — Interactive Features
   ============================================ */

// ---- Gallery Data (Curated 45 images) ----
const GALLERY_DATA = [
    // CURTAINS (20)
    { src: 'images/curtain-dark-living-room-1.jpg', title: 'Dark Elegance Living Room', category: 'curtains' },
    { src: 'images/curtain-dark-living-room-2.jpg', title: 'Premium Living Room Drapes', category: 'curtains' },
    { src: 'images/curtain-beige-bedroom-1.jpg', title: 'Beige Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-double-1.jpg', title: 'Double Layer Beige Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-sheer-1.jpg', title: 'Sheer Beige Window Treatment', category: 'curtains' },
    { src: 'images/curtain-beige-skylight-1.jpg', title: 'Skylight Curtain Installation', category: 'curtains' },
    { src: 'images/curtain-beige-skylight-3.jpg', title: 'Skylight Beige Drapes', category: 'curtains' },
    { src: 'images/curtain-beige-tall-1.jpg', title: 'Tall Window Beige Curtains', category: 'curtains' },
    { src: 'images/curtain-beige-tall-2.jpg', title: 'Floor-to-Ceiling Drapes', category: 'curtains' },
    { src: 'images/curtain-cream-living-1.jpg', title: 'Cream Living Room Curtains', category: 'curtains' },
    { src: 'images/curtain-cream-living-2.jpg', title: 'Elegant Cream Drapes', category: 'curtains' },
    { src: 'images/curtain-cream-sheer-bedroom.jpg', title: 'Sheer Cream Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-bedroom-1.jpg', title: 'Grey Bedroom Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-sheer-1.jpg', title: 'Grey Sheer Curtains', category: 'curtains' },
    { src: 'images/curtain-grey-sheer-2.jpg', title: 'Double Grey Sheer Panels', category: 'curtains' },
    { src: 'images/curtain-grey-skylight-2.jpg', title: 'Grey Skylight Curtains', category: 'curtains' },
    { src: 'images/curtain-room-view-1.jpg', title: 'Complete Room Curtain View', category: 'curtains' },
    { src: 'images/curtain-room-view-3.jpg', title: 'Bedroom Curtain Ensemble', category: 'curtains' },
    { src: 'images/curtain-room-view-4.jpg', title: 'Curtain Room Transformation', category: 'curtains' },
    { src: 'images/curtain-stairway-dark.jpg', title: 'Stairway Dark Curtains', category: 'curtains' },

    // ROMAN BLINDS (3)
    { src: 'images/roman-blind-beige-1.jpg', title: 'Beige Roman Blind', category: 'blinds' },
    { src: 'images/roman-blind-beige-2.jpg', title: 'Roman Blind with Curtain Combo', category: 'blinds' },
    { src: 'images/curtain-roman-blind-room.jpg', title: 'Roman Blind & Curtain Setup', category: 'blinds' },

    // UPHOLSTERY (4)
    { src: 'images/sofa-cushion-grey-1.jpg', title: 'Grey Sofa Cushion Set', category: 'upholstery' },
    { src: 'images/sofa-cushion-grey-2.jpg', title: 'Cushion Collection', category: 'upholstery' },
    { src: 'images/sofa-cushion-grey-3.jpg', title: 'Decorative Cushion Arrangement', category: 'upholstery' },
    { src: 'images/curtain-white-sheer-stairway.jpg', title: 'White Sheer Stairway Drapes', category: 'curtains' },

    // HEADBOARDS (15 — NEW!)
    { src: 'images/headboard-teal-diamond-chandelier.jpg', title: 'Teal Diamond with Crystal Chandelier', category: 'headboards' },
    { src: 'images/headboard-luxury-velvet-gold.jpg', title: 'Luxury Velvet with Gold Accents', category: 'headboards' },
    { src: 'images/headboard-herringbone-cushions.jpg', title: 'Herringbone Pattern with Cushions', category: 'headboards' },
    { src: 'images/headboard-blue-led-diamond.jpg', title: 'Blue LED Diamond Pattern', category: 'headboards' },
    { src: 'images/headboard-marble-led-channels.jpg', title: 'Marble Wall with LED Channels', category: 'headboards' },
    { src: 'images/headboard-luxury-tufted-bedroom.jpg', title: 'Luxury Tufted Bedroom Setup', category: 'headboards' },
    { src: 'images/headboard-scalloped-white-curtains.jpg', title: 'Scalloped Headboard with White Curtains', category: 'headboards' },
    { src: 'images/headboard-scalloped-curtains-angle2.jpg', title: 'Designer Scalloped Headboard', category: 'headboards' },
    { src: 'images/headboard-tropical-wallpaper.jpg', title: 'Tropical Wallpaper Bedroom', category: 'headboards' },
    { src: 'images/headboard-tan-leather-panel.jpg', title: 'Tan Leather Panel Headboard', category: 'headboards' },
    { src: 'images/headboard-purple-arch-blinds.jpg', title: 'Purple Arch with Roman Blinds', category: 'headboards' },
    { src: 'images/headboard-diamond-tufted-amber.jpg', title: 'Diamond Tufted Amber Headboard', category: 'headboards' },
    { src: 'images/headboard-braided-gold-accent.jpg', title: 'Braided Pink & Gold Accent Wall', category: 'headboards' },
    { src: 'images/headboard-honeycomb-gold-panel.jpg', title: 'Honeycomb Gold Panel Design', category: 'headboards' },
    { src: 'images/headboard-geometric-gold-led.jpg', title: 'Geometric Diamond with Gold LED', category: 'headboards' },
];

// ---- State ----
let currentFilter = 'all';
let visibleCount = 12;
const ITEMS_PER_LOAD = 9;
let lightboxIndex = 0;
let filteredItems = [];
let testimonialIndex = 0;
let testimonialInterval = null;

// ---- Firebase Data Loading ----
let firebaseDataLoaded = false;

async function loadFirebaseData() {
    try {
        if (typeof initFirebase === 'function' && initFirebase()) {
            const fbDb = firebase.firestore();
            
            // Load gallery from Firebase
            const galSnap = await fbDb.collection('gallery').orderBy('createdAt', 'desc').get();
            if (!galSnap.empty) {
                GALLERY_DATA.length = 0; // Clear hardcoded data
                galSnap.forEach(doc => {
                    const d = doc.data();
                    GALLERY_DATA.push({ src: d.imageUrl, title: d.title, category: d.category });
                });
            }
            
            // Load site content
            const contentDoc = await fbDb.collection('siteContent').doc('main').get();
            if (contentDoc.exists) {
                const c = contentDoc.data();
                if (c.heroBadge) {
                    const badge = document.querySelector('.hero-badge');
                    if (badge) { const dot = badge.querySelector('.badge-dot'); badge.innerHTML = ''; if (dot) badge.appendChild(dot); badge.append(' ' + c.heroBadge); }
                }
                if (c.heroTitle) {
                    const title = document.querySelector('.hero-title');
                    if (title) title.innerHTML = c.heroTitle.replace(/(Extraordinary|ಅಸಾಧಾರಣ)/g, '<span class="text-gradient">$1</span>');
                }
                if (c.heroSubtitle) { const sub = document.querySelector('.hero-subtitle'); if (sub) sub.textContent = c.heroSubtitle; }
                if (c.statProjects) { const el = document.querySelector('[data-target]'); if (el) el.dataset.target = c.statProjects; }
                const statEls = document.querySelectorAll('.stat-number');
                if (c.statProjects && statEls[0]) statEls[0].dataset.target = c.statProjects;
                if (c.statYears && statEls[1]) statEls[1].dataset.target = c.statYears;
                if (c.statClients && statEls[2]) statEls[2].dataset.target = c.statClients;
                if (c.statRating && statEls[3]) statEls[3].dataset.target = c.statRating;
                if (c.aboutDesc) { const ad = document.querySelector('.about-section .section-desc'); if (ad) ad.textContent = c.aboutDesc; }
            }
            
            // Load testimonials
            const testSnap = await fbDb.collection('testimonials').orderBy('createdAt', 'desc').get();
            if (!testSnap.empty) {
                const track = document.getElementById('testimonial-track');
                if (track) {
                    track.innerHTML = '';
                    testSnap.forEach(doc => {
                        const d = doc.data();
                        const initials = d.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                        const stars = '★'.repeat(d.stars || 5);
                        track.innerHTML += `
                            <div class="testimonial-card">
                                <div class="testimonial-stars">${stars}</div>
                                <p class="testimonial-text">"${d.text}"</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar">${initials}</div>
                                    <div>
                                        <div class="author-name">${d.name}</div>
                                        <div class="author-location">${d.location}</div>
                                    </div>
                                </div>
                            </div>`;
                    });
                }
            }

            // Load contact info
            const contactDoc = await fbDb.collection('siteContent').doc('contact').get();
            if (contactDoc.exists) {
                const c = contactDoc.data();
                const cards = document.querySelectorAll('.contact-card');
                if (c.location && cards[0]) { const p = cards[0].querySelector('p'); if (p) p.textContent = c.location; }
                if (c.phone && cards[1]) { const a = cards[1].querySelector('a'); if (a) { a.href = `tel:${c.phone}`; a.textContent = c.phone; } }
                if (c.whatsapp && cards[2]) { const a = cards[2].querySelector('a'); if (a) a.href = `https://wa.me/${c.whatsapp}`; }
                if (c.hours && cards[3]) { const p = cards[3].querySelector('p'); if (p) p.textContent = c.hours; }
                if (c.owner && cards[4]) { const p = cards[4].querySelector('p'); if (p) p.textContent = c.owner; }
                // Update WhatsApp links
                if (c.whatsapp) {
                    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
                        const msg = a.href.includes('text=') ? a.href.split('text=')[1] : '';
                        a.href = `https://wa.me/${c.whatsapp}${msg ? '?text=' + msg : ''}`;
                    });
                }
            }
            
            firebaseDataLoaded = true;
            console.log('Firebase data loaded successfully');
        }
    } catch (err) {
        console.warn('Firebase load failed, using fallback data:', err.message);
    }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
    initPreloader();
    initNavbar();
    initMobileMenu();
    
    // Try loading from Firebase first, then render gallery
    await loadFirebaseData();
    
    initGallery();
    initFilters();
    initLightbox();
    initStatsCounter();
    initTestimonialsCarousel();
    initScrollReveal();
    initParallax();
    initSmoothScroll();
    initLanguageToggle();
});

// ---- Preloader ----
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);
}

// ---- Navbar ----
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// ---- Gallery ----
function initGallery() {
    renderGallery();
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    const loadMoreContainer = document.getElementById('load-more-container');

    filteredItems = currentFilter === 'all'
        ? [...GALLERY_DATA]
        : GALLERY_DATA.filter(item => item.category === currentFilter);

    const itemsToShow = filteredItems.slice(0, visibleCount);

    grid.innerHTML = itemsToShow.map((item, index) => `
        <div class="gallery-item" style="animation-delay: ${index * 0.05}s" data-index="${index}">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-overlay-icon">
                    <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
                <div class="gallery-overlay-text">${item.title}</div>
                <div class="gallery-overlay-category">${getCategoryLabel(item.category)}</div>
            </div>
        </div>
    `).join('');

    // Show/hide load more
    if (filteredItems.length > visibleCount) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }

    // Attach click handlers
    grid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });
    });
}

function getCategoryLabel(category) {
    const labels = {
        curtains: 'Curtains',
        blinds: 'Roman Blinds',
        headboards: 'Headboards',
        upholstery: 'Upholstery'
    };
    return labels[category] || category;
}

// ---- Filters ----
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            visibleCount = 12;
            renderGallery();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        visibleCount += ITEMS_PER_LOAD;
        renderGallery();
    });
}

// ---- Lightbox ----
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    lightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightbox();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + filteredItems.length) % filteredItems.length;
    updateLightbox();
}

function updateLightbox() {
    const item = filteredItems[lightboxIndex];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-img').alt = item.title;
    document.getElementById('lightbox-caption').textContent = item.title;
    document.getElementById('lightbox-counter').textContent = `${lightboxIndex + 1} / ${filteredItems.length}`;
}

// ---- Stats Counter ----
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(el => {
                    const target = parseInt(el.dataset.target);
                    animateCounter(el, target);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
}

function animateCounter(el, target) {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, stepTime);
}

// ---- Testimonials Carousel ----
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    // Create dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to review ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        testimonialIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto-rotate
    testimonialInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % totalCards;
        goToSlide(testimonialIndex);
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    track.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % totalCards;
            goToSlide(testimonialIndex);
        }, 5000);
    });

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(testimonialInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && testimonialIndex < totalCards - 1) {
                goToSlide(testimonialIndex + 1);
            } else if (diff < 0 && testimonialIndex > 0) {
                goToSlide(testimonialIndex - 1);
            }
        }
    }, { passive: true });
}

// ---- Scroll Reveal ----
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealSelectors = [
        '.service-card',
        '.about-feature',
        '.contact-card',
        '.about-image-wrapper',
        '.section-header'
    ];

    setTimeout(() => {
        revealSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${i * 0.1}s`;
                observer.observe(el);
            });
        });
    }, 100);
}

// ---- Parallax ----
function initParallax() {
    const heroImg = document.querySelector('.hero-bg-img');
    if (!heroImg) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrollY < heroHeight) {
            const parallaxOffset = scrollY * 0.3;
            heroImg.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
        }
    }, { passive: true });
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ---- Language Toggle (EN / Kannada) ----
const TRANSLATIONS = {
    kn: {
        // Nav
        nav: ['ಮನೆ', 'ನಮ್ಮ ಬಗ್ಗೆ', 'ಸೇವೆಗಳು', 'ಗ್ಯಾಲರಿ', 'ವಿಮರ್ಶೆಗಳು', 'ಸಂಪರ್ಕ'],
        // Hero
        heroBadge: 'ಪ್ರೀಮಿಯಂ ಇಂಟೀರಿಯರ್ ಫರ್ನಿಶಿಂಗ್',
        heroTitle: ['ಅಸಾಧಾರಣ', 'ಸ್ಥಳಗಳನ್ನು ರಚಿಸುವುದು'],
        heroSubtitle: 'ಸೊಗಸಾದ ಪರದೆಗಳಿಂದ ಡಿಸೈನರ್ ಹೆಡ್‌ಬೋರ್ಡ್‌ಗಳವರೆಗೆ — ನಾವು ಮನೆಗಳನ್ನು ಸುಂದರ ಗೃಹಗಳಾಗಿ ಪರಿವರ್ತಿಸುತ್ತೇವೆ.',
        heroBtn1: 'ನಮ್ಮ ಕೆಲಸ ನೋಡಿ',
        heroBtn2: 'WhatsApp ಮಾಡಿ',
        heroScroll: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
        // Stats
        statLabels: ['ಯೋಜನೆಗಳು ಪೂರ್ಣ', 'ವರ್ಷಗಳ ಅನುಭವ', 'ಸಂತೋಷ ಗ್ರಾಹಕರು', 'Google ರೇಟಿಂಗ್'],
        // About
        aboutTag: 'ನಾವು ಯಾರು',
        aboutTitle: ['ಸುಂದರ ಸ್ಥಳಗಳನ್ನು ರಚಿಸುತ್ತಿದ್ದೇವೆ', '2000 ರಿಂದ'],
        aboutDesc: 'ಶಂಕರ್ ಫರ್ನಿಶಿಂಗ್‌ನಲ್ಲಿ, ಪ್ರತಿ ಸ್ಥಳವೂ ಒಂದು ಕಥೆ ಹೇಳುತ್ತದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಪ್ರೀಮಿಯಂ ಬಟ್ಟೆಗಳು, ತಜ್ಞ ಕರಕುಶಲತೆ ಮತ್ತು ವಿವರಗಳ ಕಡೆಗೆ ಗಮನದೊಂದಿಗೆ ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಸಾಕಾರಗೊಳಿಸುತ್ತೇವೆ.',
        aboutBadgeText: 'ವರ್ಷಗಳ ಉತ್ಕೃಷ್ಟತೆ',
        aboutFeatures: [
            { h: 'ಕಸ್ಟಮ್ ಡಿಸೈನ್', p: 'ಪ್ರತಿ ಸ್ಥಳ ಮತ್ತು ಶೈಲಿಗೆ ಸೂಕ್ತವಾದ ಪರಿಹಾರಗಳು' },
            { h: 'ಪ್ರೀಮಿಯಂ ಗುಣಮಟ್ಟ', p: 'ಪ್ರತಿ ಯೋಜನೆಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಬಟ್ಟೆ ಮತ್ತು ಸಾಮಗ್ರಿ ಮಾತ್ರ' },
            { h: 'ತಜ್ಞ ಅಳವಡಿಕೆ', p: 'ವೃತ್ತಿಪರ ತಂಡವು ಪ್ರತಿ ಬಾರಿ ಪರಿಪೂರ್ಣ ಅಳವಡಿಕೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ' },
            { h: 'ಅತ್ಯುತ್ತಮ ಬೆಲೆ', p: 'ಗುಣಮಟ್ಟದಲ್ಲಿ ರಾಜಿ ಮಾಡಿಕೊಳ್ಳದೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಬೆಲೆ' }
        ],
        // Services
        servicesTag: 'ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ',
        servicesTitle: ['ನಮ್ಮ', 'ಸೇವೆಗಳು'],
        servicesDesc: 'ಸೊಗಸಾದ ಕಿಟಕಿ ಅಲಂಕಾರದಿಂದ ಐಷಾರಾಮಿ ಹೆಡ್‌ಬೋರ್ಡ್‌ಗಳವರೆಗೆ, ಸಂಪೂರ್ಣ ಫರ್ನಿಶಿಂಗ್ ಪರಿಹಾರಗಳನ್ನು ನೀಡುತ್ತೇವೆ.',
        serviceCards: [
            { h: 'ಪರದೆಗಳು ಮತ್ತು ಡ್ರೇಪ್ಸ್', p: 'ಶೀರ್‌ನಿಂದ ಬ್ಲ್ಯಾಕ್‌ಔಟ್‌ವರೆಗೆ, ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ಸೂಕ್ತವಾದ ಕಿಟಕಿ ಅಲಂಕಾರ.' },
            { h: 'ರೋಮನ್ ಬ್ಲೈಂಡ್ಸ್', p: 'ಗೌಪ್ಯತೆ, ಬೆಳಕಿನ ನಿಯಂತ್ರಣ ಮತ್ತು ಸೌಂದರ್ಯವನ್ನು ಒಟ್ಟಿಗೆ ತರುವ ಆಧುನಿಕ ಬ್ಲೈಂಡ್ಸ್.' },
            { h: 'ಕಸ್ಟಮ್ ಹೆಡ್‌ಬೋರ್ಡ್', p: 'ಟಫ್ಟಿಂಗ್, LED ಅಕ್ಸೆಂಟ್ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಫಿನಿಶ್‌ಗಳೊಂದಿಗೆ ಡಿಸೈನರ್ ಹೆಡ್‌ಬೋರ್ಡ್.' },
            { h: 'ಅಪ್ಹೋಲ್ಸ್ಟರಿ ಮತ್ತು ಕುಷನ್', p: 'ಸೋಫಾ ಪುನರ್ನಿರ್ಮಾಣ, ಕಸ್ಟಮ್ ಕುಷನ್ ಮತ್ತು ಮೃದು ಫರ್ನಿಶಿಂಗ್ ಪರಿಹಾರಗಳು.' }
        ],
        serviceOverlay: 'ಯೋಜನೆಗಳು ನೋಡಿ →',
        // Gallery
        galleryTag: 'ನಮ್ಮ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
        galleryTitle: ['ನಮ್ಮ ಇತ್ತೀಚಿನ', 'ಕೆಲಸ'],
        galleryDesc: 'ನಮ್ಮ ಇತ್ತೀಚಿನ ಅಳವಡಿಕೆಗಳು ಮತ್ತು ಪರಿವರ್ತನೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
        filterBtns: ['ಎಲ್ಲಾ', 'ಪರದೆಗಳು', 'ರೋಮನ್ ಬ್ಲೈಂಡ್ಸ್', 'ಹೆಡ್‌ಬೋರ್ಡ್', 'ಅಪ್ಹೋಲ್ಸ್ಟರಿ'],
        loadMore: 'ಇನ್ನಷ್ಟು ನೋಡಿ',
        // Testimonials
        testimonialsTag: 'ಗ್ರಾಹಕರ ಪ್ರೀತಿ',
        testimonialsTitle: ['ನಮ್ಮ ಗ್ರಾಹಕರ', 'ಅಭಿಪ್ರಾಯ'],
        testimonials: [
            '"ಶಂಕರ್ ಫರ್ನಿಶಿಂಗ್ ನಮ್ಮ ಸಂಪೂರ್ಣ ಮನೆಯನ್ನು ಪರಿವರ್ತಿಸಿದರು. ಪರದೆ ಮತ್ತು ಹೆಡ್‌ಬೋರ್ಡ್ ಕೆಲಸ ಅದ್ಭುತವಾಗಿದೆ. ಅತ್ಯಂತ ವೃತ್ತಿಪರ ತಂಡ!"',
            '"ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡದ ಅತ್ಯುತ್ತಮ ಫರ್ನಿಶಿಂಗ್ ಅಂಗಡಿ! ಬಟ್ಟೆಗಳ ಗುಣಮಟ್ಟ ಮತ್ತು ಹೆಡ್‌ಬೋರ್ಡ್ ಕರಕುಶಲತೆ ಅಸಾಧಾರಣ. ಉತ್ತಮ ಬೆಲೆ."',
            '"ಸಿದ್ದು ಭಾಯ್ ಮತ್ತು ಅವರ ತಂಡ ನಮ್ಮ ಹೊಸ ಫ್ಲಾಟ್‌ನಲ್ಲಿ ಅದ್ಭುತ ಕೆಲಸ ಮಾಡಿದ್ದಾರೆ. ರೋಮನ್ ಬ್ಲೈಂಡ್ಸ್ ಮತ್ತು ಪರದೆಗಳು ಪರಿಪೂರ್ಣ. ಎಲ್ಲರಿಗೂ ಶಿಫಾರಸು!"',
            '"ಅವರು ನಮ್ಮ ಮಾಸ್ಟರ್ ಬೆಡ್‌ರೂಮ್‌ಗಾಗಿ ಡಿಸೈನ್ ಮಾಡಿದ LED ಹೆಡ್‌ಬೋರ್ಡ್ ಅದ್ಭುತ! ಪ್ರತಿ ಅತಿಥಿಯೂ ಹೊಗಳುತ್ತಾರೆ. ಅತ್ಯದ್ಭುತ ಕೆಲಸ."',
            '"ಆರಂಭದಿಂದ ಕೊನೆಯವರೆಗೆ ಅತ್ಯುತ್ತಮ ಸೇವೆ. ನಮಗೆ ಏನು ಬೇಕೆಂದು ನಿಖರವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡು ನಿರೀಕ್ಷೆಗಿಂತ ಮೀರಿ ಡೆಲಿವರ್ ಮಾಡಿದರು. ನಿಜವಾದ ವೃತ್ತಿಪರರು!"'
        ],
        // CTA
        ctaTitle: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?',
        ctaDesc: 'ನಿಮ್ಮ ಯೋಜನೆಗೆ ಉಚಿತ ಸಮಾಲೋಚನೆ ಮತ್ತು ಕೋಟ್ ಪಡೆಯಿರಿ',
        ctaBtn: 'WhatsApp ನಲ್ಲಿ ಉಚಿತ ಕೋಟ್ ಪಡೆಯಿರಿ',
        // Contact
        contactTag: 'ಸಂಪರ್ಕಿಸಿ',
        contactTitle: ['ನಮ್ಮ', 'ಅಂಗಡಿಗೆ ಭೇಟಿ ನೀಡಿ'],
        contactLabels: ['ಸ್ಥಳ', 'ಫೋನ್', 'WhatsApp', 'ಕೆಲಸದ ಸಮಯ', 'ಮಾಲೀಕ'],
        contactLocation: 'ಶಂಕರ್ ಫರ್ನಿಶಿಂಗ್, ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ, ಕರ್ನಾಟಕ',
        contactChat: 'ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
        contactHours: 'ಸೋಮ–ಶನಿ: ಬೆಳಿಗ್ಗೆ 9:00 – ರಾತ್ರಿ 8:00',
        // Footer
        footerText: '2000 ರಿಂದ ಪ್ರೀಮಿಯಂ ಫರ್ನಿಶಿಂಗ್‌ನೊಂದಿಗೆ ಸ್ಥಳಗಳನ್ನು ಪರಿವರ್ತಿಸುತ್ತಿದ್ದೇವೆ',
        footerCopyright: '© 2025 ಶಂಕರ್ ಫರ್ನಿಶಿಂಗ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
    },
    en: {
        nav: ['Home', 'About', 'Services', 'Gallery', 'Reviews', 'Contact'],
        heroBadge: 'Premium Interior Furnishing',
        heroTitle: ['Extraordinary', 'Crafting'],
        heroSubtitle: 'From elegant curtains to designer headboards — we transform houses into homes with bespoke furnishing solutions.',
        heroBtn1: 'View Our Work',
        heroBtn2: 'WhatsApp Us',
        heroScroll: 'Scroll',
        statLabels: ['Projects Completed', 'Years Experience', 'Happy Clients', 'Google Rating'],
        aboutTag: 'Who We Are',
        aboutTitle: ['Crafting Beautiful Spaces', 'Since 2000'],
        aboutDesc: 'At Shankar Furnishing, we believe every space tells a story. We bring your vision to life with premium fabrics, expert craftsmanship, and attention to detail.',
        aboutBadgeText: 'Years of Excellence',
        aboutFeatures: [
            { h: 'Custom Designs', p: 'Tailored solutions for every space and style preference' },
            { h: 'Premium Quality', p: 'Only the finest fabrics and materials in every project' },
            { h: 'Expert Installation', p: 'Professional team ensures flawless fitting every time' },
            { h: 'Best Value', p: 'Competitive pricing without compromising on quality' }
        ],
        servicesTag: 'What We Do',
        servicesTitle: ['Our', 'Services'],
        servicesDesc: 'From elegant window treatments to luxurious headboards, we offer end-to-end furnishing solutions.',
        serviceCards: [
            { h: 'Curtains & Drapes', p: 'Elegant window treatments from sheer to blackout, tailored to your space.' },
            { h: 'Roman Blinds', p: 'Modern roman blinds that combine privacy, light control and aesthetics.' },
            { h: 'Custom Headboards', p: 'Designer upholstered headboards with tufting, LED accents & premium finishes.' },
            { h: 'Upholstery & Cushions', p: 'Sofa re-upholstery, custom cushions, and soft furnishing solutions.' }
        ],
        serviceOverlay: 'View Projects →',
        galleryTag: 'Our Portfolio',
        galleryTitle: ['Our Recent', 'Work'],
        galleryDesc: 'Browse through our latest installations and transformations',
        filterBtns: ['All', 'Curtains', 'Roman Blinds', 'Headboards', 'Upholstery'],
        loadMore: 'Load More',
        testimonialsTag: 'Client Love',
        testimonialsTitle: ['What Our Clients', 'Say'],
        testimonials: [
            '"Shankar Furnishing transformed our entire home. The curtains and headboard work is absolutely stunning. Highly professional team!"',
            '"Best furnishing shop in Hubli-Dharwad! The quality of fabrics and the craftsmanship of headboards are unmatched. Great value for money."',
            '"Siddu bhai and his team did amazing work on our new flat. Roman blinds and curtains look perfect. Will recommend to everyone!"',
            '"The LED-backlit headboard they designed for our master bedroom is a showstopper! Every guest compliments it. Fantastic work."',
            '"Excellent service from start to finish. They understood exactly what we wanted and delivered beyond expectations. True professionals!"'
        ],
        ctaTitle: 'Ready to Transform Your Space?',
        ctaDesc: 'Get a free consultation and quote for your project',
        ctaBtn: 'Get Free Quote on WhatsApp',
        contactTag: 'Get In Touch',
        contactTitle: ['Visit Our', 'Store'],
        contactLabels: ['Location', 'Phone', 'WhatsApp', 'Working Hours', 'Owner'],
        contactLocation: 'Shankar Furnishing, Hubli-Dharwad, Karnataka',
        contactChat: 'Chat with us',
        contactHours: 'Mon–Sat: 9:00 AM – 8:00 PM',
        footerText: 'Transforming spaces with premium furnishing since 2000',
        footerCopyright: '© 2025 Shankar Furnishing. All rights reserved.'
    }
};

let currentLang = localStorage.getItem('sf_lang') || 'en';

function applyTranslations(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    // Nav links
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach((link, i) => { if (t.nav[i]) link.textContent = t.nav[i]; });

    // Hero
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        const dot = heroBadge.querySelector('.badge-dot');
        heroBadge.innerHTML = '';
        if (dot) heroBadge.appendChild(dot);
        heroBadge.append(' ' + t.heroBadge);
    }
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        if (lang === 'kn') {
            heroTitle.innerHTML = `<span class="text-gradient">${t.heroTitle[0]}</span> ${t.heroTitle[1]}`;
        } else {
            heroTitle.innerHTML = `${t.heroTitle[1]} <span class="text-gradient">${t.heroTitle[0]}</span> Spaces`;
        }
    }
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = t.heroSubtitle;
    const heroBtn1 = document.querySelector('.hero-cta .btn-primary span');
    if (heroBtn1) heroBtn1.textContent = t.heroBtn1;
    const heroBtn2 = document.querySelector('.hero-cta .btn-outline span');
    if (heroBtn2) heroBtn2.textContent = t.heroBtn2;
    const scrollSpan = document.querySelector('.hero-scroll-indicator span');
    if (scrollSpan) scrollSpan.textContent = t.heroScroll;

    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach((el, i) => { if (t.statLabels[i]) el.textContent = t.statLabels[i]; });

    // About
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const tag = aboutSection.querySelector('.section-tag');
        if (tag) tag.textContent = t.aboutTag;
        const title = aboutSection.querySelector('.section-title');
        if (title) title.innerHTML = `${t.aboutTitle[0]} <span class="text-gradient">${t.aboutTitle[1]}</span>`;
        const desc = aboutSection.querySelector('.section-desc');
        if (desc) desc.textContent = t.aboutDesc;
        const badgeText = aboutSection.querySelector('.badge-text');
        if (badgeText) badgeText.textContent = t.aboutBadgeText;
        const features = aboutSection.querySelectorAll('.about-feature');
        features.forEach((f, i) => {
            if (t.aboutFeatures[i]) {
                const h4 = f.querySelector('h4');
                const p = f.querySelector('p');
                if (h4) h4.textContent = t.aboutFeatures[i].h;
                if (p) p.textContent = t.aboutFeatures[i].p;
            }
        });
    }

    // Services
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        const tag = servicesSection.querySelector('.section-tag');
        if (tag) tag.textContent = t.servicesTag;
        const title = servicesSection.querySelector('.section-title');
        if (title) title.innerHTML = `${t.servicesTitle[0]} <span class="text-gradient">${t.servicesTitle[1]}</span>`;
        const desc = servicesSection.querySelector('.section-desc');
        if (desc) desc.textContent = t.servicesDesc;
        const cards = servicesSection.querySelectorAll('.service-card');
        cards.forEach((card, i) => {
            if (t.serviceCards[i]) {
                const h3 = card.querySelector('h3');
                const p = card.querySelector('.service-content p');
                if (h3) h3.textContent = t.serviceCards[i].h;
                if (p) p.textContent = t.serviceCards[i].p;
            }
            const overlay = card.querySelector('.service-overlay a');
            if (overlay) overlay.textContent = t.serviceOverlay;
        });
    }

    // Gallery
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        const tag = gallerySection.querySelector('.section-tag');
        if (tag) tag.textContent = t.galleryTag;
        const title = gallerySection.querySelector('.section-title');
        if (title) title.innerHTML = `${t.galleryTitle[0]} <span class="text-gradient italic">${t.galleryTitle[1]}</span>`;
        const desc = gallerySection.querySelector('.section-desc');
        if (desc) desc.textContent = t.galleryDesc;
        const filterBtns = gallerySection.querySelectorAll('.filter-btn');
        filterBtns.forEach((btn, i) => { if (t.filterBtns[i]) btn.textContent = t.filterBtns[i]; });
        const loadMoreBtn = document.querySelector('#load-more-btn span');
        if (loadMoreBtn) loadMoreBtn.textContent = t.loadMore;
    }

    // Testimonials
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        const tag = testimonialsSection.querySelector('.section-tag');
        if (tag) tag.textContent = t.testimonialsTag;
        const title = testimonialsSection.querySelector('.section-title');
        if (title) title.innerHTML = `${t.testimonialsTitle[0]} <span class="text-gradient italic">${t.testimonialsTitle[1]}</span>`;
        const texts = testimonialsSection.querySelectorAll('.testimonial-text');
        texts.forEach((el, i) => { if (t.testimonials[i]) el.textContent = t.testimonials[i]; });
    }

    // CTA
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        const h2 = ctaContent.querySelector('h2');
        if (h2) h2.textContent = t.ctaTitle;
        const p = ctaContent.querySelector('p');
        if (p) p.textContent = t.ctaDesc;
        const btn = ctaContent.querySelector('.btn span');
        if (btn) btn.textContent = t.ctaBtn;
    }

    // Contact
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const tag = contactSection.querySelector('.section-tag');
        if (tag) tag.textContent = t.contactTag;
        const title = contactSection.querySelector('.section-title');
        if (title) title.innerHTML = `${t.contactTitle[0]} <span class="text-gradient">${t.contactTitle[1]}</span>`;
        const cards = contactSection.querySelectorAll('.contact-card');
        cards.forEach((card, i) => {
            const h4 = card.querySelector('h4');
            if (h4 && t.contactLabels[i]) h4.textContent = t.contactLabels[i];
        });
        // Location text
        const locationP = cards[0]?.querySelector('p');
        if (locationP) locationP.textContent = t.contactLocation;
        // WhatsApp text
        const whatsappA = cards[2]?.querySelector('a');
        if (whatsappA) whatsappA.textContent = t.contactChat;
        // Hours
        const hoursP = cards[3]?.querySelector('p');
        if (hoursP) hoursP.textContent = t.contactHours;
    }

    // Footer
    const footerText = document.querySelector('.footer-text');
    if (footerText) footerText.textContent = t.footerText;
    const footerCR = document.querySelector('.footer-copyright');
    if (footerCR) footerCR.textContent = t.footerCopyright;

    // Update html lang attribute
    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';
}

function initLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    // Apply saved language on load
    if (currentLang === 'kn') {
        applyTranslations('kn');
        updateToggleUI(toggle, 'kn');
    }

    toggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'kn' : 'en';
        localStorage.setItem('sf_lang', currentLang);
        applyTranslations(currentLang);
        updateToggleUI(toggle, currentLang);
    });
}

function updateToggleUI(toggle, lang) {
    const spans = toggle.querySelectorAll('span');
    if (lang === 'kn') {
        spans[0].className = 'lang-inactive';
        spans[0].textContent = 'EN';
        spans[2].className = 'lang-active';
        spans[2].textContent = 'ಕನ';
        toggle.title = 'Switch to English';
    } else {
        spans[0].className = 'lang-active';
        spans[0].textContent = 'EN';
        spans[2].className = 'lang-inactive';
        spans[2].textContent = 'ಕನ';
        toggle.title = 'Switch to ಕನ್ನಡ';
    }
}
