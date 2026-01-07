import React from 'react';
import { motion } from 'framer-motion';

interface IntrusiveTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const IntrusiveText = ({ text, className = "", delay = 0 }: IntrusiveTextProps) => {
  // Split text into characters including spaces
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -5, // slight drop from above, unsettling
      filter: "blur(5px)", // starts blurred
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      style={{ display: "flex", overflow: "hidden", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span 
            variants={child} 
            key={index}
            className={char === " " ? "mr-[0.2em]" : ""} // Add spacing for space characters
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};