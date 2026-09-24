import React from 'react';

export default function KolamReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div className="kolam-wrapper">
        <svg
          className="kolam-svg"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Royal Star Mandala / Kolam Lines */}
          <circle cx="100" cy="100" r="8" fill="var(--gold-primary)" opacity="0.9" />
          <circle cx="100" cy="100" r="22" stroke="var(--gold-primary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" stroke="var(--gold-border)" strokeWidth="0.8" opacity="0.6" />

          {/* Symmetrical Kolam Petals & Knotwork */}
          <path
            className="kolam-path"
            d="M 100 25 C 120 55, 145 80, 175 100 C 145 120, 120 145, 100 175 C 80 145, 55 120, 25 100 C 55 80, 80 55, 100 25 Z"
            stroke="var(--gold-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            className="kolam-path"
            d="M 100 45 C 112 68, 132 88, 155 100 C 132 112, 112 132, 100 155 C 88 132, 68 112, 45 100 C 68 88, 88 68, 100 45 Z"
            stroke="var(--gold-light)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Diagonals */}
          <path
            className="kolam-path"
            d="M 47 47 C 75 75, 125 75, 153 47 C 125 75, 125 125, 153 153 C 125 125, 75 125, 47 153 C 75 125, 75 75, 47 47 Z"
            stroke="var(--gold-primary)"
            strokeWidth="1.2"
            opacity="0.85"
            strokeLinecap="round"
          />
          {/* Traditional Dots (Pulli) */}
          <circle cx="100" cy="50" r="3" fill="var(--gold-light)" />
          <circle cx="150" cy="100" r="3" fill="var(--gold-light)" />
          <circle cx="100" cy="150" r="3" fill="var(--gold-light)" />
          <circle cx="50" cy="100" r="3" fill="var(--gold-light)" />

          <circle cx="65" cy="65" r="2.5" fill="var(--gold-primary)" />
          <circle cx="135" cy="65" r="2.5" fill="var(--gold-primary)" />
          <circle cx="135" cy="135" r="2.5" fill="var(--gold-primary)" />
          <circle cx="65" cy="135" r="2.5" fill="var(--gold-primary)" />
        </svg>

        <p style={{
          fontFamily: "'Noto Serif Tamil', serif",
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          color: 'var(--gold-light)',
          marginTop: '1.25rem',
          opacity: 0.85,
          textTransform: 'uppercase'
        }}>
          மங்களகரமான ஆரம்பம்
        </p>
      </div>
    </div>
  );
}
