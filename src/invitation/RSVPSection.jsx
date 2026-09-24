import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Share2, Users, Phone, User, MessageSquare } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function RSVPSection({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 2,
    attending: 'yes',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleGuestsChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.max(1, Math.min(10, prev.guests + delta))
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (formData.phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      if (showToast) showToast('Please complete the required fields');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('aarav_birthday_rsvps') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('aarav_birthday_rsvps', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setSubmitted(true);
    if (showToast) showToast('Thank you for your RSVP! ❤️');
  };

  // WhatsApp RSVP link
  const generateWhatsAppRsvpUrl = () => {
    const defaultMsg = `Hi ${invitationConfig.parents}! ❤️\n\nI would love to join Aarav's 1st Birthday Celebration on 18 October 2026.\n\nLooking forward to celebrating with you! 🎂`;
    
    // If the user already typed their name, tailor the greeting cleanly
    const finalMsg = formData.name.trim()
      ? `Hi ${invitationConfig.parents}! ❤️\n\nThis is ${formData.name.trim()}. ${
          formData.attending === 'yes'
            ? `I would love to join Aarav's 1st Birthday Celebration on 18 October 2026 with ${formData.guests} guest(s).`
            : `Thank you so much for the invitation to Aarav's 1st Birthday Celebration on 18 October 2026. Sadly I won't be able to make it, but sending all my loving blessings!`
        }\n\nLooking forward to celebrating with you! 🎂`
      : defaultMsg;

    return `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
  };

  // Share invitation
  const handleShareInvitation = async () => {
    const shareText = `You're invited to Aarav's 1st Birthday Celebration 🎂\n\n18 October 2026\n6:00 PM onwards\nChennai, Tamil Nadu\n\nWe would love to celebrate this special day with you! ❤️\n\n${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invitationConfig.childName}'s 1st Birthday Celebration`,
          text: shareText,
          url: window.location.href
        });
        if (showToast) showToast('Invitation shared! ✨');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="invitation-section rsvp-section" id="rsvp">
      <div className="section-tag">
        <Send size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>KINDLY RESPOND</span>
      </div>

      <h2 className="section-heading">RSVP FOR THE CELEBRATION</h2>
      <p className="section-heading-tamil">உங்கள் வருகையை உறுதி செய்யவும்</p>

      <div className="rsvp-wrapper">
        <div className="rsvp-card glass-card">
          {submitted ? (
            /* Successful submission view */
            <div className="rsvp-success-view">
              <CheckCircle2 size={58} className="rsvp-success-icon" />
              <h3 className="rsvp-success-title">THANK YOU! ❤️</h3>
              <p className="rsvp-success-message">
                WE CAN'T WAIT TO CELEBRATE WITH YOU.
              </p>
              <p className="rsvp-success-detail">
                {formData.attending === 'yes'
                  ? `Your confirmation for ${formData.guests} guest(s) has been recorded with love.`
                  : "We will truly miss having you, but appreciate your kind wishes for Aarav!"}
              </p>

              <button
                type="button"
                className="details-btn details-btn-secondary"
                onClick={() => setSubmitted(false)}
                style={{ margin: '1.5rem auto 0' }}
              >
                Change or Resubmit Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="rsvp-name">
                  <User size={14} />
                  <span>Name *</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`rsvp-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  required
                />
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              {/* Phone Number */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="rsvp-phone">
                  <Phone size={14} />
                  <span>Phone Number *</span>
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  className={`rsvp-input ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  required
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              {/* Attendance Choice Buttons */}
              <div className="rsvp-form-group">
                <label className="rsvp-label">Will you be joining us?</label>
                <div className="attendance-options-grid">
                  <button
                    type="button"
                    className={`attendance-option-btn ${formData.attending === 'yes' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  >
                    <span>🎉 YES, I'LL BE THERE</span>
                  </button>

                  <button
                    type="button"
                    className={`attendance-option-btn decline ${formData.attending === 'no' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                  >
                    <span>SORRY, CAN'T MAKE IT</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests (shown when attending is yes) */}
              {formData.attending === 'yes' && (
                <div className="rsvp-form-group">
                  <label className="rsvp-label">
                    <Users size={14} />
                    <span>Number of Guests</span>
                  </label>
                  <div className="guest-stepper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => handleGuestsChange(-1)}
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>
                    <span className="stepper-value">{formData.guests}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => handleGuestsChange(1)}
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                    <span className="stepper-unit">
                      {formData.guests === 1 ? 'Guest attending' : 'Guests attending'}
                    </span>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="rsvp-message">
                  <MessageSquare size={14} />
                  <span>Message (Optional)</span>
                </label>
                <textarea
                  id="rsvp-message"
                  rows="3"
                  placeholder="Share a warm blessing or note for Aarav..."
                  className="rsvp-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Confirm RSVP Submit */}
              <button type="submit" className="rsvp-submit-btn" id="btn-submit-rsvp">
                <Send size={16} />
                <span>CONFIRM RSVP</span>
              </button>

              {/* Divider */}
              <div className="rsvp-divider">
                <span className="rsvp-divider-text">OR DIRECT OPTIONS</span>
              </div>

              {/* Dual Actions: WhatsApp RSVP & Share Invitation */}
              <div className="rsvp-dual-actions">
                <a
                  href={generateWhatsAppRsvpUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-rsvp-cta-btn"
                  id="btn-whatsapp-rsvp"
                >
                  <MessageCircle size={18} />
                  <span>RSVP ON WHATSAPP</span>
                </a>

                <button
                  type="button"
                  className="share-invitation-cta-btn"
                  onClick={handleShareInvitation}
                  id="btn-share-invitation"
                >
                  <Share2 size={18} />
                  <span>SHARE INVITATION</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
