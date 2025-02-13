"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { documentService } from "../../services/documents"
import { Button } from "../../components/common/Button"
import Loading from "../../components/common/Loading"
import { FileText, Plus, Book, Clock, Trash2, Edit2 } from "lucide-react"
import ConfirmDialog from "../../components/common/ConfirmDialog"

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setIsLoading(true)
      const response = await documentService.getAllDocuments()
      setDocuments(response.data || [])
    } catch (err) {
      setError("Failed to fetch documents")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteConfirm = (id) => {
    setDeleteId(id)
    setShowDeleteConfirm(true)
  }

  const handleDeleteDocument = async () => {
    try {
      await documentService.deleteDocument(deleteId)
      setShowDeleteConfirm(false)
      fetchDocuments()
    } catch (err) {
      console.error("Error deleting document:", err)
    }
  }

  const filteredDocuments = documents.filter((doc) => activeTab === "all" || doc.status === activeTab)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Documentation</h1>
          <p className="text-secondary-500 dark:text-secondary-400 mt-1">Manage your project documentation</p>
        </div>
        <Button onClick={() => navigate("/dashboard/documents/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Document
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-md p-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex space-x-8">
          {["all", "published", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-300 dark:hover:border-secondary-700"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize`}
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
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {doc.status === "draft" ? (
                  <Clock className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Book className="w-5 h-5 text-green-500" />
                )}
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white truncate">{doc.title}</h3>
              </div>

              <p className="text-secondary-500 dark:text-secondary-400 mb-4 line-clamp-2">{doc.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                  Updated {new Date(doc.updatedAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/documents/${doc._id}`)}>
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirm(doc._id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-secondary-400" />
            <h3 className="mt-2 text-sm font-medium text-secondary-900 dark:text-secondary-200">No documents</h3>
            <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
              Get started by creating a new document
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate("/dashboard/documents/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Document
              </Button>
            </div>
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
  )
}

export default Documents

