// src/pages/dashboard/NewDocument.jsx
import { useNavigate } from 'react-router-dom';
import { Github, FileText, Plus } from 'lucide-react';

const NewDocument = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Documentation</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Manual Documentation */}
        <div 
          onClick={() => navigate('/dashboard/documents/new/manual')}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Manual Documentation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create documentation from scratch</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Write and format your documentation manually using our rich text editor.
          </p>
        </div>

        {/* GitHub Repository */}
        <div 
          onClick={() => navigate('/dashboard/documents/new/github')}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Github className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">From GitHub Repository</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Generate from your GitHub repository</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Automatically generate documentation from your GitHub repository using AI.
          </p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Quick Tips</h4>
        <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
          <li>• Manual documentation is great for detailed, custom documentation needs</li>
          <li>• GitHub repository integration works best for technical documentation</li>
          <li>• You can always edit and enhance AI-generated documentation later</li>
        </ul>
      </div>
    </div>
  );
};

export default NewDocument;