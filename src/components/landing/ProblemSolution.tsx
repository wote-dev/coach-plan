import { SectionCard, SectionHeader } from '@/components/ui/Section';

export default function ProblemSolution() {
  return (
    <section id="problem" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="yellow" className="mb-6">Problem → Solution</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard className="p-6 sm:p-8">
              <h3 className="text-white text-xl font-bold">Before — Manual planning is slow and inconsistent</h3>
              <ul className="mt-4 space-y-3 text-white/80 text-sm">
                <li>• 30–60 min per session building plans by hand</li>
                <li>• Hard to personalize for level, group size, and goals</li>
                <li>• Quality varies across coaches; knowledge trapped in silos</li>
              </ul>
            </SectionCard>
            <SectionCard className="p-6 sm:p-8">
              <h3 className="text-white text-xl font-bold">After — Elite plans in seconds, every time</h3>
              <ul className="mt-4 space-y-3 text-white/80 text-sm">
                <li>• Generate tailored plans in under 60 seconds</li>
                <li>• Structured drills, progressions, cues, and adaptations</li>
                <li>• Consistency across programs with team-wide templates</li>
              </ul>
            </SectionCard>
          </div>
        </div>
    </section>
  );
}
