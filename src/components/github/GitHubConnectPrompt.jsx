// src/components/github/GitHubConnectPrompt.jsx
import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { githubService } from '../../services/github';

const GitHubConnectPrompt = () => {
  const handleConnect = async () => {
    try {
      await githubService.initiateConnection();
    } catch (error) {
      console.error('Failed to connect to GitHub:', error);
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8 bg-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-gray-800/50 rounded-full">
            <Github className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Connect Your GitHub Account
        </h2>
        
        <p className="text-gray-300 mb-8">
          To generate documentation from your repositories, you'll need to connect your GitHub account first.
        </p>
        
        <button
          onClick={handleConnect}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <Github className="w-5 h-5" />
          Connect GitHub
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GitHubConnectPrompt;