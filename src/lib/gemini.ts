import { GoogleGenerativeAI } from '@google/generative-ai';

// Support multiple environment variable names for flexibility
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Gemini API key not found. Checked: GEMINI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, NEXT_PUBLIC_GEMINI_API_KEY');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

export interface LessonPlanParams {
  sport: string;
  level: string;
  age: string;
  duration: number;
  numberOfPeople: string;
  equipment?: string;
  objectives?: string;
}

export async function generateLessonPlan(params: LessonPlanParams) {
  console.log('🚀 Starting lesson plan generation with params:', params);
  
  // Check if the API is configured
  if (!model) {
    console.error('❌ Gemini API not initialized - API key is missing');
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.');
  }
  
  const prompt = `
Create a detailed sports coaching plan for a coach who will be teaching their client(s) with the following parameters:
- Sport: ${params.sport}
- Client Skill Level: ${params.level}
- Client Age Group: ${params.age}
- Session Duration: ${params.duration} minutes
- Number of Clients: ${params.numberOfPeople}
- Available Equipment: ${params.equipment || 'Tennis balls and racquets only'}
- Coaching Objectives: ${params.objectives || 'Improve fundamental skills'}

Important: Write this plan from the coach's perspective. Use language like "your client(s)", "guide them", "coach them", etc. The plan should help the coach understand what to do and how to coach their clients.

CRITICAL: Tailor ALL drills, activities, and exercises to be age-appropriate for the ${params.age} age group. Consider their physical capabilities, attention span, learning style, and safety needs specific to this age group. The activities should be developmentally appropriate and engaging for clients in this age range.

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

Make sure the activities are appropriate for the client's skill level and can be completed within the specified duration. Include specific time allocations for each activity. Remember: you are writing this for the COACH to use when coaching their client(s), so use coaching language and perspective throughout.
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