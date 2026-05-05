"use client";

import Link from "next/link";
import LoginForm from "./auth/LoginForm";

export default function HomePage() {
  return (
    // <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
    //   {/* Hero Section */}
    //   <div className="relative overflow-hidden">
    //     <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>

    //     <div className="container mx-auto px-4 py-20 relative z-10">
    //       <div className="text-center">
    //         {/* Badge */}
    //         <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm mb-6">
    //           ✨ Enterprise Management System
    //         </div>

    //         {/* Heading */}
    //         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
    //           Manage Your
    //           <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    //             {" "}
    //             Business
    //           </span>
    //         </h1>

    //         <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
    //           Complete admin dashboard to manage products, hero sliders, videos
    //           and more with ease.
    //         </p>

    //         {/* CTA Buttons */}
    //         <div className="flex gap-4 justify-center">
    //           <Link
    //             href="/login"
    //             className="px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
    //           >
    //             Get Started →
    //           </Link>
    //           <Link
    //             href="/signup"
    //             className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
    //           >
    //             Create Account
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Features Section */}
    //   <div className="container mx-auto px-4 py-20">
    //     <div className="text-center mb-12">
    //       <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
    //         Everything You Need
    //       </h2>
    //       <p className="text-gray-300 text-lg">
    //         Powerful tools to manage your content
    //       </p>
    //     </div>

    //     <div className="grid md:grid-cols-3 gap-8">
    //       {[
    //         {
    //           icon: "🎬",
    //           title: "Hero Slider",
    //           description:
    //             "Manage dynamic sliders with images, titles and subtitles",
    //         },
    //         {
    //           icon: "📦",
    //           title: "Products",
    //           description:
    //             "Add, edit and delete products with images and descriptions",
    //         },
    //         {
    //           icon: "🎥",
    //           title: "Videos",
    //           description: "Upload and manage video content for your platform",
    //         },
    //       ].map((feature, idx) => (
    //         <div
    //           key={idx}
    //           className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
    //         >
    //           <div className="text-5xl mb-4">{feature.icon}</div>
    //           <h3 className="text-xl font-semibold text-white mb-3">
    //             {feature.title}
    //           </h3>
    //           <p className="text-gray-400">{feature.description}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <LoginForm />
  );
}
