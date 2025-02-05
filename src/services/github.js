// src/services/github.js
import api from './api';

export const githubService = {
  connectGithub: () => {
    // Get GitHub OAuth URL from backend
    api.get('/github/auth-url')
      .then(response => {
        window.location.href = response.data.data.url;
      })
      .catch(error => {
        console.error('Error getting GitHub auth URL:', error);
      });
  },

  getRepositories: async () => {
    try {
      const response = await api.get('/github/repositories');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  storeToken: (token) => localStorage.setItem('github_token', token),
  getToken: () => localStorage.getItem('github_token'),
  removeToken: () => localStorage.removeItem('github_token')
};