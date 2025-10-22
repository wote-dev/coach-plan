export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">What&apos;s included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'AI Generation', desc: 'Create complete, structured tennis sessions in 60 seconds.' },
            { title: 'Adaptations', desc: 'Auto-adjust for group size, skill level, and equipment.' },
            { title: 'Export & Share', desc: 'PDF export, shareable links, or integrate with your systems.' },
            { title: 'Templates', desc: 'Build and reuse best practices across your programs.' },
            { title: 'Collaboration', desc: 'Comment, approve, and iterate together as a team.' },
            { title: 'Analytics', desc: 'Track usage, adoption, and session effectiveness.' },
          ].map((f) => (
            <div key={f.title} className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
