export interface DetailedActivity {
  name: string;
  duration: string;
  description: string;
  coachingCues: string[];
  progressions?: string[];
  modifications?: string[];
  safetyNotes?: string[];
}

export interface LessonPlan {
  id: string;
  sport: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: 30 | 45 | 60 | 75 | 90;
  numberOfPeople: '1 (Individual)' | '2-5 (Small Group)' | '6-10 (Medium Group)' | '11-20 (Large Group)' | '20+ (Team)';
  title: string;
  description: string;
  objectives: string[];
  equipment: string[];
  safetyConsiderations: string[];
  warmUp: DetailedActivity[];
  mainActivities: DetailedActivity[];
  coolDown: DetailedActivity[];
  assessmentCriteria: string[];
  adaptations: {
    forBeginners?: string[];
    forAdvanced?: string[];
    forInjuries?: string[];
  };
  coachingTips: string[];
}

export const lessonPlans: LessonPlan[] = [
  // Tennis Lesson Plans
  {
    id: 'tennis-beginner-30-individual',
    sport: 'Tennis',
    level: 'Beginner',
    duration: 30,
    numberOfPeople: '1 (Individual)',
    title: 'Basic Tennis Fundamentals',
    description: 'Comprehensive introduction to tennis basics including proper grip, stance, and fundamental strokes with emphasis on safety and technique development',
    objectives: [
      'Master the continental and eastern forehand grips',
      'Develop proper ready position and court positioning',
      'Execute consistent forehand strokes with proper form',
      'Understand basic tennis rules and court etiquette',
      'Build confidence and enjoyment in tennis'
    ],
    equipment: ['Tennis racket (appropriate size)', 'Low-compression tennis balls', 'Cones for markers', 'Ball hopper', 'Court or practice wall'],
    safetyConsiderations: [
      'Ensure proper warm-up to prevent injury',
      'Check racket grip size for comfort and control',
      'Use low-compression balls to reduce impact stress',
      'Maintain safe distance from other players',
      'Stay hydrated throughout the session',
      'Be aware of court surface conditions'
    ],
    warmUp: [
      {
        name: 'Dynamic Movement Preparation',
        duration: '3 minutes',
        description: 'Light jogging around the court perimeter to increase heart rate and prepare muscles for activity',
        coachingCues: [
          'Start slowly and gradually increase pace',
          'Focus on proper posture while jogging',
          'Breathe naturally and rhythmically',
          'Land on balls of feet, not heels'
        ],
        modifications: ['Walk briskly if jogging is too intense', 'Use smaller court area if space is limited'],
        safetyNotes: ['Check for any obstacles on court', 'Stop if experiencing any discomfort']
      },
      {
        name: 'Tennis-Specific Stretching',
        duration: '2 minutes',
        description: 'Targeted stretches for shoulders, arms, and wrists to prepare for racket work',
        coachingCues: [
          'Hold each stretch for 15-20 seconds',
          'Stretch should feel comfortable, not painful',
          'Focus on shoulder circles and arm swings',
          'Include wrist rotations and finger flexing'
        ],
        progressions: ['Add dynamic arm swings', 'Include torso rotations'],
        safetyNotes: ['Never force a stretch', 'Stop if any sharp pain occurs']
      }
    ],
    mainActivities: [
      {
        name: 'Grip Fundamentals and Racket Familiarization',
        duration: '5 minutes',
        description: 'Detailed instruction on proper grip techniques with hands-on practice and correction',
        coachingCues: [
          'Hold racket like shaking hands with the handle',
          'Index finger knuckle on bevel 2 for eastern forehand',
          'Grip firmly but not tightly - like holding a bird',
          'Check grip by seeing if you can wiggle fingers slightly',
          'Practice switching between grips smoothly'
        ],
        progressions: [
          'Start with continental grip only',
          'Add eastern forehand grip',
          'Practice grip changes with eyes closed'
        ],
        modifications: [
          'Use smaller grip size if hands are small',
          'Add overgrip for better feel',
          'Use visual markers on racket handle'
        ],
        safetyNotes: ['Ensure grip is not too tight to avoid fatigue', 'Check for proper racket weight']
      },
      {
        name: 'Forehand Technique Development',
        duration: '8 minutes',
        description: 'Progressive forehand instruction starting with stationary ball feeding and building to simple rallying',
        coachingCues: [
          'Start in ready position with racket up',
          'Turn shoulders and step with opposite foot',
          'Keep eye on ball from start to contact',
          'Contact ball at waist height in front of body',
          'Follow through across body toward opposite shoulder',
          'Finish with racket over opposite shoulder'
        ],
        progressions: [
          'Shadow swings without ball (1 min)',
          'Hit stationary ball off cone (3 mins)',
          'Gentle underhand tosses from coach (4 mins)'
        ],
        modifications: [
          'Use larger, slower balls for beginners',
          'Reduce swing length for better control',
          'Focus on contact point only initially'
        ],
        safetyNotes: ['Maintain safe distance from walls/fences', 'Be aware of ball trajectory']
      },
      {
        name: 'Backhand Introduction',
        duration: '7 minutes',
        description: 'Basic two-handed backhand technique with emphasis on grip change and body rotation',
        coachingCues: [
          'Change to two-handed backhand grip',
          'Non-dominant hand guides the stroke',
          'Turn shoulders more than on forehand',
          'Keep both hands on racket through contact',
          'Step across with outside foot',
          'Follow through with hands finishing high'
        ],
        progressions: [
          'Practice grip change from forehand (1 min)',
          'Shadow swings focusing on rotation (2 mins)',
          'Hit stationary balls (4 mins)'
        ],
        modifications: [
          'Allow one-handed backhand if more comfortable',
          'Use shorter backswing initially',
          'Focus on just making contact first'
        ],
        safetyNotes: ['Ensure proper spacing for backhand swing', 'Watch for proper grip to avoid wrist strain']
      },
      {
        name: 'Wall Rally Practice',
        duration: '3 minutes',
        description: 'Controlled practice against practice wall or backboard to develop consistency and timing',
        coachingCues: [
          'Stand appropriate distance from wall (8-10 feet)',
          'Start with gentle, controlled shots',
          'Focus on consistent contact point',
          'Let ball bounce once before hitting',
          'Aim for same spot on wall each time'
        ],
        progressions: [
          'Count consecutive hits',
          'Alternate forehand and backhand',
          'Vary height and pace slightly'
        ],
        modifications: [
          'Move closer to wall if struggling',
          'Use softer balls for easier control',
          'Allow multiple bounces initially'
        ],
        safetyNotes: ['Be aware of ball rebounds', 'Maintain safe distance from wall']
      }
    ],
    coolDown: [
      {
        name: 'Gentle Recovery and Reflection',
        duration: '2 minutes',
        description: 'Light stretching and discussion of key learning points from the session',
        coachingCues: [
          'Focus on deep breathing to lower heart rate',
          'Stretch major muscle groups used',
          'Reflect on what felt good during practice',
          'Identify one thing to work on next time'
        ],
        modifications: ['Extend stretching time if needed', 'Include mental visualization of techniques'],
        safetyNotes: ['Ensure complete cool-down before leaving court']
      }
    ],
    assessmentCriteria: [
      'Demonstrates proper grip technique',
      'Shows understanding of ready position',
      'Makes contact with ball consistently',
      'Displays basic stroke mechanics',
      'Follows safety guidelines',
      'Shows enthusiasm and effort'
    ],
    adaptations: {
      forBeginners: [
        'Use even softer balls or foam balls',
        'Reduce court size with cones',
        'Focus on just one stroke per session',
        'Allow more time for each activity'
      ],
      forAdvanced: [
        'Add target practice with cones',
        'Introduce basic footwork patterns',
        'Include simple tactical concepts',
        'Increase pace and intensity slightly'
      ],
      forInjuries: [
        'Modify activities for specific limitations',
        'Use chair for seated practice if needed',
        'Focus on upper body technique only',
        'Reduce session duration if necessary'
      ]
    },
    coachingTips: [
      'Keep instructions simple and positive',
      'Demonstrate each technique clearly',
      'Provide immediate, specific feedback',
      'Celebrate small improvements',
      'Be patient with learning curve',
      'Use analogies to help understanding (e.g., "shake hands with the racket")',
      'Take breaks if student shows fatigue',
      'End on a positive note with successful shots'
    ]
  },

  // Basketball Lesson Plans
  {
    id: 'basketball-beginner-30-individual',
    sport: 'Basketball',
    level: 'Beginner',
    duration: 30,
    numberOfPeople: '1 (Individual)',
    title: 'Basketball Fundamentals',
    description: 'Comprehensive introduction to basketball basics including ball handling, shooting form, and fundamental movement patterns',
    objectives: [
      'Master basic ball handling with both hands',
      'Develop proper shooting form and technique',
      'Learn fundamental dribbling skills',
      'Understand basic basketball rules and court awareness',
      'Build confidence with the basketball'
    ],
    equipment: ['Basketball (appropriate size)', 'Basketball hoop', 'Cones for markers', 'Water bottle'],
    safetyConsiderations: [
      'Ensure proper warm-up to prevent injury',
      'Check court surface for hazards',
      'Use appropriate ball size for age/skill level',
      'Maintain awareness of surroundings',
      'Stay hydrated throughout session',
      'Wear appropriate athletic footwear'
    ],
    warmUp: [
      {
        name: 'Dynamic Basketball Warm-up',
        duration: '3 minutes',
        description: 'Light jogging and movement preparation specific to basketball actions',
        coachingCues: [
          'Start with light jogging in place',
          'Add arm swings and leg swings',
          'Include high knees and butt kicks',
          'Focus on controlled movements'
        ],
        modifications: ['Reduce intensity for younger players', 'Add basketball-specific movements'],
        safetyNotes: ['Check for proper footwear', 'Ensure adequate space for movement']
      },
      {
        name: 'Ball Familiarization',
        duration: '2 minutes',
        description: 'Getting comfortable with basketball through simple handling exercises',
        coachingCues: [
          'Hold ball with fingertips, not palms',
          'Feel the texture and weight of the ball',
          'Practice simple ball rotations',
          'Focus on control and comfort'
        ],
        progressions: ['Add simple tosses and catches', 'Include around-the-body passes'],
        safetyNotes: ['Maintain control of ball at all times', 'Be aware of other players nearby']
      }
    ],
    mainActivities: [
      {
        name: 'Ball Handling Fundamentals',
        duration: '8 minutes',
        description: 'Essential ball handling skills including proper hand position and basic control exercises',
        coachingCues: [
          'Use fingertips and finger pads, not palms',
          'Keep eyes up when possible',
          'Start slowly and build speed gradually',
          'Focus on control over speed initially',
          'Keep ball low and close to body'
        ],
        progressions: [
          'Stationary ball handling (2 mins)',
          'Ball slaps and squeezes (2 mins)',
          'Around the waist/legs (2 mins)',
          'Figure-8 through legs (2 mins)'
        ],
        modifications: [
          'Use smaller ball if struggling',
          'Allow two hands initially',
          'Reduce complexity of movements'
        ],
        safetyNotes: ['Maintain control to prevent ball from rolling away', 'Keep movements controlled']
      },
      {
        name: 'Dribbling Technique',
        duration: '7 minutes',
        description: 'Proper dribbling form with emphasis on hand position, ball control, and body posture',
        coachingCues: [
          'Push ball down with fingertips',
          'Keep ball at waist height or lower',
          'Maintain athletic stance with knees bent',
          'Keep head up and eyes forward',
          'Use wrist snap, not arm motion',
          'Protect ball with off-hand'
        ],
        progressions: [
          'Stationary dribbling with dominant hand (2 mins)',
          'Stationary dribbling with non-dominant hand (2 mins)',
          'Walking while dribbling (3 mins)'
        ],
        modifications: [
          'Allow looking at ball initially',
          'Use larger, bouncier ball if needed',
          'Start with two-hand dribbling'
        ],
        safetyNotes: ['Maintain control to avoid losing ball', 'Be aware of court boundaries']
      },
      {
        name: 'Shooting Form Development',
        duration: '8 minutes',
        description: 'Fundamental shooting technique starting close to basket and focusing on proper form',
        coachingCues: [
          'Square feet and shoulders to basket',
          'Shooting hand under ball, guide hand on side',
          'Elbow under ball in straight line',
          'Follow through with wrist snap',
          'Arc the ball with proper rotation',
          'Hold follow-through until ball hits rim'
        ],
        progressions: [
          'Form shooting without ball (1 min)',
          'Close-range shots (2 feet from basket) (3 mins)',
          'Free throw line shots (4 mins)'
        ],
        modifications: [
          'Lower basket height if available',
          'Use smaller/lighter ball',
          'Focus on form over making shots'
        ],
        safetyNotes: ['Be aware of ball rebounds', 'Maintain safe distance from basket']
      },
      {
        name: 'Layup Introduction',
        duration: '2 minutes',
        description: 'Basic layup technique with emphasis on footwork and soft touch around the rim',
        coachingCues: [
          'Approach basket at 45-degree angle',
          'Step with outside foot, then inside foot',
          'Lift knee up toward chest',
          'Use soft touch with fingertips',
          'Aim for back corner of square on backboard'
        ],
        progressions: [
          'Walking layup approach',
          'Slow jogging approach',
          'Add dribble before layup'
        ],
        modifications: [
          'Start very close to basket',
          'Allow two-handed layups initially',
          'Focus on footwork without ball first'
        ],
        safetyNotes: ['Control approach speed', 'Be aware of basket structure']
      }
    ],
    coolDown: [
      {
        name: 'Recovery and Skill Review',
        duration: '2 minutes',
        description: 'Light stretching and review of key skills learned during the session',
        coachingCues: [
          'Focus on deep breathing',
          'Stretch arms, legs, and back',
          'Review proper shooting form mentally',
          'Discuss what felt good during practice'
        ],
        modifications: ['Extend stretching if needed', 'Include goal setting for next session'],
        safetyNotes: ['Ensure complete cool-down before leaving court']
      }
    ],
    assessmentCriteria: [
      'Demonstrates proper ball handling technique',
      'Shows understanding of dribbling fundamentals',
      'Displays correct shooting form',
      'Follows safety guidelines consistently',
      'Shows improvement throughout session',
      'Demonstrates positive attitude and effort'
    ],
    adaptations: {
      forBeginners: [
        'Use smaller, lighter basketball',
        'Lower basket height if possible',
        'Focus on one skill at a time',
        'Allow more time for each activity',
        'Provide more demonstrations'
      ],
      forAdvanced: [
        'Add defensive movements',
        'Introduce combination moves',
        'Include competitive elements',
        'Increase pace and intensity'
      ],
      forInjuries: [
        'Modify activities based on specific limitations',
        'Focus on upper body skills if lower body injury',
        'Use seated positions when appropriate',
        'Reduce session intensity'
      ]
    },
    coachingTips: [
      'Emphasize fun and enjoyment',
      'Provide positive reinforcement frequently',
      'Demonstrate all skills clearly',
      'Break down complex movements into simple steps',
      'Be patient with learning process',
      'Use basketball analogies and terminology',
      'Encourage questions and curiosity',
      'End with successful attempts'
    ]
  }
];

export function getLessonPlan(
  sport: string,
  level: string,
  duration: number,
  numberOfPeople: string
): LessonPlan | null {
  const plan = lessonPlans.find(
    p => p.sport === sport && p.level === level && p.duration === duration && p.numberOfPeople === numberOfPeople
  );
  return plan || null;
}

export function getAvailablePlans(
  sport?: string,
  level?: string,
  duration?: number,
  numberOfPeople?: string
): LessonPlan[] {
  return lessonPlans.filter(plan => {
    return (!sport || plan.sport === sport) &&
           (!level || plan.level === level) &&
           (!duration || plan.duration === duration) &&
           (!numberOfPeople || plan.numberOfPeople === numberOfPeople);
  });
}