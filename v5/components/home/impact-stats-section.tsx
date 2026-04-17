"use client";

import { motion } from "motion/react";
import { useInViewOnce, useAnimatedCounter } from "@/lib/hooks";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const stats = [
  { value: 88000, suffix: "+", label: "CVEs remediated", color: "#056BF1" },
  { value: 97.6, suffix: "%", label: "Average CVE reduction", color: "#00E5FF" },
  { value: 352000, suffix: "+", label: "Engineering hours saved", color: "#8B5CF6" },
  { value: 10, suffix: "M+", label: "Packages from verified source", color: "#10B981" },
  { value: 100, suffix: "%", label: "Deterministic builds", color: "#EC4899" },
];

function formatNum(n: number, original: number): string {
  if (original >= 1000) return Math.floor(n).toLocaleString();
  if (String(original).includes(".")) return n.toFixed(1);
  return String(Math.floor(n));
}

export function ImpactStatsSection() {
  const { ref, inView } = useInViewOnce();
  const counters = [
    useAnimatedCounter(stats[0].value, 1500, inView),
    useAnimatedCounter(stats[1].value, 1500, inView),
    useAnimatedCounter(stats[2].value, 1500, inView),
    useAnimatedCounter(stats[3].value, 1500, inView),
    useAnimatedCounter(stats[4].value, 1500, inView),
  ];

  return (
    <section ref={ref} className="bg-canvas px-5 md:px-10 py-16 md:py-24" aria-label="Impact statistics">
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-start gap-y-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center px-4 relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT_CUBIC }}
            >
              <span
                className="font-[family-name:var(--font-heading)] font-extrabold text-[36px] md:text-[44px] leading-none"
                style={{ color: stat.color }}
              >
                {formatNum(counters[i], stat.value)}{stat.suffix}
              </span>
              <span className="font-[family-name:var(--font-body)] text-[12px] text-txt-muted mt-2">{stat.label}</span>

              {/* Gradient underline */}
              <div
                className="w-10 h-[2px] rounded-full mt-3"
                style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
              />

              {/* Vertical luminous separator (except last) */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-[-2px] top-[10%] h-[80%] w-px luminous-line-v opacity-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
