import React, { useEffect, useRef, useState } from 'react';

export const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'button' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only mount for fine pointer devices (desktops/laptops with mouse)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Direct instant dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Detect hover target personality
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]') || target.closest('.card-3d-target');
      const interactiveEl = target.closest('a, button, [role="button"]');
      const textEl = target.closest('p, h1, h2, h3');

      if (projectCard) {
        setCursorMode('project');
        setCursorText('VIEW');
      } else if (interactiveEl) {
        setCursorMode('button');
        setCursorText('');
      } else if (textEl && !interactiveEl) {
        setCursorMode('text');
        setCursorText('');
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth physics loop for trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[90] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Lead Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf] will-change-transform"
      />

      {/* Trailing Morphing Lens Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex items-center justify-center rounded-full will-change-transform transition-[width,height,margin,border-color,background-color] duration-200 ease-out ${
          cursorMode === 'project'
            ? 'w-20 h-20 -ml-10 -mt-10 border border-[#2dd4bf]/80 bg-[#070709]/75 backdrop-blur-md shadow-[0_0_20px_rgba(45,212,191,0.25)]'
            : cursorMode === 'button'
            ? 'w-12 h-12 -ml-6 -mt-6 border border-white/60 bg-white/[0.08] backdrop-blur-[2px]'
            : cursorMode === 'text'
            ? 'w-4 h-7 -ml-2 -mt-3.5 rounded-sm border border-white/40 bg-white/[0.05]'
            : 'w-10 h-10 -ml-5 -mt-5 border border-white/20 bg-transparent'
        }`}
      >
        {cursorMode === 'project' && (
          <span
            ref={textRef}
            className="font-label-mono-sm text-[10px] font-bold text-[#2dd4bf] tracking-widest select-none animate-in fade-in duration-150"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
