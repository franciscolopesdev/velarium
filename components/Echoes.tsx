import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

export const Echoes = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the "ghosts" - they move faster than the scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1, 0.5]);

  const ECHOES = [
    { text: "Já estivemos aqui antes?", sub: "INDICE_MEMÓRIA_01", align: "right" },
    { text: "Já estivemos aqui antes?", sub: "INDICE_MEMÓRIA_01_COPIA", align: "left" },
    { text: "Já estivemos aqui antes?", sub: "DADOS_CORROMPIDOS", align: "right" },
    { text: "Você nunca saiu.", sub: "ESTADO_ATUAL", align: "center" },
  ];

  return (
    <section ref={containerRef} className="py-40 bg-obsidian relative z-20 overflow-hidden">
        {/* Background Mirror Text */}
        <div className="absolute top-1/4 -left-20 pointer-events-none opacity-[0.02]">
             <div className="text-[15vw] font-serif leading-none rotate-90 whitespace-nowrap">
                RECURSÃO
             </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-24">
            <div className="text-center mb-16">
                 <Reveal variant="fade">
                    <h2 className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase">
                        Ecos
                    </h2>
                 </Reveal>
            </div>

            <div className="relative">
                {/* The vertical line that connects them, slightly crooked */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-neutral-900 to-transparent -translate-x-1/2" />

                {ECHOES.map((item, i) => {
                    const isCenter = item.align === "center";
                    const isRight = item.align === "right";
                    
                    return (
                        <div key={i} className={`flex ${isCenter ? 'justify-center' : isRight ? 'justify-end' : 'justify-start'} relative mb-24 md:mb-32`}>
                            <div className={`w-[80%] md:w-[45%] ${isCenter ? 'text-center w-full' : isRight ? 'text-right pr-8' : 'text-left pl-8'} relative`}>
                                
                                {/* Timeline Node */}
                                {!isCenter && (
                                    <div className={`absolute top-4 w-2 h-2 bg-neutral-800 rounded-full border border-neutral-900 ${isRight ? '-left-[5px] -translate-x-1/2' : '-right-[5px] translate-x-1/2'} z-10`} />
                                )}
                                
                                <Reveal variant="fade" delay={i * 0.15}>
                                    <div className="relative z-10">
                                        <h3 className={`
                                            font-serif text-neutral-400 transition-all duration-500
                                            ${isCenter ? 'text-4xl md:text-6xl text-neutral-200' : 'text-2xl md:text-4xl opacity-70'}
                                            ${i === 2 ? 'blur-[1px] opacity-50' : ''}
                                        `}>
                                            {item.text}
                                        </h3>
                                        <p className="font-mono text-[9px] text-blood/40 uppercase tracking-widest mt-3">
                                            {item.sub}
                                        </p>
                                    </div>
                                </Reveal>

                                {/* The Echo Ghost - Floating independently */}
                                {!isCenter && (
                                    <motion.div 
                                        style={{ y: i % 2 === 0 ? y1 : y2 }}
                                        className="absolute top-0 left-0 w-full h-full pointer-events-none text-neutral-200 mix-blend-overlay opacity-10"
                                    >
                                        <h3 className="text-2xl md:text-4xl font-serif blur-[4px]">
                                            {item.text}
                                        </h3>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
};