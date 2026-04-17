"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { CallToActionButton } from "@/components/shared/call-to-action-button";
import { ShieldCheck, Eye, DollarSign, Zap, Plug, Gauge } from "lucide-react";

const roles = [
  {
    key: "ciso", label: "For CISOs",
    title: "Security leadership that scales",
    subtitle: "Automated compliance, real-time visibility, and governance tools designed for security leaders managing container infrastructure at scale.",
    cta: "Explore for CISOs", href: "/solutions/for-ciso",
    gradient: "from-blue to-cyan",
    features: [
      { icon: DollarSign, title: "Reduce Security Costs", desc: "Automated security, real-time scanning, and built-in compliance enable lean, cost-efficient DevSecOps teams.", color: "#056BF1" },
      { icon: ShieldCheck, title: "24/7 Enhanced Security", desc: "Always-on security with smart threat detection and vulnerability protection across your entire container fleet.", color: "#00E5FF" },
      { icon: Eye, title: "Centralized Visibility", desc: "Unified dashboard for complete visibility and control over security posture and compliance status.", color: "#8B5CF6" },
    ],
  },
  {
    key: "dev", label: "For Developers",
    title: "Build fast, ship secure",
    subtitle: "Pre-hardened images, seamless CI/CD integration, and zero-config security so you can focus on writing code, not fixing vulnerabilities.",
    cta: "Explore for Developers", href: "/solutions/for-developers",
    gradient: "from-green to-cyan",
    features: [
      { icon: Zap, title: "Zero-Day Protection", desc: "Signed, verified images with automated security updates — no manual patching required.", color: "#10B981" },
      { icon: Plug, title: "Seamless Integration", desc: "CI/CD pipelines, private repos, and SSO support for complete workflow integration.", color: "#00E5FF" },
      { icon: Gauge, title: "Streamlined Development", desc: "Speed up deployment with automated compliance and custom-built minimal images.", color: "#F59E0B" },
    ],
  },
] as const;

export function RoleSwitchSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const toggle = useCallback(() => setActive((p) => (p + 1) % 2), []);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(toggle, 5000);
    return () => clearInterval(iv);
  }, [paused, toggle]);

  const role = roles[active];

  return (
    <section
      className="px-5 md:px-10 py-14 md:py-20 transition-colors duration-700"
      style={{ background: active === 0 ? "#f0f4ff" : "#ecfdf5" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="How CleanStart helps"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          className="font-[family-name:var(--font-heading)] font-bold text-[12px] uppercase tracking-[0.15em] text-blue mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built For Your Role
        </motion.p>

        {/* Toggle pill */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-txt/5 mb-10">
          {roles.map((r, i) => (
            <button
              key={r.key}
              onClick={() => { setActive(i); setPaused(true); }}
              className="relative font-[family-name:var(--font-heading)] font-semibold text-[13px] px-6 py-2.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 min-h-[44px]"
              style={{ color: i === active ? "#fff" : "#18181880" }}
            >
              {i === active && (
                <motion.div
                  layoutId="role-pill-v5"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${role.gradient}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{r.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          {/* Left — title + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            >
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[32px] md:text-[42px] text-txt leading-[1.1] tracking-[-0.02em] mb-5">
                {role.title}
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-txt-secondary leading-relaxed mb-10 max-w-[440px]">
                {role.subtitle}
              </p>
              <CallToActionButton label={role.cta} href={role.href} variant="dark" size="lg" />
            </motion.div>
          </AnimatePresence>

          {/* Right — features, no boxes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`f-${role.key}`}
              className="flex flex-col gap-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            >
              {role.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-5 bg-white/70 rounded-2xl p-5 border border-txt/[0.1]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_OUT_CUBIC }}
                >
                  <div className="relative shrink-0 mt-0.5">
                    <div className="absolute inset-0 rounded-full blur-lg opacity-20" style={{ background: f.color, transform: "scale(2)" }} />
                    <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${f.color}10` }}>
                      <f.icon className="w-5 h-5" style={{ color: f.color }} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[16px] text-txt mb-1">{f.title}</h3>
                    <p className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
