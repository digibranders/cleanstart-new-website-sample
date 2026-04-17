"use client";

import { motion } from "motion/react";
import { useInViewOnce, useAnimatedCounter } from "@/lib/hooks";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const stats = [
  { value: 95, suffix: "%", label: "Had critical vulnerabilities", ring: "stroke-cyan" },
  { value: 60, suffix: "%", label: "Fail to recover after a major cyber attack", ring: "stroke-purple" },
  { value: 207, suffix: " days", label: "Average time to detect a breach", ring: "stroke-magenta" },
];

function StatRing({ value, maxVal, color, children }: { value: number; maxVal: number; color: string; children: React.ReactNode }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (value / maxVal) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="2" className="stroke-txt/5" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none" strokeWidth="3"
          className={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: EASE_OUT_CUBIC }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function StatsSection() {
  const { ref, inView } = useInViewOnce();

  const v0 = useAnimatedCounter(stats[0].value, 1500, inView);
  const v1 = useAnimatedCounter(stats[1].value, 1500, inView);
  const v2 = useAnimatedCounter(stats[2].value, 1500, inView);
  const values = [v0, v1, v2];

  return (
    <section ref={ref} className="bg-canvas px-5 md:px-10 py-12 md:py-20" aria-label="Industry statistics">
      <div className="max-w-[1340px] mx-auto">
        <motion.p
          className="text-center font-[family-name:var(--font-heading)] font-bold text-[12px] uppercase tracking-[0.15em] text-blue mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why It Matters
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-28">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_OUT_CUBIC }}
            >
              <StatRing value={inView ? values[i] : 0} maxVal={stat.value <= 100 ? 100 : 365} color={stat.ring}>
                <span className="font-[family-name:var(--font-heading)] font-extrabold text-[32px] md:text-[40px] text-txt leading-none">
                  {Math.round(values[i])}{stat.suffix}
                </span>
              </StatRing>
              <p className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary mt-5 max-w-[180px] leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Connecting lines between stats */}
        <div className="hidden md:flex items-center justify-center mt-[-80px] relative z-0">
          <div className="w-[60%] h-px luminous-line opacity-30" />
        </div>
      </div>
    </section>
  );
}
