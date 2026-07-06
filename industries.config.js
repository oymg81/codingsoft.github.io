const industriesConfig = [
  {
    slug: "real-estate",
    labelEn: "Real Estate",
    labelEs: "Bienes Raíces (Real Estate)",
    defaultService: "website-seo",
    requestUrl: "./start-project/?industry=real-estate",
    demoUrl: "#",
    demoStatus: "ready",
    iconName: "home",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>`,
    descEn: "Premium websites for realtors, brokers, and property professionals.",
    descEs: "Sitios web premium para realtors, brokers y profesionales inmobiliarios."
  },
  {
    slug: "construction",
    labelEn: "Construction",
    labelEs: "Construcción",
    defaultService: "business-website",
    requestUrl: "./start-project/?industry=construction",
    demoUrl: "",
    demoStatus: "coming-soon",
    iconName: "tool",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`,
    descEn: "Professional websites for contractors, remodeling, roofing, and construction companies.",
    descEs: "Sitios web profesionales para contratistas, remodelación, roofing y construcción."
  },
  {
    slug: "restaurant",
    labelEn: "Restaurant",
    labelEs: "Restaurante / Gastronomía",
    defaultService: "automation",
    requestUrl: "./start-project/?industry=restaurant",
    demoUrl: "",
    demoStatus: "coming-soon",
    iconName: "cup",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>`,
    descEn: "Digital menus, reservations, WhatsApp orders, and local SEO for restaurants.",
    descEs: "Menús digitales, reservas, pedidos por WhatsApp y SEO local para restaurantes."
  },
  {
    slug: "cleaning",
    labelEn: "Cleaning",
    labelEs: "Limpieza (Cleaning)",
    defaultService: "business-website",
    requestUrl: "./start-project/?industry=cleaning",
    demoUrl: "",
    demoStatus: "coming-soon",
    iconName: "star",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>`,
    descEn: "Conversion-focused websites for residential, commercial, and Airbnb cleaning businesses.",
    descEs: "Sitios web enfocados en conversión para limpieza residencial, comercial y Airbnb."
  },
  {
    slug: "logistics",
    labelEn: "Logistics",
    labelEs: "Logística",
    defaultService: "dashboard",
    requestUrl: "./start-project/?industry=logistics",
    demoUrl: "",
    demoStatus: "coming-soon",
    iconName: "truck",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>`,
    descEn: "Websites and digital systems for freight, cargo, tracking, and logistics companies.",
    descEs: "Sitios web y sistemas digitales para freight, cargo, tracking y empresas logísticas."
  }
];

// Export for accessibility in browser context or modules
if (typeof window !== "undefined") {
  window.industriesConfig = industriesConfig;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = industriesConfig;
}
