// src/services/auth.js
import api from './api';
import { logger } from '../utils/logger';

export const authService = {
  login: async (credentials) => {
    try {
      logger.info('Logging in user:', credentials.email);
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      logger.error('Login failed:', error.response?.data?.message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      logger.info('Registering user:', userData.email);
      const response = await api.post('/auth/register', userData);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      logger.error('Registration failed:', error.response?.data?.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('github_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};