import React from 'react';
import { Reveal } from './Reveal';

export const Manifestation = () => {
  return (
    <section className="py-24 px-6 relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl mx-auto space-y-24 text-center">
        
        {/* The Emergence */}
        <div className="space-y-6">
            <Reveal variant="blur" duration={2}>
                <h2 className="text-neutral-800 font-mono text-[10px] tracking-[0.8em] uppercase">
                    ANOMALIA_VISUAL_01
                </h2>
            </Reveal>
            <Reveal variant="mask" delay={0.3} width="100%">
                <p className="text-2xl md:text-4xl font-serif text-neutral-400 leading-snug">
                    A forma não entra na sala.<br/>
                    Ela <span className="text-neutral-200">coagula</span> da granulação do ar.
                </p>
            </Reveal>
        </div>

        {/* The Missing Elements & Light Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-left border-l border-neutral-900/50 pl-8 md:pl-0 md:border-l-0">
            <div className="space-y-4 md:text-right md:border-r md:border-neutral-900/50 md:pr-8">
                 <Reveal variant="fade" delay={0.5}>
                    <h3 className="text-neutral-500 font-serif text-lg italic">
                        Ausência
                    </h3>
                 </Reveal>
                 <Reveal variant="fade" delay={0.6}>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Faltam as arestas. A silhueta vibra, recusando-se a definir onde o corpo termina e a escuridão começa. Não há rosto, apenas uma sugestão de onde os olhos deveriam estar.
                    </p>
                 </Reveal>
            </div>

            <div className="space-y-4">
                 <Reveal variant="fade" delay={0.7}>
                    <h3 className="text-neutral-500 font-serif text-lg italic">
                        Absorção
                    </h3>
                 </Reveal>
                 <Reveal variant="fade" delay={0.8}>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        A luz não reflete na superfície; ela contorna a forma, criando um halo reverso. O centro é um preto fosco, sem profundidade, engolindo o ambiente ao redor.
                    </p>
                 </Reveal>
            </div>
        </div>

        {/* The Incompleteness */}
        <div className="pt-12">
            <Reveal variant="blur" delay={1.0}>
                <p className="text-blood/60 font-mono text-xs tracking-[0.2em] uppercase">
                    ERRO DE RENDERIZAÇÃO
                </p>
            </Reveal>
            <Reveal variant="fade" delay={1.2}>
                <p className="mt-4 text-neutral-500 font-serif text-xl italic opacity-70">
                    "Parece um rascunho. Uma memória abandonada antes de ser salva."
                </p>
            </Reveal>
        </div>

      </div>
      
      {/* Background glitch element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[40%] bg-gradient-to-b from-transparent via-neutral-800 to-transparent opacity-20" />
    </section>
  );
};