'use client';

import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Zap } from 'lucide-react';
import { SectionCard, SectionHeader } from '@/components/ui/Section';
import Link from 'next/link';

const outcomes = [
  {
    icon: Clock,
    value: '250+',
    label: 'Hours saved',
    desc: 'Per coach per year vs. manual planning',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Users,
    value: '5x',
    label: 'Session volume',
    desc: 'Coaches can prepare more sessions weekly',
    color: 'from-emerald-400 to-green-400',
  },
  {
    icon: TrendingUp,
    value: '85%',
    label: 'Adoption rate',
    desc: 'Athletes prefer AI-generated structure',
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: Zap,
    value: '3x',
    label: 'Revenue potential',
    desc: 'Scale programs with same coaching team',
    color: 'from-orange-400 to-red-400',
  },
];

export default function ROI() {
  return (
    <section id="roi" className="relative isolate py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(204,255,0,0.15), transparent 70%)'
        }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(30,143,213,0.1), transparent 70%)'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeader as="h2" size="lg" dotColor="yellow" className="mb-3">
            Real outcomes for your business
          </SectionHeader>
          <p className="text-white/80 max-w-2xl">
            It&apos;s not just about saving time. It&apos;s about scaling impact without scaling costs.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {outcomes.map((outcome, idx) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SectionCard className="p-6 group hover:border-white/20 transition-all h-full flex flex-col">
                  <div className={`size-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${outcome.color} opacity-20 group-hover:opacity-30 transition-opacity mb-4`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${outcome.color} mb-1`}>
                    {outcome.value}
                  </div>
                  <p className="text-sm font-semibold text-white mb-2">{outcome.label}</p>
                  <p className="text-xs text-white/70 flex-1">{outcome.desc}</p>
                </SectionCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">For clubs looking to scale</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Run 2x the sessions with current coaching staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Ensure consistent quality across all programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Reduce coach burnout from planning overhead</span>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">For individual coaches</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Focus on delivery, not preparation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Deliver premium sessions to more clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1 rounded-full bg-[#CCFF00] flex-shrink-0 mt-2" />
                  <span>Earn more per hour worked</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#06141F] shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #B8FF36 100%)' }}
            >
              See it in action
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#book-demo"
              className="px-6 py-3 rounded-xl font-semibold text-white/90 hover:text-white ring-1 ring-white/25 hover:ring-white/40 transition-colors"
            >
              Talk to us about your program
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
