import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const PAGE_SIZE = 20;
const STATUS_LABELS = [
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['quoted', 'Quoted'],
  ['accepted', 'Accepted'],
  ['in_progress', 'In Progress'],
  ['completed', 'Completed'],
  ['declined', 'Declined'],
  ['archived', 'Archived'],
];
const STATUS_NAME = Object.fromEntries(STATUS_LABELS);
const inputClass = 'w-full rounded-lg border p-3 bg-white text-black';

function formatDate(value) {
  if (!value) return 'Not provided';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' });
}

function whatsappLink(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (/^0[678]/.test(digits)) digits = `27${digits.slice(1)}`;
  return digits.length >= 9 && digits.length <= 15 ? `https://wa.me/${digits}` : null;
}

export default function AdminEnquiries() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('new');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      let query = supabase.from('project_enquiries')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      if (filter !== 'all') query = query.eq('status', filter);
      const { data, count, error: dbError } = await query;
      if (!active) return;
      if (dbError) {
        setError(dbError.message);
        setEnquiries([]);
        setTotal(0);
      } else {
        setEnquiries(data ?? []);
        setTotal(count ?? 0);
        setError('');
      }
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [page, filter, refreshCount]);

  const visible = useMemo(() => enquiries.filter((item) => {
    const text = `${item.full_name} ${item.email} ${item.business ?? ''} ${item.service_type} ${item.description}`.toLowerCase();
    return text.includes(search.trim().toLowerCase());
  }), [enquiries, search]);

  function open(item) {
    setSelected(item);
    setStatus(item.status);
    setNotes(item.admin_notes ?? '');
    setError('');
    setMessage('');
  }

  async function save() {
    if (!selected || saving) return;
    if (!STATUS_NAME[status]) {
      setError('Choose a valid status.');
      return;
    }
    if (notes.length > 4000) {
      setError('Internal notes must be less than 4,000 characters.');
      return;
    }
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const { data, error: dbError } = await supabase.from('project_enquiries')
        .update({ status, admin_notes: notes.trim() })
        .eq('id', selected.id)
        .select('id');
      if (dbError) throw dbError;
      if (!data?.length) throw new Error('No enquiry was updated. Check admin permissions.');
      setSelected(null);
      setMessage('Enquiry updated. Any client reply must be sent separately.');
      setRefreshCount((number) => number + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  }

  const firstRow = total ? page * PAGE_SIZE + 1 : 0;
  const lastRow = Math.min(total, (page + 1) * PAGE_SIZE);

  return (
    <main className="container-custom py-12 space-y-7 min-h-[75vh]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="section-title block mb-3">PRIVATE DASHBOARD</span>
          <h1 className="text-3xl font-playfair font-bold">Project Enquiries & Bookings</h1>
        </div>
        <button type="button" onClick={() => navigate('/admin')} className="border rounded-lg px-5 py-3">
          Back to Dashboard
        </button>
      </div>
      <p className="text-sm text-[#403D39] dark:text-[#B0B0B0]">
        A consultation is only a request until you confirm it with the client. Changing its status does not send an email automatically.
      </p>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      {message && <p role="status" className="text-green-600">{message}</p>}

      <section className="glass-card p-5 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <label className="block space-y-2">
          <span>Filter by status</span>
          <select className={inputClass} value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); setSelected(null); }}>
            <option value="all">All enquiries</option>
            {STATUS_LABELS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="block space-y-2">
          <span>Search this page</span>
          <input className={inputClass} value={search} onChange={event => setSearch(event.target.value)}
            placeholder="Client name, email or service" />
        </label>
        <button type="button" onClick={() => setRefreshCount(n => n + 1)} className="bg-[#252422] text-white rounded-lg px-5 py-3">
          Refresh
        </button>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <h2 className="text-xl font-semibold">Enquiries ({total})</h2>
          <span className="text-sm text-[#403D39] dark:text-[#B0B0B0]">{firstRow}–{lastRow} of {total}</span>
        </div>
        {loading && <p>Loading enquiries…</p>}
        {!loading && visible.length === 0 && <p>No enquiries match these filters.</p>}
        {visible.map((item) => (
          <article key={item.id} className="glass-card p-5 flex flex-wrap justify-between gap-4 items-center">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-semibold text-lg">{item.full_name}</h3>
                <span className="text-xs px-2 py-1 border rounded-lg text-[#EB5E28] border-[#EB5E28]">
                  {STATUS_NAME[item.status] ?? item.status}
                </span>
                {item.enquiry_type === 'consultation' && (
                  <span className="text-xs border rounded-lg px-2 py-1">Consultation request</span>
                )}
              </div>
              <p className="text-sm break-all">{item.email} · {item.service_type.replaceAll('_', ' ')}</p>
              <p className="text-sm text-[#403D39] dark:text-[#B0B0B0]">Received: {formatDate(item.created_at)}</p>
              <p className="text-sm line-clamp-2">{item.description}</p>
            </div>
            <button type="button" onClick={() => open(item)} className="bg-[#252422] text-white px-5 py-3 rounded-lg">
              Review Request
            </button>
          </article>
        ))}
        <div className="flex justify-between gap-4 pt-2">
          <button type="button" className="border rounded-lg px-4 py-2 disabled:opacity-40" disabled={page === 0 || loading}
            onClick={() => setPage(n => n - 1)}>Previous</button>
          <button type="button" className="border rounded-lg px-4 py-2 disabled:opacity-40"
            disabled={(page + 1) * PAGE_SIZE >= total || loading} onClick={() => setPage(n => n + 1)}>Next</button>
        </div>
      </section>

      {selected && (
        <section className="glass-card p-6 space-y-5" aria-label="Selected enquiry" id="enquiry-details">
          <div className="flex justify-between gap-3 items-start">
            <h2 className="font-playfair text-2xl font-semibold">{selected.full_name}'s Request</h2>
            <button type="button" onClick={() => setSelected(null)} className="underline">Close</button>
          </div>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Email', selected.email],
              ['Phone', selected.phone || 'Not provided'],
              ['Business', selected.business || 'Not provided'],
              ['Request type', selected.enquiry_type],
              ['Service', selected.service_type],
              ['Budget', selected.budget_range.replaceAll('_', ' ')],
              ['Timeline', selected.timeline.replaceAll('_', ' ')],
              ['Preferred contact', selected.preferred_contact],
              ['Preferred date', selected.preferred_date || 'Not requested'],
              ['Preferred window (SAST)', selected.preferred_time || 'Not requested'],
              ['Email notification', selected.notification_status || 'Not configured'],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <dt className="font-semibold">{label}</dt>
                <dd className="break-words text-[#403D39] dark:text-[#B0B0B0]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-2">
            <h3 className="font-semibold">Client's description</h3>
            <p className="whitespace-pre-wrap break-words text-[#403D39] dark:text-[#B0B0B0]">{selected.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: Your project enquiry')}`}
              className="underline text-[#EB5E28]">Reply by email</a>
            {whatsappLink(selected.phone) && (
              <a href={whatsappLink(selected.phone)} target="_blank" rel="noopener noreferrer"
                className="underline text-[#EB5E28]">Contact via WhatsApp</a>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block space-y-2">
              <span>Enquiry status</span>
              <select className={inputClass} value={status} onChange={event => setStatus(event.target.value)}>
                {STATUS_LABELS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="block space-y-2 md:col-span-2">
              <span>Private admin notes (not sent to the client)</span>
              <textarea rows={5} maxLength={4000} className={inputClass} value={notes} onChange={event => setNotes(event.target.value)} />
            </label>
          </div>
          <button type="button" disabled={saving} onClick={save}
            className="bg-[#252422] text-white rounded-lg px-5 py-3 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Enquiry Changes'}
          </button>
        </section>
      )}
    </main>
  );
}
