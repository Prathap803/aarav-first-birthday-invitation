import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Crown, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const elements = el.querySelectorAll('.hero-anim-node');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'transform'
      }
    );
  }, []);

  return (
    <section ref={heroRef} className="invitation-section hero-section" id="hero">
      {/* Subtle Kolam Top Motif */}
      <div className="hero-anim-node tamil-kolam-motif">
        <svg viewBox="0 0 100 24" className="kolam-svg-ornament" aria-hidden="true">
          <path
            d="M50 2 C35 2 30 22 15 22 C5 22 2 12 2 12 M50 2 C65 2 70 22 85 22 C95 22 98 12 98 12"
            fill="none"
            stroke="var(--gold-primary, #d4af37)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="12" r="3" fill="var(--gold-primary, #d4af37)" />
          <circle cx="15" cy="12" r="2" fill="var(--gold-light, #f6e5a6)" />
          <circle cx="85" cy="12" r="2" fill="var(--gold-light, #f6e5a6)" />
        </svg>
      </div>

      {/* Royal Crown Badge */}
      <div className="hero-anim-node hero-crown-wrapper">
        <div className="hero-crown-circle">
          <Crown className="hero-crown-icon" />
        </div>
      </div>

      {/* Child Name: AARAV */}
      <h1 className="hero-anim-node hero-child-name">
        {invitationConfig.childName}
      </h1>

      {/* Milestone: TURNS ONE */}
      <div className="hero-anim-node hero-milestone-pill">
        <Sparkles size={14} className="hero-sparkle" />
        <span className="hero-turns-one-text">{invitationConfig.turningText}</span>
        <Sparkles size={14} className="hero-sparkle" />
      </div>

      {/* Tamil Title: எங்கள் குட்டி இளவரசனின் முதல் பிறந்தநாள் விழா */}
      <p className="hero-anim-node hero-tamil-title">
        {invitationConfig.tamilHeroTitle || `${invitationConfig.tamilTitle}ின் ${invitationConfig.tamilTurningText}`}
      </p>

      {/* Portrait in Luxury Golden Frame */}
      <div className="hero-anim-node hero-portrait-stage">
        <div className="hero-portrait-glow" />
        <div className="hero-portrait-frame">
          <img
            src={invitationConfig.childImage}
            alt={invitationConfig.childName}
            className="hero-portrait-img"
            style={{ objectPosition: invitationConfig.childImagePosition }}
          />
        </div>
      </div>

      {/* Date, Time & Location Trio */}
      <div className="hero-anim-node hero-meta-grid">
        {/* Date */}
        <div className="hero-meta-item glass-card">
          <Calendar size={18} className="hero-meta-icon" />
          <span className="hero-meta-label">DATE</span>
          <span className="hero-meta-val">{invitationConfig.displayDate || invitationConfig.date.toUpperCase()}</span>
        </div>

        {/* Time */}
        <div className="hero-meta-item glass-card">
          <Clock size={18} className="hero-meta-icon" />
          <span className="hero-meta-label">TIME</span>
          <span className="hero-meta-val">{invitationConfig.displayTime || invitationConfig.time.toUpperCase()}</span>
        </div>

        {/* Location */}
        <div className="hero-meta-item glass-card hero-meta-item-wide">
          <MapPin size={18} className="hero-meta-icon" />
          <span className="hero-meta-label">LOCATION</span>
          <span className="hero-meta-val">{invitationConfig.city.toUpperCase()}</span>
        </div>
      </div>

      {/* Decorative Gold Divider */}
      <div className="hero-anim-node gold-divider">
        <span className="gold-divider-line" />
        <span className="gold-divider-diamond" />
        <span className="gold-divider-line" />
      </div>
    </section>
  );
}
