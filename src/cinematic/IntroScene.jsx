import React from 'react';

export default function IntroScene({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div className="scene-ember-center" />
    </div>
  );
}
