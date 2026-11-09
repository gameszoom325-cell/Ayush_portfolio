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
  const headerLineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const passionsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger entrance choreography
  useEffect(() => {
    const section = sectionRef.current;
    const headerLine = headerLineRef.current;
    const portrait = portraitRef.current;
    const textBlock = textRef.current;
    const passions = passionsRef.current;
    if (!section || !portrait || !textBlock) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerLine, portrait, textBlock.children, passions ? passions.children : []], {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        return;
      }

      // 1. Header Line Expansion
      if (headerLine) {
        gsap.fromTo(
          headerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Portrait entrance
      gsap.fromTo(
        portrait,
        { opacity: 0, y: 45, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Editorial Text Block Stagger
      gsap.fromTo(
        textBlock.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 4. Passions Cards Stagger
      if (passions) {
        gsap.fromTo(
          passions.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: passions,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Portrait 3D Card Tilt Interaction
  const onPortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frame = cardFrameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    frame.style.transform = `perspective(1000px) rotateX(${(-normY * 4).toFixed(2)}deg) rotateY(${(normX * 5).toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;

    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      sheenRef.current.style.opacity = '1';
    }
  };

  const onPortraitMouseLeave = () => {
    const frame = cardFrameRef.current;
    if (!frame) return;
    frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  };

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
          <div ref={headerLineRef} className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
            ENGINEERING PERSPECTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Cinematic Portrait HUD with 3D Tilt */}
          <div ref={portraitRef} className="lg:col-span-5 flex flex-col gap-6">
            <div
              ref={cardFrameRef}
              onMouseMove={onPortraitMouseMove}
              onMouseLeave={onPortraitMouseLeave}
              className="card-3d-target relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group p-2 border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl transition-[transform,box-shadow] duration-500 cursor-pointer"
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0A0A0E]">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  alt="Portrait of Ayush Singh"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVg5pXMtTL0K4sVlGNe1iJapG1QN2yZHbRgAjYilolyStNmRhX1zqOiFH78u5fJLZco-wrDdjyhqWhqgw0Sbm7nJGoJ57AEGip18TZGLLly8NWk1cwgu07VJLVQqUfSsTZ-QhWCjiMZweRP5oBqrCnu0YKkdTL8LcvO78kC-HXYIJk1cuEvqHbFO-ult1snIzTlFjWktDfXXy4_bW60mjfr0KSzJHt_iEXOEwCRTz"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />

                {/* Dynamic Sheen Reflection */}
                <div
                  ref={sheenRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
                  style={{ mixBlendMode: 'overlay' }}
                />

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

            {/* Passions Horizontal Strip with Refined Micro-Interactions */}
            <div ref={passionsRef} className="grid grid-cols-2 gap-3 pt-1">
              {userInterests.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-[transform,border-color,background-color] duration-200 flex items-center gap-3 cursor-default"
                >
                  <span
                    className="material-symbols-outlined text-[20px] transition-colors duration-300"
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

          {/* Right: Rich Editorial Content Dossier */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div>
              <span
                className="font-label-mono-sm text-xs uppercase tracking-[0.2em] transition-colors duration-500 font-semibold"
                style={{ color: accentColor }}
              >
                ACADEMIC PROFILE &amp; SPECIALIZATION
              </span>
              <h2 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mt-2">
                <span className="block overflow-hidden py-0.5">
                  <span className="block">
                    Bridging Cognitive AI Models with Resilient Web Architecture.
                  </span>
                </span>
              </h2>
            </div>

            {/* Primary Bio Paragraphs */}
            <div className="space-y-4 font-body-lg text-white/75 leading-relaxed text-base sm:text-lg">
              <p>
                I am an undergraduate student in <span className="text-white font-semibold">Computer Science &amp; Engineering</span> specializing in <span className="text-white font-semibold">Artificial Intelligence &amp; Machine Learning</span> at <span className="text-white font-semibold">SRM Institute of Science and Technology, Chennai</span>.
              </p>
              <p>
                My focus centers on combining intelligent machine learning systems with scalable modern web engineering. I design platforms that turn complex spatial, operational, and data workflows into responsive, intuitive digital products.
              </p>
            </div>

            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    psychology
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    AI &amp; ML Systems
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  Predictive risk modeling, intelligent classification, and autonomous decision tools.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    developer_mode_tv
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    Full-Stack Web
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  React, Next.js, Node.js, TypeScript, PostgreSQL, and performant REST APIs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
                    map
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    Spatial GIS &amp; UX
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  Interactive cadastral mapping, PostGIS geometry, and WebGL telemetry.
                </p>
              </div>
            </div>

            {/* Quick Facts Dossier Strip */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-6 font-label-mono-sm">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">CURRENT FOCUS</span>
                <span className="text-white font-semibold text-sm mt-0.5">Scalable AI Applications</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">INSTITUTION</span>
                <span className="text-white font-semibold text-sm mt-0.5">SRM IST Chennai</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">GRADUATION YEAR</span>
                <span className="text-white font-semibold text-sm mt-0.5">2028 (In Progress)</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">LOCATION</span>
                <span className="text-white font-semibold text-sm mt-0.5">Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
