import React, { useState, useEffect } from "react";
import { updateRestaurant, getRestaurant } from "../services/requests";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStore,
  FaAlignLeft,
  FaArrowLeft,
  FaPenToSquare,
  FaCircleNotch,
} from "react-icons/fa6";

function EditRestaurant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isOpen: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadRestaurant() {
      try {
        const data = await getRestaurant(id);
        if (data) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            isOpen: data.is_open ?? true,
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load restaurant details.");
      } finally {
        setFetching(false);
      }
    }
    loadRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter a restaurant name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateRestaurant(id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        is_open: formData.isOpen,
      });
      navigate("/my-account/restaurant-admin/restaurants");
    } catch (err) {
      console.error(err);
      setError("Failed to update restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="flex items-center gap-3 text-orange-600 font-medium">
          <FaCircleNotch className="animate-spin text-2xl" />
          <span>Loading restaurant data...</span>
        </div>
      </div>
    );
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
              <FaPenToSquare className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Restaurant Details
              </h1>
              <p className="text-sm text-gray-500">
                Update restaurant information and operational status
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

          {/* Open/Close Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <span className="block text-sm font-semibold text-gray-800">
                Accepting Orders (Open)
              </span>
              <span className="text-xs text-gray-500">
                Toggle whether customer orders are currently accepted
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <FaPenToSquare />
                  <span>Update Restaurant</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRestaurant;
