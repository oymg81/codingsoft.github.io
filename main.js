document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');

            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
                currentlyActive.querySelector('.icon').textContent = '+';
            }

            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.icon');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '-';
            } else {
                content.style.maxHeight = null;
                icon.textContent = '+';
            }
        });
    });

    // 4. Client Results Section
    function renderClientResults() {
        const resultsGrid = document.getElementById('results-grid');
        if (!resultsGrid) {
            console.warn("results-grid NOT found");
            return;
        }
        console.log("results-grid found");

        if (!window.clientResults) {
            console.warn("window.clientResults is missing or undefined");
            return;
        }
        console.log("clientResults count: " + window.clientResults.length);

        const isEn = currentLang === 'en';
        resultsGrid.innerHTML = window.clientResults.map((item, idx) => {
            const industry = isEn ? item.industryEn : item.industryEs;
            const title = isEn ? item.titleEn : item.titleEs;
            const desc = isEn ? item.descEn : item.descEs;
            const ctaText = isEn ? item.ctaEn : item.ctaEs;
            const ctaUrl = isEn ? item.urlEn : item.urlEs;
            const deliveredItems = isEn ? item.deliveredEn : item.deliveredEs;
            const badgeText = isEn ? (item.badgeEn || "Live Site") : (item.badgeEs || "Sitio en Vivo");

            const isExternal = ctaUrl.startsWith('http');
            const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

            const externalIcon = `<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
            const arrowIcon = `<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>`;
            const btnIcon = isExternal ? externalIcon : arrowIcon;

            const deliveredHtml = deliveredItems.map(d => `<span class="delivered-badge">${d}</span>`).join('');

            const defaultIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
            const iconContent = item.iconSvg || item.icon || defaultIcon;

            return `
                <div class="result-card reveal delay-${idx}">
                    <div class="result-card-header">
                        <div class="result-icon">
                            ${iconContent}
                        </div>
                        <span class="result-status-badge status-ready">
                            <span class="status-pulse-dot"></span>
                            <span>${badgeText}</span>
                        </span>
                    </div>
                    <span class="result-industry">${industry}</span>
                    <h3>${title}</h3>
                    <p class="result-description">${desc}</p>
                    <div class="result-delivered">
                        ${deliveredHtml}
                    </div>
                    <div class="result-actions">
                        <a href="${ctaUrl}" ${targetAttr} class="btn btn-demo btn-industry-primary">
                            <span>${ctaText}</span>
                            ${btnIcon}
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        // Observe new elements for reveal animation
        const newRevealElements = resultsGrid.querySelectorAll('.reveal');
        newRevealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
        console.log("Client Results rendered");
    }

    // 5. Language Toggle
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'en';

    function renderIndustryCards() {
        const industryGrid = document.getElementById('industry-grid');
        if (!industryGrid || !window.industriesConfig) return;

        const isEn = currentLang === 'en';
        industryGrid.innerHTML = window.industriesConfig.map((ind, idx) => {
            const title = isEn ? ind.labelEn : ind.labelEs;
            const desc = isEn ? ind.descEn : ind.descEs;
            const isReady = ind.demoStatus === 'ready';
            
            // Primary and Secondary actions according to CTA rules
            const customDemoLabel = isEn ? ind.demoLabelEn : ind.demoLabelEs;
            const demoBtnText = isReady 
                ? (customDemoLabel || (isEn ? "View Demo" : "Ver Demo")) 
                : (isEn ? "Coming Soon" : "Próximamente");
            const requestBtnText = isEn ? "Start Similar Project" : "Iniciar Proyecto Similar";

            // Status badge text
            const statusBadgeText = isReady
                ? (isEn ? "Live Demo" : "Demo en Vivo")
                : (isEn ? "In Development" : "En Desarrollo");
            const statusBadgeClass = isReady ? "status-ready" : "status-soon";

            // Arrow icon SVG for active links
            const externalIcon = `<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
            const arrowIcon = `<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>`;

            // Buttons according to demo status
            const buttonsHtml = isReady
                ? `
                    <a href="${ind.demoUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-demo btn-industry-primary">
                        <span>${demoBtnText}</span>
                        ${externalIcon}
                    </a>
                    <a href="${ind.requestUrl}" class="btn btn-github btn-industry-secondary">
                        <span>${requestBtnText}</span>
                    </a>
                `
                : `
                    <button disabled class="btn btn-demo btn-disabled btn-industry-disabled">
                        <span>${demoBtnText}</span>
                    </button>
                    <a href="${ind.requestUrl}" class="btn btn-demo btn-industry-primary">
                        <span>${requestBtnText}</span>
                        ${arrowIcon}
                    </a>
                `;

            return `
                <div class="industry-card reveal delay-${idx}" id="ind-${ind.slug}">
                    <div class="industry-card-header">
                        <div class="industry-icon">
                            ${ind.iconSvg}
                        </div>
                        <span class="industry-status-badge ${statusBadgeClass}">
                            <span class="status-pulse-dot"></span>
                            <span>${statusBadgeText}</span>
                        </span>
                    </div>
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="industry-buttons">
                        ${buttonsHtml}
                    </div>
                </div>
            `;
        }).join('');

        // Re-observe dynamic cards for scroll reveal animation
        const newRevealElements = industryGrid.querySelectorAll('.reveal');
        newRevealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }

    // =========================================================================
    // 6. Reviews Carousel System
    // =========================================================================
    // TODO:
    // Google Business Profile reviews should sync server-side into FOES.
    // CodingSoft should consume only the public approved-review endpoint.
    // Endpoint: GET https://app.foes.pro/api/public/reviews?workspace=codingsoft
    let currentReviewsData = [];
    let currentSlideIndex = 0;
    let maxSlides = 0;

    async function loadReviews() {
        // Preferred architecture: attempt future FOES API, fallback gracefully to approved local config
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            // Attempt fetch from future public FOES reviews endpoint
            const res = await fetch('https://app.foes.pro/api/public/reviews?workspace=codingsoft', {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    currentReviewsData = data;
                    renderReviews(currentReviewsData);
                    return;
                }
            }
        } catch (e) {
            // Graceful fallback to static approved local config without breaking homepage
        }

        // Fallback to approved local reviews config
        if (window.codingsoftReviews && Array.isArray(window.codingsoftReviews) && window.codingsoftReviews.length > 0) {
            currentReviewsData = window.codingsoftReviews;
            renderReviews(currentReviewsData);
        } else {
            // Hide reviews section if no approved reviews are available
            const reviewsSection = document.getElementById('reviews-section');
            if (reviewsSection) {
                reviewsSection.style.display = 'none';
            }
        }
    }

    function renderReviews(reviews) {
        const track = document.getElementById('reviews-track');
        const dotsContainer = document.getElementById('carousel-dots');
        const section = document.getElementById('reviews-section');
        if (!track || !reviews || reviews.length === 0) {
            if (section) section.style.display = 'none';
            return;
        }

        if (section) section.style.display = 'block';

        track.innerHTML = reviews.map(item => {
            const initial = item.author ? item.author.charAt(0).toUpperCase() : 'C';
            const starsHtml = '★'.repeat(item.rating || 5);
            const sourceLabel = item.source || 'Google';

            return `
                <div class="review-card" tabindex="0" role="group" aria-label="Review by ${item.author}">
                    <div>
                        <div class="review-card-header">
                            <div class="review-stars" aria-label="${item.rating || 5} out of 5 stars">${starsHtml}</div>
                            <span class="review-source-tag">
                                <svg class="google-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                                </svg>
                                <span>${sourceLabel}</span>
                            </span>
                        </div>
                        <p class="review-text">${item.text}</p>
                    </div>
                    <div class="review-author">
                        <div class="review-avatar" aria-hidden="true">${initial}</div>
                        <div class="review-author-info">
                            <span class="review-author-name">${item.author}</span>
                            <span class="review-author-company">${item.company || 'Verified Client'}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        setupCarouselControls();
    }

    function setupCarouselControls() {
        const track = document.getElementById('reviews-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track) return;

        const cards = track.querySelectorAll('.review-card');
        const totalCards = cards.length;
        const isMobile = window.innerWidth <= 900;
        const visiblePerSlide = isMobile ? 1 : 2;
        maxSlides = Math.max(1, totalCards - visiblePerSlide + 1);

        if (currentSlideIndex >= maxSlides) {
            currentSlideIndex = maxSlides - 1;
        }

        // Render Pagination Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < maxSlides; i++) {
                const dot = document.createElement('button');
                dot.className = `carousel-dot ${i === currentSlideIndex ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateCarouselPosition() {
            const cardWidth = cards[0] ? cards[0].offsetWidth : 0;
            const gap = 24; // 1.5rem in px
            const offset = currentSlideIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;

            // Update buttons
            if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
            if (nextBtn) nextBtn.disabled = currentSlideIndex >= maxSlides - 1;

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentSlideIndex);
                });
            }
        }

        function goToSlide(index) {
            currentSlideIndex = Math.max(0, Math.min(index, maxSlides - 1));
            updateCarouselPosition();
        }

        if (prevBtn) {
            prevBtn.onclick = () => goToSlide(currentSlideIndex - 1);
        }
        if (nextBtn) {
            nextBtn.onclick = () => goToSlide(currentSlideIndex + 1);
        }

        // Keyboard accessibility on track
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlideIndex - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlideIndex + 1);
            }
        });

        // Touch / Swipe handling
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    goToSlide(currentSlideIndex + 1);
                } else {
                    goToSlide(currentSlideIndex - 1);
                }
            }
            isDragging = false;
        }, { passive: true });

        updateCarouselPosition();
    }

    window.addEventListener('resize', () => {
        if (currentReviewsData.length > 0) {
            setupCarouselControls();
        }
    });

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (langToggleBtn) {
            langToggleBtn.innerHTML = lang === 'en' ? '🇪🇸' : '🇺🇸';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Render industry cards dynamically
        renderIndustryCards();
        
        // Render client results dynamically
        renderClientResults();

        // Render reviews
        if (currentReviewsData.length > 0) {
            renderReviews(currentReviewsData);
        }
    }

    // Initial load
    setLanguage(currentLang);
    loadReviews();

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'es' : 'en');
        });
    }

    // 7. Chatbot Triggers (restricted to explicit chat-trigger elements only)
    const chatbotTriggers = document.querySelectorAll('.chat-trigger');
    chatbotTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const chatbotToggle = document.getElementById('chatbot-toggle');
            if (chatbotToggle) {
                if (!chatbotToggle.parentElement.querySelector('.chatbot-window').classList.contains('open')) {
                    chatbotToggle.click();
                }
            }
        });
    });

    // 8. Developer Check: FOES Mention Protection
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            const bodyText = document.body.innerText || "";
            if (bodyText.includes("FOES") || bodyText.toLowerCase().includes("foes")) {
                console.error("DEVELOPER WARNING: The term 'FOES' was detected on this page. Please ensure FOES is not mentioned publicly yet according to project guidelines.");
            }
        }, 1000); // Check after dynamic populating completes
    }
});

// 6. Mobile Menu Logic
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.right-nav-actions');

  if (!mobileMenuBtn || !navLinks || !navActions) return;

  // Prevent duplicate event listeners
  if (mobileMenuBtn.dataset.initialized === 'true') return;
  mobileMenuBtn.dataset.initialized = 'true';

  // Mobile Dropdown Toggle
  const dropdown = navLinks.querySelector('.nav-dropdown');
  const dropdownTrigger = navLinks.querySelector('.nav-dropdown-trigger');

  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('active');
      const expanded = dropdown.classList.contains('active');
      dropdownTrigger.setAttribute('aria-expanded', expanded);
    });
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    navActions.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (dropdown) {
      dropdown.classList.remove('active');
      if (dropdownTrigger) {
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  mobileMenuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMobileMenu();
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  navActions.querySelectorAll('a, button').forEach(action => {
    if (action.classList.contains('mobile-menu-btn')) return;
    
    action.addEventListener('click', () => {
      if (!action.id || action.id !== 'lang-toggle') {
        closeMobileMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu =
      navLinks.contains(event.target) ||
      navActions.contains(event.target) ||
      mobileMenuBtn.contains(event.target);

    if (!clickedInsideMenu) {
      closeMobileMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

