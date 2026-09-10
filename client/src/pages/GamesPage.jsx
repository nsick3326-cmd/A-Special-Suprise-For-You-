import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Heart, CheckCircle2, RotateCcw, ArrowRight, Unlock } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard } from '../components/GlassCard';
import { birthdayConfig } from '../data/birthdayConfig';
import { useSound } from '../context/SoundContext';
import { api } from '../utils/api';
import confetti from 'canvas-confetti';

export const GamesPage = () => {
  const navigate = useNavigate();
  const { playPop, playSuccess, playFlip, playSparkle } = useSound();

  const [activeTab, setActiveTab] = useState('quiz');
  const [completedGames, setCompletedGames] = useState({
    quiz: false,
    catchHeart: false,
    puzzle: false,
  });

  // Game 1: Quiz State
  const quizData = birthdayConfig.games.quiz;
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Game 2: Catch Butterflies & Hearts State
  const catchData = birthdayConfig.games.catchHeart;
  const [heartScore, setHeartScore] = useState(0);
  const [heartPos, setHeartPos] = useState({ top: 40, left: 40 });
  const [targetSymbol, setTargetSymbol] = useState('💖');
  const [heartTimeLeft, setHeartTimeLeft] = useState(20);
  const [heartActive, setHeartActive] = useState(false);
  const [heartFinished, setHeartFinished] = useState(false);

  // Game 3: Memory Matching Puzzle State
  const puzzleData = birthdayConfig.games.puzzle;
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [puzzleFinished, setPuzzleFinished] = useState(false);

  // Init Puzzle Cards
  useEffect(() => {
    const doubleCards = [...puzzleData.cards, ...puzzleData.cards].map((item, idx) => ({
      ...item,
      uniqueId: `${item.id}-${idx}`,
    }));
    const shuffled = doubleCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Catch Heart Timer
  useEffect(() => {
    let timer;
    if (heartActive && heartTimeLeft > 0) {
      timer = setInterval(() => {
        setHeartTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (heartTimeLeft === 0 && heartActive) {
      setHeartActive(false);
      setHeartFinished(true);
      playSuccess();
      markCompleted('catchHeart');
      api.saveGameResult('Catch The Flying Hearts', heartScore);
    }
    return () => clearInterval(timer);
  }, [heartActive, heartTimeLeft]);

  const markCompleted = (gameKey) => {
    setCompletedGames((prev) => {
      const updated = { ...prev, [gameKey]: true };
      if (Object.values(updated).some(Boolean)) {
        playSparkle();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  // Quiz Handler
  const handleQuizAnswer = (optIdx) => {
    if (quizSelected !== null) return;
    setQuizSelected(optIdx);
    playPop();
    const currentQ = quizData.questions[quizIdx];
    if (optIdx === currentQ.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (quizIdx < quizData.questions.length - 1) {
        setQuizIdx((prev) => prev + 1);
        setQuizSelected(null);
      } else {
        setQuizFinished(true);
        playSuccess();
        markCompleted('quiz');
        api.saveGameResult('Quiz', quizScore + (optIdx === currentQ.correctIndex ? 1 : 0));
      }
    }, 1200);
  };

  // Catch Heart/Butterfly Tap
  const handleTargetTap = () => {
    if (!heartActive) return;
    playPop();
    setHeartScore((prev) => prev + 1);
    const symbols = ['💖', '🦋', '🌸', '✨'];
    setTargetSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    const nextTop = Math.floor(Math.random() * 65) + 12;
    const nextLeft = Math.floor(Math.random() * 65) + 12;
    setHeartPos({ top: nextTop, left: nextLeft });
  };

  const startCatchHeart = () => {
    playSparkle();
    setHeartScore(0);
    setHeartTimeLeft(20);
    setHeartFinished(false);
    setHeartActive(true);
  };

  // Card Flip Handler
  const handleCardClick = (card, index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedPairs.includes(card.id) ||
      puzzleFinished
    ) return;

    playFlip();
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        playPop();
        setMatchedPairs((prev) => {
          const updated = [...prev, firstCard.id];
          if (updated.length === puzzleData.cards.length) {
            setPuzzleFinished(true);
            playSuccess();
            markCompleted('puzzle');
            api.saveGameResult('Memory Puzzle', updated.length);
          }
          return updated;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  const anyCompleted = Object.values(completedGames).some(Boolean);

  return (
    <PageTransition>
      <div className="w-full text-center max-w-4xl mx-auto py-4 px-4">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-glass text-xs font-extrabold text-purple-900 mb-3 font-comic">
          <Trophy size={14} className="text-amber-500" />
          <span>Mini-Games & Birthday Secrets 🎮✨</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-deep mb-2 tracking-tight font-comic">
          {birthdayConfig.games.title} 👀
        </h1>
        
        <p className="text-xs sm:text-sm text-purple-900/80 font-medium mb-6 font-comic">
          {birthdayConfig.games.subtitle}
        </p>

        {/* Tab Selection (3 Games Only) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'quiz', label: '1. Memory Quiz', icon: '🧠', completed: completedGames.quiz },
            { id: 'catch', label: '2. Catch Butterflies', icon: '🦋', completed: completedGames.catchHeart },
            { id: 'puzzle', label: '3. Memory Match', icon: '🧩', completed: completedGames.puzzle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playPop();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft font-comic cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-950 text-white scale-105 shadow-md'
                  : 'glass-pill text-deep-muted hover:text-deep hover:bg-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.completed && <CheckCircle2 size={12} className="text-emerald-400 fill-emerald-100" />}
            </button>
          ))}
        </div>

        {/* GAME CONTENT CONTAINER */}
        <div className="min-h-[420px] flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            
            {/* GAME 1: QUIZ */}
            {activeTab === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="w-full max-w-xl mx-auto">
                <GlassCard hover={false} className="p-6 sm:p-8 text-left border-2 border-white">
                  {!quizFinished ? (
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-purple-700 mb-4 font-comic">
                        <span>Question {quizIdx + 1} of {quizData.questions.length}</span>
                        <span>Score: {quizScore}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-deep mb-6 font-comic">
                        {quizData.questions[quizIdx].question}
                      </h3>

                      <div className="flex flex-col gap-3">
                        {quizData.questions[quizIdx].options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizAnswer(optIdx)}
                            disabled={quizSelected !== null}
                            className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-semibold text-left transition-all border font-comic cursor-pointer ${
                              quizSelected === optIdx
                                ? optIdx === quizData.questions[quizIdx].correctIndex
                                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-soft font-bold'
                                  : 'bg-rose-100 border-rose-300 text-rose-900'
                                : 'bg-white/80 hover:bg-white border-white text-deep hover:shadow-soft'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {quizSelected !== null && (
                        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-xs font-bold text-purple-900 bg-purple-100/70 p-3 rounded-xl border border-purple-200 font-comic">
                          💬 {quizData.questions[quizIdx].comment}
                        </motion.p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#C8B6FF] to-[#A0C4FF] flex items-center justify-center text-3xl shadow-glow-lavender">
                        🏆
                      </div>
                      <h3 className="text-2xl font-extrabold text-deep mb-2 font-comic">
                        Quiz Completed!
                      </h3>
                      <p className="text-sm font-extrabold text-purple-800 mb-4 font-comic">
                        Your Score: {quizScore} / {quizData.questions.length}
                      </p>
                      <p className="text-xs text-deep-muted leading-relaxed mb-6 font-bold font-comic">
                        {quizScore >= 3
                          ? "Okay... you actually know me so well. 😭❤️"
                          : "Hey, you still get 100% for being cute! ❤️"}
                      </p>
                      <button
                        onClick={() => {
                          setQuizIdx(0);
                          setQuizScore(0);
                          setQuizSelected(null);
                          setQuizFinished(false);
                        }}
                        className="px-5 py-2.5 rounded-full bg-white text-deep font-bold text-xs border border-gray-200 hover:bg-gray-50 flex items-center gap-1.5 mx-auto font-comic cursor-pointer"
                      >
                        <RotateCcw size={12} /> Play Quiz Again
                      </button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {/* GAME 2: CATCH BUTTERFLIES & HEARTS */}
            {activeTab === 'catch' && (
              <motion.div key="catch" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="w-full max-w-xl mx-auto">
                <GlassCard hover={false} className="p-6 sm:p-8 text-center border-2 border-white">
                  <h3 className="text-xl font-bold text-deep mb-1 font-comic">
                    {catchData.title}
                  </h3>
                  <p className="text-xs text-deep-muted mb-4 font-comic">
                    {catchData.description}
                  </p>

                  {!heartActive && !heartFinished && (
                    <div className="py-12">
                      <button
                        onClick={startCatchHeart}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-sky-400 text-white font-black text-base shadow-glow-lavender hover:scale-105 transition-all flex items-center gap-2 mx-auto font-comic cursor-pointer"
                      >
                        <Heart size={20} className="fill-white" /> Start Catching!
                      </button>
                    </div>
                  )}

                  {heartActive && (
                    <div className="relative w-full h-72 rounded-2xl bg-white/50 border border-white/90 overflow-hidden shadow-inner flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between text-xs font-black text-deep font-comic">
                        <span>Timer: {heartTimeLeft}s ⏱️</span>
                        <span>Score: {heartScore} 💖</span>
                      </div>

                      {/* Random Target Symbol */}
                      <button
                        onClick={handleTargetTap}
                        style={{ top: `${heartPos.top}%`, left: `${heartPos.left}%` }}
                        className="absolute p-3 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 text-white shadow-glow-lavender animate-bounce-soft transition-all duration-200 text-2xl transform active:scale-125 cursor-pointer"
                      >
                        {targetSymbol}
                      </button>
                    </div>
                  )}

                  {heartFinished && (
                    <div className="py-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Heart size={32} className="fill-purple-400" />
                      </div>
                      <h4 className="text-xl font-extrabold text-deep mb-2 font-comic">
                        You caught {heartScore} items! 🎯
                      </h4>
                      <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs sm:text-sm text-purple-900 leading-relaxed max-w-md mx-auto mb-6 font-semibold font-comic">
                        <p className="mb-1 font-semibold">{catchData.winQuotes[1]}</p>
                        <p className="font-extrabold text-pink-600 text-base">{catchData.winQuotes[2]}</p>
                      </div>
                      <button
                        onClick={startCatchHeart}
                        className="px-5 py-2.5 rounded-full bg-white text-deep font-bold text-xs border border-gray-200 hover:bg-gray-50 flex items-center gap-1.5 mx-auto font-comic cursor-pointer"
                      >
                        <RotateCcw size={12} /> Play Again
                      </button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {/* GAME 3: MEMORY MATCH */}
            {activeTab === 'puzzle' && (
              <motion.div key="puzzle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="w-full max-w-xl mx-auto">
                <GlassCard hover={false} className="p-6 sm:p-8 text-center border-2 border-white">
                  <h3 className="text-xl font-bold text-deep mb-1 font-comic">
                    {puzzleData.title}
                  </h3>
                  <p className="text-xs text-deep-muted mb-6 font-comic">
                    {puzzleData.description}
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                    {cards.map((card, idx) => {
                      const isFlipped = flippedCards.includes(idx) || matchedPairs.includes(card.id);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleCardClick(card, idx)}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform active:scale-95 shadow-soft border ${
                            isFlipped
                              ? 'bg-white border-purple-300 scale-100'
                              : 'bg-gradient-to-tr from-[#C8B6FF] to-[#A0C4FF] border-white hover:scale-105'
                          }`}
                        >
                          {isFlipped ? (
                            <div className="animate-pulse-soft">
                              <span className="text-2xl mb-1">{card.icon}</span>
                              <span className="text-[10px] font-extrabold text-deep block truncate max-w-[60px] font-comic">
                                {card.label}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl">🌸</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {puzzleFinished && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold font-comic">
                      ✨ {puzzleData.hiddenMessage}
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* SECRET UNLOCKED BANNER */}
        {anyCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-[#C8B6FF] via-[#A0C4FF] to-[#D8F3DC] border-2 border-white shadow-glass text-center flex flex-col items-center gap-3 max-w-xl mx-auto font-comic mb-8"
          >
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-purple-950 uppercase">
              <Unlock size={16} className="text-purple-700" />
              <span>{birthdayConfig.games.completionMessage}</span>
            </div>

            <p className="text-sm font-extrabold text-purple-950 max-w-md">
              {birthdayConfig.games.completionSubtitle}
            </p>

            <button
              onClick={() => {
                playSparkle();
                navigate('/letter');
              }}
              className="px-8 py-3.5 rounded-full bg-purple-950 text-white font-black text-sm shadow-soft hover:bg-black transition-all flex items-center gap-2 group mt-2 cursor-pointer font-comic"
            >
              <span>{birthdayConfig.games.completionButton}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Next Section Navigation Button */}
        <div className="mt-8 flex flex-col items-center gap-3 pt-6 border-t border-white/40">
          <p className="text-xs text-[#1F1A3A] font-black font-comic">
            Ready to read your special birthday letter, star girl? 💌
          </p>

          <button
            onClick={() => {
              playPop();
              navigate('/letter');
            }}
            className="px-6 py-3 rounded-full bg-[#9FA1FF] text-white font-black text-sm shadow-soft-purple hover:scale-105 transition-all flex items-center gap-2 group border border-white/60 font-comic cursor-pointer"
          >
            <span>Read Your Birthday Letter</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-white" />
          </button>
        </div>

      </div>
    </PageTransition>
  );
};
