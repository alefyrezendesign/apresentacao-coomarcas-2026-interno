import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, HelpCircle } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ / Espaço', desc: 'Avançar para o próximo slide' },
    { key: '← / Shift+Espaço', desc: 'Retornar ao slide anterior' },
    { key: 'F / F11', desc: 'Alternar modo Tela Cheia (16:9 fullscreen)' },
    { key: 'O', desc: 'Abrir visão geral (Grid dos 21 slides)' },
    { key: 'L', desc: 'Ativar / Desativar apontador Laser virtual' },
    { key: 'M', desc: 'Ativar / Silenciar sons de clique executivo' },
    { key: 'Esc', desc: 'Fechar qualquer modal ou visão aberta' },
    { key: '?', desc: 'Abrir / Fechar esta ajuda de atalhos' },
  ];

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
          className="relative w-full max-w-xl bg-[#0d1117] border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Atalhos do Teclado</h3>
                <p className="text-sm text-[#a3adb8]">Navegação rápida durante reuniões e projeção</p>
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

          {/* List of shortcuts */}
          <div className="space-y-2.5 mb-6">
            {shortcuts.map((sc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <span className="text-sm text-[#d5dbe4]">{sc.desc}</span>
                <kbd className="px-3 py-1 rounded bg-white/10 border border-white/25 text-xs font-mono font-bold text-white shadow-sm">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Fechar Ajuda
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
