// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import { Button } from '../components/common/Button';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { register, isLoading, error: authError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name ? 'Name is required' : '',
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword 
        ? 'Passwords do not match' 
        : ''
    };

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="w-full max-w-md px-6 py-8">
        <div className="glass-panel p-8 rounded-2xl animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-indigo-500 dark:from-primary-dark dark:to-indigo-400">
              Create Account
            </h2>
            <p className="mt-2 text-secondary-light/70 dark:text-secondary-dark/70">
              Join our platform today
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 animate-slideIn">
              <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fadeIn">
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="animate-fadeIn">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="animate-fadeIn">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="animate-fadeIn">
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                required
                placeholder="Confirm your password"
              />
            </div>

            <div className="animate-fadeIn">
              <Button
                type="submit"
                className="w-full button-glow bg-gradient-to-r from-primary-light to-indigo-500 dark:from-primary-dark dark:to-indigo-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-secondary-light/70 dark:text-secondary-dark/70 animate-fadeIn">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;