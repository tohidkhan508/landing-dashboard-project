"use client";

import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Dashboard from "../components/admin/Dashboard";
import SliderManager from "../components/admin/SliderManager";
import ProductManager from "../components/admin/ProductManager";
import VideoManager from "../components/admin/VideoManager";

export default function DashboardPage() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {active === "dashboard" && <Dashboard />}
          {active === "slider" && <SliderManager />}
          {active === "products" && <ProductManager />}
          {active === "videos" && <VideoManager />}
        </div>
      </div>
    </div>
  );
}
