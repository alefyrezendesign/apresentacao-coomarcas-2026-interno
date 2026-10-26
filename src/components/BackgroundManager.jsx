import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { slidesData } from '../data/slidesData';

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
  // Slides com vídeo de líquido recebem overlay escuro reforçado para máximo contraste
  if ([2, 4, 5, 8, 9].includes(slide.id)) return 'liquid-overlay';
  // Slides 7 e 16 com pontos recebem overlay escuro profundo para atenuar brilho e destacar textos
  if ([7, 16].includes(slide.id)) return 'points-overlay';
  // Slide 10 recebe overlay azul escuro de alta legibilidade
  if (slide.id === 10) return 'soft-blue';
  // Slides com gradiente escuro recebem overlay escuro consistente
  if ([13, 14, 15, 17].includes(slide.id)) return 'soft-black';
  // Slide 20 com linhas
  if (slide.id === 20) return 'lines-overlay';
  return null;
}

// Fila inteligente de preload persistente
const preloadedVideos = new Set();
const videoPreloadCache = new Map();

function preloadVideoSource(src) {
  if (!src || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);

  try {
    // 1. Preload via elemento de vídeo para decodificação em buffer
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.load();
    videoPreloadCache.set(src, video);

    // 2. Preload via link na head para prioridade de rede pelo browser
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    link.href = src;
    document.head.appendChild(link);
  } catch (err) {
    // Fallback silencioso
  }
}

function preloadImageSource(src) {
  if (!src) return;
  try {
    const img = new Image();
    img.src = src;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  } catch (err) {
    // Fallback silencioso
  }
}

export default function BackgroundManager({ currentSlide, currentIndex, hasStarted }) {
  const currentVideoSrc = useMemo(() => getSlideBackgroundVideo(currentSlide), [currentSlide]);
  const currentOverlay = useMemo(() => getSlideBackgroundOverlay(currentSlide), [currentSlide]);

  const isLight = currentSlide?.isLight || false;

  // Gerenciamento de slots para crossfade suave e sem quedas (A e B)
  const [activeSlot, setActiveSlot] = useState('A');
  const [slotASrc, setSlotASrc] = useState(currentVideoSrc);
  const [slotBSrc, setSlotBSrc] = useState(null);
  const [slotAReady, setSlotAReady] = useState(false);
  const [slotBReady, setSlotBReady] = useState(false);

  const videoRefA = useRef(null);
  const videoRefB = useRef(null);
  const lastSrcRef = useRef(currentVideoSrc);
  const pendingSlotRef = useRef(null);

  // 1. Pré-carregamento prioritário na inicialização (durante a IntroScreen com botão Play)
  useEffect(() => {
    // Pré-carrega imediatamente o GIF do globo da página 12
    preloadImageSource('/videos/globo.gif');

    // Pré-carrega imediatamente os vídeos prioritários dos primeiros slides e slides de alto impacto
    const priorityVideos = [
      '/videos/bg-vd-escuro.mp4',          // Slides 1 e 6
      '/videos/bg-vd-liquid-escuro.mp4',   // Slides 2, 4, 5, 8, 9
      '/videos/bg-vd-branco.mp4',          // Slide 3 (primeiro light)
      '/videos/bg-vd-escuro-pontos.mp4',   // Slides 7 e 16
      '/videos/bg-vd-azul.mp4',            // Slide 10
      '/videos/bg-gradient-escuro.mp4',    // Slides 13, 14, 15, 17
      '/videos/bg-onda-baixo.mp4',         // Slide 18
    ];

    priorityVideos.forEach((src) => preloadVideoSource(src));

    // Pré-carrega os vídeos restantes em background após breve intervalo
    const timer = window.setTimeout(() => {
      slidesData.forEach((s) => {
        const video = getSlideBackgroundVideo(s);
        if (video) preloadVideoSource(video);
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  // 2. Preload dinâmico em janela deslizante durante a navegação (próximos 2 e anterior)
  useEffect(() => {
    if (!hasStarted) return;

    for (let i = currentIndex + 1; i <= Math.min(currentIndex + 2, slidesData.length - 1); i++) {
      const nextSrc = getSlideBackgroundVideo(slidesData[i]);
      if (nextSrc) preloadVideoSource(nextSrc);
    }

    if (currentIndex > 0) {
      const prevSrc = getSlideBackgroundVideo(slidesData[currentIndex - 1]);
      if (prevSrc) preloadVideoSource(prevSrc);
    }
  }, [currentIndex, hasStarted]);

  // 3. Callback quando o vídeo do Slot A fica pronto
  const handleSlotAReady = useCallback(() => {
    setSlotAReady(true);
    if (pendingSlotRef.current === 'A') {
      setActiveSlot('A');
      pendingSlotRef.current = null;
    }
  }, []);

  // 4. Callback quando o vídeo do Slot B fica pronto
  const handleSlotBReady = useCallback(() => {
    setSlotBReady(true);
    if (pendingSlotRef.current === 'B') {
      setActiveSlot('B');
      pendingSlotRef.current = null;
    }
  }, []);

  // 5. Gerenciamento de troca e continuidade de vídeo
  useEffect(() => {
    // Se a URL do vídeo não mudou (ex: slide 4 -> 5, 8 -> 9, 13 -> 14 -> 15 ou interações internas), mantém contínuo!
    if (currentVideoSrc === lastSrcRef.current) {
      return;
    }

    lastSrcRef.current = currentVideoSrc;

    if (!currentVideoSrc) {
      // Sem vídeo no slide: desativa slots e mantém fallback de cor
      setActiveSlot(null);
      pendingSlotRef.current = null;
      return;
    }

    // Alterna para o slot inativo e só faz a transição quando ele estiver de fato pronto
    if (activeSlot === 'A') {
      setSlotBSrc(currentVideoSrc);
      setSlotBReady(false);
      pendingSlotRef.current = 'B';
      // Tenta reprodução imediata caso o browser já tenha os frames
      if (videoRefB.current) {
        videoRefB.current.play().catch(() => {});
      }
    } else {
      setSlotASrc(currentVideoSrc);
      setSlotAReady(false);
      pendingSlotRef.current = 'A';
      if (videoRefA.current) {
        videoRefA.current.play().catch(() => {});
      }
    }
  }, [currentVideoSrc, activeSlot]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-colors duration-500 z-0 ${
        isLight ? 'bg-[#f5f5f5]' : 'bg-[#050505]'
      }`}
      style={{
        backgroundImage: isLight
          ? 'linear-gradient(140deg, #ffffff, #efefef)'
          : 'linear-gradient(140deg, #0a0d12, #050608)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-hidden="true"
    >
      {/* Grade sutil para slides claros */}
      {isLight && (
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
      <video
        ref={videoRefA}
        className="slide-background-video transition-opacity duration-500 ease-out"
        style={{
          opacity: activeSlot === 'A' && slotAReady ? 1 : 0,
          zIndex: activeSlot === 'A' ? 2 : 1,
        }}
        src={slotASrc || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={handleSlotAReady}
        onCanPlay={handleSlotAReady}
        onPlaying={handleSlotAReady}
        tabIndex={-1}
      />

      {/* Slot B de Vídeo */}
      <video
        ref={videoRefB}
        className="slide-background-video transition-opacity duration-500 ease-out"
        style={{
          opacity: activeSlot === 'B' && slotBReady ? 1 : 0,
          zIndex: activeSlot === 'B' ? 2 : 1,
        }}
        src={slotBSrc || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={handleSlotBReady}
        onCanPlay={handleSlotBReady}
        onPlaying={handleSlotBReady}
        tabIndex={-1}
      />

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
