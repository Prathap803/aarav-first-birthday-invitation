import React from 'react';
import { invitationConfig } from '../config/invitationConfig';

export default function ParentsReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div style={{ maxWidth: '600px', width: '90vw' }}>
        <h2 className="cinematic-parents-title">
          {invitationConfig.parentsNames}
        </h2>
        <p className="cinematic-parents-sub">
          {invitationConfig.parentsInviteText}
        </p>
      </div>
    </div>
  );
}
