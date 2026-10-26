import React, { useEffect, useState } from 'react';

export default function LaserPointer({ active }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Pulse Glow */}
      <div className="absolute -inset-3 rounded-full bg-red-500/30 blur-md animate-ping" />
      {/* Intense Ambient Glow */}
      <div className="absolute -inset-2 rounded-full bg-red-600/50 blur-sm" />
      {/* Core Red Dot */}
      <div className="relative w-3.5 h-3.5 rounded-full bg-red-500 border border-white shadow-[0_0_12px_#ff0033]" />
    </div>
  );
}
