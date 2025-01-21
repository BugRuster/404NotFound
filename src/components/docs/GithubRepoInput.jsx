// src/components/docs/GithubRepoInput.jsx
import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import { Button } from '../common/Button';
import { Github, Upload } from 'lucide-react';

const GithubRepoInput = ({ onSubmit, isLoading }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ repoUrl, additionalFiles });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="GitHub Repository URL"
          name="repoUrl"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Additional Context (Optional)
          </label>
          <div className="flex items-center gap-2">
            <Button
              as="label"
              variant="secondary"
              className="cursor-pointer"
              size="sm"
            >
              <Upload size={16} className="mr-2" />
              Upload Files
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.md"
              />
            </Button>
          </div>

          {additionalFiles.length > 0 && (
            <div className="mt-2 space-y-2">
              {additionalFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !repoUrl}
        >
          <Github size={16} className="mr-2" />
          {isLoading ? 'Analyzing Repository...' : 'Generate Documentation'}
        </Button>
      </form>
    </div>
  );
};

export default GithubRepoInput;