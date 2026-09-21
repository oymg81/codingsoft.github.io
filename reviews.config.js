// ==============================================================================
// CodingSoft Reviews Configuration
// ==============================================================================
// Architecture Note:
// Direct Google OAuth or private API keys must NEVER be exposed in this static site.
//
// Future Production Architecture:
// Google Business Profile API
//         ↓
// FOES Reviews Backend / Sync
//         ↓
// Public approved reviews endpoint: GET https://app.foes.pro/api/public/reviews?workspace=codingsoft
//         ↓
// CodingSoft homepage reviews carousel
//
// TODO:
// Google Business Profile reviews should sync server-side into FOES.
// CodingSoft should consume only the public approved-review endpoint.
//
// The frontend gracefully falls back to window.codingsoftReviews below
// if the public endpoint is unavailable or not yet configured.
// ==============================================================================

window.codingsoftReviews = [
  {
    id: "review-1",
    author: "Logisti-K Team",
    company: "Logisti-K Freight Services",
    rating: 5,
    text: "CodingSoft transformed our online presence with a bilingual website, freight tracking integration, and streamlined quote forms. Exceptional technical execution and communication.",
    source: "Google",
    sourceUrl: "https://www.logisti-k.us/en",
    date: "2026-05-18",
    featured: true
  },
  {
    id: "review-2",
    author: "CleanCare Management",
    company: "CleanCare Pro Service",
    rating: 5,
    text: "Our local quote requests increased significantly after launching our new site with CodingSoft. The mobile layout and WhatsApp integration make customer booking effortless.",
    source: "Google",
    sourceUrl: "https://www.cleancareproservice.com/",
    date: "2026-06-10",
    featured: true
  },
  {
    id: "review-3",
    author: "Carlos M.",
    company: "Lidia Cleaning Services",
    rating: 5,
    text: "Professional, fast, and results-driven. They understood exactly what our service business needed to look credible and attract local clients.",
    source: "Google",
    sourceUrl: "",
    date: "2026-07-02",
    featured: true
  }
];

// Export for Node syntax checking & testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.codingsoftReviews;
}
