const STACK = [
  {
    title: 'Communication',
    items: ['Slack', 'Email', 'WhatsApp (Beta)'],
  },
  {
    title: 'Scheduling',
    items: ['Google Calendar', 'iCal feeds', 'TeamSnap'],
  },
  {
    title: 'Docs & exports',
    items: ['Instant PDF', 'Notion sync', 'CSV export'],
  },
  {
    title: 'Automation',
    items: ['Zapier', 'Make.com', 'Open API'],
  },
] as const;

export default function Integrations() {
  return (
    <section id="integrations" className="relative overflow-hidden border-b border-white/10 py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/tennis2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#060D16]/85" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          {/* updated to a roadmap-focused section to avoid implying existing integrations */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Roadmap</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">Where we’re headed</h2>
        <p className="text-sm text-white/60 sm:text-base">
            Our next goals are to secure funding so we can use Hawkeye technology to feed its data into our model and produce even better lessons.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group, i) => (
            <div key={group.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070F1A]/80 p-6">
              <div className="absolute inset-0 -z-10" style={{ backgroundImage: `url(${['/tennis4.jpg','/tennis5.jpg','/tennis6.jpg','/tennis1.jpg'][i % 4]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 -z-10 bg-black/45" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/45">{group.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-2">
                    <span>{item}</span>
                    <span className="text-xs text-white/40">Planned</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-dashed border-white/20 bg-transparent p-8 text-center text-sm text-white/60">
          {/* repositioned API note to future-facing language */}
          Our API is on the roadmap for programmatic plan creation, roster sync, data exports, and vendor integrations (Hawkeye, wearables, sensors).{' '}
          <a href="mailto:api@tennanova.com" className="text-white/80 underline-offset-4 hover:underline">
            Register interest
          </a>
          .
        </div>
      </div>
    </section>
  );
}
