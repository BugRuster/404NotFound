import axios from 'axios';

const api = axios.create({
  baseURL: 'https://404-not-found-backend.vercel.app/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;