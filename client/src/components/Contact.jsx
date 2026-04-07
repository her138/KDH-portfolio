// Updated src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import GlassButton from './GlassButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });

      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'webklinic2024@gmail.com',
      href: 'mailto:webklinic2024@gmail.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+27 73 9933 288',
      href: 'tel:+27739933288'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Cape Town, South Africa',
      href: null
    }
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">CONTACT</span>
          <h2 className="font-playfair text-4xl font-semibold text-center mb-16">Get In Touch</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card"
            >
              <h3 className="text-2xl font-playfair font-semibold mb-6 text-[#252422] dark:text-[#EDEDED]">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className="form-input"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="form-input"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows="5"
                  required
                  className="form-input resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  <span className="button-content">
                    <FiSend size={20} className="button-icon" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </span>
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[#EB5E28]"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card h-fit"
            >
              <h3 className="text-2xl font-playfair font-semibold mb-6 text-[#252422] dark:text-[#EDEDED]">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 group"
                  >
                    <GlassButton className="w-12 h-12 p-0 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} />
                    </GlassButton>
                    <div className="flex-1">
                      <p className="text-sm text-[#403D39] dark:text-[#B0B0B0] mb-1 font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#252422] dark:text-[#EDEDED] hover:text-[#EB5E28] transition-colors text-base"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#252422] dark:text-[#EDEDED] text-base">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-6 pt-6 border-t border-[#CCC5B9] dark:border-[#404040]">
                <p className="text-sm text-[#403D39] dark:text-[#B0B0B0] mb-2">Business Hours</p>
                <p className="text-[#252422] dark:text-[#EDEDED]">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-[#252422] dark:text-[#EDEDED]">Sat: 10:00 AM - 2:00 PM</p>
              </div>

              {/* Response Time */}
              <div className="mt-4 flex items-center gap-2 text-sm text-[#403D39] dark:text-[#B0B0B0]">
                <span className="w-2 h-2 bg-[#EB5E28] rounded-full animate-pulse"></span>
                <span>Typically responds within 24 hours</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;