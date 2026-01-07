import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal } from './Reveal';

const MESSAGES = [
  "AS PAREDES SÃO FINAS AQUI",
  "NÃO CONFIE NO REFLEXO",
  "EU POSSO OUVIR VOCÊ RESPIRAR",
  "VOCÊ NÃO ESTÁ SOZINHO NESTA SALA",
  "ELES ESTÃO ESPERANDO VOCÊ DORMIR"
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const DecipherText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const [output, setOutput] = useState(text);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isHovered) {
      // Resolve to clear text quickly but with a slight "settling" effect
      let iterations = 0;
      interval = setInterval(() => {
        setOutput(text.split("").map((char, index) => {
          if (index < iterations) return text[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join(""));
        
        iterations += 1/2; // Slow resolve
        if (iterations > text.length) {
            clearInterval(interval);
            setOutput(text);
        }
      }, 30);
    } else {
      // Chaos mode: Constantly shuffle
      interval = setInterval(() => {
        setOutput(text.split("").map(() => 
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join(""));
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className="font-mono">{output}</span>;
};

export const TheSignal = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-20%" });

  // Cycle messages slowly when not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 4000); // New message every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section ref={containerRef} className="py-32 px-6 flex justify-center items-center bg-obsidian relative border-t border-b border-neutral-900/30">
        
        {/* Decorative static lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-20" />

        <div className="max-w-2xl w-full">
            <Reveal variant="fade" width="100%">
                <div 
                    className="group border border-neutral-900 bg-black/40 p-12 text-center cursor-crosshair relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header: Technical Label */}
                    <div className="absolute top-4 left-4 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-blood shadow-[0_0_8px_rgba(69,10,10,0.8)]' : 'bg-neutral-800'}`} />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                            Interceptação_Sinal // {isHovered ? "TRAVADO" : "ESCANEANDO"}
                        </span>
                    </div>

                    {/* The Message */}
                    <div className="py-8 min-h-[120px] flex items-center justify-center">
                        <h3 className={`text-xl md:text-2xl tracking-[0.15em] transition-colors duration-300 ${isHovered ? 'text-neutral-200' : 'text-neutral-700 blur-[1px]'}`}>
                             <DecipherText 
                                text={MESSAGES[messageIndex]} 
                                isHovered={isHovered} 
                             />
                        </h3>
                    </div>
                    
                    {/* Prompt */}
                    <div className="absolute bottom-4 right-4">
                        <span className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-40 text-neutral-500'}`}>
                            [ Passe o mouse para Estabilizar ]
                        </span>
                    </div>

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                </div>
            </Reveal>
        </div>
    </section>
  );
};