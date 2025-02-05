// src/components/docs/GithubRepoInput.jsx - Modified version
import React, { useState } from 'react';
import { repositoryService } from '../../services/repository';
import { githubService } from '../../services/github';
import { Button } from '../common/Button';
import FormInput from '../common/FormInput';
import { Github } from 'lucide-react';
import Loading from '../common/Loading';

const GithubRepoInput = ({ onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseRepoUrl = (url) => {
    try {
      const urlParts = url.split('/');
      return {
        owner: urlParts[urlParts.length - 2],
        repo: urlParts[urlParts.length - 1]
      };
    } catch (error) {
      throw new Error('Invalid repository URL');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { owner, repo } = parseRepoUrl(repoUrl);
      
      // Get repository details
      const details = await repositoryService.getRepositoryDetails(owner, repo);
      
      // Start analysis
      const analysis = await repositoryService.analyzeRepository(owner, repo);
      
      onSubmit({ details, analysis });
    } catch (error) {
      setError(error.message || 'Error analyzing repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          error={error}
        />

        <Button
          type="submit"
          disabled={isLoading || !repoUrl}
          className="w-full"
        >
          <Github className="w-5 h-5 mr-2" />
          {isLoading ? 'Analyzing Repository...' : 'Generate Documentation'}
        </Button>
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default GithubRepoInput;