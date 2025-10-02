'use server';

import { generateLessonPlan, LessonPlanParams } from '@/lib/gemini';

import { LessonPlan } from '@/data/lessonPlans';

export interface GenerateLessonPlanState {
  success?: boolean;
  error?: string;
  plan?: Partial<LessonPlan>;
}

export async function generateAILessonPlan(
  prevState: GenerateLessonPlanState | null,
  formData: FormData
): Promise<GenerateLessonPlanState> {
  console.log('🎯 Server Action called - generateAILessonPlan');
  
  try {
    // Extract form data
    const sport = formData.get('sport') as string;
    const level = formData.get('level') as string;
    const duration = parseInt(formData.get('duration') as string) || 60;
    const numberOfPeople = formData.get('numberOfPeople') as string;
    const equipment = formData.get('equipment') as string;
    const objectives = formData.get('objectives') as string;

    console.log('📋 Extracted form data:', {
      sport,
      level,
      duration,
      numberOfPeople,
      equipment,
      objectives
    });

    // Validate required fields
    if (!sport || !level || !numberOfPeople) {
      console.log('❌ Validation failed - missing required fields');
      return {
        success: false,
        error: 'Please fill in all required fields (Sport, Level, and Number of People)'
      };
    }

    console.log('✅ Validation passed');

    // Prepare parameters for AI generation
    const params: LessonPlanParams = {
      sport,
      level,
      duration,
      numberOfPeople,
      equipment: equipment || undefined,
      objectives: objectives || undefined
    };

    console.log('🔧 Prepared params for AI generation:', params);

    // Generate lesson plan using AI
    console.log('🚀 Calling generateLessonPlan...');
    const plan = await generateLessonPlan(params);
    console.log('✨ AI generation completed successfully:', plan);

    // Add metadata to match existing lesson plan structure
    const enhancedPlan = {
      id: `ai-${Date.now()}`,
      sport,
      level: level as 'Beginner' | 'Intermediate' | 'Advanced',
      duration: duration as 30 | 45 | 60 | 75 | 90 | 120,
      numberOfPeople: numberOfPeople as '1 (Individual)' | '2-5 (Small Group)' | '6-10 (Medium Group)' | '11-20 (Large Group)' | '20+ (Team)',
      ...plan,
      isAIGenerated: true
    };

    console.log('🎉 Enhanced plan created:', enhancedPlan);

    return {
      success: true,
      plan: enhancedPlan
    };

  } catch (error) {
    console.error('💥 Server Action Error:', error);
    console.error('🔍 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      error: error instanceof Error 
        ? `AI Generation failed: ${error.message}` 
        : 'Failed to generate lesson plan. Please try again.'
    };
  }
}