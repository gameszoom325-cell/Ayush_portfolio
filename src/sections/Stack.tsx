import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Terminal, Brain, Server } from 'lucide-react';
import { skillTiers } from '../data/skills';
import { ProjectTheme } from '../data/projects';

const tierIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  web: Layout,
  terminal: Terminal,
  psychology: Brain,
  deployed_code: Server,
};

gsap.registerPlugin(ScrollTrigger);

interface StackProps {
  activeTheme?: ProjectTheme;
}

export const Stack: React.FC<StackProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';
  const sectionRef = useRef<HTMLElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headerLine = headerLineRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerLine, grid.children], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Header Line Expansion (0.9s, expo.out, top 75%)
      if (headerLine) {
        gsap.fromTo(
          headerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4 Engineering Tiers Column Stagger (0.95s, power3.out, top 75%)
      gsap.fromTo(
        grid.children,
        {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.14,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
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
      className="w-full min-h-screen py-24 md:py-36 relative flex flex-col justify-center select-none"
      id="stack"
    >
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 right-0 w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-[200px] pointer-events-none -z-10 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
            style={{ color: accentColor }}
          >
            06 / APPARATUS
          </span>
          <div ref={headerLineRef} className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
            ENGINEERING STACK
          </span>
        </div>

        {/* 4 Architectural Columns with Interactive Lift and Living Icons */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillTiers.map((tier) => (
            <div
              key={tier.id}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: accentColor }}
              />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span
                    className="font-label-mono-sm text-xs uppercase tracking-wider font-semibold transition-colors duration-300"
                    style={{ color: accentColor }}
                  >
                    {tier.tierNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:scale-110 group-hover:border-white/25 transition-all duration-300 shadow-sm">
                    {(() => {
                      const IconComponent = tierIconMap[tier.icon] || Layout;
                      return <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />;
                    })()}
                  </div>
                </div>

                <h3 className="font-headline-sm text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors duration-200">
                  {tier.title}
                </h3>

                <div className="flex flex-col gap-3 font-label-mono-md text-xs pt-2">
                  {tier.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.06] hover:translate-x-1.5 transition-all duration-200 cursor-default"
                    >
                      <span className="text-white/90 font-medium">{skill.name}</span>
                      <span
                        className={`font-label-mono-sm text-[10px] px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                          skill.tagHighlight
                            ? 'border font-semibold shadow-sm'
                            : 'text-white/40 bg-white/[0.04]'
                        }`}
                        style={{
                          color: skill.tagHighlight ? accentColor : undefined,
                          borderColor: skill.tagHighlight ? `${accentColor}50` : undefined,
                          backgroundColor: skill.tagHighlight ? `${accentColor}15` : undefined,
                        }}
                      >
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between font-label-mono-sm text-[11px] text-white/40 relative z-10">
                <span className="uppercase tracking-wider">SYSTEM TIER</span>
                <span className="font-semibold transition-colors duration-300" style={{ color: accentColor }}>
                  ACTIVE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
