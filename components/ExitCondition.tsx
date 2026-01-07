import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

export const ExitCondition = () => {
  const [hasDisconnected, setHasDisconnected] = useState(false);

  return (
    <section className="py-32 min-h-[60vh] flex items-center justify-center bg-obsidian relative z-20 border-t border-neutral-900/30">
      <div className="max-w-xl w-full px-6 text-center space-y-12">
        <Reveal variant="fade">
             <h2 className="text-[10px] tracking-[0.4em] font-mono text-neutral-600 uppercase opacity-50">
                Condição_Saída
             </h2>
        </Reveal>

        <AnimatePresence mode="wait">
            {!hasDisconnected ? (
                <motion.div 
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <p className="font-serif text-2xl md:text-3xl text-neutral-400">
                        A sessão foi concluída.
                    </p>
                    <p className="font-light text-neutral-600 text-sm leading-relaxed max-w-sm mx-auto">
                        Sua participação foi notada. <br/>
                        A porta está aberta. Você pode retornar à sua realidade.
                    </p>
                    
                    <button 
                        onClick={() => setHasDisconnected(true)}
                        className="group relative px-8 py-3 overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors duration-1000"
                    >
                         <span className="relative z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
                            Iniciar Desconexão
                         </span>
                         <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    key="message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="space-y-8"
                >
                     <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-[9px] text-neutral-700 uppercase tracking-widest"
                     >
                        Conexão Cortada...
                     </motion.p>
                     
                     <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-px w-12 bg-neutral-900 mx-auto" 
                     />

                     <p className="font-serif text-xl md:text-2xl text-neutral-500 italic opacity-80">
                        "Não se preocupe com o que viu aqui.<br/>
                        É apenas uma memória agora."
                     </p>
                     
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.5, duration: 2.5 }}
                     >
                        <p className="text-[9px] text-blood/60 font-mono tracking-[0.2em] uppercase mt-16 hover:text-blood/90 transition-colors cursor-help">
                            Estará te esperando no escuro.
                        </p>
                     </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};