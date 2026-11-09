import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AISwarmLoaderProps {
  onComplete: () => void;
}

interface AgentCursor {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  angle: number;
  speed: number;
  force: number;
  taskType: 'box' | 'line' | 'guide' | 'flock';
  boxData?: { x: number; y: number; w: number; h: number; currentW: number; currentH: number; label: string };
}

// Authentic Figma arrow path
const ARROW_POINTS = [
  { x: 4.6, y: 3.9 },
  { x: 20.6, y: 9.4 },
  { x: 13.9, y: 12.9 },
  { x: 11.3, y: 20.4 },
];

export const AISwarmLoader: React.FC<AISwarmLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  const isCompletedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const cx = width / 2;
    const cy = height / 2;

    // Blueprint Layout Construction Boxes (Synthesizing the website structure)
    const constructionBoxes = [
      // Top Navbar pill
      { x: cx - 240, y: 35, w: 480, h: 48, label: 'NAVBAR // CHROMIUM-PILL' },
      // Hero Headline Region
      { x: cx - 360, y: cy - 130, w: 720, h: 100, label: 'HERO.SECTION // AYUSH SINGH' },
      // Subtitle / Telemetry strip
      { x: cx - 280, y: cy - 10, w: 560, h: 40, label: 'SPECS // B.TECH CSE AI/ML' },
      // Case Study Card 1
      { x: cx - 380, y: cy + 50, w: 230, h: 150, label: 'PROJECT // LANDWATCH.AI' },
      // Case Study Card 2
      { x: cx - 115, y: cy + 50, w: 230, h: 150, label: 'PROJECT // CONTRACT2ACTION' },
      // Case Study Card 3
      { x: cx + 150, y: cy + 50, w: 230, h: 150, label: 'PROJECT // SMARTFARMER' },
    ];

    // 12 Autonomous AI Agent Cursors
    const agentConfigs = [
      { name: 'Agent 01 // Blueprint', color: '#ff5a1f', target: { x: cx - 240, y: 35 }, type: 'box' as const, boxIndex: 0 },
      { name: 'Agent 02 // Layout', color: '#FFFFFF', target: { x: cx + 240, y: 83 }, type: 'box' as const, boxIndex: 0 },
      { name: 'Agent 03 // Hero Title', color: '#E2E8F0', target: { x: cx - 360, y: cy - 130 }, type: 'box' as const, boxIndex: 1 },
      { name: 'Agent 04 // Neural Core', color: '#ff5a1f', target: { x: cx + 360, y: cy - 30 }, type: 'box' as const, boxIndex: 1 },
      { name: 'Agent 05 // Telemetry', color: '#CBD5E1', target: { x: cx - 280, y: cy - 10 }, type: 'box' as const, boxIndex: 2 },
      { name: 'Agent 06 // Spatial GIS', color: '#ff5a1f', target: { x: cx - 380, y: cy + 50 }, type: 'box' as const, boxIndex: 3 },
      { name: 'Agent 07 // Cadastre', color: '#94A3B8', target: { x: cx - 150, y: cy + 200 }, type: 'box' as const, boxIndex: 3 },
      { name: 'Agent 08 // Contract Ops', color: '#FFFFFF', target: { x: cx - 115, y: cy + 50 }, type: 'box' as const, boxIndex: 4 },
      { name: 'Agent 09 // Governance', color: '#ff5a1f', target: { x: cx + 115, y: cy + 200 }, type: 'box' as const, boxIndex: 4 },
      { name: 'Agent 10 // Agri APMC', color: '#E2E8F0', target: { x: cx + 150, y: cy + 50 }, type: 'box' as const, boxIndex: 5 },
      { name: 'Agent 11 // Yard Sync', color: '#ff5a1f', target: { x: cx + 380, y: cy + 200 }, type: 'box' as const, boxIndex: 5 },
      { name: 'Agent 12 // Optimizer', color: '#FFFFFF', target: { x: cx, y: cy }, type: 'guide' as const },
    ];

    const agents: AgentCursor[] = agentConfigs.map((cfg, idx) => {
      const startAngle = (idx * Math.PI * 2) / agentConfigs.length;
      const spawnRadius = Math.max(width, height) * 0.6;
      return {
        id: idx,
        name: cfg.name,
        color: cfg.color,
        x: cx + Math.cos(startAngle) * spawnRadius,
        y: cy + Math.sin(startAngle) * spawnRadius,
        vx: 0,
        vy: 0,
        targetX: cfg.target.x,
        targetY: cfg.target.y,
        angle: 0,
        speed: 650 + Math.random() * 300,
        force: 1800 + Math.random() * 1200,
        taskType: cfg.type,
        boxData: cfg.boxIndex !== undefined
          ? {
              ...constructionBoxes[cfg.boxIndex],
              currentW: 0,
              currentH: 0,
            }
          : undefined,
      };
    });

    let startTime = performance.now();
    let phase = 1; // 1: Boot, 2: Construction, 3: Convergence & Reveal
    let progress = 0;

    // Helper: draw an authentic Figma cursor arrow
    const drawAgentCursor = (c: AgentCursor) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);

      // SVG Arrow polygon
      ctx.beginPath();
      ctx.moveTo(0, 0); // Tip
      ctx.lineTo(16, 6);
      ctx.lineTo(10, 9);
      ctx.lineTo(8, 16);
      ctx.closePath();

      // Titanium/Orange drop-shadowed fill
      ctx.fillStyle = c.color;
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Crisp contrast border
      ctx.strokeStyle = c.color === '#FFFFFF' ? '#070709' : '#FFFFFF';
      ctx.lineWidth = 1.25;
      ctx.stroke();

      ctx.restore();

      // Agent Identification Tag Pill
      ctx.save();
      ctx.translate(c.x + 12, c.y + 12);
      ctx.font = '600 9px "Space Grotesk", monospace';

      const tagWidth = ctx.measureText(c.name).width + 12;
      const tagHeight = 16;

      // Dark glass pill
      ctx.fillStyle = 'rgba(10, 10, 14, 0.88)';
      ctx.strokeStyle = c.color === '#ff5a1f' ? 'rgba(255, 90, 31, 0.4)' : 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.roundRect(0, 0, tagWidth, tagHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Tag Label
      ctx.fillStyle = c.color;
      ctx.fillText(c.name, 6, 11);
      ctx.restore();
    };

    // Main 60FPS Construction Loop
    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const dt = 0.016; // 60 FPS standard step

      ctx.clearRect(0, 0, width, height);

      // Architectural Blueprint Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Phase Progress Control
      if (elapsed < 0.8) {
        phase = 1; // Booting
        progress = Math.min(30, (elapsed / 0.8) * 30);
      } else if (elapsed < 2.5) {
        phase = 2; // AI Swarm Construction
        progress = 30 + ((elapsed - 0.8) / 1.7) * 65;
      } else {
        phase = 3; // Convergence & Ready
        progress = 100;
      }

      // Update HUD text via direct DOM refs (0 React state overhead)
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `${Math.round(progress)}%`;
      }
      if (statusTextRef.current) {
        if (phase === 1) {
          statusTextRef.current.innerText = 'INITIALIZING NEURAL INTERFACE';
        } else if (phase === 2) {
          if (progress < 50) {
            statusTextRef.current.innerText = 'LOADING DESIGN SYSTEM (TOKENS // TITANIUM)';
          } else if (progress < 75) {
            statusTextRef.current.innerText = 'BUILDING COMPONENT TOPOLOGY';
          } else {
            statusTextRef.current.innerText = 'SYNTHESIZING PRODUCTION DOM & WIREFRAMES';
          }
        } else {
          statusTextRef.current.innerText = 'SYSTEM CONVERGED • REVEALING PORTFOLIO';
        }
      }

      // Phase 2: Live Wireframe Construction Rendering
      if (phase >= 2) {
        const buildFactor = Math.min(1, (elapsed - 0.8) / 1.4);

        // Draw the blueprint boxes being assembled by agents
        constructionBoxes.forEach((box, bIdx) => {
          const currentW = box.w * Math.min(1, buildFactor * 1.25);
          const currentH = box.h * Math.min(1, buildFactor * 1.15);

          ctx.save();
          // Box Fill (subtle dark glass)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
          ctx.fillRect(box.x, box.y, currentW, currentH);

          // Box Stroke with orange and titanium accents
          ctx.strokeStyle = bIdx % 2 === 0 ? 'rgba(255, 90, 31, 0.35)' : 'rgba(226, 232, 240, 0.28)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(box.x, box.y, currentW, currentH);
          ctx.setLineDash([]);

          // 4 Corner Construction Crosshairs
          const crossSize = 5;
          ctx.strokeStyle = '#ff5a1f';
          ctx.lineWidth = 1.25;

          // Top-left
          ctx.beginPath();
          ctx.moveTo(box.x - crossSize, box.y);
          ctx.lineTo(box.x + crossSize, box.y);
          ctx.moveTo(box.x, box.y - crossSize);
          ctx.lineTo(box.x, box.y + crossSize);
          ctx.stroke();

          // Bottom-right
          if (currentW > 10 && currentH > 10) {
            const brX = box.x + currentW;
            const brY = box.y + currentH;
            ctx.beginPath();
            ctx.moveTo(brX - crossSize, brY);
            ctx.lineTo(brX + crossSize, brY);
            ctx.moveTo(brX, brY - crossSize);
            ctx.lineTo(brX, brY + crossSize);
            ctx.stroke();

            // Live Dimension Tag (Figma/Swarm Rebuild style)
            ctx.fillStyle = 'rgba(10, 10, 14, 0.9)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.roundRect(brX - 65, brY + 4, 65, 15, 4);
            ctx.fill();
            ctx.stroke();

            ctx.font = '600 8.5px "Space Grotesk", monospace';
            ctx.fillStyle = '#ff5a1f';
            ctx.fillText(`${Math.round(currentW)} × ${Math.round(currentH)}`, brX - 58, brY + 15);
          }

          // Component Blueprint Header Label
          ctx.font = '600 9px "Space Grotesk", monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.fillText(box.label, box.x + 4, box.y - 6);

          ctx.restore();
        });

        // Dynamic Figma Ruler Alignment Guides (Orange #ff5a1f)
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 90, 31, 0.25)';
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 3]);

        // Horizontal alignment axis through hero
        ctx.beginPath();
        ctx.moveTo(0, cy - 80);
        ctx.lineTo(width, cy - 80);
        ctx.stroke();

        // Vertical center alignment axis
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, height);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Update AI Agent Cursors Physics & Flocking
      agents.forEach((agent, i) => {
        // Target calculation
        let tx = agent.targetX;
        let ty = agent.targetY;

        if (phase === 3) {
          // Phase 3: Swarm converges into center vortex
          const spiralAngle = elapsed * 5 + i * ((Math.PI * 2) / agents.length);
          const spiralRadius = Math.max(10, 120 - (elapsed - 2.5) * 160);
          tx = cx + Math.cos(spiralAngle) * spiralRadius;
          ty = cy + Math.sin(spiralAngle) * spiralRadius;
        } else if (phase === 2) {
          // Dynamic harmonic patrol around construction anchors
          tx += Math.sin(elapsed * 2.5 + i) * 18;
          ty += Math.cos(elapsed * 2.2 + i) * 14;
        }

        // Spring acceleration
        const dx = tx - agent.x;
        const dy = ty - agent.y;
        const dist = Math.hypot(dx, dy) || 0.01;

        const maxSpeed = phase === 3 ? 900 : agent.speed;
        const desiredVx = (dx / dist) * Math.min(dist * 6, maxSpeed);
        const desiredVy = (dy / dist) * Math.min(dist * 6, maxSpeed);

        agent.vx += (desiredVx - agent.vx) * 0.12;
        agent.vy += (desiredVy - agent.vy) * 0.12;

        agent.x += agent.vx * dt;
        agent.y += agent.vy * dt;

        // Angle facing movement
        const currentSpeed = Math.hypot(agent.vx, agent.vy);
        if (currentSpeed > 5) {
          const targetAngle = (Math.atan2(agent.vy, agent.vx) * 180) / Math.PI - 45;
          let diff = targetAngle - agent.angle;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          agent.angle += diff * 0.22;
        }

        // Draw the Agent Cursor
        drawAgentCursor(agent);
      });

      // Draw Rubber-Band Vector Connections between adjacent agents
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a1 = agents[i];
          const a2 = agents[j];
          const d = Math.hypot(a2.x - a1.x, a2.y - a1.y);

          if (d < 160) {
            const alpha = (1 - d / 160) * 0.28;
            ctx.strokeStyle = a1.color === '#ff5a1f' || a2.color === '#ff5a1f'
              ? `rgba(255, 90, 31, ${alpha})`
              : `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(a2.x, a2.y);
          }
        }
      }
      ctx.stroke();
      ctx.restore();

      // Trigger Completion Transition at ~2.9s
      if (elapsed > 2.9 && !isCompletedRef.current) {
        triggerExit();
      }

      if (!isCompletedRef.current) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    const triggerExit = () => {
      if (isCompletedRef.current) return;
      isCompletedRef.current = true;

      // Award-winning cinematic dissolution (scale, blur, fade)
      gsap.to(container, {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    };

    // Keyboard shortcut [ESC] to fast forward
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999999] w-screen h-screen overflow-hidden bg-[#070709] select-none pointer-events-auto"
      style={{ willChange: 'opacity, transform, filter' }}
      aria-label="AI Swarm Portfolio Construction Loading Screen"
    >
      {/* 60FPS Hardware Accelerated AI Swarm Construction Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Center Stage: Minimal Luxury Brand Identity */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
        {/* Ambient Specular Halo */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#ff5a1f]/15 via-white/5 to-transparent blur-[80px] pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Brand Monogram / Name */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-ping" />
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.25em] uppercase">
              AYUSH SINGH
            </h1>
          </div>

          <p className="font-label-mono-sm text-xs sm:text-sm uppercase tracking-[0.3em] text-white/50">
            AUTONOMOUS AI / ML SYSTEMS &amp; INTERFACES
          </p>

          {/* Telemetry Progress Pill */}
          <div
            ref={hudRef}
            className="mt-6 flex items-center gap-3 px-5 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <span
              ref={statusTextRef}
              className="font-label-mono-sm text-[10px] sm:text-[11px] text-white/70 uppercase tracking-widest"
            >
              INITIALIZING NEURAL INTERFACE
            </span>
            <span className="text-white/20">|</span>
            <span
              ref={progressTextRef}
              className="font-label-mono-sm text-[10px] sm:text-[11px] font-bold text-[#ff5a1f]"
            >
              0%
            </span>
          </div>
        </div>
      </div>

      {/* Top Header: Construction Telemetry & Fast-Forward Skip */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
          <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/70">
            AI SWARM RECONSTRUCTION
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-white/50">SRM IST // CHENNAI</span>
        </div>

        {/* Skip button for instant bypass */}
        <button
          onClick={() => {
            if (containerRef.current && !isCompletedRef.current) {
              isCompletedRef.current = true;
              gsap.to(containerRef.current, {
                opacity: 0,
                scale: 1.03,
                duration: 0.35,
                ease: 'power2.out',
                onComplete,
              });
            }
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#ff5a1f]/40 hover:bg-white/[0.08] transition-all font-label-mono-sm text-[11px] uppercase tracking-wider text-white/70 hover:text-white cursor-pointer active:scale-95"
          title="Skip AI construction intro"
        >
          <span>Skip Intro</span>
          <span className="text-white/30 group-hover:text-[#ff5a1f] text-[10px]">[ESC]</span>
        </button>
      </div>

      {/* Bottom Footer Telemetry Strip */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none font-label-mono-sm text-[10px] text-white/30 uppercase tracking-widest">
        <span>AGENTS: 12 ACTIVE</span>
        <span className="hidden sm:inline">SWARM ALGORITHM: HARMONIC BOID VECTORS</span>
        <span className="text-[#ff5a1f]/70">STATUS: GENERATING DOM</span>
      </div>
    </div>
  );
};
