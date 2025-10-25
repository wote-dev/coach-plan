'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

export default function HeroSection() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleViewTransitionNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hasVT = typeof document !== 'undefined' && (document as Document & { startViewTransition?: (callback: () => void) => void }).startViewTransition;
    if (hasVT) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        startTransition(() => {
          router.push(href);
        });
      });
    } else {
      startTransition(() => router.push(href));
    }
  }, [router]);

  return (
    <section className="relative isolate overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Brand-inspired background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 60% at 10% 10%, rgba(30,143,213,0.35) 0%, transparent 70%),
                       radial-gradient(35% 35% at 90% 15%, rgba(204,255,0,0.22) 0%, transparent 60%),
                       linear-gradient(180deg, #0A2239 0%, #06141F 100%)`,
        }}
      />

      {/* Court line grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 118px, rgba(255,255,255,0.08) 120px),
                             repeating-linear-gradient(90deg, transparent 0, transparent 118px, rgba(255,255,255,0.08) 120px)`,
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)'
        }}
      />

      {/* Top gradient for nav legibility and integration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 -z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,20,31,0.9), rgba(6,20,31,0.6), transparent)'
        }}
      />

      {/* Decorative AO "O" ring */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[max(3vw,16px)] top-[12vh] -z-10"
        style={{ width: '42vw', height: '42vw' }}
      >
        <div className="relative h-full w-full rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(30,143,213,0.22), transparent 70%)' }}>
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[6%] rounded-full border border-white/10" />
        </div>
      </motion.div>

      {/* Decorative AO "A" angle */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-10vw] bottom-[-12vh] -z-10"
        style={{ width: '48vw', height: '48vw' }}
      >
        <div
          className="h-full w-full rounded-[18%]"
          style={{
            background: 'conic-gradient(from 210deg, rgba(204,255,0,0.3), rgba(30,143,213,0.3))',
            clipPath: 'polygon(15% 0, 100% 60%, 65% 100%, 0 45%)'
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-24 md:py-28 lg:py-32 grid items-center lg:grid-cols-2 gap-10">
        <div className="relative z-10">
        <div className="mt-2 sm:mt-4 max-w-4xl md:max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold text-white leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl max-w-none"
            style={{ textWrap: 'balance' }}
          >
            Elite tennis lesson plans{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #0B72B9 0%, #1E8FD5 50%, #6BD4FF 100%)' }}>
              in seconds, not hours.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 text-pretty text-white/80 text-base sm:text-lg md:text-xl max-w-2xl"
          >
            Helping coaches generate tailored lesson plans for every client — powered by Tennaova’s intelligent coaching model.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/coach-ai"
              prefetch
              onClick={(e) => handleViewTransitionNav(e, '/coach-ai')}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold text-[#06141F] shadow-xl transition-colors focus:outline-none"
              style={{ background: 'linear-gradient(180deg, #CCFF00 0%, #B8FF36 100%)' }}
            >
              Generate a plan
              <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>


          </motion.div>

        </div>

        </div>

        {/* Right-side mockup (hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block justify-self-end self-center z-0 w-[520px] max-w-[38vw]"
        >
          <div className="relative h-[520px] rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E8FD5] to-[#CCFF00]" />

            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <p className="text-xs font-semibold tracking-wider text-white/60">Session</p>
                <h3 className="text-lg font-bold text-white">Plan overview</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
                <span className="inline-block size-1.5 rounded-full" style={{ background: '#CCFF00' }} />
                Tennaova model
              </span>
            </div>

            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Level', value: 'Intermediate' },
                  { label: 'Duration', value: '60 min' },
                  { label: 'Group', value: '4 players' },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                    <p className="text-[10px] font-semibold tracking-wider text-white/60">{m.label}</p>
                    <p className="text-sm font-bold text-white">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-xs font-semibold tracking-wider text-white/60">Warm-up</p>
                  <ul className="mt-2 space-y-2">
                    {[
                      'Dynamic footwork · 5 min',
                      'Mini-rally rhythm · 7 min',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                        <span className="mt-1 inline-block size-1.5 rounded-full bg-[#1E8FD5]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-xs font-semibold tracking-wider text-white/60">Main</p>
                  <ul className="mt-2 space-y-2">
                    {[
                      'Cross-court forehands',
                      'Serve + first ball pattern',
                      'Approach & volley',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                        <span className="mt-1 inline-block size-1.5 rounded-full" style={{ background: '#CCFF00' }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                <p className="text-xs font-semibold tracking-wider text-white/60">Coaching cues</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Early prep', 'Balance at contact', 'Recover center'].map((c) => (
                    <span key={c} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 opacity-40" style={{
              background: 'radial-gradient(80% 60% at 50% 100%, rgba(30,143,213,0.35) 0%, transparent 70%)'
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
