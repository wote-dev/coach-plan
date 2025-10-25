# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**tennanova** is a Next.js 15 application that generates customized tennis coaching lesson plans. It features both static lesson plans and AI-powered generation using Google's Gemini API.

**Key Features:**
- AI-powered tennis lesson plan generation via Gemini 2.5 Flash
- Static pre-built tennis lesson plans
- Tennis-specific background with smooth transitions
- Detailed lesson structure: warm-ups, main activities, cool-downs
- Responsive glassmorphism UI design

## Development Commands

### Running the Application
```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Development server runs at: http://localhost:3000

### Environment Setup
Create `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

**Important:** The app requires `GEMINI_API_KEY` to be set for AI generation to work. The application will throw an error on startup if this is missing.

## Architecture

### Application Structure

```
src/
├── app/                    # Next.js App Router
│   ├── actions/           # Server actions
│   │   └── generate-lesson-plan.ts  # AI generation server action
│   ├── coach-ai/          # AI-powered lesson plan generation page
│   ├── planner/           # Static lesson plan selection page
│   ├── layout.tsx         # Root layout with fonts & PageTransition
│   ├── page.tsx           # Homepage with HeroSection
│   └── globals.css        # Global styles & Tailwind config
├── components/
│   ├── CoachAI.tsx        # Form for AI lesson plan generation
│   ├── HeroSection.tsx    # Landing page hero section
│   ├── LessonPlanDisplay.tsx  # Modal display for generated plans
│   ├── ui/                # Reusable UI components
│   └── ...
├── data/
│   └── lessonPlans.ts     # Static lesson plan data & types
└── lib/
    ├── gemini.ts          # Gemini AI client & generation logic
    └── utils.ts           # Utility functions (cn for className merging)
```

### Key Architectural Patterns

#### 1. AI Generation Flow
The AI lesson plan generation follows a server-side pattern:

1. **Client Component** (`CoachAI.tsx`) - Form with React state management
2. **Server Action** (`generate-lesson-plan.ts`) - Handles form submission using `useActionState`
3. **Gemini Library** (`gemini.ts`) - Communicates with Google Gemini API
4. **Display** (`LessonPlanDisplay.tsx`) - Renders the generated plan in a modal

**Data Flow:**
```
CoachAI Form → Server Action → Gemini API → Enhanced Plan → LessonPlanDisplay
```

The server action enriches AI responses with metadata (id, timestamps, isAIGenerated flag) to match the `LessonPlan` interface.

#### 2. Page Routing Architecture
- **/** - Hero landing page with CTA button
- **/coach-ai** - AI-powered lesson plan generator
- **/planner** - Static lesson plan selector (uses pre-built data)

Both generator pages use the same `LessonPlanDisplay` component but with different data sources.

#### 3. Background System
Tennis-specific background transitions smoothly using Framer Motion:
- Mapping defined in both `/coach-ai/page.tsx` and `/planner/page.tsx`
- Uses `AnimatePresence` with `mode="popLayout"` for crossfades
- Tennis background image located in `/public/` directory (`tennis-bg.jpg`)

#### 4. Form State Management
The application uses two different patterns:
- **Static Planner**: Client-side state with `useState`
- **AI Generator**: `useActionState` hook for progressive enhancement with server actions

#### 5. Type System
Core types defined in `data/lessonPlans.ts`:
```typescript
LessonPlan {
  id, sport, level, duration, numberOfPeople,
  title, description, objectives, equipment,
  warmUp[], mainActivities[], coolDown[],
  safetyConsiderations[], assessmentCriteria[],
  adaptations{}, coachingTips[]
}

DetailedActivity {
  name, duration, description,
  coachingCues[], progressions[]?, modifications[]?
}
```

AI-generated plans add an `isAIGenerated: true` flag for tracking.

## Tech Stack Details

### Core Framework
- **Next.js 15.5.3** with App Router
- **React 19.1.0** with Turbopack enabled
- **TypeScript 5** with strict mode

### UI & Styling
- **Tailwind CSS v4** with PostCSS
- **Radix UI** primitives (Dialog, Select, RadioGroup, Slider, ScrollArea)
- **Framer Motion** for animations and page transitions
- **Lucide React** for icons
- **Custom components** from shadcn/ui (see `components.json`)

### AI Integration
- **@google/generative-ai** - Gemini 2.5 Flash model
- JSON response extraction via regex matching
- Server-side only API calls (API key never exposed to client)

### Path Aliases
Configured in `tsconfig.json`:
```typescript
"@/*": ["./src/*"]
```

## Development Guidelines

### Adding New Tennis Lesson Plans
1. Add new `LessonPlan` objects to `data/lessonPlans.ts` with tennis-specific content
2. Ensure all plans include appropriate tennis equipment, drills, and coaching cues
3. Follow the established `LessonPlan` interface structure

### Modifying AI Prompts
The prompt structure is defined in `src/lib/gemini.ts` (lines 24-70). Key elements:
- JSON schema specification for response format
- Tennis-specific parameter interpolation (level, duration, etc.)
- Activity structure with tennis coaching cues and progressions

### Form Validation
Client-side validation in `CoachAI.tsx`:
```typescript
const isFormValid = sport && level && numberOfPeople;
```

Server-side validation in `generate-lesson-plan.ts` checks required fields and returns error states.

### Styling Patterns
The app uses consistent glassmorphism styling:
```css
bg-white/10 backdrop-blur-xl border border-white/20
```

All interactive elements use Radix UI primitives with custom styling to match the design system.

### Error Handling
- Gemini API errors are logged with detailed context
- Server actions return `{ success, error, plan }` state objects
- UI displays error messages from server action responses
- Missing API key throws immediate error on app startup

## Component Patterns

### Server Actions Usage
```typescript
const [state, formAction, isPending] = useActionState(generateAILessonPlan, null);

// Hidden inputs capture component state for form submission
<input type="hidden" name="sport" value={sport} />
```

### Modal Pattern
`LessonPlanDisplay` uses Radix Dialog with:
- Overlay backdrop blur
- Scrollable content area with `ScrollArea.Root`
- Conditional rendering of activity sections
- Dynamic badge rendering for metadata

### Animation Pattern
Page transitions use a wrapper component:
```typescript
<PageTransition>{children}</PageTransition>
```

Background transitions use `AnimatePresence` with smooth crossfade effects for the tennis background.

## Testing & Debugging

### Console Logging
Extensive console logging in place for AI generation:
- `gemini.ts` - Logs prompts, responses, and errors
- `generate-lesson-plan.ts` - Logs form data, validation, and results
- Use browser console and terminal logs to debug

### Common Issues
1. **"GEMINI_API_KEY is not set"** - Add API key to `.env.local`
2. **No lesson plan generated** - Check console for API errors or validation failures
3. **Background not changing** - Verify image exists in `/public/` and mapping is correct
4. **Form not submitting** - Check `isFormValid` state and hidden inputs

## Fonts
- **Primary**: Nunito (variable font, weights 300-800)
- **Monospace**: JetBrains Mono (for code/technical content)
- Both loaded via `next/font/google`
