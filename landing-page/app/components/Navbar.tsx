"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiPackage,
  FiHome,
  FiTrendingUp,
  FiTag,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Products", href: "/products", icon: FiPackage },
  { name: "Trending", href: "/trending", icon: FiTrendingUp },
  { name: "Deals", href: "/deals", icon: FiTag },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-linear-to-b from-black/50 to-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="/"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 bg-linear-to-br from-[#FF9900] to-[#FF6B00] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight">
                  Shop<span className="text-[#FF9900]">Hub</span>
                </span>
                <p className="text-white/50 text-[10px] -mt-1">Premium Store</p>
              </div>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#FF9900]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF9900] to-[#FF6B00] rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF9900] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* User Menu */}
              <motion.div whileTap={{ scale: 0.95 }} className="relative group">
                <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
                  <FiUser className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-56 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-white text-sm font-semibold">
                      Guest User
                    </p>
                    <p className="text-white/50 text-xs">
                      Sign in for better experience
                    </p>
                  </div>
                  <div className="p-2">
                    {["My Orders", "Wishlist", "Settings"].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        {item}
                      </button>
                    ))}
                    <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-all mt-2 border-t border-white/10 pt-3">
                      <span className="flex items-center gap-2">
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Search Bar Expanded */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="w-full px-5 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/50 outline-none focus:border-[#FF9900] transition-all"
                    autoFocus
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-linear-to-r from-[#FF9900] to-[#FF6B00] rounded-lg text-black font-semibold text-sm hover:shadow-lg transition-all">
                    Search
                  </button>
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {["Electronics", "Fashion", "Mobiles", "Laptops"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-white/70 text-xs transition-all"
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-linear-to-b from-[#131921] to-[#232f3e] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pt-20">
                <div className="mb-8">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-br from-[#FF9900] to-[#FF6B00] rounded-full flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Welcome!</p>
                      <p className="text-white/50 text-xs">
                        Sign in to your account
                      </p>
                    </div>
                  </div>
                </div>

                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </motion.a>
                ))}

                <div className="mt-8 pt-8 border-t border-white/10">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#FF9900] to-[#FF6B00] rounded-lg text-black font-semibold hover:shadow-lg transition-all">
                    <FiShoppingCart className="w-4 h-4" />
                    View Cart ({cartCount})
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
