// src/components/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Documents', icon: FileText, path: '/dashboard/documents' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg glass-panel button-glow"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 glass-panel transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 py-4 border-b border-gray-200/10 dark:border-gray-700/10">
            <Link to="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-indigo-500 dark:from-primary-dark dark:to-indigo-400">
              DocsPlatform
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200
                  ${isActivePath(item.path)
                    ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'
                    : 'text-secondary-light dark:text-secondary-dark hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="px-4 py-6 border-t border-gray-200/10 dark:border-gray-700/10 space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-3 py-2 text-secondary-light dark:text-secondary-dark rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {isDark ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;