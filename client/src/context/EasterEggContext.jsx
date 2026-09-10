import React, { createContext, useContext, useState, useEffect } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { soundFx } from '../utils/soundFx';

const EasterEggContext = createContext(null);

export const EasterEggProvider = ({ children }) => {
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [activeSecret, setActiveSecret] = useState(null);
  const [keySequence, setKeySequence] = useState('');

  // Easter Egg 1: Logo 5 Taps
  const handleLogoClick = () => {
    try {
      soundFx.playPop();
    } catch (e) {}
    const newCount = logoTapCount + 1;
    setLogoTapCount(newCount);
    if (newCount >= 5) {
      try {
        soundFx.playSuccess();
      } catch (e) {}
      setActiveSecret({
        title: "SECRET #1 UNLOCKED! 💖",
        message: birthdayConfig?.easterEggs?.logoTapMessage || "You are the queen of my heart! 👑💖",
        icon: "👑"
      });
      setLogoTapCount(0);
    }
  };

  // Easter Egg 2: Typing "love" on keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e?.target?.tagName)) return;

      const newSeq = (keySequence + (e?.key || '').toLowerCase()).slice(-4);
      setKeySequence(newSeq);

      if (newSeq === 'love') {
        try {
          soundFx.playSparkle();
        } catch (e) {}
        setActiveSecret({
          title: "SECRET #2 UNLOCKED! 💌",
          message: birthdayConfig?.easterEggs?.typeLoveMessage || "Every day with you is pure magic! 💌✨",
          icon: "💖"
        });
        setKeySequence('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  // Easter Egg 3: Hidden Star Click
  const handleStarClick = () => {
    try {
      soundFx.playChime();
    } catch (e) {}
    setActiveSecret({
      title: "SECRET #3 UNLOCKED! ✨",
      message: birthdayConfig?.easterEggs?.starClickMessage || "Make a birthday wish right now... it will come true! ⭐🎂",
      icon: "⭐"
    });
  };

  const closeSecret = () => {
    setActiveSecret(null);
  };

  return (
    <EasterEggContext.Provider
      value={{
        handleLogoClick,
        handleStarClick,
        activeSecret,
        closeSecret,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    return {
      handleLogoClick: () => {},
      handleStarClick: () => {},
      activeSecret: null,
      closeSecret: () => {},
    };
  }
  return context;
};
