import React, { useMemo } from 'react';

export const FloatingParticles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      color: ['#DCD6F7', '#F8D7E8', '#CFE8FF', '#D8F3DC', '#FFF9F2'][i % 5],
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blurred Gradient Ambient Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#DCD6F7] rounded-full blur-3xl opacity-35 animate-pulse-soft"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#F8D7E8] rounded-full blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#CFE8FF] rounded-full blur-3xl opacity-35 animate-pulse-soft"></div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
