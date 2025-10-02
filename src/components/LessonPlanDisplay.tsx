'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { Cross2Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LessonPlanDisplayProps {
  lessonPlan: Partial<LessonPlan>;
  onClose?: () => void;
  onBack?: () => void;
}

function ActivityCard({ activity, index }: { activity: DetailedActivity | string; index: number }) {
  if (typeof activity === 'string') {
    return (
      <div className="bg-amber-50/40 border-l-4 border-amber-700/30 p-5 my-3">
        <p className="text-gray-800 text-base leading-7 font-serif italic">{activity}</p>
      </div>
    );
  }

  return (
    <Accordion.Item value={`activity-${index}`} className="border-b border-gray-300/50 last:border-b-0">
      <Accordion.Header>
        <Accordion.Trigger asChild>
          <motion.button
            className="group flex w-full items-center justify-between py-4 text-left px-4 hover:bg-amber-50/30 transition-colors"
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <motion.div 
                className="flex-shrink-0 w-9 h-9 bg-amber-100 border-2 border-amber-800/40 rounded-full flex items-center justify-center text-sm font-bold text-amber-900"
                whileHover={{ 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                {index}
              </motion.div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-gray-900 text-lg mb-0.5">{activity.name}</h4>
                {activity.duration && (
                  <span className="text-sm text-gray-600 font-medium italic">{activity.duration}</span>
                )}
              </div>
            </div>
            <ChevronDownIcon className="h-5 w-5 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </motion.button>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-4 pb-5 pt-2 space-y-4 bg-gradient-to-b from-transparent to-amber-50/20">
          <p className="text-gray-800 text-base leading-7 font-serif pl-2 border-l-2 border-amber-300">{activity.description}</p>
          
          {activity.coachingCues && activity.coachingCues.length > 0 && (
            <div className="bg-blue-50/50 border border-blue-200/60 rounded p-4 shadow-sm">
              <h5 className="text-xs font-bold text-blue-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Coaching Cues
              </h5>
              <ul className="space-y-2">
                {activity.coachingCues.map((cue, cueIndex) => (
                  <li key={cueIndex} className="text-sm text-gray-700 flex items-start gap-3 leading-6 font-serif">
                    <span className="text-blue-600 mt-0.5 font-bold">•</span>
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.progressions && activity.progressions.length > 0 && (
            <div className="bg-green-50/50 border border-green-200/60 rounded p-4 shadow-sm">
              <h5 className="text-xs font-bold text-green-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Progressions
              </h5>
              <ul className="space-y-2">
                {activity.progressions.map((progression, progIndex) => (
                  <li key={progIndex} className="text-sm text-gray-700 flex items-start gap-3 leading-6 font-serif">
                    <span className="text-green-600 mt-0.5 font-bold">•</span>
                    <span>{progression}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.modifications && activity.modifications.length > 0 && (
            <div className="bg-amber-50/50 border border-amber-200/60 rounded p-4 shadow-sm">
              <h5 className="text-xs font-bold text-amber-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                Modifications
              </h5>
              <ul className="space-y-2">
                {activity.modifications.map((modification, modIndex) => (
                  <li key={modIndex} className="text-sm text-gray-700 flex items-start gap-3 leading-6 font-serif">
                    <span className="text-amber-600 mt-0.5 font-bold">•</span>
                    <span>{modification}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default function LessonPlanDisplay({ lessonPlan, onClose, onBack }: LessonPlanDisplayProps) {
  const [currentDate] = useState(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  const handleClose = () => {
    if (onBack) {
      onBack();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={handleClose}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[90vh] z-50"
        >
        <Dialog.Content className="bg-[#f9f7f1] border-8 border-[#8b6f47] rounded-sm shadow-2xl shadow-black/40 overflow-hidden w-full h-full relative"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e8dcc4 1px, transparent 1px),
              linear-gradient(#faf8f0 0%, #f5f1e8 100%)
            `,
            backgroundSize: '60px 100%, 100% 100%',
            backgroundPosition: '0 0, 0 0'
          }}
        >
          {/* Journal Binding Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#6b5334] to-[#8b6f47] shadow-inner">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(0,0,0,0.1) 35px, rgba(0,0,0,0.1) 38px)',
            }} />
          </div>
          
          <Dialog.Description className="sr-only">
            Lesson plan details for {lessonPlan.title}
          </Dialog.Description>
          
          {/* Header - Journal Style */}
          <div className="flex items-start justify-between p-8 pb-6 pl-24 border-b-2 border-amber-900/20 relative">
            {/* Decorative corner */}
            <div className="absolute top-6 left-20 w-8 h-8 border-t-2 border-l-2 border-amber-900/20"></div>
            
            <div className="flex-1 pr-4">
              {/* Date stamp */}
              <div className="text-xs text-gray-500 mb-2 font-mono tracking-wide">{currentDate}</div>
              
              <Dialog.Title className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-tight" 
                style={{ 
                  textShadow: '1px 1px 0px rgba(139, 111, 71, 0.1)'
                }}
              >
                {lessonPlan.title || 'Lesson Plan'}
              </Dialog.Title>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {lessonPlan.sport && (
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded text-sm font-medium shadow-sm">
                    {lessonPlan.sport}
                  </span>
                )}
                {lessonPlan.level && (
                  <span className="bg-blue-100 text-blue-900 border border-blue-300 px-3 py-1.5 rounded text-sm font-medium shadow-sm">
                    {lessonPlan.level}
                  </span>
                )}
                {lessonPlan.duration && (
                  <span className="bg-green-100 text-green-900 border border-green-300 px-3 py-1.5 rounded text-sm font-medium shadow-sm">
                    ⏱ {lessonPlan.duration} min
                  </span>
                )}
                {lessonPlan.numberOfPeople && (
                  <span className="bg-purple-100 text-purple-900 border border-purple-300 px-3 py-1.5 rounded text-sm font-medium shadow-sm">
                    👥 {lessonPlan.numberOfPeople}
                  </span>
                )}
              </div>
            </div>
            
            <Dialog.Close asChild>
              <motion.button 
                className="p-2.5 rounded-full bg-amber-100 border-2 border-amber-800/30 hover:bg-amber-200 transition-colors shadow-md"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 90,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  } 
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  } 
                }}
              >
                <Cross2Icon className="w-5 h-5 text-amber-900" />
              </motion.button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <ScrollArea.Root className="h-[calc(90vh-180px)]">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="p-8 pl-24 space-y-8 relative"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(139, 111, 71, 0.08) 31px, rgba(139, 111, 71, 0.08) 32px)',
                }}
              >
                {/* Left margin line */}
                <div className="absolute left-20 top-0 bottom-0 w-px bg-red-300/40"></div>
                
                {/* Description */}
                {lessonPlan.description && (
                  <div className="bg-amber-50/40 border-l-4 border-amber-700 p-6 rounded-r shadow-sm">
                    <p className="text-gray-800 leading-8 text-lg font-serif italic">{lessonPlan.description}</p>
                  </div>
                )}

                {/* Key Information */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
                    <div className="bg-blue-50/60 border-2 border-blue-200 rounded-lg p-6 shadow-md">
                      <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Learning Objectives
                      </h3>
                      <ul className="space-y-3">
                        {lessonPlan.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3 text-base text-gray-800 leading-7 font-serif">
                            <span className="text-blue-600 mt-1 font-bold">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lessonPlan.equipment && lessonPlan.equipment.length > 0 && (
                    <div className="bg-green-50/60 border-2 border-green-200 rounded-lg p-6 shadow-md">
                      <h3 className="text-sm font-bold text-green-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Required Equipment
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {lessonPlan.equipment.map((item, index) => (
                        <motion.span
                          key={index}
                          className="bg-white border border-green-300 text-gray-800 rounded-full text-sm font-medium px-4 py-2 shadow-sm"
                          whileHover={{ 
                            scale: 1.05,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          {item}
                        </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {lessonPlan.safetyConsiderations && lessonPlan.safetyConsiderations.length > 0 && (
                  <div className="bg-red-50/70 border-2 border-red-300 rounded-lg p-6 shadow-md">
                    <h3 className="text-sm font-bold text-red-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      Safety Considerations
                    </h3>
                    <ul className="space-y-3">
                      {lessonPlan.safetyConsiderations.map((consideration, index) => (
                        <li key={index} className="flex items-start gap-3 text-base text-gray-800 leading-7 font-serif">
                          <span className="mt-0.5 text-xl">⚠️</span>
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lesson Activities */}
                <div className="space-y-6 mt-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight mb-4 pb-2 border-b-2 border-amber-900/30">Lesson Activities</h2>

                  <Tabs.Root defaultValue="warmup" className="w-full">
                    <Tabs.List className="flex gap-3 mb-6 bg-amber-50/60 p-3 rounded-lg border-2 border-amber-200 shadow-sm">
                      <Tabs.Trigger asChild value="warmup">
                        <motion.button
                          className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white rounded border-2 border-amber-300 transition-all hover:bg-amber-50 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 data-[state=active]:shadow-md data-[state=active]:border-amber-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <span className="text-base">🔥</span>
                            Warm-Up
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="main">
                        <motion.button
                          className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white rounded border-2 border-amber-300 transition-all hover:bg-amber-50 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 data-[state=active]:shadow-md data-[state=active]:border-amber-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <span className="text-base">⚡</span>
                            Main Activities
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="cooldown">
                        <motion.button
                          className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white rounded border-2 border-amber-300 transition-all hover:bg-amber-50 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 data-[state=active]:shadow-md data-[state=active]:border-amber-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <span className="text-base">🧘</span>
                            Cool-Down
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="warmup" className="focus:outline-none">
                      <div className="bg-white/60 border-2 border-amber-200 rounded-lg overflow-hidden shadow-md">
                        {lessonPlan.warmUp && lessonPlan.warmUp.length > 0 ? (
                          <Accordion.Root type="multiple" defaultValue={lessonPlan.warmUp.map((_, i) => `activity-${i + 1}`)}>
                            {lessonPlan.warmUp.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-gray-600 text-center p-8 font-serif italic">No warm-up activities available</p>
                        )}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="main" className="focus:outline-none">
                      <div className="bg-white/60 border-2 border-amber-200 rounded-lg overflow-hidden shadow-md">
                        {lessonPlan.mainActivities && lessonPlan.mainActivities.length > 0 ? (
                          <Accordion.Root type="multiple" defaultValue={lessonPlan.mainActivities.map((_, i) => `activity-${i + 1}`)}>
                            {lessonPlan.mainActivities.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-gray-600 text-center p-8 font-serif italic">No main activities available</p>
                        )}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="cooldown" className="focus:outline-none">
                      <div className="bg-white/60 border-2 border-amber-200 rounded-lg overflow-hidden shadow-md">
                        {lessonPlan.coolDown && lessonPlan.coolDown.length > 0 ? (
                          <Accordion.Root type="multiple" defaultValue={lessonPlan.coolDown.map((_, i) => `activity-${i + 1}`)}>
                            {lessonPlan.coolDown.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-gray-600 text-center p-8 font-serif italic">No cool-down activities available</p>
                        )}
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>

                {/* Assessment Criteria */}
                {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
                  <div className="bg-purple-50/60 border-2 border-purple-200 rounded-lg p-6 shadow-md">
                    <h3 className="text-sm font-bold text-purple-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      Assessment Criteria
                    </h3>
                    <ul className="space-y-3">
                      {lessonPlan.assessmentCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start gap-4 text-base text-gray-800 font-serif">
                          <span className="text-purple-900 mt-0.5 text-sm bg-purple-100 rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-purple-300 flex-shrink-0">{index + 1}</span>
                          <span className="leading-7 flex-1">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Adaptations */}
                {lessonPlan.adaptations && (
                  <div className="space-y-5">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b-2 border-amber-900/30">
                      <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      Adaptations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Beginners */}
                      {lessonPlan.adaptations.forBeginners && lessonPlan.adaptations.forBeginners.length > 0 && (
                        <div className="bg-yellow-50/60 border-2 border-yellow-200 rounded-lg p-5 shadow-md">
                          <h4 className="text-sm font-bold text-yellow-900 mb-3 uppercase tracking-wide">For Beginners</h4>
                          <ul className="space-y-2.5">
                            {lessonPlan.adaptations.forBeginners.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-sm text-gray-800 leading-6 font-serif">
                                <span className="text-yellow-600 mt-0.5 font-bold">•</span>
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Advanced */}
                      {lessonPlan.adaptations.forAdvanced && lessonPlan.adaptations.forAdvanced.length > 0 && (
                        <div className="bg-orange-50/60 border-2 border-orange-200 rounded-lg p-5 shadow-md">
                          <h4 className="text-sm font-bold text-orange-900 mb-3 uppercase tracking-wide">For Advanced</h4>
                          <ul className="space-y-2.5">
                            {lessonPlan.adaptations.forAdvanced.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-sm text-gray-800 leading-6 font-serif">
                                <span className="text-orange-600 mt-0.5 font-bold">•</span>
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Injuries */}
                      {lessonPlan.adaptations.forInjuries && lessonPlan.adaptations.forInjuries.length > 0 && (
                        <div className="bg-rose-50/60 border-2 border-rose-200 rounded-lg p-5 shadow-md">
                          <h4 className="text-sm font-bold text-rose-900 mb-3 uppercase tracking-wide">For Injuries</h4>
                          <ul className="space-y-2.5">
                            {lessonPlan.adaptations.forInjuries.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-sm text-gray-800 leading-6 font-serif">
                                <span className="text-rose-600 mt-0.5 font-bold">•</span>
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Coaching Tips */}
                {lessonPlan.coachingTips && lessonPlan.coachingTips.length > 0 && (
                  <div className="bg-cyan-50/60 border-2 border-cyan-200 rounded-lg p-6 shadow-md">
                    <h3 className="text-sm font-bold text-cyan-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                      Coaching Tips
                    </h3>
                    <ul className="space-y-3">
                      {lessonPlan.coachingTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3 text-base text-gray-800 font-serif">
                          <span className="text-xl mt-0.5">💡</span>
                          <span className="leading-7 flex-1">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom decorative element */}
                <div className="flex justify-center pt-8 pb-4">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent"></div>
                </div>

              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar 
              orientation="vertical" 
              className="flex select-none touch-none p-1 transition-all duration-200 ease-out data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3 mr-2"
            >
              <ScrollArea.Thumb className="flex-1 bg-amber-800/40 hover:bg-amber-800/60 rounded transition-colors duration-200 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          
        </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
