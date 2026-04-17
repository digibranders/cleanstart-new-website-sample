"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const faqItems = [
  { q: "What is CleanStart?", a: "CleanStart provides hardened, near-zero-CVE container base images that are continuously scanned, rebuilt, and cryptographically signed. Our images are designed to eliminate known vulnerabilities at the source, giving your team secure foundations to build on." },
  { q: "How does CleanStart handle security updates?", a: "Our automated pipeline continuously monitors upstream sources and rebuilds images within hours of new CVE disclosures. Every update is cryptographically signed and verified before publishing to our registry." },
  { q: "Can I customize CleanStart images for my applications?", a: "Yes. CleanStart images are fully compatible with standard Dockerfiles. You can layer your application on top of our hardened base images while maintaining the security guarantees we provide." },
  { q: "How can I verify a CleanStart image?", a: "Every CleanStart image is cryptographically signed using Sigstore cosign. You can verify signatures locally or integrate verification into your CI/CD pipeline with a single command." },
  { q: "Which registries work with CleanStart images?", a: "CleanStart images are compatible with all major container registries including Docker Hub, AWS ECR, Google Artifact Registry, Azure Container Registry, and any OCI-compliant registry. We also support private registry mirrors and dedicated endpoints for enterprise customers." },
  { q: "Does CleanStart support compliance frameworks like FIPS or NIST?", a: "Yes. CleanStart images are built to meet FIPS 140-2, NIST SP 800-190, CIS Benchmarks, and SOC 2 requirements. Our CleanSBOM product provides full software traceability for audit-ready compliance reporting." },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#f5f7fb] px-5 md:px-10 py-14 md:py-20" aria-label="FAQ">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — header + Kubr */}
          <motion.div
            className="lg:w-[35%] shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          >
            <p className="font-[family-name:var(--font-heading)] font-bold text-[12px] uppercase tracking-[0.15em] text-blue mb-4">FAQ</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[32px] md:text-[42px] lg:text-[48px] text-txt tracking-[-0.02em] leading-[1.1] mb-4">
              Questions &amp; Answers
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[14px] text-txt-muted leading-relaxed mb-8">
              Common questions about CleanStart&apos;s hardened container images, security, and integrations.
            </p>
            <div className="hidden lg:block">
              <Image src="/kubr/kubr-faq.webp" alt="Kubr - CleanStart mascot" width={340} height={346} className="object-contain -scale-x-100" loading="lazy" />
            </div>
          </motion.div>

          {/* Right — questions in subtle containers */}
          <div className="flex-1 flex flex-col gap-3">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  className={`rounded-2xl transition-all duration-300 ${
                    isOpen
                      ? "bg-white border border-blue/10"
                      : "bg-white/60 border border-transparent hover:bg-white hover:border-txt/[0.1]"
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE_OUT_CUBIC }}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded-2xl min-h-[44px]"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className={`font-[family-name:var(--font-heading)] font-semibold text-[16px] md:text-[17px] pr-4 transition-colors ${isOpen ? "text-blue" : "text-txt group-hover:text-blue"}`}>
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[14px] font-bold transition-all duration-300"
                      style={{
                        color: isOpen ? "#fff" : "rgba(24,24,24,0.25)",
                        background: isOpen ? "#056BF1" : "rgba(24,24,24,0.04)",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_CUBIC }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <div className="h-px bg-gradient-to-r from-blue/15 to-transparent mb-4" />
                          <p className="font-[family-name:var(--font-body)] text-[14px] text-txt-secondary leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
