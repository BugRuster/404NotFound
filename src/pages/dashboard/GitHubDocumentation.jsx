import { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { 
  Github, Loader, Sparkles, RefreshCw, 
  BookOpen, Code2, Braces 
} from 'lucide-react';
import { githubService } from '../../services/github';
import { documentService } from '../../services/documents';
import AiSettingsForm from '../../components/docs/AiSettingsForm';
import DocumentationViewer from '../../components/docs/DocumentationViewer';
import GitHubConnectPrompt from '../../components/github/GitHubConnectPrompt';
import { logger } from '../../utils/logger';

const GitHubDocumentation = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [isGithubConnected, setIsGithubConnected] = useState(false);

  useEffect(() => {
    checkGithubConnection();
  }, []);

  const checkGithubConnection = () => {
    const connected = githubService.isConnected();
    setIsGithubConnected(connected);
    if (connected) {
      fetchRepositories();
    }
  };

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await githubService.getRepositories();
      setRepositories(response.data);
    } catch (err) {
      setError('Failed to fetch repositories. Please try again.');
      logger.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDocumentation = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        repository: {
          owner: selectedRepo.owner.login,
          name: selectedRepo.name,
          branch: 'main'
        },
        ...settings
      };

      const response = await documentService.generateDocumentation(params);
      setGeneratedDoc(response.data);
    } catch (err) {
      setError('Failed to generate documentation. Please try again.');
      logger.error('Error generating documentation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDoc = async (updatedDoc) => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentService.updateDocument(updatedDoc._id, updatedDoc);
      setGeneratedDoc(response.data);
    } catch (err) {
      setError('Failed to update documentation. Please try again.');
      logger.error('Error updating documentation:', err);
    } finally {
      setLoading(false);
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

        {!isGithubConnected ? (
          <GitHubConnectPrompt />
        ) : (
          // Your existing repository selection and documentation generation UI
          !generatedDoc ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* ... Your existing repository selection code ... */}
            </div>
          ) : (
            <DocumentationViewer 
              documentation={generatedDoc}
              onUpdate={handleUpdateDoc}
            />
          )
        )}
      </div>
    </div>
  );
};

export default GitHubDocumentation;