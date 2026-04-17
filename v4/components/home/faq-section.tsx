"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  FAQ data                                                          */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What makes CleanStart different from container scanning tools?",
    answer:
      "Container scanners find vulnerabilities after they're already in your images. CleanStart takes a fundamentally different approach: we rebuild every package from audited source code, eliminating vulnerabilities before they ever enter your containers. Instead of playing whack-a-mole with CVEs, you start clean and stay clean.",
  },
  {
    question: "Do I need to change my Dockerfiles or CI/CD pipeline?",
    answer:
      "No. CleanStart images are drop-in replacements for standard base images like Ubuntu, Alpine, and Debian. You change a single FROM line in your Dockerfile and everything else stays the same. Same registries, same CI/CD, same developer workflow — dramatically better security posture.",
  },
  {
    question: "How does CleanStart achieve zero CVEs?",
    answer:
      "Our CleanCompile Factory rebuilds every package from source using a deterministic, isolated build environment. Every dependency is verified, every build step is attested, and the resulting images contain only what's explicitly specified — no mystery packages, no inherited vulnerabilities, no unknown dependencies.",
  },
  {
    question: "What compliance frameworks does CleanStart support?",
    answer:
      "CleanStart provides built-in compliance evidence for FIPS 140-2, FedRAMP, STIG, SOC 2, and NIST SSDF. Our automated attestation generates the documentation and audit trails required by these frameworks, eliminating months of manual compliance work.",
  },
  {
    question: "How does the AI Logic Engine work?",
    answer:
      "The AI Logic Engine continuously monitors your container ecosystem, analyzing dependencies, identifying emerging threats, and orchestrating automated responses. It plans security strategies, analyzes risk patterns, and coordinates build decisions across your entire fleet — like having a tireless security architect working around the clock.",
  },
  {
    question: "What's included in the SBOM attestation?",
    answer:
      "Every CleanStart container ships with a complete, cryptographically signed SBOM generated at build time. It includes every package, library, and dependency with exact versions, licenses, and provenance chains. The attestation proves not just what's in the container, but exactly how it was built and from what source.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                */
/* ------------------------------------------------------------------ */

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-[#056BF1]/20 shadow-[0_0_20px_rgba(5,107,241,0.06)]"
          : "border-[#0A1628]/5",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-heading)] text-base font-bold text-[#0A1628]">
          {item.question}
        </span>

        {/* Blue circular expand/collapse button */}
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen
              ? "bg-[#056BF1] text-white"
              : "bg-[#056BF1]/10 text-[#056BF1]",
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-45",
            )}
            aria-hidden="true"
          >
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_CUBIC }}
          >
            <div className="px-6 pb-6">
              <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#0A1628]/60">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                */
/* ------------------------------------------------------------------ */

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F8F9FA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
            FAQ
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_280px]">
          {/* FAQ list */}
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === i ? null : i))
                }
              />
            ))}
          </div>

          {/* Kubr mascot — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <Image
                src="/kubr/kubr-faq.webp"
                alt="Kubr mascot"
                width={280}
                height={340}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
