import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, User, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { HeroShader } from '../components/HeroShader';
import { ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  activeTheme?: ProjectTheme;
  isIntroActive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ activeTheme, isIntroActive = false }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  const sectionRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleMask1Ref = useRef<HTMLSpanElement>(null);
  const titleMask2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // 1. Cinematic Entrance Sequence Orchestration
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            statusRef.current,
            eyebrowRef.current,
            lineRef.current,
            titleMask1Ref.current,
            titleMask2Ref.current,
            subRef.current,
            bioRef.current,
            ctaRef.current ? ctaRef.current.children : [],
            telemetryRef.current,
          ],
          { opacity: 1, y: 0, scaleX: 1, yPercent: 0, rotateX: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Step 0: Status Pill & Eyebrow Tag Bar arrive with crisp spring
      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.6'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'expo.inOut' },
          '-=0.5'
        )
        // Step 1: Main Title - Masked editorial upward wipe with slight perspective rotation
        .fromTo(
          [titleMask1Ref.current, titleMask2Ref.current],
          { yPercent: 125, rotateX: 25, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.6'
        )
        // Step 2: Discipline Subtitle
        .fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.8'
        )
        // Step 3: Bio Statement
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.65'
        )
        // Step 4: CTAs and Social Links Row with Staggered Emergence
        .fromTo(
          ctaRef.current ? ctaRef.current.children : [],
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.2)' },
          '-=0.6'
        )
        // Step 5: Architectural Telemetry Ribbon at Fold
        .fromTo(
          telemetryRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.4'
        );

      // Scroll-driven departure parallax
      if (parallaxLayerRef.current) {
        gsap.to(parallaxLayerRef.current, {
          y: -80,
          opacity: 0.75,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  // 2. Interactive Spatial Mouse Parallax (Low frequency luxury depth)
  useEffect(() => {
    const layer = parallaxLayerRef.current;
    if (!layer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 22;
      targetY = ((e.clientY / innerHeight) - 0.5) * 16;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      if (layer) {
        layer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <header
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-0 overflow-hidden"
      id="overview"
    >
      {/* Dynamic Living WebGL Shader Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-85">
        <HeroShader />
      </div>

      {/* Atmospheric Subtle Architectural Coordinate Crosshairs */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-8 sm:left-16 text-white/[0.12] font-label-mono-sm text-[10px] tracking-widest hidden md:block">
          SYS.LOC // 13.0827°N 80.2707°E
        </div>
        <div className="absolute top-1/3 right-8 sm:right-16 text-white/[0.12] font-label-mono-sm text-[10px] tracking-widest hidden md:block">
          AI_KERNEL // LOADED
        </div>
        <div className="absolute top-1/2 left-6 w-3 h-[1px] bg-white/20 hidden md:block" />
        <div className="absolute top-1/2 right-6 w-3 h-[1px] bg-white/20 hidden md:block" />
      </div>

      {/* Main Content Area */}
      <div
        ref={parallaxLayerRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center will-change-transform"
      >
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* 1. Academic Affiliation & Availability Badge */}
          <div
            ref={statusRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg"
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-label-mono-sm text-xs text-white/90 uppercase tracking-widest font-medium">
              SRM IST Chennai
            </span>
            <span className="text-white/20">•</span>
            <span className="font-label-mono-sm text-xs text-white/60 tracking-wider">
              B.Tech CSE (AI &amp; ML)
            </span>
          </div>

          {/* 2. Technical Scope Dossier Eyebrow & Hairline Rule */}
          <div className="space-y-3">
            <div
              ref={eyebrowRef}
              className="flex items-center gap-4 text-xs font-label-mono-sm tracking-[0.25em] text-white/50 uppercase"
            >
              <span
                className="font-bold tracking-[0.3em] transition-colors duration-500"
                style={{ color: accentColor }}
              >
                [ PERSONAL PORTFOLIO ]
              </span>
              <div
                ref={lineRef}
                className="h-[1px] flex-1 bg-gradient-to-r from-white/25 via-white/10 to-transparent"
              />
              <span className="hidden sm:inline text-white/30 tracking-widest">
                AI/ML &amp; SYSTEMS
              </span>
            </div>

            {/* 3. Hero Identity Name with Masked Stagger */}
            <div className="overflow-hidden mb-4 sm:mb-6 perspective-[1000px]">
              <h1 className="font-display-hero text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] uppercase select-none">
                <span className="inline-block overflow-hidden mr-3 sm:mr-5">
                  <span
                    ref={titleMask1Ref}
                    className="inline-block will-change-transform bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80"
                  >
                    AYUSH
                  </span>
                </span>
                <span className="inline-block overflow-hidden">
                  <span
                    ref={titleMask2Ref}
                    className="inline-block will-change-transform bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60"
                  >
                    SINGH
                  </span>
                </span>
              </h1>
            </div>
          </div>

          {/* 4. Architectural Discipline Tags */}
          <div
            ref={subRef}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-label-mono-sm text-xs sm:text-sm text-white/80 uppercase tracking-wider"
          >
            <span className="font-semibold text-white">B.Tech CSE AI/ML</span>
            <span className="text-white/25">/</span>
            <span>Full-Stack Web Developer</span>
            <span className="text-white/25">/</span>
            <span>Creative Technologist</span>
          </div>

          {/* 5. Editorial Bio Statement */}
          <p
            ref={bioRef}
            className="font-body-lg text-base sm:text-lg text-white/75 max-w-2xl font-normal leading-relaxed"
          >
            Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology. Crafting production-ready web platforms, intelligent tools, and interactive digital interfaces.
          </p>

          {/* 6. CTAs and Direct Channels Row */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
            <a
              href="#projects"
              data-magnetic="true"
              className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-bold tracking-wider uppercase shadow-[0_12px_28px_-6px_rgba(255,255,255,0.22)] hover:bg-[#E2E8F0] active:scale-[0.97] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Explore Projects</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
            </a>

            <a
              href="#about"
              data-magnetic="true"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 backdrop-blur-2xl text-white font-label-mono-md text-xs tracking-wider uppercase hover:bg-white/[0.08] active:scale-[0.97] transition-all duration-300 cursor-pointer"
            >
              <User className="w-4 h-4 transition-colors duration-500" style={{ color: accentColor }} />
              <span>About Me</span>
            </a>

            {/* Direct Social Links */}
            <div className="flex items-center gap-3 sm:ml-auto pt-2 sm:pt-0">
              <a
                href="https://github.com/gameszoom325-cell"
                target="_blank"
                rel="noreferrer"
                title="GitHub @gameszoom325-cell"
                data-magnetic="true"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.96] transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-singh-705a63397"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                data-magnetic="true"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.96] transition-all duration-200"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:090109ayush@gmail.com"
                title="Email: 090109ayush@gmail.com"
                data-magnetic="true"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.96] transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Full-Bleed Architectural Telemetry Ribbon (Docked flush at fold) */}
      <div
        ref={telemetryRef}
        className="w-full border-t border-white/[0.08] bg-[#0A0A0E]/80 backdrop-blur-2xl z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 grid grid-cols-2 md:grid-cols-4 gap-6 font-label-mono-sm">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">DEGREE</div>
              <div className="text-xs text-white/90 font-medium tracking-wide">B.Tech CSE AI/ML</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">PROJECTS</div>
              <div className="text-xs text-white/90 font-medium tracking-wide">06 Live Platforms</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">HACKATHONS</div>
              <div className="text-xs text-white/90 font-medium tracking-wide">SIH 2026 &amp; Genie X</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">CORE STACK</div>
              <div className="text-xs text-white/90 font-medium tracking-wide truncate">
                React, Next.js, Python, ML
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
