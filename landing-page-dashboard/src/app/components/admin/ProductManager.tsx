"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // GET PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:8000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    const url = editingId
      ? `http://localhost:8000/api/products/${editingId}`
      : "http://localhost:8000/api/products";

    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      resetForm();
      fetchProducts();
      setIsFormOpen(false);
    }
  };

  // EDIT
  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      image: null,
    });
    setImagePreview(`http://localhost:8000${p.image}`);
    setIsFormOpen(true);
  };

  // DELETE
  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  // RESET FORM
  const resetForm = () => {
    setForm({ name: "", description: "", image: null });
    setImagePreview(null);
    setEditingId(null);
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Products</h2>
          <p className="text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {editingId ? "Edit Product" : "Add New Product"}
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
                placeholder="Product Name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                placeholder="Product Description"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="product-image"
                />
                <label
                  htmlFor="product-image"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition"
                >
                  <Upload size={20} className="text-gray-400" />
                  <span className="text-gray-300">
                    {form.image ? form.image.name : "Upload Image"}
                  </span>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {editingId ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              {product.image && (
                <img
                  src={`http://localhost:8000${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-lg text-white transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg text-white transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Products Yet
          </h3>
          <p className="text-gray-400">
            Click the "Add Product" button to get started
          </p>
        </div>
      )}
    </div>
  );
}
