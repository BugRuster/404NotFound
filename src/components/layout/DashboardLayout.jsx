import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, FileText, Settings, LogOut, 
  Menu, X, Sun, Moon, Laptop 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

const ThemeToggleGroup = ({ value, onChange }) => {
  const options = [
    { value: 'system', icon: Laptop },
    { value: 'light', icon: Sun },
    { value: 'dark', icon: Moon }
  ];

  return (
    <div className="flex p-1 gap-1 bg-white/5 rounded-lg w-fit">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-2 rounded-md transition-all duration-300 ${
              value === option.value 
                ? "bg-white/10 text-white" 
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Documents", icon: FileText, path: "/dashboard/documents" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const isActivePath = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-1000 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link to="/dashboard" className="text-xl font-bold text-white tracking-wider">
              DOCS<span className="animate-pulse">//</span>PLATFORM
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="lg:hidden text-white/70 hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item, idx) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 group ${
                  isActivePath(item.path)
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                } ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & Logout */}
          <div className="p-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm text-white/50">Theme</span>
              <ThemeToggleGroup value={theme} onChange={setTheme} />
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300 group"
            >
              <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-black/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-bold text-white tracking-wider">
            DOCS<span className="animate-pulse">//</span>PLATFORM
          </h1>
        </header>

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;