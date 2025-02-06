// src/pages/dashboard/NewDocument.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { FileText, Github, File } from 'lucide-react';

const NewDocument = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const options = [
    {
      id: 'custom',
      title: 'Custom Document',
      description: 'Create a document from scratch',
      icon: FileText,
    },
    {
      id: 'github',
      title: 'GitHub Repository',
      description: 'Generate documentation from your GitHub repository',
      icon: Github,
    }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === 'github') {
      navigate('/dashboard/documents/new/github');
    } else {
      navigate('/dashboard/documents/new/custom');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Document</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`
              p-6 border-2 rounded-lg text-left hover:border-indigo-500 
              transition-colors duration-200
              ${selectedOption === option.id ? 'border-indigo-500' : 'border-gray-200'}
            `}
          >
            <option.icon className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-gray-500">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewDocument;