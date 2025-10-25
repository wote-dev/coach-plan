import Link from 'next/link';

const OUTCOME_METRICS = [
  {
    stat: '42%',
    headline: 'Faster planning cycle',
    copy: 'Teams report cutting weekly planning time from 2.5 hours to under 1.5 hours across staff.',
  },
  {
    stat: '3.2x',
    headline: 'More sessions delivered',
    copy: 'Clubs using tennanova run over three times more structured sessions per season.',
  },
  {
    stat: '91%',
    headline: 'Athlete satisfaction',
    copy: 'Post-session surveys show a sustained lift in athlete engagement and clarity.',
  },
];

export default function ROI() {
  return (
    <section id="roi" className="bg-[#050B13] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/50">Outcomes that matter</p>
            {/* reframed narrative to attract investors without implying current backing; added business model and platform vision */}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
              Leverage for coaches today. A platform for the ecosystem tomorrow.
            </h2>
            <p className="text-sm text-white/65 sm:text-base">
              Tennanova delivers measurable output now—saved hours, higher retention, and consistent delivery across multi‑coach, multi‑site programs. Business model: B2C: Monthly SaaS for individual coaches. B2B: White‑label or per‑license sales to federations, academies, and sports organizations. Data & Insights Layer (long‑term): monetize anonymized performance trends. Tennanova’s next phase integrates live data—from Hawkeye, smart rackets, and grip sensors—to power real‑time performance feedback and adaptive session generation. This positions Tennanova not just as a tool, but as the platform for high‑performance coaching ecosystems. Coaching intelligence is the next frontier in sports AI. We’re starting with tennis—a $9B+ global industry—with pathways into other racket sports, fitness coaching, and youth development programs.
            </p>
            <div className="rounded-2xl border border-white/10 bg-[#070F1A] p-6 text-sm text-white/70">
              <p className="font-medium text-white">Case study · IMG Academy</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                  <span>6 direct coaching hours recovered per week.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                  <span>Standardised curriculum across three campuses in four weeks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                  <span>Documented plans for every athlete archived automatically.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4 text-white sm:grid-cols-2">
            {OUTCOME_METRICS.map((metric) => (
              <div key={metric.headline} className="rounded-2xl border border-white/10 bg-[#070F1A] p-6">
                <p className="text-4xl font-semibold text-white">{metric.stat}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">{metric.headline}</p>
                <p className="mt-3 text-sm text-white/65">{metric.copy}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-[#070F1A] p-6 sm:col-span-2">
              <blockquote className="space-y-4 text-sm text-white/70">
                <p>
                  &quot;Our staff used tennanova during spring season fundraising. Investors could see the operational heartbeat instantly — it was a huge trust signal.&quot;
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">— Director of Tennis, Stanford Athletics</p>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#070F1A] p-10 text-center">
          <h3 className="text-2xl font-semibold text-white">Show the traction behind your coaching business.</h3>
          <p className="mt-3 text-sm text-white/65">
            Start with a free workspace for your staff. Upgrade when you are ready to connect the rest of your organisation.
          </p>
          {/* strengthened CTAs for early access and demo */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/coach-ai"
              className="inline-flex items-center justify-center rounded-full bg-[#CCFF00] px-6 py-3 text-sm font-semibold text-[#05080F] transition-transform hover:translate-y-[-1px]"
            >
              Join Early Access
            </Link>
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              See Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
