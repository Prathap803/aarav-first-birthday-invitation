import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Share2, Volume2, VolumeX, Music } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';
import { soundEngine } from '../cinematic/audioEngine';

export default function MobileActionBar({ showToast }) {
  const [audioState, setAudioState] = useState({ isPlaying: false, isMuted: false });

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleWhatsApp = () => {
    const defaultMsg = `Hi ${invitationConfig.parents}! ❤️\n\nI would love to join Aarav's 1st Birthday Celebration on 18 October 2026.\n\nLooking forward to celebrating with you! 🎂`;
    window.open(`https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleMap = () => {
    const mapsUrl = invitationConfig.googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${invitationConfig.venue} ${invitationConfig.city}`)}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
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
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
        }
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleMusic = () => {
    const isMuted = soundEngine.togglePlay();
    if (showToast) {
      showToast(isMuted ? 'Music Paused' : 'Music Playing ♫');
    }
  };

  const isMusicOff = audioState.isMuted || !audioState.isPlaying;

  return (
    <aside className="invitation-floating-bar-wrapper" aria-label="Quick Actions">
      <div className="mobile-action-bar-container glass-card" id="mobile-bottom-bar">
        {/* 1. WHATSAPP */}
        <button
          type="button"
          className="bar-action-item"
          onClick={handleWhatsApp}
          id="bar-btn-whatsapp"
          aria-label="RSVP on WhatsApp"
        >
          <div className="bar-icon-wrap whatsapp-color">
            <MessageCircle size={18} />
          </div>
          <span className="bar-action-label">WHATSAPP</span>
        </button>

        {/* 2. MAP */}
        <button
          type="button"
          className="bar-action-item"
          onClick={handleMap}
          id="bar-btn-map"
          aria-label="View Venue on Google Maps"
        >
          <div className="bar-icon-wrap map-color">
            <MapPin size={18} />
          </div>
          <span className="bar-action-label">MAP</span>
        </button>

        {/* 3. SHARE */}
        <button
          type="button"
          className="bar-action-item"
          onClick={handleShare}
          id="bar-btn-share"
          aria-label="Share Invitation"
        >
          <div className="bar-icon-wrap share-color">
            <Share2 size={18} />
          </div>
          <span className="bar-action-label">SHARE</span>
        </button>

        {/* 4. MUSIC */}
        <button
          type="button"
          className={`bar-action-item ${!isMusicOff ? 'music-active' : ''}`}
          onClick={handleToggleMusic}
          id="bar-btn-music"
          aria-label={isMusicOff ? "Play Music" : "Mute Music"}
        >
          <div className="bar-icon-wrap music-color">
            {isMusicOff ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </div>
          <span className="bar-action-label">
            {isMusicOff ? 'MUTED' : 'MUSIC'}
          </span>
        </button>
      </div>
    </aside>
  );
}
