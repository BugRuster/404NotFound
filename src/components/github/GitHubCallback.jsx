// src/components/github/GitHubCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { githubService } from '../../services/github';
import { Loader } from 'lucide-react';

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code) {
          throw new Error('No code received from GitHub');
        }

        // Handle the callback through your backend
        const response = await githubService.handleCallback(code, state);
        
        if (response.data?.token) {
          githubService.storeToken(response.data.token);
          navigate('/dashboard/documentation');
        } else {
          throw new Error('No token received from server');
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
          <p className="text-red-400">{error}</p>
          <p className="text-gray-400 mt-2">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center text-white">
        <Loader className="w-8 h-8 animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Connecting to GitHub...</h2>
        <p className="text-gray-400">Please wait while we complete the setup.</p>
      </div>
    </div>
  );
};

export default GitHubCallback;