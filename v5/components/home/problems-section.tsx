"use client";

import { motion } from "motion/react";
import { Package, RefreshCw, ScanLine, Shuffle } from "lucide-react";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const problems = [
  { title: "Unknown Dependencies", desc: "Images include packages from multiple sources that are hard to verify.", icon: Package, color: "#10B981" },
  { title: "Endless Patching", desc: "Fixing vulnerabilities after build leads to constant updates and overhead.", icon: RefreshCw, color: "#8B5CF6" },
  { title: "Reactive Scanning", desc: "Scanning detects issues late but does not control how software is built.", icon: ScanLine, color: "#EC4899" },
  { title: "Uncontrolled Builds", desc: "Without deterministic builds, artifacts can change across environments.", icon: Shuffle, color: "#F59E0B" },
];

/* Golden spiral positions (asymmetric layout) */
const positions = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1 md:mt-12",
  "md:col-start-1 md:row-start-2 md:mt-4",
  "md:col-start-2 md:row-start-2 md:mt-16",
];

export function ProblemsSection() {
  return (
    <section className="bg-canvas px-5 md:px-10 py-12 md:py-20" aria-label="The Problem">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
        >
          <p className="font-[family-name:var(--font-heading)] font-bold text-[12px] uppercase tracking-[0.15em] text-magenta mb-4">The Problem</p>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[32px] md:text-[42px] text-txt leading-[1.1] tracking-[-0.02em]">
            Traditional container security is broken
          </h2>
        </motion.div>

        {/* Open spatial layout — no boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              className={`flex flex-col items-start ${positions[i]}`}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT_CUBIC }}
            >
              {/* Subtle container with colored left accent */}
              <div className="relative bg-white rounded-2xl p-6 md:p-7 border border-txt/[0.1] hover:border-txt/[0.15] transition-colors duration-200">
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg, ${p.color}, ${p.color}30)` }} />

                <div className="flex items-start gap-4 pl-3">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="absolute inset-0 rounded-full blur-lg opacity-20" style={{ background: p.color, transform: "scale(2)" }} />
                    <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}10` }}>
                      <p.icon className="w-5 h-5" style={{ color: p.color }} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[18px] text-txt mb-1.5">{p.title}</h3>
                    <p className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
