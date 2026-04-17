"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ArrowRotateCTA } from "@/components/shared/call-to-action-button";
import { KubrPlayer } from "@/components/shared/kubr-player";

/* ------------------------------------------------------------------ */
/*  Resource items                                                    */
/* ------------------------------------------------------------------ */

type ResourceType = "event" | "stat" | "pdf" | "blog" | "research" | "guide" | "kubr" | "deployment";

interface ResourceItem {
  type: ResourceType;
  title: string;
  description?: string;
  stat?: string;
  statLabel?: string;
  href: string;
  span?: string;
}

const RESOURCES: ResourceItem[] = [
  {
    type: "event",
    title: "KubeCon 2026",
    description:
      "Join us at KubeCon North America. See live demos of CleanStart's zero-CVE container platform.",
    href: "/events/kubecon-2026",
    span: "sm:col-span-2 lg:col-span-1",
  },
  {
    type: "stat",
    title: "Container Security Report",
    stat: "88K+",
    statLabel: "Containers analyzed in our annual report",
    href: "/reports/container-security-2026",
    span: "lg:col-span-1",
  },
  {
    type: "pdf",
    title: "SBOM Best Practices Guide",
    description:
      "The definitive guide to generating, managing, and leveraging SBOMs for enterprise security.",
    href: "/resources/sbom-guide",
    span: "lg:col-span-1",
  },
  {
    type: "blog",
    title: "Why Zero-CVE Is the New Baseline",
    description:
      "Traditional patching is broken. Learn why building secure from source is the only path forward.",
    href: "/blog/zero-cve-baseline",
    span: "lg:col-span-1",
  },
  {
    type: "research",
    title: "Supply Chain Threat Landscape",
    description:
      "Our research team's analysis of emerging software supply chain attack vectors and defenses.",
    href: "/research/supply-chain-threats",
    span: "lg:col-span-1",
  },
  {
    type: "kubr",
    title: "Meet Kubr",
    description: "Our security bird mascot is here to help you navigate container security.",
    href: "/kubr",
    span: "lg:col-span-1",
  },
  {
    type: "deployment",
    title: "24K+ Deployments",
    stat: "24K+",
    statLabel: "Enterprise container deployments secured by CleanStart worldwide",
    href: "/customers",
    span: "sm:col-span-2 lg:col-span-1",
  },
  {
    type: "guide",
    title: "Getting Started with CleanStart",
    description:
      "A step-by-step guide to replacing your base images with zero-CVE CleanStart images.",
    href: "/docs/getting-started",
    span: "lg:col-span-1",
  },
];

/* ------------------------------------------------------------------ */
/*  Card renderer                                                     */
/* ------------------------------------------------------------------ */

function ResourceCard({ item }: { item: ResourceItem }) {
  const isDark = item.type === "event" || item.type === "deployment";
  const isKubr = item.type === "kubr";
  const isStat = item.type === "stat";

  return (
    <motion.a
      href={item.href}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE_OUT_CUBIC }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300",
        isDark
          ? "bg-[#0A1628] text-white hover:shadow-[0_0_40px_rgba(5,107,241,0.12)]"
          : isKubr
            ? "bg-gradient-to-br from-[#F0F9FF] to-white border border-[#22D3EE]/10 hover:shadow-lg"
            : isStat
              ? "bg-gradient-to-br from-[#056BF1]/5 to-[#22D3EE]/5 border border-[#056BF1]/10 hover:shadow-lg"
              : "bg-white border border-[#0A1628]/5 hover:shadow-lg",
        item.span,
      )}
    >
      {/* Type badge */}
      <span
        className={cn(
          "mb-4 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
          isDark
            ? "bg-white/10 text-white/60"
            : "bg-[#056BF1]/5 text-[#056BF1]",
        )}
      >
        {item.type === "kubr" ? "Mascot" : item.type}
      </span>

      {/* Stat display */}
      {item.stat && (
        <p
          className={cn(
            "mb-2 font-[family-name:var(--font-heading)] text-4xl font-extrabold",
            isDark
              ? "bg-gradient-to-r from-[#056BF1] to-[#22D3EE] bg-clip-text text-transparent"
              : "bg-gradient-to-r from-[#056BF1] to-[#22D3EE] bg-clip-text text-transparent",
          )}
        >
          {item.stat}
        </p>
      )}

      {/* Kubr player */}
      {isKubr && (
        <div className="mb-4 flex justify-center">
          <KubrPlayer
            width={160}
            height={160}
            className="opacity-90"
          />
        </div>
      )}

      <h3
        className={cn(
          "font-[family-name:var(--font-heading)] text-base font-bold",
          isDark ? "text-white" : "text-[#0A1628]",
        )}
      >
        {item.title}
      </h3>

      {item.description && (
        <p
          className={cn(
            "mt-2 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed",
            isDark ? "text-white/50" : "text-[#0A1628]/60",
          )}
        >
          {item.description}
        </p>
      )}

      {item.statLabel && (
        <p
          className={cn(
            "mt-2 font-[family-name:var(--font-body)] text-sm",
            isDark ? "text-white/50" : "text-[#0A1628]/60",
          )}
        >
          {item.statLabel}
        </p>
      )}

      {/* Arrow link */}
      <div className="mt-4">
        <ArrowRotateCTA
          label="Learn more"
          className={cn(
            isDark ? "text-[#22D3EE]" : "text-[#056BF1]",
          )}
          arrowClassName={isDark ? "text-[#22D3EE]" : "text-[#056BF1]"}
        />
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                */
/* ------------------------------------------------------------------ */

export function ResourcesSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-widest text-[#056BF1]">
            Resources
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0A1628] sm:text-4xl">
            Learn, Explore & Stay Ahead
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <ResourceCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
