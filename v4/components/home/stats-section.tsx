"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  Stat data                                                         */
/* ------------------------------------------------------------------ */

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    value: 95,
    suffix: "%",
    label: "Vulnerability Reduction",
    description:
      "Average reduction in container vulnerabilities when switching from traditional base images to CleanStart.",
  },
  {
    value: 60,
    suffix: "%",
    label: "Faster Remediation",
    description:
      "Reduction in time spent patching and remediating container security issues across the software lifecycle.",
  },
  {
    value: 207,
    suffix: " days",
    label: "Saved Per Breach",
    description:
      "Average time saved in breach identification and containment with proactive, build-time container security.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                  */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayed}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function StatsSection() {
  return (
    <section className="bg-[#F7FBFF] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
            By the numbers
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            The Impact of Secure-by-Design
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE_OUT_CUBIC }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0F9FF] to-white p-8",
                  "border border-[#056BF1]/5 transition-shadow duration-300",
                  "hover:shadow-[0_0_40px_rgba(5,107,241,0.08)]",
                )}
              >
                {/* Gradient glow border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className="absolute inset-[-1px] rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(5,107,241,0.15), rgba(34,211,238,0.15))",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      padding: 1,
                    }}
                  />
                </div>

                <div className="relative">
                  <p className="bg-gradient-to-r from-[#056BF1] to-[#22D3EE] bg-clip-text font-[family-name:var(--font-heading)] text-5xl font-extrabold text-transparent sm:text-6xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-heading)] text-base font-bold text-[#0A1628]">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#0A1628]/60">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
