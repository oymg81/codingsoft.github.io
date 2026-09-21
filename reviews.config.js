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
// CodingSoft should consume only approved/featured reviews from the public FOES reviews endpoint.
//
// Integrity Note:
// Fabricated, placeholder, or unverified testimonials are strictly disallowed.
// The array below is empty by default until real verified client reviews
// are provided or synced via the FOES backend.
// When zero approved reviews are available, the reviews section remains hidden.
// ==============================================================================

window.codingsoftReviews = [];

// Export for Node syntax checking & testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.codingsoftReviews;
}
