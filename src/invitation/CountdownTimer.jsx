import React, { useState, useEffect } from 'react';
import { Clock, PartyPopper } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false
  });

  useEffect(() => {
    // 18 October 2026 6:00 PM Asia/Kolkata
    const targetDate = new Date(invitationConfig.rawDate || "2026-10-18T18:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, hasStarted: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="invitation-section countdown-section" id="countdown">
      <div className="section-tag">
        <Clock size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>COUNTDOWN TO CELEBRATION</span>
      </div>

      <h2 className="section-heading">COUNTING DOWN THE SECONDS</h2>
      <p className="section-heading-tamil">மகிழ்ச்சி தொடங்கும் நேரம்</p>

      {timeLeft.hasStarted ? (
        <div className="celebration-started-banner glass-card">
          <PartyPopper size={32} className="party-icon" />
          <h3 className="celebration-started-title">THE CELEBRATION HAS BEGUN!</h3>
          <p className="celebration-started-sub">We are so delighted to celebrate with you!</p>
        </div>
      ) : (
        <div className="countdown-grid">
          {/* Days */}
          <div className="countdown-box glass-card">
            <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="countdown-label">DAYS</span>
          </div>

          {/* Hours */}
          <div className="countdown-box glass-card">
            <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="countdown-label">HOURS</span>
          </div>

          {/* Minutes */}
          <div className="countdown-box glass-card">
            <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">MINUTES</span>
          </div>

          {/* Seconds */}
          <div className="countdown-box glass-card">
            <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">SECONDS</span>
          </div>
        </div>
      )}
    </section>
  );
}
