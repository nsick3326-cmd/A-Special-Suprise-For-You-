import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfettiCanvas = ({ trigger = true }) => {
  useEffect(() => {
    if (trigger) {
      // Primary soft particle burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DCD6F7', '#F8D7E8', '#CFE8FF', '#D8F3DC', '#FFF9F2']
      });

      // Secondary delay celebration burst
      const timeout = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F8D7E8', '#DCD6F7']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#CFE8FF', '#D8F3DC']
        });
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return null;
};
