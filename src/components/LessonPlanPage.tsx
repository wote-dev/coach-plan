'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LessonPlanPageProps {
  lessonPlan: Partial<LessonPlan>;
}

function ActivitySection({ activity, index }: { activity: DetailedActivity | string; index: number }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (typeof activity === 'string') {
    return (
      <div className="bg-white/15 backdrop-blur-md border-l-4 border-white/40 p-4 rounded-r-lg shadow-lg">
        <p className="text-white text-sm leading-relaxed italic">{activity}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden hover:border-white/40 transition-colors shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-start gap-4 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 bg-white/25 backdrop-blur-sm rounded-lg flex items-center justify-center text-sm font-semibold text-white border border-white/30">
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-base mb-1">{activity.name}</h4>
          {activity.duration && (
            <span className="text-xs text-white/60 font-medium">{activity.duration}</span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-white/60"
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
          className="border-t border-white/10"
        >
          <div className="p-5 pt-4 space-y-4">
            <p className="text-white text-sm leading-relaxed border-l-2 border-white/40 pl-4">
              {activity.description}
            </p>
            
            {activity.coachingCues && activity.coachingCues.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
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
                <h5 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
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
                <h5 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
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

export default function LessonPlanPage({ lessonPlan }: LessonPlanPageProps) {
  const [currentDate] = useState(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  return (
    <div className="w-full min-h-screen bg-transparent">
      <ScrollArea.Root className="w-full h-screen">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
            {/* Header Section - Notion Style */}
            <div className="mb-8 space-y-4">
              {/* Date stamp */}
              <div className="text-xs text-white/50 font-mono tracking-wide">
                {currentDate}
              </div>
              
              {/* Title */}
              <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
                {lessonPlan.title || 'Lesson Plan'}
              </h1>
              
              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2">
                {lessonPlan.sport && (
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-emerald-400/30 px-3 py-1.5 rounded-lg text-xs font-medium">
                    {lessonPlan.sport}
                  </span>
                )}
                {lessonPlan.level && (
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-blue-400/30 px-3 py-1.5 rounded-lg text-xs font-medium">
                    {lessonPlan.level}
                  </span>
                )}
                {lessonPlan.duration && (
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-yellow-400/30 px-3 py-1.5 rounded-lg text-xs font-medium">
                    ⏱ {lessonPlan.duration} min
                  </span>
                )}
                {lessonPlan.numberOfPeople && (
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-purple-400/30 px-3 py-1.5 rounded-lg text-xs font-medium">
                    👥 {lessonPlan.numberOfPeople}
                  </span>
                )}
              </div>
            </div>

            {/* Description callout */}
            {lessonPlan.description && (
              <div className="mb-8 bg-white/15 backdrop-blur-md border-l-4 border-white/40 p-6 rounded-r-xl shadow-lg">
                <p className="text-white text-base leading-relaxed italic">
                  {lessonPlan.description}
                </p>
              </div>
            )}

            {/* Main content sections */}
            <div className="space-y-10">
              {/* Objectives and Equipment Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      Learning Objectives
                    </h2>
                    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-lg">
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
                    <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                      Required Equipment
                    </h2>
                    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-lg">
                      <div className="flex flex-wrap gap-2">
                        {lessonPlan.equipment.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-medium px-3 py-1.5 shadow-sm"
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
                  <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Safety Considerations
                  </h2>
                  <div className="bg-red-500/15 backdrop-blur-md border border-red-500/40 rounded-xl p-5 shadow-lg">
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
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
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
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
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
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
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
                  <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Assessment Criteria
                  </h2>
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-lg">
                    <ul className="space-y-3">
                      {lessonPlan.assessmentCriteria.map((criteria, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white">
                          <span className="flex-shrink-0 w-6 h-6 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/30 shadow-sm">
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
                  <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Adaptations
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {lessonPlan.adaptations.forBeginners && lessonPlan.adaptations.forBeginners.length > 0 && (
                      <div className="bg-white/15 backdrop-blur-md border border-emerald-500/40 rounded-xl p-5 space-y-3 shadow-lg">
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
                      <div className="bg-white/15 backdrop-blur-md border border-yellow-500/40 rounded-xl p-5 space-y-3 shadow-lg">
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
                      <div className="bg-white/15 backdrop-blur-md border border-red-500/40 rounded-xl p-5 space-y-3 shadow-lg">
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
                  <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Coaching Tips
                  </h2>
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-lg">
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
            </div>

            {/* Footer decoration */}
            <div className="flex justify-center pt-12">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar 
          orientation="vertical" 
          className="flex select-none touch-none p-1 transition-all duration-200 ease-out data-[orientation=vertical]:w-2.5 mr-2"
        >
          <ScrollArea.Thumb className="flex-1 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-200" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
