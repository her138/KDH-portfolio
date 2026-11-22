// client/src/pages/Admin/AdminAbout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const FIELDS = [
  { key: 'about_heading', label: 'Large heading', initial: "Hello,\nI'm Kyle!", multiline: true },
  { key: 'about_intro', label: 'About paragraph', initial: 'I am a front-end developer currently pursuing an Advanced Diploma in ICT Multimedia at CPUT. I specialize in building responsive websites, improving functionality, and fixing code issues to create smooth, reliable, and user-friendly digital experiences.', multiline: true },
  { key: 'about_mission', label: 'Mission paragraph', initial: 'My mission is to help small businesses grow within their sectors by improving their online presence and exposing them to increased business traffic through effective and modern web solutions.', multiline: true },
  { key: 'about_location', label: 'Location card', initial: 'Cape Town, South Africa' },
  { key: 'about_experience', label: 'Experience card', initial: '1+ Years' },
  { key: 'about_projects', label: 'Projects card', initial: '5+ Projects' },
  { key: 'about_cv', label: 'Resume file path / URL', initial: '/documents/latest cv kyle-2.pdf' },
];
const INITIAL = Object.fromEntries(FIELDS.map((field) => [field.key, field.initial]));
const inputClass = 'w-full p-3 border rounded-lg text-black bg-white';

export default function AdminAbout() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL);
  const [existingRows, setExistingRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error: queryError } = await supabase
        .from('site_content')
        .select('id, section_key, body, is_published')
        .in('section_key', FIELDS.map((field) => field.key));
      if (!active) return;
      if (queryError) setError(queryError.message);
      else {
        setExistingRows(data ?? []);
        setValues({
          ...INITIAL,
          ...Object.fromEntries((data ?? []).map((row) => [row.section_key, row.body ?? ''])),
        });
      }
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, []);

  async function save(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const cv = values.about_cv.trim();
      if (cv && !(cv.startsWith('https://') || (cv.startsWith('/') && !cv.startsWith('//')))) {
        throw new Error('Resume path must start with / or https://');
      }
      for (const field of FIELDS) {
        const body = String(values[field.key] ?? '');
        const payload = {
          title: field.label,
          body,
          is_published: true,
          updated_at: new Date().toISOString(),
        };
        const oldRow = existingRows.find((row) => row.section_key === field.key);
        const result = oldRow
          ? await supabase.from('site_content').update(payload).eq('id', oldRow.id).select('id')
          : await supabase.from('site_content')
            .insert({ ...payload, section_key: field.key }).select('id');
        if (result.error) throw new Error(`${field.label}: ${result.error.message}`);
        if (!result.data?.length) throw new Error(`${field.label}: no row saved. Check admin RLS.`);
        if (!oldRow) {
          setExistingRows((prev) => [...prev, {
            id: result.data[0].id, section_key: field.key, body, is_published: true,
          }]);
        }
      }
      setNotice('About Me saved. Return to the homepage tab to see the changes.');
    } catch (err) {
      setError(`Could not finish saving: ${err.message}. Earlier fields may have saved; try again.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="container-custom py-12 space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-playfair font-bold">Edit About Me</h1>
        <button type="button" className="underline" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>
      </div>
      <p className="text-gray-500">Update the homepage heading, biography, quick-info cards and resume link.</p>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      {notice && <p role="status" className="text-green-600">{notice}</p>}
      {loading ? <p>Loading About Me...</p> : (
        <form onSubmit={save} className="glass-card p-6 space-y-5">
          {FIELDS.map((field) => (
            <label key={field.key} className="block space-y-2">
              <span className="block font-medium">{field.label}</span>
              {field.multiline ? (
                <textarea rows={field.key === 'about_heading' ? 2 : 5}
                  className={inputClass} value={values[field.key] ?? ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))} />
              ) : (
                <input className={inputClass} value={values[field.key] ?? ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))} />
              )}
            </label>
          ))}
          <button type="submit" disabled={saving}
            className="bg-[#252422] text-white rounded-lg px-6 py-3 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save About Me'}
          </button>
        </form>
      )}
    </main>
  );
}
