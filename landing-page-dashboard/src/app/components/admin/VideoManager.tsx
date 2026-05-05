"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2, Upload, X, Play } from "lucide-react";

export default function VideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    title: "",
    video: null as File | null,
  });

  // FETCH VIDEOS - using useCallback to prevent infinite loops
  const fetchVideo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Please refresh the page.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // INITIAL FETCH
  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  // REFETCH WHEN COMPONENT BECOMES VISIBLE (for tab switching)
  useEffect(() => {
    // Refetch when component mounts (tab switch)
    fetchVideo();

    // Optional: Add visibility listener to refetch when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchVideo]);

  const handleSubmit = async () => {
    if (!form.title) {
      alert("Title required");
      return;
    }

    if (!editing && !form.video) {
      alert("Video required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);

    if (form.video) {
      formData.append("video", form.video);
    }

    try {
      if (editing) {
        await fetch(`http://localhost:8000/api/videos/${editing}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        await fetch("http://localhost:8000/api/videos", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      resetForm();
      await fetchVideo(); // Wait for fetch to complete
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting video:", error);
      alert("Failed to save video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video: any) => {
    setEditing(video.id);
    setForm({
      title: video.title ?? "",
      video: null,
    });
    setPreviewVideo(`http://localhost:8000${video.video}`);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this video?");
    if (!ok) return;

    setLoading(true);
    try {
      await fetch(`http://localhost:8000/api/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchVideo(); // Refresh the list
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", video: null });
    setPreviewVideo(null);
    setEditing(null);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, video: file });
    if (file) {
      // For new video preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (!editing) {
      // Only clear preview if not editing
      setPreviewVideo(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Videos</h2>
          <p className="text-gray-400 mt-1">Manage your video library</p>
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
          Add Video
        </button>
      </div>

      {/* Loading State */}
      {loading && videos.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading videos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => fetchVideo()}
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
                {editing ? "Edit Video" : "Add New Video"}
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
                placeholder="Video Title"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                  id="video-file"
                />
                <label
                  htmlFor="video-file"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition"
                >
                  <Upload size={20} className="text-gray-400" />
                  <span className="text-gray-300">
                    {form.video ? form.video.name : "Upload Video File"}
                  </span>
                </label>
              </div>

              {previewVideo && (
                <div className="mt-2">
                  <video
                    src={previewVideo}
                    className="w-full h-40 object-cover rounded-lg"
                    controls
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : editing
                    ? "Update Video"
                    : "Upload Video"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Video Thumbnail/Player */}
                <div className="relative h-48 overflow-hidden bg-black/50">
                  <video
                    src={`http://localhost:8000${video.video}`}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    muted
                    loop
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={48} className="text-white/80" />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(video)}
                      className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-lg text-white transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Added: {formatDate(video.created_at || video.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {videos.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Videos Yet
              </h3>
              <p className="text-gray-400">
                Click the "Add Video" button to upload your first video
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
