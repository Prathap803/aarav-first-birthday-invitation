import React, { useEffect, useRef } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

const timelineSchedule = [
  {
    time: "6:00 PM",
    title: "Guest Arrival",
    tamilTitle: "விருந்தினர் வருகை",
    desc: "Warm South Indian welcome with rosewater, badam milk & appetizers"
  },
  {
    time: "6:30 PM",
    title: "Cake Cutting",
    tamilTitle: "கேக் வெட்டும் நிகழ்வு",
    desc: "Join us around the royal stage as Aarav cuts his magnificent 1st birthday cake"
  },
  {
    time: "7:00 PM",
    title: "Fun & Games",
    tamilTitle: "விளையாட்டுகள் & கொண்டாட்டம்",
    desc: "Delightful magic show, music, games & activities for kids and families"
  },
  {
    time: "7:30 PM",
    title: "Dinner",
    tamilTitle: "அறுசுவை விருந்து",
    desc: "Lavish multi-cuisine banquet feast featuring authentic South Indian delicacies"
  },
  {
    time: "8:30 PM",
    title: "Memories & Celebration",
    tamilTitle: "நினைவுகள் & ஆசிகள்",
    desc: "Shower Aarav with loving blessings, photo sessions & cherished memories"
  }
];

export default function Timeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={timelineRef} className="invitation-section timeline-section" id="timeline">
      <div className="section-tag">
        <Sparkles size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>EVENING PROGRAMME</span>
      </div>

      <h2 className="section-heading">EVENT TIMELINE</h2>
      <p className="section-heading-tamil">நிகழ்ச்சி நிரல்</p>

      <div className="timeline-container">
        <div className="timeline-line" />

        {timelineSchedule.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-node">
              <span className="timeline-node-pulse" />
            </div>

            <div className="timeline-card glass-card">
              <div className="timeline-time-badge">
                <Clock size={13} />
                <span>{item.time}</span>
              </div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-tamil-sub">{item.tamilTitle}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
