import React, { useEffect, useRef } from 'react';
import { ProjectTheme } from '../data/projects';

interface AmbientBackgroundProps {
  theme: ProjectTheme;
  activeSection?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme, activeSection = 'overview' }) => {
  const mouseLightRef = useRef<HTMLDivElement>(null);

  // Section-driven atmosphere palettes
  const getAtmosphereColors = () => {
    switch (activeSection) {
      case 'about':
        return {
          primary: '#0284c7',
          secondary: '#0369a1',
          burgundy: 'rgba(2, 132, 199, 0.18)',
        };
      case 'trajectory':
        return {
          primary: '#6366f1',
          secondary: '#4338ca',
          burgundy: 'rgba(99, 102, 241, 0.18)',
        };
      case 'projects':
        return {
          primary: theme.accentColor,
          secondary: theme.accentSecondary,
          burgundy: theme.glowBurgundy || 'rgba(15, 118, 110, 0.2)',
        };
      case 'archive':
        return {
          primary: '#f59e0b',
          secondary: '#b45309',
          burgundy: 'rgba(245, 158, 11, 0.15)',
        };
      case 'stack':
        return {
          primary: '#64748b',
          secondary: '#334155',
          burgundy: 'rgba(100, 116, 139, 0.15)',
        };
      case 'contact':
        return {
          primary: '#14b8a6',
          secondary: '#0f766e',
          burgundy: 'rgba(20, 184, 166, 0.22)',
        };
      case 'overview':
      default:
        return {
          primary: '#2dd4bf',
          secondary: '#0f766e',
          burgundy: 'rgba(15, 118, 110, 0.2)',
        };
    }
  };

  const colors = getAtmosphereColors();

  // Interactive Lighting tied subtly to cursor coordinates (Lusion-style physical sheen)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    const lightEl = mouseLightRef.current;
    if (!lightEl) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (lightEl) {
        lightEl.style.background = `radial-gradient(800px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(255, 255, 255, 0.02) 0%, transparent 70%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none" aria-hidden="true">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#070709]" />

      {/* Living Atmospheric Field 1 (Upper Diagonal) */}
      <div
        className="animate-ambient-1 absolute -top-[12vw] left-[15%] w-[75vw] max-w-[1200px] h-[60vw] max-h-[900px] rounded-full pointer-events-none transition-[background] duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.primary}20 0%, ${colors.burgundy} 40%, transparent 70%)`,
          filter: 'blur(110px)',
        }}
      />

      {/* Living Atmospheric Field 2 (Lower Counter-Balance) */}
      <div
        className="animate-ambient-2 absolute bottom-[-12vw] -right-[5vw] w-[65vw] max-w-[1000px] h-[55vw] max-h-[850px] rounded-full pointer-events-none transition-[background] duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.secondary}16 0%, transparent 65%)`,
          filter: 'blur(120px)',
        }}
      />

      {/* Interactive Cursor Spotlight Specular Reflection */}
      <div ref={mouseLightRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300" />

      {/* Fine Architectural Topographic Horizon Beam */}
      <div
        className="absolute top-[48%] left-0 right-0 h-[1px] opacity-10 pointer-events-none transition-[background] duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.primary} 45%, transparent 90%)`,
        }}
      />

      {/* Vignette Radial Mask to Anchor Viewport Focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 55%, #070709 100%)',
          opacity: 0.85,
        }}
      />

      {/* Procedural Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] film-grain pointer-events-none" />
    </div>
  );
};
