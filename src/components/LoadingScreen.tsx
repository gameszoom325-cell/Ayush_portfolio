import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface CursorPointer {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentCenterRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // SVG Line Refs for stroke animation
  const pathALeftRef = useRef<SVGPathElement>(null);
  const pathARightRef = useRef<SVGPathElement>(null);
  const pathACrossRef = useRef<SVGPathElement>(null);
  const pathSRef = useRef<SVGPathElement>(null);
  const circleFrameRef = useRef<SVGCircleElement>(null);

  const [phaseText, setPhaseText] = useState('INITIALIZING WORKSPACE');
  const [progressPercent, setProgressPercent] = useState(0);

  const isCompletedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Creative Drafting Cursors Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // 4 smooth creative drafting pointers
    const pointers: CursorPointer[] = [
      {
        x: centerX - 260,
        y: centerY - 180,
        targetX: centerX - 35,
        targetY: centerY - 35,
        speed: 0.05,
        color: '#2dd4bf', // Cyan
        trail: [],
      },
      {
        x: centerX + 260,
        y: centerY - 160,
        targetX: centerX,
        targetY: centerY - 80,
        speed: 0.045,
        color: '#e2e8f0', // Titanium
        trail: [],
      },
      {
        x: centerX + 240,
        y: centerY + 180,
        targetX: centerX + 35,
        targetY: centerY + 35,
        speed: 0.05,
        color: '#38bdf8', // Blue
        trail: [],
      },
      {
        x: centerX - 220,
        y: centerY + 160,
        targetX: centerX - 10,
        targetY: centerY + 10,
        speed: 0.04,
        color: '#94a3b8', // Titanium Slate
        trail: [],
      },
    ];

    let t = 0;

    const render = () => {
      t += 0.035;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle connecting architectural lines between pointers
      for (let i = 0; i < pointers.length; i++) {
        for (let j = i + 1; j < pointers.length; j++) {
          const p1 = pointers[i];
          const p2 = pointers[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (dist < 360) {
            const alpha = (1 - dist / 360) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.setLineDash([3, 5]);
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 2. Render each cursor pointer
      pointers.forEach((pointer, index) => {
        // Fluid subtle orbit around target
        const orbitX = Math.sin(t * 1.6 + index * 1.5) * 14;
        const orbitY = Math.cos(t * 1.4 + index * 1.3) * 12;

        pointer.x += (pointer.targetX + orbitX - pointer.x) * pointer.speed;
        pointer.y += (pointer.targetY + orbitY - pointer.y) * pointer.speed;

        pointer.trail.push({ x: pointer.x, y: pointer.y, alpha: 0.65 });
        if (pointer.trail.length > 20) pointer.trail.shift();

        // Render soft trailing curve
        ctx.beginPath();
        for (let i = 0; i < pointer.trail.length - 1; i++) {
          const pt1 = pointer.trail[i];
          const pt2 = pointer.trail[i + 1];
          pt1.alpha *= 0.93;
          ctx.strokeStyle = `rgba(226, 232, 240, ${pt1.alpha * 0.25})`;
          ctx.lineWidth = (i / pointer.trail.length) * 1.25;
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
        }
        ctx.stroke();

        // Cursor head: Precision reticle
        const px = pointer.x;
        const py = pointer.y;

        // Outer rotating delicate ring
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(t * 0.8 * (index % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.strokeStyle = pointer.color;
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.restore();

        // Center dot
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = pointer.color;
        ctx.fill();

        // Clean crosshair ticks
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.75;
        ctx.moveTo(px - 14, py);
        ctx.lineTo(px - 11, py);
        ctx.moveTo(px + 11, py);
        ctx.lineTo(px + 14, py);
        ctx.moveTo(px, py - 14);
        ctx.lineTo(px, py - 11);
        ctx.moveTo(px, py + 11);
        ctx.lineTo(px, py + 14);
        ctx.stroke();
      });

      if (!isCompletedRef.current) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Choreographed Master Timeline (Max 2.6s duration)
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        handleFinish();
      },
    });
    timelineRef.current = tl;

    const prepStroke = (el: SVGPathElement | SVGCircleElement | null) => {
      if (!el) return;
      const length = el.getTotalLength();
      gsap.set(el, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    };

    prepStroke(pathALeftRef.current);
    prepStroke(pathARightRef.current);
    prepStroke(pathACrossRef.current);
    prepStroke(pathSRef.current);
    prepStroke(circleFrameRef.current);

    gsap.set(gridOverlayRef.current, { opacity: 0 });
    gsap.set(contentCenterRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(headerRef.current, { opacity: 0 });

    // Progress percentage counter
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgressPercent(Math.round(progressObj.value));
        },
      },
      0
    );

    // Phase 1: Clean Grid & Header (0.0s - 0.4s)
    tl.to(
      [gridOverlayRef.current, headerRef.current],
      {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      },
      0.1
    );

    // Phase 2: Logo Assembly (0.4s - 1.4s)
    tl.to(
      contentCenterRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        onStart: () => setPhaseText('ASSEMBLING MONOGRAM'),
      },
      0.35
    );

    const animateDraw = (
      el: SVGPathElement | SVGCircleElement | null,
      duration: number,
      pos: number
    ) => {
      if (!el) return;
      tl.to(
        el,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration,
          ease: 'power2.inOut',
        },
        pos
      );
    };

    animateDraw(circleFrameRef.current, 0.9, 0.4);
    animateDraw(pathALeftRef.current, 0.7, 0.5);
    animateDraw(pathARightRef.current, 0.7, 0.65);
    animateDraw(pathACrossRef.current, 0.5, 0.85);
    animateDraw(pathSRef.current, 0.8, 0.7);

    // Phase 3: Typographic Reveal & Specular Titanium Accent (1.3s - 1.9s)
    tl.call(() => setPhaseText('AYUSH SINGH // PORTFOLIO'), [], 1.3);

    tl.to(
      '.intro-text-char',
      {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        duration: 0.5,
        ease: 'power3.out',
      },
      1.3
    );

    tl.to(
      '.intro-sub-text',
      {
        opacity: 1,
        letterSpacing: '0.22em',
        duration: 0.5,
        ease: 'power2.out',
      },
      1.5
    );

    tl.to(
      '.intro-titanium-glow',
      {
        opacity: 0.7,
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
      1.6
    );

    // Phase 4: Cinematic Curtain Unveiling (2.0s - 2.6s)
    tl.call(() => setPhaseText('ENTERING PORTFOLIO'), [], 1.95);

    tl.to(
      contentCenterRef.current,
      {
        opacity: 0,
        scale: 1.04,
        duration: 0.45,
        ease: 'power2.in',
      },
      2.05
    );

    tl.to(
      canvasRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      2.1
    );

    tl.to(
      topCurtainRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
      },
      2.15
    );

    tl.to(
      bottomCurtainRef.current,
      {
        yPercent: 100,
        duration: 0.75,
        ease: 'power4.inOut',
      },
      2.15
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'none',
      },
      2.6
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleFinish = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    onComplete();
  };

  const handleSkip = () => {
    if (timelineRef.current && !isCompletedRef.current) {
      gsap.to([topCurtainRef.current], {
        yPercent: -100,
        duration: 0.45,
        ease: 'power4.inOut',
      });
      gsap.to([bottomCurtainRef.current], {
        yPercent: 100,
        duration: 0.45,
        ease: 'power4.inOut',
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: handleFinish,
      });
    }
  };

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const nameChars = 'AYUSH SINGH'.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden select-none bg-[#070709]"
      aria-label="Loading portfolio experience"
    >
      {/* Dual Architectural Shutters (curtains that part smoothly on completion) */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#070709] border-b border-white/[0.08] z-30 pointer-events-none"
      />
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#070709] border-t border-white/[0.08] z-30 pointer-events-none"
      />

      {/* Autonomous Creative Drafting Cursors Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Architectural Grid & Registration Marks */}
      <div
        ref={gridOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.1] to-transparent -translate-x-1/2" />

        {/* Clean Corner Identity Ticks (No fake telemetry) */}
        <div className="absolute bottom-6 left-6 text-white/35 font-label-mono-sm text-[10px] hidden sm:flex items-center gap-2">
          <span>SRM INSTITUTE OF SCIENCE AND TECHNOLOGY</span>
        </div>
        <div className="absolute bottom-6 right-6 text-white/35 font-label-mono-sm text-[10px] hidden sm:flex items-center gap-2">
          <span>B.TECH CSE (AI &amp; ML) • CHENNAI</span>
        </div>
      </div>

      {/* Center Stage: Minimal Titanium AS Monogram & Typographic Reveal */}
      <div
        ref={contentCenterRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4"
      >
        {/* Soft Specular Ambient Bloom */}
        <div className="intro-titanium-glow absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#2dd4bf]/20 via-[#38bdf8]/10 to-transparent blur-[65px] opacity-20 pointer-events-none" />

        {/* Precision Titanium AS Monogram SVG */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 mb-5">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(45,212,191,0.2)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="titaniumMetal" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#94A3B8" />
                <stop offset="65%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>

              <linearGradient id="cyanLaser" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Outer Circular Optical Ring */}
            <circle
              ref={circleFrameRef}
              cx="100"
              cy="100"
              r="88"
              stroke="url(#cyanLaser)"
              strokeWidth="1.25"
              strokeDasharray="6 4"
            />

            {/* Inner Ring */}
            <circle
              cx="100"
              cy="100"
              r="78"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.75"
            />

            {/* Letter 'A' Left Strut */}
            <path
              ref={pathALeftRef}
              d="M 60 148 L 94 56"
              stroke="url(#titaniumMetal)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Letter 'A' Right Strut */}
            <path
              ref={pathARightRef}
              d="M 94 56 L 128 148"
              stroke="url(#titaniumMetal)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Letter 'A' Crossbar */}
            <path
              ref={pathACrossRef}
              d="M 72 116 L 116 116"
              stroke="url(#cyanLaser)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Letter 'S' Sweeping Curves */}
            <path
              ref={pathSRef}
              d="M 148 76 C 148 60 134 54 116 54 C 98 54 90 66 90 80 C 90 102 148 100 148 126 C 148 144 132 152 112 152 C 92 152 84 140 84 126"
              stroke="url(#titaniumMetal)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Revealed Name Characters */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden py-1">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="intro-text-char inline-block font-display-hero text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-widest uppercase opacity-0 translate-y-6"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p className="intro-sub-text font-label-mono-sm text-xs sm:text-sm uppercase tracking-[0.14em] text-[#2dd4bf] font-medium opacity-0 mt-2 sm:mt-3">
          CREATIVE DEVELOPER • AI &amp; MACHINE LEARNING
        </p>

        {/* Clean Progress Pill */}
        <div className="mt-6 sm:mt-8 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-ping" />
          <span className="font-label-mono-sm text-[10px] sm:text-[11px] text-white/70 tracking-widest uppercase">
            {phaseText}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-label-mono-sm text-[10px] sm:text-[11px] text-white/90 font-semibold">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Top Header Strip: Clean Branding & Skip Button */}
      <div
        ref={headerRef}
        className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="font-label-mono-sm text-xs font-semibold uppercase tracking-widest text-white/80">
            AYUSH SINGH
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="font-label-mono-sm text-[11px] text-white/40 hidden sm:inline">
            PORTFOLIO 2026
          </span>
        </div>

        {/* Skip button with accessible touch target */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/70 hover:text-white hover:bg-white/[0.12] transition-all font-label-mono-sm text-[11px] uppercase tracking-wider cursor-pointer active:scale-95"
          title="Skip intro animation"
        >
          <span>Skip Intro</span>
          <span className="text-white/40 group-hover:text-white text-[10px]">[ESC]</span>
        </button>
      </div>
    </div>
  );
};
