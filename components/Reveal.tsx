import React from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  variant?: "fade" | "blur" | "line" | "mask";
  className?: string;
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  duration = 1.0,
  variant = "fade",
  className = "" 
}: RevealProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)", scale: 0.98 },
      visible: { opacity: 1, filter: "blur(0px)", scale: 1 }
    },
    line: {
      hidden: { scaleX: 0, opacity: 0 },
      visible: { scaleX: 1, opacity: 1 }
    },
    // The "Mask" variant: Text rises from a hard edge, feeling intrusive and solid
    mask: {
      hidden: { y: "110%" },
      visible: { y: 0 }
    }
  };

  const transitions = {
    mask: { duration: duration, delay: delay, ease: [0.33, 1, 0.68, 1] as const }, // Cubic bezier for "sharp" arrival
    default: { duration: duration, delay: delay, ease: [0.2, 0, 0.2, 1] as const }
  };

  if (variant === "mask") {
      return (
          <div ref={ref} style={{ width, overflow: "hidden" }} className={className}>
              <motion.div
                  variants={variants.mask}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={transitions.mask}
              >
                  {children}
              </motion.div>
          </div>
      );
  }

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={transitions.default}
      >
        {children}
      </motion.div>
    </div>
  );
};