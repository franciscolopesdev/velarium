import React from 'react';
import { Reveal } from './Reveal';
import { IntrusiveText } from './IntrusiveText';

const MechanicRow = ({ label, value, description, delay }: { label: string; value: string; description: string, delay: number }) => (
    <div className="relative group">
        {/* The cinematic separator line */}
        <Reveal width="100%" variant="line" delay={delay} duration={1.5} className="origin-left">
             <div className="h-px w-full bg-neutral-900 group-hover:bg-neutral-800 transition-colors duration-1000" />
        </Reveal>

        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
                {/* Headers intrude character by character */}
                <IntrusiveText 
                    text={label} 
                    delay={delay + 0.2}
                    className="text-3xl font-serif text-neutral-400 tracking-wider group-hover:text-neutral-200 transition-colors duration-1000"
                />
            </div>
            
            <div className="md:col-span-2 pt-2">
                 <Reveal variant="fade" delay={delay + 0.3}>
                    <div className="font-mono text-blood/60 text-xs tracking-[0.2em] group-hover:text-blood/80 transition-colors">
                        {value}
                    </div>
                </Reveal>
            </div>
            
            <div className="md:col-span-6">
                <Reveal variant="mask" delay={delay + 0.4} width="100%">
                    <p className="text-neutral-600 font-light leading-loose text-lg group-hover:text-neutral-500 transition-colors duration-1000">
                        {description}
                    </p>
                </Reveal>
            </div>
        </div>
    </div>
);

export const Mechanics = () => {
  return (
    <section className="py-48 px-6 max-w-6xl mx-auto">
       <div className="mb-32 pl-0 md:pl-4">
        <Reveal variant="line" duration={1.5} className="origin-left mb-8">
            <span className="block w-24 h-[2px] bg-blood/40" />
        </Reveal>
        
        <Reveal variant="blur" delay={0.2}>
            <h2 className="text-xs font-mono text-neutral-500 tracking-[0.4em] uppercase mb-6">
                Os Sistemas de Pavor
            </h2>
        </Reveal>
        
        <Reveal variant="mask" delay={0.4} width="100%">
            <p className="text-neutral-400 text-2xl md:text-3xl font-serif leading-relaxed max-w-2xl">
                Mecânicas projetadas para erodir a agência <br /> e fortalecer o silêncio.
            </p>
        </Reveal>
      </div>

      <div className="space-y-4">
        <MechanicRow
            label="LUCIDEZ"
            value="00 — 100"
            description="Lucidez não é saúde. É um filtro. Conforme cai, o mundo muda. Pistas viram alucinações. Aliados parecem inimigos. Quanto mais baixo, mais verdade você vê."
            delay={0}
        />
        <MechanicRow
            label="TENSÃO"
            value="ESCALANDO"
            description="Uma reserva compartilhada de pavor. Cada falha alimenta o Dado de Tensão. Quando cai 1, a anomalia se manifesta. O silêncio é quebrado. Não há como resetar o relógio."
            delay={0.2}
        />
        <MechanicRow
            label="VÍNCULOS"
            value="SACRIFICIAIS"
            description="Você não pode sobreviver sozinho, mas a confiança é perigosa. Você pode queimar Vínculos para passar em testes, efetivamente ferindo seus relacionamentos para salvar sua pele."
            delay={0.4}
        />
        <Reveal width="100%" variant="line" delay={0.6} duration={1.5} className="origin-left">
             <div className="h-px w-full bg-neutral-900" />
        </Reveal>
      </div>
    </section>
  );
};