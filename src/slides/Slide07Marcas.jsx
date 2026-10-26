import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const contabeis = [
  { name: 'Farmacon', description: 'Farmácias e drogarias', logoSrc: '/png-logo-marcas/logo-farmacon.png' },
  { name: 'Pets Contábil', description: 'Veterinário e pet shops', logoSrc: '/png-logo-marcas/logo-petscontabil.png' },
  { name: 'Mercaddo', description: 'Varejo alimentar', logoSrc: '/png-logo-marcas/logo-mercaddo.png' },
  { name: 'Odontto', description: 'Odontologia', logoSrc: '/png-logo-marcas/logo-odontto.png' },
  { name: 'Fitcount', description: 'Fitness e saúde', logoSrc: '/png-logo-marcas/logo-fitcount.png' },
  { name: 'Educar', description: 'Educação', logoSrc: '/png-logo-marcas/logo-educar.png' },
  { name: 'Postto', description: 'Combustíveis', logoSrc: '/png-logo-marcas/logo-Postto.png' },
  { name: 'Cuidatto', description: 'Saúde e bem-estar', logoSrc: '/png-logo-marcas/logo-cuidatto.png' },
  { name: 'Conte Fácil', description: 'Contabilidade digital ágil', logoSrc: '/png-logo-marcas/logo-contef%C3%A1cil.png' },
  { name: 'Conteii', description: 'Plataforma contábil', logoSrc: '/png-logo-marcas/logo-conteii.png' },
];

const especialidades = [
  { name: 'Audittar', description: 'Auditoria independente, conformidade e diagnóstico', logoSrc: '/png-logo-marcas/logo-audittar.png', hasLogo: true },
  { name: 'Consultoria Tributária Avançada', description: 'Planejamento tributário e recuperação de créditos' },
  { name: 'Integree', description: 'Gestão Estratégica de Pessoas', logoSrc: '/png-logo-marcas/logo-integree.png', hasLogo: true },
  { name: 'Holdings & Estruturação Societária', description: 'Proteção patrimonial e estrutura societária' },
  { name: 'Recuperação de Créditos e Benefícios', description: 'Geração de caixa e eficiência tributária' },
  { name: 'Inteligência Financeira e BPO', description: 'Gestão estratégica e inteligência financeira' },
];

function BrandMark({ brand }) {
  return (
    <div className="w-[5.75rem] h-9 shrink-0 flex items-center justify-center text-center">
      {brand.logoSrc ? (
        <img src={brand.logoSrc} alt={brand.name} className="max-w-full max-h-full object-contain" />
      ) : (
        <span className="text-[.61rem] leading-tight font-bold uppercase tracking-[.1em] text-white/48">{brand.name}</span>
      )}
    </div>
  );
}

export default function Slide07Marcas({ onRegisterNavigation }) {
  const [openSection, setOpenSection] = useState(null);
  const didInteract = useRef(false);
  const openSectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const sectionIds = ['contabeis', 'especialidades'];

  const setSection = useCallback((sectionId) => {
    openSectionRef.current = sectionId;
    setOpenSection(sectionId);
  }, []);

  const advanceSection = useCallback(() => {
    const nextIndex = sectionIds.indexOf(openSectionRef.current) + 1;
    if (nextIndex >= sectionIds.length) return false;
    didInteract.current = true;
    setSection(sectionIds[nextIndex]);
    return true;
  }, [setSection]);

  const retreatSection = useCallback(() => {
    const currentIndex = sectionIds.indexOf(openSectionRef.current);
    if (currentIndex <= 0) return false;
    didInteract.current = true;
    setSection(sectionIds[currentIndex - 1]);
    return true;
  }, [setSection]);

  useEffect(() => {
    // Repete o mesmo estado de entrada dos demais acordeões: chega fechado
    // e revela somente o primeiro grupo após a transição do slide.
    didInteract.current = false;
    setSection(null);

    if (reduceMotion) return undefined;
    const revealTimer = window.setTimeout(() => {
      if (!didInteract.current) setSection('contabeis');
    }, 680);
    return () => window.clearTimeout(revealTimer);
  }, [reduceMotion, setSection]);

  useEffect(() => {
    if (!onRegisterNavigation) return undefined;
    onRegisterNavigation({ advance: advanceSection, retreat: retreatSection });
    return () => onRegisterNavigation(null);
  }, [advanceSection, onRegisterNavigation, retreatSection]);

  const toggleSection = (section) => {
    didInteract.current = true;
    setSection(openSectionRef.current === section ? null : section);
  };

  const sections = [
    {
      id: 'contabeis',
      title: 'Marcas contábeis de nicho',
      intro: 'Especialização por segmento, proximidade e acompanhamento recorrente.',
      items: contabeis,
      hasLogoForAll: true,
    },
    {
      id: 'especialidades',
      title: 'Marcas de especialidade',
      intro: 'Soluções que ampliam a resposta, a proteção e a geração de valor ao cliente.',
      items: especialidades,
      hasLogoForAll: false,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start gap-3 select-none">
      {sections.map((section) => {
        const isOpen = openSection === section.id;

        return (
          <section
            key={section.id}
            className={`overflow-hidden border transition-[background-color,border-color] duration-300 ${isOpen ? 'bg-white/[0.06] border-white/16' : 'bg-white/[0.025] border-white/14'}`}
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              className="w-full min-h-[4.25rem] px-5 sm:px-6 py-3 flex items-center gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold tracking-tight leading-tight">{section.title}</h3>
              </div>
              <span className="hidden sm:block max-w-none text-sm text-right leading-snug text-white/56 lg:whitespace-nowrap">{section.intro}</span>
              <ChevronDown className={`w-5 h-5 shrink-0 text-white/58 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className={`brand-list-scroll px-5 sm:px-6 pb-4 max-h-[25rem] overflow-y-auto pr-3 ${section.id === 'contabeis' ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'grid grid-cols-1 lg:grid-cols-2 gap-2'}`}>
                    {section.items.map((brand, index) => {
                      const reservesLogo = section.hasLogoForAll || brand.hasLogo;
                      return (
                        <motion.div
                          key={brand.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: index * 0.035 }}
                          className="min-h-[3.75rem] px-3.5 py-2.5 border border-white/14 bg-white/[0.025] flex items-center gap-3"
                        >
                          <span className="w-6 shrink-0 font-mono text-xs font-bold tracking-[.08em] text-white/42">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {reservesLogo && <BrandMark brand={brand} />}
                          <div className="min-w-0">
                            {!reservesLogo && <strong className="block text-white font-semibold leading-tight">{brand.name}</strong>}
                            <span className={`block leading-snug text-white/62 ${reservesLogo ? 'text-sm' : 'text-sm mt-1'}`}>{brand.description}</span>
                          </div>
                        </motion.div>
                      );
                    })}
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
