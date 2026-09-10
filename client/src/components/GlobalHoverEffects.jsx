import React, { useEffect, useRef, useState } from 'react';

/**
 * Global Magic Hover Effect System
 * 1. Global Custom Glowing Star/Heart Floating Cursor with lag/easing & trail.
 * 2. High-performance Canvas Particle Emitter (Sparkles ✨, Stars ⭐, Flower Petals 🌸).
 * 3. Throttled interactive hover detector with 3D Card/Photo Tilt + Button Glow.
 * 4. Graceful mobile/touch degradation (hides cursor on touch, spawns tap sparkles).
 */
export const GlobalHoverEffects = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  // Position tracking refs for animation loops
  const targetPos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Particle tracking
  const particlesRef = useRef([]);
  const lastEmitTime = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  // 1. Check touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 2. Canvas & Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color palettes for romantic sparkles & petals
    const petalColors = ['#FFB7B2', '#FF9EAA', '#FFC0CB', '#E5CFF7', '#FFD6EC'];
    const sparkleColors = ['#FFE66D', '#FFD166', '#B5BAFF', '#9FA1FF', '#FFFFFF'];

    // Draw single 4-point glowing sparkle star
    const drawSparkle = (ctx, x, y, size, rotation, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 2;

      ctx.beginPath();
      const inner = size * 0.22;
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? size : inner;
        const angle = (i * Math.PI) / 4;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw single organic flower petal 🌸
    const drawPetal = (ctx, x, y, size, rotation, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.4)';
      ctx.shadowBlur = size;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size * 0.7, -size * 1.1, -size * 0.35, -size * 1.9, 0, -size * 2.1);
      ctx.bezierCurveTo(size * 0.35, -size * 1.9, size * 0.7, -size * 1.1, 0, 0);
      ctx.fill();

      // Subtle petal highlight line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 0.8;
      ctx.moveTo(0, -size * 0.3);
      ctx.lineTo(0, -size * 1.5);
      ctx.stroke();

      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.015; // gentle upward drift
        p.vx *= 0.98;
        p.alpha -= p.decay;
        p.rotation += p.vRot;
        p.x += Math.sin(p.rotation * 2) * 0.35; // organic side wobble

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Spawn particle helper (capped for performance)
  const spawnBurst = (x, y, count = 5) => {
    if (particlesRef.current.length > 70) return; // limit active max particles

    const petalColors = ['#FFB7B2', '#FF9EAA', '#FFC0CB', '#E5CFF7', '#FFD6EC'];
    const sparkleColors = ['#FFE66D', '#FFD166', '#B5BAFF', '#9FA1FF', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() > 0.45;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.2 + 0.5;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: isPetal ? Math.random() * 5 + 4 : Math.random() * 4 + 3,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        type: isPetal ? 'petal' : 'sparkle',
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }
  };

  // 3. Custom Cursor Easing Animation Loop (smooth float lag)
  useEffect(() => {
    if (isTouchDevice) return;
    let animId;

    const animateCursor = () => {
      // Lerp main cursor
      cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.24;
      cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.24;

      // Lerp trailing dot with more lag
      trailPos.current.x += (cursorPos.current.x - trailPos.current.x) * 0.35;
      trailPos.current.y += (cursorPos.current.y - trailPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.35 : 1})`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`;
      }

      animId = requestAnimationFrame(animateCursor);
    };

    animId = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isTouchDevice]);

  // 4. Global Event Handling: Mouse move, hover detection, 3D Tilt for Cards/Photos, Touch tap
  useEffect(() => {
    let activeTiltCard = null;

    const isInteractiveElement = (el) => {
      if (!el || el === document.body || el === document.documentElement) return false;
      return !!el.closest('button, a, [role="button"], input, select, textarea, .glass-card, .polaroid-card, .heart-shaped-card, img, .cursor-pointer, [data-hover]');
    };

    const findCardOrPhoto = (el) => {
      if (!el || el === document.body || el === document.documentElement) return null;
      return el.closest('.glass-card, .polaroid-card, .heart-shaped-card, [data-tilt], .tilt-card, .memory-card');
    };

    const applyTilt = (card, clientX, clientY) => {
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      const rotX = ((-y / (rect.height / 2)) * 6.5).toFixed(2);
      const rotY = ((x / (rect.width / 2)) * 6.5).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.boxShadow = `0 22px 45px -5px rgba(159, 161, 255, 0.4), 0 0 30px rgba(255, 174, 226, 0.35)`;
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.15s ease';
    };

    const resetTilt = (card) => {
      if (!card) return;
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
    };

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const interactiveEl = isInteractiveElement(target);
      setIsHovered(interactiveEl);

      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);

      // Throttled particle emission
      if (interactiveEl) {
        if (now - lastEmitTime.current > 75 && dist > 6) {
          spawnBurst(e.clientX, e.clientY, Math.random() > 0.5 ? 2 : 1);
          lastEmitTime.current = now;
          lastPos.current = { x: e.clientX, y: e.clientY };
        }
      } else {
        if (now - lastEmitTime.current > 180 && dist > 25) {
          spawnBurst(e.clientX, e.clientY, 1);
          lastEmitTime.current = now;
          lastPos.current = { x: e.clientX, y: e.clientY };
        }
      }

      // 3D Card / Photo tilt calculation
      const cardEl = findCardOrPhoto(target);
      if (cardEl) {
        if (activeTiltCard && activeTiltCard !== cardEl) {
          resetTilt(activeTiltCard);
        }
        activeTiltCard = cardEl;
        applyTilt(cardEl, e.clientX, e.clientY);
      } else if (activeTiltCard) {
        resetTilt(activeTiltCard);
        activeTiltCard = null;
      }
    };

    const handleMouseOver = (e) => {
      if (isInteractiveElement(e.target)) {
        const isBtn = e.target.closest('button, a[href], [role="button"]');
        const isCard = findCardOrPhoto(e.target);
        const count = isBtn ? 7 : isCard ? 6 : 5;
        spawnBurst(e.clientX, e.clientY, count);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (activeTiltCard) {
        resetTilt(activeTiltCard);
        activeTiltCard = null;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        spawnBurst(touch.clientX, touch.clientY, 5);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('touchstart', handleTouchStart);
      if (activeTiltCard) resetTilt(activeTiltCard);
    };
  }, [isVisible]);

  return (
    <>
      {/* Global Particle Emitter Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[999998]"
        aria-hidden="true"
      />

      {/* Global Custom Glowing Star/Heart Floating Cursor (Desktop only) */}
      {!isTouchDevice && isVisible && (
        <>
          {/* Secondary Soft Trailing Halo */}
          <div
            ref={trailRef}
            className="fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-300"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,174,226,0.45) 0%, rgba(159,161,255,0.25) 60%, rgba(255,255,255,0) 100%)',
              filter: 'blur(3px)',
            }}
          />

          {/* Main Custom Glowing Cursor */}
          <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[1000000] flex items-center justify-center transition-opacity duration-200"
            style={{
              width: '24px',
              height: '24px',
            }}
          >
            {/* Glowing outer backdrop */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isHovered
                  ? 'bg-pink-400/40 blur-sm scale-150'
                  : 'bg-indigo-300/30 blur-xs scale-100'
              }`}
            />

            {/* Glowing Center Star/Heart Icon */}
            <svg
              className={`w-5 h-5 drop-shadow-[0_0_8px_rgba(255,230,109,0.85)] transition-transform duration-300 ${
                isHovered ? 'scale-125 rotate-12 text-pink-400' : 'scale-100 text-amber-300'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Romantic Sparkle Star Shape */}
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </>
      )}
    </>
  );
};
