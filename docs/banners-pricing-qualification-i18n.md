# Copy de Banners Educativos — Lógica de Calificación de Presupuesto
### Start Project Form — CodingSoft Technology (EN / ES)

Este documento contiene el copy bilingüe listo para mapear en `translations.js`, junto con las condiciones exactas que disparan cada banner. Sigue el mismo patrón no-bloqueante que el banner de SaaS MVP ya existente.

---

## 1. Matriz de Disparo (Service × Budget × Timeline)

| Banner | Condición de disparo | Bloquea envío |
|---|---|---|
| `banner_saas_low_budget` | `service = saas-mvp` AND `budget ∈ {under-2500, 2500-5000, 5000-10000}` | No |
| `banner_customapp_low_budget` | `service = custom-web-app` AND `budget ∈ {under-2500, 2500-5000, 5000-10000}` | No |
| `banner_dashboard_low_budget` | `service = business-dashboard` AND `budget ∈ {under-2500, 2500-5000}` | No |
| `banner_automation_low_budget` | `service = automation` AND `budget = under-2500` | No |
| `banner_seo_low_budget` | `service = website-seo` AND `budget = under-2500` | No |
| `banner_urgent_generic` | `timeline = urgent` AND ninguna otra condición aplica | No |
| `banner_urgent_complex_service` | `timeline = urgent` AND `service ∈ {saas-mvp, custom-web-app, business-dashboard}` | No |

> **Regla de consolidación:** si más de una condición aplica al mismo tiempo (ej. Custom Web App + Urgente + Under $5,000), mostrar **solo un banner combinado** (`banner_urgent_complex_service` tiene prioridad sobre los banners de presupuesto individuales). Nunca apilar más de un banner visible a la vez.

---

## 2. Banners de Presupuesto por Servicio

### `banner_saas_low_budget` *(ya existente — sin cambios)*

**EN**
> SaaS platforms usually require a larger investment than a standard website. A lean SaaS MVP can start around $12,000–$18,000 when the scope is limited to one core workflow, basic authentication, and a simple database. Standard SaaS MVPs with payments, dashboards, roles, and multiple features commonly range from $18,000–$35,000+. AI, integrations, multi-tenant architecture, or advanced automation can increase the scope to $35,000–$60,000+. You can still submit your idea, and we'll recommend a realistic MVP path.

**ES**
> Las plataformas SaaS normalmente requieren una inversión mayor que un sitio web estándar. Un MVP SaaS lean puede empezar alrededor de $12,000–$18,000 cuando el alcance se limita a un flujo principal, autenticación básica y una base de datos simple. Un MVP SaaS estándar con pagos, dashboards, roles y múltiples funciones normalmente está entre $18,000–$35,000+. IA, integraciones, arquitectura multi-tenant o automatización avanzada pueden elevar el alcance a $35,000–$60,000+. Igual puedes enviar tu idea y te recomendaremos un camino MVP realista.

---

### `banner_customapp_low_budget` *(nuevo)*

**EN**
> Custom web applications typically start around $10,000–$15,000 for a focused tool with one main function and basic user management. Apps with multiple user roles, integrations, or complex workflows usually range from $15,000–$30,000+. You can still submit your project, and we'll suggest a scope that fits your budget.

**ES**
> Las aplicaciones web personalizadas normalmente empiezan alrededor de $10,000–$15,000 para una herramienta enfocada con una función principal y gestión básica de usuarios. Las apps con múltiples roles, integraciones o flujos complejos suelen estar entre $15,000–$30,000+. Igual puedes enviar tu proyecto y te sugeriremos un alcance que se ajuste a tu presupuesto.

---

### `banner_dashboard_low_budget` *(nuevo)*

**EN**
> Business dashboards usually start around $5,000–$8,000 for a single data source with basic charts and filters. Dashboards with multiple data sources, user roles, or real-time updates typically range from $8,000–$15,000+. You can still submit your idea, and we'll recommend the right scope.

**ES**
> Los dashboards de negocio normalmente empiezan alrededor de $5,000–$8,000 para una sola fuente de datos con gráficos y filtros básicos. Los dashboards con múltiples fuentes de datos, roles de usuario o actualizaciones en tiempo real suelen estar entre $8,000–$15,000+. Igual puedes enviar tu idea y te recomendaremos el alcance correcto.

---

### `banner_automation_low_budget` *(nuevo)*

**EN**
> Simple automations (a single workflow, one or two connected tools) can often start under $2,500. More advanced automation — multiple systems, custom logic, or error handling — usually requires a higher investment. Tell us more about your workflow and we'll recommend the right approach.

**ES**
> Las automatizaciones simples (un solo flujo, una o dos herramientas conectadas) muchas veces pueden empezar por menos de $2,500. Las automatizaciones más avanzadas — múltiples sistemas, lógica personalizada o manejo de errores — normalmente requieren una inversión mayor. Cuéntanos más sobre tu flujo de trabajo y te recomendaremos el enfoque correcto.

---

### `banner_seo_low_budget` *(nuevo)*

**EN**
> A solid Website + SEO package usually starts around $3,500–$5,000, plus an ongoing budget for content and optimization over time. Smaller budgets can still get a great website — SEO can be added later as a separate phase.

**ES**
> Un paquete sólido de Sitio Web + SEO normalmente empieza alrededor de $3,500–$5,000, más un presupuesto continuo para contenido y optimización con el tiempo. Con presupuestos más pequeños igual puedes obtener un excelente sitio web — el SEO se puede agregar después como una fase separada.

---

## 3. Banners de Timeline

### `banner_urgent_generic` *(ya existente — sin cambios)*

**EN**
> Urgent timelines may require a reduced scope or rush pricing.

**ES**
> Los plazos urgentes pueden requerir reducir el alcance o aplicar precio de prioridad.

---

### `banner_urgent_complex_service` *(nuevo — tiene prioridad sobre el genérico)*

**EN**
> Projects like this usually need more runway to do well. A 2-week timeline is tight for this scope — we can still review your request and propose a realistic path forward.

**ES**
> Proyectos como este normalmente necesitan más tiempo para salir bien. Un plazo de 2 semanas es ajustado para este alcance — igual podemos revisar tu solicitud y proponerte un camino realista.

---

## 4. Claves sugeridas para `translations.js`

```javascript
const translations = {
  en: {
    banner_saas_low_budget: "SaaS platforms usually require a larger investment...",
    banner_customapp_low_budget: "Custom web applications typically start around...",
    banner_dashboard_low_budget: "Business dashboards usually start around...",
    banner_automation_low_budget: "Simple automations (a single workflow...",
    banner_seo_low_budget: "A solid Website + SEO package usually starts around...",
    banner_urgent_generic: "Urgent timelines may require a reduced scope...",
    banner_urgent_complex_service: "Projects like this usually need more runway..."
  },
  es: {
    banner_saas_low_budget: "Las plataformas SaaS normalmente requieren...",
    banner_customapp_low_budget: "Las aplicaciones web personalizadas normalmente...",
    banner_dashboard_low_budget: "Los dashboards de negocio normalmente empiezan...",
    banner_automation_low_budget: "Las automatizaciones simples (un solo flujo...",
    banner_seo_low_budget: "Un paquete sólido de Sitio Web + SEO normalmente...",
    banner_urgent_generic: "Los plazos urgentes pueden requerir reducir...",
    banner_urgent_complex_service: "Proyectos como este normalmente necesitan..."
  }
};
```

*(Textos truncados en el snippet de código por espacio — usar el copy completo de las secciones 2 y 3 arriba.)*

---

## 5. Notas de Implementación

- **Prioridad de banners:** si `banner_urgent_complex_service` aplica, no mostrar `banner_urgent_generic` ni el banner de presupuesto simultáneamente — un solo mensaje visible a la vez.
- **Ninguno de estos banners bloquea el envío del formulario.** Todos siguen el patrón de "puedes enviar igual, te recomendaremos el camino correcto".
- **Estos rangos son guía pública de marketing**, no cotización final — mantener la lógica de scoring/priorización de leads (interna) separada de este copy, en el CRM o backend, nunca en el JS del cliente.
