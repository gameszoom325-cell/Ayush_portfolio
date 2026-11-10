import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight, Check, Copy } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';
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
  const statusBadgeRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger entrance with studio sequencing at top 75%
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Status Beacon Arrives
      tl.fromTo(
        statusBadgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        // 2. Headings First: Masked Keynote Title Reveal (1.25s, power4.out)
        .fromTo(
          titleMaskRef.current,
          { yPercent: 125, rotateX: 18, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'power4.out',
          },
          '-=0.55'
        )
        // 3. Paragraphs Second: Subtext Narrative (0.9s, power3.out)
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.75'
        )
        // 4. Buttons Last: Interactive Action Row Stagger (0.85s, power3.out, stagger: 0.1s)
        .fromTo(
          buttonsRef.current ? buttonsRef.current.children : [],
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.6'
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
        className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 z-10 flex flex-col items-center text-center"
      >
        {/* Transmission Status Badge */}
        <div ref={statusBadgeRef} className="flex items-center gap-3 mb-8">
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

        {/* Large Keynote Title with Masked Editorial Reveal */}
        <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-[-0.035em] leading-[1.0] uppercase max-w-5xl">
          <span className="block overflow-hidden py-1">
            <span ref={titleMaskRef} className="block will-change-transform">
              Let’s Construct Something Extraordinary.
            </span>
          </span>
        </h2>

        {/* Subtext */}
        <p ref={subtextRef} className="font-body-lg text-base sm:text-xl text-white/75 max-w-2xl mt-6 leading-relaxed">
          Open to ambitious software engineering, full-stack platforms, hackathon collaborations, and innovative technology exploration.
        </p>

        {/* Action Buttons: Direct Mailto, Copy, GitHub, LinkedIn */}
        <div ref={buttonsRef} className="mt-12 flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
          {/* Primary Mailto Action */}
          <a
            href={mailtoLink}
            data-magnetic="true"
            className="relative group flex items-center gap-3 px-9 py-4 rounded-full bg-white text-black font-label-mono-md text-xs font-semibold uppercase tracking-wider shadow-[0_15px_35px_rgba(255,255,255,0.25)] hover:bg-[#E2E8F0] active:scale-[0.97] transition-all cursor-pointer overflow-hidden"
            title={`Compose email to ${email}`}
          >
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{email}</span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
          </a>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            data-magnetic="true"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] active:scale-[0.97] transition-all cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-[#2dd4bf]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>

          {/* GitHub Button */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            data-magnetic="true"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] active:scale-[0.97] transition-all cursor-pointer"
            title="Explore GitHub Repositories"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            data-magnetic="true"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white font-label-mono-md text-xs uppercase tracking-wider hover:bg-white/[0.14] active:scale-[0.97] transition-all cursor-pointer"
            title="Connect on LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Telemetry Node Footnote */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-white/40 font-label-mono-sm text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
            <span>PRIMARY INBOX ACTIVE</span>
          </div>
          <span>•</span>
          <span>SRM IST KATTANKULATHUR, TAMIL NADU</span>
          <span>•</span>
          <span>COGNITIVE AI &amp; WEB PLATFORMS</span>
        </div>
      </div>
    </section>
  );
};
