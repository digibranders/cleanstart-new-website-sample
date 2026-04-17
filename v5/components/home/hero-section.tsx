"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const slides = [
  { title: "Hardened Container Images", subtitle: "Zero-CVE base images built from verified source. Deploy faster with confidence. Security built in from the ground up.", cta: "Explore CleanStart", href: "/products/hardened-images", accent: "#056BF1" },
  { title: "Secure Your Software Supply Chain", subtitle: "Verify every component. Eliminate unknown dependencies. Build reproducible, traceable containers.", cta: "Learn About Supply Chain", href: "/solutions/software-composition-analysis", accent: "#10B981" },
  { title: "Vulnerability Remediation at Scale", subtitle: "Automated scanning and patching across your entire container fleet. Real-time insights and compliance reporting.", cta: "See Risk Intelligence", href: "/solutions/vulnerability-remediation", accent: "#EC4899" },
  { title: "Compliance and Certifications", subtitle: "FIPS 140-2, SOC 2 Type II, NIST compliant. Industry standards for the most regulated environments.", cta: "View Compliance", href: "/solutions/fips-compliance", accent: "#F59E0B" },
  { title: "Secure Your Builds at the Source", subtitle: "Hermetic compilation, verified dependencies, signed attestations. Build only what you need.", cta: "Discover CleanCompile", href: "/products/hardened-images", accent: "#8B5CF6" },
] as const;

/* ===== Animated title — word by word ===== */
function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.h1
      className="font-[family-name:var(--font-heading)] font-extrabold text-[44px] md:text-[56px] lg:text-[68px] text-txt leading-[1.02] tracking-[-0.035em]"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT_CUBIC } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ===== Main Hero — LIGHT MODE like v3 ===== */
export function HeroSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => { setActive(i); setProgress(0); }, []);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setActive((s) => (s + 1) % slides.length); return 0; }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(iv);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-canvas overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero"
    >
      {/* Light background with subtle colored accent glow that shifts per slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.08]"
          style={{ background: slide.accent }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue/[0.03] blur-[150px]" />

      {/* Dot grid — light version */}
      <div className="absolute inset-0 dot-grid-light" />

      {/* Content */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 md:px-10 w-full pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-[720px]">
          {/* Eyebrow */}
          <motion.span
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue/[0.06] border border-blue/[0.1] text-[11px] font-[family-name:var(--font-body)] font-semibold text-blue uppercase tracking-[0.12em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue animate-[pulse-glow_2s_ease-in-out_infinite]" />
            Container Security Platform
          </motion.span>

          {/* Title */}
          <div className="mt-7 mb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                transition={{ duration: 0.3, ease: EASE_OUT_CUBIC }}
              >
                <AnimatedTitle text={slide.title} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${active}`}
              className="font-[family-name:var(--font-body)] text-[15px] md:text-[17px] text-txt-secondary leading-relaxed max-w-[520px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, delay: 0.15, ease: EASE_OUT_CUBIC }}
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT_CUBIC }}
          >
            <CallToActionButton label={slide.cta} href={slide.href} variant="dark" size="lg" />
            <CallToActionButton label="Book a Demo" href="/book-demo" variant="light" size="lg" />
          </motion.div>
        </div>

        {/* Slide indicators with labels */}
        <div className="flex items-center gap-3 mt-16 md:mt-20">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative flex flex-col items-start gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-sm"
              aria-label={`Slide ${i + 1}: ${s.title}`}
            >
              <div className="relative h-[3px] rounded-full overflow-hidden transition-all duration-200" style={{ width: i === active ? 64 : 24 }}>
                <div className="absolute inset-0 bg-txt/[0.08] rounded-full" />
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}80)` }}
                  />
                )}
              </div>
              {i === active && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-[family-name:var(--font-body)] text-txt-muted tracking-wide"
                >
                  {s.title.split(" ").slice(0, 2).join(" ")}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
