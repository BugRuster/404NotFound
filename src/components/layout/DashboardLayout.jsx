"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../hooks/useAuth"

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Documents", icon: FileText, path: "/dashboard/documents" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

  const isActivePath = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-white dark:bg-secondary-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-secondary-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-primary-600 dark:bg-primary-700">
            <Link to="/dashboard" className="text-xl font-bold text-white">
              DocsPlatform
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white focus:outline-none">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300"
                    : "text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t dark:border-secondary-700">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-3 py-2 text-secondary-600 dark:text-secondary-300 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              {isDark ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-secondary-800 border-b dark:border-secondary-700 h-16 flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-secondary-600 dark:text-secondary-300 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-secondary-900 dark:text-white">DocsPlatform</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

