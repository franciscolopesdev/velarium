import React, { useState, useEffect } from 'react';
import { motion, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Manifestation } from './components/Manifestation';
import { Archetypes } from './components/Archetypes';
import { Mechanics } from './components/Mechanics';
import { DysmorphicResonance } from './components/DysmorphicResonance';
import { ProlongedObservation } from './components/ProlongedObservation';
import { EngagementViolation } from './components/EngagementViolation';
import { TheSignal } from './components/TheSignal';
import { World } from './components/World';
import { StabilityTest } from './components/StabilityTest';
import { FailedTransmissions } from './components/FailedTransmissions';
import { PsychologicalPressure } from './components/PsychologicalPressure';
import { Echoes } from './components/Echoes';
import { YourReflection } from './components/YourReflection';
import { TheWatcher } from './components/TheWatcher';
import { TheGaps } from './components/TheGaps';
import { ExitCondition } from './components/ExitCondition';
import { ObservationLog } from './components/ObservationLog';
import { AmbientSound } from './components/AmbientSound';
import { Footer } from './components/Footer';
import { useObservation } from './hooks/useObservation';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const { isIdle, scrollYProgress, duration, isTabFocused } = useObservation();
  const [voidTriggered, setVoidTriggered] = useState(false);
  const [keystrokes, setKeystrokes] = useState("");

  useEffect(() => {
    setMounted(true);

    // EASTER EGG 1: The Console Observer
    console.log("%c VOCÊ NÃO DEVERIA ESTAR AQUI.", "color: #450a0a; font-size: 25px; font-family: serif; font-weight: bold; text-shadow: 2px 2px black;");
    console.log("%c Ler o código não vai te salvar.", "color: #a3a3a3; font-size: 14px; font-family: monospace;");
    console.log("%c Nós vemos você depurando.", "color: #262626; font-size: 12px; font-family: monospace; margin-top: 10px;");
  }, []);

  // EASTER EGG 2: The "VOID" Protocol
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const char = e.key.toUpperCase();
        // Allow only letters
        if (!/^[A-Z]$/.test(char)) return;

        setKeystrokes((prev) => {
            const newStr = (prev + char).slice(-4); // Keep last 4 chars
            if (newStr === "VOID") {
                triggerVoid();
            }
            return newStr;
        });
    };

    const triggerVoid = () => {
        setVoidTriggered(true);
        setTimeout(() => setVoidTriggered(false), 200); // Quick flash
        
        // Log incident
        console.warn("PROTOCOLO VOID INICIADO PELO USUÁRIO.");
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // SEPARATION ANXIETY: Tab Title Manipulation
  useEffect(() => {
    const originalTitle = document.title;
    if (!isTabFocused) {
        // The website misses you.
        document.title = "Não desvie o olhar.";
    } else {
        document.title = originalTitle;
    }
    return () => {
        document.title = originalTitle;
    };
  }, [isTabFocused]);

  // SIGNAL DECAY: Grain increases with scroll depth + time
  const grainOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.15]);
  
  if (!mounted) return null;

  return (
    <main className={`bg-obsidian min-h-screen text-mist font-sans font-light overflow-x-hidden relative selection:bg-blood/30 selection:text-neutral-200 transition-all duration-100 ${voidTriggered ? 'invert contrast-150' : ''}`}>
      <AmbientSound scrollProgress={scrollYProgress} />
      
      {/* THE FRAME IS IMMUTABLE */}
      <div className="relative z-10 origin-center">
        <Hero />
        <div className="relative z-10">
          <Intro />
          <Manifestation />
          <Archetypes />
          <Mechanics />
          <DysmorphicResonance />
          <ProlongedObservation />
          <EngagementViolation />
          <TheSignal />
          <World />
          <StabilityTest />
          <FailedTransmissions />
          <PsychologicalPressure />
          <Echoes />
          <YourReflection />
          <TheWatcher />
          <TheGaps />
          <ExitCondition />
          <ObservationLog duration={duration} isIdle={isIdle} isTabFocused={isTabFocused} />
          <Footer duration={duration} />
        </div>
      </div>
      
      {/* --- ATMOSPHERE LAYERS --- */}

      {/* 1. Global Vignette (Static, soft edges) */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* 2. The Paranoia Overlay (Idle State) */}
      <div 
        className={`fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] transition-opacity duration-[3000ms] ease-in-out ${isIdle ? 'opacity-95' : 'opacity-0'}`}
      />

      {/* 3. Global Grain */}
      <motion.div 
        className="grain fixed top-0 left-0 w-full h-full pointer-events-none z-50 transition-all duration-[2000ms]"
        style={{ opacity: isIdle ? 0.15 : grainOpacity }}
      />

      {/* 4. CRT Scanlines */}
      <div className="scanlines" />

      {/* 5. The VOID Flash Message (Hidden unless triggered) */}
      <AnimatePresence>
        {voidTriggered && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
            >
                <h1 className="text-[10vw] font-bold text-black font-serif mix-blend-difference tracking-tighter">
                    OLHE PARA TRÁS
                </h1>
            </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}