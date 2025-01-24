import api from './api';

export const githubService = {
  connectGithub: () => {
    window.location.href = 'https://404-not-found-backend.vercel.app/api/github/auth';
  },
  storeToken: (token) => localStorage.setItem('github_token', token),
  getToken: () => localStorage.getItem('github_token'),
  removeToken: () => localStorage.removeItem('github_token')
};