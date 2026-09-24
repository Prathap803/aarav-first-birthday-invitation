import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function EventReveal({ forwardRef }) {
  return (
    <div ref={forwardRef} className="scene-container">
      <div style={{ maxWidth: '640px', width: '90vw' }}>
        <div className="cinematic-event-row cinematic-event-date">
          <Calendar size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
          {invitationConfig.date}
        </div>
        <div className="cinematic-event-row cinematic-event-time">
          <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
          {invitationConfig.time}
        </div>
        <div className="cinematic-event-row cinematic-event-location">
          <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
          {invitationConfig.venue} • {invitationConfig.city}
        </div>
      </div>
    </div>
  );
}
