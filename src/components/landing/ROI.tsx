import { SectionCard, SectionHeader } from '@/components/ui/Section';

const metrics = [
  { value: '—', label: 'Less prep time per session' },
  { value: '—', label: 'Increase in session consistency' },
  { value: '—', label: 'Coach retention improvement' },
  { value: '—', label: 'More revenue from premium programs' },
];

export default function ROI() {
  return (
    <section id="roi" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="yellow" className="mb-6">Outcomes & ROI</SectionHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <SectionCard key={m.label} className="p-5 text-center">
              <div className="text-3xl font-extrabold text-white">{m.value}</div>
              <div className="mt-1 text-xs font-semibold text-white/70">{m.label}</div>
            </SectionCard>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/60">Replace dashes with real numbers once available. Investors care about time saved, retention, and paid conversion.</p>
      </div>
    </section>
  );
}
