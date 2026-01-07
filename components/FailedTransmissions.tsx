import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

interface Log {
  id: string;
  source: string;
  timestamp: string;
  content: string;
  status: 'CORROMPIDO' | 'FALHOU' | 'DEGRADANDO';
}

const LOGS: Log[] = [
  {
    id: 'TR-099',
    source: 'POSTO 4',
    timestamp: '03:14 AM',
    content: "Andei em linha reta por três dias. Acabei no corredor onde comecei. A tinta ainda está fresca.",
    status: 'CORROMPIDO'
  },
  {
    id: 'TR-102',
    source: 'DESCONHECIDO',
    timestamp: '--:--',
    content: "Não atenda o telefone. Se tocar, apenas deixe... [SINAL PERDIDO] ...não é a sua voz do outro lado.",
    status: 'FALHOU'
  },
  {
    id: 'TR-104',
    source: 'ARQUIVISTA',
    timestamp: '00:00:01',
    content: "Não estamos sozinhos aqui. As paredes estão respirando.",
    status: 'DEGRADANDO'
  }
];

// Component that randomly hides characters to simulate data rot
const RottingText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.8) { // Occasional flicker
            const chars = text.split('');
            // Randomly replace a character with a space or block
            const idx = Math.floor(Math.random() * chars.length);
            const original = chars[idx];
            chars[idx] = Math.random() > 0.5 ? ' ' : '█';
            setDisplay(chars.join(''));
            
            // Restore quickly
            setTimeout(() => setDisplay(text), 100 + Math.random() * 200);
        }
    }, 200);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

const LogEntry = ({ log, index }: { log: Log; index: number }) => {
  return (
    <div className="relative border-l border-neutral-900 pl-6 py-2 group">
      {/* Timeline dot */}
      <div className="absolute -left-[3px] top-4 w-[5px] h-[5px] bg-neutral-800 rounded-full group-hover:bg-blood transition-colors duration-500" />
      
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
        <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase">
            {log.id} // {log.timestamp}
        </span>
        <span className={`font-mono text-[9px] px-1 py-0.5 tracking-wider ${
            log.status === 'FALHOU' ? 'bg-blood/10 text-blood' : 'bg-neutral-900 text-neutral-500'
        }`}>
            {log.status}
        </span>
      </div>

      <Reveal variant="mask" delay={index * 0.2}>
        <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed font-serif max-w-xl opacity-80 group-hover:opacity-100 transition-opacity">
            <RottingText text={log.content} />
        </p>
      </Reveal>
    </div>
  );
};

export const FailedTransmissions = () => {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto relative z-20">
      <div className="mb-16">
        <Reveal variant="fade">
            <h2 className="text-neutral-700 font-mono text-xs tracking-[0.4em] uppercase mb-2">
                Dados Interceptados
            </h2>
        </Reveal>
        <Reveal variant="blur" delay={0.2}>
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-400">
                Transmissões Falhas
            </h3>
        </Reveal>
      </div>

      <div className="space-y-12">
        {LOGS.map((log, index) => (
            <LogEntry key={log.id} log={log} index={index} />
        ))}
      </div>

      {/* Visual Hesitation / Connection Error */}
      <div className="mt-16 flex items-center gap-4 opacity-40">
        <div className="h-px bg-neutral-800 w-12" />
        <span className="font-mono text-[10px] text-neutral-600 uppercase animate-pulse">
            Tentando reconectar...
        </span>
      </div>
    </section>
  );
};