"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

interface HeroSliderProps {
  slides: Slide[];
}

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Slide } from "../../../types";

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [slideStates, setSlideStates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/heroSlider")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setSlideStates(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slides:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="relative h-[90vh] min-h-150 w-full overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#FF9900] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-[#FF9900]/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!slideStates || slideStates.length === 0) {
    return (
      <div className="relative h-[90vh] min-h-150 w-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Slides Available
          </h3>
          <p className="text-white/60">Check back later for exciting offers!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[90vh] min-h-150 w-full group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={slideStates.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slideStates.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Background Image with Parallax Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-8000 group-hover:scale-100"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%), url(http://localhost:8000${slide.image})`,
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Animated Content */}
              <div className="relative h-full flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-4xl"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#FF9900]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#FF9900]/30">
                    <span className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"></span>
                    <span className="text-[#FF9900] text-sm font-semibold uppercase tracking-wider">
                      Limited Offer
                    </span>
                  </div>

                  {/* Title with Animation */}
                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
                  >
                    {slide.title?.split(" ").map((word: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="inline-block mr-2"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Description */}
                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-white/80 text-base sm:text-lg md:text-xl mb-8 max-w-2xl"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button className="group relative px-8 py-3 bg-linear-to-r from-[#FF9900] to-[#FF6B00] rounded-full font-semibold text-black overflow-hidden transition-all hover:shadow-2xl hover:scale-105">
                      <span className="relative z-10 flex items-center gap-2">
                        Shop Now
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-linear-to-r from-[#FF6B00] to-[#FF9900] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all hover:scale-105">
                      Learn More
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Slide Counter */}
              <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-mono">
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(slideStates.length).padStart(2, "0")}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {slideStates.length > 1 && (
        <>
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#FF9900] hover:scale-110 z-20">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#FF9900] hover:scale-110 z-20">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Custom Pagination Styles */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        :global(.swiper-pagination-bullet-active) {
          width: 30px;
          border-radius: 5px;
          background: #ff9900;
          opacity: 1;
        }
        :global(.swiper-pagination) {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
}
