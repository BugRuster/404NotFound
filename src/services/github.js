// src/services/github.js
import api from './api';

export const githubService = {
  getAuthUrl: async () => {
    try {
      const response = await api.get('/api/v1/github/auth-url');
      return response;
    } catch (error) {
      console.error('GitHub auth URL error:', error);
      throw error;
    }
  },

  isConnected: () => {
    return localStorage.getItem('githubConnected') === 'true';
  },

  getRepositories: async () => {
    try {
      const response = await api.get('/api/v1/github/repositories');
      console.log('GitHub repos response:', response);
      
      if (response.data) {
        localStorage.setItem('githubConnected', 'true');
      }
      
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('githubConnected');
      }
      throw error;
    }
  },

  handleCallback: async (code, state) => {
    try {
      const response = await api.post('/api/v1/github/callback', {
        code,
        state
      });
      
      if (response.data?.status === 'success') {
        localStorage.setItem('githubConnected', 'true');
      }
      
      return response;
    } catch (error) {
      localStorage.removeItem('githubConnected');
      throw error;
    }
  },

  disconnect: () => {
    localStorage.removeItem('githubConnected');
    localStorage.removeItem('github_token');
  }
};

export default githubService;