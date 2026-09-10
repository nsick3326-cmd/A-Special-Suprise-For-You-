import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Envelope } from '../components/Envelope';
import { GlassCard } from '../components/GlassCard';
import { birthdayConfig } from '../data/birthdayConfig';
import { useSound } from '../context/SoundContext';

export const LetterPage = () => {
  const navigate = useNavigate();
  const { playPop, playSparkle } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const { letter, recipientName } = birthdayConfig;
  const paragraphs = letter.paragraphs || [];

  // Helper to parse **bold** and *italic* markdown tags
  const renderFormattedParagraph = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-black text-[#1F1A3A] tracking-wide">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic font-semibold text-[#3B3355]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  // Typewriter effect logic
  useEffect(() => {
    if (isOpen && typewriterIndex < paragraphs.length) {
      const timer = setTimeout(() => {
        setTypewriterIndex((prev) => prev + 1);
        playPop();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, typewriterIndex, paragraphs.length]);

  return (
    <PageTransition>
      <div className="w-full text-center max-w-2xl mx-auto py-6 px-4">
        
        {/* Page Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-soft text-xs font-black text-[#1F1A3A] mb-3 font-comic">
          <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
          <span>From My Heart</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#1F1A3A] mb-2 tracking-tight drop-shadow-md font-comic">
          A Letter For You 💌
        </h1>

        <p className="text-sm sm:text-base text-[#433D60] font-bold mb-6 font-comic">
          Words I couldn't say out loud.
        </p>

        {/* 3D Interactive Envelope with Wax Seal */}
        <Envelope
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          recipientName={recipientName}
        />

        {/* Unfolded Handwritten Letter with Clear Parchment Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-left"
            >
              <GlassCard hover={false} className="p-6 sm:p-10 bg-[#FFF9F2] text-[#25233A] border-2 border-white shadow-2xl rounded-3xl">
                
                {/* Letter Salutation */}
                <h3 className="text-3xl sm:text-4xl font-bold font-handwriting text-purple-950 mb-6">
                  {letter.salutation}
                </h3>

                {/* Paragraphs with Staggered Typewriter Reveal */}
                <div
                  onClick={() => setTypewriterIndex(paragraphs.length)}
                  className="space-y-4 text-purple-950 font-sans text-sm sm:text-base leading-relaxed font-semibold cursor-pointer"
                  title="Click to reveal full letter"
                >
                  {paragraphs.slice(0, typewriterIndex).map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="whitespace-pre-line"
                    >
                      {renderFormattedParagraph(p)}
                    </motion.p>
                  ))}
                </div>

                {/* Closing & Signature */}
                {typewriterIndex >= paragraphs.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-purple-200"
                  >
                    <p className="text-xs font-bold text-purple-800 mb-1 font-comic">
                      {letter.closing}
                    </p>
                    <p className="text-3xl font-bold font-handwriting text-purple-950">
                      {letter.signature}
                    </p>
                  </motion.div>
                )}

                {/* Next Section Action Button */}
                {typewriterIndex >= paragraphs.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex justify-end font-comic"
                  >
                    <button
                      onClick={() => {
                        playSparkle();
                        navigate('/finale');
                      }}
                      className="px-6 py-3 rounded-full bg-purple-950 text-white font-black text-xs sm:text-sm shadow-soft hover:bg-black hover:scale-105 transition-all flex items-center justify-center gap-2 group shrink-0 cursor-pointer font-comic"
                    >
                      <span>{letter.nextButtonText}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Section Navigation Button */}
        <div className="mt-8 flex flex-col items-center gap-3 pt-6 border-t border-white/40">
          <p className="text-xs sm:text-sm text-[#1F1A3A] font-black font-comic drop-shadow-sm">
            Ready for the grand finale, star girl? ✨
          </p>

          <button
            onClick={() => {
              playPop();
              navigate('/finale');
            }}
            className="px-6 py-3 rounded-full bg-[#9FA1FF] text-white font-black text-sm shadow-soft-purple hover:scale-105 transition-all flex items-center gap-2 group border border-white/60 font-comic cursor-pointer"
          >
            <span>Grand Birthday Finale</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-white" />
          </button>
        </div>

      </div>
    </PageTransition>
  );
};
