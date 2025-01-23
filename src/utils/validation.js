// src/utils/validation.js
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 2) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };