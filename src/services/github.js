// src/services/github.js
import api from './api';

export const githubService = {
  // Store GitHub token
  storeToken: (token) => {
    localStorage.setItem('github_token', token);
  },

  // Check if GitHub is connected
  isConnected: () => {
    return !!localStorage.getItem('github_token');
  },

  // Remove GitHub token
  disconnect: () => {
    localStorage.removeItem('github_token');
  },

  // Get GitHub auth URL
  getAuthUrl: async () => {
    try {
      const response = await api.get('/github/auth-url');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Initialize GitHub connection
  initiateConnection: async () => {
    try {
      const { data } = await api.get('/github/auth-url');
      window.location.href = data.url; // Redirect to GitHub auth
    } catch (error) {
      throw error;
    }
  },

  // Existing methods...
  getRepositories: async () => {
    try {
      const response = await api.get('/github/repositories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  handleCallback: async (code, state) => {
    try {
      const response = await api.get('/github/callback', { params: { code, state } });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getBranches: async (owner, repo) => {
    try {
      const response = await api.get(`/github/${owner}/${repo}/branches`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFiles: async (owner, repo, branch) => {
    try {
      const response = await api.get(`/github/${owner}/${repo}/files`, {
        params: { branch }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};