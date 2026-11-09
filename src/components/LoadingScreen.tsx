import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface CursorBeacon {
  id: string;
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  status: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentCenterRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // SVG Line Refs for stroke animation
  const pathALeftRef = useRef<SVGPathElement>(null);
  const pathARightRef = useRef<SVGPathElement>(null);
  const pathACrossRef = useRef<SVGPathElement>(null);
  const pathSRef = useRef<SVGPathElement>(null);
  const circleFrameRef = useRef<SVGCircleElement>(null);

  const [phaseText, setPhaseText] = useState('INITIALIZING SPATIAL MATRIX');
  const [coordsText, setCoordsText] = useState('X: 000.0  Y: 000.0');
  const [progressPercent, setProgressPercent] = useState(0);

  const isCompletedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Multi-cursor points setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // 4 autonomous creative digital construction beacons
    const beacons: CursorBeacon[] = [
      {
        id: 'ALPHA',
        label: 'BEACON // α [VECTOR]',
        x: centerX - 320,
        y: centerY - 220,
        targetX: centerX - 45,
        targetY: centerY - 50,
        speed: 0.045,
        color: '#2dd4bf', // Cyan
        trail: [],
        status: 'TRACING A-STRUT',
      },
      {
        id: 'BETA',
        label: 'BEACON // β [APEX]',
        x: centerX + 320,
        y: centerY - 200,
        targetX: centerX,
        targetY: centerY - 95,
        speed: 0.04,
        color: '#38bdf8', // Sky Blue
        trail: [],
        status: 'CONVERGING APEX',
      },
      {
        id: 'GAMMA',
        label: 'BEACON // γ [SURFACE]',
        x: centerX + 280,
        y: centerY + 240,
        targetX: centerX + 45,
        targetY: centerY + 45,
        speed: 0.05,
        color: '#e2e8f0', // Titanium White
        trail: [],
        status: 'MILLING S-CHAMFER',
      },
      {
        id: 'DELTA',
        label: 'BEACON // δ [RETICLE]',
        x: centerX - 260,
        y: centerY + 210,
        targetX: centerX - 12,
        targetY: centerY + 18,
        speed: 0.035,
        color: '#94a3b8', // Titanium Slate
        trail: [],
        status: 'CALIBRATING AXIS',
      },
    ];

    let t = 0;

    // Render loop for multi-cursor construction beacons
    const renderBeacons = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic coordinate readout on state
      if (Math.random() < 0.2 && beacons[0]) {
        setCoordsText(
          `X: ${(beacons[0].x).toFixed(1)}  Y: ${(beacons[0].y).toFixed(1)}  Z: ${(
            Math.sin(t) * 12 + 100
          ).toFixed(1)}`
        );
      }

      // 1. Draw dynamic connecting construction lasers between adjacent beacons
      for (let i = 0; i < beacons.length; i++) {
        for (let j = i + 1; j < beacons.length; j++) {
          const b1 = beacons[i];
          const b2 = beacons[j];
          const dist = Math.hypot(b2.x - b1.x, b2.y - b1.y);

          if (dist < 420) {
            const alpha = (1 - dist / 420) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.setLineDash([4, 6]);
            ctx.moveTo(b1.x, b1.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 2. Update and render each autonomous cursor point
      beacons.forEach((beacon, index) => {
        // Orbit and target trajectory calculations
        const orbitOffset = Math.sin(t * 1.5 + index * 1.5) * 18;
        const orbitOffsetY = Math.cos(t * 1.2 + index * 1.2) * 16;

        beacon.x += (beacon.targetX + orbitOffset - beacon.x) * beacon.speed;
        beacon.y += (beacon.targetY + orbitOffsetY - beacon.y) * beacon.speed;

        // Push trail history
        beacon.trail.push({ x: beacon.x, y: beacon.y, alpha: 0.7 });
        if (beacon.trail.length > 28) beacon.trail.shift();

        // Render kinetic particle trail
        ctx.beginPath();
        for (let i = 0; i < beacon.trail.length - 1; i++) {
          const p1 = beacon.trail[i];
          const p2 = beacon.trail[i + 1];
          p1.alpha *= 0.94; // fade over time

          ctx.strokeStyle = `rgba(226, 232, 240, ${p1.alpha * 0.35})`;
          ctx.lineWidth = (i / beacon.trail.length) * 1.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Render Beacon Head (Precision Reticle)
        const bx = beacon.x;
        const by = beacon.y;

        // Outer rotating dashed reticle ring
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(t * 0.75 * (index % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI * 2);
        ctx.strokeStyle = beacon.color;
        ctx.lineWidth = 0.75;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.restore();

        // Center pinpoint
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = beacon.color;
        ctx.shadowColor = beacon.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Precision crosshair ticks
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
        ctx.lineWidth = 0.75;
        // Horizontal ticks
        ctx.moveTo(bx - 17, by);
        ctx.lineTo(bx - 13, by);
        ctx.moveTo(bx + 13, by);
        ctx.lineTo(bx + 17, by);
        // Vertical ticks
        ctx.moveTo(bx, by - 17);
        ctx.lineTo(bx, by - 13);
        ctx.moveTo(bx, by + 13);
        ctx.lineTo(bx, by + 17);
        ctx.stroke();

        // Cursor telemetry label box (floating beside reticle)
        ctx.font = '9px "Space Grotesk", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fillText(beacon.label, bx + 16, by - 8);
        ctx.font = '8px "Space Grotesk", monospace';
        ctx.fillStyle = beacon.color;
        ctx.fillText(
          `[${Math.round(bx)}, ${Math.round(by)}] • ${beacon.status}`,
          bx + 16,
          by + 4
        );
      });

      if (!isCompletedRef.current) {
        animationFrameId = requestAnimationFrame(renderBeacons);
      }
    };

    animationFrameId = requestAnimationFrame(renderBeacons);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Choreographed Master Timeline
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        handleFinish();
      },
    });
    timelineRef.current = tl;

    // Helper for stroke setup
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

    // Initial state
    gsap.set(gridOverlayRef.current, { opacity: 0 });
    gsap.set(contentCenterRef.current, { opacity: 0, scale: 0.94 });
    gsap.set(telemetryRef.current, { opacity: 0 });

    // Progress counter simulation
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgressPercent(Math.round(progressObj.value));
        },
      },
      0
    );

    // Phase 1: Spatial Grid Activation (0.0s - 0.7s)
    tl.to(
      gridOverlayRef.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.1
    );

    tl.to(
      telemetryRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.out',
      },
      0.2
    );

    // Phase 2: Logo Vector Lines Assembly (0.6s - 1.8s)
    tl.to(
      contentCenterRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        onStart: () => setPhaseText('ASSEMBLING TITANIUM MONOGRAM'),
      },
      0.5
    );

    // Animate SVG paths drawing with strokeDashoffset
    const animateDraw = (
      el: SVGPathElement | SVGCircleElement | null,
      duration: number,
      position: number
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
        position
      );
    };

    animateDraw(circleFrameRef.current, 1.4, 0.6);
    animateDraw(pathALeftRef.current, 0.9, 0.8);
    animateDraw(pathARightRef.current, 0.9, 1.0);
    animateDraw(pathACrossRef.current, 0.6, 1.3);
    animateDraw(pathSRef.current, 1.1, 1.1);

    // Phase 3: Specular Metallic Bloom & Typography Reveal (1.7s - 2.5s)
    tl.call(() => setPhaseText('SYSTEM SYNTHESIS COMPLETE // AYUSH SINGH'), [], 1.8);

    tl.to(
      '.intro-text-char',
      {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.7,
        ease: 'power3.out',
      },
      1.7
    );

    tl.to(
      '.intro-sub-text',
      {
        opacity: 1,
        letterSpacing: '0.28em',
        duration: 0.8,
        ease: 'power2.out',
      },
      1.9
    );

    tl.to(
      '.intro-titanium-glow',
      {
        opacity: 0.85,
        scale: 1.15,
        duration: 0.7,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
      2.0
    );

    // Phase 4: Cinematic Aperture Curtain Unveil (2.6s - 3.4s)
    tl.call(() => setPhaseText('SYSTEM ONLINE • INITIATING VIEWPORT'), [], 2.5);

    tl.to(
      contentCenterRef.current,
      {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        duration: 0.6,
        ease: 'power3.in',
      },
      2.7
    );

    tl.to(
      canvasRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      },
      2.8
    );

    tl.to(
      topCurtainRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      },
      2.9
    );

    tl.to(
      bottomCurtainRef.current,
      {
        yPercent: 100,
        duration: 0.9,
        ease: 'power4.inOut',
      },
      2.9
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'none',
      },
      3.6
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
      // Fast forward exit animation
      gsap.to([topCurtainRef.current], {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
      });
      gsap.to([bottomCurtainRef.current], {
        yPercent: 100,
        duration: 0.6,
        ease: 'power4.inOut',
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
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
      aria-label="Loading interactive experience"
    >
      {/* Dual Architectural Shutters (curtains that part on completion) */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#070709] border-b border-white/[0.08] z-30"
      />
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#070709] border-t border-white/[0.08] z-30"
      />

      {/* Autonomous Multi-Cursor Points & Kinetic Trails Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Grid Formation Layer (Subtle architectural lines & corner crosshairs) */}
      <div
        ref={gridOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity"
      >
        {/* Subtle Horizontal & Vertical Axis Hairlines */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent -translate-x-1/2" />

        {/* 4 Corner Registration Marks */}
        <div className="absolute top-8 left-8 text-white/30 font-label-mono-sm text-[10px] flex items-center gap-2">
          <span className="text-[#2dd4bf]">+</span>
          <span>SYS.CALIB // 01</span>
        </div>
        <div className="absolute top-8 right-8 text-white/30 font-label-mono-sm text-[10px] flex items-center gap-2">
          <span>SRM IST • AI/ML</span>
          <span className="text-[#2dd4bf]">+</span>
        </div>
        <div className="absolute bottom-8 left-8 text-white/30 font-label-mono-sm text-[10px] flex items-center gap-2">
          <span className="text-[#2dd4bf]">+</span>
          <span>LAT: 13.0827° N • LON: 80.2707° E</span>
        </div>
        <div className="absolute bottom-8 right-8 text-white/30 font-label-mono-sm text-[10px] flex items-center gap-2">
          <span>PORTFOLIO KINEMATICS</span>
          <span className="text-[#2dd4bf]">+</span>
        </div>
      </div>

      {/* Center Stage: Titanium Logo, Assembled Vector Lines & Typography */}
      <div
        ref={contentCenterRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4"
      >
        {/* Ambient Specular Halo behind logo */}
        <div className="intro-titanium-glow absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#2dd4bf]/20 via-[#38bdf8]/10 to-transparent blur-[70px] opacity-20 pointer-events-none" />

        {/* Precision Titanium AS Monogram SVG */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-6">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(45,212,191,0.2)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Titanium Specular Gradient */}
              <linearGradient id="titaniumMetal" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#94A3B8" />
                <stop offset="65%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>

              {/* Cyan Energy Accent Gradient */}
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

            {/* Inner Precision Ticks */}
            <circle
              cx="100"
              cy="100"
              r="78"
              stroke="rgba(255,255,255,0.12)"
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

            {/* Letter 'A' Geometric Crossbar */}
            <path
              ref={pathACrossRef}
              d="M 72 116 L 116 116"
              stroke="url(#cyanLaser)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Letter 'S' Precision Sweeping Curves */}
            <path
              ref={pathSRef}
              d="M 148 76 C 148 60 134 54 116 54 C 98 54 90 66 90 80 C 90 102 148 100 148 126 C 148 144 132 152 112 152 C 92 152 84 140 84 126"
              stroke="url(#titaniumMetal)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Revealed Logotype Name with Character Reveal */}
        <div className="flex items-center gap-2 overflow-hidden py-1">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="intro-text-char inline-block font-display-hero text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-widest uppercase opacity-0 translate-y-6"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Engineering Specialization Subtitle */}
        <p className="intro-sub-text font-label-mono-sm text-xs sm:text-sm uppercase tracking-[0.15em] text-[#2dd4bf] font-medium opacity-0 mt-3">
          CREATIVE DEVELOPER • AI &amp; MACHINE LEARNING
        </p>

        {/* Digital Construction Status */}
        <div className="mt-8 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
          <span className="font-label-mono-sm text-[11px] text-white/70 tracking-widest uppercase">
            {phaseText}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-label-mono-sm text-[11px] text-white/90 font-semibold">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Floating Telemetry & Skip Button Header */}
      <div
        ref={telemetryRef}
        className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 font-label-mono-sm text-[10px] text-white/70 uppercase tracking-widest">
            PROLOGUE SEQUENCE
          </span>
          <span className="font-label-mono-sm text-[10px] text-white/40 hidden sm:inline">
            {coordsText}
          </span>
        </div>

        {/* Skip button for seamless skip experience */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.14] text-white/70 hover:text-white hover:bg-white/[0.12] transition-all font-label-mono-sm text-[11px] uppercase tracking-wider cursor-pointer"
          title="Skip intro animation"
        >
          <span>Skip Intro</span>
          <span className="text-white/40 group-hover:text-white text-[10px]">[ESC]</span>
        </button>
      </div>
    </div>
  );
};
