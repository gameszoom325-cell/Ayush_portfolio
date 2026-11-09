import React, { useEffect, useRef } from 'react';

interface Agent {
  id: number;
  name: string;
  color: string;
  accentColor: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  force: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  curl: number;
  trail: { x: number; y: number }[];
  el: HTMLDivElement | null;
  svgEl: SVGElement | null;
}

type HoverState = 'default' | 'button' | 'image' | 'link';

// Swarm Rebuild authentic Figma cursor arrow path (from swarm.js)
const ARROW_PATH =
  'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z';

export const SwarmCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    onResize();
    window.addEventListener('resize', onResize);

    // Mouse coordinates (client viewport)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    let mouseSpeed = 0;

    let hoverState: HoverState = 'default';
    let magneticCenterX = mouseX;
    let magneticCenterY = mouseY;

    // Leader cursor position (smooth spring)
    let leaderX = mouseX;
    let leaderY = mouseY;
    let leaderAngle = 0;

    // Portfolio-native Swarm agents (Black/Titanium/Cyan luxury palette)
    const agentConfigs = [
      { name: 'Ayush.AI', color: '#2dd4bf', accent: '#0f766e' },
      { name: 'Architect', color: '#FFFFFF', accent: '#94A3B8' },
      { name: 'Systems', color: '#38bdf8', accent: '#0284c7' },
      { name: 'ML.Core', color: '#E2E8F0', accent: '#64748B' },
      { name: 'Spatial.GIS', color: '#A855F7', accent: '#7E22CE' },
      { name: 'Vercel.Ops', color: '#5EEAD4', accent: '#14B8A6' },
      { name: 'Web.App', color: '#F1F5F9', accent: '#CBD5E1' },
      { name: 'Neural', color: '#818CF8', accent: '#4F46E5' },
    ];

    const agents: Agent[] = [];

    // Instantiate DOM cursor agents inside the fixed container
    container.innerHTML = '';

    // Create Main Leader Cursor DOM element
    const leaderEl = document.createElement('div');
    leaderEl.style.position = 'absolute';
    leaderEl.style.top = '0';
    leaderEl.style.left = '0';
    leaderEl.style.willChange = 'transform';
    leaderEl.style.pointerEvents = 'none';
    leaderEl.style.zIndex = '100';
    leaderEl.innerHTML = `
      <div style="position: relative; transform: translate3d(-5px, -3.5px, 0);">
        <svg width="24" height="24" viewBox="0 0 24 24" style="overflow: visible; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));">
          <path d="${ARROW_PATH}" fill="#FFFFFF" stroke="#070709" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
    container.appendChild(leaderEl);

    // Create Swarm Follower Agent DOM elements
    agentConfigs.forEach((cfg, idx) => {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
      el.style.willChange = 'transform';
      el.style.pointerEvents = 'none';
      el.style.zIndex = String(50 - idx);

      el.innerHTML = `
        <div class="agent-wrapper" style="position: relative; transform: translate3d(-5px, -3.5px, 0); display: flex; align-items: center;">
          <svg class="agent-svg" width="22" height="22" viewBox="0 0 24 24" style="overflow: visible; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.7)); transform-origin: 5px 3.5px;">
            <path d="${ARROW_PATH}" fill="${cfg.color}" stroke="#FFFFFF" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
          <div class="agent-badge" style="margin-left: 2px; margin-top: 14px; background: rgba(10, 10, 14, 0.88); border: 1px solid rgba(255, 255, 255, 0.14); backdrop-filter: blur(8px); padding: 2px 6px; border-radius: 9999px; font-family: monospace; font-size: 9px; font-weight: 600; color: ${cfg.color}; letter-spacing: 0.05em; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.5); opacity: 0.85;">
            ${cfg.name}
          </div>
        </div>
      `;
      container.appendChild(el);

      const svgEl = el.querySelector('.agent-svg') as SVGElement | null;

      agents.push({
        id: idx,
        name: cfg.name,
        color: cfg.color,
        accentColor: cfg.accent,
        x: mouseX + (Math.random() - 0.5) * 60,
        y: mouseY + (Math.random() - 0.5) * 60,
        vx: 0,
        vy: 0,
        angle: 0,
        speed: 700 + Math.random() * 400,
        force: 2000 + Math.random() * 1500,
        orbitRadius: 40 + idx * 7,
        orbitAngle: (idx * (Math.PI * 2)) / agentConfigs.length,
        orbitSpeed: (0.025 + (idx % 3) * 0.012) * (idx % 2 === 0 ? 1 : -1),
        curl: (Math.random() - 0.5) * 1.5,
        trail: [],
        el,
        svgEl,
      });
    });

    // Real mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      mouseVelocityX = mouseX - prevMouseX;
      mouseVelocityY = mouseY - prevMouseY;
      mouseSpeed = Math.hypot(mouseVelocityX, mouseVelocityY);

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    // Contextual Hover Detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const buttonEl = target.closest('button, [role="button"], .glass-pill, input[type="submit"]');
      const imageEl = target.closest('img, picture, [data-project-card], .aspect-\\[16\\/10\\], .aspect-\\[16\\/9\\]');
      const linkEl = target.closest('a, [role="link"], .interactive');

      if (buttonEl) {
        hoverState = 'button';
        const rect = buttonEl.getBoundingClientRect();
        magneticCenterX = rect.left + rect.width / 2;
        magneticCenterY = rect.top + rect.height / 2;
      } else if (imageEl) {
        hoverState = 'image';
      } else if (linkEl) {
        hoverState = 'link';
      } else {
        hoverState = 'default';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true, capture: true });

    let t = 0;
    let lastTime = performance.now();

    // 60-120 FPS Physics Render Loop
    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // delta time clamped
      lastTime = now;
      t += dt * 2;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Update Leader Cursor (Spring toward target)
      let targetX = mouseX;
      let targetY = mouseY;

      if (hoverState === 'button') {
        // Magnetic pull toward button center
        targetX = magneticCenterX * 0.4 + mouseX * 0.6;
        targetY = magneticCenterY * 0.4 + mouseY * 0.6;
      }

      leaderX += (targetX - leaderX) * 0.45;
      leaderY += (targetY - leaderY) * 0.45;

      // Leader orientation angle based on velocity
      if (mouseSpeed > 1) {
        const targetAngle = (Math.atan2(mouseVelocityY, mouseVelocityX) * 180) / Math.PI - 45;
        let diff = targetAngle - leaderAngle;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        leaderAngle += diff * 0.25;
      } else {
        leaderAngle += (0 - leaderAngle) * 0.1;
      }

      // Update Leader DOM position with translate3d
      leaderEl.style.transform = `translate3d(${leaderX}px, ${leaderY}px, 0) rotate(${leaderAngle}deg)`;

      // 2. Swarm Flocking Physics (Adapted from Swarm Rebuild Boids algorithm)
      // Radius scaling based on state
      let scale = 1.0;
      if (hoverState === 'button') scale = 0.55; // Tightly gathered orbit around button
      if (hoverState === 'image') scale = 1.7;  // Wide observational perimeter around image

      const R = 75 * scale * (1 + 0.15 * Math.sin(t * 1.8));
      const swirl = Math.tanh(Math.cos(t * 0.8) * 3);

      for (let i = 0; i < agents.length; i++) {
        const c = agents[i];
        c.orbitAngle += c.orbitSpeed;

        // Vector from target to agent
        const vx = c.x - leaderX;
        const vy = c.y - leaderY;
        const dist = Math.hypot(vx, vy) || 0.01;
        const nx = vx / dist;
        const ny = vy / dist;
        const ang = Math.atan2(vy, vx);

        // Desired orbital radius
        const offset = (c.orbitRadius - 60) * 0.6 * scale;
        const rr = R * (1 + 0.25 * Math.sin(3 * ang + t * 1.5)) + offset;

        // Tangential swirl & radial spring forces
        const tang = 280 * (0.8 + (i % 3) * 0.2) * swirl;
        const rad = Math.min(Math.max((rr - dist) * 4.5, -2200), 1200);

        // Slipstream trail offset when mouse is moving fast
        const isTrailing = mouseSpeed > 2;
        const trailBackX = isTrailing ? -mouseVelocityX * (1.5 + i * 0.8) : 0;
        const trailBackY = isTrailing ? -mouseVelocityY * (1.5 + i * 0.8) : 0;

        let fx = -ny * tang + nx * rad + trailBackX * 18;
        let fy = nx * tang + ny * rad + trailBackY * 18;

        // Separation force from other agents
        for (let j = 0; j < agents.length; j++) {
          if (j === i) continue;
          const other = agents[j];
          const od = Math.hypot(other.x - c.x, other.y - c.y);
          if (od < 42 && od > 0.01) {
            const repulse = (1 - od / 42) * 350;
            fx -= ((other.x - c.x) / od) * repulse;
            fy -= ((other.y - c.y) / od) * repulse;
          }
        }

        // Apply Acceleration & Max Speed limits
        const maxV = (c.speed * (1.1 + Math.min(2.5, dist / 80))) * (hoverState === 'button' ? 1.4 : 1.0);
        const forceLen = Math.hypot(fx, fy);
        if (forceLen > maxV) {
          fx *= maxV / forceLen;
          fy *= maxV / forceLen;
        }

        let gx = (fx - c.vx) * 7.5;
        let gy = (fy - c.vy) * 7.5;

        const maxF = c.force * (1.2 + Math.min(3.5, dist / 40));
        const gLen = Math.hypot(gx, gy);
        if (gLen > maxF) {
          gx *= maxF / gLen;
          gy *= maxF / gLen;
        }

        c.vx += gx * dt;
        c.vy += gy * dt;

        c.x += c.vx * dt;
        c.y += c.vy * dt;

        // Dynamic Agent Orientation Angle (Facing velocity vector)
        const agentSpeed = Math.hypot(c.vx, c.vy);
        if (agentSpeed > 15) {
          const targetAng = (Math.atan2(c.vy, c.vx) * 180) / Math.PI - 45;
          let diff = targetAng - c.angle;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          c.angle += diff * 0.2;
        } else {
          c.angle += (0 - c.angle) * 0.08;
        }

        // Update DOM transform: translate3d for GPU acceleration
        if (c.el) {
          c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
        }
        if (c.svgEl) {
          c.svgEl.style.transform = `rotate(${c.angle}deg)`;
        }

        // Push trail
        c.trail.unshift({ x: c.x, y: c.y });
        if (c.trail.length > 6) c.trail.pop();
      }

      // 3. Draw Connecting Swarm Filaments (The Canvas Mesh)
      ctx.beginPath();
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a1 = agents[i];
          const a2 = agents[j];
          const dist = Math.hypot(a2.x - a1.x, a2.y - a1.y);

          const maxDist = hoverState === 'image' ? 95 : 65;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = hoverState === 'button'
              ? `rgba(45, 212, 191, ${alpha * 1.5})`
              : `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(a2.x, a2.y);
          }
        }
      }
      ctx.stroke();

      // 4. Draw Connecting Filaments from Agents to Leader
      ctx.beginPath();
      for (let i = 0; i < agents.length; i++) {
        const c = agents[i];
        const dist = Math.hypot(leaderX - c.x, leaderY - c.y);
        if (dist < 85) {
          const alpha = (1 - dist / 85) * 0.32;
          ctx.strokeStyle = hoverState === 'button'
            ? `rgba(45, 212, 191, ${alpha * 1.4})`
            : `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(leaderX, leaderY);
          ctx.lineTo(c.x, c.y);
        }
      }
      ctx.stroke();

      // 5. Draw Faint Particle Sparks along Agent Trails
      for (let i = 0; i < agents.length; i++) {
        const c = agents[i];
        for (let k = 1; k < c.trail.length; k++) {
          const pt = c.trail[k];
          const alpha = (1 - k / c.trail.length) * 0.22;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // Velocity decay
      mouseSpeed *= 0.92;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove, { capture: true });
      document.removeEventListener('mouseover', onMouseOver, { capture: true });
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Background Canvas for connecting filaments and particle sparks */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Hardware-Accelerated DOM Container for Multiplayer Cursor Agents */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
