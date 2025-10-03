'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { Cross2Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Chip } from './ui/Chip';
import { SectionCard, SectionHeader } from './ui/Section';

interface LessonPlanDisplayProps {
  lessonPlan: Partial<LessonPlan>;
  onClose?: () => void;
  onBack?: () => void;
}

function ActivityCard({ activity, index }: { activity: DetailedActivity | string; index: number }) {
  if (typeof activity === 'string') {
    return (
      <div className="bg-white/10 backdrop-blur-sm border-l-4 border-white/40 p-3 sm:p-5 my-2 sm:my-3">
        <p className="text-white text-sm sm:text-base leading-6 sm:leading-7 italic">{activity}</p>
      </div>
    );
  }

  return (
    <Accordion.Item value={`activity-${index}`} className="border-b border-white/20 last:border-b-0">
      <Accordion.Header>
        <Accordion.Trigger asChild>
          <motion.button
            className="group flex w-full items-center justify-between py-3 sm:py-4 text-left px-3 sm:px-4 hover:bg-white/10 active:bg-white/10 transition-colors"
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
              <motion.div 
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white"
                whileHover={{ 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                {index}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-base sm:text-lg mb-0.5 truncate">{activity.name}</h4>
                {activity.duration && (
                  <span className="text-xs sm:text-sm text-white/70 font-medium italic">{activity.duration}</span>
                )}
              </div>
            </div>
            <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0 ml-2" />
          </motion.button>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-2 space-y-3 sm:space-y-4">
          <p className="text-white/90 text-sm sm:text-base leading-6 sm:leading-7 pl-2 border-l-2 border-white/40">{activity.description}</p>
          
          {activity.coachingCues && activity.coachingCues.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 sm:p-4 shadow-sm">
              <h5 className="text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Coaching Cues
              </h5>
              <ul className="space-y-1.5 sm:space-y-2">
                {activity.coachingCues.map((cue, cueIndex) => (
                  <li key={cueIndex} className="text-xs sm:text-sm text-white/90 flex items-start gap-2 sm:gap-3 leading-5 sm:leading-6">
                    <span className="text-white mt-0.5 font-bold flex-shrink-0">•</span>
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.progressions && activity.progressions.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 sm:p-4 shadow-sm">
              <h5 className="text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Progressions
              </h5>
              <ul className="space-y-1.5 sm:space-y-2">
                {activity.progressions.map((progression, progIndex) => (
                  <li key={progIndex} className="text-xs sm:text-sm text-white/90 flex items-start gap-2 sm:gap-3 leading-5 sm:leading-6">
                    <span className="text-white mt-0.5 font-bold flex-shrink-0">•</span>
                    <span>{progression}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.modifications && activity.modifications.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 sm:p-4 shadow-sm">
              <h5 className="text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Modifications
              </h5>
              <ul className="space-y-1.5 sm:space-y-2">
                {activity.modifications.map((modification, modIndex) => (
                  <li key={modIndex} className="text-xs sm:text-sm text-white/90 flex items-start gap-2 sm:gap-3 leading-5 sm:leading-6">
                    <span className="text-white mt-0.5 font-bold flex-shrink-0">•</span>
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

  const handleClose = (open: boolean) => {
    if (!open) {
      if (onBack) {
        onBack();
      } else if (onClose) {
        onClose();
      }
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
            <Dialog.Overlay
              className="fixed inset-0 z-50"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url(/tennis5.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[90vh] z-50"
        >
        <Dialog.Content className="bg-white/12 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden w-full h-full relative"
        >
          
          <Dialog.Description className="sr-only">
            Lesson plan details for {lessonPlan.title}
          </Dialog.Description>
          
          {/* Header */}
          <div className="flex items-start justify-between p-4 sm:p-8 pb-4 sm:pb-6 border-b border-white/20 relative">
            <div className="flex-1 pr-2 sm:pr-4">
              {/* Date stamp */}
              <div className="text-[10px] sm:text-xs text-white/60 mb-1 sm:mb-2 font-mono tracking-wide">{currentDate}</div>
              
              <Dialog.Title className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 tracking-tight leading-tight" 
              >
                {lessonPlan.title || 'Lesson Plan'}
              </Dialog.Title>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {lessonPlan.sport && <Chip color="emerald">{lessonPlan.sport}</Chip>}
                {lessonPlan.level && <Chip color="blue">{lessonPlan.level}</Chip>}
                {lessonPlan.duration && (
                  <Chip color="yellow" leading="⏱">
                    {lessonPlan.duration} min
                  </Chip>
                )}
                {lessonPlan.numberOfPeople && (
                  <Chip color="purple" leading="👥">
                    {lessonPlan.numberOfPeople}
                  </Chip>
                )}
              </div>
            </div>
            
            <Dialog.Close asChild>
              <motion.button 
                onClick={() => handleClose(false)}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 active:bg-white/20 transition-colors shadow-md flex-shrink-0"
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
                <Cross2Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <ScrollArea.Root className="h-[calc(90vh-120px)] sm:h-[calc(90vh-180px)]">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 relative">
                {/* Description */}
                {lessonPlan.description && (
                  <div className="bg-white/10 backdrop-blur-sm border-l-4 border-white/40 p-4 sm:p-6 rounded-r shadow-sm">
                    <p className="text-white leading-6 sm:leading-8 text-base sm:text-lg italic">{lessonPlan.description}</p>
                  </div>
                )}

                {/* Key Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
                    <SectionCard tone="emerald" className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <SectionHeader dotColor="emerald" size="sm">
                        Learning Objectives
                      </SectionHeader>
                      <ul className="space-y-2 sm:space-y-3">
                        {lessonPlan.objectives.map((objective, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-white/90 leading-6 sm:leading-7"
                          >
                            <span className="text-white mt-0.5 sm:mt-1 font-bold">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </SectionCard>
                  )}

                  {lessonPlan.equipment && lessonPlan.equipment.length > 0 && (
                    <SectionCard tone="yellow" className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <SectionHeader dotColor="yellow" size="sm">
                        Required Equipment
                      </SectionHeader>
                      <div className="flex flex-wrap gap-2">
                        {lessonPlan.equipment.map((item, index) => (
                          <Chip key={index}>{item}</Chip>
                        ))}
                      </div>
                    </SectionCard>
                  )}
                </div>

                {lessonPlan.safetyConsiderations && lessonPlan.safetyConsiderations.length > 0 && (
                  <SectionCard tone="danger" className="p-4 sm:p-6">
                    <SectionHeader dotColor="red" size="sm" className="mb-3 sm:mb-4">
                      Safety Considerations
                    </SectionHeader>
                    <ul className="space-y-2 sm:space-y-3">
                      {lessonPlan.safetyConsiderations.map((consideration, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-white/90 leading-6 sm:leading-7"
                        >
                          <span className="mt-0.5 text-xl">⚠️</span>
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                )}

                {/* Quick View - Activity Timeline */}
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 sm:p-6 shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Quick View
                  </h2>
                  <div className="space-y-3">
                    {lessonPlan.warmUp && lessonPlan.warmUp.length > 0 && (
                      <div className="flex items-center gap-3 text-sm sm:text-base">
                        <span className="bg-emerald-500/80 text-white px-2 py-1 rounded-lg font-bold text-xs uppercase">Warm-Up</span>
                        <span className="text-white/90">{lessonPlan.warmUp.length} {lessonPlan.warmUp.length === 1 ? 'activity' : 'activities'}</span>
                      </div>
                    )}
                    {lessonPlan.mainActivities && lessonPlan.mainActivities.length > 0 && (
                      <div className="flex items-center gap-3 text-sm sm:text-base">
                        <span className="bg-yellow-500/80 text-black px-2 py-1 rounded-lg font-bold text-xs uppercase">Main</span>
                        <span className="text-white/90">{lessonPlan.mainActivities.length} {lessonPlan.mainActivities.length === 1 ? 'activity' : 'activities'}</span>
                      </div>
                    )}
                    {lessonPlan.coolDown && lessonPlan.coolDown.length > 0 && (
                      <div className="flex items-center gap-3 text-sm sm:text-base">
                        <span className="bg-emerald-500/80 text-white px-2 py-1 rounded-lg font-bold text-xs uppercase">Cool-Down</span>
                        <span className="text-white/90">{lessonPlan.coolDown.length} {lessonPlan.coolDown.length === 1 ? 'activity' : 'activities'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lesson Activities */}
                <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4 pb-2 border-b-2 border-white/30">Lesson Activities</h2>
                  <p className="text-white/70 text-sm sm:text-base italic -mt-2">Click on any activity to see details, coaching cues, and progressions</p>

                  <Tabs.Root defaultValue="warmup" className="w-full">
                    <Tabs.List className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-2xl border-2 border-white/20 shadow-sm">
                      <Tabs.Trigger asChild value="warmup">
                        <motion.button
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 rounded-xl border-2 border-white/30 transition-all hover:bg-white/20 active:bg-white/20 data-[state=active]:bg-emerald-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-emerald-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Warm-Up
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="main">
                        <motion.button
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 rounded-xl border-2 border-white/30 transition-all hover:bg-white/20 active:bg-white/20 data-[state=active]:bg-yellow-500/80 data-[state=active]:text-black data-[state=active]:shadow-md data-[state=active]:border-yellow-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Main Activities
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="cooldown">
                        <motion.button
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 rounded-xl border-2 border-white/30 transition-all hover:bg-white/20 active:bg-white/20 data-[state=active]:bg-emerald-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-emerald-400 uppercase tracking-wide"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cool-Down
                        </motion.button>
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="warmup" className="focus:outline-none">
                      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md">
                        {lessonPlan.warmUp && lessonPlan.warmUp.length > 0 ? (
                          <Accordion.Root type="multiple">
                            {lessonPlan.warmUp.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-white/70 text-center p-8 italic">No warm-up activities yet</p>
                        )}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="main" className="focus:outline-none">
                      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md">
                        {lessonPlan.mainActivities && lessonPlan.mainActivities.length > 0 ? (
                          <Accordion.Root type="multiple">
                            {lessonPlan.mainActivities.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-white/70 text-center p-8 italic">No main activities yet</p>
                        )}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="cooldown" className="focus:outline-none">
                      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md">
                        {lessonPlan.coolDown && lessonPlan.coolDown.length > 0 ? (
                          <Accordion.Root type="multiple">
                            {lessonPlan.coolDown.map((activity, index) => (
                              <ActivityCard key={index} activity={activity} index={index + 1} />
                            ))}
                          </Accordion.Root>
                        ) : (
                          <p className="text-white/70 text-center p-8 italic">No cool-down activities yet</p>
                        )}
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>

                {/* Additional Resources - Collapsible */}
                {((lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0) ||
                  lessonPlan.adaptations ||
                  (lessonPlan.coachingTips && lessonPlan.coachingTips.length > 0)) && (
                  <Accordion.Root type="multiple" className="space-y-3">
                    {/* Assessment Criteria */}
                    {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
                      <Accordion.Item
                        value="assessment"
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="group flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-white/10 transition-colors">
                            <SectionHeader size="sm" dotColor="white">
                              Assessment Criteria
                            </SectionHeader>
                            <ChevronDownIcon className="h-5 w-5 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <ul className="space-y-2.5 sm:space-y-3 px-4 sm:px-5 pb-4 sm:pb-5">
                            {lessonPlan.assessmentCriteria.map((criteria, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base text-white/90"
                              >
                                <span className="text-black mt-0.5 text-xs sm:text-sm bg-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold border-2 border-white/30 flex-shrink-0">
                                  {index + 1}
                                </span>
                                <span className="leading-6 sm:leading-7 flex-1">{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Content>
                      </Accordion.Item>
                    )}

                    {/* Adaptations */}
                    {lessonPlan.adaptations && (
                      <Accordion.Item
                        value="adaptations"
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="group flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-white/10 transition-colors">
                            <SectionHeader size="sm" dotColor="white">
                              Adaptations
                            </SectionHeader>
                            <ChevronDownIcon className="h-5 w-5 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 px-4 sm:px-5 pb-4 sm:pb-5">
                            {/* Beginners */}
                            {lessonPlan.adaptations.forBeginners &&
                              lessonPlan.adaptations.forBeginners.length > 0 && (
                                <SectionCard tone="emerald" className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                                  <SectionHeader as="h4" dotColor="emerald" size="sm">
                                    For Beginners
                                  </SectionHeader>
                                  <ul className="space-y-2 sm:space-y-2.5">
                                    {lessonPlan.adaptations.forBeginners.map((adaptation, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/90 leading-5 sm:leading-6"
                                      >
                                        <span className="text-white mt-0.5 font-bold flex-shrink-0">
                                          •
                                        </span>
                                        <span>{adaptation}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </SectionCard>
                              )}

                            {/* Advanced */}
                            {lessonPlan.adaptations.forAdvanced &&
                              lessonPlan.adaptations.forAdvanced.length > 0 && (
                                <SectionCard tone="yellow" className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                                  <SectionHeader as="h4" dotColor="yellow" size="sm">
                                    For Advanced
                                  </SectionHeader>
                                  <ul className="space-y-2 sm:space-y-2.5">
                                    {lessonPlan.adaptations.forAdvanced.map((adaptation, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/90 leading-5 sm:leading-6"
                                      >
                                        <span className="text-white mt-0.5 font-bold flex-shrink-0">
                                          •
                                        </span>
                                        <span>{adaptation}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </SectionCard>
                              )}

                            {/* Injuries */}
                            {lessonPlan.adaptations.forInjuries &&
                              lessonPlan.adaptations.forInjuries.length > 0 && (
                                <SectionCard
                                  tone="neutral"
                                  className="p-3 sm:p-4 space-y-2.5 sm:space-y-3"
                                >
                                  <SectionHeader as="h4" dotColor="white" size="sm">
                                    For Injuries
                                  </SectionHeader>
                                  <ul className="space-y-2 sm:space-y-2.5">
                                    {lessonPlan.adaptations.forInjuries.map((adaptation, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/90 leading-5 sm:leading-6"
                                      >
                                        <span className="text-white mt-0.5 font-bold flex-shrink-0">
                                          •
                                        </span>
                                        <span>{adaptation}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </SectionCard>
                              )}
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    )}

                    {/* Coaching Tips */}
                    {lessonPlan.coachingTips && lessonPlan.coachingTips.length > 0 && (
                      <Accordion.Item
                        value="tips"
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-md"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="group flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-white/10 transition-colors">
                            <SectionHeader size="sm" dotColor="white">
                              Coaching Tips
                            </SectionHeader>
                            <ChevronDownIcon className="h-5 w-5 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <ul className="space-y-2.5 sm:space-y-3 px-4 sm:px-5 pb-4 sm:pb-5">
                            {lessonPlan.coachingTips.map((tip, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-white/90"
                              >
                                <span className="text-lg sm:text-xl mt-0.5 flex-shrink-0">💡</span>
                                <span className="leading-6 sm:leading-7 flex-1">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Content>
                      </Accordion.Item>
                    )}
                  </Accordion.Root>
                )}

                {/* Bottom decorative element */}
                <div className="flex justify-center pt-6 sm:pt-8 pb-3 sm:pb-4">
                  <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>

              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar 
              orientation="vertical" 
              className="flex select-none touch-none p-1 transition-all duration-200 ease-out data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3 mr-2"
            >
              <ScrollArea.Thumb className="flex-1 bg-white/40 hover:bg-white/60 rounded transition-colors duration-200 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          
        </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
