import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Scale, Layers, Users, Cog, UserRoundCheck, ArrowDown } from 'lucide-react';

const specialists = [
  {
    num: '01',
    track: 'CANAL DE ENTRADA',
    title: 'Atendimento',
    desc: 'Receber, protocolar, sanar dúvidas imediatas e dar devolutiva rápida ao cliente.',
    Icon: Headphones,
  },
  {
    num: '02',
    track: 'TRIBUTOS',
    title: 'Fiscal',
    desc: 'Executar apurações fiscais, conferir obrigações e revisar impostos com rigor.',
    Icon: Scale,
  },
  {
    num: '03',
    track: 'CONTABILIDADE',
    title: 'Contábil',
    desc: 'Conciliação, balancetes fidedignos e relatórios gerenciais com conformidade.',
    Icon: Layers,
  },
  {
    num: '04',
    track: 'PESSOAL',
    title: 'Departamento Pessoal',
    desc: 'Executar folha, encargos, admissões, rescisões e conformidade trabalhista.',
    Icon: Users,
  },
];

export default function Slide09BU({ slide }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
      {/* Header padrão da apresentação */}
      <header className="shrink-0 mb-2">
        <span className="slide-standard-tag text-xs sm:text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-2">
          {slide.eyebrow}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Uma conta acompanhada.<br />Uma equipe coordenada.
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[#a3adb8] max-w-4xl mt-1">
          {slide.lead}
        </p>
      </header>

      {/* Estrutura central diagramada da BU */}
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3 my-auto">
        {/* Camada de Governança e Articulação da Conta */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Gestão da BU / COO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-5 p-4 bg-white/[0.035] border border-white/15 hover:border-white/25 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-[0.66rem] font-bold tracking-[.14em] uppercase text-white/50 block mb-1">
                  GOVERNANÇA & ESTRATÉGIA
                </span>
                <div className="text-base sm:text-lg font-semibold tracking-tight text-white leading-tight">
                  Gestão da BU / Diretoria Operacional (COO)
                </div>
              </div>
              <Cog className="w-4 h-4 text-white/45 shrink-0 mt-0.5" strokeWidth={1.6} />
            </div>
            <div className="text-xs text-[#a3adb8] leading-relaxed mt-2 font-normal">
              Supervisão estratégica, capacidade por nicho, governança de SLAs e escalonamento executivo.
            </div>
          </motion.div>

          {/* Key Account (KA) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="md:col-span-7 p-4 bg-white/[0.055] border border-white/25 hover:border-white/35 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-[0.66rem] font-bold tracking-[.14em] uppercase text-[#83ecbf] block mb-1">
                  INTERLOCUÇÃO ÚNICA · GESTÃO NOMINAL DA CONTA
                </span>
                <div className="text-base sm:text-lg font-semibold tracking-tight text-white leading-tight">
                  Key Account (KA) · Gestora da Conta
                </div>
              </div>
              <UserRoundCheck className="w-4 h-4 text-[#83ecbf] shrink-0 mt-0.5" strokeWidth={1.7} />
            </div>
            <div className="text-xs text-white/85 leading-relaxed mt-2 font-normal">
              Guardiã dos compromissos e interlocutora do cliente: articula a carteira, alinha prazos e mobiliza a célula multidisciplinar.
            </div>
          </motion.div>
        </div>

        {/* Faixa conectora da arquitetura */}
        <div className="flex items-center gap-3 py-0.5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[0.64rem] font-bold tracking-[.15em] uppercase text-white/40 shrink-0 flex items-center gap-1.5">
            <span>Célula Técnica Multidisciplinar Dedicada</span>
            <ArrowDown className="w-3 h-3 text-white/35" />
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Grid com os 4 Especialistas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {specialists.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
                className="p-3.5 sm:p-4 bg-white/[0.035] border border-white/15 hover:border-white/28 transition-colors flex flex-col justify-between min-h-[7.8rem]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold tracking-wider text-white/40">{item.num}</span>
                    <Icon className="w-4 h-4 text-white/45" strokeWidth={1.65} />
                  </div>
                  <span className="text-[0.66rem] font-bold tracking-[.12em] uppercase text-white/50 block mb-0.5">
                    {item.track}
                  </span>
                  <div className="text-base font-semibold tracking-tight text-white mb-1 leading-snug">
                    {item.title}
                  </div>
                </div>
                <div className="text-xs text-[#a3adb8] leading-relaxed font-normal">
                  {item.desc}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Alçadas de Decisão - Barra retangular sem cantos arredondados */}
      <footer className="mt-3 p-3 bg-white/[0.035] border border-white/15 flex items-center gap-3 text-xs sm:text-sm text-[#d5dbe4] shrink-0">
        <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white font-mono font-bold text-[0.66rem] uppercase tracking-wider shrink-0">
          ALÇADAS DE DECISÃO
        </span>
        <span className="leading-snug">
          <strong className="text-white font-semibold">Atenção:</strong> O Key Account articula a conta e cobra compromissos. Ele não substitui o responsável técnico nem dispensa a revisão formal.
        </span>
      </footer>
    </div>
  );
}
