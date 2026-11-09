import React, { useEffect, useRef } from 'react';

interface SwarmParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  mass: number;
  drag: number;
  spring: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

type CursorMode = 'default' | 'button' | 'image' | 'link';

export const SwarmCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    // Mouse coordinates (client coords)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVelocity = 0;
    let isMouseOnScreen = false;
    let globalOpacity = 0;

    // Interaction target & mode
    let currentMode: CursorMode = 'default';
    let targetElementRect: DOMRect | null = null;
    let magneticCenterX = mouseX;
    let magneticCenterY = mouseY;

    // Leader Core position (smooth lerp)
    let leaderX = mouseX;
    let leaderY = mouseY;

    // Swarm particles configuration (14 follower particles for optimal luxury feel)
    const PARTICLE_COUNT = 14;
    const particles: SwarmParticle[] = [];

    // Titanium & Silver Palette (Obsidian theme compliant, zero RGB)
    const particleColors = [
      'rgba(255, 255, 255, 0.95)', // Pure White Spark
      'rgba(226, 232, 240, 0.85)', // Titanium
      'rgba(203, 213, 225, 0.75)', // Platinum
      'rgba(148, 163, 184, 0.70)', // Titanium Slate
      'rgba(45, 212, 191, 0.85)',  // Subtle Cyan Tip Accent
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isLeadSatellite = i < 3;
      const size = isLeadSatellite ? 3.2 : Math.max(1.5, 3.0 - i * 0.14);
      const colorIndex = i === 0 ? 4 : i % 4;

      particles.push({
        x: mouseX + (Math.random() - 0.5) * 20,
        y: mouseY + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0,
        size,
        baseSize: size,
        mass: 1.0 + i * 0.18, // Heavier particles lag slightly more
        drag: 0.78 + (i % 3) * 0.03,
        spring: 0.045 - i * 0.0018,
        orbitAngle: (i * (Math.PI * 2)) / PARTICLE_COUNT,
        orbitRadius: 10 + i * 2.2,
        orbitSpeed: (0.02 + (i % 4) * 0.008) * (i % 2 === 0 ? 1 : -1),
        alpha: 0.8 - i * 0.03,
        baseAlpha: 0.8 - i * 0.03,
        color: particleColors[colorIndex],
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;

      // Track velocity
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      mouseVelocity = Math.hypot(dx, dy);
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const onMouseEnter = () => {
      isMouseOnScreen = true;
    };

    const onMouseLeave = () => {
      isMouseOnScreen = false;
      targetElementRect = null;
      currentMode = 'default';
    };

    // Interactive Hover Detection (Magnetic Button, Image Expansion, Link Vector)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const buttonEl = target.closest('button, [role="button"], .glass-pill, input[type="submit"]');
      const imageEl = target.closest('img, picture, [data-project-card], .aspect-\\[16\\/10\\], .aspect-\\[16\\/9\\]');
      const linkEl = target.closest('a, [role="link"], .interactive');

      if (buttonEl) {
        currentMode = 'button';
        targetElementRect = buttonEl.getBoundingClientRect();
      } else if (imageEl) {
        currentMode = 'image';
        targetElementRect = imageEl.getBoundingClientRect();
      } else if (linkEl) {
        currentMode = 'link';
        targetElementRect = linkEl.getBoundingClientRect();
      } else {
        currentMode = 'default';
        targetElementRect = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    let t = 0;

    // 60FPS Physics Render Loop
    const render = () => {
      t += 0.04;
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Fade in/out when entering or leaving viewport
      if (isMouseOnScreen) {
        globalOpacity += (1 - globalOpacity) * 0.12;
      } else {
        globalOpacity += (0 - globalOpacity) * 0.1;
      }

      if (globalOpacity < 0.01) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = globalOpacity;

      // Calculate magnetic target center
      if (currentMode === 'button' && targetElementRect) {
        // Magnetic pull toward button center
        const bx = targetElementRect.left + targetElementRect.width / 2;
        const by = targetElementRect.top + targetElementRect.height / 2;
        // Blend between mouse and button center (magnetic spring effect)
        magneticCenterX += (bx * 0.4 + mouseX * 0.6 - magneticCenterX) * 0.2;
        magneticCenterY += (by * 0.4 + mouseY * 0.6 - magneticCenterY) * 0.2;
      } else {
        magneticCenterX += (mouseX - magneticCenterX) * 0.35;
        magneticCenterY += (mouseY - magneticCenterY) * 0.35;
      }

      // Smooth Leader Position
      leaderX += (magneticCenterX - leaderX) * 0.4;
      leaderY += (magneticCenterY - leaderY) * 0.4;

      // 1. Draw Leader Core Reticle
      ctx.beginPath();
      ctx.arc(leaderX, leaderY, currentMode === 'image' ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Leader outer halo ring
      const ringRadius =
        currentMode === 'image'
          ? 28
          : currentMode === 'button'
          ? 20
          : currentMode === 'link'
          ? 16
          : 12;

      ctx.beginPath();
      ctx.arc(leaderX, leaderY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle =
        currentMode === 'button'
          ? 'rgba(45, 212, 191, 0.45)'
          : currentMode === 'image'
          ? 'rgba(226, 232, 240, 0.35)'
          : 'rgba(226, 232, 240, 0.2)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // If in image inspection mode, add 4 subtle corner viewfinder ticks
      if (currentMode === 'image') {
        const tick = 6;
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(leaderX - ringRadius - tick, leaderY - ringRadius);
        ctx.lineTo(leaderX - ringRadius, leaderY - ringRadius);
        ctx.lineTo(leaderX - ringRadius, leaderY - ringRadius - tick);
        // Top-right
        ctx.moveTo(leaderX + ringRadius + tick, leaderY - ringRadius);
        ctx.lineTo(leaderX + ringRadius, leaderY - ringRadius);
        ctx.lineTo(leaderX + ringRadius, leaderY - ringRadius - tick);
        // Bottom-left
        ctx.moveTo(leaderX - ringRadius - tick, leaderY + ringRadius);
        ctx.lineTo(leaderX - ringRadius, leaderY + ringRadius);
        ctx.lineTo(leaderX - ringRadius, leaderY + ringRadius + tick);
        // Bottom-right
        ctx.moveTo(leaderX + ringRadius + tick, leaderY + ringRadius);
        ctx.lineTo(leaderX + ringRadius, leaderY + ringRadius);
        ctx.lineTo(leaderX + ringRadius, leaderY + ringRadius + tick);
        ctx.stroke();
      }

      // 2. Update and simulate Swarm Particles (Physics & Flocking)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.orbitAngle += p.orbitSpeed;

        // Determine swarm radius & dispersion based on mode
        let targetOrbitRadius = p.orbitRadius;
        if (currentMode === 'image') {
          targetOrbitRadius = 35 + i * 2.8; // Expand into wide lens
        } else if (currentMode === 'button') {
          targetOrbitRadius = 14 + (i % 4) * 2.5; // Gather tightly around button
        } else if (currentMode === 'link') {
          targetOrbitRadius = 8 + (i % 3) * 3;
        }

        // Swarm target calculation:
        // When moving fast: particles trail behind in an aerodynamic slipstream
        // When slow/idle: particles orbit in harmonic breathing constellation
        const isMoving = mouseVelocity > 1.8;
        const trailLag = isMoving ? (i + 1) * 3.5 : 0;
        const trailAngle = isMoving
          ? Math.atan2(leaderY - prevMouseY, leaderX - prevMouseX) + Math.PI
          : 0;

        const targetX =
          leaderX +
          Math.cos(p.orbitAngle) * targetOrbitRadius +
          Math.cos(trailAngle) * trailLag;
        const targetY =
          leaderY +
          Math.sin(p.orbitAngle) * targetOrbitRadius +
          Math.sin(trailAngle) * trailLag;

        // Spring acceleration toward target
        const ax = (targetX - p.x) * p.spring;
        const ay = (targetY - p.y) * p.spring;

        p.vx = (p.vx + ax) * p.drag;
        p.vy = (p.vy + ay) * p.drag;

        p.x += p.vx;
        p.y += p.vy;

        // Scale sizing and alpha according to mode
        if (currentMode === 'button') {
          p.size += (p.baseSize * 1.15 - p.size) * 0.1;
          p.alpha += (0.9 - p.alpha) * 0.1;
        } else if (currentMode === 'image') {
          p.size += (p.baseSize * 0.9 - p.size) * 0.1;
          p.alpha += (0.6 - p.alpha) * 0.1;
        } else {
          p.size += (p.baseSize - p.size) * 0.1;
          p.alpha += (p.baseAlpha - p.alpha) * 0.1;
        }
      }

      // 3. Draw Connecting Swarm Filaments (The "Swarm Rebuild" Micro-Mesh)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          const maxDist = currentMode === 'image' ? 55 : 38;
          if (dist < maxDist) {
            const meshAlpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle =
              currentMode === 'button'
                ? `rgba(45, 212, 191, ${meshAlpha * 1.5})`
                : `rgba(226, 232, 240, ${meshAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 4. Draw Connecting Leader Filaments
      ctx.beginPath();
      for (let i = 0; i < Math.min(6, particles.length); i++) {
        const p = particles[i];
        const dist = Math.hypot(leaderX - p.x, leaderY - p.y);
        if (dist < 45) {
          const lAlpha = (1 - dist / 45) * 0.25;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(leaderX, leaderY);
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();

      // 5. Render Individual Swarm Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = globalOpacity * p.alpha;
        ctx.fill();
      }

      ctx.restore();

      // Decay velocity slowly
      mouseVelocity *= 0.92;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] hidden md:block"
      aria-hidden="true"
    />
  );
};
