import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementsList, Achievement, archiveMetrics } from '../data/achievements';
import { ProjectTheme } from '../data/projects';
import { CertificateModal } from '../components/CertificateModal';

gsap.registerPlugin(ScrollTrigger);

interface ArchiveProps {
  activeTheme?: ProjectTheme;
}

export const Archive: React.FC<ArchiveProps> = ({ activeTheme }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hackathon' | 'project'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  const filteredItems = achievementsList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterTabs = [
    { id: 'all', label: `All (${achievementsList.length})` },
    { id: 'hackathon', label: 'Hackathons (SIH & Genie X)' },
    { id: 'project', label: 'Deployed Platforms' },
  ] as const;

  // Staggered reveal animation on scroll
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.archive-item-card');
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 35,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 relative"
      id="archive"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
              style={{ color: accentColor }}
            >
              05 / HACKATHONS &amp; PLATFORMS
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              VERIFIED PORTFOLIO RECORD
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Hackathons &amp; Engineering Archives
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full font-label-mono-sm text-xs uppercase tracking-wider transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.96] ${
                  isActive
                    ? 'border shadow-md font-semibold'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white'
                }`}
                style={{
                  backgroundColor: isActive ? `${accentColor}18` : undefined,
                  borderColor: isActive ? `${accentColor}50` : undefined,
                  color: isActive ? accentColor : undefined,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-5 rounded-2xl glass-dossier">
        <div className="flex flex-col items-center text-center p-3">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.hackathons}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Competitions</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.platforms}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Engineered Apps</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.status}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Specialization</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.institution}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">University</span>
        </div>
      </div>

      {/* Dossier Folders Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="archive-grid">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAchievement(item)}
              className="archive-item-card glass-dossier p-7 rounded-[2rem] flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 group cursor-pointer border border-white/[0.08] hover:border-white/25 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-label-mono-sm text-xs uppercase tracking-widest font-semibold truncate max-w-[200px]"
                    style={{ color: accentColor }}
                  >
                    {item.organization}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full font-label-mono-sm text-[11px] uppercase border shrink-0"
                    style={{
                      backgroundColor: `${accentColor}12`,
                      borderColor: `${accentColor}35`,
                      color: accentColor,
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/10 my-2">
                  <img
                    src={item.previewImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-transparent to-transparent pointer-events-none" />
                </div>

                <h4 className="font-headline-sm text-xl font-bold text-white group-hover:text-white transition-colors flex items-center justify-between gap-2">
                  <span>{item.title}</span>
                  <span className="material-symbols-outlined text-[16px] text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-[transform,color] duration-200">
                    arrow_outward
                  </span>
                </h4>

                <p className="font-body-sm text-sm text-white/60 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] mt-5 font-label-mono-sm text-xs text-white/40">
                <span className="truncate max-w-[200px] text-white/60">{item.badge}</span>
                <span className="text-white/80 font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <CertificateModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
};
