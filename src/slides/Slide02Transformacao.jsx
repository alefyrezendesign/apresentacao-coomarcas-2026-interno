import React from 'react';
import ContentAccordion from '../components/ContentAccordion';

export default function Slide02Transformacao({ slide, onRegisterNavigation }) {
  return (
    <div className="w-full h-full flex flex-col px-8 sm:px-14 lg:px-24 pt-16 sm:pt-20 pb-16 select-none">
      <header className="w-full max-w-6xl mx-auto shrink-0">
        <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-4">
          {slide.eyebrow}
        </span>
        <h2 className="max-w-5xl text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.02]">
          {slide.headline}
        </h2>
        <p className="max-w-4xl mt-4 text-base sm:text-lg lg:text-xl leading-relaxed text-white/68">
          {slide.lead}
        </p>
      </header>

      <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 flex flex-col justify-center py-7">
        <ContentAccordion items={slide.cards || []} onRegisterNavigation={onRegisterNavigation} />
      </div>

      {slide.statusBand && (
        <div className="w-full max-w-6xl mx-auto shrink-0 border-t border-white/20 pt-4 flex items-start gap-4">
          <span className="shrink-0 text-xs font-bold tracking-[.14em] text-white uppercase">{slide.statusBand.tag}</span>
          <p className="text-sm sm:text-base text-white/62 leading-relaxed">{slide.statusBand.text}</p>
        </div>
      )}
    </div>
  );
}
