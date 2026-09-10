import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const PhotoCollage = ({ photos = [] }) => {
  const { playPop } = useSound();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10 w-full">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: photo.rotation || 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
          onClick={() => playPop()}
          className="polaroid-card cursor-pointer group relative text-center p-3 pb-5"
        >
          {/* Decorative Washi Tape Strip */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-pink z-20 opacity-80 rotate-[-1deg] rounded-sm pointer-events-none"></div>

          {/* Photo frame */}
          <div className="aspect-[4/5] w-full rounded-sm overflow-hidden mb-3 bg-[#AEE2FF]/30 shadow-inner relative">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart size={14} className="fill-pink-400" />
            </div>
          </div>

          {/* Polaroid Handwritten Caption */}
          <p className="text-center font-handwriting text-xl sm:text-2xl font-bold text-[#1F1A3A] group-hover:text-[#9FA1FF] transition-colors leading-tight whitespace-pre-line">
            {photo.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
