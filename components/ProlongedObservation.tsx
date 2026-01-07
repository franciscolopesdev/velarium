import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Reveal } from './Reveal';

export const ProlongedObservation = () => {
  const [focusTime, setFocusTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isHovered) {
      interval = setInterval(() => {
        setFocusTime(prev => prev + 1);
      }, 1000);
    } else {
      setFocusTime(0);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  // Reactive visuals based on focus time
  useEffect(() => {
    if (focusTime === 0) {
        controls.start({ filter: "blur(0px)", opacity: 1, scale: 1, x: 0 });
    } else if (focusTime > 2 && focusTime <= 4) {
        // Unrest
        controls.start({ 
            x: [0, -2, 2, -1, 0],
            transition: { repeat: Infinity, duration: 0.2 } 
        });
    } else if (focusTime > 4 && focusTime <= 7) {
        // Resistance
        controls.start({ 
            filter: ["blur(0px)", "blur(4px)", "blur(2px)"],
            opacity: 0.7,
            scale: 0.98,
            transition: { duration: 2, repeat: Infinity, repeatType: "mirror" }
        });
    } else if (focusTime > 7) {
        // Rejection
        controls.start({ 
            opacity: 0, 
            filter: "blur(20px)",
            scale: 0.9,
            transition: { duration: 1.5 }
        });
    }
  }, [focusTime, controls]);

  return (
    <section className="py-32 px-6 relative z-10 bg-charcoal/10 border-b border-neutral-900/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Description Side */}
        <div className="space-y-12">
            <div className="space-y-4">
                <Reveal variant="blur">
                    <h2 className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase">
                        Protocolo_Foco
                    </h2>
                </Reveal>
                <Reveal variant="mask" width="100%">
                    <h3 className="text-3xl md:text-4xl font-serif text-neutral-300">
                        O Decaimento do Observador
                    </h3>
                </Reveal>
            </div>

            <div className="space-y-8 border-l border-neutral-800 pl-6">
                <Reveal variant="fade" delay={0.2}>
                    <div className="space-y-2">
                        <h4 className="text-neutral-400 font-serif italic text-lg">Pequenas Mudanças</h4>
                        <p className="text-neutral-600 font-light text-sm leading-relaxed">
                            Se você olhar por tempo suficiente, a cor dos olhos muda ligeiramente. Uma cicatriz desaparece e reaparece no lado oposto do rosto. Detalhes periféricos se reorganizam quando você não está focado neles.
                        </p>
                    </div>
                </Reveal>

                <Reveal variant="fade" delay={0.4}>
                    <div className="space-y-2">
                        <h4 className="text-neutral-400 font-serif italic text-lg">Resistência Semântica</h4>
                        <p className="text-neutral-600 font-light text-sm leading-relaxed">
                            A forma não quer ser vista. Ela começa a parecer "errada". Proporções se tornam desconfortáveis. A imagem fica granulada, como uma foto tirada com pouca luz, escondendo a verdade no ruído digital.
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>

        {/* Interactive Experiment */}
        <div className="relative h-[400px] border border-neutral-900 bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
             
             {/* Scanlines Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] pointer-events-none opacity-10 z-20" />

             <div 
                className="relative z-30 cursor-crosshair p-12 text-center w-full h-full flex flex-col items-center justify-center group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
             >
                <motion.div animate={controls} className="space-y-6">
                    {/* The "Form" */}
                    <div className="w-24 h-24 bg-neutral-900 rounded-full mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-transparent opacity-50" />
                        {/* Subtle face suggestion */}
                        <div className="absolute top-[35%] left-[30%] w-2 h-2 bg-black/40 rounded-full blur-[1px]" />
                        <div className="absolute top-[35%] right-[30%] w-2 h-2 bg-black/40 rounded-full blur-[1px]" />
                        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 rounded-full blur-[2px]" />
                    </div>

                    <div className="h-12 flex items-center justify-center">
                        <p className="font-mono text-xs tracking-widest uppercase text-neutral-500">
                            {focusTime === 0 && "Passe o mouse para observar"}
                            {focusTime > 0 && focusTime <= 2 && "Sujeito Estável"}
                            {focusTime > 2 && focusTime <= 4 && <span className="text-neutral-400">Instabilidade Detectada...</span>}
                            {focusTime > 4 && focusTime <= 7 && <span className="text-blood/70">DESSINCRONIZANDO</span>}
                            {focusTime > 7 && <span className="text-blood font-bold">SINAL PERDIDO</span>}
                        </p>
                    </div>
                </motion.div>
                
                {/* Timer feedback */}
                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-800">
                    TEMPO_FOCO: {focusTime.toString().padStart(2, '0')}s
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};