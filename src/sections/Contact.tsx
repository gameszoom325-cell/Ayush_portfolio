import React, { useState } from 'react';
import { ProjectTheme } from '../data/projects';

interface ContactProps {
  activeTheme?: ProjectTheme;
}

export const Contact: React.FC<ContactProps> = ({ activeTheme }) => {
  const [copied, setCopied] = useState(false);
  const email = '090109ayush@gmail.com';
  const mailtoLink = `mailto:${email}`;
  const githubUrl = 'https://github.com/gameszoom325-cell';
  const linkedinUrl = 'https://www.linkedin.com/in/ayush-singh-705a63397';

  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-36 relative" id="contact">
      <div className="glass-dossier rounded-[3rem] p-8 md:p-20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col items-center text-center relative overflow-hidden border border-white/10">
        {/* Deep Ambient Radial Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[380px] rounded-full blur-[110px] pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeTheme?.glowBurgundy || 'rgba(15,118,110,0.3)'} 0%, transparent 70%)`,
          }}
        />

        {/* Transmission Status Badge */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="font-label-mono-sm text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-500"
            style={{ color: accentColor }}
          >
            COMMUNICATION GATEWAY OPEN
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] uppercase max-w-4xl relative z-10">
          Let’s Construct Something Extraordinary.
        </h2>

        {/* Subtext */}
        <p className="font-body-lg text-base sm:text-lg text-white/70 max-w-2xl mt-6 leading-relaxed relative z-10">
          Open to ambitious software architecture, full-stack web platforms, hackathon collaborations, and innovative technology exploration.
        </p>

        {/* Action Buttons: Direct Mailto, Copy, GitHub, LinkedIn */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 relative z-10">
          {/* Primary Mailto Button: Directly opens default mail client with recipient pre-filled */}
          <a
            href={mailtoLink}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-semibold uppercase tracking-wider shadow-[0_15px_30px_rgba(255,255,255,0.2)] hover:bg-[#C4C8D0] transition-all active:scale-95 cursor-pointer"
            title={`Compose email to ${email}`}
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>{email}</span>
            <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">
              arrow_outward
            </span>
          </a>

          {/* One-click Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all active:scale-95 cursor-pointer"
            title="Copy email to clipboard"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>

          {/* GitHub Button */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>GitHub Profile</span>
            <span className="material-symbols-outlined text-[14px] text-white/40">arrow_outward</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>LinkedIn Profile</span>
            <span className="material-symbols-outlined text-[14px] text-white/40">arrow_outward</span>
          </a>
        </div>

        {/* Social Connectivity Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-14 pt-8 border-t border-white/[0.08] w-full max-w-2xl font-label-mono-sm text-xs relative z-10">
          <a
            className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
            href={mailtoLink}
            title="Direct email dispatch"
          >
            <span className="material-symbols-outlined text-[14px]">mail</span>
            <span>{email}</span>
          </a>
          <a
            className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/20 transition-all"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB: @gameszoom325-cell
          </a>
          <a
            className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/20 transition-all"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN: Ayush Singh
          </a>
          <span className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50">
            SRM IST • CHENNAI, INDIA
          </span>
        </div>
      </div>
    </section>
  );
};
