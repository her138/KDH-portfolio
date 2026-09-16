// src/pages/AllProjects/AllProjects.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiEye,
} from 'react-icons/fi';
import GlassButton from '../../components/GlassButton';
import './AllProjects.css';

const allProjects = [
  {
    _id: '1',
    title: 'Drum Kit',
    category: 'web_app',
    categoryLabel: 'Web App',
    software: ['JavaScript', 'CSS', 'HTML'],
    description:
      'An interactive drum kit web application that allows users to play different drum sounds using keyboard keys or mouse clicks.',
    image: '/projects/Drum_Kit/drum-kit-image.png',
    projectUrl: '/projects/Drum_Kit/Drum_Kit (2)/index.html',
    overviewUrl: '/project-overview/drum-kit',
  },
  {
    _id: '2',
    title: 'AR AutoWorks Website',
    category: 'website',
    categoryLabel: 'Website',
    software: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    description:
      'A complete website redesign for an auto repair business featuring service information, booking-focused sections and a clean responsive layout.',
    image: '/images/ar-logo.png',
    projectUrl: '/projects/AR AutoWorks Cpt/index.html',
    overviewUrl: '/project-overview/ar-autoworks',
  },
  {
    _id: '3',
    title: 'SaraJane – Hair Care Brand',
    category: 'website',
    categoryLabel: 'Website',
    software: ['Angular', 'TypeScript', 'CSS', 'HTML'],
    description:
      'A complete beauty and hair care brand website featuring product categories, elegant brand styling and responsive product-focused sections.',
    image: '/projects/company-website/public/images/sj-logo.jpg',
    projectUrl: '/projects/company-website/index.html',
    overviewUrl: '/project-overview/sarajane',
  },
  {
    _id: '4',
    title: 'Joe-Man Sweep Cleaning',
    category: 'website',
    categoryLabel: 'Website',
    software: ['Angular', 'TypeScript', 'CSS', 'HTML'],
    description:
      'A responsive service-business website for a Cape Town chimney cleaning and fireplace installation brand with a booking-focused user journey.',
    image: '/projects/joe-man-sweep/frontend/public/logo.png',
    projectUrl: '/projects/joe-man-sweeps/index.html',
    overviewUrl: '/project-overview/joe-man-sweep',
  },
  {
    _id: '5',
    title: 'KillyDid',
    category: 'ui_ux',
    categoryLabel: 'UI/UX',
    software: ['React', 'JavaScript', 'CSS', 'Figma'],
    description:
      'A website redesign for a creative photography brand focused on cinematic visuals, clean navigation, responsive gallery layouts and a stronger booking experience.',
    image: '/projects/killydid/killydidshootit-preview.png',
    projectUrl: '/projects/KillyDid/DantePortFolio-main/src/index.html',
    overviewUrl: '/project-overview/killydid',
  },
  {
    _id: '6',
    title: 'Gunk Juice Logo',
    category: 'logo',
    categoryLabel: 'Logo Design',
    software: ['Adobe Illustrator', 'Photoshop'],
    description:
      'A bold logo design project for an energy drink concept, focused on strong typography, brand personality and digital-ready logo presentation.',
    image: '/projects/Gunk/gunk-logo.png',
    projectUrl: '#',
    overviewUrl: '/project-overview/gunk-juice-logo',
  },
  {
    _id: '7',
    title: 'Blackheath Rugby FC Club Logo',
    category: 'logo',
    categoryLabel: 'Logo Design',
    software: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    description:
      'A sports logo design project for Blackheath Rugby FC, focused on creating a strong club identity, bold badge styling and a professional rugby brand look.',
    image: '/projects/blackheath-rugby-fc/blackheath-logo.png',
    projectUrl: '#',
    overviewUrl: '',
  },
];

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
    value: 'ui_ux',
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

const AllProjects = () => {
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
          {projectCategories.map((category) => {
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

  if (!projects || projects.length === 0) {
    return null;
  }

  const activeProject = projects[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const openProject = (url) => {
    if (!url || url === '#') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openOverview = (url) => {
    if (!url || url === '#') return;
    navigate(url);
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
            <img src={activeProject.image} alt={activeProject.title} />
          </div>

          <div className="project-carousel-content">
            <p className="project-type-label">{activeProject.categoryLabel}</p>

            <h3>{activeProject.title}</h3>

            <p className="project-carousel-description">
              {activeProject.description}
            </p>

            <div className="project-carousel-tags">
              {activeProject.software.map((tool) => (
                <span key={tool} className="tech-tag">
                  {tool}
                </span>
              ))}
            </div>

            <div className="project-carousel-actions">
              {activeProject.projectUrl && activeProject.projectUrl !== '#' && (
                <GlassButton
                  onClick={() => openProject(activeProject.projectUrl)}
                >
                  View Project
                </GlassButton>
              )}

              {activeProject.overviewUrl && activeProject.overviewUrl !== '#' && (
                <GlassButton
                  onClick={() => openOverview(activeProject.overviewUrl)}
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
              className={index === activeIndex ? 'active' : ''}
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProjects;