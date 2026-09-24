import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function Footer() {
  return (
    <footer className="invitation-footer">
      <h3 className="footer-child-title">
        {invitationConfig.childName}'S FIRST BIRTHDAY
      </h3>
      <p className="footer-made-with-love">
        Made with <Heart size={14} style={{ display: 'inline', color: '#e0859c', fill: '#e0859c', verticalAlign: 'middle' }} /> for our little prince
      </p>

      <div className="footer-demo-branding">
        <Sparkles size={12} style={{ color: 'var(--gold-primary)' }} />
        <span>Digital Invitation Experience • Chennai</span>
      </div>
    </footer>
  );
}
