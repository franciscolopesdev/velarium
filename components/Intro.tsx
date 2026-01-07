import React from 'react';
import { motion } from 'framer-motion';
import { IntrusiveText } from './IntrusiveText';
import { Reveal } from './Reveal';

export const Intro = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-2xl mx-auto text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="w-px h-32 bg-gradient-to-b from-transparent via-neutral-800 to-transparent mx-auto"
        />

        <div className="space-y-12">
          {/* Header arrives character by character, coldly */}
          <div className="flex justify-center">
             <IntrusiveText 
                text="O que é Velarium?" 
                className="text-3xl md:text-5xl font-serif text-neutral-200 tracking-tight"
                delay={0.2}
             />
          </div>

          <div className="space-y-8 text-neutral-400 font-light leading-relaxed text-lg md:text-xl text-left md:text-center">
            {/* Body text slides up from darkness, feeling heavy */}
            <Reveal variant="mask" delay={0.4} width="100%">
                <p>
                    Velarium é um RPG de mesa sobre <span className="text-neutral-300">percepção fraturada</span> e <span className="text-neutral-300">pavor silencioso</span>.
                </p>
            </Reveal>
            
            <Reveal variant="mask" delay={0.6} width="100%">
                <p>
                    Situado em um mundo que parece exatamente com o nosso, mas parece... incorreto.
                </p>
            </Reveal>

            <Reveal variant="mask" delay={0.8} width="100%">
                <p>
                Não há monstros debaixo da cama. Há apenas lacunas na sua memória, a geometria que não bate, e a certeza absoluta de que alguém está te observando do outro lado do espelho.
                </p>
            </Reveal>

            <div className="pt-8">
                 <Reveal variant="blur" delay={1.2}>
                    <p className="italic text-neutral-500 text-base border-l border-neutral-800 pl-6 py-2 text-left mx-auto max-w-lg">
                    "Nós não lutamos contra a escuridão. Apenas tentamos manter os olhos abertos tempo suficiente para compreendê-la."
                    </p>
                </Reveal>
            </div>
            
            {/* EASTER EGG: Hidden Text, only visible when selected (highlighted) */}
            <div className="pt-4 select-all">
                <span className="text-obsidian text-[8px] tracking-[2em] uppercase selection:bg-blood selection:text-white transition-colors duration-700">
                    Eles estão esperando você desligar a tela.
                </span>
            </div>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.5 }}
           viewport={{ once: true }}
           transition={{ delay: 1.5, duration: 2 }}
           className="flex justify-center gap-3 mt-12"
        >
           {[...Array(3)].map((_, i) => (
             <div key={i} className="w-1 h-1 bg-neutral-800 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.5}s`}} />
           ))}
        </motion.div>
      </div>
    </section>
  );
};