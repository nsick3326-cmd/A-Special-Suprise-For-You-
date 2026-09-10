import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#9FA1FF] via-[#B5BAFF] to-[#AEE2FF] text-[#1F1A3A] p-3">
      
      {/* Colorful Aesthetic Physical Heart-Shaped Container Box */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{
          scale: [0.97, 1.03, 0.97],
          opacity: 1,
          rotate: [0, 1.5, -1.5, 0],
        }}
        transition={{
          scale: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 4.8, ease: "easeInOut" },
          opacity: { duration: 0.4 },
        }}
        className="relative w-[340px] sm:w-[480px] h-[440px] sm:h-[500px] flex items-center justify-center filter drop-shadow-[0_20px_50px_rgba(255,126,174,0.45)]"
      >
        {/* SVG Colorful Detailed Heart Background Container Shape */}
        <svg
          viewBox="0 0 600 540"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Colorful Romantic Gradient Fill */}
            <linearGradient id="heartFillGradLoading" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFF0F6" />
              <stop offset="70%" stopColor="#F3E8FF" />
              <stop offset="100%" stopColor="#FFE4EC" />
            </linearGradient>

            {/* Glowing Vibrant Border Gradient */}
            <linearGradient id="heartBorderGradLoading" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7EAE" />
              <stop offset="50%" stopColor="#9FA1FF" />
              <stop offset="100%" stopColor="#FFAEE2" />
            </linearGradient>

            {/* Inner Soft Glow Filter */}
            <filter id="innerGlowLoading" x1="-20%" y1="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
              <feFlood floodColor="#FF7EAE" floodOpacity="0.25" />
              <feComposite in2="shadowDiff" operator="in" />
              <feComposite in2="SourceGraphic" operator="over" />
            </filter>
          </defs>

          {/* Heart Path */}
          <path
            d="M 300,105 C 300,105 230,12 140,12 C 50,12 0,82 0,172 C 0,295 140,395 300,528 C 460,395 600,295 600,172 C 600,82 550,12 460,12 C 370,12 300,105 300,105 Z"
            fill="url(#heartFillGradLoading)"
            stroke="url(#heartBorderGradLoading)"
            strokeWidth="10"
            strokeLinejoin="round"
            filter="url(#innerGlowLoading)"
          />

          {/* Aesthetic Stardust & Sparkle Detailing along the Heart Rim */}
          <circle cx="140" cy="24" r="5" fill="#FFAEE2" />
          <circle cx="460" cy="24" r="5" fill="#9FA1FF" />
          <circle cx="50" cy="120" r="4" fill="#FF7EAE" />
          <circle cx="550" cy="120" r="4" fill="#AEE2FF" />
          <circle cx="300" cy="515" r="6" fill="#FF7EAE" />
        </svg>

        {/* Floating Outer Sparkle Badges */}
        <div className="absolute top-2 right-4 sm:right-8 w-7 h-7 rounded-full bg-[#FFAEE2] text-white flex items-center justify-center text-xs shadow-md border-2 border-white animate-bounce-soft">
          💖
        </div>
        <div className="absolute top-2 left-4 sm:left-8 w-7 h-7 rounded-full bg-[#AEE2FF] text-[#1F1A3A] flex items-center justify-center text-xs shadow-md border-2 border-white animate-pulse">
          ✨
        </div>

        {/* Content Positioned Safely Inside the Heart Bounds */}
        <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] px-2 flex flex-col items-center justify-center text-center mt-2 sm:mt-4">
          
          {/* Top Glowing Heart Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#FF7EAE] via-[#9FA1FF] to-[#FFAEE2] flex items-center justify-center text-white mb-2 shadow-soft-purple border-2 border-white animate-bounce-soft">
            <Heart size={28} className="fill-white text-white drop-shadow-md" />
          </div>

          {/* Brand Tag */}
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#1F1A3A] mb-1.5 bg-[#D9F9DF] px-3.5 py-0.5 rounded-full border border-emerald-300 shadow-sm">
            <Sparkles size={12} className="animate-spin-slow text-[#9FA1FF]" />
            <span>{birthdayConfig?.brandName || 'MY UNIVERSE'}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black text-[#1F1A3A] mb-0.5 font-handwriting leading-tight">
            Launching your secret galaxy...
          </h3>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-xs font-black text-[#433D60] mb-4">
            Aligning stars, lavender stardust & surprises ✨
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#E0E4FF] overflow-hidden relative border-2 border-[#9FA1FF]/40 shadow-inner">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-[#FF7EAE] via-[#9FA1FF] to-[#FFAEE2] rounded-full shadow-soft"
            />
          </div>

        </div>

      </motion.div>
    </div>
  );
};
