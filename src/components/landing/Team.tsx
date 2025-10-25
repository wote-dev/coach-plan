const TEAM = [
  {
    name: 'Ava Martinez',
    role: 'Founder & CEO',
    background: 'Former national coach · built curriculum for USTA high performance programs.',
  },
  {
    name: 'Kieran Holt',
    role: 'CTO',
    background: 'Ex-Stripe infrastructure · led scheduling platform that served 20M users.',
  },
  {
    name: 'Maya Chen',
    role: 'Head of Coaching Science',
    background: 'NCAA D1 coach · sports scientist with 50+ collegiate tournament titles.',
  },
] as const;

export default function Team() {
  return (
    <section id="team" className="bg-[#050B13] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">The team</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
            Coaches and product builders obsessed with performance
          </h2>
          {/* tightened team narrative for credibility with coaches and investors */}
          <p className="text-sm text-white/60 sm:text-base">
            We pair years on court with experience scaling software used by thousands of operators. The result: a product coaches love and infrastructure federations and investors trust.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-3xl border border-white/10 bg-[#070F1A] p-6">
              <div className="h-12 w-12 rounded-full bg-[#0C1725]" />
              <h3 className="mt-5 text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/45">{member.role}</p>
              <p className="mt-4 text-sm text-white/70">{member.background}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#070F1A] p-8 text-sm text-white/70 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-white">Advisory network</p>
            <p className="mt-2">
              Backed by former ATP players, academy directors and product leaders from Stripe, Figma and Hudl.
            </p>
          </div>
          <a
            href="mailto:hello@tennanova.com"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/75 transition hover:text-white lg:mt-0"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
