(function () {
  'use strict';

  var translations = {
    en: {
      profileTitle: "CodingSoft Technology",
      tagline: "Websites. Automation. Business Systems.",
      description: "Custom technology solutions for businesses that want to grow, automate, and operate more efficiently.",
      btnReview: "Leave a Google Review",
      btnWhatsapp: "Chat on WhatsApp",
      btnWebsite: "Visit Website",
      btnSave: "Save Contact",
      btnEmail: "Email",
      waMsg: "Hi CodingSoft, I’d like more information about your services."
    },
    es: {
      profileTitle: "CodingSoft Technology",
      tagline: "Sitios Web. Automatización. Sistemas de Negocio.",
      description: "Soluciones tecnológicas personalizadas para negocios que quieren crecer, automatizar y operar de forma más eficiente.",
      btnReview: "Dejar una Reseña en Google",
      btnWhatsapp: "Hablar por WhatsApp",
      btnWebsite: "Visitar Sitio Web",
      btnSave: "Guardar Contacto",
      btnEmail: "Correo",
      waMsg: "Hola CodingSoft, quisiera más información sobre sus servicios."
    }
  };

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';

    try {
      localStorage.setItem('cs_lang', lang);
    } catch (e) {
      // Ignore fallback if localStorage is restricted
    }

    document.documentElement.lang = lang;

    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    var waBtn = document.getElementById('tap-wa-btn');
    if (waBtn) {
      var msg = translations[lang].waMsg;
      waBtn.href = 'https://wa.me/17863096588?text=' + encodeURIComponent(msg);
    }

    var langBtns = document.querySelectorAll('[data-lang-btn]');
    langBtns.forEach(function (btn) {
      var btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var savedLang = 'en';
    try {
      var stored = localStorage.getItem('cs_lang');
      if (stored && (stored === 'en' || stored === 'es')) {
        savedLang = stored;
      }
    } catch (e) {}

    setLanguage(savedLang);

    var langBtns = document.querySelectorAll('[data-lang-btn]');
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang-btn');
        setLanguage(lang);
      });
    });
  });
})();
