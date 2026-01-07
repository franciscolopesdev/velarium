import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export const DysmorphicResonance = () => {
  return (
    <section className="py-32 px-6 relative z-10 border-b border-neutral-900/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-24 md:pl-12 border-l border-neutral-800">
            <Reveal variant="blur">
                <h2 className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-4">
                    Patologia_Visual
                </h2>
            </Reveal>
            <Reveal variant="mask" width="100%">
                <h3 className="text-3xl md:text-5xl font-serif text-neutral-300">
                    Ressonância Dismórfica
                </h3>
            </Reveal>
            <Reveal variant="fade" delay={0.2}>
                <p className="mt-6 text-neutral-500 font-light max-w-lg italic">
                    "O corpo não é um recipiente. É um sintoma. Quando a mente fratura, a forma física falha em manter a coesão."
                </p>
            </Reveal>
        </div>

        {/* The Distortions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            
            {/* 1. Asymmetry */}
            <div className="relative group">
                <Reveal variant="line" className="mb-6">
                    <div className="w-full h-px bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                </Reveal>
                <Reveal variant="fade" delay={0.3}>
                    <h4 className="text-neutral-400 font-serif text-xl mb-4 group-hover:text-neutral-200 transition-colors">
                        Assimetria do Medo
                    </h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Um ombro cai mais baixo que o outro, não pela gravidade, mas pelo peso de um segredo guardado no lado esquerdo do peito. A espinha se curva para se afastar de um observador invisível.
                    </p>
                </Reveal>
            </div>

            {/* 2. Visual Hesitation */}
            <div className="relative group mt-8 md:mt-0">
                <Reveal variant="line" className="mb-6" delay={0.2}>
                    <div className="w-full h-px bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                </Reveal>
                <Reveal variant="fade" delay={0.5}>
                    <h4 className="text-neutral-400 font-serif text-xl mb-4 group-hover:text-neutral-200 transition-colors">
                        <motion.span 
                            animate={{ opacity: [1, 0.5, 1] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Hesitação da Realidade
                        </motion.span>
                    </h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        A silhueta tremula nas bordas. Como uma queda de taxa de quadros na existência. A forma existe, duvida de si mesma por um milissegundo, e então retorna ligeiramente deslocada.
                    </p>
                </Reveal>
            </div>

            {/* 3. Incomplete Outlines */}
            <div className="relative group mt-8 md:mt-0">
                <Reveal variant="line" className="mb-6" delay={0.4}>
                    <div className="w-full h-px bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                </Reveal>
                <Reveal variant="fade" delay={0.7}>
                    <h4 className="text-neutral-400 font-serif text-xl mb-4 group-hover:text-neutral-200 transition-colors">
                        Censura Traumática
                    </h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Onde a memória dói, a renderização falha. O rosto se torna um borrão de estática cinza exatamente onde os olhos deveriam encontrar o espelho. Áreas inteiras do corpo se tornam transparência negativa.
                    </p>
                </Reveal>
            </div>
        </div>

        {/* Closing observation */}
        <div className="mt-24 text-center">
            <Reveal variant="blur" delay={1.0}>
                <p className="text-[10px] font-mono text-blood/50 tracking-[0.4em] uppercase">
                    A forma segue a função do pânico
                </p>
            </Reveal>
        </div>

      </div>
    </section>
  );
};