// src/components/home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Modern Documentation</span>
          <span className="block text-indigo-600">for Modern Teams</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Create, manage, and share documentation with ease. Powered by AI, built for collaboration.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Button as={Link} to="/signup" size="lg">
              Get Started
            </Button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Button as={Link} to="/docs" variant="secondary" size="lg">
              View Docs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;