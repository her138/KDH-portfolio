import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <main className="section-padding pt-32 min-h-[75vh]">
      <article className="container-custom max-w-3xl space-y-6 text-[#403D39] dark:text-[#CCC5B9]">
        <span className="section-title block">WORKING TOGETHER</span>
        <h1 className="font-playfair text-4xl font-semibold text-[#252422] dark:text-[#EDEDED]">Service & Booking Terms</h1>
        <p className="text-sm">Draft for owner review before launch. Formal project agreements and quotations take precedence where agreed.</p>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Enquiries are not contracts</h2>
          <p>Submitting an enquiry, budget indication or quotation request does not create a paid engagement. Work starts only once scope, price, deliverables and terms are confirmed separately.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Consultation requests</h2>
          <p>A preferred date and time window is a request, not a reservation. An appointment is only confirmed after direct written communication. A different time may be proposed if the selected period is unavailable.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Pricing and delivery</h2>
          <p>Budget brackets on the form are for planning purposes; they are not fixed service prices. Quotes will define the actual cost, schedule, revisions, ownership and any payment milestones before acceptance.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Changes and cancellations</h2>
          <p>Changes to project scope, rescheduling, cancellation and refunds (if applicable) should be handled under the individually agreed written quotation or contract.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-playfair text-2xl font-semibold">Questions</h2>
          <p>Contact <a className="text-[#EB5E28] underline" href="mailto:hermanus138@gmail.com">hermanus138@gmail.com</a> before accepting a quote if anything is unclear. See the <Link to="/privacy" className="text-[#EB5E28] underline">privacy notice</Link> for how enquiry details are handled.</p>
        </section>
      </article>
    </main>
  );
}
