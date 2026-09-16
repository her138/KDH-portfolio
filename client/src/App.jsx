import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectOverview from './pages/ProjectOverview/ProjectOverview';
import AllProjects from './pages/AllProjects/AllProjects';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Reviews />
      <Contact />
    </main>
  );
};

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    const scrollToSection = setTimeout(() => {
      const section = document.querySelector(location.hash);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 150);

    return () => clearTimeout(scrollToSection);
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FFFCF2] dark:bg-[#111111]">
        <ScrollToHash />

        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project-overview/:slug" element={<ProjectOverview />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;