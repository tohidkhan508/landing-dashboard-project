"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("All field are required");
      return;
    }

    try {
      setLoading(true);

      const result = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await result.json();

      if (result.ok) {
        setSuccess("Account created successfully!");

        // redirect after 1.5 sec
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/20 text-green-300 p-2 rounded mb-4 text-sm text-center">
            {success}
          </p>
        )}

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="off"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
