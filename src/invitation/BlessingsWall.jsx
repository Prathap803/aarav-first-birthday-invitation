import React from 'react';
import { Gift, HeartHandshake } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function BlessingsWall() {
  const sampleWishes = [
    { author: "Karthik & Deepa", text: "Happy 1st Birthday dearest Aarav! May your life be filled with endless smiles, health and abundance! 🌟" },
    { author: "Suresh Mama & Family", text: "Heartiest blessings to our little prince Aarav on turning ONE! Excited to celebrate with Prathap & Sofeya! 👑" },
    { author: "Dr. Lakshmi Periyamma", text: "ஆரவ் கண்ணா, நூறாண்டு காலம் ஆரோக்கியத்தோடும் மகிழ்ச்சியோடும் வாழ இறைவனை வேண்டுகிறோம்! ❤️" }
  ];

  return (
    <section className="invitation-section" id="blessings">
      <div className="section-tag">
        <Gift size={13} />
        <span>LOVE & BLESSINGS</span>
      </div>

      <h2 className="section-heading">{invitationConfig.giftHeading}</h2>
      <p className="section-heading-tamil">{invitationConfig.tamilGiftText}</p>

      <div className="blessings-card glass-card">
        <HeartHandshake
          size={42}
          style={{ color: 'var(--gold-primary)', margin: '0 auto 1rem' }}
        />
        <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto' }}>
          {invitationConfig.giftMessage}
        </p>

        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.2em', color: 'var(--gold-light)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Blessings from Family & Friends:
          </h4>
          <div className="blessings-list">
            {sampleWishes.map((item, i) => (
              <div key={i} className="blessing-item">
                <p className="blessing-author">{item.author}</p>
                <p className="blessing-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
