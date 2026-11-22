import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  MEDIA_BUCKET,
  mediaPublicUrl,
  uploadPortfolioImage,
} from '../../lib/portfolioMedia';

export default function AdminMedia() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function refresh() {
    setLoading(true);
    const { data, error: listError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .list('projects', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (listError) setError(listError.message);
    else {
      setImages((data ?? []).filter((f) => f.name && f.id).map((f) => ({
        ...f, path: `projects/${f.name}`, url: mediaPublicUrl(`projects/${f.name}`),
      })));
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => { void refresh(); }, []);

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setNotice('');
    setError('');
    try {
      await uploadPortfolioImage(file);
      setNotice('Image uploaded. Copy its URL into a project image field.');
      await refresh();
    } catch (err) {
      setError(err.message || 'Could not upload image.');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  }

  async function copy(url) {
    try {
      await navigator.clipboard.writeText(url);
      setNotice('Image URL copied.');
    } catch {
      // Read-only field below allows manual copying if Clipboard API is unavailable.
      setNotice('Select the URL in the field below to copy it.');
    }
  }

  async function remove(image) {
    if (!window.confirm('Permanently delete this image? Existing project links may break.')) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      // Refuse removal if any project or skill still references this image.
      const [projects, skills, contents] = await Promise.all([
        supabase.from('projects').select('id').eq('image_url', image.url).limit(1),
        supabase.from('skills').select('id').eq('icon_url', image.url).limit(1),
        supabase.from('site_content').select('id').eq('image_url', image.url).limit(1),
      ]);
      for (const result of [projects, skills, contents]) {
        if (result.error) throw result.error;
        if (result.data?.length) {
          throw new Error('This image is in use. Remove it from the related content first.');
        }
      }
      const { error: deleteError } = await supabase.storage
        .from(MEDIA_BUCKET).remove([image.path]);
      if (deleteError) throw deleteError;
      setNotice('Image deleted.');
      await refresh();
    } catch (err) {
      setError(err.message || 'Cannot delete image.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-custom py-12 space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="font-playfair text-3xl font-bold">Project Images</h1>
        <button type="button" className="underline" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Public image library. Only your admin account can upload and delete files.
        Upload a PNG, JPEG, WebP or AVIF image up to 5 MB.
      </p>
      <label className="glass-card p-5 block space-y-2">
        <span className="font-semibold block">Upload image</span>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={busy} onChange={upload} className="block w-full" />
      </label>
      {error && <p role="alert" className="text-red-500">{error}</p>}
      {notice && <p role="status" className="text-green-600">{notice}</p>}
      {loading && <p>Loading images...</p>}
      {!loading && images.length === 0 && !error && <p>No uploaded images yet.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image) => (
          <article key={image.path} className="glass-card p-4 space-y-3">
            <img src={image.url} alt="Uploaded portfolio asset" loading="lazy"
              className="w-full h-44 object-contain rounded-lg bg-white/10" />
            <label className="block text-xs">
              Image URL
              <input readOnly value={image.url}
                onFocus={(e) => e.target.select()}
                className="w-full mt-1 border rounded-lg p-2 text-black bg-white" />
            </label>
            <div className="flex gap-4">
              <button type="button" onClick={() => copy(image.url)} className="underline">Copy URL</button>
              <button type="button" disabled={busy}
                onClick={() => remove(image)} className="underline text-red-500 disabled:opacity-50">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
      {images.length === 100 && <p className="text-xs text-gray-500">Showing the latest 100 images. Older files remain in Supabase Storage.</p>}
    </main>
  );
}
