import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// Existing homepage components (layout, colours and styling unchanged).
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SiteMeta from './components/SiteMeta';
import ProtectedAdmin from './pages/Admin/ProtectedAdmin';

// Split page-specific code: public homepage doesn't download admin tools.
const AllProjects = lazy(() => import('./pages/AllProjects/AllProjects'));
const ProjectOverview = lazy(() => import('./pages/ProjectOverview/ProjectOverview'));
const RequestProject = lazy(() => import('./pages/RequestProject/RequestProject'));
const Services = lazy(() => import('./pages/RequestProject/Services'));
const Privacy = lazy(() => import('./pages/Legal/Privacy'));
const Terms = lazy(() => import('./pages/Legal/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminMessages = lazy(() => import('./pages/Admin/AdminMessages'));
const AdminSkills = lazy(() => import('./pages/Admin/AdminSkills'));
const AdminAbout = lazy(() => import('./pages/Admin/AdminAbout'));
const AdminExperience = lazy(() => import('./pages/Admin/AdminExperience'));
const AdminReviews = lazy(() => import('./pages/Admin/AdminReviews'));
const AdminMedia = lazy(() => import('./pages/Admin/AdminMedia'));
const AdminEnquiries = lazy(() => import('./pages/Admin/AdminEnquiries'));

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Reviews />
    <Contact />
  </main>
);

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const timeout = window.setTimeout(() => {
      // A malformed percent-encoded hash should never crash the entire app.
      try {
        const id = decodeURIComponent(hash.slice(1));
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth', block: 'start',
        });
      } catch {
        // Ignore invalid hash fragments.
      }
    }, 150);
    return () => window.clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');
  return (
    <div className="min-h-screen bg-[#FFFCF2] dark:bg-[#111111]">
      <ScrollToHash />
      <SiteMeta />
      {!isAdminPage && <Header />}
      <Suspense fallback={<main className="container-custom section-padding" role="status">Loading page...</main>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project-overview/:slug" element={<ProjectOverview />} />
          <Route path="/services" element={<Services />} />
          <Route path="/request-project" element={<RequestProject />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="/admin/messages" element={<ProtectedAdmin><AdminMessages /></ProtectedAdmin>} />
          <Route path="/admin/skills" element={<ProtectedAdmin><AdminSkills /></ProtectedAdmin>} />
          <Route path="/admin/about" element={<ProtectedAdmin><AdminAbout /></ProtectedAdmin>} />
          <Route path="/admin/experience" element={<ProtectedAdmin><AdminExperience /></ProtectedAdmin>} />
          <Route path="/admin/reviews" element={<ProtectedAdmin><AdminReviews /></ProtectedAdmin>} />
          <Route path="/admin/media" element={<ProtectedAdmin><AdminMedia /></ProtectedAdmin>} />
          <Route path="/admin/enquiries" element={<ProtectedAdmin><AdminEnquiries /></ProtectedAdmin>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
