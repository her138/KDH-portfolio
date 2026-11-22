import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

function readableDate(dateText) {
  if (!dateText) return '';
  const date = new Date(`${dateText}T12:00:00`);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-ZA', {
    month: 'short', year: 'numeric',
  });
}

export default function Experience() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function refresh() {
      const { data, error: queryError } = await supabase.from('experience')
        .select('id,title,organisation,type,description,start_date,end_date,is_current,sort_order')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true })
        .order('start_date', { ascending: false });
      if (!active) return;
      if (queryError) {
        setError(queryError.message);
        setEntries([]);
      } else {
        setEntries(data ?? []);
        setError('');
      }
      setLoading(false);
    }
    const onFocus = () => { void refresh(); };
    const onVisible = () => { if (document.visibilityState === 'visible') void refresh(); };
    void refresh();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      active = false;
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  if (loading || (!error && entries.length === 0)) return null;

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-title block text-center mb-4">MY JOURNEY</span>
          <h2 className="font-playfair text-4xl font-semibold text-center mb-16">
            Experience &amp; Education
          </h2>
          {error && <p role="alert" className="text-red-500 text-center">Experience unavailable: {error}</p>}
          <div className="grid md:grid-cols-2 gap-6">
            {entries.map((item, index) => (
              <motion.article key={item.id} className="glass-card p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#EB5E28]/10 flex items-center justify-center shrink-0">
                    <FiBriefcase className="text-[#EB5E28]" size={23} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#EB5E28]">{item.type || 'Experience'}</p>
                    <h3 className="font-playfair text-xl font-semibold text-[#252422] dark:text-[#EDEDED]">
                      {item.title}
                    </h3>
                    <p className="text-[#403D39] dark:text-[#B0B0B0]">{item.organisation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#403D39] dark:text-[#B0B0B0]">
                  <FiCalendar className="text-[#EB5E28]" />
                  <span>
                    {readableDate(item.start_date) || 'Date not specified'} –{' '}
                    {item.is_current ? 'Present' : (readableDate(item.end_date) || 'Not specified')}
                  </span>
                </div>
                {item.description && (
                  <p className="text-[#403D39] dark:text-[#B0B0B0] whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
