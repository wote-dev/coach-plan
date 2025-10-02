'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({ onClick, className = '', children }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-white/10 backdrop-blur-xl border border-white/20 
        rounded-2xl text-white font-medium text-sm
        transition-all duration-200 
        hover:bg-white/20 hover:border-white/30
        focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${className}
      `}
      whileHover={{ 
        scale: 1.05,
        x: -2,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        } 
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        } 
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 0.61, 0.36, 1] 
      }}
    >
      <motion.div
        animate={{ x: 0 }}
        whileHover={{ x: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </motion.div>
      {children || 'Back'}
    </motion.button>
  );
}