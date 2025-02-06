// src/services/github.js
import api from './api';

export const githubService = {
  // Get GitHub auth URL
  getAuthUrl: async () => {
    try {
      const response = await api.get('/github/auth-url');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's repositories
  getRepositories: async () => {
    try {
      const response = await api.get('/github/repositories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get repository branches
  getBranches: async (owner, repo) => {
    try {
      const response = await api.get(`/github/${owner}/${repo}/branches`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get repository files
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