export default function SocialProof() {
  return (
    <section id="proof" className="relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">Trusted by coaches and clubs</p>
              <h2 className="mt-2 text-white text-xl sm:text-2xl font-bold tracking-tight">Building better sessions with AI</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {["Prep time ↓", "Consistency ↑", "Retention ↑", "Revenue ↑"].map((label) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">—</div>
                  <div className="text-xs font-semibold text-white/70 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
