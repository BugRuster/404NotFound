// src/pages/dashboard/NewDocument.jsx
import { useNavigate } from 'react-router-dom';
import { Github, FileText, ArrowRight } from 'lucide-react';

const NewDocument = () => {
  const navigate = useNavigate();

  const documentTypes = [
    {
      title: 'Manual Documentation',
      description: 'Create and write documentation manually',
      icon: FileText,
      path: '/dashboard/documents/new/manual',
      color: 'indigo'
    },
    {
      title: 'GitHub Repository',
      description: 'Generate documentation from your GitHub repository',
      icon: Github,
      path: '/dashboard/documents/new/github',
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Documentation</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {documentTypes.map((type) => (
          <button
            key={type.title}
            onClick={() => navigate(type.path)}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${type.color}-50 dark:bg-${type.color}-900/20`}>
                <type.icon className={`w-6 h-6 text-${type.color}-600 dark:text-${type.color}-400`} />
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {type.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Quick Tips</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Manual documentation is best for custom, detailed content</li>
          <li>• GitHub integration works great for technical documentation</li>
          <li>• You can always edit and customize generated documentation</li>
        </ul>
      </div>
    </div>
  );
};

export default NewDocument;