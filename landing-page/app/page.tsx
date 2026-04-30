import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import ProductsSection from "./components/ProductsSection";
import VideosSection from "./components/VideosSection";
import Navbar from "./components/Navbar";

async function getSlides() {
  const res = await fetch("http://127.0.0.1:8000/api/heroSlider", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
}

async function getProducts() {
  const res = await fetch("http://localhost:8000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getVideos() {
  const res = await fetch("http://localhost:8000/api/videos", {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  let products = [];
  let slides = [];
  let videos = [];
  // Let videos = []

  try {
    products = await getProducts();
    slides = await getSlides();
    videos = await getVideos();

    console.log("SERVER SLIDES:", slides); // 👈 ye missing tha
  } catch (error) {
    console.log("API Error:", error);
  }

  return (
    <main>
      {/* <div className="flex justify-end gap-4 p-4">
        <Link href="/login" className="px-4 py-2 border rounded">
          Login
        </Link>

        <Link href="/signup" className="px-4 py-2 bg-black text-white rounded">
          Signup
        </Link>
      </div> */}
      <Navbar />
      <HeroSlider slides={slides} />
      <ProductsSection products={products} />
      <VideosSection videos={videos} />
    </main>
  );
}
