const industriesConfig = [
  {
    slug: "real-estate",
    labelEn: "Real Estate Website",
    labelEs: "Sitio Web de Bienes Raíces",
    defaultService: "website-seo",
    requestUrl: "./start-project/?industry=real-estate",
    // Deployed URL for the Real Estate demo
    demoUrl: "https://codingsoft-demo-real-estate.vercel.app/",
demoStatus: "ready",
    iconName: "home",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>`,
    descEn: "Modern realtor website with property showcase, lead forms, WhatsApp CTA, and client trust sections.",
    descEs: "Sitio web moderno para realtor con catálogo de propiedades, formularios, botón de WhatsApp y secciones de confianza."
  },
  {
    slug: "construction",
    labelEn: "Construction Website",
    labelEs: "Sitio Web de Construcción",
    defaultService: "business-website",
    requestUrl: "./start-project/?industry=construction",
    // TODO: Deploy Construction Website Demo and update this URL
    demoUrl: "#",
    demoStatus: "coming-soon",
    iconName: "tool",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`,
    descEn: "Construction website with project gallery, estimate request, service areas, and credibility sections.",
    descEs: "Sitio web de construcción con galería de proyectos, solicitud de presupuestos, áreas de servicio y secciones de credibilidad."
  },
  {
    slug: "restaurant",
    labelEn: "Restaurant Website",
    labelEs: "Sitio Web de Restaurante",
    defaultService: "automation",
    requestUrl: "./start-project/?industry=restaurant",
    // TODO: Deploy Restaurant Website Demo and update this URL
    demoUrl: "#",
    demoStatus: "coming-soon",
    iconName: "cup",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>`,
    descEn: "Restaurant website with menu, promotions, WhatsApp ordering, and Google review CTA.",
    descEs: "Sitio web de restaurante con menú, promociones, pedidos por WhatsApp y botón para reseñas de Google."
  },
  {
    slug: "cleaning",
    labelEn: "Cleaning Services Website",
    labelEs: "Sitio Web de Servicios de Limpieza",
    defaultService: "business-website",
    requestUrl: "./start-project/?industry=cleaning",
    // TODO: Deploy Cleaning Services Website Demo and update this URL
    demoUrl: "#",
    demoStatus: "coming-soon",
    iconName: "star",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>`,
    descEn: "Cleaning service website built to convert local visitors into quote requests.",
    descEs: "Sitio web para servicios de limpieza diseñado para convertir visitas locales en solicitudes de cotización."
  },
  {
    slug: "logistics",
    labelEn: "Logistics Website",
    labelEs: "Sitio Web de Logística",
    defaultService: "dashboard",
    requestUrl: "./start-project/?industry=logistics",
    // TODO: Deploy Logistics Website Demo and update this URL
    demoUrl: "#",
    demoStatus: "coming-soon",
    iconName: "truck",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>`,
    descEn: "Logistics website with shipment tracking, quote forms, service pages, and client trust sections.",
    descEs: "Sitio web de logística con rastreo de envíos, cotizadores, páginas de servicios y secciones de credibilidad."
  },
  {
    slug: "saas",
    labelEn: "SaaS / Business Dashboard",
    labelEs: "SaaS / Dashboard de Negocios",
    defaultService: "business-dashboard",
    requestUrl: "./start-project/?industry=other",
    // TODO: Deploy SaaS / Business Dashboard Demo and update this URL
    demoUrl: "#",
    demoStatus: "coming-soon",
    iconName: "layout",
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>`,
    descEn: "Business dashboard demo showing automation, CRM-style workflows, and admin tools.",
    descEs: "Demo de dashboard de negocios que muestra automatización, flujos de trabajo estilo CRM y herramientas de administración."
  }
];

// Export for accessibility in browser context or modules
if (typeof window !== "undefined") {
  window.industriesConfig = industriesConfig;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = industriesConfig;
}
