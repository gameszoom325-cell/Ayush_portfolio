import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationHistory } from '../data/education';
import { ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface TrajectoryProps {
  activeTheme?: ProjectTheme;
}

export const Trajectory: React.FC<TrajectoryProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // 1. Animate trace line downward as user scrolls into the section
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Animate each education dossier card with a smooth reveal
      const cards = cardsContainer.querySelectorAll('.education-card');
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 relative"
      id="trajectory"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
          style={{ color: accentColor }}
        >
          03 / EDUCATION
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
          ACADEMIC TIMELINE
        </span>
      </div>

      <div ref={cardsRef} className="relative pl-6 sm:pl-12 space-y-12">
        {/* Luminescent Trace Line */}
        <div
          ref={lineRef}
          className="absolute left-2.5 sm:left-5 top-3 bottom-3 w-0.5 transition-colors duration-1000 origin-top"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}, rgba(255,255,255,0.1) 80%, transparent 100%)`,
          }}
        />

        {educationHistory.map((item) => (
          <div key={item.id} className="education-card relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-[27px] sm:-left-[39px] top-2 w-6 h-6 rounded-full bg-[#070709] border border-white/20 flex items-center justify-center transition-all group-hover:scale-110">
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  item.statusType === 'active' ? 'shadow-lg' : 'bg-white/40'
                }`}
                style={{
                  backgroundColor: item.statusType === 'active' ? accentColor : undefined,
                  boxShadow: item.statusType === 'active' ? `0 0 12px ${accentColor}` : undefined,
                }}
              />
            </div>

            {/* Dossier Card */}
            <div className="glass-dossier p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row justify-between md:items-start gap-8 hover:border-white/20 transition-all duration-300">
              <div className="space-y-4 max-w-3xl">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* Logo Monogram */}
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.logoBg} border border-white/10 flex items-center justify-center font-label-mono-md text-[10px] font-bold text-white shadow-inner`}
                    >
                      {item.logoPlaceholder}
                    </div>
                    <span
                      className="px-3.5 py-1 rounded-full font-label-mono-sm text-xs uppercase tracking-wider border"
                      style={{
                        backgroundColor: item.statusType === 'active' ? `${accentColor}15` : 'rgba(255,255,255,0.06)',
                        borderColor: item.statusType === 'active' ? `${accentColor}40` : 'rgba(255,255,255,0.1)',
                        color: item.statusType === 'active' ? accentColor : '#E5E1E4',
                      }}
                    >
                      {item.timeline}
                    </span>
                  </div>
                  <span className="text-white/40 font-label-mono-sm text-xs uppercase">
                    {item.location}
                  </span>
                </div>

                {/* Institution & Degree */}
                <div>
                  <h3 className="font-headline-md text-2xl sm:text-3xl font-bold text-white">
                    {item.institution}
                  </h3>
                  <p
                    className="font-body-md text-base font-medium mt-1 transition-colors duration-500"
                    style={{ color: item.statusType === 'active' ? accentColor : '#c5c6cb' }}
                  >
                    {item.degree}
                  </p>
                </div>

                {/* Description */}
                <p className="font-body-md text-white/70 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/75 font-label-mono-sm text-xs hover:border-white/20 transition-colors"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <span
                  className="px-3.5 py-1.5 rounded-full font-label-mono-sm text-xs font-semibold uppercase tracking-wider border shadow-sm"
                  style={{
                    backgroundColor: item.statusType === 'active' ? `${accentColor}20` : 'rgba(255,255,255,0.04)',
                    borderColor: item.statusType === 'active' ? `${accentColor}50` : 'rgba(255,255,255,0.1)',
                    color: item.statusType === 'active' ? accentColor : '#94A3B8',
                  }}
                >
                  {item.status}
                </span>
                <span className="font-label-mono-sm text-[11px] text-white/40">
                  {item.subheading}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
