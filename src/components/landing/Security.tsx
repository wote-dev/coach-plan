const GUARANTEES = [
  {
    title: 'Enterprise-grade security',
    bullets: [
      'SOC 2 Type II in progress · independent pen tests every quarter',
      'AES-256 at rest, TLS 1.3 in transit, secrets rotated automatically',
      'Private customer data never used to retrain models',
    ],
  },
  {
    title: 'Compliance on day one',
    bullets: [
      'GDPR, CCPA and UK GDPR ready with signed DPAs',
      'Granular audit trails and workspace level retention policies',
      'SSO/SAML, SCIM provisioning and role-based access controls',
    ],
  },
];

export default function Security() {
  return (
    <section id="security" className="bg-[#050B13] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-4 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Security & compliance</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[40px]">Run Coach Plan at scale with confidence</h2>
          <p className="text-sm text-white/60 sm:text-base">
            Built with academy directors and enterprise IT teams. We support your procurement, legal and security reviews end-to-end.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {GUARANTEES.map((item) => (
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
            <p className="text-white">Need security documentation?</p>
            <p className="mt-2">
              We provide SOC 2 reports, penetration tests and detailed architecture docs during procurement.
            </p>
          </div>
          <a
            href="mailto:security@coachplan.com"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/75 transition hover:text-white lg:mt-0"
          >
            Request the security pack
          </a>
        </div>
      </div>
    </section>
  );
}
