import React from 'react';
import { motion } from 'framer-motion';

export const HollowLineHeartAnimation = () => {
  // 11 concentric line scales from outer to inner
  const lineScales = [
    1.0, 0.92, 0.84, 0.76, 0.68, 0.60, 0.52, 0.44, 0.36, 0.28, 0.20
  ];

  // Colors for each of the 11 lines matching exact palette
  const strokeColors = [
    '#9FA1FF', '#FFAEE2', '#B5BAFF', '#AEE2FF', '#D9F9DF',
    '#9FA1FF', '#FFAEE2', '#B5BAFF', '#AEE2FF', '#D9F9DF', '#9FA1FF'
  ];

  return (
    <motion.div
      animate={{
        scale: [0.97, 1.05, 0.97],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
      className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center filter drop-shadow-xl shrink-0"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id="lineHeartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#9FA1FF" floodOpacity="0.4" />
          </filter>
        </defs>

        {lineScales.map((scaleFactor, index) => {
          const color = strokeColors[index];
          const delayTime = index * 0.18; // Line 1 starts first, rest follow in sequence!

          return (
            <motion.path
              key={index}
              d="M 250 110 C 250 110 200 40 120 40 C 50 40 10 100 10 180 C 10 270 120 360 250 460 C 380 360 490 270 490 180 C 490 100 450 40 380 40 C 300 40 250 110 250 110 Z"
              fill="none" // Strictly Hollow as requested!
              stroke={color}
              strokeWidth={index === 0 ? "4" : "3"}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lineHeartGlow)"
              style={{
                transformOrigin: '250px 250px',
                transform: `scale(${scaleFactor})`,
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.8, delay: delayTime, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: delayTime }
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};
