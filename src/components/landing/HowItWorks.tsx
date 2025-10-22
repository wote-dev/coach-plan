import { SectionCard, SectionHeader } from '@/components/ui/Section';

const steps = [
  { step: '1', title: 'Tell us who you’re coaching', desc: 'Sport, level, duration, and group size.' },
  { step: '2', title: 'Generate and refine', desc: 'Get a complete plan with drills, cues, and adaptations.' },
  { step: '3', title: 'Share or export', desc: 'Send to assistants and athletes; export to PDF.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="emerald" className="mb-6">How it works</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <SectionCard key={s.step} className="p-6">
              <div className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 text-white text-sm font-bold">{s.step}</div>
              <h3 className="mt-3 text-white font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-white/75">{s.desc}</p>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
