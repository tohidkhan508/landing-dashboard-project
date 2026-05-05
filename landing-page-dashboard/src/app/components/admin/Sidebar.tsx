"use client";

import { LayoutDashboard, Image, Package, Video, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  active: string;
  setActive: (val: string) => void;
}

export default function Sidebar({ active, setActive }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "slider", label: "Hero Slider", icon: Image },
    { id: "products", label: "Products", icon: Package },
    { id: "videos", label: "Videos", icon: Video },
  ];

  return (
    <div className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"></div>
          <div>
            <h1 className="text-white font-bold text-xl">Admin Panel</h1>
            <p className="text-white/50 text-sm">Manage Content</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  active === item.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {active === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-8 w-56">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
