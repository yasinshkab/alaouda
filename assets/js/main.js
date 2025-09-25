// Main JS: init i18n, mobile nav, WhatsApp link, simple in-view animations
import { initLanguage, setLanguage, toggleLanguage } from './i18n.js';

const WA_NUMBER = '218000000000'; // Dummy international format

function setupLanguageSwitcher() {
  const btn = document.getElementById('lang-toggle-btn');
  if (!btn) return;
  function updateBtn() {
    const cur = document.documentElement.lang;
    btn.textContent = cur === 'ar' ? 'EN' : 'AR';
    btn.setAttribute('aria-label', cur === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  }
  btn.addEventListener('click', () => {
    const cur = document.documentElement.lang;
    setLanguage(cur === 'ar' ? 'en' : 'ar');
    updateBtn();
  });
  updateBtn();
}

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-menu');
  if (!toggle || !overlay) return;
  toggle.addEventListener('click', () => overlay.classList.add('open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });
}

function setupWhatsAppFab() {
  const fab = document.querySelector('.whatsapp-fab');
  if (!fab) return;
  fab.addEventListener('click', () => {
    const lang = document.documentElement.lang || 'ar';
    const msg = lang === 'ar' ? 'مرحباً، أود الاستفسار عن الأثاث.' : 'Hello, I would like to inquire about furniture.';
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}

function setupInViewAnimations() {
  // Animate whole sections marked with [data-animate]
  const sections = document.querySelectorAll('[data-animate]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.opacity = '1';
        sectionObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(el => {
    el.style.transform = 'translateY(12px)';
    el.style.opacity = '0';
    el.style.transition = 'transform 300ms ease, opacity 300ms ease';
    sectionObserver.observe(el);
  });

  // Animate individual partner/client/product items as they appear
  const itemSelector = '.partner-card, #clientsCarousel .carousel-item, #productsList .card, #productsList .catalog-card, [data-reveal]';
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (e.target.matches('[data-reveal]')) {
          e.target.classList.add('in-view');
        } else {
          e.target.classList.add('in-view');
        }
        itemObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  function prepareItem(el) {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = '1';
    // Slight stagger for product cards
    if (el.closest && el.closest('#productsList')) {
      const idx = Array.from(el.parentElement?.children || []).indexOf(el);
      el.style.transitionDelay = `${Math.min(Math.max(idx,0) * 50, 300)}ms`;
    }
    // Use class for non-[data-reveal] cards, otherwise CSS is ready
    if (!el.matches('[data-reveal]')) el.classList.add('reveal-on-scroll');
    itemObserver.observe(el);
  }

  // Prepare existing items (if already rendered)
  document.querySelectorAll(itemSelector).forEach(prepareItem);

  // Watch for dynamically inserted items (partners/clients/products loaded via fetch/render)
  const partnersList = document.getElementById('partnersList');
  const clientsCarousel = document.getElementById('clientsCarousel');
  const productsList = document.getElementById('productsList');
  [partnersList, clientsCarousel, productsList].filter(Boolean).forEach(target => {
    const mo = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches && node.matches(itemSelector)) {
            prepareItem(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(itemSelector).forEach(prepareItem);
          }
        });
      });
    });
    mo.observe(target, { childList: true, subtree: true });
  });
}

function setupHeaderScrollState() {
  const header = document.querySelector('.header');
  const progress = document.querySelector('.scroll-progress');
  const hero = document.querySelector('.hero-landing');
  const apply = () => {
    if (header) {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (progress) {
      const h = document.documentElement;
      const max = Math.max(1, h.scrollHeight - h.clientHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      progress.style.transform = `scaleX(${ratio})`;
    }
    if (hero) {
      // gentle parallax via background position
      const offset = Math.round(window.scrollY * 0.25);
      hero.style.backgroundPosition = `center ${offset}px`;
    }
  };
  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

function init() {
  initLanguage();
  setupLanguageSwitcher();
  setupMobileMenu();
  setupWhatsAppFab();
  setupInViewAnimations();
  setupHeaderScrollState();
}

document.addEventListener('DOMContentLoaded', init);


// React gallery removed: now using static HTML gallery.