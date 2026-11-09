import React from 'react';
import { ProjectTheme } from '../data/projects';

interface FooterProps {
  activeTheme?: ProjectTheme;
  activeProjectNum?: string;
}

export const Footer: React.FC<FooterProps> = ({ activeTheme, activeProjectNum = '01' }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';
  const email = '090109ayush@gmail.com';

  return (
    <footer className="relative z-20 w-full bg-[#070709]/90 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-label-mono-sm text-xs text-white/50">
        {/* Left: Verified Status & Direct Email */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="uppercase tracking-widest text-white/70">SRM IST • CHENNAI</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-white/70">B.TECH CSE (AI &amp; ML)</span>
          </div>
          <span className="text-white/20">•</span>
          {/* Direct Email Action Link */}
          <a
            href={`mailto:${email}`}
            title={`Compose email to ${email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
          >
            <span
              className="material-symbols-outlined text-[14px] transition-colors duration-500"
              style={{ color: accentColor }}
            >
              mail
            </span>
            <span className="text-white/80 group-hover:underline">{email}</span>
          </a>
        </div>

        {/* Center: Real Project index indicator */}
        <div className="flex items-center gap-2 text-white/50">
          <span
            className="font-semibold transition-colors duration-500"
            style={{ color: accentColor }}
          >
            {activeProjectNum}
          </span>
          <span className="text-white/20">/</span>
          <span>06</span>
          <span className="ml-2 uppercase tracking-wider text-white/40">PROJECTS</span>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right uppercase tracking-wider text-white/40">
          © {new Date().getFullYear()} AYUSH SINGH. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
