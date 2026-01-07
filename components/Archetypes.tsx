import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

const ArchetypeCard = ({ title, description, delay, onHover, isAnyHovered }: { 
  title: string; 
  description: string; 
  delay: number;
  onHover: (state: boolean) => void;
  isAnyHovered: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Local interaction physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate repulsion (tilt AWAY from cursor)
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(false);
  };

  // HEAVY PHYSICS: Increased damping (15->30) and decreased stiffness (150->100)
  // The cards now resist movement and settle slowly.
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 100 });

  return (
    <Reveal variant="fade" delay={delay} duration={1.5} className="h-full perspective-1000">
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`
            group relative h-full border border-neutral-900 bg-neutral-950/20 p-8 md:p-12 
            transition-all duration-[1000ms] ease-out
            ${isAnyHovered ? 'opacity-40 grayscale blur-[1px]' : 'opacity-100'} 
            hover:!opacity-100 hover:!grayscale-0 hover:!blur-0 hover:bg-neutral-900/40 hover:border-neutral-800
        `}
      >
          <h3 className="relative z-10 text-xl md:text-2xl font-serif text-neutral-400 mb-6 tracking-wider group-hover:text-neutral-200 transition-colors duration-[1000ms]">
          {title}
          </h3>
          <p className="relative z-10 text-neutral-600 font-light leading-loose text-sm group-hover:text-neutral-400 transition-colors duration-[1000ms] delay-100">
          {description}
          </p>
          
          {/* Subtle "Glitch" overlay that appears on hover */}
          <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-color-dodge transition-opacity duration-500" />
      </motion.div>
    </Reveal>
  );
};

export const Archetypes = () => {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);

  return (
    <section className="py-40 px-6 bg-charcoal/20 relative">
       {/* Background noise texture - STATIC */}
       <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
                <Reveal variant="blur">
                    <h2 className="text-3xl md:text-5xl font-serif text-neutral-300 tracking-wide mb-4">
                    Arquétipos Mentais
                    </h2>
                </Reveal>
                <Reveal variant="fade" delay={0.2}>
                    <p className="text-neutral-600 font-mono text-[10px] tracking-[0.3em] uppercase pl-1">
                    Eles não são heróis. Eles são vítimas.
                    </p>
                </Reveal>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArchetypeCard
            title="O OBSERVADOR"
            description="Você nota coisas que os outros ignoram. O jeito que as sombras crescem rápido demais. O tique-taque de um relógio que não existe. Seu poder é a percepção, sua maldição é nunca poder desviar o olhar."
            delay={0.1}
            onHover={setHoveredCard}
            isAnyHovered={hoveredCard}
          />
          <ArchetypeCard
            title="O PARANOICO"
            description="Segurança é uma ilusão. Você se preparou para o pior, construindo camadas de lógica e defesa. Mas o inimigo já está dentro das muralhas. Pode ser você."
            delay={0.3}
            onHover={setHoveredCard}
            isAnyHovered={hoveredCard}
          />
          <ArchetypeCard
            title="O FRATURADO"
            description="Sua memória é cheia de buracos. Você perde tempo. Às vezes acorda em lugares que não reconhece. Outra coisa vive a sua vida quando você dorme."
            delay={0.5}
            onHover={setHoveredCard}
            isAnyHovered={hoveredCard}
          />
        </div>
      </div>
    </section>
  );
};