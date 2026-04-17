"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const columns = [
  { heading: "Contact", links: [{ l: "About Us", p: "/company/about" }, { l: "How It Works", p: "/products/hardened-images" }, { l: "Events", p: "/resources/events" }] },
  { heading: "Solutions", links: [{ l: "Enhance SCA", p: "/solutions/software-composition-analysis" }, { l: "FIPS Compliance", p: "/solutions/fips-compliance" }, { l: "Vulnerability", p: "/solutions/vulnerability-remediation" }] },
  { heading: "Connect", links: [{ l: "Contact Us", p: "/company/contact" }, { l: "Careers", p: "/company/careers" }, { l: "Newsroom", p: "/resources/newsroom" }, { l: "Legal", p: "#" }] },
  { heading: "Members of", links: [{ l: "OpenSSF", p: "#" }, { l: "Linux Foundation", p: "#" }, { l: "Cloud Native", p: "#" }] },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #030712 0%, #000000 100%)" }}>
      {/* Aurora transition from content above */}
      <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-canvas to-transparent" style={{ opacity: 0 }} />
        <div className="absolute w-[800px] h-[200px] left-[10%] -top-[50%] rounded-full bg-cyan/[0.06] blur-[80px] animate-[blob-drift-1_20s_ease-in-out_infinite]" />
        <div className="absolute w-[600px] h-[200px] right-[10%] -top-[30%] rounded-full bg-purple/[0.05] blur-[80px] animate-[blob-drift-2_25s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 md:px-10 pt-20 md:pt-32 pb-8">
        {/* CTA area — open layout, no box */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
        >
          <div className="flex items-start gap-6">
            {/* Kubr with glow aura */}
            <div className="hidden md:block relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-cyan/10 blur-3xl" style={{ transform: "scale(2)" }} />
              <Image
                src="/kubr/kubr-footer.png"
                alt="Kubr mascot"
                width={220}
                height={220}
                className="relative object-contain -scale-x-100"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[32px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-[-0.02em] max-w-[500px]">
                Ready to Secure Your Container Infrastructure?
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 leading-relaxed mt-4 max-w-[400px]">
                Start with zero-CVE hardened images. Deploy faster with confidence knowing your containers are secured from the ground up.
              </p>
            </div>
          </div>
          <CallToActionButton label="Book a Demo" href="/book-demo" variant="dark" size="lg" />
        </motion.div>

        {/* Luminous divider */}
        <div className="h-px luminous-line opacity-30 mb-16" />

        {/* Footer links — open columns, no boxes */}
        <div className="flex flex-col md:flex-row flex-wrap gap-10 md:gap-0 md:justify-between">
          <div className="max-w-[260px]">
            <Link href="/" className="font-[family-name:var(--font-heading)] font-bold text-[18px] text-white cursor-pointer" aria-label="Home">
              Clean<span className="text-cyan">Start</span>
            </Link>
            <p className="font-[family-name:var(--font-body)] text-[13px] text-white/50 mt-6 leading-relaxed">
              Hardened container images with zero known vulnerabilities. Secure by design, built for speed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex gap-10 md:gap-14 lg:gap-20">
            {columns.map((col, ci) => (
              <motion.div
                key={col.heading}
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.06, ease: EASE_OUT_CUBIC }}
              >
                <h4 className="font-[family-name:var(--font-heading)] font-bold text-[11px] text-white/50 uppercase tracking-[0.15em] mb-2">
                  {col.heading}
                </h4>
                {col.links.map((link) => (
                  <Link key={link.l} href={link.p} className="font-[family-name:var(--font-body)] text-[13px] text-white/50 hover:text-white transition-colors duration-200 cursor-pointer">
                    {link.l}
                  </Link>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/[0.1] mt-14 mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-[11px] text-white/50">&copy; 2026 CleanStart. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Security"].map((l) => (
              <Link key={l} href="#" className="text-[11px] text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[{ n: "X", a: "X" }, { n: "LinkedIn", a: "Li" }, { n: "GitHub", a: "Gh" }].map((s) => (
              <Link key={s.n} href="#" className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-[10px] text-white/50 hover:text-white hover:border-white/30 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black" aria-label={s.n}>
                {s.a}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
