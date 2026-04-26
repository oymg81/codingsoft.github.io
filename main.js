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

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
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

    // 4. Testimonial Slider
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const quoteText = document.querySelector('.quote-text');
    const authorName = document.querySelector('.author-info h4');
    const authorCompany = document.querySelector('.author-info p');
    
    const testimonials = [
        {
            text: `"Partnering with your team transformed our business. Their dedication, technical expertise, and creative solutions were beyond our expectations."`,
            name: "Elenna Kusrov",
            company: "MegaImpact Company"
        },
        {
            text: `"CodingSoft didn't just build us a website; they built a scalable system that automated our workflow. Highly recommend their services."`,
            name: "Marcus Thorne",
            company: "TechNova Solutions"
        },
        {
            text: `"The attention to detail and modern design approach completely elevated our brand. The return on investment has been incredible."`,
            name: "Sarah Jenkins",
            company: "Apex Retail Group"
        }
    ];
    
    let currentTestimonial = 0;

    function updateTestimonial() {
        quoteText.style.opacity = 0;
        authorName.style.opacity = 0;
        authorCompany.style.opacity = 0;
        
        setTimeout(() => {
            quoteText.textContent = testimonials[currentTestimonial].text;
            authorName.textContent = testimonials[currentTestimonial].name;
            authorCompany.textContent = testimonials[currentTestimonial].company;
            
            quoteText.style.opacity = 1;
            authorName.style.opacity = 1;
            authorCompany.style.opacity = 1;
            
            quoteText.style.transition = 'opacity 0.3s ease';
            authorName.style.transition = 'opacity 0.3s ease';
            authorCompany.style.transition = 'opacity 0.3s ease';
        }, 300);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
    }

    // 5. Language Toggle
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        langToggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Testimonial translations mapping is a bit more complex,
        // we'll leave them in English for now or update the objects if we had them translated.
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'es' : 'en');
        });
    }
});
