'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

// Tennis tips that cycle when generating
const TENNIS_TIPS = [
  "💪 Keep your knees bent and stay on your toes for better mobility",
  "🎾 Follow through completely on every stroke for maximum power",
  "👀 Watch the ball until it makes contact with your racket",
  "🏃 Split-step right before your opponent hits the ball",
  "🎯 Aim for consistency over power when starting out",
  "💨 Use your non-dominant hand to guide your backhand",
  "⚡ Practice your serve motion slowly before adding power",
  "🔄 Recover to the center of the court after each shot",
  "🎪 Keep your racket head up and ready between points",
  "🌟 Focus on footwork - it's the foundation of every shot"
];

// Tennis background images that cycle
const TENNIS_BACKGROUNDS = [
  '/tennis1.jpg',
  '/tennis2.jpg',
  '/tennis3.jpg'
];

export default function TennisLoaderWithTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  
  // Preload backgrounds to ensure hitch-free crossfades
  // Hook returns true while loading; we want 'loaded'
  const imagesLoaded = !useImagePreloader(TENNIS_BACKGROUNDS, 0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % TENNIS_TIPS.length);
    }, 3000); // Change tip every 3 seconds
    
    return () => clearInterval(tipInterval);
  }, []);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % TENNIS_BACKGROUNDS.length);
    }, 5000); // Change background every 5 seconds
    
    return () => clearInterval(backgroundInterval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Opaque base to fully block underlying UI during crossfades */}
      <div className="fixed inset-0 bg-black" aria-hidden="true" />

      {/* Rotating tennis background images (above base) */}
      <div className="fixed inset-0 z-10">
        <AnimatePresence initial={false} mode="sync">
          {imagesLoaded && (
            <motion.img
              key={TENNIS_BACKGROUNDS[currentBackgroundIndex]}
              src={TENNIS_BACKGROUNDS[currentBackgroundIndex]}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="fixed inset-0 w-full h-full object-cover"
              style={{ willChange: 'opacity, transform, filter', transform: 'translateZ(0)' }}
              initial={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1.0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{
                opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 1.2, ease: 'easeOut' }
              }}
            />
          )}
        </AnimatePresence>
        {/* Subtle darkening gradient overlay above the image */}
        <div
          className="fixed inset-0 pointer-events-none z-[15]"
          style={{ background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))' }}
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center max-w-2xl px-6 z-[30]">
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
        
        {/* Spinning tennis ball */}
        <motion.div
          className="text-5xl relative z-10 mb-4"
          animate={{
            rotate: 360,
            scale: [1, 1.06, 1],
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          🎾
        </motion.div>
        
        {/* Generating text */}
        <motion.p
          className="text-white text-center font-bold text-2xl tracking-wide mb-2"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Generating Your Lesson Plan...
        </motion.p>

        <motion.p
          className="text-white/60 text-center text-sm mb-8"
        >
          This may take a few moments
        </motion.p>

        {/* Tennis Tip - simplified */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTipIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-white/80 text-center text-sm"
            >
              {TENNIS_TIPS[currentTipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
