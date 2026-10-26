import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const tagText = 'NOSSA VIRADA 2026';

export default function Slide01Hero({ slide, index, totalSlides = 21 }) {
  const reduceMotion = useReducedMotion();
  const [typedTag, setTypedTag] = useState(reduceMotion ? tagText : '');
  const [typedDescription, setTypedDescription] = useState(reduceMotion ? slide.lead : '');
  const [descriptionDone, setDescriptionDone] = useState(reduceMotion);
  const headlineLines = useMemo(() => ['A Coomarcas que', 'estamos construindo.'], []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    let cursor = 0;
    const timer = window.setInterval(() => {
      cursor += 1;
      setTypedTag(tagText.slice(0, cursor));
      if (cursor >= tagText.length) window.clearInterval(timer);
    }, 30);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const copy = slide.lead || '';
    let cursor = 0;
    let typingTimer;
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        cursor += 1;
        setTypedDescription(copy.slice(0, cursor));
        if (cursor >= copy.length) {
          window.clearInterval(typingTimer);
          setDescriptionDone(true);
        }
      }, 24);
    }, 2380);
    return () => { window.clearTimeout(startTimer); window.clearInterval(typingTimer); };
  }, [reduceMotion, slide.lead]);

  const reveal = (delay, distance = 18) => ({
    initial: reduceMotion ? false : { opacity: 0, y: distance, filter: 'blur(7px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 0.8, 0.2, 1] },
  });

  return (
    <div className="w-full h-full flex flex-col justify-between py-8 px-8 md:px-16 lg:px-24 relative overflow-hidden select-none isolate">
      <div className="h-6 w-full" />
      <div className="my-auto w-full max-w-6xl mx-auto flex flex-col items-center text-center z-10 px-4">
        <motion.div {...reveal(0.03, -12)} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.14] backdrop-blur-md mb-16 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-3 w-3 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_#3b82f6]" /></span>
          <span className="text-sm sm:text-base font-bold tracking-widest text-white uppercase font-mono">{typedTag}{typedTag.length < tagText.length && <span className="inline-block w-1.5 h-4 bg-blue-400 ml-1 align-middle animate-pulse" />}</span>
        </motion.div>

        <h1 aria-label={headlineLines.join(' ')} className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] 2xl:text-[6.85rem] font-bold tracking-tight text-white leading-[.98] mb-16 max-w-[22ch]">
          {headlineLines.map((line, lineIndex) => (
            <span key={line} className="block h-[1.1em] overflow-hidden pb-[0.1em]" aria-hidden="true">
              <span className={`cover-title-reveal${lineIndex === 1 ? ' cover-title-reveal--second' : ''}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <motion.div {...reveal(2.16, 12)} className="max-w-3xl min-h-[4.2rem] flex items-center justify-center mb-12">
          <p className="text-base sm:text-lg md:text-xl lg:text-[1.35rem] text-[#f1f5f9] leading-relaxed font-normal">{typedDescription}{!descriptionDone && <span className="inline-block w-1.5 h-5 bg-blue-400/90 ml-1.5 align-middle animate-pulse" />}</p>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }} animate={descriptionDone ? { opacity: 0.9, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 0.8, 0.2, 1] }} className="flex justify-center items-center min-h-7">
          <img src="/assets/logo_coomarcas-branca.png" alt="Grupo Coomarcas" className="h-6 sm:h-7 object-contain" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
        </motion.div>
      </div>
      <div className="h-6" />
    </div>
  );
}
