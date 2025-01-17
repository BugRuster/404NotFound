// src/components/home/FeaturesSection.jsx
import React from 'react';

const features = [
  {
    title: 'AI-Powered Documentation',
    description: 'Leverage artificial intelligence to generate, improve, and maintain your documentation automatically.',
    icon: '🤖'
  },
  {
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time with advanced collaboration features.',
    icon: '👥'
  },
  {
    title: 'Version Control',
    description: 'Track changes, manage versions, and roll back when needed with built-in version control.',
    icon: '🔄'
  },
  {
    title: 'Smart Search',
    description: 'Find exactly what you need with our powerful search functionality.',
    icon: '🔍'
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage documentation
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;