export default function ProblemSolution() {
  return (
    <section id="problem" className="relative overflow-hidden py-20 sm:py-28 border-t border-white/5">
      {/* Section background with overlay */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/tennis3.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#050B13]/85" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The problem
          </h2>
          {/* reframed problem statement with clear, scalable pain points */}
          <p className="text-white/75 text-lg max-w-2xl">
            Coaches spend hours planning sessions manually. Lesson quality depends on subjective recall—not consistent data. Elite players rely on fragmented systems (video, analytics, notes, sensors). Federations can’t scale individualized coaching efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Without tennanova</h3>
            <ul className="space-y-3 text-white/80">
              {/* clarified pain points */}
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>Hours lost to manual session planning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>Quality driven by subjective recall—not consistent data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>Fragmented tools (video, analytics, notes, sensors)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">With tennanova</h3>
            <ul className="space-y-3 text-white/80">
              {/* clarified outcomes */}
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>60 seconds to a complete, athlete‑ready session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>Tailored by level, group size, and surface</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>Repeatable, high‑quality structure across teams and sites</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
