import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const emptyForm = {
  name: '',
  role: '',
  comment: '',
  rating: 5,
  sort_order: 0,
  permission_confirmed: false,
  is_published: false,
};

const inputClass = 'w-full border rounded-lg p-3 text-black bg-white';
const buttonClass = 'bg-[#252422] text-white rounded-lg px-5 py-3 disabled:opacity-50';

export default function AdminReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadReviews() {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from('client_reviews')
      .select('id,name,role,comment,rating,is_published,permission_confirmed,sort_order,created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (queryError) {
      setError(queryError.message);
    } else {
      setReviews(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadReviews();
  }, []);

  function updateField(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function clearForm() {
    setForm({ ...emptyForm });
    setEditingId(null);
  }

  function editReview(review) {
    setEditingId(review.id);
    setForm({
      name: review.name ?? '',
      role: review.role ?? '',
      comment: review.comment ?? '',
      rating: review.rating ?? 5,
      sort_order: review.sort_order ?? 0,
      permission_confirmed: Boolean(review.permission_confirmed),
      is_published: Boolean(review.is_published),
    });
    setError('');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function saveReview(event) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError('');
    setNotice('');

    try {
      const name = String(form.name ?? '').trim();
      const role = String(form.role ?? '').trim();
      const comment = String(form.comment ?? '').trim();
      const rating = Number(form.rating);
      const sortOrder = Number(form.sort_order);

      if (!name || name.length > 100) throw new Error('Client name must be 1–100 characters.');
      if (role.length > 160) throw new Error('Role must be at most 160 characters.');
      if (comment.length < 10 || comment.length > 1200) {
        throw new Error('Review must be between 10 and 1,200 characters.');
      }
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5 stars.');
      }
      if (!Number.isInteger(sortOrder)) throw new Error('Sort order must be a whole number.');
      if (form.is_published && !form.permission_confirmed) {
        throw new Error('Confirm that the testimonial is genuine and you have permission before publishing it.');
      }

      const payload = {
        name,
        role,
        comment,
        rating,
        sort_order: sortOrder,
        permission_confirmed: Boolean(form.permission_confirmed),
        is_published: Boolean(form.is_published),
      };

      const query = editingId
        ? supabase.from('client_reviews').update(payload).eq('id', editingId)
        : supabase.from('client_reviews').insert(payload);
      const { data, error: saveError } = await query.select('id');
      if (saveError) throw saveError;
      if (!data?.length) throw new Error('The review was not saved. Check your admin permissions.');

      clearForm();
      setNotice('Client review saved.');
      await loadReviews();
    } catch (err) {
      setError(err.message || 'Unable to save review.');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(review) {
    setError('');
    setNotice('');
    if (!review.is_published && !review.permission_confirmed) {
      editReview(review);
      setError('This imported review is still a draft. If it is genuine and you have the client\'s permission, tick the confirmation checkbox, select Publish and click Save Changes. Do not publish placeholder reviews.');
      return;
    }
    setBusyId(review.id);
    try {
      const { data, error: updateError } = await supabase
        .from('client_reviews')
        .update({ is_published: !review.is_published })
        .eq('id', review.id)
        .select('id');
      if (updateError) throw updateError;
      if (!data?.length) throw new Error('The review was not updated.');
      setNotice(review.is_published ? 'Review hidden.' : 'Review published.');
      await loadReviews();
    } catch (err) {
      setError(err.message || 'Unable to update review.');
    } finally {
      setBusyId(null);
    }
  }

  async function deleteReview(review) {
    if (!window.confirm(`Permanently delete the review by ${review.name}?`)) return;
    setBusyId(review.id);
    setError('');
    setNotice('');
    try {
      const { data, error: deleteError } = await supabase
        .from('client_reviews')
        .delete()
        .eq('id', review.id)
        .select('id');
      if (deleteError) throw deleteError;
      if (!data?.length) throw new Error('The review was not deleted.');
      if (editingId === review.id) clearForm();
      setNotice('Review deleted.');
      await loadReviews();
    } catch (err) {
      setError(err.message || 'Unable to delete review.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="container-custom py-12 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Client Reviews Manager</h1>
          <p className="mt-2 text-sm text-[#403D39] dark:text-[#B0B0B0]">
            These reviews appear in your existing testimonial carousel. Visitors cannot post reviews here.
          </p>
        </div>
        <button type="button" className="border rounded-lg px-5 py-3" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>
      </div>

      {error && <p role="alert" className="text-red-500">{error}</p>}
      {notice && <p role="status" className="text-green-600">{notice}</p>}

      <section className="glass-card p-6 space-y-5">
        <h2 className="text-2xl font-semibold">{editingId ? 'Edit Client Review' : 'Add Client Review'}</h2>
        <form onSubmit={saveReview} className="space-y-4">
          <label className="block">
            Client name
            <input required maxLength={100} className={inputClass} value={form.name}
              onChange={(event) => updateField('name', event.target.value)} />
          </label>

          <label className="block">
            Client role / business
            <input maxLength={160} className={inputClass} value={form.role}
              placeholder="Founder, Business Name"
              onChange={(event) => updateField('role', event.target.value)} />
          </label>

          <label className="block">
            Review text
            <textarea required minLength={10} maxLength={1200} rows={5}
              className={inputClass} value={form.comment}
              onChange={(event) => updateField('comment', event.target.value)} />
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              Star rating
              <select className={inputClass} value={form.rating}
                onChange={(event) => updateField('rating', Number(event.target.value))}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>{rating} stars</option>
                ))}
              </select>
            </label>
            <label className="block">
              Display order
              <input type="number" step="1" className={inputClass} value={form.sort_order}
                onChange={(event) => updateField('sort_order', event.target.value)} />
            </label>
          </div>

          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" checked={form.permission_confirmed}
              onChange={(event) => updateField('permission_confirmed', event.target.checked)} />
            <span>This is a genuine client testimonial, accurately attributed, and I have permission to publish it.</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.is_published}
              onChange={(event) => updateField('is_published', event.target.checked)} />
            Publish review on homepage
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className={buttonClass}>
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Review'}
            </button>
            <button type="button" className="border rounded-lg px-5 py-3" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Existing Reviews ({reviews.length})</h2>
        {loading && <p>Loading reviews...</p>}
        {!loading && !error && reviews.length === 0 && <p>No client reviews added yet.</p>}
        {reviews.map((review) => (
          <article key={review.id}
            className="glass-card p-5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-semibold">{review.name} · {review.rating}/5 stars</h3>
              <p className="text-sm text-gray-500">{review.role}</p>
              <p className="mt-2 text-sm">“{review.comment}”</p>
              <p className="text-xs mt-2 text-gray-500">
                {review.is_published ? 'Published' : 'Hidden'} · {review.permission_confirmed ? 'Verified/permission confirmed' : 'Not yet verified'}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button type="button" className="underline" onClick={() => editReview(review)}>Edit</button>
              <button type="button" className="underline disabled:opacity-50"
                disabled={busyId === review.id} onClick={() => togglePublished(review)}>
                {review.is_published ? 'Unpublish' : 'Publish'}
              </button>
              <button type="button" className="text-red-500 underline disabled:opacity-50"
                disabled={busyId === review.id} onClick={() => deleteReview(review)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
