import React from 'react';
import { NavLink } from 'react-router-dom';
import { Volume2, VolumeX, Music, Star } from 'lucide-react';
import { useEasterEgg } from '../context/EasterEggContext';
import { useMusic } from '../context/MusicContext';
import { useSound } from '../context/SoundContext';
import { birthdayConfig } from '../data/birthdayConfig';

export const Navbar = () => {
  const { handleLogoClick, handleStarClick } = useEasterEgg();
  const { isPlaying, togglePlay } = useMusic();
  const { soundEnabled, setSoundEnabled, playPop } = useSound();

  const navItems = [
    { label: 'Welcome', path: '/welcome' },
    { label: 'Memories', path: '/memories' },
    { label: 'Games', path: '/games' },
    { label: 'Letter', path: '/letter' },
    { label: 'Finale', path: '/finale' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 max-w-5xl mx-auto pointer-events-auto">
      <div className="glass-pill px-4 sm:px-6 py-3 rounded-full flex items-center justify-between shadow-glass-light border border-white/95 bg-white/90 backdrop-blur-2xl text-[#1F1A3A]">
        
        {/* Brand Logo with Beautiful Gradient & Cute Styling */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group cursor-pointer hover:scale-105 transition-transform"
          title="Secret Portal"
        >
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#FF7EAE] via-[#9FA1FF] to-[#AEE2FF] shadow-soft-purple">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-inner">
              {birthdayConfig?.brandIcon || '🪐'}
            </div>
          </div>
          <span className="font-comic font-black text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-[#FF7EAE] via-[#9FA1FF] to-[#5B48B9] bg-clip-text text-transparent drop-shadow-xs flex items-center gap-1">
            {birthdayConfig?.brandName || 'MY UNIVERSE'}
            <span className="text-[#FF7EAE] text-xs inline-block group-hover:rotate-12 transition-transform">✨</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#AEE2FF]/40 p-1 rounded-full border border-white/80">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => playPop()}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-300 ${
                  isActive
                    ? 'bg-[#9FA1FF] text-white shadow-soft font-black scale-105'
                    : 'text-[#433D60] hover:text-[#1F1A3A] hover:bg-white/60'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Secret Star */}
          <button
            onClick={handleStarClick}
            className="p-2 rounded-full text-[#9FA1FF] hover:text-[#1F1A3A] hover:bg-white/60 transition-colors"
            title="Secret star portal..."
          >
            <Star size={16} className="fill-[#9FA1FF] animate-pulse" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              playPop();
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2 rounded-full text-[#433D60] hover:text-[#1F1A3A] hover:bg-white/60 transition-colors"
            title={soundEnabled ? "SFX ON" : "SFX OFF"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Background Music Toggle */}
          <button
            onClick={() => {
              playPop();
              togglePlay();
            }}
            className={`p-2 rounded-full transition-all flex items-center justify-center ${
              isPlaying
                ? 'bg-[#B5BAFF]/30 text-[#1F1A3A] border border-[#9FA1FF] animate-pulse-soft'
                : 'text-[#433D60] hover:text-[#1F1A3A] hover:bg-white/60'
            }`}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            <Music size={16} className={isPlaying ? "animate-spin-slow text-[#9FA1FF]" : ""} />
          </button>

        </div>
      </div>

      {/* Mobile Navigation Bar at bottom */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="glass-pill px-3 py-2 rounded-full flex items-center justify-around shadow-glass-light border border-white/95 bg-white/90 backdrop-blur-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => playPop()}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-full text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#9FA1FF] text-white shadow-soft'
                    : 'text-[#433D60]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
