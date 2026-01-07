import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

export const TheGaps = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-obsidian flex flex-col items-center z-20 overflow-hidden">
      
      {/* Title - barely visible, almost apologetic */}
      <div className="absolute top-24 left-6 md:left-24 opacity-30">
        <Reveal variant="fade">
            <h2 className="text-[10px] tracking-[0.6em] font-mono text-neutral-500 uppercase">
                As Lacunas
            </h2>
        </Reveal>
      </div>

      {/* The Guide Line - Broken */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-neutral-900/30 -translate-x-1/2">
        <div className="absolute top-[40%] bottom-[40%] w-full bg-obsidian z-10" /> 
      </div>

      {/* The Content that isn't there */}
      <div className="sticky top-[40vh] h-[20vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div style={{ opacity, scale }} className="space-y-12">
            <p className="text-neutral-600 font-serif text-xl md:text-3xl italic tracking-wide">
                "Você está esperando algo acontecer."
            </p>
            
            <div className="space-y-4">
                <p className="text-neutral-800 text-xs tracking-[0.3em] uppercase">
                    Não há sustos.
                </p>
                <p className="text-neutral-800 text-xs tracking-[0.3em] uppercase">
                    Há apenas o silêncio.
                </p>
            </div>
        </motion.div>
      </div>

      {/* A hidden truth at the very bottom of the void */}
      <div className="absolute bottom-32 opacity-20 hover:opacity-100 transition-opacity duration-1000">
         <p className="text-[9px] text-blood font-mono tracking-widest cursor-help">
            NÃO PREENCHA
         </p>
      </div>

    </section>
  );
};