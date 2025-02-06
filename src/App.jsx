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
import NewDocument from './pages/dashboard/NewDocument';
import GitHubDocumentation from './pages/dashboard/GitHubDocumentation';
import Settings from './pages/dashboard/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GitHubCallback from './components/github/GitHubCallback';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/docs" element={<Documentation />} />
        
        {/* Dashboard Routes - All Protected */}
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

        {/* GitHub OAuth Callback */}
        <Route
          path="/dashboard/github-callback"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GitHubCallback />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Documents Routes */}
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
        
        {/* New Document Creation Routes */}
        <Route
          path="/dashboard/documents/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <NewDocument />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/documents/new/github"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GitHubDocumentation />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Document Editor Routes */}
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

        {/* Settings Route */}
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

        {/* Catch all redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;