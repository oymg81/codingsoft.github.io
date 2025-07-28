const texts = {
  en: {
    title: "Welcome to CodingSoft",
    description: "Your portal for smart solutions and modern web development.",
    navAbout: "About Me",
    navServices: "Services",
    navContact: "Contact",
    langBtn: "Español"
  },
  es: {
    title: "Bienvenido a CodingSoft",
    description: "Tu portal para soluciones inteligentes y desarrollo web moderno.",
    navAbout: "Sobre mí",
    navServices: "Servicios",
    navContact: "Contacto",
    langBtn: "English"
  }
};

let currentLang = "en";

function updateContent() {
  document.getElementById("title").innerText = texts[currentLang].title;
  document.getElementById("description").innerText = texts[currentLang].description;
  document.getElementById("navAbout").innerText = texts[currentLang].navAbout;
  document.getElementById("navServices").innerText = texts[currentLang].navServices;
  document.getElementById("navContact").innerText = texts[currentLang].navContact;
  document.getElementById("langBtn").innerText = texts[currentLang].langBtn;
}

document.getElementById("langBtn").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  updateContent();
});

// Load initial content
updateContent();
