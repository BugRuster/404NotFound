import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from "../hooks/useAuth";

const TypewriterText = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText((prev) => {
          const next = currentFullText.slice(0, prev.length + 1);
          if (next === currentFullText) {
            setTypingSpeed(2000); // Pause at the end
            setIsDeleting(true);
          }
          return next;
        });
      } else {
        setText((prev) => {
          const next = currentFullText.slice(0, prev.length - 1);
          if (next === '') {
            setIsDeleting(false);
            setTypingSpeed(100);
            setCurrentTextIndex((current) => (current + 1) % texts.length);
          }
          return next;
        });
        setTypingSpeed(50); // Faster deletion speed
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentTextIndex, texts, typingSpeed]);

  return (
    <div className="font-mono text-white/80">
      {text}<span className="animate-pulse">_</span>
    </div>
  );
};

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const documentationQuotes = [
    "Good documentation is like a story well told...",
    "Code tells you how, documentation tells you why...",
    "Documentation is a love letter to your future self...",
    "Clear documentation is the foundation of collaboration...",
    "Write documentation as if the reader is a clever impatient person...",
    "The best documentation anticipates questions...",
    "Documentation is the bridge between knowledge and understanding...",
  ];

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-1000 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white/10 to-white/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse-slow" />
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className={`w-full max-w-md space-y-8 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div>
              <Link to="/" className="block text-center mb-8 group">
                <h1 className="text-white text-3xl font-bold tracking-wider">
                  DOCS<span className="animate-pulse">//</span>PLATFORM
                </h1>
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white text-center font-mono">
                Access Terminal<span className="animate-pulse">_</span>
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="group">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors duration-300" />
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-3 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300"
                      placeholder="Email address"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors duration-300" />
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-3 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Initialize Login
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  Reset Password
                </Link>
                <Link
                  to="/signup"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  Create Account 
                  <span className="ml-1 font-mono group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Animated Decoration with Quotes */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-gradient" />
          
          {/* Animated circuit lines */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border-t border-white/20"
                  style={{
                    top: `${20 * i}%`,
                    left: '-100%',
                    width: '300%',
                    transform: 'rotate(-25deg)',
                    animation: `slideRight 8s linear infinite ${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Centered quote container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-lg p-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <TypewriterText texts={documentationQuotes} />
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 5}s linear infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%) rotate(-25deg); }
          100% { transform: translateX(100%) rotate(-25deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          50% { transform: translate(-20px, -20px); opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Login;