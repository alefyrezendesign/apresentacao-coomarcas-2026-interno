import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid, ArrowRight } from 'lucide-react';
import { playTickSound } from '../utils/sound';

export default function OverviewModal({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide,
}) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-6xl max-h-[88vh] bg-[#0d1117] border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col text-white overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Grid className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Índice Executivo · 21 Slides</h3>
                <p className="text-sm text-[#a3adb8]">Navegação rápida por qualquer etapa da virada institucional</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid Scrollable */}
          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 custom-scrollbar">
            {slides.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={s.id || idx}
                  onClick={() => {
                    playTickSound(750, 0.08);
                    onSelectSlide(idx);
                    onClose();
                  }}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between group ${
                    isActive
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-black text-white'
                            : 'bg-white/10 text-[#d5dbe4]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {s.isLight && (
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          Light Mode
                        </span>
                      )}
                    </div>
                    <h4
                      className={`text-base font-bold line-clamp-1 mb-1 ${
                        isActive ? 'text-black' : 'text-white group-hover:text-white'
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isActive ? 'text-neutral-700' : 'text-[#a3adb8]'
                      }`}
                    >
                      {s.lead || s.quote || s.headline}
                    </p>
                  </div>

                  <div
                    className={`mt-3 pt-2 border-t text-[11px] font-bold flex items-center justify-between ${
                      isActive
                        ? 'border-neutral-300 text-black'
                        : 'border-white/10 text-white/50 group-hover:text-white'
                    }`}
                  >
                    <span>{isActive ? '● Slide Atual' : 'Ir para slide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-[#a3adb8] shrink-0">
            <span>Pressione <b>Esc</b> para fechar ou clique no slide desejado</span>
            <span>Total: 21 Slides Executivos</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
