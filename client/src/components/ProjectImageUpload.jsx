import React, { useState } from 'react';
import { uploadPortfolioImage } from '../lib/portfolioMedia';

// Optional inline widget for the existing AdminDashboard project form.
export default function ProjectImageUpload({ onUploaded }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function onSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const { url } = await uploadPortfolioImage(file);
      onUploaded(url);
      setNotice('Uploaded! Save the project to attach this image.');
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Or upload a project image (max 5 MB)
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={onSelect} disabled={busy}
          className="block w-full mt-2 text-sm" />
      </label>
      {busy && <p role="status">Uploading image...</p>}
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      {notice && <p role="status" className="text-sm text-green-600">{notice}</p>}
    </div>
  );
}
