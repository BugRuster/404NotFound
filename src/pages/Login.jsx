"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ArrowRight } from "lucide-react"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(credentials)
      navigate("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-white to-black p-4">
      <div className="w-full max-w-xl bg-black rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Login to Your Account</h1>
          <p className="text-gray-400 max-w-md mx-auto">
          Streamline Your Documentation - Secure, Fast, and Efficient
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />

            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Login to Your Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <Link to="/forgot-password" className="text-gray-400 hover:text-white text-sm transition-colors">
            Forgot Password?
          </Link>
          <div className="text-gray-400 text-sm">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-white hover:text-purple-300 transition-colors">
              Register now!
            </Link>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between text-gray-600 text-sm">
          <Link to="/privacy" className="hover:text-gray-400 transition-colors">
            Privacy Policy
          </Link>
          <span>Copyright @buguster 2025</span>
        </div>
      </div>
    </div>
  )
}

export default Login

