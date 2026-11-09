import React from 'react';
import { ProjectTheme } from '../data/projects';

interface AboutProps {
  activeTheme?: ProjectTheme;
}

export const About: React.FC<AboutProps> = ({ activeTheme }) => {
  const accentColor = activeTheme?.accentColor || '#44e2cd';

  const userInterests = [
    { label: 'Gaming & Game Dev', icon: 'sports_esports', desc: 'Unreal & WebGL physics engines' },
    { label: 'Anime Editing', icon: 'movie_filter', desc: 'Kinetic typography & pacing' },
    { label: 'Fitness & Discipline', icon: 'fitness_center', desc: 'Strength training & endurance' },
    { label: 'Tech Exploration', icon: 'explore', desc: 'Latent vectors & neuromorphics' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-32 relative" id="about">
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className="font-label-mono-md text-xs tracking-[0.2em] uppercase transition-colors duration-500"
          style={{ color: accentColor }}
        >
          02 / BIOGRAPHY
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-label-mono-sm text-xs text-white/40 uppercase tracking-widest">
          KINETIC INTELLIGENCE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Portrait Biometric HUD & Tactile Interests */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden glass-dossier group p-2">
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-[#0A0A0E]">
              {/* Cinematic portrait image from Stitch design */}
              <img
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
                alt="Cinematic atmospheric portrait of Ayush Singh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVg5pXMtTL0K4sVlGNe1iJapG1QN2yZHbRgAjYilolyStNmRhX1zqOiFH78u5fJLZco-wrDdjyhqWhqgw0Sbm7nJGoJ57AEGip18TZGLLly8NWk1cwgu07VJLVQqUfSsTZ-QhWCjiMZweRP5oBqrCnu0YKkdTL8LcvO78kC-HXYIJk1cuEvqHbFO-ult1snIzTlFjWktDfXXy4_bW60mjfr0KSzJHt_iEXOEwCRTz"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />

              {/* Floating Top HUD Markers */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md font-label-mono-sm text-[11px] uppercase tracking-widest flex items-center gap-2 border border-white/10">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span style={{ color: accentColor }}>ACTIVE OPERATOR</span>
                </span>
                <span className="text-white/70 font-label-mono-sm text-[11px] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  SRM-CSE-28
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
                    SYS_ID: 9402-A
                  </span>
                </div>
                <p className="font-body-sm text-xs text-white/60 line-clamp-2">
                  Pursuing B.Tech Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology.
                </p>
                {/* ECG Waveform */}
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/10">
                  <svg
                    className="w-full h-6 transition-colors duration-500"
                    style={{ color: `${accentColor}cc` }}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 200 24"
                  >
                    <path
                      d="M0 12 Q 10 2, 20 12 T 40 12 T 60 4 T 80 20 T 100 8 T 120 16 T 140 2 T 160 22 T 180 12 T 200 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* User Interests Grid Bento */}
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
                  Core Passions &amp; Focus
                </span>
              </div>
              <span
                className="font-label-mono-sm text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 uppercase"
                style={{ color: accentColor }}
              >
                Chennai, IN
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
              className="font-label-mono-sm text-xs uppercase tracking-[0.2em] transition-colors duration-500"
              style={{ color: accentColor }}
            >
              PHILOSOPHY OF KINETIC INTELLIGENCE
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-[1.15]">
              Software is no longer static instructions. It is living cognitive topology.
            </h2>
          </div>

          <div className="space-y-4 font-body-lg text-base sm:text-lg text-white/70 leading-relaxed">
            <p>
              I am an undergraduate AI researcher and systems architect at{' '}
              <span className="text-white font-medium">SRM Institute of Science &amp; Technology, Chennai</span>,
              specializing in <span className="text-white font-medium">Artificial Intelligence and Machine Learning</span>.
              My work oscillates between the mathematical rigor of high-dimensional neural vector spaces and the visceral spatial tactility of real-time renderers.
            </p>
            <p>
              Rather than assembling superficial wrappers around black-box APIs, I dissect deep learning architectures from the tensor level up: optimizing backpropagation passes, designing memory-frugal attention kernels, and streaming volumetric inference into interactive browser spaces.
            </p>
          </div>

          {/* Pillars Bento Grid with Metallic Accents */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">model_training</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Latent Spaces</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                Generative diffusion, high-dimensional vector embeddings, and multimodal alignment models.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">developer_board</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Edge Compute</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                Quantized INT8 inference on constrained hardware with custom CUDA kernels and memory efficiency.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-dossier flex flex-col gap-3 group hover:border-white/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors"
                style={{ color: accentColor }}
              >
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <span className="font-headline-sm text-base font-semibold text-white">Spatial Systems</span>
              <p className="font-body-sm text-xs text-white/50 leading-normal">
                WebGL 2.0, GPU-driven shaders, interactive graphics, and ergonomic tactile design languages.
              </p>
            </div>
          </div>

          {/* Micro Details Tag Cloud */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              SRM IST Class of 2028
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Chennai, India
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              B.Tech CSE AI/ML
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Creative Developer
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Game Dev Enthusiast
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 font-label-mono-sm text-xs uppercase tracking-wider">
              Open-Source Core
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
