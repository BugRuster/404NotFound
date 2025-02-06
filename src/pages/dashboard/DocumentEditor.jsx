// src/pages/dashboard/DocumentEditor.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentService } from '../../services/documents';
import { Button } from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import Editor from '../../components/editor/Editor';
import Loading from '../../components/common/Loading';
import { Save, ArrowLeft } from 'lucide-react';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/documents')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Document' : 'Create New Document'}
          </h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Title"
          value={document.title}
          onChange={(e) => setDocument({ ...document, title: e.target.value })}
          required
        />

        <FormInput
          label="Description"
          value={document.description}
          onChange={(e) => setDocument({ ...document, description: e.target.value })}
          multiline
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <Editor
            content={document.content}
            onChange={(content) => setDocument({ ...document, content })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={document.status}
            onChange={(e) => setDocument({ ...document, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default DocumentEditor;