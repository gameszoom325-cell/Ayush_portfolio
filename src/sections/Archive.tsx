import React, { useState } from 'react';
import { achievementsList, Achievement, archiveMetrics } from '../data/achievements';
import { ProjectTheme } from '../data/projects';
import { CertificateModal } from '../components/CertificateModal';

interface ArchiveProps {
  activeTheme?: ProjectTheme;
}

export const Archive: React.FC<ArchiveProps> = ({ activeTheme }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cert' | 'comp' | 'course'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const accentColor = activeTheme?.accentColor || '#44e2cd';

  const filteredItems = achievementsList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterTabs = [
    { id: 'all', label: `All (${achievementsList.length})` },
    { id: 'cert', label: 'Certifications' },
    { id: 'comp', label: 'Competitions' },
    { id: 'course', label: 'IIT Courses' },
  ] as const;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 relative" id="archive">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500"
              style={{ color: accentColor }}
            >
              05 / MERIT ARCHIVE
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
              VERIFIED CREDENTIALS
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Accreditations &amp; Honors
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
                className={`px-4 py-1.5 rounded-full font-label-mono-sm text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'border shadow-md'
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
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.certificates}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Certificates</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">IIT</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Course Certified</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.competitions}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Competitions</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-white/10">
          <span className="font-headline-sm text-2xl font-bold text-white">{archiveMetrics.projects}</span>
          <span className="font-label-mono-sm text-xs text-white/50 uppercase mt-0.5">Projects Engineered</span>
        </div>
      </div>

      {/* Dossier Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="archive-grid">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAchievement(item)}
              className="glass-dossier p-7 rounded-[2rem] flex flex-col justify-between transition-all duration-300 group cursor-pointer border border-white/[0.08] hover:border-white/20 hover:scale-[1.01]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-label-mono-sm text-xs uppercase tracking-widest font-semibold"
                    style={{ color: accentColor }}
                  >
                    {item.organization}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full font-label-mono-sm text-[11px] uppercase border"
                    style={{
                      backgroundColor: `${accentColor}12`,
                      borderColor: `${accentColor}35`,
                      color: accentColor,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4 className="font-headline-sm text-xl font-bold text-white group-hover:text-white transition-colors flex items-center justify-between gap-2">
                  <span>{item.title}</span>
                  <span className="material-symbols-outlined text-[16px] text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                    arrow_outward
                  </span>
                </h4>

                <p className="font-body-sm text-sm text-white/60 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] mt-6 font-label-mono-sm text-xs text-white/40">
                <span>ISSUED: {item.year}</span>
                <span className="text-white/80 font-medium truncate max-w-[150px]">
                  #{item.verifiedHash}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate / Credential Modal */}
      <CertificateModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
};
