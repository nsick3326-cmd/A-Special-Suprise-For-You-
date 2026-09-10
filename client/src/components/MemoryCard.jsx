import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const MemoryCard = ({ memory, onSelect, index }) => {
  const { playPop } = useSound();

  // Subtle random rotation for Pinterest polaroid deck feel (-3 to +3 deg)
  const rotations = [-2.5, 1.5, -1.8, 2.2, -1.2, 2.8];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="relative group cursor-pointer"
      onClick={() => {
        playPop();
        onSelect(memory);
      }}
    >
      {/* Decorative Washi Tape Strip on Top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape-pink z-20 opacity-85 rotate-[-2deg] rounded-sm pointer-events-none flex items-center justify-center text-[9px] font-bold text-white tracking-widest">
        <span>MEMORIES 💕</span>
      </div>

      {/* Aesthetic Pinterest Polaroid Frame */}
      <div className="polaroid-card text-left relative">
        {/* Photo Container */}
        <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden mb-3 bg-[#AEE2FF]/30 shadow-inner">
          <img
            src={memory.image}
            alt={memory.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-white text-xs font-bold flex items-center gap-1">
              <Sparkles size={12} className="text-[#AEE2FF]" /> Open memory story
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#1F1A3A] shadow-soft">
            {memory.year}
          </div>
        </div>

        {/* Polaroid Handwritten Caption & Story Details */}
        <div className="px-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#9FA1FF] mb-1">
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {memory.date}
            </span>
            <Heart size={12} className="text-pink-400 fill-pink-300" />
          </div>

          <h3 className="text-lg font-bold font-handwriting text-[#1F1A3A] mb-1.5 leading-snug group-hover:text-[#9FA1FF] transition-colors text-xl">
            {memory.title}
          </h3>

          <p className="text-xs text-[#433D60] line-clamp-2 leading-relaxed mb-3 font-semibold">
            {memory.summary}
          </p>

          {memory.location && (
            <div className="flex items-center gap-1 text-[10px] text-[#1F1A3A] font-bold bg-[#D9F9DF] px-2 py-0.5 rounded-full w-fit">
              <MapPin size={10} className="text-[#9FA1FF]" />
              <span>{memory.location}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
