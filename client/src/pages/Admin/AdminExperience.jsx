import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const EMPTY = {
  title: '', organisation: '', type: 'Work', description: '',
  start_date: '', end_date: '', is_current: false, is_visible: false, sort_order: 0,
};
const inputClass = 'w-full border rounded-lg p-3 text-black bg-white';

export default function AdminExperience() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function refresh() {
    setLoading(true);
    const { data, error: dbError } = await supabase.from('experience')
      .select('id,title,organisation,type,description,start_date,end_date,is_current,is_visible,sort_order')
      .order('sort_order', { ascending: true })
      .order('start_date', { ascending: false });
    if (dbError) setError(dbError.message);
    else { setEntries(data ?? []); setError(''); }
    setLoading(false);
  }

  useEffect(() => { void refresh(); }, []);
  function update(key, value) { setForm((previous) => ({ ...previous, [key]: value })); }
  function reset() { setEditingId(null); setForm({ ...EMPTY }); }
  function edit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title ?? '', organisation: item.organisation ?? '',
      type: item.type ?? 'Work', description: item.description ?? '',
      start_date: item.start_date ?? '', end_date: item.end_date ?? '',
      is_current: Boolean(item.is_current), is_visible: Boolean(item.is_visible),
      sort_order: item.sort_order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true); setError(''); setNotice('');
    try {
      const title = String(form.title ?? '').trim();
      const organisation = String(form.organisation ?? '').trim();
      if (!title || !organisation) throw new Error('Title and organisation are required.');
      if (title.length > 150 || organisation.length > 150) throw new Error('Title or organisation too long.');
      if (!form.is_current && form.start_date && form.end_date && form.end_date < form.start_date) {
        throw new Error('The end date cannot precede the start date.');
      }
      const payload = {
        title, organisation, type: String(form.type || 'Work').trim(),
        description: String(form.description ?? '').trim(),
        start_date: form.start_date || null,
        end_date: form.is_current ? null : form.end_date || null,
        is_current: Boolean(form.is_current), is_visible: Boolean(form.is_visible),
        sort_order: Number(form.sort_order) || 0,
      };
      const result = editingId
        ? await supabase.from('experience').update(payload).eq('id', editingId).select('id')
        : await supabase.from('experience').insert(payload).select('id');
      if (result.error) throw result.error;
      if (!result.data?.length) throw new Error('No row saved. Check admin RLS permissions.');
      reset();
      await refresh();
      setNotice('Experience saved successfully.');
    } catch (err) { setError(err.message || 'Unable to save experience.'); }
    finally { setSaving(false); }
  }

  async function toggle(item) {
    setBusyId(item.id); setError('');
    const { data, error: dbError } = await supabase.from('experience')
      .update({ is_visible: !item.is_visible }).eq('id', item.id).select('id');
    if (dbError || !data?.length) setError(dbError?.message || 'Visibility not updated.');
    else await refresh();
    setBusyId(null);
  }

  async function remove(item) {
    if (!window.confirm(`Permanently delete "${item.title}"?`)) return;
    setBusyId(item.id); setError('');
    const { data, error: dbError } = await supabase.from('experience')
      .delete().eq('id', item.id).select('id');
    if (dbError || !data?.length) setError(dbError?.message || 'Entry not deleted.');
    else {
      if (editingId === item.id) reset();
      await refresh();
    }
    setBusyId(null);
  }

  return (
    <main className="container-custom py-12 space-y-10">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="font-playfair text-3xl font-bold">Experience Manager</h1>
        <button type="button" onClick={() => navigate('/admin')} className="underline">Back to Dashboard</button>
      </div>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      {notice && <p role="status" className="text-green-600">{notice}</p>}

      <section className="glass-card p-6 space-y-5">
        <h2 className="font-playfair text-2xl font-semibold">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
        <form onSubmit={save} className="space-y-4">
          <label className="block">Position / Qualification
            <input required maxLength={150} className={inputClass} value={form.title}
              onChange={(e) => update('title', e.target.value)} />
          </label>
          <label className="block">Company / Institution
            <input required maxLength={150} className={inputClass} value={form.organisation}
              onChange={(e) => update('organisation', e.target.value)} />
          </label>
          <label className="block">Type
            <select className={inputClass} value={form.type}
              onChange={(e) => update('type', e.target.value)}>
              <option>Work</option><option>Internship</option><option>Freelance</option>
              <option>Education</option><option>Volunteer</option><option>Project</option>
            </select>
          </label>
          <label className="block">Description
            <textarea rows={5} className={inputClass} value={form.description}
              onChange={(e) => update('description', e.target.value)} />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">Start Date
              <input type="date" className={inputClass} value={form.start_date}
                onChange={(e) => update('start_date', e.target.value)} />
            </label>
            <label className="block">End Date
              <input type="date" disabled={form.is_current} className={inputClass}
                value={form.end_date} onChange={(e) => update('end_date', e.target.value)} />
            </label>
          </div>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.is_current}
              onChange={(e) => update('is_current', e.target.checked)} />
            Currently working/studying here
          </label>
          <label className="block">Display Order
            <input type="number" className={inputClass} value={form.sort_order}
              onChange={(e) => update('sort_order', e.target.value)} />
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.is_visible}
              onChange={(e) => update('is_visible', e.target.checked)} />
            Show publicly
          </label>
          <div className="flex flex-wrap gap-3">
            <button disabled={saving} type="submit"
              className="bg-[#252422] text-white rounded-lg px-6 py-3 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Experience'}
            </button>
            <button type="button" onClick={reset} className="border rounded-lg px-6 py-3">Cancel</button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold">Existing Experience ({entries.length})</h2>
        {loading && <p>Loading experience...</p>}
        {!loading && entries.length === 0 && <p>No entries yet. Add real experience or education above.</p>}
        {entries.map((item) => (
          <article key={item.id} className="glass-card p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.organisation} · {item.type}</p>
              <p className="text-sm">{item.is_visible ? 'Visible' : 'Hidden'}</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button type="button" onClick={() => edit(item)} className="underline">Edit</button>
              <button type="button" disabled={busyId === item.id} onClick={() => toggle(item)} className="underline">
                {item.is_visible ? 'Hide' : 'Show'}
              </button>
              <button type="button" disabled={busyId === item.id} onClick={() => remove(item)} className="underline text-red-500">Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
