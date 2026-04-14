// Updated src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { 
      icon: FiLinkedin, 
      href: 'https://linkedin.com/in/kyle-hermanus-017081234', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: FiGithub, 
      href: 'https://github.com/her-138', 
      label: 'GitHub',
      color: '#333'
    },
    { 
      icon: FaWhatsapp, 
      href: 'https://wa.me/27739933288', 
      label: 'WhatsApp',
      color: '#25D366'
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/MasterCraftSites', 
      label: 'Instagram',
      color: '#E4405F'
    },
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com/MasterCrafts_Sites', 
      label: 'Facebook',
      color: '#1877f2'
    }
  ];

  return (
    <footer className="py-16 border-t border-[#CCC5B9] mt-12 bg-[#FFFCF2]">
      <div className="container-custom">
        {/* Social Icons - Centered and Larger */}
        <div className="flex justify-center items-center gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-[#FFFCF2] border-2 border-[#CCC5B9] 
                       flex items-center justify-center transition-all duration-300
                       hover:border-transparent hover:text-white relative group"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = link.color;
                e.currentTarget.style.borderColor = 'transparent';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFCF2';
                e.currentTarget.style.borderColor = '#CCC5B9';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.color = '#403D39';
              }}
            >
              <link.icon 
                size={28} 
                className="transition-colors duration-300"
                style={{ color: '#403D39' }}
              />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             text-sm bg-[#252422] text-[#FFFCF2] px-3 py-1.5 rounded-lg
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             whitespace-nowrap pointer-events-none shadow-lg">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Copyright and Credit */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#CCC5B9]">
          <p className="text-[#403D39] text-sm order-2 md:order-1">
            © 2026 Kyle Hermanus. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 order-1 md:order-2">
            <span className="text-[#403D39] text-sm">Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <FiHeart size={16} className="text-[#EB5E28]" />
            </motion.div>
            <span className="text-[#403D39] text-sm">using React & Tailwind</span>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#403D39]">
            <a href="mailto:webklinic2024@gmail.com" className="hover:text-[#EB5E28] transition-colors">
              webklinic2024@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;