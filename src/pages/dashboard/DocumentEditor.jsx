import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import ReactDOM from 'react-dom';
import { documentService } from '../../services/documents';
import Loading from '../../components/common/Loading';
import {
  Save,
  ArrowLeft,
  Terminal,
  Settings,
  Eye,
  Globe,
  Lock,
  Clock,
  Code,
  Copy,
  Check,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Copy Button Component
const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg transition-all duration-300 ${copied
          ? 'bg-green-500/20 text-green-400'
          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        } ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

// Custom Preview Component
const CustomPreview = ({ source }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      // Add copy buttons to code blocks
      const codeBlocks = previewRef.current.querySelectorAll('pre');
      codeBlocks.forEach(block => {
        if (!block.querySelector('.copy-button-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'copy-button-wrapper';
          const code = block.textContent;

          // Create copy button container
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'absolute top-2 right-2';

          // Render copy button using React
          ReactDOM.render(
            <CopyButton text={code} />,
            buttonContainer
          );

          block.style.position = 'relative';
          block.appendChild(buttonContainer);
        }
      });

      // Add copy buttons to regular text paragraphs
      const paragraphs = previewRef.current.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (!p.querySelector('.copy-button-wrapper') && p.textContent.trim()) {
          const wrapper = document.createElement('div');
          wrapper.className = 'copy-button-wrapper relative group';
          p.parentNode.insertBefore(wrapper, p);
          wrapper.appendChild(p);

          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'absolute top-1/2 -translate-y-1/2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200';

          ReactDOM.render(
            <CopyButton text={p.textContent} className="scale-90" />,
            buttonContainer
          );

          wrapper.appendChild(buttonContainer);
        }
      });
    }
  }, [source]);

  return (
    <div ref={previewRef} className="markdown-preview">
      <MDEditor.Markdown
        source={source}
        rehypePlugins={[[rehypeSanitize]]}
        className="prose prose-invert max-w-none px-4"
      />
    </div>
  );
};

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [document, setDocument] = useState({
    title: '',
    description: '',
    content: '',
    status: 'draft'
  });

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      const response = await documentService.getDocument(id);
      setDocument(response.data);
    } catch (err) {
      setError('Failed to fetch document');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (id) {
        await documentService.updateDocument(id, document);
      } else {
        await documentService.createDocument(document);
      }
      navigate('/dashboard/documents');
    } catch (err) {
      setError('Failed to save document');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard/documents')}
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-mono">BACK</span>
              </button>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <input
                  type="text"
                  value={document.title}
                  onChange={(e) => setDocument({ ...document, title: e.target.value })}
                  placeholder="Document Title"
                  className="text-lg font-mono bg-transparent border-none focus:ring-0 text-white placeholder-white/40 w-[300px]"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
                {document.status === 'draft' ? (
                  <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                ) : (
                  <Globe className="w-4 h-4 text-green-500 mr-2" />
                )}
                <select
                  value={document.status}
                  onChange={(e) => setDocument({ ...document, status: e.target.value })}
                  className="bg-transparent border-none text-sm font-mono text-white/80 focus:ring-0 cursor-pointer"
                >
                  <option value="draft" className="bg-black text-white">DRAFT</option>
                  <option value="published" className="bg-black text-white">PUBLISHED</option>
                </select>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-white/60 hover:text-white transition-colors duration-300"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 flex items-center font-mono"
              >
                <Save className="w-4 h-4 mr-2" />
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isFullscreen ? '' : 'max-w-7xl'}`}>
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4">
            {error}
          </div>
        )}

        <div className="bg-[#0A0A0A] rounded-lg border border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-white/60 mb-2">
                  Description
                </label>
                <textarea
                  value={document.description}
                  onChange={(e) => setDocument({ ...document, description: e.target.value })}
                  placeholder="Add a brief description..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-green-500/50 focus:ring-0 font-mono h-24 resize-none"
                />
              </div>

              {/* Markdown Editor */}
              {/* Inside your DocumentEditor component, update the markdown editor section */}

              {/* Replace the MDEditor section with this: */}
              <div data-color-mode="dark" className="w-full h-full">
                <div className="grid grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className="bg-[#0A0A0A] rounded-lg border border-white/10">
                    <div className="border-b border-white/10 px-4 py-2 flex items-center">
                      <Code className="w-4 h-4 text-white/60 mr-2" />
                      <span className="text-sm font-mono text-white/60">MARKDOWN</span>
                    </div>
                    <MDEditor
                      value={document.content}
                      onChange={(value) => setDocument({ ...document, content: value || '' })}
                      preview="edit"
                      height={600}
                      hideToolbar={false}
                      className="!bg-black/50 !border-0"
                      textareaProps={{
                        placeholder: 'Start writing your documentation...'
                      }}
                    />
                  </div>

                  {/* Preview */}
                  <div className="bg-[#0A0A0A] rounded-lg border border-white/10">
                    <div className="border-b border-white/10 px-4 py-2 flex items-center">
                      <Eye className="w-4 h-4 text-white/60 mr-2" />
                      <span className="text-sm font-mono text-white/60">PREVIEW</span>
                    </div>
                    <div className="p-4 overflow-auto" style={{ height: '600px' }}>
                      <MDEditor.Markdown
                        source={document.content}
                        rehypePlugins={[[rehypeSanitize]]}
                        className="prose prose-invert max-w-none"
                        style={{
                          backgroundColor: 'transparent',
                          fontFamily: 'ui-monospace, monospace'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;