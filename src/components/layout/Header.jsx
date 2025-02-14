import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Laptop, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Laptop, label: 'System' }
  ];

  return (
    <header className="border-b border-white/10 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl tracking-wider group">
            DOCS<span className="animate-pulse">//</span>PLATFORM
          </Link>

          <div className="flex space-x-6 items-center">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                {theme === 'light' && <Sun className="w-5 h-5 text-white" />}
                {theme === 'dark' && <Moon className="w-5 h-5 text-white" />}
                {theme === 'system' && <Laptop className="w-5 h-5 text-white" />}
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg py-1 z-50">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-300 ${
                        theme === option.value
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              {['Documentation', 'API', 'Support'].map((item) => (
                <button
                  key={item}
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <Link
              to="/login"
              className="text-white/70 hover:text-white transition-all duration-300 group"
            >
              Login <span className="font-mono group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              INITIALIZE
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;