# Alaouda Website — Local Development

This repository contains a static, bilingual (AR/EN) marketing website scaffold for Alaouda Furniture.

## Run locally

Option A: Use a lightweight Node static server already included.

1. Ensure Node.js 18+ is installed.
2. Run:
   ```bash
   node assets/js/server.js
   ```
3. Open http://localhost:5173

Option B: Use VS Code Live Server extension and open `index.html`.

## Structure
- `/assets/css`: styles (RTL default), component CSS
- `/assets/js`: main logic, i18n, simple UI helpers
- `/assets/img`: placeholder SVG images
- `/data`: products and testimonials JSON

## Notes
- Default language is Arabic (RTL). Use the header language switch to toggle.
- WhatsApp button uses a dummy number for now.
- Contact form posts to a placeholder and shows a simulated success.