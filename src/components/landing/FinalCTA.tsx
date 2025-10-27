import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section id="book-demo" className="bg-[#040910] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-white/10 bg-[#070F1A] p-10 text-center sm:p-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/45">Join the next wave</p>
          {/* updated final CTA headline to be investor‑ready and athlete‑centric */}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-[42px]">
            Build an elite, investor‑ready coaching operation.
          </h2>
          {/* clarified value and time‑to‑impact */}
          <p className="mt-4 text-sm text-white/65 sm:text-base">
            Launch in minutes, invite your staff, and deliver professional plans today—no spreadsheets, no friction.
          </p>
          {/* strengthened CTAs for early access, demo, and partnerships */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/planner"
              className="inline-flex items-center justify-center rounded-full bg-[#CCFF00] px-7 py-3 text-sm font-semibold text-[#05080F] transition-transform hover:translate-y-[-1px]"
            >
              Join Early Access
            </Link>
            <a
              href="mailto:hello@tennanova.com"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              Partner with Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
