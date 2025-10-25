export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-[#060D16] py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          {/* clarified language and emphasized simplicity and auditability for federations */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/50">How Tennanova works</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
            From blank slate to on‑court ready — no spreadsheets.
          </h2>
          <p className="text-sm text-white/65 sm:text-base">
            Capture context, let the AI planning engine do the heavy lifting, then refine. Every step is auditable and export‑ready so directors, assistants, and specialists stay aligned.
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#070F1A] p-6 text-sm text-white/65">
            <p className="font-medium text-white">Director&apos;s note</p>
            <p className="mt-2">
              &quot;We used to spend Sunday afternoons building sessions. Tennanova gets us to a great starting point in under a minute, so we can spend time coaching, not formatting docs.&quot;
            </p>
            <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/45">— Head of High Performance, Nike Camps</p>
          </div>
        </div>
        <ol className="space-y-5">
          {/* refined steps to highlight AI engine and downstream alignment */}
          {[
            {
              title: 'Collect the essentials',
              desc: 'Select level, duration, group size, and surface. Add focus areas or constraints for the engine to respect.',
              detail: 'This takes most coaches ~15 seconds.',
            },
            {
              title: 'Generate a structured session',
              desc: 'Tennanova drafts a full block with timing, drill sequencing, coaching cues, and equipment in under a minute.',
              detail: 'Every card is editable so you can tweak on the fly.',
            },
            {
              title: 'Publish to your staff',
              desc: 'Publish to your shared library, export as PDF, or sync with calendars and team apps so assistants have context instantly.',
              detail: 'Usage is tracked so you know what resonates.',
            },
          ].map((step, index) => (
            <li
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070F1A] p-6 text-white/70"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#CCFF00]/10 text-sm font-semibold text-[#CCFF00]">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm">{step.desc}</p>
              <p className="mt-4 text-xs text-white/50">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
