// src/pages/dashboard/DocumentEditor.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentService } from '../../services/documents';
import { Button } from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import Editor from '../../components/editor/Editor';
import Loading from '../../components/common/Loading';
import { 
  Save, 
  ArrowLeft, 
  FileText, 
  Settings, 
  Eye, 
  Globe, 
  Lock,
  Clock
} from 'lucide-react';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard/documents')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-indigo-600" />
                <input
                  type="text"
                  value={document.title}
                  onChange={(e) => setDocument({ ...document, title: e.target.value })}
                  placeholder="Document Title"
                  className="text-xl font-medium border-none focus:ring-0 focus:outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                {document.status === 'draft' ? (
                  <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                ) : (
                  <Globe className="w-4 h-4 text-green-600 mr-2" />
                )}
                <select
                  value={document.status}
                  onChange={(e) => setDocument({ ...document, status: e.target.value })}
                  className="bg-transparent border-none text-sm font-medium focus:ring-0 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <Button onClick={handleSubmit} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('write')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'write'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Write
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'preview'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'settings'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'write' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <FormInput
                    label="Description"
                    value={document.description}
                    onChange={(e) => setDocument({ ...document, description: e.target.value })}
                    multiline
                    placeholder="Add a brief description..."
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="mt-6">
                    <Editor
                      content={document.content}
                      onChange={(content) => setDocument({ ...document, content })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="prose max-w-none">
                <h1>{document.title}</h1>
                <p className="text-gray-600">{document.description}</p>
                <div dangerouslySetInnerHTML={{ __html: document.content }} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Document Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={document.status === 'draft'}
                          onChange={() => setDocument({ ...document, status: 'draft' })}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Draft</span>
                      </label>
                      <p className="text-sm text-gray-500 ml-6">Only you can see this document</p>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={document.status === 'published'}
                          onChange={() => setDocument({ ...document, status: 'published' })}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Published</span>
                      </label>
                      <p className="text-sm text-gray-500 ml-6">Anyone with the link can view this document</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;