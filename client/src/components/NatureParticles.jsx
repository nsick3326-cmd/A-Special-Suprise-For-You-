import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const NatureParticles = ({ count = 16 }) => {
  const [sparkles, setSparkles] = useState([]);
  const [clickBursts, setClickBursts] = useState([]);
  const lastMoveTimeRef = useRef(0);

  // Generate lightweight GPU hardware-accelerated space objects
  const elements = useMemo(() => {
    const items = ['🪐', '🌙', '✨', '💖', '⭐', '🌸'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      symbol: items[i % items.length],
      size: Math.random() * 16 + 14,
      left: Math.random() * 92 + 4,
      top: Math.random() * 92 + 4,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 4,
    }));
  }, [count]);

  // Ethereal Jellyfish Shaped Pop-Ups with Smooth Hardware-Accelerated Animations
  const jellyfishPopups = [
    { id: 1, text: "Happy Birthday Deepal 🌸", icon: "🎂", left: 8, top: 20, duration: 9, delay: 0 },
    { id: 2, text: "You are my favorite star 💖", icon: "✨", left: 74, top: 16, duration: 10, delay: 2.5 },
    { id: 3, text: "Forever & Always Yours 🌸", icon: "💕", left: 6, top: 72, duration: 9.5, delay: 5 },
    { id: 4, text: "Make a birthday wish 💫", icon: "🪄", left: 78, top: 66, duration: 11, delay: 1.2 },
    { id: 5, text: "You bring magic to my universe 🪐", icon: "👑", left: 40, top: 10, duration: 10.5, delay: 3.8 },
  ];

  // Throttled MouseMove (Max 1 update every 120ms to prevent React re-render lag)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMoveTimeRef.current > 120) {
        lastMoveTimeRef.current = now;
        const newSparkle = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          symbol: ['✨', '💖', '💫'][Math.floor(Math.random() * 3)],
          color: ['#C8B6FF', '#FFAEE2', '#9FA1FF'][Math.floor(Math.random() * 3)]
        };
        setSparkles((prev) => [...prev.slice(-6), newSparkle]);
      }
    };

    const handleClick = (e) => {
      const symbols = ['💖', '✨', '🌸', '💫'];
      const burstItems = symbols.map((sym, idx) => ({
        id: Date.now() + idx,
        x: e.clientX,
        y: e.clientY,
        symbol: sym,
        vx: (Math.random() - 0.5) * 80,
        vy: (Math.random() - 0.5) * 80,
      }));
      setClickBursts((prev) => [...prev.slice(-12), ...burstItems]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transform-gpu">
      
      {/* Lightweight Ambient Aurora Background Glows (GPU Accelerated) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C8B6FF]/30 rounded-full blur-3xl transform-gpu"></div>
      <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-[#FFAEE2]/25 rounded-full blur-3xl transform-gpu"></div>
      <div className="absolute -bottom-16 left-1/4 w-96 h-96 bg-[#A0C4FF]/25 rounded-full blur-3xl transform-gpu"></div>

      {/* Shooting Stars Streaks */}
      <div className="shooting-star top-10 right-20" style={{ animationDelay: '0s' }}></div>
      <div className="shooting-star top-1/3 right-1/3" style={{ animationDelay: '3s' }}></div>

      {/* Cosmic Floating Objects (Hardware Accelerated) */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: 0, opacity: 0.75 }}
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
          className="absolute select-none opacity-80 transform-gpu will-change-transform"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            fontSize: `${el.size}px`,
          }}
        >
          {el.symbol}
        </motion.div>
      ))}

      {/* REAL JELLYFISH-SHAPED POP-UPS WITH HARDWARE ACCELERATED FADE-IN & FADE-OUT */}
      {jellyfishPopups.map((jelly) => (
        <motion.div
          key={jelly.id}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{
            opacity: [0, 0.95, 0.95, 0],
            y: [30, -20, -70],
            scale: [0.8, 1.03, 1, 0.85],
          }}
          transition={{
            duration: jelly.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: jelly.delay,
          }}
          className="absolute hidden md:flex flex-col items-center select-none pointer-events-auto cursor-pointer group transform-gpu will-change-transform"
          style={{
            left: `${jelly.left}%`,
            top: `${jelly.top}%`,
          }}
        >
          {/* Jellyfish Translucent Umbrella Dome */}
          <div className="relative px-4 py-2 rounded-t-[28px] rounded-b-[16px] bg-white/95 backdrop-blur-sm border-2 border-white shadow-soft text-center flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <span className="text-xs">{jelly.icon}</span>
            <span className="text-xs font-black text-[#1F1A3A] font-handwriting text-sm tracking-wide">
              {jelly.text}
            </span>
          </div>

          {/* Jellyfish Wave Tentacles */}
          <div className="flex justify-around w-full px-4 -mt-0.5 opacity-80">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-4 bg-gradient-to-b from-[#FFAEE2] to-transparent rounded-full"
            />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
              className="w-1 h-5 bg-gradient-to-b from-[#9FA1FF] to-transparent rounded-full"
            />
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.4 }}
              className="w-1 h-4 bg-gradient-to-b from-[#A0C4FF] to-transparent rounded-full"
            />
          </div>
        </motion.div>
      ))}

      {/* Cursor Trail Sparkles (Throttled) */}
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0, y: sp.y - 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed pointer-events-none z-50 text-xs font-bold transform-gpu"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            color: sp.color,
          }}
        >
          {sp.symbol}
        </motion.div>
      ))}

      {/* Click Particle Explosion Bursts */}
      <AnimatePresence>
        {clickBursts.map((cb) => (
          <motion.div
            key={cb.id}
            initial={{ x: cb.x, y: cb.y, scale: 1, opacity: 1 }}
            animate={{
              x: cb.x + cb.vx,
              y: cb.y + cb.vy,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 text-xs transform-gpu"
          >
            {cb.symbol}
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
};
