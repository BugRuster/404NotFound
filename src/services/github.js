import api from './api';

export const githubService = {
  connectGithub: () => window.location.href = `${api.defaults.baseURL}/github/auth`,
  getRepositories: () => api.get('/github/repositories'),
  analyzeRepository: (owner, repo) => api.post('/repository/analyze', { owner, repo })
};