import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const ScratchCoupon = ({ coupon, onRevealed }) => {
  const canvasRef = useRef(null);
  const { playPop, playSuccess } = useSound();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Draw silver shimmering scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#C8B6FF');
    gradient.addColorStop(0.5, '#B8C0FF');
    gradient.addColorStop(1, '#A0C4FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text instructions on top
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ TAP / SCRATCH TO REVEAL ✨', width / 2, height / 2 + 4);
  }, []);

  const scratch = (x, y) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const mouseX = x - rect.left;
    const mouseY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 24, 0, Math.PI * 2);
    ctx.fill();

    playPop();

    // Check how much is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    const percent = (cleared / (imageData.data.length / 4)) * 100;

    if (percent > 35 && !isRevealed) {
      setIsRevealed(true);
      playSuccess();
      if (onRevealed) onRevealed(coupon.id);
    }
  };

  const handleTouch = (e) => {
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleMouse = (e) => {
    if (e.buttons === 1 || e.type === 'click') {
      scratch(e.clientX, e.clientY);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full glass-card p-5 rounded-3xl border-2 border-white shadow-soft overflow-hidden text-left"
    >
      {/* Revealed Inner Coupon Content */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C8B6FF] to-[#A0C4FF] flex items-center justify-center text-white shrink-0 shadow-soft">
          <Gift size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
              Birthday Love Pass
            </span>
            {isRevealed && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> Unlocked
              </span>
            )}
          </div>
          <h4 className="text-base font-extrabold text-deep mb-1">
            {coupon.title}
          </h4>
          <p className="text-xs text-deep-muted leading-relaxed">
            {coupon.description}
          </p>
        </div>
      </div>

      {/* Scratch Canvas Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={340}
          height={100}
          onClick={handleMouse}
          onMouseMove={handleMouse}
          onTouchMove={handleTouch}
          onTouchStart={handleTouch}
          className="absolute inset-0 w-full h-full rounded-3xl scratch-canvas z-10 transition-opacity duration-500"
        />
      )}
    </motion.div>
  );
};
