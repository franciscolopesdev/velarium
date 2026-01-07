import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Add type declarations for Three.js elements in JSX
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
      dodecahedronGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      fog: any;
      // Allow any element for R3F compatibility
      [key: string]: any;
    }
  }
}

const Artifact = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Extremely slow, almost imperceptible rotation
      // Reduced from 0.02 to 0.01
      meshRef.current.rotation.y = time * 0.01;
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
    }

    if (innerMatRef.current) {
        // Subtle pulsing effect for the inner core
        // Base 0.05, fluctuating slightly up to ~0.1
        innerMatRef.current.emissiveIntensity = 0.05 + (Math.sin(time * 1.5) + 1) * 0.025;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#050505" 
          roughness={0.8}
          metalness={0.2}
          distort={0.5} // Increased from 0.45
          speed={0.2}
          wireframe={true}
          transparent
          opacity={0.15} // Increased from 0.1
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 0)]} />
          <lineBasicMaterial color="#262626" transparent opacity={0.1} />
        </lineSegments>
      </mesh>
      {/* Inner Core - darker, barely visible */}
      <mesh scale={0.7}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
            ref={innerMatRef}
            color="#000"
            emissive="#200505"
            emissiveIntensity={0.05}
            roughness={1}
        />
      </mesh>
    </Float>
  );
};

export const Hero = () => {
  // EASTER EGG: Clicking the title degrades it
  const [clickCount, setClickCount] = useState(0);

  const handleTitleClick = () => {
      setClickCount(prev => prev + 1);
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-obsidian">
      
      {/* 3D Background - React Three Fiber */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.2} color="#555" />
          <pointLight position={[-10, -10, -10]} intensity={0.1} color="#330000" />
          <Suspense fallback={null}>
            <Artifact />
          </Suspense>
          <fog attach="fog" args={['#0a0a0a', 5, 12]} />
        </Canvas>
      </div>

      {/* Overlay to darken 3D element */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.8em", filter: "blur(15px)" }}
          animate={{ opacity: 1, letterSpacing: "0.25em", filter: "blur(0px)" }}
          transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleTitleClick}
          className="cursor-pointer select-none"
        >
            <h1 className={`text-5xl md:text-8xl font-serif text-neutral-200 font-medium tracking-[0.25em] mix-blend-difference transition-all duration-300 ${clickCount > 3 ? 'animate-pulse text-blood' : ''}`}>
                <span className={clickCount > 0 ? "animate-glitch" : ""}>
                    {clickCount >= 7 ? "CORRA" : "VELARIUM"}
                </span>
            </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 5 }}
          className="space-y-8"
        >
          <p className="text-sm md:text-base text-neutral-600 font-light tracking-[0.3em] uppercase opacity-60">
            Você não está em perigo.
          </p>
          <div className="overflow-hidden inline-block">
            <p className="text-sm md:text-base text-neutral-400 font-normal tracking-[0.3em] uppercase pb-2">
              <span className="animate-glitch block" style={{ animationDuration: '6s', animationDelay: '2s' }}>
                Você está sendo observado.
              </span>
            </p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blood/40 to-transparent" />
          </div>
        </motion.div>
        
        {/* NO LOOPS: Removed animate-pulse. The text waits patiently. */}
        <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 7, duration: 2 }}
             className="pt-32"
        >
             <span className="text-[10px] text-neutral-800 tracking-[0.4em]">
                 ROLE PARA OBSERVAR
             </span>
        </motion.div>
      </div>
    </section>
  );
};