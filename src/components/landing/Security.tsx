export default function Security() {
  return (
    <section id="security" className="bg-[#050B13] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          {/* repurposed section to Founder story */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Founder</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">From Daniel Zverev</h2>
          <p className="text-sm text-white/60 sm:text-base">
            I spent seven years as a tennis official across numerous countries, including at Wimbledon and the Australian Open. After leaving officiating, I began coaching—and ran into a familiar problem: planning great sessions took hours.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              title: 'On‑court foundation',
              bullets: [
                '7 years on tour as a certified tennis official',
                'Worked across multiple countries, including Wimbledon and Australian Open',
                'Firsthand view of elite preparation and performance standards',
              ],
            },
            {
              title: 'Why I built Tennanova',
              bullets: [
                'As a coach, I spent too long preparing lesson plans and materials',
                'Too much lived in spreadsheets, PDFs, and scattered notes',
                'I’m building an AI planning engine so coaches can focus on athletes—not admin',
              ],
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#070F1A] p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/45">{item.title}</p>
              <ul className="mt-4 space-y-4 text-sm text-white/70">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#070F1A] p-7 text-sm text-white/70 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-white">Let’s connect</p>
            <p className="mt-2">
              I’m looking to partner with forward‑thinking coaches, academies, and investors who believe coaching intelligence is the next frontier.
            </p>
          </div>
          <a
            href="mailto:hello@tennanova.com"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/75 transition hover:text-white lg:mt-0"
          >
            Email Daniel
          </a>
        </div>
      </div>
    </section>
  );
}
