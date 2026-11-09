import React, { useEffect, useState, useRef } from 'react';
import { CornerDownLeft } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'atmosphere' | 'identity' | 'reveal' | 'parting' | 'complete'>('atmosphere');
  const [statusMessage, setStatusMessage] = useState('SYSTEM BOOTSTRAP');
  
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediate bypass for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    let start = performance.now();
    const duration = 2100; // 2.1s calibrated cinematic sequence
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = Math.min(1, elapsed / duration);
      // Smooth cubic-bezier acceleration then gentle settle
      const ease = Math.min(1, Math.pow(raw, 1.3));
      const currentVal = Math.floor(ease * 100);
      setProgress(currentVal);

      // Orchestrate phases
      if (raw < 0.25) {
        setPhase('atmosphere');
        setStatusMessage('INITIALIZING COGNITIVE RUNTIME');
      } else if (raw < 0.65) {
        setPhase('identity');
        setStatusMessage('COMPILING VECTOR TOPOLOGY');
      } else if (raw < 0.95) {
        setPhase('reveal');
        setStatusMessage('CONFIGURING SPATIAL HUD');
      } else {
        setStatusMessage('INTERFACE READY // DEPLOYING');
      }

      if (raw < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        // Parting sequence
        setPhase('parting');
        setTimeout(() => {
          setPhase('complete');
          onComplete();
        }, 750);
      }
    };

    animId = requestAnimationFrame(tick);

    // Instant bypass on click or keypress
    const handleSkip = () => {
      cancelAnimationFrame(animId);
      setPhase('parting');
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 400);
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
      className="fixed inset-0 z-[100] pointer-events-none select-none flex flex-col justify-between overflow-hidden bg-[#070709]"
      aria-hidden="true"
    >
      {/* Top Architectural Shutter */}
      <div
        ref={topPanelRef}
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#070709] border-b border-white/[0.08] transition-transform duration-750 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform z-10 ${
          phase === 'parting' ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Architectural Shutter */}
      <div
        ref={bottomPanelRef}
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#070709] border-t border-white/[0.08] transition-transform duration-750 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform z-10 ${
          phase === 'parting' ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Fine Blueprint Grid & Technical Atmospheric Rules */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none z-20" />
      <div className="absolute inset-0 film-grain opacity-[0.035] pointer-events-none z-20" />

      {/* Corner Technical Telemetry Reticles */}
      <div className="absolute top-6 left-8 z-30 font-label-mono-sm text-[10px] text-white/40 tracking-widest hidden sm:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-ping" />
        <span>SYS.SPEC // AS.2026</span>
      </div>

      <div className="absolute top-6 right-8 z-30 font-label-mono-sm text-[10px] text-white/40 tracking-widest hidden sm:block">
        CHENNAI, IN [13.0827° N, 80.2707° E]
      </div>

      <div className="absolute bottom-6 left-8 z-30 font-label-mono-sm text-[10px] text-white/40 tracking-widest hidden sm:block">
        SRM IST // B.TECH CSE AI &amp; ML
      </div>

      <div className="absolute bottom-6 right-8 z-30 font-label-mono-sm text-[10px] text-white/40 tracking-widest hidden sm:flex items-center gap-2">
        <span>PRESS ANY KEY TO ENTER</span>
        <CornerDownLeft className="w-3.5 h-3.5" />
      </div>

      {/* Center Cinematic Typographic Lockup */}
      <div
        className={`relative z-30 m-auto flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 ${
          phase === 'parting' ? 'opacity-0 -translate-y-6 scale-95' : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {/* Monogram Glyph with Volumetric Depth */}
        <div className="relative mb-7 flex items-center justify-center">
          <div
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.03] border border-white/20 flex items-center justify-center font-headline-sm text-xl font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-1000 ${
              phase === 'atmosphere'
                ? 'scale-90 opacity-0 blur-md'
                : 'scale-100 opacity-100 blur-0'
            }`}
          >
            AS
          </div>
          <div className="absolute -inset-3 rounded-3xl border border-white/10 border-dashed animate-spin-slow pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2dd4bf] shadow-[0_0_10px_#2dd4bf]" />
        </div>

        {/* Masked Typographic Reveal for Main Name */}
        <div className="overflow-hidden mb-2">
          <h1
            className={`font-display-hero text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-widest uppercase transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'atmosphere' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            Ayush Singh
          </h1>
        </div>

        {/* Masked Typographic Reveal for Discipline */}
        <div className="overflow-hidden mb-8">
          <p
            className={`font-label-mono-sm text-xs sm:text-sm text-white/60 tracking-[0.25em] uppercase transition-all duration-900 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'atmosphere' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            Systems Architect // Cognitive AI
          </p>
        </div>

        {/* Precision Telemetry Meter */}
        <div className="w-64 sm:w-72 max-w-xs space-y-3">
          <div className="flex items-baseline justify-between font-label-mono-sm text-[11px]">
            <span className="text-white/40 tracking-wider truncate max-w-[180px]">
              {statusMessage}
            </span>
            <span className="text-[#2dd4bf] font-bold text-sm tabular-nums tracking-wider">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          {/* Micro Hairline Bar */}
          <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#2dd4bf] to-[#7ff0dc] transition-[width] duration-150 ease-out rounded-full shadow-[0_0_10px_rgba(45,212,191,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
