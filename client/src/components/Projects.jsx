// Updated src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiEye, FiX } from 'react-icons/fi';
import GlassButton from './GlassButton';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setProjects([
        {
          _id: '1',
          title: 'Drum Kit',
          software: ['JavaScript', 'CSS', 'HTML'],
          description: 'An interactive drum kit web application that allows users to play different drum sounds using keyboard keys or mouse clicks.',
          image: '/projects/Drum_Kit/drum-kit-image.png',
          projectUrl: '/projects/Drum_Kit/Drum_Kit (2)/index.html',
          projectType: 'web_app',
          github: 'https://github.com',
          featured: true
        },
        {
          _id: '2',
          title: 'Gunk Juice Logo',
          software: ['Adobe Illustrator', 'Photoshop'],
          description: 'Modern logo design for an energy drink brand, focusing on bold typography.',
          image: '/projects/Gunk/gunk-logo.png',
          projectUrl: '#',
          projectType: 'logo',
          github: null,
          featured: false
        },
        {
          _id: '3',
          title: 'AR AutoWorks Website',
          software: ['React', 'Tailwind CSS', 'Figma'],
          description: 'Complete website redesign for an auto repair shop featuring online booking and service catalog.',
          image: '/images/ar-logo.png',
          projectUrl: '/projects/AR AutoWorks Cpt/index.html',
          projectType: 'website',
          github: 'https://github.com',
          featured: true
        },
        {
  _id: '4',
  title: 'SaraJane – Hair Care Brand',
  software: ['Angular', 'TypeScript', 'CSS', 'HTML'],
  description: 'A complete brand website for a luxury hair care and satin essentials company. Features product catalog, shopping cart, blog, and contact form.',
  image: '/projects/company-website/public/images/sj-logo.jpg',
  projectUrl: '/projects/company-website/index.html',
  projectType: 'website',
  github: 'https://github.com',
  featured: true
}
      ]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTypes = [
    { label: 'All', value: 'all' },
    { label: 'Web Apps', value: 'web_app' },
    { label: 'Websites', value: 'website' },
    { label: 'UI/UX', value: 'ui_design' },
    { label: 'Logo', value: 'logo' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.projectType === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-title block text-center mb-4">PROJECTS</span>
          <h2 className="font-playfair text-4xl font-semibold text-center mb-12">Selected Work</h2>

          {/* Filter - Updated with GlassButton */}
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

          {/* Projects Grid - 12 column system */}
          <div className="grid-system">
            {filteredProjects.map((project, index) => (
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

                  <div className="flex items-start justify-between mb-3 mt-6">
                    <h3 className="text-xl font-playfair font-semibold text-[#252422] dark:text-[#EDEDED]">{project.title}</h3>
                    {project.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>

                  <p className="text-[#403D39] dark:text-[#B0B0B0] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.software.slice(0, 2).map((tech, idx) => (
                      <span key={idx} className="tech-tag text-xs">
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
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252422]/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-[#CCC5B9] dark:border-[#404040]">
                <h3 className="text-2xl font-playfair font-semibold text-[#252422] dark:text-[#EDEDED]">{selectedProject.title}</h3>
                <GlassButton
                  onClick={() => setSelectedProject(null)}
                  className="p-2 icon-only"
                >
                  <FiX size={20} />
                </GlassButton>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full img-rounded"
                  />

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-[#403D39] dark:text-[#B0B0B0] mb-2">Description</h4>
                      <p className="text-[#252422] dark:text-[#EDEDED]">{selectedProject.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-[#403D39] dark:text-[#B0B0B0] mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.software.map((tech, idx) => (
                          <span key={idx} className="tech-tag text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      {selectedProject.projectUrl && selectedProject.projectUrl !== '#' && (
                        <GlassButton
                          href={selectedProject.projectUrl}
                          icon={FiExternalLink}
                          className="flex-1"
                        >
                          View Project
                        </GlassButton>
                      )}

                      {selectedProject.github && (
                        <GlassButton
                          href={selectedProject.github}
                          icon={FiGithub}
                          className="icon-only"
                        />
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