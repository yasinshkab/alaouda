// Basic i18n for EN/AR with RTL handling and localStorage persistence
const LANG_KEY = "alaouda_lang";
const DEFAULT_LANG = "ar"; // per your preference

// Minimal dictionary structure. Extend as needed.
const DICT = {
  ar: {
    brand: "العـودة",
    tagline: "أثاث مستورد عالي الجودة للمكاتب والمنازل في ليبيا",
    cta_explore: "تصفح المنتجات",
    cta_contact: "تواصل معنا",
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_products: "المنتجات",
    nav_store: "المتجر",
    nav_contact: "اتصل بنا",
    featured_categories: "تصنيفات مميزة",
    office: "أثاث مكتبي",
    home: "أثاث منزلي",
    about_summary_title: "نبذة مختصرة",
    testimonials: "آراء العملاء",
    partners: "شركاؤنا",
    clients: "عملاؤنا", 
    coming_soon: "الشراء عبر الإنترنت قريباً",
    contact_title: "تواصل معنا",
    business_hours: "ساعات العمل",
    send: "إرسال",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    filter_category: "التصنيف",
    filter_style: "الأسلوب",
  },
  en: {
    brand: "Alaouda",
    tagline: "High-quality imported furniture for offices and homes in Libya",
    cta_explore: "Explore Products",
    cta_contact: "Contact Us",
    nav_home: "Home",
    nav_about: "About",
    nav_products: "Products",
    nav_store: "Store",
    nav_contact: "Contact",
    featured_categories: "Featured Categories",
    office: "Office Furniture",
    home: "Home Furniture",
    about_summary_title: "About Summary",
    testimonials: "Testimonials",
    partners: "Our Partners",
    clients: "Our Clients", 
    coming_soon: "Online purchasing coming soon",
    contact_title: "Contact Us",
    business_hours: "Business Hours",
    send: "Send",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    filter_category: "Category",
    filter_style: "Style",
  }
};

export function setLanguage(lang) {
  const langToSet = DICT[lang] ? lang : DEFAULT_LANG;
  localStorage.setItem(LANG_KEY, langToSet);
  document.documentElement.lang = langToSet;
  document.documentElement.dir = langToSet === "ar" ? "rtl" : "ltr";
  // Update text nodes with data-i18n keys
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = DICT[langToSet][key] || key;
  });
}

export function initLanguage() {
  const saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  setLanguage(saved);
}

export function toggleLanguage() {
  const current = document.documentElement.lang || DEFAULT_LANG;
  setLanguage(current === "ar" ? "en" : "ar");
}