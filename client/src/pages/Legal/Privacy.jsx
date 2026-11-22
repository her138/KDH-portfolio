import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <main className="section-padding pt-32 min-h-[75vh]">
      <article className="container-custom max-w-3xl space-y-6 text-[#403D39] dark:text-[#CCC5B9]">
        <span className="section-title block">YOUR INFORMATION</span>
        <h1 className="font-playfair text-4xl font-semibold text-[#252422] dark:text-[#EDEDED]">Privacy Notice</h1>
        <p className="text-sm">Last reviewed: November 2026. This is a draft notice to review and tailor before launch.</p>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Who receives your details</h2>
          <p>MasterCraft by Kyle receives information you choose to send through the contact form or project request form. Questions about your information may be sent to <a className="text-[#EB5E28] underline" href="mailto:hermanus138@gmail.com">hermanus138@gmail.com</a>.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">What is collected and why</h2>
          <p>Contact messages may include your name, email and message. Project requests may also include phone number, business name, requested services, indicative budget, timeline, preferred contact channel and a consultation date. We use this information to answer your enquiry, prepare a quotation and arrange an appointment only if you agree to it.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Services involved</h2>
          <p>Supabase stores enquiries; Cloudflare Turnstile helps prevent automated spam. If configured, an email delivery provider may send transaction-related notifications. These providers can process information needed to operate the service. Your information is not offered for sale.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Storage and access</h2>
          <p>Submitted enquiries are accessible only through the authorised admin dashboard and protected server functions. We retain details only as reasonably necessary to respond to or administer an enquiry, and to meet any applicable legal obligations.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Your choices</h2>
          <p>You may ask to access, correct or remove information you sent us by contacting the email above, subject to applicable legal requirements. Submitting a request does not enrol you in marketing messages.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Cookies and security</h2>
          <p>The website may store your light/dark theme preference. Admin sign-in uses authentication storage. Cloudflare Turnstile applies its own security checks. Please do not include sensitive passwords, identity numbers or payment-card details in a project description.</p>
        </section>
        <p>Read the <Link to="/terms" className="text-[#EB5E28] underline">service and booking terms</Link> or <Link to="/request-project" className="text-[#EB5E28] underline">submit a project request</Link>.</p>
      </article>
    </main>
  );
}
