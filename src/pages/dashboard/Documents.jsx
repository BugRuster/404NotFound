// src/pages/dashboard/Documents.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { repositoryService } from '../../services/repository';
import { Button } from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { FileText, GitBranch } from 'lucide-react';

const Documents = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setIsLoading(true);
      const response = await repositoryService.getRepositories();
      setRepositories(response.data);
    } catch (err) {
      setError('Failed to fetch repositories');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Repositories</h1>
        <Button onClick={() => navigate('/dashboard/documents/new')}>
          Add Repository
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <div
            key={repo._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GitBranch className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    {repo.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-500 mb-4 line-clamp-2">
                {repo.description || 'No description available'}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(repo.updatedAt).toLocaleDateString()}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/dashboard/documents/${repo._id}`)}
                >
                  View Docs
                </Button>
              </div>
            </div>
          </div>
        ))}

        {repositories.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No repositories</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new repository.
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/dashboard/documents/new')}>
                Add Repository
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;