// Updated src/components/Header.jsx - Added theme toggle
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronRight, FiLinkedin, FiGithub, FiSun, FiMoon } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      icon: FiLinkedin, 
      href: 'https://linkedin.com/in/Kyle-Hermanus', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: FiGithub, 
      href: 'https://github.com/Kyle-Hermanus', 
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
      href: 'https://instagram.com/kyle_hermanus', 
      label: 'Instagram',
      color: '#E4405F'
    },
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com/kyle.hermanus', 
      label: 'Facebook',
      color: '#1877f2'
    }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] ${
        scrolled ? 'nav-glass dark:bg-[#1a1a1a]/75' : 'bg-transparent'
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-medium font-playfair text-[#252422] dark:text-[#FFFCF2]"
          >
            MasterCraft
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link dark:text-[#CCC5B9] dark:hover:text-[#EB5E28]"
              >
                {item.label}
              </a>
            ))}
            
            {/* Theme Toggle Button - Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#CCC5B9]/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} className="text-[#EB5E28]" /> : <FiMoon size={20} className="text-[#403D39]" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} className="icon-nav" /> : <FiMenu size={24} className="icon-nav" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Solid Opaque Background */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            {/* Solid Background - Completely Opaque */}
            <div className="relative">
              {/* Solid color background - 100% opacity */}
              <div className="absolute inset-0 bg-[#FFFCF2] dark:bg-[#1a1a1a] z-0"></div>
              
              {/* Subtle shadow */}
              <div className="absolute inset-0 shadow-xl z-0"></div>
              
              {/* Content */}
              <div className="relative z-10 container-custom py-6">
                {/* Theme Toggle - Mobile */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-[#CCC5B9]/20 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {isDarkMode ? <FiSun size={20} className="text-[#EB5E28]" /> : <FiMoon size={20} className="text-[#403D39]" />}
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-[#403D39] dark:text-[#CCC5B9] hover:text-[#EB5E28] transition-colors"
                    >
                      <span className="text-lg">{item.label}</span>
                      <FiChevronRight size={20} className="text-[#CCC5B9]" />
                    </a>
                  ))}
                </div>

                {/* Social Icons - Mobile Only */}
                <div className="mt-8 pt-6 border-t border-[#CCC5B9] dark:border-[#403D39]">
                  <p className="text-sm text-[#403D39] dark:text-[#CCC5B9] mb-4 text-center">Connect With Me</p>
                  <div className="flex justify-between items-center gap-2">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full bg-[#FFFCF2] dark:bg-[#2a2a2a] border border-[#CCC5B9] dark:border-[#403D39]
                                 flex items-center justify-center transition-all duration-300
                                 hover:border-transparent hover:text-white relative group"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = link.color;
                          e.currentTarget.style.borderColor = 'transparent';
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) icon.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '';
                          e.currentTarget.style.borderColor = '';
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) icon.style.color = '';
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <link.icon 
                          size={20} 
                          className="transition-colors duration-300 text-[#403D39] dark:text-[#CCC5B9]"
                        />
                      </motion.a>
                    ))}
                  </div>

                  {/* Quick Contact Info */}
                  <div className="mt-4 text-center text-xs text-[#403D39] dark:text-[#CCC5B9]">
                    <p>webklinic2024@gmail.com</p>
                    <p className="mt-1">+27 73 9933 288</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;