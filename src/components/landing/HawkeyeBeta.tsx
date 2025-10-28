"use client";

import { motion } from 'framer-motion';
import { UploadCloud, BarChart3, KeyRound } from 'lucide-react';

export default function HawkeyeBeta() {
  return (
    <section id="hawkeye" className="relative overflow-hidden border-t border-white/10 py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/tennis1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#060D16]/85" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          <div className="md:col-span-3 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-white/50">Private beta</p>
            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-[32px]">Input Hawkeye data to analyse your game</h3>
            <p className="text-sm text-white/65 sm:text-base max-w-prose">
              Upload match tracking exports (CSV/JSON) or paste a session link. Tennanova will map ball trajectories,
              depth, and error patterns to personalised coaching insights aligned to level and objectives.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2"><BarChart3 className="size-4 text-white/85" /> Pattern detection: serve placement, rally length, error clusters</li>
              <li className="flex items-center gap-2"><KeyRound className="size-4 text-white/85" /> Tactical insights aligned to player development goals</li>
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled
                title="Private beta unavailable"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold border border-white/20 text-white/60 bg-white/5 cursor-not-allowed"
              >
                Open Hawkeye beta
              </button>
              <span className="text-xs text-white/60">Investors: request a live demo</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070F1A]/80 p-5">
              <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url('/tennis2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 -z-10 bg-black/45" />
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
        </motion.div>
      </div>
    </section>
  );
}
