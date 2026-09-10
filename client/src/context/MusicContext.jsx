import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  const youtubeId = birthdayConfig?.youtubeId || "nzelzk2sVH8";
  const spotifyTrackId = birthdayConfig?.spotifyTrackId || "0Yf9Tgv5f55njDQeuRUnQH";
  const youtubeStartTime = birthdayConfig?.youtubeStartTime ?? 10;

  useEffect(() => {
    // Fallback HTML5 Audio stream
    const defaultTrack = birthdayConfig?.musicTracks?.[0];
    if (!audioRef.current && defaultTrack?.url) {
      audioRef.current = new Audio(defaultTrack.url);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
  }, []);

  const enableAudioAndPlay = () => {
    setAudioEnabled(true);
    setHasPrompted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.warn("Fallback audio:", err));
    }
  };

  const declineAudio = () => {
    setHasPrompted(true);
    setAudioEnabled(false);
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    } else {
      setIsPlaying(true);
      setAudioEnabled(true);
      if (audioRef.current) audioRef.current.play().catch((e) => console.warn(e));
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        togglePlay,
        youtubeId,
        spotifyTrackId,
        youtubeStartTime,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        hasPrompted,
        audioEnabled,
        enableAudioAndPlay,
        declineAudio,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    return {
      isPlaying: false,
      togglePlay: () => {},
      youtubeId: "nzelzk2sVH8",
      spotifyTrackId: "0Yf9Tgv5f55njDQeuRUnQH",
      youtubeStartTime: 10,
      volume: 0.4,
      setVolume: () => {},
      isMuted: false,
      toggleMute: () => {},
      hasPrompted: true,
      audioEnabled: false,
      enableAudioAndPlay: () => {},
      declineAudio: () => {},
    };
  }
  return context;
};
