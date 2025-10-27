import Link from 'next/link';

const LINKS = [
  {
    heading: 'Product',
    items: [
      { label: 'tennanova', href: '/planner' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Security', href: '#security' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '#team' },
      { label: 'Careers', href: 'mailto:jobs@tennanova.com' },
      // strengthened CTA label for partnerships
      { label: 'Partner with Us', href: 'mailto:hello@tennanova.com' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Support', href: 'mailto:support@tennanova.com' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040910] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">tennanova</p>
            {/* updated company descriptor to emphasize AI planning engine, integrations, and scale */}
            <p className="text-sm text-white/60">
              The AI planning engine for high‑performance tennis. Build shareable coaching plans, align staff, and integrate with Hawkeye, grip sensors, and analytics—scaling to federations and future racket sports.
            </p>
          </div>
          <div className="grid flex-1 gap-8 sm:grid-cols-3">
            {LINKS.map((group) => (
              <div key={group.heading}>
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/45">{group.heading}</p>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('/') ? (
                        <Link href={item.href} className="transition hover:text-white">
                          {item.label}
                        </Link>
                      ) : (
                        <a href={item.href} className="transition hover:text-white">
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} tennanova. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/tennanova" className="transition hover:text-white">
              Twitter
            </a>
            <a href="https://linkedin.com/company/tennanova" className="transition hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
