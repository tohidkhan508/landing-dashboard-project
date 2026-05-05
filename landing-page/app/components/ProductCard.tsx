"use client";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiEye,
  FiTrendingUp,
  FiShare2,
  FiZap,
  FiAward,
} from "react-icons/fi";
import { FaGem, FaCrown, FaStar } from "react-icons/fa";
import { useState } from "react";
import { Product } from "../../types";
import { IoSparkles } from "react-icons/io5";

interface ProductCardProps {
  product: Product;
  index: number;
}

const badgeStyles: Record<string, { bg: string; icon: React.ReactNode }> = {
  Hot: {
    bg: "bg-gradient-to-r from-red-500 to-orange-500",
    icon: <FiZap className="w-3 h-3" />,
  },
  New: {
    bg: "bg-gradient-to-r from-emerald-400 to-teal-500",
    icon: <IoSparkles className="w-3 h-3" />,
  },
  Sale: {
    bg: "bg-gradient-to-r from-amber-500 to-orange-500",
    icon: <FiTrendingUp className="w-3 h-3" />,
  },
  Bestseller: {
    bg: "bg-gradient-to-r from-purple-500 to-indigo-600",
    icon: <FaCrown className="w-3 h-3" />,
  },
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const rating = Number(product.rating ?? 0);

  const imageUrl = product.image
    ? `http://localhost:8000${product.image}`
    : "/placeholder.png";

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowShare(false);
      }}
    >
      {/* Premium 3D Card Effect */}
      <div className="relative bg-linear-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/30">
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin-slow"></div>
        </div>

        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Image Container with 3D Tilt */}
        <div className="relative w-full h-80 overflow-hidden bg-linear-to-br from-gray-900 to-black">
          <motion.img
            src={imageUrl}
            alt={product.name || "product"}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Premium Badge */}
          {product.badge && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`absolute top-4 left-4 px-3 py-1.5 text-[11px] font-bold rounded-full z-20 shadow-2xl flex items-center gap-1.5 ${badgeStyles[product.badge].bg} text-white backdrop-blur-sm`}
            >
              {badgeStyles[product.badge].icon}
              {product.badge}
            </motion.div>
          )}

          {/* Discount Badge - Luxury Circular */}
          {discount && discount > 0 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 right-4"
            >
              <div className="relative w-14 h-14 bg-black/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center border border-white/20 shadow-2xl">
                <span className="text-[10px] text-white/60 font-light">
                  SAVE
                </span>
                <span className="text-lg font-black text-green-400 -mt-1">
                  {discount}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Quick Action Buttons - Animated */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
            <div className="flex gap-2">
              <button className="flex-1 bg-white/20 backdrop-blur-xl text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all hover:scale-105">
                <FiEye className="w-4 h-4" />
                Quick View
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105">
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Wishlist Button */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            whileTap={{ scale: 0.9 }}
            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 backdrop-blur-xl z-20 ${
              isLiked
                ? "bg-linear-to-r from-red-500 to-pink-500"
                : "bg-black/60 hover:bg-black/80 border border-white/20"
            }`}
          >
            <FiHeart
              className={`w-4.5 h-4.5 transition-all ${
                isLiked
                  ? "text-white fill-white scale-110"
                  : "text-white/70 hover:text-red-400"
              }`}
            />
          </motion.button>
        </div>

        {/* Content Section - Premium Luxury */}
        <div className="p-5">
          {/* Category with Luxury Icons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaGem className="w-3 h-3 text-purple-400" />
              <p className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider">
                {product.category || "Premium"}
              </p>
            </div>
            {/* Stock Indicator */}
            {product.inStock !== false && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-emerald-400 font-medium">
                  In Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Name with Hover Effect */}
          <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 min-h-14 group-hover:text-purple-300 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description - Elegant */}
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4 min-h-10 font-light italic">
            {product.description ||
              "Elevate your style with this premium masterpiece."}
          </p>

          {/* Rating Section - Interactive Stars */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-3.5 h-3.5 transition-all ${
                      star <= Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : star - 0.5 <= rating
                          ? "text-yellow-400 fill-yellow-400/40"
                          : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white/80">
                {product.rating || "4.5"}
              </span>
              <span className="text-[10px] text-white/30">
                ({product.reviewCount?.toLocaleString() || "1.2k"} reviews)
              </span>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-1">
              <FiAward className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] text-amber-400/80 font-medium">
                Verified
              </span>
            </div>
          </div>

          {/* Price and Add to Cart - Premium */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 mt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white tracking-tight">
                  ₹{Number(product.price || 0).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-white/30 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount && discount > 0 && (
                <span className="text-[10px] text-green-400 font-semibold block -mt-1">
                  Limited time offer
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative overflow-hidden flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-xl"
            >
              <span className="relative z-10">Add to Cart</span>
              <FiShoppingCart className="w-3.5 h-3.5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
