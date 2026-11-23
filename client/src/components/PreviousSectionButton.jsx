import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET = 88;

export default function PreviousSectionButton() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      setIsVisible(false);
      return;
    }

    const updateVisibility = () => {
      setIsVisible(window.scrollY > 240);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, [pathname]);

  const scrollToPreviousSection = () => {
    // Every homepage component renders a section with an id.
    const sections = Array.from(
      document.querySelectorAll('main > section[id]')
    );

    if (sections.length === 0) return;

    const footer = document.querySelector('footer');
    const footerIsVisible =
      footer && footer.getBoundingClientRect().top < window.innerHeight - 120;

    let target;

    if (footerIsVisible) {
      // From the footer, return to the Contact section (last homepage section).
      target = sections[sections.length - 1];
    } else {
      // Identify the section occupying the upper part of the screen.
      const marker = HEADER_OFFSET + 80;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= marker) {
          currentIndex = index;
        }
      });

      target = sections[Math.max(0, currentIndex - 1)];
    }

    const top = Math.max(
      0,
      window.scrollY + target.getBoundingClientRect().top - HEADER_OFFSET
    );
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && pathname === '/' && (
        <motion.button
          type="button"
          onClick={scrollToPreviousSection}
          aria-label="Scroll to previous section"
          title="Previous section"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-5 sm:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#CCC5B9] dark:border-[#403D39] bg-[#FFFCF2]/95 dark:bg-[#252422]/95 text-[#252422] dark:text-[#FFFCF2] shadow-lg backdrop-blur-md transition-colors hover:border-[#EB5E28] hover:text-[#EB5E28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E28]"
        >
          <FiArrowUp size={22} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
