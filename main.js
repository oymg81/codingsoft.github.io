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
        if (!resultsGrid || !window.clientResults) return;

        const isEn = currentLang === 'en';
        resultsGrid.innerHTML = window.clientResults.map((item, idx) => {
            const industry = isEn ? item.industryEn : item.industryEs;
            const title = isEn ? item.titleEn : item.titleEs;
            const desc = isEn ? item.descEn : item.descEs;
            const ctaText = isEn ? item.ctaEn : item.ctaEs;
            const ctaUrl = isEn ? item.urlEn : item.urlEs;
            const deliveredItems = isEn ? item.deliveredEn : item.deliveredEs;

            const isExternal = ctaUrl.startsWith('http');
            const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

            const deliveredHtml = deliveredItems.map(d => `<span class="delivered-badge">${d}</span>`).join('');

            return `
                <div class="result-card reveal delay-${idx}">
                    <div class="result-card-header">
                        <span class="result-industry">${industry}</span>
                        <h3>${title}</h3>
                    </div>
                    <p class="result-description">${desc}</p>
                    <div class="result-delivered">
                        ${deliveredHtml}
                    </div>
                    <div class="result-actions">
                        <a href="${ctaUrl}" ${targetAttr} class="btn btn-primary glow">${ctaText}</a>
                    </div>
                </div>
            `;
        }).join('');

        // Observe new elements for reveal animation
        const newRevealElements = resultsGrid.querySelectorAll('.reveal');
        newRevealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
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
            
            // Primary and Secondary actions according to CTA rules
            const customDemoLabel = isEn ? ind.demoLabelEn : ind.demoLabelEs;
            const demoBtnText = ind.demoStatus === 'ready' 
                ? (customDemoLabel || (isEn ? "View Demo" : "Ver Demo")) 
                : (isEn ? "Coming Soon" : "Próximamente");
            const requestBtnText = isEn ? "Start Similar Project" : "Iniciar Proyecto Similar";

            // Demo button tag and class
            const demoBtnClass = ind.demoStatus === 'ready' ? 'btn btn-demo' : 'btn btn-demo btn-disabled';
            const demoAttr = ind.demoStatus === 'ready' ? `href="${ind.demoUrl || '#'}" target="_blank" rel="noopener noreferrer"` : 'disabled';
            const demoTag = ind.demoStatus === 'ready' ? 'a' : 'button';

            return `
                <div class="industry-card reveal delay-${idx}" id="ind-${ind.slug}">
                    <div class="industry-icon">
                        ${ind.iconSvg}
                    </div>
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="industry-buttons">
                        <${demoTag} ${demoAttr} class="${demoBtnClass}">${demoBtnText}</${demoTag}>
                        <a href="${ind.requestUrl}" class="btn btn-github">${requestBtnText}</a>
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

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (langToggleBtn) {
            langToggleBtn.innerHTML = lang === 'en' ? '🇪🇸' : '🇺🇸';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Render industry cards dynamically
        renderIndustryCards();
        
        // Render client results dynamically
        renderClientResults();
    }

    setLanguage(currentLang);

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

