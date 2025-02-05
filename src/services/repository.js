// src/services/repository.js
import api from './api';

export const repositoryService = {
  analyzeRepository: async (owner, repo) => {
    try {
      const response = await api.post(`/repositories/${owner}/${repo}/analyze`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRepositories: async () => {
    try {
      const response = await api.get('/repositories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDetails: async (owner, repo) => {
    try {
      const response = await api.get(`/repositories/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};