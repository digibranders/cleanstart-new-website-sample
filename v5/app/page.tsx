import { HeroSection } from "@/components/home/hero-section";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { StatsSection } from "@/components/home/stats-section";
import { ProblemsSection } from "@/components/home/problems-section";
import { ComparisonSection } from "@/components/home/comparison-section";
import { ImpactStatsSection } from "@/components/home/impact-stats-section";
import { PlatformSection } from "@/components/home/platform-section";
import { RoleSwitchSection } from "@/components/home/role-switch-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ResourcesSection } from "@/components/home/resources-section";
import { FAQSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <ProblemsSection />
      <ComparisonSection />
      <ImpactStatsSection />
      <PlatformSection />
      <RoleSwitchSection />
      <TestimonialsSection />
      <ResourcesSection />
      <FAQSection />
    </>
  );
}
