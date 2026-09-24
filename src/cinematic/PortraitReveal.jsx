import React from 'react';
import { Crown } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function PortraitReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div className="portrait-stage">
        {/* Crown Badge */}
        <div className="portrait-crown-badge">
          <Crown size={24} />
        </div>

        {/* Ornate Oval Frame with Aarav's Portrait */}
        <div className="portrait-frame-outer">
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
    </div>
  );
}
