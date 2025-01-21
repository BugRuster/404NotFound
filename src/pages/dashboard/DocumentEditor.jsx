// src/pages/dashboard/DocumentEditor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../../components/docs/Editor';

const DocumentEditor = () => {
  const [title, setTitle] = useState('Untitled Document');
  const navigate = useNavigate();

  const handleSave = (content) => {
    // TODO: Implement save logic
    console.log('Saving document:', { title, content });
    navigate('/dashboard/documents');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none p-0"
          placeholder="Document Title"
        />
      </div>

      <Editor onSave={handleSave} />
    </div>
  );
};

export default DocumentEditor;