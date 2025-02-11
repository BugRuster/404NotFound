// src/services/documents.js
import api from './api';

export const documentService = {
  generateDocumentation: async (params) => {
    try {
      // Keep the exact same payload structure
      const payload = {
        style: params.style || 'formal',
        programmingLanguage: params.programmingLanguage || 'javascript',
        pageCount: parseInt(params.pageCount) || 4,
        outputFormat: params.outputFormat || 'markdown',
        userPrompt: params.userPrompt || '',
        repository: {
          owner: params.repository.owner,
          name: params.repository.name,
          branch: params.repository.branch || 'main'
        }
      };

      console.log('Sending payload to backend:', payload);

      const response = await api.post('/api/v1/documentation/generate', payload);

      if (!response.data) {
        throw new Error('Invalid response from server');
      }

      return response.data;
    } catch (error) {
      console.error('Documentation generation error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Get all documents
  getAllDocuments: async () => {
    try {
      const response = await api.get('/api/v1/documents');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single document
  getDocument: async (id) => {
    try {
      const response = await api.get(`/api/v1/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update document
  updateDocument: async (id, documentData) => {
    try {
      const response = await api.put(`/api/v1/documents/${id}`, documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete document
  deleteDocument: async (id) => {
    try {
      const response = await api.delete(`/api/v1/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default documentService;