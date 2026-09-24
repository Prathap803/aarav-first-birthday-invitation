import React from 'react';
import { invitationConfig } from '../config/invitationConfig';

export default function TextReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div style={{ maxWidth: '600px', width: '90vw' }}>
        <h2 className="poetic-tamil-text">
          {invitationConfig.tamilTagline}
        </h2>
        <p className="poetic-english-text">
          {invitationConfig.englishTagline}
        </p>
      </div>
    </div>
  );
}
