import React from 'react';
import { Calendar, MapPin, Navigation, CalendarPlus, ExternalLink } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function EventDetails() {
  const handleAddToCalendar = () => {
    // 18 October 2026 6:00 PM IST (12:30 PM UTC)
    const startTime = "20261018T123000Z";
    const endTime = "20261018T173000Z";
    const title = encodeURIComponent(`${invitationConfig.childName}'s 1st Birthday Celebration`);
    const details = encodeURIComponent(`Join Prathap & Sofeya as we celebrate Aarav's 1st Birthday at ${invitationConfig.venue}, Chennai! Contact: ${invitationConfig.contactPhone}`);
    const location = encodeURIComponent(`${invitationConfig.venue}, ${invitationConfig.address}`);

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  const mapsSearchUrl = invitationConfig.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${invitationConfig.venue} ${invitationConfig.city}`)}`;

  const mapsDirectionsUrl = invitationConfig.googleMapsDirectionsUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${invitationConfig.venue} ${invitationConfig.city}`)}`;

  return (
    <section className="invitation-section details-section" id="details">
      <div className="section-tag">
        <Calendar size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>JOIN THE CELEBRATION</span>
      </div>

      <h2 className="section-heading">DATE & VENUE</h2>
      <p className="section-heading-tamil">நாள் மற்றும் நிகழ்வு நடைபெறும் இடம்</p>

      {/* Date & Time Card */}
      <div className="details-card-single glass-card">
        <div className="details-icon-wrapper">
          <Calendar size={28} className="details-header-icon" />
        </div>
        <span className="details-card-sublabel">CELEBRATION DATE & TIME</span>
        <h3 className="details-card-highlight">{invitationConfig.date}</h3>
        <p className="details-card-time">{invitationConfig.time}</p>

        <button
          type="button"
          className="details-btn details-btn-secondary"
          onClick={handleAddToCalendar}
          id="btn-add-calendar"
        >
          <CalendarPlus size={16} />
          <span>Add to Google Calendar</span>
        </button>
      </div>

      {/* Dedicated FIND THE VENUE / GOOGLE MAPS Section */}
      <div className="location-section-wrapper" id="location">
        <div className="location-venue-card glass-card">
          {/* Subtle Map Blueprint Background Pattern */}
          <div className="location-map-bg-pattern" />

          {/* Animated Gold Location Pin */}
          <div className="animated-pin-wrapper">
            <div className="pin-pulse-ring" />
            <div className="pin-circle">
              <MapPin size={26} className="gold-pin-icon" />
            </div>
          </div>

          <span className="location-header-tag">FIND THE VENUE</span>

          <h3 className="venue-title-main">
            {invitationConfig.venue.toUpperCase()}
          </h3>

          <p className="venue-city-subtitle">
            {invitationConfig.city.toUpperCase()}
          </p>

          <p className="venue-full-address">
            {invitationConfig.address}
          </p>

          {/* Action Buttons: VIEW ON GOOGLE MAPS & GET DIRECTIONS */}
          <div className="location-actions-grid">
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-cta-btn primary-map-btn"
              id="btn-view-google-maps"
            >
              <ExternalLink size={16} />
              <span>VIEW ON GOOGLE MAPS</span>
            </a>

            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-cta-btn secondary-map-btn"
              id="btn-get-directions"
            >
              <Navigation size={16} />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
