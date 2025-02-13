import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Code2, Braces, ArrowRight, 
  FileText, Users, Zap, Search 
} from 'lucide-react';

const Documentation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className={`min-h-screen bg-black transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl tracking-wider">
              DOCS<span className="animate-pulse">//</span>PLATFORM
            </div>
            <div className="flex space-x-6">
              {['Documentation', 'API', 'Support'].map((item) => (
                <button
                  key={item}
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-6 space-y-6">
              {sections.map((section, idx) => (
                <div 
                  key={section.title}
                  className={`transform transition-all duration-700 delay-${idx * 200} ${
                    isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                >
                  <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider font-mono">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-white/70 hover:text-white text-sm group flex items-center transition-all duration-300"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {item}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <main className="lg:col-span-9">
            <div className={`prose prose-invert max-w-none transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h1 className="text-4xl font-bold text-white mb-6 font-mono">
                Documentation
                <span className="animate-pulse">_</span>
              </h1>
              
              <p className="text-white/70 text-lg leading-relaxed hover:text-white transition-colors duration-300">
                Welcome to the DocsPlatform documentation. Here you'll find everything you need to get started
                with our platform and make the most of its features.
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: 'Getting Started',
                    description: 'Learn the basics and get up to speed quickly'
                  },
                  {
                    icon: Code2,
                    title: 'API Reference',
                    description: 'Detailed API documentation for developers'
                  },
                  {
                    icon: Users,
                    title: 'Collaboration',
                    description: 'Work together with your team effectively'
                  },
                  {
                    icon: Zap,
                    title: 'AI Features',
                    description: 'Leverage AI to enhance your documentation'
                  }
                ].map((feature, idx) => (
                  <div
                    key={feature.title}
                    className={`group border border-white/10 p-6 hover:bg-white/5 transition-all duration-500 transform ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + idx * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <feature.icon className="h-6 w-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-white/70 group-hover:text-white transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;