import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for the "delayed" feel - heavy and viscous
  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkHoverType = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        // Check for interactive elements
        if (target.closest('a') || target.closest('button') || target.closest('.cursor-crosshair')) {
            setCursorVariant("pointer");
            return;
        }

        // Check for text elements
        if (target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3') || target.closest('span')) {
            setCursorVariant("text");
            return;
        }

        setCursorVariant("default");
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHoverType);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHoverType);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      mixBlendMode: "difference" as const,
    },
    pointer: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(69, 10, 10, 0.1)", // Blood tint
      border: "1px solid rgba(69, 10, 10, 0.5)",
      borderRadius: "50%",
      mixBlendMode: "normal" as const,
    },
    text: {
      height: 32,
      width: 4,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "none",
      borderRadius: "0%",
      mixBlendMode: "difference" as const,
    }
  };

  return (
    <>
      {/* The main follower cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex justify-center items-center backdrop-blur-[1px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {/* Inner dot for precision */}
        <div className={`w-1 h-1 bg-white/50 rounded-full transition-opacity duration-300 ${cursorVariant === 'text' ? 'opacity-0' : 'opacity-100'}`} />
      </motion.div>
    </>
  );
};