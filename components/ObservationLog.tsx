import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

interface ObservationLogProps {
  duration: number;
  isIdle: boolean;
  isTabFocused: boolean;
}

const Metric = ({ label, value, status = "normal" }: { label: string; value: string; status?: "normal" | "warning" | "danger" }) => (
  <div className="flex justify-between items-center py-3 border-b border-neutral-900/50 font-mono text-xs md:text-sm">
    <span className="text-neutral-600 uppercase tracking-wider">{label}</span>
    <span className={`
      ${status === 'normal' ? 'text-neutral-400' : ''}
      ${status === 'warning' ? 'text-neutral-300' : ''}
      ${status === 'danger' ? 'text-blood animate-pulse' : ''}
    `}>
      {value}
    </span>
  </div>
);

export const ObservationLog = ({ duration, isIdle, isTabFocused }: ObservationLogProps) => {
  // Simulated biometric data
  const [heartRate, setHeartRate] = useState(72);
  
  useEffect(() => {
    // Slowly increase "heart rate" as they stay on the site
    const interval = setInterval(() => {
      setHeartRate(prev => Math.min(110, prev + Math.floor(Math.random() * 3) - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 bg-obsidian relative z-20">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex items-end gap-4 mb-12">
            <h2 className="text-2xl font-serif text-neutral-300">Registro de Observação</h2>
            <span className="font-mono text-[10px] text-blood mb-1 animate-pulse">● GRAVAÇÃO AO VIVO</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          {/* LEFT COLUMN: The "Biometrics" (Implied Surveillance) */}
          <div className="space-y-2">
            <Reveal variant="line" width="100%">
              <div className="h-px bg-neutral-800 mb-4" />
            </Reveal>
            
            <Reveal variant="fade" delay={0.1}>
              <Metric 
                label="Dilatação Pupilar" 
                value={isIdle ? "ESTÁVEL" : "FLUTUANDO"} 
                status={isIdle ? "normal" : "warning"}
              />
            </Reveal>
            <Reveal variant="fade" delay={0.2}>
              <Metric 
                label="Luz Ambiente" 
                value="< 15 LUX (BAIXA)" 
                status="warning"
              />
            </Reveal>
            <Reveal variant="fade" delay={0.3}>
              <Metric 
                label="Proxy Freq. Cardíaca" 
                value={`${heartRate} BPM`} 
                status={heartRate > 90 ? "danger" : "normal"}
              />
            </Reveal>
            <Reveal variant="fade" delay={0.4}>
              <Metric 
                label="Fixação do Olhar" 
                value={!isTabFocused ? "PERDIDA" : "TRAVADA"} 
                status={!isTabFocused ? "danger" : "normal"}
              />
            </Reveal>
          </div>

          {/* RIGHT COLUMN: The Behavioral Analysis */}
          <div className="space-y-6">
             <Reveal variant="mask" delay={0.4}>
                <h3 className="text-neutral-500 font-mono text-xs tracking-[0.2em] uppercase mb-4">
                  Notas do Analista
                </h3>
             </Reveal>

             <div className="space-y-4 font-light text-neutral-400 text-sm leading-relaxed">
                <Reveal variant="fade" delay={0.5}>
                  <p>
                    ID do Sujeito <span className="text-neutral-600 font-mono bg-neutral-900 px-1">UNK-{Math.floor(duration * 13.5)}</span> manteve conexão por {duration} segundos.
                  </p>
                </Reveal>

                {isIdle && (
                  <Reveal variant="fade">
                    <p className="text-neutral-300 border-l-2 border-blood/50 pl-3">
                      O sujeito está hesitante. Movimento cessou. Possível resposta de medo detectada.
                    </p>
                  </Reveal>
                )}

                {!isIdle && duration > 30 && (
                  <Reveal variant="fade">
                    <p>
                      Movimento do cursor exibe micro-tremores consistentes com ansiedade subconsciente. O sujeito suspeita que está sendo observado.
                    </p>
                  </Reveal>
                )}

                {!isTabFocused && (
                  <Reveal variant="fade">
                    <p className="text-blood">
                      QUEBRA DE ATENÇÃO DETECTADA. Sujeito tentou cortar o elo visual.
                    </p>
                  </Reveal>
                )}

                {duration > 120 && (
                  <Reveal variant="fade">
                    <p className="italic opacity-60">
                      Por que ainda estão aqui? Não há mais nada para ver.
                    </p>
                  </Reveal>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};