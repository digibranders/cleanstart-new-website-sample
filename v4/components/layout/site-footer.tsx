"use client";

import Link from "next/link";
import Image from "next/image";
import { PillCTA } from "@/components/shared/call-to-action-button";
import { KubrPlayer } from "@/components/shared/kubr-player";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* ------------------------------------------------------------------ */
/*  Footer link columns                                               */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  {
    title: "Contact",
    links: [
      { label: "Sales Inquiry", href: "/contact" },
      { label: "Support", href: "/support" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Container Security", href: "/solutions/container-security" },
      { label: "SBOM Management", href: "/solutions/sbom" },
      { label: "Compliance", href: "/solutions/compliance" },
      { label: "DevSecOps", href: "/solutions/devsecops" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Careers", href: "/careers" },
      { label: "GitHub", href: "https://github.com/cleanstart" },
    ],
  },
  {
    title: "Members of",
    links: [
      { label: "CNCF", href: "https://cncf.io" },
      { label: "Docker Verified Publisher", href: "https://docker.com" },
      { label: "OpenSSF", href: "https://openssf.org" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/cleanstart", icon: "in" },
  { label: "Twitter", href: "https://twitter.com/cleanstart", icon: "X" },
  { label: "GitHub", href: "https://github.com/cleanstart", icon: "GH" },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer className="relative">
      {/* CTA Banner */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative -mb-20 overflow-hidden rounded-3xl bg-gradient-to-br from-[#056BF1] to-[#0342A0] px-8 py-12 sm:px-12 md:py-16">
            {/* Kubr mascot - overlaps top-right */}
            <div className="absolute -right-4 -top-4 hidden md:block">
              <KubrPlayer
                width={200}
                height={200}
                className="opacity-80"
              />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Ready to Secure Your Container Infrastructure?
              </h2>
              <p className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-base text-white/70">
                Start building clean, secure containers from source in minutes.
                No agents. No runtime overhead. Just provably secure software.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PillCTA
                  label="Get Started Free"
                  variant="on-blue"
                  href="/signup"
                />
                <PillCTA
                  label="Talk to Sales"
                  variant="ghost-light"
                  href="/contact"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer body */}
      <div className="bg-gradient-to-b from-[#056BF1] via-[#0342A0] to-[#022B6B] pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-12 md:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-white/50">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-[family-name:var(--font-body)] text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Award badges */}
          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 py-8">
            <Image
              src="/home/cybersecurity-awards-2025-gold-1.webp"
              alt="Cybersecurity Excellence Award 2025"
              width={60}
              height={60}
              className="opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
            <Image
              src="/home/cybersecurityaward-2025-1.webp"
              alt="Cybersecurity Award 2025"
              width={60}
              height={60}
              className="opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
            <Image
              src="/home/docker-seal.png"
              alt="Docker Verified Publisher"
              width={60}
              height={60}
              className="opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          </div>

          {/* Bottom row */}
          <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            {/* Logo */}
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-lg font-extrabold"
            >
              <span className="text-white">Clean</span>
              <span className="text-[#22D3EE]">Start</span>
            </Link>

            <p className="font-[family-name:var(--font-body)] text-xs text-white/40">
              &copy; {new Date().getFullYear()} CleanStart. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-[family-name:var(--font-body)] text-xs font-bold text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
