import React from 'react';
import { ProjectTheme } from '../data/projects';

interface AboutProps {
  activeTheme?: ProjectTheme;
}

export const About: React.FC<AboutProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  const userInterests = [
    { label: 'Gaming & Game Dev', icon: 'sports_esports', desc: 'Game design & interactive graphics' },
    { label: 'Anime Editing', icon: 'movie_filter', desc: 'Visual rhythm, pacing & editing' },
    { label: 'Fitness & Discipline', icon: 'fitness_center', desc: 'Consistency & strength training' },
    { label: 'Exploring Technology', icon: 'explore', desc: 'AI models & modern web tech' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-32 relative" id="about">
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
          style={{ color: accentColor }}
        >
          02 / ABOUT ME
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
          STUDENT PROFILE &amp; INTERESTS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Portrait HUD & Interests */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden glass-dossier group p-2">
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-[#0A0A0E]">
              <img
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
                alt="Portrait of Ayush Singh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVg5pXMtTL0K4sVlGNe1iJapG1QN2yZHbRgAjYilolyStNmRhX1zqOiFH78u5fJLZco-wrDdjyhqWhqgw0Sbm7nJGoJ57AEGip18TZGLLly8NWk1cwgu07VJLVQqUfSsTZ-QhWCjiMZweRP5oBqrCnu0YKkdTL8LcvO78kC-HXYIJk1cuEvqHbFO-ult1snIzTlFjWktDfXXy4_bW60mjfr0KSzJHt_iEXOEwCRTz"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md font-label-mono-sm text-[11px] uppercase tracking-wider flex items-center gap-2 border border-white/10">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span style={{ color: accentColor }}>STUDENT DEVELOPER</span>
                </span>
                <span className="text-white/70 font-label-mono-sm text-[11px] bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  CHENNAI, INDIA
                </span>
              </div>

              {/* Floating Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-xl font-bold text-white">Ayush Singh</span>
                  <span
                    className="font-label-mono-sm text-xs font-semibold"
                    style={{ color: accentColor }}
                  >
                    B.Tech CSE AI/ML
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/70">
                  SRM Institute of Science and Technology, Chennai
                </p>
              </div>
            </div>
          </div>

          {/* User Interests Grid */}
          <div className="glass-dossier p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: accentColor }}
                >
                  interests
                </span>
                <span className="font-label-mono-sm text-xs text-white/50 uppercase tracking-wider">
                  Personal Passions &amp; Hobbies
                </span>
              </div>
              <span
                className="font-label-mono-sm text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 uppercase"
                style={{ color: accentColor }}
              >
                SRM IST
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {userInterests.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex flex-col gap-1 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ color: accentColor }}
                    >
                      {item.icon}
                    </span>
                    <span className="font-body-sm text-xs text-white font-medium truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-white/40 line-clamp-1">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Editorial Narrative & Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="space-y-4">
            <span
              className="font-label-mono-sm text-xs uppercase tracking-[0.2em] transition-colors duration-500 font-semibold"
              style={{ color: accentColor }}
            >
              ENGINEERING PERSPECTIVE
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-[1.15]">
              Building purpose-driven platforms with clean code and modern AI.
            </h2>
          </div>

          <div className="space-y-4 font-body-lg text-base sm:text-lg text-white/70 leading-relaxed">
            <p>
              I am an undergraduate student studying <span className="text-white font-medium">Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning</span> at <span className="text-white font-medium">SRM Institute of Science and Technology, Chennai</span>.
            </p>
            <p>
              I build web applications and intelligent systems that address real-world workflows — ranging from predictive cadastral land acquisition monitoring and direct farmer procurement gateways to enterprise contract automation and student productivity platforms.
            </p>
            <p>
              My approach focuses on solid engineering fundamentals: responsive, ergonomic UI design, modular component architecture, and practical machine learning integrations that deliver tangible value.
            </p>
          </div>

          {/* Pillars Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">web</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Full-Stack Web</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                React, Next.js, TypeScript, Tailwind CSS, Node.js, and modern RESTful APIs.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Applied AI/ML</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                Predictive analytics, automated document parsing, voice interfaces, and computer vision.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">database</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Data &amp; Cloud</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                PostgreSQL, Prisma, Leaflet GIS spatial mapping, Docker, and Vercel cloud deployment.
              </p>
            </div>
          </div>

          {/* Micro Details Tag Cloud */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Ayush Singh
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              SRM IST Chennai
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              B.Tech CSE AI/ML
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Web Developer
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Creative Developer
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Technology Explorer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
