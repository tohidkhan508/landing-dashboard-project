"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Package, Video, Image as ImageIcon } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    slides: 0,
    videos: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, slides, videos] = await Promise.all([
        fetch("http://localhost:8000/api/products").then((res) => res.json()),
        fetch("http://localhost:8000/api/heroSlider").then((res) => res.json()),
        fetch("http://localhost:8000/api/videos").then((res) => res.json()),
      ]);
      setStats({
        products: products.length || 0,
        slides: slides.data?.length || 0,
        videos: videos.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      gradient: "blue",
    },
    {
      title: "Hero Slides",
      value: stats.slides,
      icon: ImageIcon,
      color: "from-purple-500 to-pink-500",
      gradient: "purple",
    },
    {
      title: "Videos",
      value: stats.videos,
      icon: Video,
      color: "from-orange-500 to-red-500",
      gradient: "orange",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back! 👋</h1>
        <p className="text-gray-400">
          Here's what's happening with your content today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{card.title}</p>
                  <p className="text-4xl font-bold text-white">{card.value}</p>
                  <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>+12% from last month</span>
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
