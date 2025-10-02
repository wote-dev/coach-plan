'use client';

import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDownIcon, CheckIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActionState } from 'react';
import { generateAILessonPlan } from '@/app/actions/generate-lesson-plan';
import { LessonPlan } from '@/data/lessonPlans';

interface CoachAIProps {
  onPlanGenerated: (plan: Partial<LessonPlan>) => void;
  onSportChange?: (sport: string) => void;
}

export default function CoachAI({ onPlanGenerated, onSportChange }: CoachAIProps) {
  const [sport] = useState<string>('Tennis'); // Default to Tennis
  const [level, setLevel] = useState<string>('');
  const [duration, setDuration] = useState<number[]>([60]);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [equipment, setEquipment] = useState<string>('');
  const [objectives, setObjectives] = useState<string>('');

  const [state, formAction, isPending] = useActionState(generateAILessonPlan, null);

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

  return (
    <motion.form 
      action={formAction} 
      className="space-y-6 pb-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
          }
        }
      }}
    >
      {/* Hidden inputs to capture state values for form submission */}
      <input type="hidden" name="sport" value={sport} />
      <input type="hidden" name="level" value={level} />
      <input type="hidden" name="duration" value={duration[0]} />
      <input type="hidden" name="numberOfPeople" value={numberOfPeople} />
      <input type="hidden" name="equipment" value={equipment} />
      <input type="hidden" name="objectives" value={objectives} />

      {/* Skill Level */}
      <motion.div 
        className="space-y-3"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <label className="text-sm font-medium text-white">Skill Level</label>
        <RadioGroup.Root
          value={level}
          onValueChange={setLevel}
          className="space-y-2"
        >
          {['Beginner', 'Intermediate', 'Advanced'].map((levelOption) => (
            <div key={levelOption} className="flex items-center space-x-3">
              <RadioGroup.Item
                value={levelOption}
                id={levelOption}
                className="w-5 h-5 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent data-[state=checked]:border-white data-[state=checked]:bg-white"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-black" />
              </RadioGroup.Item>
              <label
                htmlFor={levelOption}
                className="text-sm text-white cursor-pointer"
              >
                {levelOption}
              </label>
            </div>
          ))}
        </RadioGroup.Root>
      </motion.div>

      {/* Number of People */}
      <motion.div 
        className="space-y-2"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <label className="text-sm font-medium text-white">Number of People</label>
        <Select.Root value={numberOfPeople} onValueChange={setNumberOfPeople}>
          <Select.Trigger className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 overflow-visible">
            <Select.Value placeholder="Select number of people" />
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

      {/* Duration */}
      <motion.div 
        className="space-y-4"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <label className="text-sm font-medium text-white">Duration</label>
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
            <span className="text-sm font-medium text-white">
              {duration[0]} minutes
            </span>
          </div>
        </div>
      </motion.div>

      {/* Available Equipment */}
      <motion.div 
        className="space-y-2"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <label className="text-sm font-medium text-white">Available Equipment (Optional)</label>
        <textarea
          name="equipment"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          placeholder="List available equipment..."
          rows={3}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 resize-none overflow-visible"
        />
      </motion.div>

      {/* Learning Objectives */}
      <motion.div 
        className="space-y-2"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <label className="text-sm font-medium text-white">Learning Objectives (Optional)</label>
        <textarea
          name="objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="What should participants learn or improve?"
          rows={3}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 resize-none overflow-visible"
        />
      </motion.div>

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

      {/* Generate Button */}
      <motion.button
        type="submit"
        disabled={!isFormValid || isPending}
        className="w-full bg-white border border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 hover:border-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/50 flex items-center justify-center gap-2"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ scale: isFormValid && !isPending ? 1.02 : 1 }}
        whileTap={{ scale: isFormValid && !isPending ? 0.98 : 1 }}
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span className="text-black text-sm font-medium">
              Generating...
            </span>
          </>
        ) : (
          <>
            <MagicWandIcon className="w-4 h-4 text-black" />
            <span className="text-black text-sm font-medium">
              Generate AI Lesson Plan
            </span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
