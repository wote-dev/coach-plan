import { SectionCard, SectionHeader } from '@/components/ui/Section';

const integrations = ['Google Calendar', 'PDF export', 'Club CRM (CSV)', 'Player portals (link)'];

export default function Integrations() {
  return (
    <section id="integrations" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="white" className="mb-6">Integrations & Workflow</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SectionCard className="p-6">
            <h3 className="text-white font-bold">Works with your tools</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {integrations.map((i) => (
                <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">{i}</span>
              ))}
            </div>
          </SectionCard>
          <SectionCard className="p-6">
            <h3 className="text-white font-bold">Roadmap highlights</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>• Club scheduling sync</li>
              <li>• Drill library import</li>
              <li>• Athlete feedback loop</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
