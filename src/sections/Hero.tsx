import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroShader } from '../components/HeroShader';
import { ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  activeTheme?: ProjectTheme;
}

export const Hero: React.FC<HeroProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  const sectionRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInnerRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // 1. Cinematic Entrance Sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate clean static reveal without motion
        gsap.set(
          [
            statusRef.current,
            eyebrowRef.current,
            lineRef.current,
            titleRef.current,
            subRef.current,
            bioRef.current,
            ctaRef.current,
            telemetryRef.current,
          ],
          { opacity: 1, y: 0, scaleX: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 0: Status Pill & Eyebrow Tag Bar arrive together
      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.65, delay: 0.1 }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.45'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=0.4'
        )
        // Step 1: Main Title - Masked upward reveal with strong editorial presence
        .fromTo(
          titleInnerRef.current,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, ease: 'power4.out' },
          '-=0.45'
        )
        // Step 2: Discipline Subtitle
        .fromTo(
          subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.6'
        )
        // Step 3: Bio Statement
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        // Step 4: CTAs and Social Links Row
        .fromTo(
          ctaRef.current ? ctaRef.current.children : [],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          '-=0.45'
        )
        // Step 5: Architectural Telemetry Ribbon at Fold
        .fromTo(
          telemetryRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        );

      // Scroll-driven departure parallax
      if (parallaxLayerRef.current) {
        gsap.to(parallaxLayerRef.current, {
          y: -45,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Interactive Low-Frequency Mouse Parallax (Apple-grade spatial depth)
  useEffect(() => {
    const layer = parallaxLayerRef.current;
    if (!layer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return; // Desktop only

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 16;
      targetY = ((e.clientY / innerHeight) - 0.5) * 12;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

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
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
      id="overview"
    >
      {/* Edge-to-Edge WebGL Shader Canvas extending behind all content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <HeroShader />
      </div>

      {/* Main Content Area with Smooth Parallax Depth */}
      <div
        ref={parallaxLayerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-28 sm:pt-32 pb-8 flex-1 flex flex-col justify-center will-change-transform"
      >
        {/* Status Tag Bar */}
        <div ref={statusRef} className="pb-6 md:pb-8">
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
          <div ref={eyebrowRef} className="flex items-center gap-4">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
              style={{ color: accentColor }}
            >
              [ PERSONAL PORTFOLIO ]
            </span>
            <div ref={lineRef} className="h-[1px] w-20 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              AI/ML &amp; SYSTEMS
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-[-0.035em] leading-[0.98] uppercase select-none"
          >
            <span className="block overflow-hidden py-1">
              <span ref={titleInnerRef} className="block will-change-transform">
                Ayush Singh
              </span>
            </span>
          </h1>

          <div
            ref={subRef}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 font-label-mono-md text-xs sm:text-sm uppercase tracking-wider pt-1"
          >
            <span className="text-white font-medium">B.Tech CSE AI/ML</span>
            <span className="text-white/25">/</span>
            <span>Full-Stack Web Developer</span>
            <span className="text-white/25">/</span>
            <span>Creative Technologist</span>
          </div>

          <p
            ref={bioRef}
            className="font-body-lg text-base sm:text-lg text-white/75 max-w-2xl font-normal leading-relaxed"
          >
            Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology. Crafting production-ready web platforms, intelligent tools, and interactive digital interfaces.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-bold tracking-wider uppercase shadow-[0_12px_28px_-6px_rgba(255,255,255,0.22)] hover:bg-[#E2E8F0] hover:scale-[1.02] active:scale-[0.97] transition-[transform,background-color,box-shadow] duration-200"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 backdrop-blur-2xl text-white font-label-mono-md text-xs tracking-wider uppercase hover:bg-white/[0.08] active:scale-[0.97] transition-[transform,border-color,background-color] duration-200"
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
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:scale-[1.04] active:scale-[0.96] transition-[transform,border-color,background-color,color] duration-200"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-singh-705a63397"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:scale-[1.04] active:scale-[0.96] transition-[transform,border-color,background-color,color] duration-200"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a
                href="mailto:090109ayush@gmail.com"
                title="Email: 090109ayush@gmail.com"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:scale-[1.04] active:scale-[0.96] transition-[transform,border-color,background-color,color] duration-200"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Bleed Architectural Telemetry Ribbon (Docked flush at fold) */}
      <div
        ref={telemetryRef}
        className="w-full border-t border-white/[0.08] bg-[#0A0A0E]/80 backdrop-blur-2xl z-20"
      >
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
