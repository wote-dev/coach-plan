'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SmoothPageTransitionProps {
  children: ReactNode;
}

export default function SmoothPageTransition({ children }: SmoothPageTransitionProps) {
  const pathname = usePathname();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{
            duration: 0,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            willChange: 'opacity',
            background: 'transparent'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
