import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

type TestStep = {
  prompt: string;
  options: [string, string];
  feedback: string;
};

const ASSESSMENT: TestStep[] = [
  {
    prompt: "Foque no silêncio. Ele é consistente?",
    options: ["Sim", "Ele Flutua"],
    feedback: "Sensibilidade auditiva registrada."
  },
  {
    prompt: "Você reconhece a sala onde está?",
    options: ["Moro aqui", "Parece similar"],
    feedback: "Índice de corrupção de memória atualizado."
  },
  {
    prompt: "Você está sozinho?",
    options: ["Sim", "Acredito que sim"],
    feedback: "Otimismo detectado."
  },
  {
    prompt: "Se você parasse de observar, esta tela existiria?",
    options: ["Sim", "Não"],
    feedback: "Checagem de permanência de objeto: Falhou."
  }
];

export const StabilityTest = () => {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "PROCESSING" | "COMPLETE">("IDLE");
  const [lastFeedback, setLastFeedback] = useState("");

  const handleSelect = (optionIndex: number) => {
    setStatus("PROCESSING");
    
    // Artificial delay to make it feel like the machine is thinking/judging
    setTimeout(() => {
      setLastFeedback(ASSESSMENT[step].feedback);
      
      if (step < ASSESSMENT.length - 1) {
        setStep(prev => prev + 1);
        setStatus("IDLE");
      } else {
        setStatus("COMPLETE");
      }
    }, 1500);
  };

  return (
    <section className="py-32 px-6 bg-obsidian relative z-20 border-t border-neutral-900/30">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16 text-center">
            <Reveal variant="fade">
                <div className="inline-flex items-center gap-3 mb-4 opacity-50">
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-pulse" />
                    <h2 className="text-[10px] tracking-[0.4em] font-mono text-neutral-500 uppercase">
                        Avaliação_Psique_v4
                    </h2>
                </div>
            </Reveal>
            <Reveal variant="blur" delay={0.2}>
                <h3 className="text-xl font-serif text-neutral-400">
                    Teste de Estabilidade Basal
                </h3>
            </Reveal>
        </div>

        <div className="border border-neutral-800 bg-neutral-950/50 p-8 md:p-16 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Background Scanner Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(20,20,20,0.5)_50%,transparent_100%)] h-[200%] w-full animate-[scan_8s_linear_infinite] pointer-events-none opacity-20" />

            <AnimatePresence mode="wait">
                {status === "COMPLETE" ? (
                    <motion.div 
                        key="complete"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        className="text-center space-y-6"
                    >
                        <div className="w-16 h-16 border border-neutral-800 rounded-full mx-auto flex items-center justify-center mb-6">
                            <div className="w-1 h-1 bg-blood shadow-[0_0_10px_rgba(69,10,10,0.8)]" />
                        </div>
                        <h4 className="font-mono text-sm tracking-widest uppercase text-neutral-400">
                            Avaliação Concluída
                        </h4>
                        <p className="font-serif text-neutral-500 italic">
                            "Resultados inconclusivos. Sujeito exibe sinais de <span className="text-neutral-400">realidade permeável</span>."
                        </p>
                        <div className="pt-8">
                             <p className="text-[9px] font-mono text-neutral-700 tracking-[0.3em]">
                                NÃO ATUALIZE A PÁGINA
                             </p>
                        </div>
                    </motion.div>
                ) : status === "PROCESSING" ? (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="flex gap-1 h-8 items-end">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-neutral-700"
                                    animate={{ height: ["20%", "80%", "20%"] }}
                                    transition={{ 
                                        duration: 0.8, 
                                        repeat: Infinity, 
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                        <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase animate-pulse">
                            Processando Resposta...
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md space-y-12"
                    >
                        <h4 className="text-xl md:text-2xl font-serif text-neutral-300 text-center leading-relaxed">
                            {ASSESSMENT[step].prompt}
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                            {ASSESSMENT[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className="group relative h-14 border border-neutral-800 hover:border-neutral-600 transition-colors duration-500 overflow-hidden"
                                >
                                    <span className="relative z-10 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 tracking-wider uppercase transition-colors">
                                        {opt}
                                    </span>
                                    {/* Hover Fill */}
                                    <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out opacity-20" />
                                </button>
                            ))}
                        </div>
                        
                        {/* Previous Feedback ghost */}
                        {lastFeedback && (
                            <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="absolute -bottom-12 left-0 w-full text-center text-[10px] font-mono text-neutral-700 tracking-widest uppercase"
                            >
                                [{lastFeedback}]
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Markers */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-800" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-800" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-800" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-800" />
        </div>
      </div>
    </section>
  );
};