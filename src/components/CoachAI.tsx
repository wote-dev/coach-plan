'use client';

import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDownIcon, CheckIcon, MagicWandIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useState, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActionState } from 'react';
import { generateAILessonPlan } from '@/app/actions/generate-lesson-plan';
import { LessonPlan } from '@/data/lessonPlans';

interface CoachAIProps {
  onPlanGenerated: (plan: Partial<LessonPlan>) => void;
  onSportChange?: (sport: string) => void;
  onGeneratingChange?: (isGenerating: boolean) => void;
}

export default function CoachAI({ onPlanGenerated, onSportChange, onGeneratingChange }: CoachAIProps) {
  const [sport] = useState<string>('Tennis'); // Default to Tennis
  const [level, setLevel] = useState<string>('');
  const [duration, setDuration] = useState<number[]>([60]);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [equipment, setEquipment] = useState<string>('');
  const [objectives, setObjectives] = useState<string>('');
  
  // Step management
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5; // Skill Level, Number of People, Duration, Equipment, Objectives

  const [state, formAction, isPending] = useActionState(generateAILessonPlan, null);

  // Validation for current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return level !== '';
      case 2: return numberOfPeople !== '';
      case 3: return true; // Duration always has a default value
      case 4: return true; // Optional field
      case 5: return true; // Optional field
      default: return false;
    }
  };
  
  const isFormValid = level && numberOfPeople; // sport is always Tennis

  // Handle successful plan generation using useEffect to avoid state updates during render
  useEffect(() => {
    if (state?.success && state.plan) {
      console.log('🎉 Plan generation successful, calling onPlanGenerated:', state.plan);
      onPlanGenerated(state.plan);
    }
  }, [state?.success, state?.plan, onPlanGenerated]);

  // Handle errors
  useEffect(() => {
    if (state?.error) {
      console.error('❌ Plan generation error:', state.error);
    }
  }, [state?.error]);

  // Set sport to Tennis on mount and notify parent
  useEffect(() => {
    onSportChange?.('Tennis');
  }, [onSportChange]);
  
  // Notify parent of generating state changes
  useEffect(() => {
    onGeneratingChange?.(isPending);
  }, [isPending, onGeneratingChange]);
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === totalSteps && isFormValid) {
      const formData = new FormData(e.currentTarget);
      // Call useActionState action inside a transition so isPending tracks correctly
      startTransition(() => {
        formAction(formData);
      });
    } else if (isStepValid()) {
      handleNext();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-6"
      style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
    >
      {/* Hidden inputs to capture state values for form submission */}
      <input type="hidden" name="sport" value={sport} />
      <input type="hidden" name="level" value={level} />
      <input type="hidden" name="duration" value={duration[0]} />
      <input type="hidden" name="numberOfPeople" value={numberOfPeople} />
      <input type="hidden" name="equipment" value={equipment} />
      <input type="hidden" name="objectives" value={objectives} />
      
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Content with AnimatePresence */}
      <div className="relative" style={{ minHeight: currentStep === 4 || currentStep === 5 ? '220px' : currentStep === 1 ? '280px' : '180px' }}>
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-6 absolute w-full flex flex-col justify-center"
              style={{ minHeight: '280px' }}
            >
            <label className="text-sm font-medium text-white text-center">What is your client&apos;s skill level?</label>
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              {[
                { label: 'Beginner', borderColor: 'border-green-500', hoverBg: 'hover:bg-green-500/10' },
                { label: 'Intermediate', borderColor: 'border-yellow-500', hoverBg: 'hover:bg-yellow-500/10' },
                { label: 'Advanced', borderColor: 'border-red-500', hoverBg: 'hover:bg-red-500/10' }
              ].map(({ label: levelOption, borderColor, hoverBg }) => (
                <motion.button
                  key={levelOption}
                  type="button"
                  onClick={() => {
                    setLevel(levelOption);
                    // Auto-advance to next step after a brief delay
                    setTimeout(() => handleNext(), 150);
                  }}
                  className={`py-2.5 px-5 rounded-xl text-base font-medium transition-all duration-200 border-2 ${
                    level === levelOption
                      ? `${borderColor} bg-white/10 text-white`
                      : `${borderColor} bg-transparent text-white ${hoverBg}`
                  } focus:outline-none focus:ring-2 focus:ring-white/50`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {levelOption}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-2 absolute w-full"
          >
            <label className="text-sm font-medium text-white">How many people will you be coaching?</label>
            <Select.Root value={numberOfPeople} onValueChange={setNumberOfPeople}>
              <Select.Trigger className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 overflow-visible">
                <Select.Value placeholder="Select number of clients" />
                <Select.Icon>
                  <ChevronDownIcon className="h-4 w-4 text-white/60" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50">
                  <Select.Viewport className="p-1">
                    {['1 (Individual)', '2-5 (Small Group)', '6-10 (Medium Group)', '11-20 (Large Group)', '20+ (Team)'].map((peopleOption) => (
                      <Select.Item
                        key={peopleOption}
                        value={peopleOption}
                        className="flex items-center px-3 py-2 text-sm text-white rounded-xl cursor-pointer hover:bg-white/20 focus:bg-white/20 focus:outline-none"
                      >
                        <Select.ItemText>{peopleOption}</Select.ItemText>
                        <Select.ItemIndicator className="ml-auto">
                          <CheckIcon className="h-4 w-4 text-white" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-4 absolute w-full"
          >
            <label className="text-sm font-medium text-white">How long should your coaching session be?</label>
            <div className="space-y-3">
              <Slider.Root
                value={duration}
                onValueChange={setDuration}
                max={120}
                min={30}
                step={15}
                className="relative flex items-center w-full h-5"
                name="duration"
              >
                <Slider.Track className="bg-white/20 backdrop-blur-sm relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-white rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 overflow-visible" />
              </Slider.Root>
              <div className="flex justify-between text-xs text-white/60">
                <span>30 min</span>
                <span>60 min</span>
                <span>90 min</span>
                <span>120 min</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-medium text-white">
                  {duration[0]} minutes
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-2 absolute w-full"
          >
            <label className="text-sm font-medium text-white">What equipment do you have available? (Optional)</label>
            <p className="text-xs text-white/60 mb-2">List any specific equipment you have available for your coaching session.</p>
            <textarea
              name="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="e.g., Tennis balls, cones, medicine balls..."
              rows={3}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 resize-none overflow-visible mb-2"
              style={{ fontSize: '16px' }}
            />
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-2 absolute w-full"
          >
            <label className="text-sm font-medium text-white">What are your coaching objectives? (Optional)</label>
            <p className="text-xs text-white/60 mb-2">What should your client(s) learn or improve during this session?</p>
            <textarea
              name="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="e.g., Improve forehand technique, develop footwork..."
              rows={3}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 resize-none overflow-visible mb-2"
              style={{ fontSize: '16px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Error Display */}
      {state?.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl"
        >
          <p className="text-red-200 text-sm">{state.error}</p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentStep > 1 && (
          <motion.button
            type="button"
            onClick={handleBack}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 flex items-center justify-center gap-2 text-white"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
        )}
        
        {currentStep < totalSteps ? (
          <motion.button
            type="submit"
            disabled={!isStepValid()}
            className="flex-1 bg-white border border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 hover:border-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/50 flex items-center justify-center gap-2 text-black"
            whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
            whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
          >
            <span>Next</span>
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            disabled={!isFormValid || isPending}
            className="flex-1 bg-white border border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 hover:border-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/50 flex items-center justify-center gap-2 text-black"
            whileHover={{ scale: isFormValid && !isPending ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid && !isPending ? 0.98 : 1 }}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <MagicWandIcon className="w-4 h-4" />
                <span>Generate AI Lesson Plan</span>
              </>
            )}
          </motion.button>
        )}
      </div>
    </form>
  );
}
