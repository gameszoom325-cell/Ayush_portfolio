import React from 'react';
import { ProjectTheme } from '../data/projects';

interface AmbientBackgroundProps {
  theme: ProjectTheme;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Top Main Atmospheric Glow */}
      <div
        className="fixed top-[-180px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-[170px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${theme.glowBurgundy} 0%, transparent 70%)`,
        }}
      />

      {/* Right Lateral Accent Orb */}
      <div
        className="fixed top-[40%] -right-48 w-[850px] h-[850px] rounded-full blur-[190px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          backgroundColor: theme.glowAccent,
        }}
      />

      {/* Bottom Sub-surface Orb */}
      <div
        className="fixed bottom-[-120px] -left-48 w-[750px] h-[750px] rounded-full blur-[190px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          backgroundColor: theme.glowBottom,
        }}
      />

      {/* Subtle fine dynamic mesh noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] film-grain pointer-events-none" />
    </div>
  );
};
