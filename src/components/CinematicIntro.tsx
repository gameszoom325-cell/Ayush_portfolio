import React, { useEffect, useState, useRef } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'clearing' | 'complete'>('counting');
  const [statusIndex, setStatusIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);

  const telemetryLines = [
    'INITIALIZING SHADER PIPELINE',
    'COMPILING VECTOR TOPOLOGY',
    'MOUNTING SPATIAL INTERACTION HUD',
    'SYSTEM ARCHITECTURE ONLINE',
  ];

  useEffect(() => {
    // If user prefers reduced motion, finish immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    let start = performance.now();
    const duration = 1600; // 1.6s smooth cinematic counter
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const rawP = Math.min(1, elapsed / duration);
      // Smooth cubic-bezier curve for numerical progression
      const easeP = Math.min(1, Math.pow(rawP, 1.4));
      const currentVal = Math.floor(easeP * 100);
      setProgress(currentVal);

      // Cycle telemetry text
      if (rawP < 0.3) setStatusIndex(0);
      else if (rawP < 0.6) setStatusIndex(1);
      else if (rawP < 0.9) setStatusIndex(2);
      else setStatusIndex(3);

      if (rawP < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        // Trigger curtain parting sequence
        setPhase('clearing');
        setTimeout(() => {
          setPhase('complete');
          onComplete();
        }, 650);
      }
    };

    animId = requestAnimationFrame(tick);

    // Instant bypass on any key or click
    const handleSkip = () => {
      cancelAnimationFrame(animId);
      setPhase('clearing');
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 350);
    };

    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('click', handleSkip, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none select-none flex flex-col justify-between overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Shutter Panel */}
      <div
        ref={topShutterRef}
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#070709] border-b border-white/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform z-10 ${
          phase === 'clearing' ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Shutter Panel */}
      <div
        ref={bottomShutterRef}
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#070709] border-t border-white/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform z-10 ${
          phase === 'clearing' ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Fine Architectural Grid & Grain */}
      <div className="absolute inset-0 film-grain opacity-[0.04] pointer-events-none z-20" />

      {/* Center Cinematic Typographic Lockup */}
      <div
        className={`relative z-30 m-auto flex flex-col items-center text-center transition-all duration-500 ease-out px-4 ${
          phase === 'clearing' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Monogram Icon HUD with Orbiting Ring */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/20 flex items-center justify-center font-headline-sm text-lg font-bold text-white shadow-2xl backdrop-blur-md">
            AS
          </div>
          <div className="absolute -inset-2.5 rounded-3xl border border-white/10 border-dashed animate-spin-slow pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf]" />
        </div>

        {/* Name and Discipline */}
        <h1 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-white tracking-widest uppercase mb-2">
          Ayush Singh
        </h1>
        <p className="font-label-mono-sm text-xs sm:text-sm text-white/50 tracking-[0.25em] uppercase mb-8">
          Systems Architect // Cognitive AI
        </p>

        {/* Numerical Telemetry Progress */}
        <div className="w-64 max-w-xs space-y-3">
          <div className="flex items-baseline justify-between font-label-mono-sm text-xs">
            <span className="text-white/40 tracking-wider">INITIALIZING</span>
            <span className="text-[#2dd4bf] font-bold text-sm tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          {/* Micro Hairline Bar */}
          <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0f766e] via-[#2dd4bf] to-white transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Technical Status Text */}
          <div className="h-4 flex items-center justify-center">
            <span className="font-label-mono-sm text-[10px] text-white/60 uppercase tracking-widest transition-opacity duration-200">
              {telemetryLines[statusIndex]}
            </span>
          </div>
        </div>

        {/* Skip hint */}
        <div className="mt-12">
          <span className="font-label-mono-sm text-[10px] text-white/30 uppercase tracking-widest">
            CLICK OR PRESS ANY KEY TO SKIP
          </span>
        </div>
      </div>
    </div>
  );
};
