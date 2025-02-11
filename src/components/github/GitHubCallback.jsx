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

        // Handle the GitHub callback
        const response = await githubService.handleCallback(code, state);
        
        if (response.data?.status === 'success') {
          // Store connection status
          githubService.storeToken(response.data?.data?.accessToken);
          
          // Navigate back to the documents page with success status
          const redirectPath = '/dashboard/documents/new/github?status=success';
          navigate(redirectPath, { replace: true });
        } else {
          throw new Error('GitHub connection failed');
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('Failed to complete GitHub connection');
        // Navigate back with error
        navigate('/dashboard/documents/new/github?error=connection_failed', { replace: true });
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
          <p className="text-gray-400 mt-2">Redirecting...</p>
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