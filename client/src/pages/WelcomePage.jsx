import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Quote, Flower2, Gift, X, PartyPopper } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { birthdayConfig } from '../data/birthdayConfig';
import { useSound } from '../context/SoundContext';
import confetti from 'canvas-confetti';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { playPop, playSuccess, playSparkle } = useSound();
  const [stepIndex, setStepIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const welcome = birthdayConfig?.welcome || {};
  const recipientName = birthdayConfig?.recipientName || 'Deepal';
  const messages = welcome?.introMessages || [
    "Because you are the main character of my universe."
  ];

  const loveQuotes = [
    "“You are my favorite star in the entire universe.” ✨",
    "“In a sky full of stars, you are my favorite constellation.” 🌌",
    "“With you, ordinary days turn into extraordinary fairytales.” 🌸",
    "“You bring lavender skies and sunshine into my life.” 💖"
  ];
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  useEffect(() => {
    if (stepIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
        playPop();
      }, 1600);
      return () => clearTimeout(timer);
    } else if (stepIndex === messages.length - 1) {
      playSuccess();
    }
  }, [stepIndex, messages.length]);

  const handleOpenPopup = () => {
    playSuccess();
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF9EAA', '#9FA1FF', '#B5BAFF', '#AEE2FF', '#FFE66D']
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
    setShowPopup(true);
  };

  const handleEnterClick = () => {
    playSparkle();
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#9FA1FF', '#B5BAFF', '#AEE2FF', '#D9F9DF']
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
    setTimeout(() => {
      navigate('/memories');
    }, 400);
  };

  const handleQuoteClick = () => {
    playPop();
    setActiveQuoteIdx((prev) => (prev + 1) % loveQuotes.length);
  };

  return (
    <PageTransition>
      {/* Container with minimal top spacing sitting directly below the fixed navbar */}
      <div className="w-full min-h-screen pt-14 sm:pt-16 pb-8 px-4 flex flex-col items-center justify-start text-center relative z-10">
        
        {/* Top Aesthetic Badge & Pop-up Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white shadow-soft text-xs font-black text-[#1F1A3A] font-comic"
          >
            <Flower2 size={14} className="text-[#9FA1FF] animate-spin-slow" />
            <span>{welcome?.badge || "Cosmic Birthday Stardust 💫✨"}</span>
          </motion.div>

          <motion.button
            onClick={handleOpenPopup}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white shadow-soft text-xs font-black font-comic hover:shadow-lg transition-all animate-bounce-soft cursor-pointer border border-white"
          >
            <Gift size={14} className="animate-pulse text-amber-200" />
            <span>Open Birthday Surprise! 🎁</span>
          </motion.button>
        </div>

        {/* Center Hero Column */}
        <div className="flex flex-col items-center text-center max-w-3xl w-full mb-2">
          
          {/* Animated Main Header Message with Elastic Pop */}
          <div className="flex items-center justify-center w-full mb-2 px-2">
            <AnimatePresence mode="wait">
              {messages[stepIndex] && (
                <motion.h1
                  key={stepIndex}
                  initial={{ opacity: 0, scale: 0.7, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1F1A3A] leading-tight font-comic tracking-tight drop-shadow-sm"
                >
                  {messages[stepIndex]}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Birthday Title & Name Reveal */}
          {stepIndex >= messages.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center w-full"
            >
              {/* Subheader */}
              <div className="flex items-center gap-2 text-[#9FA1FF] mb-2 font-mono-cyber">
                <Heart size={16} className="fill-pink-400 text-pink-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-[#1F1A3A] font-comic">
                  {welcome?.birthdayTitle || "HAPPY BIRTHDAY"}
                </span>
                <Heart size={16} className="fill-pink-400 text-pink-400 animate-pulse" />
              </div>

              {/* Recipient Name */}
              <h2 className="text-5xl sm:text-7xl font-black gradient-text-primary tracking-tight mb-3 drop-shadow-md font-comic">
                {recipientName} <span className="text-[#9FA1FF] inline-block animate-bounce-soft">✨</span>
              </h2>
            </motion.div>
          )}

        </div>

        {/* Interactive Quote Card & Action Buttons */}
        {stepIndex >= messages.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 }}
            className="flex flex-col items-center w-full max-w-md gap-4"
          >
            {/* Quote Card */}
            <motion.div
              onClick={handleQuoteClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-4 sm:p-5 rounded-2xl glass-card w-full cursor-pointer border-2 border-white shadow-soft flex items-start gap-3.5 text-left bg-white/95"
            >
              <Quote size={20} className="text-[#9FA1FF] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold font-handwriting text-[#1F1A3A] text-lg sm:text-xl leading-snug">
                  {loveQuotes[activeQuoteIdx]}
                </p>
                <span className="text-[10px] font-black text-[#433D60] block mt-1.5 font-comic">
                  (Tap card for another love note 💌)
                </span>
              </div>
            </motion.div>

            {/* Enter Button & Surprise Action */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                onClick={handleEnterClick}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-9 py-4 rounded-full bg-[#9FA1FF] text-white font-black text-base sm:text-lg shadow-soft-purple hover:bg-[#8587FF] transition-all duration-300 flex items-center gap-3 border-2 border-white font-comic"
              >
                <span>{welcome?.buttonText || "Enter Our Galaxy ✨"}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform text-white" />
              </motion.button>

              {/* Tagline */}
              <p className="text-xs text-[#433D60] font-black italic animate-pulse font-comic">
                💡 {welcome?.tagline || "Move your cursor... shooting stars & cosmic galaxy magic everywhere"}
              </p>
            </div>
          </motion.div>
        )}

        {/* --- SURPRISE POPUP MODAL --- */}
        <AnimatePresence>
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-2xl border-4 border-[#9FA1FF] shadow-2xl text-center overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Animated Gift Icon Header */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-soft animate-bounce-soft">
                  <PartyPopper size={32} />
                </div>

                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-black font-comic tracking-wider uppercase inline-block mb-2">
                  Special Secret Note 💌
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1F1A3A] font-comic mb-3">
                  Happy Birthday, {recipientName}! 👑🎂
                </h3>

                <div className="p-4 rounded-2xl bg-[#AEE2FF]/20 border border-[#9FA1FF]/40 mb-6 text-left">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#1F1A3A] leading-relaxed mb-2">
                    "You are the brightest star in my entire sky, Deepal. This whole website was built line by line, just for you, to bring a smile to your face on your special day."
                  </p>
                  <p className="text-right text-xs font-black text-[#9FA1FF] font-comic">
                    — Crafted with endless love ✨
                  </p>
                </div>

                {/* Popup Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      playSuccess();
                      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-pink-400 hover:bg-pink-500 text-white font-black text-xs sm:text-sm font-comic transition-all flex items-center justify-center gap-2 shadow-soft"
                  >
                    <Sparkles size={16} />
                    <span>Sparkle Me Again! 🎉</span>
                  </button>

                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#9FA1FF] hover:bg-[#8587FF] text-white font-black text-xs sm:text-sm font-comic transition-all flex items-center justify-center gap-2 shadow-soft"
                  >
                    <span>Explore Galaxy ✨</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};
