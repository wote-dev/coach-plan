'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { Cross2Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonPlanDisplayProps {
  lessonPlan: LessonPlan;
  onClose?: () => void;
  onBack?: () => void;
}

function ActivityCard({ activity, index }: { activity: DetailedActivity | string; index: number }) {
  if (typeof activity === 'string') {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <p className="text-white/90 text-base leading-relaxed">{activity}</p>
      </div>
    );
  }

  return (
    <Accordion.Item value={`activity-${index}`} className="border-b border-white/10 last:border-b-0">
      <Accordion.Header>
        <Accordion.Trigger asChild>
          <motion.button
            className="group flex w-full items-center justify-between py-5 text-left px-6 rounded-lg"
            whileHover={{ 
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              x: 4,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              } 
            }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <motion.div 
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-base font-bold text-white border border-white/20 shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                {index}
              </motion.div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-lg mb-1">{activity.name}</h4>
                {activity.duration && (
                  <span className="text-sm text-white/60 font-medium">{activity.duration}</span>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={{ y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronDownIcon className="h-5 w-5 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </motion.div>
          </motion.button>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-6 pb-6 pt-2 space-y-5">
          <p className="text-white/85 text-base leading-relaxed">{activity.description}</p>
          
          {activity.coachingCues && activity.coachingCues.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h5 className="text-sm font-bold text-white/90 mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Coaching Cues
              </h5>
              <ul className="space-y-2.5">
                {activity.coachingCues.map((cue, cueIndex) => (
                  <li key={cueIndex} className="text-sm text-white/75 flex items-start gap-3 leading-relaxed">
                    <span className="text-blue-400 mt-0.5 font-bold">•</span>
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.progressions && activity.progressions.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h5 className="text-sm font-bold text-white/90 mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Progressions
              </h5>
              <ul className="space-y-2.5">
                {activity.progressions.map((progression, progIndex) => (
                  <li key={progIndex} className="text-sm text-white/75 flex items-start gap-3 leading-relaxed">
                    <span className="text-green-400 mt-0.5 font-bold">•</span>
                    <span>{progression}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activity.modifications && activity.modifications.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h5 className="text-sm font-bold text-white/90 mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                Modifications
              </h5>
              <ul className="space-y-2.5">
                {activity.modifications.map((modification, modIndex) => (
                  <li key={modIndex} className="text-sm text-white/75 flex items-start gap-3 leading-relaxed">
                    <span className="text-yellow-400 mt-0.5 font-bold">•</span>
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
            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[90vh] z-50"
        >
        <Dialog.Content className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden w-full h-full">
          <Dialog.Description className="sr-only">
            Lesson plan details for {lessonPlan.title}
          </Dialog.Description>
          
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-white/20">
            <div className="flex-1 pr-4">
              <Dialog.Title className="text-2xl font-bold text-white mb-3 tracking-tight">{lessonPlan.title}</Dialog.Title>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-xl text-sm font-medium">{lessonPlan.sport}</span>
                <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-xl text-sm font-medium">{lessonPlan.level}</span>
                <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-xl text-sm font-medium">{lessonPlan.duration} min</span>
                <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-xl text-sm font-medium">{lessonPlan.numberOfPeople}</span>
              </div>
            </div>
            <Dialog.Close asChild>
              <motion.button 
                className="p-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  } 
                }}
                whileTap={{ 
                  scale: 0.9,
                  rotate: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  } 
                }}
              >
                <Cross2Icon className="w-5 h-5 text-white" />
              </motion.button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <ScrollArea.Root className="h-[calc(90vh-140px)]">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="p-8 space-y-10">
                
                {/* Description */}
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                  <p className="text-white/95 leading-relaxed text-lg font-medium">{lessonPlan.description}</p>
                </div>

                {/* Key Information */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-7 shadow-lg">
                    <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></span>
                      Learning Objectives
                    </h3>
                    <ul className="space-y-3.5">
                      {lessonPlan.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3.5 text-base text-white/85 leading-relaxed">
                          <span className="text-blue-400 mt-1 font-bold text-lg">•</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-7 shadow-lg">
                    <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></span>
                      Required Equipment
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {lessonPlan.equipment.map((item, index) => (
                        <motion.span
                          key={index}
                          className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-medium px-4 py-2.5 shadow-md cursor-default"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
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
                </div>

                {lessonPlan.safetyConsiderations && lessonPlan.safetyConsiderations.length > 0 && (
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm border border-red-400/40 rounded-2xl p-7 shadow-lg">
                    <h3 className="text-sm font-bold text-red-200 mb-5 uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></span>
                      Safety Considerations
                    </h3>
                    <ul className="space-y-3.5">
                      {lessonPlan.safetyConsiderations.map((consideration, index) => (
                        <li key={index} className="flex items-start gap-3.5 text-base text-red-100 leading-relaxed">
                          <span className="mt-0.5 text-xl">⚠️</span>
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lesson Activities */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Lesson Activities</h2>

                  <Tabs.Root defaultValue="warmup" className="w-full">
                    <Tabs.List className="flex gap-2 mb-6 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                      <Tabs.Trigger asChild value="warmup">
                        <motion.button
                          className="flex-1 px-5 py-3 text-sm font-bold text-white/70 rounded-lg transition-all hover:text-white hover:bg-white/10 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg uppercase tracking-wider"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.span 
                              className="w-2 h-2 bg-orange-400 rounded-full"
                              whileHover={{ scale: 1.3 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />
                            Warm-Up
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="main">
                        <motion.button
                          className="flex-1 px-5 py-3 text-sm font-bold text-white/70 rounded-lg transition-all hover:text-white hover:bg-white/10 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg uppercase tracking-wider"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.span 
                              className="w-2 h-2 bg-blue-400 rounded-full"
                              whileHover={{ scale: 1.3 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />
                            Main Activities
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                      <Tabs.Trigger asChild value="cooldown">
                        <motion.button
                          className="flex-1 px-5 py-3 text-sm font-bold text-white/70 rounded-lg transition-all hover:text-white hover:bg-white/10 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg uppercase tracking-wider"
                          whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.span 
                              className="w-2 h-2 bg-green-400 rounded-full"
                              whileHover={{ scale: 1.3 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />
                            Cool-Down
                          </span>
                        </motion.button>
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="warmup" className="focus:outline-none">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                        <Accordion.Root type="multiple" defaultValue={lessonPlan.warmUp.map((_, i) => `activity-${i + 1}`)}>
                          {lessonPlan.warmUp.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} index={index + 1} />
                          ))}
                        </Accordion.Root>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="main" className="focus:outline-none">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                        <Accordion.Root type="multiple" defaultValue={lessonPlan.mainActivities.map((_, i) => `activity-${i + 1}`)}>
                          {lessonPlan.mainActivities.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} index={index + 1} />
                          ))}
                        </Accordion.Root>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="cooldown" className="focus:outline-none">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                        <Accordion.Root type="multiple" defaultValue={lessonPlan.coolDown.map((_, i) => `activity-${i + 1}`)}>
                          {lessonPlan.coolDown.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} index={index + 1} />
                          ))}
                        </Accordion.Root>
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>

                {/* Assessment Criteria */}
                {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-7 shadow-lg">
                    <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></span>
                      Assessment Criteria
                    </h3>
                    <ul className="space-y-3.5">
                      {lessonPlan.assessmentCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start gap-4 text-base text-white/85">
                          <span className="text-white mt-0.5 text-sm bg-gradient-to-br from-purple-400/30 to-purple-500/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center font-bold border border-purple-400/40 shadow-md">{index + 1}</span>
                          <span className="leading-relaxed flex-1">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Adaptations */}
                {lessonPlan.adaptations && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></span>
                      Adaptations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Beginners */}
                      {lessonPlan.adaptations.forBeginners && lessonPlan.adaptations.forBeginners.length > 0 && (
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">For Beginners</h4>
                          <ul className="space-y-3">
                            {lessonPlan.adaptations.forBeginners.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                                <span className="text-yellow-400 mt-0.5 font-bold">•</span>
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Advanced */}
                      {lessonPlan.adaptations.forAdvanced && lessonPlan.adaptations.forAdvanced.length > 0 && (
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">For Advanced</h4>
                          <ul className="space-y-3">
                            {lessonPlan.adaptations.forAdvanced.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                                <span className="text-yellow-400 mt-0.5 font-bold">•</span>
                                <span>{adaptation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Injuries */}
                      {lessonPlan.adaptations.forInjuries && lessonPlan.adaptations.forInjuries.length > 0 && (
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">For Injuries</h4>
                          <ul className="space-y-3">
                            {lessonPlan.adaptations.forInjuries.map((adaptation, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                                <span className="text-yellow-400 mt-0.5 font-bold">•</span>
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
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-7 shadow-lg">
                    <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></span>
                      Coaching Tips
                    </h3>
                    <ul className="space-y-3.5">
                      {lessonPlan.coachingTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3.5 text-base text-white/85">
                          <span className="text-xl mt-0.5">💡</span>
                          <span className="leading-relaxed flex-1">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar 
              orientation="vertical" 
              className="flex select-none touch-none p-0.5 transition-all duration-200 ease-out data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2 mr-1"
            >
              <ScrollArea.Thumb className="flex-1 bg-white/40 hover:bg-white/70 rounded-full transition-colors duration-200 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          
        </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
