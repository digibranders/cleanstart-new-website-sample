"use client";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Company list                                                      */
/* ------------------------------------------------------------------ */

const COMPANIES = [
  "Encora",
  "HPE",
  "KPMG",
  "Hitachi",
  "Eventus",
  "Loops",
  "Livlong",
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function TrustedBySection() {
  /* We render the list twice for a seamless marquee loop. */
  const track = [...COMPANIES, ...COMPANIES];

  return (
    <section className="relative overflow-hidden bg-white py-10">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <p className="mb-6 text-center font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-[#0A1628]/30">
        Trusted by industry leaders
      </p>

      <div className="animate-marquee flex w-max items-center gap-16">
        {track.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className={cn(
              "whitespace-nowrap font-[family-name:var(--font-heading)] text-xl font-bold text-[#0A1628]/15 transition-colors hover:text-[#0A1628]/30",
            )}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
