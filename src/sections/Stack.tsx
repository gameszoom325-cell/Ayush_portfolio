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

      if (headerLine) {
        gsap.fromTo(
          headerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        grid.children,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
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
      className="w-full min-h-screen py-24 md:py-36 relative flex flex-col justify-center"
      id="stack"
    >
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 right-0 w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-[200px] pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
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

        {/* 4 Architectural Columns */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillTiers.map((tier) => (
            <div
              key={tier.id}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.035] hover:-translate-y-1 transition-[transform,border-color,background-color] duration-300 backdrop-blur-xl flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span
                    className="font-label-mono-sm text-xs uppercase tracking-wider font-semibold"
                    style={{ color: accentColor }}
                  >
                    {tier.tierNumber}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-colors duration-200">
                    {(() => {
                      const IconComponent = tierIconMap[tier.icon] || Layout;
                      return <IconComponent className="w-4 h-4" />;
                    })()}
                  </div>
                </div>

                <h3 className="font-headline-sm text-2xl font-bold text-white tracking-tight">
                  {tier.title}
                </h3>

                <div className="flex flex-col gap-3 font-label-mono-md text-xs pt-2">
                  {tier.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-[border-color,background-color] duration-200"
                    >
                      <span className="text-white/90 font-medium">{skill.name}</span>
                      <span
                        className={`font-label-mono-sm text-[10px] px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
                          skill.tagHighlight
                            ? 'border font-semibold'
                            : 'text-white/40 bg-white/[0.04]'
                        }`}
                        style={{
                          color: skill.tagHighlight ? accentColor : undefined,
                          borderColor: skill.tagHighlight ? `${accentColor}40` : undefined,
                          backgroundColor: skill.tagHighlight ? `${accentColor}12` : undefined,
                        }}
                      >
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between font-label-mono-sm text-[11px] text-white/40">
                <span className="uppercase tracking-wider">SYSTEM TIER</span>
                <span style={{ color: accentColor }}>ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
