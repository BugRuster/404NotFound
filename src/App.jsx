// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/common/CustomCursor';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Documentation from './pages/Documentation';
import Overview from './pages/dashboard/Overview';
import Documents from './pages/dashboard/Documents';
import DocumentEditor from './pages/dashboard/DocumentEditor';
import NewDocument from './pages/dashboard/NewDocument';
import GitHubDocumentation from './pages/dashboard/GitHubDocumentation';
import Settings from './pages/dashboard/Settings';

// Components
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GitHubCallback from './components/github/GitHubCallback';
import DocumentationViewer from './components/docs/DocumentationViewer';


const PageTransition = ({ children }) => (
  <div className="animate-fadeIn">{children}</div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <CustomCursor />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
            <Route path="/docs" element={<PageTransition><Documentation /></PageTransition>} />
            <Route path="/github/callback" element={<GitHubCallback />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard">
                <Route index element={<Overview />} />
                <Route path="documents">
                  <Route index element={<Documents />} />
                  <Route path="new">
                    <Route index element={<NewDocument />} />
                    <Route path="github" element={<GitHubDocumentation />} />
                  </Route>
                  <Route path="view" element={<DocumentationViewer />} />
                  <Route path=":id" element={<DocumentEditor />} />
                  
                </Route>
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Catch all - redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;