import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AIIntroSequenceProps {
  onComplete: () => void;
}

// Authentic Figma Cursor Shapes from Swarm Rebuild
const ARROW_D =
  'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z';

export const AIIntroSequence: React.FC<AIIntroSequenceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const agentsLayerRef = useRef<HTMLDivElement>(null);
  const isFinishedRef = useRef(false);
  const handleSkipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 1. Measure real DOM elements from the live homepage layout
    const navEl = document.querySelector('[data-intro="nav"]') as HTMLElement | null;
    const logoEl = document.querySelector('[data-intro="logo"]') as HTMLElement | null;
    const titleEl = document.querySelector('[data-intro="hero-title"]') as HTMLElement | null;
    const subEl = document.querySelector('[data-intro="hero-subtitle"]') as HTMLElement | null;
    const bioEl = document.querySelector('[data-intro="hero-bio"]') as HTMLElement | null;
    const ctaEl = document.querySelector('[data-intro="hero-cta"]') as HTMLElement | null;
    const visualEl = document.querySelector('[data-intro="hero-visual"]') as HTMLElement | null;
    const statusEl = document.querySelector('[data-intro="hero-status"]') as HTMLElement | null;
    const telemetryEl = document.querySelector('[data-intro="hero-telemetry"]') as HTMLElement | null;

    const getRect = (el: HTMLElement | null, fallback: { x: number; y: number; w: number; h: number }) => {
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { x: r.left, y: r.top, w: r.width, h: r.height };
        }
      }
      return fallback;
    };

    const navRect = getRect(navEl, { x: vw * 0.05, y: 16, w: Math.min(vw * 0.9, 1280), h: 64 });
    const logoRect = getRect(logoEl, { x: navRect.x + 20, y: navRect.y + 12, w: 180, h: 40 });
    const titleRect = getRect(titleEl, { x: 48, y: Math.max(160, vh * 0.32), w: Math.min(vw - 96, 740), h: 96 });
    const subRect = getRect(subEl, { x: 48, y: titleRect.y + titleRect.h + 20, w: Math.min(vw - 96, 580), h: 32 });
    const bioRect = getRect(bioEl, { x: 48, y: subRect.y + subRect.h + 16, w: Math.min(vw - 96, 680), h: 56 });
    const ctaRect = getRect(ctaEl, { x: 48, y: bioRect.y + bioRect.h + 24, w: 320, h: 48 });
    const visualRect = getRect(visualEl, { x: 0, y: 0, w: vw, h: vh });
    const telemetryRect = getRect(telemetryEl, { x: 0, y: vh - 60, w: vw, h: 60 });

    // Initial state: hide real DOM elements while intro prepares and reveals them
    const realElements = [navEl, titleEl, subEl, bioEl, ctaEl, statusEl, telemetryEl].filter(Boolean) as HTMLElement[];
    gsap.set(realElements, { opacity: 0, y: 22 });
    if (visualEl) gsap.set(visualEl, { opacity: 0.1 });

    // Master Timeline for the Visual Story (0 to 6.2 seconds)
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        handleComplete();
      },
    });

    // -------------------------------------------------------------
    // SCENE 1 — DIGITAL CANVAS (0.0s – 1.0s)
    // -------------------------------------------------------------
    tl.to(centerTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
    });

    // -------------------------------------------------------------
    // SCENE 2 — AI DESIGN AGENTS ARRIVE (1.0s – 2.8s)
    // -------------------------------------------------------------
    tl.to(
      centerTextRef.current,
      {
        opacity: 0,
        y: -14,
        duration: 0.4,
        ease: 'power2.in',
      },
      '+=0.4'
    );

    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'AI DESIGN TEAM CONNECTED // ANALYZING HOMEPAGE LAYOUT';
      }
    });

    // 5 Autonomous AI Design Agents fly into position
    // Agent 1: Linus (Layout Lead) -> Logo & Navbar
    tl.fromTo(
      '#agent-linus',
      { x: -100, y: navRect.y - 20, opacity: 0, scale: 0.7 },
      { x: logoRect.x + 30, y: logoRect.y + 12, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
      '<=0.05'
    );

    // Agent 2: Ada (Typography Spec) -> Hero Title
    tl.fromTo(
      '#agent-ada',
      { x: vw + 120, y: titleRect.y - 80, opacity: 0, scale: 0.7 },
      { x: titleRect.x + 40, y: titleRect.y + 24, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      '<=0.08'
    );

    // Agent 3: Alan (Interactive Components) -> Buttons
    tl.fromTo(
      '#agent-alan',
      { x: -80, y: vh + 100, opacity: 0, scale: 0.7 },
      { x: ctaRect.x + 40, y: ctaRect.y + 20, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
      '<=0.08'
    );

    // Agent 4: Ken (3D Visuals & Shaders) -> Visual Area
    tl.fromTo(
      '#agent-ken',
      { x: vw + 100, y: vh * 0.45, opacity: 0, scale: 0.7 },
      { x: Math.min(vw - 220, titleRect.x + titleRect.w + 60), y: titleRect.y + 40, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      '<=0.08'
    );

    // Agent 5: Grace (Grid & Hierarchy) -> Subtitle & Bio
    tl.fromTo(
      '#agent-grace',
      { x: -80, y: subRect.y + 80, opacity: 0, scale: 0.7 },
      { x: subRect.x + 35, y: subRect.y + 10, opacity: 1, scale: 1, duration: 1.15, ease: 'power3.out' },
      '<=0.08'
    );

    // -------------------------------------------------------------
    // SCENE 3 — DESIGN PROCESS & REAL HOMEPAGE ASSEMBLY (2.8s – 5.5s)
    // -------------------------------------------------------------

    // Step 3A: Linus selects Logo and Navbar
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'LINUS: VERIFYING LOGO MONOGRAM & CHROMIUM NAVBAR';
      }
    });

    // Morph Linus to crosshair and click
    tl.to('#linus-arrow', { opacity: 0, duration: 0.1 }, '+=0.1');
    tl.to('#linus-cross', { opacity: 1, duration: 0.1 }, '<');
    tl.to('#agent-linus', { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 });

    // Navbar & Logo Selection Box appears
    tl.to('#box-nav', { opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }, '<=0.04');
    tl.to('#box-logo', { opacity: 1, duration: 0.3, ease: 'back.out(1.3)' }, '<=0.06');

    // Real Navbar and Status slide in
    if (navEl) {
      tl.to(navEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<=0.05');
    }
    if (statusEl) {
      tl.to(statusEl, { opacity: 1, y: 0, duration: 0.4 }, '<=0.05');
    }

    // Step 3B: Ada selects, scans, and reveals Hero Heading
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'ADA: SCANNING HERO TITLE // TYPOGRAPHY VERIFIED';
      }
    });

    // Morph Ada to I-beam
    tl.to('#ada-arrow', { opacity: 0, duration: 0.1 }, '+=0.1');
    tl.to('#ada-ibeam', { opacity: 1, duration: 0.1 }, '<');
    tl.to('#agent-ada', { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 });

    // Title selection box snaps into place
    tl.to('#box-title', { opacity: 1, duration: 0.35, ease: 'back.out(1.2)' }, '<=0.04');

    // Animate scanline across the title box
    tl.fromTo(
      '#scanline-title',
      { x: 0, opacity: 1 },
      { x: titleRect.w + 12, opacity: 0.2, duration: 0.65, ease: 'power1.inOut' },
      '<=0.05'
    );

    // Smart distance guides show spacing to Navbar and margin
    tl.to('#guide-title-y, #guide-title-x', { opacity: 1, duration: 0.3 }, '<=0.05');

    // Real title slides into final position
    if (titleEl) {
      tl.to(
        titleEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '<=0.08'
      );
    }

    // Step 3C: Grace checks Subtitle, Bio, and Hierarchy
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'GRACE: ALIGNING SUBTITLE & BIO SPECIFICATIONS';
      }
    });

    tl.to('#grace-arrow', { opacity: 0, duration: 0.1 }, '+=0.05');
    tl.to('#grace-ibeam', { opacity: 1, duration: 0.1 }, '<');
    tl.to('#agent-grace', { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 });

    tl.to('#box-subtitle', { opacity: 1, duration: 0.35 }, '<=0.04');

    if (subEl) tl.to(subEl, { opacity: 1, y: 0, duration: 0.45 }, '<=0.04');
    if (bioEl) tl.to(bioEl, { opacity: 1, y: 0, duration: 0.45 }, '<=0.08');

    // Step 3D: Alan activates CTA Buttons Autolayout
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'ALAN: AUTOLAYOUT VERIFIED // BUTTONS ACTIVE';
      }
    });

    tl.to('#alan-arrow', { opacity: 0, duration: 0.1 }, '+=0.05');
    tl.to('#alan-cross', { opacity: 1, duration: 0.1 }, '<');
    tl.to('#agent-alan', { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 });

    tl.to('#box-cta', { opacity: 1, duration: 0.3 }, '<=0.04');

    if (ctaEl) {
      tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<=0.04');
    }

    // Step 3E: Ken scans 3D Shader Visual Area & Telemetry Ribbon
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'KEN: 3D SHADER CANVAS SCANNED // EFFECTS ACTIVE';
      }
    });

    tl.to('#box-visual', { opacity: 0.8, duration: 0.35 }, '<=0.1');

    if (visualEl) {
      tl.to(visualEl, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '<=0.05');
    }

    tl.to('#box-telemetry', { opacity: 0.8, duration: 0.3 }, '<=0.1');

    if (telemetryEl) {
      tl.to(telemetryEl, { opacity: 1, y: 0, duration: 0.4 }, '<=0.05');
    }

    // -------------------------------------------------------------
    // SCENE 4 — FINAL MOMENT: GATHER, DISSOLVE, HANDOVER (5.5s – 6.2s)
    // -------------------------------------------------------------
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'DESIGN VERIFIED // HANDING OVER CONTROL';
      }
    });

    // Agents gather slightly inward
    tl.to('#agent-linus', { x: '+=30', y: '+=15', duration: 0.3, ease: 'power2.inOut' }, '+=0.2');
    tl.to('#agent-ada', { x: '-=25', y: '+=20', duration: 0.3, ease: 'power2.inOut' }, '<');
    tl.to('#agent-alan', { x: '+=20', y: '-=15', duration: 0.3, ease: 'power2.inOut' }, '<');
    tl.to('#agent-ken', { x: '-=30', y: '-=20', duration: 0.3, ease: 'power2.inOut' }, '<');
    tl.to('#agent-grace', { x: '+=15', y: '+=10', duration: 0.3, ease: 'power2.inOut' }, '<');

    // Selection UI dissolves
    tl.to(
      svgOverlayRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      },
      '+=0.1'
    );

    // AI Agents smoothly fly outward offscreen
    tl.to(
      '#agent-linus',
      { x: -150, y: -80, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
      '<=0.05'
    );
    tl.to(
      '#agent-ada',
      { x: vw + 150, y: titleRect.y - 120, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
      '<=0.02'
    );
    tl.to(
      '#agent-grace',
      { x: -140, y: vh + 100, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
      '<=0.02'
    );
    tl.to(
      '#agent-alan',
      { x: ctaRect.x - 80, y: vh + 120, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
      '<=0.02'
    );
    tl.to(
      '#agent-ken',
      { x: vw + 140, y: vh * 0.6, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
      '<=0.02'
    );

    // Fade out main digital canvas overlay
    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
      },
      '<=0.1'
    );

    const handleComplete = () => {
      if (isFinishedRef.current) return;
      isFinishedRef.current = true;
      tl.kill();

      // Ensure all real elements are 100% visible and unconstrained
      gsap.set(realElements, { opacity: 1, y: 0, clearProps: 'all' });
      if (visualEl) gsap.set(visualEl, { opacity: 1, clearProps: 'all' });

      gsap.to(container, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          onComplete();
        },
      });
    };

    handleSkipRef.current = handleComplete;

    // Fast-forward skip handling on [ESC]
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Pre-calculated layout positions matching real DOM elements
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  const navW = Math.min(vw * 0.9, 1280);
  const navX = (vw - navW) / 2;
  const titleX = 48;
  const titleY = Math.max(160, vh * 0.32);
  const titleW = Math.min(vw - 96, 740);
  const titleH = 96;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999999] w-screen h-screen overflow-hidden bg-[#050505] select-none pointer-events-auto"
      style={{ willChange: 'opacity' }}
      aria-label="Cinematic AI Design Intro Sequence"
    >
      {/* Figma / CAD Canvas Dot Grid (32px Pitch) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 4 Corner Viewport Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/30 pointer-events-none">
        + [0, 0]
      </div>
      <div className="absolute top-4 right-4 font-mono text-[9px] text-white/30 pointer-events-none">
        [100vw, 0] +
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30 pointer-events-none">
        + [0, 100vh]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/30 pointer-events-none">
        [100vw, 100vh] +
      </div>

      {/* Center Stage Initial Monospace Interface (Scene 1) */}
      <div
        ref={centerTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F24E1E] animate-ping" />
          <h2 className="font-label-mono-md text-sm sm:text-base font-bold text-white tracking-[0.25em] uppercase">
            DIGITAL CANVAS INITIALIZING
          </h2>
        </div>

        <p className="mt-2 font-label-mono-sm text-[11px] text-white/50 tracking-[0.2em] uppercase">
          CONNECTING MULTIPLAYER AI DESIGN TEAM...
        </p>

        <div className="mt-4 flex items-center gap-3 text-[10px] font-label-mono-sm text-white/30 uppercase tracking-widest">
          <span>AI AGENTS: 5 ONLINE</span>
          <span>•</span>
          <span>FIGMA ENGINE: V4</span>
          <span>•</span>
          <span>COLOR: DISPLAY P3</span>
        </div>
      </div>

      {/* Real-time SVG Selection Overlays & Figma Dimension Guides */}
      <svg
        ref={svgOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Navbar Selection Box (Linus) */}
        <g id="box-nav" className="opacity-0 transition-opacity">
          <rect
            x={navX - 4}
            y={12}
            width={navW + 8}
            height={72}
            rx="36"
            fill="rgba(242, 78, 30, 0.03)"
            stroke="#F24E1E"
            strokeWidth="1.2"
          />
          <g transform={`translate(${navX + 16}, -2)`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="180" height="18" rx="3" fill="#F24E1E" />
            <text x="8" y="12" fill="#FFFFFF" fontSize="9.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              NAVBAR_PILL [{Math.round(navW)} × 64]
            </text>
          </g>
        </g>

        {/* 2. Logo Monogram Selection Box */}
        <g id="box-logo" className="opacity-0 transition-opacity">
          <rect
            x={navX + 16}
            y={24}
            width={180}
            height={48}
            rx="8"
            fill="none"
            stroke="#0D99FF"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <g transform={`translate(${navX + 16}, 10)`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="145" height="16" rx="3" fill="#0D99FF" />
            <text x="6" y="11" fill="#FFFFFF" fontSize="8.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              LOGO // AS MONOGRAM
            </text>
          </g>
        </g>

        {/* 3. Hero Title Selection Box (Ada) */}
        <g id="box-title" className="opacity-0 transition-opacity">
          <rect
            x={titleX - 6}
            y={titleY - 6}
            width={titleW + 12}
            height={titleH + 12}
            fill="rgba(13, 153, 255, 0.04)"
            stroke="#0D99FF"
            strokeWidth="1.2"
          />
          {/* 4 Corner Handles */}
          <rect x={titleX - 9.5} y={titleY - 9.5} width="7" height="7" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" />
          <rect x={titleX + titleW + 2.5} y={titleY - 9.5} width="7" height="7" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" />
          <rect x={titleX + titleW + 2.5} y={titleY + titleH + 2.5} width="7" height="7" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" />
          <rect x={titleX - 9.5} y={titleY + titleH + 2.5} width="7" height="7" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" />

          {/* Heading Tag Label Badge */}
          <g transform={`translate(${titleX - 6}, ${titleY - 26})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="220" height="20" rx="3" fill="#0D99FF" />
            <text x="8" y="14" fill="#FFFFFF" fontSize="9.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              TEXT_LAYER_01 // HERO_TITLE
            </text>
          </g>

          {/* Sub-badge: Typography verified */}
          <g transform={`translate(${titleX + 225}, ${titleY - 26})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="165" height="20" rx="3" fill="#0E0E14" stroke="#0D99FF" strokeWidth="0.8" />
            <text x="8" y="14" fill="#0D99FF" fontSize="8.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              TYPOGRAPHY: CINZEL / BOLD
            </text>
          </g>

          {/* Title Laser Scanline */}
          <line
            id="scanline-title"
            x1={titleX - 6}
            y1={titleY - 6}
            x2={titleX - 6}
            y2={titleY + titleH + 6}
            stroke="#0D99FF"
            strokeWidth="2"
          />

          {/* Live Dimension Chip at Bottom-Right */}
          <g transform={`translate(${titleX + titleW - 85}, ${titleY + titleH + 8})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="90" height="18" rx="3" fill="#0E0E14" stroke="#0D99FF" strokeWidth="0.8" />
            <text x="8" y="12" fill="#0D99FF" fontSize="9" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              {Math.round(titleW)} × {titleH} px
            </text>
          </g>
        </g>

        {/* 4. Subtitle & Hierarchy Selection Box (Grace) */}
        <g id="box-subtitle" className="opacity-0 transition-opacity">
          <rect
            x={titleX - 4}
            y={titleY + titleH + 16}
            width={Math.min(vw - 96, 590)}
            height={36}
            fill="rgba(162, 89, 255, 0.04)"
            stroke="#A259FF"
            strokeWidth="1"
          />
          <g transform={`translate(${titleX - 4}, ${titleY + titleH - 4})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="180" height="18" rx="3" fill="#A259FF" />
            <text x="8" y="12" fill="#FFFFFF" fontSize="9" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              ALIGNMENT // SPEC_SUBTITLE
            </text>
          </g>
        </g>

        {/* 5. CTA Buttons Autolayout Selection Box (Alan) */}
        <g id="box-cta" className="opacity-0 transition-opacity">
          <rect
            x={titleX - 4}
            y={titleY + titleH + 120}
            width={340}
            height={56}
            rx="28"
            fill="rgba(20, 174, 92, 0.04)"
            stroke="#14AE5C"
            strokeWidth="1.2"
          />
          <g transform={`translate(${titleX - 4}, ${titleY + titleH + 102})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="220" height="18" rx="3" fill="#14AE5C" />
            <text x="8" y="12" fill="#FFFFFF" fontSize="9" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              AUTOLAYOUT // CTA [GAP: 16px]
            </text>
          </g>
        </g>

        {/* 6. 3D Visual Shader Canvas Frame (Ken) */}
        <g id="box-visual" className="opacity-0 transition-opacity">
          <rect
            x={8}
            y={8}
            width={vw - 16}
            height={vh - 16}
            fill="none"
            stroke="#FFC700"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <g transform="translate(16, 20)" filter="url(#f-shadow)">
            <rect x="0" y="0" width="230" height="18" rx="3" fill="#FFC700" />
            <text x="8" y="12" fill="#000000" fontSize="9" fontFamily="'Space Grotesk', monospace" fontWeight="700">
              FRAME // 3D_NEURAL_CANVAS [100vw × 100vh]
            </text>
          </g>
        </g>

        {/* 7. Bottom Architectural Telemetry Ribbon */}
        <g id="box-telemetry" className="opacity-0 transition-opacity">
          <line x1={0} y1={vh - 60} x2={vw} y2={vh - 60} stroke="#94A3B8" strokeWidth="1" />
          <g transform={`translate(16, ${vh - 80})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="160" height="18" rx="3" fill="#0E0E14" stroke="#94A3B8" strokeWidth="0.8" />
            <text x="8" y="12" fill="#94A3B8" fontSize="8.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              RIBBON // HARDWARE_SPECS
            </text>
          </g>
        </g>

        {/* Dynamic Distance Ruler Guides (Figma Smart Guides) */}
        <g id="guide-title-y" className="opacity-0 transition-opacity">
          <line
            x1={titleX + 40}
            y1={84}
            x2={titleX + 40}
            y2={titleY - 6}
            stroke="#0D99FF"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line x1={titleX + 35} y1={84} x2={titleX + 45} y2={84} stroke="#0D99FF" strokeWidth="1" />
          <line x1={titleX + 35} y1={titleY - 6} x2={titleX + 45} y2={titleY - 6} stroke="#0D99FF" strokeWidth="1" />
          <g transform={`translate(${titleX + 48}, ${(84 + titleY) / 2 - 8})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="68" height="16" rx="3" fill="#0E0E14" stroke="#0D99FF" strokeWidth="0.8" />
            <text x="6" y="11" fill="#0D99FF" fontSize="8" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              ΔY: {Math.round(titleY - 84)}px
            </text>
          </g>
        </g>

        <g id="guide-title-x" className="opacity-0 transition-opacity">
          <line
            x1={0}
            y1={titleY + 40}
            x2={titleX - 6}
            y2={titleY + 40}
            stroke="#0D99FF"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <g transform={`translate(12, ${titleY + 32})`} filter="url(#f-shadow)">
            <rect x="0" y="0" width="55" height="16" rx="3" fill="#0E0E14" stroke="#0D99FF" strokeWidth="0.8" />
            <text x="6" y="11" fill="#0D99FF" fontSize="8" fontFamily="'Space Grotesk', monospace" fontWeight="600">
              X: {titleX}px
            </text>
          </g>
        </g>
      </svg>

      {/* 5 Autonomous AI Design Agent Cursors Layer */}
      <div ref={agentsLayerRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Agent 1: Linus (Layout Lead, #F24E1E) */}
        <div id="agent-linus" className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0">
          <div className="relative">
            {/* Arrow SVG */}
            <svg id="linus-arrow" width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
              <path d={ARROW_D} fill="#F24E1E" stroke="#050505" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            {/* Crosshair SVG (Morph target) */}
            <svg id="linus-cross" width="22" height="22" viewBox="0 0 24 24" className="absolute top-0 left-0 opacity-0 drop-shadow-lg">
              <g strokeLinecap="round">
                <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#000" strokeWidth="3.2" />
                <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#F24E1E" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/95 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5 text-[#F24E1E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F24E1E]" />
              <span>Linus // Layout Lead</span>
            </div>
          </div>
        </div>

        {/* Agent 2: Ada (Typography Spec, #0D99FF) */}
        <div id="agent-ada" className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0">
          <div className="relative">
            <svg id="ada-arrow" width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
              <path d={ARROW_D} fill="#0D99FF" stroke="#050505" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <svg id="ada-ibeam" width="22" height="22" viewBox="0 0 24 24" className="absolute top-0 left-0 opacity-0 drop-shadow-lg">
              <g fill="none" strokeLinecap="round">
                <path d="M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5" stroke="#000" strokeWidth="3.2" />
                <path d="M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5" stroke="#0D99FF" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/95 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5 text-[#0D99FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D99FF]" />
              <span>Ada // Typography Spec</span>
            </div>
          </div>
        </div>

        {/* Agent 3: Grace (Grid & Hierarchy, #A259FF) */}
        <div id="agent-grace" className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0">
          <div className="relative">
            <svg id="grace-arrow" width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
              <path d={ARROW_D} fill="#A259FF" stroke="#050505" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <svg id="grace-ibeam" width="22" height="22" viewBox="0 0 24 24" className="absolute top-0 left-0 opacity-0 drop-shadow-lg">
              <g fill="none" strokeLinecap="round">
                <path d="M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5" stroke="#000" strokeWidth="3.2" />
                <path d="M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5" stroke="#A259FF" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/95 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5 text-[#A259FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A259FF]" />
              <span>Grace // Grid &amp; Content</span>
            </div>
          </div>
        </div>

        {/* Agent 4: Alan (Components & CTA, #14AE5C) */}
        <div id="agent-alan" className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0">
          <div className="relative">
            <svg id="alan-arrow" width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
              <path d={ARROW_D} fill="#14AE5C" stroke="#050505" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <svg id="alan-cross" width="22" height="22" viewBox="0 0 24 24" className="absolute top-0 left-0 opacity-0 drop-shadow-lg">
              <g strokeLinecap="round">
                <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#000" strokeWidth="3.2" />
                <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#14AE5C" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/95 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5 text-[#14AE5C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14AE5C]" />
              <span>Alan // Interactive Autolayout</span>
            </div>
          </div>
        </div>

        {/* Agent 5: Ken (3D Shader Visuals, #FFC700) */}
        <div id="agent-ken" className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0">
          <div className="relative">
            <svg id="ken-arrow" width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
              <path d={ARROW_D} fill="#FFC700" stroke="#050505" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <div className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/95 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5 text-[#FFC700]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC700]" />
              <span>Ken // 3D Shader Visuals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header: Telemetry & Instant Skip */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 font-label-mono-sm text-[11px] text-white/50 uppercase tracking-widest">
          <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/80">
            AI INTRO SEQUENCE
          </span>
          <span className="hidden sm:inline">•</span>
          <span ref={statusRef} className="hidden sm:inline text-white/60">
            CONNECTING DESIGN SYSTEM...
          </span>
        </div>

        {/* Fast Skip Button */}
        <button
          onClick={() => handleSkipRef.current()}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#F24E1E]/40 hover:bg-white/[0.08] transition-all font-label-mono-sm text-[11px] uppercase tracking-wider text-white/70 hover:text-white cursor-pointer active:scale-95"
          title="Skip Intro Animation"
        >
          <span>Skip Intro</span>
          <span className="text-white/30 group-hover:text-[#F24E1E] text-[10px]">[ESC]</span>
        </button>
      </div>

      {/* Bottom Footer Telemetry Strip */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none font-label-mono-sm text-[10px] text-white/30 uppercase tracking-widest">
        <span>AGENTS: 5 CORES ACTIVE // SWARM PIPELINE</span>
        <span className="hidden sm:inline">ENGINE: REAL DOM BOUNDING RECT // 1:1 RESOLUTION</span>
        <span className="text-[#F24E1E]/80">STATUS: HOMEPAGE ASSEMBLED</span>
      </div>
    </div>
  );
};
