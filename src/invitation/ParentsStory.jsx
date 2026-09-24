import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function ParentsStory() {
  return (
    <section className="invitation-section story-section" id="story">
      {/* Tag */}
      <div className="section-tag">
        <Heart size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>A MESSAGE FROM PARENTS</span>
      </div>

      {/* Tamil Heading */}
      <h2 className="story-tamil-heading">
        {invitationConfig.tamilStoryTitle || "ஒரு வருடம்... ஆயிரம் நினைவுகள்"}
      </h2>

      {/* English Heading */}
      <h3 className="section-heading story-english-heading">
        {invitationConfig.englishStoryTitle || "ONE YEAR OF LOVE & LITTLE MOMENTS"}
      </h3>

      {/* Emotional Story Card */}
      <div className="parents-message-card glass-card">
        <div className="message-quote-icon">“</div>
        <p className="story-lead-quote">
          "{invitationConfig.storySummary || "One beautiful year filled with tiny smiles, little adventures and countless precious memories."}"
        </p>

        <p className="message-paragraph">
          From his very first gentle cry to his joyful first steps, Aarav has filled our hearts with a love we never knew existed and turned our home into a kingdom of laughter.
        </p>

        <p className="message-paragraph">
          We warmly invite you and your family to join us as we celebrate our little prince AARAV and the immense blessings he has brought into our lives.
        </p>

        {/* Traditional Tamil Blessing */}
        <div className="tamil-blessing-box">
          <Sparkles size={14} style={{ color: 'var(--gold-primary)' }} />
          <p className="tamil-blessing-text">
            {invitationConfig.tamilBlessingQuote || "உங்கள் வரவும் வாழ்த்தும் எங்கள் வாழ்வின் பெருமகிழ்ச்சி"}
          </p>
          <Sparkles size={14} style={{ color: 'var(--gold-primary)' }} />
        </div>

        {/* Parents Signature */}
        <div className="parents-signature">
          <span className="signature-with-love">With infinite love & blessings,</span>
          <span className="signature-names">{invitationConfig.parentsNames}</span>
        </div>
      </div>
    </section>
  );
}
