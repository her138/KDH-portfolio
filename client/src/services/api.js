import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const getProjects = () => api.get('/projects');
export const seedProjects = () => api.post('/projects/seed');

// Reviews API
export const getReviews = () => api.get('/reviews');
export const seedReviews = () => api.post('/reviews/seed');

// Contact API
export const sendContactMessage = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');

export default api;