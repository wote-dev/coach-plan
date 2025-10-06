'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachAI from '@/components/CoachAI';
import LessonPlanOverlay from '@/components/LessonPlanOverlay';
import BackButton from '@/components/ui/BackButton';
import { LessonPlan } from '@/data/lessonPlans';
import TennisLoaderWithTips from '@/components/TennisLoaderWithTips';
import TennisLoader from '@/components/TennisLoader';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function CoachAIPage() {
  const [generatedPlan, setGeneratedPlan] = useState<Partial<LessonPlan> | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('Tennis');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formKey, setFormKey] = useState<number>(0);
  const shouldIgnoreNextPlan = useRef(false);

  // Sport background mapping
  const sportBackgrounds: Record<string, string> = {
    'Tennis': '/tennis4.jpg'
  };

  // Preload all background images and show a quick loader on entry
  const allBackgrounds = ['/default-bg.jpg', ...Object.values(sportBackgrounds)];
  const isLoading = useImagePreloader(allBackgrounds, 600);

  const currentBackground = selectedSport ? sportBackgrounds[selectedSport] : sportBackgrounds['Tennis'];

  const handlePlanGenerated = (plan: Partial<LessonPlan>) => {
    if (shouldIgnoreNextPlan.current) {
      shouldIgnoreNextPlan.current = false;
      return;
    }
    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  const handleCloseOverlay = () => {
    setGeneratedPlan(null);
    // Ignore any plan generation callbacks during the reset
    shouldIgnoreNextPlan.current = true;
    // Reset the CoachAI form by changing the key, forcing a complete remount
    setFormKey(prev => prev + 1);
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const handleGeneratingChange = (generating: boolean) => {
    setIsGenerating(generating);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <TennisLoader key="loader" />}
        {isGenerating && <TennisLoaderWithTips key="generating" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          className="w-full h-screen flex items-center justify-center p-4 relative overflow-visible" 
          style={{ height: '100dvh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {/* Back Button - positioned absolutely in top-left */}
          <motion.div 
            className="absolute top-6 left-6 z-20"
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <BackButton />
          </motion.div>
          
          {/* Background container with perfect cross-fade */}
          <div className="fixed inset-0 pointer-events-none">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentBackground}
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentBackground})`,
                  minHeight: '100dvh'
                }}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </AnimatePresence>
          </div>
          
          <div className="w-full max-w-2xl relative z-10 mt-20 mb-8 md:my-8 overflow-visible">
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20 overflow-visible"
            >
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.h1 
                  className="text-3xl font-bold text-white mb-2 tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  CoachAI
                </motion.h1>
                <motion.p 
                  className="text-white/80 text-base font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: 0.6, 
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  Generate personalized coaching plans for your clients with AI
                </motion.p>
              </motion.div>
              <motion.div 
                className="overflow-y-auto overflow-x-visible px-3 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 hover:scrollbar-thumb-white/40"
                style={{
                  maxHeight: 'calc(100dvh - 300px)',
                  paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.7, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <CoachAI 
                  key={formKey}
                  onPlanGenerated={handlePlanGenerated} 
                  onSportChange={handleSportChange}
                  onGeneratingChange={handleGeneratingChange}
                />
              </motion.div>
              {/* Bottom fade overlay to avoid hard edge cut-off */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 rounded-b-3xl bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
          
          {/* Full-Screen Overlay for Lesson Plan */}
          <LessonPlanOverlay 
            lessonPlan={generatedPlan || {}} 
            isOpen={!!generatedPlan}
            onClose={handleCloseOverlay}
          />
        </motion.div>
      )}
    </>
  );
}
