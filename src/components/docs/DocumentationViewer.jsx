// src/components/docs/DocumentationViewer.jsx
import React, { useState } from 'react';
import { 
  Copy, Check, Download, Book, Code, FileText, 
  Edit2, Save, X, Share2, Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DocumentationViewer = ({ documentation, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copiedSection, setCopiedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(documentation.content);
  const [editedTitle, setEditedTitle] = useState(documentation.title);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSave = async () => {
    await onUpdate({
      ...documentation,
      title: editedTitle,
      content: editedContent
    });
    setIsEditing(false);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([editedContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editedTitle || 'documentation'}.md`;
    a.click();
  };

  const renderCodeBlock = ({ children, language }) => (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleCopy(children, language)}
          className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 backdrop-blur-sm"
        >
          {copiedSection === language ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        className="rounded-lg !bg-gray-900/90 backdrop-blur-sm"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-gray-700/50 p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-xl font-semibold bg-transparent border-b border-indigo-500 text-white focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              {editedTitle}
            </h2>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-md hover:bg-gray-600/50 transition-colors"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            )}
            <button
              onClick={downloadMarkdown}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-md hover:bg-gray-600/50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700/50">
        <nav className="flex gap-4 px-6">
          {['preview', 'source'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {tab === 'preview' ? (
                  <Book className="w-4 h-4" />
                ) : (
                  <Code className="w-4 h-4" />
                )}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'preview' ? (
          <div className="prose prose-invert prose-indigo max-w-none">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-[600px] bg-gray-800/50 text-white p-4 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 font-mono"
              />
            ) : (
              <ReactMarkdown components={{ code: renderCodeBlock }}>
                {editedContent}
              </ReactMarkdown>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => handleCopy(editedContent, 'full')}
              className="absolute right-2 top-2 p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              {copiedSection === 'full' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <SyntaxHighlighter
              language="markdown"
              style={atomDark}
              className="rounded-lg !bg-gray-900/90 backdrop-blur-sm"
            >
              {editedContent}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationViewer;