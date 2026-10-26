import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Grid2X2, HelpCircle, House, Eye, EyeOff } from 'lucide-react';

export default function HudControls({ currentIndex, totalSlides, onPrev, onNext, onHome, onToggleOverview, onToggleShortcuts, onToggleFullscreen }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('coomarcas-controls') === 'collapsed');
  const toggleCollapsed = () => setCollapsed((value) => { localStorage.setItem('coomarcas-controls', value ? 'expanded' : 'collapsed'); return !value; });
  if (collapsed) return <button onClick={toggleCollapsed} className="controls-peek no-print" aria-label="Exibir controles de apresentação" title="Exibir controles"><Eye className="w-4 h-4" /></button>;
  return <div className="presentation-controls no-print" role="group" aria-label="Controles da apresentação">
    <div className="control-cluster control-navigation"><button onClick={onPrev} disabled={currentIndex === 0} title="Slide anterior (← ou Page Up)" aria-label="Slide anterior"><ChevronLeft className="w-4 h-4" /></button><span className="slide-counter">{String(currentIndex + 1).padStart(2, '0')}<i />{String(totalSlides).padStart(2, '0')}</span><button onClick={onNext} disabled={currentIndex === totalSlides - 1} title="Próximo slide (→, Espaço ou Page Down)" aria-label="Próximo slide"><ChevronRight className="w-4 h-4" /></button></div>
    <div className="control-cluster control-tools"><button onClick={onHome} title="Voltar para a tela inicial" aria-label="Voltar para a tela inicial"><House className="w-4 h-4" /></button><button onClick={onToggleOverview} title="Visão geral (O)" aria-label="Visão geral"><Grid2X2 className="w-4 h-4" /></button><button onClick={onToggleShortcuts} title="Atalhos (?)" aria-label="Atalhos"><HelpCircle className="w-4 h-4" /></button><button onClick={onToggleFullscreen} title="Tela cheia (F)" aria-label="Alternar tela cheia"><Maximize2 className="w-4 h-4" /></button><button onClick={toggleCollapsed} title="Ocultar controles" aria-label="Ocultar controles"><EyeOff className="w-4 h-4" /></button></div>
  </div>;
}
