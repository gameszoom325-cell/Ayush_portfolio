import React from 'react';
import { skillTiers } from '../data/skills';
import { ProjectTheme } from '../data/projects';

interface StackProps {
  activeTheme?: ProjectTheme;
}

export const Stack: React.FC<StackProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#44e2cd';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 relative" id="stack">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500"
          style={{ color: accentColor }}
        >
          06 / APPARATUS
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
          HARDWARE &amp; SOFTWARE STACK
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillTiers.map((tier) => (
          <div
            key={tier.id}
            className="glass-dossier p-7 rounded-[2rem] flex flex-col gap-6 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span
                className="font-label-mono-sm text-xs uppercase tracking-wider font-semibold"
                style={{ color: accentColor }}
              >
                {tier.tierNumber}
              </span>
              <span className="material-symbols-outlined text-[20px] text-white/30">
                {tier.icon}
              </span>
            </div>

            <h3 className="font-headline-sm text-xl font-bold text-white">
              {tier.title}
            </h3>

            <div className="flex flex-col gap-2.5 font-label-mono-md text-xs">
              {tier.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/15 transition-colors"
                >
                  <span className="text-white font-medium">{skill.name}</span>
                  <span
                    className={`font-label-mono-sm text-[10px] px-2 py-0.5 rounded-full ${
                      skill.tagHighlight
                        ? 'border'
                        : 'text-white/40 bg-white/[0.04]'
                    }`}
                    style={{
                      color: skill.tagHighlight ? accentColor : undefined,
                      borderColor: skill.tagHighlight ? `${accentColor}40` : undefined,
                      backgroundColor: skill.tagHighlight ? `${accentColor}10` : undefined,
                    }}
                  >
                    {skill.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
