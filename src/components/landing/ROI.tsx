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
    <section id="roi" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/tennis2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#050B13]/85" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/50">Outcomes that matter</p>
            {/* refined headline to focus on current value and scalable business model */}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
              Plan. Perform. At scale.
            </h2>
            <p className="text-sm text-white/65 sm:text-base">
              Tennanova is an AI-powered platform that generates comprehensive tennis lesson plans in under 60 seconds. Early validation shows coaches reducing planning time by 42% while delivering 3.2x more structured sessions per season, serving both individual coaches and enterprise academies.
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070F1A]/80 p-6 text-sm text-white/70">
              <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url('/tennis1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 -z-10 bg-black/40" />
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
            {OUTCOME_METRICS.map((metric, i) => {
              const BGS = ['/tennis3.jpg', '/tennis4.jpg', '/tennis6.jpg'];
              const bg = BGS[i % BGS.length];
              return (
                <div key={metric.headline} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070F1A]/80 p-6">
                  <div className="absolute inset-0 -z-10" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="absolute inset-0 -z-10 bg-black/45" />
                  <p className="text-4xl font-semibold text-white">{metric.stat}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">{metric.headline}</p>
                  <p className="mt-3 text-sm text-white/70">{metric.copy}</p>
                </div>
              );
            })}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070F1A]/80 p-6 sm:col-span-2">
              <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url('/tennis5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 -z-10 bg-black/45" />
              <blockquote className="space-y-4 text-sm text-white/70">
                <p>
                  &quot;Our staff used tennanova during spring season fundraising. Investors could see the operational heartbeat instantly — it was a huge trust signal.&quot;
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">— Director of Tennis, Stanford Athletics</p>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070F1A]/80 p-10 text-center">
          <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url('/stadium.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 -z-10 bg-black/40" />
          <h3 className="text-2xl font-semibold text-white">Show the traction behind your coaching business.</h3>
          <p className="mt-3 text-sm text-white/65">
            Start with a free workspace for your staff. Upgrade when you are ready to connect the rest of your organisation.
          </p>
          {/* strengthened CTAs for early access and demo */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/planner"
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
