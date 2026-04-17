"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { PillCTA } from "@/components/shared/call-to-action-button";

/* ------------------------------------------------------------------ */
/*  Role data                                                         */
/* ------------------------------------------------------------------ */

type Role = "ciso" | "developer";

interface FeatureCard {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

interface RoleContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  features: FeatureCard[];
}

const ROLE_CONTENT: Record<Role, RoleContent> = {
  ciso: {
    title: "Complete Visibility & Compliance",
    subtitle:
      "Gain full supply chain transparency, automated compliance evidence, and real-time risk assessment across your entire container fleet.",
    ctaLabel: "See CISO Solutions",
    features: [
      {
        title: "Supply Chain Visibility",
        description:
          "Full dependency tree visualization with provenance tracking across every layer of every container.",
        gradientFrom: "#056BF1",
        gradientTo: "#22D3EE",
      },
      {
        title: "Compliance Automation",
        description:
          "Continuous compliance evidence generation for FIPS, FedRAMP, STIG, and SOC 2 without manual audits.",
        gradientFrom: "#8B5CF6",
        gradientTo: "#056BF1",
      },
      {
        title: "Risk Quantification",
        description:
          "Real-time risk scoring and executive dashboards that translate security posture into business metrics.",
        gradientFrom: "#22D3EE",
        gradientTo: "#10B981",
      },
    ],
  },
  developer: {
    title: "Security That Fits Your Workflow",
    subtitle:
      "Drop-in secure base images, native CI/CD integration, and zero configuration changes. Build the same way, ship dramatically more secure.",
    ctaLabel: "See Developer Tools",
    features: [
      {
        title: "Drop-In Replacement",
        description:
          "Same Dockerfiles, same registries, same CI/CD. Switch to CleanStart images with a single line change.",
        gradientFrom: "#22D3EE",
        gradientTo: "#056BF1",
      },
      {
        title: "Instant SBOM Generation",
        description:
          "Attested SBOMs generated automatically at build time. No extra tooling, no pipeline changes.",
        gradientFrom: "#056BF1",
        gradientTo: "#8B5CF6",
      },
      {
        title: "Zero-CVE Base Images",
        description:
          "Start every build from a base with zero known vulnerabilities. No more starting your security journey in debt.",
        gradientFrom: "#10B981",
        gradientTo: "#22D3EE",
      },
    ],
  },
};

const ROLES: Role[] = ["ciso", "developer"];
const TOGGLE_INTERVAL = 5000;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function HowItHelpsSection() {
  const [activeRole, setActiveRole] = useState<Role>("ciso");

  /* Auto-switch every 5s */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRole((prev) => (prev === "ciso" ? "developer" : "ciso"));
    }, TOGGLE_INTERVAL);
    return () => clearInterval(timer);
  }, [activeRole]);

  const content = ROLE_CONTENT[activeRole];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Background shift */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background:
            activeRole === "ciso"
              ? "linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #F5F3FF 100%)"
              : "linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 50%, #F0F9FF 100%)",
        }}
        transition={{ duration: 0.8, ease: EASE_OUT_CUBIC }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
            Built for your role
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            How CleanStart Helps You
          </h2>
        </ScrollReveal>

        {/* Role toggle */}
        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex items-center gap-1 rounded-full bg-[#0A1628]/5 p-1">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={cn(
                  "relative z-10 rounded-full px-6 py-2 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors duration-300",
                  activeRole === role
                    ? "text-white"
                    : "text-[#0A1628]/60 hover:text-[#0A1628]",
                )}
              >
                {activeRole === role && (
                  <motion.div
                    layoutId="role-toggle-pill"
                    className="absolute inset-0 rounded-full bg-[#056BF1]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {role === "ciso" ? "CISO" : "Developer"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            className="mt-14 grid items-start gap-12 lg:grid-cols-2"
          >
            {/* Left — title + CTA */}
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0A1628] sm:text-3xl">
                {content.title}
              </h3>
              <p className="mt-4 max-w-md font-[family-name:var(--font-body)] text-base leading-relaxed text-[#0A1628]/60">
                {content.subtitle}
              </p>
              <div className="mt-8">
                <PillCTA
                  label={content.ctaLabel}
                  variant="on-white"
                  href={
                    activeRole === "ciso"
                      ? "/solutions/ciso"
                      : "/solutions/developer"
                  }
                />
              </div>
            </div>

            {/* Right — feature cards */}
            <div className="flex flex-col gap-4">
              {content.features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_OUT_CUBIC,
                    delay: i * 0.1,
                  }}
                  className="rounded-2xl border border-[#0A1628]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    {/* Gradient icon badge */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${feat.gradientFrom}15, ${feat.gradientTo}15)`,
                      }}
                    >
                      <div
                        className="h-4 w-4 rounded-sm"
                        style={{
                          background: `linear-gradient(135deg, ${feat.gradientFrom}, ${feat.gradientTo})`,
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#0A1628]">
                        {feat.title}
                      </h4>
                      <p className="mt-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#0A1628]/60">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
