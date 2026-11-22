import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HOME_TITLE = 'MasterCraft by Kyle | Web Development & Design';
const HOME_DESCRIPTION = 'Portfolio of web development and design projects. Explore my work, request a website or application, and get in touch.';

const ROUTE_META = {
  '/': { title: HOME_TITLE, description: HOME_DESCRIPTION },
  '/projects': { title: 'Projects | MasterCraft by Kyle', description: 'Browse web development, design and portfolio projects.' },
  '/services': { title: 'Services | MasterCraft by Kyle', description: 'Explore website development, web applications, redesigns and design services.' },
  '/request-project': { title: 'Request a Project | MasterCraft by Kyle', description: 'Request a project quotation or consultation and describe what you need built.' },
  '/privacy': { title: 'Privacy Notice | MasterCraft by Kyle', description: 'Read how personal details submitted through the portfolio are handled.' },
  '/terms': { title: 'Service & Booking Terms | MasterCraft by Kyle', description: 'Read the terms for requesting project quotes and consultations.' },
};

function setMeta(key, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SiteMeta() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    const admin = path.startsWith('/admin');
    const project = path.startsWith('/project-overview/');
    const details = project
      ? { title: 'Project Case Study | MasterCraft by Kyle', description: 'Explore a portfolio project and its implementation.' }
      : ROUTE_META[path];
    const info = details || { title: 'Page Not Found | MasterCraft by Kyle', description: HOME_DESCRIPTION };
    const noIndex = admin || !details;
    const base = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const canonical = new URL(path, `${base}/`).href;

    document.title = info.title;
    setMeta('description', info.description);
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow');
    setMeta('og:title', info.title, 'property');
    setMeta('og:description', info.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('twitter:card', 'summary_large_image');
    const ogImage = import.meta.env.VITE_OG_IMAGE;
    if (ogImage) setMeta('og:image', ogImage, 'property');
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [location.pathname]);

  return null;
}
