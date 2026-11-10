import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

export const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'button' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Persistent mutable refs for 60fps RAF loop without component re-renders
  const stateRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
    mode: 'default' as 'default' | 'button' | 'project' | 'text',
    isDown: false,
    visible: false,
    magneticTarget: null as HTMLElement | null,
  });

  useEffect(() => {
    // Strictly disable on touch / mobile devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const state = stateRef.current;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      if (!state.visible) {
        state.visible = true;
        setIsVisible(true);
        state.ringX = e.clientX;
        state.ringY = e.clientY;
      }

      // 1. Instant lead dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.mouseX}px, ${state.mouseY}px, 0)`;
      }

      // 2. Element detection
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]') || target.closest('.card-3d-target');
      const interactiveEl = target.closest<HTMLElement>('a, button, [role="button"], .btn-magnetic');
      const textEl = target.closest('h1, h2, h3, p');

      if (projectCard) {
        if (state.mode !== 'project') {
          state.mode = 'project';
          setCursorMode('project');
          setCursorText('VIEW PROJECT');
        }
        if (state.magneticTarget) {
          gsap.to(state.magneticTarget, { x: 0, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
          state.magneticTarget = null;
        }
      } else if (interactiveEl) {
        if (state.mode !== 'button') {
          state.mode = 'button';
          setCursorMode('button');
          setCursorText('');
        }

        // Magnetic attraction calculation
        state.magneticTarget = interactiveEl;
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = state.mouseX - centerX;
        const dy = state.mouseY - centerY;

        gsap.to(interactiveEl, {
          x: dx * 0.22,
          y: dy * 0.22,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else if (textEl) {
        if (state.mode !== 'text') {
          state.mode = 'text';
          setCursorMode('text');
          setCursorText('');
        }
        if (state.magneticTarget) {
          gsap.to(state.magneticTarget, { x: 0, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
          state.magneticTarget = null;
        }
      } else {
        if (state.mode !== 'default') {
          state.mode = 'default';
          setCursorMode('default');
          setCursorText('');
        }
        if (state.magneticTarget) {
          gsap.to(state.magneticTarget, { x: 0, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
          state.magneticTarget = null;
        }
      }
    };

    const onMouseDown = () => {
      state.isDown = true;
      setIsMouseDown(true);
    };

    const onMouseUp = () => {
      state.isDown = false;
      setIsMouseDown(false);
    };

    const onMouseLeaveDoc = () => {
      state.visible = false;
      setIsVisible(false);
      if (state.magneticTarget) {
        gsap.to(state.magneticTarget, { x: 0, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
        state.magneticTarget = null;
      }
    };

    const onMouseEnterDoc = () => {
      state.visible = true;
      setIsVisible(true);
    };

    // Smooth physics loop with spring-like inertia
    const render = () => {
      let targetX = state.mouseX;
      let targetY = state.mouseY;

      // When over an interactive button, pull the trailing ring towards button center
      if (state.mode === 'button' && state.magneticTarget) {
        const rect = state.magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = state.mouseX * 0.35 + centerX * 0.65;
        targetY = state.mouseY * 0.35 + centerY * 0.65;
      }

      // Fluid interpolation factor (0.13 for calm luxury feel)
      state.ringX += (targetX - state.ringX) * 0.13;
      state.ringY += (targetY - state.ringY) * 0.13;

      if (ringRef.current) {
        const scale = state.isDown ? 0.88 : 1;
        ringRef.current.style.transform = `translate3d(${state.ringX.toFixed(2)}px, ${state.ringY.toFixed(2)}px, 0) scale(${scale})`;
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
      if (state.magneticTarget) {
        gsap.to(state.magneticTarget, { x: 0, y: 0, duration: 0.2, overwrite: 'auto' });
      }
    };
  }, []); // Run once!

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
        className={`fixed top-0 left-0 flex items-center justify-center will-change-transform transition-[width,height,margin,border-color,background-color,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
          <span className="inline-flex items-center gap-1.5 font-label-mono-sm text-[10px] font-bold text-[#2dd4bf] tracking-wider select-none uppercase">
            <span>{cursorText}</span>
            <ArrowUpRight className="w-3 h-3 text-[#2dd4bf]" />
          </span>
        )}
      </div>
    </div>
  );
};
