import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Github, Loader, Sparkles, RefreshCw, 
  BookOpen, Code2, Braces 
} from 'lucide-react';
import { githubService } from '../../services/github';
import { documentService } from '../../services/documents';
import AiSettingsForm from '../../components/docs/AiSettingsForm';
import GitHubConnectPrompt from '../../components/github/GitHubConnectPrompt';
import { logger } from '../../utils/logger';

const GitHubDocumentation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [settings, setSettings] = useState({
    style: 'formal',
    programmingLanguage: 'javascript',  // Changed from language to programmingLanguage
    pageCount: 4,
    outputFormat: 'markdown',
    userPrompt: ''
});

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await githubService.getRepositories();
      if (response?.data?.data) {
        setRepositories(response.data.data);
      } else if (Array.isArray(response.data)) {
        setRepositories(response.data);
      }
      setIsGithubConnected(true);
    } catch (err) {
      setError('Failed to fetch repositories');
      setIsGithubConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success' || githubService.isConnected()) {
      fetchRepositories();
    }
  }, [searchParams]);

  const handleGenerateDocumentation = async () => {
    if (!selectedRepo) {
        setError('Please select a repository first');
        return;
    }

    try {
        setGenerating(true);
        setError(null);

        console.log('Current settings:', settings);
        
        // Create the payload making sure to keep programmingLanguage
        const payload = {
            style: settings.style,
            programmingLanguage: settings.programmingLanguage || 'javascript',
            pageCount: parseInt(settings.pageCount),
            outputFormat: settings.outputFormat || 'markdown',
            userPrompt: settings.userPrompt || '',
            repository: {
                owner: selectedRepo.owner.login,
                name: selectedRepo.name,
                branch: selectedRepo.default_branch || 'main'
            }
        };

        console.log('Sending payload:', payload);

        const response = await documentService.generateDocumentation(payload);
        
        if (response?.data) {
            navigate('/dashboard/documents/view', { 
                state: { documentation: response.data }
            });
        } else {
            navigate('/dashboard/documents/view', { 
                state: { documentation: response }
            });
        }
    } catch (err) {
        const errorMessage = err.response?.data?.message || 
            'Failed to generate documentation. Please try again.';
        setError(errorMessage);
        console.error('Generation error:', err);
    } finally {
        setGenerating(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            AI Documentation Generator
          </h1>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        ) : !isGithubConnected ? (
          <GitHubConnectPrompt />
        ) : repositories.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Repository Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Select Repository</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {repositories.map(repo => (
                  <button
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo)}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      selectedRepo?.id === repo.id
                        ? 'bg-indigo-600/20 border-indigo-500'
                        : 'bg-gray-800/50 border-gray-700/50 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5" />
                      <span className="font-medium">{repo.name}</span>
                    </div>
                    {repo.description && (
                      <p className="mt-2 text-sm text-gray-400">{repo.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              {selectedRepo ? (
                <>
                  {/* Repository Info */}
                  <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Selected Repository</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Name:</span> {selectedRepo.name}</p>
                      <p><span className="text-gray-400">Owner:</span> {selectedRepo.owner.login}</p>
                      <p><span className="text-gray-400">Default Branch:</span> {selectedRepo.default_branch}</p>
                    </div>
                  </div>

                  {/* AI Settings Form */}
                  <AiSettingsForm 
                    settings={settings}
                    onSettingsChange={setSettings}
                    onGenerate={handleGenerateDocumentation}
                    generating={generating}
                  />
                </>
              ) : (
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center text-gray-400">
                  <p>Select a repository to configure documentation settings.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No repositories found. Please make sure you have repositories in your GitHub account.</p>
            <button 
              onClick={fetchRepositories}
              className="mt-4 text-indigo-400 hover:text-indigo-300"
            >
              Refresh Repositories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubDocumentation;