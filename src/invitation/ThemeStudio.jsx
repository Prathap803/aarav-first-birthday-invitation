import React, { useState } from 'react';
import { Palette, X, RotateCcw, Check } from 'lucide-react';
import { invitationConfig } from '../config/invitationConfig';

export default function ThemeStudio({ currentTheme, onSelectTheme, onReplayIntro, showToast }) {
  const [isOpen, setIsOpen] = useState(false);

  const presets = invitationConfig.themePresets;

  const handleSelect = (themeId) => {
    onSelectTheme(themeId);
    if (showToast) {
      const found = presets.find(p => p.id === themeId);
      showToast(`Theme switched to: ${found?.name || themeId} ✨`);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className="theme-studio-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open Demo Theme Studio"
        id="btn-theme-studio"
      >
        <Palette size={16} />
        <span>Theme Studio</span>
      </button>

      {/* Slide-out Drawer */}
      <div className={`theme-studio-drawer ${isOpen ? 'open' : ''}`}>
        <div className="theme-drawer-header">
          <div>
            <h3 className="theme-drawer-title">Theme Studio</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Client Demo Variations
            </p>
          </div>
          <button
            className="theme-drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close Theme Studio"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
            Select a luxury color palette to showcase to prospective clients in Tamil Nadu:
          </p>

          {presets.map((preset) => {
            const isSelected = currentTheme === preset.id;
            return (
              <div
                key={preset.id}
                className={`theme-preset-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(preset.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="theme-preset-name">{preset.name}</span>
                    {isSelected && <Check size={14} style={{ color: 'var(--gold-primary)' }} />}
                  </div>
                  <span className="theme-preset-badge">{preset.badge}</span>
                </div>

                <div className="theme-colors-dots">
                  {preset.previewColors.map((color, idx) => (
                    <span
                      key={idx}
                      className="theme-color-dot"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Replay Cinematic Intro Option */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <button
            className="details-btn details-btn-secondary"
            onClick={() => {
              setIsOpen(false);
              onReplayIntro();
            }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <RotateCcw size={15} />
            <span>Replay Cinematic Intro</span>
          </button>
        </div>
      </div>
    </>
  );
}
