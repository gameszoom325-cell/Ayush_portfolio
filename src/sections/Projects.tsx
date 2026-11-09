import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, Project, ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  activeTheme?: ProjectTheme;
  onActiveProjectChange: (project: Project) => void;
}

interface ProjectCard3DProps {
  project: Project;
  isActive: boolean;
  idx: number;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, isActive, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Award-winning 3D rotational tilt with tangible weight
    const rotX = -normY * 8.5;
    const rotY = normX * 9.5;

    card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

    if (imageRef.current) {
      // Counter-parallax on image to generate holographic optical depth
      imageRef.current.style.transform = `translate3d(${(-normX * 18).toFixed(1)}px, ${(-normY * 14).toFixed(1)}px, 0) scale(1.08)`;
    }

    if (sheenRef.current) {
      // Radial specular light glides across screen glass
      sheenRef.current.style.background = `radial-gradient(circle 420px at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)`;
      sheenRef.current.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  };

  const handleClick = () => {
    const targetUrl = project.live && project.live !== project.github ? project.live : project.github;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full lg:w-7/12 relative perspective-container">
      {/* Dynamic Ambient Glow Halo in Project Accent */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-[3rem] blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${project.theme.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Screen Housing with 3D Holographic Tilt & Morphing Cursor Target */}
      <div
        ref={cardRef}
        data-cursor="project"
        onClick={handleClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`card-3d-target relative aspect-[16/10] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0A0A0E] border transition-all duration-500 ease-out cursor-pointer group select-none ${
          isActive
            ? 'border-white/20 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.95)] opacity-100'
            : 'border-white/10 opacity-60 scale-[0.98]'
        }`}
        style={{
          boxShadow: isActive
            ? `0 35px 120px -15px rgba(0,0,0,0.95), 0 0 60px -10px ${project.theme.accentColor}30`
            : undefined,
        }}
      >
        <img
          ref={imageRef}
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top will-change-transform transition-transform duration-500 ease-out"
          loading={idx < 2 ? 'eager' : 'lazy'}
          decoding="async"
        />
        
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Specular Sheen Reflection */}
        <div
          ref={sheenRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* In-Screen Corner Marker */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white/90 font-label-mono-sm text-[11px] hidden sm:flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.theme.accentColor }} />
          <span>CASE STUDY {project.num}</span>
          <ExternalLink className="w-3 h-3 text-white/60" />
        </div>
      </div>
    </div>
  );
};

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
      if (!section) return;
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
          <span className="font-label-mono-sm text-xs text-white/50 uppercase tracking-widest hidden sm:inline">
            SHOWCASE [ 0{activeIndex + 1} / 0{projects.length} ]
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
                className={`btn-magnetic px-3.5 py-1.5 rounded-full font-label-mono-sm text-xs whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 active:scale-95 ${
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

                {/* 2. Integrated Case Study Presentation */}
                <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-14 z-10 py-4">
                  {/* Left Column: Project Editorial & Controls */}
                  <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-5">
                    {/* Ghost Numeric Outline with Parallax Drift */}
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

                    {/* Action Triggers with Magnetic Button Sweep */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {project.live && project.live !== project.github ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          data-magnetic="true"
                          className="relative group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#E2E8F0] shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] active:scale-[0.97] cursor-pointer overflow-hidden transition-all duration-300"
                        >
                          <span className="relative z-10">Launch Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
                        </a>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          data-magnetic="true"
                          className="relative group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#E2E8F0] shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] active:scale-[0.97] cursor-pointer overflow-hidden transition-all duration-300"
                        >
                          <span className="relative z-10">Explore Project Code</span>
                          <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
                        </a>
                      )}

                      {project.github && project.live !== project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          data-magnetic="true"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-sm text-xs uppercase tracking-wider hover:bg-white/[0.12] active:scale-[0.97] cursor-pointer transition-all duration-200"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>GitHub Repository</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Heroic Large Screenshot Frame with 3D Holographic Tilt */}
                  <ProjectCard3D project={project} isActive={isActive} idx={idx} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
