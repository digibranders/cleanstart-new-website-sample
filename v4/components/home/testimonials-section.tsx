"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  Case study data (left side carousel)                              */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  company: string;
  stat: string;
  statLabel: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "HPE",
    stat: "97.6%",
    statLabel: "CVE Reduction",
    description:
      "Hewlett Packard Enterprise reduced container vulnerabilities by 97.6% across their cloud-native platform within the first quarter of deployment.",
    gradientFrom: "#056BF1",
    gradientTo: "#22D3EE",
  },
  {
    company: "Hitachi",
    stat: "352K+",
    statLabel: "Hours Saved",
    description:
      "Hitachi eliminated over 352,000 hours of manual vulnerability patching and remediation across their global container infrastructure.",
    gradientFrom: "#8B5CF6",
    gradientTo: "#056BF1",
  },
  {
    company: "Encora",
    stat: "FIPS 140-2",
    statLabel: "Compliant",
    description:
      "Encora achieved full FIPS 140-2 compliance for their federal container deployments without manual checklists or bolt-on tools.",
    gradientFrom: "#10B981",
    gradientTo: "#22D3EE",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonial quote data (right side scrollable)                    */
/* ------------------------------------------------------------------ */

interface TestimonialQuote {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  bgVariant: "white" | "cyan";
}

const QUOTES: TestimonialQuote[] = [
  {
    quote:
      "CleanStart fundamentally changed how we think about container security. We went from chasing CVEs to never having them in the first place.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "HPE",
    initials: "SC",
    bgVariant: "white",
  },
  {
    quote:
      "The AI Logic Engine identified supply chain risks we didn't even know existed. It's like having a senior security architect working 24/7.",
    name: "Marcus Thompson",
    title: "CISO",
    company: "Hitachi",
    initials: "MT",
    bgVariant: "cyan",
  },
  {
    quote:
      "We achieved FIPS compliance in weeks instead of months. The automated attestation and evidence generation is a game-changer for regulated industries.",
    name: "Elena Rodriguez",
    title: "Director of Security",
    company: "Encora",
    initials: "ER",
    bgVariant: "white",
  },
  {
    quote:
      "Our developers didn't have to change a single Dockerfile. Same workflow, dramatically better security posture. That's the dream.",
    name: "James Park",
    title: "Platform Lead",
    company: "KPMG",
    initials: "JP",
    bgVariant: "cyan",
  },
  {
    quote:
      "The complete SBOM attestation chain gave our customers the confidence they needed. We can prove exactly what's in every container we ship.",
    name: "Priya Sharma",
    title: "Head of DevSecOps",
    company: "Eventus",
    initials: "PS",
    bgVariant: "white",
  },
];

const CASE_STUDY_INTERVAL = 5000;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  const [activeStudy, setActiveStudy] = useState(0);

  /* Auto-rotate case studies */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStudy((prev) => (prev + 1) % CASE_STUDIES.length);
    }, CASE_STUDY_INTERVAL);
    return () => clearInterval(timer);
  }, [activeStudy]);

  const study = CASE_STUDIES[activeStudy];

  return (
    <section className="bg-[#F7FBFF] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
            Customer Stories
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            Trusted by Security Leaders
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left — sticky case study carousel */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
                className="overflow-hidden rounded-3xl p-8 sm:p-10"
                style={{
                  background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})`,
                }}
              >
                <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-white/60">
                  {study.company}
                </p>
                <p className="mt-4 font-[family-name:var(--font-heading)] text-5xl font-extrabold text-white sm:text-6xl">
                  {study.stat}
                </p>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-lg font-bold text-white/80">
                  {study.statLabel}
                </p>
                <p className="mt-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white/70">
                  {study.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="mt-6 flex items-center gap-2">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStudy(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === activeStudy
                      ? "w-8 bg-[#056BF1]"
                      : "w-2 bg-[#056BF1]/20",
                  )}
                  aria-label={`Go to case study ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right — scrollable quote cards */}
          <div className="flex flex-col gap-4">
            {QUOTES.map((quote, i) => (
              <ScrollReveal key={quote.name} delay={i * 0.06}>
                <div
                  className={cn(
                    "rounded-2xl p-6",
                    quote.bgVariant === "cyan"
                      ? "bg-[#F0FDFA] border border-[#22D3EE]/10"
                      : "bg-white border border-[#0A1628]/5",
                  )}
                >
                  <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#0A1628]/70 italic">
                    &ldquo;{quote.quote}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    {/* Gradient avatar initials */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#056BF1] to-[#22D3EE]">
                      <span className="font-[family-name:var(--font-heading)] text-xs font-bold text-white">
                        {quote.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#0A1628]">
                        {quote.name}
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-xs text-[#0A1628]/50">
                        {quote.title}, {quote.company}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
