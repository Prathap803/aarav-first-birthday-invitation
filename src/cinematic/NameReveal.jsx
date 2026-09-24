import React from 'react';
import { invitationConfig } from '../config/invitationConfig';

export default function NameReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div style={{ maxWidth: '680px', width: '90vw' }}>
        <h1 className="cinematic-child-name">
          {invitationConfig.childName}
        </h1>
        <p className="cinematic-turns-one">
          {invitationConfig.turningText}
        </p>
        <p className="cinematic-tamil-prince">
          {invitationConfig.tamilTitle}
        </p>
      </div>
    </div>
  );
}
