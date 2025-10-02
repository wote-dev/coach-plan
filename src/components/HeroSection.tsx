'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, PlayIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ShineBorder } from '@/components/ui/shine-border';
import GradientText from './GradientText';
import { useState, useEffect } from 'react';
import TennisLoader from './TennisLoader';

export default function HeroSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleCoachAI = () => {
    router.push('/coach-ai');
  };

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <TennisLoader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(/tennis5.jpg)`
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-6 lg:space-y-8">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/20 text-sm font-medium text-white shadow-lg"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <PlayIcon className="w-4 h-4" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Professional Coaching Made Simple
            </motion.span>
          </motion.div>

          {/* Main Content Block */}
          <div className="space-y-4 lg:space-y-5">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
                className="block"
              >
                Create Perfect 🎾
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
                className="block bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-lg"
              >
                Lesson Plans in Minutes
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
            >
              Generate customized tennis coaching lesson plans for any skill level and group size. 
              From warm-ups to cool-downs, we&apos;ve got your training sessions covered.
            </motion.p>
          </div>

          {/* Features Grid - Compact */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                title: "Lightning Fast",
                description: "Generate plans in seconds",
                delay: 0.9
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: "Tennis Specific",
                description: "Tailored for tennis coaching",
                delay: 1.0
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                title: "Any Group Size",
                description: "Individual to team training",
                delay: 1.1
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: feature.delay,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2, type: "spring", stiffness: 300 }
                }}
                className="flex flex-col items-center space-y-2"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: feature.delay + 0.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 150
                  }}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: feature.delay + 0.3, duration: 0.4 }}
                  className="text-center"
                >
                  <h3 className="font-semibold text-white text-sm drop-shadow-sm">{feature.title}</h3>
                  <p className="text-xs text-white/80 leading-tight mt-1">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 1.3,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="flex justify-center items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              <ShineBorder
          borderWidth={2}
          duration={6}
          shineColor={["#ffffff", "#ffffff80", "#ffffff"]}
          className="rounded-full"
        />
              <button
                 onClick={handleCoachAI}
                 className="group inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm rounded-full font-semibold text-base lg:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 shadow-xl hover:shadow-2xl relative z-10"
               >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <MagicWandIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </motion.div>
                <GradientText 
                  className="text-base lg:text-lg font-semibold"
                  colors={['#ffffff', '#fffef8', '#fffdf0', '#fffce8', '#fffbe0', '#fffad8', '#fff9d0', '#fff8c8', '#fff9d0', '#fffad8', '#fffbe0', '#fffce8', '#fffdf0', '#fffef8', '#ffffff']}
                >
                  Try CoachAI
                </GradientText>
                <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.5,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="pt-6 mt-4 border-t border-white/20"
          >
            <p className="text-sm text-white/80 font-medium drop-shadow-sm">🎾 Trusted by over 100+ coaches worldwide</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
      )}
    </>
  );
}
