import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface AIDesignArrivalProps {
  onComplete: () => void;
}

interface MeasuredBox {
  id: string;
  tag: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  guideY?: number;
  guideX?: number;
  gapText?: string;
  dimText?: string;
}

interface AgentData {
  id: string;
  name: string;
  role: string;
  color: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  exitX: number;
  exitY: number;
}

export const AIDesignArrival: React.FC<AIDesignArrivalProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const agentsLayerRef = useRef<HTMLDivElement>(null);
  const isFinishedRef = useRef(false);
  const handleSkipRef = useRef<() => void>(() => {});

  const [boxes, setBoxes] = useState<MeasuredBox[]>([]);
  const [agents, setAgents] = useState<AgentData[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Measure real DOM elements from the live homepage layout
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const navEl = document.querySelector('[data-intro="nav"]') as HTMLElement | null;
    const titleEl = document.querySelector('[data-intro="hero-title"]') as HTMLElement | null;
    const subEl = document.querySelector('[data-intro="hero-subtitle"]') as HTMLElement | null;
    const bioEl = document.querySelector('[data-intro="hero-bio"]') as HTMLElement | null;
    const ctaEl = document.querySelector('[data-intro="hero-cta"]') as HTMLElement | null;
    const visualEl = document.querySelector('[data-intro="hero-visual"]') as HTMLElement | null;
    const telemetryEl = document.querySelector('[data-intro="hero-telemetry"]') as HTMLElement | null;
    const statusEl = document.querySelector('[data-intro="hero-status"]') as HTMLElement | null;

    // Get exact bounding boxes (with fallbacks if elements are still rendering)
    const getRect = (el: HTMLElement | null, fallback: { x: number; y: number; w: number; h: number }) => {
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { x: r.left, y: r.top, w: r.width, h: r.height };
        }
      }
      return fallback;
    };

    const navRect = getRect(navEl, { x: vw * 0.05, y: 16, w: vw * 0.9, h: 60 });
    const titleRect = getRect(titleEl, { x: 48, y: vh * 0.35, w: Math.min(vw - 96, 740), h: 96 });
    const subRect = getRect(subEl, { x: 48, y: titleRect.y + titleRect.h + 20, w: Math.min(vw - 96, 580), h: 32 });
    const ctaRect = getRect(ctaEl, { x: 48, y: subRect.y + subRect.h + 50, w: 320, h: 48 });
    const visualRect = getRect(visualEl, { x: 0, y: 0, w: vw, h: vh });
    const telemetryRect = getRect(telemetryEl, { x: 0, y: vh - 60, w: vw, h: 60 });

    // Prepare Measured Boxes with authentic Figma selection parameters
    const measuredBoxes: MeasuredBox[] = [
      {
        id: 'box-nav',
        tag: 'NAV_MODULE',
        label: `NAVBAR // CHROMIUM_PILL (${Math.round(navRect.w)} × ${Math.round(navRect.h)})`,
        x: navRect.x - 4,
        y: navRect.y - 4,
        w: navRect.w + 8,
        h: navRect.h + 8,
        color: '#E2E8F0',
        dimText: `${Math.round(navRect.w)} × ${Math.round(navRect.h)} px`,
        guideY: navRect.y,
      },
      {
        id: 'box-visual',
        tag: 'VISUAL_FRAME',
        label: `FRAME // WEBGL_NEURAL_CANVAS (${Math.round(vw)} × ${Math.round(vh)})`,
        x: 8,
        y: 8,
        w: vw - 16,
        h: vh - 16,
        color: '#38bdf8',
        dimText: '100vw × 100vh',
      },
      {
        id: 'box-title',
        tag: 'HERO_TITLE',
        label: `H1 // HERO_TITLE (${Math.round(titleRect.w)} × ${Math.round(titleRect.h)})`,
        x: titleRect.x - 6,
        y: titleRect.y - 6,
        w: titleRect.w + 12,
        h: titleRect.h + 12,
        color: '#ff5a1f',
        dimText: `${Math.round(titleRect.w)} × ${Math.round(titleRect.h)} px`,
        guideY: Math.round(titleRect.y - (navRect.y + navRect.h)),
        guideX: Math.round(titleRect.x),
        gapText: `ΔY: ${Math.round(titleRect.y - (navRect.y + navRect.h))}px`,
      },
      {
        id: 'box-subtitle',
        tag: 'SUBTITLE',
        label: `SPEC // ROLES_DISCIPLINE (${Math.round(subRect.w)} × ${Math.round(subRect.h)})`,
        x: subRect.x - 4,
        y: subRect.y - 4,
        w: subRect.w + 8,
        h: subRect.h + 8,
        color: '#E2E8F0',
        dimText: `${Math.round(subRect.w)} × ${Math.round(subRect.h)} px`,
        gapText: `GAP: ${Math.round(subRect.y - (titleRect.y + titleRect.h))}px`,
      },
      {
        id: 'box-cta',
        tag: 'CTA_CLUSTER',
        label: `AUTOLAYOUT // CTA_ACTIONS (${Math.round(ctaRect.w)} × ${Math.round(ctaRect.h)})`,
        x: ctaRect.x - 4,
        y: ctaRect.y - 4,
        w: ctaRect.w + 8,
        h: ctaRect.h + 8,
        color: '#ff5a1f',
        dimText: `${Math.round(ctaRect.w)} × ${Math.round(ctaRect.h)} px`,
        gapText: 'SPACING: 16px',
      },
      {
        id: 'box-telemetry',
        tag: 'TELEMETRY',
        label: `RIBBON // SPECIFICATIONS (${Math.round(telemetryRect.w)} × ${Math.round(telemetryRect.h)})`,
        x: 0,
        y: telemetryRect.y,
        w: telemetryRect.w,
        h: telemetryRect.h,
        color: '#94A3B8',
        dimText: 'FULL BLEED // 4 COLS',
      },
    ];

    setBoxes(measuredBoxes);

    // 6 Specialized AI Designer Agents (Figma style)
    const agentConfigs: AgentData[] = [
      {
        id: 'agent-1',
        name: 'Agent 01',
        role: 'Layout Director',
        color: '#ff5a1f',
        startX: -80,
        startY: navRect.y + 20,
        targetX: navRect.x + 20,
        targetY: navRect.y + 16,
        exitX: -120,
        exitY: -100,
      },
      {
        id: 'agent-2',
        name: 'Agent 02',
        role: 'Typography Lead',
        color: '#FFFFFF',
        startX: vw + 80,
        startY: titleRect.y - 40,
        targetX: titleRect.x + 30,
        targetY: titleRect.y + 18,
        exitX: vw + 150,
        exitY: titleRect.y - 120,
      },
      {
        id: 'agent-3',
        name: 'Agent 03',
        role: 'Content Systems',
        color: '#E2E8F0',
        startX: -60,
        startY: subRect.y + 100,
        targetX: subRect.x + 40,
        targetY: subRect.y + 10,
        exitX: -120,
        exitY: vh + 80,
      },
      {
        id: 'agent-4',
        name: 'Agent 04',
        role: 'Interaction & Motion',
        color: '#ff5a1f',
        startX: vw * 0.4,
        startY: vh + 80,
        targetX: ctaRect.x + 35,
        targetY: ctaRect.y + 20,
        exitX: vw * 0.2,
        exitY: vh + 120,
      },
      {
        id: 'agent-5',
        name: 'Agent 05',
        role: 'Visual Architecture',
        color: '#38bdf8',
        startX: vw + 100,
        startY: vh * 0.4,
        targetX: Math.min(vw - 180, titleRect.x + titleRect.w + 60),
        targetY: titleRect.y + 30,
        exitX: vw + 150,
        exitY: vh * 0.5,
      },
      {
        id: 'agent-6',
        name: 'Agent 06',
        role: 'Systems QA',
        color: '#94A3B8',
        startX: vw * 0.8,
        startY: vh + 80,
        targetX: Math.min(vw * 0.75, 800),
        targetY: telemetryRect.y + 20,
        exitX: vw + 100,
        exitY: vh + 90,
      },
    ];

    setAgents(agentConfigs);

    // Initial state: hide real DOM elements while intro prepares them
    const realElements = [navEl, titleEl, subEl, bioEl, ctaEl, statusEl, telemetryEl].filter(Boolean) as HTMLElement[];
    gsap.set(realElements, { opacity: 0, y: 16 });
    if (visualEl) gsap.set(visualEl, { opacity: 0.15 });

    // GSAP Master Timeline for the 4-scene AI Designer Arrival Sequence
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        handleComplete();
      },
    });

    // SCENE 1 — Empty Canvas (0.0s - 0.65s)
    tl.to(centerTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    });

    // SCENE 2 — AI Agents Arrive (0.65s - 1.25s)
    tl.to(
      centerTextRef.current,
      {
        opacity: 0,
        y: -12,
        duration: 0.35,
        ease: 'power2.in',
      },
      '+=0.25'
    );

    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'AI AGENTS CONNECTED // SYNCHRONIZING REAL DOM';
      }
    });

    // Animate AI Cursor Agents flying into initial staging points
    agentConfigs.forEach((agent) => {
      tl.fromTo(
        `#${agent.id}`,
        { x: agent.startX, y: agent.startY, opacity: 0, scale: 0.7 },
        {
          x: agent.targetX,
          y: agent.targetY,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        '<=0.05'
      );
    });

    // SCENE 3A — Navbar & Spatial Visual Area Selection (1.25s - 1.75s)
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'SELECTING & ASSEMBLING NAV_MODULE & VISUAL FRAME';
      }
    });

    // Agent 01 clicks Navbar
    tl.to('#agent-1', {
      scale: 0.9,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    // Navbar selection box & real Navbar appear
    tl.to(
      '#box-nav',
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.4)',
      },
      '<=0.04'
    );

    if (navEl) {
      tl.to(
        navEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        },
        '<=0.05'
      );
    }

    if (statusEl) {
      tl.to(statusEl, { opacity: 1, y: 0, duration: 0.35 }, '<=0.05');
    }

    // Visual area selection
    tl.to(
      '#box-visual',
      {
        opacity: 0.65,
        duration: 0.4,
      },
      '<=0.1'
    );

    if (visualEl) {
      tl.to(visualEl, { opacity: 1, duration: 0.6 }, '<=0.1');
    }

    // SCENE 3B — Hero Title Selection (1.75s - 2.3s)
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'AGENT 02 SELECTING HERO_TITLE // MEASURING SPACING';
      }
    });

    // Agent 02 clicks Title
    tl.to('#agent-2', {
      scale: 0.9,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
    });

    // Title selection box expands + guides show
    tl.to(
      '#box-title',
      {
        opacity: 1,
        duration: 0.35,
        ease: 'back.out(1.2)',
      },
      '<=0.04'
    );

    tl.to(
      '#guide-title-y, #guide-title-x',
      {
        opacity: 1,
        duration: 0.3,
      },
      '<=0.05'
    );

    // Real Title fades and slides up into exact position
    if (titleEl) {
      tl.to(
        titleEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '<=0.05'
      );
    }

    // SCENE 3C — Subtitle & Bio Selection (2.2s - 2.7s)
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'AGENT 03 REFINING TYPOGRAPHY & BIO WORKSPACE';
      }
    });

    tl.to('#agent-3', {
      scale: 0.9,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
    });

    tl.to(
      '#box-subtitle',
      {
        opacity: 1,
        duration: 0.3,
      },
      '<=0.04'
    );

    if (subEl) {
      tl.to(subEl, { opacity: 1, y: 0, duration: 0.4 }, '<=0.04');
    }
    if (bioEl) {
      tl.to(bioEl, { opacity: 1, y: 0, duration: 0.4 }, '<=0.08');
    }

    // SCENE 3D — CTA Buttons & Telemetry (2.6s - 3.1s)
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'AGENT 04 ACTIVATING CTA AUTOLAYOUT & TELEMETRY';
      }
    });

    tl.to('#agent-4', {
      scale: 0.9,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
    });

    tl.to(
      '#box-cta',
      {
        opacity: 1,
        duration: 0.3,
      },
      '<=0.04'
    );

    if (ctaEl) {
      tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.45 }, '<=0.04');
    }

    tl.to(
      '#box-telemetry',
      {
        opacity: 0.8,
        duration: 0.3,
      },
      '<=0.06'
    );

    if (telemetryEl) {
      tl.to(telemetryEl, { opacity: 1, y: 0, duration: 0.4 }, '<=0.06');
    }

    // SCENE 4 — Final Reveal (3.1s - 3.7s)
    tl.call(() => {
      if (statusRef.current) {
        statusRef.current.innerText = 'ALL SYSTEMS COMMITTED // DISSOLVING SELECTIONS';
      }
    });

    // Dissolve selection boxes & guides
    tl.to(
      svgOverlayRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      },
      '+=0.15'
    );

    // AI Agents smoothly fly outward offscreen
    agentConfigs.forEach((agent) => {
      tl.to(
        `#${agent.id}`,
        {
          x: agent.exitX,
          y: agent.exitY,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power2.in',
        },
        '<=0.02'
      );
    });

    // Fade out main #050505 overlay canvas to reveal full page underneath
    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '<=0.1'
    );

    // Fast-forward skip handling on [ESC]
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        tl.kill();
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

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

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999999] w-screen h-screen overflow-hidden bg-[#050505] select-none pointer-events-auto"
      style={{ willChange: 'opacity' }}
      aria-label="AI Designer Arrival Sequence"
    >
      {/* Subtle Figma / CAD Canvas Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Center Stage Initial Monospace Interface (Scene 1) */}
      <div
        ref={centerTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f] animate-ping" />
          <h2 className="font-label-mono-md text-sm sm:text-base font-bold text-white tracking-[0.25em] uppercase">
            INITIALIZING DESIGN SYSTEM
          </h2>
        </div>

        <p className="mt-2 font-label-mono-sm text-[11px] text-white/50 tracking-[0.2em] uppercase">
          CONNECTING AI AGENTS...
        </p>

        <div className="mt-4 flex items-center gap-3 text-[10px] font-label-mono-sm text-white/30 uppercase tracking-widest">
          <span>AI CORES: 6 ACTIVE</span>
          <span>•</span>
          <span>FIGMA ENGINE: V4</span>
          <span>•</span>
          <span>ZOOM: 100%</span>
        </div>
      </div>

      {/* Real-time SVG Selection Overlays & Figma Dimension Guides */}
      <svg
        ref={svgOverlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {boxes.map((box) => (
          <g key={box.id} id={box.id} className="opacity-0 transition-opacity">
            {/* Selection Outline Box */}
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              fill={box.color === '#ff5a1f' ? 'rgba(255, 90, 31, 0.04)' : 'rgba(255, 255, 255, 0.02)'}
              stroke={box.color}
              strokeWidth="1"
              strokeDasharray={box.id === 'box-visual' ? '6 4' : undefined}
            />

            {/* 4 Corner Handles (Figma Style) */}
            <rect x={box.x - 3.5} y={box.y - 3.5} width="7" height="7" fill="#FFFFFF" stroke={box.color} strokeWidth="1" />
            <rect x={box.x + box.w - 3.5} y={box.y - 3.5} width="7" height="7" fill="#FFFFFF" stroke={box.color} strokeWidth="1" />
            <rect x={box.x + box.w - 3.5} y={box.y + box.h - 3.5} width="7" height="7" fill="#FFFFFF" stroke={box.color} strokeWidth="1" />
            <rect x={box.x - 3.5} y={box.y + box.h - 3.5} width="7" height="7" fill="#FFFFFF" stroke={box.color} strokeWidth="1" />

            {/* Figma Selection Header Pill */}
            {box.y > 24 && (
              <g transform={`translate(${box.x}, ${box.y - 20})`} filter="url(#badge-shadow)">
                <rect
                  x="0"
                  y="0"
                  width={box.label.length * 6.5 + 16}
                  height="18"
                  rx="3"
                  fill={box.color === '#ff5a1f' ? '#ff5a1f' : '#0E0E14'}
                  stroke={box.color === '#ff5a1f' ? 'none' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1"
                />
                <text
                  x="8"
                  y="12"
                  fill="#FFFFFF"
                  fontSize="9.5"
                  fontFamily="'Space Grotesk', monospace"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  {box.label}
                </text>
              </g>
            )}

            {/* Live Dimension Chip at Bottom-Right */}
            {box.dimText && box.w > 60 && (
              <g transform={`translate(${box.x + box.w - 80}, ${box.y + box.h + 5})`} filter="url(#badge-shadow)">
                <rect x="0" y="0" width="80" height="16" rx="3" fill="#0E0E14" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <text x="6" y="11" fill={box.color} fontSize="8.5" fontFamily="'Space Grotesk', monospace" fontWeight="600">
                  {box.dimText}
                </text>
              </g>
            )}

            {/* Extra Measurement Smart Guide Spacing */}
            {box.gapText && (
              <g transform={`translate(${box.x + 12}, ${box.y - 8})`} filter="url(#badge-shadow)">
                <rect x="0" y="0" width="75" height="15" rx="3" fill="rgba(14, 14, 20, 0.95)" stroke="#ff5a1f" strokeWidth="0.8" />
                <text x="6" y="11" fill="#ff5a1f" fontSize="8" fontFamily="'Space Grotesk', monospace" fontWeight="600">
                  {box.gapText}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Dynamic Distance Ruler Guides (Figma Smart Guides) */}
        <g id="guide-title-y" className="opacity-0 transition-opacity">
          {boxes[2] && (
            <>
              {/* Vertical alignment line from navbar to title */}
              <line
                x1={boxes[2].x + 40}
                y1={80}
                x2={boxes[2].x + 40}
                y2={boxes[2].y}
                stroke="#ff5a1f"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line x1={boxes[2].x + 35} y1={80} x2={boxes[2].x + 45} y2={80} stroke="#ff5a1f" strokeWidth="1" />
              <line x1={boxes[2].x + 35} y1={boxes[2].y} x2={boxes[2].x + 45} y2={boxes[2].y} stroke="#ff5a1f" strokeWidth="1" />
            </>
          )}
        </g>

        <g id="guide-title-x" className="opacity-0 transition-opacity">
          {boxes[2] && (
            <>
              {/* Horizontal margin guide from screen left to title */}
              <line
                x1={0}
                y1={boxes[2].y + 30}
                x2={boxes[2].x}
                y2={boxes[2].y + 30}
                stroke="#ff5a1f"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <rect x="12" y={boxes[2].y + 22} width="55" height="16" rx="3" fill="#0E0E14" stroke="#ff5a1f" strokeWidth="0.8" />
              <text x="18" y={boxes[2].y + 34} fill="#ff5a1f" fontSize="8" fontFamily="'Space Grotesk', monospace" fontWeight="600">
                X: {Math.round(boxes[2].x)}px
              </text>
            </>
          )}
        </g>
      </svg>

      {/* 6 AI Designer Cursors Layer */}
      <div ref={agentsLayerRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {agents.map((agent) => (
          <div
            key={agent.id}
            id={agent.id}
            className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0"
            style={{ transform: `translate3d(${agent.startX}px, ${agent.startY}px, 0)` }}
          >
            <div className="relative">
              {/* Figma Precision Arrow Cursor SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                <path
                  d="M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z"
                  fill={agent.color}
                  stroke="#050505"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Designer Pill Badge */}
              <div
                className="absolute left-3.5 top-3.5 px-2.5 py-0.5 rounded-full bg-[#0E0E14]/92 border border-white/15 backdrop-blur-md text-[9px] font-mono font-semibold whitespace-nowrap shadow-2xl flex items-center gap-1.5"
                style={{ color: agent.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent.color }} />
                <span>{agent.name} // {agent.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Header: Telemetry & Instant Skip */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 font-label-mono-sm text-[11px] text-white/50 uppercase tracking-widest">
          <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/80">
            AI DESIGNER ARRIVAL
          </span>
          <span className="hidden sm:inline">•</span>
          <span ref={statusRef} className="hidden sm:inline text-white/60">
            CONNECTING DESIGN SYSTEM...
          </span>
        </div>

        {/* Skip button for immediate bypass */}
        <button
          onClick={() => handleSkipRef.current()}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#ff5a1f]/40 hover:bg-white/[0.08] transition-all font-label-mono-sm text-[11px] uppercase tracking-wider text-white/70 hover:text-white cursor-pointer active:scale-95"
          title="Skip AI Designer Intro"
        >
          <span>Skip Intro</span>
          <span className="text-white/30 group-hover:text-[#ff5a1f] text-[10px]">[ESC]</span>
        </button>
      </div>

      {/* Bottom Footer Telemetry Strip */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none font-label-mono-sm text-[10px] text-white/30 uppercase tracking-widest">
        <span>AGENTS: 6 CORES COLLABORATING</span>
        <span className="hidden sm:inline">ENGINE: REAL DOM BOUNDING RECT // 1:1 PIXEL FIDELITY</span>
        <span className="text-[#ff5a1f]/70">STATE: HOMEPAGE ASSEMBLED</span>
      </div>
    </div>
  );
};
