import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Camera, Quote, X } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { PhotoCollage } from '../components/PhotoCollage';
import { birthdayConfig } from '../data/birthdayConfig';
import { useSound } from '../context/SoundContext';
import virtualHandHeartImg from '../assets/virtual_hand_heart.jpg';
import crochetBouquetImg from '../assets/crochet_bouquet.jpg';
import mehendiDarkColorImg from '../assets/mehendi_dark_color.jpg';
import handDrawnSketchImg from '../assets/hand_drawn_sketch.jpg';

export const MemoriesPage = () => {
  const navigate = useNavigate();
  const { playPop, playSuccess } = useSound();

  const [activeTab, setActiveTab] = useState('pics'); // 'pics' | 'chats'
  const [selectedPic, setSelectedPic] = useState(null);

  // Lock body scroll when photo zoom modal is active
  useEffect(() => {
    if (selectedPic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPic]);

  const memoriesHeader = birthdayConfig?.memoriesHeader || {};
  const title = memoriesHeader?.title || "All the Little Moments That Became Us";
  const subtitle = memoriesHeader?.subtitle || "For every night we stayed up talking, every laugh we shared from miles away, every ‘I miss you’ between calls, and every little moment that reminded us that distance was never stronger than us.";

  const rawFinalePhotos = birthdayConfig?.finale?.photos || [];
  const finalePhotos = rawFinalePhotos.map((p) => {
    let imgUrl = p.url;
    if (p.url === '/virtual_hand_heart.jpg') imgUrl = virtualHandHeartImg;
    if (p.url === '/crochet_bouquet.jpg') imgUrl = crochetBouquetImg;
    if (p.url === '/mehendi_dark_color.jpg') imgUrl = mehendiDarkColorImg;
    if (p.url === '/hand_drawn_sketch.jpg') imgUrl = handDrawnSketchImg;
    return { ...p, url: imgUrl };
  });

  const chatScreenshots = birthdayConfig?.chatScreenshots || [];

  return (
    <PageTransition>
      <div className="w-full text-center max-w-4xl mx-auto pt-16 sm:pt-20 pb-16 px-4">
        
        {/* Page Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-soft text-xs font-black text-[#1F1A3A] mb-3 font-comic">
          <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
          <span>Cosmic Memory Gallery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#1F1A3A] mb-3 tracking-tight drop-shadow-md font-comic">
          {title} ✨
        </h1>

        <p className="text-sm sm:text-base text-[#433D60] font-bold max-w-2xl mx-auto mb-6 leading-relaxed font-comic">
          {subtitle}
        </p>

        {/* Main Section Switcher Tabs (Pics & Chats) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => {
              playPop();
              setActiveTab('pics');
            }}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 border font-comic cursor-pointer ${
              activeTab === 'pics'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-soft-purple scale-105 border-white'
                : 'glass-pill text-[#433D60] hover:text-[#1F1A3A] hover:bg-white/80 border-white'
            }`}
          >
            <Camera size={16} />
            <span>Memory Polaroids 📸</span>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('chats');
            }}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 border font-comic cursor-pointer ${
              activeTab === 'chats'
                ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-soft-purple scale-105 border-white'
                : 'glass-pill text-[#433D60] hover:text-[#1F1A3A] hover:bg-white/80 border-white'
            }`}
          >
            <MessageCircle size={16} />
            <span>Our Beautiful Chats 💬</span>
          </button>
        </div>

        {/* --- TAB 1: MEMORY POLAROID COLLAGE SECTION --- */}
        {activeTab === 'pics' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-black text-pink-500 font-comic uppercase tracking-wider">
                📸 Precious Memories & Keepsakes
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F1A3A] font-comic mt-1">
                Our Memory Polaroid Gallery 💕
              </h2>
            </div>

            <PhotoCollage photos={finalePhotos} />
          </motion.div>
        )}

        {/* --- TAB 2: BEAUTIFUL CHAT SCREENSHOTS & MESSAGES SECTION --- */}
        {activeTab === 'chats' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-black text-purple-500 font-comic uppercase tracking-wider">
                💬 Unforgettable Conversations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F1A3A] font-comic mt-1">
                Our Beautiful Chat Memories 💕
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-left mb-10">
              {chatScreenshots.map((chat, idx) => (
                <motion.div
                  key={chat.id || idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-white shadow-soft relative overflow-hidden"
                >
                  {/* Tag Header */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-[10px] font-black font-comic">
                      {chat.tag}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {chat.time}
                    </span>
                  </div>

                  {/* Message Bubbles Showcase */}
                  <div className="flex flex-col gap-3 mb-4">
                    {chat.messages ? (
                      chat.messages.map((msg, mIdx) => (
                        <div
                          key={mIdx}
                          className={`max-w-[90%] sm:max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs whitespace-pre-line ${
                            msg.isSelf
                              ? 'self-end rounded-tr-sm bg-[#9FA1FF] text-white shadow-soft font-comic'
                              : 'self-start rounded-tl-sm bg-[#F0F2FF] text-[#1F1A3A] font-comic'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <p className={`text-[10px] font-black ${msg.isSelf ? 'text-pink-200' : 'text-[#9FA1FF]'}`}>
                              {msg.sender}
                            </p>
                            {msg.time && (
                              <span className={`text-[9px] font-bold opacity-75 ${msg.isSelf ? 'text-white' : 'text-gray-400'}`}>
                                {msg.time}
                              </span>
                            )}
                          </div>
                          <p className="leading-relaxed">{msg.text}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        {/* Incoming bubble */}
                        <div className="self-start max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-[#F0F2FF] text-[#1F1A3A] text-xs sm:text-sm font-bold shadow-xs font-comic">
                          <p className="text-[10px] text-[#9FA1FF] font-black mb-1">{chat.sender}</p>
                          <p>"{chat.text}"</p>
                        </div>

                        {/* Outgoing reply bubble */}
                        {chat.reply && (
                          <div className="self-end max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm bg-[#9FA1FF] text-white text-xs sm:text-sm font-bold shadow-soft font-comic">
                            <p className="text-[10px] text-pink-200 font-black mb-1">Calm_ 🩵💜</p>
                            <p>"{chat.reply}"</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Memory Note Box */}
                  <div className="p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-xs font-bold text-[#1F1A3A] flex items-start gap-2">
                    <Quote size={14} className="text-pink-400 shrink-0 mt-0.5" />
                    <p className="font-comic italic">
                      {chat.memoryText}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Section Navigation Button */}
        <div className="mt-8 flex flex-col items-center gap-3 pt-6 border-t border-white/40">
          <p className="text-xs text-[#1F1A3A] font-black font-comic">
            Ready for a challenge, star girl? 🎮
          </p>

          <button
            onClick={() => {
              playPop();
              navigate('/games');
            }}
            className="px-6 py-3 rounded-full bg-[#9FA1FF] text-white font-black text-sm shadow-soft-purple hover:scale-105 transition-all flex items-center gap-2 group border border-white/60 font-comic cursor-pointer"
          >
            <span>Play Birthday Mini-Games</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-white" />
          </button>
        </div>
      </div>

      {/* --- PHOTO ZOOM POPUP MODAL --- */}
      <AnimatePresence>
        {selectedPic && (
          <div
            onClick={() => setSelectedPic(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md sm:max-w-lg w-full rounded-3xl bg-white/95 backdrop-blur-2xl border-4 border-pink-300 shadow-2xl overflow-hidden my-auto"
            >
              {/* Sticky Close Button */}
              <button
                onClick={() => setSelectedPic(null)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/95 hover:bg-pink-100 text-gray-700 hover:text-pink-600 transition-colors shadow-md border border-pink-100 cursor-pointer"
                title="Close"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content */}
              <div className="max-h-[78vh] sm:max-h-[80vh] overflow-y-auto p-5 sm:p-7 pr-3 sm:pr-5 text-center custom-scrollbar">
                <div className="w-full max-h-[45vh] rounded-2xl overflow-hidden mb-4 shadow-lg bg-pink-50 flex items-center justify-center">
                  <img
                    src={selectedPic.image}
                    alt={selectedPic.title}
                    className="w-full h-full max-h-[45vh] object-cover"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#1F1A3A] font-comic mb-1">
                  {selectedPic.title}
                </h3>
                <p className="font-handwriting text-xl sm:text-2xl text-[#9FA1FF] mb-3">
                  "{selectedPic.caption}"
                </p>
                <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-100 text-xs sm:text-sm font-bold text-[#1F1A3A] font-comic leading-relaxed">
                  💌 {selectedPic.memoryText}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
};
