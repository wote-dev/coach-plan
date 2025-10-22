import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: '',
    tagline: 'Launch quickly with core tooling',
    highlights: ['10 AI plans every month', 'PDF export & share links', 'Private workspace'],
    cta: { href: '/coach-ai', label: 'Start free' },
  },
  {
    name: 'Pro Staff',
    price: '$39',
    period: '/coach / month',
    tagline: 'Everything you need for a full staff',
    highlights: [
      'Unlimited plans & drill library',
      'Shared workspace with roles',
      'Calendar & messaging integrations',
      'Usage analytics',
    ],
    recommended: true,
    cta: { href: '/coach-ai', label: 'Start 14-day trial' },
  },
  {
    name: 'Enterprise',
    price: "Let's talk",
    period: '',
    tagline: 'For academies and federations',
    highlights: [
      'Dedicated success manager',
      'Custom integrations & API',
      'SSO/SAML · SOC2 reports',
      '99.9% uptime SLA',
    ],
    cta: { href: '#book-demo', label: 'Book a call' },
  },
] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="border-y border-white/10 bg-[#060D16] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Pricing</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
            Straightforward plans that scale with you
          </h2>
          <p className="text-sm text-white/60 sm:text-base">
            Start free. Upgrade when your staff needs shared workflows, integrations, or enterprise controls.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl border border-white/10 bg-[#070F1A] p-7 ${
                plan.recommended ? 'ring-1 ring-[#CCFF00]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/45">{plan.name}</p>
                {plan.recommended && (
                  <span className="rounded-full bg-[#CCFF00]/10 px-3 py-1 text-[11px] font-semibold text-[#CCFF00]">
                    Most popular
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-[32px] font-semibold text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-white/50">{plan.period}</span>}
              </div>
              <p className="mt-3 text-sm text-white/60">{plan.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={plan.cta.href}
                  className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.recommended
                      ? 'bg-[#CCFF00] text-[#05080F] hover:translate-y-[-1px]'
                      : 'border border-white/20 text-white/75 hover:text-white'
                  }`}
                >
                  {plan.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[13px] text-white/45">
          Annual billing available on request · Cancel anytime · Discounts for junior programs and non-profits
        </p>
      </div>
    </section>
  );
}
