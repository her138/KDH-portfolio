import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { FiArrowLeft, FiCalendar, FiCheckCircle, FiSend, FiShield } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const SERVICES = [
  ['website', 'Business website'],
  ['web_app', 'Web application'],
  ['ecommerce', 'Online store / e-commerce'],
  ['redesign', 'Website redesign'],
  ['branding', 'Branding / UI design'],
  ['other', 'Something else'],
];

const BUDGETS = [
  ['unsure', 'Not sure yet'],
  ['under_5k', 'Under R5,000'],
  ['5k_15k', 'R5,000–R15,000'],
  ['15k_30k', 'R15,000–R30,000'],
  ['30k_plus', 'Above R30,000'],
];

const EMPTY_FORM = {
  full_name: '',
  email: '',
  phone: '',
  business: '',
  enquiry_type: 'project',
  service_type: 'website',
  budget_range: 'unsure',
  timeline: 'flexible',
  description: '',
  preferred_contact: 'email',
  preferred_date: '',
  preferred_time: '',
  consent: false,
  website: '', // Honeypot. Hidden from real visitors.
};

const inputClass = 'form-input w-full';
const labelClass = 'block space-y-2 text-[#403D39] dark:text-[#CCC5B9]';

export default function RequestProject() {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [token, setToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const captchaRef = useRef(null);

  function update(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    setError('');
    if (!SITE_KEY || !token) {
      setError('Complete the security verification before submitting.');
      return;
    }
    if (!form.consent) {
      setError('Please agree to the privacy notice before submitting.');
      return;
    }
    if (form.preferred_contact === 'whatsapp' && !form.phone.trim()) {
      setError('Enter a phone number to be contacted via WhatsApp.');
      return;
    }
    if (form.enquiry_type === 'consultation' && (!form.preferred_date || !form.preferred_time)) {
      setError('Choose a preferred day and time window for your consultation.');
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke(
        'submit-project-request',
        { body: { ...form, turnstileToken: token } },
      );
      if (invokeError) {
        let detail = '';
        try { detail = (await invokeError.context?.json())?.error ?? ''; } catch { /* no server details */ }
        throw new Error(detail || 'Could not send your request. Please try again.');
      }
      if (!data?.success) {
        throw new Error(data?.error || 'Your request could not be saved. Please retry.');
      }
      setComplete(true);
      setForm({ ...EMPTY_FORM });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Please try again.');
    } finally {
      setSubmitting(false);
      setToken('');
      captchaRef.current?.reset?.();
    }
  }

  const sastParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Johannesburg', day: '2-digit', month: '2-digit', year: 'numeric',
  }).formatToParts(new Date());
  const datePart = (key) => sastParts.find(part => part.type === key)?.value ?? '';
  const minDate = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;

  return (
    <main className="section-padding pt-32 min-h-[70vh]">
      <div className="container-custom max-w-5xl">
        <Link to="/#contact" className="inline-flex items-center gap-2 mb-8 text-[#EB5E28] hover:underline">
          <FiArrowLeft /> Back to contact
        </Link>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="section-title block text-center mb-4">LET'S WORK TOGETHER</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-center mb-5 text-[#252422] dark:text-[#EDEDED]">
            Request a Project
          </h1>
          <p className="text-center text-[#403D39] dark:text-[#B0B0B0] max-w-2xl mx-auto mb-10">
            Tell me what you're planning. I'll review your request and get back to you with the next steps.
            A consultation date is a request, not a confirmed appointment.
          </p>

          {complete ? (
            <div className="glass-card text-center p-8 md:p-12 space-y-5" role="status">
              <FiCheckCircle size={52} className="text-[#EB5E28] mx-auto" />
              <h2 className="font-playfair text-3xl text-[#252422] dark:text-[#EDEDED]">Request received</h2>
              <p className="text-[#403D39] dark:text-[#B0B0B0]">
                Your enquiry has been saved. I'll contact you to discuss your project or confirm a consultation.
                No appointment has been booked yet.
              </p>
              <button type="button" onClick={() => setComplete(false)} className="submit-button px-7 py-3">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="glass-card p-5 md:p-9 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className={labelClass}>
                  <span>Your name *</span>
                  <input className={inputClass} autoComplete="name" maxLength={100} required value={form.full_name}
                    onChange={event => update('full_name', event.target.value)} placeholder="Full name" />
                </label>
                <label className={labelClass}>
                  <span>Email address *</span>
                  <input className={inputClass} type="email" autoComplete="email" maxLength={254} required value={form.email}
                    onChange={event => update('email', event.target.value)} placeholder="you@example.com" />
                </label>
                <label className={labelClass}>
                  <span>Phone / WhatsApp (optional)</span>
                  <input className={inputClass} type="tel" autoComplete="tel" maxLength={30} value={form.phone}
                    onChange={event => update('phone', event.target.value)} placeholder="+27 ..." />
                </label>
                <label className={labelClass}>
                  <span>Business or organisation (optional)</span>
                  <input className={inputClass} maxLength={120} value={form.business}
                    onChange={event => update('business', event.target.value)} placeholder="Your business name" />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <label className={labelClass}>
                  <span>What would you like? *</span>
                  <select className={inputClass} value={form.enquiry_type}
                    onChange={event => update('enquiry_type', event.target.value)}>
                    <option value="project">Request a project quotation</option>
                    <option value="consultation">Request a consultation</option>
                  </select>
                </label>
                <label className={labelClass}>
                  <span>Type of work *</span>
                  <select className={inputClass} value={form.service_type}
                    onChange={event => update('service_type', event.target.value)}>
                    {SERVICES.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                  </select>
                </label>
                <label className={labelClass}>
                  <span>Approximate budget (ZAR)</span>
                  <select className={inputClass} value={form.budget_range}
                    onChange={event => update('budget_range', event.target.value)}>
                    {BUDGETS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className={labelClass}>
                  <span>Target timeline</span>
                  <select className={inputClass} value={form.timeline}
                    onChange={event => update('timeline', event.target.value)}>
                    <option value="flexible">Flexible</option>
                    <option value="asap">As soon as practical</option>
                    <option value="1_month">Within 1 month</option>
                    <option value="1_3_months">Within 1–3 months</option>
                    <option value="3_plus_months">3+ months</option>
                  </select>
                </label>
              </div>

              {form.enquiry_type === 'consultation' && (
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2"><FiCalendar /> Preferred consultation date *</span>
                    <input type="date" min={minDate} required className={inputClass} value={form.preferred_date}
                      onChange={event => update('preferred_date', event.target.value)} />
                  </label>
                  <label className={labelClass}>
                    <span>Preferred time window (South African time) *</span>
                    <select required className={inputClass} value={form.preferred_time}
                      onChange={event => update('preferred_time', event.target.value)}>
                      <option value="">Choose a window</option>
                      <option value="morning">Morning (09:00–12:00)</option>
                      <option value="afternoon">Afternoon (12:00–17:00)</option>
                      <option value="evening">Evening (17:00–19:00)</option>
                    </select>
                  </label>
                </div>
              )}

              <label className={labelClass}>
                <span>Describe your project or question *</span>
                <textarea className={`${inputClass} resize-y`} rows={6} minLength={20} maxLength={4000} required
                  value={form.description} onChange={event => update('description', event.target.value)}
                  placeholder="What would you like built or improved? What features matter most?" />
              </label>

              <label className={labelClass}>
                <span>How should I reply?</span>
                <select className={inputClass} value={form.preferred_contact}
                  onChange={event => update('preferred_contact', event.target.value)}>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp (phone number required)</option>
                </select>
              </label>

              {/* Hidden from human visitors; catches basic form bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                <label htmlFor="project_website_field">Leave this field empty</label>
                <input id="project_website_field" type="text" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={event => update('website', event.target.value)} />
              </div>

              <label className="flex items-start gap-3 text-sm text-[#403D39] dark:text-[#CCC5B9]">
                <input type="checkbox" required checked={form.consent}
                  onChange={event => update('consent', event.target.checked)} className="mt-1" />
                <span>I agree that my details can be used to respond to this enquiry, as described in the <Link to="/privacy" className="text-[#EB5E28] underline">privacy notice</Link>. *</span>
              </label>

              {SITE_KEY ? (
                <Turnstile ref={captchaRef} siteKey={SITE_KEY} options={{ action: 'project_request' }}
                  onSuccess={setToken} onExpire={() => setToken('')} onError={() => setToken('')} />
              ) : (
                <p role="alert" className="text-red-500">Security verification is not configured yet. Add VITE_TURNSTILE_SITE_KEY.</p>
              )}
              {error && <p role="alert" className="text-red-500">{error}</p>}
              <button type="submit" disabled={submitting || !SITE_KEY || !token} className="submit-button disabled:opacity-50">
                <span className="button-content"><FiSend size={19} className="button-icon" />
                  {submitting ? 'Submitting…' : 'Send Project Request'}</span>
              </button>
              <p className="text-xs text-[#403D39] dark:text-[#B0B0B0] flex items-center gap-2">
                <FiShield /> No payment required. Requesting a quotation or consultation is free and does not confirm a booking.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
