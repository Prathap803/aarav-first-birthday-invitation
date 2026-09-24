import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from './audioEngine';

export default function AudioController() {
  const [audioState, setAudioState] = useState({ isPlaying: false, isMuted: false });

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    soundEngine.togglePlay();
  };

  const isOff = audioState.isMuted || !audioState.isPlaying;

  return (
    <button
      className={`cinematic-sound-toggle ${!isOff ? 'playing' : 'muted'}`}
      onClick={handleToggle}
      aria-label={isOff ? 'Turn Music On' : 'Turn Music Off'}
      title={isOff ? 'Play Music' : 'Pause Music'}
      id="btn-music-toggle"
    >
      {isOff ? (
        <>
          <VolumeX size={15} />
          <span>Music Off</span>
        </>
      ) : (
        <>
          <Music size={14} className="music-note-icon" />
          <div className="sound-wave-bars">
            <span className="sound-wave-bar" />
            <span className="sound-wave-bar" />
            <span className="sound-wave-bar" />
          </div>
          <span>Music On</span>
        </>
      )}
    </button>
  );
}
