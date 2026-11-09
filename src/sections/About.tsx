import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  activeTheme?: ProjectTheme;
}

export const About: React.FC<AboutProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger smooth reveal & image depth
  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const textBlock = textRef.current;
    if (!section || !portrait || !textBlock) return;

    const ctx = gsap.context(() => {
      // 1. Portrait entrance & subtle parallax depth
      gsap.fromTo(
        portrait,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Editorial Text Block Stagger
      const children = textBlock.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const userInterests = [
    { label: 'Gaming & Game Dev', icon: 'sports_esports', desc: 'Interactive graphics & mechanics' },
    { label: 'Anime Editing', icon: 'movie_filter', desc: 'Visual pacing & motion' },
    { label: 'Fitness & Discipline', icon: 'fitness_center', desc: 'Consistency & focus' },
    { label: 'Exploring Tech', icon: 'explore', desc: 'AI models & modern architectures' },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-24 md:py-36 relative flex flex-col justify-center"
      id="about"
    >
      {/* Background ambient depth glow */}
      <div
        className="absolute top-1/2 left-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[180px] pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
            style={{ color: accentColor }}
          >
            02 / BIOGRAPHY
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
            ENGINEERING PERSPECTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Cinematic Portrait HUD */}
          <div ref={portraitRef} className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group p-2 border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0A0A0E]">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
                  alt="Portrait of Ayush Singh"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVg5pXMtTL0K4sVlGNe1iJapG1QN2yZHbRgAjYilolyStNmRhX1zqOiFH78u5fJLZco-wrDdjyhqWhqgw0Sbm7nJGoJ57AEGip18TZGLLly8NWk1cwgu07VJLVQqUfSsTZ-QhWCjiMZweRP5oBqrCnu0YKkdTL8LcvO78kC-HXYIJk1cuEvqHbFO-ult1snIzTlFjWktDfXXy4_bW60mjfr0KSzJHt_iEXOEwCRTz"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md font-label-mono-sm text-[11px] uppercase tracking-wider flex items-center gap-2 border border-white/15">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span style={{ color: accentColor }}>STUDENT DEVELOPER</span>
                  </span>
                  <span className="text-white/80 font-label-mono-sm text-[11px] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    SRM IST CHENNAI
                  </span>
                </div>

                {/* Bottom Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
                  <span className="font-headline-sm text-2xl font-bold text-white tracking-tight">
                    Ayush Singh
                  </span>
                  <p className="font-body-sm text-xs text-white/70">
                    B.Tech CSE Artificial Intelligence &amp; Machine Learning
                  </p>
                </div>
              </div>
            </div>

            {/* Passions Horizontal Strip */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {userInterests.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all flex items-center gap-3"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: accentColor }}
                  >
                    {item.icon}
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="font-headline-sm text-xs text-white font-semibold truncate">
                      {item.label}
                    </span>
                    <span className="font-body-sm text-[11px] text-white/40 truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editorial Narrative & Spatial Pillars */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4">
              <span
                className="font-label-mono-sm text-xs uppercase tracking-[0.2em] transition-colors duration-500 font-semibold"
                style={{ color: accentColor }}
              >
                CORE MANIFESTO
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1]">
                Software is no longer static code. It is living interactive topology.
              </h2>
            </div>

            <div className="space-y-5 font-body-lg text-base sm:text-lg text-white/75 leading-relaxed">
              <p>
                I am an undergraduate student in <span className="text-white font-semibold">Computer Science &amp; Engineering</span> specializing in <span className="text-white font-semibold">Artificial Intelligence &amp; Machine Learning</span> at <span className="text-white font-semibold">SRM Institute of Science and Technology, Chennai</span>.
              </p>
              <p>
                My work centers on building high-impact full-stack platforms and intelligent applications — from predictive cadastral land acquisition monitoring and direct farmer procurement gateways to enterprise contract automation and student budget copilot tools.
              </p>
              <p>
                I focus on solid architecture, responsive spatial design, and practical AI integrations that solve real-world problems cleanly.
              </p>
            </div>

            {/* Architectural Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-b border-white/10 py-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    web
                  </span>
                  <span className="font-headline-sm text-base font-bold text-white">Full-Stack Web</span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  React 19, Next.js, TypeScript, Tailwind CSS v4, and high-velocity UI architecture.
                </p>
              </div>

              <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    psychology
                  </span>
                  <span className="font-headline-sm text-base font-bold text-white">Applied AI/ML</span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  Intelligent document parsing, voice-driven interfaces, and predictive machine learning models.
                </p>
              </div>

              <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    database
                  </span>
                  <span className="font-headline-sm text-base font-bold text-white">Data &amp; Cloud</span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  PostgreSQL, Prisma, Leaflet GIS spatial mapping, Node.js, and Vercel cloud deployment.
                </p>
              </div>
            </div>

            {/* Micro Details Tag Cloud */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
                Ayush Singh
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
                SRM IST Chennai
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
                B.Tech CSE AI/ML
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
                Web Developer
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
                Creative Technologist
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
