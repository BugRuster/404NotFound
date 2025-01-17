// src/pages/Documentation.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Documentation = () => {
  const sections = [
    {
      title: 'Getting Started',
      items: ['Introduction', 'Quick Start Guide', 'Installation', 'Basic Concepts']
    },
    {
      title: 'Core Features',
      items: ['Document Creation', 'Collaboration', 'Version Control', 'AI Integration']
    },
    {
      title: 'Advanced Topics',
      items: ['API Reference', 'Authentication', 'Webhooks', 'Custom Integration']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-6">
              <div className="space-y-6">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          {/* Main content */}
          <main className="lg:col-span-9">
            <div className="prose prose-indigo max-w-none">
              <h1>Documentation</h1>
              <p className="lead">
                Welcome to the DocsPlatform documentation. Here you'll find everything you need to get started
                with our platform and make the most of its features.
              </p>

              <h2>Getting Started</h2>
              <p>
                DocsPlatform is a modern documentation solution that helps teams create, manage, and share
                documentation effectively. With features like real-time collaboration, version control,
                and AI-powered assistance, you can focus on creating great content while we handle the rest.
              </p>

              <h3>Quick Start</h3>
              <ol>
                <li>Create an account or sign in</li>
                <li>Create your first document</li>
                <li>Invite team members</li>
                <li>Start collaborating</li>
              </ol>

              <h2>Features</h2>
              <ul>
                <li>Real-time collaboration with team members</li>
                <li>Version control and document history</li>
                <li>AI-powered writing assistance</li>
                <li>Advanced search capabilities</li>
                <li>Custom templates and themes</li>
                <li>API access for integration</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;