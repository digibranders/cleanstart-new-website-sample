"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Package, Cpu, Eye, FileCheck, ListChecks, Search, GitBranch, FileCode, Wrench, Award, ArrowRight, Lock, ChevronRight } from "lucide-react";
import { EASE_OUT_CUBIC } from "@/lib/animations";

/* ---- Product Data ---- */
const products = [
  { name: "Clean Image", tag: "Runtime", desc: "Minimal, immutable runtime with zero known CVEs.", detail: "Built from verified source code with the smallest possible attack surface. Continuously rebuilt and cryptographically signed.", icon: Shield, color: "#056BF1", glow: "rgba(5,107,241,0.15)" },
  { name: "Clean Packages", tag: "Dependencies", desc: "Every dependency curated, verified, and traceable.", detail: "10M+ packages from verified source with automated vulnerability scanning and complete provenance chain.", icon: Package, color: "#10B981", glow: "rgba(16,185,129,0.15)" },
  { name: "Clean ML Models", tag: "AI/ML", desc: "Scanned, signed, and safe by design for AI workloads.", detail: "Model integrity verification with supply chain attestation and safe deployment pipelines for production AI.", icon: Cpu, color: "#8B5CF6", glow: "rgba(139,92,246,0.15)" },
  { name: "CleanSight", tag: "Observability", desc: "AI-powered insights. Risk, policy & drift detection.", detail: "Real-time compliance dashboard with policy violation alerts and complete container fleet visibility.", icon: Eye, color: "#F59E0B", glow: "rgba(245,158,11,0.15)" },
  { name: "Clean SBOM", tag: "Transparency", desc: "Complete. Signed. Continuously verified.", detail: "Full software bill of materials with cryptographic signing and audit-ready compliance reports.", icon: FileCheck, color: "#EC4899", glow: "rgba(236,72,153,0.15)" },
];

const aiSteps = [
  { label: "Plan", icon: ListChecks },
  { label: "Analyze", icon: Search },
  { label: "Orchestrate", icon: GitBranch },
];

const factorySteps = [
  { label: "Spec", icon: FileCode },
  { label: "Build", icon: Wrench },
  { label: "Attest", icon: Award },
  { label: "Handoff", icon: ArrowRight },
];

/* ---- Animated SVG Beams Background ---- */
function BackgroundBeams() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#056BF1" stopOpacity="0" />
          <stop offset="50%" stopColor="#056BF1" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#056BF1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Diagonal beams */}
      <line x1="0" y1="30%" x2="100%" y2="70%" stroke="url(#beam1)" strokeWidth="1">
        <animate attributeName="y1" values="25%;35%;25%" dur="8s" repeatCount="indefinite" />
        <animate attributeName="y2" values="65%;75%;65%" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="100%" y1="20%" x2="0" y2="80%" stroke="url(#beam2)" strokeWidth="1">
        <animate attributeName="y1" values="15%;25%;15%" dur="12s" repeatCount="indefinite" />
        <animate attributeName="y2" values="75%;85%;75%" dur="12s" repeatCount="indefinite" />
      </line>
      <line x1="20%" y1="0" x2="80%" y2="100%" stroke="url(#beam3)" strokeWidth="1">
        <animate attributeName="x1" values="15%;25%;15%" dur="10s" repeatCount="indefinite" />
        <animate attributeName="x2" values="75%;85%;75%" dur="10s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

/* ---- Product Card with Glowing Border ---- */
function ProductCard({ product, index, isActive, onHover }: {
  product: typeof products[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT_CUBIC }}
    >
      {/* Glowing border effect — animated on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(135deg, ${product.color}40, transparent 50%, ${product.color}20)` }}
      />

      {/* Spotlight glow behind card on hover */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-2xl"
        style={{ background: product.glow }}
      />

      {/* Card surface */}
      <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 transition-all duration-200 group-hover:border-white/[0.12] group-hover:bg-white/[0.06]">
        {/* Top row: icon + tag */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{ background: `${product.color}12`, border: `1px solid ${product.color}20` }}
          >
            <product.icon className="w-5 h-5" style={{ color: product.color }} strokeWidth={1.5} />
          </div>
          <span
            className="text-[10px] font-[family-name:var(--font-heading)] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ color: product.color, background: `${product.color}10` }}
          >
            {product.tag}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-[family-name:var(--font-heading)] font-bold text-[17px] text-white mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-[family-name:var(--font-body)] text-[13px] text-white/50 leading-relaxed">
          {product.desc}
        </p>

        {/* Colored bottom accent */}
        <div
          className="h-[2px] rounded-full mt-5 transition-all duration-200 group-hover:w-full w-8"
          style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

/* ---- Main Component ---- */
export function PlatformSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeProduct = hovered !== null ? products[hovered] : null;

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030712 0%, #0a1228 30%, #0d1530 60%, #050a18 100%)" }}
      aria-label="The CleanStart Platform"
    >
      {/* Background effects */}
      <BackgroundBeams />
      <div className="absolute inset-0 dot-grid opacity-25" />

      {/* Ambient glow spots */}
      <div className="absolute top-[10%] left-[45%] w-[600px] h-[300px] rounded-full bg-cyan/[0.02] blur-[120px]" />
      <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[250px] rounded-full bg-purple/[0.02] blur-[100px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">

        {/* ═══════ Header ═══════ */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
        >
          <p className="font-[family-name:var(--font-heading)] font-bold text-[11px] text-cyan/50 uppercase tracking-[0.25em] mb-5">
            Platform
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[36px] md:text-[48px] lg:text-[56px] text-white leading-[1.05] tracking-[-0.03em]">
            THE <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">CLEANSTART</span> PLATFORM
          </h2>
          <p className="font-[family-name:var(--font-heading)] font-bold text-[12px] text-white/50 uppercase tracking-[0.2em] mt-4">
            AI-Native &middot; Zero-CVE &middot; Built Different
          </p>
          <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 mt-3 max-w-[440px] mx-auto leading-relaxed">
            From source to zero-CVE containers. Rebuilt with AI. Proven by design.
          </p>
        </motion.div>

        {/* ═══════ Product Grid — Bento-style, all visible ═══════ */}
        {/* Top row: 3 products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard
              key={p.name}
              product={p}
              index={i}
              isActive={hovered === i}
              onHover={() => setHovered(i)}
            />
          ))}
        </div>
        {/* Bottom row: 2 products centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[66%] md:mx-auto">
          {products.slice(3).map((p, i) => (
            <ProductCard
              key={p.name}
              product={p}
              index={i + 3}
              isActive={hovered === i + 3}
              onHover={() => setHovered(i + 3)}
            />
          ))}
        </div>

        {/* ═══════ Expanded detail on hover ═══════ */}
        <div className="h-[48px] flex items-center justify-center mt-3">
          <AnimatePresence mode="wait">
            {activeProduct && (
              <motion.p
                key={activeProduct.name}
                className="font-[family-name:var(--font-body)] text-[12px] text-white/50 text-center max-w-[480px] leading-relaxed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {activeProduct.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════ Connector to Foundation ═══════ */}
        <div className="flex justify-center my-6 md:my-8">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
            style={{ transformOrigin: "top" }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-white/8 to-cyan/25" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-[pulse-glow_2s_ease-in-out_infinite]" style={{ boxShadow: "0 0 12px 3px rgba(0,229,255,0.3)" }} />
            <div className="w-px h-8 bg-gradient-to-b from-cyan/25 to-purple/20" />
          </motion.div>
        </div>

        {/* ═══════ Foundation Label ═══════ */}
        <motion.p
          className="text-center font-[family-name:var(--font-heading)] font-bold text-[11px] text-white/50 uppercase tracking-[0.25em] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built on Zero-CVE Foundation
        </motion.p>

        {/* ═══════ Foundation Cards ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* AI Logic Engine */}
          <motion.div
            className="group rounded-2xl border border-cyan/8 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          >
            <div className="h-[2px] bg-gradient-to-r from-cyan/60 to-blue/30" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan/8 border border-cyan/12">
                  <Cpu className="w-5 h-5 text-cyan/80" strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-white">AI Logic Engine</h3>
              </div>
              <p className="font-[family-name:var(--font-body)] text-[12px] text-white/50 leading-relaxed mb-6">
                Multi-agent orchestration that plans, analyzes, and optimizes every build.
              </p>
              <div className="flex items-center gap-2">
                {aiSteps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 rounded-full border border-cyan/15 flex items-center justify-center bg-cyan/[0.03]">
                        <s.icon className="w-3.5 h-3.5 text-cyan/50" strokeWidth={1.5} />
                      </div>
                      <span className="font-[family-name:var(--font-body)] text-[9px] text-white/50">{s.label}</span>
                    </div>
                    {i < aiSteps.length - 1 && <ChevronRight className="w-3 h-3 text-cyan/15 mb-3" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CleanCompile Factory */}
          <motion.div
            className="group rounded-2xl border border-purple/8 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
          >
            <div className="h-[2px] bg-gradient-to-r from-purple/60 to-magenta/30" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple/8 border border-purple/12">
                  <Lock className="w-5 h-5 text-purple/80" strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-white">CleanCompile Factory</h3>
              </div>
              <p className="font-[family-name:var(--font-body)] text-[12px] text-white/50 leading-relaxed mb-6">
                Hermetic, deterministic builds. Only what you specify.
              </p>
              <div className="flex items-center gap-2">
                {factorySteps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 rounded-full border border-purple/15 flex items-center justify-center bg-purple/[0.03]">
                        <s.icon className="w-3.5 h-3.5 text-purple/50" strokeWidth={1.5} />
                      </div>
                      <span className="font-[family-name:var(--font-body)] text-[9px] text-white/50">{s.label}</span>
                    </div>
                    {i < factorySteps.length - 1 && <ChevronRight className="w-3 h-3 text-purple/15 mb-3" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
