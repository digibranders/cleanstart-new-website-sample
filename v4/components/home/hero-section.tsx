"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { PillCTA } from "@/components/shared/call-to-action-button";

/* ------------------------------------------------------------------ */
/*  Slide data                                                        */
/* ------------------------------------------------------------------ */

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Container Security Platform",
    title: "Build Containers That Are Secure By Design",
    subtitle:
      "CleanStart eliminates vulnerabilities at the source. Build from verified components with zero CVEs, fully attested SBOMs, and provable compliance.",
  },
  {
    eyebrow: "Zero-CVE Containers",
    title: "Ship Software Without Known Vulnerabilities",
    subtitle:
      "Our CleanCompile Factory rebuilds every layer from audited source, producing containers with zero known CVEs and complete provenance chains.",
  },
  {
    eyebrow: "AI-Powered Security",
    title: "Let AI Orchestrate Your Supply Chain Security",
    subtitle:
      "The AI Logic Engine continuously analyzes, plans, and orchestrates security decisions across your entire container build pipeline.",
  },
  {
    eyebrow: "Compliance Automation",
    title: "Achieve FIPS, FedRAMP & STIG Compliance Automatically",
    subtitle:
      "Built-in attestation and compliance frameworks mean you meet federal standards without manual checklists or bolt-on scanning.",
  },
  {
    eyebrow: "Developer Experience",
    title: "Security That Works With Your Workflow",
    subtitle:
      "Drop-in replacements for your existing base images. Same Dockerfiles, same CI/CD, dramatically better security posture.",
  },
];

const AUTOPLAY_INTERVAL = 5000;

/* ------------------------------------------------------------------ */
/*  Animated title (word-by-word)                                     */
/* ------------------------------------------------------------------ */

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: EASE_OUT_CUBIC,
            delay: i * 0.06,
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Background decorative elements                                    */
/* ------------------------------------------------------------------ */

function AuroraMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cyan blob */}
      <div className="animate-aurora-drift-1 absolute -left-[20%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#22D3EE]/8 blur-[120px]" />
      {/* Purple blob */}
      <div className="animate-aurora-drift-2 absolute -right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/8 blur-[100px]" />
      {/* Blue blob */}
      <div className="animate-aurora-drift-3 absolute bottom-[5%] left-[30%] h-[700px] w-[700px] rounded-full bg-[#056BF1]/6 blur-[140px]" />
    </div>
  );
}

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

function FloatingHexagons() {
  const hexagons = [
    { size: 40, x: "10%", y: "20%", delay: 0, duration: 8 },
    { size: 28, x: "80%", y: "15%", delay: 1, duration: 10 },
    { size: 36, x: "65%", y: "70%", delay: 2, duration: 9 },
    { size: 24, x: "25%", y: "75%", delay: 0.5, duration: 11 },
    { size: 32, x: "90%", y: "50%", delay: 1.5, duration: 7 },
    { size: 20, x: "50%", y: "10%", delay: 3, duration: 12 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hexagons.map((hex, i) => (
        <div
          key={i}
          className="animate-float absolute opacity-[0.06]"
          style={{
            left: hex.x,
            top: hex.y,
            width: hex.size,
            height: hex.size,
            animationDelay: `${hex.delay}s`,
            animationDuration: `${hex.duration}s`,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="50,2 95,27 95,73 50,98 5,73 5,27"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function OrbitalRings() {
  const rings = [
    { size: 500, rotate: -15, duration: 30, nodeAngle: 0 },
    { size: 700, rotate: 10, duration: 40, nodeAngle: 120 },
    { size: 900, rotate: -5, duration: 50, nodeAngle: 240 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {rings.map((ring, i) => (
        <div
          key={i}
          className="absolute animate-spin-slow"
          style={{
            width: ring.size,
            height: ring.size,
            animationDuration: `${ring.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            style={{ transform: `rotate(${ring.rotate}deg)` }}
          >
            <ellipse
              cx="200"
              cy="200"
              rx="195"
              ry="80"
              stroke="url(#ring-grad)"
              strokeWidth="0.5"
              opacity="0.15"
            />
            {/* Orbiting node */}
            <circle
              cx={200 + 195 * Math.cos((ring.nodeAngle * Math.PI) / 180)}
              cy={200 + 80 * Math.sin((ring.nodeAngle * Math.PI) / 180)}
              r="3"
              fill="#22D3EE"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="400" y2="400">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="50%" stopColor="#056BF1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection                                                       */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  /* Auto-play */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const slide = SLIDES[activeIndex];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0A1628]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060E1A] via-[#0A1628] to-[#0D1B2F]" />
      <AuroraMesh />
      <DotGrid />
      <FloatingHexagons />
      <OrbitalRings />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            className="max-w-3xl"
          >
            {/* Eyebrow badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" />
              </span>
              <span className="font-[family-name:var(--font-body)] text-xs font-medium text-white/70">
                {slide.eyebrow}
              </span>
            </div>

            {/* Title — word-by-word */}
            <AnimatedTitle text={slide.title} />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_CUBIC, delay: 0.3 }}
              className="mt-6 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_CUBIC, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <PillCTA
                label="Start Building Secure"
                variant="dark"
                href="/signup"
              />
              <PillCTA
                label="Watch Demo"
                variant="ghost-light"
                href="/demo"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide progress indicators */}
        <div className="mt-16 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "relative h-1 overflow-hidden rounded-full transition-all duration-300",
                i === activeIndex ? "w-12" : "w-6",
                "bg-white/10",
              )}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === activeIndex && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#056BF1] to-[#22D3EE]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  key={`progress-${activeIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
