import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { slidesData } from './data/slidesData';
import SlideRenderer from './slides/SlideRenderer';
import AmbientParticles from './components/AmbientParticles';
import HudControls from './components/HudControls';
import OverviewModal from './components/OverviewModal';
import ShortcutsModal from './components/ShortcutsModal';
import { playTickSound, isSoundEnabled, setSoundEnabled } from './utils/sound';

function IntroScreen({ onStart }) {
  return (
    <section className="intro-screen" aria-label="Iniciar apresentação Grupo Coomarcas">
      <div className="intro-brand">
        <img className="intro-logo" src="/assets/logo_coomarcas-branca.png" alt="Grupo Coomarcas" />
        <div className="intro-play-wrap">
          <span className="intro-play-orbit" aria-hidden="true" />
          <button type="button" className="intro-play" onClick={onStart} aria-label="Iniciar apresentação">
            <span className="intro-play-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PresentationChrome({ isLight, page, showMark = true }) {
  const logo = isLight ? '/assets/logo_coomarcas.png' : '/assets/logo_coomarcas-branca.png';
  return (
    <div className={`presentation-chrome ${isLight ? 'light' : 'dark'}`} aria-hidden="true">
      {showMark && <img className="presentation-mark" src={logo} alt="" />}
      <span className="presentation-footer">Apresentação Grupo Coomarcas · 2026 — {String(page).padStart(2, '0')}</span>
    </div>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const containerRef = useRef(null);
  const accordionNavigationRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const totalSlides = slidesData.length;
  const currentSlide = slidesData[currentIndex] || slidesData[0];

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides && index !== currentIndex) {
      accordionNavigationRef.current = null;
      setDirection(index > currentIndex ? 1 : -1);
      playTickSound(520, 0.06);
      setCurrentIndex(index);
    }
  }, [currentIndex, totalSlides]);
  const registerAccordionNavigation = useCallback((navigation) => {
    accordionNavigationRef.current = navigation;
  }, []);
  const handleNext = useCallback(() => {
    if (accordionNavigationRef.current?.advance?.()) {
      playTickSound(620, 0.05);
      return;
    }
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);
  const handlePrev = useCallback(() => {
    if (accordionNavigationRef.current?.retreat?.()) {
      playTickSound(430, 0.05);
      return;
    }
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);
  const handleToggleFullscreen = useCallback(() => {
    const element = containerRef.current;
    if (!document.fullscreenElement) element?.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);
  const startPresentation = useCallback(() => setHasStarted(true), []);
  const returnToIntro = useCallback(() => {
    setCurrentIndex(0);
    setDirection(-1);
    setOverviewOpen(false);
    setShortcutsOpen(false);
    setHasStarted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (!hasStarted) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startPresentation(); }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); handlePrev(); }
      else if (e.key === 'Home') { e.preventDefault(); goToSlide(0); }
      else if (e.key === 'End') { e.preventDefault(); goToSlide(totalSlides - 1); }
      else if (e.key.toLowerCase() === 'f') { e.preventDefault(); handleToggleFullscreen(); }
      else if (e.key.toLowerCase() === 'o') { e.preventDefault(); setOverviewOpen((value) => !value); }
      else if (e.key.toLowerCase() === 'm') { e.preventDefault(); const nextSound = !isSoundEnabled(); setSoundEnabled(nextSound); if (nextSound) playTickSound(700, 0.05); }
      else if (e.key === '?' || (e.shiftKey && e.key === '?')) { e.preventDefault(); setShortcutsOpen((value) => !value); }
      else if (e.key === 'Escape') { setOverviewOpen(false); setShortcutsOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToSlide, handleNext, handlePrev, handleToggleFullscreen, hasStarted, startPresentation, totalSlides]);

  const variants = reducedMotion ? { enter: { opacity: 1 }, center: { opacity: 1 }, exit: { opacity: 0 } } : {
    enter: (entryDirection) => ({ opacity: 0, x: entryDirection * 56, scale: 0.992 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (entryDirection) => ({ opacity: 0, x: entryDirection * -40, scale: 1.004 }),
  };

  return (
    <main ref={containerRef} className={`presentation-shell ${!hasStarted ? 'intro-mode' : ''}`} aria-label="Apresentação Coomarcas Nossa Virada">
      {hasStarted && <AmbientParticles />}
      <div className="presentation-stage" onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)} onTouchEnd={(e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (hasStarted && Math.abs(diff) > 52) diff > 0 ? handleNext() : handlePrev();
      }}>
        {!hasStarted ? <IntroScreen onStart={startPresentation} /> : <>
          <div className="presentation-progress" aria-hidden="true"><span style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }} /></div>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.section key={currentSlide.id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 0.8, 0.2, 1] }} className={`slide-frame ${currentSlide.isLight ? 'light' : 'dark'} ${currentSlide.id === 1 ? 'cover-slide' : ''}`}>
              <SlideRenderer slide={currentSlide} index={currentIndex} totalSlides={totalSlides} onGoToSlide={goToSlide} onRegisterNavigation={registerAccordionNavigation} />
              <PresentationChrome isLight={currentSlide.isLight} page={currentIndex + 1} showMark={currentIndex !== 0} />
            </motion.section>
          </AnimatePresence>
        </>}
      </div>
      {hasStarted && <>
        <HudControls currentIndex={currentIndex} totalSlides={totalSlides} currentTitle={currentSlide.title || `Slide ${currentIndex + 1}`} onPrev={handlePrev} onNext={handleNext} onHome={returnToIntro} onToggleOverview={() => setOverviewOpen(true)} onToggleShortcuts={() => setShortcutsOpen(true)} onToggleFullscreen={handleToggleFullscreen} />
        <OverviewModal isOpen={overviewOpen} onClose={() => setOverviewOpen(false)} slides={slidesData} currentIndex={currentIndex} onSelectSlide={goToSlide} />
        <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      </>}
    </main>
  );
}
