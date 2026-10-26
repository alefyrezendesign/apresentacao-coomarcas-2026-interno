import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Users, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export default function NodeDetailModal({ node, onClose }) {
  const [portalTarget, setPortalTarget] = useState(() => document.fullscreenElement || document.body);

  useEffect(() => {
    const updatePortalTarget = () => setPortalTarget(document.fullscreenElement || document.body);
    document.addEventListener('fullscreenchange', updatePortalTarget);
    return () => document.removeEventListener('fullscreenchange', updatePortalTarget);
  }, []);

  if (!node) return null;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0e1218] border border-white/20 rounded-2xl shadow-2xl p-8 overflow-hidden text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Brilho decorativo de fundo */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* Cabeçalho do Modal */}
          <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-5">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest text-[#d5dbe4] uppercase bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-3">
                {node.badge || 'Detalhamento Organizacional'}
              </span>
              <h3 className="text-3xl font-bold text-white tracking-tight">{node.title || node.name}</h3>
              {node.role && <p className="text-[#a3adb8] text-base mt-1 font-medium">{node.role}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Descrição / Missão */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a3adb8] mb-2">Missão & Finalidade</h4>
            <p className="text-lg text-white/90 leading-relaxed font-normal">
              {node.description || node.desc || node.mission}
            </p>
          </div>

          {/* Responsabilidades ou Áreas Subordinadas */}
          {node.responsibilities && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#a3adb8] mb-3">Principais Atribuições</h4>
              <ul className="space-y-3">
                {node.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-[#d5dbe4]">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {node.nodes && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#a3adb8] mb-3">Departamentos e Áreas Vinculadas</h4>
              <div className="detail-scroll grid grid-cols-2 gap-3 max-h-[min(15rem,37svh)] overflow-y-auto overscroll-contain pr-2">
                {node.nodes.map((sub, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                    <strong className="block text-white text-base font-semibold mb-1">{sub.name}</strong>
                    <p className="text-xs text-[#a3adb8] leading-relaxed">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rodapé com botão de fechar */}
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-start">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, portalTarget);
}
