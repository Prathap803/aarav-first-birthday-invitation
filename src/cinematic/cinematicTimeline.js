// =======================================================================
// CINEMATIC GSAP TIMELINE ENGINE
// Movie-style title sequence with 8 distinct scenes & camera choreography
// =======================================================================

import gsap from 'gsap';
import { soundEngine } from './audioEngine';

export function createCinematicTimeline({
  cameraRigRef,
  sceneRefs,
  onSceneChange,
  onComplete
}) {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  const {
    scene1Ref,
    scene2Ref,
    scene3Ref,
    scene4Ref,
    scene5Ref,
    scene6Ref,
    scene7Ref,
    scene8Ref,
    finalFrameRef
  } = sceneRefs;

  // Initial resets
  gsap.set(
    [
      scene1Ref.current,
      scene2Ref.current,
      scene3Ref.current,
      scene4Ref.current,
      scene5Ref.current,
      scene6Ref.current,
      scene7Ref.current,
      scene8Ref.current,
      finalFrameRef.current
    ],
    { opacity: 0, scale: 0.96, filter: 'blur(8px)' }
  );

  // -------------------------------------------------------------
  // SCENE 1: BLACK SCREEN & EXPANDING GOLDEN EMBER (~1.2s)
  // -------------------------------------------------------------
  tl.addLabel('scene1', 0)
    .call(() => onSceneChange && onSceneChange(1))
    .to(scene1Ref.current, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    })
    .to(
      scene1Ref.current.querySelector('.scene-ember-center'),
      {
        scale: 4,
        boxShadow: '0 0 50px 25px rgba(246, 229, 166, 0.9), 0 0 120px 60px rgba(212, 175, 55, 0.7)',
        duration: 1.2,
        ease: 'power3.out'
      },
      '-=0.4'
    )
    .to(scene1Ref.current, {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(12px)',
      duration: 0.7,
      ease: 'power2.in'
    });

  // -------------------------------------------------------------
  // SCENE 2: TAMIL KOLAM ORNAMENTAL REVEAL
  // -------------------------------------------------------------
  tl.addLabel('scene2')
    .call(() => {
      onSceneChange && onSceneChange(2);
      soundEngine.playChime(659.25); // E5 chime
    })
    .to(scene2Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    .to(
      scene2Ref.current.querySelectorAll('.kolam-path'),
      {
        strokeDashoffset: 0,
        duration: 2.2,
        stagger: 0.15,
        ease: 'power1.inOut'
      },
      '-=0.8'
    )
    .to(cameraRigRef.current, {
      scale: 1.05,
      duration: 2.5,
      ease: 'power1.out'
    }, '<')
    .to(scene2Ref.current, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(8px)',
      duration: 0.8,
      ease: 'power2.inOut'
    }, '+=0.4');

  // -------------------------------------------------------------
  // SCENE 3: POETIC TEXT: ஒரு வருடம்... / ONE BEAUTIFUL YEAR
  // -------------------------------------------------------------
  tl.addLabel('scene3')
    .call(() => {
      onSceneChange && onSceneChange(3);
      soundEngine.playWhoosh();
    })
    .to(scene3Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out'
    })
    .fromTo(
      scene3Ref.current.querySelector('.poetic-tamil-text'),
      { y: 25, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(
      scene3Ref.current.querySelector('.poetic-english-text'),
      { y: 20, opacity: 0, letterSpacing: '0.15em' },
      { y: 0, opacity: 0.9, letterSpacing: '0.35em', duration: 1.3, ease: 'power2.out' },
      '-=0.7'
    )
    .to(scene3Ref.current, {
      opacity: 0,
      y: -20,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.in'
    }, '+=1.2');

  // -------------------------------------------------------------
  // SCENE 4: CINEMATIC PORTRAIT REVEAL (AARAV)
  // -------------------------------------------------------------
  tl.addLabel('scene4')
    .call(() => {
      onSceneChange && onSceneChange(4);
      soundEngine.playChime(587.33); // D5
    })
    .to(scene4Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out'
    })
    .fromTo(
      scene4Ref.current.querySelector('.portrait-frame-outer'),
      { scale: 0.88, filter: 'blur(6px)' },
      { scale: 1, filter: 'blur(0px)', duration: 2.8, ease: 'power1.out' },
      '< duration'
    )
    .to(
      scene4Ref.current.querySelector('.portrait-img'),
      { scale: 1.08, duration: 3.5, ease: 'power1.out' },
      '<'
    )
    .to(scene4Ref.current, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(8px)',
      duration: 0.85,
      ease: 'power2.inOut'
    }, '+=1.0');

  // -------------------------------------------------------------
  // SCENE 5: NAME REVEAL: AARAV • TURNS ONE • எங்கள் குட்டி இளவரசன்
  // -------------------------------------------------------------
  tl.addLabel('scene5')
    .call(() => {
      onSceneChange && onSceneChange(5);
      soundEngine.playWhoosh();
    })
    .to(scene5Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    })
    .fromTo(
      scene5Ref.current.querySelector('.cinematic-child-name'),
      { letterSpacing: '0.12em', opacity: 0, y: 30, filter: 'blur(12px)' },
      { letterSpacing: '0.28em', opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
      '-=0.5'
    )
    .fromTo(
      scene5Ref.current.querySelector('.cinematic-turns-one'),
      { opacity: 0, y: 15, letterSpacing: '0.2em' },
      { opacity: 0.9, y: 0, letterSpacing: '0.45em', duration: 1.1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(
      scene5Ref.current.querySelector('.cinematic-tamil-prince'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.7'
    )
    .to(scene5Ref.current, {
      opacity: 0,
      y: -25,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.in'
    }, '+=1.2');

  // -------------------------------------------------------------
  // SCENE 6: PARENTS REVEAL: PRATHAP & SOFEYA
  // -------------------------------------------------------------
  tl.addLabel('scene6')
    .call(() => onSceneChange && onSceneChange(6))
    .to(scene6Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    })
    .fromTo(
      scene6Ref.current.querySelector('.cinematic-parents-title'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      scene6Ref.current.querySelector('.cinematic-parents-sub'),
      { opacity: 0 },
      { opacity: 0.9, duration: 1, ease: 'power2.out' },
      '-=0.6'
    )
    .to(scene6Ref.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
      duration: 0.7,
      ease: 'power2.in'
    }, '+=1.0');

  // -------------------------------------------------------------
  // SCENE 7: EVENT DETAILS: 18 OCTOBER 2026 • CHENNAI
  // -------------------------------------------------------------
  tl.addLabel('scene7')
    .call(() => {
      onSceneChange && onSceneChange(7);
      soundEngine.playChime(739.99); // F#5
    })
    .to(scene7Ref.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    })
    .fromTo(
      scene7Ref.current.querySelectorAll('.cinematic-event-row'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.25, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    .to(scene7Ref.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
      duration: 0.7,
      ease: 'power2.in'
    }, '+=1.0');

  // -------------------------------------------------------------
  // SCENE 8: GOLDEN LIGHT SWEEP & FINAL LANDING FRAME
  // -------------------------------------------------------------
  tl.addLabel('scene8')
    .call(() => {
      onSceneChange && onSceneChange(8);
      soundEngine.playWhoosh();
    })
    // Warm golden sweep flare
    .fromTo(
      scene8Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 0.9, scale: 1.4, duration: 0.85, ease: 'power2.inOut' }
    )
    .to(scene8Ref.current, {
      opacity: 0,
      scale: 2,
      duration: 0.9,
      ease: 'power3.out'
    })
    // Final Frame Appears & Locks in
    .to(finalFrameRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out'
    }, '-=0.6')
    .fromTo(
      finalFrameRef.current.querySelector('.cinematic-open-btn'),
      { scale: 0.9, opacity: 0, boxShadow: '0 0 0 rgba(212, 175, 55, 0)' },
      { scale: 1, opacity: 1, boxShadow: '0 0 35px rgba(212, 175, 55, 0.4)', duration: 1, ease: 'back.out(1.5)' },
      '-=0.5'
    );

  return tl;
}
