'use client';

import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonPlan, LessonPlan } from '@/data/lessonPlans';
import LessonPlanDisplay from '@/components/LessonPlanDisplay';
import BackButton from '@/components/ui/BackButton';
import TennisLoader from '@/components/TennisLoader';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function PlannerPage() {
  const sport = 'Tennis'; // Default to Tennis
  const [level, setLevel] = useState<string>('');
  const [duration, setDuration] = useState<number[]>([60]);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null);

  // Sport background mapping
  const currentBackground = '/tennis-bg.jpg';
  
  // Preload background image
  const isLoading = useImagePreloader([currentBackground], 800);

  const handleGenerate = () => {
    console.log('Generate button clicked!');
    console.log('Form values:', { sport, level, duration: duration[0], numberOfPeople });
    
    const lessonPlan = getLessonPlan(sport, level, duration[0], numberOfPeople);
    console.log('Found lesson plan:', lessonPlan);
    
    if (lessonPlan) {
      setGeneratedPlan(lessonPlan);
      console.log('Lesson plan set successfully');
    } else {
      console.log('No matching lesson plan found');
      // Create a fallback lesson plan for debugging
      const fallbackPlan: LessonPlan = {
        id: 'fallback',
        sport: sport,
        level: level as 'Beginner' | 'Intermediate' | 'Advanced',
        duration: duration[0] as 30 | 45 | 60 | 75 | 90,
        numberOfPeople: numberOfPeople as '1 (Individual)' | '2-5 (Small Group)' | '6-10 (Medium Group)' | '11-20 (Large Group)' | '20+ (Team)',
        title: `${sport} ${level} Training Session`,
        description: `A customized ${duration[0]}-minute ${sport.toLowerCase()} session for ${level.toLowerCase()} level athletes.`,
        warmUp: [
          {
            name: 'Dynamic warm-up',
            duration: '5 mins',
            description: 'General movement preparation',
            coachingCues: ['Start slowly', 'Focus on form']
          },
          {
            name: 'Sport-specific preparation',
            duration: '3 mins',
            description: 'Sport-specific movement patterns',
            coachingCues: ['Mimic sport movements', 'Gradually increase intensity']
          }
        ],
        mainActivities: [
          {
            name: 'Skill development drills',
            duration: '15 mins',
            description: 'Focus on fundamental skills',
            coachingCues: ['Quality over quantity', 'Provide feedback']
          },
          {
            name: 'Technique practice',
            duration: '10 mins',
            description: 'Refine technical aspects',
            coachingCues: ['Break down movements', 'Practice slowly first']
          },
          {
            name: 'Applied practice',
            duration: '8 mins',
            description: 'Apply skills in game-like situations',
            coachingCues: ['Encourage decision making', 'Maintain technique under pressure']
          }
        ],
        coolDown: [
          {
            name: 'Cool-down stretches',
            duration: '2 mins',
            description: 'Static stretching and relaxation',
            coachingCues: ['Hold stretches for 15-30 seconds', 'Focus on breathing']
          }
        ],
        equipment: ['Basic equipment', 'Cones', 'Training aids'],
        objectives: ['Improve technique', 'Build confidence', 'Develop skills'],
        safetyConsiderations: ['Ensure proper warm-up', 'Monitor for fatigue', 'Use appropriate equipment'],
        assessmentCriteria: ['Technique execution', 'Understanding of concepts', 'Engagement level'],
        adaptations: {
          forBeginners: ['Simplify movements', 'Provide more demonstrations'],
          forAdvanced: ['Add complexity', 'Increase intensity'],
          forInjuries: ['Modify exercises as needed', 'Focus on pain-free movement']
        },
        coachingTips: ['Be patient and encouraging', 'Provide clear instructions', 'Celebrate progress']
      };
      setGeneratedPlan(fallbackPlan);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <TennisLoader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button - positioned absolutely in top-left */}
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>
      
      {/* Background container with perfect cross-fade */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBackground}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentBackground})`
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
      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Tennis Lesson Planner
            </h1>
            <p className="text-white/80 text-base font-medium">
              Create personalized tennis training sessions
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {/* Client Level */}
            <motion.div 
              className="space-y-3"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <label className="text-sm font-medium text-white">
                Client Level
              </label>
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
              <label className="text-sm font-medium text-white">
                Number of People
              </label>
              <Select.Root value={numberOfPeople} onValueChange={setNumberOfPeople}>
                <Select.Trigger className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
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

            {/* Lesson Duration */}
            <motion.div 
              className="space-y-4"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <label className="text-sm font-medium text-white">
                Lesson Duration
              </label>
              <div className="space-y-3">
                <Slider.Root
                  value={duration}
                  onValueChange={setDuration}
                  max={90}
                  min={30}
                  step={15}
                  className="relative flex items-center w-full h-5"
                >
                  <Slider.Track className="bg-white/20 backdrop-blur-sm relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-white rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent" />
                </Slider.Root>
                <div className="flex justify-between text-xs text-white/60">
                  <span>30 min</span>
                  <span>45 min</span>
                  <span>60 min</span>
                  <span>75 min</span>
                  <span>90 min</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-white">
                    {duration[0]} minutes
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGenerate}
              disabled={!level || !numberOfPeople}
              className="w-full bg-white text-black border border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 hover:border-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/50 disabled:text-black/50"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                scale: level && numberOfPeople ? 1.02 : 1,
                y: level && numberOfPeople ? -2 : 0,
                boxShadow: level && numberOfPeople ? "0 10px 30px rgba(255, 255, 255, 0.3)" : "0 0 0 rgba(255, 255, 255, 0)",
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 
                }
              }}
              whileTap={{ 
                scale: level && numberOfPeople ? 0.98 : 1,
                y: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 
                }
              }}
            >
              Generate Lesson Plan
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {generatedPlan && (
          <LessonPlanDisplay 
            lessonPlan={generatedPlan} 
            onClose={() => setGeneratedPlan(null)} 
          />
        )}
      </AnimatePresence>
    </div>
      )}
    </>
  );
}
