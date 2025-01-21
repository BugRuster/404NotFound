// src/pages/dashboard/Documents.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Filter, Clock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import SearchBar from '../../components/docs/SearchBar';

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Getting Started Guide', updatedAt: '2 hours ago', tags: ['guide'] },
    { id: 2, title: 'API Documentation', updatedAt: '1 day ago', tags: ['api', 'technical'] },
    { id: 3, title: 'User Manual', updatedAt: '3 days ago', tags: ['guide', 'users'] },
  ]);
  const [filteredDocs, setFilteredDocs] = useState(documents);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all documents
  const allTags = [...new Set(documents.flatMap(doc => doc.tags))];

  const handleSearch = (searchTerm) => {
    filterDocuments(searchTerm, selectedTags);
  };

  const filterDocuments = (searchTerm = '', tags = []) => {
    let filtered = [...documents];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tags
    if (tags.length > 0) {
      filtered = filtered.filter(doc =>
        tags.some(tag => doc.tags.includes(tag))
      );
    }

    setFilteredDocs(filtered);
  };

  const handleTagSelect = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    filterDocuments('', newTags);
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      // TODO: Implement actual delete API call
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
      setFilteredDocs(prev => prev.filter(doc => doc.id !== docId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <Button onClick={() => navigate('/dashboard/documents/new')}>
          New Document
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1 max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>
        <Button 
          variant="secondary" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800'
                } hover:bg-indigo-50`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredDocs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No documents found
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredDocs.map((doc) => (
              <li key={doc.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-indigo-600 truncate">
                          {doc.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {doc.updatedAt}
                          </div>
                          <div className="flex gap-1">
                            {doc.tags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/dashboard/documents/${doc.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(doc.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Documents;