"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillCTA } from "@/components/shared/call-to-action-button";

/* ------------------------------------------------------------------ */
/*  Navigation data                                                   */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 font-[family-name:var(--font-heading)] text-xl font-extrabold"
        >
          <span className={cn(scrolled ? "text-[#0A1628]" : "text-white")}>
            Clean
          </span>
          <span className="text-[#22D3EE]">Start</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "font-[family-name:var(--font-body)] text-sm font-medium transition-colors hover:text-[#056BF1]",
                scrolled ? "text-[#0A1628]/70" : "text-white/80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <PillCTA
            label="Book a Demo"
            variant="premium"
            href="/demo"
            className="text-xs"
          />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={cn(
            "relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden",
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300",
              scrolled && !mobileOpen ? "bg-[#0A1628]" : "bg-white",
              mobileOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300",
              scrolled && !mobileOpen ? "bg-[#0A1628]" : "bg-white",
              mobileOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300",
              scrolled && !mobileOpen ? "bg-[#0A1628]" : "bg-white",
              mobileOpen && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#0A1628] transition-opacity duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="mt-24 flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-body)] text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <PillCTA
            label="Book a Demo"
            variant="premium"
            href="/demo"
            className="mt-4"
          />
        </nav>
      </div>
    </header>
  );
}
