// client/src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMessageCircle, FiMapPin } from 'react-icons/fi';
import GlassButton from './GlassButton';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen flex items-center pt-[72px] relative">
      {/* Existing dotted background — purely decorative. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, top: 0, left: 0 }}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dottedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>

      <div className="container-custom relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-title block mb-5"
          >
            WEB &amp; SOFTWARE DEVELOPER
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            Hi, I’m Kyle. I build websites and web applications.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#403D39] dark:text-[#B0B0B0] mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            I develop responsive interfaces and practical web solutions, from frontend experiences
            to backend functionality. Open to junior developer opportunities and freelance projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-9"
          >
            <GlassButton icon={FiArrowRight} onClick={() => navigate('/#projects')}>
              View My Projects
            </GlassButton>
            <GlassButton icon={FiMessageCircle} onClick={() => navigate('/request-project')}>
              Request a Quote
            </GlassButton>
          </motion.div>

          {/* Informational badges, not fake clickable buttons. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap justify-center gap-2"
            aria-label="Areas of expertise"
          >
            {['Frontend Development', 'Backend Development', 'Responsive Design', 'Web Applications'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#CCC5B9] dark:border-[#403D39] bg-[#FFFCF2]/70 dark:bg-[#222]/70 px-4 py-2 text-sm text-[#403D39] dark:text-[#CCC5B9]"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-7 flex items-center justify-center gap-2 text-sm text-[#403D39] dark:text-[#B0B0B0]"
          >
            <FiMapPin aria-hidden="true" /> Cape Town, South Africa
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
