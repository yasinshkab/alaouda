# Company PRD: Alaouda Furniture Import Business Website

Version: 1.0
Owner: Alaouda
Status: Draft
Last Updated: [set on kickoff]

## 1) Summary
- Build a classic, professional, bilingual (Arabic/English) marketing website for Alaouda, a furniture import company in Libya.
- Goals: brand credibility, product showcasing (office/home), and lead generation via contact/WhatsApp. Future-ready for e-commerce.

## 2) Goals and Non-Goals
- **Goals**:
  - Establish brand presence and trust.
  - Showcase office and home furniture with filters and product detail modals/lightbox.
  - Drive inquiries via contact form and WhatsApp.
  - Fully responsive and performant experience with subtle animations.
  - Bilingual with proper RTL for Arabic.
- **Non-Goals**:
  - Full e-commerce (cart, checkout, payments).
  - Custom CMS; content can be static or JSON-fed.

## 3) KPIs / Success Metrics
- Bounce rate < 45% on homepage within 60 days.
- ≥ 2.0% click-through to contact/WhatsApp from product pages.
- ≥ 90 Lighthouse Performance on mobile for homepage.
- ≥ 95 Lighthouse Accessibility on all pages.
- Time to Interactive < 4s on mid-tier mobile over 3G Fast.

## 4) Users & Personas
- **B2B**: offices, institutions sourcing office furniture.
- **B2C**: individuals seeking quality home furniture.
- **Staff/Admin**: internal team reviewing and updating site content (static for MVP).

## 5) Assumptions & Dependencies
- All copy is placeholder; to be replaced later by client.
- Image assets will be provided later; use high-quality placeholders meanwhile.
- Google Maps embed is allowed for business location.
- WhatsApp Business number available at launch.

## 6) Scope Overview
- **Pages**:
  1. Homepage
  2. About Us
  3. Products/Catalog (office/home categories; filters)
  4. Store (placeholder for future e-commerce)
  5. Contact Us
- **Global**: header, footer, navigation, language switcher (AR/EN), floating WhatsApp button, responsive layout, SEO meta, analytics-ready.

## 7) Functional Requirements

### 7.1 Global
- **Language Switcher**:
  - Toggle AR/EN; updates all visible text immediately.
  - Switches `dir="rtl"` for Arabic and flips layout gracefully.
  - Persist preference in `localStorage`.
- **Navigation**:
  - Desktop horizontal menu; mobile hamburger with slide/fade transition.
  - Smooth scroll to in-page anchors.
- **WhatsApp Button (persistent)**:
  - Fixed bottom-right on desktop; bottom center-right on mobile.
  - Opens WhatsApp chat using `https://wa.me/<number>?text=<pre-filled-msg>`.
- **Animations**:
  - Subtle hover states, fade/slide on section in-view, CSS-based page transitions.
  - Respect reduced motion (`prefers-reduced-motion`).
- **Footer**:
  - Quick links, contact details, business hours, social icons (optional placeholders).

### 7.2 Homepage
- Hero with large image, value proposition, and CTA (Explore Products / Contact).
- Featured categories: Office, Home (cards with imagery and links).
- About summary block.
- Testimonials carousel (3–5 dummy items).
- Primary CTA section for inquiry.

**Acceptance**:
- CTA visible above fold on mobile and desktop.
- Carousel auto-plays with pause on hover; keyboard-accessible.

### 7.3 About Us
- Company history, mission, vision.
- Team section (3–6 dummy profiles with role and short bio).
- Why choose Alaouda (USPs).

**Acceptance**:
- Content renders properly in both languages with correct direction and alignment.

### 7.4 Products/Catalog
- Categories: Office, Home.
- Filter by category and style (e.g., modern/classic), with multi-select or single-select.
- Product cards:
  - Image, name, brief description, key specs bullets.
  - Hover effect; “View Details” opens lightbox/gallery or product modal.
  - “Request Quote” button (opens contact form modal or routes to Contact with product pre-filled).
- Product detail (modal/lightbox):
  - Image gallery with thumbnails.
  - Full description/specs.
  - “Request Quote” CTA.

**Acceptance**:
- Filters update grid without full page reload.
- Lightbox supports keyboard navigation and swipe on touch devices.

### 7.5 Store (Placeholder)
- Banner: “Online purchasing coming soon”.
- Showcase 6–8 popular products (same cards).
- Contact/WhatsApp prompts.

### 7.6 Contact Us
- Contact form: name, email, phone, message, category (office/home/general), optional product reference.
- Validation (required fields, email/phone formats).
- Submit to placeholder endpoint (mock fetch; success/failure states).
- Embedded Google Map for Libya location.
- Business hours, email, phone.

**Acceptance**:
- Client-side validation prevents submission until fixed.
- On success, show confirmation and reset form; on failure, show error.

## 8) Non-Functional Requirements
- **Performance**:
  - LCP < 2.5s on mid-tier mobile (3G Fast).
  - Total JS < 150KB gzipped; CSS < 120KB gzipped.
  - Lazy-load images; use `srcset`, `sizes`, `loading="lazy"`.
- **Accessibility**:
  - WCAG 2.1 AA: focus states, contrast, alt text, ARIA where applicable.
  - Keyboard navigable modals, menus, carousels.
- **Browser Support**:
  - Latest 2 versions of Chrome, Safari, Firefox, Edge; Android Chrome; iOS Safari.
- **Security**:
  - No inline event handlers for critical actions.
  - Simple honeypot or time-based spam check for forms.

## 9) Information Architecture
- **Sitemap**:
  - `/` (Home)
  - `/about/`
  - `/products/` (with filters via query params e.g., `?category=office&style=modern`)
  - `/store/`
  - `/contact/`
  - `/(ar)/` equivalents via language handling (see i18n).
- **URL Strategy**:
  - Option A (recommended): single URLs with JS localization and `hreflang` pairs.
  - Option B: language-prefixed paths `/ar/...` and `/en/...`.

## 10) Content Requirements
- Dummy bilingual text for all sections (EN/AR).
- Product dataset (JSON) with fields:
  - `id`, `name_en/ar`, `desc_en/ar`, `category`, `style`, `specs` [key/value], `images` [urls], `featured` (bool).
- Alt text in both languages.

## 11) Design Guidelines
- **Brand**:
  - Logo: text-based “Alaouda” in a classic serif; Arabic companion set in complementary Arabic serif.
- **Color Scheme**:
  - Neutral base (e.g., off-white, light gray), dark charcoal text.
  - Accents: deep green or navy; secondary gold for highlights.
- **Typography**:
  - English: “Merriweather” (serif) for headings, “Inter” or “Roboto” for body.
  - Arabic: “Cairo” or “Tajawal” matching weights/metrics.
- **Components**:
  - Header, nav, footer, buttons (primary/secondary), badges, cards, carousel, lightbox, form fields, alerts.
- **Motion**:
  - 150–250ms ease transitions; no parallax; minimal movement for AR.

## 12) Technical Design

### 12.1 Stack & Structure
- Pure HTML/CSS/JS with ES6 modules; no heavy frameworks.
- Optional tiny libs:
  - Lightweight carousel/lightbox (≤10KB gzipped) or custom vanilla JS.
- **Directory Structure**:
  ```
  /assets/
    /css/ (styles.css, rtl.css, components/*.css)
    /js/ (main.js, i18n.js, ui/*.js, data/*.js)
    /img/ (placeholders, icons)
    /fonts/
  /data/ (products.json, testimonials.json)
  index.html
  about.html
  products.html
  store.html
  contact.html
  sitemap.xml
  robots.txt
  ```

### 12.2 i18n & RTL
- Language dictionaries in JSON: `en.json`, `ar.json`.
- JS switches innerText/HTML via data-keys.
- Add `dir="rtl"` and `lang="ar"` on `<html>` for Arabic; toggle CSS logical properties or load `rtl.css`.
- Persist language in `localStorage` and reflect in `<html lang>`.

### 12.3 CSS Strategy
- BEM naming; CSS variables for colors/spacing/typography.
- Grid/Flex layouts with logical properties (inline/block start/end).
- Use `prefers-reduced-motion` for motion.

### 12.4 Components Behavior (JS)
- Mobile nav: toggle class, trap focus when open.
- Carousel: auto-rotate with controls; accessible roles/labels.
- Lightbox: open/close with ESC; focus management; swipe support on touch.
- Filters: client-side filtering from `products.json` with `history.pushState` for sharable queries.
- Contact form: validate, send fetch to placeholder endpoint, show success/error.

## 13) Integrations

### 13.1 WhatsApp
- Format: `https://wa.me/218XXXXXXXXX?text=Hello%20Alaouda%2C%20I%20am%20interested%20in%20[ProductName]`
- Pre-fill message with product name when clicked from product card/detail.

### 13.2 Google Maps
- Embedded map iframe with business location in Libya.
- Fallback link “Open in Google Maps”.

### 13.3 Contact Form Endpoint (Placeholder)
- POST to `/api/contact` (mock); locally simulate with `fetch("/api/contact", { method: "POST" ... })` and fake response.
- Include simple honeypot field (hidden) and submission timing check (>2s) to reduce bots.

## 14) SEO

- **Meta Templates (per page)**:
  - **Title**: “Alaouda — High-Quality Imported Furniture in Libya | Office & Home”
  - **Description**: “Alaouda imports premium office and home furniture in Libya. Explore categories, view specifications, and request a quote.”
- **hreflang** pairs for AR/EN.
- **Open Graph/Twitter** tags for shareability.
- **Structured Data**:
  - Organization schema on all pages.
  - Product schema (non-price) for product detail modals/cards where applicable.
- **Images**: descriptive alt; optimized sizes (WebP where possible).
- **Sitemap & Robots**: `sitemap.xml` referencing all routes; `robots.txt` allow all; disallow `/api/`.

## 15) Accessibility
- Color contrast ≥ 4.5:1 for text.
- Focus styles visible on all interactive elements.
- Labels and `aria-*` for controls; landmark roles.
- Keyboard operable: nav, carousel, lightbox, modals.

## 16) Testing & Acceptance Criteria

- **Global**:
  - Language toggle updates page text, `lang`, `dir`, and persists across pages.
  - WhatsApp button is visible on all pages and opens correct link.
  - Mobile nav opens with hamburger, traps focus, closes on ESC/outside click.

- **Homepage**:
  - Hero loads within 1s after first contentful paint on mid-tier mobile.
  - Testimonials rotate every 5s; manual next/prev works with keyboard.

- **Products**:
  - Filters reflect in URL; reloading preserves filter state.
  - Lightbox opens/closes with mouse, touch, keyboard; images swipe on touch.

- **Contact**:
  - Invalid email/phone prevents submission; inline error messages shown.
  - Success response shows thank-you and resets form; error shows retry message.

- **Performance**:
  - Lighthouse mobile scores: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 90, SEO ≥ 90.

## 17) Milestones & Timeline (suggested)
1. Week 1: IA, wireframes, design system, language/RTL framework.
2. Week 2: Homepage, Global nav/footer, WhatsApp, animations baseline.
3. Week 3: Products page (filters, cards, lightbox), product data JSON.
4. Week 4: About, Store placeholder, Contact (form + Maps), QA/A11y/SEO.
5. Week 5: Performance tuning, cross-browser/device testing, docs, handoff.

## 18) Risks & Mitigations
- Heavy imagery impacting performance → enforce image budgets, lazy loading, responsive sources.
- RTL layout regressions → dedicated `rtl.css`, test early with Arabic content.
- Spam on contact → honeypot + time gate + basic rate limit (server later).
- Overuse of animation → respect reduced motion, keep durations minimal.

## 19) Deliverables
- Full source code with structured directories.
- HTML pages: `index.html`, `about.html`, `products.html`, `store.html`, `contact.html`.
- Assets: CSS, JS modules, fonts, images.
- Data: `products.json`, `testimonials.json`, `en.json`, `ar.json`.
- `sitemap.xml`, `robots.txt`.
- Basic documentation: setup, content update guide, i18n instructions.

## 20) Documentation Notes
- Inline comments for complex JS (i18n switching, filters, lightbox).
- README covering:
  - How to update content (JSON/text).
  - How to add new products.
  - How to change WhatsApp number, map embed, and SEO meta.
  - How to switch default language.

---

## Appendix A: Example Snippets

### A.1 WhatsApp Link Generation (JS)
```javascript
// Generates a WhatsApp link with optional product context
function waLink(numberIntl, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${numberIntl}?text=${encoded}`;
}

// Example use
const link = waLink("218123456789", "Hello Alaouda, I am interested in Office Desk A1");
```

### A.2 Language Persistence (JS)
```javascript
const LANG_KEY = "alaouda_lang";

function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  // update UI text by data-i18n keys...
}

function initLanguage() {
  const saved = localStorage.getItem(LANG_KEY) || "en";
  setLanguage(saved);
}

document.addEventListener("DOMContentLoaded", initLanguage);
```

### A.3 Basic Form Validation (JS)
```javascript
function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validatePhone(v){ return /^[0-9+\-\s]{6,}$/.test(v); }

async function submitContact(form) {
  const data = Object.fromEntries(new FormData(form));
  if (!data.name || !validateEmail(data.email) || !validatePhone(data.phone) || !data.message) {
    // show errors
    return;
  }
  // honeypot: if hidden field has value, abort
  if (data.company) return;

  try {
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
    if (!res.ok) throw new Error("Network");
    // show success
    form.reset();
  } catch {
    // show error
  }
}
```