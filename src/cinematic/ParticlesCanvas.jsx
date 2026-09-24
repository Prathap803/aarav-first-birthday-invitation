import React, { useEffect, useRef } from 'react';

export default function ParticlesCanvas({ accelerate = false }) {
  const canvasRef = useRef(null);
  const accelerateRef = useRef(accelerate);

  useEffect(() => {
    accelerateRef.current = accelerate;
  }, [accelerate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(width > 768 ? 65 : 40, 85);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // gently drift upwards
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      color: Math.random() > 0.35 ? '#d4af37' : '#f6e5a6'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isFast = accelerateRef.current;
      const speedMultiplier = isFast ? 5.5 : 1;

      particles.forEach((p) => {
        p.x += p.speedX * speedMultiplier;
        p.y += p.speedY * speedMultiplier;
        p.pulse += p.pulseSpeed * (isFast ? 3 : 1);

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, isFast ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, isFast ? currentOpacity * 1.4 : currentOpacity);
        ctx.shadowBlur = isFast ? 14 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-particles-canvas" />;
}
