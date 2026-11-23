// client/src/components/About.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload, FiMapPin, FiBriefcase, FiFolder } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

// These values are only fallbacks. Published About content in Supabase remains editable in admin.
const DEFAULT_CONTENT = {
  about_heading: "Hello,\nI'm Kyle!",
  about_intro: 'I am a web and software developer pursuing an Advanced Diploma in ICT Multimedia at CPUT. I work on responsive interfaces, backend functionality and practical web solutions, with a focus on making digital products easy to use.',
  about_mission: 'I am interested in junior software development opportunities and helping businesses improve their online presence with useful, well-built websites and applications.',
  about_location: 'Cape Town, South Africa',
  about_experience: '1+ Years',
  about_projects: '5+ Projects',
  about_cv: '/documents/KDHermanus Cv.pdf',
};

export default function About() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadAbout() {
      const { data, error: queryError } = await supabase
        .from('site_content')
        .select('section_key, body')
        .in('section_key', Object.keys(DEFAULT_CONTENT))
        .eq('is_published', true);

      if (!active) return;

      if (queryError) {
        console.error('About section:', queryError);
        setError('About information could not be refreshed.');
        return;
      }

      const values = Object.fromEntries(
        (data ?? []).map((row) => [row.section_key, row.body ?? ''])
      );

      // Preserve intentional empty admin fields, but fall back when a row is absent.
      setContent(
        Object.fromEntries(
          Object.keys(DEFAULT_CONTENT).map((key) => [key, values[key] ?? DEFAULT_CONTENT[key]])
        )
      );
      setError('');
    }

    const refresh = () => { void loadAbout(); };
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') void loadAbout();
    };

    void loadAbout();
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refreshIfVisible);

    return () => {
      active = false;
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, []);

  function handleViewCV() {
    const path = content.about_cv?.trim();
    if (!path) return;
    const safe = path.startsWith('https://') ||
      (path.startsWith('/') && !path.startsWith('//'));
    if (!safe) return;
    window.open(encodeURI(path), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="about" className="section-padding scroll-mt-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">ABOUT ME</span>
          {error && <p role="status" className="text-sm text-center mb-4">{error}</p>}

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="sticky top-32">
                <h2 className="font-playfair text-6xl lg:text-7xl xl:text-8xl font-bold text-[#252422] dark:text-[#EDEDED] leading-tight whitespace-pre-line">
                  {content.about_heading}
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <p className="text-sm uppercase tracking-wider font-semibold text-[#EB5E28]">
                Open to junior developer roles &amp; freelance projects
              </p>

              <div className="space-y-6 text-[#403D39] dark:text-[#B0B0B0] text-lg leading-relaxed">
                {content.about_intro && <p>{content.about_intro}</p>}
                {content.about_mission && <p>{content.about_mission}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiMapPin className="w-6 h-6 text-[#EB5E28] mb-2" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#403D39] dark:text-[#B0B0B0] mb-1">Location</span>
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">{content.about_location}</span>
                </div>
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiBriefcase className="w-6 h-6 text-[#EB5E28] mb-2" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#403D39] dark:text-[#B0B0B0] mb-1">Experience</span>
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">{content.about_experience}</span>
                </div>
                <div className="glass-card flex flex-col items-center justify-center py-6 px-2 text-center hover:translate-y-[-4px] transition-all duration-300">
                  <FiFolder className="w-6 h-6 text-[#EB5E28] mb-2" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#403D39] dark:text-[#B0B0B0] mb-1">Projects</span>
                  <span className="text-sm font-medium text-[#252422] dark:text-[#EDEDED]">{content.about_projects}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5">
                <button
                  type="button"
                  onClick={handleViewCV}
                  className="glass-button-resume"
                  disabled={!content.about_cv?.trim()}
                >
                  <span className="button-content">
                    <FiDownload size={20} className="button-icon" aria-hidden="true" />
                    <span>View My CV</span>
                  </span>
                </button>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 text-[#EB5E28] font-semibold hover:underline"
                >
                  Get in touch <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
