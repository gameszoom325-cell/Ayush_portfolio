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
      className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-24 md:pt-24 md:pb-36 flex flex-col justify-between relative overflow-hidden"
      id="overview"
    >
      {/* Interactive WebGL Shader Canvas Background with Screen Blend */}
      <HeroShader />

      <div className="relative z-10 flex flex-col justify-between w-full h-full">
        {/* Real Status Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-12">
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

          <div className="flex flex-wrap items-center gap-3 text-white/60 font-label-mono-sm text-xs">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-full">
              <span
                className="material-symbols-outlined text-[15px] transition-colors duration-500"
                style={{ color: accentColor }}
              >
                location_on
              </span>
              <span className="text-white/80 tracking-wider uppercase">CHENNAI, INDIA</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-full">
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-white/70 tracking-wider uppercase">
                STUDENT DEVELOPER &amp; BUILDER
              </span>
            </div>
          </div>
        </div>

        {/* Hero Title Spread */}
        <div className="flex flex-col gap-6 py-6 md:py-10 max-w-5xl">
          <div className="flex items-center gap-4">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
              style={{ color: accentColor }}
            >
              [ PERSONAL PORTFOLIO ]
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              AI/ML &amp; WEB SYSTEMS
            </span>
          </div>

          <h1 className="font-display-hero text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-[-0.035em] leading-[0.95] uppercase select-none">
            Ayush Singh
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 font-label-mono-md text-xs sm:text-sm uppercase tracking-wider pt-2">
            <span className="text-white font-medium">B.Tech CSE AI/ML</span>
            <span className="text-white/20">/</span>
            <span>Full-Stack Web Developer</span>
            <span className="text-white/20">/</span>
            <span>Creative Developer</span>
          </div>

          <p className="font-body-lg text-lg sm:text-xl text-white/70 max-w-3xl mt-3 font-normal leading-relaxed">
            Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology, Chennai. Developing production-ready web platforms, intelligent tools, and interactive digital experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_15px_30px_-5px_rgba(255,255,255,0.25)] hover:bg-[#C4C8D0] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl text-white font-label-mono-md text-xs tracking-wider uppercase transition-all hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <span
                className="material-symbols-outlined text-[18px] transition-colors duration-500"
                style={{ color: accentColor }}
              >
                person
              </span>
              <span>About Me</span>
            </a>

            {/* Direct Socials */}
            <div className="flex items-center gap-2 sm:ml-auto pt-4 sm:pt-0">
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

        {/* Real Profile Telemetry Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 glass-dossier rounded-3xl p-6 md:p-8">
          <div className="flex flex-col gap-1 border-r border-white/[0.06] pr-4">
            <span className="font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
              DEGREE &amp; TRACK
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-sm text-2xl md:text-3xl font-bold text-white">B.Tech</span>
              <span
                className="font-label-mono-sm text-xs font-semibold transition-colors duration-500"
                style={{ color: accentColor }}
              >
                CSE AI/ML
              </span>
            </div>
            <span className="font-body-sm text-xs text-white/60">SRM IST, Chennai</span>
          </div>

          <div className="flex flex-col gap-1 md:border-r border-white/[0.06] pr-4">
            <span className="font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
              FEATURED PLATFORMS
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-sm text-2xl md:text-3xl font-bold text-white">06</span>
              <span
                className="font-label-mono-sm text-xs font-semibold transition-colors duration-500"
                style={{ color: accentColor }}
              >
                PROJECTS
              </span>
            </div>
            <span className="font-body-sm text-xs text-white/60">Full-Stack &amp; AI Systems</span>
          </div>

          <div className="flex flex-col gap-1 border-r border-white/[0.06] pr-4 mt-4 md:mt-0">
            <span className="font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
              HACKATHONS
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-sm text-2xl md:text-3xl font-bold text-white">SIH</span>
              <span
                className="font-label-mono-sm text-xs font-semibold transition-colors duration-500"
                style={{ color: accentColor }}
              >
                GENIE X
              </span>
            </div>
            <span className="font-body-sm text-xs text-white/60">Real-World Problem Solver</span>
          </div>

          <div className="flex flex-col gap-1 pr-4 mt-4 md:mt-0">
            <span className="font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
              PRIMARY STACK
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-sm text-2xl md:text-3xl font-bold text-white">React</span>
              <span
                className="font-label-mono-sm text-xs font-semibold transition-colors duration-500"
                style={{ color: accentColor }}
              >
                Next / TS
              </span>
            </div>
            <span className="font-body-sm text-xs text-white/60">Python, Tailwind, Node.js</span>
          </div>
        </div>
      </div>
    </section>
  );
};
