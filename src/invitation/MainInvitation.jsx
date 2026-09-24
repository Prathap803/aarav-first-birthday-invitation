import React, { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import HeroSection from './HeroSection';
import CountdownTimer from './CountdownTimer';
import ParentsStory from './ParentsStory';
import PhotoGallery from './PhotoGallery';
import EventDetails from './EventDetails';
import Timeline from './Timeline';
import DressCode from './DressCode';
import RSVPSection from './RSVPSection';
import BlessingsWall from './BlessingsWall';
import FinalMessage from './FinalMessage';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import ThemeStudio from './ThemeStudio';
import AudioController from '../cinematic/AudioController';

export default function MainInvitation({
  currentTheme,
  onSelectTheme,
  onReplayIntro,
  showToast
}) {
  const canvasRef = useRef(null);

  // Background subtle golden star field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.pulse += 0.02;
        const currentAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${currentAlpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="invitation-root">
      {/* Background Starry Canvas */}
      <canvas ref={canvasRef} className="invitation-canvas-bg" />

      {/* Desktop Floating Utility Bar (Music + Replay Intro) */}
      <div className="desktop-floating-nav">
        <AudioController />
        <button
          type="button"
          className="desktop-replay-btn"
          onClick={onReplayIntro}
          aria-label="Replay Cinematic Intro"
          title="Replay Cinematic Intro"
        >
          <RotateCcw size={14} />
          <span>Replay Intro</span>
        </button>
      </div>

      {/* Main Content Container */}
      <main className="invitation-container">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Countdown Timer */}
        <CountdownTimer />

        {/* 3. Birthday Story */}
        <ParentsStory />

        {/* 4. Photo Gallery with Lightbox & Swipe */}
        <PhotoGallery />

        {/* 5. Date & Venue Details (Google Maps + Add to Calendar) */}
        <EventDetails />

        {/* 6. Celebration Timeline */}
        <Timeline />

        {/* 7. Dress Code & Theme Swatches */}
        <DressCode />

        {/* 8. Dual RSVP (In-app form + WhatsApp RSVP + Share) */}
        <RSVPSection showToast={showToast} />

        {/* 9. Gift & Blessings Wall */}
        <BlessingsWall />

        {/* 10. Final Emotional Message & Confetti */}
        <FinalMessage />

        {/* 11. Footer with Discreet Portfolio Branding */}
        <Footer />
      </main>

      {/* Mobile Sticky Bottom Action Bar (WhatsApp, Map, Share, Music) */}
      <MobileActionBar showToast={showToast} />

      {/* Theme Studio Demo Switcher */}
      <ThemeStudio
        currentTheme={currentTheme}
        onSelectTheme={onSelectTheme}
        onReplayIntro={onReplayIntro}
        showToast={showToast}
      />
    </div>
  );
}
