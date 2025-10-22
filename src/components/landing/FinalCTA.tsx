import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section id="book-demo" className="relative isolate py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Ready to run elite sessions?</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">Generate your first plan in seconds or book a walkthrough. We’ll tailor a plan for your program.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/coach-ai" className="inline-flex items-center rounded-full px-6 py-3 text-[15px] font-bold text-[#06141F] shadow-xl" style={{ background: 'linear-gradient(180deg, #CCFF00 0%, #B8FF36 100%)' }}>
              Try it free
            </Link>
            <a href="mailto:hello@example.com" className="inline-flex items-center rounded-full px-6 py-3 text-[15px] font-semibold text-white/90 ring-1 ring-white/25 hover:ring-white/40">
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
