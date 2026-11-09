import React from 'react';
import { ProjectTheme } from '../data/projects';

interface FooterProps {
  activeTheme?: ProjectTheme;
  activeProjectNum?: string;
}

export const Footer: React.FC<FooterProps> = ({ activeTheme, activeProjectNum = '01' }) => {
  const accentColor = activeTheme?.accentColor || '#44e2cd';

  return (
    <footer className="relative z-20 w-full bg-[#070709]/90 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-label-mono-sm text-xs text-white/50">
        {/* Left: Telemetry Hardware Status */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="uppercase tracking-widest text-white/70">LATENCY: 14MS</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-white/70">CORE: NEURAL RUNTIME 4.2</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span
              className="uppercase tracking-widest font-semibold transition-colors duration-500"
              style={{ color: accentColor }}
            >
              INFERENCE: LIVE
            </span>
          </div>
        </div>

        {/* Center: Active Project index indicator */}
        <div className="flex items-center gap-2 text-white/50">
          <span
            className="font-semibold transition-colors duration-500"
            style={{ color: accentColor }}
          >
            {activeProjectNum}
          </span>
          <span className="text-white/20">/</span>
          <span>07</span>
          <span className="ml-2 uppercase tracking-wider text-white/40">SYSTEMS INDEX</span>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right uppercase tracking-wider text-white/40">
          © {new Date().getFullYear()} AYUSH SINGH. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
