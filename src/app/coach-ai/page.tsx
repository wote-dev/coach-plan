'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachAI from '@/components/CoachAI';
import LessonPlanDisplay from '@/components/LessonPlanDisplay';
import BackButton from '@/components/ui/BackButton';
import { LessonPlan } from '@/data/lessonPlans';
import TennisLoader from '@/components/TennisLoader';

export default function CoachAIPage() {
  const [generatedPlan, setGeneratedPlan] = useState<Partial<LessonPlan> | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Sport background mapping
  const sportBackgrounds: Record<string, string> = {
    'Tennis': '/tennis4.jpg'
  };

  const currentBackground = selectedSport ? sportBackgrounds[selectedSport] : '/default-bg.jpg';

  const handlePlanGenerated = (plan: Partial<LessonPlan>) => {
    setGeneratedPlan(plan);
  };

  const handleBack = () => {
    setGeneratedPlan(null);
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
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
        <div className="w-full h-screen flex items-center justify-center p-4 relative overflow-visible" style={{ height: '100vh', height: '100dvh' }}>
          {/* Back Button - positioned absolutely in top-left */}
          <div className="absolute top-6 left-6 z-20">
            <BackButton />
          </div>
          
          {/* Background container with perfect cross-fade */}
          <div className="fixed inset-0 pointer-events-none">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentBackground}
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentBackground})`,
                  minHeight: '100vh',
                  minHeight: '100dvh'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing curve
                }}
              />
            </AnimatePresence>
          </div>
          
          <div className="w-full max-w-2xl relative z-10 my-8 overflow-visible">
            <AnimatePresence mode="wait">
              {!generatedPlan ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20 overflow-visible"
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                      CoachAI
                    </h1>
                    <p className="text-white/80 text-base font-medium">
                      Generate personalized tennis lesson plans with AI
                    </p>
                  </div>
                  <div 
                    className="overflow-y-auto overflow-x-visible px-3 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 hover:scrollbar-thumb-white/40"
                    style={{
                      maxHeight: 'calc(100dvh - 300px)',
                      paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))'
                    }}
                  >
                    <CoachAI onPlanGenerated={handlePlanGenerated} onSportChange={handleSportChange} />
                  </div>
                  {/* Bottom fade overlay to avoid hard edge cut-off */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 rounded-b-3xl bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              ) : (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LessonPlanDisplay 
                    lessonPlan={generatedPlan} 
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
