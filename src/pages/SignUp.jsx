import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import { Button } from '../components/common/Button';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { logger } from '../utils/logger';

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
    logger.info('Validating form data');
    const errors = {
      name: !formData.name ? 'Name is required' : '',
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword 
        ? 'Passwords do not match' 
        : ''
    };

    setFormErrors(errors);
    const isValid = !Object.values(errors).some(error => error);
    logger.info('Form validation result:', isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logger.info('Form submitted');

    if (validateForm()) {
      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } catch (error) {
        logger.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {authError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-md p-4 text-sm">
                {authError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                required
              />

              <FormInput
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                required
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                required
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;