import React from 'react';
import { motion } from 'framer-motion';

export const HeartBoxContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      animate={{
        scale: [0.97, 1.04, 0.97],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 2.2,
        ease: 'easeInOut',
      }}
      className={`relative w-[340px] sm:w-[420px] h-[400px] sm:h-[460px] flex items-center justify-center filter drop-shadow-2xl ${className}`}
    >
      {/* SVG Real Heart Shaped Box Container */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="heartBoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="50%" stopColor="#F8F9FF" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#F0F2FD" stopOpacity="0.98" />
          </linearGradient>
          <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#9FA1FF" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Heart Path */}
        <path
          d="M 250 90 C 250 90 200 20 120 20 C 50 20 10 80 10 160 C 10 250 120 340 250 460 C 380 340 490 250 490 160 C 490 80 450 20 380 20 C 300 20 250 90 250 90 Z"
          fill="url(#heartBoxGradient)"
          stroke="#9FA1FF"
          strokeWidth="6"
          filter="url(#heartGlow)"
        />
      </svg>

      {/* Content fitted inside Heart Center */}
      <div className="relative z-10 px-8 pt-10 pb-8 sm:pt-14 sm:pb-12 w-full text-center flex flex-col items-center justify-center max-w-[280px] sm:max-w-[340px]">
        {children}
      </div>
    </motion.div>
  );
};
