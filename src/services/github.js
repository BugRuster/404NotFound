// src/services/github.js
import api from './api';

export const githubService = {
  connectGithub: async () => {
    try {
      const response = await api.get('/github/auth-url');
      window.location.href = response.data.data.url;
    } catch (error) {
      console.error('Error connecting to GitHub:', error);
      throw error;
    }
  }
};