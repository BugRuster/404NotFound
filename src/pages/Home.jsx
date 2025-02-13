import { Link } from "react-router-dom"
import { FileText, Users, Zap, Search } from "lucide-react"
import { useState, useEffect } from "react"

const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  )
}

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`bg-black min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 group">
              <span className="sr-only">DocsPlatform</span>
              <div className="text-white font-bold text-xl tracking-wider group-hover:scale-105 transition-transform duration-300">
                DOCS<span className="animate-pulse">//</span>PLATFORM
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white transition-transform hover:scale-110 duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {["Features", "Testimonials", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/70 hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link 
              to="/login" 
              className="text-sm font-medium text-white/70 hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              Log in <span className="ml-2 font-mono group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div 
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white/10 to-white/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse-slow" 
            />
          </div>
          
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
                <TypewriterText text="DOCUMENTATION" />
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <TypewriterText text="REIMAGINED" delay={150} />
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/70 transform transition-all duration-500 hover:text-white">
                Create, manage, and share your project documentation with unprecedented speed and precision. 
                AI-powered. Future-ready.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/signup"
                  className="rounded-none bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  INITIALIZE
                </Link>
                <a 
                  href="#features" 
                  className="text-sm font-semibold text-white/70 hover:text-white transition-all duration-300 group hover:scale-105"
                >
                  Learn more <span className="font-mono ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="py-24 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold text-white/90 font-mono animate-pulse">SYSTEM.CAPABILITIES</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl transform transition-all duration-500 hover:scale-105">
                Next-Generation Documentation Engine
              </p>
              <p className="mt-6 text-lg leading-8 text-white/70 transition-colors duration-300 hover:text-white">
                Advanced tooling designed for the modern development workflow. 
                Streamlined, intelligent, and built for scale.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {[
                  {
                    name: "AI-Powered Documentation",
                    description:
                      "Neural networks analyze and generate documentation in real-time, ensuring accuracy and completeness.",
                    icon: Zap,
                  },
                  {
                    name: "Real-time Collaboration",
                    description: "Zero-latency collaborative editing with built-in conflict resolution.",
                    icon: Users,
                  },
                  {
                    name: "Version Control",
                    description:
                      "Quantum-inspired versioning system with instant rollbacks and branch management.",
                    icon: FileText,
                  },
                  {
                    name: "Smart Search",
                    description: "Context-aware search engine with natural language processing capabilities.",
                    icon: Search,
                  },
                ].map((feature) => (
                  <div 
                    key={feature.name} 
                    className="relative pl-16 group transform transition-all duration-500 hover:translate-x-2"
                  >
                    <dt className="text-base font-semibold text-white">
                      <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                        <feature.icon 
                          className="h-6 w-6 text-white/70 group-hover:text-white transition-colors duration-300" 
                          aria-hidden="true" 
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-white/70 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {[
              { name: 'GitHub', href: 'https://github.com/BugRuster' },
              { name: 'Twitter', href: 'https://x.com/BugRuster' },
              { name: 'Discord', href: 'https://discord.com/BugRuster' },
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-white/40 hover:text-white/70 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">{item.name}</span>
                <div className="h-6 w-6 font-mono">{item.name[0]}</div>
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-white/40 font-mono animate-pulse">
              &copy; 2025_DOCSPLATFORM_ALL_RIGHTS_RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home