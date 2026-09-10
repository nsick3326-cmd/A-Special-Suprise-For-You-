import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart } from 'lucide-react';
import { useEasterEgg } from '../context/EasterEggContext';
import { useSound } from '../context/SoundContext';

export const SecretModal = () => {
  const { activeSecret, closeSecret } = useEasterEgg();
  const { playPop } = useSound();

  if (!activeSecret) return null;

  const handleClose = () => {
    playPop();
    closeSecret();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md p-7 text-center glass-card rounded-3xl shadow-glass border-2 border-white bg-white/95 text-[#1F1A3A]"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-[#1F1A3A] hover:text-[#9FA1FF] transition-colors rounded-full hover:bg-black/5"
          >
            <X size={18} />
          </button>

          {/* Dynamic Heart Icon Badge */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#9FA1FF] via-[#FFAEE2] to-[#D9F9DF] text-3xl shadow-soft border border-white"
          >
            {activeSecret.icon || '✨'}
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 text-xs font-black rounded-full bg-[#D9F9DF] text-[#1F1A3A]">
            <Sparkles size={12} className="text-[#9FA1FF] animate-spin-slow" />
            Secret Easter Egg Unlocked
          </div>

          <h3 className="text-xl font-black text-[#1F1A3A] mb-2 font-handwriting text-3xl">
            {activeSecret.title}
          </h3>

          <p className="text-xs font-bold text-[#433D60] mb-6 leading-relaxed">
            {activeSecret.message}
          </p>

          <button
            onClick={handleClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#9FA1FF] hover:bg-[#8587FF] text-white font-black text-xs shadow-soft hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-white"
          >
            <Heart size={16} className="text-white fill-white" />
            Close & Keep Secret
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
