import React, { useEffect, useRef } from 'react';
import { ProjectTheme } from '../data/projects';

interface AmbientBackgroundProps {
  theme: ProjectTheme;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle floating ambient dust / particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Generate floating ambient particles
    const particleCount = Math.min(width < 768 ? 35 : 70, 80);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha breathing
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.03) {
          p.targetAlpha = Math.random() * 0.45 + 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Deep Spatial Gradient Base (Eliminates flat black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e14] via-[#070709] to-[#040406]" />

      {/* Primary Floating Volumetric Atmosphere Aura */}
      <div
        className="absolute top-[-20vw] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1300px] h-[75vw] max-h-[900px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-out animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${theme.glowBurgundy} 0%, ${theme.accentColor}15 45%, transparent 75%)`,
        }}
      />

      {/* Lateral Kinetic Accent Flare */}
      <div
        className="absolute top-[35%] -right-[15vw] w-[60vw] max-w-[900px] h-[60vw] max-h-[900px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${theme.glowAccent} 0%, ${theme.accentColor}10 40%, transparent 70%)`,
        }}
      />

      {/* Sub-Surface Atmosphere Sphere */}
      <div
        className="absolute bottom-[-15vw] -left-[15vw] w-[65vw] max-w-[950px] h-[65vw] max-h-[950px] rounded-full blur-[190px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${theme.glowBottom} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Digital Horizon Light Ray */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accentColor} 50%, transparent 100%)`,
        }}
      />

      {/* Canvas Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none mix-blend-screen"
      />

      {/* Procedural Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.035] film-grain pointer-events-none" />
    </div>
  );
};
