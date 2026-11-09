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

  // GSAP Horizontal Pinning for Desktop
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
          end: () => `+=${getScrollAmount() * 1.2}`,
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
    const newIndex = Math.round(scrollLeft / (width * 0.88));
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
      className="relative w-full min-h-screen py-16 md:py-24 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-20">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500"
              style={{ color: accentColor }}
            >
              04 / SELECTED WORKS
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              {String(projects.length).padStart(2, '0')} VERIFIED PROJECTS
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Featured Systems &amp; Platforms
          </h2>
        </div>

        {/* Gallery Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-label-mono-sm text-xs text-white/40 uppercase">
            <span className="material-symbols-outlined text-[16px] text-white/30 animate-pulse">
              swipe
            </span>
            <span>Scroll or drag horizontally</span>
          </div>

          <div className="px-5 py-2 rounded-full glass-dossier font-label-mono-md text-xs text-white/70 flex items-center gap-2 border border-white/10">
            <span
              className="font-bold text-sm transition-colors duration-500"
              style={{ color: accentColor }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/20">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
            <span className="ml-2 pl-2 border-l border-white/10 text-[11px] text-white/50 uppercase truncate max-w-[130px] hidden sm:inline">
              {projects[activeIndex]?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-6 z-20">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => scrollToProject(idx)}
                className={`px-4 py-1.5 rounded-full font-label-mono-sm text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'border shadow-lg font-semibold'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06]'
                }`}
                style={{
                  backgroundColor: isActive ? `${project.theme.accentColor}18` : undefined,
                  borderColor: isActive ? `${project.theme.accentColor}50` : undefined,
                  color: isActive ? project.theme.accentColor : undefined,
                }}
              >
                <span className="opacity-60">{project.num}.</span>
                <span>{project.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Cinematic Showcase Viewport */}
      <div
        className="w-full overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory lg:snap-none"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex lg:flex-nowrap gap-6 md:gap-10 px-4 md:px-8 lg:px-12 w-max lg:w-fit cursor-grab active:cursor-grabbing"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const theme = project.theme;

            return (
              <div
                key={project.id}
                className={`w-[88vw] sm:w-[82vw] lg:w-[78vw] xl:w-[74vw] max-w-6xl shrink-0 snap-center rounded-[2.5rem] glass-dossier p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-700 ease-out flex flex-col justify-between border ${
                  isActive
                    ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] opacity-100 scale-100'
                    : 'opacity-40 scale-[0.98] blur-[0.5px] border-white/5'
                }`}
                style={{
                  borderColor: isActive ? `${theme.accentColor}40` : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive
                    ? `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px -10px ${theme.accentColor}25`
                    : undefined,
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-stretch">
                  {/* Left: Real Project Screenshot Preview Image */}
                  <div className="w-full lg:w-7/12 relative aspect-[16/10] rounded-2xl md:rounded-[1.6rem] overflow-hidden bg-[#0A0A0E] border border-white/10 shadow-2xl group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Real Project Badge */}
                    {project.badge && (
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md font-label-mono-sm text-[11px] flex items-center gap-2 border border-white/15">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <span className="text-white font-medium">{project.badge}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Project Details & Meta */}
                  <div className="w-full lg:w-5/12 flex flex-col justify-between py-2">
                    <div className="space-y-4">
                      {/* Project Index & Category */}
                      <div className="flex items-center gap-2">
                        <span
                          className="font-label-mono-sm text-xs uppercase tracking-widest font-semibold"
                          style={{ color: theme.accentColor }}
                        >
                          PROJECT {project.num} / {project.category}
                        </span>
                      </div>

                      {/* Project Name */}
                      <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="font-body-md text-sm sm:text-base text-white/75 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies Pill Grid */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/90 font-label-mono-sm text-xs hover:border-white/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons: Live Demo & GitHub */}
                    <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/[0.06] mt-6">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] transition-all shadow-md active:scale-95"
                        >
                          <span>Live Demo</span>
                          <span className="material-symbols-outlined text-[16px]">
                            open_in_new
                          </span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-label-mono-sm text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">code</span>
                          <span>GitHub Repo</span>
                        </a>
                      )}
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
