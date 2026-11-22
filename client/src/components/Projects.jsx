// src/components/Projects.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiEye, FiX } from 'react-icons/fi';
import GlassButton from './GlassButton';

const filterTypes = [
  { label: 'All', value: 'all' },
  { label: 'Web Apps', value: 'web_app' },
  { label: 'Websites', value: 'website' },
  { label: 'UI/UX', value: 'ui_design' },
  { label: 'Logo', value: 'logo' },
];

const Projects = () => {
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, slug, description, technologies, image_url, github_url, live_url, overview_url, project_type, featured, sort_order, created_at')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Homepage projects:', error);
        setLoadError(error.message);
        setProjectsData([]);
      } else {
        const updated = (data ?? []).map((project) => ({
          _id: project.id,
          title: project.title,
          description: project.description ?? '',
          software: Array.isArray(project.technologies)
            ? project.technologies : [],
          image: project.image_url ?? '',
          projectUrl: project.live_url ?? '',
          overviewUrl: project.overview_url ?? '',
          projectType: project.project_type === 'ui_ux'
            ? 'ui_design' : (project.project_type ?? 'website'),
          github: project.github_url ?? '',
          featured: Boolean(project.featured),
        }));

        setProjectsData(updated);
        setSelectedProject((current) =>
          current ? (updated.find((p) => p._id === current._id) ?? null) : null
        );
        setLoadError('');
      }
      setIsLoading(false);
    }

    const onFocus = () => { void loadProjects(); };
    const onVisible = () => {
      if (document.visibilityState === 'visible') void loadProjects();
    };

    void loadProjects();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      active = false;
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);


  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((project) => project.projectType === filter);

  const displayedProjects = filteredProjects.slice(0, 6);

  const openProject = (url) => {
    if (!url || url === '#') return;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openOverview = (url) => {
    if (!url) return;

    setSelectedProject(null);
    navigate(url);
    window.scrollTo(0, 0);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">
            PROJECTS
          </span>

          <h2 className="font-playfair text-4xl font-semibold text-center mb-12">
            Selected Work
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterTypes.map((type) => (
              <GlassButton
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={filter === type.value ? 'active-filter' : ''}
              >
                {type.label}
              </GlassButton>
            ))}
          </div>

          {isLoading && <p role="status" className="text-center mb-6">Loading projects...</p>}
          {loadError && <p role="alert" className="text-center mb-6 text-red-500">Could not load projects: {loadError}</p>}
          {!isLoading && !loadError && projectsData.length === 0 && (
            <p className="text-center mb-6">No published projects yet.</p>
          )}

          <div className="grid-system">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div
                  className="project-card group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />

                    <div className="absolute inset-0 bg-[#252422]/0 group-hover:bg-[#252422]/40 transition-all duration-300 flex items-center justify-center">
                      <FiEye className="text-[#FFFCF2] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 icon-lg" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-3 mt-6">
                    <h3 className="text-xl font-playfair font-semibold text-[#252422] dark:text-[#EDEDED]">
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>

                  <p className="text-[#403D39] dark:text-[#B0B0B0] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.software.slice(0, 2).map((tech) => (
                      <span key={tech} className="tech-tag text-xs">
                        {tech}
                      </span>
                    ))}

                    {project.software.length > 2 && (
                      <span className="tech-tag text-xs">
                        +{project.software.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="projects-view-more">
            <GlassButton
              onClick={() => navigate('/projects')}
              icon={FiArrowRight}
            >
              View More Projects
            </GlassButton>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252422]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-[#CCC5B9] dark:border-[#404040]">
                <h3 className="text-2xl font-playfair font-semibold text-[#252422] dark:text-[#EDEDED]">
                  {selectedProject.title}
                </h3>

                <GlassButton
                  onClick={() => setSelectedProject(null)}
                  className="p-2 icon-only"
                >
                  <FiX size={20} />
                </GlassButton>
              </div>

              <div
                className="p-6 overflow-y-auto"
                style={{ maxHeight: 'calc(90vh - 100px)' }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full img-rounded"
                  />

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-[#403D39] dark:text-[#B0B0B0] mb-2">
                        Description
                      </h4>

                      <p className="text-[#252422] dark:text-[#EDEDED]">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-[#403D39] dark:text-[#B0B0B0] mb-2">
                        Technologies
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {selectedProject.software.map((tech) => (
                          <span key={tech} className="tech-tag text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      {selectedProject.projectUrl &&
                        selectedProject.projectUrl !== '#' && (
                          <GlassButton
                            onClick={() =>
                              openProject(selectedProject.projectUrl)
                            }
                            className="flex-1"
                          >
                            View Project
                          </GlassButton>
                        )}

                      {selectedProject.overviewUrl && (
                        <GlassButton
                          onClick={() =>
                            openOverview(selectedProject.overviewUrl)
                          }
                          className="flex-1"
                        >
                          Project Overview
                        </GlassButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;