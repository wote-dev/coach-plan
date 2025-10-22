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
      {/* AO-inspired background */}
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
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-[18vh] pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-md"
        >
          <span className="inline-block size-2 rounded-full" style={{ background: '#CCFF00', boxShadow: '0 0 0 4px rgba(204,255,0,0.12)' }} />
          <span className="text-xs font-semibold tracking-wide text-white/80">AO-inspired · Coach-ready</span>
        </motion.div>

        <div className="mt-6 sm:mt-8 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-extrabold tracking-[-0.02em] text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl"
          >
            Elite tennis lesson plans
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #1E8FD5 0%, #CCFF00 60%, #A5FF3B 100%)' }}>
              in seconds. Not hours.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 text-pretty text-white/80 text-base sm:text-lg md:text-xl max-w-2xl"
          >
            Purpose-built for tennis coaches. Generate AO-grade sessions tailored to level, duration, and group size—complete with drills, cues, and progressions.
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
              Try Coach AI
              <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/planner"
              prefetch
              onClick={(e) => handleViewTransitionNav(e, '/planner')}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white/90 ring-1 ring-white/25 hover:ring-white/40 transition-colors"
            >
              Explore Planner
            </Link>

            <div className="ml-1 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10">
              <span className="inline-block size-2 rounded-full" style={{ background: '#1E8FD5' }} />
              <span>Designed for funding conversations</span>
            </div>
          </motion.div>

          {/* Micro features */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4"
          >
            {["Level-smart", "Drill-rich", "Coach cues", "Adaptations"].map((item) => (
              <li key={item} className="text-xs font-semibold text-white/70">
                <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-white/60" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
