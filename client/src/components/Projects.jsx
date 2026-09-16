// src/components/Projects.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiEye, FiX } from 'react-icons/fi';
import GlassButton from './GlassButton';

const projectsData = [
  {
    _id: '1',
    title: 'Drum Kit',
    software: ['JavaScript', 'CSS', 'HTML'],
    description:
      'An interactive drum kit web application that allows users to play different drum sounds using keyboard keys or mouse clicks.',
    image: '/projects/Drum_Kit/drum-kit-image.png',
    projectUrl: '/projects/Drum_Kit/Drum_Kit (2)/index.html',
    overviewUrl: '/project-overview/drum-kit',
    projectType: 'web_app',
    github: 'https://github.com',
    featured: true,
  },
  {
    _id: '2',
    title: 'Gunk Juice Logo',
    software: ['Adobe Illustrator', 'Photoshop'],
    description:
      'Modern logo design for an energy drink brand, focusing on bold typography and strong visual identity.',
    image: '/projects/Gunk/gunk-logo.png',
    projectUrl: '#',
    overviewUrl: '/project-overview/gunk-juice-logo',
    projectType: 'logo',
    github: null,
    featured: false,
  },
  {
    _id: '3',
    title: 'AR AutoWorks Website',
    software: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    description:
      'Complete website redesign for an auto repair shop featuring service information, online booking and a clean responsive layout.',
    image: '/images/ar-logo.png',
    projectUrl: '/projects/AR AutoWorks Cpt/index.html',
    overviewUrl: '/project-overview/ar-autoworks',
    projectType: 'website',
    github: 'https://github.com',
    featured: true,
  },
  {
    _id: '4',
    title: 'SaraJane – Hair Care Brand',
    software: ['Angular', 'TypeScript', 'CSS', 'HTML'],
    description:
      'A complete brand website for a luxury hair care and satin essentials company featuring product sections, brand content and responsive design.',
    image: '/projects/company-website/public/images/sj-logo.jpg',
    projectUrl: '/projects/company-website/index.html',
    overviewUrl: '/project-overview/sarajane',
    projectType: 'website',
    github: 'https://github.com',
    featured: true,
  },
  {
    _id: '5',
    title: 'Joe-Man Sweep Cleaning',
    software: ['Angular', 'TypeScript', 'CSS', 'HTML'],
    description:
      'A responsive service-business website for a Cape Town chimney cleaning and fireplace installation brand with booking-focused UX.',
    image: '/projects/joe-man-sweep/frontend/public/logo.png',
    projectUrl: '/projects/joe-man-sweeps/index.html',
    overviewUrl: '/project-overview/joe-man-sweep',
    projectType: 'website',
    github: 'https://github.com',
    featured: true,
  },
  {
    _id: '6',
    title: 'KillyDid',
    software: ['React', 'JavaScript', 'CSS', 'Figma'],
    description:
      'A full website redesign for a creative photography brand focused on cinematic visuals, clean navigation, responsive gallery layouts and a stronger booking experience.',
    image: '/projects/killydid/killydidshootit-preview.png',
    projectUrl: '/projects/KillyDid/DantePortFolio-main/build/404.html',
    overviewUrl: '/project-overview/killydid',
    projectType: 'ui_design',
    github: 'https://github.com',
    featured: true,
  },
  {
    _id: '7',
    title: 'Blackheath Police Rugby FC Logo',
    software: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    description:
      'A sports logo redesign for Blackheath Police Rugby FC, focused on creating a bold rugby club identity with strong badge styling, clean typography and a professional team look.',
    image:
      '/projects/blackheath-police-rugby-fc/blackheath-police-rugby-logo.png',
    projectUrl: '#',
    overviewUrl: '',
    projectType: 'logo',
    github: null,
    featured: true,
  },
];

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