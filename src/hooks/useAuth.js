// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email === 'test@example.com' && password === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    error
  };
};

export default useAuth;