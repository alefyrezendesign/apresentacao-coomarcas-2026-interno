import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, Headphones, TrendingUp, Cog, Coins, Users, Laptop } from 'lucide-react';
import { frontsData } from '../data/frontsData';

const icons = {
  CCO: Scale,
  CXO: Headphones,
  CRO: TrendingUp,
  COO: Cog,
  CFO: Coins,
  CHRO: Users,
  CTO: Laptop,
};

export default function Slide05Fronts({ nextLabel }) {
  return (
    <div className="w-full h-full flex flex-col justify-center select-none">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {frontsData.map((front, index) => {
          const Icon = icons[front.code];
          const label = front.title.replace(`${front.code} · `, '');
          const gridSpan = index < 4 ? 'lg:col-span-3' : 'lg:col-span-4';

          return (
            <motion.article
              key={front.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: index * 0.055, ease: [0.22, 0.8, 0.2, 1] }}
              className={`${gridSpan} min-h-[9.5rem] p-5 pb-8 border border-white/16 bg-white/[0.035] flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-lg font-bold tracking-[.09em] text-white/58">{front.code}</span>
                {Icon && <Icon className="w-6 h-6 text-white/72" strokeWidth={1.55} />}
              </div>
              <h3 className="pt-6 text-white font-semibold tracking-tight leading-tight">{label}</h3>
            </motion.article>
          );
        })}
      </div>
      {nextLabel && (
        <div className="mt-6 self-start inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.13em] text-white/48">
          <span>{nextLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </div>
      )}
    </div>
  );
}
