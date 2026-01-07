import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

const REFLECTIONS = [
    { 
        question: "Você reconhece o rosto?",
        reflection: "Ele está vestindo você."
    },
    { 
        question: "Há quanto tempo você está olhando?",
        reflection: "Faz mais tempo."
    },
    { 
        question: "O vidro está frio?",
        reflection: "Não há vidro."
    }
];

const MirrorLine = ({ question, reflection, index }: { question: string, reflection: string, index: number }) => {
    return (
        <div className="relative py-16 md:py-24 group cursor-default flex flex-col items-center justify-center">
            {/* The Real Text */}
            <div className="relative z-10 text-center">
                <Reveal variant="fade" delay={index * 0.2}>
                    <h3 className="text-2xl md:text-5xl font-serif text-neutral-400 tracking-wide group-hover:text-neutral-200 transition-colors duration-1000">
                        {question}
                    </h3>
                </Reveal>
            </div>

            {/* The Reflection (Upside Down) 
                It sits absolutely positioned below the main text.
                It mirrors the layout but changes the content.
            */}
            <div className="absolute top-1/2 left-0 w-full flex justify-center pt-8 md:pt-12 pointer-events-none select-none">
                 <div className="transform scale-y-[-1] origin-top opacity-10 blur-[2px] group-hover:opacity-30 group-hover:blur-[0.5px] group-hover:text-blood/80 transition-all duration-[1500ms] ease-out">
                    <h3 className="text-2xl md:text-5xl font-serif text-neutral-500 tracking-wide">
                        {reflection}
                    </h3>
                 </div>
                 
                 {/* The surface of the mirror (Gradient Mask to fade it out) */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/80 to-obsidian z-20 top-1/2 h-32" />
            </div>
        </div>
    )
}

export const YourReflection = () => {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="py-32 bg-obsidian relative z-20 overflow-hidden">
        
        {/* Subtle Divider / Mirror Surface */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-neutral-900/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 opacity-40">
                <Reveal variant="fade">
                    <h2 className="text-[10px] tracking-[0.6em] font-mono text-neutral-600 uppercase">
                        Auto_Identificação
                    </h2>
                </Reveal>
            </div>

            <div className="space-y-8">
                {REFLECTIONS.map((item, i) => (
                    <MirrorLine 
                        key={i} 
                        question={item.question} 
                        reflection={item.reflection} 
                        index={i} 
                    />
                ))}
            </div>

            <div className="mt-32 text-center opacity-30 hover:opacity-100 transition-opacity duration-1000">
                <p className="font-serif italic text-neutral-700 text-sm">
                    "Somos apenas o que nos permitimos ver."
                </p>
            </div>
        </div>
    </section>
  );
};