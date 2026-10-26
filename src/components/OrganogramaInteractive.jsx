import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, User, Users, Scale, Headphones, TrendingUp, Cog, Coins, Laptop, RotateCcw } from 'lucide-react';
import { organogramaData } from '../data/organogramaData';
import NodeDetailModal from './NodeDetailModal';
import { playTickSound } from '../utils/sound';

export default function OrganogramaInteractive() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const handleNodeClick = (node) => {
    playTickSound(720, 0.06);
    setSelectedNode(node);
  };

  const handleReplay = () => {
    playTickSound(800, 0.08);
    setAnimationKey(prev => prev + 1);
  };

  const getColIcon = (code) => {
    switch (code) {
      case 'CCO': return <Scale className="w-5 h-5 text-white" />;
      case 'CXO': return <Headphones className="w-5 h-5 text-white" />;
      case 'CRO': return <TrendingUp className="w-5 h-5 text-white" />;
      case 'COO': return <Cog className="w-5 h-5 text-white" />;
      case 'CFO': return <Coins className="w-5 h-5 text-white" />;
      case 'CHRO': return <Users className="w-5 h-5 text-white" />;
      case 'CTO': return <Laptop className="w-5 h-5 text-white" />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between relative select-none">
      <button
        onClick={handleReplay}
        className="absolute top-0 right-0 z-10 w-8 h-8 grid place-items-center rounded-full bg-white/8 hover:bg-white/18 text-white/75 hover:text-white transition-all border border-white/15"
        title="Reanimar estrutura"
        aria-label="Reanimar estrutura"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Árvore do Organograma com animação chaveada */}
      <div key={animationKey} className="flex-1 flex flex-col justify-between min-h-0">
        
        {/* Nível 1 & 2: FOUNDER ➔ CEO & CONSELHO */}
        <div className="flex justify-center items-center relative mb-2">
          <div className="flex flex-col items-center">
            {/* Founder Node */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNodeClick(organogramaData.founder)}
              className="cursor-pointer min-h-[3.7rem] min-w-[14rem] bg-[#071b33] hover:bg-[#0b294a] border border-[#2d8fff] px-7 text-[#75baff] font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all relative group"
            >
              <Crown className="w-5 h-5 text-[#4da3ff]" />
              <span>Founder</span>
            </motion.div>

            {/* Seta para CEO */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.25, delay: 0.3 }}
              style={{ originY: 0 }}
              className="w-0.5 h-4 bg-white/40 my-1"
            ></motion.div>

            {/* CEO e Conselho Row */}
            <div className="flex items-center gap-6">
              {/* CEO Node */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNodeClick(organogramaData.ceo)}
                className="cursor-pointer min-h-[3.5rem] min-w-[13rem] bg-white hover:bg-neutral-200 text-black px-7 font-black text-lg flex items-center justify-center gap-3 shadow-2xl transition-all"
              >
                <User className="w-5 h-5 text-black" />
                <span>CEO</span>
              </motion.div>

              {/* Conector e Conselho */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-px bg-white/40"></div>
                <span className="text-white text-xs">➔</span>
                <div
                  onClick={() => handleNodeClick(organogramaData.conselho)}
                  className="cursor-pointer min-h-[3.5rem] bg-white/[0.035] hover:bg-white/[0.09] border border-white/16 hover:border-white/35 px-6 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>CONSELHO DE ADMINISTRAÇÃO</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Barramento Horizontal de Distribuição */}
        <div className="w-full relative h-4 my-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.2, delay: 0.8 }}
            style={{ originY: 0 }}
            className="w-0.5 h-4 bg-white/40 mx-auto absolute left-1/2 -top-1 -translate-x-1/2"
          ></motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.95 }}
            style={{ originX: 0.5 }}
            className="h-px bg-white/40 absolute left-[calc((100%_-_4.5rem)_/_14)] right-[calc((100%_-_4.5rem)_/_14)] top-3"
          ></motion.div>
        </div>

        {/* Nível 3: AS 7 COLUNAS EXECUTIVAS COM RAIZES DESCENDO */}
        <div className="grid grid-cols-7 gap-3 flex-1 min-h-0 pt-1">
          {organogramaData.columns.map((col, idx) => (
            <motion.div
              key={col.code}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + idx * 0.08 }}
              className="flex flex-col gap-2 relative min-w-0"
            >
              {/* Linha vertical que conecta o barramento ao cabeçalho */}
              <div className="w-0.5 h-3 bg-white/40 mx-auto absolute -top-3 left-1/2 -translate-x-1/2"></div>

              {/* Cabeçalho da Diretoria C-Level */}
              <div
                onClick={() => handleNodeClick(col)}
                className="cursor-pointer min-h-[3.5rem] px-2.5 text-center transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2 bg-white/[0.035] hover:bg-white/[0.09] border border-white/16"
              >
                {getColIcon(col.code)}
                <span className="font-bold text-white text-base tracking-wide">{col.code}</span>
              </div>

              {/* Um painel único concentra as áreas da diretoria; os itens são uma lista, não novos cards. */}
              <div className="flex flex-col min-w-0 bg-white/[0.065] border border-[#363b43] px-3 py-1.5">
                {col.nodes.map((node, nodeIdx) => (
                  <motion.button
                    type="button"
                    key={node.name}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 + idx * 0.07 + nodeIdx * 0.05 }}
                    onClick={() => handleNodeClick({ ...node, title: `${col.code} · ${node.name}` })}
                    className="w-full cursor-pointer py-2 text-left text-[.72rem] leading-snug text-white/90 transition-colors hover:text-white hover:bg-white/[0.055] border-b border-[#363b43] last:border-b-0"
                  >
                    <span className="block font-medium break-words">{node.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal de Detalhes ao Clicar */}
      {selectedNode && (
        <NodeDetailModal 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
        />
      )}
    </div>
  );
}
