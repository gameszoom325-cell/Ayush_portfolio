import React, { useState, useEffect, useRef } from 'react';
import { ProjectTheme } from '../data/projects';

interface ArchitecturalHUDProps {
  activeTheme?: ProjectTheme;
}

export const ArchitecturalHUD: React.FC<ArchitecturalHUDProps> = ({ activeTheme }) => {
  const [isActive, setIsActive] = useState(false);
  const [fps, setFps] = useState(60);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [domCount, setDomCount] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  // Toggle on key 'T' or 't'
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      if (e.key === 't' || e.key === 'T') {
        setIsActive((prev) => !prev);
      }
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive]);

  // Telemetry metric loop when active
  useEffect(() => {
    if (!isActive) return;

    setDomCount(document.getElementsByTagName('*').length);

    let animId: number;

    const updateMetrics = (now: number) => {
      frameCount.current++;
      if (now - lastTime.current >= 500) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = now;
      }
      animId = requestAnimationFrame(updateMetrics);
    };

    animId = requestAnimationFrame(updateMetrics);

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive]);

  return (
    <>
      {/* Floating HUD Activation Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full font-label-mono-sm text-[11px] uppercase tracking-wider backdrop-blur-xl border transition-[transform,background-color,border-color,box-shadow] duration-200 active:scale-95 cursor-pointer shadow-lg ${
            isActive
              ? 'bg-[#2dd4bf]/20 border-[#2dd4bf] text-white shadow-[0_0_20px_rgba(45,212,191,0.35)]'
              : 'bg-[#0A0A0E]/85 border-white/10 text-white/70 hover:text-white hover:border-white/25'
          }`}
          title="Toggle Architectural Telemetry HUD (Shortcut: T)"
          aria-label="Toggle Architectural HUD"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActive ? 'animate-ping bg-[#2dd4bf]' : 'bg-white/40'
              }`}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.4)' }}
            />
          </span>
          <span className="font-semibold tracking-widest">
            {isActive ? 'HUD ACTIVE' : 'ARCHITECTURAL HUD'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/50 border border-white/10">
            T
          </span>
        </button>
      </div>

      {/* Blueprint Measurement Overlay & Reticle */}
      {isActive && (
        <div
          className="fixed inset-0 pointer-events-none z-[80] select-none animate-in fade-in duration-300"
          aria-hidden="true"
        >
          {/* Subtle Isometric Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Caliper Corner Rulers */}
          <div className="absolute top-4 left-4 font-label-mono-sm text-[10px] text-[#2dd4bf]/70 flex flex-col gap-0.5">
            <span>[ SYSTEM: ARCHITECTURAL_HUD_V2 ]</span>
            <span>[ ORIGIN: (0, 0) // CAD_COORDINATES ]</span>
          </div>

          <div className="absolute top-4 right-4 font-label-mono-sm text-[10px] text-[#2dd4bf]/70 text-right">
            <span>[ VIEWPORT: {window.innerWidth} × {window.innerHeight} ]</span>
            <span>[ RESOLUTION: {(window.devicePixelRatio || 1).toFixed(1)} DPR ]</span>
          </div>

          {/* Real-time Cursor CAD Crosshair Readout */}
          <div
            className="fixed pointer-events-none flex items-center gap-2 will-change-transform"
            style={{
              transform: `translate3d(${mousePos.x + 14}px, ${mousePos.y + 14}px, 0)`,
            }}
          >
            <div className="px-2 py-1 rounded bg-black/90 border border-[#2dd4bf]/50 font-label-mono-sm text-[10px] text-[#2dd4bf] shadow-md flex items-center gap-1.5 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
              <span>X:{mousePos.x} Y:{mousePos.y}</span>
            </div>
          </div>

          {/* Bottom Docked Real-Time Telemetry Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-[#070709]/95 backdrop-blur-2xl border border-[#2dd4bf]/40 shadow-2xl flex items-center gap-6 font-label-mono-sm text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-white/50">ENGINE:</span>
              <span className="font-semibold text-white">WebGL2 CONTOUR</span>
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-white/50">FPS:</span>
              <span className="font-bold text-[#2dd4bf] tabular-nums">{fps}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-white/50">DOM NODES:</span>
              <span className="font-bold text-white tabular-nums">{domCount}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-white/50">THEME MATRIX:</span>
              <span className="font-semibold" style={{ color: accentColor }}>
                {activeTheme?.name.split(' ')[0] || 'NEURAL'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
