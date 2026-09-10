import React, { createContext, useContext, useState } from 'react';
import { soundFx } from '../utils/soundFx';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const triggerSound = (fnName) => {
    if (!soundEnabled) return;
    try {
      soundFx.init();
      if (typeof soundFx[fnName] === 'function') {
        soundFx[fnName]();
      }
    } catch (e) {
      console.warn("Sound FX error:", e);
    }
  };

  const playPop = () => triggerSound('playPop');
  const playFlip = () => triggerSound('playFlip');
  const playSuccess = () => triggerSound('playSuccess');
  const playSparkle = () => triggerSound('playSparkle');
  const playChime = () => triggerSound('playChime');

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        playPop,
        playFlip,
        playSuccess,
        playSparkle,
        playChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      soundEnabled: true,
      setSoundEnabled: () => {},
      playPop: () => {},
      playFlip: () => {},
      playSuccess: () => {},
      playSparkle: () => {},
      playChime: () => {},
    };
  }
  return context;
};
