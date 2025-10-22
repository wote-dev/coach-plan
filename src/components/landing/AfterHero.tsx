'use client';

import { motion } from 'framer-motion';

const TRUSTED_BY = ['USTA Florida', 'IMG Academy', 'Nike Camps', 'TopCourt Labs'];
const METRICS = [
  { label: 'Hours saved per coach each month', value: '18' },
  { label: 'Sessions planned through Coach Plan', value: '5,400' },
  { label: 'Average time to first draft', value: '58s' },
  { label: 'Coach satisfaction score', value: '4.8 / 5' },
];
const FEATURE_PILLARS = [
  {
    title: 'Structured in seconds',
    copy: 'Auto-build full lesson blocks with warm-up, main drills, and cool down tuned to level and group size.',
  },
  {
    title: 'Always client-ready',
    copy: 'Every plan ships with coaching cues, progressions and equipment lists, ready to run on court.',
  },
  {
    title: 'Export anywhere',
    copy: 'Share as PDF, send a link, or sync straight to the team calendar in one click.',
  },
];

export default function AfterHero() {
  return (
    <section id="features" className="border-t border-white/10 bg-[#050B13] py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="space-y-6 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/50">
            Trusted by performance programs
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-white/40">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="uppercase tracking-[0.12em]">
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-[#070F1A] p-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="text-xs text-white/60">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-xl space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[42px] sm:leading-[1.05]">
                The operating system for modern coaching teams.
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                Coach Plan keeps coaching staffs aligned, replaces days of spreadsheet work, and turns every session into a repeatable playbook.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/70 sm:text-base">
              {[
                'Centralise lesson plans, drills and client notes in one workspace.',
                'Spin up structured sessions in seconds, then tailor the details on the fly.',
                'Spot gaps instantly with equipment, skill focus and time allocations side-by-side.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#CCFF00]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-[#091323] p-6 shadow-[0_48px_120px_rgba(4,10,18,0.55)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Session overview</p>
                  <p className="text-base font-medium text-white">U14 Development · 60 minutes</p>
                </div>
                <span className="rounded-full bg-[#CCFF00]/10 px-3 py-1 text-xs font-medium text-[#CCFF00]">
                  Live sync ready
                </span>
              </div>
              <div className="grid gap-4 py-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: 'Warm-up', body: '8 mins' },
                    { title: 'Main work', body: '42 mins' },
                    { title: 'Recovery', body: '10 mins' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0C1725] p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{item.title}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0C1725] p-5">
                  <p className="text-sm font-medium text-white">Focus today</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[13px] text-white/70">
                    {['Topspin depth', 'First-serve patterns', 'Approach footwork'].map((chip) => (
                      <span key={chip} className="rounded-full border border-white/15 px-3 py-1">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[13px] text-white/50">
                <span>Shared with Varsity Squad</span>
                <span>Updated 3 minutes ago</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURE_PILLARS.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-[#070F1A] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">Pillar</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/65">{feature.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
