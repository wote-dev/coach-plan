export default function Features() {
  const BGS = ['/tennis1.jpg', '/tennis2.jpg', '/tennis3.jpg', '/tennis4.jpg', '/tennis5.jpg', '/tennis6.jpg'];
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* updated features heading for clearer positioning */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Platform capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* refreshed feature set to emphasize AI planning engine, collaboration, and analytics roadmap */}
          {[
            { title: 'AI planning engine', desc: 'Generate complete, structured tennis sessions in under a minute.' },
            { title: 'Adaptations & progressions', desc: 'Auto‑adjust for level, group size, surface, and available equipment.' },
            { title: 'Export & share', desc: 'Instant PDF, shareable links, and calendar sync to your systems.' },
            { title: 'Templates & playbooks', desc: 'Codify best practice and reuse across teams, sites, and seasons.' },
            { title: 'Collaboration & approvals', desc: 'Comment, review, and align staff with roles and permissions.' },
            { title: 'Performance analytics (roadmap)', desc: 'Hook into Hawkeye, grip sensors, and athlete tracking to enrich plans and outcomes.' },
          ].map((f, i) => {
            const bg = i % 2 === 0 ? BGS[i % BGS.length] : null;
            return (
              <div key={f.title} className="relative overflow-hidden border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                {bg && (
                  <>
                    <div
                      className="absolute inset-0 -z-10"
                      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                    <div className="absolute inset-0 -z-10 bg-black/40" />
                  </>
                )}
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/80">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
