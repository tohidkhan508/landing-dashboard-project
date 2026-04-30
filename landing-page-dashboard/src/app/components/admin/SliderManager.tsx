"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Upload, X, Eye } from "lucide-react";

export default function SliderManager() {
  const [slides, setSlides] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: null as File | null,
  });

  // FETCH SLIDES - using useCallback to prevent infinite loops
  const fetchSlides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/heroSlider");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setSlides(data.data || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      setError("Failed to load slides. Please refresh the page.");
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // INITIAL FETCH
  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  // REFETCH WHEN COMPONENT BECOMES VISIBLE (for tab switching)
  useEffect(() => {
    fetchSlides();

    // Refetch when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSlides();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchSlides]);

  const handleSubmit = async () => {
    if (!form.title || !form.subtitle) {
      alert("Please fill all fields");
      return;
    }

    if (!editingId && !form.image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await fetch(`http://localhost:8000/api/heroSlider/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        await fetch("http://localhost:8000/api/heroSlider", {
          method: "POST",
          body: formData,
        });
      }

      resetForm();
      await fetchSlides(); // Wait for fetch to complete
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting slide:", error);
      alert("Failed to save slide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slide: any) => {
    setEditingId(slide.id);
    setForm({
      title: slide.title ?? "",
      subtitle: slide.subtitle ?? "",
      image: null,
    });
    setPreviewImage(`http://localhost:8000${slide.image}`);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this slide?");
    if (!ok) return;

    setLoading(true);
    try {
      await fetch(`http://localhost:8000/api/heroSlider/${id}`, {
        method: "DELETE",
      });
      await fetchSlides(); // Refresh the list
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Failed to delete slide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", subtitle: "", image: null });
    setPreviewImage(null);
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (!editingId) {
      setPreviewImage(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Hero Slider</h2>
          <p className="text-gray-400 mt-1">Manage your homepage slides</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {/* Loading State */}
      {loading && slides.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading slides...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => fetchSlides()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {editingId ? "Edit Slide" : "Add New Slide"}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Slide Title"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <input
                type="text"
                placeholder="Slide Subtitle"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="slide-image"
                />
                <label
                  htmlFor="slide-image"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition"
                >
                  <Upload size={20} className="text-gray-400" />
                  <span className="text-gray-300">
                    {form.image ? form.image.name : "Upload Slide Image"}
                  </span>
                </label>
              </div>

              {previewImage && (
                <div className="mt-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : editingId
                    ? "Update Slide"
                    : "Create Slide"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slides Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`http://localhost:8000${slide.image}`}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-lg text-white transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                    {slide.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {slides.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Slides Yet
              </h3>
              <p className="text-gray-400">
                Click the "Add Slide" button to create your first slide
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
