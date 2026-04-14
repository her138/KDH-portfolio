// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiBriefcase, FiFolder } from 'react-icons/fi';

const About = () => {
  const handleDownloadCV = () => {
    // The PDF is located in public/documents/ folder
    const cvPath = `/documents/${encodeURIComponent('latest cv kyle-2.pdf')}`;
    window.open(cvPath, '_blank');
  };

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">ABOUT ME</span>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side: large text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="sticky top-32">
                <h2 className="font-playfair text-6xl lg:text-7xl xl:text-8xl font-bold text-[#252422] dark:text-[#EDEDED] leading-tight">
                  Hello,<br />
                  I'm Kyle!
                </h2>
              </div>
            </motion.div>

            {/* Right side: content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6 text-[#403D39] dark:text-[#B0B0B0] text-lg">
                <p>
                  Damion Hermanus is a front-end developer currently pursuing an Advanced Diploma in
                  ICT Multimedia at CPUT (2021–present). He specializes in front-end development,
                  building responsive websites, ensuring functionality, and fixing code bugs to create
                  smooth and reliable user experiences.
                </p>
                <p>
                  My mission is to help small businesses grow within their sectors by improving their online presence
                  and exposing them to increased business traffic through effective and modern web solutions.
                </p>
              </div>

              {/* Quick Info - Rectangular Containers */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiMapPin className="w-6 h-6 text-[#EB5E28] mb-2" />
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">Cape Town, South Africa</span>
                </div>
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiBriefcase className="w-6 h-6 text-[#EB5E28] mb-2" />
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">1+ Years</span>
                </div>
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiFolder className="w-6 h-6 text-[#EB5E28] mb-2" />
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">5+ Projects</span>
                </div>
              </div>

              {/* Centered Download Resume Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleDownloadCV}
                  className="glass-button-resume"
                >
                  <span className="button-content">
                    <FiDownload size={20} className="button-icon" />
                    <span>Download Resume</span>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;