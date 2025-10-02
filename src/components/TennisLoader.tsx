'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function TennisLoader() {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(200,200,200,0.4) 0%, transparent 70%)",
          }}
        />
        
        {/* Spinning tennis ball */}
        <motion.div
          className="text-9xl relative z-10"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
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
        
        {/* Loading text */}
        <motion.p
          className="text-gray-800 text-center mt-6 font-medium text-lg tracking-wide"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
