'use client';

import { motion } from 'framer-motion';
import { ChevronRightIcon, PlayIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ShineBorder } from '@/components/ui/shine-border';
import GradientText from './GradientText';

export default function HeroSection() {
  const router = useRouter();

  const handleCoachAI = () => {
    router.push('/coach-ai');
  };
  
  return (
    <div className="h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(/tennis5.jpg)`
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 lg:space-y-8"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/20 text-sm font-medium text-white shadow-lg"
          >
            <PlayIcon className="w-4 h-4" />
            Professional Coaching Made Simple
          </motion.div>

          {/* Main Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4 lg:space-y-5"
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="block">Create Perfect 🎾</span>
              <span className="block bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-lg">
                Lesson Plans in Minutes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              Generate customized tennis coaching lesson plans for any skill level and group size. 
              From warm-ups to cool-downs, we&apos;ve got your training sessions covered.
            </p>
          </motion.div>

          {/* Features Grid - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white text-sm drop-shadow-sm">Lightning Fast</h3>
                <p className="text-xs text-white/80 leading-tight mt-1">Generate plans in seconds</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white text-sm drop-shadow-sm">Tennis Specific</h3>
                <p className="text-xs text-white/80 leading-tight mt-1">Tailored for tennis coaching</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white text-sm drop-shadow-sm">Any Group Size</h3>
                <p className="text-xs text-white/80 leading-tight mt-1">Individual to team training</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <ShineBorder
          borderWidth={2}
          duration={6}
          shineColor={["#ffffff", "#ffffff80", "#ffffff"]}
          className="rounded-full"
        />
              <button
                 onClick={handleCoachAI}
                 className="group inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm rounded-full font-semibold text-base lg:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 relative z-10"
               >
                <MagicWandIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                <GradientText 
                  className="text-base lg:text-lg font-semibold"
                  colors={['#ffffff', '#fffef8', '#fffdf0', '#fffce8', '#fffbe0', '#fffad8', '#fff9d0', '#fff8c8', '#fff9d0', '#fffad8', '#fffbe0', '#fffce8', '#fffdf0', '#fffef8', '#ffffff']}
                >
                  Try CoachAI
                </GradientText>
                <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Trust Indicators - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="pt-6 mt-4 border-t border-white/20"
          >
            <p className="text-sm text-white/80 font-medium drop-shadow-sm">🎾 Trusted by over 100+ coaches worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}