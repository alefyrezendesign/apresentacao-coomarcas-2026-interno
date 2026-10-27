import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    <section className="intro-screen" aria-label="Tela inicial da apresentação">
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

const lightBackgroundVideos = [
  '/videos/bg-vd-branco.mp4',
  '/videos/bg-vd-branco-2.mp4',
  '/videos/bg-vd-branco-3.mp4',
];

export function getSlideBackgroundVideo(slide) {
  if (!slide) return null;
  // Slide 2, 4, 5, 8, 9: Vídeo de líquido escuro
  if ([2, 4, 5, 8, 9].includes(slide.id)) return '/videos/bg-vd-liquid-escuro.mp4';
  // Slide 1 (Capa) e Slide 6 (Organograma): Vídeo escuro institucional
  if (slide.id === 1 || slide.id === 6) return '/videos/bg-vd-escuro.mp4';
  // Slide 7 (Marcas) e Slide 16 (Evidência): Vídeo de partículas/pontos escuros
  if ([7, 16].includes(slide.id)) return '/videos/bg-vd-escuro-pontos.mp4';
  // Slide 10: Vídeo azul da jornada
  if (slide.id === 10) return '/videos/bg-vd-azul.mp4';
  // Slide 13, 14, 15, 17: Gradiente escuro
  if ([13, 14, 15, 17].includes(slide.id)) return '/videos/bg-gradient-escuro.mp4';
  // Slide 18: Onda baixa
  if (slide.id === 18) return '/videos/bg-onda-baixo.mp4';
  // Slide 19: Vídeo claro 2
  if (slide.id === 19) return '/videos/bg-vd-branco-2.mp4';
  // Slide 20: Linhas
  if (slide.id === 20) return '/videos/bg-vd-linhas.mp4';
  // Slide 21: Vídeo claro 3
  if (slide.id === 21) return '/videos/bg-vd-branco-3.mp4';
  // Fallback para slides claros
  if (!slide.isLight) return null;
  const lightSlidesBefore = slidesData.filter((item) => item.isLight && item.id <= slide.id);
  return lightBackgroundVideos[(lightSlidesBefore.length - 1) % lightBackgroundVideos.length];
}

export function getSlideBackgroundOverlay(slide) {
  if (!slide) return null;
  // Slide 7 (Marcas) recebe overlay consideravelmente mais escuro com gradiente e blur para máxima legibilidade
  if (slide.id === 7) return 'marcas-dark-overlay';
  // Slides com vídeo de líquido recebem overlay escuro reforçado para máximo contraste
  if ([2, 4, 5, 8, 9].includes(slide.id)) return 'liquid-overlay';
  // Slide 16 com pontos recebe overlay escuro profundo para atenuar brilho e destacar textos
  if (slide.id === 16) return 'points-overlay';
  // Slide 10 recebe overlay azul escuro de alta legibilidade
  if (slide.id === 10) return 'soft-blue';
  // Slides com gradiente escuro recebem overlay escuro consistente
  if ([13, 14, 15, 17].includes(slide.id)) return 'soft-black';
  // Slide 20 com linhas
  if (slide.id === 20) return 'lines-overlay';
  return null;
}

const ALL_BACKGROUND_VIDEOS = [
  '/videos/bg-vd-escuro.mp4',
  '/videos/bg-vd-liquid-escuro.mp4',
  '/videos/bg-vd-branco.mp4',
  '/videos/bg-vd-branco-2.mp4',
  '/videos/bg-vd-branco-3.mp4',
  '/videos/bg-vd-escuro-pontos.mp4',
  '/videos/bg-vd-azul.mp4',
  '/videos/bg-gradient-escuro.mp4',
  '/videos/bg-onda-baixo.mp4',
  '/videos/bg-vd-linhas.mp4',
];

const preloadedVideos = new Set();
function preloadAllVideos() {
  ALL_BACKGROUND_VIDEOS.forEach((src) => {
    if (preloadedVideos.has(src)) return;
    preloadedVideos.add(src);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    link.href = src;
    document.head.appendChild(link);
  });
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
  const backgroundVideo = getSlideBackgroundVideo(currentSlide);
  const backgroundOverlay = getSlideBackgroundOverlay(currentSlide);

  useEffect(() => {
    preloadAllVideos();
  }, []);

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
    enter: (entryDirection) => ({ opacity: 0, x: entryDirection * 40, scale: 0.996 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (entryDirection) => ({ opacity: 0, x: entryDirection * -28, scale: 1.002 }),
  };

  return (
    <main ref={containerRef} className={`presentation-shell ${!hasStarted ? 'intro-mode' : ''}`} aria-label="Apresentação Coomarcas Nossa Virada">
      {hasStarted && <AmbientParticles />}
      <div className="presentation-stage" onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)} onTouchEnd={(e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (hasStarted && Math.abs(diff) > 52) diff > 0 ? handleNext() : handlePrev();
      }}>
        {!hasStarted ? (
          <IntroScreen onStart={startPresentation} />
        ) : (
          <>
            <div className="presentation-progress" aria-hidden="true">
              <span style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }} />
            </div>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.section
                key={currentSlide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`slide-frame ${currentSlide.isLight ? 'light' : 'dark'} ${currentSlide.id === 1 ? 'cover-slide' : ''} ${backgroundVideo ? 'video-background' : ''}`}
              >
                {backgroundVideo && (
                  <video
                    className="slide-background-video"
                    src={backgroundVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                )}
                {backgroundOverlay && (
                  <div className={`slide-video-overlay ${backgroundOverlay}`} aria-hidden="true" />
                )}
                <SlideRenderer
                  slide={currentSlide}
                  index={currentIndex}
                  totalSlides={totalSlides}
                  onGoToSlide={goToSlide}
                  onRegisterNavigation={registerAccordionNavigation}
                />
                <PresentationChrome
                  isLight={currentSlide.isLight}
                  page={currentIndex + 1}
                  showMark={currentIndex !== 0}
                />
              </motion.section>
            </AnimatePresence>
          </>
        )}
      </div>
      {hasStarted && (
        <>
          <HudControls
            currentIndex={currentIndex}
            totalSlides={totalSlides}
            currentTitle={currentSlide.title || `Slide ${currentIndex + 1}`}
            onPrev={handlePrev}
            onNext={handleNext}
            onHome={returnToIntro}
            onToggleOverview={() => setOverviewOpen(true)}
            onToggleShortcuts={() => setShortcutsOpen(true)}
            onToggleFullscreen={handleToggleFullscreen}
          />
          <OverviewModal
            isOpen={overviewOpen}
            onClose={() => setOverviewOpen(false)}
            slides={slidesData}
            currentIndex={currentIndex}
            onSelectSlide={goToSlide}
          />
          <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
        </>
      )}
    </main>
  );
}
