'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Cross2Icon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, PlayIcon, PauseIcon, ResetIcon } from '@radix-ui/react-icons';

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

// Helper function to parse duration string and convert to seconds
function parseDurationToSeconds(duration: string): number {
  const match = duration.match(/(\d+)\s*(minute|minutes|min|mins|second|seconds|sec|secs)/i);
  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.includes('minute') || unit.includes('min')) {
      return value * 60;
    } else if (unit.includes('second') || unit.includes('sec')) {
      return value;
    }
  }
  return 0;
}

// Helper function to format seconds to MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
  
  const [currentStep, setCurrentStep] = useState<number>(0);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Timer states
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerInitialTime, setTimerInitialTime] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Build steps dynamically based on lesson plan content
  const steps = useMemo(() => {
    const allSteps: Array<{
      id: string;
      title: string;
      subtitle?: string;
      content: JSX.Element;
    }> = [];
    
    // Overview step
    allSteps.push({
      id: 'overview',
      title: 'Lesson Overview',
      subtitle: 'Start your coaching session with confidence',
      content: (
        <div className="space-y-8">
          {lessonPlan.description && (
            <div className="bg-white/20 backdrop-blur-lg border-l-4 border-white/50 p-6 rounded-r-xl shadow-xl">
              <p className="text-white text-lg leading-relaxed">
                {lessonPlan.description}
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Learning Objectives
                </h3>
                <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                  <ul className="space-y-3">
                    {lessonPlan.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                        <span className="text-emerald-400 mt-1 font-bold">✓</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {lessonPlan.equipment && lessonPlan.equipment.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Required Equipment
                </h3>
                <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                  <div className="flex flex-wrap gap-2">
                    {lessonPlan.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-white/25 backdrop-blur-sm border border-white/40 text-white rounded-lg text-sm font-medium px-4 py-2 shadow-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {lessonPlan.safetyConsiderations && lessonPlan.safetyConsiderations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                Safety Considerations
              </h3>
              <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/40 rounded-xl p-5 shadow-xl">
                <ul className="space-y-3">
                  {lessonPlan.safetyConsiderations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                      <span className="mt-0.5 text-xl">⚠️</span>
                      <span>{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    });
    
    // Warm-up activities
    if (lessonPlan.warmUp && lessonPlan.warmUp.length > 0) {
      lessonPlan.warmUp.forEach((activity, idx) => {
        allSteps.push({
          id: `warmup-${idx}`,
          title: `Warm-Up ${lessonPlan.warmUp!.length > 1 ? `(${idx + 1}/${lessonPlan.warmUp!.length})` : ''}`,
          subtitle: typeof activity === 'string' ? activity : activity.name,
          content: (
            <div className="space-y-6">
              {typeof activity === 'string' ? (
                <div className="bg-white/20 backdrop-blur-lg border-l-4 border-emerald-400 p-6 rounded-r-xl shadow-xl">
                  <p className="text-white text-lg leading-relaxed">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/20 backdrop-blur-lg border border-emerald-400/40 rounded-xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{activity.name}</h3>
                      {activity.duration && (
                        <span className="bg-emerald-400/30 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-emerald-400/40">
                          ⏱ {activity.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-lg leading-relaxed border-l-4 border-emerald-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        Coaching Cues
                      </h4>
                      <ul className="space-y-3">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">→</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">📈</span>
                        Progressions
                      </h4>
                      <ul className="space-y-3">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-emerald-400 mt-1 font-bold">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">🔄</span>
                        Modifications
                      </h4>
                      <ul className="space-y-3">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">◆</span>
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        });
      });
    }
    
    // Main activities
    if (lessonPlan.mainActivities && lessonPlan.mainActivities.length > 0) {
      lessonPlan.mainActivities.forEach((activity, idx) => {
        allSteps.push({
          id: `main-${idx}`,
          title: `Main Activity ${lessonPlan.mainActivities!.length > 1 ? `(${idx + 1}/${lessonPlan.mainActivities!.length})` : ''}`,
          subtitle: typeof activity === 'string' ? activity : activity.name,
          content: (
            <div className="space-y-6">
              {typeof activity === 'string' ? (
                <div className="bg-white/20 backdrop-blur-lg border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-xl">
                  <p className="text-white text-lg leading-relaxed">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/20 backdrop-blur-lg border border-yellow-400/40 rounded-xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{activity.name}</h3>
                      {activity.duration && (
                        <span className="bg-yellow-400/30 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-yellow-400/40">
                          ⏱ {activity.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-lg leading-relaxed border-l-4 border-yellow-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        Coaching Cues
                      </h4>
                      <ul className="space-y-3">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">→</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">📈</span>
                        Progressions
                      </h4>
                      <ul className="space-y-3">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-yellow-400 mt-1 font-bold">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">🔄</span>
                        Modifications
                      </h4>
                      <ul className="space-y-3">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">◆</span>
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        });
      });
    }
    
    // Cool-down activities
    if (lessonPlan.coolDown && lessonPlan.coolDown.length > 0) {
      lessonPlan.coolDown.forEach((activity, idx) => {
        allSteps.push({
          id: `cooldown-${idx}`,
          title: `Cool-Down ${lessonPlan.coolDown!.length > 1 ? `(${idx + 1}/${lessonPlan.coolDown!.length})` : ''}`,
          subtitle: typeof activity === 'string' ? activity : activity.name,
          content: (
            <div className="space-y-6">
              {typeof activity === 'string' ? (
                <div className="bg-white/20 backdrop-blur-lg border-l-4 border-blue-400 p-6 rounded-r-xl shadow-xl">
                  <p className="text-white text-lg leading-relaxed">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/20 backdrop-blur-lg border border-blue-400/40 rounded-xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{activity.name}</h3>
                      {activity.duration && (
                        <span className="bg-blue-400/30 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-blue-400/40">
                          ⏱ {activity.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-lg leading-relaxed border-l-4 border-blue-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        Coaching Cues
                      </h4>
                      <ul className="space-y-3">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">→</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">📈</span>
                        Progressions
                      </h4>
                      <ul className="space-y-3">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-blue-400 mt-1 font-bold">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl space-y-3">
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">🔄</span>
                        Modifications
                      </h4>
                      <ul className="space-y-3">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                            <span className="text-white/70 mt-1">◆</span>
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        });
      });
    }
    
    // Summary step
    allSteps.push({
      id: 'summary',
      title: 'Session Complete!',
      subtitle: 'Review and next steps',
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-lg border border-white/30 rounded-xl p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">🎾</div>
            <h3 className="text-2xl font-bold text-white mb-2">Great Coaching Session!</h3>
            <p className="text-white/80 text-lg">
              You've completed all {allSteps.length - 2} activities
            </p>
          </div>
          
          {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Assessment Criteria
              </h3>
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                <ul className="space-y-3">
                  {lessonPlan.assessmentCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-white">
                      <span className="flex-shrink-0 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-white border border-white/40 shadow-lg">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed flex-1">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {lessonPlan.coachingTips && lessonPlan.coachingTips.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Coaching Tips for Next Time
              </h3>
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 shadow-xl">
                <ul className="space-y-3">
                  {lessonPlan.coachingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                      <span className="mt-0.5 text-xl">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    });
    
    return allSteps;
  }, [lessonPlan]);
  
  const totalSteps = steps.length;
  const currentStepData = steps[currentStep];
  
  // Extract duration for the current step
  const currentStepDuration = useMemo(() => {
    const stepData = steps[currentStep];
    if (!stepData) return 0;
    
    // Skip timer for overview and summary steps
    if (stepData.id === 'overview' || stepData.id === 'summary') return 0;
    
    // Get the activity from the lesson plan based on step ID
    const [type, index] = stepData.id.split('-');
    const idx = parseInt(index);
    
    let activity: DetailedActivity | string | undefined;
    if (type === 'warmup' && lessonPlan.warmUp) {
      activity = lessonPlan.warmUp[idx];
    } else if (type === 'main' && lessonPlan.mainActivities) {
      activity = lessonPlan.mainActivities[idx];
    } else if (type === 'cooldown' && lessonPlan.coolDown) {
      activity = lessonPlan.coolDown[idx];
    }
    
    if (activity && typeof activity !== 'string' && activity.duration) {
      return parseDurationToSeconds(activity.duration);
    }
    return 0;
  }, [currentStep, steps, lessonPlan]);
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    setCurrentStep(0);
    setIsTimerRunning(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    onClose();
  };
  
  const handleTimerStart = () => {
    setIsTimerRunning(true);
  };
  
  const handleTimerPause = () => {
    setIsTimerRunning(false);
  };
  
  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimeRemaining(timerInitialTime);
  };
  
  // Reset step and scroll to top when opening or changing steps
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);
  
  // Initialize timer when step changes or duration updates
  useEffect(() => {
    setIsTimerRunning(false);
    setTimeRemaining(currentStepDuration);
    setTimerInitialTime(currentStepDuration);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, [currentStep, currentStepDuration]);
  
  // Timer countdown effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining]);
  
  // Scroll to top when step changes
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (viewport) {
      viewport.scrollTop = 0;
    }
  }, [currentStep]);

  // Handle ESC key to close and arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        handleBack();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentStep, totalSteps]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url(/tennis6.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Close button - fixed in top right */}
          <motion.button
            onClick={handleClose}
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

          {/* Step-by-step content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl mx-auto relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: '85vh' }}
          >
            {/* Header with progress */}
            <div className="bg-white/5 backdrop-blur-sm border-b border-white/20 p-6">
              <div className="space-y-4">
                {/* Title and metadata badges */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-white mb-2 truncate">
                      {lessonPlan.title || 'Lesson Plan'}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {lessonPlan.sport && (
                        <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-emerald-400/40 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {lessonPlan.sport}
                        </span>
                      )}
                      {lessonPlan.level && (
                        <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-blue-400/40 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {lessonPlan.level}
                        </span>
                      )}
                      {lessonPlan.duration && (
                        <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-yellow-400/40 px-2.5 py-1 rounded-lg text-xs font-medium">
                          ⏱ {lessonPlan.duration} min
                        </span>
                      )}
                      {lessonPlan.numberOfPeople && (
                        <span className="inline-flex items-center bg-white/20 backdrop-blur-lg text-white border border-purple-400/40 px-2.5 py-1 rounded-lg text-xs font-medium">
                          👥 {lessonPlan.numberOfPeople}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Progress indicator and Timer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                  
                  {/* Timer Display - only show for activity steps */}
                  {currentStepDuration > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-xs text-white/60 mb-1 font-medium uppercase tracking-wider">Activity Timer</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white font-mono">
                              {formatTime(timeRemaining)}
                            </span>
                            <span className="text-xs text-white/60">/ {formatTime(timerInitialTime)}</span>
                          </div>
                          {/* Progress bar */}
                          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full transition-colors ${
                                timeRemaining === 0 ? 'bg-emerald-400' : 'bg-white'
                              }`}
                              style={{
                                width: `${timerInitialTime > 0 ? ((timerInitialTime - timeRemaining) / timerInitialTime) * 100 : 0}%`
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                        
                        {/* Timer Controls */}
                        <div className="flex items-center gap-1.5">
                          {!isTimerRunning ? (
                            <motion.button
                              onClick={handleTimerStart}
                              disabled={timeRemaining === 0}
                              className="p-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 active:bg-white/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Start Timer"
                            >
                              <PlayIcon className="w-4 h-4 text-white" />
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleTimerPause}
                              className="p-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 active:bg-white/25 transition-all group"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Pause Timer"
                            >
                              <PauseIcon className="w-4 h-4 text-white" />
                            </motion.button>
                          )}
                          <motion.button
                            onClick={handleTimerReset}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 active:bg-white/25 transition-all group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Reset Timer"
                          >
                            <ResetIcon className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Scrollable step content */}
            <ScrollArea.Root className="flex-1" style={{ height: 'calc(85vh - 180px)' }}>
              <ScrollArea.Viewport className="w-full h-full" ref={scrollViewportRef}>
                <div className="p-8">
                  {/* Step content with animation */}
                  <div className="relative" style={{ minHeight: '400px' }}>
                    <AnimatePresence mode="wait">
                      {currentStepData && (
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-6"
                        >
                          {/* Step title and subtitle */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold border border-white/30">
                                {currentStep + 1}
                              </div>
                              <h2 className="text-2xl font-bold text-white">
                                {currentStepData.title}
                              </h2>
                            </div>
                            {currentStepData.subtitle && (
                              <p className="text-white/80 text-lg ml-13">
                                {currentStepData.subtitle}
                              </p>
                            )}
                          </div>
                          
                          {/* Step content */}
                          <div>
                            {currentStepData.content}
                          </div>
                          
                          {/* Navigation buttons within content */}
                          <div className="mt-8 pt-6 border-t border-white/20">
                            <div className="flex gap-3">
                              {currentStep > 0 ? (
                                <motion.button
                                  type="button"
                                  onClick={handleBack}
                                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center gap-2 text-white"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <ArrowLeftIcon className="w-4 h-4" />
                                  <span>Back</span>
                                </motion.button>
                              ) : (
                                <div className="flex-1" />
                              )}
                              
                              {currentStep < totalSteps - 1 ? (
                                <motion.button
                                  type="button"
                                  onClick={handleNext}
                                  className="flex-1 bg-white border border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 hover:border-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center gap-2 text-black"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span>Next</span>
                                  <ArrowRightIcon className="w-4 h-4" />
                                </motion.button>
                              ) : (
                                <motion.button
                                  type="button"
                                  onClick={handleClose}
                                  className="flex-1 bg-white border-2 border-white rounded-2xl py-3 px-4 font-medium text-sm transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center gap-2 text-black shadow-lg"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <CheckIcon className="w-4 h-4" />
                                  <span>Finish</span>
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar 
                orientation="vertical" 
                className="flex select-none touch-none p-1 transition-all duration-200 ease-out data-[orientation=vertical]:w-2.5 mr-2"
              >
                <ScrollArea.Thumb className="flex-1 bg-white/40 hover:bg-white/60 rounded-full transition-colors duration-200" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
