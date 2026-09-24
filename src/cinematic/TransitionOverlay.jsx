import React from 'react';

export default function TransitionOverlay({ forwardRef }) {
  return <div ref={forwardRef} className="golden-light-sweep-overlay" />;
}
