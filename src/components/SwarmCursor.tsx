import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  glowColor: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

type HoverMode = 'default' | 'button' | 'image' | 'link';

export const SwarmCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasSize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initial mouse coordinates
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseSpeed = 0;
    let hasMoved = false;

    // Leader position (smooth lerp)
    let leaderX = mouseX;
    let leaderY = mouseY;

    // Hover state
    let hoverMode: HoverMode = 'default';
    let targetMagneticX = mouseX;
    let targetMagneticY = mouseY;

    // 14 Swarm follower particles
    const PARTICLE_COUNT = 14;
    const particles: Particle[] = [];

    // Luminous Titanium & Platinum Palette with Cyan Highlights
    const palette = [
      { color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.8)' },   // Vibrant Cyan Leader Satellite
      { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.9)' },   // Radiant White Spark
      { color: '#F1F5F9', glow: 'rgba(241, 245, 249, 0.7)' },   // Platinum Silver
      { color: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.6)' },   // Titanium
      { color: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.5)' },   // Slate Silver
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pColor = i === 0 ? palette[0] : palette[i % palette.length];
      const baseSize = i === 0 ? 5.0 : Math.max(2.2, 4.5 - i * 0.18);

      particles.push({
        x: mouseX,
        y: mouseY,
        vx: 0,
        vy: 0,
        size: baseSize,
        color: pColor.color,
        glowColor: pColor.glow,
        orbitAngle: (i * (Math.PI * 2)) / PARTICLE_COUNT,
        orbitRadius: 12 + i * 2.2,
        orbitSpeed: (0.025 + (i % 3) * 0.01) * (i % 2 === 0 ? 1 : -1),
      });
    }

    // Trail history for leader
    const trailLength = 8;
    const leaderTrail: { x: number; y: number }[] = [];

    // Mouse Tracking (Global window capture)
    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      mouseSpeed = Math.hypot(dx, dy);
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    // Hover Target Detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const buttonEl = target.closest('button, [role="button"], .glass-pill, input[type="submit"]');
      const imageEl = target.closest('img, picture, [data-project-card], .aspect-\\[16\\/10\\], .aspect-\\[16\\/9\\]');
      const linkEl = target.closest('a, [role="link"], .interactive');

      if (buttonEl) {
        hoverMode = 'button';
        const rect = buttonEl.getBoundingClientRect();
        targetMagneticX = rect.left + rect.width / 2;
        targetMagneticY = rect.top + rect.height / 2;
      } else if (imageEl) {
        hoverMode = 'image';
      } else if (linkEl) {
        hoverMode = 'link';
      } else {
        hoverMode = 'default';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true, capture: true });

    let t = 0;

    // Render loop (60+ FPS)
    const render = () => {
      t += 0.04;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Magnetic blending when over buttons
      if (hoverMode === 'button') {
        leaderX += (targetMagneticX * 0.35 + mouseX * 0.65 - leaderX) * 0.25;
        leaderY += (targetMagneticY * 0.35 + mouseY * 0.65 - leaderY) * 0.25;
      } else {
        leaderX += (mouseX - leaderX) * 0.35;
        leaderY += (mouseY - leaderY) * 0.35;
      }

      // Record leader trail
      leaderTrail.unshift({ x: leaderX, y: leaderY });
      if (leaderTrail.length > trailLength) leaderTrail.pop();

      // 1. Draw Flowing Leader Trail Ribbon
      if (leaderTrail.length > 2) {
        ctx.beginPath();
        ctx.moveTo(leaderTrail[0].x, leaderTrail[0].y);
        for (let i = 1; i < leaderTrail.length; i++) {
          ctx.lineTo(leaderTrail[i].x, leaderTrail[i].y);
        }
        ctx.strokeStyle = hoverMode === 'button'
          ? 'rgba(45, 212, 191, 0.25)'
          : 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 2. Draw Main Leader Reticle & Core
      // Main Center Core
      ctx.beginPath();
      ctx.arc(leaderX, leaderY, hoverMode === 'image' ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#2dd4bf';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Leader Precision Outer Ring
      let ringRadius = 14;
      if (hoverMode === 'button') ringRadius = 24;
      if (hoverMode === 'image') ringRadius = 32;
      if (hoverMode === 'link') ringRadius = 18;

      ctx.beginPath();
      ctx.arc(leaderX, leaderY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = hoverMode === 'button'
        ? 'rgba(45, 212, 191, 0.65)'
        : hoverMode === 'image'
        ? 'rgba(226, 232, 240, 0.55)'
        : 'rgba(226, 232, 240, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Viewfinder ticks for Image Inspection Mode
      if (hoverMode === 'image') {
        const tick = 7;
        ctx.strokeStyle = '#2dd4bf';
        ctx.lineWidth = 1.25;
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

      // 3. Update Swarm Particles with Elastic Following & Flocking
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.orbitAngle += p.orbitSpeed;

        // Radius & Dispersion adaptation
        let currentRadius = p.orbitRadius;
        if (hoverMode === 'image') {
          currentRadius = 35 + i * 3.0; // Wide expansive constellation
        } else if (hoverMode === 'button') {
          currentRadius = 16 + (i % 3) * 3.5; // Tightly gathered orbit around button
        } else if (hoverMode === 'link') {
          currentRadius = 10 + (i % 2) * 4;
        }

        // Parent target: particle follows the previous particle or leader for smooth chain/swarm effect
        const parentX = i === 0 ? leaderX : particles[i - 1].x;
        const parentY = i === 0 ? leaderY : particles[i - 1].y;

        // Organic harmonic breathing offset
        const breathX = Math.cos(p.orbitAngle + t) * currentRadius;
        const breathY = Math.sin(p.orbitAngle + t) * currentRadius;

        // Velocity-based slipstream drag
        const isFast = mouseSpeed > 2;
        const lagX = isFast ? (mouseX - prevMouseX) * -2.5 : 0;
        const lagY = isFast ? (mouseY - prevMouseY) * -2.5 : 0;

        const targetX = parentX * 0.7 + leaderX * 0.3 + breathX + lagX;
        const targetY = parentY * 0.7 + leaderY * 0.3 + breathY + lagY;

        // Smooth physics spring/lerp
        const spring = hoverMode === 'button' ? 0.22 : 0.16 - i * 0.006;
        p.vx = (targetX - p.x) * spring;
        p.vy = (targetY - p.y) * spring;

        p.x += p.vx;
        p.y += p.vy;
      }

      // 4. Draw Connecting Micro-Mesh Filaments (Swarm Rebuild signature)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          const maxDist = hoverMode === 'image' ? 55 : 42;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = hoverMode === 'button'
              ? `rgba(45, 212, 191, ${alpha * 1.5})`
              : `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 5. Connecting Filaments to Leader
      ctx.beginPath();
      for (let i = 0; i < Math.min(5, particles.length); i++) {
        const p = particles[i];
        const dist = Math.hypot(leaderX - p.x, leaderY - p.y);
        if (dist < 50) {
          const alpha = (1 - dist / 50) * 0.4;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(leaderX, leaderY);
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();

      // 6. Draw Individual Swarm Particle Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      mouseSpeed *= 0.9;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', onMouseMove, { capture: true });
      document.removeEventListener('mouseover', onMouseOver, { capture: true });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
      aria-hidden="true"
    />
  );
};
