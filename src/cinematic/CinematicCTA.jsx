import React from 'react';
import { Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function CinematicCTA({ forwardRef, onOpenInvitation }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div className="final-frame-card">
        {/* Child Portrait Thumbnail */}
        <div className="final-portrait-preview">
          <img
            src={invitationConfig.childImage}
            alt={invitationConfig.childName}
            style={{ objectPosition: invitationConfig.childImagePosition }}
          />
        </div>

        {/* Name & Title */}
        <h1 className="final-child-name">
          {invitationConfig.childName}
        </h1>
        <div className="final-meta-pill">
          {invitationConfig.turningText} • {invitationConfig.tamilTitle}
        </div>
        <p className="final-date-location">
          {invitationConfig.shortDate} • {invitationConfig.city.split(',')[0]}
        </p>

        {/* Primary CTA Button */}
        <button
          className="cinematic-open-btn"
          onClick={onOpenInvitation}
          aria-label="Open Full Invitation Website"
          id="btn-open-invitation"
        >
          <Sparkles size={18} style={{ color: 'var(--gold-light)' }} />
          <span>OPEN INVITATION</span>
          <Sparkles size={18} style={{ color: 'var(--gold-light)' }} />
        </button>

        {/* Secondary text */}
        <p className="cinematic-tap-caption">
          Tap to celebrate with us
        </p>
      </div>
    </div>
  );
}
