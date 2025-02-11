import React, { useState } from 'react';
import { Github, ArrowRight, Loader } from 'lucide-react';
import { githubService } from '../../services/github';

const GitHubConnectPrompt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store current path for redirect after auth
      localStorage.setItem('githubRedirectPath', window.location.pathname);
      
      const response = await githubService.getAuthUrl();
      console.log('GitHub Auth Response:', response);

      if (response?.data?.data?.url) {
        window.location.href = response.data.data.url;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('GitHub connection error:', error);
      setError(error.message || 'Failed to connect to GitHub. Please try again.');
    } finally {
      setIsLoading(false);
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

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Github className="w-5 h-5" />
              Connect GitHub
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GitHubConnectPrompt;