// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from './GlassButton';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-[72px] relative">
      {/* Dotted Grid Background */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, top: 0, left: 0 }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dottedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>

      <div className="container-custom relative z-10">
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
            className="section-title block"
          >
            DIGITAL IDENTITY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            MasterCraft
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#403D39] dark:text-[#B0B0B0] mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Specializing in modern web technologies with a focus on creating fast, accessible, 
            and user-friendly experiences.
          </motion.p>

          {/* Skills Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 flex flex-wrap justify-center gap-2"
          >
            <GlassButton>Web Dev</GlassButton>
            <GlassButton>UX/UI Design</GlassButton>
            <GlassButton>Front-End Dev</GlassButton>
            <GlassButton>Backend</GlassButton>
          </motion.div>

          {/* Added location info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <GlassButton>Cape Peninsula University of Technology</GlassButton>
            <GlassButton>ZA</GlassButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;