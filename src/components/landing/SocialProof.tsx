export default function SocialProof() {
  return (
    <section id="proof" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { label: 'Coaches using', value: '200+' },
            { label: 'Plans generated', value: '5K+' },
            { label: 'Avg prep time saved', value: '45 min' },
            { label: 'Satisfaction', value: '9/10' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
