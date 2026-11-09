import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects, Project } from './data/projects';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/AmbientBackground';
import { CinematicIntro } from './components/CinematicIntro';
import { MagneticCursor } from './components/MagneticCursor';
import { ArchitecturalHUD } from './components/ArchitecturalHUD';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Trajectory } from './sections/Trajectory';
import { Projects } from './sections/Projects';
import { Archive } from './sections/Archive';
import { Stack } from './sections/Stack';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll, active section spy, and GSAP sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger alignment
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Dynamic section tracking for background evolution
    const sectionIds = ['overview', 'about', 'trajectory', 'projects', 'archive', 'stack', 'contact'];
    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Global anchor click interception for smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, {
            offset: -30,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#F5F5F7] overflow-x-hidden film-grain selection:bg-[#44e2cd] selection:text-[#003731]">
      {/* 1. Cinematic Loading & Shutter Entrance Sequence */}
      {isIntroActive && (
        <CinematicIntro onComplete={() => setIsIntroActive(false)} />
      )}

      {/* 2. Premium Desktop Magnetic Cursor with Morphing States */}
      <MagneticCursor />

      {/* 3. Signature Interaction: Architectural Blueprint Telemetry HUD */}
      <ArchitecturalHUD activeTheme={activeProject.theme} />

      {/* 4. Living Atmosphere Background that Evolves Per-Section and Per-Project */}
      <AmbientBackground
        theme={activeProject.theme}
        activeSection={activeSection}
      />

      {/* 5. Navigation Bar with Active Section Spy & Tactile States */}
      <Navbar activeTheme={activeProject.theme} />

      {/* 6. Continuous Scene-to-Scene Architectural Portfolio Sections */}
      <main className="relative z-10 w-full">
        <Hero activeTheme={activeProject.theme} />
        <About activeTheme={activeProject.theme} />
        <Trajectory activeTheme={activeProject.theme} />
        <Projects
          activeTheme={activeProject.theme}
          onActiveProjectChange={setActiveProject}
        />
        <Archive activeTheme={activeProject.theme} />
        <Stack activeTheme={activeProject.theme} />
        <Contact activeTheme={activeProject.theme} />
      </main>

      {/* 7. Hardware Telemetry Diagnostic Footer */}
      <Footer
        activeTheme={activeProject.theme}
        activeProjectNum={activeProject.num}
      />
    </div>
  );
};

export default App;
