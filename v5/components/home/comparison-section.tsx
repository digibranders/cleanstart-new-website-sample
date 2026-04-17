"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const traditional = ["Patch after image creation", "Public base images", "Large attack surface", "Scanner-driven security", "Non-deterministic builds"];
const cleanstart = ["Built from verified source", "Controlled packages", "Minimal components", "Secure by design", "Reproducible builds"];

export function ComparisonSection() {
  return (
    <section className="bg-canvas px-5 md:px-10 py-16 md:py-28 overflow-hidden" aria-label="Comparison">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-start">
          {/* Traditional — muted side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          >
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[18px] text-txt-muted mb-8">Traditional Public Images</h3>
            {traditional.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE_OUT_CUBIC }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-txt/10 shrink-0" />
                <span className="font-[family-name:var(--font-body)] text-[14px] text-txt-muted">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Luminous divider */}
          <motion.div
            className="hidden md:flex flex-col items-center mx-12"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_CUBIC }}
            style={{ transformOrigin: "top" }}
          >
            <div className="w-[2px] h-[300px] luminous-line-v" />
            <div className="w-3 h-3 rounded-full bg-cyan mt-2 animate-[pulse-glow_2s_ease-in-out_infinite]" style={{ filter: "blur(0.5px)", boxShadow: "0 0 12px 3px rgba(0,229,255,0.4)" }} />
          </motion.div>

          {/* CleanStart — vibrant side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          >
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[18px] text-blue mb-8">CleanStart</h3>
            {cleanstart.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 + 0.3, ease: EASE_OUT_CUBIC }}
              >
                <CheckCircle className="w-4 h-4 text-cyan shrink-0" strokeWidth={2} />
                <span className="font-[family-name:var(--font-body)] text-[14px] text-txt font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
