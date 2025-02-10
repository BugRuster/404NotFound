// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import FormInput from '../components/common/FormInput';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="w-full max-w-md px-6 py-8">
        <div className="glass-panel p-8 rounded-2xl animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-indigo-500 dark:from-primary-dark dark:to-indigo-400">
              Welcome Back
            </h2>
            <p className="mt-2 text-secondary-light/70 dark:text-secondary-dark/70">
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 animate-slideIn">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fadeIn">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="input-glow"
                placeholder="Enter your email"
              />
            </div>

            <div className="animate-fadeIn">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="input-glow"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm animate-fadeIn">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary-light dark:text-primary-dark rounded border-gray-300 dark:border-gray-600"
                />
                <span className="ml-2 text-secondary-light dark:text-secondary-dark">Remember me</span>
              </label>
              <Link 
                to="/forgot-password"
                className="text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </Link>
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
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-secondary-light/70 dark:text-secondary-dark/70 animate-fadeIn">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;