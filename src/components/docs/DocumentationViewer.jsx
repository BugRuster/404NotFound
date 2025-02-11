import React, { useState } from 'react';
import { Edit, Download, ArrowLeft } from 'lucide-react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const DocumentationViewer = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const location = useLocation();
  const documentation = location.state?.documentation;

  if (!documentation) {
    return <Navigate to="/dashboard/documents" replace />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom components for markdown rendering
  const components = {
    h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
    p: ({children}) => <p className="my-3 leading-relaxed">{children}</p>,
    ul: ({children}) => <ul className="my-3 ml-6 space-y-2">{children}</ul>,
    li: ({children}) => <li className="list-disc ml-4">{children}</li>,
    code: ({inline, children}) => (
      inline ? 
        <code className="bg-gray-800 px-1 rounded">{children}</code> :
        <pre className="bg-gray-800/50 p-4 rounded-lg my-4 overflow-x-auto">
          <code>{children}</code>
        </pre>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  };

  // Format the content based on tab
  const getFormattedContent = () => {
    if (!documentation.content) return 'No content available';

    if (activeTab === 'preview') {
      return (
        <div className="prose prose-invert prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl max-w-none">
          <ReactMarkdown components={components}>
            {documentation.content.replace(/\*\*/g, '__')}
          </ReactMarkdown>
        </div>
      );
    } else {
      return (
        <pre className="text-sm font-mono whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg">
          {documentation.content}
        </pre>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/documents" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">
              {documentation.title || documentation.repository?.name || 'Documentation'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 mb-1">Generated On</div>
            <div className="font-medium">
              {formatDate(documentation.createdAt || new Date())}
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 mb-1">Style</div>
            <div className="font-medium capitalize">
              {documentation.style || 'Standard'}
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 mb-1">Repository</div>
            <div className="font-medium">
              {documentation.repository?.owner}/{documentation.repository?.name}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('source')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'source' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Source
            </button>
          </div>
          <div className="p-6">
            {getFormattedContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationViewer;