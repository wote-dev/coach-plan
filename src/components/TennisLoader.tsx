'use client';

import { motion } from 'framer-motion';

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
        {/* Spinning tennis ball */}
        <motion.div
          className="text-5xl relative z-10"
          animate={{
            rotate: 360,
            scale: [1, 1.04, 1],
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
