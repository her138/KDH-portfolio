// client/src/components/Skills.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiHtml5, SiCss3, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiPhp, SiFigma, SiAdobeillustrator, SiAdobephotoshop, SiGithub,
  SiVisualstudiocode, SiVercel,
} from 'react-icons/si';
import { supabase } from '../lib/supabase';

// Icon names and colours remain in React. Names, order and visibility are in Supabase.
const ICONS = {
  react: [SiReact, '#61DAFB'],
  'next.js': [SiNextdotjs, '#000000'],
  typescript: [SiTypescript, '#3178C6'],
  tailwind: [SiTailwindcss, '#06B6D4'],
  javascript: [SiJavascript, '#F7DF1E'],
  html5: [SiHtml5, '#E34F26'],
  css3: [SiCss3, '#1572B6'],
  'node.js': [SiNodedotjs, '#339933'],
  express: [SiExpress, '#000000'],
  mongodb: [SiMongodb, '#47A248'],
  mysql: [SiMysql, '#4479A1'],
  php: [SiPhp, '#777BB4'],
  figma: [SiFigma, '#F24E1E'],
  illustrator: [SiAdobeillustrator, '#FF9A00'],
  photoshop: [SiAdobephotoshop, '#31A8FF'],
  github: [SiGithub, '#181717'],
  'vs code': [SiVisualstudiocode, '#007ACC'],
  vercel: [SiVercel, '#000000'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function loadSkills() {
      const { data, error: queryError } = await supabase
        .from('skills')
        .select('id, name, category, icon_url, sort_order')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (!active) return;
      if (queryError) {
        setError(queryError.message);
        setSkills([]);
      } else {
        setSkills(data ?? []);
        setError('');
      }
      setLoading(false);
    }

    const refresh = () => { void loadSkills(); };
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') void loadSkills();
    };
    void loadSkills();
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refreshIfVisible);
    return () => {
      active = false;
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, []);

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">EXPERTISE</span>
          <h2 className="font-playfair text-4xl font-semibold text-center mb-16">
            Technologies &amp; Languages
          </h2>

          {loading && <p role="status" className="text-center mb-6">Loading skills...</p>}
          {error && <p role="alert" className="text-center text-red-500 mb-6">Skills unavailable: {error}</p>}
          {!loading && !error && skills.length === 0 && (
            <p className="text-center mb-6">No published skills yet.</p>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center"
          >
            {skills.map((skill) => {
              const [Icon, color] = ICONS[skill.name.toLowerCase()] ?? [FiCode, '#EB5E28'];
              const customIcon = skill.icon_url && (
                skill.icon_url.startsWith('https://') ||
                (skill.icon_url.startsWith('/') && !skill.icon_url.startsWith('//'))
              );
              return (
                <motion.div key={skill.id} variants={itemVariants}>
                  <div className="skill-button">
                    {customIcon ? (
                      <img src={skill.icon_url} alt="" width={28} height={28} loading="lazy" />
                    ) : (
                      <Icon size={28} style={{ color }} aria-hidden="true" />
                    )}
                    <span className="text-xs">{skill.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
