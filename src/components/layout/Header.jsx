// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-indigo-600">
          DocsPlatform
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Button as={Link} to="/signup" variant="primary">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;