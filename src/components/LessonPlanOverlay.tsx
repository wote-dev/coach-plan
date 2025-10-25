'use client';

import { LessonPlan, DetailedActivity } from '@/data/lessonPlans';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cross2Icon, 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckIcon, 
  PlayIcon, 
  PauseIcon, 
  ResetIcon,
  CheckCircledIcon,
  LightningBoltIcon,
  RocketIcon,
  ActivityLogIcon,
  ClockIcon,
  PersonIcon,
  TargetIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  ChatBubbleIcon,
  BarChartIcon,
  UpdateIcon,
  LapTimerIcon,
  MixIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@radix-ui/react-icons';

interface LessonPlanOverlayProps {
  lessonPlan: Partial<LessonPlan>;
  isOpen: boolean;
  onClose: () => void;
}

// Circular Timer Component
function CircularTimer({ 
  timeRemaining, 
  totalTime,
  isRunning 
}: { 
  timeRemaining: number; 
  totalTime: number;
  isRunning: boolean;
}) {
  const progress = totalTime > 0 ? (totalTime - timeRemaining) / totalTime : 0;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress * circumference);
  
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-white/10"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-300 ${
            timeRemaining === 0 ? 'text-emerald-400' : 'text-white'
          }`}
          style={{
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white font-mono tracking-tight">
            {formatTime(timeRemaining)}
          </div>
          {isRunning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-white/60 font-medium uppercase tracking-wider mt-0.5"
            >
              Running
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Activity Type Badge
function ActivityTypeBadge({ type }: { type: 'warmup' | 'main' | 'cooldown' | 'overview' | 'summary' }) {
  const config = {
    warmup: {
      label: 'Warm-Up',
      icon: LightningBoltIcon,
      className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    main: {
      label: 'Main Activity',
      icon: RocketIcon,
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    },
    cooldown: {
      label: 'Cool-Down',
      icon: ActivityLogIcon,
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    overview: {
      label: 'Overview',
      icon: MixIcon,
      className: 'bg-white/20 text-white border-white/30'
    },
    summary: {
      label: 'Summary',
      icon: CheckCircledIcon,
      className: 'bg-white/20 text-white border-white/30'
    }
  };
  
  const { label, icon: Icon, className } = config[type];
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border backdrop-blur-sm text-xs font-semibold ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Timer states
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerInitialTime, setTimerInitialTime] = useState<number>(0);
  const [isTimerMinimized, setIsTimerMinimized] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Build steps dynamically based on lesson plan content
  const steps = useMemo(() => {
    const allSteps: Array<{
      id: string;
      title: string;
      subtitle?: string;
      type: 'overview' | 'warmup' | 'main' | 'cooldown' | 'summary';
      content: React.JSX.Element;
    }> = [];
    
    // Overview step
    allSteps.push({
      id: 'overview',
      title: 'Lesson Overview',
      subtitle: 'Start your coaching session with confidence',
      type: 'overview',
      content: (
        <div className="space-y-6">
          {lessonPlan.description && (
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 p-6 rounded-xl shadow-lg">
              <p className="text-white text-lg leading-relaxed font-light">
                {lessonPlan.description}
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-5">
            {lessonPlan.objectives && lessonPlan.objectives.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TargetIcon className="w-4 h-4 text-emerald-400" />
                  Learning Objectives
                </h3>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg hover:border-white/30 transition-colors">
                  <ul className="space-y-3">
                    {lessonPlan.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] text-white/95 leading-relaxed">
                        <CheckCircledIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {lessonPlan.equipment && lessonPlan.equipment.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CubeIcon className="w-4 h-4 text-yellow-400" />
                  Required Equipment
                </h3>
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg hover:border-white/30 transition-colors">
                  <div className="flex flex-wrap gap-2">
                    {lessonPlan.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-medium px-3.5 py-2 shadow-sm hover:bg-white/25 transition-colors"
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
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
                Safety Considerations
              </h3>
              <div className="bg-red-500/15 backdrop-blur-sm border border-red-500/30 rounded-xl p-5 shadow-lg">
                <ul className="space-y-3">
                  {lessonPlan.safetyConsiderations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] text-white/95 leading-relaxed">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
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
          type: 'warmup',
          content: (
            <div className="space-y-5">
              {typeof activity === 'string' ? (
                <div className="bg-white/15 backdrop-blur-sm border-l-4 border-emerald-400 p-6 rounded-r-xl shadow-lg">
                  <p className="text-white text-lg leading-relaxed font-light">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/15 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-6 shadow-lg space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-white leading-tight">{activity.name}</h3>
                      {activity.duration && (
                        <div className="flex items-center gap-2 bg-emerald-400/20 text-emerald-300 px-3 py-2 rounded-lg text-sm font-semibold border border-emerald-400/30 flex-shrink-0">
                          <ClockIcon className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/90 text-base leading-relaxed border-l-2 border-emerald-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <ChatBubbleIcon className="w-4 h-4" />
                        Coaching Cues
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <BarChartIcon className="w-4 h-4" />
                        Progressions
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-emerald-400 mt-0.5 font-bold select-none">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <UpdateIcon className="w-4 h-4" />
                        Modifications
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
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
          type: 'main',
          content: (
            <div className="space-y-5">
              {typeof activity === 'string' ? (
                <div className="bg-white/15 backdrop-blur-sm border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-lg">
                  <p className="text-white text-lg leading-relaxed font-light">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/15 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 shadow-lg space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-white leading-tight">{activity.name}</h3>
                      {activity.duration && (
                        <div className="flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-2 rounded-lg text-sm font-semibold border border-yellow-400/30 flex-shrink-0">
                          <ClockIcon className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/90 text-base leading-relaxed border-l-2 border-yellow-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <ChatBubbleIcon className="w-4 h-4" />
                        Coaching Cues
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <BarChartIcon className="w-4 h-4" />
                        Progressions
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-yellow-400 mt-0.5 font-bold select-none">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <UpdateIcon className="w-4 h-4" />
                        Modifications
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
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
          type: 'cooldown',
          content: (
            <div className="space-y-5">
              {typeof activity === 'string' ? (
                <div className="bg-white/15 backdrop-blur-sm border-l-4 border-blue-400 p-6 rounded-r-xl shadow-lg">
                  <p className="text-white text-lg leading-relaxed font-light">{activity}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/15 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 shadow-lg space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-white leading-tight">{activity.name}</h3>
                      {activity.duration && (
                        <div className="flex items-center gap-2 bg-blue-400/20 text-blue-300 px-3 py-2 rounded-lg text-sm font-semibold border border-blue-400/30 flex-shrink-0">
                          <ClockIcon className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/90 text-base leading-relaxed border-l-2 border-blue-400 pl-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.coachingCues && activity.coachingCues.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <ChatBubbleIcon className="w-4 h-4" />
                        Coaching Cues
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.coachingCues.map((cue, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
                            <span>{cue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.progressions && activity.progressions.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <BarChartIcon className="w-4 h-4" />
                        Progressions
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.progressions.map((prog, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-blue-400 mt-0.5 font-bold select-none">{idx + 1}.</span>
                            <span>{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activity.modifications && activity.modifications.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <UpdateIcon className="w-4 h-4" />
                        Modifications
                      </h4>
                      <ul className="space-y-2.5">
                        {activity.modifications.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                            <span className="text-white/50 mt-0.5 select-none">•</span>
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
      type: 'summary',
      content: (
        <div className="space-y-6">
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
            >
              <CheckCircledIcon className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Great Coaching Session!</h3>
            <p className="text-white/70 text-base">
              You&apos;ve completed all {allSteps.length - 2} activities
            </p>
          </div>
          
          {lessonPlan.assessmentCriteria && lessonPlan.assessmentCriteria.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TargetIcon className="w-4 h-4" />
                Assessment Criteria
              </h3>
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg">
                <ul className="space-y-3">
                  {lessonPlan.assessmentCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90">
                      <span className="flex-shrink-0 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/30">
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
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ChatBubbleIcon className="w-4 h-4" />
                Coaching Tips for Next Time
              </h3>
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg">
                <ul className="space-y-3">
                  {lessonPlan.coachingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] text-white/90 leading-relaxed">
                      <ChatBubbleIcon className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
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
    setIsTimerMinimized(false); // Reset to expanded state on step change
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
        setCurrentStep(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentStep, totalSteps, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Brand-inspired background */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
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
              maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)'
            }}
          />
          {/* Decorative ring */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-[max(3vw,16px)] top-[10vh] -z-10"
            style={{ width: '42vw', height: '42vw' }}
          >
            <div className="relative h-full w-full rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(30,143,213,0.22), transparent 70%)' }}>
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-[6%] rounded-full border border-white/10" />
            </div>
          </motion.div>

          {/* Close button */}
          <motion.button
            onClick={handleClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 hover:bg-white/20 active:bg-white/25 transition-all shadow-xl"
            whileHover={{ 
              scale: 1.1,
              rotate: 90,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.9 }}
            title="Close"
          >
            <Cross2Icon className="w-5 h-5 text-white" />
          </motion.button>

          {/* Step-by-step content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-3xl mx-auto relative rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh', height: '85vh' }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E8FD5] to-[#CCFF00]" />
            {/* Header with progress */}
            <div className="bg-transparent backdrop-blur-0 border-b border-white/10 px-6 py-5">
              <div className="space-y-4">
                {/* Title and metadata */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-white mb-3 tracking-tight">
                      {lessonPlan.title || 'Lesson Plan'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <ActivityTypeBadge type={currentStepData?.type || 'overview'} />
                      {lessonPlan.sport && (
                        <span className="inline-flex items-center bg-white/15 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                          {lessonPlan.sport}
                        </span>
                      )}
                      {lessonPlan.level && (
                        <span className="inline-flex items-center bg-white/15 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                          {lessonPlan.level}
                        </span>
                      )}
                      {lessonPlan.duration && (
                        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                          <LapTimerIcon className="w-3.5 h-3.5" />
                          {lessonPlan.duration} min
                        </span>
                      )}
                      {lessonPlan.numberOfPeople && (
                        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                          <PersonIcon className="w-3.5 h-3.5" />
                          {lessonPlan.numberOfPeople}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-white/60">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                
                {/* Circular Timer Display */}
                {currentStepDuration > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      height: isTimerMinimized ? 'auto' : 'auto'
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl shadow-lg overflow-hidden"
                  >
                    {isTimerMinimized ? (
                      // Minimized Timer View
                      <div className="p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-white/70" />
                            <span className="text-lg font-bold text-white font-mono">
                              {formatTime(timeRemaining)}
                            </span>
                          </div>
                          {isTimerRunning && (
                            <div className="flex items-center gap-1">
                              <motion.div
                                className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-xs text-white/60 font-medium">Running</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Quick timer controls in minimized state */}
                          {!isTimerRunning ? (
                            <motion.button
                              onClick={handleTimerStart}
                              disabled={timeRemaining === 0}
                              className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:bg-white/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <PlayIcon className="w-3.5 h-3.5 text-white" />
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleTimerPause}
                              className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:bg-white/25 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <PauseIcon className="w-3.5 h-3.5 text-white" />
                            </motion.button>
                          )}
                          <motion.button
                            onClick={() => setIsTimerMinimized(false)}
                            className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:bg-white/20 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Expand Timer"
                          >
                            <ChevronDownIcon className="w-3.5 h-3.5 text-white/80" />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      // Expanded Timer View
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Activity Timer</div>
                          <motion.button
                            onClick={() => setIsTimerMinimized(true)}
                            className="p-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:bg-white/20 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Minimize Timer"
                          >
                            <ChevronUpIcon className="w-3.5 h-3.5 text-white/80" />
                          </motion.button>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                          {/* Circular Timer */}
                          <CircularTimer 
                            timeRemaining={timeRemaining}
                            totalTime={timerInitialTime}
                            isRunning={isTimerRunning}
                          />
                          
                          <div className="flex-1">
                            <div className="text-sm text-white/70 mb-3 font-medium">
                              {formatTime(timerInitialTime - timeRemaining)} / {formatTime(timerInitialTime)}
                            </div>
                            
                            {/* Timer Controls */}
                            <div className="flex items-center gap-2">
                              {!isTimerRunning ? (
                                <motion.button
                                  onClick={handleTimerStart}
                                  disabled={timeRemaining === 0}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:bg-white/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <PlayIcon className="w-4 h-4" />
                                  <span>Start</span>
                                </motion.button>
                              ) : (
                                <motion.button
                                  onClick={handleTimerPause}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:bg-white/25 transition-all text-white text-sm font-semibold"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <PauseIcon className="w-4 h-4" />
                                  <span>Pause</span>
                                </motion.button>
                              )}
                              <motion.button
                                onClick={handleTimerReset}
                                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:bg-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Reset Timer"
                              >
                                <ResetIcon className="w-4 h-4 text-white/80" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Scrollable step content */}
            <div className="flex-1 overflow-y-auto" ref={scrollViewportRef}>
              <div className="px-6 py-4">
                    <AnimatePresence mode="wait">
                      {currentStepData && (
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="space-y-6"
                        >
                          {/* Step subtitle banner */}
                          {currentStepData.subtitle && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white/10 backdrop-blur-sm border-l-2 border-white/40 rounded-r-xl px-5 py-3.5"
                            >
                              <h3 className="text-white text-base font-semibold leading-relaxed">
                                {currentStepData.subtitle}
                              </h3>
                            </motion.div>
                          )}
                          
                          {/* Step content */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            {currentStepData.content}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
              </div>
            </div>
            
            {/* Fixed Navigation Footer */}
            <div className="flex-none bg-transparent backdrop-blur-0 border-t border-white/10 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                {/* Back Button */}
                <motion.button
                  layoutId="back-button"
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  initial={false}
                  animate={{ 
                    opacity: currentStep > 0 ? 1 : 0
                  }}
                  transition={{ opacity: { duration: 0.2 } }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 rounded-xl py-2.5 px-5 font-semibold text-sm text-white disabled:cursor-default"
                  whileHover={currentStep > 0 ? { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.3)' } : {}}
                  whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
                  style={{ minWidth: '100px', pointerEvents: currentStep > 0 ? 'auto' : 'none' }}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </motion.button>
                
                {/* Center: Step indicator dots with completion states */}
                <div className="flex items-center justify-center gap-2">
                  {steps.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                      title={`Step ${idx + 1}`}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          width: idx === currentStep ? '32px' : '8px',
                          backgroundColor: idx < currentStep 
                            ? 'rgba(255, 255, 255, 0.6)' 
                            : idx === currentStep 
                            ? 'rgba(255, 255, 255, 1)' 
                            : 'rgba(255, 255, 255, 0.2)'
                        }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="h-2 rounded-full"
                        style={{ boxShadow: idx === currentStep ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                      />
                    </motion.button>
                  ))}
                </div>
                
                {/* Next/Finish Button */}
                <motion.button
                  layoutId="next-button"
                  type="button"
                  onClick={currentStep < totalSteps - 1 ? handleNext : handleClose}
                  initial={false}
                  className={`flex items-center gap-2 rounded-xl py-2.5 font-bold text-sm shadow-sm px-6 ${
                    currentStep < totalSteps - 1 
                      ? 'bg-white text-black border border-white hover:bg-white/95' 
                      : 'bg-[#CCFF00] text-[#05080F] border border-[#B8FF36] hover:bg-[#B8FF36]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  style={{ minWidth: '110px' }}
                >
                  {currentStep < totalSteps - 1 ? (
                    <>
                      <span>Next</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      <span>Finish</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
