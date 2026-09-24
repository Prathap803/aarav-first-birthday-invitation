import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function PhotoGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const images = invitationConfig.galleryImages || [];

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isSwipe = Math.abs(distance) > 45;

    if (isSwipe) {
      if (distance > 0) {
        showNext(); // Swiped left -> next
      } else {
        showPrev(); // Swiped right -> prev
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section className="invitation-section gallery-section" id="gallery">
      <div className="section-tag">
        <Camera size={13} style={{ color: 'var(--gold-primary)' }} />
        <span>PHOTO MEMORIES</span>
      </div>

      <h2 className="section-heading">A YEAR OF LITTLE MOMENTS</h2>
      <p className="section-heading-tamil">எங்கள் குழந்தையின் அழகிய நினைவுகள்</p>

      {/* Grid of Photo Cards */}
      <div className="gallery-grid">
        {images.map((item, index) => (
          <div
            key={index}
            className="gallery-card"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            aria-label={`View photo: ${item.title}`}
          >
            <div className="gallery-img-wrapper">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="gallery-img"
              />
              <div className="gallery-zoom-badge">
                <ZoomIn size={16} />
              </div>
            </div>

            <div className="gallery-overlay">
              <span className="gallery-item-category">{item.category}</span>
              <h4 className="gallery-item-title">{item.title}</h4>
              <p className="gallery-item-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal with Swipe Support */}
      {activeImageIndex !== null && (
        <div
          className="lightbox-modal"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            className="lightbox-close-btn"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </button>

          {/* Navigation Controls */}
          <button
            className="lightbox-nav-btn lightbox-prev-btn"
            onClick={showPrev}
            aria-label="Previous Photo"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="lightbox-nav-btn lightbox-next-btn"
            onClick={showNext}
            aria-label="Next Photo"
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image Container */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[activeImageIndex].src}
              alt={images[activeImageIndex].title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <span className="lightbox-counter">
                {activeImageIndex + 1} of {images.length}
              </span>
              <h3 className="lightbox-title">
                {images[activeImageIndex].title}
              </h3>
              <p className="lightbox-subtitle">
                {images[activeImageIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
