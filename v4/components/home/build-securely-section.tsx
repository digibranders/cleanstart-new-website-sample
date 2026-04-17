"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { PillCTA } from "@/components/shared/call-to-action-button";

/* ================================================================== */
/*  PART A — Problem Cards                                            */
/* ================================================================== */

interface ProblemCard {
  title: string;
  description: string;
  tint: string; /* tailwind bg tint for the icon badge */
  iconColor: string;
}

const PROBLEMS: ProblemCard[] = [
  {
    title: "Unknown Dependencies",
    description:
      "Traditional containers inherit thousands of unknown packages and libraries. You cannot secure what you cannot see.",
    tint: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Endless Patching",
    description:
      "Security teams spend 60%+ of their time chasing CVE patches that often break applications and create new risks.",
    tint: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    title: "Reactive Scanning",
    description:
      "Bolt-on scanners only find problems after deployment. By then, the vulnerability is already in production.",
    tint: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Uncontrolled Builds",
    description:
      "Without provenance and attestation, you have no proof of what is inside your containers or how they were built.",
    tint: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

function ProblemCardsPartA() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
          The Problem
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
          Why Traditional Container Security Fails
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.08}>
            <div
              className={cn(
                "group rounded-2xl border border-[#0A1628]/5 bg-white p-6 transition-shadow duration-300",
                "hover:shadow-lg hover:shadow-[#0A1628]/5",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  card.tint,
                )}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={card.iconColor}
                  aria-hidden="true"
                >
                  <path
                    d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-bold text-[#0A1628]">
                {card.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#0A1628]/60">
                {card.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PART B — Comparison Table                                         */
/* ================================================================== */

interface ComparisonRow {
  feature: string;
  traditional: string;
  cleanstart: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Base Image Source",
    traditional: "Upstream distros (unknown provenance)",
    cleanstart: "Built from verified, audited source",
  },
  {
    feature: "Vulnerability Count",
    traditional: "Hundreds to thousands of CVEs",
    cleanstart: "Zero known CVEs at build time",
  },
  {
    feature: "SBOM Accuracy",
    traditional: "Incomplete, often generated post-build",
    cleanstart: "Complete, attested, build-time SBOM",
  },
  {
    feature: "Patching Approach",
    traditional: "Reactive, manual, slow",
    cleanstart: "Proactive, automated rebuild",
  },
  {
    feature: "Compliance",
    traditional: "Manual checklists, bolt-on tools",
    cleanstart: "Built-in FIPS, FedRAMP, STIG",
  },
];

function ComparisonPartB() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
          The Difference
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
          Traditional vs CleanStart
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-14 overflow-hidden rounded-2xl border border-[#056BF1]/10">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#F7FBFF]">
            <div className="p-4 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-[#0A1628]/40">
              Feature
            </div>
            <div className="p-4 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-[#0A1628]/40">
              Traditional
            </div>
            <div className="relative p-4 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-[#056BF1]">
              CleanStart
              {/* Blue glow behind CleanStart column */}
              <div className="pointer-events-none absolute inset-0 bg-[#056BF1]/[0.03]" />
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "grid grid-cols-3 border-t border-[#0A1628]/5",
                i % 2 === 1 && "bg-[#FAFCFF]",
              )}
            >
              <div className="p-4 font-[family-name:var(--font-body)] text-sm font-medium text-[#0A1628]">
                {row.feature}
              </div>
              <div className="p-4 font-[family-name:var(--font-body)] text-sm text-[#0A1628]/50">
                {row.traditional}
              </div>
              <div className="relative p-4 font-[family-name:var(--font-body)] text-sm font-medium text-[#056BF1]">
                {row.cleanstart}
                <div className="pointer-events-none absolute inset-0 bg-[#056BF1]/[0.03]" />
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ================================================================== */
/*  PART C — Impact Stats                                             */
/* ================================================================== */

interface ImpactStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const IMPACT_STATS: ImpactStat[] = [
  { value: 88, suffix: "K+", label: "Containers Secured" },
  { value: 97.6, suffix: "%", label: "CVE Reduction" },
  { value: 352, suffix: "K+", label: "Hours Saved" },
  { value: 10, suffix: "M+", label: "Builds Processed" },
  { value: 100, suffix: "%", label: "SBOM Attestation" },
];

function AnimatedImpactCounter({
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
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const isDecimal = value % 1 !== 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplayed(isDecimal ? current.toFixed(1) : String(Math.round(current)));
      if (progress < 1) frame = requestAnimationFrame(tick);
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

function ImpactStatsPartC() {
  return (
    <div className="bg-[#F7FBFF] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            Proven Results at Scale
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {IMPACT_STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.06}>
              <div className="text-center">
                <p className="bg-gradient-to-r from-[#056BF1] to-[#22D3EE] bg-clip-text font-[family-name:var(--font-heading)] text-3xl font-extrabold text-transparent sm:text-4xl">
                  <AnimatedImpactCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </p>
                <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-[#0A1628]/60">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PART D — THE CLEANSTART PLATFORM (dark section)                   */
/* ================================================================== */

interface ProductCard {
  name: string;
  description: string;
  category: string;
  glowColor: string; /* hex for the glow */
}

const PRODUCTS: ProductCard[] = [
  {
    name: "CleanImage",
    description:
      "Zero-CVE base images rebuilt from audited source with complete SBOM attestation and provenance chains.",
    category: "Container Images",
    glowColor: "#22D3EE",
  },
  {
    name: "CleanBuild",
    description:
      "Secure build pipeline that verifies every dependency, generates attested SBOMs, and enforces policy gates.",
    category: "Build Pipeline",
    glowColor: "#056BF1",
  },
  {
    name: "CleanGuard",
    description:
      "Runtime policy enforcement and continuous compliance monitoring for your container fleet.",
    category: "Runtime Security",
    glowColor: "#8B5CF6",
  },
  {
    name: "CleanSBOM",
    description:
      "Enterprise SBOM management with vulnerability correlation, license tracking, and supply chain intelligence.",
    category: "SBOM Management",
    glowColor: "#10B981",
  },
  {
    name: "CleanComply",
    description:
      "Automated compliance evidence generation for FIPS 140-2, FedRAMP, STIG, and industry frameworks.",
    category: "Compliance",
    glowColor: "#F59E0B",
  },
];

interface FoundationCard {
  name: string;
  description: string;
  glowColor: string;
  steps: string[];
}

const FOUNDATIONS: FoundationCard[] = [
  {
    name: "AI Logic Engine",
    description:
      "Continuously analyzes, plans, and orchestrates security decisions across your entire container ecosystem.",
    glowColor: "#22D3EE",
    steps: ["Plan", "Analyze", "Orchestrate"],
  },
  {
    name: "CleanCompile Factory",
    description:
      "Deterministic build environment that rebuilds every package from source with cryptographic attestation.",
    glowColor: "#8B5CF6",
    steps: ["Spec", "Build", "Attest", "Handoff"],
  },
];

function AnimatedSVGBeams() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#056BF1" stopOpacity="0" />
          <stop offset="50%" stopColor="#056BF1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#056BF1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam3" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="-10%"
        y1="20%"
        x2="110%"
        y2="80%"
        stroke="url(#beam1)"
        strokeWidth="1"
        className="animate-beam-oscillate-1"
      />
      <line
        x1="110%"
        y1="10%"
        x2="-10%"
        y2="90%"
        stroke="url(#beam2)"
        strokeWidth="1"
        className="animate-beam-oscillate-2"
      />
      <line
        x1="-10%"
        y1="50%"
        x2="110%"
        y2="50%"
        stroke="url(#beam3)"
        strokeWidth="1"
        className="animate-beam-oscillate-3"
      />
    </svg>
  );
}

function PlatformPartD() {
  return (
    <div className="relative overflow-hidden bg-[#0A1628] py-24 sm:py-32">
      <AnimatedSVGBeams />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#22D3EE]">
            The Platform
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            THE CLEANSTART PLATFORM
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-[family-name:var(--font-body)] text-base text-white/50">
            Five products powered by two foundational engines, working together
            to deliver containers that are secure by construction.
          </p>
        </ScrollReveal>

        {/* Product cards bento grid: 3 top + 2 bottom centered */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal
              key={product.name}
              delay={i * 0.08}
              className={cn(
                i >= 3 && "lg:col-span-1 lg:col-start-1",
                i === 3 && "lg:col-start-1",
                i === 4 && "lg:col-start-2",
              )}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE_OUT_CUBIC }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 40px ${product.glowColor}15, 0 0 30px ${product.glowColor}08`,
                  }}
                />

                {/* Glowing border on hover */}
                <div
                  className="pointer-events-none absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${product.glowColor}30, transparent 50%, ${product.glowColor}15)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: 1,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${product.glowColor}15` }}
                  >
                    <div
                      className="h-4 w-4 rounded-sm"
                      style={{ backgroundColor: product.glowColor }}
                    />
                  </div>

                  {/* Category tag */}
                  <span
                    className="mt-4 inline-block rounded-full px-2.5 py-0.5 font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      color: product.glowColor,
                      backgroundColor: `${product.glowColor}10`,
                    }}
                  >
                    {product.category}
                  </span>

                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/50">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Connecting glow dots */}
        <div className="my-8 flex items-center justify-center gap-3">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#056BF1]"
              style={{ animationDelay: `${dot * 0.3}s` }}
            />
          ))}
        </div>

        {/* Foundation cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {FOUNDATIONS.map((foundation, i) => (
            <ScrollReveal key={foundation.name} delay={i * 0.1}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 60px ${foundation.glowColor}08`,
                }}
              >
                {/* Glow border */}
                <div
                  className="pointer-events-none absolute inset-[-1px] rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${foundation.glowColor}20, transparent 60%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: 1,
                  }}
                />

                <div className="relative">
                  <h3
                    className="font-[family-name:var(--font-heading)] text-xl font-bold"
                    style={{ color: foundation.glowColor }}
                  >
                    {foundation.name}
                  </h3>
                  <p className="mt-2 max-w-md font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/50">
                    {foundation.description}
                  </p>

                  {/* Process steps */}
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {foundation.steps.map((step, si) => (
                      <span key={step} className="flex items-center gap-2">
                        <span
                          className="rounded-full px-3 py-1 font-[family-name:var(--font-body)] text-xs font-semibold"
                          style={{
                            color: foundation.glowColor,
                            backgroundColor: `${foundation.glowColor}10`,
                            border: `1px solid ${foundation.glowColor}20`,
                          }}
                        >
                          {step}
                        </span>
                        {si < foundation.steps.length - 1 && (
                          <svg
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            fill="none"
                            className="text-white/20"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 4H14M14 4L11 1M14 4L11 7"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-14 flex justify-center">
            <PillCTA
              label="Explore the Platform"
              variant="dark"
              href="/platform"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Exported composite section                                        */
/* ================================================================== */

export function BuildSecurelySection() {
  return (
    <section>
      <ProblemCardsPartA />
      <ComparisonPartB />
      <ImpactStatsPartC />
      <PlatformPartD />
    </section>
  );
}
