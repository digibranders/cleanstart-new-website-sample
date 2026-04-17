"use client";

import { useState, useRef, useEffect, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Arrow SVG shared by all CTA variants                              */
/* ------------------------------------------------------------------ */

const ARROW_PATH = "M0.71 0V2H26.07L0 28.07L1.41 29.49L27.49 3.41V28.78H29.49V0H0.71Z";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path d={ARROW_PATH} fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant colour tokens                                             */
/* ------------------------------------------------------------------ */

type CTAVariant =
  | "premium"
  | "light"
  | "dark"
  | "ghost-light"
  | "on-white"
  | "on-blue";

interface VariantTokens {
  pill: string;
  pillHover: string;
  text: string;
  arrowBg: string;
  arrowColor: string;
  fillFrom: string;
  fillTo: string;
}

const VARIANT_MAP: Record<CTAVariant, VariantTokens> = {
  premium: {
    pill: "bg-[#056BF1] border-[#056BF1]/30",
    pillHover: "hover:shadow-[0_0_24px_rgba(5,107,241,0.35)]",
    text: "text-white",
    arrowBg: "bg-white/20",
    arrowColor: "text-white",
    fillFrom: "#056BF1",
    fillTo: "#8B5CF6",
  },
  light: {
    pill: "bg-white border-white/30",
    pillHover: "hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]",
    text: "text-[#0A1628]",
    arrowBg: "bg-[#0A1628]/10",
    arrowColor: "text-[#0A1628]",
    fillFrom: "#FFFFFF",
    fillTo: "#22D3EE",
  },
  dark: {
    pill: "bg-[#0A1628] border-[#0A1628]/30",
    pillHover: "hover:shadow-[0_0_24px_rgba(10,22,40,0.35)]",
    text: "text-white",
    arrowBg: "bg-white/15",
    arrowColor: "text-white",
    fillFrom: "#056BF1",
    fillTo: "#22D3EE",
  },
  "ghost-light": {
    pill: "bg-transparent border-white/20",
    pillHover: "hover:border-white/40",
    text: "text-white",
    arrowBg: "bg-[#056BF1]",
    arrowColor: "text-white",
    fillFrom: "#056BF1",
    fillTo: "#22D3EE",
  },
  "on-white": {
    pill: "bg-[#056BF1] border-[#056BF1]/30",
    pillHover: "hover:shadow-[0_0_24px_rgba(5,107,241,0.3)]",
    text: "text-white",
    arrowBg: "bg-white/20",
    arrowColor: "text-white",
    fillFrom: "#056BF1",
    fillTo: "#8B5CF6",
  },
  "on-blue": {
    pill: "bg-white border-white/30",
    pillHover: "hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]",
    text: "text-[#056BF1]",
    arrowBg: "bg-[#056BF1]/10",
    arrowColor: "text-[#056BF1]",
    fillFrom: "#FFFFFF",
    fillTo: "#22D3EE",
  },
};

/* ------------------------------------------------------------------ */
/*  PillCTA — pill button with expanding circle fill from arrow        */
/* ------------------------------------------------------------------ */

interface PillCTAProps extends ComponentPropsWithoutRef<"a"> {
  variant?: CTAVariant;
  label: string;
}

export function PillCTA({
  variant = "premium",
  label,
  className,
  ...rest
}: PillCTAProps) {
  const tokens = VARIANT_MAP[variant];
  const [hovered, setHovered] = useState(false);
  const [circleOrigin, setCircleOrigin] = useState({ x: 0, y: 0 });
  const pillRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function measure() {
      if (!pillRef.current || !arrowRef.current) return;
      const pillRect = pillRef.current.getBoundingClientRect();
      const arrowRect = arrowRef.current.getBoundingClientRect();
      setCircleOrigin({
        x: arrowRect.left + arrowRect.width / 2 - pillRect.left,
        y: arrowRect.top + arrowRect.height / 2 - pillRect.top,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxDim = 600;

  return (
    <a
      ref={pillRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-2.5 font-[family-name:var(--font-body)] text-sm font-semibold transition-shadow duration-300",
        tokens.pill,
        tokens.pillHover,
        tokens.text,
        className,
      )}
      {...rest}
    >
      {/* Expanding circle overlay */}
      <span
        className="pointer-events-none absolute rounded-full transition-transform duration-500 ease-out"
        style={{
          width: maxDim,
          height: maxDim,
          left: circleOrigin.x - maxDim / 2,
          top: circleOrigin.y - maxDim / 2,
          background: `radial-gradient(circle, ${tokens.fillTo} 0%, ${tokens.fillFrom} 70%)`,
          transform: hovered ? "scale(1)" : "scale(0)",
          opacity: hovered ? 0.25 : 0,
        }}
      />

      <span className="relative z-10">{label}</span>

      <span
        ref={arrowRef}
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          tokens.arrowBg,
        )}
      >
        <ArrowIcon className={cn("h-3 w-3", tokens.arrowColor)} />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  ArrowRotateCTA — text + rotating arrow, no background              */
/* ------------------------------------------------------------------ */

interface ArrowRotateCTAProps extends ComponentPropsWithoutRef<"a"> {
  label: string;
  arrowClassName?: string;
}

export function ArrowRotateCTA({
  label,
  className,
  arrowClassName,
  ...rest
}: ArrowRotateCTAProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors",
        className,
      )}
      {...rest}
    >
      <span>{label}</span>
      <span className="flex h-6 w-6 items-center justify-center transition-transform duration-300 group-hover:rotate-45">
        <ArrowIcon
          className={cn("h-2.5 w-2.5", arrowClassName)}
        />
      </span>
    </a>
  );
}
