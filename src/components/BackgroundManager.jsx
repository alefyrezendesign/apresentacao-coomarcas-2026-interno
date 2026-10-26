import React, { useEffect, useRef, useState, useMemo } from 'react';
import { slidesData } from '../data/slidesData';

const lightBackgroundVideos = [
  '/videos/bg-vd-branco.mp4',
  '/videos/bg-vd-branco-2.mp4',
  '/videos/bg-vd-branco-3.mp4',
];

export function getSlideBackgroundVideo(slide) {
  if (!slide) return null;
  if ([2, 4, 5, 8, 9].includes(slide.id)) return '/videos/bg-vd-liquid-escuro.mp4';
  if (slide.id === 1 || slide.id === 6) return '/videos/bg-vd-escuro.mp4';
  if ([7, 16].includes(slide.id)) return '/videos/bg-vd-escuro-pontos.mp4';
  if (slide.id === 10) return '/videos/bg-vd-azul.mp4';
  if ([14, 15].includes(slide.id)) return '/videos/bg-gradient-escuro.mp4';
  if (slide.id === 18) return '/videos/bg-onda-baixo.mp4';
  if (slide.id === 19) return '/videos/bg-vd-branco-2.mp4';
  if (slide.id === 20) return '/videos/bg-vd-linhas.mp4';
  if (slide.id === 21) return '/videos/bg-vd-branco-3.mp4';
  if (!slide.isLight) return null;
  const lightSlidesBefore = slidesData.filter((item) => item.isLight && item.id <= slide.id);
  return lightBackgroundVideos[(lightSlidesBefore.length - 1) % lightBackgroundVideos.length];
}

export function getSlideBackgroundOverlay(slide) {
  if (!slide) return null;
  if ([2, 4, 5, 8, 9].includes(slide.id)) return 'liquid-overlay';
  if ([7, 16].includes(slide.id)) return 'soft-black points-overlay';
  if (slide.id === 10) return 'soft-blue';
  if ([14, 15].includes(slide.id)) return 'soft-black';
  if (slide.id === 20) return 'lines-overlay';
  return null;
}

// Fila inteligente de preload de vídeos prioritários
const preloadedVideos = new Set();
const videoPreloadCache = new Map();

function preloadVideoSource(src) {
  if (!src || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);

  try {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.load();
    videoPreloadCache.set(src, video);
  } catch (err) {
    // Fallback silencioso caso navegador restrinja
  }
}

export default function BackgroundManager({ currentSlide, currentIndex, hasStarted }) {
  const currentVideoSrc = useMemo(() => getSlideBackgroundVideo(currentSlide), [currentSlide]);
  const currentOverlay = useMemo(() => getSlideBackgroundOverlay(currentSlide), [currentSlide]);

  const isLight = currentSlide?.isLight || false;
  const isCover = currentSlide?.id === 1;

  // Estado para transição suave de vídeos (Dual-Slot Crossfade)
  const [activeSlot, setActiveSlot] = useState('A');
  const [slotASrc, setSlotASrc] = useState(currentVideoSrc);
  const [slotBSrc, setSlotBSrc] = useState(null);
  const [slotAReady, setSlotAReady] = useState(false);
  const [slotBReady, setSlotBReady] = useState(false);

  const videoRefA = useRef(null);
  const videoRefB = useRef(null);
  const lastSrcRef = useRef(currentVideoSrc);

  // 1. Pré-carregamento prioritário na inicialização (mesmo durante a tela de início)
  useEffect(() => {
    // Imediato: Capa (1), Slide 2 (Liquid) e Slide 3 (Branco - primeiro light mode)
    const priorityVideos = [
      '/videos/bg-vd-escuro.mp4',
      '/videos/bg-vd-liquid-escuro.mp4',
      '/videos/bg-vd-branco.mp4',
      '/videos/bg-vd-escuro-pontos.mp4',
    ];

    priorityVideos.forEach((src) => preloadVideoSource(src));

    // Carregamento progressivo em background dos próximos vídeos
    const idleTimer = window.setTimeout(() => {
      slidesData.forEach((s) => {
        const video = getSlideBackgroundVideo(s);
        if (video) preloadVideoSource(video);
      });
    }, 1500);

    return () => window.clearTimeout(idleTimer);
  }, []);

  // 2. Preload de janela deslizante (próximo e anterior) durante a navegação
  useEffect(() => {
    if (!hasStarted) return;

    // Próximos 2 slides
    for (let i = currentIndex + 1; i <= Math.min(currentIndex + 2, slidesData.length - 1); i++) {
      const nextSrc = getSlideBackgroundVideo(slidesData[i]);
      if (nextSrc) preloadVideoSource(nextSrc);
    }

    // Slide anterior (para volta instantânea)
    if (currentIndex > 0) {
      const prevSrc = getSlideBackgroundVideo(slidesData[currentIndex - 1]);
      if (prevSrc) preloadVideoSource(prevSrc);
    }
  }, [currentIndex, hasStarted]);

  // 3. Gerenciamento de troca e continuidade de vídeo
  useEffect(() => {
    // Se a URL do vídeo não mudou (ex: slide 4 -> 5, ou 8 -> 9, ou expansão interna), NÃO reinicia!
    if (currentVideoSrc === lastSrcRef.current) {
      return;
    }

    lastSrcRef.current = currentVideoSrc;

    if (!currentVideoSrc) {
      // Nenhum vídeo neste slide: esmaece o slot ativo
      if (activeSlot === 'A') setSlotAReady(false);
      else setSlotBReady(false);
      return;
    }

    // Alterna o slot para realizar o crossfade
    if (activeSlot === 'A') {
      setSlotBSrc(currentVideoSrc);
      setSlotBReady(false);
      setActiveSlot('B');
    } else {
      setSlotASrc(currentVideoSrc);
      setSlotAReady(false);
      setActiveSlot('A');
    }
  }, [currentVideoSrc, activeSlot]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-colors duration-500 z-0 ${
        isCover
          ? 'bg-[#050505]'
          : isLight
          ? 'bg-[#f5f5f5]'
          : 'bg-[#050505]'
      }`}
      style={{
        backgroundImage: isCover
          ? "url('/backgrounds/coomarcas-ambient.jpg')"
          : isLight
          ? 'linear-gradient(140deg, #ffffff, #efefef)'
          : 'linear-gradient(140deg, #0a0d12, #050608)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-hidden="true"
    >
      {/* Grade sutil para slides claros */}
      {isLight && !isCover && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.025) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
            maskImage: 'linear-gradient(to bottom, black, transparent 72%)',
          }}
        />
      )}

      {/* Slot A de Vídeo */}
      {slotASrc && (
        <video
          ref={videoRefA}
          key="slotA"
          className="slide-background-video transition-opacity duration-500 ease-out"
          style={{
            opacity: activeSlot === 'A' && slotAReady ? 1 : 0,
            zIndex: activeSlot === 'A' ? 2 : 1,
          }}
          src={slotASrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setSlotAReady(true)}
          onPlaying={() => setSlotAReady(true)}
          tabIndex={-1}
        />
      )}

      {/* Slot B de Vídeo */}
      {slotBSrc && (
        <video
          ref={videoRefB}
          key="slotB"
          className="slide-background-video transition-opacity duration-500 ease-out"
          style={{
            opacity: activeSlot === 'B' && slotBReady ? 1 : 0,
            zIndex: activeSlot === 'B' ? 2 : 1,
          }}
          src={slotBSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setSlotBReady(true)}
          onPlaying={() => setSlotBReady(true)}
          tabIndex={-1}
        />
      )}

      {/* Overlay Escuro / Colorido do Slide */}
      {currentOverlay && (
        <div
          className={`slide-video-overlay ${currentOverlay} transition-opacity duration-300 z-10`}
          style={{ opacity: 1 }}
        />
      )}
    </div>
  );
}
