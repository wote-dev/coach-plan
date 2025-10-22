import { SectionCard, SectionHeader } from '@/components/ui/Section';

const features = [
  {
    title: 'AI lesson plans',
    desc: 'Level-aware plans with warm-ups, drills, cues, progressions, and cooldowns.',
  },
  {
    title: 'Adaptations & progressions',
    desc: 'Instantly tailor for number of players, space, and equipment constraints.',
  },
  {
    title: 'Template library',
    desc: 'Save and share best-practice templates across your team and programs.',
  },
  {
    title: 'Export & sharing',
    desc: 'Share plans to PDF or link for assistants and athletes; keep your brand.',
  },
  {
    title: 'Team collaboration',
    desc: 'Comment and iterate on sessions; version history and approvals.',
  },
  {
    title: 'Analytics',
    desc: 'Track usage, coach consistency, and athlete feedback to improve quality.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="blue" className="mb-6">Features</SectionHeader>
        <p className="text-white/80 max-w-2xl">Everything you need to run elite, consistent sessions—without the prep time.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <SectionCard key={f.title} className="p-5">
              <h3 className="text-white font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/75">{f.desc}</p>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
