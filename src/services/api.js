// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5001',
  //  // Your backend URL
  baseURL: 'https://404-not-found-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token sdsd
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;