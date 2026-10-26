import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ChevronRight, Cog, Headphones, Layers, Scale, UserRoundCheck, Users } from 'lucide-react';

const specialists = [
  { num: '01', track: 'CANAL DE ENTRADA', title: 'Atendimento', desc: 'Receber, protocolar, sanar dúvidas imediatas e dar devolutiva rápida ao cliente.', Icon: Headphones },
  { num: '02', track: 'TRIBUTOS', title: 'Fiscal', desc: 'Executar apurações fiscais, conferir obrigações e revisar impostos com rigor.', Icon: Scale },
  { num: '03', track: 'CONTABILIDADE', title: 'Contábil', desc: 'Conciliação, balancetes fidedignos e relatórios gerenciais com conformidade.', Icon: Layers },
  { num: '04', track: 'PESSOAL', title: 'Departamento Pessoal', desc: 'Executar folha, encargos, admissões, rescisões e conformidade trabalhista.', Icon: Users },
];

export default function Slide09BU({ slide, onRegisterNavigation }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const didInteract = useRef(false);
  const reduceMotion = useReducedMotion();

  const activate = useCallback((index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const advance = useCallback(() => {
    const next = activeIndexRef.current + 1;
    if (next >= specialists.length) return false;
    didInteract.current = true;
    activate(next);
    return true;
  }, [activate]);

  const retreat = useCallback(() => {
    const previous = activeIndexRef.current - 1;
    if (previous < 0) return false;
    didInteract.current = true;
    activate(previous);
    return true;
  }, [activate]);

  useEffect(() => {
    didInteract.current = false;
    activate(-1);
    if (reduceMotion) return undefined;
    const revealTimer = window.setTimeout(() => {
      if (!didInteract.current) activate(0);
    }, 680);
    return () => window.clearTimeout(revealTimer);
  }, [activate, reduceMotion]);

  useEffect(() => {
    if (!onRegisterNavigation) return undefined;
    onRegisterNavigation({ advance, retreat });
    return () => onRegisterNavigation(null);
  }, [advance, onRegisterNavigation, retreat]);

  return (
    <div className="w-full h-full flex flex-col px-8 sm:px-14 lg:px-24 pt-12 sm:pt-14 pb-10 sm:pb-12 bg-[#0a0d12] text-[#f1f4f8] select-none">
      <header className="w-full shrink-0">
        <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-4">{slide.eyebrow}</span>
        <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.02] text-white">Uma conta acompanhada.<br />Uma equipe coordenada.</h2>
        <p className="max-w-5xl mt-4 text-white">{slide.lead}</p>
      </header>

      <main className="w-full flex-1 min-h-0 flex flex-col justify-center py-5 sm:py-6">
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,.78fr)_2rem_minmax(0,1.22fr)] gap-3 sm:gap-4 items-stretch">
          <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-5 sm:p-6 bg-white/[0.025] border border-white/15 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[0.7rem] font-bold tracking-[.14em] uppercase text-white/48 block mb-2">GOVERNANÇA & ESTRATÉGIA</span>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight leading-tight text-white">Gestão da BU / Diretoria Operacional (COO)</h3>
              </div>
              <Cog className="w-4 h-4 shrink-0 text-white/42 mt-0.5" strokeWidth={1.6} aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-light leading-relaxed text-white/60">Supervisão estratégica, capacidade por nicho, governança de SLAs e escalonamento executivo.</p>
          </motion.article>

          <div className="hidden md:flex items-center justify-center"><ArrowRight className="w-4 h-4 text-white/34" strokeWidth={1.5} aria-hidden="true" /></div>

          <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="p-5 sm:p-6 bg-white/[0.055] border border-white/30 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[0.7rem] font-bold tracking-[.14em] uppercase text-[#83ecbf] block mb-2">INTERLOCUÇÃO ÚNICA · GESTÃO NOMINAL DA CONTA</span>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight text-white">Key Account (KA) · Gestora da Conta</h3>
              </div>
              <UserRoundCheck className="w-5 h-5 shrink-0 text-[#83ecbf] mt-0.5" strokeWidth={1.7} aria-hidden="true" />
            </div>
            <p className="mt-5 max-w-3xl text-sm sm:text-base font-light leading-relaxed text-white/75">Guardiã dos compromissos e interlocutora do cliente: articula a carteira, alinha prazos e mobiliza a célula multidisciplinar.</p>
          </motion.article>
        </section>

        <div className="flex justify-center py-4 sm:py-5">
          <span className="font-mono text-[0.68rem] font-bold tracking-[.15em] uppercase text-white/46 flex items-center gap-2">Célula Técnica Multidisciplinar Dedicada <ArrowDown className="w-3.5 h-3.5 text-white/42" aria-hidden="true" /></span>
        </div>

        <section className="flex flex-col lg:flex-row gap-3 sm:gap-4" aria-label="Especialidades da célula técnica">
          {specialists.map((item, index) => {
            const Icon = item.Icon;
            const isActive = activeIndex === index;
            return (
              <motion.button
                layout
                type="button"
                key={item.num}
                onClick={() => {
                  didInteract.current = true;
                  activate(activeIndexRef.current === index ? -1 : index);
                }}
                aria-expanded={isActive}
                transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 0.8, 0.2, 1] }}
                className={`relative min-h-[9.5rem] overflow-hidden p-5 text-left border transition-[flex,background-color,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white ${isActive ? 'lg:flex-[2.15] bg-white/[0.06] border-white/32' : 'lg:flex-1 bg-white/[0.025] border-white/15 hover:border-white/28'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold tracking-wider text-white/42">{item.num}</span>
                    <span className="font-mono text-[0.64rem] font-bold tracking-[.12em] uppercase text-white/50 truncate">{item.track}</span>
                  </div>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white/72' : 'text-white/42'}`} strokeWidth={1.65} aria-hidden="true" />
                </div>
                <h4 className="mt-4 text-lg font-semibold tracking-tight leading-snug text-white">{item.title}</h4>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }} transition={{ duration: reduceMotion ? 0 : 0.22, delay: reduceMotion ? 0 : 0.08 }} className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/68">
                      {item.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!isActive && <ChevronRight className="absolute right-5 bottom-5 w-4 h-4 text-white/32 lg:hidden" aria-hidden="true" />}
              </motion.button>
            );
          })}
        </section>
      </main>

      <footer className="w-full shrink-0 mt-2 flex items-center gap-4 text-sm text-white/72">
        <span className="inline-flex shrink-0 items-center gap-2 px-3 py-2 border border-[#d7a343]/40 bg-[#c99a37]/[.10] text-[#d6a746] font-bold text-[.68rem] uppercase tracking-[.12em]">
          <Scale className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
          ALÇADAS DE DECISÃO
        </span>
        <span className="leading-snug"><strong className="text-white font-semibold">Atenção:</strong> O Key Account articula a conta e cobra compromissos. Ele não substitui o responsável técnico nem dispensa a revisão formal.</span>
      </footer>
    </div>
  );
}
