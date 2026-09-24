import React, { useState, useEffect } from 'react';
import CinematicLanding from './cinematic/CinematicLanding';
import MainInvitation from './invitation/MainInvitation';
import './styles/themes.css';
import './styles/cinematic.css';
import './styles/invitation.css';

export default function App() {
  const [inInvitation, setInInvitation] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('royal-blue');
  const [toastMessage, setToastMessage] = useState(null);

  // Apply theme class to document element
  useEffect(() => {
    document.documentElement.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleEnterInvitation = () => {
    setInInvitation(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReplayIntro = () => {
    setInInvitation(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`app-wrapper theme-${currentTheme}`}>
      {!inInvitation ? (
        <CinematicLanding onEnterInvitation={handleEnterInvitation} />
      ) : (
        <MainInvitation
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
          onReplayIntro={handleReplayIntro}
          showToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      <div className={`app-toast ${toastMessage ? 'visible' : ''}`}>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
