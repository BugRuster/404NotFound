import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { documentService } from "../../services/documents";
import { Button } from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import { 
  FileText, Plus, Book, Clock, Trash2, Edit2, 
  Search, Filter, ArrowUpRight, Eye
} from "lucide-react";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const DocumentCard = ({ doc, onDelete, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`transform transition-all duration-500 hover:scale-102 ${
        index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="relative group bg-black border border-white/10 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Status Indicator */}
        <div className="absolute top-4 right-4 z-10">
          {doc.status === "draft" ? (
            <div className="flex items-center bg-yellow-500/10 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3 text-yellow-500 mr-1" />
              <span className="text-xs text-yellow-500 font-mono">DRAFT</span>
            </div>
          ) : (
            <div className="flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              <Eye className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-mono">PUBLISHED</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors duration-300">
              <FileText className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-medium text-white truncate group-hover:text-white/90">
              {doc.title}
            </h3>
          </div>

          <p className="text-white/60 mb-6 line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
            {doc.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm text-white/40 font-mono">
              UPDATED_{new Date(doc.updatedAt).toLocaleDateString().replace(/\//g, '_')}
            </span>
            
            {/* Action Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => navigate(`/dashboard/documents/${doc._id}`)}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 group/edit"
              >
                <Edit2 className="w-4 h-4 text-white/60 group-hover/edit:text-white transition-colors duration-300" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(doc._id);
                }}
                className="p-2 bg-white/5 rounded-lg hover:bg-red-500/10 transition-colors duration-300 group/delete"
              >
                <Trash2 className="w-4 h-4 text-white/60 group-hover/delete:text-red-400 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : '-translate-x-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await documentService.getAllDocuments();
      setDocuments(response.data || []);
    } catch (err) {
      setError("Failed to fetch documents");
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
      console.error("Error deleting document:", err);
    }
  };

  const filteredDocuments = documents
    .filter((doc) => activeTab === "all" || doc.status === activeTab)
    .filter((doc) => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-mono">
              DOCUMENTATION<span className="animate-pulse">_</span>
            </h1>
            <p className="text-white/60 mt-1">
              Manage and organize your project documentation
            </p>
          </div>
          <Button 
            onClick={() => navigate("/dashboard/documents/new")}
            className="bg-white text-black hover:bg-white/90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Document
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300"
            />
          </div>
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 px-3">
            <Filter className="w-5 h-5 text-white/40 mr-2" />
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-transparent border-none text-white/60 focus:ring-0 cursor-pointer"
            >
              <option value="all">All Documents</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc, index) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                index={index}
                onDelete={handleDeleteConfirm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-white/40" />
            <h3 className="mt-2 text-lg font-medium text-white">No documents found</h3>
            <p className="mt-1 text-white/60">
              Get started by creating your first document
            </p>
            <Button
              onClick={() => navigate("/dashboard/documents/new")}
              className="mt-6 bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Document
            </Button>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        onConfirm={handleDeleteDocument}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default Documents;