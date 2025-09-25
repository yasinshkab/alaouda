import React from "react";
import { createRoot } from "react-dom/client";
import ContactForm from "./contact-form.jsx";

const root = document.getElementById("nurui-contact-root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <ContactForm />
    </React.StrictMode>
  );
}
