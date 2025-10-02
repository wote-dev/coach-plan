import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export interface LessonPlanParams {
  sport: string;
  level: string;
  duration: number;
  numberOfPeople: string;
  equipment?: string;
  objectives?: string;
}

export async function generateLessonPlan(params: LessonPlanParams) {
  console.log('🚀 Starting lesson plan generation with params:', params);
  
  const prompt = `
Create a detailed sports lesson plan with the following parameters:
- Sport: ${params.sport}
- Skill Level: ${params.level}
- Duration: ${params.duration} minutes
- Number of People: ${params.numberOfPeople}
- Available Equipment: ${params.equipment || 'Standard equipment'}
- Learning Objectives: ${params.objectives || 'Improve fundamental skills'}

Please structure the lesson plan as a JSON object with the following format:
{
  "title": "Lesson title",
  "description": "Brief description of the lesson",
  "warmUp": [
    {
      "name": "Activity name",
      "duration": "5 minutes",
      "description": "Detailed description",
      "coachingCues": ["Cue 1", "Cue 2"]
    }
  ],
  "mainActivities": [
    {
      "name": "Activity name",
      "duration": "20 minutes",
      "description": "Detailed description",
      "coachingCues": ["Cue 1", "Cue 2"],
      "progressions": ["Progression 1", "Progression 2"]
    }
  ],
  "coolDown": [
    {
      "name": "Activity name",
      "duration": "5 minutes",
      "description": "Detailed description",
      "coachingCues": ["Cue 1", "Cue 2"]
    }
  ],
  "equipment": ["List of required equipment"],
  "objectives": ["List of learning objectives"],
  "safetyNotes": ["Important safety considerations"],
  "progressionTips": ["Tips for skill progression"]
}

Make sure the activities are appropriate for the skill level and can be completed within the specified duration. Include specific time allocations for each activity.
`;

  console.log('📝 Generated prompt:', prompt);

  try {
    console.log('🤖 Calling Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('✅ Gemini API response received');
    
    const response = await result.response;
    const text = response.text();
    console.log('📄 Raw response text:', text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('🎯 Found JSON match:', jsonMatch[0]);
      const parsedResult = JSON.parse(jsonMatch[0]);
      console.log('✨ Successfully parsed JSON:', parsedResult);
      return parsedResult;
    } else {
      console.error('❌ No valid JSON found in response');
      throw new Error('No valid JSON found in response');
    }
  } catch (error) {
    console.error('💥 Error generating lesson plan:', error);
    console.error('🔍 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error('Failed to generate lesson plan');
  }
}