import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

export const AmbientSound = ({ scrollProgress }: { scrollProgress?: MotionValue<number> }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  
  // Track scroll depth for audio modulation
  useMotionValueEvent(scrollProgress || { get: () => 0, on: () => () => {} } as any, "change", (latest) => {
    if (!isPlaying || !audioContextRef.current || !oscRef.current || !gainRef.current) return;
    
    const ctx = audioContextRef.current;
    const progress = latest as number;
    
    // RHYTHM: As we go deeper (latest -> 1), frequency drops, volume swells.
    // Start at 55Hz (Low A), drop to 40Hz (Deep Drone)
    const baseFreq = 55 - (progress * 20); 
    oscRef.current.frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.5);

    // Gain increases slightly at depth, adding pressure
    const baseGain = 0.05 + (progress * 0.05);
    gainRef.current.gain.setTargetAtTime(baseGain, ctx.currentTime, 0.5);
  });

  const toggleSound = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
    setIsPlaying(!isPlaying);
  };

  const startSound = () => {
    try {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        // Create a low drone using oscillators
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        // Main Drone - Low Sine/Triangle
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        // LFO for slow modulation
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // Very slow pulse
        lfoGain.gain.setValueAtTime(20, ctx.currentTime); 

        // Connections
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency); // Modulate frequency slightly
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Fade in
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 4); // Very quiet

        osc.start();
        lfo.start();

        oscRef.current = osc;
        gainRef.current = gain;
        lfoRef.current = lfo;

    } catch (e) {
        console.error("Audio init failed", e);
    }
  };

  const stopSound = () => {
    if (gainRef.current && audioContextRef.current) {
        // Fade out
        gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
        
        setTimeout(() => {
            if (oscRef.current) oscRef.current.stop();
            if (lfoRef.current) lfoRef.current.stop();
        }, 2000);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current) {
          audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-8 right-8 z-50 p-4 text-neutral-600 hover:text-neutral-300 transition-colors duration-500 opacity-50 hover:opacity-100 focus:outline-none mix-blend-difference"
      aria-label="Toggle ambient sound"
    >
      {isPlaying ? <Volume2 size={20} strokeWidth={1} /> : <VolumeX size={20} strokeWidth={1} />}
    </button>
  );
};