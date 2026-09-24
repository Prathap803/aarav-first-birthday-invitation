import React from 'react';
import { Palette } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function DressCode() {
  const { title, themeName, subtitle, swatches } = invitationConfig.dressCode;

  return (
    <section className="invitation-section" id="dresscode">
      <div className="section-tag">
        <Palette size={13} />
        <span>COLOR PALETTE</span>
      </div>

      <h2 className="section-heading">{title}</h2>
      <p className="section-heading-tamil">விருந்தினர் உடை வண்ணக் குறிப்பு</p>

      <div className="dresscode-card glass-card">
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.25rem', color: 'var(--gold-light)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
          {themeName}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', textAlign: 'center', lineHeight: '1.6' }}>
          {subtitle}
        </p>

        <div className="dresscode-swatches">
          {swatches.map((swatch, idx) => (
            <div key={idx} className="dresscode-swatch-item">
              <div
                className="swatch-circle"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="swatch-name">{swatch.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
