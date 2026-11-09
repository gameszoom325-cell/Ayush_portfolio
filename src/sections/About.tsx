import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code2, Globe2, Gamepad2, Film, Dumbbell, Compass } from 'lucide-react';
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
  const cardImageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const headlineMask1Ref = useRef<HTMLSpanElement>(null);
  const headlineMask2Ref = useRef<HTMLSpanElement>(null);
  const headlineMask3Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const passionsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger editorial entrance choreography
  useEffect(() => {
    const section = sectionRef.current;
    const headerLine = headerLineRef.current;
    const portrait = portraitRef.current;
    const textBlock = textRef.current;
    const capabilities = capabilitiesRef.current;
    const passions = passionsRef.current;
    if (!section || !portrait) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headerLine,
            portrait,
            headlineMask1Ref.current,
            headlineMask2Ref.current,
            headlineMask3Ref.current,
            textBlock ? textBlock.children : [],
            capabilities ? capabilities.children : [],
            passions ? passions.children : [],
          ],
          {
            opacity: 1,
            y: 0,
            scaleX: 1,
            yPercent: 0,
            rotateY: 0,
          }
        );
        return;
      }

      // 1. Header Line Expansion
      if (headerLine) {
        gsap.fromTo(
          headerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Portrait Dossier 3D Perspective Entrance
      gsap.fromTo(
        portrait,
        {
          opacity: 0,
          y: 60,
          rotateY: -10,
          scale: 0.94,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Editorial Masked Headline Reveal
      const headlineSpans = [
        headlineMask1Ref.current,
        headlineMask2Ref.current,
        headlineMask3Ref.current,
      ].filter(Boolean);

      if (headlineSpans.length > 0) {
        gsap.fromTo(
          headlineSpans,
          { yPercent: 120, rotateX: 20, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headlineSpans[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Bio Paragraphs Stagger
      if (textBlock) {
        gsap.fromTo(
          textBlock.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBlock,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. Capability Cards Stagger
      if (capabilities) {
        gsap.fromTo(
          capabilities.children,
          { opacity: 0, y: 28, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.1)',
            scrollTrigger: {
              trigger: capabilities,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 6. Passions Cards Stagger
      if (passions) {
        gsap.fromTo(
          passions.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
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

  // Portrait 3D Card Tilt Interaction with Internal Image Parallax
  const onPortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frame = cardFrameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    frame.style.transform = `perspective(1000px) rotateX(${(-normY * 7.5).toFixed(2)}deg) rotateY(${(normX * 8.5).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    if (cardImageRef.current) {
      cardImageRef.current.style.transform = `translate3d(${(-normX * 12).toFixed(1)}px, ${(-normY * 10).toFixed(1)}px, 0) scale(1.05)`;
    }

    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle 380px at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255,255,255,0.14) 0%, transparent 65%)`;
      sheenRef.current.style.opacity = '1';
    }
  };

  const onPortraitMouseLeave = () => {
    const frame = cardFrameRef.current;
    if (!frame) return;
    frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (cardImageRef.current) {
      cardImageRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  };

  const userInterests = [
    { label: 'Gaming & Mechanics', icon: Gamepad2, desc: 'Interactive mechanics & engines' },
    { label: 'Anime & Motion', icon: Film, desc: 'Visual rhythm & composition' },
    { label: 'Fitness & Discipline', icon: Dumbbell, desc: 'Consistency & mental stamina' },
    { label: 'Exploring Tech', icon: Compass, desc: 'Novel models & systems design' },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-24 md:py-36 relative flex flex-col justify-center select-none"
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
                  ref={cardImageRef}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out"
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
              {userInterests.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    data-magnetic="true"
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-3 cursor-default"
                  >
                    <IconComponent className="w-5 h-5 transition-colors duration-300 flex-shrink-0" style={{ color: accentColor }} />
                    <div className="flex flex-col truncate">
                      <span className="font-headline-sm text-xs text-white font-semibold truncate">
                        {item.label}
                      </span>
                      <span className="font-label-mono-sm text-[10px] text-white/50 truncate">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Editorial Narrative Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span
                className="font-label-mono-sm text-xs tracking-widest uppercase font-semibold"
                style={{ color: accentColor }}
              >
                ACADEMIC PROFILE &amp; SPECIALIZATION
              </span>

              {/* Masked Editorial Headline */}
              <h2 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] perspective-[800px]">
                <div className="overflow-hidden">
                  <span ref={headlineMask1Ref} className="inline-block will-change-transform">
                    Bridging Cognitive AI Models
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span ref={headlineMask2Ref} className="inline-block will-change-transform text-white/90">
                    with Resilient Web
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span ref={headlineMask3Ref} className="inline-block will-change-transform bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                    Architecture.
                  </span>
                </div>
              </h2>
            </div>

            {/* Primary Bio Paragraphs */}
            <div ref={textRef} className="space-y-4 font-body-lg text-white/75 leading-relaxed text-base sm:text-lg">
              <p>
                I am an undergraduate student in <span className="text-white font-semibold">Computer Science &amp; Engineering</span> specializing in <span className="text-white font-semibold">Artificial Intelligence &amp; Machine Learning</span> at <span className="text-white font-semibold">SRM Institute of Science and Technology, Chennai</span>.
              </p>
              <p>
                My focus centers on combining intelligent machine learning systems with scalable modern web engineering. I design platforms that turn complex spatial, operational, and data workflows into responsive, intuitive digital products.
              </p>
            </div>

            {/* Core Capability Cards with Magnetic Hover */}
            <div ref={capabilitiesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div
                data-magnetic="true"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <Brain className="w-5 h-5 transition-colors duration-300 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    AI &amp; ML Systems
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  Predictive risk modeling, intelligent classification, and autonomous decision tools.
                </p>
              </div>

              <div
                data-magnetic="true"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-5 h-5 transition-colors duration-300 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    Full-Stack Web
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  React, Next.js, Node.js, TypeScript, PostgreSQL, and performant REST APIs.
                </p>
              </div>

              <div
                data-magnetic="true"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-5 h-5 transition-colors duration-300 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="font-headline-sm text-xs font-semibold text-white uppercase tracking-wider">
                    Spatial GIS &amp; UX
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 leading-relaxed">
                  Interactive cadastral mapping, PostGIS geometry, and WebGL telemetry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
