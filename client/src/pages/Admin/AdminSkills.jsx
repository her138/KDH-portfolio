// client/src/pages/Admin/AdminSkills.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const EMPTY = {
  name: '', category: 'Frontend', icon_url: '',
  sort_order: 0, is_visible: true,
};
const inputClass = 'w-full p-3 border rounded-lg text-black bg-white';

export default function AdminSkills() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadSkills() {
    const { data, error: queryError } = await supabase
      .from('skills')
      .select('id, name, category, icon_url, sort_order, is_visible')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });
    if (queryError) setError(queryError.message);
    else setSkills(data ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadSkills(); }, []);

  function edit(skill) {
    setEditingId(skill.id);
    setForm({
      name: skill.name ?? '',
      category: skill.category ?? 'Frontend',
      icon_url: skill.icon_url ?? '',
      sort_order: skill.sort_order ?? 0,
      is_visible: skill.is_visible ?? true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setEditingId(null);
    setForm({ ...EMPTY, sort_order: skills.length + 1 });
  }

  async function save(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const name = String(form.name ?? '').trim();
      const url = String(form.icon_url ?? '').trim();
      if (!name || name.length > 80) throw new Error('Skill name must be 1–80 characters.');
      if (url && !(url.startsWith('https://') || (url.startsWith('/') && !url.startsWith('//')))) {
        throw new Error('Icon URL must be an HTTPS URL or a local /path.');
      }
      if (skills.some((s) => s.id !== editingId && s.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('A skill with this name already exists.');
      }

      const payload = {
        name,
        category: form.category,
        icon_url: url || null,
        sort_order: Number(form.sort_order) || 0,
        is_visible: Boolean(form.is_visible),
      };
      const result = editingId
        ? await supabase.from('skills').update(payload).eq('id', editingId).select('id')
        : await supabase.from('skills').insert(payload).select('id');

      if (result.error) throw result.error;
      if (!result.data?.length) throw new Error('No row was saved. Check admin RLS permissions.');
      reset();
      setNotice('Skill saved successfully.');
      await loadSkills();
    } catch (err) {
      setError(err.message || 'Unable to save skill.');
    } finally {
      setSaving(false);
    }
  }

  async function toggle(skill) {
    setBusyId(skill.id);
    setError('');
    const { data, error: queryError } = await supabase
      .from('skills').update({ is_visible: !skill.is_visible })
      .eq('id', skill.id).select('id');
    if (queryError || !data?.length) setError(queryError?.message || 'Skill not updated.');
    else await loadSkills();
    setBusyId(null);
  }

  async function remove(skill) {
    if (!window.confirm(`Permanently delete "${skill.name}"?`)) return;
    setBusyId(skill.id);
    setError('');
    const { data, error: queryError } = await supabase
      .from('skills').delete().eq('id', skill.id).select('id');
    if (queryError || !data?.length) setError(queryError?.message || 'Skill not deleted.');
    else {
      if (editingId === skill.id) reset();
      await loadSkills();
    }
    setBusyId(null);
  }

  return (
    <main className="container-custom py-12 space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-playfair font-bold">Manage Skills</h1>
        <button type="button" className="underline" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>
      </div>

      {error && <p role="alert" className="text-red-500">{error}</p>}
      {notice && <p role="status" className="text-green-600">{notice}</p>}

      <section className="glass-card p-6 space-y-4">
        <h2 className="text-2xl font-semibold">{editingId ? 'Edit Skill' : 'Add Skill'}</h2>
        <form onSubmit={save} className="space-y-4">
          <label className="block">Name
            <input className={inputClass} required maxLength={80} value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Supabase" />
          </label>
          <label className="block">Category
            <select className={inputClass} value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
              <option>Frontend</option><option>Backend</option>
              <option>Design</option><option>Tools</option>
            </select>
          </label>
          <label className="block">Icon image URL (optional)
            <input className={inputClass} value={form.icon_url ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, icon_url: e.target.value }))}
              placeholder="https://... or /images/icon.png" />
          </label>
          <p className="text-sm text-gray-500">
            Existing technologies keep their original coloured icons automatically.
            New names use a code icon unless you provide an image URL.
          </p>
          <label className="block">Display order
            <input type="number" className={inputClass} value={form.sort_order}
              onChange={(e) => setForm((p) => ({ ...p, sort_order: e.target.value }))} />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_visible}
              onChange={(e) => setForm((p) => ({ ...p, is_visible: e.target.checked }))} />
            Visible on portfolio
          </label>
          <div className="flex gap-3 flex-wrap">
            <button type="submit" disabled={saving}
              className="bg-[#252422] text-white rounded-lg px-5 py-3 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
            <button type="button" onClick={reset} className="border rounded-lg px-5 py-3">Cancel</button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Existing Skills ({skills.length})</h2>
        {loading && <p>Loading skills...</p>}
        {!loading && skills.length === 0 && <p>No skills yet.</p>}
        {skills.map((skill) => (
          <article key={skill.id}
            className="glass-card p-5 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-500">
                {skill.category || 'Uncategorised'} · Order {skill.sort_order ?? 0} ·
                {' '}{skill.is_visible ? 'Visible' : 'Hidden'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="underline" onClick={() => edit(skill)}>Edit</button>
              <button type="button" className="underline" disabled={busyId === skill.id}
                onClick={() => toggle(skill)}>
                {skill.is_visible ? 'Hide' : 'Show'}
              </button>
              <button type="button" className="underline text-red-500" disabled={busyId === skill.id}
                onClick={() => remove(skill)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
