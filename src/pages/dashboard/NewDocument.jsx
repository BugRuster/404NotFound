import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Github, FileText, ArrowRight, Terminal, 
  Code, Zap, Sparkles 
} from 'lucide-react';

const DocumentTypeCard = ({ type, onMouseEnter, onMouseLeave, isHovered }) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => type.onClick()}
      className="relative group bg-[#0A0A0A] border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      {/* Terminal-like Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-white/40" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 ${
            isHovered ? 'border-green-500/50 rotate-6 scale-110' : ''
          }`}>
            <type.icon className={`w-6 h-6 transition-all duration-300 ${
              isHovered ? 'text-green-400' : 'text-white/70'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white/90 font-mono">
              {type.title}
              {isHovered && <span className="animate-pulse">_</span>}
            </h3>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 font-mono text-sm">
          <div className="text-green-400/80">// Description</div>
          <div className="text-white/60 mt-2">{type.description}</div>
        </div>

        <div className="mt-4 flex justify-end">
          <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
            isHovered ? 'text-green-400 translate-x-1' : 'text-white/40'
          }`} />
        </div>

        {/* Matrix Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-green-500 font-mono text-xs"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `matrixRain ${1 + Math.random() * 2}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {String.fromCharCode(33 + Math.random() * 93)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

const NewDocument = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const documentTypes = [
    {
      title: 'MANUAL_DOCUMENTATION',
      description: 'Create and write documentation manually with our advanced editor',
      icon: Terminal,
      onClick: () => navigate('/dashboard/documents/new/manual')
    },
    {
      title: 'GITHUB_REPOSITORY',
      description: 'Generate AI-powered documentation from your GitHub repository',
      icon: Github,
      onClick: () => navigate('/dashboard/documents/new/github')
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-white/70" />
          <h1 className="text-3xl font-bold font-mono">
            CREATE_DOCUMENTATION<span className="animate-pulse">_</span>
          </h1>
        </div>

        {/* Document Type Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {documentTypes.map((type, index) => (
            <DocumentTypeCard
              key={type.title}
              type={type}
              isHovered={hoveredCard === index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Quick Tips */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-white/70" />
            <h4 className="text-sm font-medium font-mono">QUICK_TIPS</h4>
          </div>
          <ul className="space-y-2 text-sm text-white/60 font-mono">
            <li className="flex items-center gap-2">
              <span className="text-green-400"></span> Manual documentation for custom, detailed content
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400"></span> GitHub integration with AI-powered documentation generation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400"></span> Edit and customize all documentation post-generation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewDocument;