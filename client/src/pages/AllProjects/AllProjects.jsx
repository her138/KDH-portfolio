// src/pages/AllProjects/AllProjects.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import GlassButton from '../../components/GlassButton';
import { supabase } from '../../lib/supabase';
import './AllProjects.css';

const projectCategories = [
  {
    title: 'Web Apps',
    value: 'web_app',
    intro:
      'Interactive browser-based projects built around functionality, user interaction and frontend behaviour.',
  },
  {
    title: 'Websites',
    value: 'website',
    intro:
      'Responsive websites created for brands, businesses and service-based experiences.',
  },
  {
    title: 'UI/UX',
    value: 'ui_design',
    intro:
      'Design-focused projects that show layout planning, redesign thinking, user flow and visual direction.',
  },
  {
    title: 'Logo',
    value: 'logo',
    intro:
      'Brand identity and logo design projects created for digital use, presentation and visual consistency.',
  },
];

const categoryLabels = {
  web_app: 'Web App',
  website: 'Website',
  ui_design: 'UI/UX',
  logo: 'Logo Design',
};

// Support any older records that were saved with the UI/UX category name.
const normalizeCategory = (type) =>
  type === 'ui_ux' ? 'ui_design' : type;

const AllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select(
          'id, slug, title, description, technologies, image_url, live_url, overview_url, project_type, sort_order, created_at'
        )
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!mounted) return;

      if (fetchError) {
        console.error('Unable to load projects:', fetchError);
        setError('Projects could not be loaded. Please refresh the page.');
        setAllProjects([]);
      } else {
        setError('');
        setAllProjects(
          (data ?? []).map((item) => {
            const category = normalizeCategory(item.project_type);
            return {
              _id: item.id,
              slug: item.slug,
              title: item.title,
              category,
              categoryLabel: categoryLabels[category] ?? 'Project',
              software: Array.isArray(item.technologies)
                ? item.technologies
                : [],
              description: item.description ?? '',
              image: item.image_url ?? '',
              projectUrl: item.live_url ?? '',
              overviewUrl: item.overview_url ?? '',
            };
          })
        );
      }
      setLoading(false);
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="all-projects-page">
      <section className="all-projects-hero">
        <div className="container-custom">
          <Link to="/#projects" className="all-projects-back">
            <FiArrowLeft />
            Back to selected work
          </Link>

          <span className="section-title block text-center mb-4">
            PROJECT ARCHIVE
          </span>
          <h1>All Projects</h1>
          <p>
            A full collection of web apps, websites, UI/UX redesigns and logo
            projects, organised by project type.
          </p>
        </div>
      </section>

      <section className="all-projects-categories">
        <div className="container-custom">
          {loading && <p role="status">Loading projects...</p>}
          {!loading && error && <p role="alert">{error}</p>}
          {!loading && !error && allProjects.length === 0 && (
            <p>No published projects are available yet.</p>
          )}
          {!loading && !error && projectCategories.map((category) => {
            const projects = allProjects.filter(
              (project) => project.category === category.value
            );

            return (
              <ProjectCategoryCarousel
                key={category.value}
                title={category.title}
                intro={category.intro}
                projects={projects}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

const ProjectCategoryCarousel = ({ title, intro, projects }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep index valid if the list changes after another fetch.
  const safeIndex = Math.min(activeIndex, Math.max(projects.length - 1, 0));
  const activeProject = projects[safeIndex];

  if (!activeProject) return null;

  const goToPrevious = () => {
    setActiveIndex((previous) =>
      previous <= 0 ? projects.length - 1 : previous - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((previous) =>
      previous >= projects.length - 1 ? 0 : previous + 1
    );
  };

  const openProject = (url) => {
    if (!url || url === '#') return;
    if (!url.startsWith('/') && !url.startsWith('https://')) return;
    if (url.startsWith('//')) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openOverview = (project) => {
    if (!project.overviewUrl || project.overviewUrl === '#') return;
    // Navigate using the database slug, never a stale hardcoded URL.
    navigate(`/project-overview/${encodeURIComponent(project.slug)}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="project-category-section">
      <div className="project-category-heading">
        <div>
          <p className="project-category-kicker">Category</p>
          <h2>{title}</h2>
        </div>
        <p>{intro}</p>
      </div>

      <div className="project-carousel-card">
        <button
          type="button"
          className="carousel-arrow carousel-arrow-left"
          onClick={goToPrevious}
          aria-label={`Previous ${title} project`}
        >
          <FiChevronLeft />
        </button>

        <div className="project-carousel-layout">
          <div className="project-carousel-image">
            {activeProject.image ? (
              <img
                src={activeProject.image}
                alt={activeProject.title}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div role="img" aria-label="Project image not available">
                Preview coming soon
              </div>
            )}
          </div>

          <div className="project-carousel-content">
            <p className="project-type-label">
              {activeProject.categoryLabel}
            </p>
            <h3>{activeProject.title}</h3>
            <p className="project-carousel-description">
              {activeProject.description}
            </p>

            <div className="project-carousel-tags">
              {activeProject.software.map((tool, index) => (
                <span key={`${tool}-${index}`} className="tech-tag">
                  {tool}
                </span>
              ))}
            </div>

            <div className="project-carousel-actions">
              {activeProject.projectUrl &&
                activeProject.projectUrl !== '#' && (
                  <GlassButton
                    onClick={() => openProject(activeProject.projectUrl)}
                  >
                    View Project
                  </GlassButton>
                )}

              {activeProject.overviewUrl &&
                activeProject.overviewUrl !== '#' && (
                  <GlassButton
                    onClick={() => openOverview(activeProject)}
                  >
                    Project Overview
                  </GlassButton>
                )}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-right"
          onClick={goToNext}
          aria-label={`Next ${title} project`}
        >
          <FiChevronRight />
        </button>
      </div>

      {projects.length > 1 && (
        <div className="project-carousel-dots">
          {projects.map((project, index) => (
            <button
              key={project._id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={index === safeIndex ? 'active' : ''}
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProjects;
