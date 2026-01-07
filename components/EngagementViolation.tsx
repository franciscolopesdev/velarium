import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

export const EngagementViolation = () => {
  const [engaged, setEngaged] = useState(false);

  return (
    <section className="py-32 px-6 relative z-10 bg-obsidian border-b border-neutral-900/30 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-20">
        
        <div className="mb-16">
            <Reveal variant="blur">
                <h2 className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase">
                    Protocolo_Interação
                </h2>
            </Reveal>
            <Reveal variant="fade" delay={0.2}>
                <h3 className="text-3xl md:text-4xl font-serif text-neutral-300 mt-4">
                    A Violação de Contato
                </h3>
            </Reveal>
        </div>

        <div className="relative min-h-[400px] flex flex-col items-center justify-center">
            <AnimatePresence>
                {!engaged ? (
                    <motion.div 
                        key="prompt"
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="z-30 relative"
                    >
                        <Reveal variant="fade" delay={0.4}>
                            <p className="text-neutral-500 font-light mb-8 max-w-md mx-auto leading-relaxed">
                                Tentar interagir diretamente não revela a verdade. <br/>
                                Apenas força a entidade a reagir defensivamente.
                            </p>
                        </Reveal>
                        <Reveal variant="fade" delay={0.6}>
                            <button 
                                onClick={() => setEngaged(true)}
                                className="px-8 py-3 border border-neutral-800 text-neutral-400 font-mono text-xs tracking-widest hover:bg-neutral-900 hover:text-neutral-200 transition-all uppercase group"
                            >
                                <span className="group-hover:text-blood transition-colors">Forçar Interação</span>
                            </button>
                        </Reveal>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="reaction"
                        className="absolute inset-0 flex items-center justify-center z-30"
                    >
                        <div className="space-y-8 pointer-events-none mix-blend-difference text-neutral-200">
                             <motion.h4 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-2xl font-serif italic"
                             >
                                "Não há nada aqui dentro."
                             </motion.h4>
                             <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="font-mono text-[10px] tracking-[0.2em] uppercase text-blood"
                             >
                                INTEGRIDADE ESTRUTURAL COMPROMETIDA
                             </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Background Entity that reacts violently */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-neutral-800/20 rounded-full blur-3xl z-10"
                animate={engaged ? {
                    scale: [1, 20],
                    opacity: [0.5, 0],
                } : {
                    scale: [1, 1.1, 1],
                    opacity: 0.5
                }}
                transition={engaged ? { duration: 3, ease: [0.22, 1, 0.36, 1] } : { duration: 4, repeat: Infinity }}
            />
            
            {engaged && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 4 }}
                    className="absolute inset-0 z-0 bg-neutral-950/80" 
                />
            )}

        </div>
        
        {/* Post-interaction Text Description - Appears after the "violation" */}
        {engaged && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 2 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
             >
                <div className="space-y-4 border-l border-neutral-900 pl-6">
                    <h4 className="text-neutral-400 font-serif text-lg">Escala Impossível</h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Quando você toca, ele não fica mais claro. Ele incha. A forma se expande rapidamente para preencher seu campo de visão, tornando-se uma parede de textura cinza e vazia. Você não vê o rosto melhor; você vê os poros se tornarem vales desolados.
                    </p>
                </div>
                <div className="space-y-4 border-l border-neutral-900 pl-6">
                    <h4 className="text-neutral-400 font-serif text-lg">Exposição Involuntária</h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Não é um convite. É uma invasão de domicílio. A entidade se dissolve em ruído visual, não para se esconder, mas porque você quebrou a distância necessária para que ela exista como uma pessoa.
                    </p>
                </div>
             </motion.div>
        )}

      </div>
    </section>
  );
};