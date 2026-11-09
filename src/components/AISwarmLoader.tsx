import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AISwarmLoaderProps {
  onComplete: () => void;
}

interface HeroWireframeElement {
  id: string;
  tag: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: number;
  strokeColor?: string;
  isPill?: boolean;
  contentSnippet?: string;
}

interface AgentCursor {
  id: number;
  name: string;
  tag: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  angle: number;
  speed: number;
  assignedElementIndex: number;
  waypoints: { x: number; y: number }[];
  currentWaypointIdx: number;
  trail: { x: number; y: number }[];
}

// Authentic Figma arrow path from Swarm Rebuild
const ARROW_POINTS = [
  { x: 4.6, y: 3.9 },
  { x: 20.6, y: 9.4 },
  { x: 13.9, y: 12.9 },
  { x: 11.3, y: 20.4 },
];

export const AISwarmLoader: React.FC<AISwarmLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const centerIdentityRef = useRef<HTMLDivElement>(null);

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

    let cx = width / 2;
    let cy = height / 2;
    let isMobile = width < 768;

    // Calculate exact coordinates corresponding to Hero.tsx & Navbar.tsx
    let contentLeft = Math.max(20, isMobile ? 24 : Math.max(48, cx - 580));
    let contentWidth = Math.min(width - contentLeft * 2, 1160);

    // Compute the exact layout boxes that match the real homepage Hero section
    const getHeroElements = (): HeroWireframeElement[] => {
      const navW = Math.min(width * 0.9, 1160);
      const navX = cx - navW / 2;

      return [
        // 0. Top Chromium Nav Pill
        {
          id: 'nav',
          tag: 'NAV_MODULE',
          label: 'NAVBAR // CHROMIUM_PILL',
          x: navX,
          y: 16,
          w: navW,
          h: 60,
          isPill: true,
          radius: 30,
          strokeColor: '#E2E8F0',
          contentSnippet: 'AS  •  AYUSH SINGH  •  OVERVIEW  •  ABOUT  •  PROJECTS  •  CONTACT',
        },
        // 1. SRM IST Status Tag
        {
          id: 'status',
          tag: 'SYSTEM_STATUS',
          label: 'STATUS // SRM_IST_CHENNAI',
          x: contentLeft,
          y: Math.max(90, cy - 225),
          w: isMobile ? width - 48 : 340,
          h: 36,
          isPill: true,
          radius: 18,
          strokeColor: '#ff5a1f',
          contentSnippet: '• SRM IST CHENNAI • B.TECH CSE (AI & ML)',
        },
        // 2. Chennai, India Location Node (on desktop)
        {
          id: 'location',
          tag: 'GEO_NODE',
          label: 'GEO // CHENNAI_INDIA',
          x: isMobile ? contentLeft : contentLeft + contentWidth - 190,
          y: isMobile ? Math.max(130, cy - 185) : Math.max(90, cy - 225),
          w: 190,
          h: 36,
          isPill: true,
          radius: 18,
          strokeColor: '#E2E8F0',
          contentSnippet: 'LOCATION: CHENNAI, INDIA',
        },
        // 3. Eyebrow Tag [ PERSONAL PORTFOLIO ]
        {
          id: 'eyebrow',
          tag: 'MODULE_META',
          label: 'META // [ PERSONAL PORTFOLIO ]',
          x: contentLeft,
          y: Math.max(isMobile ? 175 : 138, cy - 180),
          w: Math.min(contentWidth, 310),
          h: 24,
          strokeColor: '#ff5a1f',
          contentSnippet: '[ PERSONAL PORTFOLIO ] —— AI/ML & SYSTEMS',
        },
        // 4. Hero Main Headline (AYUSH SINGH)
        {
          id: 'hero_title',
          tag: 'HERO_TITLE',
          label: 'HERO_TITLE // AYUSH_SINGH',
          x: contentLeft,
          y: Math.max(isMobile ? 208 : 170, cy - 148),
          w: Math.min(contentWidth, 740),
          h: isMobile ? 62 : 98,
          strokeColor: '#FFFFFF',
          contentSnippet: 'AYUSH SINGH',
        },
        // 5. Discipline Subtitle
        {
          id: 'subtitle',
          tag: 'SUBTITLE',
          label: 'DISCIPLINE // AI_ML_SYSTEMS',
          x: contentLeft,
          y: Math.max(isMobile ? 280 : 278, cy - 40),
          w: Math.min(contentWidth, 580),
          h: 28,
          strokeColor: '#CBD5E1',
          contentSnippet: 'B.TECH CSE AI/ML / FULL-STACK DEVELOPER / CREATIVE TECHNOLOGIST',
        },
        // 6. Profile Workspace / Bio
        {
          id: 'profile_workspace',
          tag: 'PROFILE_WORKSPACE',
          label: 'PROFILE_WORKSPACE // BIOGRAPHY',
          x: contentLeft,
          y: Math.max(isMobile ? 318 : 316, cy + 2),
          w: Math.min(contentWidth, 680),
          h: isMobile ? 74 : 52,
          strokeColor: '#94A3B8',
          contentSnippet: 'Computer Science Engineering student specializing in AI/ML at SRM IST Chennai...',
        },
        // 7. Primary CTA: Explore Projects
        {
          id: 'cta_primary',
          tag: 'CTA_PRIMARY',
          label: 'CTA_PRIMARY // EXPLORE_PROJECTS',
          x: contentLeft,
          y: Math.max(isMobile ? 402 : 382, cy + 66),
          w: 175,
          h: 48,
          isPill: true,
          radius: 24,
          strokeColor: '#FFFFFF',
          contentSnippet: 'Explore Projects →',
        },
        // 8. Secondary CTA: About Me
        {
          id: 'cta_secondary',
          tag: 'CTA_SECONDARY',
          label: 'CTA_SECONDARY // ABOUT_ME',
          x: isMobile ? contentLeft + 185 : contentLeft + 190,
          y: Math.max(isMobile ? 402 : 382, cy + 66),
          w: 135,
          h: 48,
          isPill: true,
          radius: 24,
          strokeColor: '#ff5a1f',
          contentSnippet: 'About Me',
        },
        // 9. Social Channels Cluster (GitHub, LinkedIn, Email)
        {
          id: 'socials',
          tag: 'SOCIAL_CLUSTER',
          label: 'SOCIAL_CHANNELS // CONNECT',
          x: isMobile ? contentLeft : contentLeft + 345,
          y: isMobile ? Math.max(460, cy + 124) : Math.max(382, cy + 66),
          w: 145,
          h: 48,
          strokeColor: '#CBD5E1',
          contentSnippet: '[ GITHUB ]  [ LINKEDIN ]  [ MAIL ]',
        },
        // 10. Bottom Architectural Telemetry Ribbon
        {
          id: 'telemetry_ribbon',
          tag: 'TELEMETRY_RIBBON',
          label: 'TELEMETRY_RIBBON // SPECIFICATIONS',
          x: 0,
          y: height - 58,
          w: width,
          h: 58,
          strokeColor: '#ff5a1f',
          contentSnippet: 'DEGREE: B.Tech CSE AI/ML  |  PROJECTS: 06 Live  |  HACKATHONS: SIH 2026  |  STACK: React, Next.js, Python',
        },
        // 11. Edge-to-Edge WebGL Neural Shader Canvas
        {
          id: 'shader_canvas',
          tag: 'BACKGROUND_EFFECTS',
          label: 'BACKGROUND_EFFECTS // WEBGL_NEURAL_CANVAS',
          x: 8,
          y: 8,
          w: width - 16,
          h: height - 16,
          strokeColor: 'rgba(255, 90, 31, 0.25)',
          contentSnippet: 'WEBGL VORTEX SHADER CANVAS // RESOLUTION: 100vw × 100vh',
        },
      ];
    };

    let heroElements = getHeroElements();

    const updateSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
      isMobile = width < 768;
      contentLeft = Math.max(20, isMobile ? 24 : Math.max(48, cx - 580));
      contentWidth = Math.min(width - contentLeft * 2, 1160);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      heroElements = getHeroElements();

      // Recalculate agent waypoints
      agents.forEach((agent) => {
        const el = heroElements[agent.assignedElementIndex % heroElements.length];
        agent.waypoints = [
          { x: el.x, y: el.y },
          { x: el.x + el.w, y: el.y },
          { x: el.x + el.w, y: el.y + el.h },
          { x: el.x, y: el.y + el.h },
        ];
      });
    };

    // 12 Autonomous AI Swarm Agents (Each dedicated to reconstructing a specific Hero element)
    const agentConfigs = [
      { name: 'Agent 01', tag: 'NAV_MODULE', color: '#FFFFFF', elIndex: 0 },
      { name: 'Agent 02', tag: 'NAV_MODULE', color: '#ff5a1f', elIndex: 0 },
      { name: 'Agent 03', tag: 'SYSTEM_STATUS', color: '#2dd4bf', elIndex: 1 },
      { name: 'Agent 04', tag: 'HERO_TITLE', color: '#ff5a1f', elIndex: 4 },
      { name: 'Agent 05', tag: 'HERO_TITLE', color: '#FFFFFF', elIndex: 4 },
      { name: 'Agent 06', tag: 'HERO_TITLE', color: '#E2E8F0', elIndex: 4 },
      { name: 'Agent 07', tag: 'SUBTITLE', color: '#CBD5E1', elIndex: 5 },
      { name: 'Agent 08', tag: 'PROFILE_WORKSPACE', color: '#94A3B8', elIndex: 6 },
      { name: 'Agent 09', tag: 'CTA_PRIMARY', color: '#FFFFFF', elIndex: 7 },
      { name: 'Agent 10', tag: 'CTA_SECONDARY', color: '#ff5a1f', elIndex: 8 },
      { name: 'Agent 11', tag: 'SOCIAL_CLUSTER', color: '#CBD5E1', elIndex: 9 },
      { name: 'Agent 12', tag: 'TELEMETRY_RIBBON', color: '#ff5a1f', elIndex: 10 },
      { name: 'Agent 13', tag: 'BACKGROUND_EFFECTS', color: '#38bdf8', elIndex: 11 },
      { name: 'Agent 14', tag: 'CAD_GUIDES', color: '#ff5a1f', elIndex: 3 },
    ];

    const agents: AgentCursor[] = agentConfigs.map((cfg, idx) => {
      const el = heroElements[cfg.elIndex % heroElements.length];
      const startAngle = (idx * Math.PI * 2) / agentConfigs.length;
      const spawnDist = Math.max(width, height) * 0.7;

      const waypoints = [
        { x: el.x, y: el.y },
        { x: el.x + el.w, y: el.y },
        { x: el.x + el.w, y: el.y + el.h },
        { x: el.x, y: el.y + el.h },
      ];

      return {
        id: idx,
        name: cfg.name,
        tag: cfg.tag,
        color: cfg.color,
        x: cx + Math.cos(startAngle) * spawnDist,
        y: cy + Math.sin(startAngle) * spawnDist,
        vx: 0,
        vy: 0,
        targetX: waypoints[idx % waypoints.length].x,
        targetY: waypoints[idx % waypoints.length].y,
        angle: 0,
        speed: 680 + (idx % 4) * 80,
        assignedElementIndex: cfg.elIndex,
        waypoints,
        currentWaypointIdx: idx % 4,
        trail: [],
      };
    });

    updateSize();
    window.addEventListener('resize', updateSize);

    let startTime = performance.now();
    let phase = 1; // 1: Technical Boot, 2: AI Swarm Construction, 3: Convergence & Reveal
    let progress = 0;

    // Helper: Draw authentic Figma / Swarm Rebuild SVG cursor arrow on canvas
    const drawAgentCursor = (c: AgentCursor) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);

      // SVG Arrow polygon
      ctx.beginPath();
      ctx.moveTo(ARROW_POINTS[0].x, ARROW_POINTS[0].y);
      ctx.lineTo(ARROW_POINTS[1].x, ARROW_POINTS[1].y);
      ctx.lineTo(ARROW_POINTS[2].x, ARROW_POINTS[2].y);
      ctx.lineTo(ARROW_POINTS[3].x, ARROW_POINTS[3].y);
      ctx.closePath();

      // Fill with Titanium / Orange / White
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

      // Agent Identification Tag Pill (with exact tag: HERO_TITLE, NAV_MODULE, CTA_PRIMARY, etc.)
      ctx.save();
      ctx.translate(c.x + 14, c.y + 12);
      ctx.font = '600 8.5px "Space Grotesk", monospace';

      const tagText = `${c.name} // ${c.tag}`;
      const tagWidth = ctx.measureText(tagText).width + 12;
      const tagHeight = 16;

      // Dark glass pill background
      ctx.fillStyle = 'rgba(10, 10, 14, 0.9)';
      ctx.strokeStyle = c.color === '#ff5a1f' ? 'rgba(255, 90, 31, 0.45)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.roundRect(0, 0, tagWidth, tagHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Tag Label text
      ctx.fillStyle = c.color;
      ctx.fillText(tagText, 6, 11);
      ctx.restore();
    };

    // Main 60FPS AI Swarm Construction Render Loop
    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const dt = 0.016; // 60 FPS standard delta

      ctx.clearRect(0, 0, width, height);

      // Subtle CAD Blueprint Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 48;
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

      // 3 Stages Timeline Control
      if (elapsed < 0.8) {
        // Stage 1: Technical Black Boot Screen
        phase = 1;
        progress = Math.min(28, (elapsed / 0.8) * 28);
      } else if (elapsed < 2.5) {
        // Stage 2: AI Swarm Construction
        phase = 2;
        progress = 28 + ((elapsed - 0.8) / 1.7) * 68;
      } else {
        // Stage 3: Convergence & Reveal
        phase = 3;
        progress = 100;
      }

      // Update DOM Text References directly (0 React state overhead)
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `${Math.round(progress)}%`;
      }
      if (statusTextRef.current) {
        if (phase === 1) {
          statusTextRef.current.innerText = 'SYSTEM INITIALIZING...';
        } else if (phase === 2) {
          if (progress < 45) {
            statusTextRef.current.innerText = 'LOADING PORTFOLIO CORE...';
          } else if (progress < 75) {
            statusTextRef.current.innerText = 'BUILDING HERO EXPERIENCE...';
          } else {
            statusTextRef.current.innerText = 'CALIBRATING DESIGN SYSTEM TOKENS...';
          }
        } else {
          statusTextRef.current.innerText = 'HERO CONSTRUCTED • RESOLVING DOM';
        }
      }

      // Fade out center brand identity during Stage 2 so wireframe elements take focus
      if (centerIdentityRef.current) {
        if (phase === 1) {
          centerIdentityRef.current.style.opacity = '1';
          centerIdentityRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        } else if (phase === 2) {
          const fadeOut = Math.max(0, 1 - (elapsed - 0.8) / 0.6);
          centerIdentityRef.current.style.opacity = `${fadeOut * 0.4}`;
          centerIdentityRef.current.style.transform = `translate(-50%, -50%) scale(${1 - (1 - fadeOut) * 0.08})`;
        } else {
          centerIdentityRef.current.style.opacity = '0';
        }
      }

      // Stage 2 & 3: Render Hero Section Wireframe Boxes & Smart Guides
      if (phase >= 2) {
        const buildFactor = Math.min(1, (elapsed - 0.8) / 1.35);

        // Draw each Hero element being constructed by the AI agents
        heroElements.forEach((el, index) => {
          // Staggered reveal for organic construction feel
          const delay = (index / heroElements.length) * 0.4;
          const elementFactor = Math.max(0, Math.min(1, (buildFactor - delay) / 0.6));
          if (elementFactor <= 0) return;

          const currentW = el.w * elementFactor;
          const currentH = el.h * Math.min(1, elementFactor * 1.1);

          ctx.save();

          // Semi-transparent box background fill
          ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
          if (el.isPill) {
            ctx.beginPath();
            ctx.roundRect(el.x, el.y, currentW, currentH, el.radius || 20);
            ctx.fill();
          } else {
            ctx.fillRect(el.x, el.y, currentW, currentH);
          }

          // Dashed Blueprint Wireframe Stroke
          ctx.strokeStyle = el.strokeColor || 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);

          if (el.isPill) {
            ctx.beginPath();
            ctx.roundRect(el.x, el.y, currentW, currentH, el.radius || 20);
            ctx.stroke();
          } else {
            ctx.strokeRect(el.x, el.y, currentW, currentH);
          }
          ctx.setLineDash([]);

          // 4 Precision Corner Crosshairs (+) with coordinate points
          if (!el.isPill) {
            const crossSize = 5;
            ctx.strokeStyle = '#ff5a1f';
            ctx.lineWidth = 1.2;

            // Top-Left Crosshair
            ctx.beginPath();
            ctx.moveTo(el.x - crossSize, el.y);
            ctx.lineTo(el.x + crossSize, el.y);
            ctx.moveTo(el.x, el.y - crossSize);
            ctx.lineTo(el.x, el.y + crossSize);
            ctx.stroke();

            // Bottom-Right Crosshair
            if (currentW > 20 && currentH > 20) {
              const brX = el.x + currentW;
              const brY = el.y + currentH;
              ctx.beginPath();
              ctx.moveTo(brX - crossSize, brY);
              ctx.lineTo(brX + crossSize, brY);
              ctx.moveTo(brX, brY - crossSize);
              ctx.lineTo(brX, brY + crossSize);
              ctx.stroke();

              // Live Dimension Chip: [680 × 96 px]
              ctx.fillStyle = 'rgba(10, 10, 14, 0.9)';
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
              ctx.beginPath();
              ctx.roundRect(brX - 68, brY + 4, 68, 16, 4);
              ctx.fill();
              ctx.stroke();

              ctx.font = '600 8.5px "Space Grotesk", monospace';
              ctx.fillStyle = '#ff5a1f';
              ctx.fillText(`${Math.round(currentW)} × ${Math.round(currentH)} px`, brX - 62, brY + 15);
            }
          }

          // Element Tag Header Label: "HERO_TITLE", "NAV_MODULE", "CTA_PRIMARY", etc.
          ctx.font = '600 9px "Space Grotesk", monospace';
          ctx.fillStyle = el.strokeColor || 'rgba(255, 255, 255, 0.5)';
          ctx.fillText(`[ ${el.tag} ] ${el.label}`, el.x + 6, el.y - 6);

          // Real Ghost Text / Content Blueprint inside the box
          if (el.contentSnippet && currentW > 80) {
            if (el.id === 'hero_title') {
              // Draw ghost "AYUSH SINGH" display lettering inside the headline box
              ctx.font = `bold ${isMobile ? '32px' : '52px'} "Cinzel", "Space Grotesk", sans-serif`;
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * elementFactor})`;
              ctx.lineWidth = 1;
              ctx.strokeText('AYUSH SINGH', el.x + 16, el.y + (isMobile ? 42 : 62));
            } else if (el.id === 'cta_primary') {
              ctx.font = '600 11px "Space Grotesk", monospace';
              ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * elementFactor})`;
              ctx.fillText('EXPLORE PROJECTS →', el.x + 20, el.y + 28);
            } else if (el.id === 'cta_secondary') {
              ctx.font = '600 11px "Space Grotesk", monospace';
              ctx.fillStyle = `rgba(255, 90, 31, ${0.5 * elementFactor})`;
              ctx.fillText('ABOUT ME', el.x + 24, el.y + 28);
            } else {
              ctx.font = '500 9px "Space Grotesk", monospace';
              ctx.fillStyle = `rgba(255, 255, 255, ${0.25 * elementFactor})`;
              ctx.fillText(el.contentSnippet, el.x + 14, el.y + el.h / 2 + 3);
            }
          }

          ctx.restore();
        });

        // Dynamic CAD / Smart Alignment Guide Lines (Orange #ff5a1f & Titanium dashed rulers)
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 90, 31, 0.22)';
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 4]);

        // Horizontal Hero Alignment Axis
        const headlineY = Math.max(isMobile ? 208 : 170, cy - 148);
        ctx.beginPath();
        ctx.moveTo(0, headlineY);
        ctx.lineTo(width, headlineY);
        ctx.stroke();

        // Vertical Content Margin Guide
        ctx.beginPath();
        ctx.moveTo(contentLeft, 0);
        ctx.lineTo(contentLeft, height);
        ctx.stroke();

        // Bottom Ribbon Anchor Axis
        ctx.beginPath();
        ctx.moveTo(0, height - 58);
        ctx.lineTo(width, height - 58);
        ctx.stroke();

        ctx.setLineDash([]);

        // Show CAD Coordinate Point Tag: [x: 420, y: 180]
        ctx.fillStyle = 'rgba(10, 10, 14, 0.85)';
        ctx.strokeStyle = 'rgba(255, 90, 31, 0.4)';
        ctx.beginPath();
        ctx.roundRect(contentLeft + 8, headlineY - 22, 105, 16, 4);
        ctx.fill();
        ctx.stroke();

        ctx.font = '600 8.5px "Space Grotesk", monospace';
        ctx.fillStyle = '#ff5a1f';
        ctx.fillText(`[X: ${Math.round(contentLeft)}, Y: ${Math.round(headlineY)}]`, contentLeft + 14, headlineY - 11);

        ctx.restore();
      }

      // Update AI Swarm Agents Autonomous Physics & Trajectories (Zero Mouse Tracking)
      agents.forEach((agent) => {
        const el = heroElements[agent.assignedElementIndex % heroElements.length];

        if (phase === 1) {
          // Stage 1: Hovering in preparatory orbit around screen perimeter
          const hoverAngle = elapsed * 1.5 + agent.id;
          agent.targetX = cx + Math.cos(hoverAngle) * (Math.min(width, height) * 0.42);
          agent.targetY = cy + Math.sin(hoverAngle) * (Math.min(width, height) * 0.42);
        } else if (phase === 2) {
          // Stage 2: Autonomous construction movement tracing the element perimeter
          const wp = agent.waypoints[agent.currentWaypointIdx];
          agent.targetX = wp.x;
          agent.targetY = wp.y;

          const distToWp = Math.hypot(wp.x - agent.x, wp.y - agent.y);
          if (distToWp < 25) {
            // Reached corner waypoint; advance to next perimeter corner
            agent.currentWaypointIdx = (agent.currentWaypointIdx + 1) % agent.waypoints.length;
          }
        } else {
          // Stage 3: Smooth dispersal outward off-screen
          const exitAngle = (agent.id * Math.PI * 2) / agents.length;
          const exitDist = Math.max(width, height) * 0.9;
          agent.targetX = cx + Math.cos(exitAngle) * exitDist;
          agent.targetY = cy + Math.sin(exitAngle) * exitDist;
        }

        // Spring Velocity & Smoothing
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.hypot(dx, dy) || 0.01;

        const currentMaxSpeed = phase === 3 ? 1100 : agent.speed;
        const desiredVx = (dx / dist) * Math.min(dist * 6, currentMaxSpeed);
        const desiredVy = (dy / dist) * Math.min(dist * 6, currentMaxSpeed);

        agent.vx += (desiredVx - agent.vx) * 0.14;
        agent.vy += (desiredVy - agent.vy) * 0.14;

        agent.x += agent.vx * dt;
        agent.y += agent.vy * dt;

        // Angle facing movement trajectory
        const speed = Math.hypot(agent.vx, agent.vy);
        if (speed > 5) {
          const targetAngle = (Math.atan2(agent.vy, agent.vx) * 180) / Math.PI - 45;
          let diff = targetAngle - agent.angle;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          agent.angle += diff * 0.24;
        }

        // Draw Agent Trail
        agent.trail.unshift({ x: agent.x, y: agent.y });
        if (agent.trail.length > 8) agent.trail.pop();

        if (phase === 2 && agent.trail.length > 1) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
          for (let i = 1; i < agent.trail.length; i++) {
            ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
          }
          ctx.strokeStyle = agent.color === '#ff5a1f' ? 'rgba(255, 90, 31, 0.35)' : 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // Render Cursor
        drawAgentCursor(agent);
      });

      // Collaborative Agent Connecting Filaments
      if (phase === 2) {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < agents.length; i++) {
          for (let j = i + 1; j < agents.length; j++) {
            const a1 = agents[i];
            const a2 = agents[j];
            const d = Math.hypot(a2.x - a1.x, a2.y - a1.y);

            if (d < 140) {
              const alpha = (1 - d / 140) * 0.25;
              ctx.strokeStyle = a1.color === '#ff5a1f' || a2.color === '#ff5a1f'
                ? `rgba(255, 90, 31, ${alpha})`
                : `rgba(226, 232, 240, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.moveTo(a1.x, a1.y);
              ctx.lineTo(a2.x, a2.y);
            }
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      // Trigger Clean Exit at ~2.8s
      if (elapsed > 2.8 && !isCompletedRef.current) {
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

      // Award-winning seamless transition: loader dissolves directly into the real Hero section
      gsap.to(container, {
        opacity: 0,
        scale: 1.02,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    };

    // Keyboard shortcut [ESC] to skip
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
      style={{ willChange: 'opacity, transform' }}
      aria-label="AI Swarm Construction Boot Sequence"
    >
      {/* 60FPS Hardware Accelerated AI Swarm Construction Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Stage 1 Center Display: Minimal Technical Brand Interface */}
      <div
        ref={centerIdentityRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center transition-opacity duration-300"
      >
        {/* Subtle Specular Ambient Halo */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#ff5a1f]/12 via-white/5 to-transparent blur-[80px] pointer-events-none" />

        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-ping" />
          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.2em] uppercase">
            AYUSH SINGH
          </h1>
        </div>

        {/* Sub-Mark / KnoxxZone Reference */}
        <div className="mt-1 flex items-center gap-2">
          <span className="font-label-mono-sm text-[11px] text-white/40 tracking-[0.3em] uppercase">
            KNOXXZONE
          </span>
          <span className="text-white/20">•</span>
          <span className="font-label-mono-sm text-[11px] text-white/40 tracking-[0.2em] uppercase">
            AUTONOMOUS AI SYSTEMS
          </span>
        </div>

        {/* Telemetry Progress Pill */}
        <div className="mt-6 flex items-center gap-3 px-5 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl">
          <span
            ref={statusTextRef}
            className="font-label-mono-sm text-[10px] sm:text-[11px] text-white/70 uppercase tracking-widest"
          >
            SYSTEM INITIALIZING...
          </span>
          <span className="text-white/20">|</span>
          <span
            ref={progressTextRef}
            className="font-label-mono-sm text-[10px] sm:text-[11px] font-bold text-[#ff5a1f]"
          >
            0%
          </span>
        </div>

        {/* Small Monospace Hardware Stats */}
        <div
          ref={statsRef}
          className="mt-4 flex items-center gap-4 text-[9px] font-label-mono-sm text-white/30 uppercase tracking-widest"
        >
          <span>MEM: 64MB</span>
          <span>•</span>
          <span>SRM IST CHENNAI</span>
          <span>•</span>
          <span>AGENT PIPELINE: 14 CORES</span>
        </div>
      </div>

      {/* Top Header: Construction Telemetry & Fast Skip */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 font-label-mono-sm text-[11px] text-white/40 uppercase tracking-widest">
          <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/70">
            AI SWARM RECONSTRUCTION
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-white/50">HERO SECTION GENERATION</span>
        </div>

        {/* Fast-Forward Skip Button */}
        <button
          onClick={() => {
            if (containerRef.current && !isCompletedRef.current) {
              isCompletedRef.current = true;
              gsap.to(containerRef.current, {
                opacity: 0,
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
        <span>AGENTS: 14 ACTIVE // AUTONOMOUS</span>
        <span className="hidden sm:inline">BLUEPRINT: HERO.SECTION DOM // 1:1 RESOLUTION</span>
        <span className="text-[#ff5a1f]/70">STATUS: ASSEMBLING WIREFRAMES</span>
      </div>
    </div>
  );
};
