import React, { useState } from "react";
import { createRestaurant } from "../services/requests";
import { useNavigate } from "react-router-dom";
import {
  FaStore,
  FaAlignLeft,
  FaLocationDot,
  FaArrowLeft,
  FaPlus,
  FaCircleNotch,
} from "react-icons/fa6";

function NewRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: "37.7749",
    longitude: "-122.4194",
    isOpen: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSetDefaultLocation = () => {
    setFormData((prev) => ({
      ...prev,
      latitude: "37.7749",
      longitude: "-122.4194",
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter a restaurant name.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please enter a description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createRestaurant({
        name: formData.name.trim(),
        description: formData.description.trim(),
        is_open: formData.isOpen,
        location: {
          latitude: Number(formData.latitude) || 0,
          longitude: Number(formData.longitude) || 0,
        },
      });
      navigate("/my-account/restaurant-admin/restaurants");
    } catch (err) {
      console.error(err);
      setError("Failed to create restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-10 px-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100 max-w-xl w-full p-8 transition-all">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
              <FaStore className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create New Restaurant
              </h1>
              <p className="text-sm text-gray-500">
                Register your restaurant to start receiving orders on FoodieFleet
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Restaurant Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <FaStore />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Luigi's Trattoria"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-start">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaAlignLeft />
              </span>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of cuisine, specialties, or vibe..."
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1.5">
                <FaLocationDot className="text-orange-500" /> Location Coordinates
              </label>
              <button
                type="button"
                onClick={handleSetDefaultLocation}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium underline"
              >
                Use Default Demo Coordinates
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="37.7749"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="-122.4194"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Initial Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <span className="block text-sm font-semibold text-gray-800">
                Restaurant Status
              </span>
              <span className="text-xs text-gray-500">
                Set restaurant as active and accepting orders immediately
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isOpen"
                checked={formData.isOpen}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-sm text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaCircleNotch className="animate-spin text-lg" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Create Restaurant</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewRestaurant;
