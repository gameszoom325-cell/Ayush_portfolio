import React, { useEffect, useState, useRef } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'parting' | 'complete'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    let start = performance.now();
    const duration = 1600; // 1.6s smooth, graceful loading
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = Math.min(1, elapsed / duration);
      // Gentle cubic bezier curve
      const ease = Math.min(1, Math.pow(raw, 1.3));
      const currentVal = Math.floor(ease * 100);
      setProgress(currentVal);

      if (raw < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setPhase('parting');
        setTimeout(() => {
          setPhase('complete');
          onComplete();
        }, 700);
      }
    };

    animId = requestAnimationFrame(tick);

    // Instant skip on click or keypress
    const handleSkip = () => {
      cancelAnimationFrame(animId);
      setPhase('parting');
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
      className={`fixed inset-0 z-[100] pointer-events-none select-none flex flex-col items-center justify-center bg-[#070709] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 'parting' ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Subtle organic noise overlay */}
      <div className="absolute inset-0 film-grain opacity-[0.03] pointer-events-none" />

      {/* Center Typographic & Monogram Core */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-500 ease-out ${
          phase === 'parting' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Monogram Badge with Soft Breathing Halo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center font-headline-sm text-lg font-bold text-white shadow-2xl backdrop-blur-xl">
            AS
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-white/[0.08] pointer-events-none animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#2dd4bf] shadow-[0_0_10px_#2dd4bf]" />
        </div>

        {/* Identity & Discipline */}
        <h1 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-white tracking-widest uppercase mb-1.5">
          Ayush Singh
        </h1>
        <p className="font-label-mono-sm text-xs text-white/50 tracking-[0.25em] uppercase mb-8">
          Systems Architect // Cognitive AI
        </p>

        {/* Minimalist Studio Progress Line */}
        <div className="w-56 sm:w-64 max-w-xs space-y-2.5">
          <div className="flex items-center justify-between font-label-mono-sm text-xs">
            <span className="text-white/40 tracking-wider">LOADING</span>
            <span className="text-[#2dd4bf] font-bold text-xs tabular-nums tracking-wider">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2dd4bf] to-[#7ff0dc] transition-[width] duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
