import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, Project, ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  activeTheme?: ProjectTheme;
  onActiveProjectChange: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  activeTheme,
  onActiveProjectChange,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const updateActiveIndex = useCallback((index: number) => {
    if (index !== activeIndexRef.current && index >= 0 && index < projects.length) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      onActiveProjectChange(projects[index]);
    }
  }, [onActiveProjectChange]);

  // GSAP Horizontal Pinning for Desktop (Full Viewport)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIndex = Math.round(self.progress * (projects.length - 1));
            const clamped = Math.max(0, Math.min(projects.length - 1, rawIndex));
            updateActiveIndex(clamped);
          },
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === section) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, [updateActiveIndex]);

  // Mouse Drag on Desktop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      isDown = true;
      startX = e.pageX;
      scrollStart = window.scrollY;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (startX - x) * 1.5;
      window.scrollTo({
        top: scrollStart + walk,
        behavior: 'auto',
      });
    };

    const onMouseUp = () => {
      isDown = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const next = Math.min(projects.length - 1, activeIndexRef.current + 1);
        scrollToProject(next);
      } else if (e.key === 'ArrowLeft') {
        const prev = Math.max(0, activeIndexRef.current - 1);
        scrollToProject(prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Mobile Swipe & Snap Detection
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) return;
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const width = el.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    const clamped = Math.max(0, Math.min(projects.length - 1, newIndex));
    updateActiveIndex(clamped);
  };

  const scrollToProject = (index: number) => {
    updateActiveIndex(index);
    if (window.innerWidth >= 1024) {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const st = ScrollTrigger.getById(section.id) || ScrollTrigger.getAll().find((t) => t.trigger === section);
      if (st) {
        const targetProgress = index / (projects.length - 1);
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    } else {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-screen py-12 md:py-0 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Floating Section Index & Quick Switcher Overlay */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30">
        <div className="flex items-center gap-3">
          <span
            className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
            style={{ color: accentColor }}
          >
            04 / CASE STUDIES
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest hidden sm:inline">
            FULL-VIEWPORT SHOWCASE
          </span>
        </div>

        {/* Quick project pill tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => scrollToProject(idx)}
                className={`px-3.5 py-1.5 rounded-full font-label-mono-sm text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'border shadow-lg font-semibold'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white'
                }`}
                style={{
                  backgroundColor: isActive ? `${project.theme.accentColor}20` : undefined,
                  borderColor: isActive ? `${project.theme.accentColor}60` : undefined,
                  color: isActive ? project.theme.accentColor : undefined,
                }}
              >
                <span>{project.num}</span>
                <span className="hidden md:inline">{project.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Cinematic Showcase Viewport: Each slide fills 100vw x 100vh */}
      <div
        className="w-full overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory lg:snap-none flex-1 flex items-center"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex lg:flex-nowrap w-max lg:w-fit cursor-grab active:cursor-grabbing h-full items-center"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const theme = project.theme;

            return (
              <div
                key={project.id}
                className="w-screen h-[85vh] sm:h-[88vh] lg:h-screen min-h-[650px] relative flex items-center justify-center shrink-0 snap-center px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
              >
                {/* 1. Atmospheric Full-Bleed Environment Backdrop */}
                <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                  {/* Blurred Project Ambient Screen */}
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover blur-3xl opacity-15 scale-125 transition-all duration-1000 ease-out"
                    aria-hidden="true"
                  />
                  {/* Radial Spotlight in Project Accent Color */}
                  <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                      background: `radial-gradient(circle at 65% 50%, ${theme.accentColor}22 0%, transparent 65%)`,
                    }}
                  />
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709] opacity-80" />
                </div>

                {/* 2. Integrated Case Study Presentation (Edge-to-Edge scale, NOT a small card box) */}
                <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-14 z-10 py-4">
                  {/* Left Column: Project Editorial & Controls */}
                  <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-5">
                    {/* Ghost Numeric Outline */}
                    <div className="relative">
                      <span className="font-display-hero text-7xl sm:text-9xl font-extrabold text-white/[0.06] select-none block leading-none -mb-8 sm:-mb-12">
                        {project.num}
                      </span>

                      {/* Real Verified Badge */}
                      {project.badge && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 mb-3 shadow-sm">
                          <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <span
                            className="font-label-mono-sm text-xs font-semibold uppercase tracking-wider"
                            style={{ color: theme.accentColor }}
                          >
                            {project.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                      {project.name}
                    </h3>

                    {/* Category */}
                    <span className="font-label-mono-sm text-xs uppercase text-white/50 tracking-widest font-medium">
                      {project.category}
                    </span>

                    {/* Editorial Description */}
                    <p className="font-body-lg text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/85 font-label-mono-sm text-xs hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Triggers */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {project.live && project.live !== project.github ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] transition-all shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
                        >
                          <span>Launch Live Demo</span>
                          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] transition-all shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
                        >
                          <span>Explore Project Code</span>
                          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                            arrow_outward
                          </span>
                        </a>
                      )}

                      {project.github && project.live !== project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-sm text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">code</span>
                          <span>GitHub Repository</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Heroic Large Screenshot Frame (Integrated into space) */}
                  <div className="w-full lg:w-7/12 relative">
                    {/* Ambient Glow Halo */}
                    <div
                      className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${theme.accentColor} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Screen Housing */}
                    <div
                      className={`relative aspect-[16/10] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0A0A0E] border transition-all duration-700 ease-out group ${
                        isActive
                          ? 'border-white/20 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.95)] scale-100 opacity-100'
                          : 'border-white/10 opacity-60 scale-[0.98]'
                      }`}
                      style={{
                        boxShadow: isActive
                          ? `0 30px 100px -15px rgba(0,0,0,0.95), 0 0 50px -10px ${theme.accentColor}25`
                          : undefined,
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-transparent to-transparent pointer-events-none" />

                      {/* In-Screen Corner Marker */}
                      <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white/80 font-label-mono-sm text-[11px] hidden sm:flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                        <span>CASE STUDY {project.num}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
