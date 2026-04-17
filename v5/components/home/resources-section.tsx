"use client";

import { motion } from "motion/react";
import { EASE_OUT_CUBIC } from "@/lib/animations";
import { KubrPlayer } from "@/components/shared/kubr-player";
import { Calendar, FileText, BookOpen, FlaskConical } from "lucide-react";

const items = [
  { type: "event", icon: Calendar, badge: "Event", title: "Cybersecurity Summit 2026", sub: "March 15-17, 2026", desc: "Join industry leaders for three days of security insights and networking.", color: "#00E5FF" },
  { type: "stat", value: "67%", desc: "of security teams report improved incident response time", color: "#056BF1" },
  { type: "resource", icon: FileText, badge: "PDF", title: "Container Security Best Practices", desc: "A comprehensive guide to securing your container workloads in production environments.", color: "#8B5CF6" },
  { type: "blog", icon: BookOpen, badge: "Blog", title: "The future of container hardening in enterprise", desc: "Explore how zero-CVE containers are reshaping security posture for Fortune 500 companies.", color: "#10B981" },
  { type: "stat", value: "96%", desc: "of customers report reduced vulnerability exposure within 30 days", color: "#00E5FF" },
  { type: "resource", icon: FlaskConical, badge: "Research", title: "2026 State of Container Security Report", desc: "Our annual analysis of vulnerability trends, attack vectors, and emerging threats in containerized infrastructure.", color: "#EC4899" },
  { type: "resource", icon: BookOpen, badge: "Guide", title: "Zero-CVE Migration Playbook", desc: "Step-by-step framework for transitioning your organization to hardened container images.", color: "#F59E0B" },
];

export function ResourcesSection() {
  return (
    <section className="bg-canvas px-5 md:px-10 py-14 md:py-20" aria-label="Resources">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
        >
          <div>
            <p className="font-[family-name:var(--font-heading)] font-bold text-[12px] uppercase tracking-[0.15em] text-blue mb-4">Learn</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[32px] md:text-[42px] text-txt leading-[1.1] tracking-[-0.02em]">Resources &amp; Insights</h2>
          </div>
          <p className="font-[family-name:var(--font-body)] text-[14px] text-txt-secondary leading-relaxed max-w-[420px]">
            Stay informed with the latest research, threat intelligence reports, and expert analysis from our security team.
          </p>
        </motion.div>

        {/* Asymmetric spatial layout — no boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-10">
          {/* Column 1 */}
          <div className="flex flex-col gap-14">
            {items.filter((_, i) => i % 3 === 0).map((item, i) => (
              <ResourceItem key={i} item={item} delay={i * 0.08} />
            ))}
            {/* Kubr zone */}
            <motion.div
              className="h-[280px] md:h-[340px] rounded-3xl overflow-hidden bg-gradient-to-br from-canvas to-[#f0f4ff]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
            >
              <KubrPlayer className="w-full h-full" />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-14 md:mt-10">
            {items.filter((_, i) => i % 3 === 1).map((item, i) => (
              <ResourceItem key={i} item={item} delay={i * 0.08 + 0.1} />
            ))}
            {/* Deployments stat */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
            >
              <span className="font-[family-name:var(--font-heading)] font-extrabold text-[36px] bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent">24,000+</span>
              <span className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary mt-1">Secure Deployments</span>
              <span className="font-[family-name:var(--font-body)] text-[11px] text-txt-muted mt-1">Trusted by organizations of all sizes across every sector worldwide.</span>
              <div className="w-12 h-[2px] rounded-full mt-3 bg-gradient-to-r from-blue to-cyan" />
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-14 md:mt-5">
            {items.filter((_, i) => i % 3 === 2).map((item, i) => (
              <ResourceItem key={i} item={item} delay={i * 0.08 + 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Single resource item — open layout, no box ---- */
function ResourceItem({ item, delay }: { item: typeof items[number]; delay: number }) {
  return (
    <motion.div
      className="flex flex-col group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT_CUBIC }}
    >
      {item.type === "stat" ? (
        <>
          <span className="font-[family-name:var(--font-heading)] font-extrabold text-[48px] leading-none" style={{ color: item.color }}>{item.value}</span>
          <span className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary mt-2 leading-relaxed">{item.desc}</span>
          <div className="w-10 h-[2px] rounded-full mt-3" style={{ background: item.color }} />
        </>
      ) : (
        <>
          {/* Badge with colored dot */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
            <span className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-txt-muted">{item.badge}</span>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[17px] text-txt mb-2 group-hover:text-blue transition-colors duration-200">
            {item.title}
          </h3>
          {item.sub && <p className="font-[family-name:var(--font-body)] text-[11px] text-txt-muted mb-2">{item.sub}</p>}
          <p className="font-[family-name:var(--font-body)] text-[13px] text-txt-secondary leading-relaxed">{item.desc}</p>
          <div className="w-8 h-[2px] rounded-full mt-4 transition-all duration-200 group-hover:w-16" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
        </>
      )}
    </motion.div>
  );
}
