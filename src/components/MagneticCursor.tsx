import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'button' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // Only mount for fine pointer devices (desktops/laptops with mouse)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let magneticTarget: HTMLElement | null = null;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant lead dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Detect hover target personality
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]') || target.closest('.card-3d-target');
      const interactiveEl = target.closest<HTMLElement>('a, button, [role="button"], .btn-magnetic');
      const textEl = target.closest('p, h1, h2, h3');

      if (projectCard) {
        setCursorMode('project');
        setCursorText('VIEW PROJECT');
        // Clear any magnetic button pull
        if (magneticTarget && magneticTarget !== interactiveEl) {
          magneticTarget.style.transform = '';
          magneticTarget = null;
        }
      } else if (interactiveEl) {
        setCursorMode('button');
        setCursorText('');
        
        // Physical magnetic pull calculation
        magneticTarget = interactiveEl;
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        // Subtle displacement on the interactive element
        interactiveEl.style.transform = `translate3d(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.18).toFixed(1)}px, 0)`;
      } else if (textEl) {
        setCursorMode('text');
        setCursorText('');
        if (magneticTarget) {
          magneticTarget.style.transform = '';
          magneticTarget = null;
        }
      } else {
        setCursorMode('default');
        setCursorText('');
        if (magneticTarget) {
          magneticTarget.style.transform = '';
          magneticTarget = null;
        }
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseLeaveDoc = () => {
      setIsVisible(false);
      if (magneticTarget) {
        magneticTarget.style.transform = '';
        magneticTarget = null;
      }
    };

    const onMouseEnterDoc = () => {
      setIsVisible(true);
    };

    // Smooth inertial spring physics loop for trailing ring
    const render = () => {
      let targetX = mouseX;
      let targetY = mouseY;

      // If magnetically pulled to a button, bias ring position towards element center
      if (cursorMode === 'button' && magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = mouseX * 0.4 + centerX * 0.6;
        targetY = mouseY * 0.4 + centerY * 0.6;
      }

      // Smooth lerp (0.13)
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) scale(${
          isMouseDown ? 0.88 : 1
        })`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    document.addEventListener('mouseenter', onMouseEnterDoc);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      cancelAnimationFrame(animId);
      if (magneticTarget) {
        magneticTarget.style.transform = '';
      }
    };
  }, [isVisible, cursorMode, isMouseDown]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[95] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Lead Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf] will-change-transform"
      />

      {/* Trailing Inertial Morphing Lens Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center will-change-transform transition-[width,height,margin,border-color,background-color,border-radius] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          cursorMode === 'project'
            ? 'w-32 h-10 -ml-16 -mt-5 rounded-full border border-[#2dd4bf]/70 bg-[#070709]/85 backdrop-blur-md shadow-[0_0_25px_rgba(45,212,191,0.25)]'
            : cursorMode === 'button'
            ? 'w-14 h-14 -ml-7 -mt-7 rounded-full border border-white/60 bg-white/[0.08] backdrop-blur-[2px]'
            : cursorMode === 'text'
            ? 'w-6 h-6 -ml-3 -mt-3 rounded-full border border-white/30 bg-white/[0.04]'
            : 'w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/25 bg-transparent'
        }`}
      >
        {cursorMode === 'project' && (
          <span
            ref={textRef}
            className="inline-flex items-center gap-1.5 font-label-mono-sm text-[10px] font-bold text-[#2dd4bf] tracking-wider select-none animate-in fade-in duration-150 uppercase"
          >
            <span>{cursorText}</span>
            <ArrowUpRight className="w-3 h-3 text-[#2dd4bf]" />
          </span>
        )}
      </div>
    </div>
  );
};
