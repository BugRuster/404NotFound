import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Component to handle page transitions
const PageTransition = ({ children }) => {
  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <CustomCursor />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                <PageTransition>
                  <SignUp />
                </PageTransition>
              } 
            />
            
            <Route 
              path="/docs" 
              element={
                <PageTransition>
                  <Documentation />
                </PageTransition>
              } 
            />

            {/* GitHub OAuth Callback - Public */}
            <Route
              path="/github/callback"
              element={
                <PageTransition>
                  <GitHubCallback />
                </PageTransition>
              }
            />

            {/* Dashboard Routes - Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route 
                index 
                element={
                  <PageTransition>
                    <Overview />
                  </PageTransition>
                } 
              />
              
              <Route 
                path="documents" 
                element={
                  <PageTransition>
                    <Documents />
                  </PageTransition>
                } 
              />
              
              <Route 
                path="documents/new" 
                element={
                  <PageTransition>
                    <NewDocument />
                  </PageTransition>
                } 
              />
              
              <Route 
                path="documents/new/github" 
                element={
                  <PageTransition>
                    <GitHubDocumentation />
                  </PageTransition>
                } 
              />
              
              <Route 
                path="documents/:id" 
                element={
                  <PageTransition>
                    <DocumentEditor />
                  </PageTransition>
                } 
              />
              
              <Route 
                path="settings" 
                element={
                  <PageTransition>
                    <Settings />
                  </PageTransition>
                } 
              />
            </Route>

            {/* Catch all - redirects to home */}
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;