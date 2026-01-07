import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

export const PsychologicalPressure = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Compression: Margins collapse from comfortable to negative (overlapping)
  const margin = useTransform(scrollYProgress, [0.3, 0.8], ["3rem", "-1.5rem"]);
  
  // Opacity: Text gets ghosted as it overlaps
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [0.8, 0.4]);
  
  // Color shift: Turns towards alarm color at peak pressure
  const color = useTransform(scrollYProgress, [0.6, 0.9], ["#a3a3a3", "#450a0a"]);
  
  // Scale: Subtle looming effect
  const scale = useTransform(scrollYProgress, [0.3, 0.8], [1, 1.05]);

  // Metronome Ring Rotation (Visual timer)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const ringOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.2, 0]);

  const PHRASES = [
    "Está mais perto?",
    "É só uma sensação.",
    "É só uma sensação.",
    "As paredes estão se movendo.",
    "As paredes estão se movendo.",
    "Quieto demais.",
    "Quieto demais.",
    "Quieto demais.",
    "NÃO PISQUE."
  ];

  return (
    <section ref={containerRef} className="min-h-[150vh] bg-obsidian relative z-20 flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* The Visual Timer / Constrictor */}
      <motion.div 
        style={{ rotate: rotation, opacity: ringOpacity }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-dashed border-neutral-800 rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ rotate: rotation, opacity: ringOpacity, scale: 0.7 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-dashed border-neutral-800 rounded-full pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-xl px-6">
         <Reveal variant="fade">
            <h2 className="text-neutral-700 font-mono text-[10px] tracking-[0.4em] uppercase mb-16">
                Pressão Psicológica
            </h2>
         </Reveal>

         <div className="flex flex-col items-center">
            {PHRASES.map((phrase, i) => (
                <motion.p
                    key={i}
                    style={{ 
                        marginBottom: margin, 
                        scale, 
                        opacity: i === PHRASES.length - 1 ? 1 : opacity,
                        color: i === PHRASES.length - 1 ? "#450a0a" : color,
                        zIndex: i 
                    }}
                    className={`
                        font-serif text-3xl md:text-5xl transition-colors duration-0
                        ${i === PHRASES.length - 1 ? 'font-medium tracking-widest' : 'font-light text-neutral-400'}
                    `}
                >
                    {phrase}
                </motion.p>
            ))}
         </div>
         
         <Reveal variant="fade" delay={0.5}>
             <div className="mt-32 opacity-40">
                <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                    Sujeito exibindo sinais de angústia.
                </p>
             </div>
         </Reveal>
      </div>
    </section>
  );
};