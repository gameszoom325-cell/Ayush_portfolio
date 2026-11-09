import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ProjectTheme } from '../data/projects';

interface NavbarProps {
  activeTheme?: ProjectTheme;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTheme }) => {
  const [istTime, setIstTime] = useState<string>('00:00:00');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

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

  // Scroll detection & Active Section Spy
  useEffect(() => {
    const sectionIds = ['overview', 'about', 'trajectory', 'projects', 'archive', 'stack', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      setScrolled(window.scrollY > 25);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview', id: 'overview' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#trajectory', id: 'trajectory' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Hackathons', href: '#archive', id: 'archive' },
    { label: 'Skills', href: '#stack', id: 'stack' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const accentColor = activeTheme?.accentColor || '#2dd4bf';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 transition-[padding] duration-300">
      <div
        className={`h-16 w-full max-w-7xl mx-auto rounded-full bg-[#0E0E12]/85 backdrop-blur-2xl border px-4 sm:px-6 flex items-center justify-between gap-4 transition-[border-color,background-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95)]'
            : 'border-white/[0.08] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)]'
        }`}
      >
        {/* Left: Minimal Titanium Logo with Tactile Spring Interaction */}
        <div className="flex items-center gap-3 min-w-max">
          <a className="btn-magnetic flex items-center gap-3 group" href="#overview">
            <div
              className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center font-headline-sm text-sm font-bold tracking-widest text-white group-hover:border-white/35 group-hover:scale-[1.04] active:scale-[0.96] transition-all duration-200 shadow-inner"
              style={{ borderColor: scrolled ? `${accentColor}40` : undefined }}
            >
              AS
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm sm:text-base font-semibold text-white tracking-tight leading-none group-hover:text-white/90 transition-colors duration-200">
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

        {/* Center: Desktop Navigation links with Active Pill Indicator */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.06] rounded-full p-1 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 font-label-mono-sm text-xs uppercase tracking-wider rounded-full transition-all duration-200 active:scale-[0.96] ${
                  isActive
                    ? 'text-white bg-white/[0.1] font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: IST Clock & Contact CTA */}
        <div className="flex items-center gap-3 min-w-max">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] transition-[border-color] duration-300">
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
            className="btn-magnetic group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] active:scale-[0.97] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Button with Tactile Feedback */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white focus:outline-none active:scale-[0.92] transition-transform duration-150"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Refined Entrance */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-auto max-w-7xl rounded-2xl glass-dossier p-5 flex flex-col gap-3 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-label-mono-sm text-xs text-white/50 uppercase">Navigation Directory</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="font-label-mono-sm text-[11px] text-white/70">IST {istTime}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl border font-label-mono-sm text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.97] ${
                    isActive
                      ? 'bg-white/[0.09] border-white/20 text-white font-semibold'
                      : 'bg-white/[0.03] border-white/[0.06] text-white/80 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
