import React from 'react';
import { ProjectTheme } from '../data/projects';

interface AmbientBackgroundProps {
  theme: ProjectTheme;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none" aria-hidden="true">
      {/* Deep Spatial Gradient Base (Obsidian, Titanium & Sub-black) */}
      <div className="absolute inset-0 bg-[#070709]" />

      {/* Living Atmospheric Field 1 (Upper Hemisphere Harmonic Glow) */}
      <div
        className="animate-ambient-1 absolute -top-[10vw] left-[15%] w-[70vw] max-w-[1100px] h-[55vw] max-h-[850px] rounded-full pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accentColor}18 0%, ${theme.glowBurgundy || 'rgba(15,118,110,0.15)'} 35%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Living Atmospheric Field 2 (Lower Diagonal Counter-Balance) */}
      <div
        className="animate-ambient-2 absolute bottom-[-10vw] -right-[5vw] w-[60vw] max-w-[950px] h-[50vw] max-h-[800px] rounded-full pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accentSecondary || '#0f766e'}14 0%, transparent 65%)`,
          filter: 'blur(110px)',
        }}
      />

      {/* Fine Architectural Topographic Horizon Beam */}
      <div
        className="absolute top-[48%] left-0 right-0 h-[1px] opacity-10 pointer-events-none transition-colors duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accentColor} 45%, transparent 90%)`,
        }}
      />

      {/* Fine Vignette Radial Mask to Anchor Viewport Focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 55%, #070709 100%)',
          opacity: 0.85,
        }}
      />

      {/* Procedural Architectural Film Grain */}
      <div className="absolute inset-0 opacity-[0.03] film-grain pointer-events-none" />
    </div>
  );
};
