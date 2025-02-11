// src/services/auth.js
import api from './api';
import { logger } from '../utils/logger';

export const authService = {
  login: async (credentials) => {
    try {
      logger.info('Logging in user:', credentials.email);
      const response = await api.post('/api/v1/auth/login', credentials);
      
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      logger.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Add register function
  register: async (userData) => {
    try {
      logger.info('Registering new user:', userData.email);
      const response = await api.post('/api/v1/auth/register', userData);
      
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      logger.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};