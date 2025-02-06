// src/pages/dashboard/Documents.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { documentService } from '../../services/documents';
import { Button } from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { FileText, Plus, Book, Clock } from 'lucide-react';
import ConfirmDialog from '../../components/common/ConfirmDialog';



const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await documentService.getAllDocuments();
      setDocuments(response.data || []);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteDocument = async () => {
    try {
      await documentService.deleteDocument(deleteId);
      setShowDeleteConfirm(false);
      fetchDocuments();
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };


  const filteredDocuments = documents.filter(doc => 
    activeTab === 'all' || doc.status === activeTab
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
          <p className="text-gray-600 mt-1">Manage your project documentation</p>
        </div>
        <Button onClick={() => navigate('/dashboard/documents/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Document
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'published', 'draft'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {doc.status === 'draft' ? (
                  <Clock className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Book className="w-5 h-5 text-green-500" />
                )}
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {doc.title}
                </h3>
              </div>
              
              <p className="text-gray-500 mb-4 line-clamp-2">
                {doc.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Updated {new Date(doc.updatedAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/dashboard/documents/${doc._id}`)}
                  >
                    Edit
                  </Button>
                  <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        onConfirm={handleDeleteDocument}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Update the delete button in your document card */}
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteConfirm(doc._id)}
      >
        Delete
      </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new document
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/dashboard/documents/new')}>
                Create Document
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;