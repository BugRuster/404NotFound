// src/pages/dashboard/GitHubDocumentation.jsx
import { useState } from 'react';
import { Button } from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { Github, GitBranch, Folder, File, ChevronRight } from 'lucide-react';

const GitHubDocumentation = () => {
  const [step, setStep] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    purpose: '',
    functionality: ''
  });

  // Mock data (will be replaced with API calls)
  const mockRepos = [
    { id: 1, name: 'my-project', description: 'A sample project' },
    { id: 2, name: 'another-repo', description: 'Another repository' }
  ];

  const mockBranches = [
    { name: 'main' },
    { name: 'develop' },
    { name: 'feature/auth' }
  ];

  const mockFiles = [
    { path: 'src/components/Button.jsx', type: 'file' },
    { path: 'src/components/Form.jsx', type: 'file' },
    { path: 'src/utils', type: 'directory', children: [
      { path: 'src/utils/api.js', type: 'file' },
      { path: 'src/utils/helpers.js', type: 'file' }
    ]}
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Repository</h2>
            <div className="grid gap-4">
              {mockRepos.map(repo => (
                <div
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={`
                    p-4 border rounded-lg cursor-pointer
                    ${selectedRepo?.id === repo.id ? 'border-indigo-500' : 'border-gray-200'}
                  `}
                >
                  <div className="flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">{repo.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{repo.description}</p>
                </div>
              ))}
            </div>
            <Button
              disabled={!selectedRepo}
              onClick={() => setStep(2)}
              className="mt-4"
            >
              Next
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Branch</h2>
            <div className="grid gap-4">
              {mockBranches.map(branch => (
                <div
                  key={branch.name}
                  onClick={() => setSelectedBranch(branch)}
                  className={`
                    p-4 border rounded-lg cursor-pointer
                    ${selectedBranch?.name === branch.name ? 'border-indigo-500' : 'border-gray-200'}
                  `}
                >
                  <div className="flex items-center">
                    <GitBranch className="w-5 h-5 mr-2" />
                    <span>{branch.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                disabled={!selectedBranch}
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Files</h2>
            <div className="border rounded-lg divide-y">
              {mockFiles.map((file, index) => (
                <div
                  key={file.path}
                  className="p-4 flex items-center"
                >
                  {file.type === 'file' ? (
                    <File className="w-5 h-5 mr-2" />
                  ) : (
                    <Folder className="w-5 h-5 mr-2" />
                  )}
                  <span>{file.path}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>
                Next
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Project Information</h2>
            <div className="space-y-4">
              <FormInput
                label="Project Title"
                value={projectInfo.title}
                onChange={(e) => setProjectInfo({...projectInfo, title: e.target.value})}
              />
              <FormInput
                label="Description"
                type="textarea"
                value={projectInfo.description}
                onChange={(e) => setProjectInfo({...projectInfo, description: e.target.value})}
              />
              <FormInput
                label="Project Purpose"
                type="textarea"
                value={projectInfo.purpose}
                onChange={(e) => setProjectInfo({...projectInfo, purpose: e.target.value})}
              />
              <FormInput
                label="Core Functionality"
                type="textarea"
                value={projectInfo.functionality}
                onChange={(e) => setProjectInfo({...projectInfo, functionality: e.target.value})}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button onClick={() => handleGenerateDocumentation()}>
                Generate Documentation
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleGenerateDocumentation = () => {
    // This will be implemented later with the backend
    console.log('Generating documentation with:', {
      repository: selectedRepo,
      branch: selectedBranch,
      selectedFiles,
      projectInfo
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Generate Documentation from GitHub
          </h1>
        </div>
        <div className="mt-4">
          <nav className="flex items-center space-x-2">
            {['Repository', 'Branch', 'Files', 'Information'].map((item, index) => (
              <div key={item} className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full
                    ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-indigo-600' : 'bg-gray-200'}
                    text-white text-sm font-medium
                  `}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">{item}</span>
                {index < 3 && <ChevronRight className="w-5 h-5 mx-2 text-gray-400" />}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

export default GitHubDocumentation;