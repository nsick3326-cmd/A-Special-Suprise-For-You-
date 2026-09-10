import React, { useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useSound } from '../context/SoundContext';

export const MusicPlayer = () => {
  const { isPlaying, togglePlay, youtubeId, youtubeStartTime, isMuted } = useMusic();
  const { playPop } = useSound();
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const startTime = youtubeStartTime ?? 10;

  useEffect(() => {
    // Load YouTube API script if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('bg-yt-audio-player', {
        height: '100',
        width: '100',
        videoId: youtubeId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          start: startTime,
          enablejsapi: 1,
          mute: isMuted ? 1 : 0,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
            if (isPlaying) {
              event.target.seekTo(startTime, true);
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // When song ends, loop back to startTime (10s) instead of 0s
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(startTime, true);
              event.target.playVideo();
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [youtubeId]);

  // Handle Play / Pause / Seek Guard
  useEffect(() => {
    const player = playerRef.current;
    if (player && typeof player.playVideo === 'function') {
      if (isPlaying) {
        if (isMuted) player.mute(); else player.unMute();
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }

    // Interval safeguard: Ensure playback NEVER goes below startTime (10s) on loop repeats
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const currentTime = playerRef.current.getCurrentTime();
          if (currentTime > 0 && currentTime < startTime - 0.5) {
            playerRef.current.seekTo(startTime, true);
          }
        }
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isMuted, startTime]);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 pointer-events-auto">
      
      {/* Hidden YouTube Background Audio Container */}
      <div className="w-0 h-0 overflow-hidden absolute opacity-0 pointer-events-none">
        <div id="bg-yt-audio-player" />
        {/* Fallback iframe if API is loading */}
        {isPlaying && !playerRef.current && (
          <iframe
            width="100"
            height="100"
            src={`https://www.youtube.com/embed/${youtubeId}?start=${startTime}&autoplay=1&loop=1&playlist=${youtubeId}&controls=0&enablejsapi=1&mute=${isMuted ? 1 : 0}`}
            title="Background Audio Stream"
            allow="autoplay"
          />
        )}
      </div>

      {/* Floating Pill Player - ONLY "PLAYING" or "PAUSED" */}
      <button
        onClick={() => {
          playPop();
          togglePlay();
        }}
        className="glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 shadow-soft-purple border border-white/95 bg-white/90 hover:scale-105 transition-all text-[#1F1A3A] font-extrabold text-xs"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <div className="w-6 h-6 rounded-full bg-[#9FA1FF] flex items-center justify-center text-white font-black shadow-soft">
          <Music size={12} className={isPlaying ? "animate-spin-slow text-white" : ""} />
        </div>

        <span className="font-mono-cyber text-[11px] text-[#1F1A3A] tracking-wider font-black">
          {isPlaying ? "PLAYING" : "PAUSED"}
        </span>

        <div className="p-1 rounded-full bg-[#9FA1FF]/20 text-[#1F1A3A]">
          {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
        </div>
      </button>

    </div>
  );
};
