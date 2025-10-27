'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachAI from '@/components/CoachAI';
import LessonPlanOverlay from '@/components/LessonPlanOverlay';
import TopNav from '@/components/landing/TopNav';
import { LessonPlan } from '@/data/lessonPlans';
import TennisLoaderWithTips from '@/components/TennisLoaderWithTips';

export default function CoachAIPage() {
  const [generatedPlan, setGeneratedPlan] = useState<Partial<LessonPlan> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formKey, setFormKey] = useState<number>(0);
  const shouldIgnoreNextPlan = useRef(false);

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
    setFormKey((prev) => prev + 1);
  };

  const handleGeneratingChange = (generating: boolean) => {
    setIsGenerating(generating);
  };

  return (
    <main className="w-full min-h-screen">
      <TopNav />

      {/* Brand aesthetic background (matches landing page) */}
      <section className="relative isolate overflow-hidden" style={{ minHeight: '100dvh' }}>
        {/* Brand-inspired background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(60% 60% at 10% 10%, rgba(30,143,213,0.35) 0%, transparent 70%),
                         radial-gradient(35% 35% at 90% 15%, rgba(204,255,0,0.22) 0%, transparent 60%),
                         linear-gradient(180deg, #0A2239 0%, #06141F 100%)`,
          }}
        />

        {/* Court line grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 118px, rgba(255,255,255,0.08) 120px),
                               repeating-linear-gradient(90deg, transparent 0, transparent 118px, rgba(255,255,255,0.08) 120px)`,
            maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)'
          }}
        />

        {/* Top gradient for nav legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 -z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(6,20,31,0.9), rgba(6,20,31,0.6), transparent)'
          }}
        />

        {/* Decorative AO ring */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[max(3vw,16px)] top-[12vh] -z-10"
          style={{ width: '42vw', height: '42vw' }}
        >
          <div className="relative h-full w-full rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(30,143,213,0.22), transparent 70%)' }}>
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[6%] rounded-full border border-white/10" />
          </div>
        </motion.div>

        {/* Decorative AO angle */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[-10vw] bottom-[-12vh] -z-10"
          style={{ width: '48vw', height: '48vw' }}
        >
          <div
            className="h-full w-full rounded-[18%]"
            style={{
              background: 'conic-gradient(from 210deg, rgba(204,255,0,0.3), rgba(30,143,213,0.3))',
              clipPath: 'polygon(15% 0, 100% 60%, 65% 100%, 0 45%)'
            }}
          />
        </motion.div>

        {/* Generating overlay */}
        <AnimatePresence mode="wait">
          {isGenerating && <TennisLoaderWithTips key="generating" />}
        </AnimatePresence>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-24 md:py-28 lg:py-32 grid items-center lg:grid-cols-2 gap-10">
          {/* Left column: heading */}
          <div className="relative z-10 flex flex-col justify-center">
            {/* updated hero headline to position Tennanova as an AI planning engine for coaches and investors */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold text-white leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl max-w-none"
              style={{ textWrap: 'balance' }}
            >
              Design elite sessions{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #0B72B9 0%, #1E8FD5 50%, #6BD4FF 100%)' }}>
                with our AI planning engine.
              </span>
            </motion.h1>
            {/* updated subheadline to clarify value for coaches and federations; added integrations and scalability */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 sm:mt-6 text-pretty text-white/80 text-base sm:text-lg md:text-xl max-w-2xl"
            >
              Tailor each session with Tennanova's coaching intelligence platform—built for academies and federations, and ready to ingest Hawkeye, grip‑sensor, and performance analytics data. Once we secure funding, we'll integrate Hawkeye data to create personalized coaching plans that evolve with each athlete's performance patterns.
            </motion.p>
          </div>

          {/* Right column: form card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-end self-center z-0 w-full max-w-[720px]"
          >
            <div className="relative rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E8FD5] to-[#CCFF00]" />

              {/* updated tool labels for precision and brand consistency */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-white/60">CoachAI</p>
                  <h3 className="text-lg font-bold text-white">AI plan generator</h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
                  <span className="inline-block size-1.5 rounded-full" style={{ background: '#CCFF00' }} />
                  Tennanova model
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <CoachAI
                  key={formKey}
                  onPlanGenerated={handlePlanGenerated}
                  onGeneratingChange={handleGeneratingChange}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Screen Overlay for Lesson Plan */}
        <LessonPlanOverlay
          lessonPlan={generatedPlan || {}}
          isOpen={!!generatedPlan}
          onClose={handleCloseOverlay}
        />
      </section>
    </main>
  );
}
