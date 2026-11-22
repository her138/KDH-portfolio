import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectImageUpload from '../../components/ProjectImageUpload';

const EMPTY_FORM = {
  title: '',
  slug: '',
  description: '',
  technologies: '',
  image_url: '',
  live_url: '',
  github_url: '',
  overview_url: '',
  project_type: 'website',
  featured: false,
  is_published: false,
  sort_order: 0,
};

const inputClass = 'w-full border rounded-lg p-3 text-black bg-white';
const buttonClass = 'bg-[#252422] text-white rounded-lg px-5 py-3';

function validLink(value) {
  if (!value) return true;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) {
    return true;
  }
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function loadProjects() {
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (dbError) {
      setError(dbError.message);
    } else {
      setProjects(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function editProject(project) {
    setEditingId(project.id);
    setForm({
      title: project.title ?? '',
      slug: project.slug ?? '',
      description: project.description ?? '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : '',
      image_url: project.image_url ?? '',
      live_url: project.live_url ?? '',
      github_url: project.github_url ?? '',
      overview_url: project.overview_url ?? '',
      project_type: project.project_type ?? 'website',
      featured: Boolean(project.featured),
      is_published: Boolean(project.is_published),
      sort_order: project.sort_order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }

  async function saveProject(event) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const slug = String(form.slug ?? '').trim().toLowerCase();
      const title = String(form.title ?? '').trim();
      const description = String(form.description ?? '').trim();

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error('Enter a valid slug using lowercase letters, numbers and hyphens.');
      }
      if (!title || !description) {
        throw new Error('Project title and description are required.');
      }

      for (const field of ['image_url', 'live_url', 'github_url', 'overview_url']) {
        if (!validLink(String(form[field] ?? '').trim())) {
          throw new Error(`${field} must be a local path or an HTTPS URL.`);
        }
      }

      const payload = {
        title,
        slug,
        description,
        technologies: String(form.technologies ?? '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        image_url: String(form.image_url ?? '').trim() || null,
        live_url: String(form.live_url ?? '').trim() || null,
        github_url: String(form.github_url ?? '').trim() || null,
        overview_url: String(form.overview_url ?? '').trim() || null,
        project_type: form.project_type || 'website',
        featured: Boolean(form.featured),
        is_published: Boolean(form.is_published),
        sort_order: Number(form.sort_order) || 0,
      };

      const result = editingId
        ? await supabase.from('projects').update(payload).eq('id', editingId).select('id')
        : await supabase.from('projects').insert(payload).select('id');

      if (result.error) throw result.error;
      if (!result.data?.length) {
        throw new Error('No project was saved. Check your admin permissions.');
      }

      resetForm();
      setMessage('Project saved successfully.');
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(project) {
    setBusyId(project.id);
    setError('');
    setMessage('');
    try {
      const { data, error: dbError } = await supabase
        .from('projects')
        .update({ is_published: !project.is_published })
        .eq('id', project.id)
        .select('id');

      if (dbError) throw dbError;
      if (!data?.length) throw new Error('No project was updated.');
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Unable to change publication status.');
    } finally {
      setBusyId(null);
    }
  }

  async function deleteProject(project) {
    if (!window.confirm(`Permanently delete "${project.title}"?`)) return;

    setBusyId(project.id);
    setError('');
    setMessage('');
    try {
      const { data, error: dbError } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)
        .select('id');

      if (dbError) throw dbError;
      if (!data?.length) throw new Error('No project was deleted.');

      if (editingId === project.id) resetForm();
      setMessage('Project deleted.');
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Unable to delete project.');
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    setError('');
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      setError(logoutError.message);
      return;
    }
    navigate('/admin/login', { replace: true });
  }

  return (
    <main className="container-custom py-12 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold">Portfolio Dashboard</h1>
        <button type="button" onClick={logout} className="underline">Logout</button>
      </div>

      <nav aria-label="Admin dashboard" className="flex flex-wrap gap-3">
        <button type="button" onClick={() => navigate('/admin/messages')} className={buttonClass}>
          View Contact Messages
        </button>
        <button type="button" onClick={() => navigate('/admin/skills')} className={buttonClass}>
          Manage Skills
        </button>
        <button type="button" onClick={() => navigate('/admin/about')} className={buttonClass}>
          Edit About Me
        </button>
        <button type="button" onClick={() => navigate('/admin/experience')} className={buttonClass}>
          Manage Experience
        </button>
        <button type="button" onClick={() => navigate('/admin/reviews')} className={buttonClass}>
          Manage Client Reviews
        </button>
        <button type="button" onClick={() => navigate('/admin/enquiries')} className={buttonClass}>
          Project Enquiries
        </button>
        <button type="button" onClick={() => navigate('/admin/media')} className={buttonClass}>
          Image Library
        </button>
      </nav>

      {error && <p role="alert" className="text-red-500">{error}</p>}
      {message && <p role="status" className="text-green-600">{message}</p>}

      <section className="glass-card p-6 space-y-5">
        <h2 className="text-2xl font-semibold">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>

        <form onSubmit={saveProject} className="space-y-4">
          <label className="block">
            Project Title
            <input required className={inputClass} value={form.title}
              onChange={(event) => updateField('title', event.target.value)} />
          </label>

          <label className="block">
            Project Slug
            <input required disabled={Boolean(editingId)} className={inputClass}
              value={form.slug} placeholder="my-new-project"
              onChange={(event) => updateField('slug', event.target.value)} />
          </label>

          <label className="block">
            Description
            <textarea required rows={4} className={inputClass} value={form.description}
              onChange={(event) => updateField('description', event.target.value)} />
          </label>

          <label className="block">
            Technologies (comma-separated)
            <input className={inputClass} value={form.technologies}
              placeholder="React, JavaScript, CSS"
              onChange={(event) => updateField('technologies', event.target.value)} />
          </label>

          <label className="block">
            Project Image Path / URL
            <input className={inputClass} value={form.image_url}
              placeholder="/projects/example.png"
              onChange={(event) => updateField('image_url', event.target.value)} />
          </label>

          <div>
            <p className="mb-2 font-medium">Or upload a project image</p>
            <ProjectImageUpload onUploaded={(url) => updateField('image_url', url)} />
            {form.image_url && (
              <p className="mt-2 text-sm break-all text-gray-500">
                Selected image: {form.image_url}
              </p>
            )}
          </div>

          <label className="block">
            Live Project Link
            <input className={inputClass} value={form.live_url}
              onChange={(event) => updateField('live_url', event.target.value)} />
          </label>

          <label className="block">
            GitHub Link
            <input className={inputClass} value={form.github_url}
              onChange={(event) => updateField('github_url', event.target.value)} />
          </label>

          <label className="block">
            Overview Page Path
            <input className={inputClass} value={form.overview_url}
              onChange={(event) => updateField('overview_url', event.target.value)} />
          </label>

          <label className="block">
            Project Category
            <select className={inputClass} value={form.project_type}
              onChange={(event) => updateField('project_type', event.target.value)}>
              <option value="website">Website</option>
              <option value="web_app">Web App</option>
              <option value="ui_design">UI/UX Design</option>
              <option value="logo">Logo Design</option>
            </select>
          </label>

          <label className="block">
            Display Order
            <input type="number" className={inputClass} value={form.sort_order}
              onChange={(event) => updateField('sort_order', event.target.value)} />
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured}
              onChange={(event) => updateField('featured', event.target.checked)} />
            Featured Project
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_published}
              onChange={(event) => updateField('is_published', event.target.checked)} />
            Publish Project
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving}
              className="bg-[#252422] text-white px-6 py-3 rounded-lg disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Project'}
            </button>
            <button type="button" onClick={resetForm} className="border rounded-lg px-6 py-3">
              Cancel
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Manage Projects ({projects.length})</h2>
        {loading && <p>Loading projects...</p>}
        {!loading && projects.length === 0 && !error && <p>No projects found.</p>}

        {projects.map((project) => (
          <div key={project.id}
            className="glass-card p-5 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">
                {project.is_published ? 'Published' : 'Unpublished'}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button type="button" onClick={() => editProject(project)} className="underline">
                Edit
              </button>
              <button type="button" disabled={busyId === project.id}
                onClick={() => togglePublished(project)}
                className="underline disabled:opacity-50">
                {project.is_published ? 'Unpublish' : 'Publish'}
              </button>
              <button type="button" disabled={busyId === project.id}
                onClick={() => deleteProject(project)}
                className="text-red-500 underline disabled:opacity-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
