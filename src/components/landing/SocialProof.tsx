export default function SocialProof() {
  return (
    <section id="proof" className="relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-white/60 uppercase">Trusted by coaches and clubs</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Building better sessions with AI
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {["Prep time ↓", "Consistency ↑", "Retention ↑", "Revenue ↑"].map((label) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">—</div>
                  <div className="text-xs font-semibold text-white/60 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
