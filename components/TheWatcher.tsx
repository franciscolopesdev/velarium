import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './Reveal';

export const TheWatcher = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [distanceToCenter, setDistanceToCenter] = useState(1000);
  
  // Track scroll for background darkening
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // The room gets darker as the entity approaches (scroll center)
  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.8, 0]);

  // Handle mouse proximity to the "Invisible Entity" in the center
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance
    const dist = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + 
      Math.pow(e.clientY - centerY, 2)
    );
    
    setDistanceToCenter(dist);
  };

  // Text Reaction: The closer you are to the center, the more the text blurs/fades (Fear Response)
  // 0 distance = 10px blur, 500 distance = 0px blur
  const blurAmount = Math.max(0, 10 - (distanceToCenter / 25));
  const textOpacity = Math.min(1, Math.max(0.2, distanceToCenter / 300));

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 cursor-crosshair"
    >
        {/* The Shadow that falls over the room */}
        <motion.div 
            style={{ opacity: bgOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-0"
        />

        {/* The Breathing Presence (Subtle radial pulse) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-radial-gradient from-charcoal/20 to-transparent rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-12 md:gap-0">
            
            {/* Left Flank */}
            <div className="text-right space-y-12 hidden md:block" style={{ filter: `blur(${blurAmount}px)`, opacity: textOpacity, transition: 'all 0.3s ease-out' }}>
                <Reveal variant="fade" delay={0.2}>
                    <p className="text-neutral-500 font-serif text-lg tracking-wide">
                        Não tem forma.
                    </p>
                </Reveal>
                <Reveal variant="fade" delay={0.4}>
                    <p className="text-neutral-600 font-light text-sm leading-loose">
                        Apenas peso.<br/>
                        Como a mudança de pressão<br/>
                        antes de uma tempestade.
                    </p>
                </Reveal>
            </div>

            {/* THE INVISIBLE ENTITY (Center Column) */}
            <div className="h-[60vh] flex flex-col items-center justify-center relative">
                {/* Visual marker for the user to sense something is there */}
                <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-[2000ms]">
                    <span className="text-[10px] text-blood font-mono tracking-[0.5em] uppercase animate-pulse">
                        Ele sabe que você está aqui
                    </span>
                </div>
                
                {/* The Title, obscured by the presence */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference">
                    <h2 className="text-neutral-800 font-bold text-[12vw] md:text-[8vw] leading-none opacity-20 tracking-tighter">
                        OBSERVADOR
                    </h2>
                </div>
            </div>

            {/* Right Flank */}
            <div className="text-left space-y-12 hidden md:block" style={{ filter: `blur(${blurAmount}px)`, opacity: textOpacity, transition: 'all 0.3s ease-out' }}>
                 <Reveal variant="fade" delay={0.3}>
                    <p className="text-neutral-500 font-serif text-lg tracking-wide">
                        Não pisca.
                    </p>
                </Reveal>
                <Reveal variant="fade" delay={0.5}>
                    <p className="text-neutral-600 font-light text-sm leading-loose">
                        O quarto se curva ao redor dele.<br/>
                        A luz se recusa a tocá-lo.<br/>
                        Você está parado na sombra dele.
                    </p>
                </Reveal>
            </div>
            
            {/* Mobile Fallback Layout (Stacked) */}
            <div className="md:hidden text-center space-y-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
                 <p className="text-neutral-500 font-serif">Algo está na sala.</p>
                 <div className="h-32" /> {/* Empty space for entity */}
                 <p className="text-neutral-500 font-serif">Não o reconheça.</p>
            </div>

        </div>

        {/* Sensory Warning */}
        <div className="absolute bottom-12 w-full text-center">
             <motion.p 
                style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                className="text-[9px] text-neutral-700 font-mono uppercase tracking-[0.3em]"
             >
                Temperatura Caindo...
             </motion.p>
        </div>

    </section>
  );
};