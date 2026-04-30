"use client";

import { Video } from "@/types";
import { motion } from "framer-motion";
import { FiPlay, FiVideo, FiClock, FiEye, FiMaximize2 } from "react-icons/fi";
import { IoSparkles, IoPlayCircle } from "react-icons/io5";
import { useState } from "react";

export default function VideosSection({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  console.log(videos);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-black">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black">
        <motion.div
          className="absolute top-1/3 right-1/3 w-150 h-150 bg-purple-600 rounded-full blur-[150px] opacity-20"
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-150 h-150 bg-pink-600 rounded-full blur-[150px] opacity-20"
          animate={{
            x: [0, -50, 0, 50, 0],
            y: [0, 30, 0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/ %3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
              WATCH & LEARN
            </span>
            <IoSparkles className="w-3 h-3 text-purple-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
          >
            <span className="bg-linear-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative">
              Video Stories
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
            Experience our products in action through cinematic storytelling
          </motion.p>
        </motion.div>

        {/* Videos Grid - Premium Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={video.id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative bg-linear-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Video Container */}
                <div className="relative aspect-video overflow-hidden">
                  <video
                    src={
                      video.video?.startsWith("/uploads")
                        ? `http://localhost:8000${video.video}`
                        : video.video
                    }
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    muted
                    loop
                    onMouseEnter={(e) =>
                      (e.currentTarget as HTMLVideoElement).play()
                    }
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLVideoElement).pause();
                      (e.currentTarget as HTMLVideoElement).currentTime = 0;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-500" />

                  {/* Premium Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border border-white/30">
                        <IoPlayCircle className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Duration Badge - Check if exists */}
                  {video.duration && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/20">
                      <FiClock className="w-3 h-3 text-white/70" />
                      <span className="text-[10px] text-white/80 font-medium">
                        {video.duration}
                      </span>
                    </div>
                  )}

                  {/* Views Badge - Check if exists */}
                  {video.views && (
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/20">
                      <FiEye className="w-3 h-3 text-white/70" />
                      <span className="text-[10px] text-white/80 font-medium">
                        {video.views} views
                      </span>
                    </div>
                  )}

                  {/* Premium Gloss Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Content Footer */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2 min-h-12 group-hover:text-purple-300 transition-colors duration-300">
                    {video.title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                        <FiVideo className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        Product Demo
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-[10px] font-medium text-white/50 hover:text-purple-400 transition-colors flex items-center gap-1"
                    >
                      Watch Now
                      <FiMaximize2 className="w-2.5 h-2.5" />
                    </motion.button>
                  </div>
                </div>

                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Videos Button */}
        {videos.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>

              <span className="relative z-10 text-sm tracking-wider font-black">
                EXPLORE ALL VIDEOS
              </span>
              <FiEye className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Video Modal - Premium Lightbox */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>

            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <video
                src={
                  selectedVideo.video?.startsWith("/uploads")
                    ? `http://localhost:8000${selectedVideo.video}`
                    : selectedVideo.video
                }
                controls
                autoPlay
                className="w-full rounded-2xl"
              />
            </div>

            {/* Video Title */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold">
                {selectedVideo.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}

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
      `}</style>
    </section>
  );
}
