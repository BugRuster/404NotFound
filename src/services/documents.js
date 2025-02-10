// src/services/documents.js
import api from './api';

export const documentService = {
  // Get all documents
  getAllDocuments: async () => {
    try {
      const response = await api.get('/documents');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new document
  createDocument: async (documentData) => {
    try {
      const response = await api.post('/documents', documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single document
  getDocument: async (id) => {
    try {
      const response = await api.get(`/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update document
  updateDocument: async (id, documentData) => {
    try {
      const response = await api.put(`/documents/${id}`, documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete document
  deleteDocument: async (id) => {
    try {
      const response = await api.delete(`/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  generateDocumentation: async (params) => {
    try {
      const response = await api.post('/documentation/generate', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};