import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectTheme } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-24 md:py-36 relative flex flex-col justify-center items-center overflow-hidden"
      id="contact"
    >
      {/* Center Volumetric Vortex Atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[180px] pointer-events-none -z-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeTheme?.glowBurgundy || 'rgba(15,118,110,0.35)'} 0%, ${accentColor}12 40%, transparent 70%)`,
        }}
      />

      <div
        ref={contentRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 z-10 flex flex-col items-center text-center"
      >
        {/* Transmission Status Badge */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="font-label-mono-sm text-xs uppercase tracking-[0.25em] font-semibold transition-colors duration-500"
            style={{ color: accentColor }}
          >
            COMMUNICATION GATEWAY OPEN
          </span>
        </div>

        {/* Large Keynote Title */}
        <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.035em] leading-[1.0] uppercase max-w-5xl">
          Let’s Construct Something Extraordinary.
        </h2>

        {/* Subtext */}
        <p className="font-body-lg text-base sm:text-xl text-white/75 max-w-2xl mt-6 leading-relaxed">
          Open to ambitious software engineering, full-stack platforms, hackathon collaborations, and innovative technology exploration.
        </p>

        {/* Action Buttons: Direct Mailto, Copy, GitHub, LinkedIn */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
          {/* Primary Mailto Action */}
          <a
            href={mailtoLink}
            className="group flex items-center gap-3 px-9 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-semibold uppercase tracking-wider shadow-[0_15px_35px_rgba(255,255,255,0.25)] hover:bg-[#C4C8D0] transition-all active:scale-95 cursor-pointer"
            title={`Compose email to ${email}`}
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>{email}</span>
            <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">
              arrow_outward
            </span>
          </a>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] transition-all active:scale-95 cursor-pointer"
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
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] transition-all active:scale-95 cursor-pointer"
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
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>LinkedIn Profile</span>
            <span className="material-symbols-outlined text-[14px] text-white/40">arrow_outward</span>
          </a>
        </div>

        {/* Social Connectivity Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-16 pt-8 border-t border-white/[0.08] w-full max-w-2xl font-label-mono-sm text-xs">
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
