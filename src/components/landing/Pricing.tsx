import Link from 'next/link';
import { SectionCard, SectionHeader } from '@/components/ui/Section';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'For individual coaches exploring AI planning',
    features: [
      '10 AI generations / month',
      'Basic templates',
      'Export to PDF',
    ],
    cta: { label: 'Get started', href: '/coach-ai' },
  },
  {
    name: 'Pro',
    price: '$19 / coach / mo',
    tagline: 'For serious coaches running weekly sessions',
    features: [
      'Unlimited generations',
      'Team templates',
      'Sharing links',
      'Priority support',
    ],
    highlight: true,
    cta: { label: 'Start Pro', href: '/coach-ai' },
  },
  {
    name: 'Club / Academy',
    price: 'Talk to us',
    tagline: 'For multi-coach programs and organizations',
    features: [
      'Seats & SSO',
      'Roles & approvals',
      'Analytics & reporting',
      'SLA / DPA',
    ],
    cta: { label: 'Book demo', href: '#book-demo' },
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="white" className="mb-3">Pricing</SectionHeader>
        <p className="text-white/80 max-w-2xl">Simple, scalable pricing. Start free, upgrade as you grow.</p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <SectionCard key={t.name} className={`p-6 sm:p-7 ${t.highlight ? 'border-white/20 bg-white/10' : ''}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-white font-extrabold text-lg">{t.name}</h3>
                  <div className="text-white text-xl font-bold">{t.price}</div>
                </div>
                <p className="mt-1 text-sm text-white/70">{t.tagline}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 inline-block size-1.5 rounded-full" style={{ background: '#CCFF00' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link href={t.cta.href} className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-bold ${t.highlight ? 'text-[#06141F]' : 'text-white/90 ring-1 ring-white/25'} `} style={t.highlight ? { background: 'linear-gradient(180deg, #CCFF00 0%, #B8FF36 100%)' } : {}}>
                    {t.cta.label}
                  </Link>
                </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
