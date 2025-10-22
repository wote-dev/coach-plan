export default function Team() {
  return (
    <section id="team" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Team</h2>
        <p className="mt-2 text-white/80 max-w-2xl">We’re builders at the intersection of sports science and AI. Advisors include experienced coaches and operators. Interested in partnering or joining? We’d love to talk.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Founder & CEO", "Advisor — Coaching", "Founding Engineer"].map((role) => (
              <div key={role} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/15" />
                <h3 className="mt-3 text-white font-bold">{role}</h3>
                <p className="text-sm text-white/70">Add brief 1‑line background to build credibility.</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
