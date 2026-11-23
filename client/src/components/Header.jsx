// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiChevronRight,
  FiLinkedin,
  FiGithub,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { label: 'Home', path: '/#home' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Skills', path: '/#skills' },
    { label: 'About', path: '/#about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/#contact' },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      href: 'https://linkedin.com/in/Kyle-Hermanus',
      label: 'LinkedIn',
      color: '#0077b5',
    },
    {
      icon: FiGithub,
      href: 'https://github.com/her138',
      label: 'GitHub',
      color: '#333333',
    },
    {
      icon: FaWhatsapp,
      href: 'https://wa.me/27671166158',
      label: 'WhatsApp',
      color: '#25D366',
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/kyle_hermanus',
      label: 'Instagram',
      color: '#E4405F',
    },
    {
      icon: FaFacebook,
      href: 'https://facebook.com/kyle.hermanus',
      label: 'Facebook',
      color: '#1877f2',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !isDarkMode;

    setIsDarkMode(nextDarkMode);

    if (nextDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled ? 'nav-glass dark:bg-[#1a1a1a]/75' : 'bg-transparent'
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/#home"
              className="text-2xl font-medium font-playfair text-[#252422] dark:text-[#FFFCF2]"
            >
              MasterCraft
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="nav-link whitespace-nowrap">
                {item.label}
              </Link>
            ))}

            <Link
              to="/request-project"
              className="inline-flex items-center rounded-full border border-[#EB5E28] px-4 py-2 text-sm font-semibold text-[#EB5E28] hover:bg-[#EB5E28] hover:text-white transition-colors whitespace-nowrap"
            >
              Get a Quote
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#CCC5B9]/20 transition-colors"
              aria-label="Toggle theme"
              type="button"
            >
              {isDarkMode ? (
                <FiSun size={20} className="text-[#EB5E28]" />
              ) : (
                <FiMoon size={20} className="text-[#403D39]" />
              )}
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-navigation"
            type="button"
          >
            {isMenuOpen ? (
              <FiX size={24} className="icon-nav" />
            ) : (
              <FiMenu size={24} className="icon-nav" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-site-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFFCF2] dark:bg-[#1a1a1a] z-0"></div>
              <div className="absolute inset-0 shadow-xl z-0"></div>

              <div className="relative z-10 container-custom py-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-[#CCC5B9]/20 transition-colors"
                    aria-label="Toggle theme"
                    type="button"
                  >
                    {isDarkMode ? (
                      <FiSun size={20} className="text-[#EB5E28]" />
                    ) : (
                      <FiMoon size={20} className="text-[#403D39]" />
                    )}
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between py-3 text-[#403D39] dark:text-[#CCC5B9] hover:text-[#EB5E28] transition-colors"
                    >
                      <span className="text-lg">{item.label}</span>
                      <FiChevronRight size={20} className="text-[#CCC5B9]" />
                    </Link>
                  ))}
                  <Link
                    to="/request-project"
                    onClick={closeMobileMenu}
                    className="mt-2 flex items-center justify-center rounded-full bg-[#EB5E28] px-5 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Get a Quote
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-[#CCC5B9] dark:border-[#403D39]">
                  <p className="text-sm text-[#403D39] dark:text-[#CCC5B9] mb-4 text-center">
                    Connect With Me
                  </p>

                  <div className="flex justify-between items-center gap-2">
                    {socialLinks.map((link) => {
                      const SocialIcon = link.icon;

                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          aria-label={link.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-[#FFFCF2] dark:bg-[#2a2a2a] border border-[#CCC5B9] dark:border-[#403D39] flex items-center justify-center transition-all duration-300 hover:border-transparent hover:text-white relative group"
                          onMouseEnter={(event) => {
                            event.currentTarget.style.backgroundColor =
                              link.color;
                            event.currentTarget.style.borderColor =
                              'transparent';

                            const icon =
                              event.currentTarget.querySelector('svg');

                            if (icon) {
                              icon.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.backgroundColor = '';
                            event.currentTarget.style.borderColor = '';

                            const icon =
                              event.currentTarget.querySelector('svg');

                            if (icon) {
                              icon.style.color = '';
                            }
                          }}
                          onClick={closeMobileMenu}
                        >
                          <SocialIcon
                            size={20}
                            className="transition-colors duration-300 text-[#403D39] dark:text-[#CCC5B9]"
                          />
                        </motion.a>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-center text-xs text-[#403D39] dark:text-[#CCC5B9]">
                    <p>Hermanus138@gmail.com</p>
                    <p className="mt-1">+27 67 116 6158</p>
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