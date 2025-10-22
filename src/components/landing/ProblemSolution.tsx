export default function ProblemSolution() {
  return (
    <section id="problem" className="py-20 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The problem
          </h2>
          <p className="text-white/70 text-lg max-w-2xl">
            Coaching is great. Planning sessions isn&apos;t. Most coaches spend 45 minutes per session building plans from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Without Coach Plan</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>45 minutes per session planning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>Hard to tailor for different levels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">•</span>
                <span>Consistency issues across programs</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">With Coach Plan</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>60 seconds to a complete session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>Customized for every skill level</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#CCFF00] mt-1">✓</span>
                <span>Repeatable, high-quality structure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
