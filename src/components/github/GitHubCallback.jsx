import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { githubService } from '../../services/github';

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('github_token');
    if (token) {
      githubService.storeToken(token);
      navigate('/dashboard');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Connecting to GitHub...</h2>
        <p className="text-gray-600">Please wait while we complete the setup.</p>
      </div>
    </div>
  );
};

export default GitHubCallback;