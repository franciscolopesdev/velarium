import { useState, useEffect } from 'react';
import { useMotionValue, useSpring, useScroll, useVelocity, useTransform } from 'framer-motion';

export const useObservation = () => {
  // Mouse Physics - Viscous, heavy feel
  const mouseX = useMotionValue(0.5); // Start center
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 50, stiffness: 400, mass: 2 }; // Heavy, water-like movement
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll Physics
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-2, 2]); 
  const skewSpring = useSpring(skewVelocity, { damping: 20, stiffness: 200 });

  // Idleness - "The Paranoia"
  const [isIdle, setIsIdle] = useState(false);

  // Duration - "The Decay"
  // We track how long the user has been "exposed" to the anomaly
  const [duration, setDuration] = useState(0);
  const [isTabFocused, setIsTabFocused] = useState(true);
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    // 1. Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
      
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), 4000); 
    };

    // 2. Visibility Tracking (Tab switching)
    const handleVisibilityChange = () => {
        setIsTabFocused(!document.hidden);
    };

    // 3. Time Tracking
    intervalId = setInterval(() => {
        setDuration(prev => prev + 1);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initial trigger
    timeoutId = setTimeout(() => setIsIdle(true), 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [mouseX, mouseY]);

  return {
    mouseX: mouseXSpring,
    mouseY: mouseYSpring,
    skew: skewSpring,
    scrollYProgress,
    isIdle,
    duration,      // Seconds spent on site
    isTabFocused   // Whether user is looking at the page
  };
};