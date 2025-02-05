// src/services/repository.js
import api from './api';

export const repositoryService = {
  getRepositories: async () => {
    try {
      const response = await api.get('/github/repositories'); // Changed from /repositories
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  analyzeRepository: async (owner, repo) => {
    try {
      const response = await api.post(`/repositories/${owner}/${repo}/analyze`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};