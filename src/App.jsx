import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Documentation from './pages/Documentation';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Documents from './pages/dashboard/Documents';
import DocumentEditor from './pages/dashboard/DocumentEditor';
import Settings from './pages/dashboard/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GitHubCallback from './components/github/GitHubCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/docs" element={<Documentation />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/github-callback"
          element={<GitHubCallback />}
        />
        <Route
          path="/dashboard/documents"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Documents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/documents/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DocumentEditor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/documents/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DocumentEditor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;