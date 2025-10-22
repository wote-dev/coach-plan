import { SectionCard, SectionHeader } from '@/components/ui/Section';

export default function Security() {
  return (
    <section id="security" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader as="h2" size="lg" dotColor="red" className="mb-6">Privacy & Security</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard className="p-6">
              <h3 className="text-white font-bold">Architecture</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• Server-side AI calls; API keys never exposed to the client</li>
                <li>• No training on your private data without explicit consent</li>
                <li>• Data portability: export plans any time</li>
              </ul>
            </SectionCard>
            <SectionCard className="p-6">
              <h3 className="text-white font-bold">Enterprise readiness</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• SSO/SAML (enterprise)</li>
                <li>• Role-based access & approvals</li>
                <li>• SLA and DPA available</li>
              </ul>
            </SectionCard>
        </div>
      </div>
    </section>
  );
}
