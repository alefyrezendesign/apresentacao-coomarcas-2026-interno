import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  ChevronDown,
  Flag,
  Headphones,
  Map,
  Play,
  SearchCheck,
  UserCheck,
  UserRoundCheck,
  UsersRound,
  Workflow,
} from 'lucide-react';

const tracks = [
  {
    label: 'TRILHA 01 · CONSOLIDAÇÃO CENTRAL',
    title: 'Fiscal · Contábil · DP Centrais',
    summary: 'Supervisoras seniores lideram setores consolidados, organizam capacidade, agenda, treinamento e controle de qualidade.',
    steps: [
      { label: 'Mapear', Icon: Map },
      { label: 'Distribuir', Icon: Workflow },
      { label: 'Executar', Icon: Play },
      { label: 'Revisar', Icon: SearchCheck },
      { label: 'Comprovar', Icon: BadgeCheck },
    ],
    points: [
      '✓ Responsável, revisor técnico e substituto formal por atividade.',
      '✓ Controle rígido de prazos, SLAs e calendário fiscal.',
      '✓ Capacitação e preparação das equipes para futuras BUs.',
    ],
  },
  {
    label: 'TRILHA 02 · PILOTO MVP',
    title: 'BU Pets em Operação Piloto',
    summary: 'Funciona como laboratório real de validação: operar, medir, corrigir e documentar o método antes de qualquer expansão.',
    steps: [
      { label: 'KA', Icon: UserRoundCheck },
      { label: 'Atendimento', Icon: Headphones },
      { label: 'Especialistas', Icon: UsersRound },
      { label: 'Revisão', Icon: ClipboardCheck },
      { label: 'Cliente', Icon: UserCheck },
    ],
    points: [
      '★ Responsabilidade nominal pela conta e célula ágil.',
      '★ Acompanhamento diário da capacidade e satisfação do cliente.',
      '★ Registro formal de todos os aprendizados para replicação futura.',
    ],
  },
];

export default function Slide08Transicao({ slide, onRegisterNavigation }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const openIndexRef = useRef(-1);
  const didInteract = useRef(false);
  const reduceMotion = useReducedMotion();

  const setOpen = useCallback((index) => {
    openIndexRef.current = index;
    setOpenIndex(index);
  }, []);

  const advance = useCallback(() => {
    const nextIndex = openIndexRef.current + 1;
    if (nextIndex >= tracks.length) return false;
    didInteract.current = true;
    setOpen(nextIndex);
    return true;
  }, [setOpen]);

  const retreat = useCallback(() => {
    const previousIndex = openIndexRef.current - 1;
    if (previousIndex < 0) return false;
    didInteract.current = true;
    setOpen(previousIndex);
    return true;
  }, [setOpen]);

  useEffect(() => {
    didInteract.current = false;
    setOpen(-1);
    if (reduceMotion) return undefined;
    const revealTimer = window.setTimeout(() => {
      if (!didInteract.current) setOpen(0);
    }, 680);
    return () => window.clearTimeout(revealTimer);
  }, [reduceMotion, setOpen]);

  useEffect(() => {
    if (!onRegisterNavigation) return undefined;
    onRegisterNavigation({ advance, retreat });
    return () => onRegisterNavigation(null);
  }, [advance, onRegisterNavigation, retreat]);

  return (
    <div className="w-full h-full flex flex-col px-8 sm:px-14 lg:px-24 pt-12 sm:pt-14 pb-10 sm:pb-12 bg-[#0a0d12] text-[#f1f4f8] select-none">
      <header className="w-full max-w-6xl mx-auto shrink-0">
        <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-4">
          {slide.eyebrow}
        </span>
        <h2 className="max-w-6xl text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.02] text-white">
          Duas trilhas acontecendo ao mesmo tempo.
        </h2>
        <p className="max-w-5xl mt-4 text-white/68">
          A transição é gradual e segura: os departamentos centrais permanecem consolidados, enquanto a BU Pets valida o modelo em formato de piloto (MVP).
        </p>
      </header>

      <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 flex flex-col justify-start py-4">
        <div className="flex flex-col gap-3">
          {tracks.map((track, index) => {
            const isOpen = openIndex === index;
            return (
              <section
                key={track.label}
                className={`overflow-hidden border transition-[background-color,border-color] duration-300 ${isOpen ? 'bg-white/[0.055] border-white/26' : 'bg-white/[0.025] border-white/15'}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    didInteract.current = true;
                    setOpen(openIndexRef.current === index ? -1 : index);
                  }}
                  aria-expanded={isOpen}
                  className="w-full min-h-[4.75rem] px-5 py-4 sm:px-7 flex items-center gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
                >
                  <span className="w-9 shrink-0 font-mono text-sm font-bold tracking-wide text-white/42">{String(index + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold tracking-[.12em] uppercase text-white/52">{track.label}</span>
                    <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight leading-tight text-white">{track.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-white/58 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                        <div className="ml-[3.5rem] pt-2">
                          <p className="max-w-5xl text-white/72">{track.summary}</p>

                          <ol className="mt-6 flex items-center justify-between gap-3" aria-label="Etapas da trilha">
                            {track.steps.map(({ label, Icon }, stepIndex) => (
                              <React.Fragment key={label}>
                                <li className="min-w-0 flex items-center gap-2.5 text-left">
                                  <Icon className="w-[1.1rem] h-[1.1rem] shrink-0 text-white/70" strokeWidth={1.65} aria-hidden="true" />
                                  <span className="text-base font-semibold leading-tight text-white/90 whitespace-nowrap">{label}</span>
                                </li>
                                {stepIndex < track.steps.length - 1 && <ArrowRight className="w-4 h-4 shrink-0 text-white/30" strokeWidth={1.5} aria-hidden="true" />}
                              </React.Fragment>
                            ))}
                          </ol>

                          <ul className="mt-7 max-w-5xl space-y-2.5 text-white/72">
                            {track.points.map((point) => (
                              <li key={point} className="flex items-start gap-2.5 !text-[.98rem] leading-snug">
                                <span className="shrink-0 text-white/62" aria-hidden="true">{point.slice(0, 1)}</span>
                                <span>{point.slice(1).trimStart()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}
        </div>

        <footer className="w-full mt-6 flex items-center gap-4 text-[#d5dbe4]">
          <span className="inline-flex shrink-0 items-center gap-2 px-3 py-2 border border-[#79b5ff]/35 bg-[#4b9dff]/[.10] text-[#8ac0ff] font-bold text-xs uppercase tracking-[.12em]">
            <Flag className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
            GATE DE LIBERAÇÃO
          </span>
          <span className="text-sm font-medium text-white/82">SETOR CENTRALIZADO ➔ PRONTIDÃO COMPROVADA ➔ HOMOLOGAÇÃO DE SISTEMAS ➔ BU OFICIALMENTE LIBERADA</span>
        </footer>
      </div>
    </div>
  );
}
