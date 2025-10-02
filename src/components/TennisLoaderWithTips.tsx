'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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

export default function TennisLoaderWithTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % TENNIS_TIPS.length);
    }, 3000); // Change tip every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center justify-center max-w-2xl px-6">
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
          className="text-9xl relative z-10 mb-8"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
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

        {/* Tennis Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
          style={{ minHeight: '120px' }}
        >
          <div className="flex items-start gap-4 h-full">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-white/80 font-semibold text-sm mb-2 uppercase tracking-wider">
                Tennis Tip
              </h3>
              <div className="flex-1 flex items-start" style={{ minHeight: '60px' }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTipIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-base leading-relaxed"
                  >
                    {TENNIS_TIPS[currentTipIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
