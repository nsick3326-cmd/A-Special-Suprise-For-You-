import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Quote, Heart, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const MemoryModal = ({ memory, onClose }) => {
  const { playPop } = useSound();

  if (!memory) return null;

  const handleClose = () => {
    playPop();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl my-8 overflow-hidden glass-card rounded-3xl shadow-glass border-2 border-white/90 p-6 sm:p-8 bg-white/95 text-[#1F1A3A]"
        >
          {/* Decorative Washi Tape Top Accent */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-pink opacity-80 rotate-[-1deg] rounded-sm pointer-events-none flex items-center justify-center text-[9px] font-bold text-white tracking-widest z-10">
            <span>OUR STORY 💕</span>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#1F1A3A] hover:text-[#9FA1FF] transition-colors bg-[#AEE2FF]/40 hover:bg-[#AEE2FF] rounded-full shadow-soft"
          >
            <X size={20} />
          </button>

          {/* Memory Polaroid Frame Image */}
          <div className="polaroid-card p-3 mb-6 bg-white shadow-md rounded-sm mt-4">
            <div className="relative w-full h-64 sm:h-80 rounded-sm overflow-hidden bg-[#AEE2FF]/30">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#9FA1FF] text-white px-3 py-0.5 rounded-full text-xs font-black shadow-soft">
                {memory.category}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-black text-[#1F1A3A] mb-3">
            <div className="flex items-center gap-1.5 bg-[#B5BAFF]/30 px-3 py-1 rounded-full border border-[#9FA1FF]/30">
              <Calendar size={13} className="text-[#9FA1FF]" />
              <span>{memory.date}</span>
            </div>

            {memory.location && (
              <div className="flex items-center gap-1.5 bg-[#D9F9DF] px-3 py-1 rounded-full text-[#1F1A3A]">
                <MapPin size={13} className="text-[#9FA1FF]" />
                <span>{memory.location}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold font-handwriting text-[#1F1A3A] mb-4 leading-tight">
            {memory.title}
          </h2>

          {/* Full Story */}
          <p className="text-sm sm:text-base text-[#433D60] leading-relaxed mb-6 font-semibold">
            {memory.story}
          </p>

          {/* Romantic Quote Banner */}
          {memory.quote && (
            <div className="p-4 rounded-2xl bg-[#AEE2FF]/30 border border-[#9FA1FF]/40 flex items-start gap-3">
              <Quote size={20} className="text-[#9FA1FF] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base font-bold font-handwriting text-[#1F1A3A]">
                "{memory.quote}"
              </p>
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-6 pt-4 border-t border-[#AEE2FF] flex items-center justify-between text-xs text-[#433D60]">
            <span className="flex items-center gap-1 font-bold">
              <Heart size={14} className="text-[#9FA1FF] fill-[#9FA1FF]" /> Memory #{memory.id}
            </span>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl bg-[#9FA1FF] text-white font-black text-xs hover:bg-[#8587FF] transition-colors shadow-soft"
            >
              Back to Timeline
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
