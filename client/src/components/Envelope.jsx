import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Lock } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const Envelope = ({ isOpen, onOpen, recipientName = "Deepal" }) => {
  const { playFlip, playSparkle, playPop } = useSound();
  const [sealBroken, setSealBroken] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      playPop();
      playSparkle();
      setSealBroken(true);
      setTimeout(() => {
        playFlip();
        onOpen();
      }, 400);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 cursor-pointer" onClick={handleClick}>
      <motion.div
        animate={{ y: isOpen ? 10 : [0, -8, 0] }}
        transition={{
          y: isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
        className="relative aspect-[1.4/1] w-full glass-card rounded-3xl p-6 shadow-glass border-2 border-white/90 flex flex-col justify-between items-center text-center overflow-hidden group hover:shadow-glow-lavender transition-all bg-gradient-to-tr from-[#FFF9F2] via-[#F3E8FF] to-[#E0F2FE]"
      >
        {/* Envelope Top Flap */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#C8B6FF]/70 to-[#A0C4FF]/50 origin-top transition-transform duration-700 ease-in-out z-20 ${
            isOpen ? '-scale-y-100 opacity-20' : 'scale-y-100'
          }`}
          style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
        />

        {/* Wax Stamp Seal */}
        {!isOpen && (
          <motion.div
            animate={{ scale: sealBroken ? [1, 1.3, 0] : 1, opacity: sealBroken ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 flex flex-col items-center justify-center text-white shadow-glow-lavender border-2 border-white/80 group-hover:scale-110 transition-transform"
          >
            <Heart size={22} className="fill-white animate-pulse-soft" />
            <span className="text-[8px] font-black uppercase tracking-wider text-pink-100">WAX SEAL</span>
          </motion.div>
        )}

        {/* Envelope Label Header */}
        <div className="mt-8 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 text-xs font-bold rounded-full bg-purple-100/80 text-purple-900 shadow-soft">
            <Sparkles size={12} className="text-purple-600 animate-spin-slow" /> Sealed Love Note ✉️🌸
          </div>
          <h3 className="text-3xl font-bold text-deep font-handwriting text-4xl">
            For {recipientName}
          </h3>
        </div>

        {/* Bottom Action Prompt */}
        <div className="z-10 mb-2">
          {!isOpen ? (
            <span className="text-xs font-bold text-purple-700 underline underline-offset-4 animate-pulse">
              Tap wax seal to unseal & read 💌✨
            </span>
          ) : (
            <span className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
              Envelope Unsealed 🌸
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
