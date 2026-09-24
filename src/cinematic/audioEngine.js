// =======================================================================
// AUDIO SERVICE — HIGH-FIDELITY CINEMATIC SOUND & MUSIC CONTROLLER
// Handles HTML5 Audio (/assets/music/birthday.mp3), Web Audio synthesis,
// graceful autoplay policy handling, and seamless interaction fallback.
// =======================================================================

import { invitationConfig } from '../config/invitationConfig';

class AudioService {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.masterGain = null;
    this.synthOscillators = [];
    this.isMuted = false;
    this.isPlaying = false;
    this.autoplayAttempted = false;
    this.autoplayAllowed = false;
    this.targetVolume = 0.32;
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.fadeInterval = null;

    if (typeof window !== 'undefined') {
      this.setupAudioElement();
      this.setupGlobalInteractionListeners();
    }
  }

  // Subscribe UI components to music state changes
  subscribe(callback) {
    this.listeners.add(callback);
    callback({ isPlaying: this.isPlaying, isMuted: this.isMuted });
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb({ isPlaying: this.isPlaying, isMuted: this.isMuted });
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Setup HTML5 Audio element
  setupAudioElement() {
    try {
      const audio = new Audio();
      audio.src = invitationConfig.music || '/assets/music/birthday.mp3';
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0; // Starts at 0 for smooth fade-in

      audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      audio.addEventListener('error', (e) => {
        console.warn('Audio element error, falling back to Web Audio synth ambience:', e);
        this.startSynthAmbience();
      });

      this.audioElement = audio;
    } catch (e) {
      console.warn('Failed to initialize Audio element:', e);
    }
  }

  // Setup one-time interaction listeners for browsers that block initial autoplay
  setupGlobalInteractionListeners() {
    const handleFirstInteraction = () => {
      if (this.hasUserInteracted) return;
      this.hasUserInteracted = true;

      // Clean up event listeners
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);

      // Attempt to play if not already playing
      if (!this.isPlaying && !this.isMuted) {
        this.play(true);
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });
  }

  // Try autoplay on page load
  attemptAutoplay() {
    if (this.autoplayAttempted) return;
    this.autoplayAttempted = true;

    this.play(true)
      .then(() => {
        this.autoplayAllowed = true;
      })
      .catch(() => {
        // Autoplay policy prevented playback - normal in Chrome/Safari without gesture
        this.autoplayAllowed = false;
      });
  }

  // Fade volume smoothly
  fadeVolume(from, to, durationMs = 1500) {
    if (!this.audioElement) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const steps = 30;
    const stepTime = durationMs / steps;
    const diff = to - from;
    let currentStep = 0;

    this.audioElement.volume = Math.max(0, Math.min(1, from));

    this.fadeInterval = setInterval(() => {
      currentStep++;
      const current = from + (diff * (currentStep / steps));
      if (this.audioElement) {
        this.audioElement.volume = Math.max(0, Math.min(1, current));
      }

      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (this.audioElement) {
          this.audioElement.volume = Math.max(0, Math.min(1, to));
        }
      }
    }, stepTime);
  }

  // Primary play method
  async play(fadeIn = true) {
    if (this.isMuted) return;

    // Ensure Audio Context is active if created
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (e) {
        console.warn('AudioContext resume failed:', e);
      }
    }

    if (this.audioElement) {
      try {
        if (fadeIn) {
          this.audioElement.volume = 0;
        } else {
          this.audioElement.volume = this.targetVolume;
        }

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlaying = true;
          this.notify();

          if (fadeIn) {
            this.fadeVolume(0, this.targetVolume, 2000);
          }
          return;
        }
      } catch (err) {
        // Fallback to Web Audio synthesis if audio element fails to decode or load
        this.startSynthAmbience();
        throw err;
      }
    } else {
      this.startSynthAmbience();
    }
  }

  pause() {
    if (this.audioElement) {
      this.fadeVolume(this.audioElement.volume, 0, 600);
      setTimeout(() => {
        if (this.audioElement) this.audioElement.pause();
        this.isPlaying = false;
        this.notify();
      }, 650);
    }
    this.stopSynthAmbience();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
      this.isMuted = true;
    } else {
      this.isMuted = false;
      this.play(true);
    }
    this.notify();
    return !this.isPlaying;
  }

  toggleMute() {
    return this.togglePlay();
  }

  // -------------------------------------------------------------
  // Web Audio Synthesizer Fallback & SFX
  // -------------------------------------------------------------
  initWebAudio() {
    if (this.audioCtx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.audioCtx = new AudioCtx();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  }

  startSynthAmbience() {
    this.initWebAudio();
    if (!this.audioCtx || this.synthOscillators.length > 0) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const baseFreqs = [146.83, 220.0, 277.18, 369.99]; // D3, A3, C#4, F#4

    this.synthOscillators = baseFreqs.map((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + i * 80, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08 / baseFreqs.length, now + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      return { osc, gain };
    });

    this.isPlaying = true;
    this.notify();
  }

  stopSynthAmbience() {
    if (this.synthOscillators.length === 0 || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    this.synthOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => osc.stop(), 900);
      } catch (e) {
        console.warn(e);
      }
    });
    this.synthOscillators = [];
  }

  // Subtle traditional chime
  playChime(note = 587.33) {
    if (this.isMuted) return;
    this.initWebAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);
      osc.frequency.exponentialRampToValueAtTime(note * 0.995, now + 2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.1);
    } catch (e) {
      console.warn(e);
    }
  }

  // Celebratory harp flourish when user taps "OPEN INVITATION"
  playCelebrationFlourish() {
    if (this.isMuted) return;
    this.initWebAudio();
    if (!this.audioCtx) return;

    try {
      const notes = [293.66, 369.99, 440.0, 554.37, 587.33, 739.99, 880.0];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, i) => {
        const startTime = now + i * 0.07;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.65);
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

export const soundEngine = new AudioService();
export default soundEngine;
