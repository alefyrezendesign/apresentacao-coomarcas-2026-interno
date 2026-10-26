import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ContentAccordion({ items, tone = 'dark', columns = 1, autoRevealFirst = true, onRegisterNavigation }) {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const reduceMotion = useReducedMotion();
  const didInteract = useRef(false);
  const activeStepRef = useRef(-1);
  const isLight = tone === 'light';
  const usesPairedPanels = columns === 2;
  const steps = useMemo(() => {
    if (!usesPairedPanels) return items.map((_, index) => [index]);
    return Array.from({ length: Math.ceil(items.length / 2) }, (_, step) => {
      const first = step * 2;
      return [first, first + 1].filter((index) => index < items.length);
    });
  }, [items, usesPairedPanels]);

  const activateStep = useCallback((step) => {
    activeStepRef.current = step;
    setExpandedIndexes(step < 0 ? [] : (steps[step] || []));
  }, [steps]);

  const advanceStep = useCallback(() => {
    const nextStep = activeStepRef.current + 1;
    if (nextStep >= steps.length) return false;
    didInteract.current = true;
    activateStep(nextStep);
    return true;
  }, [activateStep, steps.length]);

  const retreatStep = useCallback(() => {
    const previousStep = activeStepRef.current - 1;
    if (previousStep < 0) return false;
    didInteract.current = true;
    activateStep(previousStep);
    return true;
  }, [activateStep]);

  useEffect(() => {
    didInteract.current = false;
    activateStep(-1);

    if (reduceMotion || !autoRevealFirst || !items.length) return undefined;

    const revealTimer = window.setTimeout(() => {
      if (!didInteract.current) {
        activateStep(0);
      }
    }, 680);

    return () => window.clearTimeout(revealTimer);
  }, [activateStep, items.length, reduceMotion, autoRevealFirst]);

  useEffect(() => {
    if (!onRegisterNavigation) return undefined;
    onRegisterNavigation({ advance: advanceStep, retreat: retreatStep });
    return () => onRegisterNavigation(null);
  }, [advanceStep, onRegisterNavigation, retreatStep]);

  return (
    <div className={columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 items-start gap-3' : 'flex flex-col gap-3'}>
      {items.map((item, index) => {
        const isExpanded = expandedIndexes.includes(index);
        return (
          <section
            key={item.title}
            className={`overflow-hidden border transition-[background-color,border-color] duration-300 ${isLight
              ? isExpanded ? 'bg-white border-black/40' : 'bg-white/55 border-black/15'
              : isExpanded ? 'bg-white/[0.08] border-white/40' : 'bg-black/15 border-white/15'}`}
          >
            <button
              type="button"
              onClick={() => {
                didInteract.current = true;
                const selectedStep = steps.findIndex((step) => step.includes(index));
                activateStep(activeStepRef.current === selectedStep ? -1 : selectedStep);
              }}
              aria-expanded={isExpanded}
              className={`w-full min-h-[4.8rem] px-5 py-5 sm:px-7 flex items-center gap-5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] ${isLight ? 'text-[#0a0d12] focus-visible:outline-black/60' : 'text-white focus-visible:outline-white/65'}`}
            >
              <span className={`w-9 shrink-0 font-mono text-sm font-bold tracking-wide ${isLight ? 'text-black/45' : 'text-white/45'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="flex-1 text-xl sm:text-2xl font-semibold tracking-tight leading-tight">{item.title}</h3>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${isLight ? 'text-black/55' : 'text-white/55'}`} />
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-[4.75rem] mr-5 pb-8 pt-2 sm:mr-7 sm:pb-9 sm:pt-3">
                    <p className={`max-w-[72rem] text-base sm:text-lg lg:text-xl leading-relaxed ${isLight ? 'text-[#39424c]' : 'text-[#dce3ea]'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}
