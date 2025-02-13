"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ArrowRight } from "lucide-react"
import { validateEmail, validatePassword } from "../utils/validation"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { register, isLoading, error: authError } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: !formData.name ? "Name is required" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword ? "Passwords do not match" : "",
    }

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        navigate("/dashboard")
      } catch (error) {
        console.error("Registration error:", error)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-white to-black p-4">
      <div className="w-full max-w-xl bg-black rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Create Your Account</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Join our platform and start managing your documentation with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">{authError}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {formErrors.password && <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-400">{formErrors.confirmPassword}</p>}
            </div>
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
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:text-purple-300 transition-colors">
              Login here
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

export default SignUp

