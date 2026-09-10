import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, VolumeX, Heart, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useSound } from '../context/SoundContext';

export const AudioPermissionModal = () => {
  const { hasPrompted, enableAudioAndPlay, declineAudio } = useMusic();
  const { playSparkle, playPop } = useSound();

  if (hasPrompted) return null;

  const handleAccept = () => {
    playSparkle();
    enableAudioAndPlay();
  };

  const handleDecline = () => {
    playPop();
    declineAudio();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/65 backdrop-blur-xl">
        
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
              <linearGradient id="heartFillGradModal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#FFF0F6" />
                <stop offset="70%" stopColor="#F3E8FF" />
                <stop offset="100%" stopColor="#FFE4EC" />
              </linearGradient>

              {/* Glowing Vibrant Border Gradient */}
              <linearGradient id="heartBorderGradModal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7EAE" />
                <stop offset="50%" stopColor="#9FA1FF" />
                <stop offset="100%" stopColor="#FFAEE2" />
              </linearGradient>

              {/* Inner Soft Glow Filter */}
              <filter id="innerGlowModal" x1="-20%" y1="-20%" width="140%" height="140%">
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
              fill="url(#heartFillGradModal)"
              stroke="url(#heartBorderGradModal)"
              strokeWidth="10"
              strokeLinejoin="round"
              filter="url(#innerGlowModal)"
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
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#FF7EAE] via-[#9FA1FF] to-[#FFAEE2] flex items-center justify-center text-white mb-2 shadow-soft-purple border-2 border-white animate-pulse-soft">
              <Heart size={28} className="fill-white text-white drop-shadow-md" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-black text-[#1F1A3A] mb-1 leading-tight flex items-center justify-center gap-1.5">
              <Music size={18} className="text-[#FF7EAE]" />
              <span>Play "Tenu Sang Rakhna"?</span>
            </h3>

            {/* Subtitle */}
            <p className="text-[10px] sm:text-xs font-bold text-[#433D60] mb-4 leading-relaxed px-1">
              Enhance your birthday galaxy experience with romantic soundtrack ambience on loop & stardust sound FX.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 w-full">
              {/* Primary Action Button */}
              <button
                onClick={handleAccept}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF7EAE] via-[#9FA1FF] to-[#FFAEE2] text-white font-black text-xs shadow-soft-purple hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border-2 border-white"
              >
                <Sparkles size={14} className="text-white" />
                <span>Play soundtrack ✨</span>
              </button>

              {/* Secondary Action Button */}
              <button
                onClick={handleDecline}
                className="w-full py-2.5 px-4 rounded-2xl bg-white/90 hover:bg-white text-[#1F1A3A] font-black text-xs transition-all flex items-center justify-center gap-1.5 border-2 border-[#9FA1FF]/40 shadow-sm"
              >
                <VolumeX size={13} className="text-[#1F1A3A]" />
                <span>Continue quietly</span>
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
