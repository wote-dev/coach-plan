'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface LessonPlanOverlayProps {
  lessonPlan: Partial<LessonPlan>;
  isOpen: boolean;
  onClose: () => void;
}

function ActivitySection({ activity, index }: { activity: DetailedActivity | string; index: number }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (typeof activity === 'string') {
    return (
      <div className="bg-white/20 backdrop-blur-lg border-l-4 border-white/50 p-4 rounded-r-lg shadow-xl">
        <p className="text-white text-sm leading-relaxed italic">{activity}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl overflow-hidden hover:border-white/50 transition-all shadow-xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-start gap-4 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-sm font-semibold text-white border border-white/40 shadow-lg">
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-base mb-1">{activity.name}</h4>
          {activity.duration && (
            <span className="text-xs text-white/80 font-medium">{activity.duration}</span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-white/70"
        >
          ▼
        </motion.div>
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-white/20"
        >
          <div className="p-5 pt-4 space-y-4">
            <p className="text-white text-sm leading-relaxed border-l-2 border-white/50 pl-4">
              {activity.description}
            </p>
            
            {activity.coachingCues && activity.coachingCues.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Coaching Cues
                </h5>
                <ul className="space-y-1.5">
                  {activity.coachingCues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-white/70 mt-0.5">•</span>
                      <span className="leading-relaxed">{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activity.progressions && activity.progressions.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Progressions
                </h5>
                <ul className="space-y-1.5">
                  {activity.progressions.map((prog, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-white/70 mt-0.5">→</span>
                      <span className="leading-relaxed">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activity.modifications && activity.modifications.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Modifications
                </h5>
                <ul className="space-y-1.5">
                  {activity.modifications.map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-white/70 mt-0.5">◆</span>
                      <span className="leading-relaxed">{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function LessonPlanOverlay({ lessonPlan, isOpen, onClose }: LessonPlanOverlayProps) {
  const [currentDate] = useState(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
        >
          {/* Close button - fixed in top right */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 active:bg-white/30 transition-all shadow-xl group"
            whileHover={{ 
              scale: 1.1,
              rotate: 90,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Cross2Icon className="w-5 h-5 text-white" />
          </motion.button>

          {/* Scrollable content */}
          <ScrollArea.Root className="w-full h-full">
            <ScrollArea.Viewport className="w-full h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-5xl mx-auto px-8 py-16 pb-24"
              >
                {/* Header Section - Clean and Minimal */}
                <div className="mb-12 space-y-6">
                  {/* Date stamp */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-white/50 font-mono tracking-wide"
                  >
                    {currentDate}
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-6xl font-bold text-white leading-tight tracking-tight"
                  >
                    {lessonPlan.title || 'Lesson Plan'}
                  </motion.h1>
                  
                  {/* Metadata badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2"
                  >
                    {lessonPlan.sport && (
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-emerald-400/40 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                        {lessonPlan.sport}
                      </span>
                    )}
                    {lessonPlan.level && (
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-blue-400/40 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                        {lessonPlan.level}
                      </span>
                    )}
                    {lessonPlan.duration && (
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-yellow-400/40 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                        ⏱ {lessonPlan.duration} min
                      </span>
                    )}
                    {lessonPlan.numberOfPeople && (
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-purple-400/40 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                        👥 {lessonPlan.numberOfPeople}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Description callout */}
                {lessonPlan.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-12 bg-white/20 backdrop-blur-lg border-l-4 border-white/50 p-6 rounded-r-xl shadow-xl"
                  >
                    <p className="text-white text-base leading-relaxed italic">
                      {lessonPlan.description}
                    </p>
                  </motion.div>
                )}

                {/* Main content sections */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-12"
                >
                  {/* Objectives and Equipment Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
                      <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                          Learning Objectives
                        </h2>
                        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                          <ul className="space-y-2.5">
                            {lessonPlan.objectives.map((objective, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                                <span className="text-emerald-400 mt-0.5 font-bold">•</span>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {lessonPlan.equipment && lessonPlan.equipment.length > 0 && (
                      <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                          Required Equipment
                        </h2>
                        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                          <div className="flex flex-wrap gap-2">
                            {lessonPlan.equipment.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-white/25 backdrop-blur-sm border border-white/40 text-white rounded-lg text-xs font-medium px-3 py-1.5 shadow-lg"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Safety Considerations */}
                  {lessonPlan.safetyConsiderations && lessonPlan.safetyConsiderations.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        Safety Considerations
                      </h2>
                      <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/40 rounded-xl p-5 shadow-xl">
                        <ul className="space-y-2.5">
                          {lessonPlan.safetyConsiderations.map((consideration, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                              <span className="mt-0.5">⚠️</span>
                              <span>{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Warm-Up Activities */}
                  {lessonPlan.warmUp && lessonPlan.warmUp.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <span className="text-emerald-400">●</span>
                        Warm-Up
                      </h2>
                      <div className="space-y-3">
                        {lessonPlan.warmUp.map((activity, idx) => (
                          <ActivitySection key={idx} activity={activity} index={idx + 1} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Activities */}
                  {lessonPlan.mainActivities && lessonPlan.mainActivities.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <span className="text-yellow-400">●</span>
                        Main Activities
                      </h2>
                      <div className="space-y-3">
                        {lessonPlan.mainActivities.map((activity, idx) => (
                          <ActivitySection key={idx} activity={activity} index={idx + 1} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cool-Down */}
                  {lessonPlan.coolDown && lessonPlan.coolDown.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <span className="text-blue-400">●</span>
                        Cool-Down
                      </h2>
                      <div className="space-y-3">
                        {lessonPlan.coolDown.map((activity, idx) => (
                          <ActivitySection key={idx} activity={activity} index={idx + 1} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assessment Criteria */}
                  {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        Assessment Criteria
                      </h2>
                      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                        <ul className="space-y-3">
                          {lessonPlan.assessmentCriteria.map((criteria, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-white">
                              <span className="flex-shrink-0 w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/40 shadow-lg">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed flex-1">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Adaptations */}
                  {lessonPlan.adaptations && (
                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        Adaptations
                      </h2>
                      <div className="grid md:grid-cols-3 gap-4">
                        {lessonPlan.adaptations.forBeginners && lessonPlan.adaptations.forBeginners.length > 0 && (
                          <div className="bg-white/20 backdrop-blur-lg border border-emerald-500/40 rounded-xl p-5 space-y-3 shadow-xl">
                            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                              For Beginners
                            </h3>
                            <ul className="space-y-2">
                              {lessonPlan.adaptations.forBeginners.map((adaptation, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-white leading-relaxed">
                                  <span className="text-emerald-400 mt-0.5">•</span>
                                  <span>{adaptation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {lessonPlan.adaptations.forAdvanced && lessonPlan.adaptations.forAdvanced.length > 0 && (
                          <div className="bg-white/20 backdrop-blur-lg border border-yellow-500/40 rounded-xl p-5 space-y-3 shadow-xl">
                            <h3 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                              For Advanced
                            </h3>
                            <ul className="space-y-2">
                              {lessonPlan.adaptations.forAdvanced.map((adaptation, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-white leading-relaxed">
                                  <span className="text-yellow-400 mt-0.5">•</span>
                                  <span>{adaptation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {lessonPlan.adaptations.forInjuries && lessonPlan.adaptations.forInjuries.length > 0 && (
                          <div className="bg-white/20 backdrop-blur-lg border border-red-500/40 rounded-xl p-5 space-y-3 shadow-xl">
                            <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                              For Injuries
                            </h3>
                            <ul className="space-y-2">
                              {lessonPlan.adaptations.forInjuries.map((adaptation, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-white leading-relaxed">
                                  <span className="text-red-400 mt-0.5">•</span>
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
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        Coaching Tips
                      </h2>
                      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                        <ul className="space-y-3">
                          {lessonPlan.coachingTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                              <span className="mt-0.5">💡</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Footer decoration */}
                <div className="flex justify-center pt-16">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </motion.div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar 
              orientation="vertical" 
              className="flex select-none touch-none p-1 transition-all duration-200 ease-out data-[orientation=vertical]:w-2.5 mr-2"
            >
              <ScrollArea.Thumb className="flex-1 bg-white/40 hover:bg-white/60 rounded-full transition-colors duration-200" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
