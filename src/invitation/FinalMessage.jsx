import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function FinalMessage() {
  const triggerCelebration = () => {
    // Subtle luxury gold, champagne & ivory celebratory burst
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#d4af37', '#f6e5a6', '#ffffff', '#e6be5a'],
      disableForReducedMotion: true
    });
  };

  return (
    <section className="invitation-section final-celebration-section" id="final-celebration">
      {/* Tamil Kolam Decorative Pattern */}
      <div className="final-kolam-divider" aria-hidden="true">
        <svg viewBox="0 0 120 28" className="kolam-footer-svg">
          <path
            d="M60 4 C40 4 35 24 15 24 C5 24 2 14 2 14 M60 4 C80 4 85 24 105 24 C115 24 118 14 118 14"
            fill="none"
            stroke="var(--gold-primary, #d4af37)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="14" r="4" fill="var(--gold-primary, #d4af37)" />
          <circle cx="15" cy="14" r="2.5" fill="var(--gold-light, #f6e5a6)" />
          <circle cx="105" cy="14" r="2.5" fill="var(--gold-light, #f6e5a6)" />
        </svg>
      </div>

      <div className="section-tag">
        <Sparkles size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>A CORDIAL WELCOME</span>
      </div>

      {/* Main Closing Heading */}
      <h2 className="final-memory-heading">
        COME MAKE A MEMORY WITH US
      </h2>

      {/* Aarav Turns One Showcase */}
      <div className="final-child-block">
        <h3 className="final-aarav-name">
          {invitationConfig.childName}
        </h3>
        <p className="final-turns-one">
          {invitationConfig.turningText}
        </p>
      </div>

      {/* Parents */}
      <div className="final-parents-block">
        <span className="final-parents-intro">Warmly awaiting your presence,</span>
        <h4 className="final-parents-names">
          {invitationConfig.parents}
        </h4>
      </div>

      {/* Emotional Tagline: SEE YOU THERE ❤️ */}
      <div className="final-see-you-box">
        <Heart size={18} className="final-heart-icon" />
        <span className="final-see-you-text">SEE YOU THERE ❤️</span>
        <Heart size={18} className="final-heart-icon" />
      </div>

      {/* Interactive Celebration Confetti */}
      <button
        type="button"
        className="final-confetti-btn"
        onClick={triggerCelebration}
        id="btn-final-celebrate"
      >
        <Sparkles size={16} />
        <span>Shower Blessings & Celebrate 🎉</span>
      </button>
    </section>
  );
}
