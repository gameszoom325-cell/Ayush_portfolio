import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects, Project } from './data/projects';
import { Navbar } from './components/Navbar';
import { SwarmCursor } from './components/SwarmCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { AISwarmLoader } from './components/AISwarmLoader';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
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

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger to ensure all horizontal pin positions and triggers are accurately aligned
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#F5F5F7] overflow-x-hidden film-grain selection:bg-[#44e2cd] selection:text-[#003731]">
      {/* Cinematic AI Swarm Reconstruction Sequence (Assembles site before reveal) */}
      {isLoading && (
        <AISwarmLoader onComplete={handleLoadingComplete} />
      )}

      {/* Native Swarm Rebuild Cursor Experience */}
      <SwarmCursor />

      {/* Dynamic Project World Ambient Atmosphere Glows */}
      <AmbientBackground theme={activeProject.theme} />

      {/* Chromium Dynamic Navigation Bar */}
      <Navbar activeTheme={activeProject.theme} />

      {/* Main Sections - Existing GSAP, ScrollTrigger, and animations completely preserved */}
      <main className="relative z-10 w-full pt-20">
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

      {/* Hardware Telemetry Diagnostic Footer */}
      <Footer
        activeTheme={activeProject.theme}
        activeProjectNum={activeProject.num}
      />
    </div>
  );
};

export default App;
