import React, { useMemo } from 'react';
import { Reveal } from './Reveal';

// Generate a static session ID for this visit
const useSessionId = () => {
    return useMemo(() => {
        return Math.random().toString(16).substring(2, 10).toUpperCase();
    }, []);
};

export const Footer = ({ duration }: { duration: number }) => {
  const sessionId = useSessionId();

  // Format time as MM:SS:MS roughly
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <footer className="py-32 bg-obsidian border-t border-neutral-900/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Column 1: The Verdict */}
            <div className="space-y-6">
                <Reveal variant="fade">
                    <h2 className="text-neutral-500 font-serif tracking-widest text-sm">REGISTRO DE OBSERVAÇÃO</h2>
                </Reveal>
                <Reveal variant="mask" delay={0.2} width="100%">
                    <p className="text-neutral-700 font-mono text-xs leading-relaxed uppercase">
                        ID do Sujeito: <span className="text-neutral-500">{sessionId}</span><br/>
                        Duração: <span className="text-neutral-500">{formatTime(duration)}</span><br/>
                        Status: <span className={duration > 60 ? "text-blood animate-pulse" : "text-neutral-500"}>
                            {duration > 60 ? "COMPROMETIDO" : "ATIVO"}
                        </span>
                    </p>
                </Reveal>
            </div>

            {/* Column 2: The Dismissal */}
            <div className="space-y-6 md:text-right">
                <Reveal variant="fade" delay={0.4}>
                     <p className="text-neutral-400 font-light text-sm md:ml-auto max-w-xs">
                        Já vimos o suficiente por enquanto. <br/>
                        Você pode retornar à sua realidade.
                     </p>
                </Reveal>
                
                <Reveal variant="line" delay={0.6}>
                    <div className="inline-block pt-4">
                        <span className="text-[10px] text-neutral-800 tracking-[0.2em] uppercase">
                            Protocolo Velarium v0.9
                        </span>
                    </div>
                </Reveal>
            </div>
        </div>
      </div>
      
      {/* Subtle bottom gradient to ensure it fades to absolute black */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
};