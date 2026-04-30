"use client";
import ProductCard from "./ProductCard";
import { Product } from "../../../types";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowRight,
  FiStar,
  FiGift,
  FiTruck,
  FiShield,
  FiTag,
} from "react-icons/fi";
import { useRef } from "react";

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-32 overflow-hidden"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-125 h-125 bg-purple-600 rounded-full blur-[150px] opacity-30"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-pink-600 rounded-full blur-[150px] opacity-20"
          animate={{
            x: [0, -100, 0, 100, 0],
            y: [0, 50, 0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Cinematic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-2 mb-6"
          >
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent tracking-wider">
              PREMIUM COLLECTION 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            <span className="bg-linear-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Curated
            </span>
            <br />
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative">
              Excellence
              <motion.div
                className="absolute -inset-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 max-w-2xl mx-auto text-base md:text-lg font-light tracking-wide"
          >
            Experience luxury redefined with our handpicked selection of premium
            products
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { icon: FiTruck, label: "Free Shipping", value: "Worldwide" },
              { icon: FiShield, label: "Secure", value: "Payment" },
              { icon: FiGift, label: "Gift", value: "Available" },
              { icon: FiTag, label: "24/7", value: "Support" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              >
                <stat.icon className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">{stat.label}</span>
                <span className="text-xs font-bold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Products Grid - Masonry Style 4 Columns */}
        <motion.div
          style={{ opacity }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              index={index}
            />
          ))}
        </motion.div>

        {/* View All Button with Particles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white overflow-hidden"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>

            {/* Button Content */}
            <span className="relative z-10 text-sm tracking-wider font-black">
              EXPLORE THE COLLECTION
            </span>
            <FiArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

            {/* Particle Effects */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ x: "50%", y: "50%", opacity: 0 }}
                  animate={{
                    x: `${Math.random() * 200 - 100}%`,
                    y: `${Math.random() * 200 - 100}%`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.button>

          {/* Trust Badge */}
          <p className="text-xs text-white/30 mt-6 flex items-center justify-center gap-2">
            <FiStar className="w-3 h-3 text-yellow-400" />
            Join 50,000+ happy customers
            <FiStar className="w-3 h-3 text-yellow-400" />
          </p>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
