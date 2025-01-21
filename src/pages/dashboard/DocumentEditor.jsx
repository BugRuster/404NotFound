// src/pages/dashboard/DocumentEditor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../../components/docs/Editor';
import GithubRepoInput from '../../components/docs/GithubRepoInput';
import AiSettingsForm from '../../components/docs/AiSettingsForm';
import { Button } from '../../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const DocumentEditor = () => {
  const [title, setTitle] = useState('Untitled Document');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const navigate = useNavigate();

  const [aiSettings, setAiSettings] = useState({
    pageCount: 5,
    style: 'technical',
    instructions: ''
  });

  const handleGenerateDoc = async (repoData) => {
    setIsGenerating(true);
    try {
      // TODO: Implement actual API call to your backend
      console.log('Generating documentation for:', { repoData, aiSettings });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate generated content
      const simulatedContent = `# ${repoData.repoUrl.split('/').pop()}
## Project Documentation

This is a placeholder for the AI-generated documentation.
You can replace this with actual API integration later.

### Repository Analysis
- URL: ${repoData.repoUrl}
- Style: ${aiSettings.style}
- Requested Pages: ${aiSettings.pageCount}

${aiSettings.instructions ? `### Additional Instructions\n${aiSettings.instructions}` : ''}`;

      setGeneratedContent(simulatedContent);
      setShowEditor(true);
    } catch (error) {
      console.error('Error generating documentation:', error);
      // TODO: Handle error state
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (content) => {
    // TODO: Implement save logic
    console.log('Saving document:', { title, content });
    navigate('/dashboard/documents');
  };

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowEditor(false)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Settings
          </Button>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none p-0"
            placeholder="Document Title"
          />
        </div>

        <Editor initialContent={generatedContent} onSave={handleSave} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Generate Documentation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GithubRepoInput
          onSubmit={handleGenerateDoc}
          isLoading={isGenerating}
        />
        
        <AiSettingsForm
          settings={aiSettings}
          onSettingsChange={setAiSettings}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;