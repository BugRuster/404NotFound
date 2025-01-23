import api from './api';
import { logger } from '../utils/logger';

export const authService = {
  register: async (userData) => {
    try {
      logger.info('Registering user:', userData.email);
      const response = await api.post('/auth/register', userData);
      logger.info('Registration successful');
      return response;
    } catch (error) {
      logger.error('Registration failed:', error.response?.data?.message);
      throw error;
    }
  }
};