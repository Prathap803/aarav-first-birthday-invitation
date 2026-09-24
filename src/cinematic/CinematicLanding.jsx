import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles, Crown } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';
import { soundEngine } from './audioEngine';
import ParticlesCanvas from './ParticlesCanvas';
import AudioController from './AudioController';
import TransitionOverlay from './TransitionOverlay';

export default function CinematicLanding({ onEnterInvitation }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particlesFast, setParticlesFast] = useState(false);

  const viewportRef = useRef(null);
  const cardRef = useRef(null);
  const portraitRef = useRef(null);
  const nameRef = useRef(null);
  const badgeRef = useRef(null);
  const dateRef = useRef(null);
  const buttonRef = useRef(null);
  const transitionOverlayRef = useRef(null);
  const introTlRef = useRef(null);

  useEffect(() => {
    // 1. Attempt autoplay on initial page load (safely handled by soundEngine)
    soundEngine.attemptAutoplay();

    // 2. Cinematic Entrance Sequence (approx. 4–5 seconds total)
    // Elements are styled so they are positioned cleanly, and GSAP orchestrates the reveals.
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    introTlRef.current = tl;

    // Reset initial animated properties
    gsap.set(portraitRef.current, { opacity: 0, scale: 0.9, filter: 'blur(8px)' });
    gsap.set(nameRef.current, { opacity: 0, y: 22, letterSpacing: '0.12em', filter: 'blur(6px)' });
    gsap.set(badgeRef.current, { opacity: 0, y: 15, scale: 0.95 });
    gsap.set(dateRef.current, { opacity: 0, y: 12 });
    gsap.set(buttonRef.current, { opacity: 0, scale: 0.92, y: 10 });

    // 0–1s: Ambient background & particles are already glowing
    // 1–2s: Baby portrait gently appears with soft gold rim light & zoom
    tl.to(portraitRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out'
    }, 0.8)
    .call(() => {
      soundEngine.playChime(659.25); // Gentle E5 chime
    }, null, 1.2)

    // 2–3s: AARAV appears with elegant cinematic text animation
    .to(nameRef.current, {
      opacity: 1,
      y: 0,
      letterSpacing: '0.24em',
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'power3.out'
    }, 1.9)

    // 3–4s: TURNS ONE & எங்கள் குட்டி இளவரசன்
    .to(badgeRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.2)'
    }, 2.9)

    // 4–5s: 18 OCT 2026 • CHENNAI
    .to(dateRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 3.8)

    // Then: OPEN INVITATION button entrance
    .to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.75)'
    }, 4.2);

    return () => {
      if (introTlRef.current) introTlRef.current.kill();
    };
  }, []);

  // Primary action: OPEN INVITATION
  const handleOpenInvitation = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setParticlesFast(true);

    // Stop intro timeline if still running
    if (introTlRef.current) introTlRef.current.kill();

    // Make sure elements are visible before zooming out
    gsap.set([portraitRef.current, nameRef.current, badgeRef.current, dateRef.current, buttonRef.current], {
      opacity: 1,
      filter: 'blur(0px)'
    });

    // Audio: start music if not playing & play celebratory flourish
    try {
      soundEngine.play(true);
      soundEngine.playCelebrationFlourish();
    } catch (err) {
      console.warn('Audio start error on click:', err);
    }

    // Fail-safe timeout so the transition never gets stuck under any circumstance
    const fallbackTimer = setTimeout(() => {
      onEnterInvitation();
    }, 1400);

    // Required Cinematic Flow:
    // 1. Button scales slightly & gold glow expands
    // 2. Background particles move faster (handled by particlesFast state)
    // 3. Screen performs a subtle zoom
    // 4. Elegant light sweep
    // 5. Landing fades
    // 6. Main invitation hero appears
    const transitionTl = gsap.timeline({
      onComplete: () => {
        clearTimeout(fallbackTimer);
        onEnterInvitation();
      }
    });

    transitionTl
      // 1. Button scales slightly + gold glow expands
      .to(buttonRef.current, {
        scale: 1.12,
        boxShadow: '0 0 60px rgba(255, 255, 255, 0.9), 0 0 100px rgba(212, 175, 55, 0.85)',
        duration: 0.3,
        ease: 'power2.out'
      })
      // 2. Screen & card perform subtle zoom & push-in
      .to(cardRef.current, {
        scale: 1.15,
        opacity: 0.15,
        filter: 'blur(8px)',
        duration: 0.65,
        ease: 'power3.in'
      }, '-=0.1')
      // 3. Elegant golden light sweep flash
      .to(transitionOverlayRef.current, {
        opacity: 1,
        scale: 1.25,
        duration: 0.5,
        ease: 'expo.in'
      }, '-=0.45')
      // 4. Landing viewport fades
      .to(viewportRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out'
      }, '-=0.15');
  };

  return (
    <div ref={viewportRef} className="cinematic-viewport">
      {/* 1. Subtle Film Grain */}
      <div className="cinematic-grain" />

      {/* 2. Golden Light Rays & Vignette */}
      <div className="cinematic-vignette" />
      <div className="cinematic-light-rays" />

      {/* 3. Subtle Floating Gold Particles */}
      <ParticlesCanvas accelerate={particlesFast} />

      {/* 4. Foreground Bokeh Elements */}
      <div className="cinematic-bokeh" style={{ width: 140, height: 140, top: '15%', left: '10%' }} />
      <div className="cinematic-bokeh" style={{ width: 90, height: 90, bottom: '20%', right: '12%' }} />
      <div className="cinematic-bokeh" style={{ width: 110, height: 110, top: '65%', left: '8%' }} />

      {/* 5. Header Controls (Music On/Off) */}
      <div className="cinematic-header-controls">
        <AudioController />
      </div>

      {/* 6. Cinematic Hero Card (Centered) */}
      <div ref={cardRef} className="cinematic-main-card">
        {/* Baby Portrait with Golden Rim Light */}
        <div ref={portraitRef} className="cinematic-portrait-stage">
          <div className="portrait-rim-glow" />
          <div className="portrait-frame-outer">
            <div className="portrait-crown-badge">
              <Crown size={22} style={{ color: 'var(--gold-primary)' }} />
            </div>
            <div className="portrait-frame-inner">
              <img
                src={invitationConfig.childImage}
                alt={invitationConfig.childName}
                className="portrait-img"
                style={{ objectPosition: invitationConfig.childImagePosition }}
              />
            </div>
          </div>
        </div>

        {/* Child Name: AARAV */}
        <h1 ref={nameRef} className="cinematic-name-title">
          {invitationConfig.childName}
        </h1>

        {/* Milestone Badge: TURNS ONE • எங்கள் குட்டி இளவரசன் */}
        <div ref={badgeRef} className="cinematic-milestone-pill">
          <span>{invitationConfig.turningText}</span>
          <span className="pill-dot">•</span>
          <span className="pill-tamil">{invitationConfig.tamilTitle}</span>
        </div>

        {/* Event Date & Location: 18 OCT 2026 • CHENNAI */}
        <p ref={dateRef} className="cinematic-date-text">
          {invitationConfig.shortDate} • {invitationConfig.city.split(',')[0].toUpperCase()}
        </p>

        {/* Primary CTA: OPEN INVITATION (Active & Clickable immediately) */}
        <div ref={buttonRef} className="cinematic-cta-wrapper">
          <button
            type="button"
            className="cinematic-open-btn"
            onClick={handleOpenInvitation}
            aria-label="Open Birthday Invitation"
            id="btn-open-invitation"
          >
            <Sparkles size={18} className="cta-sparkle" />
            <span>OPEN INVITATION</span>
            <Sparkles size={18} className="cta-sparkle" />
          </button>

          <p className="cinematic-sub-caption">
            Tap to celebrate with us
          </p>
        </div>
      </div>

      {/* 7. Golden Light Sweep Transition Overlay */}
      <TransitionOverlay forwardRef={transitionOverlayRef} />
    </div>
  );
}
