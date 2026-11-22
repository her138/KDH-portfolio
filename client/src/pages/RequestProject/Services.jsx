import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiShoppingCart, FiEdit3, FiPenTool, FiArrowRight } from 'react-icons/fi';

const services = [
  { title: 'Business Websites', description: 'Responsive sites that clearly present your business and give visitors a way to reach you.', icon: FiCode },
  { title: 'Web Applications', description: 'Custom interfaces and dashboards for tasks that need more than a static website.', icon: FiLayers },
  { title: 'Online Stores', description: 'Discuss an e-commerce website suitable for your products and order workflow.', icon: FiShoppingCart },
  { title: 'Redesign & Improvement', description: 'Refresh an existing site, improve mobile usability and fix important issues.', icon: FiEdit3 },
  { title: 'Branding & UI Design', description: 'Visual design work, interface layouts and design assets for digital products.', icon: FiPenTool },
];

export default function Services() {
  return (
    <main className="section-padding pt-32 min-h-[75vh]">
      <div className="container-custom">
        <span className="section-title block text-center mb-4">WHAT I CAN HELP WITH</span>
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-center mb-6 text-[#252422] dark:text-[#EDEDED]">Services</h1>
        <p className="text-center text-[#403D39] dark:text-[#B0B0B0] max-w-2xl mx-auto mb-14">
          Every project is scoped and quoted individually. Explore the options below and describe your ideas in the enquiry form.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="glass-card p-7 space-y-4">
                <Icon size={28} className="text-[#EB5E28]" />
                <h2 className="font-playfair text-2xl font-semibold text-[#252422] dark:text-[#EDEDED]">{service.title}</h2>
                <p className="text-[#403D39] dark:text-[#B0B0B0]">{service.description}</p>
                <Link to="/request-project" className="inline-flex items-center gap-2 text-[#EB5E28] hover:underline">
                  Request a quote <FiArrowRight />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
