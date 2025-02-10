// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity">
          DocsPlatform
        </Link>
        
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary-dark" />
            ) : (
              <Moon className="w-5 h-5 text-primary-light" />
            )}
          </button>
          
          <Link 
            to="/login" 
            className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            Login
          </Link>
          
          <Button 
            as={Link} 
            to="/signup" 
            variant="primary"
            className="futuristic-border"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;