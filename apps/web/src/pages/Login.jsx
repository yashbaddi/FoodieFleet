import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { loginUser, registerUser } from "../services/requests";
import { FaLock, FaEnvelope, FaUser, FaPhone } from "react-icons/fa6";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        if (!formData.name || !formData.email || !formData.password) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }
        const res = await registerUser(formData);
        if (res.message && res.message.toLowerCase().includes("failed")) {
          setError(res.message);
        } else if (res.user || res.token) {
          window.location.href = "/";
        } else {
          setError(res.message || "Registration failed. Please try again.");
        }
      } else {
        if (!formData.email || !formData.password) {
          setError("Please enter email and password.");
          setLoading(false);
          return;
        }
        const res = await loginUser(formData.email, formData.password);
        if (res.user || res.token) {
          window.location.href = "/";
        } else {
          setError(res.message || "Invalid credentials. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = (email) => {
    setFormData({
      ...formData,
      email: email,
      password: "password123",
    });
    setIsRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100 max-w-md w-full p-8 transition-all">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-3 cursor-pointer" onClick={() => navigate("/")}>
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isRegister ? "Join FoodieFleet" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isRegister
              ? "Create an account to order your favorite meals"
              : "Sign in to continue your delicious journey"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-orange-50 p-1 rounded-xl mb-6 border border-orange-100">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              !isRegister
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              isRegister
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-0199"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 mt-2 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        {/* Demo Accounts Quick Login */}
        {!isRegister && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase text-center mb-3">
              Quick Demo Login
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={() => fillDemoUser("mario@pizzeria.com")}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-medium rounded-lg transition-colors border border-orange-200"
              >
                Owner: mario@pizzeria.com
              </button>
              <button
                type="button"
                onClick={() => fillDemoUser("alice@example.com")}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-medium rounded-lg transition-colors border border-orange-200"
              >
                Customer: alice@example.com
              </button>
              <button
                type="button"
                onClick={() => fillDemoUser("charlie@fleet.com")}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-medium rounded-lg transition-colors border border-orange-200"
              >
                Driver: charlie@fleet.com
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
