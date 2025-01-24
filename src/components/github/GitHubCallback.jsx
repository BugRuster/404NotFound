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
  }, [searchParams]);

  return <div>Connecting to GitHub...</div>;
};

export default GitHubCallback;