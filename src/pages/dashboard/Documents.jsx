// src/pages/dashboard/Documents.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { FileText, Edit2, Trash2 } from 'lucide-react';

const Documents = () => {
  const navigate = useNavigate();

  const documents = [
    { id: 1, title: 'Getting Started Guide', updatedAt: '2 hours ago' },
    { id: 2, title: 'API Documentation', updatedAt: '1 day ago' },
    { id: 3, title: 'User Manual', updatedAt: '3 days ago' },
  ];

  const handleNewDocument = () => {
    navigate('/dashboard/documents/new');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <Button onClick={handleNewDocument}>New Document</Button>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li key={doc.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1 px-4">
                  <h3 className="text-sm font-medium text-indigo-600 truncate">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Last updated {doc.updatedAt}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/dashboard/documents/${doc.id}`)}
                  >
                    <Edit2 size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documents;