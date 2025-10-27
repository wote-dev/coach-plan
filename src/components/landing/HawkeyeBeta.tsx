"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, ShieldCheck, UploadCloud, BarChart3, KeyRound } from 'lucide-react';

export default function HawkeyeBeta() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      {/* subtle background accents */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(50% 50% at 10% 10%, rgba(30,143,213,0.25) 0%, transparent 70%),
                       radial-gradient(35% 35% at 90% 10%, rgba(204,255,0,0.18) 0%, transparent 60%),
                       linear-gradient(180deg, rgba(10,34,57,0.2) 0%, rgba(6,20,31,0) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 118px, rgba(255,255,255,0.06) 120px),
                             repeating-linear-gradient(90deg, transparent 0, transparent 118px, rgba(255,255,255,0.06) 120px)`,
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)'
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E8FD5] to-[#CCFF00]" />

          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              <Lock className="size-3.5" />
              Hawkeye analytics — Private beta
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/70">
              <ShieldCheck className="size-3.5" /> Secure ingestion
            </span>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-3 space-y-2">
              <h3 className="text-lg font-bold text-white">Input Hawkeye data to analyse your game</h3>
              <p className="text-sm text-white/80 max-w-prose">
                Upload match tracking exports (CSV/JSON) or paste a session link. Tennanova will map ball trajectories, depth,
                and error patterns to a personalised coaching plan tailored to level and objectives.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li className="flex items-center gap-2"><BarChart3 className="size-4 text-white/85" /> Pattern detection: serve placement, rally length, error clusters</li>
                <li className="flex items-center gap-2"><KeyRound className="size-4 text-white/85" /> Tactical insights aligned to player development goals</li>
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/planner"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold border border-white hover:bg-white/90 hover:border-white/90"
                >
                  Join private beta
                </Link>
                <span className="text-xs text-white/60">Investors: request a live demo</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/80">Upload data (CSV/JSON)</label>
                  <button type="button" disabled className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs text-white/80 disabled:opacity-70">
                    <UploadCloud className="size-4" /> Choose file
                  </button>
                  <input type="file" disabled className="hidden" aria-hidden />
                  <label className="text-xs font-medium text-white/80 mt-2">Or paste session link</label>
                  <input disabled placeholder="hawk-eye:// or https://..." className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs text-white/70 placeholder:text-white/40" />
                  <p className="text-[11px] text-white/60">Sign in to unlock Hawkeye analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
