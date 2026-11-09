import React, { useState, useEffect } from 'react';
import { ProjectTheme } from '../data/projects';

interface NavbarProps {
  activeTheme?: ProjectTheme;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTheme }) => {
  const [istTime, setIstTime] = useState<string>('00:00:00');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(now);
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#trajectory' },
    { label: 'Projects', href: '#projects' },
    { label: 'Hackathons', href: '#archive' },
    { label: 'Skills', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ];

  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 transition-all duration-500">
      <div
        data-intro="nav"
        className={`h-16 w-full max-w-7xl mx-auto rounded-full bg-[#0E0E12]/85 backdrop-blur-2xl border transition-all duration-300 px-4 sm:px-6 flex items-center justify-between gap-4 ${
          scrolled
            ? 'border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95)]'
            : 'border-white/[0.08] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)]'
        }`}
      >
        {/* Left: Minimal Titanium Logo */}
        <div className="flex items-center gap-3 min-w-max">
          <a data-intro="logo" className="flex items-center gap-3 group" href="#overview">
            <div
              className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center font-headline-sm text-sm font-bold tracking-widest text-white group-hover:border-white/30 transition-all shadow-inner"
              style={{ borderColor: scrolled ? `${accentColor}40` : undefined }}
            >
              AS
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm sm:text-base font-semibold text-white tracking-tight leading-none">
                AYUSH SINGH
              </span>
              <div className="hidden xl:flex items-center gap-2 mt-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ backgroundColor: accentColor }}
                  />
                </span>
                <span className="font-label-mono-sm text-[10px] text-white/50 uppercase tracking-widest">
                  SRM IST CHENNAI • B.TECH CSE AI/ML
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation links */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.06] rounded-full p-1 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 font-label-mono-sm text-xs uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/[0.05] transition-all rounded-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: IST Clock & Contact CTA */}
        <div className="flex items-center gap-3 min-w-max">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07]">
            <span
              className="font-label-mono-sm text-[11px] uppercase font-semibold transition-colors duration-500"
              style={{ color: accentColor }}
            >
              IST
            </span>
            <span className="font-label-mono-sm text-[11px] text-white/70 tabular-nums">
              {istTime}
            </span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <span>Get in Touch</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-auto max-w-7xl rounded-2xl glass-dossier p-5 flex flex-col gap-3 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-label-mono-sm text-xs text-white/50 uppercase">Navigation Directory</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="font-label-mono-sm text-[11px] text-white/70">IST {istTime}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/80 hover:text-white hover:bg-white/[0.08] font-label-mono-sm text-xs uppercase tracking-wider transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
