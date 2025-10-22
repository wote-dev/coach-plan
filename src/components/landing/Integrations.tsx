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
    <section id="integrations" className="border-b border-white/10 bg-[#060D16] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Integrations</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">Fits into the tools your staff already uses</h2>
          <p className="text-sm text-white/60 sm:text-base">
            Coach Plan plugs into your communication, scheduling and reporting stack so the team never re-enters information twice.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group) => (
            <div key={group.title} className="rounded-3xl border border-white/10 bg-[#070F1A] p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/45">{group.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-2">
                    <span>{item}</span>
                    <span className="text-xs text-white/40">Connected</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-dashed border-white/20 bg-transparent p-8 text-center text-sm text-white/60">
          Want to extend Coach Plan? Our API enables programmatic plan creation, roster sync and data exports.{' '}
          <a href="mailto:api@coachplan.com" className="text-white/80 underline-offset-4 hover:underline">
            Talk to our platform team
          </a>
          .
        </div>
      </div>
    </section>
  );
}
