// src/hooks/useAuth.js
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      navigate('/dashboard');
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Add register function
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      navigate('/dashboard');
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('token');
    return !!token;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);

  return {
    login,
    register,  // Added register to the returned object
    logout,
    isAuthenticated,
    isLoading,
    error
  };
};

export default useAuth;