import React from "react";
import BackgroundShineButton from "./background-shine-button.jsx";
import ShinyInput from "./shiny-input.jsx";
import ShinyTextArea from "./shiny-text-area.jsx";

const ContactForm = () => {
  return (
    <form className="w-full grid lg:grid-cols-2 gap-6">
      <fieldset className="space-y-2">
        <label className="capitalize font-semibold">First name</label>
        <ShinyInput
          placeholder="Your first name"
          type="text"
          name="first_name"
          required
        />
      </fieldset>
      <fieldset className="space-y-2">
        <label className="capitalize font-semibold">Last name</label>
        <ShinyInput
          placeholder="Your last name"
          type="text"
          name="last_name"
          required
        />
      </fieldset>
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold">Company name</label>
        <ShinyInput
          placeholder="Your organization (optional)"
          type="text"
          name="company_name"
        />
      </fieldset>
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold">Email</label>
        <ShinyInput
          placeholder="Your email address"
          type="email"
          name="email"
          required
        />
      </fieldset>
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold">Message</label>
        <ShinyTextArea
          placeholder="How can we help you?"
          name="message"
          required
        />
      </fieldset>
      <div className="col-span-full flex justify-end">
        <BackgroundShineButton type="submit">Send</BackgroundShineButton>
      </div>
    </form>
  );
};

export default ContactForm;
