import React from 'react';
import ContentAccordion from '../components/ContentAccordion';

export default function Slide03Proposito({ slide, onRegisterNavigation }) {
  return (
    <div className="w-full h-full flex flex-col px-8 sm:px-14 lg:px-24 pt-16 sm:pt-20 pb-16 text-[#0a0d12] select-none">
      <header className="w-full max-w-7xl mx-auto shrink-0">
        <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-black/60 mb-4">
          {slide.eyebrow}
        </span>
        <h2 className="max-w-5xl text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.02]">
          {slide.headline}
        </h2>
      </header>

      <div className="w-full max-w-7xl mx-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.06fr_.94fr] gap-10 lg:gap-16 items-center py-8">
        <blockquote className="max-w-3xl text-2xl sm:text-3xl lg:text-[2.55rem] font-bold tracking-tight leading-[1.08]">
          “A mudança só estará concluída quando for percebida na rotina diária, na qualidade da entrega técnica e na experiência concreta do cliente.”
        </blockquote>
        <ContentAccordion items={slide.pillars || []} tone="light" onRegisterNavigation={onRegisterNavigation} />
      </div>
    </div>
  );
}
