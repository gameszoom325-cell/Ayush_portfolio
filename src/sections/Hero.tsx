import React from 'react';
import { HeroShader } from '../components/HeroShader';
import { ProjectTheme } from '../data/projects';

interface HeroProps {
  activeTheme?: ProjectTheme;
}

export const Hero: React.FC<HeroProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
      id="overview"
    >
      {/* Edge-to-Edge WebGL Shader Canvas extending behind all content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <HeroShader />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-28 sm:pt-32 pb-8 flex-1 flex flex-col justify-center">
        {/* Status Tag Bar */}
        <div className="pb-6 md:pb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-lg w-max">
            <span className="flex h-2 w-2 relative">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: accentColor }}
              />
            </span>
            <span
              className="font-label-mono-sm text-xs uppercase tracking-widest font-semibold transition-colors duration-500"
              style={{ color: accentColor }}
            >
              SRM IST CHENNAI
            </span>
            <span className="text-white/20 font-label-mono-sm text-xs">•</span>
            <span className="font-label-mono-sm text-xs uppercase text-white/70 tracking-wider">
              B.TECH CSE (AI &amp; ML)
            </span>
          </div>
        </div>

        {/* Hero Title & Identity Spread */}
        <div className="flex flex-col gap-5 max-w-5xl">
          <div className="flex items-center gap-4">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
              style={{ color: accentColor }}
            >
              [ PERSONAL PORTFOLIO ]
            </span>
            <div className="h-[1px] w-20 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              AI/ML &amp; SYSTEMS
            </span>
          </div>

          <h1 className="font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-[-0.035em] leading-[0.98] uppercase select-none">
            Ayush Singh
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 font-label-mono-md text-xs sm:text-sm uppercase tracking-wider pt-1">
            <span className="text-white font-medium">B.Tech CSE AI/ML</span>
            <span className="text-white/25">/</span>
            <span>Full-Stack Web Developer</span>
            <span className="text-white/25">/</span>
            <span>Creative Technologist</span>
          </div>

          <p className="font-body-lg text-base sm:text-lg text-white/75 max-w-2xl font-normal leading-relaxed">
            Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology. Crafting production-ready web platforms, intelligent tools, and interactive digital interfaces.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-bold tracking-wider uppercase transition-all shadow-[0_12px_28px_-6px_rgba(255,255,255,0.22)] hover:bg-[#E2E8F0] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 backdrop-blur-2xl text-white font-label-mono-md text-xs tracking-wider uppercase transition-all hover:bg-white/[0.08] active:scale-[0.98]"
            >
              <span
                className="material-symbols-outlined text-[18px] transition-colors duration-500"
                style={{ color: accentColor }}
              >
                person
              </span>
              <span>About Me</span>
            </a>

            {/* Direct Social Links */}
            <div className="flex items-center gap-3 sm:ml-auto pt-2 sm:pt-0">
              <a
                href="https://github.com/gameszoom325-cell"
                target="_blank"
                rel="noreferrer"
                title="GitHub @gameszoom325-cell"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-singh-705a63397"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a
                href="mailto:090109ayush@gmail.com"
                title="Email: 090109ayush@gmail.com"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Bleed Architectural Telemetry Ribbon (Docked flush at fold) */}
      <div className="w-full border-t border-white/[0.08] bg-[#0A0A0E]/80 backdrop-blur-2xl z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 grid grid-cols-2 md:grid-cols-4 gap-6 font-label-mono-sm">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">DEGREE</span>
              <span className="text-white font-semibold text-xs tracking-wide">B.Tech CSE AI/ML</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-white/[0.06] pl-4 sm:pl-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">PROJECTS</span>
              <span className="text-white font-semibold text-xs tracking-wide">06 Live Platforms</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-white/[0.06] pl-4 sm:pl-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">HACKATHONS</span>
              <span className="text-white font-semibold text-xs tracking-wide">SIH 2026 &amp; Genie X</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-white/[0.06] pl-4 sm:pl-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">CORE STACK</span>
              <span className="text-white font-semibold text-xs tracking-wide">React, Next.js, Python</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
