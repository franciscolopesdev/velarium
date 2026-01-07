import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

// A component that mimics text struggling to stay coherent
const UnstableText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    // Randomly corrupt characters at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance to glitch per tick
        const splitText = text.split("");
        const randomIdx = Math.floor(Math.random() * splitText.length);
        splitText[randomIdx] = chars[Math.floor(Math.random() * chars.length)];
        setDisplay(splitText.join(""));
        
        // Restore quickly
        setTimeout(() => setDisplay(text), 150);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

const OMITTED_EVENTS = [
    {
        id: "REG-89",
        name: "O Eclipse de Terça-feira",
        description: "O sol ficou preto por doze minutos ao meio-dia. Os semáforos continuaram funcionando. Ninguém olhou para cima."
    },
    {
        id: "REG-104",
        name: "O Prédio que Chorava",
        description: "O Bloco 7 começou a sangrar pelas janelas do terceiro andar. Os moradores apenas fecharam as cortinas."
    },
    {
        id: "REG-211",
        name: "A População Excedente",
        description: "O metrô encheu-se de passageiros sem rosto. Os viajantes regulares apenas se apertaram para dar espaço."
    },
    {
        id: "REG-??",
        name: "A Transmissão",
        description: "Todos os rádios tocaram um grito contínuo por uma hora. Nos cafés, as pessoas apenas falaram um pouco mais alto."
    }
];

const JUSTIFICATIONS = [
    "Eu não vi nada.",
    "Alguém já deve ter ligado.",
    "Não era sangue.",
    "Eu estava atrasado.",
    "Ele não pediu ajuda.",
    "Olhar é se envolver.",
    "Estava escuro demais.",
    "Não é minha culpa.",
    "O barulho parou rápido.",
    "Ninguém mais parou.",
    "É melhor não saber.",
    "Eu só continuei andando."
];

const EventRow = ({ event, index }: { event: { id: string, name: string, description: string }, index: number }) => (
    <div className="group relative border-b border-neutral-900/50 py-8 hover:bg-neutral-900/10 transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            {/* ID */}
            <div className="md:col-span-2">
                 <Reveal variant="fade" delay={index * 0.1}>
                    <span className="font-mono text-[9px] text-neutral-700 tracking-widest uppercase group-hover:text-blood/60 transition-colors">
                        {event.id}
                    </span>
                 </Reveal>
            </div>
            
            {/* Name */}
            <div className="md:col-span-4">
                 <Reveal variant="fade" delay={index * 0.1 + 0.1}>
                    <h5 className="text-neutral-500 font-serif text-lg group-hover:text-neutral-300 transition-colors duration-300">
                        {event.name}
                    </h5>
                 </Reveal>
            </div>

            {/* Description - Initially 'redacted' visually */}
            <div className="md:col-span-6">
                 <Reveal variant="mask" delay={index * 0.1 + 0.2}>
                    <p className="text-neutral-600/40 font-light text-sm leading-relaxed group-hover:text-neutral-500 group-hover:opacity-100 transition-all duration-700 blur-[2px] group-hover:blur-0 select-none group-hover:select-text">
                        {event.description}
                    </p>
                 </Reveal>
            </div>
        </div>
    </div>
);

export const World = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section className="relative min-h-[160vh] flex flex-col items-center justify-center overflow-hidden py-32 bg-obsidian">
      {/* Background Image - Abstract Dark */}
      <div className="absolute inset-0 bg-obsidian z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(30,30,30,0.4),transparent_60%)]" />
      </div>
      
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl px-6 w-full space-y-32">
        
        {/* Main Title Section */}
        <div className="space-y-6 text-center">
            <Reveal variant="blur">
                <h2 className="text-4xl md:text-6xl font-serif text-neutral-300">
                    <UnstableText text="A Cidade da Omissão" />
                </h2>
            </Reveal>
            <Reveal variant="fade" delay={0.3}>
                <p className="text-neutral-500 font-light text-lg md:text-xl tracking-wide max-w-xl mx-auto">
                    Não há ruínas. Não há caos.<br/>
                    Há apenas uma <span className="text-neutral-300">ordem sufocante</span>.
                </p>
            </Reveal>
        </div>

        {/* Architecture & Atmosphere */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div className="space-y-8">
                <Reveal variant="line" className="mb-4">
                     <div className="h-px w-12 bg-neutral-800" />
                </Reveal>
                <div className="space-y-4">
                    <h4 className="text-neutral-300 font-serif text-2xl">Arquitetura Inerte</h4>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm">
                        Os prédios não têm estilo, nem época. São blocos de funcionalidade pura. O concreto nunca racha, a tinta nunca descasca. A cidade é mantida por uma mão invisível que apaga a passagem do tempo durante a noite, impedindo que a história deixe marcas.
                    </p>
                </div>
            </div>
            
            <div className="space-y-8 md:mt-24">
                 <Reveal variant="line" className="mb-4">
                     <div className="h-px w-12 bg-neutral-800" />
                </Reveal>
                <div className="space-y-4">
                    <h4 className="text-neutral-300 font-serif text-2xl">Infraestrutura Autônoma</h4>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm">
                        Os semáforos trocam de cor para ruas vazias. O metrô passa pontualmente a cada quatro minutos, transportando apenas ar viciado. A cidade funciona perfeitamente, não para servir seus habitantes, mas para simular que eles ainda são necessários.
                    </p>
                </div>
            </div>
            
             <div className="space-y-8">
                <Reveal variant="line" className="mb-4">
                     <div className="h-px w-12 bg-neutral-800" />
                </Reveal>
                <div className="space-y-4">
                    <h4 className="text-neutral-300 font-serif text-2xl">O Zumbido</h4>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm">
                        Não há silêncio verdadeiro. Há uma frequência elétrica de baixa voltagem que permeia cada sala. É o som de milhares de aparelhos em 'standby', esperando por um comando que nunca vem. Cobre os passos. Cobre a respiração.
                    </p>
                </div>
            </div>

             <div className="space-y-8 md:mt-24">
                <Reveal variant="line" className="mb-4">
                     <div className="h-px w-12 bg-neutral-800" />
                </Reveal>
                <div className="space-y-4">
                    <h4 className="text-neutral-300 font-serif text-2xl">Interiores Cenográficos</h4>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm">
                        Lojas exibem produtos sem rótulos. Cafés têm mesas postas onde ninguém se senta. Os espaços públicos parecem renderizações arquitetônicas de "normalidade", desprovidos da sujeira, do atrito e da vida humana real.
                    </p>
                </div>
            </div>
        </div>

        {/* The Symbiosis of Compliance */}
        <div className="py-24 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
             <Reveal variant="blur">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-blood/30 to-transparent mx-auto mb-8" />
             </Reveal>
             
             <Reveal variant="mask" width="100%">
                <h3 className="text-2xl md:text-3xl font-serif text-neutral-400 leading-tight">
                    O Olhar não encontra atrito aqui.
                </h3>
             </Reveal>

             <Reveal variant="fade" delay={0.2} className="mt-8 space-y-6">
                <p className="text-neutral-600 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                    O medo cria ruído. O pânico cria distorção.<br/>
                    Mas a <span className="text-neutral-300">aceitação silenciosa</span> cria uma transmissão perfeita.
                </p>
                <p className="text-neutral-700 font-mono text-xs tracking-widest uppercase">
                    Ao fingir que nada acontece, eles garantem que continue acontecendo.
                </p>
             </Reveal>
        </div>

        {/* Omitted Events List */}
        <div className="pt-16">
            <div className="mb-12 flex items-center justify-between">
                <Reveal variant="fade">
                    <h3 className="text-[10px] tracking-[0.4em] font-mono text-neutral-600 uppercase">
                        Arquivos_Omitidos
                    </h3>
                </Reveal>
                <Reveal variant="line" width="fit-content">
                    <div className="h-px w-24 bg-neutral-900" />
                </Reveal>
            </div>
            
            <div className="space-y-2">
                {OMITTED_EVENTS.map((event, index) => (
                    <EventRow key={event.id} event={event} index={index} />
                ))}
            </div>
        </div>

        {/* Justifications / Whispers */}
        <div className="pt-32 w-full">
            <div className="text-center mb-12">
                <Reveal variant="fade">
                    <h3 className="text-[10px] tracking-[0.4em] font-mono text-neutral-700 uppercase">
                        Justificativas_Coletivas
                    </h3>
                </Reveal>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-2xl mx-auto">
                {JUSTIFICATIONS.map((thought, i) => (
                    <Reveal key={i} variant="fade" delay={0.2 + (i * 0.05)}>
                        <p className={`
                            text-neutral-600/40 font-serif italic text-sm hover:text-neutral-500 transition-colors duration-700 cursor-default select-none
                            ${i % 2 === 0 ? 'text-right' : 'text-left'}
                            ${i % 3 === 0 ? 'md:ml-8' : ''}
                            ${i % 3 === 2 ? 'md:mr-8' : ''}
                        `}>
                            "{thought}"
                        </p>
                    </Reveal>
                ))}
            </div>
        </div>
        
        <div className="pt-32 text-center">
             <p className="text-neutral-400 font-serif italic text-2xl opacity-60">
                "<UnstableText text="Continue andando." />"
             </p>
        </div>

      </motion.div>
    </section>
  );
};